"use client";

import { use } from "react";
import { PlatformTrack } from "@/components/platform-track";
import { useInterval } from "@/hooks/use-interval";
import { revalidateTrack } from "@/lib/actions";
import type { TwitchUserDetails } from "@/lib/definitions";

export function TwitchTrack({
  fetcher,
  handle,
}: {
  fetcher: Promise<TwitchUserDetails["data"][number]>;
  handle: string;
}) {
  const streamInfo = use(fetcher);

  useInterval(async () => {
    await revalidateTrack({ handle, platform: "twitch" });
  }, 30);

  return (
    <PlatformTrack
      platform="twitch"
      viewCount={streamInfo?.viewer_count ?? 0}
    />
  );
}
