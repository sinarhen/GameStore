import Cookies from "js-cookie";
import {headerName} from "./constants";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import axios from "axios";


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
  minimumFractionDigits: 0
});


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "ready":
      return "text-green-500";
    case "cancelled":
      return "text-red-500";
    case "processing":
      return "text-blue-500";
    case "paid":
      return "text-green-500";
    case "confirmed":
      return "text-green-500";
    default:
      return "text-yellow-500";
  }
}

export const translateStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "В очікуванні";
    case "ready":
      return "Готово";
    case "cancelled":
      return "Скасовано";
    case "processing":
      return "В процесі";
    case "paid":
      return "Оплачено";
    case "confirmed":
      return "Підтверджено";
    default:
      return "В очікуванні";
  }
}

export const displayDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('ua-UA').format(date);
}

export async function uploadImageToCloud(imageMeta: string) {
  const formData = new FormData();

  formData.append('file', imageMeta);
  console.log(imageMeta)
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET as string);
  const imageUploaded = await axios.post(
    process.env.REACT_APP_CLOUDINARY_URL as string,
    formData
  );
  console.log(imageUploaded.data.secure_url)
  return imageUploaded.data.secure_url;
}

export const setImageUrlFromFile = (file: File | null | undefined, setTempSrcUrlForFile: React.Dispatch<React.SetStateAction<string | null>>): void => {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setTempSrcUrlForFile(reader.result as string);
  };
};