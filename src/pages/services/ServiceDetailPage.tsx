import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { serviceDetailPages, serviceLandingGroups } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

type ServiceDetailPageProps = {
  path: string;
};

const HeroVisual = styled.div<{ image: string }>`
  min-height: 360px;
  border-radius: 22px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background:
    linear-gradient(180deg, rgba(8, 37, 81, 0.16), rgba(8, 37, 81, 0.04)),
    ${({ image }) => `url(${image}) center / cover no-repeat`};
  overflow: hidden;
  box-shadow: 0 26px 52px rgba(16, 45, 92, 0.1);

  @media (max-width: 980px) {
    min-height: 280px;
  }
`;

const HeadlinePanel = styled(P.StatementBlock)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
`;

const ChecklistGrid = styled(P.Grid)`
  margin-top: 14px;
`;

const ResourceGrid = styled(P.Grid)`
  margin-top: 8px;
`;

const SummaryImage = styled.div<{ image: string }>`
  min-height: 220px;
  border-radius: 10px;
  border: 1px solid rgba(20, 76, 158, 0.14);
  background: ${({ image }) => `url(${image}) center / cover no-repeat`};
`;

const GroupLabel = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #eef5ff;
  color: #1d58a7;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const SiblingNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SiblingLink = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid
    ${({ $active }) => ($active ? 'rgba(20, 76, 158, 0.22)' : 'rgba(20, 76, 158, 0.12)')};
  background: ${({ $active }) => ($active ? 'rgba(20, 76, 158, 0.12)' : '#f7faff')};
  color: ${({ $active }) => ($active ? '#123d78' : '#23579f')};
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  transition: all 0.18s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(20, 76, 158, 0.28);
    background: rgba(20, 76, 158, 0.12);
    color: #123d78;
  }
`;

export function ServiceDetailPage({ path }: ServiceDetailPageProps) {
  const { t, tx } = useI18n();
  const servicesSubnav = sectionSubnav.services;
  const content = serviceDetailPages.find((item) => item.path === path);

  if (!content) {
    return (
      <P.HeroSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Services</P.Kicker>
          <P.SectionTitle>{t('서비스 정보를 찾을 수 없습니다.', 'Service information was not found.')}</P.SectionTitle>
        </P.PageContainer>
      </P.HeroSection>
    );
  }

  const heroImage = content.heroImage ?? '/hero/auto-parts.jpg';
  const activeGroup = serviceLandingGroups.find((group) => group.id === content.groupKey) ?? null;

  return (
    <>
      <P.HeroSection>
        <P.PageContainer>
          <LandingSubnav
            kicker={servicesSubnav.kicker}
            kickerEn={servicesSubnav.kickerEn}
            title={servicesSubnav.title}
            titleEn={servicesSubnav.titleEn}
            summary={servicesSubnav.summary}
            summaryEn={servicesSubnav.summaryEn}
            items={servicesSubnav.items}
          />
        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <HeadlinePanel>
            <P.Kicker>Service Detail</P.Kicker>
            <GroupLabel>{t(content.groupTitle, content.groupTitleEn)}</GroupLabel>
            {activeGroup ? (
              <SiblingNav>
                {activeGroup.items.map((item) => (
                  <SiblingLink key={`${item.href}-${item.label}`} to={item.href} $active={item.href === content.path}>
                    {t(item.label, item.labelEn)}
                  </SiblingLink>
                ))}
              </SiblingNav>
            ) : null}
            <P.SectionTitle>{tx(content.title)}</P.SectionTitle>
            <P.Lead style={{ marginTop: 0 }}>{tx(content.summary)}</P.Lead>
            <P.CardText>{tx(content.overview)}</P.CardText>
          </HeadlinePanel>
          <HeroVisual image={heroImage} role="img" aria-label={content.heroImageAlt ?? content.title} />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>{t('주요 지원 범위', 'Scope')}</P.Kicker>
              <P.SectionTitle>{t('지원 범위', 'Support Scope')}</P.SectionTitle>
            </div>
          </P.SectionHead>
          <P.Grid columns={2}>
            {content.scope.map((item) => (
              <P.Card key={item}>
                <P.CardTitle>{tx(item)}</P.CardTitle>
                <P.CardText>
                  {t(
                    '현장 운영과 법령 적용을 함께 고려해 범위와 우선순위를 정리합니다.',
                    'We define scope and priorities by aligning field operations with regulatory application.',
                  )}
                </P.CardText>
              </P.Card>
            ))}
            {content.sectionImage ? <SummaryImage image={content.sectionImage} role="img" aria-hidden="true" /> : null}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Checklist</P.Kicker>
          <P.SectionTitle>{t('절차 / 체크포인트', 'Process / Checkpoints')}</P.SectionTitle>
          <ChecklistGrid columns={2}>
            {content.checkpoints.map((point) => (
              <P.Card key={point}>
                <P.CardTitle>{tx(point)}</P.CardTitle>
                <P.CardText>
                  {t(
                    '각 단계별로 필요한 자료와 확인 항목을 정리해 대응합니다.',
                    'We organize required documents and checkpoints for each phase.',
                  )}
                </P.CardText>
              </P.Card>
            ))}
          </ChecklistGrid>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.SplitGrid>
            <P.QuotePanel>
              <P.Kicker>{t('관련 전문가', 'Related Experts')}</P.Kicker>
              <P.SectionTitle>{t('전문가 연계', 'Expert Connection')}</P.SectionTitle>
              <P.SectionDivider />
              <P.BulletList>
                {content.relatedExpertNames.map((name) => (
                  <li key={name}>{tx(name)}</li>
                ))}
              </P.BulletList>
            </P.QuotePanel>
            <P.StatementBlock>
              <P.Kicker>{t('관련 자료', 'Related Resources')}</P.Kicker>
              <P.SectionTitle>{t('참고 자료', 'Related Resources')}</P.SectionTitle>
              <P.SectionDivider />
              <ResourceGrid columns={1}>
                {content.relatedResources.map((resource) => (
                  <P.Card key={resource.label}>
                    <P.CardTitle>{tx(resource.label)}</P.CardTitle>
                    <P.CardLink to={resource.href}>{t('자료 보기', 'View Resource')}</P.CardLink>
                  </P.Card>
                ))}
              </ResourceGrid>
            </P.StatementBlock>
          </P.SplitGrid>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
