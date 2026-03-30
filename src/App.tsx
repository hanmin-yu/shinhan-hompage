import { useEffect, useState } from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import koreaMapAsset from './assets/map-korea.svg';
import vietnamMapAsset from './assets/map-vietnam.svg';
type HeaderLink = {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
};

type Member = {
  name: string;
  phone: string;
  email: string;
  title: string;
  department: string;
  practice: string;
  accent: string;
  image?: string;
};

type HeroSlide = {
  label: string;
  image: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
};

type OfficeBranch = {
  id: string;
  label: string;
  shortLabel: string;
  region: string;
  summary: string;
  address: string;
  tel: string;
  fax?: string;
  accent: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
};

const headerLinks: HeaderLink[] = [
  {
    label: '신한소개',
    href: '#about',
    children: [
      { label: '신한소개', href: '#about' },
      { label: '연혁', href: '#history' },
      { label: '신한의 강점', href: '#strength' },
      { label: '오시는 길', href: '#offices' },
    ],
  },
  {
    label: '구성원',
    href: '#members',
    children: [
      { label: '조직도', href: '#members' },
      { label: '분야별 전문가', href: '#members' },
    ],
  },
  {
    label: '업무분야',
    href: '#practice',
  },
  { label: 'IT', href: '#it' },
  {
    label: '소식/자료',
    href: '#news',
    children: [
      { label: '이슈 리포트', href: '#issue-report' },
      { label: '소식지', href: '#news' },
      { label: '세미나', href: '#news' },
      { label: '블로그', href: '#news' },
    ],
  },
];

