const jsonwebtoken = require('jsonwebtoken');
const passwordHash = require('password-hash');

const User = require('../models/user.model');

const { JWT_SECRET_KEY } = require('../utils/environments');

const login = async (email, phone, password) => {
  const userEmail = await User.findOne({ email }).lean();
  const userPhone = await User.findOne({ phone }).lean();
  if (!userEmail && !userPhone) throw new Error('Unauthorized');

  const isPassed = passwordHash.verify(
    password,
    userEmail ? userEmail.password : userPhone.password
  );
  if (!isPassed) throw new Error('Invalid password');

  const { _id, role } = userEmail || userPhone;

  return {
    token: jsonwebtoken.sign({ _id, role }, JWT_SECRET_KEY, {
      expiresIn: '2d',
    }),
    user: { _id },
  };
};

const adminLogin = async (email, phone, password) => {
  const userEmail = await User.findOne({ email }).lean();
  const userPhone = await User.findOne({ phone }).lean();
  if (!userEmail && !userPhone) throw new Error('Unauthorized');

  const isPassed = passwordHash.verify(
    password,
    userEmail ? userEmail.password : userPhone.password
  );
  if (!isPassed) throw new Error('Invalid password');

  const { _id, role } = userEmail || userPhone;

  if (role !== 'Admin') throw new Error('User has no permissions');

  return {
    token: jsonwebtoken.sign({ _id, role }, JWT_SECRET_KEY, {
      expiresIn: '2d',
    }),
    user: { _id },
  };
};

const register = async (email, phone, password) => {
  if (!password.trim()) throw new Error('Mật khẩu trống');

  if (password.length < 8) throw new Error('Mật khẩu phải có ít nhất 8 ký tự');

  const existedEmail = await User.findOne({ email });
  if (existedEmail) throw new Error('Email đã tồn tại');

  const user = new User({
    email,
    phone,
    password: passwordHash.generate(password),
    role: 'User',
    history: [],
  });

  await user.save();
};

module.exports = {
  login,
  adminLogin,
  register,
};
