import { Star, Verified, Languages as LanguagesIcon } from 'lucide-react';
import type { DoctorDetailData } from '@/types/doctor-details';
import DoctorTags from './DoctorTags';

interface DoctorHeaderProps {
  doctor: DoctorDetailData;
}

const DoctorHeader = ({ doctor }: DoctorHeaderProps) => {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
        <div className="relative group">
          <div className="h-40 w-40 rounded-3xl overflow-hidden shadow-xl ring-4 ring-surface-container">
            <img 
              src={doctor.profile.avatar} 
              alt={doctor.profile.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold font-label flex items-center gap-1 shadow-lg">
            <Verified className="w-3 h-3" />
            VERIFIED
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-4xl font-extrabold font-headline tracking-tight text-primary">
              {doctor.profile.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-1 text-on-surface-variant font-medium">
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <span className="text-on-surface">{doctor.review_summary?.average_rating || 0}</span>
              <span className="text-sm opacity-60">
                ({doctor.review_summary?.total_reviews || 0} Reviews)
              </span>
            </div>
          </div>
          
          <p className="text-xl text-surface-tint font-medium font-headline">
            {doctor.profile.department} • {doctor.profile.years_experience}+ Years Experience
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-2 text-on-surface-variant font-medium">
            <LanguagesIcon className="w-4 h-4" />
            <span>{doctor.languages?.join(', ') || 'English'}</span>
          </div>
          
          <DoctorTags specialties={[doctor.profile.department]} />
        </div>
      </div>
    </section>
  );
};

export default DoctorHeader;