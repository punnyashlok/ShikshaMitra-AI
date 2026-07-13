import Navbar from "../components/layouts/Navbar";
import Hero from "../components/sections/Hero";
import LearningModes from "../components/sections/LearningModes";
import HowItWorks from "../components/sections/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LearningModes />
        <HowItWorks />
      </main>
    </>
  );
}