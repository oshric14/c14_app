import BottomNav from "@/components/Layout/BottomNav";
import Header from "@/components/Layout/Header";
import MobileNavShell from "@/components/Layout/MobileNavShell";
import { ErrorState, LoadingState, Screen } from "@/components/ui";
import { useArchive } from "@/hooks/useArchive";

import ArchiveFeed from "./ArchiveFeed";
import ArchiveHeader from "./ArchiveHeader";

type ArchiveScreenProps = {
  id: number;
};

/** Category (archive) screen: header + virtualized article feed inside the app shell. */
function ArchiveScreen({ id }: ArchiveScreenProps) {
  const archive = useArchive(id);

  return (
    <MobileNavShell>
      <Screen>
        <Header />

        {archive.isPending ? (
          <LoadingState />
        ) : archive.isError || !archive.data ? (
          <ErrorState message="לא הצלחנו לטעון את הקטגוריה" />
        ) : (
          <ArchiveFeed id={id} header={<ArchiveHeader data={archive.data} />} />
        )}

        <BottomNav />
      </Screen>
    </MobileNavShell>
  );
}

export default ArchiveScreen;
