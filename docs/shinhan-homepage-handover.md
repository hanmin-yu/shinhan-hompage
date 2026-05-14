# 신한관세법인 홈페이지 인수인계서

## 1. 문서 목적

본 문서는 신한관세법인 홈페이지를 외부 온프레미스 서버로 이전하여 운영/유지보수할 개발팀에게 전달하기 위한 기술 인수인계서입니다.

홈페이지는 React/Vite 기반 프론트엔드와, 신한 NEWS/소식지 관리자 기능을 위한 Node.js Express 런타임으로 구성되어 있습니다. 정적 페이지 대부분은 빌드 산출물로 서비스할 수 있으나, 관리자 기능과 업로드 파일 제공을 위해 별도 Node.js 프로세스를 함께 운영해야 합니다.

## 2. 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | 신한관세법인 홈페이지 |
| 저장소/폴더명 | `shinhan-hompage` |
| 주요 기술 | React 18, TypeScript, Vite 5, Emotion, React Router, Express |
| 패키지 매니저 | npm 기준 권장, `package-lock.json` 포함 |
| 프론트 빌드 결과 | `dist/` |
| 정적 리소스 | `public/` |
| 관리자/뉴스 API | `server/news-admin-api.ts` |
| 관리자 업로드 저장소 | 운영 서버 `/home/files` |
| 기본 웹 포트 | 예시: 80/443 또는 내부 4173 |
| 관리자 API 기본 포트 | `4174` |

## 3. 주요 기능 범위

- 회사소개, 인사말, 연혁, 사무소, 오시는 길
- 임원진/분야별 전문가 소개
- 업무분야 상세 페이지
- IT 시스템 소개
- 소식/자료
  - 신한 NEWS
  - 무역 동향
  - 세미나/교육
  - 소식지
- Contact US, 부정행위 접수창구, 채용, 약관/개인정보 처리방침
- 관리자 화면
  - `/admin/login`
  - `/admin/news`
  - `/admin/news/shinhan-news`
  - `/admin/news/newsletter`

## 4. 디렉터리 구조

```text
shinhan-hompage/
├── api/                         # Vercel 배포용 서버리스 API. 온프레미스 기본 운영에서는 참고용
├── dist/                        # npm run build 후 생성되는 정적 배포 산출물
├── public/                      # 이미지, PDF, 소식지 렌더링 파일 등 대용량 정적 리소스
├── server/
│   └── news-admin-api.ts        # 온프레미스 관리자/뉴스 API Express 서버
├── src/
│   ├── App.tsx                  # 라우팅 정의
│   ├── components/              # 공통 UI 컴포넌트
│   ├── config/                  # 내비게이션, 관리자 모드 설정
│   ├── data/                    # 정적 페이지/뉴스/소식지 seed 데이터
│   ├── hooks/                   # 화면 데이터 로딩 및 상태 훅
│   ├── pages/                   # 페이지 단위 컴포넌트
│   ├── repositories/            # 뉴스 데이터 로딩 계층
│   ├── server/                  # 무역 동향 수집/런타임 보조 로직
│   ├── types/                   # 공통 타입
│   └── utils/                   # 유틸리티
├── storage/
│   └── managed-content/         # 로컬 개발용 기본 저장소. 운영은 MANAGED_CONTENT_ROOT=/home/files 사용
├── vite.config.ts               # 개발 서버 프록시 및 Vite 설정
├── vercel.json                  # Vercel SPA fallback 설정
├── package.json
└── package-lock.json
```

## 5. 인수 서버 확인사항

외부 개발팀/운영팀으로부터 확인받은 서버 조건은 다음과 같습니다.

| 확인 항목 | 답변 |
| --- | --- |
| Node.js 기반 프론트 + 업로드 API 서버 운영 | 가능 |
| Nginx 프록시 및 HTTPS 구성 | 가능 |
| 뉴스/소식지 업로드용 영구 저장 경로 | `/home/files` |
| 저장 경로 백업 | 외부 NAS 백업 운영 중 |
| 백업/복구 방식 | 로컬 디스크 `/home/files`를 외부 NAS로 백업 후 필요 시 복구 |
| 서버 OS | Rocky OS 9 |
| 사용 가능 Node.js | Node.js 24 |
| 저장소 종류 | 로컬 디스크 |
| 저장 용량 제한 | 별도 소프트 제한 없음. 물리 디스크 확장 가능 |
| Node 내부 포트 사용 | 가능 |
| 파일명 정책 | UUID 기반 난독화 적용 |

