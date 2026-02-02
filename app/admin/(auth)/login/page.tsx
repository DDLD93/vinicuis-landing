"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import Image from "next/image";
import { loginAction, type LoginState } from "./actions";

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin/dashboard";

  const [state, formAction] = useFormState<LoginState, FormData>(loginAction, null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg2.jpeg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/85 to-black/65" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="divider-accent mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to access the admin dashboard
            </p>
          </div>

          <form
            action={formAction}
            className="space-y-6"
            onSubmit={() => setLoading(true)}
          >
            <input type="hidden" name="next" value={nextPath} />
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="admin@viniciusint.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {state?.ok === false && state.message && (
              <p className="text-sm text-destructive" role="alert">
                {state.message}
              </p>
            )}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? undefined : { scale: 1.02 }}
              whileTap={loading ? undefined : { scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg transition-all hover:shadow-red disabled:opacity-50 disabled:pointer-events-none"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Signing in…" : "Sign in"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="relative min-h-screen flex items-center justify-center p-6">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
