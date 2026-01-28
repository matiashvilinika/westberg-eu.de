import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import Brands from "@/components/Brands";
import CallToAction from "@/components/Home/CallToAction";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Listings from "@/components/Home/Listings";
import Testimonials from "@/components/Home/Testimonials";
import Support from "@/components/Support";
import Team from "@/components/Team";
import { Metadata } from "next";
import { integrations, messages } from "../../../integrations.config";

const siteName = process.env.SITE_NAME;

export const metadata: Metadata = {
  title: `West Berg Europe - Germany-Based Automotive Trading | ${siteName}`,
  description:
    "West Berg Europe (W.B.E.) GmbH - A Germany-based automotive trading company operating with disciplined processes, asset-focused logic, and a commitment to reliable execution.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Listings />
      <About />
      <Team />
      <Support />
      <CallToAction />
      <Brands />
    </>
  );
}
