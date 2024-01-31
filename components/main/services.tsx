import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { SectionBadge } from '../common/section-badge';
import { SectionDescription } from '../common/section-description';
import { SectionTitle } from '../common/section-title';

const services = [
  {
    title: 'instagram',
    description: 'instagram_description',
    icons: ['instagram'],
  },
  {
    title: 'linkedin',
    description: 'linkedin_description',
    icons: ['linkedin'],
  },
  {
    title: 'zoom',
    description: 'zoom_description',
    icons: ['zoom'],
  },
  {
    title: 'whatsapp_and_facebook',
    description: 'whatsapp_and_facebook_description',
    icons: ['whatsapp', 'fb-color'],
  },
];

function ServiceCard({
  title,
  description,
  icons,
}: {
  title: string;
  description: string;
  icons: string[];
}) {
  return (
    <div className='bg-radial-gradient-2 relative flex w-full max-w-5xl flex-col items-center justify-center rounded-xl p-8'>
      <div className='my-4 flex items-center justify-start gap-4 bg-transparent sm:my-8'>
        {icons.map((icon) => (
          <Image
            key={icon}
            src={`/images/home/${icon}.svg`}
            width={40}
            height={40}
            alt={icon}
            className='size-10'
          />
        ))}
      </div>
      <div className='whitespace-nowrap text-center font-satoshi text-xs font-medium text-white sm:text-lg'>
        {title}
      </div>
      <div className='prose hidden text-center font-satoshi text-sm text-white/70 sm:block'>
        {description}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations('main');

  return (
    <div className='flex flex-col items-center justify-center px-3 pb-[40px] md:pb-[80px]'>
      <SectionBadge>{t('services')}</SectionBadge>
      <SectionTitle className='px-7 leading-[30px]'>
        {t('combination_of_services_in_one_platform')}
      </SectionTitle>
      <SectionDescription className='px-7 leading-[25.15px]'>
        {t('combination_of_services_in_one_platform_description')}
      </SectionDescription>
      <div className='relative mt-10 grid w-full max-w-5xl grid-cols-2 gap-4'>
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            icons={service.icons}
          />
        ))}
        <div className='absolute flex size-full items-center justify-center'>
          <div className='size-24 rounded-full bg-white p-3 dark:bg-black sm:h-36 sm:w-36 sm:p-4'>
            <Image
              src='/logo.svg'
              width={50}
              height={50}
              alt='hero'
              className='m-auto size-full dark:hidden'
            />
            <Image
              src='/logo-white.svg'
              width={50}
              height={50}
              alt='hero'
              className='m-auto hidden size-full dark:block'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
