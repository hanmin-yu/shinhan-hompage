import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { managementValues } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const MessageHero = styled(P.HeroSection)`
  margin-top: 0;
  min-height: auto;
  padding-top: 0;
  padding-bottom: 0;
  background: transparent;

  &::before,
  &::after {
    display: none;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding-bottom: 0;
  }
`;

const Kicker = styled.span<{ $light?: boolean }>`
  color: ${({ $light }) => ($light ? 'rgba(219, 235, 255, 0.78)' : '#1c5aa7')};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.17em;
  text-transform: uppercase;
`;

const EditorialSection = styled.section<{ $tone?: 'soft' | 'navy' }>`
  padding: clamp(78px, 9vw, 128px) 0;
  border-top: 1px solid ${({ $tone }) => ($tone === 'navy' ? 'rgba(219, 235, 255, 0.12)' : '#dbe7f6')};
  background: ${({ $tone }) => {
    if ($tone === 'navy') {
      return 'linear-gradient(180deg, #061833 0%, #09254c 100%)';
    }
    if ($tone === 'soft') {
      return 'linear-gradient(180deg, #f3f7fc 0%, #fbfdff 100%)';
    }
    return '#ffffff';
  }};
`;

const MessageLayout = styled(P.PageContainer)`
  display: grid;
  grid-template-columns: minmax(300px, 0.38fr) minmax(0, 0.62fr);
  gap: clamp(36px, 6vw, 92px);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const CeoFigure = styled.figure`
  position: sticky;
  top: 108px;
  margin: 0;

  @media (max-width: 980px) {
    position: static;
  }
`;

const CeoImage = styled.div`
  min-height: clamp(360px, 44vw, 620px);
  background:
    linear-gradient(180deg, rgba(6, 24, 51, 0.02), rgba(6, 24, 51, 0.28)),
    url('/subpages/message-ceo.jpg') center / cover no-repeat;
`;

const FigureCaption = styled.figcaption`
  display: grid;
  gap: 6px;
  padding-top: 18px;
  margin-top: 18px;
  border-top: 1px solid #d5e0ef;
  color: #516b88;
  font-size: 0.92rem;
  line-height: 1.6;
`;

const CaptionName = styled.strong`
  color: #09254c;
  font-size: 1.08rem;
`;

const MessageArticle = styled.article`
  display: grid;
  gap: clamp(28px, 4vw, 48px);
