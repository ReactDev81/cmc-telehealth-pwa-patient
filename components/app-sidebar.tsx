"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"
import Image from "next/image"
import icon from "@/public/assets/icon/logo-light.png"

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: (
//         <GalleryVerticalEndIcon
//         />
//       ),
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: (
//         <AudioLinesIcon
//         />
//       ),
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: (
//         <TerminalIcon
//         />
//       ),
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "#",
//       icon: (
//         <TerminalSquareIcon
//         />
//       ),
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: (
//         <BotIcon
//         />
//       ),
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: (
//         <BookOpenIcon
//         />
//       ),
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: (
//         <Settings2Icon
//         />
//       ),
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: (
//         <FrameIcon
//         />
//       ),
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: (
//         <PieChartIcon
//         />
//       ),
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: (
//         <MapIcon
//         />
//       ),
//     },
//   ],
// }

const data = {
  user: {
    name: "Patient",
    email: "patient@example.com",
    avatar: "/avatars/user.png",
  },
  teams: [
    {
      name: "CMC Team",
      logo: <Image src={icon} alt="Logo" width={200} height={200} className="w-full h-full object-contain rounded-lg" />,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <TerminalSquareIcon />,
    },
    {
      title: "Find Doctors",
      url: "/find-doctors",
      icon: <BotIcon />,
    },
    {
      title: "My Appointments",
      url: "/appointments",
      icon: <BookOpenIcon />,
    },
    {
      title: "Medical Reports",
      url: "/medical-records",
      icon: <Settings2Icon />,
    },


    // {
    //   title: "Notifications",
    //   url: "/notifications",
    //   icon: <Settings2Icon />,
    // },
    // {
    //   title: "My Profile",
    //   url: "/profile",
    //   icon: <Settings2Icon />,
    // },
    // {
    //   title: "My Reviews",
    //   url: "/reviews",
    //   icon: <Settings2Icon />,
    // },
    // {
    //   title: "Transactions",
    //   url: "/transactions",
    //   icon: <Settings2Icon />,
    // },


    {
      title: "Person Info",
      icon: <FrameIcon />,
      items: [
        {
          title: "Notifications",
          url: "/notifications",
        },
        {
          title: "My Profile",
          url: "/profile",
        },
        {
          title: "My Reviews",
          url: "/reviews",
        },
        {
          title: "Transactions",
          url: "/transactions",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}
      className="w-68.75 min-w-68.75"
    >
      
      <SidebarHeader className="border-b">
        {data?.teams?.length > 0 && (
          <TeamSwitcher teams={data.teams} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <div className="px-5 text-xs font-semibold text-gray-400/80 mt-6 mb-2">
          Main Nav
        </div>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
