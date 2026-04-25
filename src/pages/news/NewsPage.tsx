import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { issueReports, newsletterItems, shinhanNewsItems } from '../../data/home';
import { seminarItems } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const CategoryGrid = styled(P.Grid)`
  margin-top: 18px;
`;

const PreviewList = styled.ul`
  margin: 0;
  padding-left: 16px;
  color: #4a6689;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const blogPlaceholders = [
  '관세·통상 실무 브리핑',
  '조사 대응 체크리스트',
  '현장 중심 운영 사례',
];

export function NewsPage() {
  const { t, tx } = useI18n();
  const issuePreview = issueReports.slice(0, 3);
  const shinhanNewsPreview = shinhanNewsItems.slice(0, 3);
  const newsletterPreview = newsletterItems.slice(0, 3);
  const seminarPreview = seminarItems.slice(0, 3);

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>News & Resources</P.Kicker>
            <P.SectionTitle>{t('소식 / 자료', 'News & Resources')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <P.Lead>
          {t(
            '이슈 리포트, 신한 NEWS, 소식지, 세미나·블로그의 최신 항목을 한 화면에서 확인할 수 있습니다.',
            'Latest items from Issue Reports, Shinhan NEWS, Newsletter, and Seminar/Blog are shown on one page.',
          )}
        </P.Lead>

        <CategoryGrid columns={2}>
          <P.Card>
            <P.CardTitle>{t('이슈 리포트', 'Issue Reports')}</P.CardTitle>
            <P.CardText>{t('외부기관 이슈 기반 핵심 동향 요약', 'External institution-based issue briefs')}</P.CardText>
            <PreviewList>
              {issuePreview.map((item) => (
                <li key={item.id}>
                  {tx(item.title)} ({item.publishedAt})
                </li>
              ))}
            </PreviewList>
          </P.Card>

          <P.Card>
            <P.CardTitle>{t('신한 NEWS', 'Shinhan NEWS')}</P.CardTitle>
            <P.CardText>{t('FLASH + 세미나 통합 소식', 'Integrated FLASH and seminar news')}</P.CardText>
            <PreviewList>
              {shinhanNewsPreview.map((item) => (
                <li key={item.id}>
                  {tx(item.title)} ({item.publishedAt})
                </li>
              ))}
            </PreviewList>
          </P.Card>

          <P.Card>
            <P.CardTitle>{t('소식지', 'Newsletter')}</P.CardTitle>
            <P.CardText>{t('월간 국문/영문 소식지 아카이브', 'Monthly Korean/English newsletter archive')}</P.CardText>
            <PreviewList>
              {newsletterPreview.map((item) => (
                <li key={item.id}>
                  {tx(item.title)} ({item.issue})
                </li>
              ))}
            </PreviewList>
          </P.Card>

          <P.Card>
            <P.CardTitle>{t('세미나 · 블로그', 'Seminar · Blog')}</P.CardTitle>
            <P.CardText>
              {t(
                '예정/지난 세미나와 블로그 콘텐츠를 함께 확인하는 카테고리입니다.',
                'This category combines upcoming/past seminars with blog content.',
              )}
            </P.CardText>
            <PreviewList>
              {seminarPreview.map((item) => (
                <li key={item.title}>{tx(item.title)}</li>
              ))}
              {blogPlaceholders.map((item) => (
                <li key={item}>{t(item, item)}</li>
              ))}
            </PreviewList>
          </P.Card>
        </CategoryGrid>
      </P.PageContainer>
    </P.PageSection>
  );
}
