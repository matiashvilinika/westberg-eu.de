import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'de'] as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  // Type assertion: after the check, locale is definitely a string
  const validLocale: string = locale as string;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
    timeZone: 'Europe/Berlin'
  };
});



