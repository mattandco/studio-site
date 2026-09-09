import Masthead from "@/components/Masthead";
import Hero from "@/components/Hero";
import ClientStrip from "@/components/ClientStrip";
import Studio from "@/components/Studio";
import Capabilities from "@/components/Capabilities";
import WorkRegister from "@/components/WorkRegister";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
        minHeight: "100vh",
      }}
    >
      <Masthead />
      <Hero />
      <ClientStrip />
      <Studio />
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(20px,5vw,72px)",
        }}
      >
        <Capabilities />
        <WorkRegister />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
