import { z } from "zod/v4";
import { getTwitchLiveStreamInfo } from "@/lib/twitch";
import { TwitchTrack } from "./track";

export default async function TwitchTrackPage({
  searchParams,
}: PageProps<"/track">) {
  const trackInfo = z
    .object({
      twitch: z.string().optional(),
    })
    .parse(await searchParams);

  const twitchFetcher = trackInfo.twitch
    ? getTwitchLiveStreamInfo(trackInfo.twitch)
    : null;

  if (!twitchFetcher || !trackInfo.twitch) {
    return null;
  }

  return <TwitchTrack fetcher={twitchFetcher} handle={trackInfo.twitch} />;
}
