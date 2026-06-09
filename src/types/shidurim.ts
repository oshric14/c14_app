export type ShidurimResData = Array<{
  [date: string]: ShidurType[];
}>;

export type ShidurType = {
  program: string;
  subtitle: string;
  start: string;
  end: string;
  id: string;
  image?: string;
  cast?: string;
};
