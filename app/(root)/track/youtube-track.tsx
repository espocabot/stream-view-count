"use client";

import { use } from "react";
import { YoutubeLogo } from "@/components/logo/youtube-logo";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useInterval } from "@/hooks/use-interval";
import { revalidateTrack } from "@/lib/actions";
// import type { YoutubeUserDetails } from "@/lib/definitions";

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
  }, 30);

  return (
    <div className="flex items-baseline gap-2">
      <YoutubeLogo className="size-16 text-youtube" />
      <NumberTicker
        value={streamInfo?.viewers ?? 0}
        className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
      />
    </div>
  );
}
