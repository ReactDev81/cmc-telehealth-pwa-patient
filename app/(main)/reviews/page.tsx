"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMyReviews } from "@/queries/useMyReviews";
import { Star } from "lucide-react";

export default function Page() {

    const [page, setPage] = useState(1);

    const { data, isLoading, isError, isFetching } = useMyReviews(page);
    const reviews = data?.data ?? [];
    const pagination = data?.pagination;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-primary">
                    My Reviews
                </h1>
                <p className="text-muted-foreground mt-2">
                    Manage and view all your doctor reviews.
                </p>
            </div>

            {/* Loading */}
            {isLoading && <p>Loading...</p>}

            {/* Error */}
            {isError && <p>Error loading reviews</p>}

            {/* Empty */}
            {!isLoading && reviews.length === 0 && (
                <div className="text-center py-20 border rounded-xl">
                    <p className="text-lg font-semibold text-muted-foreground">
                        No Reviews Found
                    </p>
                </div>
            )}

            {/* Reviews */}
            <div className="space-y-10">

                {reviews.map((review) => (

                    <div key={review.id} className="border-b pb-8">

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

                            {/* LEFT */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.doctor_avatar}
                                    className="w-14 h-14 rounded-full object-cover"
                                />

                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Dr. {review.doctor_name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {review.doctor_departments}
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="text-right">
                                <div className="flex gap-1 justify-end">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 text-yellow-500 fill-yellow-500"
                                        />
                                    ))}
                                </div>

                                <p className="text-sm font-bold text-muted-foreground mt-1">
                                    Visited: {review.created_at}
                                </p>
                            </div>
                        </div>

                        {/* Title */}
                        <p className="mt-4 text-primary text-lg font-bold">
                            {review.title}
                        </p>

                        {/* Content */}
                        <p className="mt-4 text-muted-foreground text-lg italic whitespace-pre-line">
                            "{review.content}"
                        </p>
                    </div>
                ))}
            </div>

            {/* ✅ PAGINATION */}
            {pagination && (
                <div className="flex justify-end items-center mt-10 gap-4">

                    <Button
                        variant="outline"
                        disabled={page === 1 || isFetching}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Previous
                    </Button>

                    <span className="text-sm text-muted-foreground">
                        Page {pagination.current_page} of {pagination.last_page}
                    </span>

                    <Button
                        variant="outline"
                        disabled={page === pagination.last_page || isFetching}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </Button>

                </div>
            )}
        </div>
    );
}