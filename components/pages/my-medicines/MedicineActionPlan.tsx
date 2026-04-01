"use client";

import React from 'react';
import {
  Calendar,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ActionPlanProps {
  conclusion: string;
  nextVisitDate: string;
  doctor_id: string;
  conclusionIcon?: LucideIcon;
  nextVisitIcon?: LucideIcon;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonText?: string;
}

export const MedicineActionPlan = ({
  conclusion,
  nextVisitDate,
  doctor_id,
  conclusionIcon: ConclusionIcon = CheckCircle2,
  nextVisitIcon: NextVisitIcon = Calendar,
  buttonBgColor = "bg-white",
  buttonTextColor = "text-[#052116]",
  buttonText = "Reschedule Visit"
}: ActionPlanProps) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Conclusion Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10 space-y-4"
      >
        <div className="flex items-center gap-3 text-primary mb-2">
          <ConclusionIcon className="w-6 h-6" />
          <h3 className="text-xl font-bold font-headline">Conclusion</h3>
        </div>
        <p className="text-on-surface-variant leading-relaxed font-medium">
          {conclusion || "No conclusion provided."}
        </p>
      </motion.div>

      {/* Next Visit Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#052116] text-white rounded-[2.5rem] p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group"
      >
        <div className="flex items-center gap-6 relative z-10">
          <div className="p-4 bg-white/10 rounded-2xl">
            <NextVisitIcon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-headline mb-1 text-white">Next Visit</h3>
            <p className="text-white/70 font-medium">
              {nextVisitDate ? `Scheduled for ${nextVisitDate}` : "Not Scheduled Yet"}
            </p>
          </div>
        </div>

        <Button
          className={cn(
            "w-full md:w-auto px-8 py-7 font-bold rounded-2xl shadow-lg hover:bg-opacity-90 transition-all text-lg relative z-10",
            buttonBgColor,
            buttonTextColor
          )}
          onClick={() => router.push(`/find-doctors/${doctor_id}`)}
        >
          {buttonText}
        </Button>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
      </motion.div>
    </div>
  );
};
