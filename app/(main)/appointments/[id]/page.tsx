// "use client";

// import React from "react";
// import { use } from "react";
// import { AlertCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAppointmentDetail } from "@/queries/useAppointmentSummary";

// interface AppointmentDetailPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }

// const AppointmentDetailPage = ({ params }: AppointmentDetailPageProps) => {
//   const { id } = use(params);

//   const { data, isLoading, error, refetch } = useAppointmentDetail(id);

//   const appointment = data?.data;

//   if (isLoading) {
//     return <div className="py-10 text-center">Loading...</div>;
//   }

//   if (error || !appointment) {
//     return (
//       <div className="py-12 text-center">
//         <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
//         <p className="mb-4 text-destructive">
//           Failed to load appointment details.
//         </p>
//         <Button onClick={() => refetch()}>Retry</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="rounded-2xl border bg-card p-6">
//         <h1 className="text-2xl font-bold">Appointment Detail</h1>
//         <p className="text-sm text-muted-foreground">
//           Appointment ID: {appointment.appointment_id}
//         </p>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <div className="rounded-2xl border bg-card p-6 space-y-3">
//           <h2 className="text-lg font-semibold">Schedule</h2>
//           <p><strong>Date:</strong> {appointment.schedule.date_formatted}</p>
//           <p><strong>Time:</strong> {appointment.schedule.time_formatted}</p>
//           <p><strong>Booking Type:</strong> {appointment.schedule.booking_type}</p>
//           <p>
//             <strong>Consultation:</strong>{" "}
//             {appointment.schedule.consultation_type_label}
//           </p>
//           <p><strong>Status:</strong> {appointment.status_label}</p>
//         </div>

//         <div className="rounded-2xl border bg-card p-6 space-y-3">
//           <h2 className="text-lg font-semibold">Doctor</h2>
//           <p><strong>Name:</strong> {appointment.doctor.name}</p>
//           <p><strong>Department:</strong> {appointment.doctor.department}</p>
//           <p>
//             <strong>Experience:</strong> {appointment.doctor.years_experience}
//           </p>
//         </div>

//         <div className="rounded-2xl border bg-card p-6 space-y-3">
//           <h2 className="text-lg font-semibold">Patient</h2>
//           <p><strong>Name:</strong> {appointment.patient.name}</p>
//           <p><strong>Age:</strong> {appointment.patient.age_formatted}</p>
//           <p><strong>Gender:</strong> {appointment.patient.gender_formatted}</p>
//           <p><strong>Phone:</strong> {appointment.patient.phone}</p>
//           <p><strong>Email:</strong> {appointment.patient.email}</p>
//         </div>

//         <div className="rounded-2xl border bg-card p-6 space-y-3">
//           <h2 className="text-lg font-semibold">Payment</h2>
//           <p>
//             <strong>Consultation Fee:</strong>{" "}
//             {appointment.payment.consultation_fee_formatted}
//           </p>
//           <p>
//             <strong>Admin Fee:</strong> {appointment.payment.admin_fee_formatted}
//           </p>
//           <p><strong>Total:</strong> {appointment.payment.total_formatted}</p>
//           <p><strong>Payment Status:</strong> {appointment.payment.status_label}</p>
//         </div>
//       </div>

//       {appointment.notes && (
//         <div className="rounded-2xl border bg-card p-6 space-y-2">
//           <h2 className="text-lg font-semibold">Notes</h2>
//           <p className="text-sm text-muted-foreground">{appointment.notes}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentDetailPage;


"use client";

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';
import SummaryHeader from '@/components/pages/appointment-summary/SummaryHeader';
import DoctorInfoCard from '@/components/pages/appointment-summary/DoctorInfoCard';
import PatientInfoCard from '@/components/pages/appointment-summary/PatientInfoCard';
import ConsultationModeCard from '@/components/pages/appointment-summary/ConsultationModeCard';
import BookingTicket from '@/components/pages/appointment-summary/BookingTicket';
import ConfirmButton from '@/components/pages/appointment-summary/ConfirmButton';
import LoadingSkeleton from '@/components/pages/appointment-summary/LoadingSkeleton';
import CustomDialog from '@/components/custom/Dialogboxs';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const AppointmentSummaryPage = ({ params }: PageProps) => {
  const { id: doctorId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get appointment data from URL search params
  const appointmentData = {
    date: searchParams.get('date') || '',
    timeSlot: searchParams.get('timeSlot') || '',
    consultationType: (searchParams.get('consultationType') as 'video' | 'in_person') || 'in_person',
    patientName: searchParams.get('patientName') || '',
    patientAge: parseInt(searchParams.get('patientAge') || '0'),
    patientGender: searchParams.get('patientGender') || '',
  };
  const [isConfirming, setIsConfirming] = useState(false);
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

  // Fetch doctor details
  const { data, isLoading, error } = useQuery({
    queryKey: ['doctor-detail', doctorId],
    queryFn: () => fetch(`/doctor/${doctorId}`).then(res => res.json()),
  });

  const doctor = data?.data;

  const handleConfirmBooking = async () => {
    setIsConfirming(true);
    try {
      // API call to confirm booking
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDialogState({
        open: true,
        type: 'success',
        title: 'Appointment Confirmed!',
        description: 'Your appointment has been successfully booked. You will receive a confirmation email shortly.',
      });
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      setDialogState({
        open: true,
        type: 'danger',
        title: 'Booking Failed',
        description: 'Unable to confirm appointment. Please try again.',
      });
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !doctor) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <p className="text-destructive">Failed to load appointment details.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto pb-12">
        <SummaryHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Doctor & Patient Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-8">
              <DoctorInfoCard doctor={doctor} />
              <PatientInfoCard 
                name={appointmentData.patientName}
                age={appointmentData.patientAge}
                gender={appointmentData.patientGender}
              />
            </div>

            <ConsultationModeCard type={appointmentData.consultationType} />
          </div>

          {/* Right Column: Booking Ticket */}
          <div className="lg:col-span-5 space-y-8">
            <BookingTicket
              doctor={doctor}
              date={appointmentData.date}
              timeSlot={appointmentData.timeSlot}
              consultationType={appointmentData.consultationType}
            />
            
            <ConfirmButton
              onClick={handleConfirmBooking}
              isLoading={isConfirming}
            />
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

export default AppointmentSummaryPage;