const members: Member[] = [
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

const utilityLinks = ['Contact Us', '채용', 'KOR', '찾아오시는 길'];

const footerLinks = ['서비스 이용약관', '개인정보처리방침', '면책공고', '이메일무단수집거부'];
const brandMarkPath = '/brand-mark.png';
const apparelHeroAsset = new URL('./assets/4a68c8298f3c035fa15ba27546d15473.jpg', import.meta.url).href;
const semiconductorHeroAsset = new URL('./assets/robotic-arm-placing-chip-circuit-board.jpg', import.meta.url).href;

const heroSlides: HeroSlide[] = [
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

const officeBranches: OfficeBranch[] = [
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
    summary: '인천항과 수도권 제조·유통 기업을 대상으로 수출입통관, 관세환급, 요건 대응을 함께 지원하는 권역 거점입니다.',
    address: '인천항 및 수도권 화주사 대응 거점 운영',
    tel: '032-772-1181',
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
    summary: '국제물류, 창고 운영, 3PL, 내륙운송까지 통관 이후의 물류 실행력을 연결하는 실무형 물류 법인입니다.',
    address: '서울시 강서구 하늘길 210, 김포공항 화물청사 3·6게이트 8-4',
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

const practiceAreaDetails = [
  {
    id: 'practice-import-export',
    title: '수출입통관',
    body: '수입신고와 수출신고, 세번 검토, 요건 확인, 보완 대응까지 통관 전 과정을 안정적으로 설계합니다.',
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
    title: 'FTA',
    body: '원산지 판정, 원산지 확인서, 사후검증 대응까지 FTA 운영 체계를 지원합니다.',
  },
  {
    id: 'practice-aeo',
    title: 'AEO',
    body: 'AEO 준비자료, 내부통제, 심사 대응 항목을 단계별로 정리합니다.',
  },
  {
    id: 'practice-investigation',
    title: '관세조사',
    body: '기업심사, 세관조사, 사후검증 대응 과정에서 필요한 자료 정리와 쟁점 대응을 체계적으로 지원합니다.',
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
    body: '베트남 수출입통관, 현지 규정 변화, 거래 구조 검토 등 해외 현지 실무에 맞춘 자문을 제공합니다.',
  },
  {
    id: 'practice-fda',
    title: '미국 FDA',
    body: '미국 수출 시 필요한 FDA 관련 체크포인트와 준비 서류 흐름을 정리합니다.',
  },
];

const issueReports = [
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

const itServices = [
  {
    category: 'IT',
    title: '통관 관리 시스템 대시보드',
    body: '수입신고, 수출신고, 반출기간, 보완 요청, 관세환급 진행상태를 한 화면에서 추적하고 담당자별 처리 현황을 정리하는 내부 운영형 시스템을 상정한 소개입니다.',
  },
  {
    category: 'IT',
    title: '활용프로그램과 고객 포털 연동',
    body: '반복되는 문의를 줄이기 위해 의뢰 현황, 제출 서류, 세번 검토 상태, FTA 증빙 요청을 고객이 직접 확인할 수 있는 포털 경험까지 포함합니다.',
  },
  {
    category: 'IT',
    title: 'AEO · FTA · FDA 규제 대응 워크플로우',
    body: 'AEO 준비자료, FTA 원산지 검토, 미국 FDA 관련 체크포인트를 체크리스트와 일정 흐름으로 묶어 컨설팅과 운영을 동시에 지원하는 구조를 제안합니다.',
  },
  {
    category: 'IT',
    title: 'Process Innovation 기반 보고 체계',
    body: 'Process Innovation 팀이나 Go To Market 성격의 조직이 활용할 수 있도록 리포트 자동화, 업무 히스토리, 이슈 브리핑 배포 기능까지 포함한 운영 디자인으로 확장할 수 있습니다.',
  },
];

const newsItems = [
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

const GlobalStyle = () => (
  <Global
    styles={{
      ':root': {
        colorScheme: 'light',
        fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontSynthesis: 'none',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      '*': {
        boxSizing: 'border-box',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        margin: 0,
        minWidth: '320px',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        overflowX: 'hidden',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
      button: {
        font: 'inherit',
      },
    }}
  />
);

const Page = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(20, 67, 156, 0.08), transparent 26%),
    linear-gradient(180deg, #f7f9fd 0%, #ffffff 22%, #f7f9fd 100%);
  color: #111111;
`;

const Container = styled.div`
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100%, calc(100% - 28px));
  }
`;

const UtilityBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 26;
  background: linear-gradient(90deg, #0d3f8f, #114ea8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);

  @media (max-width: 768px) {
    display: none;
  }
`;

const UtilityBarInner = styled.div`
  position: relative;
`;

const UtilityInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 40px;
`;

const UtilityBrandBadge = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.96);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  white-space: nowrap;
`;

const UtilityBrandLead = styled.span`
  color: rgba(255, 255, 255, 0.72);
  font-style: italic;
`;

const UtilityBrandName = styled.span`
  font-size: 1.05rem;
  font-weight: 700;
`;

const UtilityLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0;
`;

const UtilityLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    right: 0;
    width: 1px;
    height: 12px;
    background: rgba(255, 255, 255, 0.34);
  }
`;

const Header = styled.header`
  position: sticky;
  top: 40px;
  z-index: 25;
  background: rgba(240, 244, 249, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 10px 28px rgba(18, 48, 102, 0.1);
  backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    top: 0;
    background: rgba(240, 244, 249, 0.92);
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  }
`;

const HeaderInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 96px;

  @media (max-width: 1200px) {
    gap: 16px;
  }

  @media (max-width: 1024px) {
    min-height: 82px;
  }
`;

const MenuArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 96px;
  min-width: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 0 0 auto;
`;

const BrandMark = styled.div`
  width: 56px;
  height: 56px;
  border: 1px solid rgba(17, 78, 168, 0.18);
  border-radius: 12px;
  background: linear-gradient(180deg, #1661c6, #0f4ca5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(17, 78, 168, 0.18);
  overflow: hidden;

  @media (max-width: 768px) {
    border-color: rgba(17, 78, 168, 0.18);
    background: linear-gradient(180deg, #1661c6, #0f4ca5);
    color: #ffffff;
  }
`;

const BrandMarkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const BrandLogo = styled.svg`
  width: 34px;
  height: 34px;
  overflow: visible;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 1100px) {
    gap: 2px;
  }
`;

const BrandTitle = styled.strong`
  font-size: 1.85rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: #103c83;

  @media (max-width: 1100px) {
    font-size: 1.6rem;
  }
`;

const BrandSub = styled.span`
  color: #4e617e;
  font-size: 1rem;

  @media (max-width: 1100px) {
    font-size: 0.92rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.24rem;
  color: #153c7b;

  @media (max-width: 1200px) {
    gap: 10px;
  }

  @media (max-width: 980px) {
    gap: 4px;
  }
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 96px;

  &:hover .nav-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    min-height: 82px;
  }
`;

const NavLink = styled.a<{ hasChildren?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 96px;
  padding: 0 14px;
  position: relative;
  color: #153c7b;
  font-size: 1.24rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  @media (max-width: 1200px) {
    gap: 6px;
    padding: 0 10px;
    font-size: 1.08rem;
  }

  @media (max-width: 1024px) {
    min-height: 82px;
    padding: 0 8px;
    font-size: 0.98rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 18px;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, #114ea8, #2d74dc);
    transform: scaleX(0.35);
    transform-origin: center;
    opacity: 0;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  ${({ hasChildren }) =>
    hasChildren
      ? `
    &::after {
      content: '';
      width: 8px;
      height: 8px;
      margin-top: -2px;
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform: rotate(45deg);
      opacity: 0.65;
    }
  `
      : ''}

  &:hover {
    color: #0f67d0;
    background: rgba(17, 78, 168, 0.06);
  }

  &:hover::before {
    transform: scaleX(1);
    opacity: 1;
  }
`;

const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  width: max-content;
  min-width: 184px;
  max-width: 240px;
  transform: translateX(-50%) translateY(10px);
  padding: 12px 0;
  border-radius: 0 0 18px 18px;
  background: rgba(228, 234, 241, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-top: 0;
  box-shadow: 0 18px 40px rgba(16, 32, 68, 0.12);
  backdrop-filter: blur(18px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s ease;
  z-index: 5;
`;

const NavDropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NavDropdownLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 46px;
  padding: 0 22px;
  color: #5b6c86;
  font-size: 0.98rem;
  line-height: 1.5;
  white-space: nowrap;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    color: #0f67d0;
    background: rgba(255, 255, 255, 0.44);
  }
`;

const HeaderTools = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid rgba(17, 78, 168, 0.16);
  border-radius: 999px;
  color: #ffffff;
  background: linear-gradient(90deg, #1458bb, #0e6ddb);
  box-shadow: 0 12px 24px rgba(16, 84, 177, 0.18);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.03em;

  @media (max-width: 1100px) {
    min-height: 42px;
    padding: 0 15px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    min-height: 38px;
    padding: 0 14px;
    font-size: 0.88rem;
  }
`;

const MobileIconButton = styled.button<{ kind: 'search' | 'menu' }>`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid rgba(23, 59, 132, 0.12);
    border-radius: 50%;
    background: #ffffff;
    position: relative;
    color: #173b84;
    cursor: pointer;
    flex: 0 0 auto;

    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
    }

    ${({ kind }) =>
      kind === 'search'
        ? `
      &::before {
        width: 12px;
        height: 12px;
        border: 2px solid currentColor;
        border-radius: 50%;
        transform: translate(-2px, -2px);
      }

      &::after {
        width: 9px;
        height: 2px;
        background: currentColor;
        transform: translate(7px, 7px) rotate(45deg);
        border-radius: 999px;
      }
    `
        : `
      &::before {
        width: 16px;
        height: 2px;
        background: currentColor;
        border-radius: 999px;
        top: 12px;
        box-shadow: 0 6px 0 currentColor, 0 12px 0 currentColor;
      }
    `}
  }
`;

const MobileMenuOverlay = styled.div<{ open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.52);
    opacity: ${({ open }) => (open ? 1 : 0)};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
    transition:
      opacity 0.22s ease,
      visibility 0.22s ease;
    z-index: 40;
  }
`;

const MobileMenuPanel = styled.aside<{ open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    width: min(88vw, 360px);
    height: 100vh;
    padding: 28px 22px 32px;
    flex-direction: column;
    gap: 22px;
    background: rgba(39, 43, 48, 0.96);
    color: #ffffff;
    transform: translateX(${({ open }) => (open ? '0' : '100%')});
    transition: transform 0.24s ease;
    z-index: 41;
    overflow-y: auto;
  }
`;

const MobileMenuTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MobileMenuTitle = styled.strong`
  font-size: 1.2rem;
  letter-spacing: -0.02em;
`;

const MobileMenuClose = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 50%;
  background: transparent;
  color: #ffffff;
  position: relative;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16px;
    height: 2px;
    background: currentColor;
    border-radius: 999px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const MobileMenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
`;

const MobileMenuMainLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 40px;
  font-size: 1.1rem;
  font-weight: 800;
`;

const MobileMenuSubLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 34px;
  color: rgba(255, 255, 255, 0.74);
  font-size: 0.96rem;
`;

const MobileMenuQuickRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

const MobileMenuQuickLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.92rem;
  font-weight: 700;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  padding: 0;
  margin-top: -136px;

  @media (max-width: 768px) {
    margin-top: -82px;
  }
`;

const HeroFrame = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const HeroBanner = styled.div`
  min-height: clamp(640px, 78vh, 780px);
  padding: 168px 24px 88px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 18%, rgba(52, 104, 185, 0.16), transparent 28%),
    linear-gradient(180deg, #091426 0%, #0c1b32 48%, #122643 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(6, 18, 38, 0.24), rgba(10, 30, 58, 0.08) 28%, rgba(6, 18, 36, 0.28) 100%);
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 1120px) {
    min-height: clamp(620px, 76vh, 720px);
    padding: 160px 24px 76px;
  }

  @media (max-width: 768px) {
    min-height: min(760px, calc(100vh - 24px));
    padding: 150px 18px 74px;
  }

  @media (max-height: 920px) and (min-width: 769px) {
    min-height: clamp(620px, 76vh, 700px);
    padding: 150px 24px 64px;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    min-height: clamp(580px, 74vh, 660px);
    padding: 138px 24px 54px;
  }
`;

const HeroGlow = styled.div`
  display: none;
`;

const HeroContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 168px 24px 88px;
  text-align: center;
  color: #ffffff;

  @media (max-width: 1120px) {
    padding: 160px 24px 76px;
  }

  @media (max-width: 768px) {
    padding: 150px 18px 74px;
  }

  @media (max-height: 920px) and (min-width: 769px) {
    justify-content: flex-start;
    padding: 166px 24px 64px;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    justify-content: flex-start;
    padding: 150px 24px 56px;
  }
`;

const HeroContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 1120px;
  align-items: center;
  padding: 0;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;

  @media (max-width: 768px) {
    padding: 0;
  }

  @media (max-height: 920px) and (min-width: 769px) {
    gap: 20px;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    gap: 16px;
  }
`;

const HeroBackdropLayer = styled.img<{
  active: boolean;
  objectPosition?: string;
  mobileObjectPosition?: string;
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ objectPosition }) => objectPosition ?? 'center'};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: ${({ active }) => (active ? 'scale(1.03)' : 'scale(1.07)')};
  transition:
    opacity 1.2s ease,
    transform 2.4s ease,
    filter 0.8s ease;
  filter: saturate(0.75) contrast(1.04) brightness(0.28) blur(8px);
  z-index: 0;

  @media (max-width: 768px) {
    object-position: ${({ mobileObjectPosition, objectPosition }) => mobileObjectPosition ?? objectPosition ?? 'center'};
  }
`;

const HeroVisualStage = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const HeroBackgroundLayer = styled.img<{
  active: boolean;
  objectPosition?: string;
  mobileObjectPosition?: string;
}>`
  position: relative;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(1400px, calc(100vw - 40px));
  height: min(78vh, 760px);
  object-fit: contain;
  object-position: ${({ objectPosition }) => objectPosition ?? 'center'};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: translate(-50%, -50%) scale(${({ active }) => (active ? 1 : 1.015)});
  transition:
    opacity 1.2s ease,
    transform 2.4s ease;
  z-index: 1;
  filter: saturate(1) contrast(1.02) brightness(0.98);

  @media (max-width: 768px) {
    width: calc(100vw - 24px);
    height: min(60vh, 520px);
    object-position: ${({ mobileObjectPosition, objectPosition }) => mobileObjectPosition ?? objectPosition ?? 'center'};
  }

  @media (max-height: 920px) and (min-width: 769px) {
    width: min(1280px, calc(100vw - 56px));
    height: min(68vh, 640px);
  }

  @media (max-height: 820px) and (min-width: 769px) {
    width: min(1180px, calc(100vw - 72px));
    height: min(62vh, 560px);
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: "Times New Roman", Georgia, serif;
  font-size: clamp(3rem, 5.7vw, 5.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-shadow:
    0 14px 34px rgba(3, 14, 32, 0.48),
    0 2px 10px rgba(3, 14, 32, 0.34);

  @media (max-height: 920px) and (min-width: 769px) {
    font-size: clamp(2.7rem, 4.8vw, 4.7rem);
    line-height: 1.02;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    font-size: clamp(2.3rem, 4.2vw, 4rem);
  }
`;

const HeroBody = styled.p`
  margin: 0;
  max-width: 760px;
  font-size: 1rem;
  line-height: 1.62;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 6px 22px rgba(3, 14, 32, 0.34);

  @media (max-height: 920px) and (min-width: 769px) {
    max-width: 680px;
    font-size: 0.94rem;
    line-height: 1.5;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    max-width: 620px;
    font-size: 0.88rem;
    line-height: 1.42;
  }
`;

const HeroSearch = styled.div`
  width: min(1040px, calc(100vw - 180px));
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 26px 0 30px;
  background: rgba(8, 27, 52, 0.66);
  border: 1px solid rgba(220, 236, 255, 0.26);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: none;
  box-shadow: 0 18px 36px rgba(6, 18, 36, 0.18);

  @media (max-width: 900px) {
    width: 100%;
    min-height: 62px;
    padding: 0 18px;
    gap: 16px;
  }

  @media (max-height: 920px) and (min-width: 769px) {
    width: min(900px, calc(100vw - 240px));
    min-height: 60px;
    gap: 16px;
    padding: 0 22px 0 24px;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    width: min(820px, calc(100vw - 260px));
    min-height: 56px;
    gap: 14px;
    padding: 0 18px 0 20px;
  }
`;

const HeroSearchText = styled.span`
  font-size: clamp(0.95rem, 1.45vw, 1.18rem);
  line-height: 1.45;
  text-align: left;
  color: rgba(255, 255, 255, 0.96);
  text-shadow: 0 2px 10px rgba(4, 18, 38, 0.22);

  @media (max-width: 768px) {
    font-size: 0.92rem;
    line-height: 1.5;
  }

  @media (max-height: 920px) and (min-width: 769px) {
    font-size: clamp(0.88rem, 1.15vw, 1rem);
    line-height: 1.35;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    font-size: 0.88rem;
  }
`;

const HeroSearchIcon = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 50%;
  position: relative;
  flex: 0 0 auto;
  background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 10px 18px rgba(3, 14, 32, 0.16);

  &::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 2.5px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 999px;
    right: 8px;
    bottom: 10px;
    transform: rotate(45deg);
    transform-origin: center;
  }

  &::before {
    content: '';
    position: absolute;
    left: 13px;
    top: 12px;
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.96);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 1px;

    &::after {
      width: 12px;
      height: 2px;
      right: 6px;
      bottom: 8px;
    }

    &::before {
      left: 10px;
      top: 9px;
      width: 14px;
      height: 14px;
      border-width: 2px;
    }
  }

  @media (max-height: 920px) and (min-width: 769px) {
    width: 42px;
    height: 42px;

    &::after {
      width: 12px;
      right: 7px;
      bottom: 8px;
    }

    &::before {
      left: 11px;
      top: 10px;
      width: 14px;
      height: 14px;
    }
  }

  @media (max-height: 820px) and (min-width: 769px) {
    width: 38px;
    height: 38px;

    &::after {
      width: 11px;
      right: 6px;
      bottom: 7px;
    }

    &::before {
      left: 9px;
      top: 8px;
      width: 13px;
      height: 13px;
    }
  }
`;

const ScrollHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.04em;
  position: relative;
  margin-top: -26px;
  z-index: 3;
  font-size: 0.92rem;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-right: 2px solid rgba(255, 255, 255, 0.92);
    border-bottom: 2px solid rgba(255, 255, 255, 0.92);
    position: absolute;
    transform: rotate(45deg);
    top: -10px;
  }

  @media (max-height: 920px) and (min-width: 769px) {
    margin-top: -10px;
    min-height: 32px;
    font-size: 0.84rem;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    display: none;
  }
`;

const QuickMenu = styled.aside`
  position: fixed;
  right: 36px;
  top: 58%;
  transform: translateY(-50%);
  z-index: 16;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92px;
  overflow: hidden;
  border-radius: 34px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(23, 31, 47, 0.18);

  @media (max-width: 1120px) {
    display: none;
  }
`;

const QuickMenuHead = styled.div`
  width: 100%;
  padding: 18px 0 14px;
  background: #2b356d;
  color: #ffffff;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.3;
`;

const QuickMenuBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0 12px;
`;

const QuickMenuItem = styled.a`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 6px;
  color: #222222;
  font-size: 0.82rem;
  text-align: center;
  line-height: 1.35;
`;

const QuickMenuIcon = styled.div<{ kind: 'online' | 'kakao' | 'phone' }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ kind }) =>
    kind === 'online'
      ? 'linear-gradient(180deg, #eff6ff, #d9e7ff)'
      : kind === 'kakao'
        ? 'linear-gradient(180deg, #fff4b8, #ffe04f)'
        : 'linear-gradient(180deg, #eaf4ff, #c8ddff)'};
  border: 1px solid
    ${({ kind }) => (kind === 'kakao' ? 'rgba(170, 130, 0, 0.2)' : 'rgba(23, 59, 132, 0.14)')};
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
  }

  ${({ kind }) =>
    kind === 'online'
      ? `
    &::before {
      left: 11px;
      top: 12px;
      width: 20px;
      height: 14px;
      border: 2px solid #173b84;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.9);
    }

    &::after {
      left: 16px;
      top: 29px;
      width: 10px;
      height: 2px;
      background: #173b84;
      box-shadow: 0 -5px 0 #173b84;
    }
  `
      : kind === 'kakao'
        ? `
    &::before {
      left: 10px;
      top: 11px;
      width: 24px;
      height: 18px;
      border-radius: 10px;
      background: #402000;
    }

    &::after {
      left: 16px;
      top: 27px;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 7px solid #402000;
      transform: rotate(18deg);
    }
  `
        : `
    &::before {
      left: 14px;
      top: 10px;
      width: 16px;
      height: 16px;
      border: 3px solid #173b84;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom-color: transparent;
      transform: rotate(45deg);
    }

    &::after {
      left: 19px;
      top: 23px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #173b84;
    }
  `}
