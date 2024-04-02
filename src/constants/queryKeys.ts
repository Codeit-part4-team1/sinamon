export const queryKey = {
  usersMe: ["usersMe"],
  activity: ["activity"],
  reservation: (activitiesId: number, year: number, month: string) => [
    "activities",
    activitiesId,
    year,
    month
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
