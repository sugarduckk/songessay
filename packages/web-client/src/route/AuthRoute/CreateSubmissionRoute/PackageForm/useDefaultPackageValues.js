import React from 'react';
import WordCount from 'shared-lib/res/constant/WordCount';
import getWordCount from 'shared-lib/util/getWordCount';

const defaultPackageValues = {
  wordCount: 300,
  package: 'basic',
  format: 'pdf',
  waitTime: 7
};

const useDefaultPackageValues = (essayValues) => {
  return React.useMemo(() => {
    const { submitType, essayText } = essayValues || {};
    switch (submitType) {
      case 'file': {
        return defaultPackageValues;
      }
      case 'text': {
        let wordCount = getWordCount(essayText);
        let defaultWordCount;
        WordCount.forEach(count => {
          if (count <= wordCount) {
            defaultWordCount = count;
          }
        });
        defaultPackageValues.wordCount = defaultWordCount;
        return defaultPackageValues;
      }
      default: {
        return defaultPackageValues;
      }
    }
  }, [essayValues]);
};

export default useDefaultPackageValues;