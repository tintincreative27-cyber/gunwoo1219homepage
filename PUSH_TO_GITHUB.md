# 🚀 GitHub에 코드 업로드하기

## ⚠️ 중요: 먼저 환경 변수 설정

보안을 위해 Supabase API 키를 환경 변수로 이동해야 합니다.

### 1단계: `.env` 파일 생성

프로젝트 루트 폴더에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_SUPABASE_URL=https://wwprsxslvwmzqjoctsom.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cHJzeHNsdndtenFqb2N0c29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMDQyNjAsImV4cCI6MjA4MzU4MDI2MH0.-pIpQ02rBwxYdrAs-EU0OKg5N9jl9sAFJKqZZ3HMnow
```

### 2단계: `.env.example` 파일 생성

다른 개발자를 위해 예시 파일을 만드세요:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3단계: `.gitignore` 확인

`.env` 파일이 이미 `.gitignore`에 포함되어 있는지 확인하세요. (✅ 이미 포함되어 있습니다!)

---

## 📤 GitHub에 푸시하기

### 방법 1: 배치 파일 사용 (가장 쉬움!) ⭐

1. **Windows 탐색기**를 열고 프로젝트 폴더로 이동:
   ```
   C:\Users\tinti\OneDrive\바탕 화면\gunwoo1219homepage-main
   ```

2. **`push-to-github.bat`** 파일을 찾아서 **더블클릭**

3. 커밋 메시지 입력 (또는 Enter로 기본값 사용)

4. GitHub 인증 창이 나타나면 로그인

5. 완료! 🎉

### 방법 2: Git Bash 또는 CMD에서 실행

```bash
# Git Bash 사용
cd /c/Users/tinti/OneDrive/바탕\ 화면/gunwoo1219homepage-main
./push-to-github.bat

# 또는 CMD 사용
cd C:\Users\tinti\OneDrive\바탕 화면\gunwoo1219homepage-main
push-to-github.bat
```

---

## 🔐 인증 문제가 발생하면?

### Personal Access Token 생성:

1. GitHub 웹사이트: https://github.com/settings/tokens
2. **Generate new token** → **Generate new token (classic)**
3. 토큰 이름: `gunwoo-homepage`
4. 권한 선택:
   - ✅ `repo` (모든 항목)
   - ✅ `workflow`
5. **Generate token** 클릭
6. 토큰 복사 (⚠️ 한 번만 표시됩니다!)

### 토큰 사용:

푸시할 때 인증을 요청하면:
- **Username**: `tintincreative27-cyber`
- **Password**: (복사한 토큰 붙여넣기)

---

## 📝 이후 업데이트 방법

코드를 수정한 후:

```bash
git add .
git commit -m "업데이트 내용 설명"
git push
```

또는 **`push-to-github.bat`** 파일을 다시 더블클릭하면 됩니다!

---

## ✅ 확인사항

푸시 전에 확인하세요:

- [ ] `.env` 파일이 생성되었나요?
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있나요? (자동으로 제외됩니다)
- [ ] `src/lib/supabase.ts`가 환경 변수를 사용하도록 업데이트되었나요?
- [ ] 개발 서버가 정상적으로 작동하나요?

---

## 🌐 저장소 정보

- **GitHub URL**: https://github.com/tintincreative27-cyber/gunwoo1219homepage
- **Username**: tintincreative27-cyber
- **Email**: tintincreative27@gmail.com

---

## 🔥 바로 시작하기

**가장 간단한 방법**:
```
1. .env 파일 생성 (위의 내용 복사)
2. push-to-github.bat 더블클릭
3. 완료!
```

