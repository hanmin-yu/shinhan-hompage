import styled from '@emotion/styled';

import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { utilitySubnav } from '../../config/utilitySubnav';
import {
  recruitBenefitDisplayGroups,
  recruitBenefitSummaryCards,
  recruitPostingLinks,
  recruitRoles,
} from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const RecruitIntroSection = styled(E.Section)`
  background: #ffffff;
`;

const RecruitBenefitsSection = styled(E.Section)`
  padding-top: clamp(64px, 7vw, 96px);
  background: linear-gradient(180deg, #f5f6f8 0%, #fbfcfd 100%);
`;

const IntroLayout = styled(E.LeadGrid)`
  align-items: start;
`;

const IntroPanel = styled.div`
  display: grid;
  align-content: center;
  gap: 18px;
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
  border-radius: 0;
  border: 1px solid rgba(19, 84, 180, 0.34);
  background: linear-gradient(180deg, #2567c2, #174d9a);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
`;

const SecondaryAction = styled(PrimaryAction)`
  border-color: rgba(19, 84, 180, 0.22);
  background: #f6faff;
  color: #1a4f9a;
`;

const RolePanel = styled(E.LinePanel)`
  display: grid;
  gap: 18px;
  padding: 24px 0;
`;

const RoleHead = styled.div`
  display: grid;
  gap: 8px;
`;

const PanelTitle = styled.h2`
  margin: 0;
  color: #172337;
  font-size: clamp(1.56rem, 2.8vw, 2.8rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.05em;
`;

const RoleCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RoleChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 0;
  border: 1px solid #d8dee8;
  background: #ffffff;
  color: #172337;
  font-size: 0.88rem;
  font-weight: 700;
`;

const RoleHint = styled.p`
  margin: 0;
  color: #50708f;
  font-size: 0.92rem;
  line-height: 1.7;
`;

const BenefitSummaryGrid = styled(P.Grid)`
  gap: 26px 18px;
  margin-top: 44px;
`;

const BenefitSummaryCard = styled(E.LinePanel)`
  display: grid;
  gap: 16px;
  min-height: 100%;
  padding: 24px 0;
  text-align: center;
