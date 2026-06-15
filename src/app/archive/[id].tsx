import { useLocalSearchParams } from "expo-router";

import ArchiveScreen from "@/components/Archive/ArchiveScreen";
import { ErrorState, Screen } from "@/components/ui";

function parseArchiveId(value: string | string[] | undefined) {
  const selected = Array.isArray(value) ? value[0] : value;
  const id = Number(selected);
  return Number.isFinite(id) ? id : undefined;
}

export default function ArchiveRoute() {
  const params = useLocalSearchParams<{ id?: string }>();
  const archiveId = parseArchiveId(params.id);

  if (archiveId === undefined) {
    return (
      <Screen>
        <ErrorState message="קטגוריה לא נמצאה" />
      </Screen>
    );
  }

  return <ArchiveScreen id={archiveId} />;
}
