import * as P from '../../components/site/PagePrimitives';
import { issueReports } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

export function IssueReportPage() {
  const { t, tx } = useI18n();

  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>Issue Report</P.Kicker>
            <P.SectionTitle>{t('이슈 리포트', 'Issue Reports')}</P.SectionTitle>
          </div>
        </P.SectionHead>
          <P.Lead>
            {t(
              '한국관세사회, 관세청, 한국무역협회, KOTRA 등 외부 기관 자료를 기반으로 핵심 이슈를 요약 제공합니다.',
              'We summarize key issues from external institutions including KCSA, Korea Customs Service, KITA, and KOTRA.',
            )}
          </P.Lead>
          <P.Grid columns={2}>
            {issueReports.map((item) => (
              <P.Card key={item.id}>
                <P.CardTitle>{tx(item.title)}</P.CardTitle>
                <P.CardText>
                  {tx(item.source)} · {item.publishedAt}
                </P.CardText>
                <P.CardText>{tx(item.summary)}</P.CardText>
                {item.tags?.length ? (
                  <P.CardText>{item.tags.slice(0, 3).map((tag) => `#${tx(tag)}`).join(' · ')}</P.CardText>
                ) : null}
                <a href={item.url} target="_blank" rel="noreferrer">
                  {t('원문 보기', 'View Source')}
                </a>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
