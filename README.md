# StratLink Defense Solutions

방위산업 솔루션 플랫폼

## 🚀 주요 기능

- 🛒 **제품 관리**
  - 방위산업 제품 카탈로그
  - 장바구니 기능
  - 구매 처리

- 🌐 **다국어 지원**
  - 영어, 한국어, 중국어(간체/번체), 일본어, 독일어, 프랑스어, 스페인어, 러시아어

## 📋 사전 요구사항

- Node.js (v16 이상)
- npm 또는 yarn

## 🛠️ 설치 및 설정

### 1. 저장소 클론

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:8080` 접속

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Header.tsx      # 헤더
│   └── ui/             # shadcn-ui 컴포넌트
├── context/            # React Context
│   ├── CartContext.tsx # 장바구니 관리
│   └── LanguageContext.tsx # 다국어 관리
├── pages/              # 페이지 컴포넌트
│   ├── Index.tsx       # 홈페이지
│   ├── Products.tsx    # 제품 목록
│   └── Purchase.tsx    # 구매 페이지
└── data/               # 데이터
    └── products.ts     # 제품 데이터
```

## 🛒 구매 기능

1. 제품 카탈로그에서 제품 선택
2. 장바구니에 추가
3. 구매 페이지에서 구매 정보 입력
4. 구매 완료

## 🎨 기술 스택

- **Frontend**
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - shadcn-ui
  
- **State Management**
  - React Context API
  
- **Routing**
  - React Router DOM

## 🚀 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
