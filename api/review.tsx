import api from "@/lib/axios";

export const fetchMyReviews = async (page = 1, per_page = 1) => {
    const { data } = await api.get(`/reviews/my?per_page=${per_page}&page=${page}`);
    return data;
};