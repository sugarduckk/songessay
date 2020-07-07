import PaymentFileExt from "./PaymentFileExt";

const validatePaymentForm = (values) => {
  let errors = {};
  if (values.fileUploads.length === 0) {
    errors.fileUploads = 'You need to upload a payment slip.';
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
        if (!PaymentFileExt.includes(ext)) {
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

  return errors;
};

export default validatePaymentForm;