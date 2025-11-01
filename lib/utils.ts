import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Baseurl = process.env.NEXT_PUBLIC_BACKEND_URL||"https://buildforce-backend2-6e6q.onrender.com/";