`;

const HeroSearchLink = styled.a`
  width: 100%;
  display: block;
`;

const PracticeShowcaseSection = styled.section`
  position: relative;
  padding: 108px 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 20%, rgba(26, 82, 165, 0.11), transparent 18%),
    radial-gradient(circle at 14% 78%, rgba(27, 102, 201, 0.06), transparent 18%),
    linear-gradient(180deg, rgba(246, 249, 253, 0.96), rgba(255, 255, 255, 0.98)),
    #ffffff;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent, rgba(27, 102, 201, 0.08), transparent);
    top: 46px;
    bottom: auto;
    height: 1px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: -90px;
    bottom: -40px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(27, 102, 201, 0.08), transparent 68%);
  }

  @media (max-width: 768px) {
    padding: 64px 0;
  }
`;

const PracticeShowcaseInner = styled(Container)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const PracticeShowcaseHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 34px 32px;
  color: #143c79;
  max-width: 360px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(19, 63, 139, 0.1);
  border-top: 2px solid #1b66c9;
  box-shadow: 0 16px 34px rgba(19, 55, 109, 0.08);

  @media (max-width: 768px) {
    max-width: none;
    padding: 24px 22px;
    border-radius: 22px;
  }
`;

const PracticeShowcaseEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #8ea0bb;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 32px;
    height: 1px;
    background: rgba(27, 102, 201, 0.28);
  }
`;

const PracticeShowcaseMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;

const PracticeShowcaseMetaCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 88px;
  padding: 16px 18px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(248, 251, 255, 0.98), rgba(242, 247, 253, 0.98));
  border: 1px solid rgba(20, 60, 121, 0.07);
`;

const PracticeShowcaseMetaValue = styled.strong`
  font-size: 1.5rem;
  line-height: 1;
  color: #143c79;
`;

const PracticeShowcaseMetaLabel = styled.span`
  color: rgba(20, 60, 121, 0.68);
  font-size: 0.9rem;
  line-height: 1.45;
`;

const PracticeShowcaseTitle = styled.h2`
  margin: 0;
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  color: #143c79;
`;

