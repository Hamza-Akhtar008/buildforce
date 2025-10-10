"use client";
import { UsersTable } from "@/components/users-table"

export default function UsersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-pretty">Users</h1>
        <p className="text-muted-foreground">
          Manage verification status, view labour profiles, and schedule interviews.
        </p>
      </header>
      <UsersTable />
    </main>
  )
}
