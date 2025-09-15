import { z } from "zod/v4";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production"])
    .optional()
    .default("development"),
  TWITCH_CLIENT_SECRET: z.string(),
  TWITCH_CLIENT_ID: z.string(),

  KICK_CLIENT_ID: z.string(),
  KICK_CLIENT_SECRET: z.string(),

  YOUTUBE_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
