import React from "react";
import { Shield, Lock, Globe, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-accent" />
              <span className="text-xl font-bold text-foreground">
                <span className="text-accent">&raquo;</span> StratLink
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              {t("premierB2gDefense")}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-4 h-4 text-accent" />
                <span>{t("encryption256bit")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Globe className="w-4 h-4 text-accent" />
                <span>{t("natoCertified")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t("products")}
                </a>
              </li>
              <li>
                <a href="/cart" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t("requestQuote")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t("compliance")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t("secureContact")}
            </h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-accent" />
              <span>procurement@stratlink.gov</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {t("allInquiriesSecure")}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {t("allRightsReserved")}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{t("itarCompliant")}</span>
              <span>•</span>
              <span>{t("earRegistered")}</span>
              <span>•</span>
              <span>{t("dfarsCertified")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
