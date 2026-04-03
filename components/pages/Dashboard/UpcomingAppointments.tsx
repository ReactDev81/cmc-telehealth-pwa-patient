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

  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`/appointments/manage-appointment/${appointment.id}`, "noopener,noreferrer");
  };

  return (
    <Card className="relative overflow-hidden bg-primary border-0 rounded-2xl sm:rounded-3xl h-full flex flex-col justify-between shadow-xl p-4 sm:p-6 md:p-8">
      <CardDescription className="relative z-10 flex flex-col justify-between p-0 gap-4 sm:gap-6 md:gap-8">
        {/* Header row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-white/10 text-feature-green border-0 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 sm:px-3 sm:py-1 rounded-full"
          >
            Upcoming Session
          </Badge>
          {showViewAll && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-feature-green hover:underline hover:text-feature-green flex items-center gap-1 p-0 h-auto px-2 py-1 hover:bg-transparent"
            >
              <a
                href={`/appointments/manage-appointment/${appointment.id}`}
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

        {/* Doctor info - Responsive */}
        <div className="flex flex-row items-start sm:items-center gap-4 sm:gap-5">
          <CustomAvatar
            src={appointment.doctorImage}
            radius="lg"
            className="w-16 h-16 sm:w-[76px] sm:h-[76px] border-2 border-white/30 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-headline leading-tight mb-1 break-words">
              {appointment.doctorName}
            </h3>
            <p className="text-sm sm:text-base mb-2 sm:mb-3 text-feature-green/90 font-medium">
              {doctor?.specialty || "Specialist"}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-feature-green/90 font-medium">
              {doctor?.experience && (
                <span className="bg-white/10 p-1 px-2 rounded-md text-[10px] sm:text-xs">
                  Exp: {doctor.experience}
                </span>
              )}
              {doctor?.languages && doctor.languages.length > 0 && (
                <span className="bg-white/10 p-1 px-2 rounded-md text-[10px] sm:text-xs">
                  Lang: {doctor.languages.join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardDescription>
      
      <CardContent className="p-0 mt-4 sm:mt-6">
        {/* Footer: Date/Time/Type + CTA - Responsive */}
        <div className="flex flex-col gap-4 sm:gap-5 p-0">
          {/* Info chips - Horizontal scroll on mobile */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 overflow-x-auto pb-2 sm:pb-0">
            {/* Date */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="p-1.5 sm:p-2.5 bg-white/10 rounded-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-feature-green/90" />
              </div>
              <div>
                <p className="text-[10px] sm:text-sm text-white/60 font-bold uppercase tracking-widest">
                  Date
                </p>
                <p className="text-white font-semibold text-xs sm:text-sm">
                  {appointment.date}
                </p>
              </div>
            </div>
            
            {/* Time */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-feature-green/90" />
              </div>
              <div>
                <p className="text-[10px] sm:text-sm text-white/60 font-bold uppercase tracking-widest">
                  Time
                </p>
                <p className="text-white font-semibold text-xs sm:text-sm">
                  {appointment.time}
                </p>
              </div>
            </div>
            
            {/* Type */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg">
                {appointment.type === "video" ? (
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-feature-green/90" />
                ) : (
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-feature-green/90" />
                )}
              </div>
              <div>
                <p className="text-[10px] sm:text-sm text-white/60 font-bold uppercase tracking-widest">
                  Type
                </p>
                <p className="text-white font-semibold text-xs sm:text-sm capitalize">
                  {appointment.typeLabel} Consultation
                </p>
              </div>
            </div>
          </div>
          
          {/* Button - Full width on mobile */}
          {appointment.type === "video" && (
            <Button
              onClick={() => onStartCall(appointment.id)}
              className="w-full md:w-auto px-4 sm:px-6 py-3 sm:py-5 bg-white text-primary hover:bg-white/90 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 text-sm sm:text-base"
            >
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
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
  const handleViewAll = () => {
    window.open("/appointments", "_blank", "noopener,noreferrer");
    if (onViewAll) onViewAll();
  };

  // No appointments
  if (!appointments || appointments.length === 0) {
    return (
      <Card className="rounded-2xl sm:rounded-3xl border border-border/50 h-full min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center text-center p-6 sm:p-8 shadow-sm">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mb-3 sm:mb-4">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 font-headline">
          No Upcoming Sessions
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-4">
          You don&apos;t have any appointments scheduled at the moment.
        </p>
        <Button
          onClick={onBookFirst}
          className="px-4 sm:px-6 py-3 sm:py-5 bg-primary text-primary-foreground rounded-xl font-bold shadow-sm hover:bg-primary/90 transition-all text-sm sm:text-base w-full sm:w-auto"
        >
          Book Your First Appointment
        </Button>
      </Card>
    );
  }

  // Show only one upcoming appointment
  return (
    <AppointmentCard
      appointment={appointments[0]}
      onStartCall={onStartCall}
      onViewAll={handleViewAll}
      showViewAll={true}
    />
  );
}