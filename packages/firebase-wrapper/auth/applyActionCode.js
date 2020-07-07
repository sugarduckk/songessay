import { auth } from "..";

const applyActionCode = (actionCode) => {
  return auth.applyActionCode(actionCode);
};

export default applyActionCode;