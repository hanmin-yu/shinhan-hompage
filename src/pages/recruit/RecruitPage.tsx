import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import {
  recruitBenefitDisplayGroups,
  recruitBenefitSummaryCards,
  recruitPostingLinks,
  recruitRoles,
} from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const IntroLayout = styled(P.SplitGrid)`
  align-items: stretch;
`;

const IntroPanel = styled(P.Panel)`
  display: grid;
  align-content: center;
  gap: 12px;
  padding: clamp(24px, 3vw, 32px);
  border-radius: 22px;
  background:
    radial-gradient(circle at top right, rgba(47, 103, 183, 0.1), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 249, 255, 0.98));
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
  border-radius: 999px;
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

const RolePanel = styled(P.Panel)`
  display: grid;
  gap: 18px;
  padding: clamp(24px, 3vw, 32px);
  border-radius: 22px;
`;

const RoleHead = styled.div`
  display: grid;
  gap: 8px;
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
  border-radius: 999px;
  border: 1px solid rgba(21, 87, 182, 0.12);
  background: #f7faff;
  color: #184b95;
  font-size: 0.88rem;
  font-weight: 700;
`;

const RoleHint = styled.p`
  margin: 0;
  color: #50708f;
  font-size: 0.92rem;
  line-height: 1.7;
`;

const GuidePanel = styled(P.Panel)`
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 20px;
`;

const RoleCardGrid = styled(P.Grid)`
  gap: 14px;
`;

const RoleCard = styled(P.Card)`
  padding: 20px;
  border-radius: 18px;
`;

const BenefitSummaryGrid = styled(P.Grid)`
  gap: 26px 18px;
  margin-top: 44px;
`;

const BenefitSummaryCard = styled(P.Panel)`
  display: grid;
  gap: 16px;
  min-height: 100%;
  padding: 28px 24px 24px;
  border-radius: 28px;
  text-align: center;
  background:
    radial-gradient(circle at top center, rgba(255, 255, 255, 0.98), rgba(247, 250, 255, 0.98) 72%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 250, 255, 0.98));
`;

const BenefitSummaryVisualRing = styled.div`
  display: grid;
  place-items: center;
  justify-self: center;
  width: 124px;
  height: 124px;
  border-radius: 32px;
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
  border-radius: 999px;
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
  border-radius: 999px;
  background: #f4f8ff;
  color: #2358a7;
  font-size: 0.8rem;
  font-weight: 700;
`;

const MatrixPanel = styled(P.Panel)`
  display: grid;
  gap: 24px;
  padding: clamp(24px, 3vw, 30px);
  border-radius: 24px;
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
  border-radius: 22px;
  border: 1px solid rgba(18, 74, 151, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(249, 251, 255, 0.98));
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
  border-radius: 999px;
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
  border-radius: 999px;
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

const BottomCta = styled(P.Panel)`
  display: grid;
  gap: 14px;
  padding: 24px;
  border-radius: 22px;
  background:
    linear-gradient(130deg, rgba(12, 46, 95, 0.98), rgba(21, 77, 154, 0.96));
`;

const BottomCtaTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.04em;
`;

const BottomCtaText = styled.p`
  margin: 0;
  color: rgba(229, 239, 255, 0.94);
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
      <P.PageSection>
        <IntroLayout data-reveal>
          <IntroPanel>
            <P.Kicker>Recruit</P.Kicker>
            <P.SectionTitle>{t('채용', 'Recruit')}</P.SectionTitle>
            <P.Lead>
              {t(
                '신한관세법인은 유능한 인재를 기다립니다.',
                'Shinhan Customs Service is looking for exceptional talent.',
              )}
            </P.Lead>
          </IntroPanel>

          <RolePanel>
            <RoleHead>
              <P.Kicker>{t('모집 직무', 'Open Roles')}</P.Kicker>
              <P.SectionTitle style={{ fontSize: '1.8rem' }}>{t('모집 중인 직무', 'Open roles')}</P.SectionTitle>
            </RoleHead>
            <RoleHint>
              {t('모집 중인 직무입니다.', 'Current openings.')}
            </RoleHint>
            <RoleCloud>
              {recruitRoles.map((role) => (
                <RoleChip key={role.title}>{t(role.title, role.titleEn)}</RoleChip>
              ))}
            </RoleCloud>
          </RolePanel>
        </IntroLayout>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>{t('채용 안내', 'Recruitment Guide')}</P.Kicker>
              <P.SectionTitle>{t('모집 직무 안내', 'Role Track Guide')}</P.SectionTitle>
            </div>
          </P.SectionHead>
          <GuidePanel>
            <div>
              <P.Kicker>{t('모집 직무', 'Open Roles')}</P.Kicker>
              <P.SectionTitle style={{ fontSize: '1.5rem', marginTop: 8 }}>{t('채용 직무군', 'Role Tracks')}</P.SectionTitle>
            </div>
            <P.CardText>{t('현재 모집 중인 직무군입니다.', 'Current role tracks.')}</P.CardText>
            <RoleCardGrid columns={3}>
              {recruitRoles.map((role) => (
                <RoleCard key={role.title}>
                  <P.CardTitle>{t(role.title, role.titleEn)}</P.CardTitle>
                </RoleCard>
              ))}
            </RoleCardGrid>
          </GuidePanel>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>{t('복리후생', 'Benefits')}</P.Kicker>
              <P.SectionTitle>{t('근무 및 지원 제도', 'Benefits & Support')}</P.SectionTitle>
            </div>
          </P.SectionHead>
          <P.Lead style={{ marginBottom: 24 }}>
            {t(
              '보상, 유연근무, 성장 지원 중심의 복리후생입니다.',
              'Benefits centered on compensation, flexibility, and growth support.',
            )}
          </P.Lead>

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
              <P.Kicker>{t('세부 복리후생', 'Detailed Benefits')}</P.Kicker>
              <P.SectionTitle style={{ fontSize: '1.6rem', marginTop: 8 }}>
                {t('카테고리별 전체 혜택', 'Full Benefits by Category')}
              </P.SectionTitle>
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
            <P.Kicker style={{ color: 'rgba(220, 234, 255, 0.9)' }}>{t('지원 안내', 'Apply')}</P.Kicker>
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
      </P.PageSection>
    </>
  );
}