## 6. 서버 요구사항

권장 사양은 트래픽과 소식지 파일 용량에 따라 조정해야 합니다.

| 구분 | 권장값 |
| --- | --- |
| OS | Rocky OS 9 |
| Node.js | Node.js 24 |
| npm | Node.js 설치 버전에 포함된 npm 사용 |
| Reverse Proxy | Nginx 또는 Apache |
| Process Manager | systemd 또는 PM2 |
| Disk | `/home/files` 로컬 디스크 사용. `public/` 및 `dist/`가 현재 각각 약 850MB 수준 |
| Network | HTTPS 443 권장, 관리자 API 내부 포트 4174 |

## 7. 환경변수

운영 서버에는 아래 환경변수를 설정합니다. `VITE_`로 시작하는 값은 프론트 빌드 시점에 반영되므로, 값을 변경하면 `npm run build`를 다시 실행해야 합니다.

```env
VITE_NEWS_ADMIN_MODE=enabled
VITE_ISSUE_REPORT_MODE=static-json

NEWS_ADMIN_RUNTIME_MODE=enabled
ADMIN_USERNAME=운영_관리자_ID
ADMIN_PASSWORD=운영_관리자_비밀번호
SESSION_SECRET=충분히_긴_랜덤_문자열
NEWS_ADMIN_API_PORT=4174
MANAGED_CONTENT_ROOT=/home/files

ISSUE_REPORT_RUNTIME_MODE=snapshot-only
```

### 환경변수 설명

| 변수 | 설명 |
| --- | --- |
| `VITE_NEWS_ADMIN_MODE` | 프론트 관리자 기능 노출 여부. 온프레미스 운영은 `enabled` 권장 |
| `VITE_ISSUE_REPORT_MODE` | 무역 동향 데이터 모드. 정적 운영은 `static-json`, 실시간 수집 API 운영은 `api` |
| `NEWS_ADMIN_RUNTIME_MODE` | 관리자 API 쓰기 가능 여부. 운영은 `enabled`, 읽기 전용은 `readonly` |
| `ADMIN_USERNAME` | 관리자 로그인 ID |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 |
| `SESSION_SECRET` | 관리자 세션 쿠키 서명용 비밀값. 기본값 사용 금지 |
| `NEWS_ADMIN_API_PORT` | Express 관리자 API 포트 |
| `MANAGED_CONTENT_ROOT` | 관리자 업로드 파일/운영 콘텐츠 저장 루트. 운영 서버는 `/home/files` |
| `ISSUE_REPORT_RUNTIME_MODE` | 무역 동향 수집 모드. 정적 운영은 `snapshot-only`, 실시간 수집은 `cache-with-refresh` |

주의사항:

- `.env.local.example`에는 로컬 개발용 예시 계정이 포함되어 있습니다. 운영 서버에서는 반드시 별도 계정과 비밀번호를 설정해야 합니다.
- 관리자 세션 쿠키는 `HttpOnly`, `SameSite=Lax`, 8시간 만료로 발급됩니다.
- HTTPS 적용을 권장합니다. HTTPS가 없는 경우 관리자 로그인 정보가 평문 네트워크에 노출될 수 있습니다.

## 8. 설치 절차

아래 예시는 `/var/www/shinhan-hompage`에 설치하는 기준입니다.

```bash
cd /var/www/shinhan-hompage
npm ci
npm run build
```

빌드 완료 후 `dist/` 디렉터리가 생성됩니다.

```bash
ls -la dist
```

관리자 API를 직접 실행해 확인합니다.

```bash
NEWS_ADMIN_RUNTIME_MODE=enabled \
ADMIN_USERNAME=운영_관리자_ID \
ADMIN_PASSWORD=운영_관리자_비밀번호 \
SESSION_SECRET=충분히_긴_랜덤_문자열 \
NEWS_ADMIN_API_PORT=4174 \
npm exec -- tsx server/news-admin-api.ts
```

정상 실행 시 다음과 유사한 로그가 표시됩니다.

```text
[news-admin-api] listening on http://localhost:4174
```

## 9. 운영 구성 권장안

