import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { recruitSteps } from '../../data/pageContent';

export function RecruitPage() {
  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Recruit</P.Kicker>
          <P.SectionTitle>채용</P.SectionTitle>
          <P.Lead>
            신한관세법인은 통관·컨설팅·IT 운영 역량을 함께 성장시킬 인재를 찾고 있습니다. 지원 절차는 아래와 같습니다.
          </P.Lead>
          <P.Grid columns={3}>
            {recruitSteps.map((step) => (
              <P.Card key={step.title}>
                <P.CardTitle>{step.title}</P.CardTitle>
                <P.CardText>{step.body}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
          <P.HeroActions>
            <P.PrimaryButton to="/contact">지원 문의</P.PrimaryButton>
            <P.SecondaryButton to="/about">회사 소개 보기</P.SecondaryButton>
          </P.HeroActions>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection title="채용 관련 문의가 있으신가요?" />
    </>
  );
}

