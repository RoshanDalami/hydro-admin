export type TNoticeMedia = {
  id: number;
  noticeId: number;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
  updatedAt: string;
};

export type TNotice = {
  id: number;
  title: string;
  content: string;
  publishDate: string;
  time: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  noticeMedias: TNoticeMedia[];
};

export type TNoticeResponse = {
  data: TNotice[];
  status: number;
  success: boolean;
  message: string;
};

export type TCreateNoticePayload = {
  title: string;
  content: string;
  publishDate: string;
  time: string;
  medias: File[] | null;
};
export type TCreateNoticeResponse = {
  data: null;
  status: number;
  success: boolean;
  message: string;
};

export type TNoticeByIdResponse = {
  data: TNotice;
  status: number;
  success: boolean;
  message: string;
};
