import { useEffect, useState } from "react";

import MainArticle from "@/components/Article/MainArticle/MainArticle";
import Mekudamim from "@/components/Article/Mekudamim/Mekudamim";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import MobileNavShell from "@/components/layout/MobileNavShell";
import { AppScrollView, ErrorState, LoadingState, Screen } from "@/components/ui";
import { getHome } from "@/services";
import type { HomeType } from "@/types/home";

type HomeState =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ready";
      rashiBlock?: HomeType;
      mekudamimBlock?: HomeType;
    };

export default function HomeScreen() {
  const [state, setState] = useState<HomeState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    getHome("mobile")
      .then((blocks: HomeType[]) => {
        if (!active) return;
        const rashiBlock = blocks.find((b) => b.type === "rashi");
        const mekudamimBlock = blocks.find((b) => b.type === "mekudamim");
        setState({ status: "ready", rashiBlock, mekudamimBlock });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <MobileNavShell>
      <Screen>
        <Header />

        {state.status === "loading" ? (
          <LoadingState />
        ) : state.status === "error" ? (
          <ErrorState />
        ) : (
          <AppScrollView bottomNavPadding>
            {state.rashiBlock?.posts?.length ? (
              <MainArticle
                data={state.rashiBlock.posts}
                timeline={state.rashiBlock.timeline}
              />
            ) : null}
            {state.mekudamimBlock?.posts?.length ? (
              <Mekudamim
                data={state.mekudamimBlock.posts}
                remove_subtitle={state.mekudamimBlock.remove_subtitle}
              />
            ) : null}
          </AppScrollView>
        )}

        <BottomNav />
      </Screen>
    </MobileNavShell>
  );
}
