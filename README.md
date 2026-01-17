## 소개

코드잇 스프린트 과제: 할 일 목록을 관리하는 To Do 서비스

## 📋 프로젝트 소개

할 일을 생성, 조회, 수정, 삭제할 수 있는 TodoList 웹 애플리케이션


## 🚀 시작하기

### 사전 요구사항

- Node.js 20 이상
- Yarn 4.2.2

### 설치 및 실행

1. **설치**
   ```bash
   yarn
   ```

2. **개발 서버 실행**
   ```bash
   yarn dev
   ```

3. **브라우저에서 확인**
   - http://localhost:3000


## 사용 라이브러리

- TanStack Query (React Query) 5.90.18 : 서버 상태 캐싱 및 낙관적 업데이트
- Axios 1.13.2 : 네트워크 http 요청
- Lodash.isequal : 객체 간 비교
- react-error-boundary : Error 관리


## 📁 프로젝트 구조

```
sprint-todolist/
├── app/                   # Next.js App Router 페이지
│   ├── page.tsx           # 할 일 페이지 (홈 페이지)
│   ├── items/[itemId]/    # 할 일 상세 페이지
│   └── layout.tsx         # 레이아웃
├── src/
│   ├── components/       
│   │   ├── common/       # 공통 컴포넌트
│   │   └── todo/         # Todo 관련 컴포넌트
│   ├── features/         # 기능
│   │   └── todo/
│   │       ├── api/       # API 호출 함수
│   │       ├── hooks/     # 커스텀 훅
│   │       ├── model/     # 타입 정의
│   │       └── utils/     # 유틸리티 함수
│   └── utils/             # 공통 유틸리티
└── public/                # 정적 파일
```

## 요구사항 외 작업

- 서비스 전반에 낙관적 업데이트 도입을 통한 사용자 경험 향상
- 데이터 fetching 시 Loading / Error UI 구현
- tanstack-query를 활용한 데이터 캐싱