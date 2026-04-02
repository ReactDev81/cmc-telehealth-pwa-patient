import { Star, Clock, Languages, MapPin, Book } from 'lucide-react';
import type { Doctor } from '@/types/browse-doctors';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  isLoading?: boolean;
}

const DoctorCard = ({ doctor, onBook, onError, onSuccess, isLoading = false }: DoctorCardProps) => {
  const router = useRouter();
  // const handleBookNow = () => {
  //   try {
  //     // Add your booking logic here
  //     onBook();
  //     onSuccess?.();
  //   } catch (error) {
  //     onError?.();
  //   }
  //   router.push(`/find-doctors/${doctor.id}`);
  // };

  const handleBookNow = () => {
    router.push(`/find-doctors/${doctor.id}`);
  };

  console.log("doctor : ", doctor.speciality);

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow group">
      <div className="flex gap-5 mb-6">
        <div className="relative">
          <img 
            src={doctor.avatar} 
            alt={doctor.name} 
            className="w-20 h-20 rounded-2xl object-cover" 
            referrerPolicy="no-referrer" 
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-headline font-bold text-xl text-primary-container">
                {doctor.name}
              </h3>
              <p className="text-on-primary-container font-semibold text-sm">
                    {Array.isArray(doctor.speciality) && doctor.speciality.length > 0
                      ? doctor.speciality[0].name
                      : ""}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-secondary-container px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 text-on-secondary-container fill-current" />
              <span className="text-xs font-bold text-on-secondary-container">
                {doctor.rating}
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex gap-4 text-xs text-on-surface-variant font-medium flex-wrap">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {doctor.years_experience} exp.
            </span>
            <span className="flex items-center gap-1">
              <Languages className="w-3 h-3" /> {doctor.languages_known?.join(', ')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-outline-variant/10 space-y-6">
        <div className="flex gap-8 flex-wrap">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">
              Consultation Type
            </p>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <MapPin className="w-3.5 h-3.5" />
              <p className="text-sm font-bold capitalize">
                {Array.isArray(doctor.consultation_type_label) 
                  ? doctor.consultation_type_label?.join(' / ')
                  : doctor.consultation_type_label}
              </p>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">
              Consultation Fee
            </p>
            <p className="text-lg font-bold text-primary-container">
              ${doctor.consultation_fee}
            </p>
          </div>
        </div>
        
        <Button
          onClick={handleBookNow}
          disabled={isLoading}
          variant="default"
          size="lg"
          className="w-full font-bold shadow-lg hover:shadow-xl transition-all"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;