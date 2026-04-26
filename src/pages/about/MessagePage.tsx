import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { managementValues } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const HeroWrap = styled(P.IntroBlock)`
  align-items: stretch;
`;

const MessageVisual = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(20, 78, 161, 0.18);
  background: url('/subpages/message-ceo.jpg') center / cover no-repeat;
  min-height: 360px;
  position: relative;
  overflow: hidden;
`;

const QuoteBox = styled.blockquote`
  margin: 0;
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  padding: 16px 18px;
  border-radius: 8px;
  border: 1px solid rgba(216, 229, 248, 0.58);
  background: rgba(12, 41, 84, 0.72);
  color: #eaf2ff;
  font-size: 0.9rem;
  line-height: 1.6;

  &::before {
    content: '"';
    position: absolute;
    left: 16px;
    top: 6px;
    color: rgba(229, 239, 255, 0.24);
    font-size: 3rem;
    line-height: 1;
  }
`;

const MessageMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MessageMetaChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(20, 78, 161, 0.18);
  background: #f7fbff;
  color: #21539a;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const MessageGrid = styled(P.Grid)`
  margin-top: 18px;
`;

const NetworkCard = styled(P.Card)`
  gap: 14px;
`;

const NetworkMetric = styled.strong`
  color: rgba(28, 88, 168, 0.28);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
`;

const MessageBody = styled.p`
  margin: 0;
  color: #476486;
  font-size: 0.96rem;
  line-height: 1.74;
`;

const MessageStack = styled.div`
  display: grid;
  gap: 14px;
`;

const PhilosophyGrid = styled(P.SplitGrid)`
  margin-top: 18px;
`;

const GoalBadge = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(20, 78, 161, 0.24);
  background: #eff6ff;
  color: #1e4f94;
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const ValueCard = styled(P.Card)`
  gap: 10px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #2a6bc6, #6d97d7);
  }
