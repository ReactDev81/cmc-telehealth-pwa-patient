import { fetchMyReviews } from "@/api/review";
import { useQuery } from "@tanstack/react-query";


export const useMyReviews = () => {
    return useQuery({
        queryKey: ["my-reviews"],
        queryFn: () => fetchMyReviews(),
        keepPreviousData: true,
    });
};