export type TActivitiesImage = {
  id: number;
  activityId: number;
  imageUrl: string;
};

export type TActivities = {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  activitiesImages: TActivitiesImage[];
};

export type TActivitiesPayload = {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  images?: File[];
};

export type TActivitiesResponse = {
  data: TActivities[];
  status: number;
  success: boolean;
  message: string;
};

export type TActivitiesByIdResponse = {
  data: TActivities;
  status: number;
  success: boolean;
  message: string;
};

export type TActivitiesCreateResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};
