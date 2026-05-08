import AreasWeServe from "@/components/AreasWeServe";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import FeatureStrip from "@/components/FeatureStrip";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LocationMap from "@/components/LocationMap";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main className="garage-bg">
      <Header />
      <Hero />
      <FeatureStrip />
      <Reviews />
      <Services />
      <WhyChooseUs />
      <AreasWeServe />
      <Faq />
      <CtaBanner />
      <LocationMap />
      <Footer />
    </main>
  );
}
