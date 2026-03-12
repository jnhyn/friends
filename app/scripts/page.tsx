import { EpisodeListPage } from "@/components/common/episode-list-page";
import { getEpisodeCatalog } from "@/utils/scripts-data";

export default function ScriptsPage() {
  return (
    <EpisodeListPage
      title="Scripts"
      eyebrow="Friends Study Club"
      description="시즌과 에피소드를 열고, 오늘 외울 대사를 고르세요."
      seasons={getEpisodeCatalog()}
      basePath="/scripts"
      variant="scripts"
    />
  );
}
