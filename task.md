# inussinger 작업 (2026-08-28)

## 1. 목소리 미리듣기 UI — 완료
- Home.tsx import Pause, Volume2 추가 ✓
- SINGER_PROFILES 8명 audioFile 경로 추가 ✓
- SingerStyleFilter에 playing/audioRef/togglePlay 이식 ✓
- 메인 싱어 카드에 "목소리 듣기" 버튼(span role=button, stopPropagation) ✓
- mp3 8개 client/public/audio/ (미커밋)

## 2. 다이어트
- [x] RECOMMENDATION 제거
- [x] DIFFERENCE(#intro) 제거 → 네비 '소개' #trust로 변경
- [x] PROVIDED MATERIALS(#service) 제거
- [x] BOOKING STATUS 제거
- [x] TRUST 압축 (3열 한줄 + 칩)
- [x] SAFETY 압축 (3열 + 퀵링크 6→3)
- [ ] WEDDING PACKAGE + ADDITIONAL OPTIONS 통합
- [ ] PRICING을 VIDEO 직후로 전진
- [ ] /tmp/measure.py 실측 (기준 14,353px → 목표 ~9,800px)

## 3. 배포
- build → commit → push → Vercel API 배포
