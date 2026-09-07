---
name: preview
description: 배포 전 확인. 빌드가 통과하는지 검사하고, 폰에서 볼 수 있는 미리보기 주소(npm run dev:host)를 안내
allowed-tools: Bash(cd:*), Bash(npm run build:*), Bash(git:*), Bash(ipconfig:*), Bash(ifconfig:*), Bash(hostname:*), Bash(ls:*)
---

# 미리보기 / 빌드 검사

## 1. 빌드 검사 (항상 실행)

`cd site && npm run build` 를 실행한다.
- 성공: "빌드 OK" + 생성된 글 페이지 수 (`ls site/dist/posts` 개수)
- 실패: 에러 메시지에서 **파일명과 원인 줄만** 뽑아 보고한다. 전체 로그를 붙이지 않는다. 고칠 수 있는 단순 오류(frontmatter 오타, 따옴표 누락 등)면 고친 뒤 다시 빌드한다.
- 끝나면 `git checkout -- site/dist site/node_modules/.astro 2>/dev/null` 로 부산물을 되돌린다.

## 2. 폰 미리보기 안내

빌드가 통과했으면, 사용자가 폰으로 직접 볼 수 있게 안내한다:

- 이 컴퓨터의 로컬 IP: !`(ipconfig getifaddr en0 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || echo "확인 불가") `
- 안내 문장: "같은 WiFi에서 `cd site && npm run dev:host` 를 실행하면 폰에서 `http://<위 IP>:4321` 로 열 수 있어요. 초안(draft) 글도 보이려면 dev 서버에서는 `draft: true` 글은 안 보이니, 확인하려면 잠깐 `draft: false` 로 바꾸고 다시 되돌려야 합니다."
- dev 서버는 **사용자가 직접 실행**한다. 이 명령 안에서 `npm run dev:host` 를 띄우지 않는다 (백그라운드 프로세스가 남아 세션이 멈춘다).

## 보고 형식

- 빌드 결과 한 줄
- 미리보기 주소 한 줄
- **💰 비용**: 0원 (로컬 빌드만, Netlify 빌드 분 사용 안 함)
