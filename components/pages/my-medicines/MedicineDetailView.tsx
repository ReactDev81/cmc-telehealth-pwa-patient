"use client";

import {
    Pill,
    ChevronLeft,
    Loader2,
    AlertCircle,
    Stethoscope,
    Calendar as CalendarIcon,
    FileText,
} from "lucide-react";
import { usePrescriptionDetail } from "@/queries/usePrescriptionDetail";
import { MedicineItem } from "@/components/pages/my-medicines/MedicineItem";
import { MedicineActionPlan } from "@/components/pages/my-medicines/MedicineActionPlan";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface MedicineDetailViewProps {
    prescriptionId: string;
    onBack: () => void;
    symptoms?: string;
    showHeader?: boolean;
}

export const MedicineDetailView = ({ prescriptionId, onBack, symptoms, showHeader = true }: MedicineDetailViewProps) => {
    const {
        data: detailResponse,
        isLoading: isDetailLoading,
        isError: isDetailError,
        error: detailError,
    } = usePrescriptionDetail(prescriptionId);

    return (
        <div className="space-y-8 animate-in max-w-5xl  mx-auto fade-in slide-in-from-bottom-4 duration-500">
            {showHeader && (
                <header className="flex items-center gap-6">
                    <button
                        onClick={onBack}
                        className="p-3 hover:bg-surface-container rounded-2xl transition-all text-primary"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <header className="flex gap-6">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-primary font-headline">Medicine Details</h1>
                            <p className="text-on-surface-variant font-medium">
                                {symptoms || "Detailed information about your prescription."}
                            </p>
                        </div>
                    </header>
                </header>
            )}

            {isDetailLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-on-surface-variant font-medium">Loading details...</p>
                </div>
            ) : isDetailError || !detailResponse?.success ? (
                <div className="text-center py-20 bg-destructive/5 rounded-[2rem] border border-dashed border-destructive/20 space-y-4">
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                    <h3 className="text-xl font-bold text-destructive">Failed to load details</h3>
                    <p className="text-on-surface-variant max-w-md mx-auto">
                        {detailError?.message || "There was an error fetching medication details."}
                    </p>
                    <Button onClick={onBack} variant="outline">Go Back</Button>
                </div>
            ) : (
                <div className="space-y-8">
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
                                        <p className="text-xl font-bold text-primary">{detailResponse.data.doctor_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-surface-container-low rounded-2xl text-on-surface-variant/50">
                                        <CalendarIcon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 mb-0.5">Duration</p>
                                        <p className="text-xl font-bold text-primary">{detailResponse.data.medicines[0]?.date || "N/A"}</p>
                                    </div>
                                </div>
                                {detailResponse.data.pdf_url && (
                                    <Button asChild variant="outline" className="rounded-2xl border-primary/20 h-14 px-6 gap-2 hover:bg-primary/5">
                                        <a href={detailResponse.data.pdf_url} target="_blank" rel="noopener noreferrer">
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
                                    {detailResponse.data.medicines.map((med, idx) => (
                                        <MedicineItem key={idx} medicine={med} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <MedicineActionPlan
                        conclusion={detailResponse.data.instructions_by_doctor}
                        nextVisitDate={detailResponse.data.next_visit_date}
                        doctor_id={detailResponse.data.doctor_id}
                    />
                </div>
            )}
        </div>
    );
};
