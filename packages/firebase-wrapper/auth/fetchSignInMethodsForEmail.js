import { auth } from "..";

const fetchSignInMethodsForEmail = (email) => {
  return auth.fetchSignInMethodsForEmail(email);
};

export default fetchSignInMethodsForEmail;