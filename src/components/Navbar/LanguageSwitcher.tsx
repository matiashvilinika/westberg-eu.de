"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Determine current locale from pathname
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'de';

  const switchTo = (nextLocale: string) => {
    if (nextLocale === currentLocale) return;
    
    startTransition(() => {
      if (nextLocale === 'de') {
        // German: remove /en prefix if present
        const newPath = pathname.replace(/^\/en/, '') || '/';
        router.push(newPath);
      } else {
        // English: add /en prefix
        const newPath = `/en${pathname.replace(/^\/en/, '')}`;
        router.push(newPath);
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        aria-label="Deutsch"
        onClick={() => switchTo("de")}
        disabled={isPending}
        className={`font-heading text-sm bg-transparent ${currentLocale === "de" ? "text-accent" : "text-dark-text hover:text-accent dark:text-white"}`}
      >
        DE
      </button>
      <span className="text-dark-text dark:text-white">|</span>
      <button
        aria-label="English"
        onClick={() => switchTo("en")}
        disabled={isPending}
        className={`font-heading text-sm bg-transparent ${currentLocale === "en" ? "text-accent" : "text-dark-text hover:text-accent dark:text-white"}`}
      >
        EN
      </button>
    </div>
  );
}


