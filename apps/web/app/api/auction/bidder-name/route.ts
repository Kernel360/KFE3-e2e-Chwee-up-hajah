import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bidderId = searchParams.get('bidderId');
  if (!bidderId) {
    return NextResponse.json({ error: 'bidderId is required' }, { status: 400 });
  }
  const { data, error } = await adminClient
    .from('user')
    .select('username')
    .eq('user_id', bidderId)
    .single();
  if (error || !data) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ username: data.username });
}