const PracticeShowcaseBody = styled.p`
  margin: 0;
  color: rgba(20, 60, 121, 0.72);
  font-size: 1.08rem;
  line-height: 1.7;
`;

const PracticeDetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 0.92fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const PracticeColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1080px) {
    gap: 14px;
  }
`;

const PracticeDetailCard = styled.article`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
  min-height: 168px;
  padding: 26px 26px 24px;
  color: #143c79;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 253, 0.98));
  border: 1px solid rgba(20, 60, 121, 0.1);
  box-shadow: 0 14px 28px rgba(19, 55, 109, 0.06);
  position: relative;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;

  &::before {
    content: '';
    position: absolute;
    left: 26px;
    top: 0;
    width: 56px;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, #1b66c9, #7aa8dd);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 36px rgba(19, 55, 109, 0.09);
    border-color: rgba(27, 102, 201, 0.18);
  }

  &:hover .practice-arrow {
    transform: translateX(6px);
    color: #ffffff;
    background: linear-gradient(135deg, #1b66c9, #3f88e7);
    border-color: transparent;
  }

  @media (max-width: 1080px) {
    min-height: auto;
    padding: 24px 22px 22px;
  }
`;

const PracticeDetailTitle = styled.strong`
  display: block;
  margin-bottom: 12px;
  font-size: 1.18rem;
  line-height: 1.2;
  color: #143c79;
`;

const PracticeDetailText = styled.p`
  margin: 0;
  color: rgba(20, 60, 121, 0.68);
  line-height: 1.68;
  max-width: 372px;
`;

const PracticeDetailArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(20, 60, 121, 0.14);
  background: rgba(245, 248, 253, 0.96);
  color: rgba(20, 60, 121, 0.82);
  font-size: 1.55rem;
  line-height: 1;
  flex: 0 0 auto;
  transition:
    transform 0.24s ease,
    color 0.24s ease,
    background-color 0.24s ease,
    border-color 0.24s ease;
`;

const LandingSection = styled.section`
  position: relative;
  padding: 108px 0;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &[id='about'] {
    background:
      linear-gradient(180deg, rgba(247, 250, 255, 0.96), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='about']::before {
    top: 40px;
    right: -80px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(80, 127, 198, 0.12), transparent 68%);
  }

  &[id='issue-report'] {
    background:
      linear-gradient(180deg, rgba(247, 249, 252, 0.96), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='issue-report']::before {
    left: -60px;
    top: 90px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(4, 50, 90, 0.08), transparent 70%);
  }

  &[id='members'] {
    background:
      linear-gradient(180deg, rgba(248, 250, 254, 0.98), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='members']::before {
    left: 0;
    right: 0;
    top: 48px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(27, 102, 201, 0.18), transparent);
  }

  &[id='members']::after {
    right: -120px;
    bottom: -60px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(27, 102, 201, 0.08), transparent 68%);
  }

  &[id='it'] {
    background:
      radial-gradient(circle at 82% 20%, rgba(26, 82, 165, 0.14), transparent 18%),
      linear-gradient(180deg, rgba(243, 247, 253, 0.94), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='news'] {
    background:
      linear-gradient(180deg, rgba(249, 251, 255, 0.96), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='news']::before {
    right: 6%;
    top: 56px;
    width: 180px;
    height: 180px;
    border-radius: 24px;
    background:
      linear-gradient(135deg, rgba(27, 102, 201, 0.08), rgba(27, 102, 201, 0.02)),
      transparent;
    transform: rotate(16deg);
  }

  &[id='offices'] {
    background:
      linear-gradient(180deg, rgba(245, 248, 252, 0.95), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  @media (max-width: 768px) {
    padding: 64px 0;
  }
`;

const LandingSectionInner = styled(Container)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const SectionAnchor = styled.div`
  position: relative;
  top: -148px;
  height: 0;
  visibility: hidden;

  @media (max-width: 768px) {
    top: -92px;
  }
`;

const LandingSectionTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LandingLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #b6b6b6;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.36em;

  &::after {
    content: '';
    width: 120px;
    height: 1px;
    background: #bcbcbc;
  }
`;

const LandingTitle = styled.h2`
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 3.75rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: #111111;
`;

const LandingLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid rgba(4, 50, 90, 0.24);
  color: #04325a;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.58);
  backdrop-filter: blur(10px);
`;

const IssueReportCarousel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const IssueCard = styled.article`
  display: grid;
  grid-template-columns: minmax(280px, 38%) minmax(0, 1fr);
  gap: 36px;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const IssueImage = styled.div<{ image: string }>`
  min-height: 420px;
  border-radius: 0;
  background:
    linear-gradient(180deg, rgba(7, 17, 30, 0.06), rgba(7, 17, 30, 0.18)),
    url(${({ image }) => image});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    min-height: 240px;
  }
`;

const IssueBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  padding-right: 8px;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const IssueMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  color: #47648f;
  font-size: 0.92rem;
  font-weight: 700;
`;

const IssueMetaDivider = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(71, 100, 143, 0.42);
`;

const IssueHeadline = styled.h3`
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  line-height: 1.38;
  letter-spacing: -0.04em;
  color: #1b1b1b;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const IssueText = styled.p`
  margin: 0;
  color: #797979;
  font-size: 1.08rem;
  line-height: 1.72;
`;

const DividerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const DividerLine = styled.span`
  display: block;
  flex: 1;
  height: 1px;
  background: #bcbcbc;
`;

const RelatedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RelatedItem = styled.a`
  color: #797979;
  font-size: 1.02rem;
  line-height: 1.55;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid #bcbcbc;
  color: #8a8a8a;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
`;

const IssueSliderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const IssueDots = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IssueDot = styled.button<{ active: boolean }>`
  width: ${({ active }) => (active ? '34px' : '10px')};
  height: 10px;
  border: 0;
  border-radius: 999px;
  background: ${({ active }) => (active ? '#04325a' : 'rgba(4, 50, 90, 0.18)')};
  cursor: pointer;
  transition: all 0.22s ease;
`;

const IssueArrows = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ArrowButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid rgba(4, 50, 90, 0.18);
  background: #ffffff;
  color: #04325a;
  border-radius: 50%;
  cursor: pointer;
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MembersOverviewCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: 100%;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(19, 63, 139, 0.12);
  border-top: 2px solid #1b66c9;
  backdrop-filter: blur(12px);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 36px rgba(19, 63, 139, 0.1);
  }

  @media (max-width: 768px) {
    min-height: auto;
  }
`;

const MemberVisual = styled.div<{ accent: string }>`
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 24px 20px;
  position: relative;
  background:
    radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.95), rgba(242, 246, 252, 0.98) 60%, rgba(229, 237, 248, 0.92) 100%),
    linear-gradient(160deg, ${({ accent }) => accent}, #eef3fa 88%);

  &::after {
    content: '';
    position: absolute;
    inset: auto 18px 12px auto;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.44), transparent 70%);
  }

  @media (max-width: 768px) {
    min-height: 180px;
  }
`;

const MemberBadge = styled.span<{ image?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background:
    ${({ image }) => (image ? `url(${image}) center/cover no-repeat,` : '')}
    radial-gradient(circle at 48% 32%, rgba(255, 255, 255, 0.95), rgba(209, 216, 226, 0.96) 72%, rgba(164, 172, 184, 0.94) 100%);
  border: 1px solid rgba(116, 128, 146, 0.22);
  color: #31455f;
  font-weight: 800;
  font-size: 2.2rem;
  box-shadow: inset 0 -10px 18px rgba(91, 102, 122, 0.12);
  overflow: hidden;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 26px 24px 30px;

  @media (max-width: 768px) {
    padding: 20px 20px 24px;
  }
`;

const MemberIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CaseFeatured = styled.article`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 34px 30px;
  min-height: 320px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02)),
    linear-gradient(180deg, #0f2d63, #10254b);
  color: #ffffff;
  border: 1px solid rgba(19, 63, 139, 0.1);
  box-shadow: 0 20px 40px rgba(15, 26, 52, 0.06);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 46px rgba(15, 26, 52, 0.1);
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 28px 22px;
  }
`;

const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const CaseMeta = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const CaseCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(19, 63, 139, 0.1);
  box-shadow: 0 18px 36px rgba(15, 26, 52, 0.05);
  backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CaseCategory = styled.span`
  color: inherit;
  font-size: 0.9rem;
  font-weight: 700;
