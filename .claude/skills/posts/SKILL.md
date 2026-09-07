---
name: posts
description: 블로그 글 목록 보기 (발행/초안/예약 상태, 날짜, 제목, 쇼핑 링크 유무)
allowed-tools: Bash(grep:*), Bash(ls:*), Bash(date:*), Read
---

# 글 목록

`site/src/content/blog/*.md` 전체를 읽고 상태별로 정리한다. 수정 금지.

## 자동 수집

```
!`for f in site/src/content/blog/*.md; do echo "== $(basename "$f" .md)"; sed -n '/^---$/,/^---$/p' "$f" | grep -E '^(title|pubDate|draft|image|shopUrl|tags):'; done`
```
- 지금 시각 (UTC): !`date -u +%Y-%m-%dT%H:%M:%SZ`

## 상태 판정 규칙

- `draft: true` → **초안** (사이트에 안 보임)
- `draft: false` 이고 `pubDate` 가 미래 → **예약** (지금 시각 이후에 다시 빌드/배포해야 보임)
- `draft: false` 이고 `pubDate` 가 과거 → **발행됨** (단, 마지막 push 이후에 바뀐 글이면 아직 반영 전)

## 보고 형식

상태별로 묶어서, 한 글당 한 줄:
`slug — 제목 (날짜) [이미지 O/X] [쇼핑링크 O/X]`

마지막 줄에 **💰 비용: 0원 (읽기 전용)** 을 붙인다.
