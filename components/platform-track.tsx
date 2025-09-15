import { KickLogo } from "./logo/kick-logo";
import { TwitchLogo } from "./logo/twitch-logo";
import { YoutubeLogo } from "./logo/youtube-logo";
import { NumberTicker } from "./magicui/number-ticker";

const platforms = {
  youtube: {
    logo: YoutubeLogo,
    colorClass: "text-youtube",
  },
  twitch: {
    logo: TwitchLogo,
    colorClass: "text-twitch",
  },
  kick: {
    logo: KickLogo,
    colorClass: "text-kick",
  },
} as const;

export function PlatformTrack({
  platform,
  viewCount,
}: {
  platform: "youtube" | "twitch" | "kick";
  viewCount: number;
}) {
  const PlatformLogo = platforms[platform].logo;
  const colorClass = platforms[platform].colorClass;

  return (
    <div className="flex items-baseline gap-2">
      <PlatformLogo className={`size-16 ${colorClass}`} />
      <NumberTicker
        value={viewCount}
        className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-foreground select-none"
      />
    </div>
  );
}
