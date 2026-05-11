import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { useI18n } from '../../i18n/useI18n';
import type { Member } from '../../types/site';

export const MembersHero = styled(P.HeroSection)`
  margin-top: 0;
  min-height: auto;
  padding-top: 0;
  padding-bottom: 0;
  background: transparent;

  &::before,
  &::after {
    display: none;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding-bottom: 0;
  }
`;

export const MembersContentSection = styled.section`
  padding: clamp(74px, 8vw, 112px) 0 clamp(90px, 9vw, 132px);
  border-top: 1px solid #e4e7ec;
  background:
    radial-gradient(circle at 50% 0%, rgba(28, 90, 167, 0.08), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
`;

const CategoryMenuWrap = styled.div`
  display: grid;
  gap: clamp(18px, 2.4vw, 26px);
  width: 100%;
  max-width: 1240px;
  margin: 0 auto clamp(40px, 4.8vw, 58px);
  padding: clamp(24px, 3vw, 34px);
  border: 1px solid rgba(18, 63, 133, 0.13);
  border-top: 3px solid #123f85;
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 250, 253, 0.98)),
    #ffffff;
  box-shadow:
    0 18px 42px rgba(13, 35, 66, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);

  @media (max-width: 760px) {
    gap: 14px;
    margin-bottom: 28px;
    padding: 18px;
  }
`;

const CategoryMenuHead = styled.div`
  display: grid;
  gap: 7px;
  text-align: left;
`;

const CategoryEyebrow = styled.span`
  color: #6b7890;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const CategoryTitle = styled.strong`
  color: #172337;
  font-size: clamp(1.24rem, 1.8vw, 1.72rem);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -0.03em;
`;

const CategoryButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(142px, 1fr));
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  min-width: 0;
  min-height: 58px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ $active }) => ($active ? '#123f85' : 'rgba(18, 63, 133, 0.12)')};
  border-radius: 6px;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, #143f7f 0%, #0d2f63 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)'};
  color: ${({ $active }) => ($active ? '#ffffff' : '#496582')};
  font-size: clamp(0.9rem, 0.98vw, 1.02rem);
  font-weight: 900;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? '0 16px 32px rgba(18, 63, 133, 0.22)' : '0 8px 18px rgba(16, 54, 112, 0.035)')};
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;

  &::before {
    content: '';
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 8px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    opacity: ${({ $active }) => ($active ? 0.72 : 0)};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0.45)});
    transform-origin: center;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: ${({ $active }) => ($active ? '#123f85' : 'rgba(18, 63, 133, 0.28)')};
    background: ${({ $active }) => ($active ? 'linear-gradient(180deg, #143f7f 0%, #0d2f63 100%)' : '#ffffff')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#172337')};
    box-shadow: ${({ $active }) => ($active ? '0 16px 32px rgba(18, 63, 133, 0.22)' : '0 12px 26px rgba(16, 54, 112, 0.08)')};
    outline: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    transform: scaleY(1);
  }

  @media (max-width: 760px) {
    min-height: 42px;
    padding: 0 10px;
    border-color: ${({ $active }) => ($active ? '#123f85' : '#d9e0eb')};
    border-radius: 6px;
    background: ${({ $active }) => ($active ? '#123f85' : '#ffffff')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#526071')};
    font-size: 0.78rem;
    font-weight: 800;
    box-shadow: ${({ $active }) => ($active ? '0 8px 16px rgba(18, 63, 133, 0.16)' : 'none')};

    &:hover,
    &:focus-visible {
      transform: none;
      border-color: ${({ $active }) => ($active ? '#123f85' : '#cbd6e6')};
      background: ${({ $active }) => ($active ? '#123f85' : '#ffffff')};
      color: ${({ $active }) => ($active ? '#ffffff' : '#172337')};
      box-shadow: ${({ $active }) => ($active ? '0 8px 16px rgba(18, 63, 133, 0.16)' : 'none')};
    }
  }
`;

type ProfessionalCategoryMenuProps<T extends string> = {
  categories: readonly T[];
  activeCategory: T;
  onSelect: (category: T) => void;
  ariaLabel: string;
};

