"use client";

import { CustomAvatar } from "@/components/custom/custom-avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export interface Testimonial {
  id: string | number;
  name: string;
  age?: number;
  location: string;
  rating?: number;
  subject: string;
  feedback: string;
  reviewCount: number;
  doctorName: string;
  doctorImage: string;
  time: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
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

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-8 w-full max-w-full overflow-hidden">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-primary font-headline tracking-tight mb-2">
          Here's what our satisfied customers are saying...
        </h2>
        <p className="text-on-surface-variant text-lg">
          See what your patients are saying about their experiences with you.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((t) => (
            <CarouselItem
              key={t.id}
              className="pl-4 basis-[90%] md:basis-1/2 lg:basis-[400px]"
            >
              <div className="h-full bg-surface-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-4">
                    <CustomAvatar
                      src={t.patientImage}
                      radius="full"
                      size="xl"
                    />
                    <div>
                      <h4 className="font-bold text-on-surface font-headline">
                        {t.name}
                      </h4>
                      <p className="text-xs text-on-surface-variant font-medium">
                        {t.age ? `${t.age} Years, ` : ""}
                        {t.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-on-surface-variant font-bold">
                    {t.time}
                  </span>
                </div>

                <div className="mb-4 flex-grow">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < (t.rating || 5)
                            ? "text-yellow-400 fill-current"
                            : "text-yellow-400/80"
                          }`}
                      />
                    ))}
                  </div>
                  <h5 className="font-bold italic text-on-surface mb-2">
                    "{t.subject}"
                  </h5>
                  <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-4">
                    {t.feedback}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                  <p className="text-xs font-bold text-on-surface-variant">
                    {(t.reviewCount > 5 ? "5+" : t.reviewCount) +
                      " Reviews for " +
                      t.doctorName}
                  </p>
                  <CustomAvatar radius="full" size="xl" src={t.doctorImage} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-4" : "bg-primary/20"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
