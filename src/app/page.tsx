import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Stack from "@/components/sections/Stack";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Pricing />
      <Stack />
      <About />
      <Contact />
    </main>
  );
}
