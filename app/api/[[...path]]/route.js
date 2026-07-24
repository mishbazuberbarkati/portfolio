import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, name: 'Mishba Zuber Barkati Portfolio API' });
}

export async function POST() {
  return NextResponse.json({ ok: true });
}
