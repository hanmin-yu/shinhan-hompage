import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { aboutStrengths } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const AboutVisual = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 10px;
  min-height: 360px;

  @media (max-width: 1024px) {
    min-height: 320px;
  }
`;

const AboutVisualMain = styled.div`
  grid-row: 1 / span 2;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(18, 72, 147, 0.16);
  background: url('/subpages/about-coms1.jpg') center / cover no-repeat;
`;

const AboutVisualSub = styled.div<{ image: string }>`
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(18, 72, 147, 0.16);
  background: ${({ image }) => `url(${image}) center / cover no-repeat`};
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export function AboutPage() {
  const { t, tx } = useI18n();

  return (
    <>
      <P.HeroSection>
        <P.HeroGrid data-reveal>
          <div>
            <P.Kicker>About Shinhan</P.Kicker>
            <P.Title>{t('신한관세법인 소개', 'About Shinhan Customs Service')}</P.Title>
            <P.Lead>
              {t(
                '1965년부터 축적한 관세 실무 경험을 바탕으로 수출입통관, 컨설팅, 물류를 한 체계로 제공하는 전문 서비스 법인입니다.',
                'Built on customs experience since 1965, we provide import/export clearance, consulting, and logistics within one service framework.',
              )}
            </P.Lead>
          </div>

          <AboutVisual aria-hidden="true">
            <AboutVisualMain />
            <AboutVisualSub image="/subpages/about-coms2.jpg" />
            <AboutVisualSub image="/subpages/about-coms3.jpg" />
          </AboutVisual>
        </P.HeroGrid>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>All-in-One Service</P.Kicker>
          <P.SectionTitle>{t('ALL-IN-ONE SERVICE', 'ALL-IN-ONE SERVICE')}</P.SectionTitle>
          <P.Lead>
            {t(
              '신고, 검토, 조사 대응, 해외 연계까지 필요한 업무 범위를 하나의 운영 흐름으로 제공합니다.',
              'From declarations and reviews to audit response and overseas coordination, we provide one operational flow.',
            )}
          </P.Lead>
          <SummaryRow>
            <P.Card>
              <P.CardTitle>{t('통관 운영', 'Clearance Operations')}</P.CardTitle>
              <P.CardText>{t('PI·CI 기반 신고 운영과 사후관리', 'PI/CI-based declaration operation and post-management')}</P.CardText>
            </P.Card>
            <P.Card>
              <P.CardTitle>{t('컨설팅', 'Consulting')}</P.CardTitle>
              <P.CardText>{t('FTA, AEO, 조사 대응, 환급 자문', 'FTA, AEO, audit response, and refund advisory')}</P.CardText>
            </P.Card>
            <P.Card>
              <P.CardTitle>{t('국내외 네트워크', 'Domestic & Overseas Network')}</P.CardTitle>
              <P.CardText>{t('국내 지사와 베트남 법인 협업', 'Collaboration across domestic branches and Vietnam office')}</P.CardText>
            </P.Card>
          </SummaryRow>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Strength</P.Kicker>
              <P.SectionTitle>{t('핵심 강점', 'Core Strengths')}</P.SectionTitle>
            </div>
          </P.SectionHead>
          <P.Grid columns={3}>
            {aboutStrengths.map((item) => (
              <P.Card key={item.title}>
                <P.CardTitle>{tx(item.title)}</P.CardTitle>
                <P.CardText>{tx(item.body)}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Network</P.Kicker>
          <P.SectionTitle>{t('전국 네트워크와 해외 법인 연계', 'National Network & Overseas Integration')}</P.SectionTitle>
          <P.Lead>
            {t(
              '서울본사를 중심으로 지역 거점과 베트남 법인을 연결해 통관·컨설팅·운영 이슈를 함께 대응합니다.',
              'Centered on Seoul HQ, we connect regional branches and the Vietnam office to address customs, consulting, and operations issues together.',
            )}
          </P.Lead>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
