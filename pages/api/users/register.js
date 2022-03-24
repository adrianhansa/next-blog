import User from '../../../models/User';
import dbConnect from '../../../utils/db';
import bcrypt from 'bcryptjs';
import generateToken from '../../../utils/generateToken';

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
    generateToken(res, 200, user);
  } else {
    return res.status(500).json({ message: 'Invalid method' });
  }
}
