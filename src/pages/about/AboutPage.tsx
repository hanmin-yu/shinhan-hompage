import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { useI18n } from '../../i18n/useI18n';

const IntroGrid = styled(P.HeroGrid)`
  align-items: stretch;
`;

const IntroVisual = styled.div`
  min-height: 360px;
  border-radius: 10px;
  border: 1px solid rgba(18, 72, 147, 0.16);
  background: url('/subpages/about-mt14.jpg') center / cover no-repeat;
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
  padding: 22px;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StripImage = styled.div<{ src: string }>`
  min-height: 220px;
  border-radius: 8px;
  border: 1px solid rgba(20, 76, 158, 0.16);
  background: ${({ src }) => `url(${src}) center / cover no-repeat`};
`;

const VisionPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
`;

const VisionImage = styled.div`
  width: 100%;
  min-height: 360px;
  border-radius: 8px;
  border: 1px solid rgba(20, 76, 158, 0.14);
  background: url('/subpages/about-vision.jpg') center / contain no-repeat #f5f9ff;

  @media (max-width: 768px) {
    min-height: 260px;
  }
`;

const Slogan = styled.p`
  margin: 6px 0 0;
  color: #103b72;
  font-size: clamp(1.1rem, 2.2vw, 1.45rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  text-align: center;
`;

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

export function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <P.HeroSection>
        <IntroGrid data-reveal>
          <div>
            <P.Kicker>Company Overview</P.Kicker>
            <P.Title>{t('회사소개', 'About Us')}</P.Title>
            <P.Lead>
              {t(
                '신한관세법인은 1965년 창립 이래 수출입 무역 업체의 동반자로 함께해 왔습니다.',
                'Since its founding in 1965, Shinhan Customs Service has partnered with import-export businesses.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '오랜 신뢰와 실무 노하우를 바탕으로 관세 전문가가 통관·컨설팅·물류 전 과정을 안정적으로 지원합니다.',
                'Built on long-standing trust and operational know-how, our customs specialists support clearance, consulting, and logistics end-to-end.',
              )}
            </P.Lead>
          </div>
          <IntroVisual aria-hidden="true" />
        </IntroGrid>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Trusted Partner</P.Kicker>
          <P.SectionTitle>{t('신뢰할 수 있는 동반자', 'A Trusted Partner')}</P.SectionTitle>
          <P.Lead>
            {t(
              '정기적인 고객사 교육으로 관세·무역 노하우를 공유하고, 급변하는 통상 환경에 대응할 수 있도록 IT 분야 투자와 개발을 지속하고 있습니다.',
              'We provide regular client training to share customs/trade know-how and continue investing in IT development for rapidly changing trade environments.',
            )}
          </P.Lead>
          <P.Lead>
            {t(
              '전통과 혁신을 결합한 운영 체계로 고객 업무에 바로 적용 가능한 서비스를 제공합니다.',
              'By combining tradition and innovation, we deliver services that can be applied directly to client operations.',
            )}
          </P.Lead>
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
          <P.SectionTitle>{t('서비스 구성', 'Service Portfolio')}</P.SectionTitle>
          <ServiceColumns>
            <ServiceCard>
              <P.CardTitle>{t('컨설팅서비스', 'Consulting Service')}</P.CardTitle>
              <ServiceList>
                {consultingItemsKo.map((item, index) => (
                  <li key={item}>{t(item, consultingItemsEn[index] ?? item)}</li>
                ))}
              </ServiceList>
            </ServiceCard>
            <ServiceCard>
              <P.CardTitle>{t('통관서비스', 'Clearance Service')}</P.CardTitle>
              <ServiceList>
                {clearanceItemsKo.map((item, index) => (
                  <li key={item}>{t(item, clearanceItemsEn[index] ?? item)}</li>
                ))}
              </ServiceList>
            </ServiceCard>
            <ServiceCard>
              <P.CardTitle>{t('물류서비스', 'Logistics Service')}</P.CardTitle>
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
            <StripImage src="/subpages/about-coms1.jpg" aria-hidden="true" />
            <StripImage src="/subpages/about-coms2.jpg" aria-hidden="true" />
            <StripImage src="/subpages/about-coms3.jpg" aria-hidden="true" />
          </ImageStrip>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Vision</P.Kicker>
          <P.SectionTitle>VISION</P.SectionTitle>
          <VisionPanel>
            <VisionImage aria-hidden="true" />
            <Slogan>We make the difference for your successful business!</Slogan>
          </VisionPanel>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
