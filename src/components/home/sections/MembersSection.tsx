import styled from '@emotion/styled';

import { members } from '../../../data/home';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 88px 0;
  background: #f8fafd;
  border-top: 1px solid rgba(20, 76, 158, 0.08);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Head = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #2d5592;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(29, 87, 170, 0.42);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #122f57;
  font-size: clamp(2rem, 3.5vw, 2.85rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 7px;
  border: 1px solid rgba(21, 77, 159, 0.2);
  color: #1b4f98;
  background: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  border-radius: 8px;
  border: 1px solid rgba(20, 76, 158, 0.13);
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(16, 53, 114, 0.06);
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div<{ image?: string; accent: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.85);
  background:
    ${({ image, accent }) => (image ? `url(${image}) center / cover no-repeat` : accent)},
    ${({ accent }) => accent};
  box-shadow: 0 8px 16px rgba(17, 46, 95, 0.16);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
`;

const Name = styled.strong`
  color: #163e78;
  font-size: 1.05rem;
`;

const TitleText = styled.p`
  margin: 0;
  color: #5a7194;
  font-size: 0.88rem;
  line-height: 1.5;
`;

const Desc = styled.p`
  margin: 0;
  color: #4f6688;
  font-size: 0.92rem;
  line-height: 1.6;
`;

const Contact = styled.p`
  margin: 0;
  color: #2e548f;
  font-size: 0.86rem;
  font-weight: 700;
`;

export function MembersSection() {
  const previewMembers = members.slice(0, 3);

  return (
    <Section id="members">
      <Inner data-reveal>
        <Head>
          <div>
            <Label>Members</Label>
            <Title>대표 구성원</Title>
          </div>
          <Link href="/members/experts">분야별 전문가 더보기</Link>
        </Head>

        <Grid>
          {previewMembers.map((member) => (
            <Card key={member.name}>
              <Profile>
                <Avatar image={member.image} accent={member.accent}>
                  {member.image ? '' : member.name.slice(0, 1)}
                </Avatar>
                <div>
                  <Name>{member.name}</Name>
                  <TitleText>{member.title}</TitleText>
                </div>
              </Profile>
              <Desc>{member.practice}</Desc>
              <Contact>T. {member.phone}</Contact>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
