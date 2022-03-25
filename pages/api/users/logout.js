/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie';

export default async function (req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: 'You are not logged in' });
  const serialized = serialize('token', null, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: -1,
    secure: process.env.NODE_ENV !== 'development' && true,
  });
  res.status(200).setHeader('Set-Cookie', serialized).send();
}
