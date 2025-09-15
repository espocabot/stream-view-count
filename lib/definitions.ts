import { z } from "zod/v4";

export const TwitchStreamDataSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_login: z.string(),
  user_name: z.string(),
  game_id: z.string(),
  type: z.string(),
  title: z.string(),
  viewer_count: z.number(),
  started_at: z.string(),
  language: z.string(),
  thumbnail_url: z.string(),
  tag_ids: z.array(z.string()).optional(),
  is_mature: z.boolean().optional(),
});

export const TwitchStreamsResponseSchema = z.object({
  data: z.array(TwitchStreamDataSchema),
  pagination: z.object({
    cursor: z.string().optional(),
  }),
});

export type TwitchUserDetails = z.infer<typeof TwitchStreamsResponseSchema>;

export const KickStreamsResponseSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  slug: z.string(),
  is_banned: z.boolean(),
  playback_url: z.string(),
  vod_enabled: z.boolean(),
  subscription_enabled: z.boolean(),
  is_affiliate: z.boolean(),
  followers_count: z.number(),
  livestream: z
    .object({
      id: z.number(),
      slug: z.string(),
      channel_id: z.number(),
      created_at: z.string(),
      session_title: z.string(),
      is_live: z.boolean(),
      risk_level_id: z.null(),
      start_time: z.string(),
      source: z.null(),
      twitch_channel: z.null(),
      duration: z.number(),
      language: z.string(),
      is_mature: z.boolean(),
      viewer_count: z.number(),
      thumbnail: z.null(),
      lang_iso: z.string(),
      tags: z.array(z.string()),
      categories: z.array(
        z.object({
          id: z.number(),
          category_id: z.number(),
          name: z.string(),
          slug: z.string(),
          tags: z.array(z.string()),
          description: z.null(),
          deleted_at: z.null(),
          is_mature: z.boolean(),
          is_promoted: z.boolean(),
          viewers: z.number(),
          is_fallback: z.boolean(),
          category: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
            icon: z.string(),
          }),
        }),
      ),
    })
    .nullish(),
  role: z.null(),
  muted: z.boolean(),
  follower_badges: z.array(z.unknown()),
  offline_banner_image: z.object({ src: z.string(), srcset: z.string() }),
  verified: z.boolean(),
  recent_categories: z.array(
    z.object({
      id: z.number(),
      category_id: z.number(),
      name: z.string(),
      slug: z.string(),
      tags: z.array(z.string()),
      description: z.null(),
      deleted_at: z.null(),
      is_mature: z.boolean(),
      is_promoted: z.boolean(),
      viewers: z.number(),
      is_fallback: z.boolean(),
      banner: z.object({ responsive: z.string(), url: z.string() }),
      category: z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        icon: z.string(),
      }),
    }),
  ),
});

export type KickUserDetails = z.infer<typeof KickStreamsResponseSchema>;

export const YouTubeVideoResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      liveStreamingDetails: z
        .object({
          concurrentViewers: z.string().transform(Number).optional(),
        })
        .optional(),
    }),
  ),
});

export type YouTubeVideoDetails = z.infer<typeof YouTubeVideoResponseSchema>;
