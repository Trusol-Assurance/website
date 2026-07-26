"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  // Single observer for every `.reveal` on the page, mounted once at the root.
  useReveal();

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
