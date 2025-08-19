import { NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

export async function DELETE(req: Request, { params }: { params: { auctionId: string } }) {
  try {
    const { auctionId } = params;

    if (!auctionId) {
      return NextResponse.json({ error: 'auctionId is required' }, { status: 400 });
    }

    const { data, error } = await adminClient.from('auction').delete().eq('auction_id', auctionId);

    if (error) {
      console.error('Error deleting auction:', error);
      return NextResponse.json({ error: 'Failed to delete auction' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Auction deleted successfully', data }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
