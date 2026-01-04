export const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL;
export const PRODUCTION_IMAGE_URL =
  process.env.NEXT_PUBLIC_PRODUCTION_IMAGE_URL;
export const DEVELOPMENT_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_URL;
export const DEVELOPMENT_IMAGE_URL =
  process.env.NEXT_PUBLIC_DEVELOPMENT_IMAGE_URL;


export const BASE_URL =
  process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;
export const BASE_IMAGE_URL =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_IMAGE_URL
    : DEVELOPMENT_IMAGE_URL;

export const config = {
  apiUrl: BASE_URL,
  imageUrl: BASE_IMAGE_URL,
} as const;
