import { z } from "zod/v4";
import { getYouTubeLiveStreamInfo } from "@/lib/youtube";
import { YoutubeTrack } from "./track";

export default async function YoutubeTrackPage({
  searchParams,
}: PageProps<"/track">) {
  const trackInfo = z
    .object({
      youtube: z.string().optional(),
    })
    .parse(await searchParams);

  const youtubeFetcher = trackInfo.youtube
    ? getYouTubeLiveStreamInfo(trackInfo.youtube)
    : null;

  if (!youtubeFetcher || !trackInfo.youtube) {
    return null;
  }

  return <YoutubeTrack fetcher={youtubeFetcher} handle={trackInfo.youtube} />;
}
