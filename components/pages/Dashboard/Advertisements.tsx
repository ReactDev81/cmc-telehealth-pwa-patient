"use client";

import { CustomAvatar } from "@/components/custom/custom-avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface AdvertisementsProps {
  ads: Advertisement[];
}

export function Advertisements({ ads }: AdvertisementsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    api.on("reInit", () => {
      setScrollSnaps(api.scrollSnapList());
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 bg-[#103228] w-full py-6 px-4 md:px-8 rounded-xl flex flex-col shadow-sm max-w-full overflow-hidden">
      <h3 className="text-lg md:text-xl font-semibold text-white mb-6">
        Safe & Advanced Surgical Care
      </h3>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {ads.map((ad) => (
            <CarouselItem
              key={ad.id}
              className="pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3"
            >
              <div className="bg-white rounded-3xl p-5 flex flex-col justify-between h-full min-h-[280px] shadow group transition-transform duration-150  border border-outline-variant/10">
                <div className="flex-1 mb-3">
                  <h4 className="font-semibold text-base md:text-lg text-gray-900 mb-2">
                    {ad.title}
                  </h4>
                  <div
                    className="mb-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line [&>p]:mb-2 [&>p]:last:mb-0"
                    dangerouslySetInnerHTML={{ __html: ad.description }}
                  />
                </div>
                <div className="flex w-full items-end justify-between gap-2 mt-auto">
                  {ad.link ? (
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-gray-300 text-[#103228] px-4 py-1.5 text-sm rounded-md font-medium hover:bg-gray-100 transition-colors duration-100 shrink-0"
                    >
                      Book Appointment
                    </a>
                  ) : (
                    <span className="bg-gray-300 text-gray-700 px-4 py-1.5 text-sm rounded-md font-medium opacity-60 cursor-default shrink-0">
                      Book Appointment
                    </span>
                  )}
                  <CustomAvatar
                    src={ad.image}
                    radius="lg"
                    className="w-[76px] h-[76px]"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dynamic Pager dots based on carousel scroll snaps */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-white opacity-100"
                  : "w-2 bg-white/50 opacity-60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
