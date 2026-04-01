export interface Report {
    id: string;
    title: string;
    date: string;
    type: string;
    fileName: string;
    fileUrl?: string;
    file?: File;
}

export interface MedicalRecord {
    id: string;
    title: string;
    date: string;
    doctor: string | { id: string; name: string };
    type: string;
    status: string;
    fileUrl?: string;
}

export interface MedicalReport {
    id: string;
    report_name: string;
    type_label: string;
    report_date_formatted: string;
    file_url: string;
}

export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface MedicalReportsResponse {
    success: boolean;
    data: MedicalReport[];
    pagination: Pagination;
}