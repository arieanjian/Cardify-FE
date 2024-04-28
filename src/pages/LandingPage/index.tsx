import React from "react";

import {
  Navbar,
  Hero,
  Infos,
  Users,
  Prices,
  Footer,
} from "@/components/LandingPage";

const LandingPage: React.FC = () => {
  console.log(
    "import.meta.env.VITE_BASIC_URL = ",
    import.meta.env.VITE_BASIC_URL
  );

  return (
    <div className="flex flex-1 flex-col h-[calc(100vh_-_80px)] bg-neutral-100 font-Roboto">
      <Navbar />

      <section className="flex-1 overflow-y-auto shrink-0">
        <Hero />
        <Infos />
        <Users />
        <Prices />
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
