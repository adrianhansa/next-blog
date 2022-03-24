import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Both fields are required.' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify)
      return res.status(400).json({ message: 'Invalid email/password.' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const serialized = serialize('token', token, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV !== 'development' && true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.status(200).setHeader('Set-Cookie', serialized).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
