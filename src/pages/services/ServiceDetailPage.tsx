import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { serviceDetailPages } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

type ServiceDetailPageProps = {
  path: string;
};

const HeroVisual = styled.div<{ image: string }>`
  min-height: 320px;
  border-radius: 10px;
  border: 1px solid rgba(20, 76, 158, 0.16);
  background: ${({ image }) => `url(${image}) center / cover no-repeat`};
  overflow: hidden;

  @media (max-width: 980px) {
    min-height: 260px;
  }
`;

const HeadlinePanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
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

export function ServiceDetailPage({ path }: ServiceDetailPageProps) {
  const { t, tx } = useI18n();
  const content = serviceDetailPages.find((item) => item.path === path);

  if (!content) {
    return (
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Services</P.Kicker>
          <P.SectionTitle>{t('서비스 정보를 찾을 수 없습니다.', 'Service information was not found.')}</P.SectionTitle>
        </P.PageContainer>
      </P.PageSection>
    );
  }

  const heroImage = content.heroImage ?? '/hero/auto-parts.jpg';

  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Service Detail</P.Kicker>
          <P.SectionTitle>{tx(content.title)}</P.SectionTitle>

          <P.SplitGrid style={{ marginTop: 20 }}>
            <HeadlinePanel>
              <P.Lead style={{ marginTop: 0 }}>{tx(content.summary)}</P.Lead>
              <P.CardText>{tx(content.overview)}</P.CardText>
            </HeadlinePanel>
            <HeroVisual image={heroImage} role="img" aria-label={content.heroImageAlt ?? content.title} />
          </P.SplitGrid>
        </P.PageContainer>
      </P.PageSection>

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
            <P.Panel>
              <P.Kicker>{t('관련 전문가', 'Related Experts')}</P.Kicker>
              <P.BulletList>
                {content.relatedExpertNames.map((name) => (
                  <li key={name}>{tx(name)}</li>
                ))}
              </P.BulletList>
            </P.Panel>
            <P.Panel>
              <P.Kicker>{t('관련 자료', 'Related Resources')}</P.Kicker>
              <ResourceGrid columns={1}>
                {content.relatedResources.map((resource) => (
                  <P.Card key={resource.label}>
                    <P.CardTitle>{tx(resource.label)}</P.CardTitle>
                    <P.CardLink to={resource.href}>{t('자료 보기', 'View Resource')}</P.CardLink>
                  </P.Card>
                ))}
              </ResourceGrid>
            </P.Panel>
          </P.SplitGrid>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
