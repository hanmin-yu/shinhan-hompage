import styled from '@emotion/styled';

import { members } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 88px 0;
  background: linear-gradient(180deg, #edf5ff 0%, #f4f9ff 100%);
  border-top: 1px solid rgba(20, 76, 158, 0.11);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Head = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 18px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #22549a;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(29, 87, 170, 0.54);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #103a72;
  font-size: clamp(2rem, 3.5vw, 2.85rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.03em;
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
  border-radius: 6px;
  border: 1px solid rgba(20, 76, 158, 0.18);
  background: #ffffff;
  box-shadow: 0 10px 22px rgba(16, 53, 114, 0.08);
  position: relative;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    left: 22px;
    top: 0;
    width: 38px;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, #2a6bc6, #7aa5dd);
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(20, 76, 158, 0.28);
    box-shadow: 0 14px 26px rgba(16, 53, 114, 0.11);
  }
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
  color: #11407b;
  font-size: 1.05rem;
  font-weight: 700;
`;

const TitleText = styled.p`
  margin: 0;
  color: #4a6a92;
  font-size: 0.88rem;
  line-height: 1.5;
`;

const Desc = styled.p`
  margin: 0;
  color: #40638d;
  font-size: 0.92rem;
  line-height: 1.6;
`;

const Contact = styled.p`
  margin: 0;
  color: #1f56a3;
  font-size: 0.86rem;
  font-weight: 700;
`;

export function MembersSection() {
  const { t, tx } = useI18n();
  const previewMembers = members;

  return (
    <Section id="members">
      <Inner data-reveal>
        <Head>
          <div>
            <Label>Members</Label>
            <Title>{t('대표 구성원', 'Key Professionals')}</Title>
          </div>
        </Head>

        <Grid>
          {previewMembers.map((member) => (
            <Card key={member.name}>
              <Profile>
                <Avatar image={member.image} accent={member.accent}>
                  {member.image ? '' : member.name.slice(0, 1)}
                </Avatar>
                <div>
                  <Name>{tx(member.name)}</Name>
                  <TitleText>{tx(member.title)}</TitleText>
                  <TitleText>{tx(member.department)}</TitleText>
                </div>
              </Profile>
              <Desc>{tx(member.practice)}</Desc>
              <Contact>{t('T.', 'Tel.')} {member.phone}</Contact>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
