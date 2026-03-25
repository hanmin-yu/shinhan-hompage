import { useEffect, useState } from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
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
  { label: 'IT', href: '#it' },
  { label: '업무분야', href: '#practice' },
  {
    label: '구성원',
    href: '#members',
    children: [
      { label: '조직도', href: '#members' },
      { label: '분야별 전문가', href: '#members' },
    ],
  },
  {
    label: '소식/자료',
    href: '#news',
    children: [
      { label: '최근 관세동향', href: '#news' },
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

const officeCities = ['본사', '부산', '공항', '경기', '인비스타', '코드파트너스', '시스템즈', '베트남'];

const utilityLinks = ['Contact Us', '채용', 'KOR', '찾아오시는 길'];

const footerLinks = ['서비스 이용약관', '개인정보처리방침', '면책공고', '이메일무단수집거부'];
const brandMarkPath = '/brand-mark.png';

const practiceAreaDetails = [
  {
    title: '수입통관',
    body: '수입신고, 세번 검토, 요건 확인, 보완 대응까지 수입 프로세스를 안정적으로 설계합니다.',
  },
  {
    title: '관세',
    body: '세율 적용, 과세가격 검토, 관세평가 이슈를 실무 흐름에 맞춰 자문합니다.',
  },
  {
    title: '검역 요건',
    body: '품목별 검역, 인증, 수입요건을 사전에 점검해 통관 지연과 보완 리스크를 줄입니다.',
  },
  {
    title: 'FTA',
    body: '원산지 판정, 원산지 확인서, 사후검증 대응까지 FTA 운영 체계를 지원합니다.',
  },
  {
    title: 'AEO',
    body: 'AEO 준비자료, 내부통제, 심사 대응 항목을 단계별로 정리합니다.',
  },
  {
    title: '관세환급',
    body: '환급 가능 항목 검토와 서류 준비, 사후 관리까지 연결합니다.',
  },
  {
    title: 'IT',
    body: '통관 관리 시스템, 고객 포털, 업무 대시보드로 관세 실무를 디지털화합니다.',
  },
  {
    title: '관세사 연관사업',
    body: '연관 자문과 협업 서비스를 통해 실무 범위를 넓히는 확장형 구조입니다.',
  },
  {
    title: '비즈니스',
    body: '해외 진출, 운영 구조, 거래 흐름에 맞춘 수출입 비즈니스 자문을 제공합니다.',
  },
  {
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
    category: '최신 동향',
    title: '3월 관세·통상 브리핑',
    body: '최근 통상 정책과 수입 규제, 통관 단계에서 주의해야 할 핵심 쟁점을 한 번에 요약합니다.',
  },
  {
    category: '소식지',
    title: '원산지 검증 대응 레터',
    body: '실무 담당자가 준비해야 할 증빙 자료와 자주 반복되는 오류 포인트를 담았습니다.',
  },
  {
    category: '세미나',
    title: '인증·검역 이슈 리포트',
    body: '식품, 소비재, 의료기기 수입 단계에서 반복되는 규제 이슈를 보기 쉽게 정리했습니다.',
  },
];

const stats = [
  { label: '월간 사건수임건수', value: '1,200 +', note: '* 2026년 1월 변호사협회 경유증표 발급 기준' },
  { label: '주요 구성원', value: '290 +', note: '* 변호사 · 관세사 · 외국변호사' },
  { label: '업무협약/자문 체결기업수', value: '420 +', note: '* 2025년 6월까지 기준' },
  { label: '전 세계 사무소', value: '30 +', note: '* 국내외 협업 네트워크 포함' },
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

const UtilityInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0;
  min-height: 40px;
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
  background: rgba(233, 238, 244, 0.26);
  border-bottom: 1px solid rgba(255, 255, 255, 0.24);
  box-shadow: 0 10px 28px rgba(18, 48, 102, 0.05);
  backdrop-filter: blur(14px);

  @media (max-width: 768px) {
    top: 0;
    background: rgba(233, 238, 244, 0.22);
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  }
`;

const HeaderInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 96px;

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

  @media (max-width: 1120px) {
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
`;

const BrandTitle = styled.strong`
  font-size: 1.85rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: #103c83;
`;

const BrandSub = styled.span`
  color: #4e617e;
  font-size: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 38px;
  font-size: 1.08rem;
  color: #153c7b;
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 96px;

  &:hover .nav-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const NavLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 96px;
  color: #153c7b;
  font-weight: 700;
  transition: color 0.2s ease;

  &:hover {
    color: #0f67d0;
  }
`;

const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 8px);
  min-width: 200px;
  padding: 14px 0;
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
  gap: 6px;
`;

const NavDropdownLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0 20px;
  color: #5b6c86;
  font-size: 0.98rem;
  line-height: 1.5;
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
  gap: 8px;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(17, 78, 168, 0.2);
  border-radius: 999px;
  font-size: 0.96rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #1458bb, #0e6ddb);
  box-shadow: 0 12px 24px rgba(16, 84, 177, 0.2);

  @media (max-width: 768px) {
    min-height: 38px;
    padding: 0 14px;
    border-color: rgba(17, 78, 168, 0.18);
    color: #ffffff;
    background: linear-gradient(90deg, #1458bb, #0e6ddb);
    font-size: 0.88rem;
  }
`;

const ToolLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 12px;
  border-radius: 999px;
  color: #60708a;
  font-size: 0.94rem;

  @media (max-width: 768px) {
    color: #586274;
  }

  @media (max-width: 768px) {
    display: none;
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
  min-height: min(920px, calc(100vh + 40px));
  background:
    linear-gradient(180deg, rgba(8, 8, 8, 0.16), rgba(8, 8, 8, 0.08) 24%, rgba(8, 14, 26, 0.22) 100%),
    linear-gradient(180deg, rgba(128, 147, 173, 0.18), rgba(55, 45, 55, 0.42) 100%),
    url('https://d1tgonli21s4df.cloudfront.net/main_new/bg1.webp');
  background-size: cover, cover, cover;
  background-position: center, center, center bottom;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 232px 24px 118px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    height: auto;
    background:
      linear-gradient(180deg, rgba(82, 87, 95, 0.12), rgba(82, 87, 95, 0.1) 20%, rgba(255, 255, 255, 0.04) 34%, rgba(18, 30, 54, 0.16) 100%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 26%, rgba(255, 255, 255, 0.36), transparent 24%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(8, 16, 30, 0.06));
    pointer-events: none;
  }

  @media (max-width: 1120px) {
    min-height: min(820px, calc(100vh + 20px));
  }

  @media (max-width: 768px) {
    min-height: calc(100vh + 20px);
    padding: 154px 18px 92px;
    background-position: center, center, 60% bottom;
  }
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 138px 50% auto auto;
  width: 1080px;
  height: 360px;
  transform: translateX(50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.56), rgba(223, 234, 250, 0.2) 54%, transparent 74%);
  filter: blur(24px);
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  max-width: 1240px;
  margin: 0 auto;
  text-align: center;
  color: #0f1728;
`;

const HeroContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 0;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: "Times New Roman", Georgia, serif;
  font-size: clamp(3rem, 5.7vw, 5.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

const HeroBody = styled.p`
  margin: 0;
  max-width: 820px;
  font-size: 1.08rem;
  line-height: 1.72;
  color: rgba(255, 255, 255, 0.82);
`;

const HeroSearch = styled.div`
  width: min(1040px, calc(100vw - 180px));
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 30px 0 34px;
  background: rgba(16, 39, 54, 0.4);
  border: 1px solid rgba(189, 189, 189, 0.72);
  color: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(6px);

  @media (max-width: 900px) {
    width: 100%;
    min-height: 68px;
    padding: 0 20px;
    gap: 18px;
  }
`;

const HeroSearchText = styled.span`
  font-size: clamp(1rem, 2vw, 1.75rem);
  line-height: 1.4;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.96rem;
    line-height: 1.5;
  }
