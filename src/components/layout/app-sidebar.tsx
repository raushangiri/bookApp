
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookHeart, Compass, Smile, Star, BookOpenCheck, Upload, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "../auth-provider";
import { Button } from "../ui/button";

const navItems = [
  { href: "/", label: "Mood", icon: Smile },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/my-lists", label: "My Lists", icon: Star },
  { href: "/kids", label: "Kids Corner", icon: BookHeart },
  { href: "/upload", label: "Upload", icon: Upload },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <aside className="hidden md:flex flex-col justify-between items-center gap-y-6 border-r bg-card p-4">
      <div>
        <Link href="/" className="mb-4 block">
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
      </div>
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col items-center gap-y-4">
          {user ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={signOut} variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground hover:bg-accent/80 hover:text-accent-foreground">
                    <LogOut className="h-6 w-6" />
                    <span className="sr-only">Sign Out</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-headline">Sign Out</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/auth"
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200",
                    pathname === "/auth"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  )}
                >
                  <LogIn className="h-6 w-6" />
                  <span className="sr-only">Sign In</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-headline">Sign In</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    </aside>
  );
}
