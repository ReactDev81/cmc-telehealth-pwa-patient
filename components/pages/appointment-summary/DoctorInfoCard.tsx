import { Stethoscope } from 'lucide-react';

interface DoctorInfoCardProps {
  doctor: {
    id: string;
    name: string;
    image: string;
    specialty: string;
    experience: string;
    languages: string[];
    rating?: number;
  };
}

const DoctorInfoCard = ({ doctor }: DoctorInfoCardProps) => {
  return (
    <div className="bg-surface-container-low rounded-[32px] p-8 border border-outline-variant/5">
      <div className="flex gap-6 items-start mb-8">
        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl ring-4 ring-white">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Stethoscope className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {doctor.specialty}
            </span>
          </div>
          <h2 className="text-2xl font-bold font-headline text-primary mb-1">
            {doctor.name}
          </h2>
          <p className="text-on-surface-variant text-sm font-medium">
            {doctor.experience} Experience • {doctor.languages?.join(', ')}
          </p>
          {doctor.rating && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-amber-500">★</span>
              <span className="text-sm font-medium">{doctor.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoCard;