import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { organizationUnits } from '../../data/pageContent';

export function OrgPage() {
  return (
    <>
      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Organization</P.Kicker>
          <P.SectionTitle>조직도</P.SectionTitle>
          <P.Lead>통관본부, 컨설팅본부, IT/운영지원 조직이 유기적으로 연결되어 고객 과제를 지원합니다.</P.Lead>
          <P.Grid columns={3}>
            {organizationUnits.map((unit) => (
              <P.Card key={unit.title}>
                <P.CardTitle>{unit.title}</P.CardTitle>
                <P.CardText>{unit.body}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
          <P.HeroActions>
            <P.PrimaryButton to="/members/experts">분야별 전문가 보기</P.PrimaryButton>
            <P.SecondaryButton to="/contact">조직 문의하기</P.SecondaryButton>
          </P.HeroActions>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

