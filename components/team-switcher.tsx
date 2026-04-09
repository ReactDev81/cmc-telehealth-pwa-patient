"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()

  const activeTeam = teams[0]

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          onClick={() => router.push("/")}
          className="w-full flex items-center justify-between px-2"
        >
          {/* Left side (logo) */}
          <div className="w-32 h-9 flex items-center justify-center rounded-lg">
            {activeTeam.logo}
          </div>

          {/* Right arrow */}
          <ArrowLeft className="w-4! h-4! text-black bg-gray-200 rounded p-0.5" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
