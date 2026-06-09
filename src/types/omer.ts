export type OmerDisplayState = "active" | "before" | "after";

export interface OmerRawRow {
  gregorianDate: string;
  hebrewDate: string;
  weekday: number;
  holiday: string;
  title: string;
  subtitle: string;
}

export interface OmerEntry {
  omerDay: number;
  gregorianDate: string;
  hebrewDate: string;
  weekday: number;
  holiday: string;
  title: string;
  subtitle: string;
}

export interface ResolvedOmerEntry {
  entry: OmerEntry;
  state: OmerDisplayState;
  requestedDate: string;
}
