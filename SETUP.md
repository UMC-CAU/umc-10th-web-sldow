# 🎬 TanStack Query 실습 환경 가이드

## 프로젝트 구조

```
src/
├── api/
│   ├── client.js           # API 기본 클라이언트 설정
│   └── services.js         # API 서비스 함수들
├── hooks/
│   └── useMovies.js        # useQuery & useInfiniteQuery 커스텀 훅
├── pages/
│   ├── MovieListPage.jsx   # useQuery 기초 실습 페이지
│   ├── SearchPage.jsx      # 동적 queryKey 실습 페이지
│   └── InfiniteScrollPage.jsx  # useInfiniteQuery 실습 페이지
├── App.jsx                 # 메인 애플리케이션
└── main.jsx               # 엔트리 포인트
```

## 시작 방법

### 1. 서버 실행
```bash
pnpm dev
```
자동으로 `http://localhost:5173`이 열립니다.

### 2. 빌드
```bash
pnpm build
```

## 실습 순서

### 📖 실습 1: useQuery 기초 (MovieListPage)
**목표:** useQuery의 핵심 옵션 이해

**해야 할 작업:**
1. 로딩 상태 표시 (`isLoading` 또는 `isPending` 사용)
2. 에러 상태 표시 (`error.message` 표시)
3. 데이터 렌더링 (`data?.results` 반복)
4. 페이지네이션 구현 (page 상태 변경 시 자동 리페치)

**배우는 개념:**
- `queryKey`: 캐시의 고유 식별자
- `queryFn`: 데이터를 가져오는 함수
- `staleTime`: 데이터의 신선도
- `gcTime`: 캐시 유지 시간
- `retry`: 실패 시 재시도
- `status`: 'pending' | 'error' | 'success'

### 📖 실습 2: 동적 queryKey (SearchPage)
**목표:** queryKey가 변할 때의 캐싱 동작 이해

**해야 할 작업:**
1. `enabled` 옵션으로 조건부 쿼리 실행
2. `queryKey`에 `searchKeyword` 포함
3. 검색어가 바뀌면 새로운 데이터 요청
4. 같은 검색어 재검색 시 캐시 사용

**배우는 개념:**
- `enabled`: 조건부 쿼리 실행
- 동적 `queryKey`의 캐싱
- 자동 메모이제이션

### 📖 실습 3: 무한 스크롤 (InfiniteScrollPage)
**목표:** useInfiniteQuery와 Intersection Observer 연동

**해야 할 작업:**
1. `useInfiniteQuery` 사용
2. `data.pages`에서 모든 페이지 데이터 추출
3. Intersection Observer로 자동 로드 감지
4. 다음 페이지 로드 (`fetchNextPage()`)

**배우는 개념:**
- `useInfiniteQuery`: 페이지 기반 데이터 관리
- `data.pages`: 페이지 배열
- `getNextPageParam`: 다음 페이지 결정
- `hasNextPage`: 다음 페이지 존재 여부
- `isFetchingNextPage`: 다음 페이지 로딩 상태

## 주석 위치 가이드

각 페이지에 `TODO:` 주석으로 표시했습니다. 이 주석들을 찾아서 코드를 작성하면 됩니다.

### MovieListPage.jsx
```javascript
// TODO: isLoading 또는 isPending을 사용하여 로딩 상태를 표시하세요
// TODO: error가 있으면 에러 메시지를 표시하세요
// TODO: data?.results 배열을 순회하며 영화 카드를 렌더링하세요
// TODO: 페이지네이션 버튼을 만들고, 이전/다음 페이지로 이동하세요
```

### SearchPage.jsx
```javascript
// TODO: enabled 옵션을 사용하여 검색어가 있을 때만 쿼리를 실행하세요
// TODO: 검색 폼 제출 시 hasSearched를 true로 설정하세요
// TODO: searchResults?.results를 map하여 검색 결과를 렌더링하세요
```

### InfiniteScrollPage.jsx
```javascript
// TODO: useInfiniteQuery Hook 사용
// TODO: Intersection Observer를 사용하여 마지막 요소가 보일 때 자동으로 다음 페이지 로드
// TODO: allResults.map((movie) => (...))
```

## API 환경 설정

`.env` 파일에 다음을 설정하세요:
```
VITE_API_URL=http://localhost:3000
VITE_TOKEN=your-api-token
```

> **주의:** 실제 API가 없으면 에러가 발생합니다. 모킹 라이브러리 추가 또는 백엔드 서버 필요.

## TanStack Query DevTools (선택사항)

더 자세한 디버깅을 원한다면 `@tanstack/react-query-devtools`를 설치하고 App.jsx에 추가할 수 있습니다:

```bash
pnpm add -D @tanstack/react-query-devtools
```

```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

## 학습 팁

1. **매 실습마다 DevTools를 확인하세요** - 캐싱, 리페치가 실제로 일어나는 걸 볼 수 있습니다.
2. **네트워크 탭도 확인하세요** - 실제 API 요청이 언제 일어나는지 봅시다.
3. **console.log를 활용하세요** - data, status, isLoading 등의 값 변화를 추적합니다.
4. **queryKey를 잘 이해하세요** - TanStack Query의 핵심은 캐싱이고, 캐싱의 핵심은 queryKey입니다.

## 참고 링크

- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [useQuery API](https://tanstack.com/query/latest/docs/react/reference/useQuery)
- [useInfiniteQuery API](https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery)
