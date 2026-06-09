export type AdsConfig = { [name: string]: AdData };

export type AdData = {
  adUnitPath: string;
  sizes: googletag.GeneralSize;
  id: string;
  style?: React.CSSProperties;
};

export type AdTargeting = Record<string, string | string[]>;
