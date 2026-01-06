
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookHeart, Compass, Menu, Smile, Star, BookOpenCheck, Upload, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "../auth-provider";

const navItems = [
  { href: "/", label: "Mood", icon: Smile },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/my-lists", label: "My Lists", icon: Star },
  { href: "/kids", label: "Kids Corner", icon: BookHeart },
  { href: "/upload", label: "Upload", icon: Upload },
];

export function MobileHeader() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <header className="md:hidden flex items-center justify-between p-4 border-b bg-card">
      <Link href="/" className="flex items-center gap-2">
        <BookOpenCheck className="h-7 w-7 text-primary" />
        <span className="font-headline text-xl font-bold text-primary">LibroMood</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader className="mb-8">
            <Link href="/" className="flex items-center gap-2">
                <BookOpenCheck className="h-7 w-7 text-primary" />
                <span className="font-headline text-xl font-bold text-primary">LibroMood</span>
            </Link>
          </SheetHeader>
          <nav className="flex flex-col justify-between h-[calc(100%-100px)]">
            <div className="flex flex-col gap-y-2">
              {navItems.map((item) => (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 rounded-lg p-3 text-lg font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                    <span>{item.label}</span>
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div>
            {user ? (
                <SheetClose asChild>
                    <Button onClick={signOut} variant="ghost" className="flex w-full items-center gap-4 rounded-lg p-3 text-lg font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                        <LogOut className="h-6 w-6" />
                        <span>Sign Out</span>
                    </Button>
                </SheetClose>
            ) : (
                <SheetClose asChild>
                    <Link
                      href="/auth"
                      className={cn(
                        "flex items-center gap-4 rounded-lg p-3 text-lg font-medium transition-colors",
                        pathname === '/auth'
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <LogIn className="h-6 w-6" />
                      <span>Sign In</span>
                    </Link>
                </SheetClose>
            )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
