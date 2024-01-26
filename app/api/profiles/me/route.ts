import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get('language') || 'en';

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/profile/get?language=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    const profile = {
      bio: data.data.MultilangDescr[
        locale.charAt(0).toUpperCase() + locale.slice(1)
      ],
      hashtags: data.data.Hashtags.map((tag: any) => tag.Hashtag),
      cities: data.data.City.map((city: any) => {
        return { id: city.ID, hex: city.Hex, name: city.Translations[0].Name };
      }),
      categories: data.data.Guilds.map((guild: any) => {
        return {
          id: guild.ID,
          hex: guild.Hex,
          name: guild.Translations[0].Name,
        };
      }),
      gallery: data.data.photos[0].files.map((file: any) => file.path),
      additionalinfo:
        data.data.MultilangAdditional[
          locale.charAt(0).toUpperCase() + locale.slice(1)
        ],
    };

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