`;

const SectionTitle = styled.h2<{ $light?: boolean }>`
  max-width: 860px;
  margin: 12px 0 0;
  color: ${({ $light }) => ($light ? '#ffffff' : '#071f43')};
  font-size: clamp(2.1rem, 4vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.05em;
  text-wrap: balance;
`;

const BodyStack = styled.div`
  display: grid;
  gap: 22px;
`;

const MessageBody = styled.p<{ $light?: boolean }>`
  margin: 0;
  color: ${({ $light }) => ($light ? 'rgba(225, 238, 255, 0.82)' : '#405a78')};
  font-size: clamp(1rem, 1.18vw, 1.08rem);
  line-height: 1.92;
`;

const LeadBody = styled(MessageBody)`
  color: #102f5e;
  font-size: clamp(1.14rem, 1.5vw, 1.34rem);
  font-weight: 700;
  line-height: 1.72;
`;

const Rule = styled.div<{ $light?: boolean }>`
  width: 100%;
  height: 1px;
  background: ${({ $light }) =>
    $light ? 'rgba(219, 235, 255, 0.2)' : 'linear-gradient(90deg, #0f3d7d, rgba(15, 61, 125, 0))'};
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid #cddbef;
  border-bottom: 1px solid #cddbef;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.article`
  display: grid;
  gap: 12px;
  min-height: 230px;
  padding: clamp(22px, 3vw, 34px);
  border-right: 1px solid #d6e2f1;

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 980px) {
    border-bottom: 1px solid #d6e2f1;

    &:nth-of-type(2n) {
      border-right: 0;
    }

    &:nth-last-of-type(-n + 2) {
      border-bottom: 0;
    }
  }

  @media (max-width: 560px) {
    min-height: 0;
    border-right: 0;

    &:nth-last-of-type(-n + 2) {
      border-bottom: 1px solid #d6e2f1;
    }

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const Metric = styled.strong`
  color: rgba(15, 61, 125, 0.28);
  font-size: clamp(2.3rem, 4vw, 4rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
`;

const MetricTitle = styled.h3`
  margin: 0;
  color: #0a2854;
  font-size: 1.18rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const MetricBody = styled.p`
  margin: 0;
  color: #48627e;
  font-size: 0.94rem;
  line-height: 1.72;
`;

const NavyLayout = styled(P.PageContainer)`
  display: grid;
  grid-template-columns: minmax(0, 0.44fr) minmax(0, 0.56fr);
  gap: clamp(34px, 6vw, 86px);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ValueList = styled.div`
  display: grid;
  border-top: 1px solid rgba(219, 235, 255, 0.18);
`;

const ValueRow = styled.article`
  display: grid;
  grid-template-columns: minmax(130px, 0.3fr) minmax(0, 1fr);
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(219, 235, 255, 0.18);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ValueTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.18rem, 1.8vw, 1.5rem);
  font-weight: 800;
`;

const ValueBody = styled.p`
  margin: 0;
  color: rgba(225, 238, 255, 0.76);
  font-size: 0.98rem;
  line-height: 1.78;
`;

const Closing = styled.div`
  padding-top: clamp(24px, 4vw, 44px);
  border-top: 1px solid #d5e0ef;
`;

const Thanks = styled.p`
  margin: 0;
  color: #071f43;
  font-size: clamp(1.72rem, 3.2vw, 3.1rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.045em;
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
      <MessageHero>
        <P.PageContainer>
          <LandingSubnav
            kicker={aboutSubnav.kicker}
            kickerEn={aboutSubnav.kickerEn}
            title={aboutSubnav.title}
            titleEn={aboutSubnav.titleEn}
            items={aboutSubnav.items}
            matchAboutHero
          />
        </P.PageContainer>
      </MessageHero>

      <EditorialSection>
        <MessageLayout data-reveal>
          <CeoFigure>
            <CeoImage aria-hidden="true" />
            <FigureCaption>
              <CaptionName>{t('신한관세법인', 'Shinhan Customs Service')}</CaptionName>
              <span>{t('대표 인사말', 'Leadership Message')}</span>
            </FigureCaption>
          </CeoFigure>

          <MessageArticle>
            <div>
              <Kicker>Message</Kicker>
              <SectionTitle>{t('세 명으로 시작한 약속을 더 넓은 서비스로 이어갑니다.', 'A promise that began with three people now extends through a wider service network.')}</SectionTitle>
            </div>

            <BodyStack>
              <LeadBody>
                {t(
                  '1965년 3월 22일 신한관세법인의 전신인 서울통관사는 3명의 직원으로 창립하였습니다.',
                  'On March 22, 1965, Seoul Customs Service, the predecessor of Shinhan Customs Service, was founded with three employees.',
                )}
              </LeadBody>
              <MessageBody>
                {t(
                  '창립 이후 신한관세법인은 대한민국의 경제 및 무역의 발전과 더불어 꾸준히 성장하여 왔습니다.',
                  'Since then, Shinhan Customs Service has steadily grown alongside the development of Korea’s economy and trade.',
                )}
              </MessageBody>
              <MessageBody>
                {t(
                  '현재는 주요 입항지를 비롯한 전국 7개 도시의 지사와 보세창고를 운영하는 3PL 물류회사, 그리고 미국 Los Angeles와 베트남 Hanoi에 소재한 관세물류법인에서 100여 명의 직원들이 고객 여러분께 필요한 모든 서비스를 제공하고 있습니다.',
                  'Today, through branches in seven domestic cities including major ports of entry, a 3PL logistics company operating bonded warehouses, and customs and logistics entities in Los Angeles and Hanoi, more than 100 employees provide every service our clients need.',
                )}
              </MessageBody>
              <Rule />
              <MessageBody>
                {t(
                  '1965년 창립 이래로 매일 매해 신속하고 정확한 수출입통관서비스를 제공하기 위하여 최선을 다하였습니다.',
                  'Since our founding in 1965, we have done our utmost every day and every year to provide fast and accurate import and export clearance services.',
                )}
              </MessageBody>
              <MessageBody>
                {t(
                  '또한 고객사의 발전에 기여하고자 기업심사자문 · 행정쟁송대리, AEO · FTA · 환급 · 요건 컨설팅 · 3PL 물류 등의 서비스도 추가해왔습니다. 신한관세법인은 이렇게 꾸준히 앞서가는 노력의 발걸음을 멈추지 않고 100년의 Goal을 향해서 계속 나아가겠습니다.',
                  'To contribute to client growth, we have also expanded into services such as corporate audit advisory, representation in administrative disputes, AEO, FTA, refunds, requirements consulting, and 3PL logistics. Shinhan Customs Service will keep moving toward its 100-year goal without stopping these forward-looking efforts.',
                )}
              </MessageBody>
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
            </BodyStack>

            <Closing>
              <Thanks>{t('감사합니다.', 'Thank you.')}</Thanks>
            </Closing>
          </MessageArticle>
        </MessageLayout>
      </EditorialSection>

      <EditorialSection $tone="soft">
        <P.PageContainer data-reveal>
          <Kicker>Network & Scale</Kicker>
          <SectionTitle>{t('현재 조직과 운영 네트워크', 'Current Organization & Network')}</SectionTitle>
          <MetricGrid>
            {messageNetworkCards.map((item) => (
              <MetricCard key={item.titleKo}>
                <Metric>{t(item.metricKo, item.metricEn)}</Metric>
                <MetricTitle>{t(item.titleKo, item.titleEn)}</MetricTitle>
                <MetricBody>{t(item.bodyKo, item.bodyEn)}</MetricBody>
              </MetricCard>
            ))}
          </MetricGrid>
        </P.PageContainer>
      </EditorialSection>

      <EditorialSection $tone="navy">
        <NavyLayout data-reveal>
          <div>
            <Kicker $light>Core Value</Kicker>
            <SectionTitle $light>{t('100년의 Goal을 향한 신한의 기준', 'Shinhan’s standard for the 100-year goal')}</SectionTitle>
            <Rule $light />
            <MessageBody $light>
              {t(
                '서비스의 폭은 넓어졌지만 기준은 분명합니다. 고객의 성공을 중심에 두고 정확한 실행과 신뢰의 태도로 움직입니다.',
                'Our services have expanded, but our standard remains clear. We move with accurate execution and trust, centered on client success.',
              )}
            </MessageBody>
          </div>
          <ValueList>
            {managementValues.map((item) => (
              <ValueRow key={item.title}>
                <ValueTitle>{tx(item.title)}</ValueTitle>
                <ValueBody>{tx(item.body)}</ValueBody>
              </ValueRow>
            ))}
          </ValueList>
        </NavyLayout>
      </EditorialSection>
    </>
  );
}
