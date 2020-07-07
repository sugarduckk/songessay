import { auth } from "..";

const confirmPasswordReset = (actionCode, newPassword) => {
  return auth.confirmPasswordReset(actionCode, newPassword);
};

export default confirmPasswordReset;