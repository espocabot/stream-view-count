import Form from "next/form";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StreamerForm() {
  return (
    <Card className="max-w-lg relative p-0 w-full">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
        <CardTitle>Track Your Stream Viewers</CardTitle>
        <CardDescription>
          Enter your streaming platform usernames to start tracking viewers.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <Form id="streamer-form" action="/track">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="twitch">Twitch Username</Label>
              <Input
                id="twitch"
                name="twitch"
                type="text"
                placeholder="Enter your Twitch username"
                aria-describedby="twitch-username"
              />
              <p
                id="twitch-username"
                className="text-xs text-muted-foreground text-pretty"
              >
                Like "espocabuxo" in{" "}
                <a href="https://www.twitch.tv/espocabuxo">
                  https://www.twitch.tv/espocabuxo
                </a>
              </p>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="kick">Kick Username</Label>
              <Input
                id="kick"
                name="kick"
                type="text"
                placeholder="Enter your Kick username"
                aria-describedby="kick-username"
              />
              <p
                id="kick-username"
                className="text-xs text-muted-foreground text-pretty"
              >
                Like "espoca" in{" "}
                <a href="https://www.kick.com/espoca">
                  https://www.kick.com/espoca
                </a>
              </p>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="you">YouTube Username</Label>
              <Input
                id="youtube"
                name="youtube"
                type="text"
                placeholder="Enter your YouTube username"
                aria-describedby="youtube-username"
              />
              <p
                id="youtube-username"
                className="text-xs text-muted-foreground text-pretty"
              >
                Like "espocabuxo" in{" "}
                <a href="https://www.youtube.com/@espocabuxo">
                  https://www.youtube.com/@espocabuxo
                </a>
              </p>
            </div>
          </div>
        </Form>
      </CardContent>
      <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
        <RainbowButton form="streamer-form" type="submit" className="w-full">
          Start Tracking
        </RainbowButton>
      </CardFooter>
    </Card>
  );
}
