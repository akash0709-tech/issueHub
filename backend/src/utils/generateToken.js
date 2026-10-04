import jwt from 'jsonwebtoken'

export const AUTH_COOKIE = 'campusfix_token'
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000

export function signAuthToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )
}

export function setAuthCookie(response, token) {
  response.cookie(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export function clearAuthCookie(response) {
  response.clearCookie(AUTH_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}
