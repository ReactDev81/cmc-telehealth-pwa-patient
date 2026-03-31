"use client";

import React from "react";
import { useAuth } from "@/context/userContext";
import CustomTabs, { TabItem } from "@/components/custom/CustomTabs";
import PersonalInfoForm from "@/components/pages/profile/personal-info";
import ManageAddressForm from "@/components/pages/profile/manage-address";


export default function ProfileTabs() {
    const { user } = useAuth();
    

    if (!user) return <p>Loading...</p>;

    const tabs: TabItem[] = [
        {
            key: "personal_info",
            label: "Personal Info",
            content: <PersonalInfoForm user={user} />,
        },
        {
            key: "manage_address",
            label: "Manage Address",
            content: <ManageAddressForm user={user} />,
        },
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto mt-5">
            <div>
                <h1 className="text-primary text-4xl font-extrabold">Account Settings</h1>
                <p className="text-gray-700 mt-2">Manage your medical profile and personal preferences.</p>
            </div>
            <CustomTabs
                tabs={tabs}
              
                defaultTab="personal_info"
                color="primary"
                tabsListClassName="bg-transparent rounded-lg justify-start gap-2 mt-5"
                tabsTriggerClassName="px-2 py-4 rounded-lg hover:bg-gray-200 text-sm max-w-50" // ✅ width auto
                tabsContentClassName="bg-transparent gap-2 p-0"
            />
        </div>
    );
}