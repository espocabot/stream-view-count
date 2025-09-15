import { z } from "zod/v4";
import { getKickLiveStreamInfo } from "@/lib/kick";
import { KickTrack } from "./track";

export default async function KickTrackPage({
  searchParams,
}: PageProps<"/track">) {
  const trackInfo = z
    .object({
      kick: z.string().optional(),
    })
    .parse(await searchParams);

  const kickFetcher = trackInfo.kick
    ? getKickLiveStreamInfo(trackInfo.kick)
    : null;

  if (!kickFetcher || !trackInfo.kick) {
    return null;
  }

  return <KickTrack fetcher={kickFetcher} handle={trackInfo.kick} />;
}
