"use client";

import Link from "next/link";

/**
 * Catches errors in the root layout and prevents the generic
 * "An error occurred in the Server Components render" crash.
 * Must define its own <html> and <body>.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: "48rem", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Something went wrong
        </h1>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          An unexpected error occurred. Please try again or return home.
        </p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1rem",
              background: "#b91c1c",
              color: "#fff",
              border: "none",
              borderRadius: "0.375rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              color: "inherit",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
