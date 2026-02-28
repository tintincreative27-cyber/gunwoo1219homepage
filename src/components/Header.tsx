import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Shield, Menu, X, Sun, Moon, LogIn, LogOut, User, Globe } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage, Language } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { t, language, setLanguage, setChineseVariant } = useLanguage();
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
    { path: "/", label: t("home") },
    { path: "/products", label: t("products") },
    { path: "/cart", label: t("cart") },
  ];

  const handleLanguageChange = (lang: string) => {
    const selected = lang as Language;
    setLanguage(selected);
    if (selected === "zh-CN") {
      setChineseVariant("simplified");
    } else if (selected === "zh-TW") {
      setChineseVariant("traditional");
    }
  };

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
                {t("defenseSolutions")}
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
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Selector */}
            <div className="hidden md:block">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[140px]">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <SelectValue placeholder="Language" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ko">한국어</SelectItem>
                  <SelectItem value="zh-CN">简体中文</SelectItem>
                  <SelectItem value="zh-TW">繁體中文</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Login/User Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    aria-label="User menu"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline max-w-[150px] truncate">
                      {user.email}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/mypage" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      {t("myPage")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                aria-label={t("login")}
              >
                <LogIn className="w-5 h-5" />
                <span className="hidden lg:inline">{t("login")}</span>
              </button>
            )}

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
              <div className="px-4 pt-2">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <SelectValue placeholder="Language" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                    <SelectItem value="zh-TW">繁體中文</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {user ? (
                <>
                  <Link
                    to="/mypage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <User className="w-4 h-4" />
                    {t("myPage")}
                  </Link>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors text-red-500 hover:bg-secondary"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("logout")}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <LogIn className="w-4 h-4" />
                  {t("login")}
                </button>
              )}
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
