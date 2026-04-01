"use client";

import { useRef } from "react";

export default function TransactionPDF({ data }) {
    const pdfRef = useRef();

    const handleDownload = async () => {
        const html2canvas = (await import("html2canvas")).default;
        const jsPDF = (await import("jspdf")).default;

        const element = pdfRef.current;

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("transaction.pdf");
    };

    return (
        <div className="p-5">

            {/* 📄 PDF Content */}
            <div
                ref={pdfRef}
                className="bg-white p-6 rounded-xl shadow-md w-[400px]"
            >
                <h2 className="text-red-500 font-bold text-lg">Failed</h2>
                <p className="text-sm text-gray-500">{data.date}</p>

                <div className="mt-4">
                    <p><strong>Amount:</strong> ₹{data.amount}</p>
                    <p><strong>Transaction ID:</strong> {data.transactionId}</p>
                    <p><strong>Paid To:</strong> {data.name}</p>
                    <p><strong>Order ID:</strong> {data.orderId}</p>
                    <p><strong>Payment Method:</strong> {data.method}</p>
                    <p><strong>Bank:</strong> {data.bank}</p>
                </div>
            </div>

            {/* 🔘 Button */}
            <button
                onClick={handleDownload}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Download PDF
            </button>
        </div>
    );
}