import * as P from '../../components/site/PagePrimitives';
import { shinhanNewsItems } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

export function ShinhanNewsPage() {
  const { t, tx } = useI18n();
  const flashItems = shinhanNewsItems.filter((item) => item.category === 'flash');
  const seminarItems = shinhanNewsItems.filter((item) => item.category === 'seminar');

  return (
    <>
      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>Shinhan News</P.Kicker>
            <P.SectionTitle>{t('신한 NEWS', 'Shinhan NEWS')}</P.SectionTitle>
          </div>
        </P.SectionHead>
          <P.Lead>
            {t(
              '기존 FLASH와 세미나 자료를 하나의 뉴스 피드로 통합해 운영합니다.',
              'Legacy FLASH updates and seminar materials are integrated into one unified news feed.',
            )}
          </P.Lead>

          <P.SectionHead style={{ marginTop: 28 }}>
            <div>
              <P.Kicker>{t('Flash', 'Flash')}</P.Kicker>
            </div>
          </P.SectionHead>
          <P.Grid columns={2}>
            {flashItems.map((item) => (
              <P.Card key={item.id}>
                <P.CardTitle>{tx(item.title)}</P.CardTitle>
                <P.CardText>{tx(item.summary)}</P.CardText>
                <P.CardText>{item.publishedAt}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>

          <P.SectionHead style={{ marginTop: 30 }}>
            <div>
              <P.Kicker>{t('Seminar', 'Seminar')}</P.Kicker>
            </div>
          </P.SectionHead>
          <P.Grid columns={2}>
            {seminarItems.map((item) => (
              <P.Card key={item.id}>
                <P.CardTitle>{tx(item.title)}</P.CardTitle>
                <P.CardText>{tx(item.summary)}</P.CardText>
                <P.CardText>{item.publishedAt}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