`;

const HeroSearchIcon = styled.div`
  width: 66px;
  height: 66px;
  border: 3px solid rgba(255, 255, 255, 0.96);
  border-radius: 50%;
  position: relative;
  flex: 0 0 auto;

  &::after {
    content: '';
    position: absolute;
    width: 26px;
    height: 4px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 999px;
    right: -12px;
    bottom: 6px;
    transform: rotate(45deg);
    transform-origin: center;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    border-width: 2px;

    &::after {
      width: 16px;
      height: 3px;
      right: -8px;
      bottom: 4px;
    }
  }
`;

const ScrollHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.04em;
  position: relative;
  margin-top: -76px;
  z-index: 3;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-right: 2px solid rgba(255, 255, 255, 0.92);
    border-bottom: 2px solid rgba(255, 255, 255, 0.92);
    position: absolute;
    transform: rotate(45deg);
    top: -14px;
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
    radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.36), transparent 26%),
    radial-gradient(circle at 86% 18%, rgba(135, 175, 224, 0.24), transparent 24%),
    linear-gradient(180deg, rgba(219, 229, 241, 0.94), rgba(202, 216, 233, 0.92)),
    linear-gradient(120deg, rgba(255, 255, 255, 0.3), transparent 42%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.44), transparent 42%),
      linear-gradient(320deg, rgba(21, 60, 123, 0.08), transparent 38%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: -6%;
    bottom: -18%;
    width: 34%;
    height: 48%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(239, 244, 249, 0.18));
    clip-path: polygon(0 32%, 100% 100%, 0 100%);
    opacity: 0.7;
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
  gap: 46px;
`;

