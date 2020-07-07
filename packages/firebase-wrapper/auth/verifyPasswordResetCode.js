import { auth } from "..";

const verifyPasswordResetCode = (actionCode) => {
  return auth.verifyPasswordResetCode(actionCode);
};

export default verifyPasswordResetCode;