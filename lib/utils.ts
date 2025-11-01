import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Baseurl = process.env.NEXT_BACKEND_URL||"http://192.168.1.20:5000/";