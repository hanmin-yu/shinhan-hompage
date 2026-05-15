import styled from '@emotion/styled';

import { palette } from '../../components/home/homeStyles';
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
  color: ${palette.blue};
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
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
  grid-template-columns: repeat(2, minmax(360px, 530px));
  justify-content: center;
  gap: clamp(20px, 2.5vw, 34px);
  width: min(100%, 1120px);
  margin: 0 auto;

  @media (max-width: 980px) {
    grid-template-columns: minmax(0, 530px);
  }
`;

const ProfileCard = styled.article<{ $featured?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(142px, 11.5vw, 184px);
  grid-column: ${({ $featured }) => ($featured ? '1 / -1' : 'auto')};
  justify-self: ${({ $featured }) => ($featured ? 'center' : 'stretch')};
  width: ${({ $featured }) => ($featured ? 'min(100%, 530px)' : '100%')};
  min-height: 238px;
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
  &:focus .career-overlay,
  &:focus-visible .career-overlay,
  &:focus-within .career-overlay {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) 100px;
    min-height: 184px;
    border-radius: 8px;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(20px, 2.4vw, 30px);

  @media (max-width: 560px) {
    padding: 16px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
`;

const Name = styled.h3`
  flex: 0 0 auto;
  margin: 0;
  color: #121c2b;
  font-size: clamp(1.48rem, 2.05vw, 1.95rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0;

  @media (max-width: 560px) {
    font-size: 1.3rem;
  }
`;

const NameDivider = styled.span`
  flex: 0 0 auto;
  width: 2px;
  height: 34px;
  margin-top: 2px;
  background: linear-gradient(180deg, #102a55, #1d5fb6);
  opacity: 0.9;

  @media (max-width: 560px) {
    height: 28px;
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
  font-size: 0.94rem;
  font-weight: 850;
  line-height: 1.38;

  @media (max-width: 560px) {
    font-size: 0.86rem;
  }
`;

const Division = styled.p`
  margin: 0;
  color: #6a7482;
  font-size: 0.9rem;
  font-weight: 650;
  line-height: 1.45;

  @media (max-width: 560px) {
    font-size: 0.82rem;
  }
`;

const ContactList = styled.div`
  display: grid;
  gap: 7px;
  margin-top: auto;
  padding-top: 18px;

  @media (max-width: 560px) {
    gap: 6px;
    padding-top: 14px;
  }
`;

const ContactItem = styled.p`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  color: #526174;
  font-size: 0.9rem;
  font-weight: 650;
  line-height: 1.45;
  word-break: keep-all;
  overflow-wrap: normal;

  @media (max-width: 560px) {
    font-size: 0.82rem;
  }

  span {
    flex: 0 0 44px;
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
    inset: 12px 10px;
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
  inset: 15px 13px;
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
  width: 68px;
  height: 68px;
  margin-bottom: 28px;
  border-radius: 50%;
  background: #0c4e96;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 900;
`;

const CareerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  align-content: stretch;
  gap: clamp(10px, 1.2vw, 14px);
  padding: clamp(16px, 1.7vw, 22px);
  border-radius: 8px;
  border: 1px solid rgba(31, 92, 178, 0.32);
  background: rgba(247, 250, 255, 0.98);
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
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.36);
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

  @media (max-width: 560px) {
    padding: 14px;
  }
`;

const CareerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-height: 30px;
  padding-right: 2px;
`;

const CareerNameTag = styled.span`
  display: block;
  color: #121c2b;
  font-size: clamp(1.48rem, 2.05vw, 1.95rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 560px) {
    font-size: 1.3rem;
  }
`;

const CareerSection = styled.div`
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  align-items: start;
  gap: 18px;
  min-height: 0;
  padding: 16px 0 0;
  border-top: 1px solid rgba(31, 92, 178, 0.16);

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 8px;
    padding: 10px 0 0;
  }
`;

const CareerTitle = styled.strong`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  align-self: start;
  gap: 7px;
  min-height: 32px;
  width: fit-content;
  margin-top: 2px;
  padding: 0 13px 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(31, 92, 178, 0.3);
  background: linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%);
  color: #123f85;
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1.3;
  letter-spacing: 0;
  word-break: keep-all;
  box-shadow:
    0 6px 14px rgba(18, 63, 133, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  @media (max-width: 560px) {
    justify-self: start;
    margin-top: 0;
  }
`;

const CareerTitleIcon = styled.span`
  display: inline-grid;
  place-items: center;
  width: 17px;
  height: 17px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(31, 92, 178, 0.14), rgba(31, 92, 178, 0.06));
  color: #1f5cb2;

  svg {
    display: block;
    width: 11px;
    height: 11px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const CareerList = styled.ul`
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  grid-template-columns: 1fr;
  gap: 8px;
  min-height: 0;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const CareerItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 0;
  padding: 6px 4px 6px 28px;
  color: #172337;
  font-size: clamp(0.82rem, 0.9vw, 0.94rem);
  font-weight: 850;
  line-height: 1.46;
  word-break: keep-all;
  overflow-wrap: break-word;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #1f5cb2;
    box-shadow: 0 0 0 3px rgba(31, 92, 178, 0.08);
    transform: translateY(-50%);
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

function WorkIcon() {
  return (
    <CareerTitleIcon aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
        <path d="M5 8h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z" />
        <path d="M9 12h6" />
      </svg>
    </CareerTitleIcon>
  );
}

export function ProfessionalCardGrid({ members, emptyMessage, showPracticeOverlay = true, centerFirst = false }: ProfessionalCardGridProps) {
  const { t, tx } = useI18n();

  if (!members.length) {
    return <EmptyText>{emptyMessage}</EmptyText>;
  }

  return (
    <DirectoryGrid>
      {members.map((member, index) => {
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

                <CareerSection>
                  <CareerTitle>
                    <WorkIcon />
                    {t('주요업무', 'Key Work')}
                  </CareerTitle>
                  <CareerList>
                    {member.careerHighlights.slice(0, 3).map((highlight) => (
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
