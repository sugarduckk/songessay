import React from 'react';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase-wrapper/auth';


const ResetPasswordPage = ({ actionCode }) => {
  const [accountEmail, setAccountEmail] = React.useState();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  const onNewPasswordChange = React.useCallback(e => {
    setNewPassword(e.target.value);
  }, []);

  const onConfirmNewPasswordChange = React.useCallback(e => {
    setConfirmNewPassword(e.target.value);
  }, []);

  React.useEffect(() => {
    verifyPasswordResetCode(actionCode)
      .then(setAccountEmail)
      .catch(error => {
        console.log(error.code);
      });
  }, [actionCode]);

  const onSubmit = React.useCallback(e => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      confirmPasswordReset(actionCode, newPassword)
        .then(resp => {
          console.log('Password reset!');
        })
        .catch(error => {
          console.log(error.code);
        });
    }
  }, [newPassword, confirmNewPassword, actionCode]);

  if (!accountEmail) {
    return <div>Loading account email ...</div>;
  }

  return <div>
    <form onSubmit={onSubmit}>
      <p>{`Enter new password for ${accountEmail}.`}</p>
      <label htmlFor='new_password'>New password</label>
      <input id='new_password' value={newPassword} onChange={onNewPasswordChange} />
      <label htmlFor='confirm_new_password'>Confirm new password</label>
      <input id='confirm_new_password' value={confirmNewPassword} onChange={onConfirmNewPasswordChange} />
      <button type='submit'>Submit</button>
    </form>
  </div>;
};

export default ResetPasswordPage;