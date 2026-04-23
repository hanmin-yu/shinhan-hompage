import type {
  HeroSlide,
  IssueReport,
  ItService,
  LinkItem,
  Member,
  NewsItem,
  OfficeBranch,
  PracticeAreaDetail,
} from '../types/site';

const apparelHeroAsset = new URL('../assets/4a68c8298f3c035fa15ba27546d15473.jpg', import.meta.url).href;
const semiconductorHeroAsset = new URL(
  '../assets/robotic-arm-placing-chip-circuit-board.jpg',
  import.meta.url,
).href;

export const brandMarkPath = '/brand-mark.png';

export const utilityLinks: LinkItem[] = [
  { id: 'kor', label: 'KOR', href: '/' },
  { id: 'directions', label: '찾아오시는 길', href: '/about/location' },
];

export const footerLinks: LinkItem[] = [
  { id: 'terms', label: '서비스 이용약관', href: '/contact' },
  { id: 'privacy', label: '개인정보처리방침', href: '/contact' },
  { id: 'disclaimer', label: '면책공고', href: '/contact' },
  { id: 'email-protection', label: '이메일무단수집거부', href: '/contact' },
];

export const siteContact = {
  phone: '02-3448-1181',
  email: 'shinhan@shcs.kr',
  address: '서울시 강남구 논현로 704',
  businessNumber: '211-86-05953',
};

export const heroSlides: HeroSlide[] = [
  {
    label: '반도체',
    image: semiconductorHeroAsset,
    objectPosition: 'center 52%',
    mobileObjectPosition: '56% center',
  },
  {
    label: '자동차 부품',
    image: '/hero/auto-parts.jpg',
    objectPosition: 'center 46%',
    mobileObjectPosition: '62% center',
  },
  {
    label: '의류',
    image: apparelHeroAsset,
    objectPosition: 'center 48%',
    mobileObjectPosition: '54% center',
  },
  {
    label: '제약',
    image: '/hero/pharma.jpg',
    objectPosition: 'center 42%',
    mobileObjectPosition: '58% center',
  },
  {
    label: '부산항',
    image: '/hero/busan-port.jpg',
    objectPosition: 'center 44%',
    mobileObjectPosition: '58% center',
  },
];

export const members: Member[] = [
  {
    name: '장승희',
    phone: '02-542-1181',
    email: 'vision@shcs.kr',
    title: '대표이사 / 관세사',
    department: '신한관세법인',
    practice: '기업심사, 조사 대응, 수출입 통관 총괄',
    accent: '#526f9e',
    image: '/members/jang.png',
  },
  {
    name: '서영진',
    phone: '070-4343-7714',
    email: 'wedin8@shcs.kr',
    title: '부대표 / 관세사',
    department: '서울본사 컨설팅본부',
    practice: '기업심사 및 조사, 외환, FTA 자문',
    accent: '#7486a0',
    image: '/members/seo.png',
  },
  {
    name: '최대규',
    phone: '070-4343-7751',
    email: 'dkchoi@shcs.kr',
    title: '상무 / 관세사 자격 / 미국공인회계사',
    department: '서울본사 컨설팅본부',
    practice: 'FTA 컨설팅, 베트남 관세 및 재고관리',
    accent: '#4e6987',
    image: '/members/choi.png',
  },
  {
    name: '전무열',
    phone: '070-4343-7783',
    email: 'myzeon@shcs.kr',
    title: '본부장 / 지사장 / 관세사',
    department: '서울본사 통관본부 / 인천경기지사',
    practice: '기업심사 및 외환, FTA 지원',
    accent: '#637ca1',
    image: '/members/jeon.png',
  },
];

