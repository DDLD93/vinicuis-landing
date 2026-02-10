"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, Image as ImageIcon, LogOut, Building2, Briefcase, Users, X, ClipboardList, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

type UserRole = "superadmin" | "admin";

export default function AdminSidebar({ open = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data?.role && setRole(data.role))
      .catch(() => {});
  }, []);

  const baseNavItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "News", href: "/admin/news", icon: Newspaper },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Divisions", href: "/admin/divisions", icon: Building2 },
    { label: "Careers", href: "/admin/careers", icon: Briefcase },
    { label: "Audit Log", href: "/admin/audit", icon: ClipboardList },
  ];
  const usersNavItem = { label: "Users", href: "/admin/users", icon: Users };
  const navItems = role === "superadmin" ? [...baseNavItems, usersNavItem] : baseNavItems;

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard";
    return pathname?.startsWith(href);
  };

  const handleLogoutConfirm = async () => {
    setLogoutOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
      await new Promise((r) => setTimeout(r, 150));
    } catch {
      // continue to redirect even if request fails
    }
    toast({ title: "Signed out", description: "You have been logged out successfully." });
    window.location.href = "/admin/login";
  };

  const sidebarContent = (
    <>
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4 sm:px-6">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            onClick={() => onClose?.()}
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-slate-800 p-1.5">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">Admin</span>
          </Link>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link key={item.href} href={item.href} className="block" onClick={() => onClose?.()}>
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* View site + Logout */}
        <div className="border-t border-slate-800 p-4 space-y-1">
          <Link
            href="/"
            onClick={() => onClose?.()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span>View site</span>
          </Link>
          <button
            onClick={() => setLogoutOpen(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-red-900/20 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout confirmation */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent className="border-slate-800 bg-slate-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Are you sure you want to logout? You will need to sign in again to access the admin panel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogoutConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && onClose && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      {/* Sidebar: overlay on mobile, fixed on desktop */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 w-64 border-r border-slate-800 bg-slate-900 z-50
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${open || !onClose ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}