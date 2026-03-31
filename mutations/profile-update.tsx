import api from "@/lib/axios";

//! Update patient personal info only
export const updatePatientPersonalInfo = async (
    userId: string | number,
    payload: {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
        date_of_birth?: string;
        bio?: string;
    }
) => {
    try {
        const { data } = await api.put(`/patient/${userId}`, payload);
        // PUT request to {{baseUrl}}/patient/:user_id
        return data?.data;
    } catch (err: any) {
        console.error(`Error updating personal info for user ${userId}:`, err.response || err);
        throw err;
    }
};