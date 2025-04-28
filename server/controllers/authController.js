const authService = require('../services/authService');

const register = async (req, res) => {
  const { name, email, password, phone_number } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  try {
    const newUser = await authService.registerUser({ name, email, password, phone_number });
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await authService.loginUser({ email, password });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
};
