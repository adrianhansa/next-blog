import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function generateToken(res, statusCode, user) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  if (!token) return res.status(400).json({ message: 'Token not generated' });
  const serialized = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development' && true,
    sameSite: true,
    maxAge: 24 * 60 * 60 * 30,
    path: '/',
  });
  res
    .status(statusCode)
    .setHeader('Set-Cookie', serialized)
    .json({ username: user.userName, id: user._id, email: user.email });
}
