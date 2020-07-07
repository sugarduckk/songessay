import React from 'react';
import FileDivContainer from './FileDivContainer';
import FileIconWrapper from './FileIconWrapper';
import TextTag from './TextTag';
import FileUnsupported from '../../res/icons/file_unsupported.svg';
import FilePDF from '../../res/icons/file_pdf.svg';
import FileDOC from '../../res/icons/file_doc.svg';
import FileTXT from '../../res/icons/file_txt.svg';
import FileOptionMenu from './FileOptionMenu';
import { RedButton } from '../../button';

const FileDiv = ({ file, onRemove, acceptFiles }) => {
  const [showMenu, setShowMenu] = React.useState();
  const [error, setError] = React.useState();
  const [extension, setExtension] = React.useState();
  React.useEffect(() => {
    const extArray = file.name.split('.');
    if (extArray.length === 1) {
      setError('File without extension');
    }
    else {
      const ext = extArray.pop().toLowerCase();
      if (acceptFiles.includes(ext)) {
        setExtension(ext);
      }
      else {
        setError(`.${ext} not supported`);
      }
    }
  }, [file, acceptFiles]);

  const renderUi = React.useMemo(() => {
    if (error) {
      return <>
        <FileIconWrapper src={FileUnsupported} />
        <TextTag bgColor='crimson'>{error}</TextTag>
      </>;
    }
    else {
      // supported
      if (extension === 'pdf') {
        return <>
          <FileIconWrapper src={FilePDF} />
          <TextTag bgColor='#E3242B'>{`.${extension} file`}</TextTag>
        </>;
      }
      else if (extension === 'doc' || extension === 'docx') {
        return <>
          <FileIconWrapper src={FileDOC} />
          <TextTag bgColor='#2A5699'>{`.${extension} file`}</TextTag>
        </>;
      }
      else if (extension === 'txt') {
        return <>
          <FileIconWrapper src={FileTXT} />
          <TextTag bgColor='#505050'>{`.${extension} file`}</TextTag>
        </>;
      }
      else {
        return <>
          <FileIconWrapper src={URL.createObjectURL(file)} />
          <TextTag bgColor='#2A5699'>{`.${extension} file`}</TextTag>
        </>;
      }
    }
  }, [error, extension, file]);
  const onClick = React.useCallback(e => {
    if (!error) {
      console.log('show menu');
      setShowMenu(true);
    }
  }, [error]);
  const onCancel = React.useCallback(e => {
    if (!error) {
      console.log('hide menu');
      setShowMenu(false);
    }
  }, [error]);
  return <FileDivContainer error={error} onClick={onClick}>
    {error && <RedButton onClick={onRemove}>Remove</RedButton>}
    {renderUi}
    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{file.name}</div>
    <FileOptionMenu showMenu={showMenu} onRemove={onRemove} onCancel={onCancel} />
  </FileDivContainer>;
};

export default FileDiv;