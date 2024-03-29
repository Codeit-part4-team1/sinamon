export const queryKey = {
  usersMe: ["usersMe"],
  activity: ["activity"],
  reservation: (activitiesId: number, year: number, month: string) => [
    "activities",
    activitiesId,
    year,
    month
  ],
  getReviewList: (activityId: number, page?: number, size?: 3) => [
    "activities",
    "reviews",
    activityId,
    page,
    size
  ],
  myActivities: ["myActivities"],
  getActivitiesList: (
    selectedCategory: string | null,
    sort: string,
    page: number,
    size: number
  ) => ["activities", selectedCategory, sort, page, size]
};
