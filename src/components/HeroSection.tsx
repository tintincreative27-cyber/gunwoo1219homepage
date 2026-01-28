import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Globe } from "lucide-react";
import ArcReactorButton from "./ArcReactorButton";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 tactical-grid" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Animated Network Nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        
        {/* Floating nodes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-glow-pulse" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent/70 rounded-full animate-glow-pulse delay-300" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent/50 rounded-full animate-glow-pulse delay-700" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-accent/60 rounded-full animate-glow-pulse delay-500" />
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="25%" y1="25%" x2="75%" y2="33%" stroke="hsl(191 100% 50%)" strokeWidth="0.5" />
          <line x1="75%" y1="33%" x2="33%" y2="67%" stroke="hsl(191 100% 50%)" strokeWidth="0.5" />
          <line x1="33%" y1="67%" x2="67%" y2="75%" stroke="hsl(191 100% 50%)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-8 animate-fade-in">
            <Lock className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              {t("verifiedItarCompliant")}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t("globalDefenseNexus")}
            <span className="block text-accent mt-2">{t("secureStrategic")}</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t("premierB2gPlatform")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/products">
              <ArcReactorButton size="lg">
                <Globe className="w-5 h-5" />
                {t("exploreSystems")}
              </ArcReactorButton>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="trust-badge px-4 py-2 rounded-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">{t("itarCompliant")}</span>
            </div>
            <div className="trust-badge px-4 py-2 rounded-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">{t("natoStandard")}</span>
            </div>
            <div className="trust-badge px-4 py-2 rounded-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">{t("cyberSecure")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
