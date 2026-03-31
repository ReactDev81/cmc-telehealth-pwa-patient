

import { Advertisements } from "@/components/pages/Dashboard/Advertisements";
import { AvailableDoctors } from "@/components/pages/Dashboard/AvailableDoctors";
import { QuickLinks } from "@/components/pages/Dashboard/QuickLinks";
import { TestimonialsCarousel } from "@/components/pages/Dashboard/TestimonialsCarousel";
import type { Appointment } from "@/components/pages/Dashboard/UpcomingAppointments";
import { UpcomingAppointments } from "@/components/pages/Dashboard/UpcomingAppointments";
import { useAuth } from "@/context/userContext";
import { usePatientHome } from "@/queries/usePatientHome";
import { Button } from "@base-ui/react";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

type Page = string;

export default function Home() {
  const { login, user } = useAuth();
  const [page, setPage] = useState<Page | null>(null);
  const { data, isLoading, isError } = usePatientHome();
  const homeData = data?.data;
  console.log(user);
  // Map API upcoming_appointments → Appointment shape for UpcomingAppointments component
  const appointments: Appointment[] = (
    homeData?.upcoming_appointments ?? []
  ).map((appt) => ({
    id: appt.appointment_id,
    doctorId: appt.doctor.user_id,
    doctorName: appt.doctor.name,
    doctorImage: appt.doctor.avatar,
    date: appt.appointment_date_formatted,
    time: appt.appointment_time_formatted,
    type: appt.consultation_type as "video" | "in-person" | string,
    typeLabel: appt.consultation_type_label,
    doctor: {
      specialty: appt.doctor.department,
      experience: appt.doctor.years_experience,
      languages: appt.doctor.languages_known,
    },
  }));

  // Map API advertisements → Advertisement shape
  const advertisements = (homeData?.advertisements ?? []).map((ad) => ({
    id: ad.id,
    title: ad.title,
    description: ad.description,
    image: ad.image,
    link: ad.link,
  }));

  // Map API patient_reviews → Testimonial shape for TestimonialsCarousel
  const testimonials = (homeData?.patient_reviews ?? []).map((r) => ({
    id: r.id,
    name: r.patient_name,
    location: r.patient_location,
    patientImage: r.patient_image,
    rating: r.rating,
    subject: r.title,
    feedback: r.content,
    reviewCount: r.total_reviews,
    doctorName: r.doctor_name,
    doctorImage: r.doctor_avatar,
    time: r.created_at,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !homeData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-destructive font-semibold">
          Failed to load dashboard. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="md:text-5xl font-extrabold tracking-tight text-primary mb-2  pt-5 font-headline">
            Welcome back{user?.first_name || user?.last_name ? "," : ""}{" "}
            {user?.first_name ?? ""} {user?.last_name ?? ""}
          </h1>
          <p className="text-on-surface-variant text-lg">
            Your health summary is looking stable today.
          </p>
        </div>
        <Button
          onClick={() => setPage && setPage("find-doctor")}
          className="py-3 px-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Book Appointment
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <UpcomingAppointments
            appointments={appointments}
            onViewAll={() => setPage && setPage("my-appointments")}
            onStartCall={(id) => setPage && setPage("live-session")}
            onBookFirst={() => setPage && setPage("find-doctor")}
          />
        </div>
        <div className="lg:col-span-4">
          <QuickLinks
            reportSummary="Blood Work Result: Normal"
            prescriptionSummary="2 Active medications • Refill ready"
            onViewReports={() => setPage && setPage("medical-records")}
            onManageRefills={() => setPage && setPage("prescriptions")}
          />
        </div>
      </div>

      <AvailableDoctors
        doctors={homeData.available_doctors}
        onBookNow={(doctorId: string) => {
          setPage && setPage("live-session");
        }}
        onShowAll={() => {
          setPage && setPage("all-doctors");
        }}
      />

      {/* Advertisements */}
      <Advertisements ads={advertisements} />

      {/* Testimonials */}
      <TestimonialsCarousel testimonials={testimonials} />
    </div>
  );
}
