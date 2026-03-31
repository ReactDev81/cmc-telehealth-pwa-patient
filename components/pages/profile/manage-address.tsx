"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManageAddressFormProps {
    user: any;
}

export default function ManageAddressForm({ user }: ManageAddressFormProps) {
    const address = user?.address || {};

    return (
        <div className="w-full mt-7">
            <div className="p-0">
                <div className="space-y-6">
                    {/* House/Floor/Flat Number */}
                    <div className="space-y-2">
                        <Label className="text-sm text-primary font-bold">
                            House / Floor / Flat Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            defaultValue={address.address || ""}
                            placeholder="Type Here"
                            className="h-11 rounded-lg bg-gray-50 border-primary"
                        />
                    </div>

                    {/* Area Details with location info */}
                    <div className="space-y-2">
                        <Label className="text-sm text-primary font-bold">Area Details</Label>
                        <Input
                            type="text"
                            defaultValue={address.area || "364, Sector32A, Ludhiana, PUNJAB, 141010"}
                            className="h-11 rounded-lg bg-gray-50 border-primary"
                        />
                        <div className="flex items-center gap-2 mt-1">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Landmark with distance */}
                    <div className="space-y-2">
                        <Label className="text-sm text-primary font-bold">Landmark</Label>
                        <Input
                            type="text"
                            defaultValue={address.landmark || "Decathlon Production Office Ludhiana"}
                            className="h-11 rounded-lg bg-gray-50 border-primary"
                        />
                        <div className="flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Pincode, City, State in grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm text-primary font-bold">Pincode</Label>
                            <Input
                                type="text"
                                defaultValue={address.pincode || "141003"}
                                className="h-11 rounded-lg bg-gray-50 border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-primary font-bold">City</Label>
                            <Input
                                type="text"
                                defaultValue={address.city || "Ludhiana"}
                                className="h-11 rounded-lg bg-gray-50 border-primary"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm text-primary font-bold">State</Label>
                        <Input
                            type="text"
                            defaultValue={address.state || "141003"}
                            className="h-11 rounded-lg bg-gray-50 border-primary"
                        />
                    </div>

                    {/* Action Buttons */}
                   
                       
                        <Button className="py-6 w-full font-bold text-sm">Save & Next</Button>
                    
                </div>
            </div>
        </div>
    );
}