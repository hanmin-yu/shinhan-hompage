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
    titleKo: '전국 7개 도시 지사',
    titleEn: 'Seven Domestic City Branches',
    bodyKo: '주요 입항지를 비롯한 전국 7개 도시의 지사를 통해 고객에게 필요한 서비스를 제공합니다.',
    bodyEn: 'We provide the services clients need through branches across seven domestic cities, including major port-of-entry locations.',
  },
  {
    metricKo: '3PL',
    metricEn: '3PL',
    titleKo: '보세창고 기반 3PL 물류회사',
    titleEn: 'Bonded-Warehouse 3PL Operation',
    bodyKo: '보세창고를 운영하는 3PL 물류회사를 통해 통관 이후의 보관과 운송까지 이어갑니다.',
    bodyEn: 'Through a 3PL logistics company operating bonded warehouses, we extend support into post-clearance storage and transportation.',
  },
  {
    metricKo: '2개 거점',
    metricEn: '2 Hubs',
    titleKo: 'Los Angeles · Hanoi 관세물류법인',
    titleEn: 'Los Angeles · Hanoi Customs Entities',
    bodyKo: '미국 Los Angeles와 베트남 Hanoi에 소재한 관세물류법인을 통해 현지 실무를 함께 지원합니다.',
    bodyEn: 'We support local operations through customs and logistics entities in Los Angeles and Hanoi.',
  },
  {
    metricKo: '100+',
    metricEn: '100+',
    titleKo: '100여 명의 직원',
    titleEn: '100+ Team Members',
    bodyKo: '국내외 조직 전반에서 100여 명의 직원이 고객 여러분께 필요한 모든 서비스를 제공하고 있습니다.',
    bodyEn: 'Across the domestic and overseas organization, more than 100 team members provide every service our clients need.',
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
                '1965년 3월 22일 신한관세법인의 전신인 서울통관사는 3명의 직원으로 창립하였습니다.',
                'On March 22, 1965, Seoul Customs Service, the predecessor of Shinhan Customs Service, was founded with three employees.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '창립 이후 신한관세법인은 대한민국의 경제 및 무역의 발전과 더불어 꾸준히 성장하여 왔습니다.',
                'Since then, Shinhan Customs Service has steadily grown alongside the development of Korea’s economy and trade.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '현재는 주요 입항지를 비롯한 전국 7개 도시의 지사와 보세창고를 운영하는 3PL 물류회사, 그리고 미국 Los Angeles와 베트남 Hanoi에 소재한 관세물류법인에서 100여 명의 직원들이 고객 여러분께 필요한 모든 서비스를 제공하고 있습니다.',
                'Today, through branches in seven domestic cities including major ports of entry, a 3PL logistics company operating bonded warehouses, and customs and logistics entities in Los Angeles and Hanoi, more than 100 employees provide every service our clients need.',
              )}
            </P.Lead>
            <MessageMetaRow>
              <MessageMetaChip>{t('3명의 직원으로 창립', 'Founded with 3 Employees')}</MessageMetaChip>
              <MessageMetaChip>{t('전국 7개 도시', '7 Domestic Cities')}</MessageMetaChip>
              <MessageMetaChip>{t('Los Angeles · Hanoi', 'Los Angeles · Hanoi')}</MessageMetaChip>
              <MessageMetaChip>{t('100여 명 직원', '100+ Team Members')}</MessageMetaChip>
            </MessageMetaRow>
            <P.SectionDivider />
            <GoalBadge>{t('100년의 Goal', '100-Year Goal')}</GoalBadge>
          </P.StatementBlock>

          <MessageVisual aria-hidden="true">
            <QuoteBox>
              {t(
                '고객의 성공과 발전이 우리의 성공임을 가슴에 새기며 진실하고 품격있는 최고의 서비스를 제공해 드리기 위해 노력하겠습니다.',
                'Keeping in our hearts that our clients’ success and growth are our own, we will strive to deliver truthful, high-quality service.',
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
                  '1965년 창립 이래로 매일 매해 신속하고 정확한 수출입통관서비스를 제공하기 위하여 최선을 다하였습니다.',
                  'Since our founding in 1965, we have done our utmost every day and every year to provide fast and accurate import and export clearance services.',
                )}
              </MessageBody>
              <P.SectionDivider />
              <MessageBody>
                {t(
                  '또한 고객사의 발전에 기여하고자 기업심사자문 · 행정쟁송대리, AEO · FTA · 환급 · 요건 컨설팅 · 3PL 물류 등의 서비스도 추가해왔습니다. 신한관세법인은 이렇게 꾸준히 앞서가는 노력의 발걸음을 멈추지 않고 100년의 Goal을 향해서 계속 나아가겠습니다.',
                  'To contribute to client growth, we have also expanded into services such as corporate audit advisory, representation in administrative disputes, AEO, FTA, refunds, requirements consulting, and 3PL logistics. Shinhan Customs Service will keep moving toward its 100-year goal without stopping these forward-looking efforts.',
                )}
              </MessageBody>
            </P.QuotePanel>
            <P.StatementBlock>
              <MessageStack>
                <MessageBody>
                  {t(
                    '함께하며 도움을 주신 모든 고객여러분과 협력사 여러분께 감사의 말씀을 드립니다.',
                    'We extend our sincere thanks to all clients and partners who have stood with us and supported us.',
                  )}
                </MessageBody>
                <MessageBody>
                  {t(
                    '고객의 성공과 발전이 우리의 성공임을 모든 임직원은 가슴에 새기며 진실하고 품격있는 최고의 서비스를 제공해 드리기 위해 오늘도 내일도 지속적으로 노력해 나가겠습니다.',
                    'Every member of our company keeps in mind that our clients’ success and growth are our own, and we will continue striving today and tomorrow to provide truthful and distinguished service of the highest quality.',
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
