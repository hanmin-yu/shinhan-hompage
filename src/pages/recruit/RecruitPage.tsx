import styled from '@emotion/styled';

import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useI18n } from '../../i18n/useI18n';

const RecruitIntroSection = styled(E.Section)`
  padding: clamp(86px, 9vw, 144px) 0;
  background: #ffffff;
`;

const RecruitBenefitsSection = styled(E.Section)`
  padding: clamp(86px, 9vw, 144px) 0;
  background: #ffffff;
`;

const RecruitStatement = styled(E.Statement)`
  max-width: 1320px;
  gap: clamp(38px, 5vw, 72px);
`;

const RecruitHead = styled.div`
  display: grid;
  gap: 10px;
`;

const RecruitTitle = styled.h1`
  max-width: 1080px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.4rem, 4.6vw, 4.28rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const IntroLayout = styled(E.LeadGrid)`
  width: 100%;
  grid-template-columns: 1fr;
  align-items: stretch;
  gap: clamp(42px, 5.6vw, 76px);
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`;

const PrimaryAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 6px;
  border: 1px solid rgba(19, 84, 180, 0.34);
  background: linear-gradient(180deg, #2567c2, #174d9a);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 16px 30px rgba(23, 77, 154, 0.16);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(19, 84, 180, 0.48);
    box-shadow: 0 20px 36px rgba(23, 77, 154, 0.2);
  }
`;

const SecondaryAction = styled(PrimaryAction)`
  border-color: rgba(19, 84, 180, 0.22);
  background: #f6faff;
  color: #1a4f9a;
  box-shadow: none;
`;

const RolePanel = styled.aside`
  display: grid;
  align-content: start;
  gap: clamp(26px, 3.6vw, 42px);
  width: 100%;
  min-height: 100%;
  padding-top: clamp(24px, 3vw, 36px);
  background: #ffffff;
`;

const RoleHead = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 720px) {
    display: grid;
  }
`;

const PanelTitle = styled.h2`
  margin: 0;
  color: #172337;
  font-size: clamp(1.72rem, 3vw, 2.82rem);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: -0.035em;
`;

const RolePanelTitle = styled(PanelTitle)`
  color: #172337;
