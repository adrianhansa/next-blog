import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenVerify) return res.status(403).json({ message: 'Invalid token' });
    const user = await User.findById(tokenVerify.id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