const PracticeShowcaseHeader = styled.div`
  color: #143c79;
  max-width: 340px;
`;

const PracticeShowcaseTitle = styled.h2`
  margin: 0;
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  color: #143c79;
`;

const PracticeShowcaseBody = styled.p`
  margin: 18px 0 0;
  max-width: 320px;
  color: rgba(20, 60, 121, 0.78);
  font-size: 1.08rem;
  line-height: 1.7;
`;

const PracticeDetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 0 46px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const PracticeColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border-left: 1px solid rgba(20, 60, 121, 0.16);

  @media (max-width: 1080px) {
    border-left: 0;
    border-top: 1px solid rgba(20, 60, 121, 0.14);
  }
`;

const PracticeDetailCard = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 98px;
  padding: 0 0 0 44px;
  color: #143c79;
  border-bottom: 1px solid rgba(20, 60, 121, 0.12);
  transition:
    background-color 0.24s ease,
    transform 0.24s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.34);
    transform: translateX(6px);
  }

  &:hover .practice-arrow {
    transform: translateX(10px);
    color: #0f67d0;
  }

  @media (max-width: 1080px) {
    padding: 22px 0;
  }
`;

const PracticeDetailTitle = styled.strong`
  font-size: 1.18rem;
  line-height: 1.2;
  color: #143c79;
`;

const PracticeDetailText = styled.p`
  margin: 0;
  color: rgba(20, 60, 121, 0.72);
  line-height: 1.6;
  max-width: 360px;
`;

const PracticeDetailArrow = styled.span`
  color: rgba(20, 60, 121, 0.8);
  font-size: 1.9rem;
  line-height: 1;
  flex: 0 0 auto;
  transition:
    transform 0.24s ease,
    color 0.24s ease;
`;

const StatsSection = styled.section`
  position: relative;
  padding: 64px 0 24px;
  margin-top: -6px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(225, 233, 244, 0.78), rgba(255, 255, 255, 0.92)),
      url('https://d1tgonli21s4df.cloudfront.net/main_new/counting_bg_md.webp');
    background-size: cover;
    background-position: center;
    opacity: 0.62;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.46), transparent 22%),
      linear-gradient(90deg, rgba(24, 57, 110, 0.06), transparent 40%, rgba(24, 57, 110, 0.04) 100%);
    pointer-events: none;
  }
`;

const StatsInner = styled(Container)`
  position: relative;
  z-index: 1;
`;

const StatsGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  padding: 50px 0 58px;
  background: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(12px);
  border-radius: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 36px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 34px 0 40px;
    row-gap: 28px;
  }
`;

const StatCard = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 0 24px;
`;

const StatLabel = styled.strong`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1.38rem;
  line-height: 1.35;
  letter-spacing: -0.04em;
  color: #171717;

  &::after {
    content: '→';
    color: #171717;
    font-weight: 700;
  }
`;

const StatValue = styled.span`
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  color: #2a466f;
`;

