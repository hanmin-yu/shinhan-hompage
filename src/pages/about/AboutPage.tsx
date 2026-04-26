import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { managementValues } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const IdentityPoints = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
`;

const IdentityPoint = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(20, 76, 158, 0.2);
  background: #f8fbff;
  color: #1f4f93;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const AllInOneSection = styled(P.PageSection)`
  background: linear-gradient(180deg, #0f3d7d 0%, #184f9c 100%);
  border-top: 1px solid rgba(17, 58, 122, 0.5);
`;

const AllInOneInner = styled(P.PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`;

const AllInOneTitle = styled.h2`
  margin: 0;
  color: #f2f7ff;
  font-size: clamp(2rem, 3.4vw, 3rem);
  letter-spacing: 0.01em;
`;

const AllInOneBody = styled.p`
  margin: 0;
  color: rgba(223, 235, 255, 0.95);
  font-size: 1rem;
  line-height: 1.7;
`;

const ServiceColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(P.Card)`
  gap: 14px;
`;

const ServiceCardHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const ServiceTag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  width: fit-content;
  padding: 0 10px;
  border-radius: 999px;
  background: #eff5ff;
  color: #1d4f97;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const ServiceIndex = styled.span`
  color: rgba(28, 88, 168, 0.28);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
`;

const ServiceDescription = styled.p`
  margin: 0;
  color: #4a6788;
  font-size: 0.94rem;
  line-height: 1.68;
`;

const ServiceList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #445f86;
  font-size: 0.92rem;
  line-height: 1.68;
`;

const ImageStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const StripCard = styled.article<{ src: string; $span: number; $height?: number }>`
  grid-column: span ${({ $span }) => $span};
  min-height: ${({ $height = 240 }) => `${$height}px`};
  display: flex;
  align-items: flex-end;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid rgba(20, 76, 158, 0.16);
  background:
    linear-gradient(180deg, rgba(9, 29, 59, 0.04) 0%, rgba(9, 29, 59, 0.58) 100%),
    ${({ src }) => `url(${src}) center / cover no-repeat`};
  box-shadow: 0 18px 36px rgba(15, 49, 106, 0.08);
  overflow: hidden;

  @media (max-width: 980px) {
    grid-column: span 1;
    min-height: 240px;
  }
`;

const StripContent = styled.div`
  display: grid;
  gap: 6px;
  width: min(100%, 260px);
`;

const StripLabel = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(222, 235, 255, 0.34);
  background: rgba(10, 36, 74, 0.24);
  color: #edf4ff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const StripTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 1.16rem;
  letter-spacing: -0.02em;
`;

const StripText = styled.p`
  margin: 0;
  color: rgba(234, 242, 255, 0.92);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const VisionPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: clamp(20px, 2.4vw, 28px);
`;

const VisionLead = styled.p`
  margin: 0;
  color: #4e6888;
  font-size: 0.98rem;
  line-height: 1.72;
`;

const VisionDiagram = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(16px, 2vw, 26px);
  padding: clamp(20px, 3vw, 34px);
  border-radius: 18px;
  border: 1px solid rgba(20, 76, 158, 0.14);
  background:
    radial-gradient(circle at top, rgba(39, 101, 191, 0.08), transparent 42%),
    linear-gradient(180deg, rgba(247, 250, 255, 0.98), rgba(238, 245, 255, 0.9));
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(20, 76, 158, 0.12);
  }

  &::before {
    left: 50%;
    top: 12%;
    bottom: 12%;
    width: 1px;
    transform: translateX(-50%);
  }

  &::after {
    left: 10%;
    right: 10%;
    top: 50%;
    height: 1px;
    transform: translateY(-50%);
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 16px;

    &::before,
    &::after {
      display: none;
    }
  }
`;

const VisionSide = styled.div`
  display: grid;
  gap: 14px;
`;

const VisionCard = styled.article`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 170px;
  padding: 22px;
  border-radius: 18px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 36px rgba(13, 45, 95, 0.06);

  @media (max-width: 980px) {
    min-height: 0;
  }
`;

const VisionValueTitle = styled.h3`
  margin: 0;
  color: #1c58a8;
  font-size: 1.02rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const VisionValueKo = styled.span`
  color: #183764;
  font-size: 1.38rem;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const VisionValueBody = styled.p`
  margin: 0;
  color: #516c8d;
  font-size: 0.92rem;
  line-height: 1.72;
`;

const VisionCore = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: clamp(240px, 25vw, 310px);
  aspect-ratio: 1 / 1;
  padding: 34px;
  border-radius: 999px;
  background: linear-gradient(180deg, #1f65c3 0%, #11498f 100%);
  box-shadow:
    0 24px 50px rgba(16, 58, 126, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  text-align: center;

  @media (max-width: 980px) {
    order: -1;
    justify-self: center;
    width: min(100%, 280px);
    padding: 28px;
  }
`;

const VisionCoreLabel = styled.span`
  color: rgba(227, 238, 255, 0.82);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const VisionCoreTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.6rem, 2.4vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const VisionCoreRule = styled.span`
  width: 34px;
  height: 1px;
  background: rgba(233, 241, 255, 0.58);
`;

const VisionCoreBody = styled.p`
  margin: 0;
  color: rgba(239, 245, 255, 0.94);
  font-size: 0.95rem;
  line-height: 1.74;
  text-wrap: balance;
`;

const SloganBand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(18px, 2vw, 24px);
  border-radius: 16px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background: linear-gradient(180deg, rgba(244, 248, 255, 0.96), rgba(236, 244, 255, 0.92));
`;

const Slogan = styled.p`
  margin: 0;
  color: #103b72;
  font-size: clamp(1.18rem, 2.4vw, 1.58rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  text-align: center;
  text-wrap: balance;
`;

const VisionCopyGroup = styled.div`
  display: grid;
  gap: 12px;
  max-width: 920px;
  margin: 0 auto;
`;

const VisionCopy = styled.p`
  margin: 0;
  color: #4a6587;
  text-align: center;
  font-size: 0.96rem;
  line-height: 1.78;
`;

const visionValueLabels: Record<string, { ko: string; en: string }> = {
  PASSION: { ko: '열정', en: 'Passion' },
  INTEGRITY: { ko: '정직', en: 'Integrity' },
  INNOVATION: { ko: '혁신', en: 'Innovation' },
  TEAMWORK: { ko: '팀워크', en: 'Teamwork' },
};

const visionValueLeftOrder = ['PASSION', 'INNOVATION'] as const;
const visionValueRightOrder = ['INTEGRITY', 'TEAMWORK'] as const;

const consultingItemsKo = [
  '관세심사(법인/기획/종합심사) 컨설팅',
  '해외 법률자문(중국, 미국, 통상이슈)',
  '이전가격(ACVA) 컨설팅',
  '관세 환급 컨설팅',
  '관세 불복 자문',
  'FTA, AEO 컨설팅',
  '무역 컨설팅',
  '베트남 재고관리, FTA 업무 컨설팅',
];

const consultingItemsEn = [
  'Customs audit consulting (corporate/planned/comprehensive)',
  'Overseas legal advisory (China, U.S., trade issues)',
  'Transfer pricing (ACVA) consulting',
  'Customs refund consulting',
  'Customs appeal advisory',
  'FTA and AEO consulting',
  'Trade consulting',
  'Vietnam inventory and FTA consulting',
];

const clearanceItemsKo = [
  '통관 관련 분석 자료 제공',
  '월간 리포트 및 KPI 리포트 제공',
  '개정법령 등 무역 관련 소식지 제공',
  '자체 사후심사 시스템 제공',
  '서류 보관 업무 대행',
  '환율 정보 제공 서비스',
  'OJT 지원 및 교육',
  '요건 확인 업무 컨설팅',
];

const clearanceItemsEn = [
  'Customs analytics materials',
  'Monthly and KPI reporting',
  'Trade newsletters with regulatory updates',
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
  'Domestic bonded transport (Air/Ocean)',
  'Domestic inland transportation after clearance',
  'Third Party Logistics',
  'Logistics consulting',
];

const servicePillarMeta = [
  { index: '01', titleKo: 'Consulting Focus', titleEn: 'Consulting Focus' },
  { index: '02', titleKo: 'Clearance Operations', titleEn: 'Clearance Operations' },
  { index: '03', titleKo: 'Logistics Integration', titleEn: 'Logistics Integration' },
];

const aboutGalleryItems = [
  {
    labelKo: 'Partnership',
    labelEn: 'Partnership',
    titleKo: '신뢰 기반 협업',
    titleEn: 'Trust-Based Collaboration',
    bodyKo: '고객과의 장기적인 협업 관계를 바탕으로 자문과 실행을 함께 설계합니다.',
    bodyEn: 'We design advisory and execution together through long-term client partnerships.',
    src: '/subpages/about-coms1.jpg',
    span: 4,
    height: 250,
  },
  {
    labelKo: 'Network',
    labelEn: 'Network',
    titleKo: '도심 네트워크 허브',
    titleEn: 'Urban Network Hub',
    bodyKo: '국내외 네트워크와 현장 대응 체계를 하나의 서비스 흐름으로 연결합니다.',
    bodyEn: 'We connect domestic and overseas networks into one service flow.',
    src: '/subpages/about-coms2.jpg',
    span: 4,
    height: 278,
  },
  {
    labelKo: 'Execution',
    labelEn: 'Execution',
    titleKo: '보세·물류 실행력',
    titleEn: 'Bonded & Logistics Execution',
    bodyKo: '보세창고와 물류 운영까지 이어지는 후속 실행력을 통해 서비스 범위를 확장합니다.',
    bodyEn: 'We extend service scope with follow-through execution across bonded warehousing and logistics.',
    src: '/subpages/about-coms3.jpg',
    span: 4,
    height: 250,
  },
];

export function AboutPage() {
  const { t } = useI18n();
  const aboutSubnav = sectionSubnav.about;
  const findVisionValue = (title: string) => managementValues.find((item) => item.title === title);
  const leftVisionValues = visionValueLeftOrder
    .map((title) => findVisionValue(title))
    .filter((item): item is NonNullable<(typeof managementValues)[number]> => Boolean(item));
  const rightVisionValues = visionValueRightOrder
    .map((title) => findVisionValue(title))
    .filter((item): item is NonNullable<(typeof managementValues)[number]> => Boolean(item));

  return (
    <>
      <P.HeroSection>
        <P.PageContainer>
          <LandingSubnav
            kicker={aboutSubnav.kicker}
            kickerEn={aboutSubnav.kickerEn}
            title={aboutSubnav.title}
            titleEn={aboutSubnav.titleEn}
            summary={aboutSubnav.summary}
            summaryEn={aboutSubnav.summaryEn}
            items={aboutSubnav.items}
          />
        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <P.IntroPanel>
            <P.Kicker>Trusted Partner</P.Kicker>
            <P.Title>{t('신뢰할 수 있는 동반자', 'A Trusted Partner')}</P.Title>
            <P.Lead>
              {t(
                '신한관세법인은 1965년 창립 이래 수출입 무역 기업과 함께 성장해 온 관세·무역 전문 파트너입니다.',
                'Since 1965, Shinhan Customs Service has grown with import-export companies as a customs and trade partner.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '오랜 신뢰와 KNOW-HOW를 바탕으로 통관·컨설팅·물류를 아우르는 Total Service를 제공합니다.',
                'Built on long-standing trust and know-how, we provide total services spanning clearance, consulting, and logistics.',
              )}
            </P.Lead>
            <IdentityPoints>
              <IdentityPoint>{t('1965년 창립', 'Founded in 1965')}</IdentityPoint>
              <IdentityPoint>{t('전통과 혁신', 'Tradition & Innovation')}</IdentityPoint>
              <IdentityPoint>{t('ALL-IN-ONE SERVICE', 'ALL-IN-ONE SERVICE')}</IdentityPoint>
              <IdentityPoint>{t('관세·무역 Total Service', 'Customs & Trade Total Service')}</IdentityPoint>
            </IdentityPoints>
          </P.IntroPanel>
          <P.IntroVisualPanel image="/subpages/about-mt14.jpg" minHeight={390} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Identity</P.Kicker>
              <P.SectionTitle>{t('전통과 혁신의 결합', 'Tradition Meets Innovation')}</P.SectionTitle>
            </div>
          </P.SectionHead>
          <P.StatementBlock>
            <P.Lead style={{ marginTop: 0 }}>
              {t(
                '정기적인 고객사 교육을 통해 관세·무역 KNOW-HOW를 공유하고, 급변하는 무역환경에 대응할 수 있도록 IT 분야의 지속적인 투자와 개발을 이어가고 있습니다.',
                'Through regular client education, we share customs and trade know-how and continue investing in IT development to respond to rapidly changing trade conditions.',
              )}
            </P.Lead>
            <P.SectionDivider />
            <P.Lead style={{ marginTop: 0 }}>
              {t(
                '전통과 혁신을 결합한 운영 체계로 고객 업무에 바로 적용 가능한 서비스를 제공합니다.',
                'By combining tradition and innovation, we deliver services that can be applied directly to client operations.',
              )}
            </P.Lead>
          </P.StatementBlock>
        </P.PageContainer>
      </P.PageSection>

      <AllInOneSection>
        <AllInOneInner data-reveal>
          <P.Kicker style={{ color: '#d7e8ff' }}>All-in-One Service</P.Kicker>
          <AllInOneTitle>ALL-IN-ONE SERVICE</AllInOneTitle>
          <AllInOneBody>
            {t(
              '통관, 환급, FTA, AEO, 심사, 물류, 행정쟁송 등 관세 및 무역에 관한 업무를 하나의 체계로 제공합니다.',
              'We provide customs and trade services in one system, including clearance, refunds, FTA, AEO, audits, logistics, and administrative disputes.',
            )}
          </AllInOneBody>
        </AllInOneInner>
      </AllInOneSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Service Areas</P.Kicker>
          <P.SectionTitle>{t('서비스 3축', 'Three Service Pillars')}</P.SectionTitle>
          <ServiceColumns>
            <ServiceCard>
              <ServiceCardHead>
                <ServiceTag>{t('Consulting', 'Consulting')}</ServiceTag>
                <ServiceIndex>{servicePillarMeta[0].index}</ServiceIndex>
              </ServiceCardHead>
              <P.CardTitle>{t('컨설팅서비스', 'Consulting Service')}</P.CardTitle>
              <ServiceDescription>
                {t(
                  '심사·불복·원산지·AEO·무역 이슈를 기업 상황에 맞게 설계하는 자문 체계입니다.',
                  'An advisory system built around audits, appeals, origin, AEO, and trade issues aligned with each client context.',
                )}
              </ServiceDescription>
              <ServiceList>
                {consultingItemsKo.map((item, index) => (
                  <li key={item}>{t(item, consultingItemsEn[index] ?? item)}</li>
                ))}
              </ServiceList>
            </ServiceCard>
            <ServiceCard>
              <ServiceCardHead>
                <ServiceTag>{t('Clearance', 'Clearance')}</ServiceTag>
                <ServiceIndex>{servicePillarMeta[1].index}</ServiceIndex>
              </ServiceCardHead>
              <P.CardTitle>{t('통관서비스', 'Clearance Service')}</P.CardTitle>
              <ServiceDescription>
                {t(
                  '운영 리포트, 사후심사 시스템, 교육 지원을 포함해 통관 운영의 정확도와 속도를 함께 관리합니다.',
                  'We manage the accuracy and speed of customs operations through reporting, post-audit systems, and training support.',
                )}
              </ServiceDescription>
              <ServiceList>
                {clearanceItemsKo.map((item, index) => (
                  <li key={item}>{t(item, clearanceItemsEn[index] ?? item)}</li>
                ))}
              </ServiceList>
            </ServiceCard>
            <ServiceCard>
              <ServiceCardHead>
                <ServiceTag>{t('Logistics', 'Logistics')}</ServiceTag>
                <ServiceIndex>{servicePillarMeta[2].index}</ServiceIndex>
              </ServiceCardHead>
              <P.CardTitle>{t('물류서비스', 'Logistics Service')}</P.CardTitle>
              <ServiceDescription>
                {t(
                  '보세창고와 국내외 운송, 3PL 운영을 연결해 통관 이후 단계까지 실무를 이어갑니다.',
                  'We connect bonded warehousing, transportation, and 3PL operations to support post-clearance execution.',
                )}
              </ServiceDescription>
              <ServiceList>
                {logisticsItemsKo.map((item, index) => (
                  <li key={item}>{t(item, logisticsItemsEn[index] ?? item)}</li>
                ))}
              </ServiceList>
            </ServiceCard>
          </ServiceColumns>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <ImageStrip>
            {aboutGalleryItems.map((item) => (
              <StripCard key={item.titleKo} src={item.src} $span={item.span} $height={item.height}>
                <StripContent>
                  <StripLabel>{t(item.labelKo, item.labelEn)}</StripLabel>
                  <StripTitle>{t(item.titleKo, item.titleEn)}</StripTitle>
                  <StripText>{t(item.bodyKo, item.bodyEn)}</StripText>
                </StripContent>
              </StripCard>
            ))}
          </ImageStrip>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Vision</P.Kicker>
          <P.SectionTitle>VISION</P.SectionTitle>
          <VisionPanel as={P.QuotePanel}>
            <VisionLead>
              {t(
                '고객의 지속적인 성공을 중심에 두고, 신한의 4대 가치가 하나의 경영이념으로 연결되는 구조를 정리했습니다.',
                'Centered on clients’ sustained success, Shinhan’s four core values are organized into one management philosophy.',
              )}
            </VisionLead>
            <VisionDiagram>
              <VisionSide>
                {leftVisionValues.map((value) => (
                  <VisionCard key={value.title}>
                    <VisionValueTitle>{value.title}</VisionValueTitle>
                    <VisionValueKo>{t(visionValueLabels[value.title].ko, visionValueLabels[value.title].en)}</VisionValueKo>
                    <VisionValueBody>{t(value.body, value.body)}</VisionValueBody>
                  </VisionCard>
                ))}
              </VisionSide>
              <VisionCore>
                <VisionCoreLabel>{t('Management Principle', 'Management Principle')}</VisionCoreLabel>
                <VisionCoreTitle>{t('경영이념', 'Management Philosophy')}</VisionCoreTitle>
                <VisionCoreRule />
                <VisionCoreBody>
                  {t(
                    '고객의 발전과 성공을 위해 열정과 정직, 혁신과 팀워크를 하나의 실행 원칙으로 연결합니다.',
                    'For client growth and success, we connect passion, integrity, innovation, and teamwork into one execution principle.',
                  )}
                </VisionCoreBody>
              </VisionCore>
              <VisionSide>
                {rightVisionValues.map((value) => (
                  <VisionCard key={value.title}>
                    <VisionValueTitle>{value.title}</VisionValueTitle>
                    <VisionValueKo>{t(visionValueLabels[value.title].ko, visionValueLabels[value.title].en)}</VisionValueKo>
                    <VisionValueBody>{t(value.body, value.body)}</VisionValueBody>
                  </VisionCard>
                ))}
              </VisionSide>
            </VisionDiagram>
            <SloganBand>
              <Slogan>We make the difference for your successful business!</Slogan>
            </SloganBand>
            <P.SectionDivider />
            <VisionCopyGroup>
              <VisionCopy>
                {t(
                  '최선의 서비스가 고객에게 최고의 서비스임을 약속드리며, 신한관세법인이 추구하는 최고의 가치는 고객의 지속적인 성공입니다.',
                  'We promise that the best service creates the best outcomes for our clients, and the value we pursue is our clients’ sustained success.',
                )}
              </VisionCopy>
              <VisionCopy>
                {t(
                  '신한의 모든 구성원은 Teamwork, Passion, Innovation, Integrity를 바탕으로 고객의 비즈니스 파트너가 되겠습니다.',
                  'Every member of Shinhan stands with clients as a business partner through teamwork, passion, innovation, and integrity.',
                )}
              </VisionCopy>
            </VisionCopyGroup>
          </VisionPanel>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
