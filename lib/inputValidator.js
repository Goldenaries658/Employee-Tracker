const colors = require('colors');

const validateInput = async (input) => {
  try {
    // Testing for blank input
    if (!input) {
      console.log('You need to input something.'.red.bold);
      return false;
    } else {
      // Checking string only contains letters
      valid = /^[A-Za-z]+$/.test(input);
      if (valid) {
        return true;
      } else {
        console.log('Only letters allowed.'.red.bold);
        return false;
      }
    }
  } catch (err) {
    console.error(`ERROR - inputValidator.js - inputCheck(): ${err}`);
  }
};

module.exports = validateInput;
