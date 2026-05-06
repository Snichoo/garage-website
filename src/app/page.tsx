import FeatureStrip from "@/components/FeatureStrip";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
    </main>
  );
}
