const validateProfileForm = (values) => {
  let errors = {};
  if (!values.firstname) {
    errors.firstname = 'Firstname is required';
  }
  if (!values.lastname) {
    errors.lastname = 'Lastname is required';
  }
  if (!values.nickname) {
    errors.nickname = 'Nickname is required';
  }
  if (!values.profile) {
    errors.profile = 'Profile image is required';
  }
  return errors;
};

export default validateProfileForm;