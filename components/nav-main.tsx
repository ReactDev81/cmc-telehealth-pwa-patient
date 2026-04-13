// "use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

type NavItem = {
  title: string;
  url?: string;
  icon?: ReactElement;
  items?: {
    title: string;
    url: string;
  }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isActive = (url?: string) => {
    if (!url) return false;
    if (url === "/") return pathname === url;
    return pathname.startsWith(url);
  };

  return (
    <div className="flex flex-col gap-2 px-5">
      {items?.map((item) => {
        if (item.items && item.items.length > 0) {
          // Check if any subitem is active
          const isAnySubItemActive = item.items.some((subItem) => isActive(subItem.url));

          return (
            <Collapsible
              key={item.title}
              defaultOpen={isAnySubItemActive}
              className="group/collapsible"
            >
              <CollapsibleTrigger asChild>
                <button className="flex w-full items-center py-2 rounded-lg hover:bg-muted transition justify-between">
                  <div className="flex text-sm px-2 gap-3">
                    {item.icon ? React.cloneElement(item.icon as React.ReactElement<any>, {
                      className: "w-3.5 h-3.5",
                    }) : null}
                    <span>{item.title}</span>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 flex flex-col gap-1 mt-1">
                {item.items.map((subItem) => {
                  const active = isActive(subItem.url);
                  return (
                    <Link
                      key={subItem.title}
                      href={subItem.url}
                      className={`flex items-center gap-3 py-2 rounded-lg transition text-sm px-2
                        ${active
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "hover:bg-muted"
                        }`}
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        // Normal link
        const active = isActive(item.url);
        return (
          <Link
            key={item.title}
            href={item.url || "#"}
            className={`flex items-center text-sm gap-3 py-2 font-medium rounded-md transition px-2
    ${active
                ? "text-primary border border-gray-200"
                : "hover:bg-muted"
              }`}
          >
            {item.icon ? React.cloneElement(item.icon as React.ReactElement<any>, {
              className: "w-3.5 h-3.5",
            }) : null}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}