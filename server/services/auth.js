const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const keys = require("../../config2/keys");
// const keys = require("../../config2/keys");
const keys = require("../../config3/keys");
const validateSignupInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");

const signup = async data => {
  try {
    const { message, isValid } = validateSignupInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { 
      username, email, password, gender, birthYear, birthMonth, birthDay 
    } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        gender,
        birthDay,
        birthYear,
        birthMonth,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();
    // we'll create a token for the user
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    // use our other validator we wrote to validate this data
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }
    const { username, password } = data;
    const user = await User.findOne({ username });
    if (!user) throw new Error("User does not exist");

    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw new Error("Invalid Password");

    const token = jwt.sign({ id: user.id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };

  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  try {
    const { _id } = data;
    user = await User.findById(_id);
    const token = "";
    return { token, loggedIn: false, ...user._doc, password: null}
  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    // we take in the token from our mutation
    const { token } = data;
    // we decode the token using our secret password to get the
    // user's id
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;

    // then we try to use the User with the id we just decoded
    // making sure we await the response
    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { signup, verifyUser, logout, login };
