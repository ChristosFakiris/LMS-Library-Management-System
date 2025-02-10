const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const response = await userService.registerUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await userService.loginUser(email, password);
    res.json(response);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
