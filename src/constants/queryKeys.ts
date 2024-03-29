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
    selectedCategory: any,
    // selectedCategory: string | null,
    sort: any,
    // sort: string,
    page: any,
    // page: number,
    size: any
    // size: number
  ) => ["activities", selectedCategory, sort, page, size]
};
