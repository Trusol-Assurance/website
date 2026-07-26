import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";

/**
 * Server component. Nothing here needs the client, so About, Marquee, Process
 * and Contact render to pure HTML and ship no JavaScript at all.
 *
 * The old `useReveal()` observer lived here and was the only reason this file
 * carried "use client" — which dragged every section into the client bundle.
 * It was also dead code: every `.reveal` element is authored with `in` already
 * applied, so the observer walked ~27 nodes on every load to add a class that
 * was always present.
 */
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <Services />
      <Process />
      <Team />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </>
  );
}