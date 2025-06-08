import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import TechQuizSection from "@/components/TechQuizSection";
import Footer from "@/components/Footer";
import { PORTFOLIO_DATA } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{PORTFOLIO_DATA.name} - Portfolio</title>
        <meta name="description" content={`Portfolio of ${PORTFOLIO_DATA.name}, a ${PORTFOLIO_DATA.title} specializing in creating beautiful, functional web experiences.`} />
        <meta property="og:title" content={`${PORTFOLIO_DATA.name} - Portfolio`} />
        <meta property="og:description" content={`Portfolio of ${PORTFOLIO_DATA.name}, a ${PORTFOLIO_DATA.title} specializing in creating beautiful, functional web experiences.`} />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <TechQuizSection />
          <LocationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
