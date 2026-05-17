import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

import { palette } from '../../components/home/homeStyles';
import * as P from '../../components/site/PagePrimitives';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useI18n } from '../../i18n/useI18n';

const EditorialHero = styled(P.HeroSection)`
  position: relative;
  isolation: isolate;
  margin-top: 0;
  min-height: clamp(430px, 52vh, 620px);
  display: grid;
  place-items: center;
  overflow: hidden;
  padding-top: calc(82px + 38px + clamp(18px, 3vw, 34px));
  padding-bottom: clamp(54px, 7vw, 86px);
  background: #d8e0e8;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background: url('/hero/menu-about-shinhan-ai.png') center 50% / cover no-repeat;
    filter: brightness(1.34) contrast(0.94) saturate(1.06);
    opacity: 1;
    transform: none;
    animation: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    width: auto;
    aspect-ratio: auto;
    border-radius: 0;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(232, 242, 255, 0.08) 48%, rgba(18, 64, 128, 0.16) 100%),
      linear-gradient(90deg, rgba(8, 32, 72, 0.16) 0%, rgba(8, 32, 72, 0.02) 48%, rgba(8, 32, 72, 0.06) 100%);
    opacity: 1;
    transform: none;
    animation: none;
  }

  @media (max-width: 768px) {
    margin-top: 0;
    min-height: clamp(340px, 50vh, 480px);
    padding-top: clamp(44px, 8vw, 70px);
  }
`;

const HeroVisualTitle = styled.h1`
  position: relative;
  z-index: 1;
  max-width: calc(100% - 48px);
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 4.1vw, 3.72rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: 0.018em;
  text-align: center;
  text-shadow:
    0 14px 30px rgba(4, 12, 24, 0.24),
    0 2px 8px rgba(4, 12, 24, 0.22);
`;

const SubnavBand = styled.section`
  background: #ffffff;
  border-bottom: 1px solid #e4e7ec;
  overflow: hidden;

  @media (max-width: 760px) {
    background: #f7f9fc;
  }
`;

const SubnavInner = styled(P.PageContainer)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 66px;
  border-left: 1px solid #e4e7ec;
  border-right: 1px solid #e4e7ec;
  overflow: hidden;

  @media (max-width: 760px) {
    min-height: 48px;
    padding: 8px 14px;
    border-left: 0;
    border-right: 0;
    overflow-x: auto;
  }
`;

const HomeCell = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  flex: 0 0 66px;
  border-right: 1px solid #e4e7ec;
  color: #303844;

  &::before {
    content: '';
    width: 18px;
    height: 18px;
    background: currentColor;
    clip-path: polygon(50% 8%, 92% 42%, 82% 42%, 82% 90%, 60% 90%, 60% 62%, 40% 62%, 40% 90%, 18% 90%, 18% 42%, 8% 42%);
  }

  @media (max-width: 760px) {
    width: 38px;
    height: 34px;
    flex-basis: 38px;
    border: 1px solid #d9e0eb;
    border-radius: 999px;
    background: #ffffff;

    &::before {
      width: 15px;
      height: 15px;
    }
  }
`;

const AboutNav = styled.nav`
  display: flex;
  align-items: stretch;
  flex: 1;
  justify-content: flex-end;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 760px) {
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-left: 8px;
  }
`;

const AboutNavLink = styled(Link)`
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  padding: 0 clamp(18px, 2vw, 30px);
  border-right: 1px solid #e4e7ec;
  color: #4f5661;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0;
  white-space: nowrap;
  word-break: keep-all;

  &:first-of-type {
    border-left: 1px solid #e4e7ec;
  }

  &[data-active='true'] {
    color: #121c2b;
  }

  &[data-active='true']::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background: #121c2b;
  }

  &:hover {
    color: #121c2b;
  }

  @media (max-width: 760px) {
    min-height: 34px;
    min-width: 0;
    padding: 0 14px;
    border: 1px solid #d9e0eb;
    border-radius: 999px;
    background: #ffffff;
    color: #526071;
    font-size: 0.82rem;
    font-weight: 800;

    &:first-of-type {
      border-left: 1px solid #d9e0eb;
    }

    &[data-active='true'] {
      background: #123f85;
      border-color: #123f85;
      color: #ffffff;
      box-shadow: 0 8px 16px rgba(18, 63, 133, 0.16);
    }

    &[data-active='true']::after {
      content: none;
    }
  }
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(44px, 5.6vw, 82px);
  max-width: 1320px;
`;