`;

const BenefitSummaryVisualRing = styled.div`
  display: grid;
  place-items: center;
  justify-self: center;
  width: 124px;
  height: 124px;
  border-radius: 0;
  border: 1px solid rgba(28, 86, 170, 0.08);
  background:
    radial-gradient(circle at 30% 25%, rgba(228, 240, 255, 0.98), rgba(255, 255, 255, 0.98) 60%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(247, 250, 255, 0.98));
  box-shadow: 0 14px 26px rgba(21, 65, 126, 0.06);

  img {
    max-width: 72px;
    max-height: 72px;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 640px) {
    width: 112px;
    height: 112px;

    img {
      max-width: 64px;
      max-height: 64px;
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
  background: #ecf3ff;
  color: #2258a7;
  font-size: 0.78rem;
  font-weight: 800;
  justify-self: center;
`;

const BenefitSummaryTitle = styled.h3`
  margin: 0;
  color: #123d79;
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const BenefitSummaryText = styled.p`
  margin: 0;
  color: #4b678a;
  font-size: 0.92rem;
  line-height: 1.68;
`;

const TagRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 0;
  background: #f4f8ff;
  color: #2358a7;
  font-size: 0.8rem;
  font-weight: 700;
`;

const MatrixPanel = styled(E.LinePanel)`
  display: grid;
  gap: 24px;
  padding: clamp(24px, 3vw, 30px) 0;
`;

const MatrixHead = styled.div`
  display: grid;
  gap: 8px;
`;

const MatrixGrid = styled.div`
  display: grid;
  gap: 18px;
`;

const MatrixCategoryBlock = styled.section`
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 0;
  border: 0;
  border-top: 1px solid #d8dee8;
  background: transparent;
`;

const MatrixCardGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 18px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const MatrixCard = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px 14px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(20, 78, 158, 0.1);

  &:last-of-type {
    border-bottom: none;
  }
`;

const MatrixCardHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MatrixCategory = styled.h4`
  margin: 0;
  color: #173f7a;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;
`;

const MatrixCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 0;
  background: #eaf2ff;
  color: #1e58a7;
  font-size: 0.8rem;
  font-weight: 800;
  white-space: nowrap;
`;

const MatrixDivider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(24, 82, 164, 0.22), rgba(24, 82, 164, 0));
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
  background: #eef4ff;
  color: #1e58a7;
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
  color: #163f7b;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.02em;
`;

const MatrixItemText = styled.p`
  margin: 0;
  color: #5a708f;
  font-size: 0.88rem;
  line-height: 1.55;
`;

const BottomCta = styled(E.LinePanel)`
  display: grid;
  gap: 14px;
  padding: 28px 0;
  background: transparent;
`;

const BottomCtaTitle = styled.h3`
  margin: 0;
  color: #172337;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.04em;
`;

const BottomCtaText = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: 0.94rem;
  line-height: 1.72;
`;

const BottomActionRow = styled(ActionRow)`
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

  return (
    <>
      <EditorialPageHeader
        config={utilitySubnav}
        title="채용"
        titleEn="Recruit"
        heroImage="/hero/homepage/office-tower-clear-sky.jpg"
        heroPosition="center 42%"
      />

      <RecruitIntroSection>
        <E.Statement data-reveal>
          <div>
            <E.Eyebrow>Recruit</E.Eyebrow>
            <E.Title>{t('신한과 함께 성장할 인재를 기다립니다.', 'Grow your career with Shinhan.')}</E.Title>
          </div>
          <IntroLayout>
            <IntroPanel>
              <E.Lead>
                {t(
                  '신한관세법인은 관세·무역 현장에서 전문성과 책임감을 바탕으로 함께 성장할 유능한 인재를 기다립니다.',
                  'Shinhan Customs Service welcomes talented people who can grow with professionalism and responsibility in customs and trade practice.',
                )}
              </E.Lead>
            </IntroPanel>

            <RolePanel>
              <RoleHead>
                <E.Eyebrow>{t('모집 직무', 'Open Roles')}</E.Eyebrow>
                <PanelTitle>{t('모집 중인 직무', 'Open roles')}</PanelTitle>
              </RoleHead>
              <RoleHint>
                {t('현재 모집 중인 직무입니다.', 'Current openings.')}
              </RoleHint>
              <RoleCloud>
                {recruitRoles.map((role) => (
                  <RoleChip key={role.title}>{t(role.title, role.titleEn)}</RoleChip>
                ))}
              </RoleCloud>
            </RolePanel>
          </IntroLayout>
        </E.Statement>
      </RecruitIntroSection>

      <RecruitBenefitsSection>
        <P.PageContainer>
          <P.SectionHead>
            <div>
              <E.Eyebrow>{t('복리후생', 'Benefits')}</E.Eyebrow>
              <E.SectionTitle>{t('근무 및 지원 제도', 'Benefits & Support')}</E.SectionTitle>
            </div>
          </P.SectionHead>
          <E.Lead style={{ marginBottom: 24 }}>
            {t(
              '보상, 유연근무, 성장 지원 중심의 복리후생입니다.',
              'Benefits centered on compensation, flexibility, and growth support.',
            )}
          </E.Lead>

          <BenefitSummaryGrid columns={3}>
            {recruitBenefitSummaryCards.map((card) => (
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
              <PanelTitle>
                {t('카테고리별 전체 혜택', 'Full Benefits by Category')}
              </PanelTitle>
            </MatrixHead>
            <MatrixGrid>
              {recruitBenefitDisplayGroups.map((group) => (
                <MatrixCategoryBlock key={group.category}>
                  <MatrixCardHead>
                    <MatrixCategory>{t(group.category, group.categoryEn)}</MatrixCategory>
                    <MatrixCount>{group.items.length}</MatrixCount>
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
            <E.Eyebrow>{t('지원 안내', 'Apply')}</E.Eyebrow>
            <BottomCtaTitle>{t('채용 공고 바로가기', 'Current openings')}</BottomCtaTitle>
            <BottomCtaText>
              {t('채용 공고는 아래 채널에서 확인하세요.', 'Openings are available through the channels below.')}
            </BottomCtaText>
            <BottomActionRow>
              <CtaAction href={recruitPostingLinks[0].href} target="_blank" rel="noreferrer">
                {t(recruitPostingLinks[0].label, recruitPostingLinks[0].labelEn)}
              </CtaAction>
              <CtaSecondaryAction href={recruitPostingLinks[1].href} target="_blank" rel="noreferrer">
                {t(recruitPostingLinks[1].label, recruitPostingLinks[1].labelEn)}
              </CtaSecondaryAction>
            </BottomActionRow>
            </BottomCta>
          </P.PageContainer>
      </RecruitBenefitsSection>
    </>
  );
}
