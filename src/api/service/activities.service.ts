import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";

export const CreateActivities = async (data: FormData) => {
  const response = await mainApiWrapper(
    apiUrls.activities.create.method,
    apiUrls.activities.create.url,
    data
  );
  return response;
};

export const GetActivities = async () => {
  const response = await mainApiWrapper(
    apiUrls.activities.get.method,
    apiUrls.activities.get.url
  );
  return response;
};

export const UpdateActivities = async (data: FormData) => {
  const response = await mainApiWrapper(
    apiUrls.activities.update.method,
    apiUrls.activities.update.url,
    data
  );
  return response;
};

export const GetActivitiesById = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.activities.getById.method,
    apiUrls.activities.getById.url + `/${id}`
  );
  return response;
};

export const DeleteActivitiesById = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.activities.deleteById.method,
    apiUrls.activities.deleteById.url + `/${id}`
  );
  return response;
};

export const DeleteActivityImage = async (id: number) => {
  const response = await mainApiWrapper(
    apiUrls.activities.deleteImage.method,
    apiUrls.activities.deleteImage.url + `/${id}`
  );
  return response;
};
