import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Shield, Menu, X, Sun, Moon, LogIn } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // localStorage에서 테마 가져오기
    try {
      const savedTheme = localStorage.getItem("theme") as 'light' | 'dark' | null;
      if (savedTheme) {
        return savedTheme;
      }
    } catch {}
    // 시스템 설정 확인
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "Cart" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-accent group-hover:text-glow transition-all" />
              <div className="absolute inset-0 bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">
                <span className="text-accent">&raquo;</span> StratLink
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden md:block">
                Defense Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium uppercase tracking-wider transition-colors",
                  isActive(link.path)
                    ? "text-accent text-glow"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Login Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              aria-label="Login"
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden lg:inline">Login</span>
            </button>

            {/* Theme Toggle - 해/달 아이콘 버튼 */}
            <button
              onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
              aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className="relative p-2 rounded-lg hover:bg-secondary transition-all duration-300 group"
              title={theme === "dark" ? "라이트 모드" : "다크 모드"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {theme === "dark" ? (
                  <Sun className="w-6 h-6 text-yellow-500 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-400 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                )}
              </div>
              {/* 호버 시 글로우 효과 */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/10 blur-sm -z-10" />
            </button>

            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors group"
            >
              <ShoppingCart className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors",
                    isActive(link.path)
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            </div>
          </nav>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </header>
  );
};

export default Header;
