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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto clamp(42px, 5vw, 72px);
  padding: 10px;
  border: 1px solid #d8e2f0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 249, 255, 0.96)),
    #ffffff;
  box-shadow: 0 18px 44px rgba(13, 52, 105, 0.08);

  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 168px;
  min-width: 148px;
  min-height: 74px;
  padding: 0 24px;
  border: 0;
  border-radius: 6px;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, #082a57 0%, #1557a8 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f9fbff 100%)'};
  color: ${({ $active }) => ($active ? '#ffffff' : '#26364d')};
  font-size: clamp(1.05rem, 1.08vw, 1.18rem);
  font-weight: 900;
  letter-spacing: 0;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    color 0.18s ease,
    background-color 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow: ${({ $active }) =>
    $active ? '0 14px 28px rgba(21, 87, 168, 0.24)' : 'inset 0 0 0 1px rgba(216, 226, 240, 0.9)'};

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 12px;
    height: 2px;
    background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.58)' : '#1557a8')};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0.6)});
    transform-origin: center;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    background: ${({ $active }) =>
      $active
        ? 'linear-gradient(135deg, #082a57 0%, #1557a8 100%)'
        : 'linear-gradient(180deg, #f7fbff 0%, #ffffff 100%)'};
    color: ${({ $active }) => ($active ? '#ffffff' : '#0c4e96')};
    box-shadow: ${({ $active }) =>
      $active
        ? '0 16px 34px rgba(21, 87, 168, 0.28)'
        : '0 10px 24px rgba(13, 52, 105, 0.1), inset 0 0 0 1px rgba(21, 87, 168, 0.18)'};
    outline: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    transform: scaleX(1);
  }

  @media (max-width: 760px) {
    flex-basis: 50%;
    min-height: 62px;
    padding: 0 18px;
    font-size: 0.98rem;
  }

  @media (max-width: 420px) {
    flex-basis: 100%;
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
  const { tx } = useI18n();

  return (
    <CategoryMenuWrap role="tablist" aria-label={ariaLabel}>
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

const ProfileCard = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(158px, 13vw, 206px);
  min-height: 268px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(17, 69, 132, 0.16);
  background:
    linear-gradient(135deg, rgba(248, 251, 255, 0.98) 0%, rgba(255, 255, 255, 0.98) 45%),
    radial-gradient(circle at 4% 0%, rgba(21, 87, 168, 0.09), transparent 34%),
    #ffffff;
  box-shadow:
    0 18px 48px rgba(13, 52, 105, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.92) inset;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto auto 0;
    z-index: 3;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #071f43 0%, #1557a8 54%, #69a7e8 100%);
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
    border-color: rgba(21, 87, 168, 0.32);
    box-shadow:
      0 26px 62px rgba(13, 52, 105, 0.16),
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
    grid-template-columns: minmax(0, 1fr) 132px;
    min-height: 228px;
    border-radius: 8px;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(24px, 3vw, 38px);
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
`;

const NameDivider = styled.span`
  flex: 0 0 auto;
  width: 2px;
  height: 38px;
  margin-top: 2px;
  background: linear-gradient(180deg, #102a55, #1d5fb6);
  opacity: 0.9;
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
`;

const Division = styled.p`
  margin: 0;
  color: #6a7482;
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.45;
`;

const ContactList = styled.div`
  display: grid;
  gap: 9px;
  margin-top: auto;
  padding-top: 22px;
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
  border-left: 1px solid rgba(17, 69, 132, 0.12);
  background:
    linear-gradient(145deg, rgba(249, 252, 255, 0.94) 0%, rgba(219, 234, 252, 0.96) 100%),
    #eef5fd;

  &::after {
    content: '';
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 42%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(7, 31, 67, 0.1));
    pointer-events: none;
  }
`;

const PortraitFrame = styled.div`
  position: absolute;
  inset: 14px 12px 0;
  z-index: 2;
  overflow: hidden;
  border-radius: 999px 999px 0 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(236, 245, 255, 0.76)),
    #ffffff;
  box-shadow:
    0 14px 28px rgba(13, 52, 105, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.92);
`;

const Portrait = styled.img<{ $fit?: 'contain' | 'cover' }>`
  width: 100%;
  height: 100%;
  display: block;
  background: #ffffff;
  object-fit: ${({ $fit }) => $fit ?? 'cover'};
  object-position: 50% 18%;
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
  inset: 10px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(18px, 2vw, 26px);
  border-radius: 8px;
  border: 1px solid rgba(213, 231, 255, 0.3);
  background:
    linear-gradient(135deg, rgba(7, 31, 67, 0.99) 0%, rgba(12, 55, 111, 0.985) 100%),
    #071f43;
  color: #ffffff;
  opacity: 0;
  transform: translateY(18px) scale(0.98);
  pointer-events: none;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
  overflow: auto;
  box-shadow:
    0 28px 60px rgba(4, 18, 42, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.42) transparent;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(115deg, rgba(255, 255, 255, 0.1), transparent 28%);
    opacity: 0.42;
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
    background: rgba(255, 255, 255, 0.36);
  }

  @media (hover: none) {
    position: relative;
    inset: auto;
    grid-column: 1 / -1;
    opacity: 1;
    transform: none;
    pointer-events: auto;
    max-height: none;
    border-radius: 0;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
  }
