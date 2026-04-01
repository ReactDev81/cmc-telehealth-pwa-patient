import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CreditCard, Pill } from "lucide-react";

interface QuickLinksProps {
  prescriptionSummary?: string;
}

export function QuickLinks() {
  // Handler to redirect to /medical-records
  const handleViewTransactions = () => {
    window.open("/transactions", "_blank");
  };
  const handleManageRefills = () => {
    window.open("/my-medicines", "_blank");
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Reports Card */}
      <Card className="rounded-3xl border border-border/50 shadow-sm flex-1 p-0">
        <CardContent className=" flex flex-col h-full p-5 align-end justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-1 font-headline">
              Track Transactions
            </h4>
          </div>
          <Button
            variant="ghost"
            onClick={handleViewTransactions}
            className="mt-4 w-fit p-0 h-auto text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all hover:bg-transparent"
          >
            View all transactions
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
