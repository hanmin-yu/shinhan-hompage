import styled from '@emotion/styled';
import { useMemo, useState } from 'react';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { expertMembers } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import type { Member } from '../../types/site';

const expertCategories = [
  '전체',
  '수출입통관',
  '환급',
  'FTA/CO',
  'AEO',
  '관세조사/외환검사',
  '외환조사/범칙조사',
  '조세불복',
  'ACVA',
  '관세자문',
  '검역/요건',
  '물류',
  '베트남',
  '미국 FDA',
  'IT',
] as const;

type ExpertCategory = (typeof expertCategories)[number];

const expertAssignments = {
  수출입통관: ['차미정', '조나현', '오규태', '손성곤'],
  환급: ['김학현', '나지원'],
  'FTA/CO': ['박성현', '오보람', '강민지', '조석현'],
  AEO: ['홍동엽', '강현우'],
  '관세조사/외환검사': ['이하나', '김정훈'],
  '외환조사/범칙조사': ['조원희', '김정훈'],
  조세불복: ['이하나', '김유진'],
  ACVA: ['조원희', '이하나'],
  관세자문: ['김정훈', '김유진'],
  '검역/요건': ['서정용', '이경심'],
  물류: ['권민성', '이미경'],
  베트남: ['신종호', '김선웅'],
  '미국 FDA': ['김다혜', '엄동규'],
  IT: ['최대규', '홍성훈'],
} satisfies Record<Exclude<ExpertCategory, '전체'>, string[]>;

function findExpert(name: string) {
  return expertMembers.find((member) => member.name === name);
}

function getAssignedExperts(category: Exclude<ExpertCategory, '전체'>) {
  return expertAssignments[category].map((name) => findExpert(name) ?? ({ name, phone: '', email: '', title: '', department: '', practice: '', accent: '#526f9e' } satisfies Member));
}

export function ExpertsPage() {
  const { t, tx } = useI18n();
  const membersSubnav = sectionSubnav.members;
  const [activeCategory, setActiveCategory] = useState<ExpertCategory>('전체');

  const groupedExperts = useMemo(
    () => expertCategories.filter((category) => category !== '전체').map((category) => ({
      category,
      members: getAssignedExperts(category),
    })),
    [],
  );

  const filteredMembers = useMemo(() => {
    if (activeCategory === '전체') {
      const names = new Set<string>();

      return groupedExperts.flatMap((group) =>
        group.members.filter((member) => {
          if (names.has(member.name)) {
            return false;
          }

          names.add(member.name);
          return true;
        }),
      );
    }

    return getAssignedExperts(activeCategory);
  }, [activeCategory, groupedExperts]);

  return (
    <P.HeroSection>
      <P.PageContainer>
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
            <P.Kicker>Experts</P.Kicker>
            <P.SectionTitle>{t('분야별 전문가', 'Experts')}</P.SectionTitle>
          </div>
        </P.SectionHead>

        <FilterBar aria-label={t('업무분야 필터', 'Practice filter')}>
          {expertCategories.map((category) => (
            <FilterButton
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              $active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {tx(category)}
            </FilterButton>
          ))}
        </FilterBar>

        {filteredMembers.length ? (
          <ExpertGrid>
            {filteredMembers.map((member) => (
              <ExpertCard key={member.name} tabIndex={0}>
                {member.image ? (
                  <PortraitFrame>
                    <Portrait src={member.image} alt={tx(member.name)} $position={member.imagePosition} />
                  </PortraitFrame>
                ) : null}
                <Content>
                  <Name>{tx(member.name)}</Name>
                  {member.title ? <Title>{tx(member.title)}</Title> : null}
                  {member.department ? <Division>{tx(member.department)}</Division> : null}
                  {member.practice ? (
                    <Practice>
                      <Label>{t('업무분야', 'Practice')}</Label>
                      {tx(member.practice)}
                    </Practice>
                  ) : null}
                  <ContactList>
                    {member.phone ? (
                      <ContactItem>
                        <Label>{t('전화', 'Phone')}</Label>
                        {member.phone}
                      </ContactItem>
                    ) : null}
                    {member.email ? (
                      <ContactItem>
                        <Label>{t('이메일', 'Email')}</Label>
                        <ContactLink href={`mailto:${member.email}`}>{member.email}</ContactLink>
                      </ContactItem>
                    ) : null}
                  </ContactList>
                </Content>
              </ExpertCard>
            ))}
          </ExpertGrid>
        ) : (
          <EmptyText>{t('해당 업무분야의 전문가 정보가 없습니다.', 'No experts are listed for this specialty.')}</EmptyText>
        )}
      </P.PageContainer>
    </P.HeroSection>
  );
}

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 26px 0 28px;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(28, 88, 170, 0.42)' : 'rgba(21, 77, 159, 0.18)')};
  background: ${({ $active }) => ($active ? '#e9f2ff' : '#fff')};
  color: ${({ $active }) => ($active ? '#1c56a9' : '#4f6486')};
  font-size: 0.92rem;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(28, 88, 170, 0.42);
    outline: none;
  }
`;

const ExpertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ExpertCard = styled.article`
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

  ${ExpertCard}:hover &,
  ${ExpertCard}:focus-visible & {
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

  ${ExpertCard}:hover &,
  ${ExpertCard}:focus-visible & {
    transform: translateY(-2px);
  }
`;

const Name = styled.h3`
  margin: 0;
  color: #123a75;
  font-size: 1.3rem;
  letter-spacing: 0;
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
  overflow-wrap: anywhere;
`;

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    color: #1e5ab0;
    text-decoration: underline;
    text-underline-offset: 3px;
    outline: none;
  }
`;

const Label = styled.span`
  display: inline-block;
  min-width: 64px;
  margin-right: 8px;
  color: #1e5ab0;
  font-weight: 800;
`;

const EmptyText = styled.p`
  margin: 28px 0 0;
  color: #607896;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.6;
`;
