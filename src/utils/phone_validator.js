// Regular expression for a simple phone number validation (assuming digits only)
const phoneNumberRegex = /^\d{10}$/;

// Example function to validate a phone number
const  validatePhoneNumber=(phoneNumber)=> {
  if (phoneNumberRegex.test(phoneNumber.trim())) {
    return true;
  } else {
    return false;
  }
}

module.exports = {validatePhoneNumber}