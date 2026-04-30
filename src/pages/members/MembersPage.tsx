import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { executives } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

export function MembersPage() {
  const { t, tx } = useI18n();
  const membersSubnav = sectionSubnav.members;

  return (
    <P.HeroSection>
      <P.PageContainer data-reveal>
        <LandingSubnav
          kicker={membersSubnav.kicker}
          kickerEn={membersSubnav.kickerEn}
          title={membersSubnav.title}
          titleEn={membersSubnav.titleEn}
          summary={membersSubnav.summary}
          summaryEn={membersSubnav.summaryEn}
          items={membersSubnav.items}
        />

        <P.SectionHead>
          <div>
            <P.Kicker>Executives</P.Kicker>
            <P.SectionTitle>{t('임원진', 'Executives')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <P.Lead>
          {t(
            '참고 사이트의 구성원 정보를 기준으로 주요 임원진의 프로필을 정리했습니다.',
            'Executive profiles are organized based on the reference site’s member information.',
          )}
        </P.Lead>

        <P.Grid columns={3}>
          {executives.map((member) => (
            <ExecutiveCard key={member.name} tabIndex={0}>
              {member.image ? (
                <PortraitFrame>
                  <Portrait src={member.image} alt={tx(member.name)} $position={member.imagePosition} />
                </PortraitFrame>
              ) : null}
              <Content>
                <Name>{tx(member.name)}</Name>
                <Title>{tx(member.title)}</Title>
                <Division>{tx(member.department)}</Division>
                {member.practice ? (
                  <Practice>
                    <Label>{t('업무분야', 'Practice')}</Label>
                    {tx(member.practice)}
                  </Practice>
                ) : null}
                <ContactList>
                  <ContactItem>
                    <Label>{t('전화', 'Phone')}</Label>
                    {member.phone}
                  </ContactItem>
                  <ContactItem>
                    <Label>{t('이메일', 'Email')}</Label>
                    {member.email}
                  </ContactItem>
                </ContactList>
              </Content>
            </ExecutiveCard>
          ))}
        </P.Grid>
      </P.PageContainer>
    </P.HeroSection>
  );
}

const ExecutiveCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid rgba(18, 72, 143, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 250, 255, 0.98));
  box-shadow: 0 24px 42px rgba(16, 53, 114, 0.08);
  cursor: default;
  transition:
    transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms ease,
    box-shadow 240ms ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(43, 118, 222, 0.18), rgba(43, 118, 222, 0) 42%);
    opacity: 0;
    transition: opacity 220ms ease;
    pointer-events: none;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-8px);
    border-color: rgba(28, 92, 186, 0.42);
    box-shadow:
      0 34px 54px rgba(16, 63, 136, 0.2),
      0 8px 24px rgba(42, 114, 210, 0.16);
    outline: none;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
  }
`;

const PortraitFrame = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background: linear-gradient(180deg, #f2f5f9, #e8edf4);
  overflow: hidden;
`;

const Portrait = styled.img<{ $position?: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position ?? '50% 18%'};
  transition:
    box-shadow 220ms ease,
    filter 220ms ease,
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1);

  ${ExecutiveCard}:hover &,
  ${ExecutiveCard}:focus-visible & {
    box-shadow:
      inset 0 0 0 3px rgba(38, 109, 214, 0.5),
      inset 0 -22px 38px rgba(43, 102, 190, 0.12),
      0 16px 32px rgba(22, 81, 170, 0.14);
    filter: saturate(1.04) contrast(1.01);
    transform: scale(1.01);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px 22px 24px;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);

  ${ExecutiveCard}:hover &,
  ${ExecutiveCard}:focus-visible & {
    transform: translateY(-2px);
  }
`;

const Name = styled.h3`
  margin: 0;
  color: #123a75;
  font-size: 1.3rem;
  letter-spacing: -0.03em;
`;

const Title = styled.p`
  margin: 0;
  color: #2f578f;
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.5;
`;

const Division = styled.p`
  margin: 0;
  color: #607896;
  font-size: 0.92rem;
  line-height: 1.55;
`;

const Practice = styled.p`
  margin: 2px 0 0;
  color: #476180;
  font-size: 0.92rem;
  line-height: 1.62;
`;

const ContactList = styled.div`
  display: grid;
  gap: 6px;
  margin-top: 6px;
  padding-top: 14px;
  border-top: 1px solid rgba(18, 72, 143, 0.08);
`;

const ContactItem = styled.p`
  margin: 0;
  color: #496482;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Label = styled.span`
  display: inline-block;
  min-width: 64px;
  margin-right: 8px;
  color: #1e5ab0;
  font-weight: 800;
`;
