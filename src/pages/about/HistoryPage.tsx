import styled from '@emotion/styled';

import { palette } from '../../components/home/homeStyles';
import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { aboutTimeline, historyMilestones } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const HistorySection = styled(E.Section)`
  padding: clamp(92px, 10vw, 156px) 0;
`;

const HistorySectionTitle = styled(E.SectionTitle)`
  max-width: 980px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.12rem, 3.65vw, 3.48rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
`;

const HistoryContainer = styled(P.PageContainer)`
  max-width: 1480px;
`;

const FeaturedMilestone = styled(E.LinePanel)`
  display: grid;
  gap: 12px;
  margin: 26px 0 20px;
`;

const FeaturedYear = styled.span`
  display: block;
  margin: 0 0 10px 6px;
  color: ${palette.blue};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const HistoryIntroLayout = styled(P.PageContainer)`
  display: grid;
  grid-template-columns: minmax(320px, 0.34fr) minmax(0, 0.66fr);
  gap: clamp(42px, 6.2vw, 104px);
  align-items: start;
  max-width: 1480px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HistoryFigure = styled.figure`
  margin: 0;
`;

const HistoryImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const HistoryArticle = styled.article`
  display: grid;
  gap: clamp(28px, 4vw, 48px);
`;

const HistoryKicker = styled.span`
  display: block;
  margin: 0 0 10px 6px;
  color: ${palette.blue};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.17em;
  text-transform: uppercase;
`;

const HistoryTitle = styled.h2`
  max-width: 980px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.12rem, 3.65vw, 3.48rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.035em;
  text-wrap: balance;
`;

const HistoryBodyStack = styled.div`
  display: grid;
  gap: 22px;
`;

const HistoryLead = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.18vw, 1.14rem);
  font-weight: 400;
  line-height: 1.84;
  word-break: keep-all;
`;

const HistoryBody = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.18vw, 1.14rem);
  line-height: 1.84;
  word-break: keep-all;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: relative;
  margin-top: 4px;

  &::before {
    content: '';
    position: absolute;
    left: 94px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(23, 79, 160, 0.18);
  }

  @media (max-width: 700px) {
    &::before {
      left: 66px;
    }
  }
`;

const TimelineItem = styled.article`
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 20px;
  padding: 2px 0;
  position: relative;

  @media (max-width: 700px) {
    grid-template-columns: 54px minmax(0, 1fr);
    gap: 14px;
  }
`;

const Year = styled.strong`
  color: ${palette.blue};
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 8px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #2a6ac3;
    background: #f5f9ff;
  }

  @media (max-width: 700px) {
    &::after {
      right: -13px;
    }
  }
`;

const Event = styled.div`
  padding: 14px 16px;
  border-radius: 0;
  border-top: 1px solid #d8dee8;
  background: #ffffff;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.18vw, 1.14rem);
  line-height: 1.84;
`;

const EraPanel = styled.section`
  margin-top: 18px;
  padding: 24px 0;
  border-top: 1px solid #d8dee8;
  background: transparent;
`;

const MilestoneCard = styled(E.LinePanel)`
  gap: 8px;
  min-height: 100%;
`;

const MilestoneYear = styled.strong`
  display: block;
  margin: 0 0 10px 6px;
  color: ${palette.blue};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const MilestoneTitle = styled(P.CardTitle)`
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  line-height: 1.18;
`;

const EraHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(19, 75, 154, 0.12);
  margin-bottom: 16px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const EraTitle = styled.h3`
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.18;
`;

const EraCount = styled.span`
  color: #4a6590;
  font-size: 0.82rem;
  font-weight: 800;
`;

const EventList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #43617f;
  display: grid;
  gap: 6px;
`;

const periodOrder = ['2011-current', '2001-2010', '1965-2000'] as const;

