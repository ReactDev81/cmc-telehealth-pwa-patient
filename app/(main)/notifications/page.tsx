"use client";

import { useNotifications, useUnreadCount } from "@/queries/useNotifications";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Clock, FileText, Pill, Calendar, CreditCard, MessageSquare, Loader2, CircleCheck, CheckCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomTabs from "@/components/custom/CustomTabs";
import { fetchNotifications, markAllAsRead, markNotificationAsRead } from "@/api/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/userContext";
// Import your API function

const getIcon = (group: string) => {
    switch (group?.toLowerCase()) {
        case "appointment":
            return {
                icon: Calendar,
                color: "text-blue-500",
                bg: "bg-blue-50 dark:bg-blue-950/30",
                label: "Appointment"
            };
        case "lab":
        case "lab_result":
            return {
                icon: FileText,
                color: "text-purple-500",
                bg: "bg-purple-50 dark:bg-purple-950/30",
                label: "Lab Result"
            };
        case "prescription":
            return {
                icon: Pill,
                color: "text-green-500",
                bg: "bg-green-50 dark:bg-green-950/30",
                label: "Prescription"
            };
        case "message":
            return {
                icon: MessageSquare,
                color: "text-amber-500",
                bg: "bg-amber-50 dark:bg-amber-950/30",
                label: "Message"
            };
        case "reminder":
            return {
                icon: Bell,
                color: "text-orange-500",
                bg: "bg-orange-50 dark:bg-orange-950/30",
                label: "Reminder"
            };
        case "payment":
            return {
                icon: CreditCard,
                color: "text-emerald-500",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
                label: "Payment"
            };
        default:
            return {
                icon: Bell,
                color: "text-gray-500",
                bg: "bg-gray-50 dark:bg-gray-950/30",
                label: "Notification"
            };
    }
};

interface Notification {
    id: string | number;
    title: string;
    desc: string;
    group: string;
    is_read: boolean;
    created_at: string;
    // add other fields as needed
}

interface NotificationsResponse {
    data: Notification[];
    pagination?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    meta?: any;
}

