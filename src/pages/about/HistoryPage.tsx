import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { aboutTimeline, historyMilestones } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const FeaturedMilestone = styled(P.QuotePanel)`
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
`;

const FeaturedYear = styled.span`
  color: #1f5cb2;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
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
  color: #1a4f96;
  font-size: 1.03rem;
  font-weight: 700;
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
  border-radius: 8px;
  border: 1px solid rgba(20, 76, 158, 0.16);
  background: #ffffff;
  color: #35567f;
  font-size: 0.94rem;
  line-height: 1.64;
`;

const EraPanel = styled(P.Panel)`
  margin-top: 18px;
  padding: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 249, 255, 0.94));
`;

const MilestoneCard = styled(P.StatementBlock)`
  gap: 8px;
  min-height: 100%;
`;

const MilestoneYear = styled.strong`
  color: #1a4f96;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
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
  color: #13417f;
  font-size: clamp(1.14rem, 2.2vw, 1.38rem);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const EraCount = styled.span`
  color: #4a6590;
  font-size: 0.84rem;
  font-weight: 700;
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
            <P.Kicker>History</P.Kicker>
            <P.Title>{t('연혁', 'History')}</P.Title>
            <P.Lead>
              {t(
                '1965년 창립 이후 축적해온 신한관세법인의 주요 이력을 연대별로 정리했습니다.',
                'This page presents Shinhan Customs Service milestones by period since our founding in 1965.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '창립 50주년(2015)에 이어 2025년 창립 60주년을 맞이했으며, 전국 지사 및 해외 법인과 함께 성장해 왔습니다.',
                'Following our 50th anniversary in 2015, we reached our 60th anniversary in 2025 and have continued to grow with domestic branches and overseas entities.',
              )}
            </P.Lead>
          </P.IntroPanel>
          <P.IntroVisualPanel image="/subpages/about-history.jpg" minHeight={360} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Milestone</P.Kicker>
          <P.SectionTitle>{t('주요 이정표', 'Key Milestones')}</P.SectionTitle>
          {featuredMilestone ? (
            <FeaturedMilestone>
              <FeaturedYear>{featuredMilestone.year}</FeaturedYear>
              <P.SectionTitle style={{ marginTop: 0 }}>
                {t(featuredMilestone.ko, featuredMilestone.en)}
              </P.SectionTitle>
              <P.CardText>
                {t(
                  '신한관세법인은 1965년 창립 이후 2025년 창립 60주년을 맞이하며, 국내외 네트워크와 서비스 체계를 지속적으로 확장해 왔습니다.',
                  'Since 1965, Shinhan Customs Service has reached its 60th anniversary in 2025 while continuously expanding its domestic and overseas network.',
                )}
              </P.CardText>
            </FeaturedMilestone>
          ) : null}
          <P.MilestoneBand>
            {supportingMilestones.map((item) => (
              <MilestoneCard key={item.year}>
                <MilestoneYear>{item.year}</MilestoneYear>
                <P.CardTitle>{t(item.ko, item.en)}</P.CardTitle>
              </MilestoneCard>
            ))}
          </P.MilestoneBand>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Timeline</P.Kicker>
          <P.SectionTitle>{t('연대별 상세 연혁', 'Timeline by Era')}</P.SectionTitle>

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
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
