export const queryKey = {
  usersMe: ["usersMe"],
  activity: ["activity"],
  reservation: (activitiesId: number, year: number, month: string) => [
    "activities",
    activitiesId,
    year,
    month
  ],
  myActivities: ["myActivities"],
  getActivitiesList: (
    selectedCategory: string | null,
    sort: string,
    page: number,
    size: number
  ) => ["activities", selectedCategory, sort, page, size],
  curationActivitiesList: ["curation"]
};