export function ProfessionalCategoryMenu<T extends string>({
  categories,
  activeCategory,
  onSelect,
  ariaLabel,
}: ProfessionalCategoryMenuProps<T>) {
  const { t, tx } = useI18n();

  return (
    <CategoryMenuWrap>
      <CategoryMenuHead>
        <CategoryEyebrow>Practice Area</CategoryEyebrow>
        <CategoryTitle>{t('업무 분야', 'Practice Areas')}</CategoryTitle>
      </CategoryMenuHead>
      <CategoryButtonGrid role="tablist" aria-label={ariaLabel}>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            $active={activeCategory === category}
            onClick={() => onSelect(category)}
          >
            {tx(category)}
          </CategoryButton>
        ))}
      </CategoryButtonGrid>
    </CategoryMenuWrap>
  );
}

const DirectoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(400px, 590px));
  justify-content: center;
  gap: clamp(24px, 3vw, 44px);
  width: min(100%, 1240px);
  margin: 0 auto;

  @media (max-width: 980px) {
    grid-template-columns: minmax(0, 590px);
  }
`;

const ProfileCard = styled.article<{ $featured?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(158px, 13vw, 206px);
  grid-column: ${({ $featured }) => ($featured ? '1 / -1' : 'auto')};
  justify-self: ${({ $featured }) => ($featured ? 'center' : 'stretch')};
  width: ${({ $featured }) => ($featured ? 'min(100%, 590px)' : '100%')};
  min-height: 268px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(26, 55, 91, 0.14);
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow:
    0 16px 38px rgba(13, 35, 66, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.92) inset;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    border-color: #123f85;
    box-shadow:
      0 24px 56px rgba(13, 35, 66, 0.12),
      0 1px 0 rgba(255, 255, 255, 0.96) inset;
    outline: none;
  }

  &:hover .career-overlay,
  &:focus-visible .career-overlay,
  &:focus-within .career-overlay {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) 112px;
    min-height: 198px;
    border-radius: 8px;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(24px, 3vw, 38px);

  @media (max-width: 560px) {
    padding: 20px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
`;

const Name = styled.h3`
  flex: 0 0 auto;
  margin: 0;
  color: #121c2b;
  font-size: clamp(1.66rem, 2.35vw, 2.22rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0;

  @media (max-width: 560px) {
    font-size: 1.42rem;
  }
`;

const NameDivider = styled.span`
  flex: 0 0 auto;
  width: 2px;
  height: 38px;
  margin-top: 2px;
  background: linear-gradient(180deg, #102a55, #1d5fb6);
  opacity: 0.9;

  @media (max-width: 560px) {
    height: 32px;
  }
`;

const RoleStack = styled.div`
  display: grid;
  gap: 3px;
  min-width: 0;
`;

const Title = styled.p`
  margin: 0;
  color: #0c4e96;
  font-size: 1rem;
  font-weight: 850;
  line-height: 1.38;

  @media (max-width: 560px) {
    font-size: 0.92rem;
  }
`;

const Division = styled.p`
  margin: 0;
  color: #6a7482;
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.45;

  @media (max-width: 560px) {
    font-size: 0.88rem;
  }
`;

const ContactList = styled.div`
  display: grid;
  gap: 9px;
  margin-top: auto;
  padding-top: 22px;

  @media (max-width: 560px) {
    gap: 7px;
    padding-top: 18px;
  }
`;

const ContactItem = styled.p`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  color: #526174;
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.45;
  word-break: keep-all;
  overflow-wrap: normal;

  @media (max-width: 560px) {
    font-size: 0.88rem;
  }

  span {
    flex: 0 0 48px;
    margin-right: 0;
    color: #0c4e96;
    font-weight: 900;
  }
`;

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    color: #1c5aa7;
    text-decoration: underline;
    text-underline-offset: 3px;
    outline: none;
  }
