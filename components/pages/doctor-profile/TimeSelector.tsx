import { Button } from '@/components/ui/button';
import type { DoctorAvailabilitySlot } from '@/types/doctor-details';

interface TimeSelectorProps {
  slot: DoctorAvailabilitySlot;
  selectedSlot: DoctorAvailabilitySlot | null;
  onSelectSlot: (slot: DoctorAvailabilitySlot) => void;
}

const TimeSelector = ({ slot, selectedSlot, onSelectSlot }: TimeSelectorProps) => {
  // Get all slots for the selected date
  const timeSlots = [slot]; // In real implementation, you'd get all slots for the date
  
  const formatTime = (time: string) => {
    return time.substring(0, 5); // Format "HH:MM:SS" to "HH:MM"
  };

  return (
    <div className="bg-surface-container-low/50 p-4 rounded-2xl space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {timeSlots.map((timeSlot) => (
          <Button
            key={timeSlot.id}
            variant={selectedSlot?.id === timeSlot.id ? "default" : "outline"}
            onClick={() => onSelectSlot(timeSlot)}
            className={`py-3 px-2 rounded-lg text-xs font-bold h-auto ${
              selectedSlot?.id === timeSlot.id
                ? 'bg-primary text-white hover:bg-primary'
                : 'bg-white text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {formatTime(timeSlot.start_time)} - {formatTime(timeSlot.end_time)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;