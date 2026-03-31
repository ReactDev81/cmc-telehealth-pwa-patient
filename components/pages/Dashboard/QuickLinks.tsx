import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Pill } from "lucide-react";

interface QuickLinksProps {
  reportSummary?: string;
  prescriptionSummary?: string;
  onViewReports: () => void;
  onManageRefills: () => void;
}

export function QuickLinks({
  reportSummary = "Blood Work Result: Normal",
  prescriptionSummary = "2 Active medications • Refill ready",
  onViewReports,
  onManageRefills,
}: QuickLinksProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Reports Card */}
      <Card className="rounded-3xl border border-border/50 shadow-sm flex-1 p-0">
        <CardContent className=" flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary/20 rounded-xl">
                <FileText className="w-6 h-6 text-secondary-foreground" />
              </div>
              <Badge
                variant="secondary"
                className="text-[10px] font-bold uppercase tracking-widest"
              >
                New
              </Badge>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-1 font-headline">
              Reports
            </h4>
            <p className="text-muted-foreground text-sm">{reportSummary}</p>
          </div>
          <Button
            variant="ghost"
            onClick={onViewReports}
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
              <div className="p-3 bg-primary/10 rounded-xl">
                <Pill className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-1 font-headline">
              Prescriptions
            </h4>
            <p className="text-muted-foreground text-sm">
              {prescriptionSummary}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onManageRefills}
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
