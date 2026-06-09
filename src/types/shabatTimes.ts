export type ShabatResType = {
  _id: number;
  parasha: string;
  heb_date: string;
  date: string;
  type: string;
  Jerusalem_in: string;
  Jerusalem_out: string;
  TelAviv_in: string;
  TelAviv_out: string;
  Hayfa_in: string;
  Hayfa_out: string;
  BeerSheva_in: string;
  BeerSheva_out: string;
};

export type ShabatCityType = {
  city: string;
  inTime: string;
  outTime: string;
};

export type ShabatTimeType = {
  type: string;
  date: string;
  hebrewDate: string;
  parasha: string;
  items: ShabatCityType[];
};
