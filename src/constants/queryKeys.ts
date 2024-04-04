export const queryKey = {
  usersMe: ["usersMe"],
  usersMypage: ["usersMypage"],
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
  myReservations: ["myReservations"],
  myActivities: ["myActivities"],
  getReservationByDate: ["getReservationByDate"],
  getReservationByScheduleId: ["getReservationByScheduleId"],
  getActivitiesList: (
    selectedCategory: string | null,
    sort: string,
    page: number,
    size: number,
    keyword: string
  ) => ["activities", selectedCategory, sort, page, size, keyword],
  curationActivitiesList: ["curation"]
};
