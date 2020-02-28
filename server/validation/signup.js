const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateSignupInput(data){
  data.email = validText(data.email) ? data.email : "";
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";
  data.gender = validText(data.gender) ? data.gender : "";
  dateOfBirth = validText(data.dateOfBirth) ? data.dateOfBirth : "";
  // validate date

  if (Validator.isEmpty(data.dateOfBirth)){
    return { message: "Date of birth field is required", isValid: false}
  };

  if (Validator.isEmpty(data.email)){
    return { message: "Email field is required", isValid: false}
  };

  if (Validator.isEmpty(data.username)){
    return { message: "Username field is required", isValid: false}
  };

  if (!Validator.isLength(data.password, { min: 8 })){
    return { message: "Password must be at least 8 characters", isValid: false}
  };

  if (Validator.isEmpty(data.password)){
    return { message: "Password field is required", isValid: false}
  };

  if (Validator.isEmpty(data.gender)) {
    return { message: "Gender field is required", isValid: false}
  }

  return {
    message: "",
    isValid: true
  };

};