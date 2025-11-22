import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'de'] as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  // Type assertion: after the check, locale is definitely a string
  const validLocale: string = locale as string;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
    timeZone: 'Europe/Berlin'
  };
});

