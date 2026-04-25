import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { aboutTimeline } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const HistoryHero = styled(P.HeroGrid)`
  align-items: stretch;
`;

const HistoryVisual = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(19, 75, 154, 0.15);
  background: url('/subpages/about-history.jpg') center / cover no-repeat;
  min-height: 320px;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  margin-top: 8px;

  &::before {
    content: '';
    position: absolute;
    left: 84px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(23, 79, 160, 0.2);
  }

  @media (max-width: 700px) {
    &::before {
      left: 62px;
    }
  }
`;

const TimelineItem = styled.article`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 18px;
  padding: 16px 0;
  position: relative;

  @media (max-width: 700px) {
    grid-template-columns: 52px minmax(0, 1fr);
    gap: 14px;
  }
`;

const Year = styled.strong`
  color: #1a4f96;
  font-size: 1.03rem;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    right: -17px;
    top: 8px;
    width: 10px;
    height: 10px;
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
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid rgba(20, 76, 158, 0.16);
  background: #ffffff;
  color: #38557b;
  font-size: 0.94rem;
  line-height: 1.6;
`;

const MilestoneGrid = styled(P.Grid)`
  margin-top: 18px;
`;

export function HistoryPage() {
  const { t, tx } = useI18n();
  const milestoneYears = new Set(['1965', '1993', '2010', '2019', '2025']);
  const milestones = aboutTimeline.filter((item) => milestoneYears.has(item.year));

  return (
    <>
      <P.HeroSection>
        <HistoryHero data-reveal>
          <div>
            <P.Kicker>History</P.Kicker>
            <P.Title>{t('연혁', 'History')}</P.Title>
            <P.Lead>
              {t(
                '1965년 창립 이후 전국 지사 확대와 해외 법인 설립까지, 신한관세법인의 주요 이력을 연도별로 정리했습니다.',
                'From our founding in 1965 to branch expansion and overseas incorporation, key milestones are organized by year.',
              )}
            </P.Lead>
          </div>
          <HistoryVisual aria-hidden="true" />
        </HistoryHero>
      </P.HeroSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Milestone</P.Kicker>
          <P.SectionTitle>{t('주요 이정표', 'Key Milestones')}</P.SectionTitle>
          <MilestoneGrid columns={3}>
            {milestones.map((item) => (
              <P.Card key={item.year}>
                <P.CardTitle>{item.year}</P.CardTitle>
                <P.CardText>{tx(item.event)}</P.CardText>
              </P.Card>
            ))}
          </MilestoneGrid>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Timeline</P.Kicker>
          <P.SectionTitle>{t('연도별 이력', 'Timeline')}</P.SectionTitle>
          <Timeline>
            {aboutTimeline.map((item) => (
              <TimelineItem key={`${item.year}-${item.event}`}>
                <Year>{item.year}</Year>
                <Event>{tx(item.event)}</Event>
              </TimelineItem>
            ))}
          </Timeline>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
