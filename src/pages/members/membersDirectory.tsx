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
  gap: 12px;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto clamp(40px, 4.8vw, 58px);
  padding: clamp(14px, 2vw, 20px);
  border: 1px solid #d8dee8;
  background:
    linear-gradient(180deg, rgba(248, 251, 255, 0.96), rgba(255, 255, 255, 0.98)),
    #ffffff;
  box-shadow: none;

  @media (max-width: 760px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 28px;
    padding: 8px 0;
    border: 0;
    background: transparent;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  flex: 1 1 190px;
  min-width: 178px;
  min-height: 76px;
  padding: 14px 20px 15px 30px;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(31, 92, 178, 0.34)' : 'rgba(31, 92, 178, 0.14)')};
  border-radius: 8px;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, rgba(235, 244, 255, 0.98), rgba(255, 255, 255, 0.98)), #ffffff'
      : '#ffffff'};
  color: ${({ $active }) => ($active ? '#172337' : '#496582')};
  font-size: clamp(0.98rem, 1.12vw, 1.1rem);
  font-weight: 850;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: left;
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? 'none' : '0 8px 20px rgba(16, 54, 112, 0.04)')};
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
    top: 14px;
    bottom: 14px;
    width: 4px;
    border-radius: 999px;
    background: #1f5cb2;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transform: scaleY(${({ $active }) => ($active ? 1 : 0.45)});
    transform-origin: center;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(31, 92, 178, 0.3);
    background: #f7f9fc;
    color: #172337;
    box-shadow: 0 12px 24px rgba(16, 54, 112, 0.08);
    outline: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    transform: scaleY(1);
  }

  @media (max-width: 760px) {
    flex: 0 0 auto;
    min-width: 0;
    min-height: 34px;
    padding: 0 14px;
    justify-content: center;
    border-color: ${({ $active }) => ($active ? '#123f85' : '#d9e0eb')};
    border-radius: 999px;
    background: ${({ $active }) => ($active ? '#123f85' : '#ffffff')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#526071')};
    font-size: 0.82rem;
    font-weight: 800;
    box-shadow: ${({ $active }) => ($active ? '0 8px 16px rgba(18, 63, 133, 0.16)' : 'none')};

    &::before {
      content: none;
    }

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
  border: 1px solid rgba(26, 55, 91, 0.14);
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow:
    0 16px 38px rgba(13, 35, 66, 0.08),
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
    transform: translateY(-3px);
    border-color: rgba(18, 63, 133, 0.24);
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
  background: #ffffff;
`;

const PortraitFrame = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  border-radius: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
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
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(18px, 2vw, 26px);
  border-radius: 8px;
  border: 1px solid rgba(18, 63, 133, 0.1);
  background: #f8fbff;
  color: #172337;
  opacity: 0;
  transform: translateY(18px) scale(0.98);
  pointer-events: none;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
  overflow: auto;
  box-shadow:
    0 28px 60px rgba(13, 35, 66, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
  scrollbar-width: thin;
  scrollbar-color: rgba(18, 63, 133, 0.3) transparent;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(15, 63, 132, 0.025), transparent 38%);
    opacity: 1;
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
    background: rgba(18, 63, 133, 0.3);
  }

`;

const CareerHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 18px;
  padding: 0 0 14px;
  border-bottom: 1px solid rgba(216, 222, 232, 0.76);
`;

const CareerTitle = styled.strong`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0f3f84;
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
    background: #0f3f84;
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
  border: 1px solid rgba(18, 63, 133, 0.12);
  background: #ffffff;
  color: #123f85;
  font-size: 0.82rem;
  font-weight: 900;
  line-height: 1.35;
  white-space: nowrap;
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
  border-bottom: 1px solid rgba(216, 222, 232, 0.68);
  color: #3f536b;
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
    border-radius: 2px;
    background: #1f5cb2;
    box-shadow: 0 0 0 4px rgba(31, 92, 178, 0.08);
  }

  &::after {
    content: '';
    position: absolute;
    left: 4px;
    top: calc(1.05em + 8px);
    bottom: -7px;
    width: 1px;
    background: linear-gradient(180deg, rgba(31, 92, 178, 0.22), transparent);
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
