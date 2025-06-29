import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { users, generateToken } from '@/utils/auth';

const authSchema = z.object({
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = authSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Entrée invalide' }, { status: 400 });
    }

    const user = users.find(u => u.username === body.username && u.password === body.password);
    if (!user) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    const token = generateToken(user.id, user.role);
    return NextResponse.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
