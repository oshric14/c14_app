export type ArticleQuery = {
  archive?: number;
  author_id?: number;
  authors?: string[]; // Array of author IDs for multi-select
  categories?: string[]; // Array of category IDs for multi-select
  id?: number;
  mivzak?: 1;
  number?: number;
  includeShivuki?: number;
  relatedToId?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  paged?: number;
};
