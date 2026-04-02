'use client';
import { Calendar, Clock, Star, Video, ChevronRight, Phone, Calendar as CalendarIcon } from 'lucide-react';
import { Doctor, Appointment } from '@/types/appointment';
import { useRouter } from 'next/navigation';

interface UpcomingAppointmentCardProps {
    appointment: Appointment;
    doctor: Doctor | undefined;
    onManageClick: (appointmentId: string) => void;
    consultationType?: string;
    fee?: string;
    joinUrl?: string;
    call_now?: boolean;
}

const UpcomingAppointmentCard = ({
    appointment,
    doctor,
    onManageClick,
    consultationType = "Video consultation",
    fee = "0",
    joinUrl,
    call_now
}: UpcomingAppointmentCardProps) => {

    const router = useRouter();

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-surface-container-low">
                                <img
                                    src={appointment.doctorImage}
                                    alt={appointment.doctorName}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        e.currentTarget.src = '/default-avatar.png';
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-primary font-headline leading-tight">
                                {appointment.doctorName}
                            </h3>
                            <p className="text-on-surface-variant text-sm font-medium">
                                {doctor?.specialty} ({doctor?.experience})
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center gap-1.5 text-on-surface-variant/70 text-xs font-bold">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {appointment.date}
                                </div>
                                <div className="flex items-center gap-1.5 text-on-surface-variant/70 text-xs font-bold">
                                    <Clock className="w-3.5 h-3.5" />
                                    {appointment.time}
                                </div>
                            </div>
                        </div>
                    </div>

                    {doctor?.rating !== 0 &&
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg">
                                <Star className="w-3 h-3 fill-primary text-primary" />
                                <span className="text-xs font-bold text-primary">{doctor?.rating}</span>
                            </div>
                        </div>
                    }

                </div>

                <div className="bg-surface-container-lowest/50 rounded-2xl p-4 border border-outline-variant/5 mb-4">
                    <div className="grid grid-cols-2 divide-x divide-outline-variant/10">
                        <div className="pr-4">
                            <p className="text-xs font-bold text-primary mb-2">Consultation Type</p>
                            <div className="flex items-center gap-2 text-emerald-600">
                                {appointment.type === 'video' ? (
                                    <Video className="w-4 h-4" />
                                ) : (
                                    <CalendarIcon className="w-4 h-4" />
                                )}
                                <span className="text-sm font-bold">{consultationType}</span>
                            </div>
                        </div>
                        <div className="pl-4">
                            <p className="text-lg font-bold text-primary leading-none">₹{parseFloat(fee).toFixed(2)}</p>
                            <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mt-1">
                                Consultation Fee
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    {call_now && joinUrl && (
                        <button
                            onClick={() => window.open(joinUrl, '_blank')}
                            className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
                        >
                            <Phone className="w-4 h-4" />
                            Join Now
                        </button>
                    )}
                    <button
                        onClick={() => router.push(`/appointments/manage-appointment/${appointment.id}`)}
                        className="flex-1 py-3.5 bg-[#0A2E1F] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                    >
                        Manage Appointment
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingAppointmentCard;