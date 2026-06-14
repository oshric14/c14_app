import { useCallback, useEffect, useState } from "react";

import HomeRenderer from "@/components/Home/HomeRenderer";
import BottomNav from "@/components/Layout/BottomNav";
import Header from "@/components/Layout/Header";
import MobileNavShell from "@/components/Layout/MobileNavShell";
import { AppScrollView, ErrorState, LoadingState, Screen } from "@/components/ui";
import { getHome } from "@/services";
import type { HomeType } from "@/types/home";

type HomeState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: HomeType[] };

export default function HomeScreen() {
  const [state, setState] = useState<HomeState>({ status: "loading" });

  const loadHome = useCallback(async () => {
    try {
      const data = await getHome("mobile");
      setState({ status: "ready", data });
    } catch {
      setState({ status: "error" });
    }
  }, []);

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

        <AppScrollView bottomNavPadding onRefresh={loadHome}>
          {state.status === "loading" ? (
            <LoadingState />
          ) : state.status === "error" ? (
            <ErrorState />
          ) : (
            <HomeRenderer data={state.data} />
          )}
        </AppScrollView>

        <BottomNav />
      </Screen>
    </MobileNavShell>
  );
}
