import FileExtension from "shared-lib/form-item/FileUploader/FileExtension";
import WordCount from "shared-lib/res/constant/WordCount";
import getWordCount from "shared-lib/util/getWordCount";


const validateEssayForm = (values) => {
  let errors = {};
  //essayQuestion
  if (!values.essayQuestion) {
    errors.essayQuestion = 'Essay question is required';
  }
  else if (values.essayQuestion.length > 500) {
    errors.essayQuestion = 'Essay question cannot be longer than 500 characters.';
  }
  if (values.submitType === 'file') {
    //fileUploads
    if (values.fileUploads.length === 0) {
      errors.fileUploads = 'You need to upload an essay file.';
    }
    else {
      var errorMessages = [];
      // Check file extension
      values.fileUploads.forEach(file => {
        const fileName = file.name;
        const extArray = fileName.split('.');
        if (extArray.length === 1) {
          errorMessages.push(`'${fileName}' has no extension.`);
        }
        else {
          const ext = extArray.pop().toLowerCase();
          if (!FileExtension.includes(ext)) {
            errorMessages.push(`The file type of '${fileName}' is not supported.`);
          }
        }
      });

      //check file size
      const totalSize = values.fileUploads.reduce((previous, current) => previous + current.size, 0);
      if (totalSize > 5 * 1024 * 1024) {
        errorMessages.push('Total files size cannot exceed 5.0 MB.');
      }
      if (errorMessages.length > 0) {
        errors.fileUploads = errorMessages.join('\n');
      }
    }
  }
  else if (values.submitType === 'text') {
    // essayText
    if (!values.essayText) {
      errors.essayText = 'Essay cannot be empty.';
    }
    else {
      let wordCount = getWordCount(values.essayText);
      if (wordCount > WordCount[WordCount.length - 1]) {
        errors.essayText = 'Word count cannot exceed 2000 words.';
      }
    }
  }

  return errors;
};

export default validateEssayForm;