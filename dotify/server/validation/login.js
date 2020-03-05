const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    return { message: "Please enter your dotify username", isValid: false };
  }
  if (Validator.isEmpty(data.password)) {
    return { message: "Please enter your password", isValid: false };
  }
  return {
    message: "",
    isValid: true
  };
};