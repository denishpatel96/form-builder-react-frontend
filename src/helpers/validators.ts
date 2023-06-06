export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  // More password validations @ https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  var re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?\[\]|<>~{}.,])[A-Za-z\d#$@!%&*?\[\]|<>~{}.,]{8,30}$/;
  return re.test(password);
};

export const hasProperCharacterCount = (password: string, min: number, max: number) => {
  return password ? password.length >= min && password.length <= max : false;
};

export const hasCapitalLetter = (password: string) => {
  var re = /[A-Z]{1,}/;
  return re.test(password);
};

export const hasSmallLetter = (password: string) => {
  var re = /[a-z]{1,}/;
  return re.test(password);
};

export const hasNumber = (password: string) => {
  var re = /[\d]{1,}/;
  return re.test(password);
};

export const hasSpecialCharacter = (password: string) => {
  var re = /[#$@!%&*?\[\]|<>~{}.,]{1,}/;
  return re.test(password);
};
