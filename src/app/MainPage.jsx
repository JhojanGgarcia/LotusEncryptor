"use client";                         
import Features from "./components/common/Features";
import Hero from "./components/common/Hero";
import StarsCanvas from "./components/BgStars";

export default function MainPage() {
  return (
    <>
    <main className="relative  flex flex-col items-center justify-center min-h-screen w-screen">

      <Hero  />
      <Features  />
    </main>
    </>
  );
}
