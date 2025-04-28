const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

// Handle registration
const registerUser = async ({ name, email, password, phone_number }) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already exists.');
  }

  const password_hash = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({ name, email, password_hash, phone_number });

  return newUser;
};

// Handle login
const loginUser = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
