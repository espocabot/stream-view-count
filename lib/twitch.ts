import { z } from "zod/v4";
import { TwitchStreamsResponseSchema } from "./definitions";
import { env } from "./env";

const twitchOptions = {
  authDomain: "id.twitch.tv/oauth2",
  apiDomain: "api.twitch.tv/helix",
  clientId: env.TWITCH_CLIENT_ID,
  clientSecret: env.TWITCH_CLIENT_SECRET,
};

export async function generateAppToken() {
  const { authDomain, clientId, clientSecret } = twitchOptions;
  const uri = `https://${authDomain}/token`;

  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate app token");
  }

  const { access_token } = z
    .object({ access_token: z.string(), expires_in: z.number() })
    .parse(await res.json());

  return access_token;
}

export async function getTwitchLiveStreamInfo(channelName: string) {
  const { apiDomain, clientId } = twitchOptions;

  const token = await generateAppToken();

  const uri = `https://${apiDomain}/streams?user_login=${channelName}`;
  const res = await fetch(uri, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": clientId,
    },
    next: {
      tags: [`twitch:${channelName}`],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }

  const { data } = TwitchStreamsResponseSchema.parse(await res.json());

  return data[0] ?? null;
}
