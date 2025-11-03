import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  const session = await encrypt({ userId, expires })

  cookies().set('session', session, { expires, httpOnly: true })
}

export async function getSession() {
  const sessionCookie = cookies().get('session')?.value
  if (!sessionCookie) return null

  const session = await decrypt(sessionCookie);
  if (!session) return null;

  if (new Date(session.expires) < new Date()) {
    return null;
  }
  
  return session;
}

export async function deleteSession() {
  cookies().set('session', '', { expires: new Date(0) })
}
