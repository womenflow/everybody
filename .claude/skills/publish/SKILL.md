---
name: publish
description: 초안 글을 발행. draft를 false로 바꾸고 날짜를 지금으로 맞춘 뒤 빌드 확인, 커밋, push (Netlify 자동 배포). 예 - /publish my-post-slug
argument-hint: <slug> [YYYY-MM-DD 예약일]
allowed-tools: Read, Edit, Bash(git:*), Bash(npm run build:*), Bash(cd:*), Bash(date:*), Bash(grep:*), Bash(ls:*)
---

# 글 발행

slug: **$0**
예약일(선택): **$1**

## 현재 상태
```
!`ls site/src/content/blog/`
```
- 지금 시각 (UTC): !`date -u +%Y-%m-%dT%H:%M:%SZ`
- 미푸시 커밋: !`git log --oneline @{upstream}..HEAD 2>/dev/null | wc -l | tr -d ' '`개

## 절차 (순서대로, 하나라도 실패하면 거기서 멈추고 보고)

1. `site/src/content/blog/$0.md` 존재 확인. 없으면 멈춘다.
2. frontmatter 수정:
   - `draft: true` → `draft: false`
   - `pubDate`: 예약일이 없으면 **지금 UTC 시각**으로. 예약일이 있으면 `<YYYY-MM-DD>T00:00:00Z` (한국 시간 오전 9시). 
   - 주의: 사이트는 빌드 시점에 `pubDate <= now` 인 글만 보여준다. 예약일이 미래면 **그 날짜 이후에 `/deploy` 를 한 번 더 실행해야** 실제로 보인다. 자동으로 올라가지 않는다. 이 사실을 보고에 반드시 적는다.
3. 이미지 확인: `image:` 와 본문의 `/images/...` 경로가 `site/public/images/` 에 실제로 있는지 확인. 없으면 **발행을 멈추고** 어떤 파일이 없는지 보고한다 (깨진 이미지로 발행하지 않는다).
4. 빌드 검증: `cd site && npm run build`. 에러가 나면 멈추고 에러 핵심 줄만 보고한다.
5. 빌드 부산물 되돌리기: `git checkout -- site/dist site/node_modules/.astro 2>/dev/null` (부산물은 커밋하지 않는다. Netlify가 직접 빌드함).
6. 커밋: `git add site/src/content/blog/$0.md site/public/images` 후
   `git commit -m "Publish: <글 제목>"`
7. push: `git push -u origin main`. 실패하면 2초, 4초, 8초 간격으로 최대 3번 더 시도.
8. push가 끝나면 Netlify가 자동으로 빌드한다 (보통 1~2분). 사이트 URL: https://everybody-moves-fit.netlify.app/posts/$0/

## 절대 하지 않는 것

- 다른 글 수정
- force push, 브랜치 변경
- 이미지 없는 상태로 발행

## 보고 형식

- 발행한 글 제목 + URL
- 예약 발행이면 "YYYY-MM-DD 이후 `/deploy` 필요" 명시
- **💰 비용**: push 1회 = Netlify 빌드 1회 (무료 플랜 월 300분 중 약 1~2분 사용). 돈 0원.
