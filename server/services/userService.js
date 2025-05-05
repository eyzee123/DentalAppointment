const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

const updateUser = async ({ name, email, phone_number },userId) => {
  const newUser = await userRepository.editUser({name,email,phone_number},userId);
  return newUser;
};

module.exports = {
    updateUser
};
