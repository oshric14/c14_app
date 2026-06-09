import type { ArticleQuery } from "@/types/api";
import type { ArticleType } from "@/types/article";
import type { HomeType } from "@/types/home";
import type { ShidurimResData } from "@/types/shidurim";
import type { TerrorEvent, TerrorEventsNumbers } from "@/types/special";

import { httpRequestService } from "./httpRequest.service";

// Builds a query string: skips empty values, joins arrays with commas.
function buildQuery(params: ArticleQuery): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.append(key, Array.isArray(value) ? value.join(",") : String(value));
  });
  return search.toString();
}

export const getHome = (viewport?: string) =>
  httpRequestService.get<HomeType[]>(
    `homepage_new${viewport ? `?viewport=${viewport}` : ""}`,
  );

export const getArticles = (query: ArticleQuery = {}) =>
  httpRequestService.get<ArticleType[]>(`articles/?${buildQuery(query)}`);

export const getArticleById = (id: number) =>
  httpRequestService.get<ArticleType>(`articles/?id=${id}`);

export const searchArticles = (search: string) =>
  httpRequestService.get<ArticleType[]>(
    `articles/?query=${encodeURIComponent(search)}`,
  );

export const getArchive = <T = unknown>(id: number) =>
  httpRequestService.get<T>(`archive/${id}`);

export const getArchiveChildren = <T = unknown>(id: number) =>
  httpRequestService.get<T>(`archive/${id}/children`);

export const getAuthor = <T = unknown>(id: number) =>
  httpRequestService.get<T>(`authors/${id}?v=1`);

export const getWidgetArticles = (widget: string) =>
  httpRequestService.get<ArticleType[]>(`widget-articles/${widget}?number=4`);

export const getNavItems = <T = unknown>(name: string) =>
  httpRequestService.get<T>(`navigators/${name}`);

export const getTimeline = <T = unknown>(id: number) =>
  httpRequestService.get<T>(`timeline/${id}`);

export const getShidurim = () =>
  httpRequestService.get<{ shidurim: ShidurimResData }>(`shidurim`);

export const getTerrorEvents = () =>
  httpRequestService.get<TerrorEvent[]>(`specials/terror_events`);

export const getTerrorEventsNumbers = () =>
  httpRequestService.get<TerrorEventsNumbers>(`specials/terror_events_numbers`);
