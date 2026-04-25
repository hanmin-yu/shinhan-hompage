import * as P from '../../components/site/PagePrimitives';
import { seminarItems } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

export function SeminarPage() {
  const { t, tx } = useI18n();

  return (
    <P.PageSection>
      <P.PageContainer data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>Seminar</P.Kicker>
            <P.SectionTitle>{t('세미나', 'Seminar')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <P.Lead>
          {t(
            '신한관세법인의 예정·완료 세미나를 한곳에서 확인하고, 참가 문의는 문의 페이지에서 연결할 수 있습니다.',
            'Review upcoming and completed seminars in one place and connect participation inquiries through the contact page.',
          )}
        </P.Lead>
        <P.Grid columns={2}>
          {seminarItems.map((item) => (
            <P.Card key={item.title}>
              <P.CardTitle>{tx(item.title)}</P.CardTitle>
              <P.CardText>{tx(item.body)}</P.CardText>
              <P.CardText>
                {t('상태', 'Status')}: {tx(item.status)}
              </P.CardText>
            </P.Card>
          ))}
        </P.Grid>
      </P.PageContainer>
    </P.PageSection>
  );
}
