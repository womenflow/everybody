---
name: new-post
description: 새 블로그 글을 초안(draft)으로 작성. 주제를 인자로 준다. 예 - /new-post 여름 수분 보충 팁
argument-hint: <주제 또는 제목 (한글/영문 모두 가능)>
allowed-tools: Read, Write, Edit, Glob, Bash(ls:*), Bash(grep:*), Bash(date:*), Bash(git:*)
---

# 새 글 초안 작성

주제: **$ARGUMENTS**

주제가 비어 있으면 작성하지 말고 주제를 물어본다.

## 규칙

1. **영어로** 작성한다 (사이트 독자가 영어권). 주제가 한글이면 영어 제목으로 번역해서 정한다.
2. 파일 위치: `site/src/content/blog/<slug>.md`. slug는 영문 소문자+하이픈, 3~6단어. 이미 있는 파일명과 겹치면 안 된다.
3. 반드시 `draft: true` 로 만든다. **발행은 사람이 `/publish` 로 따로 한다.**
4. frontmatter는 `site/src/content.config.ts` 스키마를 그대로 따른다:
   ```yaml
   ---
   title: "..."
   description: "..."          # 검색결과용 1~2문장, 160자 이내
   pubDate: <지금 UTC, ISO 8601, 예 2026-09-07T09:00:00Z>
   tags: ["...", "..."]        # 3~4개
   draft: true
   image: "/images/<slug>-1.png"   # 아래 5번 참고
   shopUrl: "https://www.bubblelime.com/"   # 주제에 맞는 컬렉션 URL을 알면 그걸로
   shopLabel: "Shop Bubblelime"
   shopPitch: "<주제와 자연스럽게 이어지는 한 문장 상품 소개>"
   ---
   ```
5. 이미지 파일은 **만들지 않는다** (이미지 생성은 이 저장소 밖 도구를 쓰고 별도 비용이 든다). `image:` 경로와 본문의 `![alt](/images/...)` 자리는 잡아두되, 파일이 없다는 걸 마지막 보고에 명확히 적는다. `site/public/images/` 에 재사용 가능한 기존 이미지가 있으면 그걸 써도 된다.
6. 본문 톤과 구조는 기존 글(`site/src/content/blog/joyful-movement-every-body-summer.md`)을 먼저 읽고 맞춘다:
   - body-positive, 따뜻하고 실용적인 톤. 체중 감량/외모 압박 표현 금지
   - `##` 소제목 4~6개, 불릿 활용, 700~1,100 단어
   - 의학적 단정 금지 (면책 문구는 레이아웃이 자동으로 붙임 — 본문에 쓰지 않는다)
   - 마지막 섹션은 짧은 격려 문장으로 마무리
7. 작성 후 `git status --short site/src/content/blog` 로 새 파일이 잡히는지 확인한다. **커밋/푸시는 하지 않는다.**

## 보고 형식 (폰 화면 기준, 짧게)

- 만든 파일 경로와 제목
- 필요한 이미지 파일 목록 (아직 없음)
- 다음 단계: `/preview` 로 확인 → `/publish <slug>` 로 발행
- **💰 비용**: 파일 생성만 하므로 0원. 이미지를 외부 도구로 만들면 그건 별도 (이 명령 안에서는 발생 안 함)
