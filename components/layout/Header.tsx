"use client";
import { useState, useEffect } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/userContext";
import { cn } from "@/lib/utils";
import icon from "@/public/assets/icon/logo-light.png";
import { useUnreadCount } from "@/queries/useNotifications";
import {
    Bell,
    LogOut,
    User as UserIcon,
    ChevronDown,
    Star,
    Banknote,
    LayoutDashboard,
    Calendar,
    ClipboardPlus,
    Pill,
    House,
    Search,

} from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import { usePathname } from "next/navigation"


export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { data: unreadData } = useUnreadCount();
    const { user, initializing, logout } = useAuth();
    const router = useRouter();

    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const name =
        user && (user.first_name || user.last_name)
            ? `${user.role === "doctor" ? "Dr. " : ""}${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
            : "User";

    const searchItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/" },
        { label: "Find Doctors", icon: Calendar, href: "/find-doctors" },
        { label: "My Appointments", icon: UserIcon, href: "/appointments" },
        { label: "Medical Records", icon: ClipboardPlus, href: "/medical-records" },
        { label: "My Medicines", icon: Pill, href: "/my-medicines" },
        { label: "My Profile", icon: UserIcon, href: "/profile" },
        { label: "My Reviews", icon: Star, href: "/reviews" },
        { label: "Transactions", icon: Banknote, href: "/transactions" },
        { label: "Notifications", icon: Bell, href: "/notifications" },
    ];

    const handleSearch = (href: string) => {
        router.push(href);
        setOpen(false);
        setSearchValue("");
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm",
                isScrolled
                    ? "bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60 border-b"
                    : "bg-background",
            )}
        >
            <div className="flex h-16 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-5 container mx-auto gap-4">
                <div>
                    <h1 className="text-base font-bold">Patient Dashboard</h1>

                    <Breadcrumb className="mt-0.5">
                        <BreadcrumbList>

                            {/* Home Icon */}
                            <BreadcrumbItem>
                                <House className="h-3.5 w-3.5 text-muted-foreground" />
                            </BreadcrumbItem>

                            <span className="text-muted-foreground text-xs">/</span>

                            {/* Dashboard */}
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="/"
                                    className={`text-xs ${pathname === "/"
                                            ? "text-primary font-semibold"
                                            : "text-muted-foreground"
                                        }`}
                                >
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <span className="text-muted-foreground text-xs">/</span>

                            {/* Patient */}
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="/patient"
                                    className={`text-xs ${pathname === "/patient"
                                            ? "text-primary font-semibold"
                                            : "text-muted-foreground"
                                        }`}
                                >
                                    Patient
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 shrink-0">

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-64 sm:w-45 lg:w-59.5 justify-between text-muted-foreground flex items-center"
                            >
                                <div className="flex items-center gap-2">
                                    <Search className="w-4 h-4" />
                                    <span>Search...</span>
                                </div>
                                <span className="text-xs text-primary font-bold">⌘</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-80" align="center">
                            <Command>
                                <CommandInput
                                    placeholder="Search pages..."
                                    value={searchValue}
                                    onValueChange={setSearchValue}
                                    
                                />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Pages">
                                        {searchItems.map((item) => (
                                            <CommandItem
                                                key={item.href}
                                                onSelect={() => handleSearch(item.href)}
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

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

                    <div className="flex justify-center gap-2 items-center">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-right text-foreground">
                                {name}
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                                {user?.email}
                            </span>
                        </div>


                        {/* User Dropdown */}
                        {user || initializing ? (
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
            </div>
        </header>
    );
}
