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
  gap: 0;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto clamp(42px, 5vw, 72px);
  border-top: 1px solid #d8dee8;
  border-left: 1px solid #d8dee8;
  background: #ffffff;

  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 158px;
  min-width: 132px;
  min-height: 64px;
  padding: 0 22px;
  border: 0;
  border-right: 1px solid #d8dee8;
  border-bottom: 1px solid #d8dee8;
  border-radius: 0;
  background: #ffffff;
  color: ${({ $active }) => ($active ? '#172337' : '#526174')};
  font-size: 0.96rem;
  font-weight: 850;
  letter-spacing: 0;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background-color 0.18s ease;

  &::before {
    content: '';
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: -1px;
    height: 3px;
    background: #172337;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0.6)});
    transform-origin: center;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  &:hover,
  &:focus-visible {
    background: #f7f9fc;
    color: #172337;
    outline: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    transform: scaleX(1);
  }

  @media (max-width: 760px) {
    flex-basis: 50%;
    min-height: 58px;
    padding: 0 18px;
    font-size: 0.92rem;
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
  grid-template-columns: repeat(2, minmax(360px, 520px));
  justify-content: center;
  gap: clamp(22px, 3vw, 42px);
  width: min(100%, 1120px);
  margin: 0 auto;

  @media (max-width: 980px) {
    grid-template-columns: minmax(0, 560px);
  }
`;

const ProfileCard = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(108px, 9vw, 138px);
  min-height: 218px;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(22, 88, 172, 0.14);
  background:
    linear-gradient(135deg, rgba(240, 247, 255, 0.98), rgba(255, 255, 255, 0.98) 44%),
    #ffffff;
  box-shadow:
    16px 16px 42px rgba(13, 52, 105, 0.12),
    -16px -16px 42px rgba(255, 255, 255, 0.88);
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
    border-color: rgba(28, 90, 167, 0.38);
    box-shadow:
      18px 22px 48px rgba(13, 52, 105, 0.18),
      -18px -18px 42px rgba(255, 255, 255, 0.9);
    outline: none;
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) 92px;
    min-height: 190px;
    border-radius: 14px;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(20px, 2.4vw, 30px);
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
`;

const Name = styled.h3`
  flex: 0 0 auto;
  margin: 0;
  color: #121c2b;
  font-size: clamp(1.52rem, 2.2vw, 2.08rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0;
`;

const NameDivider = styled.span`
  flex: 0 0 auto;
  width: 2px;
  height: 32px;
  background: #121c2b;
  opacity: 0.86;
`;

const RoleStack = styled.div`
  display: grid;
  gap: 3px;
  min-width: 0;
`;

const Title = styled.p`
  margin: 0;
  color: #0c4e96;
  font-size: 0.96rem;
  font-weight: 850;
  line-height: 1.38;
`;

const Division = styled.p`
  margin: 0;
  color: #6a7482;
  font-size: 0.94rem;
  font-weight: 650;
  line-height: 1.45;
`;

const ContactList = styled.div`
  display: grid;
  gap: 8px;
  margin-top: auto;
  padding-top: 18px;
`;

const ContactItem = styled.p`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  color: #526174;
  font-size: 0.94rem;
  font-weight: 650;
  line-height: 1.45;
  word-break: keep-all;
  overflow-wrap: normal;

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
  background:
    linear-gradient(135deg, rgba(18, 82, 166, 0.22), rgba(18, 82, 166, 0.04) 58%),
    #dfeaf7;

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 -34px;
    width: 68px;
    background: #ffffff;
    clip-path: polygon(0 0, 100% 0, 44% 100%, 0 100%);
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 58%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(28, 90, 167, 0.1));
  }
`;

const PortraitFrame = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  z-index: 2;
  width: 126px;
  height: 184px;
  overflow: hidden;
  border-radius: 10px 10px 8px 8px;
  border: 1px solid rgba(255, 255, 255, 0.64);
  background:
    radial-gradient(circle at 50% 16%, rgba(255, 255, 255, 0.94), rgba(240, 245, 251, 0.9) 44%, rgba(218, 229, 242, 0.92)),
    #eef3f8;
  box-shadow:
    0 16px 28px rgba(19, 58, 105, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.82);
  transform: translateY(-50%);

  @media (max-width: 560px) {
    right: 0;
    width: 92px;
    height: 134px;
  }
`;

const Portrait = styled.img<{ $fit?: 'contain' | 'cover' }>`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: ${({ $fit }) => $fit ?? 'cover'};
  object-position: 50% 18%;
  filter: saturate(0.98) contrast(1.01);
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
        </ProfileCard>
      ))}
    </DirectoryGrid>
  );
}
