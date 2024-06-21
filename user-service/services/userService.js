const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (username, password,email) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword ,email});
};

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('User not found');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
  return { token };
};

const userDetails= async(username)=>{
    return await User.findOne({where:{username}})
}

module.exports = { register, login ,userDetails};
