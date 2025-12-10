const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';


const register = async (data) => {
  const { username, email, password } = data;

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] }
  });

  if (existingUser) throw new Error('Username or Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: { username, email, password: hashedPassword, isActive: true },
    select: { id: true, username: true, email: true, isActive: true, createdAt: true }
  });
};

const login = async (data) => {
  const { username, password } = data;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error('User not found');
  if (!user.isActive) throw new Error('Account is inactive. Please contact admin.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

  return { 
    token, 
    user: { id: user.id, username: user.username, email: user.email } 
  };
};

module.exports = { register, login };