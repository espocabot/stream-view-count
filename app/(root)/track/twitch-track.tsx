"use client";

import { use } from "react";
import { TwitchLogo } from "@/components/logo/twitch-logo";
import { NumberTicker } from "@/components/magicui/number-ticker";
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
    <div className="flex items-baseline gap-2">
      <TwitchLogo className="size-16 text-twitch" />
      <NumberTicker
        value={streamInfo?.viewer_count ?? 0}
        className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
      />
    </div>
  );
}
