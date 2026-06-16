import type { BreadcrumbsType } from "./breadcrumbs";

export type ArchiveChild = {
  id: number;
  name?: string;
  title?: string;
};

export type ArchiveData = {
  id?: number;
  name?: string;
  title?: string;
  category_name?: string;
  description?: string;
  total_pages?: number;
  type?: string;
  breadcrumbs?: BreadcrumbsType;
  subCategories?: ArchiveChild[];
  topBanner?: {
    image?: string;
    link?: string;
  };
};
