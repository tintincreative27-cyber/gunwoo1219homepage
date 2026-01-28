import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ArcReactorButton from "./ArcReactorButton";
import { LogIn, UserPlus } from "lucide-react";
import { useLanguage, getLanguageFromNationality } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NATIONALITIES = [
  "United States", "United Kingdom", "Canada", "Australia",
  "South Korea", "North Korea",
  "China", "Taiwan", "Hong Kong", "Macau",
  "Japan",
  "Germany", "Austria", "Switzerland",
  "France",
  "Spain", "Mexico",
  "Russia",
  "Other"
];

const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange }) => {
  const { t, setLanguage, setChineseVariant, chineseVariant } = useLanguage();
  const { login, signUp, isLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showChineseVariant, setShowChineseVariant] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 모달이 닫힐 때 상태 리셋
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsSignUp(false);
      setShowChineseVariant(false);
      setFormData({
        username: "",
        password: "",
        name: "",
        birthDate: "",
        nationality: "",
        organization: "",
        signupUsername: "",
        signupPassword: "",
      });
    }
    onOpenChange(newOpen);
  };
  const [formData, setFormData] = useState({
    // 로그인 필드
    username: "",
    password: "",
    // 회원가입 필드
    name: "",
    birthDate: "",
    nationality: "",
    organization: "",
    signupUsername: "",
    signupPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNationalityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      nationality: value,
    }));

    if (value !== "Other") {
      const langInfo = getLanguageFromNationality(value);
      if (langInfo) {
        setLanguage(langInfo.lang);
        if (langInfo.hasVariants) {
          setShowChineseVariant(true);
          // Set default variant based on nationality
          if (value === "China") {
            setChineseVariant("simplified");
          } else if (value === "Taiwan" || value === "Hong Kong" || value === "Macau") {
            setChineseVariant("traditional");
          }
        } else {
          setShowChineseVariant(false);
        }
      }
    } else {
      setShowChineseVariant(false);
    }
  };

  useEffect(() => {
    // Check if current language requires Chinese variant options
    if (open && isSignUp) {
      const currentNationality = formData.nationality;
      if (currentNationality) {
        const langInfo = getLanguageFromNationality(currentNationality);
        if (langInfo?.hasVariants) {
          setShowChineseVariant(true);
        }
      }
    }
  }, [open, isSignUp, formData.nationality]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await login(formData.username, formData.password);
      toast.success(t("loginFunctionality"));
      handleOpenChange(false);
    } catch (err: any) {
      const message = err?.message || "Login failed";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await signUp(formData.signupUsername, formData.signupPassword, formData.name);
      toast.success(t("registrationCompleted"));
      setIsSignUp(false);
      handleOpenChange(false);
    } catch (err: any) {
      const message = err?.message || "Sign up failed";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
  };

  const switchToLogin = () => {
    setIsSignUp(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isSignUp ? t("signUp") : t("login")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSignUp ? t("createAccount") : t("signInToAccount")}
          </DialogDescription>
        </DialogHeader>

        {!isSignUp ? (
          // Login form
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("username")}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder={t("enterUsername")}
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t("enterPassword")}
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="pt-4">
              <ArcReactorButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                <LogIn className="w-5 h-5" />
                {t("login")}
              </ArcReactorButton>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={switchToSignUp}
                disabled={isLoading}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {t("signUp")}
              </Button>
            </div>
          </form>
        ) : (
          // Sign up form
          <form onSubmit={handleSignUp} className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="name">{t("fullName")} *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={t("enterFullName")}
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">{t("dateOfBirth")} *</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                lang="en"
                value={formData.birthDate}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">{t("nationality")} *</Label>
              <Select value={formData.nationality} onValueChange={handleNationalityChange} disabled={isLoading}>
                <SelectTrigger id="nationality">
                  <SelectValue placeholder={t("enterNationality")} />
                </SelectTrigger>
                <SelectContent>
                  {NATIONALITIES.map((nationality) => (
                    <SelectItem key={nationality} value={nationality}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Chinese Variant Selector */}
            {showChineseVariant && (
              <div className="space-y-2">
                <Label>Chinese Variant *</Label>
                <Select
                  value={chineseVariant || "simplified"}
                  onValueChange={(value) => setChineseVariant(value as "simplified" | "traditional")}
                    disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simplified">简体中文 (Simplified)</SelectItem>
                    <SelectItem value="traditional">繁體中文 (Traditional)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="organization">{t("organization")} *</Label>
              <Input
                id="organization"
                name="organization"
                type="text"
                placeholder={t("enterOrganization")}
                value={formData.organization}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signupUsername">{t("username")} *</Label>
              <Input
                id="signupUsername"
                name="signupUsername"
                type="text"
                placeholder={t("enterUsername")}
                value={formData.signupUsername}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signupPassword">{t("password")} *</Label>
              <Input
                id="signupPassword"
                name="signupPassword"
                type="password"
                placeholder={t("enterPassword")}
                value={formData.signupPassword}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="pt-4">
              <ArcReactorButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                <UserPlus className="w-5 h-5" />
                {t("signUp")}
              </ArcReactorButton>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={switchToLogin}
                disabled={isLoading}
              >
                {t("alreadyHaveAccount")}
              </Button>
            </div>
          </form>
        )}

        {errorMessage && (
          <div className="pt-2">
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

