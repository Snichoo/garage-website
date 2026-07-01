import { notFound } from "next/navigation";
import AreasWeServe from "@/components/AreasWeServe";
import CommonProblems from "@/components/CommonProblems";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import FeatureStrip from "@/components/FeatureStrip";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import LocationMap from "@/components/LocationMap";
import RecentJobs from "@/components/RecentJobs";
import SuburbTeam from "@/components/SuburbTeam";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import { suburbs } from "@/data/suburbs";
import { getSuburbFaqs, getSuburbProfile } from "@/data/suburbProfiles";
import {
  pageMetadata,
  siteConfig,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/site";

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
  return pageMetadata({
    title: `Garage Doors ${suburb.name} | Installation, Replacement & Repairs`,
    description: `Garage door installation, replacement and same-day repairs in ${suburb.name} ${suburb.postcode}. Local specialists for roller, sectional & tilt doors, motors & springs. Call ${siteConfig.phoneDisplay}.`,
    path: `/suburbs/${suburb.slug}`,
  });
}

export default function SuburbPage({
  params,
}: {
  params: { suburb: string };
}) {
  const suburb = suburbs.find((s) => s.slug === params.suburb);
  if (!suburb) notFound();

  const profile = getSuburbProfile(suburb.slug);
  const faqs = getSuburbFaqs(suburb.name, suburb.postcode, profile);
  const mapQuery = `${suburb.name} QLD ${suburb.postcode}`;
  const path = `/suburbs/${suburb.slug}`;

  return (
    <main className="garage-bg">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: suburb.name, path },
          ]),
          serviceSchema({
            name: `Garage Door Repairs & Installation in ${suburb.name}`,
            description: `Garage door installation, replacement and same-day repairs for homes in ${suburb.name} ${suburb.postcode} and surrounding suburbs.`,
            path,
            areaServed: `${suburb.name}, QLD ${suburb.postcode}`,
          }),
        ]}
      />
      <Header />
      <Hero
        suburb={suburb.name}
        heroImage={profile?.heroImage}
        heroImageAlt={profile?.heroImageAlt}
        accent={profile?.accent}
        heroTagline={profile?.heroTagline}
      />
      <FeatureStrip />
      <Reviews />
      <Services />
      <WhyChooseUs
        suburb={suburb.name}
        accent={profile?.accent}
      />
      {profile && (
        <CommonProblems
          suburb={suburb.name}
          postcode={suburb.postcode}
          problems={profile.problems}
          accent={profile.accent}
          accentSoft={profile.accentSoft}
        />
      )}
      <SuburbTeam suburb={suburb.name} />
      <RecentJobs suburb={suburb.name} />
      <AreasWeServe suburb={suburb.name} blurb={suburb.blurb} />
      <Faq
        items={faqs}
        intro={`Real questions we get from homeowners in ${suburb.name} about repairs, replacements, motors and same-day service.`}
      />
      <CtaBanner suburb={suburb.name} />
      <LocationMap query={mapQuery} />
      <Footer suburb={suburb.name} />
    </main>
  );
}
