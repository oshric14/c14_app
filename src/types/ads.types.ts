export type AdsConfig = { [name: string]: AdData };

export type AdData = {
  adUnitPath: string;
  sizes: number[][];
  id: string;
};