export function HistoryPage() {
  const { t } = useI18n();
  const aboutSubnav = sectionSubnav.about;
  const featuredMilestone = historyMilestones[historyMilestones.length - 1];
  const supportingMilestones = historyMilestones.slice(0, historyMilestones.length - 1);

  const groupedByPeriod = periodOrder.map((period) => {
    const items = aboutTimeline.filter((item) => item.period === period);
    const byYear = Array.from(new Set(items.map((item) => item.year))).map((year) => ({
      year,
      events: items.filter((item) => item.year === year).map((item) => item.event),
    }));
    return { period, byYear };
  });

  const getPeriodTitle = (period: (typeof periodOrder)[number]) => {
    if (period === '2011-current') return t('2011년~현재', '2011–Present');
    if (period === '2001-2010') return t('2001년~2010년', '2001–2010');
    return t('1965년~2000년', '1965–2000');
  };

  return (
    <>
      <EditorialPageHeader
        config={aboutSubnav}
        title="연혁"
        titleEn="History"
        heroImage="/hero/menu-about-history-ai.png"
        heroPosition="center 50%"
      />

      <HistorySection>
        <HistoryIntroLayout data-reveal>
          <HistoryFigure>
            <HistoryImage src="/about/history-tongkwansa-cropped.jpg" alt="" aria-hidden="true" />
          </HistoryFigure>

          <HistoryArticle>
            <div>
              <HistoryKicker>History</HistoryKicker>
              <HistoryTitle>
                {t(
                  '1965년부터 이어온 신한의 성장 기록',
                  'A record of Shinhan’s growth since 1965.',
                )}
              </HistoryTitle>
            </div>

            <HistoryBodyStack>
              <HistoryLead>
              {t(
                '창립 이후 축적해온 신한관세법인의 주요 이력을 연대별로 정리했습니다. 신한은 고객의 무역 현장과 함께 성장하며 전국 지사와 해외 거점을 넓혀왔습니다.',
                'This page presents Shinhan Customs Service milestones by period. Shinhan has grown alongside clients’ trade operations while expanding domestic branches and overseas hubs.',
              )}
              </HistoryLead>
              <HistoryBody>
                {t(
                  '서울통관사로 출발한 신한관세법인은 관세 실무의 기준을 현장에서 쌓아왔고, 변화하는 무역 환경에 맞춰 통관·컨설팅·물류·해외 네트워크로 서비스 영역을 확장해 왔습니다.',
                  'Starting as Seoul Customs Service, Shinhan has built its customs practice in the field and expanded into clearance, consulting, logistics, and overseas networks as trade environments changed.',
                )}
              </HistoryBody>
            </HistoryBodyStack>

            <E.FactGrid>
              <E.Fact>
                <E.FactValue>1965</E.FactValue>
                <E.FactLabel>{t('서울통관사 창립', 'Founded as Seoul Customs Service')}</E.FactLabel>
              </E.Fact>
              <E.Fact>
                <E.FactValue>60 Years+</E.FactValue>
                <E.FactLabel>{t('관세·무역 서비스 경험', 'Years of customs and trade experience')}</E.FactLabel>
              </E.Fact>
              <E.Fact>
                <E.FactValue>Global</E.FactValue>
                <E.FactLabel>{t('국내외 네트워크 확장', 'Domestic and overseas network')}</E.FactLabel>
              </E.Fact>
            </E.FactGrid>
          </HistoryArticle>
        </HistoryIntroLayout>
      </HistorySection>

      <HistorySection $tone="soft">
        <HistoryContainer data-reveal>
          <E.Eyebrow>Milestone</E.Eyebrow>
          <HistorySectionTitle>{t('주요 이정표', 'Key Milestones')}</HistorySectionTitle>
          <E.Rule />
          <E.Body style={{ marginTop: 24 }}>
            {t(
              '신한관세법인은 창립 이후 고객의 무역 실무를 가까이에서 지원하며 서비스 영역과 네트워크를 확장해 왔습니다.',
              'Since its founding, Shinhan Customs Service has expanded its service scope and network by supporting clients close to the trade field.',
            )}
          </E.Body>
          {featuredMilestone ? (
            <FeaturedMilestone>
              <FeaturedYear>{featuredMilestone.year}</FeaturedYear>
              <HistorySectionTitle>
                {t(featuredMilestone.ko, featuredMilestone.en)}
              </HistorySectionTitle>
              <E.Body>
                {t(
                  '신한관세법인은 1965년 창립 이후 2025년 창립 60주년을 맞이하며, 국내외 네트워크와 서비스 체계를 지속적으로 확장해 왔습니다.',
                  'Since 1965, Shinhan Customs Service has reached its 60th anniversary in 2025 while continuously expanding its domestic and overseas network.',
                )}
              </E.Body>
            </FeaturedMilestone>
          ) : null}
          <P.MilestoneBand style={{ marginTop: 20 }}>
            {supportingMilestones.map((item) => (
              <MilestoneCard key={item.year}>
                <MilestoneYear>{item.year}</MilestoneYear>
                <MilestoneTitle>{t(item.ko, item.en)}</MilestoneTitle>
              </MilestoneCard>
            ))}
          </P.MilestoneBand>
        </HistoryContainer>
      </HistorySection>

      <HistorySection>
        <HistoryContainer data-reveal>
          <E.Eyebrow>Timeline</E.Eyebrow>
          <HistorySectionTitle>{t('연대별 상세 연혁', 'Timeline by Era')}</HistorySectionTitle>

          {groupedByPeriod.map((group) => (
            <EraPanel key={group.period}>
              <EraHead>
                <EraTitle>{getPeriodTitle(group.period)}</EraTitle>
                <EraCount>{t(`${group.byYear.length}개 연도`, `${group.byYear.length} years`)}</EraCount>
              </EraHead>
              <Timeline>
                {group.byYear.map((item) => (
                  <TimelineItem key={`${group.period}-${item.year}`}>
                    <Year>{item.year}</Year>
                    <Event>
                      <EventList>
                        {item.events.map((event) => (
                          <li key={`${item.year}-${event}`}>{event}</li>
                        ))}
                      </EventList>
                    </Event>
                  </TimelineItem>
                ))}
              </Timeline>
            </EraPanel>
          ))}
        </HistoryContainer>
      </HistorySection>
    </>
  );
}
