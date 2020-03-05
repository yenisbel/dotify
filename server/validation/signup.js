const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateSignupInput(data) {
  const currentYear = new Date().getFullYear();
  const validMonths = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];

  data.email = validText(data.email) ? data.email : "";
  data.confirmEmail = validText(data.confirmEmail) ? data.confirmEmail : "";
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";
  data.birthMonth = validText(data.birthMonth) ? data.birthMonth : "";
  data.gender = validText(data.gender) ? data.gender : "";

  if (Validator.isEmpty(data.email)) {
    return { message: "Please enter your email", isValid: false };
  }

  if (!Validator.isEmail(data.email)) {
    return { message: "Please enter a valid email", isValid: false };
  }

  if (Validator.isEmpty(data.confirmEmail)) {
    return { message: "Please enter your email again", isValid: false };
  }

  if (!Validator.isEmail(data.confirmEmail)) {
    return { message: "Please enter a valid email", isValid: false };
  }

  if (data.confirmEmail !== data.email) {
    return { message: "Emails must match", isValid: false };
  }

  if (Validator.isEmpty(data.username)) {
    return { message: "What should we call you?", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Enter a password to continue", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 8 })) {
    return { message: "Your password is too short", isValid: false };
  }

  if (!validMonths.includes(data.birthMonth)) {
    return { message: "Choose a month", isValid: false }
  }
  
  // Check if birthYear is a number and is within 125 years ago to now
  if (
    !data.birthYear || 
    data.birthYear < currentYear - 125 || 
    data.birthYear > currentYear 
  ) {
    return { message: "Enter a valid year", isValid: false };

    // Check if person is at least 13 years old
  } else if (data.birthYear > currentYear - 13) {
    return { message: "Sorry, but you don't meet dotify's age requirement" };
  }

  if (!data.birthDay || data.birthDay < 1 || data.birthDay > 31) {
    return { message: "Enter a valid day of the month", isValid: false };
  }

  if (Validator.isEmpty(data.gender)) {
    return { message: "Please indicate your gender", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};;