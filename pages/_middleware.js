/* eslint-disable import/no-anonymous-default-export */
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export default function middleware(req) {
  const token = req.cookies.token;
  const url = req.url;
  console.log(token, 'From middleware');
  if (
    url.includes(`http://localhost:3000/auth/profile`) ||
    url.includes(`http://localhost:3000/admin`)
  ) {
    if (token) {
      const user = verify(token, process.env.JWT_SECRET);
      console.log(user);
      NextResponse.next();
    } else {
      return NextResponse.redirect('/auth/login');
    }
  }
}
