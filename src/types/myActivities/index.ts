export interface EditPageSchedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface EditPageSubImage {
  id: number;
  imageUrl: string;
  subImagePreview: string;
  subImageUrl: string;
}

interface SubImageUrlsItem {
  id: number;
  imageUrl: string;
}

export interface EditPageSubImageUrls {
  data?: SubImageUrlsItem[];
}
