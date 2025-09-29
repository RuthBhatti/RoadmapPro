import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { RoadmapPreview } from "@/components/RoadmapPreview";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="features">
          <Features />
        </section>
        <section id="roadmap">
          <RoadmapPreview />
        </section>
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
