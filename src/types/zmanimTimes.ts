export type DailyTimesType = {
  country: string;
  city: string;
  title: string;
  date: string;
  text: string;
  items: DailyTimesItemType[];
};

export type DailyTimesItemType = {
  id: string;
  title: string;
  time: string;
};
