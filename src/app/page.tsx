import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Experience from "@/components/home/Experience";
import Certifications from "@/components/home/Certifications";
import Services from "@/components/home/Services";
import CareerObjective from "@/components/home/CareerObjective";
import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <FeaturedProjects />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Certifications />
      <div className="section-divider" />
      <Services />
      <div className="section-divider" />
      <CareerObjective />
      <div className="section-divider" />
      <Contact />
    </>
  );
}
