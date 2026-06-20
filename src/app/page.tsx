import Navbar from "@/components/layout/Navbar";
import HeroBackground from "@/components/sections/HeroBackground";
import Hero from "@/components/sections/Hero";    

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroBackground />
      <Hero />
    </main>
  );
}