const HeroHeading = styled.div`
  display: grid;
  gap: 10px;
  justify-items: start;
  min-width: 0;
`;

const HeroEyebrow = styled.span`
  display: block;
  margin-left: clamp(4px, 0.5vw, 8px);
  color: ${palette.blue};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1160px;
  margin: 0;
  color: #111111;
  font-size: clamp(2.04rem, 4vw, 3.72rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.012em;
  text-wrap: balance;
  word-break: keep-all;
  text-shadow: none;

  @media (max-width: 640px) {
    letter-spacing: -0.008em;
  }
`;

const HeroLeadGrid = styled.div`
  display: grid;
  gap: clamp(38px, 5vw, 72px);
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLead = styled.p`
  max-width: 980px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.12rem, 1.38vw, 1.28rem);
  line-height: 1.82;
  word-break: keep-all;
  overflow-wrap: normal;
  text-wrap: pretty;
`;

const HeroLeadSentence = styled.span`
  display: block;

  & + & {
    margin-top: 4px;
  }
`;

const HeroFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid #d5dbe4;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 252, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);
  overflow: hidden;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const HeroFact = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(130px, auto) minmax(0, 1fr);
  align-items: center;
  gap: clamp(18px, 2.6vw, 34px);
  min-height: 138px;
  padding: clamp(28px, 3vw, 42px) clamp(28px, 3.5vw, 52px);
  border-right: 1px solid #dbe0e8;

  &::before {
    content: '';
    position: absolute;
    left: clamp(28px, 3.5vw, 52px);
    top: 26px;
    width: 38px;
    height: 3px;
    background: linear-gradient(90deg, #1d5fb6, #1aa398);
  }

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 640px) {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 44px 20px 24px;
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &::before {
      left: 20px;
      top: 22px;
    }

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const HeroFactValue = styled.strong`
  color: ${palette.blue};
  font-size: clamp(1.62rem, 2.4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.025em;
  word-break: keep-all;
  overflow-wrap: normal;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: clamp(1.22rem, 6.8vw, 1.94rem);
    letter-spacing: -0.03em;
  }
`;

const HeroFactLabel = styled.span`
  color: #687385;
  font-size: 1.04rem;
  line-height: 1.62;
  word-break: keep-all;
  overflow-wrap: normal;
  max-width: 220px;

  @media (max-width: 640px) {
    max-width: none;
    font-size: 0.96rem;
    line-height: 1.54;
  }
`;

const EditorialSection = styled.section<{ $tone?: 'navy' | 'soft' }>`
  padding: clamp(92px, 10vw, 156px) 0;
  border-top: 1px solid ${({ $tone }) => ($tone === 'navy' ? 'rgba(226, 231, 238, 0.12)' : '#d8dee8')};
  background: ${({ $tone }) => {
    if ($tone === 'navy') {
      return 'linear-gradient(180deg, #004a8e 0%, #0058a8 52%, #00427f 100%)';
    }
    if ($tone === 'soft') {
      return 'linear-gradient(180deg, #f5f6f8 0%, #fbfcfd 100%)';
    }
    return '#ffffff';
  }};
`;

const SectionLabel = styled.span<{ $light?: boolean }>`
  display: block;
  margin: 0 0 14px 6px;
  color: ${({ $light }) => ($light ? 'rgba(226, 231, 238, 0.7)' : palette.blue)};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const EditorialTitle = styled.h2<{ $light?: boolean }>`
  max-width: 980px;
  margin: 0;
  color: ${({ $light }) => ($light ? '#ffffff' : '#172337')};
  font-size: clamp(1.82rem, 3.05vw, 2.94rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.012em;
  text-wrap: balance;
`;

const EditorialBody = styled.p<{ $light?: boolean }>`
  margin: 0;
  color: ${({ $light }) => ($light ? 'rgba(226, 231, 238, 0.8)' : '#4d5a6c')};
  font-size: clamp(1.04rem, 1.18vw, 1.14rem);
  line-height: 1.84;
  word-break: keep-all;
  overflow-wrap: normal;
  text-wrap: pretty;
`;

