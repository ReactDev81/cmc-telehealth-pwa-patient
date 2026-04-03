"use client";

import { CustomAvatar } from "@/components/custom/custom-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { AvailableDoctor } from "@/types/home";
import { ArrowRight, Star } from "lucide-react";
import { DashboardCarousel } from "@/components/pages/Dashboard/dashboard-carousel";
import { useRouter } from "next/navigation";

interface AvailableDoctorsProps {
  doctors: AvailableDoctor[];
  onBookNow: (doctorId: string) => void;
  onShowAll: () => void;
}

export function AvailableDoctors({
  doctors,
  onBookNow,
  onShowAll,
}: AvailableDoctorsProps) {
  const useCarousel = Array.isArray(doctors) && doctors.length > 3;
  const router = useRouter();

  if (!doctors || doctors.length === 0) {
    return null;
  }

  // Reusable Doctor Card Component
  const DoctorCardComponent = ({ doc }: { doc: AvailableDoctor }) => (
    <Card className="rounded-2xl sm:rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group flex flex-col overflow-hidden h-full">
      <CardHeader className="pb-0 flex flex-row items-start gap-3 sm:gap-4 bg-muted/10 rounded-t-2xl sm:rounded-t-3xl p-4 sm:p-6">
        <CustomAvatar
          src={doc.avatar}
          radius="lg"
          className="w-14 h-14 sm:w-[76px] sm:h-[76px] shrink-0"
        />
        <div className="flex flex-col justify-center flex-1 min-w-0">
          {/* Name and Rating in same row */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-headline font-bold text-base sm:text-xl text-foreground leading-tight break-words flex-1">
              {doc.name}
            </h3>
            {typeof doc.rating === "number" && doc.rating > 0 && (
              <div className="flex items-center gap-1 bg-feature-green/30 rounded-[8px] px-2 py-1 flex-shrink-0">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-primary/70 fill-current" />
                <span className="text-xs font-bold text-foreground/80">
                  {doc.rating}
                </span>
              </div>
            )}
          </div>

          {/* Specialty */}
          <p className="text-primary/80 font-semibold text-xs sm:text-sm mt-0.5 sm:mt-1 truncate">
            {Array.isArray(doc.speciality) && doc.speciality.length > 0
              ? doc.speciality[0]
              : ""}
          </p>

          {/* Experience & Languages */}
          <div className="flex flex-wrap gap-2 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground font-medium mt-1.5 sm:mt-2 pt-1.5 sm:pt-0 border-t border-border/20 sm:border-t-0">
            <span>Exp: {doc.years_experience} yrs</span>
            {Array.isArray(doc.languages_known) && doc.languages_known.length > 0 && (
              <span>Lang: {doc.languages_known.join(", ")}</span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-3 sm:pt-5 mt-auto">
        <div className="flex flex-row gap-4 sm:gap-8">
          <div className="flex-1">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1">
              Consultation Type
            </p>
            <p className="text-xs sm:text-sm font-bold text-emerald-600">
              {doc.consultation_type}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1">
              Consultation Fee
            </p>
            <p className="text-base sm:text-lg font-bold text-primary">
              ₹{doc.consultation_fee}
            </p>
          </div>
        </div>
        <div className="pt-4 sm:pt-5">
          <Button
            onClick={() => router.push(`/find-doctors/${doc.id}`)}
            className="w-full py-3 sm:py-6 text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-md"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section >
      <div className="flex flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-headline tracking-tight">
          Available Doctors
        </h2>
        <Button
          variant="ghost"
          onClick={onShowAll}
          className="text-primary font-bold hover:underline flex items-center gap-1 text-sm sm:text-base shrink-0"
        >
          Show All
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {useCarousel ? (
        <DashboardCarousel
          items={doctors}
          renderItem={(doc) => <DoctorCardComponent key={doc.id} doc={doc} />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {doctors.map((doc) => (
            <DoctorCardComponent key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </section>
  );
}