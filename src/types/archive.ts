import type { BreadcrumbsType } from "./breadcrumbs";

export type ArchiveSubCategory = {
  id: number;
  name: string;
};

/** Shape returned by `GET /archive/{id}` (the bits the native app uses). */
export type ArchiveData = {
  name: string;
  type?: string;
  total_pages?: number;
  topBanner?: string;
  subCategories?: ArchiveSubCategory[];
  breadcrumbs?: BreadcrumbsType;
  seo?: {
    title?: string;
    description?: string;
  };
};
