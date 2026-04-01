"use client";

import { useParams, useRouter } from "next/navigation";
import { usePrescriptionDetail } from "@/queries/usePrescriptionDetail";
import { MedicineItem } from "@/components/pages/my-medicines/MedicineItem";
import { MedicineActionPlan } from "@/components/pages/my-medicines/MedicineActionPlan";
import {
    Loader2,
    AlertCircle,
    ChevronLeft,
    Stethoscope,
    Calendar,
    FileText,
    Pill
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function MedicineDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data, isLoading, isError, error, refetch } = usePrescriptionDetail(id);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-on-surface-variant font-medium">Loading medicine details...</p>
            </div>
        );
    }

    if (isError || !data?.success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4 text-center">
                <div className="p-4 bg-red-50 text-red-600 rounded-full">
                    <AlertCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-primary">Error fetching details</h2>
                    <p className="text-on-surface-variant max-w-md mx-auto">
                        {(error as any)?.response?.data?.message || "No data was found for this prescription."}
                    </p>
                </div>
                <Button
                    onClick={() => refetch()}
                    className="px-8 py-3 bg-primary text-white font-bold rounded-2xl"
                >
                    Try Again
                </Button>
            </div>
        );
    }

    const prescriptionData = data.data;
    const firstMed = prescriptionData.medicines[0];

    return (
        <div className="mx-auto pb-20 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex items-center gap-6">
                <button
                    onClick={() => router.back()}
                    className="p-3 hover:bg-surface-container rounded-2xl transition-all text-primary"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-primary font-headline">Medicine Details</h1>
                    <p className="text-on-surface-variant font-medium">Detailed information about your prescription.</p>
                </div>
            </header>

            {/* Main Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10"
            >
                <div className="space-y-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-outline-variant/10">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <Stethoscope className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 mb-0.5">Doctor</p>
                                <p className="text-xl font-bold text-primary">Your Doctor</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-surface-container-low rounded-2xl text-on-surface-variant/50">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 mb-0.5">Duration</p>
                                <p className="text-xl font-bold text-primary">{firstMed?.date || "N/A"}</p>
                            </div>
                        </div>

                        {prescriptionData.pdf_url && (
                            <Button asChild variant="outline" className="rounded-2xl border-primary/20 h-14 px-6 gap-2 hover:bg-primary/5">
                                <a href={prescriptionData.pdf_url} target="_blank" rel="noopener noreferrer">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-primary">View PDF</span>
                                </a>
                            </Button>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-primary font-headline flex items-center gap-2">
                            <Pill className="w-6 h-6" />
                            Prescribed Medicines
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {prescriptionData.medicines.map((med, idx) => (
                                <MedicineItem key={idx} medicine={med} />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Action Plan Section (Conclusion & Next Visit) */}
            <MedicineActionPlan
                conclusion={prescriptionData.instructions_by_doctor}
                nextVisitDate={prescriptionData.next_visit_date}
                buttonBgColor="bg-white"
                buttonTextColor="text-[#052116]"
            />
        </div>
    );
}
