import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { managementValues } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const EditorialHero = styled(P.HeroSection)`
  min-height: clamp(420px, 54vw, 610px);
  display: grid;
  place-items: center;
  padding-top: calc(82px + clamp(24px, 4vw, 54px));
  padding-bottom: clamp(54px, 7vw, 90px);
  background:
    linear-gradient(180deg, rgba(8, 17, 31, 0.1) 0%, rgba(8, 17, 31, 0.12) 48%, rgba(8, 17, 31, 0.28) 100%),
    url('/hero/homepage/office-tower-clear-sky.jpg') center 42% / cover no-repeat;

  &::before,
  &::after {
    opacity: 0.08;
  }

  @media (max-width: 768px) {
    min-height: clamp(360px, 68vh, 560px);
    padding-top: calc(70px + clamp(24px, 5vw, 40px));
  }
`;

const HeroVisualTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.6rem, 5vw, 4.9rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  text-align: center;
  text-shadow:
    0 18px 36px rgba(4, 12, 24, 0.36),
    0 2px 10px rgba(4, 12, 24, 0.32);
`;

const SubnavBand = styled.section`
  background: #ffffff;
  border-bottom: 1px solid #e4e7ec;
`;

const SubnavInner = styled(P.PageContainer)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 66px;
  border-left: 1px solid #e4e7ec;
  border-right: 1px solid #e4e7ec;

  @media (max-width: 760px) {
    flex-direction: column;
    min-height: 0;
    border-left: 0;
    border-right: 0;
  }
`;

const AboutBreadcrumb = styled.div`
  display: flex;
  align-items: center;
  min-width: 280px;
  padding: 0 32px;
  border-right: 1px solid #e4e7ec;
  color: #5e6672;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;

  @media (max-width: 760px) {
    min-height: 54px;
    padding: 0;
    border-right: 0;
    border-bottom: 1px solid #e4e7ec;
  }
`;

const AboutNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin-left: auto;

  @media (max-width: 760px) {
    margin-left: 0;
  }
`;

const AboutNavLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0 clamp(18px, 2.4vw, 34px);
  border-left: 1px solid #e4e7ec;
  color: #4f5661;
  font-size: 0.98rem;
  font-weight: 800;
  letter-spacing: -0.02em;

  &[data-active='true'] {
    color: #121c2b;
  }

  &[data-active='true']::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: #121c2b;
  }

  &:hover {
    color: #121c2b;
  }

  @media (max-width: 760px) {
    min-height: 52px;
    padding: 0 18px;

    &:first-of-type {
      border-left: 0;
    }
  }
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 54px);
`;

const HeroEyebrow = styled.span`
  color: #52647c;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.64rem, 6.4vw, 6.2rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.055em;
  text-wrap: balance;
  text-shadow: none;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const HeroLeadGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(280px, 0.42fr);
  gap: clamp(28px, 5vw, 74px);
  align-items: end;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLead = styled.p`
  max-width: 760px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.6vw, 1.28rem);
  line-height: 1.82;
