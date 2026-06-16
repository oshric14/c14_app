import { router } from "expo-router";
import { Linking } from "react-native";

import type { ArticleType } from "@/types/article";

function getPathname(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      return new URL(trimmed).pathname;
    } catch {
      return "";
    }
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export function openArchive(id?: number) {
  if (!Number.isFinite(id)) return;

  router.push({
    pathname: "/archive/[id]",
    params: { id: String(id) },
  });
}

export function openNativeUrl(url?: string | null) {
  if (!url) return false;

  const pathname = getPathname(url);
  const articleMatch = pathname.match(/\/article\/(\d+)/);
  const archiveMatch = pathname.match(/\/archive\/(\d+)/);

  if (articleMatch?.[1]) {
    router.push({
      pathname: "/article/[id]",
      params: { id: articleMatch[1] },
    });
    return true;
  }

  if (archiveMatch?.[1]) {
    openArchive(Number(archiveMatch[1]));
    return true;
  }

  if (pathname === "/") {
    router.push("/");
    return true;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    Linking.openURL(url);
    return true;
  }

  if (pathname.startsWith("/")) {
    Linking.openURL(`https://www.c14.co.il${pathname}`);
    return true;
  }

  return false;
}

export function openArticle(article: ArticleType) {
  if (article.redirect_url && openNativeUrl(article.redirect_url)) {
    return;
  }

  router.push({
    pathname: "/article/[id]",
    params: { id: String(article.id) },
  });
}
