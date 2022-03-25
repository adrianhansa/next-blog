/* eslint-disable import/no-anonymous-default-export */
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export default function middleware(req) {
  const token = req.cookies.token;
  const url = req.url;
  if (url.includes('/login')) return NextResponse.next();
  // console.log(req.cookies.token);
  const user = verify(token, process.env.JWT_SECRET);
  console.log(user);

  return NextResponse.next();
}
