"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User, Settings, Menu, Home } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const getPageTitle = () => {
    if (pathname === "/admin/dashboard") return "Dashboard";
    if (pathname === "/admin/news") return "News Management";
    if (pathname === "/admin/gallery") return "Gallery Management";
    if (pathname === "/admin/divisions") return "Divisions";
    if (pathname === "/admin/careers") return "Careers";
    return "Admin Panel";
  };

  const handleLogoutConfirm = async () => {
    setLogoutOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
      // Let the browser process the Set-Cookie (clear) before navigating
      await new Promise((r) => setTimeout(r, 150));
    } catch {
      // continue to redirect even if request fails
    }
    toast({ title: "Signed out", description: "You have been logged out successfully." });
    window.location.href = "/admin/login";
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center justify-between gap-2 px-4 sm:px-6">
        {/* Left side - Menu (mobile) + Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
          <Link href="/admin/dashboard" className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80 shrink-0">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground hidden xs:inline">
              Admin
            </span>
          </Link>
          
          <div className="h-5 sm:h-6 w-px bg-border hidden sm:block" />
          
          <h1 className="text-base sm:text-lg font-semibold tracking-tight truncate">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right side - Profile Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all hover:opacity-80">
              <div className="relative h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <User className="h-5 w-5 text-primary" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@viniciusint.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer">
                <Home className="mr-2 h-4 w-4" />
                <span>View site</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/dashboard" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/dashboard" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setLogoutOpen(true)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Log out?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout? You will need to sign in again to access the admin panel.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogoutConfirm}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}