# Everybody Moves 블로그 — Claude 작업 규칙

Astro 정적 블로그. 소스는 `site/`, 글은 `site/src/content/blog/*.md`, 이미지는 `site/public/images/`.
`main` 에 push 하면 Netlify 가 자동으로 빌드·배포한다 (https://everybody-moves-fit.netlify.app).

## 가장 중요한 규칙: 비용

- **모든 작업 보고의 마지막 줄에 `💰 비용:` 을 붙인다.** 돈이 안 들면 "0원" 이라고 명시한다.
- 돈이 들 수 있는 행동(유료 플랜 전환, 커스텀 도메인, 외부 API 호출, 이미지 생성 서비스, 새 SaaS 가입)은 **실행 전에 금액을 먼저 보고하고 확인을 받는다.**
- 무료 한도가 있는 서비스(Netlify 빌드 분·대역폭)는 사용량을 함께 적는다. `/cost` 로 점검.
- 확인하지 못한 금액은 추측하지 않고 "확인 필요" 라고 쓴다.

## 폰(리모트 컨트롤)용 명령어

`.claude/skills/` 에 정의. 사용법은 `REMOTE-CONTROL.md` 참고.

| 명령 | 하는 일 | 돈 |
|---|---|---|
| `/status` | git 상태·미푸시 커밋·초안/예약 글 요약 | 0원 |
| `/posts` | 글 목록 (발행/초안/예약) | 0원 |
| `/new-post <주제>` | 새 글 초안 작성 (draft: true) | 0원 |
| `/edit-post <slug> <지시>` | 기존 글 수정 | 0원 |
| `/preview` | 빌드 검사 + 폰 미리보기 주소 안내 | 0원 |
| `/publish <slug> [날짜]` | 초안 발행 → 커밋 → push → Netlify 배포 | 0원 (빌드 분 1~2분) |
| `/unpublish <slug>` | 글 내리기 (draft: true) → push | 0원 (빌드 분 1~2분) |
| `/deploy [메시지]` | 수정사항 커밋 + push | 0원 (빌드 분 1~2분) |
| `/cost` | 이번 달 비용 점검 | 0원 |

## 저장소 규칙

- `site/dist/` 와 `site/node_modules/` 가 git 에 들어 있지만 **빌드 부산물은 커밋하지 않는다.** 로컬 빌드 후 `git checkout -- site/dist site/node_modules/.astro` 로 되돌린다.
- 커밋 대상은 `site/src`, `site/public`, `netlify.toml`, `.claude`, 문서 파일만.
- force push, rebase, 브랜치 전환 금지. 배포는 `main` 에서만.
- 빌드 명령: `cd site && npm run build` (Node 18 이상).
- 글 frontmatter 스키마는 `site/src/content.config.ts`. `draft: true` 또는 미래 `pubDate` 인 글은 사이트에 안 보인다.
- 예약 글(미래 `pubDate`)은 날짜가 지나도 **자동으로 올라가지 않는다.** 그 이후에 한 번 더 push 하거나 Netlify 에서 Trigger deploy 를 눌러야 한다.
- 글은 영어, body-positive 톤. 체중 감량·외모 압박 표현 금지. 의학적 단정 금지 (면책 문구는 레이아웃이 자동 삽입).
- 폰 화면에서 읽으므로 보고는 짧게. 긴 로그는 붙이지 않고 핵심 줄만.
