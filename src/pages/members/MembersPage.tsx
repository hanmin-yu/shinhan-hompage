import * as P from '../../components/site/PagePrimitives';
import { members } from '../../data/home';

export function MembersPage() {
  const preview = members.slice(0, 3);

  return (
    <P.PageSection>
      <P.PageContainer data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>Members</P.Kicker>
            <P.SectionTitle>구성원</P.SectionTitle>
          </div>
          <P.HeadLink to="/members/experts">분야별 전문가 보기</P.HeadLink>
        </P.SectionHead>
        <P.Lead>조직도와 분야별 전문가 페이지를 통해 담당 영역별로 빠르게 확인하실 수 있습니다.</P.Lead>
        <P.Grid columns={3}>
          {preview.map((member) => (
            <P.Card key={member.name}>
              <P.CardTitle>{member.name}</P.CardTitle>
              <P.CardText>{member.title}</P.CardText>
              <P.CardText>{member.practice}</P.CardText>
              <P.CardLink to="/members/experts">전문가 상세 보기</P.CardLink>
            </P.Card>
          ))}
        </P.Grid>
        <P.HeroActions>
          <P.PrimaryButton to="/members/org">조직도 보기</P.PrimaryButton>
          <P.SecondaryButton to="/contact">문의하기</P.SecondaryButton>
        </P.HeroActions>
      </P.PageContainer>
    </P.PageSection>
  );
}

