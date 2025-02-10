// repositories/userRepository.js
const User = require('../models/User');

class UserRepository {
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      console.error('Error in UserRepository - create:', error);
      throw new Error('Unable to create user');
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error('Error in UserRepository - findByEmail:', error);
      throw new Error('Unable to find user');
    }
  }

  async findById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      console.error('Error in UserRepository - findById:', error);
      throw new Error('Unable to find user');
    }
  }
}

module.exports = new UserRepository();