"use client";

import { useTransactions } from "@/queries/transactions";
import { Card } from "@/components/ui/card";
import {
    CreditCard,
    Smartphone,
    Banknote,
    CheckCircle,
    XCircle,
    Clock
} from "lucide-react";
import CustomTabs from "@/components/custom/CustomTabs";
import { getStatusColor } from "@/src/utils/getStatusColor";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Transactions() {
    const router = useRouter();
    const { data, isLoading } = useTransactions();
    const [activeTab, setActiveTab] = useState("All");


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">Loading transactions...</p>
            </div>
        );
    }

    const transactions = data?.data || [];

    // ✅ Create a map of status to status_label for display
    const getStatusLabel = (status: string) => {
        const transaction = transactions.find((t: any) => t.status === status);
        return transaction?.status_label || status.charAt(0).toUpperCase() + status.slice(1);
    };

    // ✅ Get unique statuses with their labels for tabs
    const uniqueStatuses = [...new Set(transactions.map((t: any) => t.status))];
    const allStatuses = ["All", ...uniqueStatuses];

    // ✅ filter logic
    const getFilteredTransactions = (status: string) => {
        if (status === "All") return transactions;
        return transactions.filter((t: any) => t.status === status);
    };

    // ✅ Get current tab's filtered transactions
    const currentTransactions = getFilteredTransactions(activeTab);
    const currentCount = currentTransactions.length;
    const totalCount = data?.pagination?.total || transactions.length;

    // ✅ icons
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "paid":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "pending":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "cancelled":
                return <XCircle className="w-5 h-5 text-red-500" />;
            case "failed":
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return null;
        }
    };

    const getPaymentIcon = (method: string) => {
        switch (method?.toLowerCase()) {
            case "card":
                return <CreditCard className="w-5 h-5 text-blue-500" />;
            case "upi":
                return <Smartphone className="w-5 h-5 text-purple-500" />;
            default:
                return <Banknote className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatAmount = (amount: string, currency: string) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency || "INR",
        }).format(Number(amount));
    };

    // ✅ Tabs config with status_label
    const tabs = allStatuses.map((status) => {
        // Get display label for the tab
        let displayLabel = status;
        if (status !== "All") {
            // Find the first transaction with this status to get its status_label
            const sampleTransaction = transactions.find((t: any) => t.status === status);
            displayLabel = sampleTransaction?.status_label || status.charAt(0).toUpperCase() + status.slice(1);
        }

        return {
            key: status,
            label: (
                <div className="flex items-center gap-2">
                    <span>{displayLabel}</span>
                    {status !== "All" && (
                        <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full">
                            {transactions.filter((t: any) => t.status === status).length}
                        </span>
                    )}
                </div>
            ),
            content: (
                <div className="space-y-3 mt-4">
                    {getFilteredTransactions(status).map((item: any) => (
                        <div
                            key={item.id}
                            className="p-6 border-b border-gray-100 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                            onClick={() => router.push(`/transactions/${item.id}`)}
                        >
                            <div className="flex justify-between items-center">
                                {/* LEFT */}
                                <div className="flex gap-3 items-center">
                                    <div className={`text-xs p-2 rounded-full ${getStatusColor(
                                        "payment",
                                        item.status
                                    )}`}>
                                        {getStatusIcon(item.status)}
                                    </div>

                                    <div>
                                        <div className="flex gap-2 items-center">
                                            <p className="font-semibold text-base">
                                                {item.patient_name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {item.payment_method}
                                            </p>
                                            {/* Status badge */}

                                        </div>
                                        <div className="text-sm mt-1 text-muted-foreground flex gap-2 flex-wrap">
                                            {item.status === "pending" ? (
                                                item.order_id && (
                                                    <p className="text-xs text-gray-400">
                                                        Order ID: {item.order_id}
                                                    </p>
                                                )
                                            ) : (
                                                item.transaction_id && (
                                                    <p className="text-xs text-gray-400">
                                                        ID: {item.transaction_id}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className="text-right">
                                    <p className="font-bold text-lg">
                                        {formatAmount(item.amount, item.currency)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {getFilteredTransactions(status).length === 0 && (
                        <div className="text-center py-10 text-muted-foreground">
                            No {displayLabel} transactions found
                        </div>
                    )}
                </div>
            ),
        };
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                Transactions
            </h1>

            {/* ✅ Custom Tabs */}
            <CustomTabs
                tabs={tabs}
                defaultTab="All"
                onTabChange={setActiveTab}
                tabsListClassName="justify-start bg-transparent gap-3 w-50"
                tabsTriggerClassName="rounded-full text-gray-700 px-4 py-2
                data-[state=active]:bg-primary data-[state=active]:text-white"
            />

            {/* Pagination Info - Now shows count based on active tab */}
            {data?.pagination && (
                <p className="text-center text-sm text-muted-foreground mt-6">
                    Showing {currentCount} of {activeTab === "All" ? totalCount : currentCount} {activeTab !== "All" && getStatusLabel(activeTab).toLowerCase()} transactions
                </p>
            )}
        </div>
    );
}