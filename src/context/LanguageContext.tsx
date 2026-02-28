import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Language = "en" | "ko" | "zh-CN" | "zh-TW" | "ja" | "de" | "fr" | "es" | "ru";
export type ChineseVariant = "simplified" | "traditional";

interface LanguageContextType {
  language: Language;
  chineseVariant: ChineseVariant | null;
  setLanguage: (lang: Language) => void;
  setChineseVariant: (variant: ChineseVariant) => void;
  t: (key: string) => string;
  formatPrice: (priceUSD: number) => string;
  getCurrency: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Exchange rates (based on January 2026, 1 USD = X)
const exchangeRates: Record<Language, number> = {
  "en": 1.0,      // USD
  "ko": 1350.0,   // KRW
  "zh-CN": 7.25,  // CNY
  "zh-TW": 32.0,  // TWD
  "ja": 155.0,    // JPY
  "de": 0.92,     // EUR
  "fr": 0.92,     // EUR
  "es": 0.92,     // EUR
  "ru": 95.0,     // RUB
};

// Currency codes
const currencyCodes: Record<Language, string> = {
  "en": "USD",
  "ko": "KRW",
  "zh-CN": "CNY",
  "zh-TW": "TWD",
  "ja": "JPY",
  "de": "EUR",
  "fr": "EUR",
  "es": "EUR",
  "ru": "RUB",
};

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
    // Auth
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
    logout: "Logout",
    myAccount: "My Account",
    myPage: "My Page",
    
    // Header
    home: "Home",
    products: "Products",
    cart: "Cart",
    defenseSolutions: "Defense Solutions",
    
    // Hero Section
    verifiedItarCompliant: "Verified ITAR Compliant",
    globalDefenseNexus: "Global Defense Nexus",
    secureStrategic: "Secure & Strategic",
    premierB2gPlatform: "Premier B2G procurement platform trusted by allied nations. Access cutting-edge defense systems with military-grade security.",
    exploreSystems: "Explore Systems",
    itarCompliant: "ITAR Compliant",
    natoStandard: "NATO Standard",
    cyberSecure: "Cyber-Secure",
    
    // Footer
    premierB2gDefense: "Premier B2G defense procurement platform. Trusted by allied nations for secure, compliant access to advanced military systems.",
    encryption256bit: "256-bit Encryption",
    natoCertified: "NATO Certified",
    quickLinks: "Quick Links",
    requestQuote: "Request Quote",
    compliance: "Compliance",
    secureContact: "Secure Contact",
    allInquiriesSecure: "All inquiries processed through secure channels. Government credentials required.",
    allRightsReserved: "© 2024 StratLink Defense Solutions. All rights reserved.",
    earRegistered: "EAR Registered",
    dfarsCertified: "DFARS Certified",
    
    // Products
    weeklyBest: "Weekly Best",
    weeklyBestDesc: "Most popular defense systems this week",
    defenseSysCatalog: "Defense Systems Catalog",
    defenseSysCatalogDesc: "Browse our comprehensive portfolio of advanced military systems. All products meet NATO interoperability standards.",
    allSystems: "All Systems",
    land: "Land",
    sea: "Sea",
    air: "Air",
    sortBy: "Sort by",
    latest: "Latest",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    noProductsFound: "No products found in this category.",
    
    // Product Detail
    backToCatalog: "Back to Catalog",
    productNotFound: "Product Not Found",
    returnToProducts: "Return to Products",
    technicalSpecs: "Technical Specifications",
    unitPriceEst: "Unit Price (Est.)",
    addToQuote: "Add to Quote",
    exportControlNotice: "This product is subject to export controls. Government credentials and end-user certificates required for procurement.",
    addedToQuote: "added to quote request",
    viewCartToSubmit: "View your cart to submit the request.",
    
    // Cart
    yourQuoteCartEmpty: "Your Quote Cart is Empty",
    browseDefenseCatalog: "Browse our defense systems catalog to add items for your official quote request.",
    browseCatalog: "Browse Catalog",
    quoteRequest: "Quote Request",
    reviewSelectedSystems: "Review your selected systems before submitting your official procurement request.",
    continueBrowsing: "Continue Browsing",
    product: "Product",
    unitPrice: "Unit Price",
    quantity: "Quantity",
    total: "Total",
    options: "Options",
    quoteSummary: "Quote Summary",
    subtotal: "Subtotal",
    finalPricingNote: "*Final pricing subject to contract negotiation",
    estimatedTotal: "Estimated Total",
    requestOfficialQuote: "Request Official Quote",
    secureTransmission: "Secure transmission • Government verification required",
    itemOptions: "Item Options",
    configuration: "Configuration",
    notes: "Notes",
    cancel: "Cancel",
    save: "Save",
    purchase: "Purchase",
    quoteRequestSubmitted: "Quote Request Submitted",
    procurementSpecialistContact: "A procurement specialist will contact you within 24 hours.",
    
    // My Page
    backToHome: "Back to Home",
    profile: "Profile",
    purchaseHistory: "Purchase History",
    updateProfile: "Update Profile",
    updateProfileDesc: "Update your profile information",
    email: "Email",
    emailCannotChange: "Email cannot be changed",
    phoneNumber: "Phone Number",
    enterPhoneNumber: "Enter your phone number",
    address: "Address",
    enterAddress: "Enter your address",
    updating: "Updating...",
    saveChanges: "Save Changes",
    paymentHistory: "Payment History",
    viewPastPurchases: "View your past purchases",
    noPurchaseHistory: "No purchase history yet",
    profileUpdated: "Profile Updated",
    profileUpdateSuccess: "Your profile has been successfully updated.",
    updateFailed: "Update Failed",
    loginRequired: "Login Required",
    myPageRequiresLogin: "My Page requires login.",
    
