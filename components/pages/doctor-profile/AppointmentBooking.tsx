import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppointmentTypeSelector from './AppointmentTypeSelector';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import { useBookAppointment } from '@/mutations/useBookAppointment';
import type { DoctorDetailData, DoctorAvailabilitySlot } from '@/types/doctor-details';

interface AppointmentBookingProps {
    doctor: DoctorDetailData;
    onBookingSuccess: (appointmentId: string) => void;
    onBookingError: (error: string) => void;
}

const AppointmentBooking = ({ doctor, onBookingSuccess, onBookingError }: AppointmentBookingProps) => {

    const [appointmentType, setAppointmentType] = useState<'in_person' | 'video' | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<DoctorAvailabilitySlot | null>(null);

    const { mutate: bookAppointment, isPending: isBooking } = useBookAppointment();

    // Set default appointment type: video first, then clinic
    useEffect(() => {
        if (doctor.appointment_types?.video) {
            setAppointmentType('video');
        } else if (doctor.appointment_types?.in_person) {
            setAppointmentType('in_person');
        }
    }, [doctor.appointment_types]);

    const availableSlots = doctor.availability?.flatMap(day => day.slots) || [];

    const filteredSlots = availableSlots.filter(slot => {
        if (appointmentType === 'in_person') return slot.consultation_type === 'in_person';
        if (appointmentType === 'video') return slot.consultation_type === 'video';
        return true;
    });

    const handleBooking = () => {
        if (!selectedSlot) return;

        const payload = {
            doctor_id: doctor.id,
            availability_id: selectedSlot.id,
            appointment_date: selectedSlot.date,
            appointment_time: selectedSlot.start_time,
            consultation_type: selectedSlot.consultation_type,
            opd_type: 'general',
        };

        bookAppointment(payload, {
            onSuccess: (response) => {
                const appointmentId = response?.data?.appointment?.id;
                const appointmentData = response?.data;
                if (appointmentId && appointmentData) {
                    onBookingSuccess(appointmentId);
                } else {
                    onBookingError('Failed to get appointment details');
                }
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || error.message || 'Failed to book appointment. Please try again.';
                onBookingError(errorMessage);
            },
        });
    };

    const isBookingDisabled = !appointmentType || !selectedSlot || isBooking;

    return (
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-xl border border-outline-variant/10 space-y-8">
            <div className="space-y-2">
                <h3 className="text-2xl font-extrabold font-headline tracking-tight text-primary">
                    Book Appointment
                </h3>
                <p className="text-on-surface-variant text-sm">Choose your preferred date and time.</p>
            </div>

            <AppointmentTypeSelector
                value={appointmentType}
                onChange={setAppointmentType}
                inPersonAvailable={doctor.appointment_types?.in_person}
                videoAvailable={doctor.appointment_types?.video}
            />

            {appointmentType && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <DateSelector
                        slots={filteredSlots}
                        selectedSlot={selectedSlot}
                        onSelectSlot={setSelectedSlot}
                    />

                    {selectedSlot && (
                        <TimeSelector
                            slot={selectedSlot}
                            selectedSlot={selectedSlot}
                            onSelectSlot={setSelectedSlot}
                        />
                    )}
                </div>
            )}

            <Button
                onClick={handleBooking}
                disabled={isBookingDisabled || isBooking}
                variant="default"
                size="lg"
                className="w-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
                {isBooking ? "Booking..." : `Book Appointment (₹${selectedSlot?.consultation_fee || 0}.00)`}
                <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
        </div>
    );
};

export default AppointmentBooking;