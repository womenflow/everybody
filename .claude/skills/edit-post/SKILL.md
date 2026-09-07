---
name: edit-post
description: 기존 글 수정. 첫 인자는 slug, 나머지는 수정 지시. 예 - /edit-post body-positivity-fitness 제목을 더 짧게
argument-hint: <slug> <수정 내용>
allowed-tools: Read, Edit, Glob, Bash(ls:*), Bash(grep:*), Bash(git:*)
---

# 글 수정

slug: **$0**
수정 지시: **$ARGUMENTS**

## 현재 글 목록
```
!`ls site/src/content/blog/`
```

## 절차

1. `site/src/content/blog/$0.md` 가 없으면 위 목록에서 가장 비슷한 것을 제안하고 멈춘다. 추측으로 다른 파일을 고치지 않는다.
2. 파일 전체를 읽은 뒤, 지시된 부분만 최소한으로 고친다. 지시에 없는 문장은 건드리지 않는다.
3. frontmatter를 고칠 때는 `site/src/content.config.ts` 스키마를 지킨다 (`pubDate` 는 ISO 8601, `tags` 는 배열).
4. `draft` 값과 `pubDate` 는 명시적으로 요청받지 않는 한 바꾸지 않는다 (발행 여부는 `/publish`, `/unpublish` 담당).
5. 수정 후 `git diff --stat site/src/content/blog/$0.md` 를 보여준다. **커밋/푸시는 하지 않는다.**

## 보고 형식

- 무엇을 바꿨는지 2~3줄
- 사이트 반영은 `/deploy` 실행 후
- **💰 비용**: 0원 (로컬 파일 수정만)
