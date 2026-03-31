'use client';
import { FileText, Pill } from 'lucide-react';

const PreAppointmentChecklist = () => {
    return (
        <div className="bg-[#0A2E1F] rounded-[32px] p-8 text-white relative overflow-hidden mt-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8">
                <div className="max-w-xl">
                    <h2 className="text-2xl font-bold mb-3 font-headline">Pre-appointment Checklist</h2>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                        Ensure you have your latest medical history and current medications list ready before your session.
                    </p>
                    <button className="px-6 py-3 bg-white text-[#0A2E1F] rounded-xl font-bold text-sm shadow-lg hover:bg-surface transition-all">
                        View Preparation Guide
                    </button>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/10 p-4 rounded-[24px] flex flex-col items-center justify-center gap-2 w-32 h-32 border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-center">Medical Records</span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-[24px] flex flex-col items-center justify-center gap-2 w-32 h-32 border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <Pill className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-center">Meds List</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreAppointmentChecklist;