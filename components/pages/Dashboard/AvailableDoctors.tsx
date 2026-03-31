"use client";

import { CustomAvatar } from "@/components/custom/custom-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { AvailableDoctor } from "@/types/home";
import { ArrowRight, Star } from "lucide-react";
import { DashboardCarousel } from "@/components/pages/Dashboard/dashboard-carousel";
import { useEffect, useState } from "react";

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
  // Enable carousel if more than 3 doctors
  const useCarousel = Array.isArray(doctors) && doctors.length > 3;

  if (!doctors || doctors.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-primary font-headline tracking-tight">
          Available Doctors
        </h2>
        <Button
          variant="ghost"
          onClick={onShowAll}
          className="text-primary font-bold hover:underline flex items-center gap-1"
        >
          Show All
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      {/* If more than 3 doctors, use shared dashboard carousel */}
      {useCarousel ? (
        <DashboardCarousel
          items={doctors}
          renderItem={(doc) => (
            <Card className="rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group flex flex-col overflow-hidden h-full">
              <CardHeader className="pb-0 flex items-center gap-4 bg-muted/10 rounded-t-3xl">
                <CustomAvatar
                  src={doc.avatar}
                  radius="lg"
                  className="w-[76px] h-[76px]"
                />
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="font-headline font-bold text-xl text-foreground leading-tight truncate">
                      {doc.name}
                    </h3>
                    {typeof doc.rating === "number" && doc.rating > 0 && (
                      <div className="flex items-center gap-1 bg-feature-green/30 rounded-[8px] px-2 py-1 flex-shrink-0 ">
                        <Star className="w-4 h-4 text-primary/70 fill-current" />
                        <span className="text-xs font-bold text-foreground/80">
                          {doc.rating}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-primary/80 font-semibold text-sm mb-1 truncate">
                    {Array.isArray(doc.speciality) && doc.speciality.length > 0
                      ? doc.speciality[0]
                      : ""}
                  </p>
                  <div className="flex gap-6 text-xs text-muted-foreground font-medium flex-wrap">
                    <span>Exp: {doc.years_experience} yrs</span>
                    {Array.isArray(doc.languages_known) &&
                      doc.languages_known.length > 0 && (
                        <span>Lang: {doc.languages_known.join(", ")}</span>
                      )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-5 mt-auto pb-0">
                <div className="pt-5 flex gap-8">
                  <div>
                    <p className="text-md uppercase tracking-wider font-bold text-muted-foreground mb-1">
                      Consultation Type
                    </p>
                    <p className="text-sm font-bold text-emerald-600">
                      {doc.consultation_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-md uppercase tracking-wider font-bold text-muted-foreground mb-1">
                      Consultation Fee
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ₹{doc.consultation_fee}
                    </p>
                  </div>
                </div>
                <div className="pt-5 flex gap-8">
                  <Button
                    onClick={() => onBookNow(doc.id)}
                    className="w-full py-6 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-md"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <Card
              key={doc.id}
              className="rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group flex flex-col overflow-hidden"
            >
              <CardHeader className="pb-0 flex items-center gap-4 bg-muted/10 rounded-t-3xl">
                <CustomAvatar
                  src={doc.avatar}
                  radius="lg"
                  className="w-[76px] h-[76px]"
                />
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="font-headline font-bold text-xl text-foreground leading-tight truncate">
                      {doc.name}
                    </h3>
                    {typeof doc.rating === "number" && doc.rating > 0 && (
                      <div className="flex items-center gap-1 bg-feature-green/30 rounded-[8px] px-2 py-1 flex-shrink-0 ">
                        <Star className="w-4 h-4 text-primary/70 fill-current" />
                        <span className="text-xs font-bold text-foreground/80">
                          {doc.rating}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-primary/80 font-semibold text-sm mb-1 truncate">
                    {Array.isArray(doc.speciality) && doc.speciality.length > 0
                      ? doc.speciality[0]
                      : ""}
                  </p>
                  <div className="flex gap-6 text-xs text-muted-foreground font-medium flex-wrap">
                    <span>Exp: {doc.years_experience} yrs</span>
                    {Array.isArray(doc.languages_known) &&
                      doc.languages_known.length > 0 && (
                        <span>Lang: {doc.languages_known.join(", ")}</span>
                      )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-5 mt-auto pb-0">
                <div className="pt-5 flex gap-8">
                  <div>
                    <p className="text-md uppercase tracking-wider font-bold text-muted-foreground mb-1">
                      Consultation Type
                    </p>
                    <p className="text-sm font-bold text-emerald-600">
                      {doc.consultation_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-md uppercase tracking-wider font-bold text-muted-foreground mb-1">
                      Consultation Fee
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ₹{doc.consultation_fee}
                    </p>
                  </div>
                </div>
                <div className="pt-5 flex gap-8">
                  <Button
                    onClick={() => onBookNow(doc.id)}
                    className="w-full py-6 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-md"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
