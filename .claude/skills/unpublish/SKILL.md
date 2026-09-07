---
name: unpublish
description: 발행된 글을 내리기 (draft를 true로 바꾸고 push → Netlify 재빌드로 사이트에서 사라짐). 예 - /unpublish my-post-slug
argument-hint: <slug>
allowed-tools: Read, Edit, Bash(git:*), Bash(npm run build:*), Bash(cd:*), Bash(grep:*), Bash(ls:*)
---

# 글 내리기

slug: **$0**

```
!`ls site/src/content/blog/`
```

## 절차

1. `site/src/content/blog/$0.md` 존재 확인. 없으면 멈춘다.
2. 이미 `draft: true` 면 "이미 내려가 있음" 이라고만 보고하고 끝낸다.
3. `draft: false` → `draft: true` 로만 바꾼다. 파일은 **삭제하지 않는다** (나중에 `/publish` 로 되살릴 수 있게). `pubDate` 도 건드리지 않는다.
4. `cd site && npm run build` 로 빌드 확인 후 `git checkout -- site/dist site/node_modules/.astro 2>/dev/null`.
5. `git add site/src/content/blog/$0.md && git commit -m "Unpublish: <글 제목>"` → `git push -u origin main` (실패 시 2/4/8초 간격 최대 3회 재시도).

## 보고 형식

- 내린 글 제목. Netlify 재빌드 후 1~2분 뒤 사이트에서 사라짐
- 되살리려면 `/publish $0`
- **💰 비용**: push 1회 = Netlify 빌드 약 1~2분 (무료 범위). 0원.
