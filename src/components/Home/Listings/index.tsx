"use client";

import SectionTitle from "@/components/Common/SectionTitle";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type ListingItem = {
  id: string;
  title: string;
  brand?: string;
  model?: string;
  price?: number | null;
  images: string[];
  status: string;
};

type CategoryData = {
  id: string;
  table: string;
  urlType: string;
  icon: string;
  items: ListingItem[];
  currentIndex: number;
};

export default function Listings() {
  const t = useTranslations("listings");
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const localePrefix = isEnglish ? "/en" : "";
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const supabase = createClient();

  const [categories, setCategories] = useState<CategoryData[]>([
    { id: "cars", table: "cars", urlType: "cars", icon: "🚗", items: [], currentIndex: 0 },
    { id: "realEstate", table: "real_estate", urlType: "real-estate", icon: "🏠", items: [], currentIndex: 0 },
    { id: "yachts", table: "yachts", urlType: "yachts", icon: "⛵", items: [], currentIndex: 0 },
    { id: "motorcycles", table: "motorcycles", urlType: "motorcycles", icon: "🏍️", items: [], currentIndex: 0 },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 4);
    };
    
    if (isMounted) {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isMounted]);

  useEffect(() => {
    const fetchAllListings = async () => {
      setLoading(true);
      
      const updatedCategories = await Promise.all(
        categories.map(async (category) => {
          const { data, error } = await supabase
            .from(category.table)
            .select("*")
            .eq("status", "published")
            .order("created_at", { ascending: false })
            .limit(12);

          return {
            ...category,
            items: data && !error ? data : [],
          };
        })
      );

      setCategories(updatedCategories);
      setLoading(false);
    };

    if (isMounted) {
      fetchAllListings();
    }
  }, [isMounted]);

  const getSlidePositions = (itemCount: number, pageSize: number) => {
    const maxIndex = Math.max(0, itemCount - pageSize);
    const pageCount = Math.ceil(itemCount / pageSize);

    return Array.from({ length: pageCount }, (_, idx) =>
      Math.min(idx * pageSize, maxIndex)
    );
  };

  const getActiveSlideIndex = (slidePositions: number[], currentIndex: number) => {
    let activeIndex = 0;

    slidePositions.forEach((position, idx) => {
      if (currentIndex >= position) {
        activeIndex = idx;
      }
    });

    return activeIndex;
  };

  const handlePrev = (categoryId: string, slidePositions: number[]) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        const activeSlideIndex = getActiveSlideIndex(slidePositions, cat.currentIndex);
        const previousIndex = Math.max(activeSlideIndex - 1, 0);

        return { ...cat, currentIndex: slidePositions[previousIndex] ?? 0 };
      }
      return cat;
    }));
  };

  const handleNext = (categoryId: string, slidePositions: number[]) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        const activeSlideIndex = getActiveSlideIndex(slidePositions, cat.currentIndex);
        const nextIndex = Math.min(activeSlideIndex + 1, slidePositions.length - 1);

        return {
          ...cat,
          currentIndex: slidePositions[nextIndex] ?? cat.currentIndex,
        };
      }
      return cat;
    }));
  };

  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <section className="pt-14 sm:pt-20 lg:pt-[130px]">
        <div className="px-4 xl:container">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {categories
        .filter((category) => category.items.length > 0)
        .map((category) => {
        const slidePositions = getSlidePositions(category.items.length, visibleCount);
        const activeSlideIndex = getActiveSlideIndex(
          slidePositions,
          category.currentIndex
        );
        const visibleItems = category.items.slice(category.currentIndex, category.currentIndex + visibleCount);

        return (
          <section key={category.id} id={`listings-${category.id}`} className="pt-14 sm:pt-20 lg:pt-[130px]">
            <div className="px-6 xl:container">
              {/* Section Header */}
              <div className="relative mx-auto mb-12 max-w-[620px] pt-6 text-center md:mb-16 lg:pt-16">
                <span className="title flex items-center justify-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  {t(`sections.${category.id}.tag`)}
                </span>
                <h2 className="mb-5 font-heading text-3xl font-semibold text-dark dark:text-white sm:text-4xl md:text-[50px] md:leading-[60px]">
                  {t(`sections.${category.id}.title`)}
                </h2>
                <p className="text-base text-dark-text">
                  {t(`sections.${category.id}.description`)}
                </p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`${localePrefix}/listings/${category.urlType}/${item.id}`}
                    className="group block overflow-hidden rounded-xl border border-stroke bg-white shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-white">
                      {item.images && item.images.length > 0 ? (
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-contain p-4 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-dark-text">
                          <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-semibold text-dark dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      {item.brand && item.model && (
                        <p className="text-dark-text text-sm mb-3">
                          {item.brand} {item.model}
                        </p>
                      )}
                      <span className="block w-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white py-2.5 rounded-none font-medium transition-all duration-300 text-center">
                        {t("viewDetails")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Navigation & Dots */}
              <div className="flex items-center justify-center gap-6 mt-10">
                {/* Previous Button */}
                <button
                  onClick={() => handlePrev(category.id, slidePositions)}
                  disabled={activeSlideIndex === 0}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeSlideIndex === 0
                      ? "cursor-not-allowed bg-stroke/60 text-dark-text opacity-50"
                      : "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25"
                  }`}
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dots Indicator */}
                {slidePositions.length > 1 && (
                  <div className="flex items-center gap-2">
                    {slidePositions.map((position, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCategories(prev => prev.map(cat => 
                          cat.id === category.id ? { ...cat, currentIndex: position } : cat
                        ))}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeSlideIndex === idx
                            ? "bg-accent w-8"
                            : "w-2.5 bg-stroke hover:bg-dark/20"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Next Button */}
                <button
                  onClick={() => handleNext(category.id, slidePositions)}
                  disabled={activeSlideIndex >= slidePositions.length - 1}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeSlideIndex >= slidePositions.length - 1
                      ? "cursor-not-allowed bg-stroke/60 text-dark-text opacity-50"
                      : "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25"
                  }`}
                  aria-label="Next"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
