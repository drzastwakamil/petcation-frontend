import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { RouteLocationNormalized } from '#vue-router';

// import { camelize, getCurrentInstance, toHandlerKey } from 'vue';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isPageAuthProtected = (page: RouteLocationNormalized) => {
  return page.fullPath.includes('/settings');
};
