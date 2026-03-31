import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppointmentTypeSelector from './AppointmentTypeSelector';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import type { DoctorDetailData, DoctorAvailabilitySlot } from '@/types/doctor-details';

interface AppointmentBookingProps {
  doctor: DoctorDetailData;
  onBookingSuccess: () => void;
  onBookingError: (error: string) => void;
}

const AppointmentBooking = ({ doctor, onBookingSuccess, onBookingError }: AppointmentBookingProps) => {
  const [appointmentType, setAppointmentType] = useState<'in_person' | 'video' | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<DoctorAvailabilitySlot | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const availableSlots = doctor.availability?.flatMap(day => day.slots) || [];
  
  const filteredSlots = availableSlots.filter(slot => {
    if (appointmentType === 'in_person') return slot.consultation_type === 'in_person';
    if (appointmentType === 'video') return slot.consultation_type === 'video';
    return true;
  });

  const handleBooking = async () => {
    if (!selectedSlot) return;
    
    setIsBooking(true);
    try {
      // API call to book appointment
      await new Promise(resolve => setTimeout(resolve, 1500));
      onBookingSuccess();
    } catch (error) {
      onBookingError('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const isBookingDisabled = !appointmentType || !selectedSlot;

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
        {isBooking ? "Booking..." : `Book Appointment ($${selectedSlot?.consultation_fee || doctor.profile.years_experience * 10}.00)`}
        <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

export default AppointmentBooking;