'use client';
import { Calendar, Clock, Star, Video, ChevronRight, FileText } from 'lucide-react';
import { Doctor, Appointment } from '@/types/appointment';
import { useRouter } from 'next/navigation';

interface PastAppointmentCardProps {
    appointment: Appointment;
    doctor: Doctor | undefined;
    onViewDetails: (appointmentId: string) => void;
    consultationType?: string;
    fee?: string;
    statusLabel?: string;
}

const PastAppointmentCard = ({
    appointment,
    doctor,
    onViewDetails,
    consultationType = "Video consultation",
    fee = "0",
    statusLabel
}: PastAppointmentCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-100 text-emerald-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'failed':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const router = useRouter();

    const handleViewDetails = (id: string) => {
        router.push(`/appointments/${id}`);
    };
    console.table(appointment);

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
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            <span className="text-xs font-bold text-primary">{doctor?.rating}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusColor(appointment.status)}`}>
                            {statusLabel || appointment.status}
                        </span>
                    </div>
                </div>

                <div className="bg-surface-container-lowest/50 rounded-2xl p-4 border border-outline-variant/5 mb-4">
                    <div className="grid grid-cols-2 divide-x divide-outline-variant/10">
                        <div className="pr-4">
                            <p className="text-xs font-bold text-primary mb-2">Consultation Type</p>
                            <div className="flex items-center gap-2 text-emerald-600">
                                {appointment.type === 'video' ? (
                                    <Video className="w-4 h-4" />
                                ) : (
                                    <FileText className="w-4 h-4" />
                                )}
                                <span className="text-sm font-bold">{consultationType}</span>
                            </div>
                        </div>
                        <div className="pl-4">

                            <p className="text-xs font-bold text-primary mb-2">
                                Consultation Fee
                            </p>
                            <p className="text-lg font-bold text-primary leading-none">₹{parseFloat(fee).toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => onViewDetails(appointment.id)}
                    className="w-full py-3.5 bg-[#0A2E1F] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default PastAppointmentCard;