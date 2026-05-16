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

const SectionIntro = styled.div`
  display: grid;
  gap: 0;
`;

const MilestoneShowcase = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 0.34fr) minmax(0, 0.66fr);
  gap: clamp(22px, 3vw, 34px);
  margin-top: clamp(38px, 5vw, 64px);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedMilestone = styled.article`
  position: relative;
  display: grid;
  align-content: end;
  min-height: clamp(300px, 28vw, 440px);
  padding: clamp(28px, 3.4vw, 46px);
  overflow: hidden;
  color: #ffffff;
  background:
    linear-gradient(135deg, rgba(8, 31, 69, 0.96) 0%, rgba(18, 75, 151, 0.94) 62%, rgba(23, 159, 150, 0.84) 100%);
  box-shadow: 0 26px 54px rgba(10, 38, 84, 0.18);

  &::before {
    content: '';
    position: absolute;
    inset: 22px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    pointer-events: none;
  }

  &::after {
    content: '60';
    position: absolute;
    right: -10px;
    top: -34px;
    color: rgba(255, 255, 255, 0.08);
    font-size: clamp(8rem, 14vw, 15rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.08em;
  }
`;

const FeaturedYear = styled.span`
  display: block;
  margin: 0 0 14px;
  color: rgba(230, 242, 255, 0.82);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h3`
  position: relative;
  z-index: 1;
  max-width: 420px;
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.08rem, 3.2vw, 3.45rem);
  font-weight: 850;
  line-height: 1.08;
  letter-spacing: -0.045em;
  word-break: keep-all;
`;

const FeaturedBody = styled.p`
  position: relative;
  z-index: 1;
  max-width: 440px;
  margin: 18px 0 0;
  color: rgba(230, 242, 255, 0.84);
  font-size: clamp(0.98rem, 1.08vw, 1.06rem);
  line-height: 1.78;
  word-break: keep-all;
`;

const MilestoneRail = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;

  &::before {
    content: '';
    position: absolute;
    left: 8%;
    right: 8%;
    top: 52px;
    height: 1px;
    background: linear-gradient(90deg, rgba(31, 92, 178, 0), rgba(31, 92, 178, 0.32), rgba(31, 92, 178, 0));
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    &::before {
      display: none;
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const MilestoneCard = styled.article`
  position: relative;
  display: grid;
  align-content: start;
  gap: 18px;
  min-height: 210px;
  padding: clamp(24px, 2.5vw, 32px);
  border: 1px solid #d8e2ef;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 251, 255, 0.96)),
    #ffffff;
  box-shadow: 0 20px 42px rgba(16, 54, 112, 0.08);

  &::before {
    content: '';
    width: 38px;
    height: 38px;
    border: 8px solid rgba(31, 92, 178, 0.12);
    border-top-color: #1f5cb2;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: inset 0 0 0 1px rgba(31, 92, 178, 0.1);
  }
`;

const MilestoneYear = styled.strong`
  color: ${palette.blue};
  font-size: clamp(1.48rem, 2vw, 2.05rem);
  font-weight: 850;
  line-height: 1;
  letter-spacing: -0.045em;
`;

const MilestoneTitle = styled.h4`
  margin: 0;
  color: #172337;
  font-size: clamp(1.08rem, 1.3vw, 1.24rem);
  font-weight: 800;
  line-height: 1.38;
  letter-spacing: -0.025em;
  word-break: keep-all;
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
  letter-spacing: 0.08em;
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

const TimelineBoard = styled.div`
  display: grid;
  gap: clamp(22px, 3vw, 32px);
  margin-top: clamp(40px, 5vw, 66px);
`;

