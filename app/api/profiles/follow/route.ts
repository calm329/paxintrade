import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { followerID } = await req.json();

    if (req.headers.get('type') === 'scribe') {
      const res = await fetch(`${process.env.API_URL}/api/followers/scribe/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FollowerID: followerID,
          UserID: session.user?.id,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      return NextResponse.json({ success: true });
    } else {
      const res = await fetch(
        `${process.env.API_URL}/api/followers/unscribe/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FollowerID: followerID,
            UserID: session.user?.id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();

      console.log('============');
      console.log(data);
      console.log('============');

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
