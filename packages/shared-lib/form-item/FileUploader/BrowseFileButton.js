import React from 'react';
import { PrimaryButton } from '../../button';

const BrowseFileButton = ({ label, accept, onChange, multiple }) => {
  const browseFiles = React.useCallback(e => {
    var input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.accept = accept;
    input.onchange = onChange;
    input.click();
  }, [accept, onChange, multiple]);
  return <PrimaryButton type='button' onClick={browseFiles}>{label}</PrimaryButton>;
};

export default BrowseFileButton;