import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { seminarItems } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const SeminarList = styled.div`
  margin-top: 20px;
  border-top: 1px solid rgba(20, 74, 149, 0.22);
`;

const SeminarItem = styled.article`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  padding: 16px 0;
  border-bottom: 1px solid rgba(20, 74, 149, 0.11);

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 10px;
  width: fit-content;
  border-radius: 999px;
  border: 1px solid rgba(20, 75, 157, 0.24);
  background: #f1f7ff;
  color: #1d4f97;
  font-size: 0.78rem;
  font-weight: 800;
`;

const SeminarBody = styled.div`
  display: grid;
  gap: 4px;
`;

const SeminarTitle = styled.h3`
  margin: 0;
  color: #143c6f;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.45;
`;

const SeminarDesc = styled.p`
  margin: 0;
  color: #4f6b8d;
  font-size: 0.9rem;
  line-height: 1.6;
`;

export function SeminarPage() {
  const { t, tx } = useI18n();
  const newsSubnav = sectionSubnav.news;

  return (
    <>
      <P.HeroSection>
        <P.PageContainer>
        <LandingSubnav
          kicker={newsSubnav.kicker}
          kickerEn={newsSubnav.kickerEn}
          title={newsSubnav.title}
          titleEn={newsSubnav.titleEn}
          summary={newsSubnav.summary}
          summaryEn={newsSubnav.summaryEn}
          items={newsSubnav.items}
        />

        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <P.IntroPanel>
            <P.Kicker>Seminar</P.Kicker>
            <P.Title>{t('세미나', 'Seminar')}</P.Title>
            <P.Lead>
              {t(
                '예정 및 완료 세미나를 아카이브 형태로 정리해 주요 주제와 진행 상태를 함께 확인할 수 있습니다.',
                'Upcoming and completed seminars are organized in archive format with topic and status.',
              )}
            </P.Lead>
          </P.IntroPanel>
          <P.IntroVisualPanel image="/subpages/service-main-consulting.jpg" minHeight={320} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <SeminarList>
            {seminarItems.map((item) => (
              <SeminarItem key={item.title}>
                <Status>{tx(item.status)}</Status>
                <SeminarBody>
                  <SeminarTitle>{tx(item.title)}</SeminarTitle>
                  <SeminarDesc>{tx(item.body)}</SeminarDesc>
                </SeminarBody>
              </SeminarItem>
            ))}
          </SeminarList>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
