import Cookies from "js-cookie";
import { headerName } from "./constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function isValidURLImage(url: string) {
    // Regular expression for a valid image URL
    const imageRegex = /\.(jpeg|jpg|gif|png|bmp)$/i; // Case-insensitive matching
  
    // Regular expression for a valid URL with https:// protocol and domain
    const urlRegex = /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  
    // Check if the URL is valid for both https and image format
    return urlRegex.test(url) && imageRegex.test(url.toLowerCase());
  }
  

  
export const getHeadersWithCookiesByHeaderName = () => {
    const cookie = Cookies.get(headerName);
    return {
      [headerName]: `Bearer ${cookie}`,
    };
  };

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UAH',
});


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