const EraPanel = styled.section`
  display: grid;
  grid-template-columns: minmax(220px, 0.24fr) minmax(0, 0.76fr);
  min-height: 240px;
  border: 1px solid #d8e2ef;
  background: #ffffff;
  box-shadow: 0 22px 48px rgba(16, 54, 112, 0.07);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const EraHead = styled.div`
  position: relative;
  display: grid;
  align-content: space-between;
  gap: 26px;
  padding: clamp(26px, 3.2vw, 42px);
  overflow: hidden;
  color: #ffffff;
  background:
    linear-gradient(155deg, rgba(9, 37, 76, 0.98), rgba(18, 72, 142, 0.94)),
    #09254c;

  &::after {
    content: attr(data-index);
    position: absolute;
    right: -10px;
    bottom: -24px;
    color: rgba(255, 255, 255, 0.08);
    font-size: clamp(5.4rem, 9vw, 9.5rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.08em;
  }

  @media (max-width: 900px) {
    min-height: 170px;
  }
`;

const EraTitle = styled.h3`
  position: relative;
  z-index: 1;
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.54rem, 2.25vw, 2.28rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.14;
`;

const Timeline = styled.div`
  position: relative;
  display: grid;
  padding: clamp(22px, 3vw, 38px) clamp(22px, 3.6vw, 48px);
  --timeline-year-width: clamp(70px, 8vw, 104px);
  --timeline-dot-column: 30px;
  --timeline-col-gap: clamp(14px, 2.4vw, 26px);
  --timeline-line-x: calc(var(--timeline-year-width) + var(--timeline-col-gap) + (var(--timeline-dot-column) / 2));

  &::after {
    content: '';
    position: absolute;
    left: calc(clamp(22px, 3.6vw, 48px) + var(--timeline-line-x));
    top: 42px;
    bottom: 42px;
    width: 1px;
    background: linear-gradient(180deg, rgba(31, 92, 178, 0), rgba(31, 92, 178, 0.24), rgba(31, 92, 178, 0));
  }

  @media (max-width: 640px) {
    &::after {
      display: none;
    }
  }
`;

const TimelineItem = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: var(--timeline-year-width) var(--timeline-dot-column) minmax(0, 1fr);
  column-gap: var(--timeline-col-gap);
  align-items: start;
  padding: 18px 0;
  border-bottom: 1px solid #edf1f7;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    padding-bottom: 0;
    border-bottom: 0;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Year = styled.strong`
  color: #0f3f84;
  font-size: clamp(1.22rem, 1.7vw, 1.62rem);
  font-weight: 850;
  letter-spacing: -0.035em;
  line-height: 1.12;
`;

const TimelineDot = styled.span`
  position: relative;
  z-index: 1;
  justify-self: center;
  width: 13px;
  height: 13px;
  margin-top: 0.42rem;
  border: 3px solid #ffffff;
  border-radius: 50%;
  background: #1f5cb2;
  box-shadow: 0 0 0 4px rgba(31, 92, 178, 0.12);

  @media (max-width: 640px) {
    display: none;
  }
`;

const Event = styled.div`
  min-width: 0;
`;

const EventList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
  color: #4d5a6c;
  font-size: clamp(0.98rem, 1.08vw, 1.06rem);
  line-height: 1.7;
  word-break: keep-all;

  li {
    padding-left: 0;
  }
`;

const periodOrder = ['2011-current', '2001-2010', '1965-2000'] as const;

export function HistoryPage() {
  const { t } = useI18n();
  const aboutSubnav = sectionSubnav.about;
  const sortedMilestones = [...historyMilestones].sort((a, b) => Number(b.year) - Number(a.year));
  const featuredMilestone = sortedMilestones[0];
  const supportingMilestones = sortedMilestones.slice(1);

  const groupedByPeriod = periodOrder.map((period) => {
    const items = aboutTimeline
      .filter((item) => item.period === period)
      .sort((a, b) => Number(b.year) - Number(a.year));
    const byYear = Array.from(new Set(items.map((item) => item.year))).map((year) => ({
      year,
      events: items.filter((item) => item.year === year).map((item) => ({ ko: item.event, en: item.eventEn })),
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
          <SectionIntro>
            <div>
              <E.Eyebrow>Milestone</E.Eyebrow>
              <HistorySectionTitle>{t('주요 이정표', 'Key Milestones')}</HistorySectionTitle>
            </div>
          </SectionIntro>

          <MilestoneShowcase>
            {featuredMilestone ? (
              <FeaturedMilestone>
                <div>
                  <FeaturedYear>{featuredMilestone.year}</FeaturedYear>
                  <FeaturedTitle>{t(featuredMilestone.ko, featuredMilestone.en)}</FeaturedTitle>
                  <FeaturedBody>
                    {t(
                      '1965년 서울통관사로 시작한 신한은 60년의 경험을 기반으로 국내외 관세·무역 서비스를 확장해 왔습니다.',
                      'Since beginning as Seoul Customs Service in 1965, Shinhan has expanded customs and trade services at home and abroad on 60 years of experience.',
                    )}
                  </FeaturedBody>
                </div>
              </FeaturedMilestone>
            ) : null}
            <MilestoneRail>
              {supportingMilestones.map((item) => (
                <MilestoneCard key={item.year}>
                  <MilestoneYear>{item.year}</MilestoneYear>
                  <MilestoneTitle>{t(item.ko, item.en)}</MilestoneTitle>
                </MilestoneCard>
              ))}
            </MilestoneRail>
          </MilestoneShowcase>
        </HistoryContainer>
      </HistorySection>

      <HistorySection>
        <HistoryContainer data-reveal>
          <SectionIntro>
            <div>
              <E.Eyebrow>Timeline</E.Eyebrow>
              <HistorySectionTitle>{t('연대별 상세 연혁', 'Timeline by Era')}</HistorySectionTitle>
            </div>
          </SectionIntro>

          <TimelineBoard>
            {groupedByPeriod.map((group, index) => (
              <EraPanel key={group.period}>
                <EraHead data-index={String(index + 1).padStart(2, '0')}>
                  <EraTitle>{getPeriodTitle(group.period)}</EraTitle>
                </EraHead>
                <Timeline>
                  {group.byYear.map((item) => (
                    <TimelineItem key={`${group.period}-${item.year}`}>
                      <Year>{item.year}</Year>
                      <TimelineDot aria-hidden="true" />
                      <Event>
                        <EventList>
                          {item.events.map((event) => (
                            <li key={`${item.year}-${event.ko}`}>{t(event.ko, event.en)}</li>
                          ))}
                        </EventList>
                      </Event>
                    </TimelineItem>
                  ))}
                </Timeline>
              </EraPanel>
            ))}
          </TimelineBoard>
        </HistoryContainer>
      </HistorySection>
    </>
  );
}
