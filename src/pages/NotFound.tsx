import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, ArrowLeft } from "lucide-react";
import ArcReactorButton from "@/components/ArcReactorButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center tactical-grid">
      <div className="text-center px-4">
        {/* Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-glow-pulse" />
          <div className="relative w-full h-full rounded-full bg-secondary border border-accent/30 flex items-center justify-center arc-reactor-glow">
            <Shield className="w-12 h-12 text-accent" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">
          4<span className="text-accent">0</span>4
        </h1>

        {/* Message */}
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Sector Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The requested resource is not available. This area may be classified 
          or the coordinates are incorrect.
        </p>

        {/* CTA */}
        <Link to="/">
          <ArcReactorButton size="lg">
            <ArrowLeft className="w-5 h-5" />
            Return to Base
          </ArcReactorButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
