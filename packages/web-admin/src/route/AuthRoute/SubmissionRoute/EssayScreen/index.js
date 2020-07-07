import React from 'react';
import { Card, CardTitle } from 'shared-lib/component';

const EssayScreen = ({ submission }) => {
  const essayTextPreview = React.useMemo(() => {
    const { submitType, essayText } = submission;
    if (submitType === 'text') {
      const totalLength = essayText.length;
      return totalLength > 250 ? essayText.substring(0, 250) + '...' : essayText;
    }
  }, [submission]);
  return <div>
    {submission && <React.Fragment>
      <CardTitle>essay question</CardTitle>
      <Card>{submission.essayQuestion}</Card>
      <CardTitle>essay</CardTitle>
      {submission.submitType === 'text' ?
        <Card>{essayTextPreview}</Card>
        :
        <Card>
          <ul>
            {submission.uploadedFiles.map((file, fileIndex) => {
              return <li key={fileIndex}>
                <button onClick={e => {
                  var xhr = new XMLHttpRequest();
                  xhr.responseType = 'blob';
                  xhr.onload = () => {
                    var blob = xhr.response;
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = file.name;
                    link.click();
                  };
                  xhr.open('GET', file.link);
                  xhr.send();
                }}>{file.name}</button>
              </li>;
            })}
          </ul>
        </Card>
      }
      <CardTitle>Word Count</CardTitle>
      <Card>{submission.wordCount}</Card>
    </React.Fragment>}
  </div>;
};

export default EssayScreen;