export const officeBranches: OfficeBranch[] = [
  {
    id: 'seoul',
    label: '서울본사',
    shortLabel: '본사',
    region: '서울 강남',
    summary: '컨설팅본부와 통관본부를 중심으로 전국 화주사 대응, 기업심사, 조사 대응, FTA 및 통관 자문을 총괄하는 메인 허브입니다.',
    address: '서울시 강남구 논현로 704',
    tel: '02-542-1181',
    fax: '02-540-2323',
    accent: '#1c4f96',
    x: 34,
    y: 30,
    labelX: 12,
    labelY: 31,
  },
  {
    id: 'airport',
    label: '인천공항지사',
    shortLabel: '공항',
    region: '인천공항 물류권역',
    summary: '항공 화물 중심의 수출입통관, 긴급 통관, 공항 물류 연계 대응에 강점을 가진 현장 밀착형 지사입니다.',
    address: '인천광역시 중구 공항동로 295번길 77-11, 217호',
    tel: '032-744-9961~2',
    fax: '032-744-9960',
    accent: '#2f78bf',
    x: 28,
    y: 23,
    labelX: 61,
    labelY: 18,
  },
  {
    id: 'incheon',
    label: '인천경기지사',
    shortLabel: '경기',
    region: '인천항 · 수도권',
    summary:
      '인천항과 수도권 제조·유통 기업을 대상으로 수출입통관, 관세환급, 요건 대응을 함께 지원하는 권역 거점입니다.',
    address: '인천광역시 연수구 인천타워대로 301, A동 906호',
    tel: '032-772-1181',
    fax: '032-773-1181',
    accent: '#3c6ca8',
    x: 27,
    y: 31,
    labelX: 12,
    labelY: 43,
  },
  {
    id: 'busan',
    label: '부산지사',
    shortLabel: '부산',
    region: '부산항',
    summary: '해상 수출입통관과 항만 물류 흐름에 강점을 가진 남부권 핵심 지사로, 부산항 기반 고객 대응을 빠르게 수행합니다.',
    address: '부산광역시 중구 충장대로 9번길 11 미광빌딩 501호',
    tel: '051-463-1181',
    fax: '051-465-1181',
    accent: '#0f5a8f',
    x: 58,
    y: 66,
    labelX: 72,
    labelY: 72,
  },
  {
    id: 'cheongju',
    label: '청주지사',
    shortLabel: '청주',
    region: '충북 내륙권',
    summary: '청주·충북 지역 제조기업의 통관, 검역/요건, 환급 업무를 밀착 지원하는 중부권 실무 거점입니다.',
    address: '충청북도 청주시 흥덕구 직지대로 530, 1동 청주테크노 S타워 2층 216호, 221호',
    tel: '043-273-3160~1',
    fax: '043-273-3162',
    accent: '#5a7fb2',
    x: 43,
    y: 46,
    labelX: 14,
    labelY: 57,
  },
  {
    id: 'gumi',
    label: '구미지사',
    shortLabel: '구미',
    region: '경북 산업벨트',
    summary: '전자·부품 제조업체가 밀집한 경북권 고객사를 대상으로 수출입통관과 기업 맞춤형 현장 대응을 지원합니다.',
    address: '경상북도 구미시 1공단로 182 금오빌딩 504호',
    tel: '054-464-1133',
    fax: '054-464-1131',
    accent: '#4a73a2',
    x: 53,
    y: 50,
    labelX: 74,
    labelY: 51,
  },
  {
    id: 'invista',
    label: '신한인비스타',
    shortLabel: '인비스타',
    region: '김포공항 물류권역',
    summary:
      '국제물류, 창고 운영, 3PL, 내륙운송까지 통관 이후의 물류 실행력을 연결하는 실무형 물류 법인입니다.',
    address: '서울시 강서구 하늘길 210 김포국제공항 화물청사 8-4 3,6게이트',
    tel: '02-2663-1181',
    fax: '02-2665-9114',
    accent: '#2f689b',
    x: 24,
    y: 21,
    labelX: 12,
    labelY: 14,
  },
  {
    id: 'vietnam',
    label: '신한 베트남 관세법인',
    shortLabel: '베트남',
    region: '하노이',
    summary: '베트남 현지 통관 규정 대응, 해외 법인 운영 지원, 수출입 구조 검토까지 연결하는 해외 현지 법인입니다.',
    address: '5F, Star Tower, Duong Dinh Nghe street, Cau Giay New Urban Area, Yen Hoa Ward, Cau Giay District, Hanoi city, Vietnam',
    tel: '+84-(0)24-7300-8630',
    accent: '#2f84ae',
    x: 54,
    y: 40,
    labelX: 58,
    labelY: 104,
  },
  {
    id: 'kord',
    label: 'KORD Partners',
    shortLabel: 'KORD',
    region: '서울 강남',
    summary: '관세·통관 프로젝트와 연계되는 전문 파트너 조직으로, 협업형 자문과 운영 지원 기능을 담당합니다.',
    address: '서울시 강남구 논현로 704',
    tel: '070-4343-7791',
    fax: '02-3448-1184',
    accent: '#365c92',
    x: 37,
    y: 33,
    labelX: 63,
    labelY: 35,
  },
];

