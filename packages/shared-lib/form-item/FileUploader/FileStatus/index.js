import React from 'react';
import FileStatusContainer from './FileStatusContainer';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};


const FileStatus = ({ files }) => {
  const [totalSize, setTotalSize] = React.useState(0);
  React.useEffect(() => {
    if (files) {
      setTotalSize(files.reduce((previous, current) => previous + current.size, 0));
    }
  }, [files]);
  return <FileStatusContainer>
    {`Total size: ${formatBytes(totalSize)}`}
  </FileStatusContainer>;
};

export default FileStatus;