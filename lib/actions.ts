"use server";

import { revalidateTag } from "next/cache";

export async function revalidateTrack({
  handle,
  platform,
}: {
  handle: string;
  platform: "twitch" | "kick" | "youtube";
}) {
  revalidateTag(`${platform}:${handle}`);
}
