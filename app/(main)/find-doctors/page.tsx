"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBrowseDoctors } from '@/queries/useBrowseDoctors';
import SearchBar from '@/components/pages/find-doctor/searchBar';
import FilterSidebar from '@/components/pages/find-doctor/FilterSidebar';
import SortDropdown from '@/components/pages/find-doctor/SortDropdown';
import DoctorCard from '@/components/pages/find-doctor/DoctorCard';
import LoadingSkeleton from '@/components/pages/find-doctor/LoadingSkeleton';
import CustomDialog from '@/components/custom/Dialogboxs';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { ConsultationType, SortOption } from '@/types/browse-doctors';
import { Button } from '@/components/ui/button';

const FindDoctors = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [consultationType, setConsultationType] = useState<ConsultationType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('highest-rated');
  const [bookingDoctorId, setBookingDoctorId] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    type: 'danger' | 'success';
    title: string;
    description: string;
  }>({
    open: false,
    type: 'danger',
    title: '',
    description: '',
  });

  const { data, error, isLoading, refetch } = useBrowseDoctors();
  const doctors = data?.data || [];

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.hospital?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = specialty === 'all' || doctor.specialty.toLowerCase() === specialty.toLowerCase();
    
    const matchesConsultationType = consultationType === 'all' || 
      doctor.consultation_type_label.includes(consultationType);

    return matchesSearch && matchesSpecialty && matchesConsultationType;
  });

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case 'highest-rated':
        return b.rating - a.rating;
      case 'price-low-high':
        return a.consultation_fee - b.consultation_fee;
      case 'next-available':
        return 0;
      default:
        return 0;
    }
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSpecialty('all');
    setConsultationType('all');
    setSortBy('highest-rated');
  };

  const handleBooking = async (doctorId: string) => {
    setBookingDoctorId(doctorId);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDialogState({
        open: true,
        type: 'success',
        title: 'Appointment Booked!',
        description: 'Your appointment has been successfully scheduled. Check your email for details.',
      });
      
      setTimeout(() => {
        router.push('/appointments');
      }, 2000);
    } catch (error) {
      setDialogState({
        open: true,
        type: 'danger',
        title: 'Booking Failed',
        description: 'Unable to book appointment. Please try again later.',
      });
    } finally {
      setBookingDoctorId(null);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <p className="text-destructive mb-4">Failed to load doctors. Please try again.</p>
        <Button
          onClick={() => refetch()} 
          variant="default"
          size="default"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-12">
        {/* Hero Section */}
        <section>
          <div className="max-w-3xl">
            <h1 className="font-headline text-5xl font-extrabold text-primary-container tracking-tight mb-4">
              Find the right care, <span className="text-on-primary-container">effortlessly.</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mb-8">
              Connect with world-class specialists curated for your health journey. Expert clinical care delivered with a human touch.
            </p>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </section>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          <FilterSidebar
            specialty={specialty}
            consultationType={consultationType}
            onSpecialtyChange={setSpecialty}
            onConsultationTypeChange={setConsultationType}
            onClearFilters={handleClearFilters}
          />

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <p className="text-on-surface-variant font-medium">
                Showing <span className="text-on-surface font-bold">{sortedDoctors.length} specialists</span> matching your criteria
              </p>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedDoctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                  onBook={() => handleBooking(doctor.id)}
                  isLoading={bookingDoctorId === doctor.id}
                />
              ))}
            </div>

            {sortedDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-on-surface-variant mb-4">No doctors found matching your criteria.</p>
                <Button 
                  onClick={handleClearFilters}
                  variant="outline"
                  size="default"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Dialog */}
      <CustomDialog
        open={dialogState.open}
        onClose={() => setDialogState(prev => ({ ...prev, open: false }))}
        type={dialogState.type}
        title={dialogState.title}
        description={dialogState.description}
        confirmText="OK"
        cancelText="Cancel"
        onConfirm={() => setDialogState(prev => ({ ...prev, open: false }))}
        icon={dialogState.type === 'danger' ? 
          <AlertCircle className="h-6 w-6 text-destructive" /> : 
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        }
      />
    </>
  );
};

export default FindDoctors;