export const practiceAreaDetails: PracticeAreaDetail[] = [
  {
    id: 'practice-import-export',
    title: '수출입통관',
    body: 'PI·CI 기반 SOP 최적화와 iOOM 시스템으로 신고부터 사후관리까지 통관 전 과정을 정밀하게 운영합니다.',
  },
  {
    id: 'practice-refund',
    title: '환급',
    body: '관세환급 가능 항목 검토부터 증빙 준비, 신청 절차, 사후 관리까지 실무 흐름에 맞춰 지원합니다.',
  },
  {
    id: 'practice-quarantine',
    title: '검역/요건',
    body: '품목별 검역, 인증, 수입요건을 사전에 점검해 통관 지연과 보완 리스크를 줄입니다.',
  },
  {
    id: 'practice-fta',
    title: '원산지/FTA',
    body: '특혜 원산지(FTA)와 일반 원산지(비특혜)를 구분 관리해 관세 절감과 규정 준수 안정성을 함께 확보합니다.',
  },
  {
    id: 'practice-aeo',
    title: 'AEO',
    body: '신규 공인·갱신·사후관리·등급조정까지 AEO 운영 전 주기를 실무형으로 지원합니다.',
  },
  {
    id: 'practice-investigation',
    title: '관세조사/범칙조사',
    body: '정기·비정기 조사 대응과 범칙 리스크 관리까지 조사 단계별 쟁점 정리와 대응 전략을 제공합니다.',
  },
  {
    id: 'practice-it',
    title: 'IT',
    body: '통관 관리 시스템, 고객 포털, 업무 대시보드로 관세 실무를 디지털화합니다.',
  },
  {
    id: 'practice-logistics',
    title: '물류',
    body: '반출기간 관리, 보관 이슈, 운송 흐름 점검까지 통관과 연결되는 물류 리스크를 함께 관리합니다.',
  },
  {
    id: 'practice-vietnam',
    title: '베트남',
    body: '하노이 현지 법인 기반으로 통관, 수책관리, FTA, 심사 대응, 상시자문을 통합 지원합니다.',
  },
  {
    id: 'practice-fda',
    title: '미국 FDA',
    body: '미국 수출 시 필요한 FDA 관련 체크포인트와 준비 서류 흐름을 정리합니다.',
  },
];

