"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetchTransactionById } from "@/api/transactions";
import {
    CreditCard,
    Smartphone,
    Banknote,
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    Hash,
    User,
    Stethoscope,
    Receipt,
    ArrowLeft,
    FileText,
    Link2,
    Download,
    File,
    Landmark,
    Building2,
    Copy,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionDetailProps {
    params: { id: string };
}

// Helper function to get status icon and color
const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
        case "paid":
            return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" };
        case "pending":
            return { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" };
        case "cancelled":
        case "failed":
            return { icon: XCircle, color: "text-red-600", bg: "bg-red-50" };
        default:
            return { icon: Clock, color: "text-gray-600", bg: "bg-gray-50" };
    }
};

const getPaymentIcon = (method: string) => {
    switch (method?.toLowerCase()) {
        case "card":
            return CreditCard;
        case "upi":
            return Smartphone;
        default:
            return Banknote;
    }
};

const formatAmount = (amount: string, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency || "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Number(amount));
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

export default function TransactionDetail({ params }: TransactionDetailProps) {
    const router = useRouter();
    const [transaction, setTransaction] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const pdfRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!pdfRef.current || !transaction) return;

        try {
            setDownloading(true);

            // Dynamically import html2canvas and jspdf
            const html2canvasModule = await import("html2canvas");
            const jsPDFModule = await import("jspdf");

            const html2canvas = html2canvasModule.default;
            const jsPDF = jsPDFModule.default;

            // Clone the element to avoid modifying the original
            const element = pdfRef.current.cloneNode(true) as HTMLElement;
            element.style.position = 'absolute';
            element.style.top = '-9999px';
            element.style.left = '-9999px';
            element.style.width = '800px';
            element.style.backgroundColor = '#ffffff';
            document.body.appendChild(element);

            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    backgroundColor: "#ffffff",
                    useCORS: true,
                    logging: false,
                    // Fix for color function error
                    onclone: (clonedDoc, element) => {
                        // Remove any problematic styles
                        const allElements = element.getElementsByTagName('*');
                        for (let i = 0; i < allElements.length; i++) {
                            const el = allElements[i] as HTMLElement;
                            // Remove any lab color styles
                            if (el.style.backgroundColor?.includes('lab')) {
                                el.style.backgroundColor = '';
                            }
                            if (el.style.color?.includes('lab')) {
                                el.style.color = '';
                            }
                        }
                    }
                });

                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 190;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
                pdf.save(`transaction-${transaction.transaction_id || transaction.id}.pdf`);
            } finally {
                // Clean up
                document.body.removeChild(element);
            }
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setDownloading(false);
        }
    };

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                setLoading(true);
                const { id } = await params;
                const data = await fetchTransactionById(id, "");
                console.log("detail data", data);
                setTransaction(data);
            } catch (err: any) {
                console.error("Failed to fetch transaction:", err);
                if (err.response?.status === 401) {
                    setError("Unauthorized. Please login again.");
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000);
                } else {
                    setError("Failed to load transaction details");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [params, router]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">Loading transaction details...</p>
            </div>
        );
    }

    if (error || !transaction) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-red-600">{error || "Transaction not found"}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const StatusIcon = getStatusIcon(transaction.status).icon;
    const statusStyle = getStatusIcon(transaction.status);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                {/* Back Button */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Transactions
                    </button>

                    <Button
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        {downloading ? "Generating..." : "Download PDF"}
                    </Button>
                </div>

                {/* Status Card */}
                <div className={`${statusStyle.bg} rounded-2xl p-6 mb-6 shadow-sm border border-gray-100`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <StatusIcon className={`w-8 h-8 ${statusStyle.color}`} />
                            <div>
                                <p className={`font-semibold text-lg ${statusStyle.color}`}>
                                    {transaction.status_label || transaction.status}
                                </p>
                                <p className="font-medium text-xs text-gray-900">{transaction.date || "N/A"}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Amount</p>
                            <p className="font-bold text-2xl text-gray-900">
                                {formatAmount(transaction.amount, transaction.currency)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Clean Card */}
                <div className="overflow-hidden">
                    {/* Transaction ID */}
                    <div className="px-6 py-5 border-b border-gray-300 flex justify-between items-center">
                        <p className="text-sm text-gray-500">Transaction Id</p>
                        <div className="flex items-center gap-2">
                            <p className="font-mono font-semibold text-base text-gray-900">
                                {transaction.transaction_id && (
                                    <span>{transaction.transaction_id}</span>
                                )}
                            </p>
                            <button
                                onClick={() => copyToClipboard(transaction.id || transaction.transaction_id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {copiedId ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="divide-y divide-gray-200">
                        {/* Paid To */}
                        <div className="px-6 py-5 flex justify-between items-center">
                            <p className="text-gray-600">Paid To</p>
                            <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-900">{transaction.paid_to || "N/A"}</p>
                            </div>
                        </div>

                        {/* Transaction ID (from API) */}
                        {transaction.transaction_id && (
                            <div className="px-6 py-5 flex justify-between items-center">
                                <p className="text-gray-600">Transaction ID</p>
                                <p className="font-mono text-gray-900">{transaction.transaction_id}</p>
                            </div>
                        )}

                        {/* Order ID (for pending transactions or always show) */}
                        {transaction.order_id && (
                            <div className="px-6 py-5 flex justify-between items-center">
                                <p className="text-gray-600">Order ID</p>
                                <p className="font-mono text-gray-900 text-sm">{transaction.order_id}</p>
                            </div>
                        )}

                        {/* Payment Method */}
                        <div className="px-6 py-5 flex justify-between items-center">
                            <p className="text-gray-600">Payment method</p>
                            <p className="font-medium text-gray-900">{transaction.payment_method || "N/A"}</p>
                        </div>

                        {/* Show Bank/UPI details based on payment method */}
                        {(transaction.payment_method?.toLowerCase() !== "upi" && transaction.bank_name) ||
                            (transaction.payment_method?.toLowerCase() === "upi" && (transaction.upi_id || transaction.account_details)) ? (
                            <div className="px-6 py-5 flex justify-between items-center">
                                <p className="text-gray-600">
                                    {transaction.payment_method?.toLowerCase() === "upi" ? "UPI ID" : "Bank Name"}
                                </p>
                                <div className="text-right">
                                    <p className="text-base text-gray-900">
                                        {transaction.payment_method?.toLowerCase() === "upi"
                                            ? (transaction.upi_id || transaction.account_details)
                                            : transaction.bank_name}
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {/* Patient Name (if available) */}
                        {transaction.patient_name && (
                            <div className="px-6 py-5 flex justify-between items-center">
                                <p className="text-gray-600">Patient Name</p>
                                <p className="font-medium text-gray-900">{transaction.patient_name}</p>
                            </div>
                        )}

                        {/* Doctor Name (if available) */}
                        {transaction.doctor_name && (
                            <div className="px-6 py-5 flex justify-between items-center">
                                <p className="text-gray-600">Doctor Name</p>
                                <p className="font-medium text-gray-900">Dr. {transaction.doctor_name}</p>
                            </div>
                        )}
                    </div>

                    {/* Attachments Section */}
                    <div className="px-6 py-6 border-t border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Attachments</h3>

                        {transaction.receipt_url ? (
                            <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <File className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="font-medium text-gray-900">Receipt.pdf</h2>
                                        <p className="text-xs text-gray-500">Online receipt for this transaction</p>
                                    </div>
                                </div>
                                <a
                                    href={transaction.receipt_url}
                                    download
                                    className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                                >
                                    <Download className="w-5 h-5" />
                                </a>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p className="text-sm text-gray-500">No attachments available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden PDF Template */}
            <div className="hidden">
                <div
                    ref={pdfRef}
                    style={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        padding: "40px",
                        width: "800px",
                        fontFamily: "Arial, sans-serif"
                    }}
                >
                    <h2 style={{ color: "#16a34a", fontSize: "24px", marginBottom: "10px" }}>
                        Transaction {transaction.status_label}
                    </h2>
                    <p style={{ color: "#666", marginBottom: "20px" }}>{transaction.date}</p>

                    <hr style={{ margin: "20px 0", borderColor: "#e5e7eb" }} />

                    <div style={{ marginBottom: "20px" }}>
                        <p><strong>Amount:</strong> ₹{transaction.amount}</p>
                        <p><strong>Transaction ID:</strong> {transaction.transaction_id}</p>
                        <p><strong>Paid To:</strong> {transaction.paid_to}</p>
                        {transaction.order_id && <p><strong>Order ID:</strong> {transaction.order_id}</p>}
                        <p><strong>Payment Method:</strong> {transaction.payment_method}</p>
                    </div>

                    {transaction.bank_name && (
                        <p><strong>Bank:</strong> {transaction.bank_name}</p>
                    )}

                    {transaction.upi_id && (
                        <p><strong>UPI ID:</strong> {transaction.upi_id}</p>
                    )}

                    {transaction.patient_name && (
                        <p><strong>Patient:</strong> {transaction.patient_name}</p>
                    )}

                    {transaction.doctor_name && (
                        <p><strong>Doctor:</strong> Dr. {transaction.doctor_name}</p>
                    )}

                    <hr style={{ margin: "20px 0", borderColor: "#e5e7eb" }} />
                    <p style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
                        Generated on {new Date().toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}