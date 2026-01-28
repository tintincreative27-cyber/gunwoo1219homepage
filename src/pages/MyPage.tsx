import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const MyPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pwForm, setPwForm] = useState({ newPassword: "", confirmPassword: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [history, setHistory] = useState<{ id: string; title: string; date: string }[]>([]);

  useEffect(() => {
    // 간단한 로컬 스토리지 기반 모의 구매 내역 로드 (백엔드 연동 전)
    try {
      const raw = localStorage.getItem("purchaseHistory");
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setPwLoading(true);
      if (!supabase) {
        throw new Error("Supabase is not configured. Please check your environment variables.");
      }
      const { error } = await supabase.auth.updateUser({ password: pwForm.newPassword });
      if (error) throw error;
      toast.success("Password updated");
      setPwForm({ newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to update password");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">{t("myPage")}</h1>
            <p className="text-muted-foreground mt-2">{t("myPageRequiresLogin")}</p>
          </div>

          {isLoading ? (
            <Card>
              <CardHeader>
                <CardTitle>{t("myAccount")}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{t("processing")}</CardContent>
            </Card>
          ) : !isAuthenticated || !user ? (
            <Card>
              <CardHeader>
                <CardTitle>{t("loginRequired")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{t("myPageRequiresLogin")}</p>
                <div className="flex gap-3">
                  <Link to="/">
                    <Button variant="outline">{t("backToHome")}</Button>
                  </Link>
                  <Button onClick={() => setAuthModalOpen(true)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    {t("login")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{t("profile")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-semibold text-foreground">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-secondary/50 border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">{t("email")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-foreground break-all">{user.email}</CardContent>
                  </Card>

                  <Card className="bg-secondary/50 border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-3" onSubmit={handlePasswordChange}>
                        <Input
                          type="password"
                          placeholder="New password"
                          value={pwForm.newPassword}
                          onChange={(e) => setPwForm((p) => ({ ...p, newPassword: e.target.value }))}
                          disabled={pwLoading}
                          required
                        />
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          value={pwForm.confirmPassword}
                          onChange={(e) => setPwForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                          disabled={pwLoading}
                          required
                        />
                        <Button type="submit" className="w-full" disabled={pwLoading}>
                          {pwLoading ? t("processing") : t("saveChanges")}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">{t("purchaseHistory")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {history.length === 0 ? (
                      <p className="text-sm text-muted-foreground">{t("noPurchaseHistory")}</p>
                    ) : (
                      <ul className="space-y-2 text-sm text-foreground">
                        {history.map((item) => (
                          <li key={item.id} className="flex justify-between border-b border-border pb-2">
                            <span>{item.title}</span>
                            <span className="text-muted-foreground">{item.date}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default MyPage;

