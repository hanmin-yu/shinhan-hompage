import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { ServiceDetailSubnav } from '../../components/site/ServiceDetailSubnav';
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

const SubtitleText = styled.p`
  margin: 0;
  color: #1d4f96;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.7;
`;

const ChecklistGrid = styled(P.Grid)`
  margin-top: 14px;
`;

const ResourceGrid = styled(P.Grid)`
  margin-top: 8px;
`;

const DocumentStack = styled.div`
  display: grid;
  gap: 18px;
`;

const DocumentSectionCard = styled(P.StatementBlock)`
  gap: 14px;
`;

const ParagraphStack = styled.div`
  display: grid;
  gap: 10px;
`;

const SectionParagraph = styled(P.CardText)`
  max-width: none;
  line-height: 1.78;
`;

const SectionList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #486485;
  font-size: 0.95rem;
  line-height: 1.72;
`;

const StepList = styled.ol`
  margin: 0;
  padding-left: 22px;
  color: #486485;
  font-size: 0.95rem;
  line-height: 1.72;
`;

const ContactGrid = styled(P.Grid)`
  margin-top: 8px;
`;

const ContactMeta = styled.div`
  display: grid;
  gap: 6px;
`;

const ContactLabel = styled.span`
  color: #5a7395;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ContactValue = styled.a`
  color: #1d4f96;
  font-size: 0.94rem;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SummaryImage = styled.div<{ image: string }>`
  min-height: 220px;
  border-radius: 10px;
  border: 1px solid rgba(20, 76, 158, 0.14);
  background: ${({ image }) => `url(${image}) center / cover no-repeat`};
`;

const FigureGrid = styled.div<{ columns: 1 | 2 }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const FigureCard = styled.figure`
  margin: 0;
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(19, 75, 154, 0.12);
  background: #ffffff;
  box-shadow: 0 18px 38px rgba(16, 53, 114, 0.05);
`;

const FigureImage = styled.img`
  width: 100%;
  display: block;
  border-radius: 12px;
  border: 1px solid rgba(20, 76, 158, 0.1);
  object-fit: cover;
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
  const hasDocumentSections = Boolean(content.contentSections?.length);
  const hasContactPoints = Boolean(content.contactPoints?.length);
  const hasDocumentImages = Boolean(content.documentImages?.length);
  const useDocumentLayout = hasDocumentSections || hasContactPoints || hasDocumentImages;

  return (
    <>
      <P.HeroSection>
        <P.PageContainer>
          <ServiceDetailSubnav
            kicker={servicesSubnav.kicker}
            kickerEn={servicesSubnav.kickerEn}
            title={servicesSubnav.title}
            titleEn={servicesSubnav.titleEn}
            summary={servicesSubnav.summary}
            summaryEn={servicesSubnav.summaryEn}
            groups={serviceLandingGroups}
            activeGroupId={content.groupKey}
            activePath={content.path}
          />
        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <HeadlinePanel>
            <P.Kicker>Service Detail</P.Kicker>
            <P.SectionTitle>{tx(content.title)}</P.SectionTitle>
            {content.subtitle ? <SubtitleText>{tx(content.subtitle)}</SubtitleText> : null}
            <P.Lead style={{ marginTop: 0 }}>{tx(content.summary)}</P.Lead>
            <P.CardText>{tx(content.overview)}</P.CardText>
          </HeadlinePanel>
          <HeroVisual image={heroImage} role="img" aria-label={content.heroImageAlt ?? content.title} />
        </P.IntroBlock>
      </P.HeroSection>

      {useDocumentLayout ? (
        <>
          {hasDocumentSections ? (
            <P.PageSection tone="soft">
              <P.PageContainer data-reveal>
                <P.Kicker>{t('문서 구성', 'Document Flow')}</P.Kicker>
                <P.SectionTitle>{t('상세 내용', 'Detailed Content')}</P.SectionTitle>
                <DocumentStack>
                  {content.contentSections?.map((section) => (
                    <DocumentSectionCard key={section.heading}>
                      <P.CardTitle>{t(section.heading, section.headingEn ?? tx(section.heading))}</P.CardTitle>
                      {section.body?.length ? (
                        <ParagraphStack>
                          {section.body.map((paragraph) => (
                            <SectionParagraph key={paragraph}>{tx(paragraph)}</SectionParagraph>
                          ))}
                        </ParagraphStack>
                      ) : null}
                      {section.list?.length ? (
                        <SectionList>
                          {section.list.map((item) => (
                            <li key={item}>{tx(item)}</li>
                          ))}
                        </SectionList>
                      ) : null}
                      {section.steps?.length ? (
                        <StepList>
                          {section.steps.map((step) => (
                            <li key={step}>{tx(step)}</li>
                          ))}
                        </StepList>
                      ) : null}
                    </DocumentSectionCard>
                  ))}
                  {!hasDocumentImages && content.sectionImage ? (
                    <SummaryImage image={content.sectionImage} role="img" aria-hidden="true" />
                  ) : null}
                </DocumentStack>
              </P.PageContainer>
            </P.PageSection>
          ) : null}

          {hasDocumentImages ? (
            <P.PageSection>
              <P.PageContainer data-reveal>
                <P.Kicker>{t('자료/도식', 'Figures & Diagrams')}</P.Kicker>
                <P.SectionTitle>{t('참고 이미지', 'Reference Images')}</P.SectionTitle>
                <FigureGrid columns={(content.documentImages?.length ?? 0) > 1 ? 2 : 1}>
                  {content.documentImages?.map((image) => (
                    <FigureCard key={image.src}>
                      <FigureImage src={image.src} alt={tx(image.alt)} loading="lazy" />
                    </FigureCard>
                  ))}
                </FigureGrid>
              </P.PageContainer>
            </P.PageSection>
          ) : null}
        </>
      ) : (
        <>
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
        </>
      )}

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.SplitGrid>
            <P.QuotePanel>
              <P.Kicker>{hasContactPoints ? t('연락처', 'Contact') : t('관련 전문가', 'Related Experts')}</P.Kicker>
              <P.SectionTitle>{hasContactPoints ? t('Contact Point', 'Contact Point') : t('전문가 연계', 'Expert Connection')}</P.SectionTitle>
              <P.SectionDivider />
              {hasContactPoints ? (
                <ContactGrid columns={2}>
                  {content.contactPoints?.map((contact) => (
                    <P.Card key={`${contact.name}-${contact.phone ?? ''}-${contact.email ?? ''}`}>
                      <P.CardTitle>{tx(contact.name)}</P.CardTitle>
                      {contact.role ? <P.CardText>{tx(contact.role)}</P.CardText> : null}
                      {contact.phone ? (
                        <ContactMeta>
                          <ContactLabel>{t('전화', 'Phone')}</ContactLabel>
                          <ContactValue href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</ContactValue>
                        </ContactMeta>
                      ) : null}
                      {contact.email ? (
                        <ContactMeta>
                          <ContactLabel>{t('이메일', 'Email')}</ContactLabel>
                          <ContactValue href={`mailto:${contact.email}`}>{contact.email}</ContactValue>
                        </ContactMeta>
                      ) : null}
                    </P.Card>
                  ))}
                </ContactGrid>
              ) : (
                <P.BulletList>
                  {content.relatedExpertNames.map((name) => (
                    <li key={name}>{tx(name)}</li>
                  ))}
                </P.BulletList>
              )}
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
