# SPARCS-2023-StartUp-Hackathon-3 금상(1위)

> [TEAM S] S-CLIENT

다음과 같은 기능이 포함되어 있습니다.

- 커뮤니티
- AI 이미지 생성
- 번역
- Auth

## 프로젝트에서 사용한 기술

- 데모데이 기간 fullstack 코드 리팩토링 및 `Next.js`, `Nest.js`로 분리 작업

## Dev Server 실행 방법

1. `pnpm i`
2. `pnpm dev`

## Production 배포 방법

- 프론트엔드 -> Vercel
- 백엔드 -> OCI
- AI 서버 -> AWS 인스턴스
- DB 서버 -> OCI
- 이미지 서버 -> AWS S3

## 환경 변수 및 시크릿

```
NEXT_PUBLIC_KAKAO_API_KEY=string
```
