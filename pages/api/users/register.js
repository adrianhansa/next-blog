import User from '../../../models/User';
import dbConnect from '../../../utils/db';

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
