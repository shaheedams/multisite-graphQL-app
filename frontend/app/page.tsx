"use client"
import { Contact } from "./components/contact/contact";
import { Footer } from "./components/footer/footer";
import { MainContent } from "./components/mainContent/mainContent";
import { NavBar } from "./components/navbar/navBar";
import './globals.css';
import { useSiteData } from "./utils/providers/ContentProvider";

export default function Home() {
  const { siteData } = useSiteData();

  return (
    <>
      <NavBar brand={siteData?.brand_name} links={siteData?.data?.nav?.links} />
      <MainContent heading={siteData?.data?.component_1?.headline} content={siteData?.data?.component_1?.body} />
      <Contact heading={siteData?.data?.component_2?.headline} button={siteData?.data?.component_2?.button} />
      <MainContent heading={siteData?.data?.component_3?.headline} content={siteData?.data?.component_3?.body} subHeading={siteData?.data?.component_3?.tags} />
      <Footer brand={siteData?.brand_name} content={siteData?.data?.footer?.footer} links={siteData?.data?.nav?.links} />
    </>
  );
}
