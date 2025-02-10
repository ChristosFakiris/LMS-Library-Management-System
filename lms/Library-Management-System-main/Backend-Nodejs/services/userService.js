const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  async registerUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await userRepository.create({ 
        ...userData, 
        password: hashedPassword 
      });
      return { message: 'User registered successfully' };
    } catch (error) {
      console.error('Error in UserService - registerUser:', error);
      throw new Error('Error registering user');
    }
  }

  async loginUser(email, password) {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role }, 
        process.env.JWT_SECRET || 'secretKey', 
        { expiresIn: '1h' }
      );
      return { token };
    } catch (error) {
      console.error('Error in UserService - loginUser:', error);
      throw new Error('Error logging in');
    }
  }
}

module.exports = new UserService();