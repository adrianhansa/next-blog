import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import generateToken from '../../../utils/generateToken';

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
    generateToken(res, 200, user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
