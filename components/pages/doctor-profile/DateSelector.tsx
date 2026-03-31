import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DoctorAvailabilitySlot } from '@/types/doctor-details';

interface DateSelectorProps {
  slots: DoctorAvailabilitySlot[];
  selectedSlot: DoctorAvailabilitySlot | null;
  onSelectSlot: (slot: DoctorAvailabilitySlot) => void;
}

const DateSelector = ({ slots, selectedSlot, onSelectSlot }: DateSelectorProps) => {
  const uniqueDates = Array.from(
    new Map(slots.map(slot => [slot.date, slot])).values()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      full: dateString,
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-headline text-primary">Schedules</h3>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm font-bold text-on-surface-variant">
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {uniqueDates.map((slot) => {
          const { day, label, full } = formatDate(slot.date);
          const isSelected = selectedSlot?.date === full;
          
          return (
            <Button
              key={slot.id}
              variant={isSelected ? "default" : "ghost"}
              onClick={() => onSelectSlot(slot)}
              className={`flex-shrink-0 w-14 h-auto py-4 rounded-xl flex flex-col items-center gap-1 ${
                isSelected
                  ? 'bg-primary text-white shadow-lg hover:bg-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="text-lg font-bold">{day}</span>
              <span className="text-[10px] font-bold uppercase opacity-70">{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;