export default function Notifications() {
    const { data, isLoading, error } = useNotifications() as {
        data: NotificationsResponse | undefined;
        isLoading: boolean;
        error: any;
    };
    const [activeTab, setActiveTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allNotifications, setAllNotifications] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [meta, setMeta] = useState<any>(null);
    const { data: totalUnread = 0 } = useUnreadCount();
    console.log(totalUnread);

    const { login, user } = useAuth();

    console.log("user data" , user);

    const router = useRouter();


    const queryClient = useQueryClient();

    const handleMarkAllRead = async () => {
        try {
            const res = await markAllAsRead();

            // ✅ API se unread count nikalo
            const unread = res?.data?.unread_count ?? 0;

            // ✅ 1. Unread count instantly update karo (badge ke liye)
            queryClient.setQueryData(["unread-count"], unread);

            // ✅ 2. Local notifications ko read mark karo (green dot hatao instantly)
            setAllNotifications(prev =>
                prev.map(item => ({
                    ...item,
                    is_read: true
                }))
            );

            // ✅ 3. Background me fresh data bhi fetch ho jaye
            queryClient.invalidateQueries({ queryKey: ["notifications"] });

        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };


    useEffect(() => {
        if (data?.data) {
            setAllNotifications(data.data);
            setTotalPages(data?.pagination?.last_page || 1);
            setCurrentPage(data?.pagination?.current_page || 1);
            setMeta(data.meta);
        }
    }, [data]);

    if (isLoading && currentPage === 1) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="animate-pulse text-muted-foreground">Loading notifications...</div>
            </div>
        );
    }

    if (error && currentPage === 1) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="text-red-500">Error loading notifications. Please try again.</div>
            </div>
        );
    }


    const hasMorePages = currentPage < totalPages;

    const filteredNotifications =
        activeTab === "unread"
            ? allNotifications.filter(item => !item.is_read)
            : allNotifications;

    // Load more notifications
    const loadMore = async () => {
        if (loadingMore || !hasMorePages) return;

        setLoadingMore(true);
        const nextPage = currentPage + 1;

        try {
            const newData = await fetchNotifications(nextPage);

            if (newData?.data?.length > 0) {
                setAllNotifications(prev => [...prev, ...newData.data]);
                setCurrentPage(nextPage);
                setMeta(newData.meta);
            }
        } catch (error) {
            console.error("Error loading more notifications:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Tabs configuration
    const tabs = [
        {
            key: "all",
            label: (
                <div className="flex items-center gap-1">
                    All
                </div>
            )
        },
        {
            key: "unread",
            label: (
                <div className="flex items-center gap-1">
                    Unread
                    {totalUnread > 0 && (
                        <Badge variant="secondary" className="ml-2 bg-muted">
                            {totalUnread}
                        </Badge>
                    )}
                </div>
            )
        }
    ];

    // Render notifications content
    const renderNotifications = () => {
        if (filteredNotifications.length === 0) {
            return (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Bell className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                        <p className="text-muted-foreground text-center">
                            No {activeTab === "unread" ? "unread" : ""} notifications
                        </p>
                        <p className="text-sm text-muted-foreground text-center">
                            {activeTab === "all" ? "You're all caught up!" : "Check back later for updates."}
                        </p>
                    </CardContent>
                </Card>
            );
        }

        return (
            <div className="space-y-3 mt-5">
                {filteredNotifications.map((item: Notification) => {
                    const { icon: Icon, color, bg } = getIcon(item.group);

                    return (
                        <Card
                            key={item.id}
                            className={`group hover:shadow-md transition-all rounded-4xl duration-300 cursor-pointer ${!item.is_read ? 'bg-muted/5' : ''}`}
                            onClick={() => {
                                console.log("View notification:", item.id);
                                // router.push(`/notifications/${item.id}`);
                            }}
                        >
                            <CardContent className="p-4 relative">
                                <div className="relative flex items-start gap-4">

                                    <div className={`p-2.5 rounded-xl ${bg} shrink-0`}>
                                        <Icon className={`h-6 w-6 ${color}`} />
                                    </div>

                                    {!item.is_read && (
                                        <div className="absolute -top-5 -right-1 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-950 animate-pulse" />
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                                            <h3 className={`text-primary text-lg font-semibold ${!item.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {item.title}
                                            </h3>

                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {item.created_at}
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* ✅ Bottom Right Icon */}

                                {!item.is_read && (
                                    <CheckCheck
                                        onClick={async (e) => {
                                            e.stopPropagation();

                                            try {
                                                await markNotificationAsRead(item.id);

                                                // ✅ UI update
                                                setAllNotifications(prev =>
                                                    prev.map(n =>
                                                        String(n.id) === String(item.id)
                                                            ? { ...n, is_read: true }
                                                            : n
                                                    )
                                                );

                                                // ✅ unread count update
                                                queryClient.setQueryData(["unread-count"], (old: number = 0) =>
                                                    old > 0 ? old - 1 : 0
                                                );

                                            } catch (error) {
                                                console.error("Failed to mark notification as read", error);
                                            }
                                        }}
                                        className="h-5 w-5 absolute right-3 bottom-2 cursor-pointer text-muted-foreground hover:text-green-500 transition"
                                    />
                                )}
                            </CardContent>
                        </Card>
                    );
                })}

                {/* Load More Button */}
                {hasMorePages && (
                    <div className="mt-8 text-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-primary text-lg gap-2 h-12 w-auto px-5"
                            onClick={loadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Load more Notifications"
                            )}
                        </Button>
                    </div>
                )}

                {/* End of list message */}
                {!hasMorePages && filteredNotifications.length > 0 && (
                    <div className="mt-6 text-center">
                        <p className="text-xs text-muted-foreground">
                            You've seen all {filteredNotifications.length} notifications
                        </p>
                    </div>
                )}
            </div>
        );
    };

    // Content for each tab
    const tabsWithContent = tabs.map(tab => ({
        ...tab,
        content: renderNotifications()
    }));

    return (
        <div className="container max-w-4xl mx-auto py-6 px-4">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-primary">Notifications</h1>
                </div>
                <p className="text-muted-foreground w-140">
                    Stay updated on your health journey. Here you'll find reminders, test results, and messages from your clinical team.
                </p>
            </div>

            {/* Custom Tabs */}
            <div className="flex items-center justify-between mb-4 relative">

                {/* Tabs */}
                <CustomTabs
                    tabs={tabsWithContent}
                    defaultTab="all"
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    color="primary"
                    tabsTriggerClassName="px-6 py-2 rounded-lg hover:bg-gray-200"
                    tabsListClassName="bg-transparent gap-2 p-0 w-50! ml-0"
                />

                {/* Right Side Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 px-2 text-sm text-primary absolute right-0 top-4 -translate-y-1/2 
             bg-transparent shadow-none 
             hover:bg-transparent 
             underline-offset-4 
             hover:underline 
             decoration-primary flex items-center gap-1"
                    onClick={handleMarkAllRead}
                    disabled={totalUnread === 0}
                >
                    <CircleCheck className="h-4 w-4" />
                    Mark all as read
                </Button>
            </div>

        </div>
    );
}