    // Purchase Page
    backToHome: "Back to Home",
    purchaseInformation: "Purchase Information",
    providePurchaseDetails: "Please provide your purchase details",
    purchaseItem: "Purchase Item",
    enterPurchaseItem: "Enter the item you purchased",
    purchaseLocation: "Purchase Location",
    enterPurchaseLocation: "Enter the purchase location",
    purchaseTime: "Purchase Time",
    processing: "Processing...",
    submit: "Submit",
    purchaseComplete: "Purchase Complete!",
    purchaseSuccessDesc: "Purchase information has been successfully submitted.",
    purchaseFailed: "Purchase Failed",
    purchaseLoginRequired: "Login Required",
    purchaseLoginRequiredDesc: "You need to login to make a purchase.",
  },
  ko: {
    // Auth
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
    logout: "로그아웃",
    myAccount: "내 계정",
    myPage: "마이페이지",
    
    // Header
    home: "홈",
    products: "제품",
    cart: "장바구니",
    defenseSolutions: "방위 솔루션",
    
    // Hero Section
    verifiedItarCompliant: "ITAR 인증 완료",
    globalDefenseNexus: "글로벌 방위 네트워크",
    secureStrategic: "안전하고 전략적인",
    premierB2gPlatform: "동맹국이 신뢰하는 최고의 B2G 조달 플랫폼. 군사급 보안으로 최첨단 방위 시스템에 액세스하세요.",
    exploreSystems: "시스템 탐색",
    itarCompliant: "ITAR 준수",
    natoStandard: "NATO 표준",
    cyberSecure: "사이버 보안",
    
    // Footer
    premierB2gDefense: "최고의 B2G 방위 조달 플랫폼. 동맹국이 첨단 군사 시스템에 안전하고 규정을 준수하여 액세스할 수 있도록 신뢰받고 있습니다.",
    encryption256bit: "256비트 암호화",
    natoCertified: "NATO 인증",
    quickLinks: "빠른 링크",
    requestQuote: "견적 요청",
    compliance: "규정 준수",
    secureContact: "보안 연락처",
    allInquiriesSecure: "모든 문의는 보안 채널을 통해 처리됩니다. 정부 자격 증명이 필요합니다.",
    allRightsReserved: "© 2024 StratLink Defense Solutions. All rights reserved.",
    earRegistered: "EAR 등록",
    dfarsCertified: "DFARS 인증",
    
    // Products
    weeklyBest: "주간 베스트",
    weeklyBestDesc: "이번 주 가장 인기 있는 방위 시스템",
    defenseSysCatalog: "방위 시스템 카탈로그",
    defenseSysCatalogDesc: "첨단 군사 시스템의 종합 포트폴리오를 둘러보세요. 모든 제품은 NATO 상호 운용성 표준을 충족합니다.",
    allSystems: "전체 시스템",
    land: "지상",
    sea: "해상",
    air: "공중",
    sortBy: "정렬",
    latest: "최신순",
    priceLowToHigh: "낮은 가격순",
    priceHighToLow: "높은 가격순",
    noProductsFound: "이 카테고리에서 제품을 찾을 수 없습니다.",
    
    // Product Detail
    backToCatalog: "카탈로그로 돌아가기",
    productNotFound: "제품을 찾을 수 없습니다",
    returnToProducts: "제품으로 돌아가기",
    technicalSpecs: "기술 사양",
    unitPriceEst: "단가 (예상)",
    addToQuote: "견적에 추가",
    exportControlNotice: "이 제품은 수출 통제 대상입니다. 조달을 위해 정부 자격 증명 및 최종 사용자 인증서가 필요합니다.",
    addedToQuote: "견적 요청에 추가되었습니다",
    viewCartToSubmit: "요청을 제출하려면 장바구니를 확인하세요.",
    
    // Cart
    yourQuoteCartEmpty: "견적 장바구니가 비어 있습니다",
    browseDefenseCatalog: "공식 견적 요청을 위해 항목을 추가하려면 방위 시스템 카탈로그를 둘러보세요.",
    browseCatalog: "카탈로그 둘러보기",
    quoteRequest: "견적 요청",
    reviewSelectedSystems: "공식 조달 요청을 제출하기 전에 선택한 시스템을 검토하세요.",
    continueBrowsing: "계속 둘러보기",
    product: "제품",
    unitPrice: "단가",
    quantity: "수량",
    total: "합계",
    options: "옵션",
    quoteSummary: "견적 요약",
    subtotal: "소계",
    finalPricingNote: "*최종 가격은 계약 협상에 따라 달라질 수 있습니다",
    estimatedTotal: "예상 합계",
    requestOfficialQuote: "공식 견적 요청",
    secureTransmission: "보안 전송 • 정부 확인 필요",
    itemOptions: "항목 옵션",
    configuration: "구성",
    notes: "메모",
    cancel: "취소",
    save: "저장",
    purchase: "구매",
    quoteRequestSubmitted: "견적 요청이 제출되었습니다",
    procurementSpecialistContact: "조달 전문가가 24시간 이내에 연락드립니다.",
    
    // My Page
    backToHome: "홈으로 돌아가기",
    profile: "프로필",
    purchaseHistory: "구매 내역",
    updateProfile: "회원정보 수정",
    updateProfileDesc: "프로필 정보를 업데이트하세요",
    email: "이메일",
    emailCannotChange: "이메일은 변경할 수 없습니다",
    phoneNumber: "전화번호",
    enterPhoneNumber: "전화번호를 입력하세요",
    address: "주소",
    enterAddress: "주소를 입력하세요",
    updating: "업데이트 중...",
    saveChanges: "변경사항 저장",
    paymentHistory: "결제 내역",
    viewPastPurchases: "과거 구매 내역을 확인하세요",
    noPurchaseHistory: "아직 구매 내역이 없습니다",
    profileUpdated: "프로필 업데이트 완료",
    profileUpdateSuccess: "회원정보가 성공적으로 업데이트되었습니다.",
    updateFailed: "업데이트 실패",
    loginRequired: "로그인 필요",
    myPageRequiresLogin: "마이페이지는 로그인 후 이용 가능합니다.",
    
    // Purchase Page
    backToHome: "홈으로 돌아가기",
    purchaseInformation: "구매 정보",
    providePurchaseDetails: "구매 세부 정보를 입력해주세요",
    purchaseItem: "구매 물품",
    enterPurchaseItem: "구매한 물품을 입력하세요",
    purchaseLocation: "구매 장소",
    enterPurchaseLocation: "구매 장소를 입력하세요",
    purchaseTime: "구매 시간",
    processing: "처리 중...",
    submit: "제출",
    purchaseComplete: "구매 완료!",
    purchaseSuccessDesc: "구매 정보가 성공적으로 제출되었습니다.",
    purchaseFailed: "구매 실패",
    purchaseLoginRequired: "로그인 필요",
    purchaseLoginRequiredDesc: "구매하려면 로그인이 필요합니다.",
  },
  "zh-CN": {
    // Auth
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
    logout: "登出",
    myAccount: "我的账户",
    myPage: "我的页面",
    
    // Header
    home: "首页",
    products: "产品",
    cart: "购物车",
    defenseSolutions: "防务解决方案",
    
    // Hero Section
    verifiedItarCompliant: "已验证ITAR合规",
    globalDefenseNexus: "全球防务网络",
    secureStrategic: "安全与战略",
    premierB2gPlatform: "受盟国信赖的顶级B2G采购平台。以军事级安全访问尖端防务系统。",
    exploreSystems: "探索系统",
    itarCompliant: "ITAR合规",
    natoStandard: "NATO标准",
    cyberSecure: "网络安全",
    
    // Footer
    premierB2gDefense: "顶级B2G防务采购平台。受盟国信赖，可安全、合规地访问先进军事系统。",
    encryption256bit: "256位加密",
    natoCertified: "NATO认证",
    quickLinks: "快速链接",
    requestQuote: "请求报价",
    compliance: "合规性",
    secureContact: "安全联系",
    allInquiriesSecure: "所有查询均通过安全渠道处理。需要政府凭证。",
    allRightsReserved: "© 2024 StratLink Defense Solutions. All rights reserved.",
    earRegistered: "EAR注册",
    dfarsCertified: "DFARS认证",
    
    // Products
    weeklyBest: "本周精选",
    weeklyBestDesc: "本周最受欢迎的防务系统",
    defenseSysCatalog: "防务系统目录",
    defenseSysCatalogDesc: "浏览我们全面的先进军事系统组合。所有产品均符合NATO互操作性标准。",
    allSystems: "所有系统",
    land: "陆地",
    sea: "海洋",
    air: "空中",
    sortBy: "排序",
    latest: "最新",
    priceLowToHigh: "价格从低到高",
    priceHighToLow: "价格从高到低",
    noProductsFound: "此类别中未找到产品。",
    
    // Product Detail
    backToCatalog: "返回目录",
    productNotFound: "未找到产品",
    returnToProducts: "返回产品",
    technicalSpecs: "技术规格",
    unitPriceEst: "单价（估计）",
    addToQuote: "添加到报价",
    exportControlNotice: "此产品受出口管制。采购需要政府凭证和最终用户证书。",
    addedToQuote: "已添加到报价请求",
    viewCartToSubmit: "查看您的购物车以提交请求。",
    
    // Cart
    yourQuoteCartEmpty: "您的报价购物车为空",
    browseDefenseCatalog: "浏览我们的防务系统目录，为您的官方报价请求添加项目。",
    browseCatalog: "浏览目录",
    quoteRequest: "报价请求",
    reviewSelectedSystems: "在提交官方采购请求之前，请查看您选择的系统。",
    continueBrowsing: "继续浏览",
    product: "产品",
    unitPrice: "单价",
    quantity: "数量",
    total: "总计",
    options: "选项",
    quoteSummary: "报价摘要",
    subtotal: "小计",
    finalPricingNote: "*最终价格以合同谈判为准",
    estimatedTotal: "估计总额",
    requestOfficialQuote: "请求官方报价",
    secureTransmission: "安全传输 • 需要政府验证",
    itemOptions: "项目选项",
    configuration: "配置",
    notes: "备注",
    cancel: "取消",
    save: "保存",
    purchase: "购买",
    quoteRequestSubmitted: "报价请求已提交",
    procurementSpecialistContact: "采购专家将在24小时内与您联系。",
    
    // My Page
    backToHome: "返回首页",
    profile: "个人资料",
    purchaseHistory: "购买历史",
    updateProfile: "更新个人资料",
    updateProfileDesc: "更新您的个人资料信息",
    email: "电子邮件",
    emailCannotChange: "电子邮件无法更改",
    phoneNumber: "电话号码",
    enterPhoneNumber: "请输入您的电话号码",
    address: "地址",
    enterAddress: "请输入您的地址",
    updating: "更新中...",
    saveChanges: "保存更改",
    paymentHistory: "付款历史",
    viewPastPurchases: "查看您的过去购买",
    noPurchaseHistory: "尚无购买历史",
    profileUpdated: "个人资料已更新",
    profileUpdateSuccess: "您的个人资料已成功更新。",
    updateFailed: "更新失败",
    loginRequired: "需要登录",
    myPageRequiresLogin: "我的页面需要登录。",
    
    // Purchase Page
    backToHome: "返回首页",
    purchaseInformation: "购买信息",
    providePurchaseDetails: "请提供您的购买详情",
    purchaseItem: "购买物品",
    enterPurchaseItem: "请输入您购买的物品",
    purchaseLocation: "购买地点",
    enterPurchaseLocation: "请输入购买地点",
    purchaseTime: "购买时间",
    processing: "处理中...",
    submit: "提交",
    purchaseComplete: "购买完成！",
    purchaseSuccessDesc: "购买信息已成功提交。",
    purchaseFailed: "购买失败",
    purchaseLoginRequired: "需要登录",
    purchaseLoginRequiredDesc: "您需要登录才能进行购买。",
  },
  "zh-TW": {
    // Auth
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
    logout: "登出",
    myAccount: "我的帳戶",
    myPage: "我的頁面",
    
    // Header
    home: "首頁",
    products: "產品",
    cart: "購物車",
    defenseSolutions: "防務解決方案",
    
    // Hero Section
    verifiedItarCompliant: "已驗證ITAR合規",
    globalDefenseNexus: "全球防務網絡",
    secureStrategic: "安全與戰略",
    premierB2gPlatform: "受盟國信賴的頂級B2G採購平台。以軍事級安全訪問尖端防務系統。",
    exploreSystems: "探索系統",
    itarCompliant: "ITAR合規",
    natoStandard: "NATO標準",
    cyberSecure: "網絡安全",
    
    // Footer
    premierB2gDefense: "頂級B2G防務採購平台。受盟國信賴，可安全、合規地訪問先進軍事系統。",
    encryption256bit: "256位加密",
    natoCertified: "NATO認證",
    quickLinks: "快速連結",
    requestQuote: "請求報價",
    compliance: "合規性",
    secureContact: "安全聯繫",
    allInquiriesSecure: "所有查詢均通過安全渠道處理。需要政府憑證。",
    allRightsReserved: "© 2024 StratLink Defense Solutions. All rights reserved.",
    earRegistered: "EAR註冊",
    dfarsCertified: "DFARS認證",
    
    // Products
    weeklyBest: "本週精選",
    weeklyBestDesc: "本週最受歡迎的防務系統",
    defenseSysCatalog: "防務系統目錄",
    defenseSysCatalogDesc: "瀏覽我們全面的先進軍事系統組合。所有產品均符合NATO互操作性標準。",
    allSystems: "所有系統",
    land: "陸地",
    sea: "海洋",
    air: "空中",
    sortBy: "排序",
    latest: "最新",
    priceLowToHigh: "價格從低到高",
    priceHighToLow: "價格從高到低",
    noProductsFound: "此類別中未找到產品。",
    
    // Product Detail
    backToCatalog: "返回目錄",
    productNotFound: "未找到產品",
    returnToProducts: "返回產品",
    technicalSpecs: "技術規格",
    unitPriceEst: "單價（估計）",
    addToQuote: "添加到報價",
    exportControlNotice: "此產品受出口管制。採購需要政府憑證和最終用戶證書。",
    addedToQuote: "已添加到報價請求",
    viewCartToSubmit: "查看您的購物車以提交請求。",
    
    // Cart
    yourQuoteCartEmpty: "您的報價購物車為空",
    browseDefenseCatalog: "瀏覽我們的防務系統目錄，為您的官方報價請求添加項目。",
    browseCatalog: "瀏覽目錄",
    quoteRequest: "報價請求",
    reviewSelectedSystems: "在提交官方採購請求之前，請查看您選擇的系統。",
    continueBrowsing: "繼續瀏覽",
    product: "產品",
    unitPrice: "單價",
    quantity: "數量",
    total: "總計",
    options: "選項",
    quoteSummary: "報價摘要",
    subtotal: "小計",
    finalPricingNote: "*最終價格以合同談判為準",
    estimatedTotal: "估計總額",
    requestOfficialQuote: "請求官方報價",
    secureTransmission: "安全傳輸 • 需要政府驗證",
    itemOptions: "項目選項",
    configuration: "配置",
    notes: "備註",
    cancel: "取消",
    save: "保存",
    purchase: "購買",
    quoteRequestSubmitted: "報價請求已提交",
    procurementSpecialistContact: "採購專家將在24小時內與您聯繫。",
    
    // My Page
    backToHome: "返回首頁",
    profile: "個人資料",
    purchaseHistory: "購買歷史",
    updateProfile: "更新個人資料",
    updateProfileDesc: "更新您的個人資料信息",
    email: "電子郵件",
    emailCannotChange: "電子郵件無法更改",
    phoneNumber: "電話號碼",
    enterPhoneNumber: "請輸入您的電話號碼",
    address: "地址",
    enterAddress: "請輸入您的地址",
    updating: "更新中...",
    saveChanges: "保存更改",
    paymentHistory: "付款歷史",
    viewPastPurchases: "查看您的過去購買",
    noPurchaseHistory: "尚無購買歷史",
    profileUpdated: "個人資料已更新",
    profileUpdateSuccess: "您的個人資料已成功更新。",
    updateFailed: "更新失敗",
    loginRequired: "需要登錄",
    myPageRequiresLogin: "我的頁面需要登錄。",
    
    // Purchase Page
    backToHome: "返回首頁",
    purchaseInformation: "購買信息",
    providePurchaseDetails: "請提供您的購買詳情",
    purchaseItem: "購買物品",
    enterPurchaseItem: "請輸入您購買的物品",
    purchaseLocation: "購買地點",
    enterPurchaseLocation: "請輸入購買地點",
    purchaseTime: "購買時間",
    processing: "處理中...",
    submit: "提交",
    purchaseComplete: "購買完成！",
    purchaseSuccessDesc: "購買信息已成功提交。",
    purchaseFailed: "購買失敗",
    purchaseLoginRequired: "需要登錄",
    purchaseLoginRequiredDesc: "您需要登錄才能進行購買。",
  },
  ja: {
    // Auth
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
    logout: "ログアウト",
    myAccount: "マイアカウント",
    myPage: "マイページ",
    
    // Header
    home: "ホーム",
    products: "製品",
    cart: "カート",
    defenseSolutions: "防衛ソリューション",
    
    // Hero Section
    verifiedItarCompliant: "ITAR準拠認証済み",
    globalDefenseNexus: "グローバル防衛ネットワーク",
    secureStrategic: "安全で戦略的",
    premierB2gPlatform: "同盟国に信頼される最高のB2G調達プラットフォーム。軍事グレードのセキュリティで最先端の防衛システムにアクセス。",
    exploreSystems: "システムを探索",
    itarCompliant: "ITAR準拠",
    natoStandard: "NATO標準",
    cyberSecure: "サイバーセキュア",
    
    // Footer
    premierB2gDefense: "最高のB2G防衛調達プラットフォーム。同盟国が先進的な軍事システムに安全かつコンプライアンスを遵守してアクセスできるよう信頼されています。",
    encryption256bit: "256ビット暗号化",
    natoCertified: "NATO認証",
    quickLinks: "クイックリンク",
    requestQuote: "見積もり依頼",
    compliance: "コンプライアンス",
    secureContact: "セキュア連絡先",
    allInquiriesSecure: "すべてのお問い合わせは安全なチャネルを通じて処理されます。政府の資格情報が必要です。",
    allRightsReserved: "© 2024 StratLink Defense Solutions. All rights reserved.",
    earRegistered: "EAR登録済み",
    dfarsCertified: "DFARS認証済み",
    
    // Products
    weeklyBest: "週間ベスト",
    weeklyBestDesc: "今週最も人気のある防衛システム",
    defenseSysCatalog: "防衛システムカタログ",
    defenseSysCatalogDesc: "先進的な軍事システムの包括的なポートフォリオをご覧ください。すべての製品はNATOの相互運用性標準を満たしています。",
    allSystems: "すべてのシステム",
    land: "陸上",
    sea: "海上",
    air: "航空",
    sortBy: "並び替え",
    latest: "最新",
    priceLowToHigh: "価格の安い順",
    priceHighToLow: "価格の高い順",
    noProductsFound: "このカテゴリーに製品が見つかりません。",
    
    // Product Detail
    backToCatalog: "カタログに戻る",
    productNotFound: "製品が見つかりません",
    returnToProducts: "製品に戻る",
    technicalSpecs: "技術仕様",
    unitPriceEst: "単価（推定）",
    addToQuote: "見積もりに追加",
    exportControlNotice: "この製品は輸出管理の対象です。調達には政府の資格情報と最終ユーザー証明書が必要です。",
    addedToQuote: "見積もり依頼に追加されました",
    viewCartToSubmit: "リクエストを送信するにはカートを表示してください。",
    
    // Cart
    yourQuoteCartEmpty: "見積もりカートは空です",
    browseDefenseCatalog: "公式見積もり依頼のアイテムを追加するには、防衛システムカタログをご覧ください。",
    browseCatalog: "カタログを閲覧",
    quoteRequest: "見積もり依頼",
    reviewSelectedSystems: "公式調達依頼を送信する前に、選択したシステムを確認してください。",
    continueBrowsing: "閲覧を続ける",
    product: "製品",
    unitPrice: "単価",
    quantity: "数量",
    total: "合計",
    options: "オプション",
    quoteSummary: "見積もり概要",
    subtotal: "小計",
    finalPricingNote: "*最終価格は契約交渉によります",
    estimatedTotal: "推定合計",
    requestOfficialQuote: "公式見積もりを依頼",
    secureTransmission: "安全な送信 • 政府認証が必要",
    itemOptions: "アイテムオプション",
    configuration: "構成",
    notes: "メモ",
    cancel: "キャンセル",
    save: "保存",
    purchase: "購入",
    quoteRequestSubmitted: "見積もり依頼が送信されました",
    procurementSpecialistContact: "調達スペシャリストが24時間以内にご連絡いたします。",
    
    // My Page
    backToHome: "ホームに戻る",
    profile: "プロフィール",
    purchaseHistory: "購入履歴",
    updateProfile: "プロフィールを更新",
    updateProfileDesc: "プロフィール情報を更新してください",
    email: "メールアドレス",
    emailCannotChange: "メールアドレスは変更できません",
    phoneNumber: "電話番号",
    enterPhoneNumber: "電話番号を入力してください",
    address: "住所",
    enterAddress: "住所を入力してください",
    updating: "更新中...",
    saveChanges: "変更を保存",
    paymentHistory: "支払い履歴",
    viewPastPurchases: "過去の購入を表示",
    noPurchaseHistory: "購入履歴はまだありません",
    profileUpdated: "プロフィールが更新されました",
    profileUpdateSuccess: "プロフィールが正常に更新されました。",
    updateFailed: "更新に失敗しました",
    loginRequired: "ログインが必要です",
    myPageRequiresLogin: "マイページはログインが必要です。",
    
    // Purchase Page
    backToHome: "ホームに戻る",
    purchaseInformation: "購入情報",
    providePurchaseDetails: "購入の詳細を入力してください",
    purchaseItem: "購入商品",
    enterPurchaseItem: "購入した商品を入力してください",
    purchaseLocation: "購入場所",
    enterPurchaseLocation: "購入場所を入力してください",
    purchaseTime: "購入時間",
    processing: "処理中...",
    submit: "送信",
    purchaseComplete: "購入完了！",
    purchaseSuccessDesc: "購入情報が正常に送信されました。",
    purchaseFailed: "購入失敗",
    purchaseLoginRequired: "ログインが必要です",
    purchaseLoginRequiredDesc: "購入するにはログインが必要です。",
  },
  de: {
    // Auth
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
    logout: "Abmelden",
    myAccount: "Mein Konto",
    myPage: "Meine Seite",
    
    // Header
    home: "Startseite",
    products: "Produkte",
    cart: "Warenkorb",
    defenseSolutions: "Verteidigungslösungen",
    
    // Hero Section
    verifiedItarCompliant: "Verifiziert ITAR-konform",
    globalDefenseNexus: "Globales Verteidigungsnetzwerk",
    secureStrategic: "Sicher & Strategisch",
    premierB2gPlatform: "Von Verbündeten vertraute erstklassige B2G-Beschaffungsplattform. Zugang zu modernsten Verteidigungssystemen mit militärischer Sicherheit.",
    exploreSystems: "Systeme erkunden",
    itarCompliant: "ITAR-konform",
    natoStandard: "NATO-Standard",
    cyberSecure: "Cybersicher",
    
    // Footer
    premierB2gDefense: "Erstklassige B2G-Verteidigungsbeschaffungsplattform. Von Verbündeten für sicheren, konformen Zugang zu fortschrittlichen Militärsystemen vertraut.",
    encryption256bit: "256-Bit-Verschlüsselung",
    natoCertified: "NATO-zertifiziert",
    quickLinks: "Schnelllinks",
    requestQuote: "Angebot anfordern",
    compliance: "Compliance",
    secureContact: "Sichere Kontaktaufnahme",
    allInquiriesSecure: "Alle Anfragen werden über sichere Kanäle bearbeitet. Regierungsnachweise erforderlich.",
    allRightsReserved: "© 2024 StratLink Defense Solutions. Alle Rechte vorbehalten.",
    earRegistered: "EAR registriert",
    dfarsCertified: "DFARS-zertifiziert",
    
    // Products
    weeklyBest: "Wochenhits",
    weeklyBestDesc: "Die beliebtesten Verteidigungssysteme dieser Woche",
    defenseSysCatalog: "Verteidigungssystemkatalog",
    defenseSysCatalogDesc: "Durchsuchen Sie unser umfassendes Portfolio an fortschrittlichen Militärsystemen. Alle Produkte erfüllen NATO-Interoperabilitätsstandards.",
    allSystems: "Alle Systeme",
    land: "Land",
    sea: "See",
    air: "Luft",
    sortBy: "Sortieren nach",
    latest: "Neueste",
    priceLowToHigh: "Preis: Niedrig bis Hoch",
    priceHighToLow: "Preis: Hoch bis Niedrig",
    noProductsFound: "Keine Produkte in dieser Kategorie gefunden.",
    
    // Product Detail
    backToCatalog: "Zurück zum Katalog",
    productNotFound: "Produkt nicht gefunden",
    returnToProducts: "Zurück zu Produkten",
    technicalSpecs: "Technische Spezifikationen",
    unitPriceEst: "Stückpreis (geschätzt)",
    addToQuote: "Zum Angebot hinzufügen",
    exportControlNotice: "Dieses Produkt unterliegt Exportkontrollen. Regierungsnachweise und Endnutzerzertifikate für die Beschaffung erforderlich.",
    addedToQuote: "zum Angebotsanfrage hinzugefügt",
    viewCartToSubmit: "Zeigen Sie Ihren Warenkorb an, um die Anfrage zu senden.",
    
    // Cart
    yourQuoteCartEmpty: "Ihr Angebotswarenkorb ist leer",
    browseDefenseCatalog: "Durchsuchen Sie unseren Verteidigungssystemkatalog, um Artikel für Ihre offizielle Angebotsanfrage hinzuzufügen.",
    browseCatalog: "Katalog durchsuchen",
    quoteRequest: "Angebotsanfrage",
    reviewSelectedSystems: "Überprüfen Sie Ihre ausgewählten Systeme, bevor Sie Ihre offizielle Beschaffungsanfrage senden.",
    continueBrowsing: "Weiter durchsuchen",
    product: "Produkt",
    unitPrice: "Stückpreis",
    quantity: "Menge",
    total: "Gesamt",
    options: "Optionen",
    quoteSummary: "Angebotszusammenfassung",
    subtotal: "Zwischensumme",
    finalPricingNote: "*Endgültige Preisgestaltung unterliegt Vertragsverhandlungen",
    estimatedTotal: "Geschätzte Summe",
    requestOfficialQuote: "Offizielles Angebot anfordern",
    secureTransmission: "Sichere Übertragung • Regierungsüberprüfung erforderlich",
    itemOptions: "Artikeloptionen",
    configuration: "Konfiguration",
    notes: "Notizen",
    cancel: "Abbrechen",
    save: "Speichern",
    purchase: "Kaufen",
    quoteRequestSubmitted: "Angebotsanfrage übermittelt",
    procurementSpecialistContact: "Ein Beschaffungsspezialist wird sich innerhalb von 24 Stunden bei Ihnen melden.",
    
    // My Page
    backToHome: "Zurück zur Startseite",
    profile: "Profil",
    purchaseHistory: "Kaufhistorie",
    updateProfile: "Profil aktualisieren",
    updateProfileDesc: "Aktualisieren Sie Ihre Profilinformationen",
    email: "E-Mail",
    emailCannotChange: "E-Mail kann nicht geändert werden",
    phoneNumber: "Telefonnummer",
    enterPhoneNumber: "Geben Sie Ihre Telefonnummer ein",
    address: "Adresse",
    enterAddress: "Geben Sie Ihre Adresse ein",
    updating: "Wird aktualisiert...",
    saveChanges: "Änderungen speichern",
    paymentHistory: "Zahlungshistorie",
    viewPastPurchases: "Frühere Käufe anzeigen",
    noPurchaseHistory: "Noch keine Kaufhistorie",
    profileUpdated: "Profil aktualisiert",
    profileUpdateSuccess: "Ihr Profil wurde erfolgreich aktualisiert.",
    updateFailed: "Aktualisierung fehlgeschlagen",
    loginRequired: "Anmeldung erforderlich",
    myPageRequiresLogin: "Meine Seite erfordert eine Anmeldung.",
    
    // Purchase Page
    backToHome: "Zurück zur Startseite",
    purchaseInformation: "Kaufinformationen",
    providePurchaseDetails: "Bitte geben Sie Ihre Kaufdetails an",
    purchaseItem: "Kaufartikel",
    enterPurchaseItem: "Geben Sie den gekauften Artikel ein",
    purchaseLocation: "Kaufort",
    enterPurchaseLocation: "Geben Sie den Kaufort ein",
    purchaseTime: "Kaufzeit",
    processing: "Wird verarbeitet...",
    submit: "Absenden",
    purchaseComplete: "Kauf abgeschlossen!",
    purchaseSuccessDesc: "Kaufinformationen wurden erfolgreich übermittelt.",
    purchaseFailed: "Kauf fehlgeschlagen",
    purchaseLoginRequired: "Anmeldung erforderlich",
    purchaseLoginRequiredDesc: "Sie müssen angemeldet sein, um einen Kauf zu tätigen.",
  },
  fr: {
    // Auth
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
    logout: "Déconnexion",
    myAccount: "Mon compte",
    myPage: "Ma page",
    
    // Header
    home: "Accueil",
    products: "Produits",
    cart: "Panier",
    defenseSolutions: "Solutions de défense",
    
    // Hero Section
    verifiedItarCompliant: "Conforme ITAR vérifié",
    globalDefenseNexus: "Réseau de défense mondial",
    secureStrategic: "Sécurisé & Stratégique",
    premierB2gPlatform: "Plateforme d'approvisionnement B2G de premier ordre approuvée par les nations alliées. Accédez aux systèmes de défense de pointe avec une sécurité de niveau militaire.",
    exploreSystems: "Explorer les systèmes",
    itarCompliant: "Conforme ITAR",
    natoStandard: "Standard OTAN",
    cyberSecure: "Cybersécurisé",
    
    // Footer
    premierB2gDefense: "Plateforme d'approvisionnement de défense B2G de premier ordre. Approuvée par les nations alliées pour un accès sécurisé et conforme aux systèmes militaires avancés.",
    encryption256bit: "Chiffrement 256 bits",
    natoCertified: "Certifié OTAN",
    quickLinks: "Liens rapides",
    requestQuote: "Demander un devis",
    compliance: "Conformité",
    secureContact: "Contact sécurisé",
    allInquiriesSecure: "Toutes les demandes sont traitées via des canaux sécurisés. Identifiants gouvernementaux requis.",
    allRightsReserved: "© 2024 StratLink Defense Solutions. Tous droits réservés.",
    earRegistered: "Enregistré EAR",
    dfarsCertified: "Certifié DFARS",
    
    // Products
    weeklyBest: "Meilleurs de la semaine",
    weeklyBestDesc: "Systèmes de défense les plus populaires cette semaine",
    defenseSysCatalog: "Catalogue des systèmes de défense",
    defenseSysCatalogDesc: "Parcourez notre portefeuille complet de systèmes militaires avancés. Tous les produits répondent aux normes d'interopérabilité de l'OTAN.",
    allSystems: "Tous les systèmes",
    land: "Terre",
    sea: "Mer",
    air: "Air",
    sortBy: "Trier par",
    latest: "Plus récent",
    priceLowToHigh: "Prix : Bas à Élevé",
    priceHighToLow: "Prix : Élevé à Bas",
    noProductsFound: "Aucun produit trouvé dans cette catégorie.",
    
    // Product Detail
    backToCatalog: "Retour au catalogue",
    productNotFound: "Produit non trouvé",
    returnToProducts: "Retour aux produits",
    technicalSpecs: "Spécifications techniques",
    unitPriceEst: "Prix unitaire (est.)",
    addToQuote: "Ajouter au devis",
    exportControlNotice: "Ce produit est soumis à des contrôles d'exportation. Identifiants gouvernementaux et certificats d'utilisateur final requis pour l'approvisionnement.",
    addedToQuote: "ajouté à la demande de devis",
    viewCartToSubmit: "Consultez votre panier pour soumettre la demande.",
    
    // Cart
    yourQuoteCartEmpty: "Votre panier de devis est vide",
    browseDefenseCatalog: "Parcourez notre catalogue de systèmes de défense pour ajouter des articles à votre demande de devis officielle.",
    browseCatalog: "Parcourir le catalogue",
    quoteRequest: "Demande de devis",
    reviewSelectedSystems: "Examinez vos systèmes sélectionnés avant de soumettre votre demande d'approvisionnement officielle.",
    continueBrowsing: "Continuer à parcourir",
    product: "Produit",
    unitPrice: "Prix unitaire",
    quantity: "Quantité",
    total: "Total",
    options: "Options",
    quoteSummary: "Résumé du devis",
    subtotal: "Sous-total",
    finalPricingNote: "*Tarification finale sujette à négociation contractuelle",
    estimatedTotal: "Total estimé",
    requestOfficialQuote: "Demander un devis officiel",
    secureTransmission: "Transmission sécurisée • Vérification gouvernementale requise",
    itemOptions: "Options d'article",
    configuration: "Configuration",
    notes: "Notes",
    cancel: "Annuler",
    save: "Enregistrer",
    purchase: "Acheter",
    quoteRequestSubmitted: "Demande de devis soumise",
    procurementSpecialistContact: "Un spécialiste de l'approvisionnement vous contactera dans les 24 heures.",
    
    // My Page
    backToHome: "Retour à l'accueil",
    profile: "Profil",
    purchaseHistory: "Historique des achats",
    updateProfile: "Mettre à jour le profil",
    updateProfileDesc: "Mettez à jour vos informations de profil",
    email: "Email",
    emailCannotChange: "L'email ne peut pas être modifié",
    phoneNumber: "Numéro de téléphone",
    enterPhoneNumber: "Entrez votre numéro de téléphone",
    address: "Adresse",
    enterAddress: "Entrez votre adresse",
    updating: "Mise à jour...",
    saveChanges: "Enregistrer les modifications",
    paymentHistory: "Historique des paiements",
    viewPastPurchases: "Voir vos achats passés",
    noPurchaseHistory: "Pas encore d'historique d'achat",
    profileUpdated: "Profil mis à jour",
    profileUpdateSuccess: "Votre profil a été mis à jour avec succès.",
    updateFailed: "Échec de la mise à jour",
    loginRequired: "Connexion requise",
    myPageRequiresLogin: "Ma page nécessite une connexion.",
    
    // Purchase Page
    backToHome: "Retour à l'accueil",
    purchaseInformation: "Informations d'achat",
    providePurchaseDetails: "Veuillez fournir vos détails d'achat",
    purchaseItem: "Article acheté",
    enterPurchaseItem: "Entrez l'article que vous avez acheté",
    purchaseLocation: "Lieu d'achat",
    enterPurchaseLocation: "Entrez le lieu d'achat",
    purchaseTime: "Heure d'achat",
    processing: "Traitement...",
    submit: "Soumettre",
    purchaseComplete: "Achat terminé!",
    purchaseSuccessDesc: "Les informations d'achat ont été soumises avec succès.",
    purchaseFailed: "Échec de l'achat",
    purchaseLoginRequired: "Connexion requise",
    purchaseLoginRequiredDesc: "Vous devez vous connecter pour effectuer un achat.",
  },
  es: {
    // Auth
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
    logout: "Cerrar sesión",
    myAccount: "Mi cuenta",
    myPage: "Mi página",
    
    // Header
    home: "Inicio",
    products: "Productos",
    cart: "Carrito",
    defenseSolutions: "Soluciones de defensa",
    
    // Hero Section
    verifiedItarCompliant: "Verificado compatible con ITAR",
    globalDefenseNexus: "Red de defensa global",
    secureStrategic: "Seguro y Estratégico",
    premierB2gPlatform: "Plataforma de adquisiciones B2G de primer nivel confiable para naciones aliadas. Acceda a sistemas de defensa de vanguardia con seguridad de grado militar.",
    exploreSystems: "Explorar sistemas",
    itarCompliant: "Compatible con ITAR",
    natoStandard: "Estándar OTAN",
    cyberSecure: "Ciberseguro",
    
    // Footer
    premierB2gDefense: "Plataforma de adquisiciones de defensa B2G de primer nivel. Confiable para que las naciones aliadas accedan de manera segura y conforme a sistemas militares avanzados.",
    encryption256bit: "Cifrado de 256 bits",
    natoCertified: "Certificado OTAN",
    quickLinks: "Enlaces rápidos",
    requestQuote: "Solicitar cotización",
    compliance: "Cumplimiento",
    secureContact: "Contacto seguro",
    allInquiriesSecure: "Todas las consultas se procesan a través de canales seguros. Se requieren credenciales gubernamentales.",
    allRightsReserved: "© 2024 StratLink Defense Solutions. Todos los derechos reservados.",
    earRegistered: "Registrado EAR",
    dfarsCertified: "Certificado DFARS",
    
    // Products
    weeklyBest: "Mejores de la semana",
    weeklyBestDesc: "Sistemas de defensa más populares esta semana",
    defenseSysCatalog: "Catálogo de sistemas de defensa",
    defenseSysCatalogDesc: "Explore nuestro completo portafolio de sistemas militares avanzados. Todos los productos cumplen con los estándares de interoperabilidad de la OTAN.",
    allSystems: "Todos los sistemas",
    land: "Tierra",
    sea: "Mar",
    air: "Aire",
    sortBy: "Ordenar por",
    latest: "Más reciente",
    priceLowToHigh: "Precio: Bajo a Alto",
    priceHighToLow: "Precio: Alto a Bajo",
    noProductsFound: "No se encontraron productos en esta categoría.",
    
    // Product Detail
    backToCatalog: "Volver al catálogo",
    productNotFound: "Producto no encontrado",
    returnToProducts: "Volver a productos",
    technicalSpecs: "Especificaciones técnicas",
    unitPriceEst: "Precio unitario (est.)",
    addToQuote: "Agregar a cotización",
    exportControlNotice: "Este producto está sujeto a controles de exportación. Se requieren credenciales gubernamentales y certificados de usuario final para la adquisición.",
    addedToQuote: "agregado a la solicitud de cotización",
    viewCartToSubmit: "Vea su carrito para enviar la solicitud.",
    
    // Cart
    yourQuoteCartEmpty: "Su carrito de cotización está vacío",
    browseDefenseCatalog: "Explore nuestro catálogo de sistemas de defensa para agregar artículos a su solicitud de cotización oficial.",
    browseCatalog: "Explorar catálogo",
    quoteRequest: "Solicitud de cotización",
    reviewSelectedSystems: "Revise sus sistemas seleccionados antes de enviar su solicitud de adquisición oficial.",
    continueBrowsing: "Continuar explorando",
    product: "Producto",
    unitPrice: "Precio unitario",
    quantity: "Cantidad",
    total: "Total",
    options: "Opciones",
    quoteSummary: "Resumen de cotización",
    subtotal: "Subtotal",
    finalPricingNote: "*El precio final está sujeto a negociación contractual",
    estimatedTotal: "Total estimado",
    requestOfficialQuote: "Solicitar cotización oficial",
    secureTransmission: "Transmisión segura • Verificación gubernamental requerida",
    itemOptions: "Opciones de artículo",
    configuration: "Configuración",
    notes: "Notas",
    cancel: "Cancelar",
    save: "Guardar",
    purchase: "Comprar",
    quoteRequestSubmitted: "Solicitud de cotización enviada",
    procurementSpecialistContact: "Un especialista en adquisiciones se pondrá en contacto con usted en 24 horas.",
    
    // My Page
    backToHome: "Volver al inicio",
    profile: "Perfil",
    purchaseHistory: "Historial de compras",
    updateProfile: "Actualizar perfil",
    updateProfileDesc: "Actualice su información de perfil",
    email: "Correo electrónico",
    emailCannotChange: "El correo electrónico no se puede cambiar",
    phoneNumber: "Número de teléfono",
    enterPhoneNumber: "Ingrese su número de teléfono",
    address: "Dirección",
    enterAddress: "Ingrese su dirección",
    updating: "Actualizando...",
    saveChanges: "Guardar cambios",
    paymentHistory: "Historial de pagos",
    viewPastPurchases: "Ver sus compras anteriores",
    noPurchaseHistory: "Aún no hay historial de compras",
    profileUpdated: "Perfil actualizado",
    profileUpdateSuccess: "Su perfil se ha actualizado correctamente.",
    updateFailed: "Actualización fallida",
    loginRequired: "Inicio de sesión requerido",
    myPageRequiresLogin: "Mi página requiere inicio de sesión.",
    
    // Purchase Page
    backToHome: "Volver al inicio",
    purchaseInformation: "Información de compra",
    providePurchaseDetails: "Por favor proporcione los detalles de su compra",
    purchaseItem: "Artículo comprado",
    enterPurchaseItem: "Ingrese el artículo que compró",
    purchaseLocation: "Lugar de compra",
    enterPurchaseLocation: "Ingrese el lugar de compra",
    purchaseTime: "Hora de compra",
    processing: "Procesando...",
    submit: "Enviar",
    purchaseComplete: "¡Compra completada!",
    purchaseSuccessDesc: "La información de compra se ha enviado correctamente.",
    purchaseFailed: "Compra fallida",
    purchaseLoginRequired: "Inicio de sesión requerido",
    purchaseLoginRequiredDesc: "Debe iniciar sesión para realizar una compra.",
  },
  ru: {
    // Auth
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
    logout: "Выйти",
    myAccount: "Моя учетная запись",
    myPage: "Моя страница",
    
    // Header
    home: "Главная",
    products: "Продукты",
    cart: "Корзина",
    defenseSolutions: "Оборонные решения",
    
    // Hero Section
    verifiedItarCompliant: "Проверенная совместимость с ITAR",
    globalDefenseNexus: "Глобальная оборонная сеть",
    secureStrategic: "Безопасно и Стратегически",
    premierB2gPlatform: "Ведущая платформа закупок B2G, которой доверяют союзные страны. Получите доступ к передовым оборонным системам с военной безопасностью.",
    exploreSystems: "Исследовать системы",
    itarCompliant: "Соответствует ITAR",
    natoStandard: "Стандарт НАТО",
    cyberSecure: "Киберзащищенный",
    
    // Footer
    premierB2gDefense: "Ведущая платформа закупок в области обороны B2G. Доверенная союзными странами для безопасного и соответствующего доступа к передовым военным системам.",
    encryption256bit: "256-битное шифрование",
    natoCertified: "Сертифицировано НАТО",
    quickLinks: "Быстрые ссылки",
    requestQuote: "Запросить коммерческое предложение",
    compliance: "Соответствие",
    secureContact: "Безопасный контакт",
    allInquiriesSecure: "Все запросы обрабатываются по защищенным каналам. Требуются правительственные учетные данные.",
    allRightsReserved: "© 2024 StratLink Defense Solutions. Все права защищены.",
    earRegistered: "Зарегистрировано EAR",
    dfarsCertified: "Сертифицировано DFARS",
    
    // Products
    weeklyBest: "Лучшее за неделю",
    weeklyBestDesc: "Самые популярные оборонные системы на этой неделе",
    defenseSysCatalog: "Каталог оборонных систем",
    defenseSysCatalogDesc: "Просмотрите наш полный портфель передовых военных систем. Все продукты соответствуют стандартам взаимодействия НАТО.",
    allSystems: "Все системы",
    land: "Земля",
    sea: "Море",
    air: "Воздух",
    sortBy: "Сортировать по",
    latest: "Новейшие",
    priceLowToHigh: "Цена: От низкой к высокой",
    priceHighToLow: "Цена: От высокой к низкой",
    noProductsFound: "Продукты в этой категории не найдены.",
    
    // Product Detail
    backToCatalog: "Вернуться к каталогу",
    productNotFound: "Продукт не найден",
    returnToProducts: "Вернуться к продуктам",
    technicalSpecs: "Технические характеристики",
    unitPriceEst: "Цена за единицу (приблиз.)",
    addToQuote: "Добавить в предложение",
    exportControlNotice: "Этот продукт подлежит экспортному контролю. Для закупки требуются правительственные учетные данные и сертификаты конечного пользователя.",
    addedToQuote: "добавлено в запрос предложения",
    viewCartToSubmit: "Просмотрите свою корзину, чтобы отправить запрос.",
    
    // Cart
    yourQuoteCartEmpty: "Ваша корзина предложений пуста",
    browseDefenseCatalog: "Просмотрите наш каталог оборонных систем, чтобы добавить элементы в ваш официальный запрос предложения.",
    browseCatalog: "Просмотреть каталог",
    quoteRequest: "Запрос предложения",
    reviewSelectedSystems: "Просмотрите выбранные системы перед отправкой официального запроса на закупку.",
    continueBrowsing: "Продолжить просмотр",
    product: "Продукт",
    unitPrice: "Цена за единицу",
    quantity: "Количество",
    total: "Итого",
    options: "Опции",
    quoteSummary: "Сводка предложения",
    subtotal: "Промежуточный итог",
    finalPricingNote: "*Окончательная цена зависит от договорных переговоров",
    estimatedTotal: "Приблизительный итог",
    requestOfficialQuote: "Запросить официальное предложение",
    secureTransmission: "Безопасная передача • Требуется правительственная проверка",
    itemOptions: "Параметры элемента",
    configuration: "Конфигурация",
    notes: "Заметки",
    cancel: "Отмена",
    save: "Сохранить",
    purchase: "Купить",
    quoteRequestSubmitted: "Запрос предложения отправлен",
    procurementSpecialistContact: "Специалист по закупкам свяжется с вами в течение 24 часов.",
    
    // My Page
    backToHome: "Вернуться на главную",
    profile: "Профиль",
    purchaseHistory: "История покупок",
    updateProfile: "Обновить профиль",
    updateProfileDesc: "Обновите информацию вашего профиля",
    email: "Электронная почта",
    emailCannotChange: "Электронную почту нельзя изменить",
    phoneNumber: "Номер телефона",
    enterPhoneNumber: "Введите свой номер телефона",
    address: "Адрес",
    enterAddress: "Введите свой адрес",
    updating: "Обновление...",
    saveChanges: "Сохранить изменения",
    paymentHistory: "История платежей",
    viewPastPurchases: "Просмотр прошлых покупок",
    noPurchaseHistory: "История покупок пока отсутствует",
    profileUpdated: "Профиль обновлен",
    profileUpdateSuccess: "Ваш профиль был успешно обновлен.",
    updateFailed: "Обновление не удалось",
    loginRequired: "Требуется вход",
    myPageRequiresLogin: "Моя страница требует входа.",
    
    // Purchase Page
    backToHome: "Вернуться на главную",
    purchaseInformation: "Информация о покупке",
    providePurchaseDetails: "Пожалуйста, предоставьте детали вашей покупки",
    purchaseItem: "Купленный товар",
    enterPurchaseItem: "Введите купленный товар",
    purchaseLocation: "Место покупки",
    enterPurchaseLocation: "Введите место покупки",
    purchaseTime: "Время покупки",
    processing: "Обработка...",
    submit: "Отправить",
    purchaseComplete: "Покупка завершена!",
    purchaseSuccessDesc: "Информация о покупке успешно отправлена.",
    purchaseFailed: "Покупка не удалась",
    purchaseLoginRequired: "Требуется вход",
    purchaseLoginRequiredDesc: "Для совершения покупки необходимо войти в систему.",
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
      const savedLanguage = localStorage.getItem("language") as Language;
      // Only load chineseVariant if the saved language is Chinese
      if (savedLanguage === "zh-CN" || savedLanguage === "zh-TW") {
        const saved = localStorage.getItem("chineseVariant") as ChineseVariant | null;
        return saved || null;
      }
      // Clear chineseVariant if language is not Chinese
      localStorage.removeItem("chineseVariant");
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
      // Clear chineseVariant from localStorage when switching to non-Chinese language
      try {
        localStorage.removeItem("chineseVariant");
      } catch {}
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

  const getCurrency = useCallback((): string => {
    return currencyCodes[language];
  }, [language]);

  const formatPrice = useCallback((priceUSD: number): string => {
    const rate = exchangeRates[language];
    const convertedPrice = priceUSD * rate;
    const currency = currencyCodes[language];
    
    // Determine locale based on language
    const localeMap: Record<Language, string> = {
      "en": "en-US",
      "ko": "ko-KR",
      "zh-CN": "zh-CN",
      "zh-TW": "zh-TW",
      "ja": "ja-JP",
      "de": "de-DE",
      "fr": "fr-FR",
      "es": "es-ES",
      "ru": "ru-RU",
    };

    return new Intl.NumberFormat(localeMap[language], {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(convertedPrice);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        chineseVariant,
        setLanguage,
        setChineseVariant,
        t,
        formatPrice,
        getCurrency,
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

