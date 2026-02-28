# GitHub 푸시 방법

터미널에서 Git이 제대로 실행되지 않는 경우, 다음 방법 중 하나를 사용하세요.

## 방법 1: 배치 파일 사용 (추천)

1. `push-to-github.bat` 파일을 더블클릭하여 실행합니다.

## 방법 2: 수동으로 명령어 실행

PowerShell이나 Git Bash를 열고 다음 명령어를 순서대로 실행하세요:

```bash
# 1. 프로젝트 디렉토리로 이동
cd "C:\Users\tinti\Desktop\gunproject sujeng\gunproject"

# 2. Git 사용자 설정
git config --global user.name "tintincreative27-cyber"
git config --global user.email "tintincreative27@gmail.com"

# 3. Git 저장소 초기화 (처음 한 번만)
git init

# 4. 모든 파일 추가
git add .

# 5. 커밋
git commit -m "Initial commit - Gun Project"

# 6. 원격 저장소 추가
git remote add origin https://github.com/tintincreative27-cyber/gunwoo1219.git
# (이미 추가되어 있다면 다음 명령어 사용)
# git remote set-url origin https://github.com/tintincreative27-cyber/gunwoo1219.git

# 7. 브랜치를 main으로 설정
git branch -M main

# 8. 푸시
git push -u origin main
```

## 인증 문제가 발생하는 경우

GitHub에서 Personal Access Token을 생성하고 사용해야 할 수 있습니다:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. 권한 선택 (repo 권한 필요)
4. 토큰 생성 후 복사
5. 푸시할 때 비밀번호 대신 토큰 사용

또는 GitHub Desktop 같은 GUI 도구를 사용할 수도 있습니다.