`;

const CardHeadline = styled.h3`
  margin: 0;
  font-size: 1.34rem;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #111111;
`;

const DarkCardHeadline = styled(CardHeadline)`
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.24);
`;

const CardText = styled.p`
  margin: 0;
  color: #797979;
  line-height: 1.78;
`;

const DarkCardText = styled(CardText)`
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.22);
`;

const MemberContact = styled.p`
  margin: 0;
  color: #536070;
  font-size: 0.98rem;
  line-height: 1.65;
  word-break: break-word;
`;

const MemberSectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const MemberSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MemberSectionTitle = styled.strong`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #3d4a5c;
  font-size: 0.95rem;
  font-weight: 800;

  &::before {
    content: '';
    width: 44px;
    height: 3px;
    background: #1b66c9;
  }
`;

const MemberSectionBody = styled.p`
  margin: 0;
  color: #556273;
  line-height: 1.65;
`;

const NewsletterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const NewsletterCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 30px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.66), rgba(242, 246, 252, 0.66)),
    rgba(255, 255, 255, 0.36);
  border: 1px solid rgba(19, 63, 139, 0.1);
  backdrop-filter: blur(12px);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 40px rgba(19, 63, 139, 0.09);
  }

  @media (max-width: 768px) {
    padding: 22px 20px;
  }
`;

const NewsletterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const MemberName = styled.strong`
  font-size: 1.2rem;
`;

const OfficesSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const OfficesSelectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const OfficesSelectorButton = styled.button<{ active: boolean }>`
  min-height: 54px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid ${({ active }) => (active ? 'transparent' : 'rgba(19, 63, 139, 0.14)')};
  background: ${({ active }) =>
    active
      ? 'linear-gradient(90deg, #144e9f, #1b66c9)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(242, 246, 251, 0.88))'};
  color: ${({ active }) => (active ? '#ffffff' : '#30507c')};
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: ${({ active }) =>
    active ? '0 16px 30px rgba(20, 78, 159, 0.22)' : '0 8px 20px rgba(19, 63, 139, 0.05)'};
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    background 0.22s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OfficesContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(320px, 0.96fr);
  gap: 24px;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const OfficesFeatureCard = styled.article<{ accent: string }>`
  position: relative;
  overflow: hidden;
  padding: 34px 34px 30px;
  border-radius: 32px;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.22), transparent 24%),
    linear-gradient(180deg, ${({ accent }) => accent}, #10284c 82%);
  color: #ffffff;
  box-shadow: 0 24px 60px rgba(11, 24, 43, 0.16);

  &::before {
    content: '';
    position: absolute;
    inset: auto -6% -34% auto;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.24), transparent 68%);
  }

  @media (max-width: 768px) {
    padding: 28px 22px 24px;
    border-radius: 24px;
  }
`;

const OfficesFeatureTop = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OfficesBadge = styled.span`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const OfficesFeatureTitle = styled.h3`
  margin: 0;
  font-size: clamp(2rem, 3.6vw, 3rem);
  line-height: 1.14;
  letter-spacing: -0.04em;
`;

const OfficesFeatureBody = styled.p`
  margin: 0;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.08rem;
  line-height: 1.72;
`;

const OfficesFactsGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 26px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const OfficesFactCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 110px;
  padding: 18px 18px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
`;

const OfficesFactLabel = styled.span`
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const OfficesFactValue = styled.strong`
  font-size: 1.08rem;
  line-height: 1.6;
  color: #ffffff;
  word-break: break-word;
`;

const OfficesMapCard = styled.aside`
  position: relative;
  overflow: hidden;
  padding: 26px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(243, 247, 252, 0.94)),
    rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(19, 63, 139, 0.1);
  box-shadow: 0 20px 44px rgba(19, 63, 139, 0.08);
  backdrop-filter: blur(16px);
`;

const OfficesMapHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
`;

const OfficesMapTitle = styled.strong`
  font-size: 1.24rem;
  color: #163d77;
`;

const OfficesMapBody = styled.p`
  margin: 0;
  color: #60708a;
  line-height: 1.65;
`;

const OfficesMiniMap = styled.div`
  position: relative;
  min-height: 420px;
  border-radius: 24px;
  background: linear-gradient(180deg, #f7fbff, #eef4fb);
  border: 1px solid rgba(19, 63, 139, 0.08);
  overflow: hidden;
`;

const OfficesMiniMapKoreaZone = styled.div`
  position: absolute;
  inset: 5% 20% 6% 6%;
`;

const OfficesMiniMapKoreaImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  opacity: 0.58;
  filter: saturate(0.48) brightness(1.02) contrast(0.92);
`;

const OfficesMiniMapVietnamZone = styled.div`
  position: absolute;
  right: 5%;
  bottom: 6%;
  width: 21%;
  height: 36%;
  padding: 12px 12px 12px;
  border-radius: 26px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(243, 248, 253, 0.9)),
    rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(20, 60, 121, 0.08);
  box-shadow: 0 18px 34px rgba(29, 63, 114, 0.08);
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 68px;
    background: linear-gradient(180deg, rgba(33, 72, 128, 0.08), rgba(33, 72, 128, 0));
    pointer-events: none;
  }
`;

const OfficesMiniMapInsetLabel = styled.span`
  position: absolute;
  left: 14px;
  top: 10px;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #214880;
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  z-index: 2;
`;

const OfficesMiniMapVietnamImage = styled.img`
  position: absolute;
  inset: 16% 16% 22%;
  width: auto;
  height: auto;
  max-width: calc(100% - 32%);
  max-height: calc(100% - 38%);
  object-fit: contain;
  object-position: center;
  opacity: 0.72;
  filter: saturate(0.56) brightness(1.02) contrast(0.94);
`;

const OfficesMapLines = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
`;

const OfficesMapAnchor = styled.button<{ x: number; y: number; active: boolean; accent: string }>`
  position: absolute;
  left: ${({ x }) => `${x}%`};
  top: ${({ y }) => `${y}%`};
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
`;

const OfficesMapAnchorDot = styled.span<{ active: boolean; accent: string }>`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ active, accent }) => (active ? accent : '#2e6dcc')};
  box-shadow:
    0 0 0 6px rgba(255, 255, 255, 0.82),
    0 10px 18px rgba(20, 60, 121, 0.14);
`;

const OfficesMapLabel = styled.button<{ x: number; y: number; active: boolean; accent: string }>`
  position: absolute;
  left: ${({ x }) => `${x}%`};
  top: ${({ y }) => `${y}%`};
  transform: translate(-50%, -50%);
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: ${({ active, accent }) =>
    active ? `linear-gradient(180deg, ${accent}, #3f74b7)` : 'rgba(255, 255, 255, 0.88)'};
  color: ${({ active }) => (active ? '#ffffff' : '#36557e')};
  font-size: 0.88rem;
  font-weight: 800;
  box-shadow: ${({ active }) =>
    active ? '0 12px 24px rgba(41, 86, 145, 0.18)' : '0 8px 16px rgba(19, 63, 139, 0.06)'};
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: translate(-50%, calc(-50% - 1px));
  }
`;

const OfficesMapLabelDot = styled.span<{ active: boolean; accent: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active, accent }) => (active ? 'rgba(255, 255, 255, 0.94)' : accent)};
  flex: 0 0 auto;
`;

const OfficesMapInsetLabelButton = styled(OfficesMapLabel)`
  min-height: 34px;
  padding: 0 12px;
  font-size: 0.82rem;
  box-shadow: 0 10px 18px rgba(19, 63, 139, 0.1);
`;

const OfficesMiniMapInsetMeta = styled.div`
  position: absolute;
  left: 16px;
  bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
`;

const OfficesMiniMapInsetTitle = styled.span`
  color: #6c7c95;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const OfficesMiniMapInsetCity = styled.span`
  color: #123b75;
  font-size: 1.08rem;
  font-weight: 800;
`;

const OfficesMapHint = styled.p`
  margin: 16px 0 0;
  color: #6c7c95;
  font-size: 0.92rem;
  line-height: 1.6;
`;

const Footer = styled.footer`
  position: relative;
  background:
    radial-gradient(circle at top right, rgba(58, 89, 138, 0.18), transparent 18%),
    linear-gradient(180deg, #22252b, #1c1e23);
  color: rgba(255, 255, 255, 0.82);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.03), transparent 24%, transparent 76%, rgba(255, 255, 255, 0.02)),
      linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.02));
    pointer-events: none;
  }
