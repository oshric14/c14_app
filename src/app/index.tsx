import HomeList from "@/components/Home/HomeList";
import BottomNav from "@/components/Layout/BottomNav";
import Header from "@/components/Layout/Header";
import MobileNavShell from "@/components/Layout/MobileNavShell";
import { ErrorState, LoadingState, Screen } from "@/components/ui";
import { useHome } from "@/hooks/useHome";

export default function HomeScreen() {
  const { data, isPending, isError, refetch } = useHome();

  return (
    <MobileNavShell>
      <Screen>
        <Header />

        {isPending ? (
          <LoadingState />
        ) : isError || !data ? (
          <ErrorState />
        ) : (
          <HomeList blocks={data} onRefreshHome={refetch} />
        )}

        <BottomNav />
      </Screen>
    </MobileNavShell>
  );
}
