export type navItem = {
  itemId?: number;
  object_id: number;
  title: string;
  link: string;
  color?: string;
  type: "category" | "tag" | "article" | "custom" | "program" | "archive";
  subItems: navItem[] | null;
};
