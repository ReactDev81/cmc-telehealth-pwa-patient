"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PersonalInfoFormProps {
    user: any;
}

export default function PersonalInfoForm({ user }: PersonalInfoFormProps) {
    // ✅ local state to capture input edits
    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        date_of_birth: user?.date_of_birth || "",
        bio: user?.bio || "",
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form className="space-y-10 animate-in fade-in duration-500 mt-7" onSubmit={(e) => e.preventDefault()}>
            <div className="rounded-2xl">
                <div className="space-y-10">
                    {/* Profile Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-primary border-b">
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-3xl overflow-hidden ring-4 ring-primary/20 shadow-xl">
                                <img
                                    src={user?.avatar || "https://picsum.photos/seed/user_settings/400/400"}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <Button size="icon" className="absolute -bottom-2 -right-2 rounded-xl">
                                <Camera className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="font-semibold text-xl text-primary">Profile Picture</h2>
                            <p className="text-sm text-muted-foreground mt-1 mb-4">
                                PNG, JPG or GIF. Max size of 1MB.
                            </p>
                            <div className="flex gap-3 justify-center md:justify-start">
                                <Button variant="outline">Upload New</Button>
                                <Button variant="ghost" className="text-red-500">Remove</Button>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        {[
                            {
                                label: "Full Name",
                                fields: ["first_name", "last_name"], // ✅ combined for display
                                type: "text",
                            },
                            { label: "Email Address", fields: ["email"], type: "email" },
                            { label: "Phone Number", fields: ["phone"], type: "tel" },
                            { label: "Date of Birth", fields: ["date_of_birth"], type: "text" },
                        ].map((field) => (
                            <div key={field.label} className="space-y-2">
                                <Label className="text-xs uppercase tracking-widest text-primary font-bold">
                                    {field.label}
                                </Label>
                                <Input
                                    type={field.type}
                                    value={field.fields.length === 2
                                        ? `${formData.first_name} ${formData.last_name}`
                                        : formData[field.fields[0] as keyof typeof formData]}
                                    onChange={(e) => {
                                        if (field.fields.length === 2) {
                                            const [first, last] = e.target.value.split(" ");
                                            handleChange("first_name", first || "");
                                            handleChange("last_name", last || "");
                                        } else {
                                            handleChange(field.fields[0], e.target.value);
                                        }
                                    }}
                                    className="h-12 border-primary rounded-xl"
                                />
                            </div>
                        ))}

                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-xs uppercase tracking-widest text-primary font-bold">
                                Short Bio
                            </Label>
                            <Textarea
                                rows={3}
                                value={formData.bio}
                                onChange={(e) => handleChange("bio", e.target.value)}
                                className="rounded-xl border-primary"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t">
                        <Button variant="ghost">Discard</Button>
                        <Button
                            className="px-6"
                            onClick={() => {
                                console.log("Updated Personal Info (not saved):", formData);
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}