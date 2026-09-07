---
name: status
description: 블로그 현재 상태 한눈에 보기 (git 변경사항, 미푸시 커밋, 초안/예약 글, 마지막 배포 커밋)
allowed-tools: Bash(git:*), Bash(grep:*), Bash(ls:*), Bash(date:*)
---

# 블로그 상태 점검

폰에서 접속했을 때 가장 먼저 실행하는 명령어. 아무것도 수정하지 말고 **보고만** 한다.

## 현재 상태 (자동 수집)

- 브랜치: !`git branch --show-current`
- 작업 트리 변경사항:
```
!`git status --short -- site/src site/public netlify.toml .claude`
```
- 아직 push 안 된 커밋:
```
!`git log --oneline @{upstream}..HEAD 2>/dev/null || echo "(upstream 없음)"`
```
- 마지막 push된 커밋 (= Netlify가 마지막으로 빌드한 시점):
```
!`git log -1 --format='%h %ad %s' --date=format:'%Y-%m-%d %H:%M' origin/main`
```
- 글 목록 (파일 / draft / pubDate):
```
!`for f in site/src/content/blog/*.md; do printf '%s | %s | %s\n' "$(basename "$f" .md)" "$(grep -m1 '^draft:' "$f" | sed 's/draft: *//')" "$(grep -m1 '^pubDate:' "$f" | sed 's/pubDate: *//')"; done`
```
- 지금 시각 (UTC): !`date -u +%Y-%m-%dT%H:%M:%SZ`

## 보고 형식

아래 4줄로 짧게 정리한다. 표나 긴 설명 금지 (폰 화면 기준).

1. **변경사항**: 없음 / 있음 (파일 몇 개, 무엇인지 한 줄)
2. **배포**: 마지막 push 시각. 미푸시 커밋이 있으면 "N개 대기 중 → /deploy 필요"
3. **글**: 발행 N개 / 초안 N개 / 예약 N개 (pubDate가 미래인 글은 예약). 초안·예약은 slug를 나열
4. **💰 비용**: 이 명령은 읽기만 하므로 0원

주의: `site/dist/`, `site/node_modules/` 변경은 무시한다 (빌드 부산물).
