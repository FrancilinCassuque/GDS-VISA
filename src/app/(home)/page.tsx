import { Hero } from "@/components";
import ContactFormSection from "@/components/ContactFormSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/services";
import TestimonialsSection from "@/components/testimonialsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <DiferenciaisSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactFormSection />
    </>
  )
}