import { issueReports, newsletterItems, shinhanNewsItems } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { SectionHeader } from '../SectionHeader';
import * as S from '../homeStyles';

function splitNewsletterTitle(title: string) {
  const match = title.match(/^(\[[^\]]*(?:소식지|Newsletter)[^\]]*\])\s*(.*)$/i);
  const prefix = match ? match[1] : null;
  const body = (match ? match[2] : title).trim();
  const brandMatch = body.match(/^(Zoom In Trade)\s*[-–—:]\s*(.*)$/i);

  return {
    prefix,
    brand: brandMatch ? brandMatch[1] : null,
    title: brandMatch ? brandMatch[2] || body : body,
  };
}

export function NewsSection() {
  const { t, tx } = useI18n();
  const featuredItem = issueReports[0];
  const featuredNewsletter = newsletterItems.find((item) => item.language === '국문') ?? newsletterItems[0];
  const secondaryItems = [shinhanNewsItems[0], featuredNewsletter].filter(Boolean);

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
            <S.CaseCategory style={{ color: S.palette.blue }}>{t('무역 동향', 'Trade Insights')}</S.CaseCategory>
            <S.CardHeadline>{tx(featuredItem.title)}</S.CardHeadline>
            <S.CardText>{tx(featuredItem.summary)}</S.CardText>
            <S.LandingLink href="/news/issue-report">{t('자료 보기', 'View Resource')}</S.LandingLink>
          </S.NewsletterCard>
          <S.NewsletterList>
            {secondaryItems.map((item) => (
              <S.NewsletterCard key={item.title}>
                <S.CaseCategory style={{ color: S.palette.blue }}>
                  {'categoryLabel' in item ? t('신한 NEWS', 'Shinhan NEWS') : t('소식지', 'Newsletter')}
                </S.CaseCategory>
                {'categoryLabel' in item ? (
                  <S.CardHeadline>{tx(item.title)}</S.CardHeadline>
                ) : (
                  (() => {
                    const title = splitNewsletterTitle(tx(item.title));

                    return (
                      <S.CardHeadline>
                        {title.prefix ? <S.CardHeadlineMeta>{title.prefix}</S.CardHeadlineMeta> : null}
                        {title.brand ? <S.CardHeadlineBrand>{title.brand}</S.CardHeadlineBrand> : null}
                        <S.CardHeadlineTitle>{title.title}</S.CardHeadlineTitle>
                      </S.CardHeadline>
                    );
                  })()
                )}
                <S.CardText>{tx(item.summary)}</S.CardText>
              </S.NewsletterCard>
            ))}
          </S.NewsletterList>
        </S.NewsletterGrid>
      </S.LandingSectionInner>
    </S.LandingSection>
  );
}
