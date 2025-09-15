export default function TrackLayout({
  kick,
  twitch,
  youtube,
}: LayoutProps<"/track">) {
  return (
    <main className="flex items-center gap-20 h-screen">
      {kick}
      {twitch}
      {youtube}
    </main>
  );
}