`;

const CareerHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 18px;
  padding: 0 0 14px;
  border-bottom: 1px solid rgba(213, 231, 255, 0.22);
`;

const CareerTitle = styled.strong`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.96);
  font-size: 0.9rem;
  font-weight: 900;
  line-height: 1.3;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  word-break: keep-all;

  &::before {
    content: '';
    width: 28px;
    height: 3px;
    background: rgba(213, 231, 255, 0.82);
  }
`;

const CareerName = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(213, 235, 255, 0.24);
  background: rgba(221, 240, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.82rem;
  font-weight: 900;
  line-height: 1.35;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
`;

const CareerList = styled.ul`
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const CareerItem = styled.li`
  position: relative;
  padding: 8px 0 8px 24px;
  border-bottom: 1px solid rgba(213, 231, 255, 0.1);
  color: rgba(242, 248, 255, 0.9);
  font-size: clamp(0.72rem, 0.86vw, 0.82rem);
  font-weight: 650;
  line-height: 1.46;
  word-break: keep-all;
  overflow-wrap: break-word;

  &:last-of-type {
    border-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 1px;
    top: 1.05em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 0 0 4px rgba(213, 231, 255, 0.16);
  }

  &::after {
    content: '';
    position: absolute;
    left: 4px;
    top: calc(1.05em + 8px);
    bottom: -7px;
    width: 1px;
    background: linear-gradient(180deg, rgba(213, 231, 255, 0.24), transparent);
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
};

export function ProfessionalCardGrid({ members, emptyMessage }: ProfessionalCardGridProps) {
  const { t, tx } = useI18n();

  if (!members.length) {
    return <EmptyText>{emptyMessage}</EmptyText>;
  }

  return (
    <DirectoryGrid>
      {members.map((member) => (
        <ProfileCard key={member.name} tabIndex={0}>
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
                <Portrait src={member.image} alt={tx(member.name)} $fit={member.imageFit} loading="lazy" />
              </PortraitFrame>
            ) : (
              <InitialMark aria-hidden="true">{tx(member.name).slice(0, 1)}</InitialMark>
            )}
          </PhotoPanel>
          {member.careerHighlights?.length ? (
            <CareerOverlay className="career-overlay" aria-label={`${tx(member.name)} 주요 경력`}>
              <CareerHeader>
                <CareerTitle>{t('주요 경력', 'Career highlights')}</CareerTitle>
                <CareerName>{tx(member.name)}</CareerName>
              </CareerHeader>
              <CareerList>
                {member.careerHighlights.map((highlight) => (
                  <CareerItem key={highlight}>{tx(highlight)}</CareerItem>
                ))}
              </CareerList>
            </CareerOverlay>
          ) : null}
        </ProfileCard>
      ))}
    </DirectoryGrid>
  );
}