`;

const messageNetworkCards = [
  {
    metricKo: '7개',
    metricEn: '7',
    titleKo: '전국 7개 도시 지사 운영',
    titleEn: 'Seven Domestic City Branches',
    bodyKo: '주요 입항지를 포함한 전국 거점에서 지역별 통관 이슈를 빠르게 대응합니다.',
    bodyEn: 'We respond quickly to regional customs issues through domestic hubs including major port-of-entry locations.',
  },
  {
    metricKo: '3PL',
    metricEn: '3PL',
    titleKo: '3PL 물류 운영',
    titleEn: '3PL Logistics Operation',
    bodyKo: '보세창고와 연계한 3PL 운영을 통해 통관 이후 보관·운송 단계까지 연결합니다.',
    bodyEn: 'Through bonded warehouse-linked 3PL operations, we connect post-clearance storage and transportation.',
  },
  {
    metricKo: '2개 거점',
    metricEn: '2 Hubs',
    titleKo: '해외 법인 네트워크',
    titleEn: 'Overseas Entity Network',
    bodyKo: '미국 Los Angeles와 베트남 Hanoi 법인을 통해 현지 통관·물류·규정 이슈를 함께 대응합니다.',
    bodyEn: 'We jointly address local customs, logistics, and regulatory issues through entities in Los Angeles and Hanoi.',
  },
  {
    metricKo: '100+',
    metricEn: '100+',
    titleKo: '100여 명 전문 인력',
    titleEn: '100+ Professionals',
    bodyKo: '통관·심사·행정쟁송·AEO·FTA·환급·요건 컨설팅까지 고객에게 필요한 서비스를 제공합니다.',
    bodyEn: 'We provide services clients need across clearance, audits, administrative disputes, AEO, FTA, refunds, and requirements consulting.',
  },
];

export function MessagePage() {
  const { t, tx } = useI18n();
  const aboutSubnav = sectionSubnav.about;

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
          />
        </P.PageContainer>

        <HeroWrap data-reveal>
          <P.StatementBlock>
            <P.Kicker>Message</P.Kicker>
            <P.SectionTitle>{t('인사말', 'Message')}</P.SectionTitle>
            <P.Lead>
              {t(
                '1965년 3월 22일 서울통관사 창립 이후, 신한관세법인은 대한민국 무역의 성장과 함께 현장 중심의 관세 서비스를 확대해 왔습니다.',
                'Since the founding of Seoul Customs Service on March 22, 1965, Shinhan has expanded practical customs services alongside Korea’s trade growth.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '현재는 전국 7개 도시 지사, 보세창고를 운영하는 3PL 물류회사, 미국 Los Angeles 및 베트남 Hanoi 법인을 포함한 네트워크로 고객의 실무를 지원하고 있습니다.',
                'Today, we support client operations through a network covering seven domestic cities, a 3PL bonded warehouse operation, and entities in Los Angeles and Hanoi.',
              )}
            </P.Lead>
            <MessageMetaRow>
              <MessageMetaChip>{t('1965년 창립', 'Founded in 1965')}</MessageMetaChip>
              <MessageMetaChip>{t('전국 7개 도시 지사', '7 Domestic Branches')}</MessageMetaChip>
              <MessageMetaChip>{t('Los Angeles · Hanoi', 'Los Angeles · Hanoi')}</MessageMetaChip>
              <MessageMetaChip>{t('100여 명 전문 인력', '100+ Professionals')}</MessageMetaChip>
            </MessageMetaRow>
            <P.SectionDivider />
            <GoalBadge>{t('100년의 Goal', '100-Year Goal')}</GoalBadge>
          </P.StatementBlock>

          <MessageVisual aria-hidden="true">
            <QuoteBox>
              {t(
                '고객의 성공과 발전이 우리의 성공입니다. 진실하고 품격 있는 최고의 서비스로 100년의 Goal을 향해 나아가겠습니다.',
                'Client success is our success. We will continue toward our 100-year goal with truthful and high-quality service.',
              )}
            </QuoteBox>
          </MessageVisual>
        </HeroWrap>
      </P.HeroSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Network & Scale</P.Kicker>
              <P.SectionTitle>{t('현재 조직과 운영 네트워크', 'Current Organization & Network')}</P.SectionTitle>
            </div>
          </P.SectionHead>
          <MessageGrid columns={2}>
            {messageNetworkCards.map((item) => (
              <NetworkCard key={item.titleKo}>
                <NetworkMetric>{t(item.metricKo, item.metricEn)}</NetworkMetric>
                <P.CardTitle>{t(item.titleKo, item.titleEn)}</P.CardTitle>
                <P.CardText>{t(item.bodyKo, item.bodyEn)}</P.CardText>
              </NetworkCard>
            ))}
          </MessageGrid>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Leadership Message</P.Kicker>
          <P.SectionTitle>{t('서비스 확장과 100년의 Goal', 'Service Expansion & 100-Year Goal')}</P.SectionTitle>
          <PhilosophyGrid>
            <P.QuotePanel>
              <GoalBadge>{t('100년의 Goal', '100-Year Goal')}</GoalBadge>
              <MessageBody>
                {t(
                  '1965년 창립 이래 신속하고 정확한 수출입통관서비스 제공을 기본으로, 기업심사자문·행정쟁송대리·AEO·FTA·환급·요건 컨설팅·3PL 물류까지 서비스 범위를 지속적으로 확장해 왔습니다.',
                  'Since 1965, we have continuously expanded from precise import/export clearance to advisory services including audits, administrative disputes, AEO, FTA, refunds, requirements consulting, and 3PL logistics.',
                )}
              </MessageBody>
            </P.QuotePanel>
            <P.StatementBlock>
              <MessageStack>
                <MessageBody>
                  {t(
                    '함께해 주신 고객과 협력사에 깊이 감사드리며, 고객의 발전과 성공이 곧 우리의 성공이라는 원칙 아래 진실하고 품격 있는 서비스를 이어가겠습니다.',
                    'We deeply thank our clients and partners, and will continue to provide truthful and high-quality services under the principle that client growth and success are our own.',
                  )}
                </MessageBody>
                <P.SectionDivider />
                <MessageBody>{t('감사합니다.', 'Thank you.')}</MessageBody>
              </MessageStack>
            </P.StatementBlock>
          </PhilosophyGrid>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Core Value</P.Kicker>
          <P.SectionTitle>{t('경영 가치', 'Management Values')}</P.SectionTitle>
          <P.Grid columns={2}>
            {managementValues.map((item) => (
              <ValueCard key={item.title}>
                <P.CardTitle>{tx(item.title)}</P.CardTitle>
                <P.CardText>{tx(item.body)}</P.CardText>
              </ValueCard>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
