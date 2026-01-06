"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookHeart, Compass, Smile, Star, BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "/", label: "Mood", icon: Smile },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/my-lists", label: "My Lists", icon: Star },
  { href: "/kids", label: "Kids Corner", icon: BookHeart },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col items-center gap-y-6 border-r bg-card p-4">
      <Link href="/" className="mb-4">
        <div className="bg-primary p-3 rounded-lg shadow-md">
          <BookOpenCheck className="h-7 w-7 text-primary-foreground" />
        </div>
        <span className="sr-only">LibroMood</span>
      </Link>
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-col items-center gap-y-4">
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-headline">{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
