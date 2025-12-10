const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (username, email, password) => {
    const existingUser = await prisma.user.findFirst({
        where: { 
            OR: [{ username }, { email }] }
    });

    if(existingUser) {
        throw new Error('Username or Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        }
    });
    return { id: newUser.id, username: newUser.username, email: newUser.email };
};

const login = async (username, password) => {
 
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    throw new Error('Invalid username or password');
  }

  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } 
  );

  return { 
    user: { id: user.id, username: user.username, email: user.email }, 
    token 
  };
};

module.exports = { register, login };