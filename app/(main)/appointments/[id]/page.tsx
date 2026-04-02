"use client";

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
import { useAppointmentDetail } from '@/queries/useAppointmentSummary';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const AppointmentSummaryPage = ({ params }: PageProps) => {

    const { id: AppointmentId } = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();

    console.log('AppointmentId', AppointmentId)

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

    const { data, isLoading, error } = useAppointmentDetail(AppointmentId);

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
                            payment={doctor.payment}
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