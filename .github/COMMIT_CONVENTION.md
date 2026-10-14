# 커밋 컨벤션 — Frontend

> React + TypeScript + Vite 기반 프로젝트의 커밋 메시지 규칙입니다.

---

## 커밋 메시지 형식

```
<타입>(<스코프>): <요약>

<본문>

<푸터>
```

### 예시

```
feat(auth): 구글 OAuth 로그인 기능 추가

기존 이메일 로그인 외 구글 계정으로도 로그인 가능하도록 구현.
react-oauth/google 라이브러리 사용.

Closes #12
```

```
fix(chart): 성과지수 그래프 빈 데이터 시 크래시 수정
```

```
feat(dashboard)!: 대시보드 라우팅 구조 전면 변경

BREAKING CHANGE: /home 경로가 /dashboard로 변경됨
```

---

## 타입

| 타입 | 설명 |
|------|------|
| `feat` | API 또는 UI에 새로운 기능 추가 또는 변경 |
| `fix` | `feat` 커밋으로 인해 발생한 버그 수정 |
| `refactor` | API/UI 동작 변경 없이 코드 구조 개선 |
| `perf` | 성능 개선 목적의 `refactor` |
| `style` | 코드 포맷팅, 세미콜론 누락 등 동작에 영향 없는 변경 |
| `test` | 테스트 추가 또는 수정 |
| `docs` | 문서만 변경 |
| `chore` | 패키지 구조 변경, 파일 이동/이름 변경, 버전 수정 등 |
| `revert` | 이전 커밋 되돌리기 |

---

## 어떤 타입을 써야 할지 모르겠다면

| 질문 | Yes → 타입 |
|------|-----------|
| 버그를 수정했나요? | `fix` |
| 기능 추가 또는 UI 동작이 바뀌었나요? | `feat` |
| 성능 개선이 목적인가요? | `perf` |
| 코드 구조만 바꿨나요? (동작 변화 없음) | `refactor` |
| 포맷팅, 공백, 세미콜론만 변경했나요? | `style` |
| 테스트를 추가/수정했나요? | `test` |
| 문서만 변경했나요? | `docs` |
| 빌드, 환경설정, 패키지 관련인가요? | `chore` |

---

## 스코프

스코프는 변경된 코드 영역을 나타냅니다. **선택사항**이지만 가능하면 명시하세요.

| 스코프 | 설명 |
|--------|------|
| `auth` | 인증/로그인 관련 |
| `dashboard` | 대시보드 메인 화면 |
| `chart` | 성과지수 시각화 차트 |
| `profile` | 학생 프로필 관련 |
| `activity` | 학생 활동 입력/조회 |
| `admin` | 관리자 페이지 |
| `common` | 공통 컴포넌트 (버튼, 모달 등) |
| `router` | 라우팅 설정 |
| `api` | API 호출 레이어 |
| `store` | 전역 상태 관리 |
| `style` | 전역 스타일, 테마 |
| `config` | 환경 설정, vite/tsconfig 설정 |

---

## 요약 (Description)

- **필수** 항목입니다
- 현재형 명령조로 작성: "변경한다" ✅ / "변경했다" ❌
- 첫 글자 소문자 (한국어는 해당 없음)
- 마침표로 끝내지 않기
- **72자 이내**

```
# ✅ Good
feat(auth): 구글 OAuth 로그인 기능 추가
fix(chart): 빈 데이터 배열 접근 시 크래시 수정

# ❌ Bad
feat(auth): 구글 OAuth 로그인 기능을 추가했습니다.
Fix bug
```

---

## 본문 (Body)

- **선택** 항목입니다
- 요약줄과 빈 줄로 구분
- *무엇*을 했는지가 아닌 ***왜*** 했는지를 설명
- 현재형 명령조 사용

---

## 푸터 (Footer)

- **선택** 항목이지만 이슈 참조 시 반드시 작성
- 이슈 참조: `Closes #이슈번호` / `Fixes #이슈번호`
- 브레이킹 체인지: `BREAKING CHANGE:` 로 시작

```
Closes #34

BREAKING CHANGE: /settings 경로가 /account/settings로 변경됨
```

---

## 브레이킹 체인지 (Breaking Changes)

API 또는 라우팅 구조 등 하위 호환성이 깨지는 변경 시 반드시 표시합니다.

```
# 타입 뒤에 ! 추가
feat(router)!: /home 경로를 /dashboard로 변경

BREAKING CHANGE: 기존 /home 북마크 및 링크가 동작하지 않음
```

---

## 브랜치 전략

```
main
└── feature/#이슈번호
```

```bash
# 1. main 최신화
git pull origin main

# 2. 이슈 번호 기반으로 브랜치 생성
git branch feature/#7
git switch feature/#7

# 3. 작업 후 커밋
git add .
git commit -m "feat(dashboard): 성과지수 요약 카드 컴포넌트 추가"

# 4. push 전 다시 main 최신화 (충돌 방지)
git pull origin main

# 5. 충돌 해결 후 push
git push origin feature/#7
```

> PR 생성 후 Reviewer가 Merge 진행. **main 직접 push 금지.**

---

## 전체 예시

```
# 기본
feat(activity): 학생 활동 등록 폼 유효성 검사 추가

# 이슈 참조 포함
fix(store): 로그아웃 시 전역 상태 초기화 누락 수정

Closes #21

# 본문 포함
refactor(chart): 차트 데이터 변환 로직을 커스텀 훅으로 분리

기존에 컴포넌트 내에 인라인으로 작성된 데이터 변환 로직을
useChartData 훅으로 분리하여 재사용성과 가독성 향상.

# 브레이킹 체인지
feat(api)!: API 응답 구조 변경

BREAKING CHANGE: data 필드가 result로 이름 변경됨

# 초기 커밋
chore: init
```