`;

const HeroFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid #d5dbe4;
  border-bottom: 1px solid #d5dbe4;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const HeroFact = styled.div`
  display: grid;
  gap: 8px;
  padding: 18px 18px 18px 0;
  border-right: 1px solid #dbe0e8;

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 640px) {
    padding-right: 0;
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const HeroFactValue = styled.strong`
  color: #172337;
  font-size: clamp(1.42rem, 2.3vw, 2.06rem);
  font-weight: 800;
  line-height: 1;
`;

const HeroFactLabel = styled.span`
  color: #687385;
  font-size: 0.88rem;
  line-height: 1.5;
`;

const EditorialSection = styled.section<{ $tone?: 'navy' | 'soft' }>`
  padding: clamp(78px, 9vw, 128px) 0;
  border-top: 1px solid ${({ $tone }) => ($tone === 'navy' ? 'rgba(226, 231, 238, 0.12)' : '#d8dee8')};
  background: ${({ $tone }) => {
    if ($tone === 'navy') {
      return 'linear-gradient(180deg, #0a1424 0%, #121f33 100%)';
    }
    if ($tone === 'soft') {
      return 'linear-gradient(180deg, #f5f6f8 0%, #fbfcfd 100%)';
    }
    return '#ffffff';
  }};
`;

const IntroLayout = styled(P.PageContainer)`
  display: grid;
  grid-template-columns: minmax(0, 0.56fr) minmax(0, 0.44fr);
  gap: clamp(36px, 6vw, 88px);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SectionLabel = styled.span<{ $light?: boolean }>`
  display: block;
  color: ${({ $light }) => ($light ? 'rgba(226, 231, 238, 0.7)' : '#52647c')};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const EditorialTitle = styled.h2<{ $light?: boolean }>`
  max-width: 860px;
  margin: 12px 0 0;
  color: ${({ $light }) => ($light ? '#ffffff' : '#172337')};
  font-size: clamp(2.14rem, 4.2vw, 4.22rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.05em;
  text-wrap: balance;
`;

const BodyStack = styled.div`
  display: grid;
  gap: 20px;
`;

const EditorialBody = styled.p<{ $light?: boolean }>`
  margin: 0;
  color: ${({ $light }) => ($light ? 'rgba(226, 231, 238, 0.8)' : '#4d5a6c')};
  font-size: clamp(1rem, 1.2vw, 1.08rem);
  line-height: 1.88;
`;

const Rule = styled.div<{ $light?: boolean }>`
  width: 100%;
  height: 1px;
  margin: 8px 0;
  background: ${({ $light }) =>
    $light ? 'rgba(226, 231, 238, 0.18)' : 'linear-gradient(90deg, #4d5e74, rgba(77, 94, 116, 0))'};
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin-top: clamp(36px, 5vw, 62px);
  border-top: 1px solid #d5dbe4;
  border-bottom: 1px solid #d5dbe4;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceColumn = styled.article`
  display: grid;
  gap: 18px;
  padding: clamp(24px, 3vw, 38px);
  border-right: 1px solid #dbe0e8;

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 980px) {
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const ServiceIndex = styled.span`
  color: rgba(45, 58, 76, 0.22);
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
`;

const ServiceTitle = styled.h3`
  margin: 0;
  color: #18283e;
  font-size: clamp(1.36rem, 2vw, 1.72rem);
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const ServiceDescription = styled.p`
  margin: 0;
  color: #4e5d70;
  font-size: 0.98rem;
  line-height: 1.76;
`;

const ServiceList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 18px 0 0;
  border-top: 1px solid #e2e6ec;
  list-style: none;
`;

const ServiceItem = styled.li`
  position: relative;
  padding-left: 14px;
  color: #4b596b;
  font-size: 0.92rem;
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
  grid-template-columns: minmax(0, 0.45fr) minmax(0, 0.55fr);
  gap: clamp(34px, 6vw, 86px);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ValueList = styled.div`
  display: grid;
  border-top: 1px solid rgba(226, 231, 238, 0.16);
`;

const ValueRow = styled.article`
  display: grid;
  grid-template-columns: minmax(140px, 0.32fr) minmax(0, 1fr);
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(226, 231, 238, 0.16);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ValueTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.2rem, 1.8vw, 1.54rem);
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const ValueBody = styled.p`
  margin: 0;
  color: rgba(226, 231, 238, 0.72);
  font-size: 0.98rem;
  line-height: 1.78;
`;

const GalleryGrid = styled(P.PageContainer)`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryCard = styled.article<{ src: string; $span: number; $height?: number }>`
  grid-column: span ${({ $span }) => $span};
  min-height: ${({ $height = 300 }) => `${$height}px`};
  display: flex;
  align-items: flex-end;
  padding: clamp(20px, 3vw, 30px);
  background:
    linear-gradient(180deg, rgba(10, 18, 30, 0.04) 0%, rgba(10, 18, 30, 0.72) 100%),
    ${({ src }) => `url(${src}) center / cover no-repeat`};

  @media (max-width: 900px) {
    grid-column: span 1;
    min-height: 280px;
  }
