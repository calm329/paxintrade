import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  const slug = req.nextUrl.searchParams.get('slug');

  const locale = req.nextUrl.searchParams.get('language') || 'en';

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/blog/${slug}?language=${locale}`,
      {
        headers: {
          name: id || '',
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const blogData = await res.json();

    const voteRes = await fetch(
      `${process.env.API_URL}/api/blog/allvotes/${blogData.data[0].id}`
    );

    if (!voteRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const voteData = await voteRes.json();

    if (voteData.status !== 'success') {
      throw new Error('Failed to fetch data');
    }

    const blog = {
      id: blogData.data[0].id,
      title:
        blogData.data[0].multilangtitle[
          locale.charAt(0).toUpperCase() + locale.slice(1)
        ],
      description:
        blogData.data[0].multilangdescr[
          locale.charAt(0).toUpperCase() + locale.slice(1)
        ],
      content:
        blogData.data[0].multilangcontent[
          locale.charAt(0).toUpperCase() + locale.slice(1)
        ],
      review: {
        views: blogData.data[0].views,
        upvotes: voteData.votes.filter((item: any) => item?.IsUP).length || 0,
        downvotes:
          voteData.votes.filter((item: any) => !item?.IsUP).length || 0,
      },
      gallery: blogData.data[0].photos[0].files.map((file: any) => {
        return {
          original: `https://proxy.paxintrade.com/400/https://img.paxintrade.com/${file.path}`,
          thumbnail: `https://proxy.paxintrade.com/50/https://img.paxintrade.com/${file.path}`,
        };
      }),
      author: {
        username: blogData.data[0].user.name,
        avatar: `https://proxy.paxintrade.com/100/https://img.paxintrade.com/${blogData.data[0].user.photo}`,
        bio: blogData.data[0].user.role,
      },
      price: blogData.data[0].total,
      qrcode: blogData.data[0].slug,
      hashtags: blogData.data[0].hashtags,
      categories: blogData.data[0].catygory.map(
        (catygory: any) => catygory.name
      ),
      cities: blogData.data[0].city.map((city: any) => city.name),
      countrycode: blogData.data[0].lang,
    };

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
