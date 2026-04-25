import * as P from '../../components/site/PagePrimitives';
import { recruitSteps } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

export function RecruitPage() {
  const { t, tx } = useI18n();

  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Recruit</P.Kicker>
          <P.SectionTitle>{t('채용', 'Recruit')}</P.SectionTitle>
          <P.Lead>
            {t(
              '신한관세법인은 통관·컨설팅·IT 운영 역량을 함께 성장시킬 인재를 찾고 있습니다. 지원 절차는 아래와 같습니다.',
              'Shinhan Customs Service is seeking talent to grow with us across clearance, consulting, and IT operations. The process is outlined below.',
            )}
          </P.Lead>
          <P.Grid columns={3}>
            {recruitSteps.map((step) => (
              <P.Card key={step.title}>
                <P.CardTitle>{tx(step.title)}</P.CardTitle>
                <P.CardText>{tx(step.body)}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
