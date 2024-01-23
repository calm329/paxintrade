"use client"

import { Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface ProfileNavProps {
  items: NavItem[]
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export function ProfileNav({ items, setOpen }: ProfileNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid w-full grid-cols-4 items-start gap-2 sm:grid-cols-1">
      {items.map((item, index) => {
        const Icon: React.ComponentType<any> | undefined = item.icon
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false)
              }}
            >
              <span
                className={cn(
                  "text-md group flex flex-col items-center rounded-md px-4 py-1 font-medium hover:bg-primary/15 sm:flex-row sm:py-3",
                  path === item.href
                    ? "border border-primary bg-primary/10 text-primary"
                    : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {Icon && <Icon className="h-5 w-5 lg:mr-2" />}
                <span className="truncate text-xs sm:hidden sm:text-base lg:block">
                  {item.title}
                </span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
