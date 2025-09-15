import { z } from "zod/v4";
import { KickStreamsResponseSchema } from "./definitions";
import { env } from "./env";

const kickOptions = {
  clientId: env.KICK_CLIENT_ID,
  clientSecret: env.KICK_CLIENT_SECRET,
  authDomain: "id.kick.com",
  apiDomain: "kick.com/api/v2",
};

export async function generateAppToken() {
  const { authDomain, clientId, clientSecret } = kickOptions;
  const uri = `https://${authDomain}/oauth/token`;

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
    .object({ access_token: z.string(), expires_in: z.coerce.number() })
    .parse(await res.json());

  return access_token;
}

export async function getKickLiveStreamInfo(channelName: string) {
  const { apiDomain } = kickOptions;
  const uri = `https://${apiDomain}/channels/${channelName}`;

  const token = await generateAppToken();

  const res = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: {
      tags: [`kick:${channelName}`],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }

  const json = await res.json();

  const data = KickStreamsResponseSchema.parse(json);

  return data ?? null;
}
