"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="home" className="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div className="container mx-auto px-5">
        <div className="grid gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-text-secondary">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              {t("badge")}
            </span>
            <h1 className="font-heading mt-8 text-4xl font-semibold leading-[1.1] tracking-tight text-balance text-text-primary sm:text-5xl lg:text-[3.75rem]">
              {t("title")}
            </h1>
            <h2 className="font-heading mt-5 hyphens-auto text-2xl font-medium leading-snug tracking-tight text-text-secondary sm:text-3xl lg:text-[2.25rem]">
              {t("subtitle")}
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-text-secondary">
              {t("description")}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#support"
                className="inline-flex items-center justify-center rounded-none bg-accent px-8 py-4 text-base font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t("cta")}
                <span className="ml-3 inline-flex">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" fill="white" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden ">
              <Image
                src="/images/hero/image-2.webp"
                alt="West Berg Europe hero"
                width={2448}
                height={1790}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[520px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
