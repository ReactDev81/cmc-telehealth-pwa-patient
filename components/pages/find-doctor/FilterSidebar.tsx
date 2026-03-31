import { Filter } from 'lucide-react';
import type { ConsultationType } from '@/types/browse-doctors';
import { RadioField } from '@/components/custom/RadioField';

interface FilterSidebarProps {
  specialty: string;
  consultationType: ConsultationType;
  onSpecialtyChange: (value: string) => void;
  onConsultationTypeChange: (value: ConsultationType) => void;
  onClearFilters: () => void;
}

const specialties = [
  { value: 'all', label: 'All Specialties' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'orthopedics', label: 'Orthopedics' },
];

const consultationTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'video', label: 'Video Consultation' },
  { value: 'in-person', label: 'In-person Consultation' },
];

const FilterSidebar = ({
  specialty,
  consultationType,
  onSpecialtyChange,
  onConsultationTypeChange,
  onClearFilters,
}: FilterSidebarProps) => {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-28 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-on-surface-variant" />
            <h2 className="font-headline font-bold text-xl tracking-tight">Refine Search</h2>
          </div>
          <button 
            onClick={onClearFilters}
            className="text-sm text-surface-tint font-semibold hover:underline transition-colors"
          >
            Clear all
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Specialty Filter - Using Select (customize as needed) */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest font-bold text-on-surface-variant/70">
              Specialty
            </label>
            <select
              value={specialty}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              className="w-full bg-surface-container-lowest border border-border rounded-xl h-12 px-4 shadow-sm text-sm font-medium focus:ring-2 focus:ring-surface-tint/20 focus:border-transparent transition-all"
            >
              {specialties.map((spec) => (
                <option key={spec.value} value={spec.value}>
                  {spec.label}
                </option>
              ))}
            </select>
          </div>

          {/* Consultation Type Filter - Using RadioField */}
          <RadioField
            label="Consultation Type"
            value={consultationType}
            onChange={(value) => onConsultationTypeChange(value as ConsultationType)}
            options={consultationTypeOptions}
            direction="column"
            labelClass="text-xs uppercase tracking-widest font-bold text-on-surface-variant/70"
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;