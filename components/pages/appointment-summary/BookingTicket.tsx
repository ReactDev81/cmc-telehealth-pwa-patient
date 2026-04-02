import ScheduleDetails from './ScheduleDetails';
import PaymentSummary from './PaymentSummary';
import type { AppointmentDoctor, AppointmentPayment } from '@/types/appointment-summary';

interface BookingTicketProps {
  doctor: AppointmentDoctor;
  payment: AppointmentPayment;
  date: string;
  timeSlot: string;
  consultationType: 'video' | 'in_person';
}

const BookingTicket = ({ doctor, payment, date, timeSlot, consultationType }: BookingTicketProps) => {
  return (
    <div className="bg-white rounded-[40px] shadow-2xl shadow-primary/5 border border-outline-variant/10 overflow-hidden relative">
      {/* Ticket Notch Effects */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-surface rounded-full border border-outline-variant/10 z-10"></div>
      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-surface rounded-full border border-outline-variant/10 z-10"></div>

      <ScheduleDetails
        date={date}
        timeSlot={timeSlot}
        consultationType={consultationType}
      />

      <PaymentSummary
        fee={parseFloat(payment.consultation_fee) || 0}
        serviceFee={parseFloat(payment.admin_fee) || 0}
        discount={parseFloat(payment.discount_formatted) || 0}
      />
    </div>
  );
};

export default BookingTicket;