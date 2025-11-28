"use client";

import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Brands() {
  const t = useTranslations("brands");

  return (
    <section className='pt-14 sm:pt-20 lg:pt-24'>
      <div className='px-4 xl:container'>
        <SectionTitle
          title={t("title")}
          paragraph={t("paragraph")}
        />
        <div className='border-b pb-24 dark:border-[#2E333D]'>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='flex flex-wrap items-center justify-center'>
                <div className='mx-4 flex w-[300px] items-center justify-center py-5 2xl:w-[360px]'>
                  <Image
                    src='/images/brands/ferrari.svg'
                    alt='Ferrari'
                    className='h-20 w-full object-contain'
                    width={360}
                    height={80}
                  />
                </div>

                <div className='mx-4 flex w-[300px] items-center justify-center py-5 2xl:w-[360px]'>
                  <Image
                    src='/images/brands/lamborghini.svg'
                    alt='Lamborghini'
                    className='h-20 w-full object-contain'
                    width={360}
                    height={80}
                  />
                </div>

                <div className='mx-4 flex w-[300px] items-center justify-center py-5 2xl:w-[360px]'>
                  <Image
                    src='/images/brands/landrover.svg'
                    alt='Land Rover'
                    className='h-20 w-full object-contain'
                    width={360}
                    height={80}
                  />
                </div>

                <div className='mx-4 flex w-[300px] items-center justify-center py-5 2xl:w-[360px]'>
                  <Image
                    src='/images/brands/mercedes-benz.svg'
                    alt='Mercedes-Benz'
                    className='h-20 w-full object-contain'
                    width={360}
                    height={80}
                  />
                </div>

                <div className='mx-4 flex w-[300px] items-center justify-center py-5 2xl:w-[360px]'>
                  <Image
                    src='/images/brands/porsche.svg'
                    alt='Porsche'
                    className='h-20 w-full object-contain'
                    width={360}
                    height={80}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
