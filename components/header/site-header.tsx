import { MainNav } from '@/components/header/main-nav';
import { siteConfig } from '@/config/site';

import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { useLocale, useTranslations } from 'next-intl';
import { MobileMenu } from './mobile-menu';
import { RightNav } from './right-nav';

async function getData(locale: string) {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/users/me?language=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

export async function SiteHeader() {
  const t = useTranslations('main');
  const locale = useLocale();

  const data = await getData(locale);

  return (
    <header className={`bg-h sticky top-0 z-40 w-full bg-background`}>
      <div className='border-gardient-h relative top-[80px] w-full'></div>
      <div className='flex h-20 items-center space-x-4 px-4 sm:justify-between sm:space-x-0 md:px-8'>
        <MainNav items={siteConfig.mainNav} />
        <RightNav
          user={
            data
              ? {
                  email: data?.data?.user?.email,
                  avatar: data?.data?.user?.photo,
                  username: data?.data?.user?.name,
                }
              : null
          }
        />
        <MobileMenu
          user={
            data
              ? {
                  email: data.data.user.email,
                  avatar: data.data.user.photo,
                  username: data.data.user.name,
                }
              : null
          }
        />
      </div>
    </header>
  );
}

export default SiteHeader;
