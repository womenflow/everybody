# 폰에서 블로그 관리하기 (Claude Code Remote Control)

맥에서 Claude Code 를 켜 두고, 폰에서 명령어를 보내 글 작성·발행·배포를 한다.
실제 실행은 **맥에서** 되므로 로컬 파일·빌드·`npm run dev:host` 미리보기가 전부 동작한다.

## 1. 준비 (맥에서 한 번)

```bash
cd ~/everybody-blog        # 이 저장소
claude auth login          # claude.ai 계정 (Pro/Max 구독 필요, API 키는 불가)
claude remote-control      # 서버 모드. 터미널을 켜 둔다
```

터미널에 QR 코드와 세션 URL이 뜬다. 이미 세션이 열려 있으면 그 안에서 `/remote-control` 을 쳐도 된다.

## 2. 폰에서 접속

- Claude 앱 (iOS/Android) 으로 QR 스캔, 또는
- https://claude.ai/code 에서 세션 목록 → 해당 세션 선택

## 3. 명령어

폰 입력창에 그대로 친다.

| 명령 | 예시 |
|---|---|
| 상태 확인 | `/status` |
| 글 목록 | `/posts` |
| 새 글 초안 | `/new-post 여름철 무릎 통증 완화 스트레칭` |
| 글 수정 | `/edit-post body-positivity-fitness 첫 문단을 더 짧게` |
| 빌드 검사·미리보기 | `/preview` |
| 발행 (즉시) | `/publish summer-knee-stretches` |
| 발행 (예약) | `/publish summer-knee-stretches 2026-09-15` |
| 글 내리기 | `/unpublish summer-knee-stretches` |
| 수정사항 배포 | `/deploy` |
| 비용 점검 | `/cost` |

### 보통 쓰는 순서

1. `/new-post <주제>` → 초안 파일 생성 (draft: true, 사이트엔 안 보임)
2. 이미지가 필요하면 맥에서 `site/public/images/` 에 넣는다 (이미지 생성은 이 저장소 밖 도구, 별도 비용)
3. `/preview` → 빌드 통과 확인
4. `/publish <slug>` → 커밋 + push → Netlify 가 1~2분 뒤 배포
5. `/status` 로 확인

### 예약 발행 주의

`/publish <slug> 2026-09-15` 처럼 날짜를 주면 그 날짜 전엔 사이트에 안 보인다.
하지만 날짜가 지나도 **자동으로 올라가지 않는다.** 그날 이후에 `/deploy` 를 한 번 더 치거나,
Netlify 대시보드 → Deploys → "Trigger deploy" 를 누르면 올라간다.

## 4. 돈

| 항목 | 비용 |
|---|---|
| Remote Control 기능 | 구독에 포함, 추가 요금 없음 |
| Netlify 호스팅·빌드 | 무료 플랜 (빌드 300분/월, 대역폭 100GB/월). push 1회 ≈ 빌드 1~2분 |
| GitHub, Google Analytics | 무료 |
| 도메인 | netlify.app 서브도메인, 0원 |

이 저장소 안의 명령어는 전부 0원이다. 돈이 드는 건 이미지 생성 도구와 글 자동 생성 API 같은 **저장소 밖** 항목뿐이며, 명령어들은 그런 서비스를 호출하지 않는다.
매달 `/cost` 로 무료 한도 사용량을 확인한다.

## 5. 끝내기

맥 터미널에서 `Ctrl+C` 로 `claude remote-control` 을 종료하면 폰 접속도 끊긴다.
맥이 잠자기 모드에 들어가면 끊기므로, 오래 쓰려면 잠자기 방지 설정을 켠다.
