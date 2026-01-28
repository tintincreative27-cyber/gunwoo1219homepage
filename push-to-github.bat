@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ===================================
echo Git 초기화 및 GitHub 푸시
echo ===================================
echo.

REM Git 사용자 설정
git config user.name "tintincreative27-cyber"
git config user.email "tintincreative27@gmail.com"

REM Git 초기화
if not exist .git (
    echo Git 저장소 초기화 중...
    git init
    echo.
)

REM 모든 파일 추가
echo 파일 추가 중...
git add .
echo.

REM 커밋
echo 커밋 생성 중...
git commit -m "feat: Supabase 이메일 로그인 구현 및 초기 설정"
echo.

REM 원격 저장소 설정
echo 원격 저장소 설정 중...
git remote remove origin 2>nul
git remote add origin https://github.com/tintincreative27-cyber/gunwoo1219homepage.git
echo.

REM 브랜치를 main으로 설정
echo 브랜치를 main으로 변경 중...
git branch -M main
echo.

REM 푸시
echo GitHub에 푸시 중...
git push -u origin main --force
echo.

if %ERRORLEVEL% EQU 0 (
    echo ===================================
    echo ✅ GitHub 푸시 완료!
    echo ===================================
    echo.
    echo 저장소: https://github.com/tintincreative27-cyber/gunwoo1219homepage
    echo.
) else (
    echo ===================================
    echo ❌ 푸시 실패
    echo ===================================
    echo.
    echo Personal Access Token이 필요할 수 있습니다.
    echo https://github.com/settings/tokens
    echo.
)

pause
