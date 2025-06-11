import { jwtDecode, JwtPayload } from "jwt-decode";


export function decodeJwt(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}