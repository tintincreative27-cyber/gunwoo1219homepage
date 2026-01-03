import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Language = "en" | "ko" | "zh-CN" | "zh-TW" | "ja" | "de" | "fr" | "es" | "ru";
export type ChineseVariant = "simplified" | "traditional";

interface LanguageContextType {
  language: Language;
  chineseVariant: ChineseVariant | null;
  setLanguage: (lang: Language) => void;
  setChineseVariant: (variant: ChineseVariant) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Nationality to language mapping
const nationalityLanguageMap: Record<string, { lang: Language; hasVariants?: boolean }> = {
  "United States": { lang: "en" },
  "United Kingdom": { lang: "en" },
  "Canada": { lang: "en" },
  "Australia": { lang: "en" },
  "South Korea": { lang: "ko" },
  "North Korea": { lang: "ko" },
  "China": { lang: "zh-CN", hasVariants: true },
  "Taiwan": { lang: "zh-TW", hasVariants: true },
  "Hong Kong": { lang: "zh-TW", hasVariants: true },
  "Macau": { lang: "zh-TW", hasVariants: true },
  "Japan": { lang: "ja" },
  "Germany": { lang: "de" },
  "Austria": { lang: "de" },
  "Switzerland": { lang: "de" },
  "France": { lang: "fr" },
  "Spain": { lang: "es" },
  "Mexico": { lang: "es" },
  "Russia": { lang: "ru" },
};

export const getLanguageFromNationality = (nationality: string): { lang: Language; hasVariants?: boolean } | null => {
  return nationalityLanguageMap[nationality] || null;
};

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    login: "Login",
    signUp: "Sign Up",
    username: "Username",
    password: "Password",
    fullName: "Full Name",
    dateOfBirth: "Date of Birth (YYYY-MM-DD)",
    nationality: "Nationality",
    organization: "Organization",
    enterUsername: "Enter your username",
    enterPassword: "Enter your password",
    enterFullName: "Enter your full name",
    enterNationality: "Enter your nationality",
    enterOrganization: "Enter your organization",
    createAccount: "Create a new account to get started",
    signInToAccount: "Sign in to your account to continue",
    alreadyHaveAccount: "Already have an account? Login",
    loginFunctionality: "Login functionality has been implemented.",
    registrationCompleted: "Registration completed successfully.",
  },
  ko: {
    login: "로그인",
    signUp: "회원가입",
    username: "아이디",
    password: "비밀번호",
    fullName: "이름",
    dateOfBirth: "생년월일 (YYYY-MM-DD)",
    nationality: "국적",
    organization: "소속",
    enterUsername: "아이디를 입력하세요",
    enterPassword: "비밀번호를 입력하세요",
    enterFullName: "이름을 입력하세요",
    enterNationality: "국적을 입력하세요",
    enterOrganization: "소속을 입력하세요",
    createAccount: "새 계정을 만들어 시작하세요",
    signInToAccount: "계정에 로그인하여 계속하세요",
    alreadyHaveAccount: "이미 계정이 있으신가요? 로그인",
    loginFunctionality: "로그인 기능이 구현되었습니다.",
    registrationCompleted: "회원가입이 완료되었습니다.",
  },
  "zh-CN": {
    login: "登录",
    signUp: "注册",
    username: "用户名",
    password: "密码",
    fullName: "姓名",
    dateOfBirth: "出生日期 (YYYY-MM-DD)",
    nationality: "国籍",
    organization: "所属机构",
    enterUsername: "请输入用户名",
    enterPassword: "请输入密码",
    enterFullName: "请输入姓名",
    enterNationality: "请输入国籍",
    enterOrganization: "请输入所属机构",
    createAccount: "创建新账户以开始使用",
    signInToAccount: "登录您的账户以继续",
    alreadyHaveAccount: "已有账户？登录",
    loginFunctionality: "登录功能已实现。",
    registrationCompleted: "注册成功完成。",
  },
  "zh-TW": {
    login: "登入",
    signUp: "註冊",
    username: "用戶名",
    password: "密碼",
    fullName: "姓名",
    dateOfBirth: "出生日期 (YYYY-MM-DD)",
    nationality: "國籍",
    organization: "所屬機構",
    enterUsername: "請輸入用戶名",
    enterPassword: "請輸入密碼",
    enterFullName: "請輸入姓名",
    enterNationality: "請輸入國籍",
    enterOrganization: "請輸入所屬機構",
    createAccount: "建立新帳戶以開始使用",
    signInToAccount: "登入您的帳戶以繼續",
    alreadyHaveAccount: "已有帳戶？登入",
    loginFunctionality: "登入功能已實現。",
    registrationCompleted: "註冊成功完成。",
  },
  ja: {
    login: "ログイン",
    signUp: "サインアップ",
    username: "ユーザー名",
    password: "パスワード",
    fullName: "氏名",
    dateOfBirth: "生年月日 (YYYY-MM-DD)",
    nationality: "国籍",
    organization: "所属",
    enterUsername: "ユーザー名を入力してください",
    enterPassword: "パスワードを入力してください",
    enterFullName: "氏名を入力してください",
    enterNationality: "国籍を入力してください",
    enterOrganization: "所属を入力してください",
    createAccount: "新しいアカウントを作成して始めましょう",
    signInToAccount: "アカウントにログインして続行してください",
    alreadyHaveAccount: "アカウントをお持ちですか？ログイン",
    loginFunctionality: "ログイン機能が実装されました。",
    registrationCompleted: "登録が正常に完了しました。",
  },
  de: {
    login: "Anmelden",
    signUp: "Registrieren",
    username: "Benutzername",
    password: "Passwort",
    fullName: "Vollständiger Name",
    dateOfBirth: "Geburtsdatum (JJJJ-MM-TT)",
    nationality: "Nationalität",
    organization: "Organisation",
    enterUsername: "Geben Sie Ihren Benutzernamen ein",
    enterPassword: "Geben Sie Ihr Passwort ein",
    enterFullName: "Geben Sie Ihren vollständigen Namen ein",
    enterNationality: "Geben Sie Ihre Nationalität ein",
    enterOrganization: "Geben Sie Ihre Organisation ein",
    createAccount: "Erstellen Sie ein neues Konto, um zu beginnen",
    signInToAccount: "Melden Sie sich bei Ihrem Konto an, um fortzufahren",
    alreadyHaveAccount: "Haben Sie bereits ein Konto? Anmelden",
    loginFunctionality: "Anmeldefunktion wurde implementiert.",
    registrationCompleted: "Registrierung erfolgreich abgeschlossen.",
  },
  fr: {
    login: "Connexion",
    signUp: "S'inscrire",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    fullName: "Nom complet",
    dateOfBirth: "Date de naissance (AAAA-MM-JJ)",
    nationality: "Nationalité",
    organization: "Organisation",
    enterUsername: "Entrez votre nom d'utilisateur",
    enterPassword: "Entrez votre mot de passe",
    enterFullName: "Entrez votre nom complet",
    enterNationality: "Entrez votre nationalité",
    enterOrganization: "Entrez votre organisation",
    createAccount: "Créez un nouveau compte pour commencer",
    signInToAccount: "Connectez-vous à votre compte pour continuer",
    alreadyHaveAccount: "Vous avez déjà un compte ? Connexion",
    loginFunctionality: "La fonctionnalité de connexion a été implémentée.",
    registrationCompleted: "Inscription terminée avec succès.",
  },
  es: {
    login: "Iniciar sesión",
    signUp: "Registrarse",
    username: "Nombre de usuario",
    password: "Contraseña",
    fullName: "Nombre completo",
    dateOfBirth: "Fecha de nacimiento (AAAA-MM-DD)",
    nationality: "Nacionalidad",
    organization: "Organización",
    enterUsername: "Ingrese su nombre de usuario",
    enterPassword: "Ingrese su contraseña",
    enterFullName: "Ingrese su nombre completo",
    enterNationality: "Ingrese su nacionalidad",
    enterOrganization: "Ingrese su organización",
    createAccount: "Cree una nueva cuenta para comenzar",
    signInToAccount: "Inicie sesión en su cuenta para continuar",
    alreadyHaveAccount: "¿Ya tiene una cuenta? Iniciar sesión",
    loginFunctionality: "La funcionalidad de inicio de sesión ha sido implementada.",
    registrationCompleted: "Registro completado con éxito.",
  },
  ru: {
    login: "Войти",
    signUp: "Регистрация",
    username: "Имя пользователя",
    password: "Пароль",
    fullName: "Полное имя",
    dateOfBirth: "Дата рождения (ГГГГ-ММ-ДД)",
    nationality: "Национальность",
    organization: "Организация",
    enterUsername: "Введите имя пользователя",
    enterPassword: "Введите пароль",
    enterFullName: "Введите полное имя",
    enterNationality: "Введите национальность",
    enterOrganization: "Введите организацию",
    createAccount: "Создайте новую учетную запись, чтобы начать",
    signInToAccount: "Войдите в свою учетную запись, чтобы продолжить",
    alreadyHaveAccount: "Уже есть учетная запись? Войти",
    loginFunctionality: "Функция входа была реализована.",
    registrationCompleted: "Регистрация успешно завершена.",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("language") as Language;
      if (saved && translations[saved]) return saved;
    } catch {}
    return "en";
  });

  const [chineseVariant, setChineseVariantState] = useState<ChineseVariant | null>(() => {
    try {
      const saved = localStorage.getItem("chineseVariant") as ChineseVariant | null;
      return saved || null;
    } catch {}
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch {}
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (chineseVariant) {
      try {
        localStorage.setItem("chineseVariant", chineseVariant);
      } catch {}
    }
  }, [chineseVariant]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (lang === "zh-CN" || lang === "zh-TW") {
      // Keep variant if switching between Chinese languages
      if (!chineseVariant) {
        setChineseVariantState(lang === "zh-CN" ? "simplified" : "traditional");
      }
    } else {
      setChineseVariantState(null);
    }
  }, [chineseVariant]);

  const setChineseVariant = useCallback((variant: ChineseVariant) => {
    setChineseVariantState(variant);
    if (variant === "simplified") {
      setLanguageState("zh-CN");
    } else {
      setLanguageState("zh-TW");
    }
  }, []);

  const t = useCallback((key: string): string => {
    const effectiveLang = chineseVariant === "simplified" ? "zh-CN" : 
                         chineseVariant === "traditional" ? "zh-TW" : 
                         language;
    return translations[effectiveLang]?.[key] || translations.en[key] || key;
  }, [language, chineseVariant]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        chineseVariant,
        setLanguage,
        setChineseVariant,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