`;

const FooterInner = styled(Container)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 46px 0 54px;
`;

const FooterTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const FooterBrandWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FooterBrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FooterBrandTitle = styled.strong`
  font-size: 2rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: #ffffff;
`;

const FooterBrandSub = styled.span`
  color: rgba(255, 255, 255, 0.66);
  font-size: 1rem;
`;

const FooterPolicyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const FooterPolicyLink = styled.a`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.98rem;
  font-weight: 700;
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLine = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.8;
`;

const FooterLabel = styled.strong`
  color: #ffffff;
  font-weight: 800;
`;

const FooterCopyright = styled.p`
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.44);
  font-size: 0.98rem;
  letter-spacing: 0.02em;
`;

function App() {
  const [activeIssue, setActiveIssue] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedOfficeId, setSelectedOfficeId] = useState(officeBranches[0].id);
  const [brandMarkMissing, setBrandMarkMissing] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIssue((prev) => (prev + 1) % issueReports.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6200);

    return () => window.clearInterval(timer);
  }, []);

  const currentIssue = issueReports[activeIssue];
  const selectedOffice = officeBranches.find((office) => office.id === selectedOfficeId) ?? officeBranches[0];
  const domesticOffices = officeBranches.filter((office) => office.id !== 'vietnam');
  const vietnamOffice = officeBranches.find((office) => office.id === 'vietnam');
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const brandMarkNode = !brandMarkMissing ? (
    <BrandMarkImage
      src={brandMarkPath}
      alt="신한관세법인 로고"
      onError={() => setBrandMarkMissing(true)}
    />
  ) : (
    <BrandLogo viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="white" />
      <path d="M32 10L49 37H15L32 10Z" fill="#1661C6" />
      <rect x="28" y="28" width="8" height="18" rx="2" fill="white" />
      <path d="M8 56H56" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </BrandLogo>
  );

  return (
    <>
      <GlobalStyle />
      <Page>
        <UtilityBar>
          <UtilityBarInner>
            <UtilityBrandBadge aria-label="Established 1965 SHINHAN Customs Service Inc.">
              <UtilityBrandLead>Established 1965</UtilityBrandLead>
              <UtilityBrandName>SHINHAN Customs Service Inc.</UtilityBrandName>
            </UtilityBrandBadge>
            <UtilityInner>
              <UtilityLinks>
                {utilityLinks.map((label) => (
                  <UtilityLink key={label} href="#top">
                    {label}
                  </UtilityLink>
                ))}
              </UtilityLinks>
            </UtilityInner>
          </UtilityBarInner>
        </UtilityBar>

        <Header>
          <HeaderInner>
            <Brand href="#top">
              <BrandMark aria-hidden="true">{brandMarkNode}</BrandMark>
              <BrandText>
                <BrandTitle>SHINHAN</BrandTitle>
                <BrandSub>신한 관세법인</BrandSub>
              </BrandText>
            </Brand>

            <MenuArea>
              <Nav>
                {headerLinks.map((item) => (
                  <NavItem key={item.label}>
                    <NavLink href={item.href} hasChildren={Boolean(item.children?.length)}>
                      {item.label}
                    </NavLink>
                    {item.children ? (
                      <NavDropdown className="nav-dropdown">
                        <NavDropdownList>
                          {item.children.map((child) => (
                            <NavDropdownLink key={child.label} href={child.href}>
                              {child.label}
                            </NavDropdownLink>
                          ))}
                        </NavDropdownList>
                      </NavDropdown>
                    ) : null}
                  </NavItem>
                ))}
              </Nav>
            </MenuArea>

            <HeaderTools>
              <ContactButton href="#offices">02-3448-1181</ContactButton>
              <MobileIconButton type="button" kind="search" aria-label="검색" />
              <MobileIconButton
                type="button"
                kind="menu"
                aria-label="메뉴"
                onClick={() => setMobileMenuOpen(true)}
              />
            </HeaderTools>
          </HeaderInner>
        </Header>

        <MobileMenuOverlay open={mobileMenuOpen} onClick={closeMobileMenu} />
        <MobileMenuPanel open={mobileMenuOpen} aria-hidden={!mobileMenuOpen}>
          <MobileMenuTop>
            <MobileMenuTitle>전체 메뉴</MobileMenuTitle>
            <MobileMenuClose type="button" aria-label="메뉴 닫기" onClick={closeMobileMenu} />
          </MobileMenuTop>

          {headerLinks.map((item) => (
            <MobileMenuSection key={item.label}>
              <MobileMenuMainLink href={item.href} onClick={closeMobileMenu}>
                {item.label}
              </MobileMenuMainLink>
              {item.children?.map((child) => (
                <MobileMenuSubLink key={child.label} href={child.href} onClick={closeMobileMenu}>
                  {child.label}
                </MobileMenuSubLink>
              ))}
            </MobileMenuSection>
          ))}

          <MobileMenuQuickRow>
            <MobileMenuQuickLink href="#offices" onClick={closeMobileMenu}>
              상담접수
            </MobileMenuQuickLink>
            <MobileMenuQuickLink href="#issue-report" onClick={closeMobileMenu}>
              이슈 리포트
            </MobileMenuQuickLink>
            <MobileMenuQuickLink href="#members" onClick={closeMobileMenu}>
              구성원
            </MobileMenuQuickLink>
            <MobileMenuQuickLink href="#it" onClick={closeMobileMenu}>
              IT
            </MobileMenuQuickLink>
            <MobileMenuQuickLink href="#offices" onClick={closeMobileMenu}>
              오시는 길
            </MobileMenuQuickLink>
          </MobileMenuQuickRow>
        </MobileMenuPanel>

        <Main id="top">
          <HeroSection>
            <HeroFrame>
              <HeroBanner>
                {heroSlides.map((slide, index) => (
                  <HeroBackdropLayer
                    key={`${slide.label}-backdrop`}
                    src={slide.image}
                    alt=""
                    active={activeHeroSlide === index}
                    objectPosition={slide.objectPosition}
                    mobileObjectPosition={slide.mobileObjectPosition}
                    aria-hidden="true"
                  />
                ))}
                <HeroVisualStage aria-hidden="true">
                  {heroSlides.map((slide, index) => (
                    <HeroBackgroundLayer
                      key={slide.label}
                      src={slide.image}
                      alt=""
                      active={activeHeroSlide === index}
                      objectPosition={slide.objectPosition}
                      mobileObjectPosition={slide.mobileObjectPosition}
                    />
                  ))}
                </HeroVisualStage>
                <HeroGlow />
                <HeroContent>
                  <HeroContentPanel>
                    <HeroTitle>
                      WE MAKE THE DIFFERENCE
                      <br />
                      FOR YOUR SUCCESSFUL BUSINESS
                    </HeroTitle>
                    <HeroBody>
                      신한관세법인은 국내외 수출입통관 및 분야별 관세·무역 컨설팅, 물류서비스까지 All-in-One
                      Service를 제공합니다.
                    </HeroBody>
                    <HeroSearchLink href="#news">
                      <HeroSearch>
                        <HeroSearchText>관세, 원산지, 통상분쟁, 인증 이슈를 검색해보세요</HeroSearchText>
                        <HeroSearchIcon />
                      </HeroSearch>
                    </HeroSearchLink>
                  </HeroContentPanel>
                </HeroContent>
              </HeroBanner>
              <ScrollHint>scroll</ScrollHint>
            </HeroFrame>
          </HeroSection>

          <QuickMenu aria-label="빠른 메뉴">
            <QuickMenuHead>
              QUICK
              <br />
              MENU
            </QuickMenuHead>
            <QuickMenuBody>
              <QuickMenuItem href="#offices">
                <QuickMenuIcon kind="online" />
                온라인 상담
              </QuickMenuItem>
              <QuickMenuItem href="#offices">
                <QuickMenuIcon kind="kakao" />
                카톡상담
              </QuickMenuItem>
              <QuickMenuItem href="#offices">
                <QuickMenuIcon kind="phone" />
                전화상담
              </QuickMenuItem>
            </QuickMenuBody>
          </QuickMenu>

          <SectionAnchor id="about" />
          <PracticeShowcaseSection id="practice">
            <PracticeShowcaseInner>
              <PracticeDetailGrid>
                <PracticeShowcaseHeader>
                  <PracticeShowcaseEyebrow>Practice Areas</PracticeShowcaseEyebrow>
                  <PracticeShowcaseTitle>업무분야</PracticeShowcaseTitle>
                  <PracticeShowcaseBody>
                    신한관세법인의 핵심 업무를 중심으로 수출입통관, 환급, FTA, AEO, 미국 FDA, IT 연계 서비스까지
                    한 번에 안내하는 소개 영역입니다.
                  </PracticeShowcaseBody>
                  <PracticeShowcaseMeta>
                    <PracticeShowcaseMetaCard>
                      <PracticeShowcaseMetaValue>10+</PracticeShowcaseMetaValue>
                      <PracticeShowcaseMetaLabel>핵심 자문 분야를 한 화면에 정리</PracticeShowcaseMetaLabel>
                    </PracticeShowcaseMetaCard>
                    <PracticeShowcaseMetaCard>
                      <PracticeShowcaseMetaValue>All-in-One</PracticeShowcaseMetaValue>
                      <PracticeShowcaseMetaLabel>통관, FTA, 환급, IT 연계 서비스</PracticeShowcaseMetaLabel>
                    </PracticeShowcaseMetaCard>
                  </PracticeShowcaseMeta>
                </PracticeShowcaseHeader>

                {[practiceAreaDetails.slice(0, 5), practiceAreaDetails.slice(5)].map((column, columnIndex) => (
                  <PracticeColumn key={columnIndex}>
                    {column.map((item) => (
                      <PracticeDetailCard key={item.title} id={item.id}>
                        <div>
                          <PracticeDetailTitle>{item.title}</PracticeDetailTitle>
                          <PracticeDetailText>{item.body}</PracticeDetailText>
                        </div>
                        <PracticeDetailArrow className="practice-arrow">→</PracticeDetailArrow>
                      </PracticeDetailCard>
                    ))}
                  </PracticeColumn>
                ))}
              </PracticeDetailGrid>
            </PracticeShowcaseInner>
          </PracticeShowcaseSection>

          <LandingSection id="issue-report">
            <LandingSectionInner>
              <LandingSectionTop>
                <div>
                  <LandingLabel>ISSUE REPORT</LandingLabel>
                  <LandingTitle>이슈 리포트</LandingTitle>
                </div>
                <LandingLink href="#news">더보기</LandingLink>
              </LandingSectionTop>

              <IssueReportCarousel>
                <IssueCard>
                  <IssueImage image={currentIssue.image} />
                  <IssueBody>
                    <div>
                      <IssueMeta>
                        <span>{currentIssue.source}</span>
                        <IssueMetaDivider />
                        <span>{currentIssue.date}</span>
                      </IssueMeta>
                      <IssueHeadline>{currentIssue.title}</IssueHeadline>
                      <IssueText>{currentIssue.body}</IssueText>
                    </div>
                    <DividerRow>
                      <DividerLine />
                      <LandingLink href="#news">더보기</LandingLink>
                    </DividerRow>
                    <RelatedList>
                      {currentIssue.related.map((item) => (
                        <RelatedItem key={item} href="#news">
                          {item}
                        </RelatedItem>
                      ))}
                    </RelatedList>
                    <DividerLine />
                    <TagRow>
                      {currentIssue.tags.map((tag) => (
                        <TagChip key={tag}>{tag}</TagChip>
                      ))}
                    </TagRow>
                  </IssueBody>
                </IssueCard>

                <IssueSliderNav>
                  <IssueDots>
                    {issueReports.map((report, index) => (
                      <IssueDot
                        key={report.title}
                        type="button"
                        active={activeIssue === index}
                        onClick={() => setActiveIssue(index)}
                        aria-label={`${index + 1}번 이슈 리포트`}
                      />
                    ))}
                  </IssueDots>
                  <IssueArrows>
                    <ArrowButton
                      type="button"
                      onClick={() => setActiveIssue((activeIssue - 1 + issueReports.length) % issueReports.length)}
                      aria-label="이전 리포트"
                    >
                      ←
                    </ArrowButton>
                    <ArrowButton
                      type="button"
                      onClick={() => setActiveIssue((activeIssue + 1) % issueReports.length)}
                      aria-label="다음 리포트"
                    >
                      →
                    </ArrowButton>
                  </IssueArrows>
                </IssueSliderNav>
              </IssueReportCarousel>
            </LandingSectionInner>
          </LandingSection>

          <LandingSection id="members">
            <LandingSectionInner>
              <LandingSectionTop>
                <div>
                  <LandingLabel>MEMBERS</LandingLabel>
                  <LandingTitle>구성원</LandingTitle>
                </div>
                <LandingLink href="#members">구성원 더보기</LandingLink>
              </LandingSectionTop>

              <MembersGrid>
                {members.map((member) => (
                  <MembersOverviewCard key={member.name}>
                    <MemberVisual accent={member.accent}>
                      <MemberBadge image={member.image}>{member.image ? '' : member.name.slice(0, 1)}</MemberBadge>
                    </MemberVisual>
                    <MemberInfo>
                      <MemberIntro>
                        <MemberName>{member.name}</MemberName>
                        <MemberContact>T. {member.phone}</MemberContact>
                        <MemberContact>{member.email}</MemberContact>
                      </MemberIntro>
                      <MemberSectionList>
                        <MemberSection>
                          <MemberSectionTitle>직책</MemberSectionTitle>
                          <MemberSectionBody>{member.title}</MemberSectionBody>
                        </MemberSection>
                        <MemberSection>
                          <MemberSectionTitle>소속</MemberSectionTitle>
                          <MemberSectionBody>{member.department}</MemberSectionBody>
                        </MemberSection>
                        <MemberSection>
                          <MemberSectionTitle>업무분야</MemberSectionTitle>
                          <MemberSectionBody>{member.practice}</MemberSectionBody>
                        </MemberSection>
                      </MemberSectionList>
                    </MemberInfo>
                  </MembersOverviewCard>
                ))}
              </MembersGrid>
            </LandingSectionInner>
          </LandingSection>

          <LandingSection id="it">
            <LandingSectionInner>
              <LandingSectionTop>
                <div>
                  <LandingLabel>IT</LandingLabel>
                  <LandingTitle>IT</LandingTitle>
                </div>
                <LandingLink href="#it">IT 더보기</LandingLink>
              </LandingSectionTop>

              <CaseGrid>
                <CaseFeatured>
                  <CaseCategory>{itServices[0].category}</CaseCategory>
                  <CaseMeta>통관 운영 / 고객 포털 / 실무 자동화</CaseMeta>
                  <DarkCardHeadline>{itServices[0].title}</DarkCardHeadline>
                  <DarkCardText>{itServices[0].body}</DarkCardText>
                  <LandingLink href="#it">IT 상세보기</LandingLink>
                </CaseFeatured>
                <CaseList>
                  {itServices.slice(1).map((item) => (
                    <CaseCard key={item.title}>
                      <CaseCategory style={{ color: '#04325a' }}>{item.category}</CaseCategory>
                      <CardHeadline>{item.title}</CardHeadline>
                      <CardText>{item.body}</CardText>
                    </CaseCard>
                  ))}
                </CaseList>
              </CaseGrid>
            </LandingSectionInner>
          </LandingSection>

          <LandingSection id="news">
            <LandingSectionInner>
              <LandingSectionTop>
                <div>
                  <LandingLabel>NEWS & RESOURCES</LandingLabel>
                  <LandingTitle>소식 / 자료</LandingTitle>
                </div>
                <LandingLink href="#news">소식 더보기</LandingLink>
              </LandingSectionTop>

              <NewsletterGrid>
                <NewsletterCard>
                  <CaseCategory style={{ color: '#04325a' }}>{newsItems[0].category}</CaseCategory>
                  <CardHeadline>{newsItems[0].title}</CardHeadline>
                  <CardText>{newsItems[0].body}</CardText>
                  <LandingLink href="#news">자료 보기</LandingLink>
                </NewsletterCard>
                <NewsletterList>
                  {newsItems.slice(1).map((item) => (
                    <NewsletterCard key={item.title}>
                      <CaseCategory style={{ color: '#04325a' }}>{item.category}</CaseCategory>
                      <CardHeadline>{item.title}</CardHeadline>
                      <CardText>{item.body}</CardText>
                    </NewsletterCard>
                  ))}
                </NewsletterList>
              </NewsletterGrid>
            </LandingSectionInner>
          </LandingSection>

          <LandingSection id="offices">
            <LandingSectionInner>
              <LandingSectionTop>
                <div>
                  <LandingLabel>OFFICES</LandingLabel>
                  <LandingTitle>사무소 전체보기</LandingTitle>
                </div>
                <LandingLink href="#offices">오시는 길</LandingLink>
              </LandingSectionTop>

              <OfficesSectionLayout>
                <OfficesSelectorGrid>
                  {officeBranches.map((office) => (
                    <OfficesSelectorButton
                      key={office.id}
                      type="button"
                      active={selectedOffice.id === office.id}
                      onClick={() => setSelectedOfficeId(office.id)}
                    >
                      {office.label}
                    </OfficesSelectorButton>
                  ))}
                </OfficesSelectorGrid>

                <OfficesContentGrid>
                  <OfficesFeatureCard accent={selectedOffice.accent}>
                    <OfficesFeatureTop>
                      <OfficesBadge>{selectedOffice.region}</OfficesBadge>
                      <OfficesFeatureTitle>{selectedOffice.label}</OfficesFeatureTitle>
                      <OfficesFeatureBody>{selectedOffice.summary}</OfficesFeatureBody>
                    </OfficesFeatureTop>

                    <OfficesFactsGrid>
                      <OfficesFactCard>
                        <OfficesFactLabel>Address</OfficesFactLabel>
                        <OfficesFactValue>{selectedOffice.address}</OfficesFactValue>
                      </OfficesFactCard>
                      <OfficesFactCard>
                        <OfficesFactLabel>Contact</OfficesFactLabel>
                        <OfficesFactValue>TEL. {selectedOffice.tel}</OfficesFactValue>
                        {selectedOffice.fax ? <OfficesFactValue>FAX. {selectedOffice.fax}</OfficesFactValue> : null}
                      </OfficesFactCard>
                    </OfficesFactsGrid>
                  </OfficesFeatureCard>

                  <OfficesMapCard>
                    <OfficesMapHeader>
                      <OfficesMapTitle>지사 미니맵</OfficesMapTitle>
                      <OfficesMapBody>
                        국내 지사와 베트남 법인을 한눈에 확인하고, 각 라벨을 눌러 상세 정보를 볼 수 있습니다.
                      </OfficesMapBody>
                    </OfficesMapHeader>

                    <OfficesMiniMap>
                      <OfficesMiniMapKoreaZone>
                        <OfficesMiniMapKoreaImage src={koreaMapAsset} alt="대한민국 지사 지도" />
                        <OfficesMapLines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                          {domesticOffices.map((office) => (
                            <line
                              key={office.id}
                              x1={office.x}
                              y1={office.y}
                              x2={office.labelX}
                              y2={office.labelY}
                              stroke={
                                selectedOffice.id === office.id ? 'rgba(54, 92, 146, 0.36)' : 'rgba(54, 92, 146, 0.18)'
                              }
                              strokeWidth={selectedOffice.id === office.id ? 0.7 : 0.45}
                              strokeLinecap="round"
                            />
                          ))}
                        </OfficesMapLines>
                        {domesticOffices.map((office) => (
                          <OfficesMapAnchor
                            key={office.id}
                            type="button"
                            active={selectedOffice.id === office.id}
                            accent={office.accent}
                            x={office.x}
                            y={office.y}
                            onClick={() => setSelectedOfficeId(office.id)}
                            aria-label={`${office.label} 보기`}
                          >
                            <OfficesMapAnchorDot
                              active={selectedOffice.id === office.id}
                              accent={office.accent}
                            />
                          </OfficesMapAnchor>
                        ))}
                        {domesticOffices.map((office) => (
                          <OfficesMapLabel
                            key={`${office.id}-label`}
                            type="button"
                            x={office.labelX}
                            y={office.labelY}
                            active={selectedOffice.id === office.id}
                            accent={office.accent}
                            onClick={() => setSelectedOfficeId(office.id)}
                            aria-label={`${office.label} 보기`}
                          >
                            <OfficesMapLabelDot
                              active={selectedOffice.id === office.id}
                              accent={office.accent}
                            />
                            {office.shortLabel}
                          </OfficesMapLabel>
                        ))}
                      </OfficesMiniMapKoreaZone>

                      {vietnamOffice ? (
                        <OfficesMiniMapVietnamZone>
                          <OfficesMiniMapInsetLabel>베트남 법인</OfficesMiniMapInsetLabel>
                          <OfficesMiniMapVietnamImage src={vietnamMapAsset} alt="베트남 법인 지도" />
                          <OfficesMiniMapInsetMeta>
                            <OfficesMiniMapInsetTitle>Vietnam Office</OfficesMiniMapInsetTitle>
                            <OfficesMiniMapInsetCity>Hanoi</OfficesMiniMapInsetCity>
                          </OfficesMiniMapInsetMeta>
                          <OfficesMapLines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <line
                              x1={vietnamOffice.x}
                              y1={vietnamOffice.y}
                              x2={vietnamOffice.labelX}
                              y2={vietnamOffice.labelY}
                              stroke={
                                selectedOffice.id === vietnamOffice.id
                                  ? 'rgba(54, 92, 146, 0.34)'
                                  : 'rgba(54, 92, 146, 0.18)'
                              }
                              strokeWidth={selectedOffice.id === vietnamOffice.id ? 0.9 : 0.6}
                              strokeLinecap="round"
                            />
                          </OfficesMapLines>
                          <OfficesMapAnchor
                            type="button"
                            active={selectedOffice.id === vietnamOffice.id}
                            accent={vietnamOffice.accent}
                            x={vietnamOffice.x}
                            y={vietnamOffice.y}
                            onClick={() => setSelectedOfficeId(vietnamOffice.id)}
                            aria-label={`${vietnamOffice.label} 보기`}
                          >
                            <OfficesMapAnchorDot
                              active={selectedOffice.id === vietnamOffice.id}
                              accent={vietnamOffice.accent}
                            />
                          </OfficesMapAnchor>
                          <OfficesMapInsetLabelButton
                            type="button"
                            x={vietnamOffice.labelX}
                            y={vietnamOffice.labelY}
                            active={selectedOffice.id === vietnamOffice.id}
                            accent={vietnamOffice.accent}
                            onClick={() => setSelectedOfficeId(vietnamOffice.id)}
                            aria-label={`${vietnamOffice.label} 보기`}
                          >
                            <OfficesMapLabelDot
                              active={selectedOffice.id === vietnamOffice.id}
                              accent={vietnamOffice.accent}
                            />
                            {vietnamOffice.shortLabel}
                          </OfficesMapInsetLabelButton>
                        </OfficesMiniMapVietnamZone>
                      ) : null}
                    </OfficesMiniMap>

                    <OfficesMapHint>
                      선택 지사: <strong>{selectedOffice.label}</strong> · {selectedOffice.region}
                    </OfficesMapHint>
                  </OfficesMapCard>
                </OfficesContentGrid>
              </OfficesSectionLayout>
            </LandingSectionInner>
          </LandingSection>
        </Main>

        <Footer>
          <FooterInner>
            <FooterTop>
              <FooterBrandWrap>
                <BrandMark aria-hidden="true">{brandMarkNode}</BrandMark>
                <FooterBrandText>
                  <FooterBrandTitle>SHINHAN</FooterBrandTitle>
                  <FooterBrandSub>신한관세법인</FooterBrandSub>
                </FooterBrandText>
              </FooterBrandWrap>
            </FooterTop>

            <FooterPolicyRow>
              {footerLinks.map((item) => (
                <FooterPolicyLink key={item} href="#top">
                  {item}
                </FooterPolicyLink>
              ))}
            </FooterPolicyRow>

            <FooterInfo>
              <FooterLine>
                <FooterLabel>주소</FooterLabel> 서울시 강남구 논현로 704
              </FooterLine>
              <FooterLine>
                <FooterLabel>T.</FooterLabel> 02-3448-1181 | <FooterLabel>E.</FooterLabel> shinhan@shcs.kr
              </FooterLine>
              <FooterLine>
                <FooterLabel>사업자등록번호</FooterLabel> 211-86-05953
              </FooterLine>
              <FooterCopyright>COPYRIGHT © 신한관세법인 ALL RIGHTS RESERVED.</FooterCopyright>
            </FooterInfo>
          </FooterInner>
        </Footer>
      </Page>
    </>
  );
}

export default App;
