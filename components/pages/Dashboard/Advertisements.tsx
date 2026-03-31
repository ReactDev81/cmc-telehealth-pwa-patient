"use client";

import { CustomAvatar } from "@/components/custom/custom-avatar";
import { DashboardCarousel } from "@/components/pages/Dashboard/dashboard-carousel";
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
  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 bg-[#103228] w-full py-6 px-4 md:px-8 rounded-xl flex flex-col shadow-sm max-w-full overflow-hidden">
      <h3 className="text-lg md:text-xl font-semibold text-white mb-6">
        Safe & Advanced Surgical Care
      </h3>

      <DashboardCarousel
        items={ads}
        contentClassName="-ml-4 md:-ml-6 py-4 px-1"
        basisClassName="pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3"
        dotClassName="bg-white/50 opacity-60 hover:bg-white/80 h-1.5"
        activeDotClassName="bg-white opacity-100 h-1.5"
        renderItem={(ad) => (
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
        )}
      />
    </section>
  );
}
