---
name: cost
description: 이 블로그 운영에 돈이 얼마나 드는지 점검. 이번 달 Netlify 빌드 횟수 추정, 무료 한도 대비 사용량, 유료 전환 위험 항목
allowed-tools: Bash(git:*), Bash(date:*), Bash(du:*), Bash(ls:*), WebFetch
---

# 비용 점검

사용자에게 가장 중요한 항목. **추측을 사실처럼 말하지 않는다.** 확인 못 한 숫자는 "확인 필요" 라고 쓴다.

## 자동 수집

- 이번 달 push 횟수 (≈ Netlify 빌드 횟수): !`git log origin/main --since="$(date -u +%Y-%m-01)" --format=%h | wc -l | tr -d ' '`
- 최근 30일 push 횟수: !`git log origin/main --since="30 days ago" --format=%h | wc -l | tr -d ' '`
- 사이트 정적 파일 용량 (대역폭 추정용): !`du -sh site/dist 2>/dev/null | cut -f1`
- 이미지 폴더 용량: !`du -sh site/public/images 2>/dev/null | cut -f1`
- 오늘: !`date -u +%Y-%m-%d`

## 비용 항목 (이 저장소 기준)

| 항목 | 플랜 | 이번 달 예상 |
|---|---|---|
| Netlify 호스팅 + 빌드 | 무료 (Starter) | 빌드 N회 × 약 1~2분 = 약 M분 / 한도 300분 |
| Netlify 대역폭 | 무료 한도 100GB/월 | 페이지당 용량 × 방문 수로 추정 |
| GitHub 저장소 | 무료 | 0원 |
| Google Analytics 4 | 무료 | 0원 |
| 도메인 | netlify.app 서브도메인 | 0원 (커스텀 도메인 없음) |
| Claude Code / Remote Control | 구독에 포함, 추가 요금 없음 | 0원 (구독료는 별도) |

위 표를 실제 숫자로 채워서 보여준다. 빌드 분/대역폭 무료 한도는 Netlify가 바꿀 수 있으므로, 사용자가 "정확히 확인" 을 원하면 WebFetch 로 https://www.netlify.com/pricing/ 을 읽어 현재 한도를 다시 확인한다.

## 이 저장소 밖에서 생기는 비용 (여기서는 확인 불가 — 반드시 언급)

- 글 이미지 생성 도구 (Kling 등) 크레딧
- 글을 자동 생성하는 Python 자동화가 쓰는 API 사용량

## 유료 전환 위험 신호

- 한 달 빌드가 150회를 넘으면 (한도 300분의 절반) 경고
- Netlify 계정에 카드가 등록되어 있으면 한도 초과 시 자동 과금 가능 → 카드 미등록 여부를 사용자에게 확인하라고 안내
- 커스텀 도메인 추가, Netlify Pro 전환, 이미지 CDN 같은 유료 기능 추가 시 반드시 먼저 금액을 보고

## 보고 형식

표 1개 + "이번 달 총 예상 비용: 0원" 같은 결론 한 줄 + 위험 신호 있으면 한 줄. 마지막 줄은 **💰 비용: 이 점검 자체는 0원**.
