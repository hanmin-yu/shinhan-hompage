import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { managementValues } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const IntroVisual = styled(P.IntroVisualPanel)`
  box-shadow: 0 24px 46px rgba(16, 45, 92, 0.1);
`;

const IdentityPoints = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
`;

const IdentityPoint = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(20, 76, 158, 0.16);
  background: #f6faff;
  color: #1f4f93;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const AllInOneSection = styled(P.PageSection)`
  padding: clamp(58px, 6vw, 78px) 0;
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
  font-weight: 800;
  letter-spacing: 0.01em;
`;

const AllInOneBody = styled.p`
  max-width: 760px;
  margin: 0 auto;
  color: rgba(223, 235, 255, 0.95);
  font-size: 1rem;
  line-height: 1.72;
  text-wrap: balance;
`;

const ServiceSection = styled(P.PageSection)`
  padding-top: clamp(56px, 6vw, 72px);
  border-top: 0;
`;

const ServiceIntro = styled.p`
  margin: 14px 0 0;
  max-width: 720px;
  color: #4a6788;
  font-size: 0.95rem;
  line-height: 1.74;
`;

const ServiceColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(P.Card)`
  gap: 14px;
  padding: 24px;
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
  display: grid;
  gap: 6px;
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
    linear-gradient(180deg, rgba(9, 29, 59, 0.06) 0%, rgba(9, 29, 59, 0.6) 100%),
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
  font-weight: 700;
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
  text-align: center;
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

const servicePillarMeta = [
  { index: '01', titleKo: 'Consulting Focus', titleEn: 'Consulting Focus' },
  { index: '02', titleKo: 'Clearance Operations', titleEn: 'Clearance Operations' },
  { index: '03', titleKo: 'Logistics Integration', titleEn: 'Logistics Integration' },
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
    height: 248,
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
    height: 272,
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
    height: 248,
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
            items={aboutSubnav.items}
            compactBottom
          />
        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <P.IntroPanel>
            <P.Kicker>Trusted Partner</P.Kicker>
            <P.Title>{t('신뢰할 수 있는 동반자', 'A Trusted Partner')}</P.Title>
            <P.Lead>
              {t(
                '신한관세법인은 1965년 창립 이래로 수출입 무역 업체의 든든한 동반자로서 고객사와 함께 해왔습니다.',
                'Since its founding in 1965, Shinhan Customs Service has stood with clients as a trusted partner to import and export businesses.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '오랜 기간 동안 쌓아온 신뢰와 KNOW-HOW를 바탕으로 신한의 관세전문가들이 깊이 있는 관세 서비스를 여러분께 제공하고 있습니다.',
                'Built on trust and KNOW-HOW accumulated over many years, Shinhan’s customs professionals provide clients with deep and reliable customs services.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '정기적인 고객사 교육을 통하여 신한관세법인만의 관세 및 무역에 관한 KNOW-HOW를 고객사와 공유하고자 노력하고 있습니다. 급변하는 세계의 무역환경에서 앞서 나갈 수 있도록 IT분야의 지속적인 투자 및 개발을 하여, 전통과 혁신이 융합된 최선의 서비스를 제공합니다.',
                'Through regular client education, we share Shinhan Customs Service’s customs and trade KNOW-HOW with our clients. We continue investing in and developing IT capabilities so clients can stay ahead in a rapidly changing global trade environment, delivering the best service through a combination of tradition and innovation.',
              )}
            </P.Lead>
            <IdentityPoints>
              <IdentityPoint>{t('1965년 창립', 'Founded in 1965')}</IdentityPoint>
              <IdentityPoint>{t('신뢰와 KNOW-HOW', 'Trust and KNOW-HOW')}</IdentityPoint>
              <IdentityPoint>{t('전통과 혁신의 융합', 'Tradition and Innovation')}</IdentityPoint>
            </IdentityPoints>
          </P.IntroPanel>
          <IntroVisual image="/subpages/about-mt14.jpg" minHeight={390} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <AllInOneSection>
        <AllInOneInner data-reveal>
          <P.Kicker style={{ color: '#d7e8ff' }}>All-in-One Service</P.Kicker>
          <AllInOneTitle>ALL-IN-ONE SERVICE</AllInOneTitle>
          <AllInOneBody>
            {t(
              '통관, 환급, FTA, AEO, 심사, 물류, 행정쟁송과 관세 및 무역에 관한 ALL-IN ONE SERVICE를 제공합니다.',
              'We provide ALL-IN ONE SERVICE across customs clearance, refunds, FTA, AEO, audits, logistics, administrative disputes, and customs and trade operations.',
            )}
          </AllInOneBody>
        </AllInOneInner>
      </AllInOneSection>

      <ServiceSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Service Areas</P.Kicker>
          <P.SectionTitle>{t('서비스 3축', 'Three Service Pillars')}</P.SectionTitle>
          <ServiceIntro>
            {t(
              '원본 회사소개 페이지의 서비스 구성을 기준으로, 컨설팅서비스·통관서비스·물류서비스를 한 화면에서 바로 확인할 수 있도록 정리했습니다.',
              'Based on the original company introduction page, the three service groups of consulting, clearance, and logistics are organized so they can be reviewed at a glance.',
            )}
          </ServiceIntro>
          <ServiceColumns>
            <ServiceCard>
              <ServiceCardHead>
                <ServiceTag>{t('Consulting', 'Consulting')}</ServiceTag>
                <ServiceIndex>{servicePillarMeta[0].index}</ServiceIndex>
              </ServiceCardHead>
              <P.CardTitle>{t('컨설팅서비스', 'Consulting Service')}</P.CardTitle>
              <ServiceDescription>
                {t(
                  '관세심사, 해외 법률자문, AEO, FTA, 환급, 무역 이슈까지 폭넓은 자문 항목을 제공합니다.',
                  'We provide a broad advisory range covering customs audits, overseas legal support, AEO, FTA, refunds, and trade issues.',
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
                  '분석 자료, 리포트, 사후심사 시스템, 교육과 요건 확인 컨설팅까지 통관 운영 전반을 지원합니다.',
                  'We support the full clearance operation through analytics, reporting, post-audit systems, education, and requirement verification consulting.',
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
                  '보세 화물 보관부터 국내 보세운송과 내륙 운송, 3PL과 물류 컨설팅까지 실무 실행을 이어갑니다.',
                  'We extend execution from bonded storage to domestic bonded transport, inland delivery, 3PL, and logistics consulting.',
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
      </ServiceSection>

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
                '고객의 성공을 위한 차이를 만들어내겠다는 신한의 방향을 4대 가치와 하나의 경영이념으로 연결해 보여줍니다.',
                'Shinhan’s promise to make the difference for clients’ success is expressed through four core values connected to one management philosophy.',
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
