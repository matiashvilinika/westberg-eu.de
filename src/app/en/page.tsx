import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import Brands from "@/components/Brands";
import CallToAction from "@/components/Home/CallToAction";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Listings from "@/components/Home/Listings";
import Portfolio from "@/components/Home/Portfolio";
import Testimonials from "@/components/Home/Testimonials";
import Pricing from "@/components/Pricing";
import Support from "@/components/Support";
import Team from "@/components/Team";
import { Metadata } from "next";

const siteName = process.env.SITE_NAME;

export const metadata: Metadata = {
  title: `West Berg Europe - Premium Automobiles | ${siteName}`,
  description:
    "West Berg Europe (W.B.E.) GmbH - Premium automobile company specializing in finding, selling, and exchanging premium vehicles. Operating legally and transparently across Germany, Switzerland, and Italy.",
};

export default function EnglishHome() {
  return (
    <>
      <Hero />
      <Features />
      <Listings />
      <About />
      <Team />
      {/* <Portfolio /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      <Brands />
      {/* <HomeBlogSection /> */}
      <Support />
      <CallToAction />
    </>
  );
}

