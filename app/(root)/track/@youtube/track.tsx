"use client";

import { use } from "react";
import { PlatformTrack } from "@/components/platform-track";
import { useInterval } from "@/hooks/use-interval";
import { revalidateTrack } from "@/lib/actions";

export function YoutubeTrack({
  fetcher,
  handle,
}: {
  fetcher: Promise<{
    videoId: string;
    viewers: number;
  } | null>;
  handle: string;
}) {
  const streamInfo = use(fetcher);

  useInterval(async () => {
    await revalidateTrack({ handle, platform: "youtube" });
  }, 90);

  return (
    <PlatformTrack platform="youtube" viewCount={streamInfo?.viewers ?? 0} />
  );
}
