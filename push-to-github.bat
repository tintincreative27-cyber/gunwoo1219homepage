@echo off
cd /d "%~dp0"

REM Git 사용자 설정
git config --global user.name "tintincreative27-cyber"
git config --global user.email "tintincreative27@gmail.com"

REM Git 초기화 (이미 되어있으면 무시됨)
git init

REM 모든 파일 추가
git add .

REM 커밋
git commit -m "Initial commit - Gun Project"

REM 원격 저장소 추가 (이미 있으면 업데이트)
git remote remove origin 2>nul
git remote add origin https://github.com/tintincreative27-cyber/gunwoo1219.git

REM 브랜치를 main으로 설정
git branch -M main

REM 푸시
git push -u origin main

echo.
echo Git push completed!
echo If you encounter authentication issues, you may need to use a personal access token.
pause

