import { notFound } from "next/navigation";
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
import { suburbs } from "@/data/suburbs";

export function generateStaticParams() {
  return suburbs.map((s) => ({ suburb: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { suburb: string };
}) {
  const suburb = suburbs.find((s) => s.slug === params.suburb);
  if (!suburb) return {};
  return {
    title: `Garage Door Specialists in ${suburb.name} | Trusted Local Experts`,
    description: `${suburb.name}'s trusted garage door specialists. Same-day repairs, installation and servicing across ${suburb.name} and surrounds.`,
  };
}

export default function SuburbPage({
  params,
}: {
  params: { suburb: string };
}) {
  const suburb = suburbs.find((s) => s.slug === params.suburb);
  if (!suburb) notFound();

  const mapQuery = `${suburb.name} QLD ${suburb.postcode}`;

  return (
    <main className="garage-bg">
      <Header />
      <Hero suburb={suburb.name} />
      <FeatureStrip />
      <Reviews />
      <Services />
      <WhyChooseUs suburb={suburb.name} />
      <AreasWeServe suburb={suburb.name} blurb={suburb.blurb} />
      <Faq />
      <CtaBanner />
      <LocationMap query={mapQuery} />
      <Footer suburb={suburb.name} />
    </main>
  );
}
