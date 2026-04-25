import { issueReports, newsletterItems, shinhanNewsItems } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { SectionHeader } from '../SectionHeader';
import * as S from '../homeStyles';

export function NewsSection() {
  const { t, tx } = useI18n();
  const featuredItem = issueReports[0];
  const secondaryItems = [shinhanNewsItems[0], newsletterItems[0]].filter(Boolean);

  if (!featuredItem) return null;

  return (
    <S.LandingSection id="news">
      <S.LandingSectionInner data-reveal>
        <SectionHeader
          label="NEWS & RESOURCES"
          title={t('소식 / 자료', 'News & Resources')}
          linkLabel={t('소식 더보기', 'View More News')}
          href="/news"
        />

        <S.NewsletterGrid>
          <S.NewsletterCard>
            <S.CaseCategory style={{ color: '#04325a' }}>{t('이슈 리포트', 'Issue Report')}</S.CaseCategory>
            <S.CardHeadline>{tx(featuredItem.title)}</S.CardHeadline>
            <S.CardText>{tx(featuredItem.summary)}</S.CardText>
            <S.LandingLink href="/news/issue-report">{t('자료 보기', 'View Resource')}</S.LandingLink>
          </S.NewsletterCard>
          <S.NewsletterList>
            {secondaryItems.map((item) => (
              <S.NewsletterCard key={item.title}>
                <S.CaseCategory style={{ color: '#04325a' }}>
                  {'categoryLabel' in item ? t('신한 NEWS', 'Shinhan NEWS') : t('소식지', 'Newsletter')}
                </S.CaseCategory>
                <S.CardHeadline>{tx(item.title)}</S.CardHeadline>
                <S.CardText>{tx(item.summary)}</S.CardText>
              </S.NewsletterCard>
            ))}
          </S.NewsletterList>
        </S.NewsletterGrid>
      </S.LandingSectionInner>
    </S.LandingSection>
  );
}
