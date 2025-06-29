export const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' },
];

export function generateToken(userId: number, role: string): string {
  return Buffer.from(JSON.stringify({ userId, role, exp: Date.now() + 3600000 })).toString('base64');
}

export function verifyToken(token: string | null): { isValid: boolean; role?: string } {
  if (!token) return { isValid: false };

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    if (decoded.exp < Date.now()) return { isValid: false };
    return { isValid: true, role: decoded.role };
  } catch {
    return { isValid: false };
  }
}