`;

const GalleryContent = styled.div`
  max-width: 330px;
`;

const GalleryLabel = styled.span`
  color: rgba(232, 235, 240, 0.76);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const GalleryTitle = styled.h3`
  margin: 10px 0 0;
  color: #ffffff;
  font-size: 1.34rem;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const GalleryText = styled.p`
  margin: 10px 0 0;
  color: rgba(235, 238, 243, 0.84);
  font-size: 0.94rem;
  line-height: 1.68;
`;

const SloganBand = styled.div`
  margin-top: clamp(34px, 5vw, 60px);
  padding-top: clamp(22px, 3vw, 34px);
  border-top: 1px solid #d5dbe4;
`;

const Slogan = styled.p`
  max-width: 980px;
  margin: 0;
  color: #172337;
  font-size: clamp(1.64rem, 3.3vw, 3.2rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.045em;
  text-wrap: balance;
`;

const consultingItemsKo = [
  '관세심사(법인/기획/종합심사) 컨설팅',
  '해외 법률자문(중국,미국,통상이슈)',
  '이전가격(ACVA) 컨설팅',
  '관세 환급 컨설팅',
  '관세 불복 자문',
  'FTA,AEO 컨설팅',
  '무역 컨설팅',
  '베트남 재고관리, FTA 업무 컨설팅',
];

const consultingItemsEn = [
  'Customs audit consulting (corporate/planned/comprehensive)',
  'Overseas legal advisory (China,U.S.,trade issues)',
  'Transfer pricing (ACVA) consulting',
  'Customs refund consulting',
  'Customs appeal advisory',
  'FTA,AEO consulting',
  'Trade consulting',
  'Vietnam inventory and FTA consulting',
];

const clearanceItemsKo = [
  '통관 관련 분석 자료 제공',
  '(Monthly Report, KPI Report)',
  '개정법령 등 무역관련 소식지 제공',
  '자체 사후심사 시스템 제공',
  '서류 보관 업무 대행',
  '환율 정보 제공 서비스',
  'OJT지원,교육',
  '요건 확인 업무 컨설팅',
];

const clearanceItemsEn = [
  'Customs analytics materials',
  '(Monthly Report, KPI Report)',
  'Trade newsletters with revised regulations',
  'Internal post-audit system support',
  'Document archive outsourcing',
  'Exchange rate information service',
  'OJT support and education',
  'Requirement verification consulting',
];

const logisticsItemsKo = [
  '보세 화물 및 일반 화물 보관',
  '국내 보세운송(Air / Ocean)',
  '통관 후 국내 내륙 운송',
  'Third Party Logistics',
  '물류 컨설팅 제공',
];

const logisticsItemsEn = [
  'Bonded and general cargo storage',
  'Domestic bonded transport (Air / Ocean)',
  'Domestic inland transportation after clearance',
  'Third Party Logistics',
  'Logistics consulting',
];

const servicePillars = [
  {
    index: '01',
    titleKo: '컨설팅서비스',
    titleEn: 'Consulting Service',
    bodyKo: '관세심사, 해외 법률자문, AEO, FTA, 환급, 무역 이슈까지 폭넓은 자문 항목을 제공합니다.',
    bodyEn:
      'We provide a broad advisory range covering customs audits, overseas legal support, AEO, FTA, refunds, and trade issues.',
    itemsKo: consultingItemsKo,
    itemsEn: consultingItemsEn,
  },
  {
    index: '02',
    titleKo: '통관서비스',
    titleEn: 'Clearance Service',
    bodyKo: '분석 자료, 리포트, 사후심사 시스템, 교육과 요건 확인 컨설팅까지 통관 운영 전반을 지원합니다.',
    bodyEn:
      'We support the full clearance operation through analytics, reporting, post-audit systems, education, and requirement verification consulting.',
    itemsKo: clearanceItemsKo,
    itemsEn: clearanceItemsEn,
  },
  {
    index: '03',
    titleKo: '물류서비스',
    titleEn: 'Logistics Service',
    bodyKo: '보세 화물 보관부터 국내 보세운송과 내륙 운송, 3PL과 물류 컨설팅까지 실무 실행을 이어갑니다.',
    bodyEn:
      'We extend execution from bonded storage to domestic bonded transport, inland delivery, 3PL, and logistics consulting.',
    itemsKo: logisticsItemsKo,
    itemsEn: logisticsItemsEn,
  },
];

const aboutGalleryItems = [
  {
    labelKo: 'Partnership',
    labelEn: 'Partnership',
    titleKo: '오랜 신뢰의 축적',
    titleEn: 'Built on Long-Term Trust',
    bodyKo: '고객사와 함께해 온 시간 속에서 신뢰와 KNOW-HOW를 쌓아왔습니다.',
    bodyEn: 'We have built trust and know-how through long-term partnership with clients.',
    src: '/subpages/about-coms1.jpg',
    span: 4,
    height: 330,
  },
  {
    labelKo: 'Service',
    labelEn: 'Service',
    titleKo: '통관·컨설팅·물류의 연결',
    titleEn: 'Connected Total Service',
    bodyKo: '통관, 물류, 컨설팅까지 이어지는 Total Service 체계를 제공합니다.',
    bodyEn: 'We provide a connected total service system spanning clearance, logistics, and consulting.',
    src: '/subpages/about-coms2.jpg',
    span: 4,
    height: 390,
  },
  {
    labelKo: 'Innovation',
    labelEn: 'Innovation',
    titleKo: '전통과 혁신의 융합',
    titleEn: 'Tradition Meets Innovation',
    bodyKo: '지속적인 IT 투자와 개발로 급변하는 무역환경에 앞서 대응합니다.',
    bodyEn: 'With continuous IT investment and development, we stay ahead of fast-changing trade environments.',
    src: '/subpages/about-coms3.jpg',
    span: 4,
    height: 330,
  },
];

export function AboutPage() {
  const { t, tx } = useI18n();
  const aboutSubnav = sectionSubnav.about;
  const { pathname } = useLocation();
  const isActivePath = (to: string) => pathname === to;

  return (
    <>
      <EditorialHero>
        <HeroVisualTitle data-reveal>{t('회사소개', 'Overview')}</HeroVisualTitle>
      </EditorialHero>

      <SubnavBand>
        <SubnavInner>
          <AboutBreadcrumb>{t('홈 / 신한 소개 / 회사소개', 'Home / About Shinhan / Overview')}</AboutBreadcrumb>
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
          <div>
            <HeroEyebrow>Shinhan Customs Service</HeroEyebrow>
            <HeroTitle>
              {t(
                '고객의 무역 문제를 해결하고 가치를 더합니다.',
                'We solve trade challenges and add lasting value.',
              )}
            </HeroTitle>
          </div>
          <HeroLeadGrid>
            <HeroLead>
              {t(
                '신한관세법인은 1965년 창립 이래 수출입 무역 업체의 든든한 동반자로서 고객과 함께 성장해왔습니다. 오랜 신뢰와 KNOW-HOW를 바탕으로 통관, 컨설팅, 물류를 연결한 전문 서비스를 제공합니다.',
                'Since its founding in 1965, Shinhan Customs Service has grown with import and export companies as a trusted partner. Built on long-standing trust and know-how, we connect customs clearance, consulting, and logistics into one professional service.',
              )}
            </HeroLead>
            <HeroFacts>
              <HeroFact>
                <HeroFactValue>1965</HeroFactValue>
                <HeroFactLabel>{t('서울통관사 창립', 'Founded as Seoul Customs Service')}</HeroFactLabel>
              </HeroFact>
              <HeroFact>
                <HeroFactValue>60+</HeroFactValue>
                <HeroFactLabel>{t('관세·무역 서비스 경험', 'Years of customs and trade experience')}</HeroFactLabel>
              </HeroFact>
              <HeroFact>
                <HeroFactValue>All-in-One</HeroFactValue>
                <HeroFactLabel>{t('통관·컨설팅·물류 통합 지원', 'Clearance, consulting, and logistics')}</HeroFactLabel>
              </HeroFact>
            </HeroFacts>
          </HeroLeadGrid>
        </HeroStatement>
      </EditorialSection>

      <EditorialSection $tone="soft">
        <IntroLayout data-reveal>
          <div>
            <SectionLabel>About Shinhan</SectionLabel>
            <EditorialTitle>{t('신뢰와 실무 전문성으로 고객의 다음을 준비합니다.', 'Preparing what comes next with trust and practical expertise.')}</EditorialTitle>
          </div>
          <BodyStack>
            <EditorialBody>
              {t(
                '오랜 기간 동안 쌓아온 신뢰와 KNOW-HOW를 바탕으로 신한의 관세전문가들이 깊이 있는 관세 서비스를 여러분께 제공하고 있습니다.',
                'Built on trust and KNOW-HOW accumulated over many years, Shinhan’s customs professionals provide clients with deep and reliable customs services.',
              )}
            </EditorialBody>
            <EditorialBody>
              {t(
                '정기적인 고객사 교육을 통하여 신한관세법인만의 관세 및 무역에 관한 KNOW-HOW를 고객사와 공유하고자 노력하고 있습니다.',
                'Through regular client education, we share Shinhan Customs Service’s customs and trade KNOW-HOW with our clients.',
              )}
            </EditorialBody>
            <EditorialBody>
              {t(
                '급변하는 세계의 무역환경에서 앞서 나갈 수 있도록 IT분야의 지속적인 투자 및 개발을 하여, 전통과 혁신이 융합된 최선의 서비스를 제공합니다.',
                'We continue investing in and developing IT capabilities so clients can stay ahead in a rapidly changing global trade environment, delivering the best service through a combination of tradition and innovation.',
              )}
            </EditorialBody>
            <Rule />
          </BodyStack>
        </IntroLayout>
      </EditorialSection>

      <EditorialSection $tone="soft">
        <P.PageContainer data-reveal>
          <SectionLabel>All-in-One Service</SectionLabel>
          <EditorialTitle>
            {t(
              '통관부터 물류, 자문까지 하나의 흐름으로 연결합니다.',
              'From clearance to logistics and advisory, every step works as one flow.',
            )}
          </EditorialTitle>
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
        </P.PageContainer>
      </EditorialSection>

      <EditorialSection $tone="navy">
        <NavyInner data-reveal>
          <div>
            <SectionLabel $light>Core Value</SectionLabel>
            <EditorialTitle $light>{t('경영 가치를 실행의 기준으로 삼습니다.', 'Our values guide the way we execute.')}</EditorialTitle>
            <Rule $light />
            <EditorialBody $light>
              {t(
                '고객의 발전과 성공을 위해 열정과 정직, 혁신과 팀워크를 하나의 실행 원칙으로 연결합니다.',
                'For client growth and success, we connect passion, integrity, innovation, and teamwork into one execution principle.',
              )}
            </EditorialBody>
          </div>
          <ValueList>
            {managementValues.map((item) => (
              <ValueRow key={item.title}>
                <ValueTitle>{tx(item.title)}</ValueTitle>
                <ValueBody>{tx(item.body)}</ValueBody>
              </ValueRow>
            ))}
          </ValueList>
        </NavyInner>
      </EditorialSection>

      <EditorialSection>
        <GalleryGrid data-reveal>
          {aboutGalleryItems.map((item) => (
            <GalleryCard key={item.titleKo} src={item.src} $span={item.span} $height={item.height}>
              <GalleryContent>
                <GalleryLabel>{t(item.labelKo, item.labelEn)}</GalleryLabel>
                <GalleryTitle>{t(item.titleKo, item.titleEn)}</GalleryTitle>
                <GalleryText>{t(item.bodyKo, item.bodyEn)}</GalleryText>
              </GalleryContent>
            </GalleryCard>
          ))}
        </GalleryGrid>
        <P.PageContainer data-reveal>
          <SloganBand>
            <Slogan>We make the difference for your successful business!</Slogan>
          </SloganBand>
        </P.PageContainer>
      </EditorialSection>
    </>
  );
}
