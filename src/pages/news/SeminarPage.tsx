import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { palette } from '../../components/home/homeStyles';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useShinhanNewsRecords } from '../../hooks/useNewsContent';
import { useI18n } from '../../i18n/useI18n';
import type { ShinhanNewsRecord } from '../../types/site';
import { sortShinhanNewsRecords } from '../../utils/shinhanNews';

const PAGE_SIZE = 12;

const FlushPageSection = styled(P.CompactPageSection)`
  padding-top: 0;
`;

const SeminarLeadCard = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
  gap: 18px;
  align-items: stretch;
  margin-bottom: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const LeadPanel = styled.div`
  padding: clamp(24px, 3vw, 34px);
  border-radius: 26px;
  border: 1px solid ${palette.line};
  background:
    radial-gradient(circle at 14% 18%, rgba(214, 154, 54, 0.16), transparent 22%),
    radial-gradient(circle at 88% 10%, rgba(23, 159, 150, 0.14), transparent 26%),
    linear-gradient(135deg, #ffffff 0%, #edf6ff 100%);
  box-shadow: 0 26px 48px rgba(16, 53, 114, 0.1);
`;

const LeadTitle = styled.h1`
  margin: 10px 0 0;
  color: ${palette.textStrong};
  font-size: clamp(2.25rem, 4.2vw, 4.2rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.055em;
`;

const LeadText = styled.p`
  margin: 16px 0 0;
  max-width: 720px;
  color: ${palette.textBody};
  font-size: 1rem;
  line-height: 1.74;
`;

const LeadStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
`;

const StatPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(24, 74, 149, 0.16);
  background: rgba(255, 255, 255, 0.72);
  color: ${palette.blueDeep};
  font-size: 0.88rem;
  font-weight: 800;
`;

const VisualPanel = styled.div`
  position: relative;
  min-height: 260px;
  overflow: hidden;
  border-radius: 26px;
  border: 1px solid rgba(24, 74, 149, 0.16);
  background:
    linear-gradient(135deg, rgba(11, 47, 92, 0.88), rgba(25, 94, 181, 0.78)),
    url('/subpages/service-main-consulting.jpg') center / cover no-repeat;
  box-shadow: 0 26px 48px rgba(16, 53, 114, 0.12);

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.28);
  }

  &::before {
    width: 220px;
    height: 220px;
    right: -54px;
    top: -42px;
  }

  &::after {
    width: 150px;
    height: 150px;
    left: 34px;
    bottom: -50px;
  }
`;

const VisualText = styled.div`
  position: absolute;
  inset: auto 24px 24px;
  color: #ffffff;
`;

const VisualKicker = styled.span`
  display: block;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const VisualTitle = styled.strong`
  display: block;
  margin-top: 8px;
  font-size: clamp(1.6rem, 2.7vw, 2.4rem);
  font-weight: 900;
  line-height: 1.06;
  letter-spacing: -0.04em;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const SeminarCardLink = styled(Link)`
  display: grid;
  min-height: 100%;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(24, 74, 149, 0.14);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 22px 40px rgba(16, 53, 114, 0.09);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(24, 74, 149, 0.3);
    box-shadow: 0 28px 52px rgba(16, 53, 114, 0.15);
  }
`;

const SeminarVisual = styled.div`
  position: relative;
  min-height: 190px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 20%, rgba(214, 154, 54, 0.34), transparent 24%),
    linear-gradient(135deg, #143c72 0%, #1f69c5 70%, #179f96 100%);
`;

const SeminarImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 190px;
  object-fit: cover;
`;

const SeminarVisualFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 22px;
  color: #ffffff;
`;

const SeminarVisualMark = styled.span`
  width: fit-content;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const SeminarVisualDate = styled.strong`
  max-width: 92%;
  font-size: clamp(1.22rem, 1.8vw, 1.68rem);
  line-height: 1.16;
  letter-spacing: -0.04em;
`;

const CardBody = styled.div`
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 20px 20px 22px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 11px;
  border-radius: 999px;
  background: rgba(24, 74, 149, 0.08);
  color: ${palette.blueDeep};
  font-size: 0.76rem;
  font-weight: 900;
`;

const DateText = styled.time`
  color: ${palette.textMuted};
  font-size: 0.82rem;
  font-weight: 800;
`;

const SeminarTitle = styled.h2`
  margin: 0;
  color: ${palette.textStrong};
  font-size: 1.08rem;
  font-weight: 900;
  line-height: 1.42;
  letter-spacing: -0.035em;
`;

const SeminarSummary = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 0.92rem;
  line-height: 1.64;
`;

const SeminarAction = styled.span`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  min-height: 32px;
  margin-top: 2px;
  color: ${palette.blue};
  font-size: 0.84rem;
  font-weight: 900;
`;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

function extractFirstImage(bodyHtml?: string) {
  const match = bodyHtml?.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1]?.replace(/^http:\/\//, 'https://');
}