const Rule = styled.div<{ $light?: boolean }>`
  width: 100%;
  height: 1px;
  margin: 14px 0;
  background: ${({ $light }) =>
    $light ? 'rgba(226, 231, 238, 0.18)' : 'linear-gradient(90deg, #4d5e74, rgba(77, 94, 116, 0))'};
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 0;
  margin-top: clamp(56px, 7vw, 96px);
  border-top: 1px solid #d5dbe4;
  border-bottom: 1px solid #d5dbe4;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const AboutSectionContainer = styled(P.PageContainer)`
  max-width: 1320px;
`;

const ServiceColumn = styled.article`
  display: grid;
  grid-template-rows: auto auto minmax(7.5em, auto) 1fr;
  gap: 24px;
  padding: clamp(30px, 3.5vw, 48px);
  border-right: 1px solid #dbe0e8;

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 980px) {
    grid-template-rows: auto;
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const ServiceIndex = styled.span`
  color: rgba(18, 63, 133, 0.22);
  font-size: clamp(2.6rem, 4vw, 4.1rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
`;

const ServiceTitle = styled.h3`
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.03em;
`;

const ServiceDescription = styled.p`
  margin: 0;
  color: #4e5d70;
  font-size: 1.06rem;
  line-height: 1.78;
`;

const ServiceList = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 22px 0 0;
  border-top: 1px solid #e2e6ec;
  list-style: none;
`;

const ServiceItem = styled.li`
  position: relative;
  padding-left: 14px;
  color: #4b596b;
  font-size: 0.98rem;
  line-height: 1.62;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 4px;
    height: 4px;
    background: #4c5d73;
  }
`;

const NavyInner = styled(P.PageContainer)`
  display: grid;
  grid-template-columns: minmax(0, 0.34fr) minmax(0, 0.66fr);
  gap: clamp(32px, 4vw, 72px);
  align-items: start;
  max-width: 1280px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const PhilosophyLabel = styled(SectionLabel)`
  color: ${palette.blue};
`;

const ValueList = styled.div`
  display: grid;
  border-top: 1px solid #d8dee8;
`;

const ValueRow = styled.article`
  display: grid;
  grid-template-columns: minmax(210px, 0.3fr) minmax(0, 1fr);
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid #d8dee8;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ValueTitle = styled.h3`
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.24rem, 1.75vw, 1.58rem);
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const ValueBody = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: 1.06rem;
  line-height: 1.78;
`;

const NoWrap = styled.span`
  white-space: nowrap;
`;

function renderNoWrapTerm(text: string, term: string) {
  const index = text.indexOf(term);

  if (index === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, index)}
      <NoWrap>{term}</NoWrap>
      {text.slice(index + term.length)}
    </>
  );
}

const SloganBand = styled.div`
  position: relative;
  margin-top: clamp(68px, 8vw, 118px);
  padding: clamp(82px, 9vw, 132px) 0 clamp(88px, 10vw, 148px);
  text-align: center;
  border-top: 1px solid rgba(15, 43, 89, 0.08);

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -52px;
    width: 1px;
    height: 52px;
    background: linear-gradient(180deg, transparent, rgba(15, 43, 89, 0.22));
  }
`;

const Slogan = styled.p`
  position: relative;
  max-width: 1320px;
  margin: 0 auto;
  padding-bottom: 30px;
  color: #0058a8;
  font-size: clamp(1.86rem, 3.8vw, 4.08rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.055em;
  text-wrap: balance;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: clamp(92px, 11vw, 170px);
    height: 2px;
    background: #0058a8;
    transform: translateX(-50%);
  }

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const consultingItemsKo = [
  '관세조사, 외환검사 대리',
  '해외 통관 자문(미국, 중국 등)',
  'FTA 활용 및 C/O 발급',
  'AEO 공인, ACVA 승인 대리',
  '관세 불복 사안 대리',
  '관세 환급 설계 및 신청',
  '수출 통제 및 전략물자 컨설팅',
  '베트남 통관 자문 및 시스템 구축',
];

