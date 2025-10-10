"use client";
import { Suspense, useEffect, useState } from "react"
// Assuming useAuth is a custom hook for authentication
import ProfileSubmitted from "@/components/profile-submitted"
import { useAuth } from "@/contexts/AuthContext"
import { FetchProfile } from "@/lib/UserApi/user"

type SearchParams = { [key: string]: string | string[] | undefined }

function coerceString(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v[0]
  return v
}

// Function to fetch profile data from the API


export default function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { auth } = useAuth() // Get the auth data (assuming it provides auth.id)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await FetchProfile(auth?.id)
        console.log(profileData);
        setProfile(profileData)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (auth?.id) {

      fetchProfile()
    } 
  }, [auth?.id, searchParams])

  if (loading) {
    return (
      <main className="min-h-[100svh] w-full flex items-center justify-center p-6">
        <div className="w-full max-w-xl">Loading...</div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-[100svh] w-full flex items-center justify-center p-6">
        <div className="w-full max-w-xl text-red-500">{error}</div>
      </main>
    )
  }

  return (
    <main className="min-h-[100svh] w-full flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Suspense>
          <ProfileSubmitted profile={profile} />
        </Suspense>
      </div>
    </main>
  )
}