function getSeminarDateLabel(item: ShinhanNewsRecord) {
  const match = item.title.match(/\[(.*?)\]/);
  return match?.[1] ?? item.publishedAt;
}

export function SeminarPage() {
  const { t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { items, loading } = useShinhanNewsRecords();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const seminarItems = useMemo(() => sortShinhanNewsRecords(items).filter((item) => item.category === 'seminar'), [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);

    if (!normalizedQuery) {
      return seminarItems;
    }

    return seminarItems.filter((item) => {
      const target = normalizeSearch([item.title, item.summary, item.categoryLabel, item.publishedAt].join(' '));
      return target.includes(normalizedQuery);
    });
  }, [searchQuery, seminarItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const activePage = Math.min(currentPage, totalPages);
  const pagedItems = useMemo(
    () => filteredItems.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE),
    [activePage, filteredItems],
  );

  return (
    <>
      <P.CompactHeroSection>
        <P.PageContainer>
          <LandingSubnav
            kicker={newsSubnav.kicker}
            kickerEn={newsSubnav.kickerEn}
            title={newsSubnav.title}
            titleEn={newsSubnav.titleEn}
            summary={newsSubnav.summary}
            summaryEn={newsSubnav.summaryEn}
            items={newsSubnav.items}
            compactBottom
          />
        </P.PageContainer>
      </P.CompactHeroSection>

      <FlushPageSection tone="soft">
        <P.PageContainer>
          <SeminarLeadCard>
            <LeadPanel>
              <P.Kicker>Seminar Archive</P.Kicker>
              <LeadTitle>{t('세미나', 'Seminar')}</LeadTitle>
              <LeadText>
                {t(
                  '신한관세법인의 주요 교육·세미나 일정을 카드형 아카이브로 정리했습니다. 주제별 실무 인사이트와 상세 안내를 빠르게 확인할 수 있습니다.',
                  'Shinhan’s seminars and training sessions are organized as a card archive for quick access to topics and details.',
                )}
              </LeadText>
              <LeadStats>
                <StatPill>{t(`총 ${seminarItems.length}건`, `${seminarItems.length} seminars`)}</StatPill>
                <StatPill>{t('카드형 목록', 'Card archive')}</StatPill>
                <StatPill>{t('상세 안내 제공', 'Detail available')}</StatPill>
              </LeadStats>
            </LeadPanel>
            <VisualPanel aria-hidden="true">
              <VisualText>
                <VisualKicker>Shinhan Customs Service</VisualKicker>
                <VisualTitle>Practical Customs Seminars</VisualTitle>
              </VisualText>
            </VisualPanel>
          </SeminarLeadCard>

          <NewsListToolbar
            searchLabel={t('검색', 'Search')}
            searchValue={searchQuery}
            searchPlaceholder={t('세미나 제목, 요약, 날짜로 검색', 'Search by seminar title, summary, or date')}
            onSearchChange={setSearchQuery}
            resultLabel={t(`총 ${filteredItems.length}건`, `${filteredItems.length} results`)}
          />

          {loading ? <P.CardText>{t('세미나를 불러오는 중입니다.', 'Loading seminars.')}</P.CardText> : null}
          {!loading && filteredItems.length === 0 ? (
            <P.CardText>{t('검색 조건에 맞는 세미나가 없습니다.', 'No seminars match the current filters.')}</P.CardText>
          ) : null}

          <CardGrid>
            {pagedItems.map((item) => {
              const image = extractFirstImage(item.bodyHtml);
              const title = t(item.title, item.titleEn);
              const summary = t(item.summary, item.summaryEn);

              return (
                <SeminarCardLink key={item.id} to={`/news/seminar/${item.id}`}>
                  <SeminarVisual>
                    {image ? <SeminarImage src={image} alt="" loading="lazy" /> : null}
                    <SeminarVisualFallback>
                      <SeminarVisualMark>Seminar</SeminarVisualMark>
                      <SeminarVisualDate>{getSeminarDateLabel(item)}</SeminarVisualDate>
                    </SeminarVisualFallback>
                  </SeminarVisual>
                  <CardBody>
                    <MetaRow>
                      <CategoryBadge>{t('세미나', 'Seminar')}</CategoryBadge>
                      <DateText>{item.publishedAt}</DateText>
                    </MetaRow>
                    <SeminarTitle>{title}</SeminarTitle>
                    <SeminarSummary>{summary}</SeminarSummary>
                    <SeminarAction>{t('자세히 보기', 'View Detail')}</SeminarAction>
                  </CardBody>
                </SeminarCardLink>
              );
            })}
          </CardGrid>

          <NewsListPagination
            currentPage={activePage}
            totalPages={totalPages}
            previousLabel={t('이전', 'Prev')}
            nextLabel={t('다음', 'Next')}
            onPageChange={setCurrentPage}
          />
        </P.PageContainer>
      </FlushPageSection>
    </>
  );
}