const consultingItemsEn = [
  'Customs investigation and foreign exchange inspection representation',
  'Overseas customs advisory (U.S., China, and more)',
  'FTA utilization and C/O issuance',
  'AEO certification and ACVA approval representation',
  'Customs appeal representation',
  'Customs refund planning and filing',
  'Export controls and strategic goods consulting',
  'Vietnam customs advisory and system implementation',
];

const clearanceItemsKo = [
  '실시간 통관 현황 모니터링 서비스',
  'Monthly & KPI 리포트 발행',
  '매주 최신 환율 정보 제공',
  '매월 무역 정보 소식지 제공',
  '통관 오류 검증 시스템 운용',
  '디지털 서류 보관 서비스',
  '통관 연계 운송, 정산 등 서비스',
  '수입 요건 확인 컨설팅',
];

const clearanceItemsEn = [
  'Real-time customs clearance status monitoring',
  'Monthly and KPI report publication',
  'Weekly exchange rate updates',
  'Monthly trade information newsletter',
  'Customs error verification system operation',
  'Digital document archive service',
  'Clearance-linked transportation and settlement services',
  'Import requirement verification consulting',
];

const logisticsItemsKo = [
  '원스톱 3PL 서비스',
  '보세, 일반 화물 통합 보관',
  '글로벌 포워딩 연계 운송',
  '통관 후 전국 내륙 운송',
  '실시간 화물 추적 서비스',
  '고객사 재고관리 지원',
  '라벨링, 재포장 등 유통 서비스 제공',
  'SCM 최적화 컨설팅',
];

const logisticsItemsEn = [
  'One-stop 3PL service',
  'Integrated bonded and general cargo storage',
  'Transportation connected with global forwarding',
  'Nationwide inland transportation after clearance',
  'Real-time cargo tracking service',
  'Customer inventory management support',
  'Distribution services including labeling and repackaging',
  'SCM optimization consulting',
];

const servicePillars = [
  {
    index: '01',
    titleKo: '통관서비스',
    titleEn: 'Clearance Service',
    bodyKo: '기업별 통관 리포트, 환율 및 무역정보 제공, 디지털 서류 보관 등 수출입 통관 전반을 지원합니다.',
    bodyEn:
      'We support the full import and export clearance process, including company-specific clearance reports, exchange rate and trade information, and digital document archiving.',
    itemsKo: clearanceItemsKo,
    itemsEn: clearanceItemsEn,
  },
  {
    index: '02',
    titleKo: '컨설팅 서비스',
    titleEn: 'Consulting Service',
    bodyKo: '기업에 대한 세관 조사 대리, 해외 통관 자문, AEO 인증, ACVA 승인 등 무역과 관련된 광범위한 컨설팅을 제공합니다.',
    bodyEn:
      'We provide broad trade-related consulting, including customs investigation representation, overseas customs advisory, AEO certification, and ACVA approval.',
    itemsKo: consultingItemsKo,
    itemsEn: consultingItemsEn,
  },
  {
    index: '03',
    titleKo: '물류 서비스',
    titleEn: 'Logistics Service',
    bodyKo: '보세 화물 보관부터 운송, 3PL, 재고관리 등 통합 물류 서비스를 제공합니다.',
    bodyEn:
      'We provide integrated logistics services, from bonded cargo storage to transportation, 3PL, and inventory management.',
    itemsKo: logisticsItemsKo,
    itemsEn: logisticsItemsEn,
  },
];

