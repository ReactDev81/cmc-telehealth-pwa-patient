"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Stethoscope, Calendar, User, CreditCard, FileText, File as FileIcon, Eye, Upload, FolderArchive, FolderEdit, Download } from "lucide-react";
import { getStatusColor } from "@/src/utils/getStatusColor";

interface AppointmentInfoCardsProps {
    data: any;
}

export const AppointmentInfoCards = ({ data }: AppointmentInfoCardsProps) => {
    const { doctor, schedule, patient, payment, medical_reports } = data;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN - Main Info */}
            <div className="lg:col-span-2 space-y-6">
                {/* Doctor Card */}
                <Card className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <CardContent className="p-0">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-5">
                                <img
                                    src={doctor?.avatar || "https://via.placeholder.com/96"}
                                    alt={doctor?.name}
                                    className="w-34 h-34 rounded-2xl object-cover"
                                />

                                <div>
                                    <p className="text-emerald-600 flex items-center text-xs font-semibold uppercase tracking-wider">
                                        <Stethoscope className="w-4 h-4 mr-2" /> {doctor?.department || "Cardiology"}
                                    </p>
                                    <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                        {doctor?.name || "Dr. Amit Sharma"}
                                    </h2>

                                    {/* Experience & Review Cards */}
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {/* Experience Card */}
                                        <div className="bg-gray-100 rounded-xl p-3 min-w-30">
                                            <p className="text-xs text-gray-500 mb-1">Experience</p>
                                            <p className="font-semibold text-gray-900 text-lg">
                                                {doctor?.years_experience || "N/A"}
                                            </p>
                                        </div>

                                        {/* Review Card */}
                                        <div className="bg-gray-100 rounded-xl p-3 min-w-30">
                                            <p className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                Rating
                                            </p>
                                            <div className="flex items-center gap-1">
                                                <div className="font-semibold text-gray-900 text-lg">
                                                    {doctor?.average_rating || "N/A"} <span className="text-xs text-gray-400"> ({doctor?.total_reviews || "0"})
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge - Top Right */}
                            <div>
                                <p
                                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusColor(
                                        "appointment",
                                        data.status_label
                                    )}`}
                                >
                                    {data.status_label || "N/A"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule & Patient Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Schedule Card */}
                    <Card className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <CardContent className="p-0 space-y-4">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-emerald-600" />
                                Schedule
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Date</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {schedule?.date_formatted || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Time</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {schedule?.time_formatted || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Consultation Type</span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                                            "session",
                                            schedule?.consultation_type_label
                                        )}`}
                                    >
                                        {schedule?.consultation_type_label || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Booking Type</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {schedule?.booking_type || "N/A"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Patient Info Card */}
                    <Card className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <CardContent className="p-0 space-y-4">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-emerald-600" />
                                Patient Info
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Name</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {patient?.name || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Age</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {patient?.age_formatted || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Gender</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {patient?.gender_formatted || "N/A"}
                                    </span>
                                </div>
                                {patient?.blood_group && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Blood Group</span>
                                        <span className="text-sm font-medium text-gray-900">{patient.blood_group}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Phone</span>
                                    <span className="text-sm font-medium text-gray-900">{patient?.phone || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Email</span>
                                    <span className="text-sm font-medium text-gray-900 break-all ml-4 text-right">{patient?.email || "N/A"}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {medical_reports?.length > 0 && (
                    <div className="space-y-4 pt-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 px-1">
                            <FileText className="w-5 h-5 text-emerald-600" />
                            Medical Reports
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* <div className="space-y-3"> */}
                            {medical_reports.map((report: any) => (
                                <div
                                    key={report.id}
                                    className="flex items-center justify-between p-3 bg-gray-100 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <Download className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {report.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {report.type_label}{' '}
                                                •{' '}
                                                {
                                                    report.report_date_formatted
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        href={report.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN - Payment Card */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <Card className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden relative">
                        <CardContent className="p-0 space-y-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                                    <CreditCard className="w-4 h-4" />
                                </span>
                                Payment Detail
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Consultation Fee</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {payment?.consultation_fee_formatted || "₹0.00"}
                                    </span>
                                </div>
                                {payment?.admin_fee && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Admin Fee</span>
                                        <span className="text-sm font-bold text-gray-900">
                                            {payment?.admin_fee_formatted || "₹0.00"}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Additional Discount</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {payment?.discount_formatted || "₹0.00"}
                                    </span>
                                </div>

                                <div className="pt-6 relative">
                                    {/* Ornamental circles for the ticket look */}
                                    <div className="absolute top-0 -left-10 w-8 h-8 bg-[#f9fafb] rounded-full border border-gray-100" />
                                    <div className="absolute top-0 -right-10 w-8 h-8 bg-[#f9fafb] rounded-full border border-gray-100" />

                                    <div className="border-t border-dashed border-gray-200 mt-4 pt-6">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">TOTAL PAID</p>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-4xl font-bold text-gray-900">
                                                        {payment?.total_formatted?.includes('₹') ? '₹' : ''}
                                                        {payment?.total_formatted?.replace(/[^\d.]/g, '') || "0"}
                                                    </span>
                                                </div>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusColor(
                                                    "payment",
                                                    payment?.status
                                                )}`}
                                            >
                                                {payment?.status_label || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {payment?.payment_method && (
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                        <span className="text-xs text-gray-400">Payment Method</span>
                                        <span className="text-xs font-semibold text-gray-600 uppercase">
                                            {payment.payment_method}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