`;

const PhotoPanel = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
  border-left: 1px solid rgba(26, 55, 91, 0.14);
  background:
    radial-gradient(circle at 74% 8%, rgba(28, 90, 167, 0.12), transparent 38%),
    linear-gradient(145deg, #ffffff 0%, #f3f7fc 48%, #eaf1f8 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 14px 12px;
    z-index: 1;
    border-radius: 12px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.28)),
      rgba(255, 255, 255, 0.38);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.92),
      inset 0 0 0 1px rgba(255, 255, 255, 0.58);
  }
`;

const PortraitFrame = styled.div`
  position: absolute;
  inset: 18px 16px;
  z-index: 2;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(26, 55, 91, 0.08);
  background: #ffffff;
  box-shadow:
    0 18px 32px rgba(13, 35, 66, 0.09),
    0 2px 8px rgba(13, 35, 66, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);

  @media (max-width: 560px) {
    inset: 10px 8px;
    border-radius: 8px;
  }
`;

const Portrait = styled.img<{ $fit?: 'contain' | 'cover'; $position?: string }>`
  width: 100%;
  height: 100%;
  display: block;
  background: #ffffff;
  object-fit: ${({ $fit }) => $fit ?? 'cover'};
  object-position: ${({ $position }) => $position ?? '50% 18%'};
  filter: saturate(1.01) contrast(1.02);
`;

const InitialMark = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  margin-bottom: 34px;
  border-radius: 50%;
  background: #0c4e96;
  color: #ffffff;
  font-size: 1.7rem;
  font-weight: 900;
`;

const CareerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.3vw, 14px);
  padding: clamp(17px, 1.8vw, 22px);
  border-radius: 8px;
  border: 1px solid rgba(31, 92, 178, 0.32);
  background:
    radial-gradient(circle at 92% 10%, rgba(31, 92, 178, 0.18), transparent 32%),
    radial-gradient(circle at 4% 92%, rgba(111, 143, 189, 0.13), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 249, 255, 0.98) 52%, rgba(235, 243, 254, 0.98) 100%);
  color: #172337;
  opacity: 0;
  transform: translateY(12px) scale(0.985);
  pointer-events: none;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
  overflow: auto;
  box-shadow:
    0 28px 64px rgba(13, 35, 66, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.96),
    inset 0 0 0 1px rgba(255, 255, 255, 0.72);
  scrollbar-width: thin;
  scrollbar-color: rgba(111, 143, 189, 0.46) transparent;
  backdrop-filter: blur(6px);

  &::before {
    content: '';
    position: absolute;
    inset: 12px 18px auto;
    height: 1px;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(111, 143, 189, 0.9), rgba(18, 63, 133, 0.24), transparent);
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(18, 63, 133, 0.04), transparent 30%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.72), transparent 36%);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(111, 143, 189, 0.46);
  }
`;

const CareerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 30px;
`;

const CareerNameTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(31, 92, 178, 0.2);
  background: linear-gradient(180deg, #ffffff, rgba(229, 240, 255, 0.96));
  color: #123f85;
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1.35;
  white-space: nowrap;
  box-shadow:
    0 10px 22px rgba(31, 92, 178, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
`;

const CareerSection = styled.div`
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  align-items: start;
  gap: 10px 14px;
  padding-top: 10px;
  border-top: 1px solid rgba(31, 92, 178, 0.1);

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 7px;
  }
`;

const CareerTitle = styled.strong`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 9px;
  border-radius: 999px;
  border: 1px solid rgba(31, 92, 178, 0.14);
  background: rgba(255, 255, 255, 0.78);
  color: #123f85;
  font-size: 0.72rem;
  font-weight: 900;
  line-height: 1.3;
  letter-spacing: 0;
  word-break: keep-all;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.88);

  @media (max-width: 560px) {
    justify-self: start;
  }
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  min-height: 28px;
`;

const KeywordChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 25px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(31, 92, 178, 0.18);
  background: linear-gradient(180deg, #ffffff, rgba(229, 240, 255, 0.98));
  color: #123f85;
  font-size: 0.72rem;
  font-weight: 900;
  line-height: 1.3;
  word-break: keep-all;
  box-shadow:
    0 8px 18px rgba(31, 92, 178, 0.055),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
`;

const CareerList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  align-content: start;
  gap: 6px 10px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const CareerItem = styled.li`
  position: relative;
  min-height: 32px;
  padding: 7px 12px 7px 23px;
  border-radius: 8px;
  border: 1px solid rgba(31, 92, 178, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(233, 242, 255, 0.88)),
    rgba(255, 255, 255, 0.74);
  color: #344760;
  font-size: clamp(0.7rem, 0.78vw, 0.77rem);
  font-weight: 700;
  line-height: 1.46;
  word-break: keep-all;
  overflow-wrap: break-word;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    0 10px 22px rgba(31, 92, 178, 0.05);

  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 10px;
    bottom: 10px;
    width: 2px;
    border-radius: 999px;
    background: #1f5cb2;
    opacity: 0.62;
  }
`;

const EmptyText = styled.p`
  margin: 0;
  color: #607083;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.6;
`;

type ProfessionalCardGridProps = {
  members: Member[];
  emptyMessage?: string;
  showPracticeOverlay?: boolean;
  centerFirst?: boolean;
};

function getPracticeKeywords(member: Member) {
  const source = member.practice || member.careerHighlights?.join(',') || '';

  return source
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export function ProfessionalCardGrid({ members, emptyMessage, showPracticeOverlay = true, centerFirst = false }: ProfessionalCardGridProps) {
  const { t, tx } = useI18n();

  if (!members.length) {
    return <EmptyText>{emptyMessage}</EmptyText>;
  }

  return (
    <DirectoryGrid>
      {members.map((member, index) => {
        const practiceKeywords = getPracticeKeywords(member);

        return (
          <ProfileCard key={member.name} tabIndex={0} $featured={centerFirst && index === 0}>
            <CardBody>
              <TitleRow>
                <Name>{tx(member.name)}</Name>
                <NameDivider aria-hidden="true" />
                <RoleStack>
                  {member.title ? <Title>{tx(member.title)}</Title> : null}
                  {member.department ? <Division>{tx(member.department)}</Division> : null}
                </RoleStack>
              </TitleRow>
              <ContactList>
                {member.phone ? (
                  <ContactItem>
                    <span>{t('전화', 'Tel')}</span>
                    {member.phone}
                  </ContactItem>
                ) : null}
                {member.email ? (
                  <ContactItem>
                    <span>{t('이메일', 'Mail')}</span>
                    <ContactLink href={`mailto:${member.email}`}>{member.email}</ContactLink>
                  </ContactItem>
                ) : null}
              </ContactList>
            </CardBody>
            <PhotoPanel>
              {member.image ? (
                <PortraitFrame>
                  <Portrait src={member.image} alt={tx(member.name)} $fit={member.imageFit} $position={member.imagePosition} loading="lazy" />
                </PortraitFrame>
              ) : (
                <InitialMark aria-hidden="true">{tx(member.name).slice(0, 1)}</InitialMark>
              )}
            </PhotoPanel>
            {showPracticeOverlay && member.careerHighlights?.length ? (
              <CareerOverlay className="career-overlay" aria-label={`${tx(member.name)} 업무 분야`}>
                <CareerHeader>
                  <CareerNameTag>{tx(member.name)}</CareerNameTag>
                </CareerHeader>

                {practiceKeywords.length ? (
                  <CareerSection>
                    <CareerTitle>{t('전문분야', 'Specialty')}</CareerTitle>
                    <KeywordList>
                      {practiceKeywords.map((keyword) => (
                        <KeywordChip key={keyword}>{tx(keyword)}</KeywordChip>
                      ))}
                    </KeywordList>
                  </CareerSection>
                ) : null}

                <CareerSection>
                  <CareerTitle>{t('주요업무', 'Key Work')}</CareerTitle>
                  <CareerList>
                    {member.careerHighlights.slice(0, 4).map((highlight) => (
                      <CareerItem key={highlight}>{tx(highlight)}</CareerItem>
                    ))}
                  </CareerList>
                </CareerSection>
              </CareerOverlay>
            ) : null}
          </ProfileCard>
        );
      })}
    </DirectoryGrid>
  );
}