export function AboutPage() {
  const { t, tx } = useI18n();
  const { content } = useSiteContent();
  const aboutSubnav = content.global.sectionSubnav.about;
  const aboutCopy = content.about.copy.overview;
  const managementValues = content.about.managementValues;
  const { pathname } = useLocation();
  const isActivePath = (to: string) => pathname === to;

  return (
    <>
      <EditorialHero>
        <HeroVisualTitle data-reveal>{t(aboutCopy.visualTitle, aboutCopy.visualTitleEn)}</HeroVisualTitle>
      </EditorialHero>

      <SubnavBand>
        <SubnavInner>
          <HomeCell to="/" aria-label={t('홈', 'Home')} />
          <AboutNav aria-label={t('회사소개 하위 메뉴', 'Overview sub navigation')}>
            {aboutSubnav.items.map((item) => (
              <AboutNavLink
                key={item.to}
                to={item.to}
                data-active={isActivePath(item.to)}
              >
                {t(item.label, item.labelEn)}
              </AboutNavLink>
            ))}
          </AboutNav>
        </SubnavInner>
      </SubnavBand>

      <EditorialSection>
        <HeroStatement data-reveal>
          <HeroHeading>
            <HeroEyebrow>Shinhan Customs Service</HeroEyebrow>
            <HeroTitle>{t(aboutCopy.heroTitle, aboutCopy.heroTitleEn)}</HeroTitle>
          </HeroHeading>
          <HeroLeadGrid>
            <HeroLead>
              <HeroLeadSentence>{t(aboutCopy.leadParagraphs[0], aboutCopy.leadParagraphsEn[0])}</HeroLeadSentence>
              <HeroLeadSentence>{t(aboutCopy.leadParagraphs[1], aboutCopy.leadParagraphsEn[1])}</HeroLeadSentence>
            </HeroLead>
            <HeroFacts>
              <HeroFact>
                <HeroFactValue>1965</HeroFactValue>
                <HeroFactLabel>{t(aboutCopy.factLabels[0], aboutCopy.factLabelsEn[0])}</HeroFactLabel>
              </HeroFact>
              <HeroFact>
                <HeroFactValue>60 Years+</HeroFactValue>
                <HeroFactLabel>{t(aboutCopy.factLabels[1], aboutCopy.factLabelsEn[1])}</HeroFactLabel>
              </HeroFact>
              <HeroFact>
                <HeroFactValue>All-in-One</HeroFactValue>
                <HeroFactLabel>{t(aboutCopy.factLabels[2], aboutCopy.factLabelsEn[2])}</HeroFactLabel>
              </HeroFact>
            </HeroFacts>
          </HeroLeadGrid>
        </HeroStatement>
      </EditorialSection>

      <EditorialSection>
        <NavyInner data-reveal>
          <div>
            <PhilosophyLabel>VISION</PhilosophyLabel>
            <EditorialTitle>{t(aboutCopy.philosophyTitle, aboutCopy.philosophyTitleEn)}</EditorialTitle>
            <Rule />
            <EditorialBody>{t(aboutCopy.philosophyBody, aboutCopy.philosophyBodyEn)}</EditorialBody>
          </div>
          <ValueList>
            {managementValues.map((item) => (
              <ValueRow key={item.title}>
                <ValueTitle>{tx(item.title)}</ValueTitle>
                <ValueBody>{item.title === 'INNOVATION' ? renderNoWrapTerm(tx(item.body), '개선하는 역량') : tx(item.body)}</ValueBody>
              </ValueRow>
            ))}
          </ValueList>
        </NavyInner>
      </EditorialSection>

      <EditorialSection $tone="soft">
        <AboutSectionContainer data-reveal>
          <SectionLabel>All-in-One Service</SectionLabel>
          <EditorialTitle>{t(aboutCopy.serviceTitle, aboutCopy.serviceTitleEn)}</EditorialTitle>
          <ServiceGrid>
            {servicePillars.map((pillar) => (
              <ServiceColumn key={pillar.index}>
                <ServiceIndex>{pillar.index}</ServiceIndex>
                <ServiceTitle>{t(pillar.titleKo, pillar.titleEn)}</ServiceTitle>
                <ServiceDescription>{t(pillar.bodyKo, pillar.bodyEn)}</ServiceDescription>
                <ServiceList>
                  {pillar.itemsKo.map((item, index) => (
                    <ServiceItem key={item}>{t(item, pillar.itemsEn[index] ?? item)}</ServiceItem>
                  ))}
                </ServiceList>
              </ServiceColumn>
            ))}
          </ServiceGrid>
        </AboutSectionContainer>
      </EditorialSection>

      <EditorialSection>
        <AboutSectionContainer data-reveal>
          <SloganBand>
            <Slogan>We make the difference for your successful business!</Slogan>
          </SloganBand>
        </AboutSectionContainer>
      </EditorialSection>
    </>
  );
}