export const issueReports: IssueReport[] = [
  {
    source: '신한관세법인 매거진',
    date: '2026.02.04',
    title: '2026년, 신기술과 빠른 투자의 시대에 관세도 함께 검토하자',
    body: 'AI, 자동화, 첨단 장비 투자처럼 기술 의사결정이 빨라질수록 HS 분류, 감면 요건, 수입 신고 구조를 함께 검토해야 비용과 일정 리스크를 줄일 수 있다는 흐름을 보여주는 게시물입니다.',
    image: 'https://d1tgonli21s4df.cloudfront.net/main_new/insight_PC1.webp',
    related: ['출처: 신한관세법인 매거진', '키워드: 신기술 투자 · 관세 검토'],
    tags: ['관세검토', '신기술', '투자'],
  },
  {
    source: '신한관세법인 매거진',
    date: '2026.02.04',
    title: '반도체 조립용 기계의 HS CODE 분류 사례',
    body: '반도체 장비처럼 사양과 용도에 따라 세번 판단이 갈리는 품목은 초기 분류가 전체 세율, 통관 일정, 사후 리스크에 직접 연결되기 때문에 실무형 검토 체계를 강조하는 사례입니다.',
    image: 'https://d1tgonli21s4df.cloudfront.net/main_new/insight_PC2.webp',
    related: ['출처: 논리로 푸는 HS 사례', '키워드: 반도체 · HS CODE'],
    tags: ['HS CODE', '반도체', '품목분류'],
  },
  {
    source: '신한관세법인 매거진',
    date: '2026.02.04',
    title: '베트남 수출입통관절차 시행규칙 개정안 공표',
    body: '베트남 현지 통관 규정 변화는 신고 준비 서류, 심사 흐름, 현지 파트너 대응 방식까지 바꾸기 때문에 해외 현지 관세 컨설팅 역량을 함께 보여주기 좋은 주제입니다.',
    image: 'https://d1tgonli21s4df.cloudfront.net/main_new/insight_PC1.webp',
    related: ['출처: Global Customs Insight', '키워드: 베트남 · 해외통관'],
    tags: ['베트남', '해외통관', '규정개정'],
  },
  {
    source: '신한관세법인 매거진',
    date: '2026.02.04',
    title: '수입화물 반출기간 관련 실무',
    body: '반출기간 관리와 보관 리스크는 현장 운영과 물류비에 바로 영향을 주기 때문에, 알림과 일정 관리가 가능한 통관 관리 시스템의 필요성을 설명하기에 적합한 실무형 이슈입니다.',
    image: 'https://d1tgonli21s4df.cloudfront.net/main_new/insight_PC2.webp',
    related: ['출처: FTA 및 수출입 실무 안내', '키워드: 반출기간 · 물류관리'],
    tags: ['반출기간', '물류', '수입실무'],
  },
];

export const itServices: ItService[] = [
  {
    category: 'IT',
    title: '통관·신고 시스템 개발 및 운영',
    body: '수출입 신고 자동화, 신고필증 데이터 처리, 관세청 연계 인터페이스까지 관세 실무 중심으로 직접 구축·운영합니다.',
  },
  {
    category: 'IT',
    title: 'iOOM / iOOM Q 기반 업무 자동화',
    body: '외부 고객용 iOOM, 내부 업무 효율화용 iOOM Q를 통해 반복 업무를 줄이고 처리 정확도와 속도를 높입니다.',
  },
  {
    category: 'IT',
    title: 'KORD FTA / KORD LIQ 솔루션',
    body: '베트남 원산지관리(KORD FTA), 면세재고·수책관리(KORD LIQ)로 현지 통관과 FTA 운영을 데이터 기반으로 지원합니다.',
  },
  {
    category: 'IT',
    title: '맞춤형 연동·데이터 분석·인프라 관리',
    body: '고객사 시스템 연동, 데이터 수집·분석, 네트워크/보안 인프라 관리까지 통합해 실무 운영 안정성을 강화합니다.',
  },
];

export const newsItems: NewsItem[] = [
  {
    category: '소식지',
    title: '원산지 검증 대응 레터',
    body: '실무 담당자가 준비해야 할 증빙 자료와 자주 반복되는 오류 포인트를 담았습니다.',
  },
  {
    category: '블로그',
    title: '관세 실무 인사이트 아카이브',
    body: '현장에서 자주 마주치는 통관, 품목분류, 원산지 검토 이슈를 이해하기 쉽게 정리한 콘텐츠를 모았습니다.',
  },
  {
    category: '세미나',
    title: '인증·검역 이슈 리포트',
    body: '식품, 소비재, 의료기기 수입 단계에서 반복되는 규제 이슈를 보기 쉽게 정리했습니다.',
  },
];
