import { YouTubeVideoResponseSchema } from "./definitions";
import { env } from "./env";

const youtubeOptions = {
  apiDomain: "www.googleapis.com/youtube/v3",
  apiKey: env.YOUTUBE_API_KEY,
};

// resolve channelId a partir de @handle ou slug
async function getChannelId(slug: string) {
  const { apiDomain, apiKey } = youtubeOptions;

  const uri = `https://${apiDomain}/search?part=snippet&q=${encodeURIComponent(
    slug,
  )}&type=channel&key=${apiKey}`;

  const res = await fetch(uri);
  if (!res.ok) throw new Error("Failed to fetch channelId");

  const data = await res.json();
  return data.items?.[0]?.id?.channelId ?? null;
}

// resolve videoId se estiver ao vivo
async function getLiveVideoId(channelId: string) {
  const { apiDomain, apiKey } = youtubeOptions;

  const uri = `https://${apiDomain}/search?part=id&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
  const res = await fetch(uri);
  if (!res.ok) throw new Error("Failed to fetch live videoId");

  const data = await res.json();
  return data.items?.[0]?.id?.videoId ?? null;
}

export async function getYouTubeLiveStreamInfo(slug: string) {
  const { apiDomain, apiKey } = youtubeOptions;

  const channelId = await getChannelId(slug);
  if (!channelId) return null;

  const videoId = await getLiveVideoId(channelId);
  if (!videoId) return null;

  const uri = `https://${apiDomain}/videos?part=liveStreamingDetails&id=${videoId}&key=${apiKey}`;
  const res = await fetch(uri);
  if (!res.ok) throw new Error("Failed to fetch live stream info");

  const { items } = YouTubeVideoResponseSchema.parse(await res.json());

  const stream = items[0];
  if (!stream?.liveStreamingDetails?.concurrentViewers) return null;

  return {
    videoId: stream.id,
    viewers: stream.liveStreamingDetails.concurrentViewers,
  };
}
