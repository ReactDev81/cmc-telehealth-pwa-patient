"use client";

import { Pill, ChevronLeft, Loader2, AlertCircle, Stethoscope, Calendar as CalendarIcon, FileText } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/userContext";
import { usePrescriptions } from "@/queries/usePrescriptions";
import { usePrescriptionDetail } from "@/queries/usePrescriptionDetail";
import { MedicineCard } from "@/components/pages/my-medicines/MedicineCard";
import { MedicineItem } from "@/components/pages/my-medicines/MedicineItem";
import { MedicineActionPlan } from "@/components/pages/my-medicines/MedicineActionPlan";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import CustomTabs from "@/components/custom/CustomTabs";
import { motion } from "motion/react";

const MyMedicines = () => {
    const [activeTab, setActiveTab] = useState<"current" | "past">("current");
    const [selectedMedicineId, setSelectedMedicineId] = useState<string | null>(null);
    const { user } = useAuth();
    const patientID = user?.patient_id;

    const { data: prescriptionsResponse, isLoading: isListLoading, isError: isListError } = usePrescriptions({
        patientID,
        filter: activeTab,
    });

    const { data: detailResponse, isLoading: isDetailLoading, isError: isDetailError, error: detailError } =
        usePrescriptionDetail(selectedMedicineId || undefined);

    const prescriptions = prescriptionsResponse?.data || [];

    if (selectedMedicineId) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="flex items-center gap-6">
                    <button
                        onClick={() => setSelectedMedicineId(null)}
                        className="p-3 hover:bg-surface-container rounded-2xl transition-all text-primary"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-primary font-headline">Medicine Details</h1>
                        <p className="text-on-surface-variant font-medium">Detailed information about your prescription.</p>
                    </div>
                </header>

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
                        <Button onClick={() => setSelectedMedicineId(null)} variant="outline">Go Back</Button>
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
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-2 font-headline">
                    My Medicines
                </h1>
                <p className="text-on-surface-variant text-lg">
                    Track your current and past medications.
                </p>
            </header>

            <CustomTabs
                variant="pill"
                activeTabBg="#013220"
                activeTabColor="white"
                tabs={[
                    { key: "current", label: "Current Medicine" },
                    { key: "past", label: "Past Medicine" },
                ]}
                activeTab={activeTab}
                onTabChange={(val) => setActiveTab(val as "current" | "past")}
                className="max-w-md"
            />

            {isListLoading ? (
                <div className="grid grid-cols-1 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-[200px] w-full rounded-[2rem]" />
                    ))}
                </div>
            ) : isListError ? (
                <div className="text-center py-20 bg-destructive/5 rounded-[2rem] border border-dashed border-destructive/20">
                    <h3 className="text-xl font-bold text-destructive mb-2">
                        Failed to load medicines
                    </h3>
                    <p className="text-on-surface-variant">
                        There was an error fetching your medications. Please try again later.
                    </p>
                </div>
            ) : prescriptions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {prescriptions.map((prescription) => (
                        <MedicineCard
                            key={prescription.appointment_id}
                            prescription={prescription}
                            status={activeTab}
                            onViewDetail={(id) => setSelectedMedicineId(id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-surface-container-low rounded-[2rem] border border-dashed border-outline-variant/20">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-on-surface-variant/30">
                        <Pill className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                        No medicines found
                    </h3>
                    <p className="text-on-surface-variant">
                        You don't have any {activeTab} medications at the moment.
                    </p>
                </div>
            )}
        </div>
    );
};


export default MyMedicines;

