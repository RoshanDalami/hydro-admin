import { BASE_IMAGE_URL } from "@/config";
export const imageurlgenerator = (path: string) => {
  return `${BASE_IMAGE_URL}/${path}`;
};
