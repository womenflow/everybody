---
name: deploy
description: 지금까지 수정한 내용을 커밋하고 main에 push → Netlify 자동 배포. 예약 글 날짜가 지났을 때 다시 올릴 때도 사용
argument-hint: "[커밋 메시지 (선택)]"
allowed-tools: Read, Bash(git:*), Bash(npm run build:*), Bash(cd:*), Bash(ls:*), Bash(grep:*)
---

# 배포 (커밋 + push)

커밋 메시지(선택): **$ARGUMENTS**

## 현재 상태
- 브랜치: !`git branch --show-current`
- 변경 파일 (부산물 제외):
```
!`git status --short -- site/src site/public netlify.toml .claude`
```
- 미푸시 커밋:
```
!`git log --oneline @{upstream}..HEAD 2>/dev/null || echo "(없음)"`
```

## 절차

1. 브랜치가 `main` 이 아니면 **멈추고** 어느 브랜치인지 보고한다. Netlify는 main만 배포한다.
2. 변경 파일도 없고 미푸시 커밋도 없으면:
   - 예약 글(`draft: false` + 미래 `pubDate`)이 날짜가 지났는지 확인한다. 지났으면 빈 커밋 대신 **Netlify가 다시 빌드하도록** 해야 하는데, 이 저장소에는 빌드 훅이 없으므로 "Netlify 대시보드 → Deploys → Trigger deploy 를 눌러주세요" 라고 안내하고 끝낸다.
   - 그것도 아니면 "배포할 것 없음" 보고 후 끝.
3. `cd site && npm run build` 로 빌드 검증. 실패하면 멈추고 원인만 보고.
4. `git checkout -- site/dist site/node_modules/.astro 2>/dev/null` 로 부산물 되돌리기.
5. 변경 파일이 있으면 `git add site/src site/public netlify.toml .claude` 후 커밋.
   메시지는 인자가 있으면 그것을, 없으면 변경 내용을 요약한 영어 한 줄 (예: "Update post: ...", "Add draft: ...").
6. `git push -u origin main`. 실패 시 2초, 4초, 8초 간격 최대 3회 재시도.

## 절대 하지 않는 것

- force push, rebase, 브랜치 생성/전환
- `site/dist`, `site/node_modules` 변경 커밋
- 사용자가 만들지 않은 파일을 임의로 삭제

## 보고 형식

- push한 커밋 해시 + 메시지 한 줄
- "Netlify 빌드 1~2분 후 https://everybody-moves-fit.netlify.app 반영"
- **💰 비용**: push 1회 = Netlify 빌드 1회 (무료 플랜 월 300분 중 약 1~2분). 0원.