const StatNote = styled.span`
  color: #8f8f8f;
  font-size: 0.92rem;
  line-height: 1.5;
`;

const StatsDisclaimer = styled.p`
  margin: 14px 6px 0 0;
  text-align: right;
  color: #6c6c6c;
  font-size: 0.92rem;
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

const OfficesOverview = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 32px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const OfficesHero = styled.div`
  min-height: 360px;
  padding: 34px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 14px;
  color: #ffffff;
  background:
    linear-gradient(180deg, rgba(9, 16, 31, 0.28), rgba(9, 16, 31, 0.78)),
    url('https://d1tgonli21s4df.cloudfront.net/main_new/newyork_night_pc.webp');
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    min-height: 260px;
    padding: 24px 20px;
  }
`;

const OfficesHeroTitle = styled.strong`
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  line-height: 1.2;
  letter-spacing: -0.04em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
`;

const OfficesChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const MemberName = styled.strong`
  font-size: 1.2rem;
`;

const OfficeChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(19, 63, 139, 0.12);
  color: #36507c;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    min-height: 38px;
    padding: 0 12px;
    font-size: 0.9rem;
  }
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandMarkMissing, setBrandMarkMissing] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIssue((prev) => (prev + 1) % issueReports.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentIssue = issueReports[activeIssue];
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
          <UtilityInner>
            {utilityLinks.map((label) => (
              <UtilityLink key={label} href="#top">
                {label}
              </UtilityLink>
            ))}
          </UtilityInner>
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
                    <NavLink href={item.href}>{item.label}</NavLink>
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
              <ToolLink href="#news">통합검색</ToolLink>
              <ToolLink href="#practice">전체메뉴</ToolLink>
              <ToolLink href="#offices">한국어</ToolLink>
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
                <HeroGlow />
                <HeroContent>
                  <HeroContentPanel>
                    <HeroTitle>
                      Your Case. Your Rights.
                      <br />
                      Our Fight.
                    </HeroTitle>
                    <HeroBody>
                      관세, 통상, 원산지, 수출입 규제 이슈를 빠르게 정리하고 실제 대응까지 연결하는 실무형 자문
                      파트너입니다.
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

          <PracticeShowcaseSection id="about">
            <PracticeShowcaseInner>
              <PracticeDetailGrid>
                <PracticeShowcaseHeader>
                  <PracticeShowcaseTitle>업무분야</PracticeShowcaseTitle>
                  <PracticeShowcaseBody>
                    신한관세법인의 핵심 업무를 중심으로 수출입통관, 환급, FTA, AEO, 미국 FDA, IT 연계 서비스까지
                    한 번에 안내하는 소개 영역입니다.
                  </PracticeShowcaseBody>
                </PracticeShowcaseHeader>

                {[practiceAreaDetails.slice(0, 5), practiceAreaDetails.slice(5)].map((column, columnIndex) => (
                  <PracticeColumn key={columnIndex}>
                    {column.map((item) => (
                      <PracticeDetailCard key={item.title}>
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

          <StatsSection>
            <StatsInner>
              <StatsGrid>
                {stats.map((item) => (
                  <StatCard key={item.label}>
                    <StatLabel>{item.label}</StatLabel>
                    <StatValue>{item.value}</StatValue>
                    <StatNote>{item.note}</StatNote>
                  </StatCard>
                ))}
              </StatsGrid>
              <StatsDisclaimer>*대한변협 광고 규정 제4조 제1호 준수</StatsDisclaimer>
            </StatsInner>
          </StatsSection>

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
                  <CardHeadline>{itServices[0].title}</CardHeadline>
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

              <OfficesOverview>
                <OfficesHero>
                  <OfficesHeroTitle>국내외 사무소와 협업 네트워크를 통해 빠르게 연결합니다.</OfficesHeroTitle>
                  <DarkCardText>본사, 지역 거점, 해외 협업 네트워크까지 한 화면에서 확인할 수 있도록 구성했습니다.</DarkCardText>
                </OfficesHero>
                <OfficesChips>
                  {officeCities.map((city) => (
                    <OfficeChip key={city}>{city}</OfficeChip>
                  ))}
                </OfficesChips>
              </OfficesOverview>
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
