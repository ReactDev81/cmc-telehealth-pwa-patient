import api from "@/lib/axios";


export const fetchMyReviews = async () => {
    try {
        const { data } = await api.get(`/reviews/my`);
        console.log("API RESPONSE:", data);
        return data;
    } catch (error) {
        console.error("API ERROR:", error);
        throw error;
    }
};