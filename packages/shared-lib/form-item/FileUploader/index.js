import React from 'react';
import Label from '../Label';
import FormItemErrorMessage from '../FormItemErrorMessage';
import FileUploaderArea from './FileUploaderArea';
import BrowseFileButton from './BrowseFileButton';
import FileStatus from './FileStatus';
import DropFileArea from './DropFileArea';
import FilesContainer from './FilesContainer';
import FileDiv from './FileDiv';
import useDragEvents from '../../hook/useDragEvents';
import TextDivider from '../TextDivider';

const getFile = (fileEntry) => {
  return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
};

const FileUploader = ({ fileExistCallback, name, value, handleChange, label, browseButtonLabel, acceptFiles, error, ...otherProps }) => {
  const onFilesDrop = React.useCallback((items, files) => {
    const processFile = (file) => {
      const existNameIndex = value.map(existingFile => existingFile.name).indexOf(file.name);
      if (existNameIndex < 0) {
        const addFile = latestValue => {
          return [...latestValue, file];
        };
        handleChange(name, addFile, true);
      }
      else {
        const payload = {
          text: `A file with name '${file.name}' is already added. Do you want to replace?`,
          confirmCallback: () => {
            const replaceFile = latestValue => {
              var itemIndex = latestValue.map(f => f.name).indexOf(file.name);
              let newValue = [...latestValue];
              newValue[itemIndex] = file;
              return newValue;
            };
            handleChange(name, replaceFile, true);
          }
        };
        fileExistCallback(payload);
        //dispatch(setPrompt(PromptType.CONFIRM, payload));
      }
    };
    const addDirectory = (fileEntry) => {
      if (fileEntry.isDirectory) {
        var directoryReader = fileEntry.createReader();
        directoryReader.readEntries((entries) => {
          entries.forEach((innerEntry) => {
            addDirectory(innerEntry);
          });
        });
      } else {
        getFile(fileEntry)
          .then(file => {
            processFile(file);
          })
          .catch(error => {
            console.log(error);
          });
      }
    };
    if (items) {
      Array.from(items).forEach((item, itemIndex) => {
        const fileEntry = item.webkitGetAsEntry();
        if (fileEntry) {
          addDirectory(fileEntry);
        }
      });
    }
    else if (files) {
      Array.from(files).forEach((file, fileIndex) => {
        processFile(file, fileIndex);
      });
    }
  }, [name, value, handleChange, fileExistCallback]);
  const accept = React.useMemo(() => {
    return acceptFiles.map(ext => '.' + ext).join(',');
  }, [acceptFiles]);
  const browseFiles = React.useCallback(e => {
    onFilesDrop(null, e.target.files);
  }, [onFilesDrop]);
  const [isDragOver, dragHandlers] = useDragEvents(onFilesDrop);
  return <>
    <Label htmlFor={label}>{label}</Label>
    <FileUploaderArea>
      <FileStatus files={value} />
      <DropFileArea isDragOver={isDragOver} {...dragHandlers}>
        {'Drop files here'}
        <FilesContainer>
          {value.map((file, fileIndex) => <FileDiv acceptFiles={acceptFiles} file={file} key={file.name} onRemove={e => {
            const removeFile = latestValue => {
              var newValue = [...latestValue];
              newValue.splice(fileIndex, 1);
              return newValue;
            };
            handleChange(name, removeFile, true);
          }} />)}
        </FilesContainer>
      </DropFileArea>
      <TextDivider text='or' />
      <BrowseFileButton label={browseButtonLabel} accept={accept} onChange={browseFiles} multiple={true} />
    </FileUploaderArea>
    {error && <FormItemErrorMessage>{error}</FormItemErrorMessage>}
  </>;
};

export default FileUploader;