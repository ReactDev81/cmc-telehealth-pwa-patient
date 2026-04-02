"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAppointmentById } from "@/api/appointment-detail";
import { MedicineDetailView } from "@/components/pages/my-medicines/MedicineDetailView";
import {
    ArrowLeft,
    File,
    Star,
    Calendar,
    Clock,
    User,
    Eye,
    FileText,
    CreditCard,
    Phone,
    Mail,
    Stethoscope,
    Pill,
    Loader2
} from "lucide-react";
import { getStatusColor } from "@/src/utils/getStatusColor";

export default function AppointmentDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    console.log("full data", data);



    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetchAppointmentById(id as string);

                console.log("detail data", res);
                console.log("Notes:", res?.notes); // Debug: Check notes data
                setData(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) getData();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!data) return <p className="text-center mt-10">No Data</p>;

    const { doctor, schedule, patient, payment, medical_reports, notes } = data;

    console.log("doctor data", doctor);


    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back</span>
                </button>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Manage Appointment</h1>
                    <p className="text-gray-500 text-sm mt-1">Appointment Details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Doctor Card */}
                        {/* Doctor Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            {/* Top Section - Doctor Info & Status */}
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
                                        <div className="flex gap-4 mt-2">
                                            {/* Experience Card */}
                                            <div className="bg-gray-100 rounded-xl p-3 min-w-30">
                                                <p className="text-xs text-gray-500 mb-1">Experience</p>
                                                <p className="font-semibold text-gray-900 text-lg">
                                                    {doctor?.years_experience || "N/A"}
                                                </p>
                                            </div>

                                            {/* Review Card */}
                                            <div className="bg-gray-100 rounded-xl p-3 min-w-30">
                                                <p className="text-xs text-gray-500 mb-1 flex items-center gap-2"> <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    Rating</p>
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
                        </div>



                        {/* Schedule & Patient Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Schedule Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                                                "session", // 👈 ya jo bhi tumne define kiya hai (session / appointment / etc.)
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
                            </div>

                            {/* Patient Info Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                                        <span className="text-sm font-medium text-gray-900">{patient?.email || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Medical Reports */}
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-600" />
                            Medical Reports
                        </h3>
                        <div className="grid grid-cols-2 gap-6">

                            {medical_reports?.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

                                    <div className="space-y-3">
                                        {medical_reports.map((report: any) => (
                                            <div
                                                key={report.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                        <File className="w-5 h-5 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{report.title}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {report.type_label} • {report.report_date_formatted}
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

                    </div>

                    {/* RIGHT COLUMN - Payment Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24"> {/* Changed from top-6 to top-24 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-emerald-600" />
                                    Payment Detail
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-gray-600">Consultation Fee</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {payment?.consultation_fee_formatted || "₹0.00"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-gray-600">Admin Fee</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {payment?.admin_fee_formatted || "₹0.00"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Discount</span>
                                        <span className="text-sm font-medium text-emerald-600">
                                            {payment?.discount_formatted || "₹0.00"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center pt-4">
                                        <div>
                                            <p className="text-xs text-gray-500">TOTAL</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {payment?.total_formatted || "₹0.00"}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                "payment",
                                                payment?.status
                                            )}`}
                                        >
                                            {payment?.status_label || "N/A"}
                                        </span>
                                    </div>

                                    {payment?.payment_method && (
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                            <span className="text-sm text-gray-600">Payment Method</span>
                                            <span className="text-sm font-medium text-gray-900 uppercase">
                                                {payment.payment_method}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medical Details & Prescription - MedicineDetailView shown by default */}
                </div>
                <div className="overflow-hidden">
                    <div className="pt-8 pb-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-semibold text-2xl text-gray-900 flex items-center gap-2">
                            <Pill className="w-5 h-5 text-emerald-600" />
                            Medical Details & Prescription
                        </h3>
                    </div>

                    {/* Show notes if they exist */}
                    {notes && (
                        <div className=" p-6 bg-gray-100  rounded-xl italic text-gray-600 border-l-4 border-emerald-500">
                            <h3 className="text-sm">Symptoms Reported</h3>
                            <div className="text-base mt-2">
                                "{notes}"
                            </div>
                        </div>
                    )}

                    {/* Show medicine details without header */}
                    <div className="mt-6 w-full [&>div]:max-w-full [&>div]:mx-0">
                        <MedicineDetailView
                            prescriptionId={id as string}
                            onBack={() => { }}
                            showHeader={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}