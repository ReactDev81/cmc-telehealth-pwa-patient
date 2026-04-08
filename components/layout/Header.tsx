"use client";
import { ReactNode } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Separator,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui";
import { useAuth } from "@/context/userContext";
import { cn } from "@/lib/utils";
import icon from "@/public/assets/icon/logo-light.png";
import { useUnreadCount } from "@/queries/useNotifications";
// import { NotificationDropdown } from "./NotificationDropdown";
// import type { NavItem } from "@/types/header";
import {
    Bell,
    Calendar,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    Pill,
    ClipboardPlus,
    User as UserIcon,
    ChevronDown,
    Star,
    Banknote,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
    title: string
    href: string
    icon: ReactNode
    badge?: string | number
}

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: unreadData } = useUnreadCount();

    // Use actual media query for responsive check
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1200); // lg breakpoint
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Listen scroll for sticky effect (optional, or remove if unused)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    const { user, initializing, logout } = useAuth();

    // For notification label (Name fallback)
    const name =
        user && (user.first_name || user.last_name)
            ? `${user.role === "doctor" ? "Dr. " : ""}${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
            : "User";

    const navItems: NavItem[] = [
        {
            title: "Dashboard",
            href: "/",
            icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
            title: "Find Doctors",
            href: "/find-doctors",
            icon: <Calendar className="h-4 w-4" />,
        },
        {
            title: "My Appointments",
            href: "/appointments",
            icon: <UserIcon className="h-4 w-4" />,
        },
        {
            title: "Medical Records",
            href: "/medical-records",
            icon: <ClipboardPlus className="h-4 w-4" />,
        },
        {
            title: "My Medicines",
            href: "/my-medicines",
            icon: <Pill className="h-4 w-4" />,
        },
    ];

    const mobileMenuItems = [
        ...navItems,
        {
            title: "My Reviews",
            href: "/reviews",
            icon: <Star className="h-4 w-4" />,
            badge: undefined,
        },
        {
            title: "Transactions",
            href: "/transactions",
            icon: <Banknote className="h-4 w-4" />,
            badge: undefined,
        },
    ];

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm",
                isScrolled
                    ? "bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60 border-b"
                    : "bg-background",
            )}
        >
            <div className="flex h-16 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 container mx-auto">
                {/* Logo and App Name */}
                <Link href="/" className="flex items-center space-x-2 shrink-0">
                    <Image
                        src={icon}
                        alt="Logo"
                        width={180}
                        height={32}
                        className="w-28 sm:w-32 md:w-44 h-auto"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                {isDesktop && (
                    <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-2 rounded-md px-2 lg:px-3 py-2 text-sm lg:text-base font-semibold transition-colors",
                                    pathname === item.href
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                                )}
                            >
                                {item.icon}
                                <span className="hidden xl:inline">{item.title}</span>
                                {item.badge ? (
                                    <Badge
                                        variant={pathname === item.href ? "secondary" : "default"}
                                        className="ml-auto flex h-5 w-5 items-center justify-center text-[10px] bg-primary/10! rounded-full p-4"
                                    >
                                        {Number(item.badge) > 99 ? "99+" : item.badge}
                                    </Badge>
                                ) : null}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                    {/* Notification Bell */}
                    <Link href="/notifications">
                        <div className="relative">
                            <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
                                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                            {unreadData > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
                                    {unreadData > 99 ? "99+" : unreadData}
                                </span>
                            )}
                        </div>
                    </Link>

                    {user || initializing ? (
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Desktop User Info */}
                            <div className="flex-col text-right hidden lg:flex">
                                <span className="text-xs sm:text-sm font-semibold leading-none">
                                    {initializing ? "unknown name" : name}
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-muted-foreground font-medium">
                                    {initializing
                                        ? "unknown email"
                                        : user?.email || "healthcare@info.test"}
                                </span>
                            </div>

                            {/* Desktop Avatar Dropdown */}
                            <div className="hidden lg:block">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-1 sm:gap-2 h-8 sm:h-10 px-1.5 sm:px-2 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-all"
                                        >
                                            <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-background">
                                                <AvatarImage src={user?.avatar || ""} alt={name} />
                                                <AvatarFallback>
                                                    <UserIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-0.5 sm:mr-1" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-56 rounded-xl p-2" align="end" sideOffset={8}>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem asChild className="rounded-md cursor-pointer py-2">
                                                <Link href="/profile" className="flex items-center">
                                                    <UserIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">My Profile</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-md cursor-pointer py-2">
                                                <Link href="/reviews" className="flex items-center">
                                                    <Star className="mr-3 h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">My Reviews</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-md cursor-pointer py-2">
                                                <Link href="/transactions" className="flex items-center">
                                                    <Banknote className="mr-3 h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">Transactions</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator className="my-2" />

                                        <DropdownMenuItem
                                            className="rounded-md cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                                            onClick={logout}
                                            disabled={initializing}
                                        >
                                            <LogOut className="mr-3 h-4 w-4" />
                                            <span className="font-semibold">Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Mobile Menu Button */}
                            {!isDesktop && (
                                <Sheet
                                    open={isMobileMenuOpen}
                                    onOpenChange={setIsMobileMenuOpen}
                                >
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                                            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </Button>
                                    </SheetTrigger>

                                    <SheetContent
                                        side="right"
                                        className="w-70 sm:w-87.5 p-0"
                                    >
                                        <SheetHeader className="border-b p-4">
                                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                            {/* Profile Section - Mobile Menu */}
                                            <div className="bg-muted/10">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={user?.avatar || ""} alt={name} />
                                                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                                            {name.charAt(0) || "U"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold truncate">
                                                            {initializing ? "Loading..." : name}
                                                        </p>
                                                        <p className="text-[11px] text-muted-foreground truncate">
                                                            {initializing ? "Loading..." : user?.email || "healthcare@info.test"}
                                                        </p>
                                                        <Link
                                                            href="/profile"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="inline-block mt-1 text-[10px] text-primary hover:underline"
                                                        >
                                                            View Profile →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </SheetHeader>



                                        {/* Navigation Items */}
                                        <nav className="flex flex-col gap-1 p-4">
                                            {mobileMenuItems.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                                                        pathname === item.href
                                                            ? "bg-primary text-primary-foreground"
                                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                                    )}
                                                >
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                    {item.badge ? (
                                                        <Badge className="ml-auto">
                                                            {Number(item.badge) > 99 ? "99+" : item.badge}
                                                        </Badge>
                                                    ) : null}
                                                </Link>
                                            ))}

                                            <Separator className="my-2" />

                                            {/* Logout Button */}
                                            <button
                                                onClick={async () => {
                                                    await logout();
                                                    window.location.href = "/auth/login";
                                                }}
                                                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Log out</span>
                                            </button>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            )}
                        </div>
                    ) : (
                        !initializing && (
                            <Link
                                href="/auth/login"
                                className="text-sm font-medium text-primary hover:underline px-3 py-2"
                            >
                                Sign In
                            </Link>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}