`;

const RoleCloud = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border: 1px solid #d5dbe4;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 252, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const RoleChip = styled.span`
  position: relative;
  display: grid;
  align-content: center;
  min-height: 138px;
  padding: clamp(32px, 3.2vw, 46px) clamp(28px, 3.4vw, 48px);
  border-right: 1px solid #dbe0e8;
  border-bottom: 1px solid #dbe0e8;
  color: #172337;
  font-size: clamp(1.18rem, 1.56vw, 1.42rem);
  font-weight: 800;
  line-height: 1.26;
  letter-spacing: -0.025em;
  word-break: keep-all;
  transition:
    color 0.18s ease,
    background-color 0.18s ease;

  &::before {
    content: '';
    position: absolute;
    left: clamp(28px, 3.4vw, 48px);
    top: 26px;
    width: 38px;
    height: 3px;
    background: linear-gradient(90deg, #1d5fb6, #1aa398);
    transition:
      width 0.18s ease,
      opacity 0.18s ease;
  }

  &:hover {
    color: #0f3f84;
    background: rgba(247, 250, 255, 0.62);
  }

  &:hover::before {
    width: 52px;
    opacity: 0.95;
  }

  &:nth-of-type(3n) {
    border-right: 0;
  }

  &:nth-last-of-type(-n + 3) {
    border-bottom: 0;
  }

  @media (max-width: 980px) {
    &:nth-of-type(3n) {
      border-right: 1px solid #d8dee8;
    }

    &:nth-of-type(2n) {
      border-right: 0;
    }

    &:nth-last-of-type(-n + 3) {
      border-bottom: 1px solid #d8dee8;
    }

    &:nth-last-of-type(-n + 2) {
      border-bottom: 0;
    }
  }

  @media (max-width: 560px) {
    min-height: 84px;
    border-right: 0;

    &:nth-last-of-type(-n + 2) {
      border-bottom: 1px solid #d8dee8;
    }

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const BenefitSummaryGrid = styled(P.Grid)`
  gap: 20px;
  margin-top: clamp(34px, 4vw, 52px);
`;

const RecruitSectionHead = styled(P.SectionHead)`
  max-width: 1320px;
  margin-right: auto;
  margin-left: auto;
`;

const RecruitContentContainer = styled(P.PageContainer)`
  max-width: 1320px;
`;

const BenefitSummaryCard = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 14px 22px;
  align-items: center;
  min-height: 100%;
  padding: clamp(26px, 2.8vw, 38px);
  border: 1px solid #d8dee8;
  background: #ffffff;

  &::before {
    content: '';
    position: absolute;
    left: clamp(26px, 2.8vw, 38px);
    top: clamp(22px, 2.4vw, 30px);
    width: 34px;
    height: 3px;
    background: linear-gradient(90deg, #1d5fb6, #1aa398);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const BenefitSummaryVisualRing = styled.div`
  display: grid;
  place-items: center;
  grid-row: span 3;
  width: 88px;
  height: 88px;
  border-radius: 0;
  border: 1px solid #d8dee8;
  background: #ffffff;

  img {
    max-width: 48px;
    max-height: 48px;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 640px) {
    grid-row: auto;

    img {
      max-width: 48px;
      max-height: 48px;
    }
  }
`;

const BenefitAccent = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 30px;
  padding: 0 11px;
  border-radius: 0;
  border: 1px solid #d8dee8;
  background: #ffffff;
  color: #0f3f84;
  font-size: 0.78rem;
  font-weight: 800;
  justify-self: start;
`;

const BenefitSummaryTitle = styled.h3`
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.12rem, 1.32vw, 1.28rem);
  font-weight: 800;
  line-height: 1.34;
  letter-spacing: -0.025em;
`;

const BenefitSummaryText = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: 1rem;
  line-height: 1.72;
`;

const TagRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding-top: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 0;
  border: 1px solid rgba(23, 35, 55, 0.12);
  background: #ffffff;
  color: #4d5a6c;
  font-size: 0.86rem;
  font-weight: 800;
`;

const MatrixPanel = styled(E.LinePanel)`
  display: grid;
  gap: clamp(28px, 4vw, 48px);
  margin-top: clamp(34px, 4vw, 58px);
  padding: clamp(44px, 5vw, 72px) 0 0;
  border-top: 1px solid #d8dee8;
  background: transparent;
`;

const MatrixHead = styled.div`
  display: grid;
  gap: 8px;
`;

const MatrixGrid = styled.div`
  display: grid;
  gap: 0;
  border-top: 1px solid #d8dee8;
`;

const MatrixCategoryBlock = styled.section`
  display: grid;
  grid-template-columns: minmax(190px, 0.24fr) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 54px);
  padding: clamp(26px, 3vw, 36px) 0;
  border-bottom: 1px solid #d8dee8;
  background: transparent;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const MatrixCardGroup = styled.div`
  display: grid;
  grid-column: 2;
  grid-row: 1;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 22px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 820px) {
    grid-column: 1;
    grid-row: auto;
  }
`;

const MatrixCard = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(20, 78, 158, 0.1);

  &:last-of-type {
    border-bottom: none;
  }
`;

const MatrixCardHead = styled.div`
  display: grid;
  align-content: start;
  gap: 12px;
`;

const MatrixCategory = styled.h4`
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.08rem, 1.4vw, 1.24rem);
  font-weight: 800;
  line-height: 1.32;
  letter-spacing: -0.025em;
`;

const MatrixDivider = styled.div`
  display: none;
`;

const MatrixItemBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 34px;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 0;
  border: 1px solid #d8dee8;
  background: #ffffff;
  color: #0f3f84;
  font-size: 0.72rem;
  font-weight: 800;
`;

const MatrixItemBody = styled.div`
  display: grid;
  gap: 6px;
  min-width: 0;
`;

const MatrixItemTitle = styled.h5`
  margin: 0;
  color: #172337;
  font-size: 0.98rem;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -0.02em;
`;

const MatrixItemText = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: 1rem;
  line-height: 1.62;
`;

const BottomCta = styled(E.LinePanel)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  margin-top: clamp(34px, 4vw, 58px);
  padding: clamp(30px, 4vw, 44px) 0;
  border-top: 1px solid #d8dee8;
  border-bottom: 1px solid #d8dee8;
  background: transparent;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const BottomCtaCopy = styled.div`
  display: grid;
  gap: 14px;
`;

const BottomCtaTitle = styled.h3`
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.72rem, 3vw, 2.82rem);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: -0.035em;
`;

const BottomActionRow = styled(ActionRow)`
  justify-content: flex-end;
  margin-top: 0;

  @media (max-width: 560px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const CtaAction = styled(PrimaryAction)`
  @media (max-width: 560px) {
    width: 100%;
  }
`;

const CtaSecondaryAction = styled(SecondaryAction)`
  @media (max-width: 560px) {
    width: 100%;
  }
`;

export function RecruitPage() {
  const { t } = useI18n();
  const { content } = useSiteContent();
  const recruitCopy = content.recruit.copy;

  return (
    <>
      <EditorialPageHeader
        config={content.global.utilitySubnav}
        title="채용"
        titleEn="Recruit"
        heroImage="/hero/menu-utility-recruit-ai.png"
        heroPosition="center 50%"
      />

      <RecruitIntroSection>
        <RecruitStatement data-reveal>
          <RecruitHead>
            <E.Eyebrow>Recruit</E.Eyebrow>
            <RecruitTitle>{t(recruitCopy.title, recruitCopy.titleEn)}</RecruitTitle>
          </RecruitHead>
          <IntroLayout>
            <RolePanel>
              <RoleHead>
                <div>
                  <E.Eyebrow>{t('모집 직무', 'Open Roles')}</E.Eyebrow>
                  <RolePanelTitle>{t(recruitCopy.rolesTitle, recruitCopy.rolesTitleEn)}</RolePanelTitle>
                </div>
              </RoleHead>
              <RoleCloud>
                {content.recruit.recruitRoles.map((role) => (
                  <RoleChip key={role.title}>{t(role.title, role.titleEn)}</RoleChip>
                ))}
              </RoleCloud>
            </RolePanel>
          </IntroLayout>
        </RecruitStatement>
      </RecruitIntroSection>

      <RecruitBenefitsSection>
        <RecruitContentContainer>
          <RecruitSectionHead>
            <div>
              <E.Eyebrow>{t('복리후생', 'Benefits')}</E.Eyebrow>
              <PanelTitle>{t(recruitCopy.benefitsTitle, recruitCopy.benefitsTitleEn)}</PanelTitle>
            </div>
          </RecruitSectionHead>

          <BenefitSummaryGrid columns={3}>
            {content.recruit.recruitBenefitSummaryCards.map((card) => (
              <BenefitSummaryCard key={card.title}>
                <BenefitSummaryVisualRing>
                  <img src={card.image} alt={t(card.imageAlt, card.imageAltEn)} />
                </BenefitSummaryVisualRing>
                <BenefitAccent>{t(card.accent, card.accentEn)}</BenefitAccent>
                <BenefitSummaryTitle>{t(card.title, card.titleEn)}</BenefitSummaryTitle>
                <BenefitSummaryText>{t(card.description, card.descriptionEn)}</BenefitSummaryText>
                <TagRow>
                  {card.tags.map((tag) => (
                    <Tag key={`${card.title}-${tag.label}`}>{t(tag.label, tag.labelEn)}</Tag>
                  ))}
                </TagRow>
              </BenefitSummaryCard>
            ))}
          </BenefitSummaryGrid>

          <MatrixPanel style={{ marginTop: 18 }}>
            <MatrixHead>
              <E.Eyebrow>{t('세부 복리후생', 'Detailed Benefits')}</E.Eyebrow>
              <PanelTitle>{t(recruitCopy.detailedBenefitsTitle, recruitCopy.detailedBenefitsTitleEn)}</PanelTitle>
            </MatrixHead>
            <MatrixGrid>
              {content.recruit.recruitBenefitDisplayGroups.map((group) => (
                <MatrixCategoryBlock key={group.category}>
                  <MatrixCardHead>
                    <MatrixCategory>{t(group.category, group.categoryEn)}</MatrixCategory>
                  </MatrixCardHead>
                  <MatrixDivider />
                  <MatrixCardGroup>
                    {group.items.map((item, index) => (
                      <MatrixCard key={`${group.category}-${item.label}`}>
                        <MatrixItemBadge>{String(index + 1).padStart(2, '0')}</MatrixItemBadge>
                        <MatrixItemBody>
                          <MatrixItemTitle>{t(item.label, item.labelEn)}</MatrixItemTitle>
                          <MatrixItemText>{t(item.detail, item.detailEn)}</MatrixItemText>
                        </MatrixItemBody>
                      </MatrixCard>
                    ))}
                  </MatrixCardGroup>
                </MatrixCategoryBlock>
              ))}
            </MatrixGrid>
          </MatrixPanel>

          <BottomCta style={{ marginTop: 18 }}>
            <BottomCtaCopy>
              <E.Eyebrow>{t('지원 안내', 'Apply')}</E.Eyebrow>
              <BottomCtaTitle>{t(recruitCopy.applyTitle, recruitCopy.applyTitleEn)}</BottomCtaTitle>
            </BottomCtaCopy>
            <BottomActionRow>
              <CtaAction href={content.recruit.recruitPostingLinks[0].href} target="_blank" rel="noreferrer">
                {t(content.recruit.recruitPostingLinks[0].label, content.recruit.recruitPostingLinks[0].labelEn)}
              </CtaAction>
              <CtaSecondaryAction href={content.recruit.recruitPostingLinks[1].href} target="_blank" rel="noreferrer">
                {t(content.recruit.recruitPostingLinks[1].label, content.recruit.recruitPostingLinks[1].labelEn)}
              </CtaSecondaryAction>
            </BottomActionRow>
            </BottomCta>
          </RecruitContentContainer>
      </RecruitBenefitsSection>
    </>
  );
}
