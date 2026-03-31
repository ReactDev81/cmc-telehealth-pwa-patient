import api from "@/lib/axios";

export const updatePatientPersonalInfo = async (
    userId: string | number,
    payload: any
) => {
    try {
        const formData = new FormData();

        // ✅ Sirf jo payload me hai wahi bhejo
        Object.keys(payload).forEach((key) => {
            if (payload[key] !== undefined && payload[key] !== null) {
                formData.append(key, payload[key]);
            }
        });

        const { data } = await api.post(`/patient/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data?.data;
    } catch (err: any) {
        console.error(
            `Error updating user ${userId}:`,
            err.response?.data || err
        );
        throw err;
    }
};