import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

export type JwtPayload = {
  sub: string; // alumni _id
  email: string;
};

export function signToken(payload: JwtPayload, opts: jwt.SignOptions = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d", ...opts });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function setAuthCookie(token: string) {
  cookies().set("ac_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie() {
  cookies().set("ac_session", "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
}

export function getAuthPayload(): JwtPayload | null {
  const cookie = cookies().get("ac_session");
  if (!cookie?.value) return null;
  try {
    return verifyToken(cookie.value);
  } catch {
    return null;
  }
}