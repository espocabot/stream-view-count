import { Suspense } from "react";
import { z } from "zod/v4";
import { getKickLiveStreamInfo } from "@/lib/kick";
import { getTwitchLiveStreamInfo } from "@/lib/twitch";
import { getYouTubeLiveStreamInfo } from "@/lib/youtube";
import { KickTrack } from "./kick-track";
import { TwitchTrack } from "./twitch-track";
import { YoutubeTrack } from "./youtube-track";

export const revalidate = 30;

export default async function TrackPage({ searchParams }: PageProps<"/track">) {
  const trackInfo = z
    .object({
      twitch: z.string().optional(),
      kick: z.string().optional(),
      youtube: z.string().optional(),
    })
    .parse(await searchParams);

  const twitchFetcher = trackInfo.twitch
    ? getTwitchLiveStreamInfo(trackInfo.twitch)
    : null;

  const kickFetcher = trackInfo.kick
    ? getKickLiveStreamInfo(trackInfo.kick)
    : null;

  const youtubeFetcher = trackInfo.youtube
    ? getYouTubeLiveStreamInfo(trackInfo.youtube)
    : null;

  return (
    <main className="flex items-center gap-20">
      {twitchFetcher && trackInfo.twitch ? (
        <Suspense fallback={null}>
          <TwitchTrack fetcher={twitchFetcher} handle={trackInfo.twitch} />
        </Suspense>
      ) : null}

      {kickFetcher && trackInfo.kick ? (
        <Suspense fallback={null}>
          <KickTrack fetcher={kickFetcher} handle={trackInfo.kick} />
        </Suspense>
      ) : null}

      {youtubeFetcher && trackInfo.youtube ? (
        <Suspense fallback={null}>
          <YoutubeTrack fetcher={youtubeFetcher} handle={trackInfo.youtube} />
        </Suspense>
      ) : null}
    </main>
  );
}
