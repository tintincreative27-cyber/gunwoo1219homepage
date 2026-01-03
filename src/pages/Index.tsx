import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WeeklyBest from "@/components/WeeklyBest";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WeeklyBest />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
