import Navbar from "@/components/layout/Navbar";
import HeroBackground from "@/components/sections/HeroBackground";
import Hero from "@/components/sections/Hero";    
import SectionDivider from "@/components/ui/SectionDivider";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="relative"> 
        <HeroBackground />
         <Hero /> 
      </div> 
      <div className="h-48 lg:h-64 bg-[#09090b]" aria-hidden="true" />
      <SectionDivider label="PROJECTS" />
      <Projects />
      <SectionDivider label="SKILLS" />
      <Skills />
      <SectionDivider label="CONTACT" />
    </main>
  );
}