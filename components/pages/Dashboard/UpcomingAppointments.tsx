import { CustomAvatar } from "@/components/custom/custom-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, Video } from "lucide-react";

export interface AppointmentDoctor {
  specialty?: string;
  experience?: string;
  languages?: string[];
}

export interface Appointment {
  id: string | number;
  doctorId: string | number;
  doctorName: string;
  doctorImage: string;
  date: string;
  time: string;
  type: "video" | "in-person" | string;
  typeLabel: string;
  doctor?: AppointmentDoctor;
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onViewAll: () => void;
  onStartCall: (appointmentId: string | number) => void;
  onBookFirst: () => void;
}

function AppointmentCard({
  appointment,
  onStartCall,
  onViewAll,
  showViewAll,
}: {
  appointment: Appointment;
  onStartCall: (id: string | number) => void;
  onViewAll: () => void;
  showViewAll: boolean;
}) {
  const doctor = appointment.doctor;

  // Handler to open the appointment screen in a new tab
  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/appointments", "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="relative overflow-hidden bg-primary border-0 rounded-3xl h-full min-h-[320px] flex flex-col justify-between shadow-xl p-8">
      <CardDescription className="relative z-10 flex flex-col justify-between  p-0 gap-8">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="bg-white/10 text-feature-green border-0 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          >
            Upcoming Session
          </Badge>
          {showViewAll && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs font-bold  text-feature-green hover:underline hover:text-feature-green flex items-center gap-1 p-0 h-auto px-3 py-1 hover:bg-transparent"
            >
              <a
                href="/appointments"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleViewAll}
              >
                View All
                <ArrowRight className="w-3 h-3" />
              </a>
            </Button>
          )}
        </div>

        {/* Doctor info */}
        <div className="flex items-start gap-5">
          <CustomAvatar
            src={appointment.doctorImage}
            radius="lg"
            className="w-[76px] h-[76px] border-2 border-white/30 shrink-0"
          />
          <div>
            <h3 className="text-2xl font-bold text-white font-headline leading-tight mb-1">
              {appointment.doctorName}
            </h3>
            <p className="text-base mb-3  text-feature-green/90 font-medium">
              {doctor?.specialty || "Specialist"}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-feature-green/90 font-medium">
              {doctor?.experience && (
                <span className="bg-white/10 p-1 px-2 rounded-md">
                  Exp: {doctor.experience}
                </span>
              )}
              {doctor?.languages && doctor.languages.length > 0 && (
                <span className="bg-white/10 p-1 px-2 rounded-md">
                  Lang: {doctor.languages.join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardDescription>
      <CardContent className="p-0">
        {/* Footer: Date/Time/Type + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5 p-0">
          <div className="flex flex-wrap items-center gap-6">
            {/* Date */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-lg">
                <Calendar className="w-5 h-5 text-feature-green/90" />
              </div>
              <div>
                <p className="text-sm text-white/60 font-bold uppercase tracking-widest">
                  Date
                </p>
                <p className="text-white font-semibold text-sm">
                  {appointment.date}
                </p>
              </div>
            </div>
            {/* Time */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Clock className="w-5 h-5 text-feature-green/90" />
              </div>
              <div>
                <p className="text-sm text-white/60 font-bold uppercase tracking-widest">
                  Time
                </p>
                <p className="text-white font-semibold text-sm">
                  {appointment.time}
                </p>
              </div>
            </div>
            {/* Type */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                {appointment.type === "video" ? (
                  <Video className="w-5 h-5 text-feature-green/90" />
                ) : (
                  <Calendar className="w-5 h-5 text-feature-green/90" />
                )}
              </div>
              <div>
                <p className="text-sm text-white/60 font-bold uppercase tracking-widest">
                  Type
                </p>
                <p className="text-white font-semibold text-sm capitalize">
                  {appointment.typeLabel} Consultation
                </p>
              </div>
            </div>
          </div>
          {appointment.type === "video" && (
            <Button
              onClick={() => onStartCall(appointment.id)}
              className="w-full md:w-auto px-6 py-5 bg-white text-primary hover:bg-white/90 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 shrink-0"
            >
              <Video className="w-5 h-5" />
              Start Video Call
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function UpcomingAppointments({
  appointments,
  onViewAll,
  onStartCall,
  onBookFirst,
}: UpcomingAppointmentsProps) {
  // Create a handler for opening appointments in new tab
  const handleViewAll = () => {
    window.open("/appointments", "_blank", "noopener,noreferrer");
    if (onViewAll) onViewAll();
  };

  // No appointments
  if (!appointments || appointments.length === 0) {
    return (
      <Card className="rounded-3xl border border-border/50 h-full min-h-[320px] flex flex-col items-center justify-center text-center p-8 shadow-sm">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2 font-headline">
          No Upcoming Sessions
        </h3>
        <p className="text-muted-foreground mb-6">
          You don&apos;t have any appointments scheduled at the moment.
        </p>
        <Button
          onClick={onBookFirst}
          className="px-6 py-5 bg-primary text-primary-foreground rounded-xl font-bold shadow-sm hover:bg-primary/90 transition-all"
        >
          Book Your First Appointment
        </Button>
      </Card>
    );
  }

  // Show only one upcoming appointment (the most recent/first in list)
  return (
    <AppointmentCard
      appointment={appointments[0]}
      onStartCall={onStartCall}
      onViewAll={handleViewAll}
      showViewAll={true}
    />
  );
}
