"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5"
      >
        <h1 className="font-display text-2xl font-extrabold text-brand-navy">
          Site Admin
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Log in to edit the website text and images.
        </p>

        <label className="mt-6 block text-sm font-bold text-neutral-800">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
        </label>

        <label className="mt-4 block text-sm font-bold text-neutral-800">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
        </label>

        {error && (
          <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-md bg-brand-navy py-3 font-display text-base font-extrabold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Logging in..." : "Log In"}
        </button>
      </form>
    </main>
  );
}
