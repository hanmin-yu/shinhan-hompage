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
import { NewsCompactHeroSection, NewsFlushPageSection } from './newsLayout';

const PAGE_SIZE = 12;

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
      <NewsCompactHeroSection>
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
            matchAboutHero
          />
        </P.PageContainer>
      </NewsCompactHeroSection>

      <NewsFlushPageSection>
        <P.PageContainer>
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
      </NewsFlushPageSection>
    </>
  );
}
