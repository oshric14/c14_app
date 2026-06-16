import { useLocalSearchParams } from "expo-router";

import ArchiveScreen from "@/components/Archive/ArchiveScreen";
import BottomNav from "@/components/Layout/BottomNav";
import Header from "@/components/Layout/Header";
import MobileNavShell from "@/components/Layout/MobileNavShell";
import { Screen } from "@/components/ui";

function parseArchiveId(value: string | string[] | undefined) {
  const selected = Array.isArray(value) ? value[0] : value;
  const id = Number(selected);
  return Number.isFinite(id) ? id : undefined;
}

export default function ArchiveRoute() {
  const params = useLocalSearchParams<{ id?: string }>();
  const archiveId = parseArchiveId(params.id);

  return (
    <MobileNavShell>
      <Screen>
        <Header />
        <ArchiveScreen archiveId={archiveId} />
        <BottomNav />
      </Screen>
    </MobileNavShell>
  );
}
