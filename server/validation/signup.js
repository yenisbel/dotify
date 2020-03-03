const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateSignupInput(data) {
  data.email = validText(data.email) ? data.email : "";
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";
  data.gender = validText(data.gender) ? data.gender : "";
  data.dateOfBirth = validText(data.dateOfBirth) ? data.dateOfBirth : "";
  data.confirmEmail = validText(data.confirmEmail) ? data.confirmEmail : "";

  if (Validator.isEmpty(data.dateOfBirth)) {
    return { message: "Please enter your date of birth", isValid: false }
  };

  if (Validator.isEmpty(data.email)) {
    return { message: "Please enter your email", isValid: false }
  };

  if (Validator.isEmpty(data.confirmEmail)) {
    return { message: "Please enter your email", isValid: false }
  };

  if (Validator.isEmpty(data.username)) {
    return { message: "What should we call you?", isValid: false }
  };

  if (!Validator.isLength(data.password, { min: 8 })) {
    return { message: "Password must be at least 8 characters", isValid: false } 
  };

  if (Validator.isEmpty(data.password)) {
    return { message: "Enter a password to continue", isValid: false }
  };

  if (Validator.isEmpty(data.gender)) {
    return { message: "Please indicate your gender", isValid: false }
  };

  return {
    message: "",
    isValid: true
  };
};