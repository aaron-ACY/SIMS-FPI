import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hàm cn (className) giúp gộp các class Tailwind một cách thông minh,
 * tự động xử lý các class bị trùng lặp hoặc ghi đè.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
