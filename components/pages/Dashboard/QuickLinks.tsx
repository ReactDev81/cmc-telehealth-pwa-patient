"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Pill } from "lucide-react";

interface QuickLinksProps {
    reportSummary?: string;
    prescriptionSummary?: string;
}

export function QuickLinks() {
    // Handler to redirect to /medical-records
    const handleViewReports = () => {
        window.open("/reviews", "_blank");
    };
    const handleManageRefills = () => {
        window.open("/transactions", "_blank");
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Reports Card */}
            <Card className="rounded-3xl border border-border/50 shadow-sm flex-1 p-0">
                <CardContent className=" flex flex-col h-full p-5 align-end justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-[#d1e4d7] rounded-xl">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-foreground mb-1 font-headline">
                            Reviews
                        </h4>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleViewReports}
                        className="mt-4 w-fit p-0 h-auto text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all hover:bg-transparent"
                    >
                        View all reports
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>

            {/* Prescriptions Card */}
            <Card className="rounded-3xl border border-border/50 shadow-sm flex-1">
                <CardContent className="p-6 flex flex-col h-full justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-[#ffdad9] rounded-xl">
                                <Pill className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-foreground mb-1 font-headline">
                            Transactions
                        </h4>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleManageRefills}
                        className="mt-4 w-fit p-0 h-auto text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all hover:bg-transparent"
                    >
                        Manage refills
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
