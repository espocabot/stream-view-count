"use client";

import { use } from "react";
import { PlatformTrack } from "@/components/platform-track";
import { useInterval } from "@/hooks/use-interval";
import { revalidateTrack } from "@/lib/actions";
import type { KickUserDetails } from "@/lib/definitions";

export function KickTrack({
  fetcher,
  handle,
}: {
  fetcher: Promise<KickUserDetails | null>;
  handle: string;
}) {
  const streamInfo = use(fetcher);

  useInterval(async () => {
    await revalidateTrack({ handle, platform: "kick" });
  }, 30);

  return (
    <PlatformTrack
      platform="kick"
      viewCount={streamInfo?.livestream?.viewer_count ?? 0}
    />
  );
}
