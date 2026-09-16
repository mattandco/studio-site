import TopRow from "@/components/TopRow";
import Cover from "@/components/Cover";
import CurrentProject from "@/components/CurrentProject";
import ClientStrip from "@/components/ClientStrip";
import Studio from "@/components/Studio";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import WorkRegister from "@/components/WorkRegister";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="page">
      <div className="wrap" id="top">
        <TopRow />
        <Cover />
        <CurrentProject />
        <ClientStrip />
        <Studio />
        <Capabilities />
        <Process />
        <WorkRegister />
      </div>

      <Contact />

      <div className="wrap">
        <Footer />
      </div>
    </div>
  );
}
