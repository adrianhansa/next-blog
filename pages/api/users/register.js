import User from '../../../models/User';
import dbConnect from '../../../utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  dbConnect();
  if (req.method === 'POST') {
    const { email, password, passwordVerify, userName } = req.body;
    if (!email || !password || !passwordVerify || !userName) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: 'The password must contain at least 6 characters.' });
    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ message: 'The two passwords do not match.' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: 'User already registered. Please login.' });
    const user = await User.create({
      email,
      password: hashedPassword,
      userName,
    });
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.userName },
      process.env.JWT_SECRET
    );
    const serialized = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.status(200).setHeader('Set-Cookie', serialized).json(user);
  } else {
    return res.status(500).json({ message: 'Invalid method' });
  }
}
