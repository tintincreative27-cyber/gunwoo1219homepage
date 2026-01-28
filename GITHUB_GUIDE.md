# GitHub 푸시 가이드

## 방법 1: 배치 파일 사용 (가장 쉬움) ✅

1. **Windows 탐색기**에서 프로젝트 폴더로 이동
2. `push-to-github.bat` 파일을 **더블클릭**
3. 커밋 메시지 입력 (또는 Enter로 기본값 사용)
4. GitHub 인증 창이 나오면 로그인

---

## 방법 2: 터미널에서 직접 실행

### 1단계: 프로젝트 폴더로 이동
```bash
cd "C:\Users\tinti\OneDrive\바탕 화면\gunwoo1219homepage-main"
```

### 2단계: Git 초기화 및 설정
```bash
git init
git config user.name "tintincreative27-cyber"
git config user.email "tintincreative27@gmail.com"
git branch -M main
```

### 3단계: 원격 저장소 추가
```bash
git remote add origin https://github.com/tintincreative27-cyber/gunwoo1219homepage.git
```

### 4단계: 파일 추가 및 커밋
```bash
git add .
git commit -m "Initial commit"
```

### 5단계: GitHub에 푸시
```bash
git push -u origin main
```

---

## 방법 3: GitHub Desktop 사용

1. **GitHub Desktop** 다운로드: https://desktop.github.com/
2. 설치 후 GitHub 계정으로 로그인
3. `File` → `Add local repository`
4. 프로젝트 폴더 선택
5. `Publish repository` 클릭

---

## 인증 문제 해결

### Personal Access Token 생성 방법:

1. GitHub 웹사이트 접속 → 오른쪽 상단 프로필 클릭
2. **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token** → **Generate new token (classic)**
4. 토큰 이름 입력 (예: "gunwoo-homepage")
5. 다음 권한 선택:
   - ✅ `repo` (모든 하위 항목 체크)
   - ✅ `workflow`
6. **Generate token** 클릭
7. 생성된 토큰 복사 (⚠️ 한 번만 표시됨!)

### 토큰 사용:
```bash
# HTTPS URL 대신 토큰 사용
git remote set-url origin https://YOUR_TOKEN@github.com/tintincreative27-cyber/gunwoo1219homepage.git

# 또는 푸시할 때 사용자명/비밀번호 입력 시:
# Username: tintincreative27-cyber
# Password: YOUR_TOKEN (복사한 토큰 붙여넣기)
```

---

## 이후 업데이트 시

```bash
git add .
git commit -m "업데이트 내용 설명"
git push
```

---

## 현재 상태 확인

```bash
git status          # 변경된 파일 확인
git log             # 커밋 히스토리 확인
git remote -v       # 원격 저장소 확인
```

---

## 주의사항

⚠️ **민감한 정보 확인**
- API 키, 비밀번호 등이 코드에 포함되어 있지 않은지 확인
- `.env` 파일은 `.gitignore`에 추가되어 있는지 확인

✅ **이미 .gitignore에 포함된 것들:**
- `node_modules/`
- `.env`
- `dist/`

---

## GitHub 저장소 정보

- **Repository URL**: https://github.com/tintincreative27-cyber/gunwoo1219homepage
- **Username**: tintincreative27-cyber
- **Email**: tintincreative27@gmail.com