### 8.1 정적 프론트

`dist/`를 Nginx 또는 Apache에서 정적 파일로 서비스합니다. React Router를 사용하므로 존재하지 않는 경로는 `index.html`로 fallback해야 합니다.

### 8.2 관리자 API

`server/news-admin-api.ts`를 Node.js 프로세스로 실행합니다.

이 API가 담당하는 경로는 다음과 같습니다.

- `/api/admin/session`
- `/api/admin/login`
- `/api/admin/logout`
- `/api/admin/news/shinhan-news`
- `/api/admin/news/newsletters`
- `/api/news/shinhan-news`
- `/api/news/newsletters`
- `/managed-content/*`

### 8.3 Nginx 예시

아래 설정은 예시입니다. 실제 도메인, 인증서 경로, 설치 경로는 운영 환경에 맞게 수정해야 합니다.

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/shinhan-hompage/dist;
    index index.html;

    client_max_body_size 120m;

    location /api/admin/ {
        proxy_pass http://127.0.0.1:4174/api/admin/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/news/ {
        proxy_pass http://127.0.0.1:4174/api/news/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /managed-content/ {
        proxy_pass http://127.0.0.1:4174/managed-content/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 10. systemd 서비스 예시

환경변수 파일 예시:

```bash
sudo vi /etc/shinhan-homepage.env
```

```env
NEWS_ADMIN_RUNTIME_MODE=enabled
ADMIN_USERNAME=운영_관리자_ID
ADMIN_PASSWORD=운영_관리자_비밀번호
SESSION_SECRET=충분히_긴_랜덤_문자열
NEWS_ADMIN_API_PORT=4174
MANAGED_CONTENT_ROOT=/home/files
ISSUE_REPORT_RUNTIME_MODE=snapshot-only
```

서비스 파일 예시:

```ini
[Unit]
Description=Shinhan Homepage News Admin API
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/shinhan-hompage
EnvironmentFile=/etc/shinhan-homepage.env
ExecStart=/usr/bin/npm exec -- tsx server/news-admin-api.ts
Restart=always
RestartSec=5
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

반영 명령:

```bash
sudo systemctl daemon-reload
sudo systemctl enable shinhan-homepage
sudo systemctl start shinhan-homepage
sudo systemctl status shinhan-homepage
```

로그 확인:

```bash
journalctl -u shinhan-homepage -f
```

## 11. 데이터 관리

### 11.1 정적 콘텐츠

정적 콘텐츠는 주로 아래 파일에서 관리됩니다.

| 영역 | 주요 파일 |
| --- | --- |
| 라우팅 | `src/App.tsx` |
| 상단 내비게이션 | `src/config/navigation.ts` |
| 페이지 문구/콘텐츠 | `src/data/pageContent.ts`, `src/data/home.ts` |
| 약관/정책 | `src/data/legal.ts` |
| 신한 NEWS seed | `src/data/newsStaticSeeds.ts`, `src/data/shinhanNewsDetails.ts` |
| 무역 동향 snapshot | `src/data/issueReportsSnapshot.ts`, `public/issue-reports.json` |
| 임원/전문가 | `src/pages/members/membersDirectory.tsx` |
| 이미지/PDF | `public/` |

정적 콘텐츠를 코드로 수정한 경우:

```bash
npm run build
```

이후 `dist/`를 재배포합니다.

### 11.2 관리자 업로드 콘텐츠

관리자 화면에서 등록/수정한 데이터는 아래 경로에 저장됩니다.

```text
/home/files/news/shinhan-news/index.json
/home/files/news/shinhan-news/items/*.html
/home/files/news/newsletter/index.json
/home/files/news/newsletter/files/
```

운영 시 `/home/files`는 반드시 영구 보존해야 합니다. 서버 이전, 재배포, 장애 복구 시 `/home/files`가 누락되면 관리자에서 등록한 신한 NEWS/소식지 데이터가 사라질 수 있습니다.

신규 저장되는 파일은 UUID 기반 파일명으로 저장됩니다. 사용자가 업로드한 원본 파일명은 저장 경로에 직접 노출되지 않습니다.

## 12. 관리자 사용 방법

1. `/admin/login` 접속
2. 운영 환경변수에 설정한 `ADMIN_USERNAME`, `ADMIN_PASSWORD`로 로그인
3. `/admin/news/shinhan-news`에서 신한 NEWS 등록/수정/삭제
4. `/admin/news/newsletter`에서 소식지 등록/수정/삭제

소식지 등록 시 유의사항:

- 원본 파일과 미리보기 ZIP이 필요합니다.
- 새 소식지 등록 시 `originalFile`과 `previewZip`이 모두 있어야 합니다.
- 미리보기 ZIP 내부에는 `manifest.json`이 포함되어야 합니다.
- 관리자 API 업로드 제한은 100MB이며, Nginx도 `client_max_body_size 120m` 이상으로 맞추는 것을 권장합니다.

## 13. 무역 동향 데이터 운영

무역 동향 페이지는 두 가지 방식 중 하나로 운영할 수 있습니다.

### 13.1 정적 snapshot 운영 권장

온프레미스에서 가장 단순하고 안정적인 방식입니다.

```env
VITE_ISSUE_REPORT_MODE=static-json
ISSUE_REPORT_RUNTIME_MODE=snapshot-only
```

이 경우 프론트는 `/issue-reports.json`을 읽습니다. 외부 사이트 장애나 HTML 구조 변경 영향을 받지 않습니다.

### 13.2 실시간 수집 운영

실시간 수집을 운영하려면 `/api/issue-reports`를 제공하는 Node.js API가 필요합니다. 현재 Vite 개발/프리뷰 서버에는 해당 API 브릿지가 포함되어 있으나, `server/news-admin-api.ts`의 관리자 API에는 기본 포함되어 있지 않습니다.

실시간 수집이 필요하면 운영 개발팀이 아래 중 하나를 선택해야 합니다.

- Vite preview 서버를 별도 운영하고 `/api/issue-reports`만 프록시
- `src/server/issueReportsHttp.ts`의 `handleIssueReportsRequest`를 운영 Express 서버에 연결
- 별도 배치로 `public/issue-reports.json`을 주기 갱신

실시간 수집 대상 외부 사이트:

- 한국관세사회: `https://krcaa.or.kr/_Document/Notify/N20601L.aspx?MenuCode=N20601`
- 한국무역협회: `https://www.kita.net/board/totalTradeNews/totalTradeNewsList.do`

외부망 차단, 사이트 구조 변경, 인코딩 변경이 있으면 수집 결과가 snapshot으로 fallback될 수 있습니다.

## 14. 배포 체크리스트

배포 전:

- Rocky OS 9 서버 확인
- Node.js 24 설치 확인
- `npm ci` 성공 확인
- 운영 환경변수 설정 확인
- `VITE_NEWS_ADMIN_MODE=enabled` 상태로 빌드했는지 확인
- `VITE_ISSUE_REPORT_MODE` 운영 방식 결정
- `npm run build` 성공 확인
- `/home/files` 생성 및 쓰기 권한 확인
- `/home/files` 외부 NAS 백업 정책 확인
- Nginx fallback 설정 확인
- `/api/admin`, `/api/news`, `/managed-content` 프록시 확인
- HTTPS 인증서 적용 확인

배포 후:

- `/` 홈 화면 접속 확인
- 주요 메뉴 페이지 접속 확인
- 새로고침 시 404가 아닌 정상 화면 표시 확인
- `/admin/login` 접속 확인
- 관리자 로그인 확인
- 신한 NEWS 목록 로딩 확인
- 소식지 목록 로딩 확인
- 소식지 PDF/미리보기 파일 열람 확인
- 모바일 화면 메뉴 동작 확인

## 15. 백업/복구

정기 백업 대상:

```text
/home/files/
public/
src/data/
package.json
package-lock.json
```

가장 중요한 운영 데이터는 `/home/files`입니다. 이 디렉터리는 관리자 화면에서 등록한 콘텐츠의 원본 저장소입니다.

현재 운영팀 답변 기준으로 `/home/files`는 로컬 디스크에 저장하고, 외부 NAS로 백업합니다. 복구 시에는 NAS 백업본을 동일 경로(`/home/files`)에 복원한 뒤 Node API 프로세스를 재시작합니다.

복구 절차:

1. 소스 코드 배치
2. `/home/files` 복원
3. 환경변수 복원
4. `npm ci`
5. `npm run build`
6. 관리자 API 재시작
7. Nginx reload
8. 화면 및 관리자 기능 확인

## 16. 장애 대응 가이드

### 홈 화면은 뜨지만 관리자 목록이 비어 있음

- 관리자 API 프로세스 실행 여부 확인
- Nginx `/api/news/` 프록시 확인
- 브라우저 Network 탭에서 `/api/news/shinhan-news`, `/api/news/newsletters` 응답 확인
- `/home/files` 권한 확인

### 관리자 로그인이 안 됨

- `ADMIN_USERNAME`, `ADMIN_PASSWORD` 환경변수 확인
- `NEWS_ADMIN_RUNTIME_MODE=enabled` 확인
- `SESSION_SECRET` 값이 재시작마다 바뀌지 않는지 확인
- HTTPS/도메인 프록시 환경에서 쿠키가 정상 저장되는지 확인

### 업로드 실패

- Nginx `client_max_body_size` 확인
- 관리자 API의 multer 제한은 100MB
- `/home/files` 쓰기 권한 확인
- 소식지 preview ZIP 내부에 `manifest.json`이 있는지 확인

### 새로고침 시 404 발생

- SPA fallback 설정 누락 가능성이 큽니다.
- Nginx `try_files $uri $uri/ /index.html;` 설정 확인

### 무역 동향이 비어 있음

- 정적 운영이면 `/issue-reports.json` 존재 확인
- 실시간 운영이면 `/api/issue-reports` 라우팅 확인
- 외부망 접근 가능 여부 확인
- 한국관세사회/한국무역협회 페이지 구조 변경 여부 확인

## 17. 보안 유의사항

- 운영 관리자 계정은 `.env.local.example`의 기본값을 사용하지 않습니다.
- `SESSION_SECRET`은 충분히 긴 랜덤 문자열로 설정합니다.
- `/admin/*` 접근은 가능하면 사무실 IP 또는 VPN으로 제한하는 것을 권장합니다.
- 업로드 파일 용량 제한을 Nginx와 Node.js 양쪽에서 관리합니다.
- 서버 이전 시 `/home/files`의 파일 권한이 웹 프로세스 사용자에게 쓰기 가능해야 합니다.
- 업로드 파일은 UUID 기반 파일명으로 저장해 원본 파일명을 URL/경로에 직접 노출하지 않습니다.
- 정기적으로 `npm audit` 또는 사내 보안 점검 도구를 통해 의존성 취약점을 확인합니다.

## 18. 개발 명령어

```bash
# 의존성 설치
npm ci

# 로컬 개발 서버: 프론트 4173, 관리자 API 4174 동시 실행
npm run dev

# 프론트만 실행
npm run dev:web

# 관리자 API만 실행
npm run dev:api

# 타입 체크 및 프로덕션 빌드
npm run build

# 빌드 결과 프리뷰
npm run preview
```

## 19. 인수인계 시 전달물

외부 개발팀에 아래 항목을 함께 전달해야 합니다.

- 소스 코드 전체
- `package.json`, `package-lock.json`
- `public/` 전체 대용량 리소스
- 운영 중인 `/home/files` 전체 또는 NAS 백업본
- 운영 환경변수 목록과 실제 값은 별도 보안 채널로 전달
- 도메인/DNS/SSL 인증서 정보
- 서버 접속 정보
- 관리자 계정 정보
- 현재 운영 중인 배포 방식과 프로세스 매니저 설정
- 백업 정책 및 백업 위치

## 20. 담당 개발팀 참고사항

- `api/` 디렉터리는 Vercel 배포용 서버리스 구현입니다. 온프레미스 운영에서는 `server/news-admin-api.ts`를 우선 기준으로 삼습니다.
- `dist/`는 빌드 산출물이므로 소스 수정 후 재생성할 수 있습니다.
- `node_modules/`는 서버 간 이관 대상이 아닙니다. 대상 서버에서 `npm ci`로 재설치합니다.
- 운영 서버에서는 `MANAGED_CONTENT_ROOT=/home/files`를 설정합니다.
- `/home/files`는 이관 및 백업 대상입니다.
- `VITE_` 환경변수는 빌드 결과에 박히므로 운영 중 변경만으로는 반영되지 않습니다.
- 현재 소식지 렌더링 이미지/PDF가 많아 `public/`과 `dist/` 용량이 큽니다. 배포/백업/전송 시간을 고려해야 합니다.
