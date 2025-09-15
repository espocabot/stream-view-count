import { Particles } from "@/components/magicui/particles";
import { StreamerForm } from "./streamer-form";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        refresh
      />
      <StreamerForm />
    </main>
  );
}
