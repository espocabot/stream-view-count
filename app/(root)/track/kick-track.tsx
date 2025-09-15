"use client";

import { use } from "react";
import { KickLogo } from "@/components/logo/kick-logo";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useInterval } from "@/hooks/use-interval";
import { revalidateTrack } from "@/lib/actions";
import type { KickUserDetails } from "@/lib/definitions";

export function KickTrack({
  fetcher,
  handle,
}: {
  fetcher: Promise<KickUserDetails>;
  handle: string;
}) {
  const streamInfo = use(fetcher);

  useInterval(async () => {
    await revalidateTrack({ handle, platform: "kick" });
  }, 30);

  return (
    <div className="flex items-baseline gap-2">
      <KickLogo className="size-16 text-kick" />
      <NumberTicker
        value={streamInfo.livestream?.viewer_count ?? 0}
        className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
      />
    </div>
  );
}
