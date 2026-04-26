import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useI18n } from '../../i18n/useI18n';

const blogSeries = [
  {
    id: 'blog-1',
    title: '수출입통관 실무 브리핑',
    summary: '월간 핵심 규정 변화와 신고 실무 체크포인트를 아카이브 형태로 제공합니다.',
    updatedAt: '2026.04',
  },
  {
    id: 'blog-2',
    title: '조사 대응 인사이트',
    summary: '관세조사·범칙조사 대응 과정에서 자주 발생하는 쟁점을 사례 중심으로 정리합니다.',
    updatedAt: '2026.03',
  },
  {
    id: 'blog-3',
    title: '원산지·FTA 운영 가이드',
    summary: '원산지 판정, 증빙 관리, 사후검증 준비를 실무 단계별로 설명합니다.',
    updatedAt: '2026.02',
  },
];

const ArchiveList = styled.div`
  margin-top: 20px;
  border-top: 1px solid rgba(20, 74, 149, 0.22);
`;

const ArchiveItem = styled.article`
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  padding: 16px 0;
  border-bottom: 1px solid rgba(20, 74, 149, 0.11);

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ArchiveDate = styled.time`
  color: #5e7899;
  font-size: 0.82rem;
  font-weight: 700;
`;

const ArchiveBody = styled.div`
  display: grid;
  gap: 4px;
`;

const ArchiveTitle = styled.h3`
  margin: 0;
  color: #143d70;
  font-size: 1.02rem;
  line-height: 1.45;
`;

const ArchiveSummary = styled.p`
  margin: 0;
  color: #506b8d;
  font-size: 0.9rem;
  line-height: 1.6;
`;

export function BlogPage() {
  const { t } = useI18n();
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
            <P.Kicker>Blog Archive</P.Kicker>
            <P.Title>{t('블로그', 'Blog')}</P.Title>
            <P.Lead>
              {t(
                '블로그는 업무 인사이트를 아카이브 형태로 정리해 분야별 참고 자료로 활용할 수 있도록 구성했습니다.',
                'The blog is organized as a knowledge archive for practice-area references.',
              )}
            </P.Lead>
          </P.IntroPanel>
          <P.IntroVisualPanel image="/subpages/service-main-vietnam.jpg" minHeight={320} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <ArchiveList>
            {blogSeries.map((item) => (
              <ArchiveItem key={item.id}>
                <ArchiveDate>{item.updatedAt}</ArchiveDate>
                <ArchiveBody>
                  <ArchiveTitle>{t(item.title, item.title)}</ArchiveTitle>
                  <ArchiveSummary>{t(item.summary, item.summary)}</ArchiveSummary>
                </ArchiveBody>
              </ArchiveItem>
            ))}
          </ArchiveList>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
