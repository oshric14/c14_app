import { useEffect, useState } from "react";

import HomeRenderer from "@/components/home/HomeRenderer";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import MobileNavShell from "@/components/layout/MobileNavShell";
import { AppScrollView, ErrorState, LoadingState, Screen } from "@/components/ui";
import { getHome } from "@/services";
import type { HomeType } from "@/types/home";

type HomeState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: HomeType[] };

export default function HomeScreen() {
  const [state, setState] = useState<HomeState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    getHome("mobile")
      .then((data: HomeType[]) => {
        if (!active) return;
        setState({ status: "ready", data });
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
            <HomeRenderer data={state.data} />
          </AppScrollView>
        )}

        <BottomNav />
      </Screen>
    </MobileNavShell>
  );
}
