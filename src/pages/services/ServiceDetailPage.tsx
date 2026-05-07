import styled from '@emotion/styled';

import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { ServiceDetailSubnav } from '../../components/site/ServiceDetailSubnav';
import { sectionSubnav } from '../../config/sectionSubnav';
import { serviceDetailPages, serviceLandingGroups } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

type ServiceDetailPageProps = {
  path: string;
};

const EditorialSection = styled.section<{ $tone?: 'soft' }>`
  font-family: "NanumSquare", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  padding: clamp(72px, 8vw, 118px) 0;
  border-top: 1px solid #d8dee8;
  background: ${({ $tone }) => ($tone === 'soft' ? '#f6f7f9' : '#ffffff')};
`;

const ServiceNavSection = styled.section`
  padding: clamp(18px, 2.6vw, 28px) 0;
  border-top: 1px solid #e4e7ec;
  border-bottom: 1px solid #e4e7ec;
  background: #ffffff;
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 52px);
  max-width: 1280px;
`;

const HeroEyebrow = styled.span`
  color: #1d5fb6;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: #111827;
  font-size: clamp(2.2rem, 4.4vw, 4.35rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const IntroStack = styled.div`
  display: grid;
  gap: clamp(24px, 3.6vw, 44px);
`;

const OneLineSummary = styled.p`
  max-width: 1080px;
  margin: 0;
  color: #1f2937;
  font-size: clamp(1.58rem, 3vw, 2.86rem);
  font-weight: 800;
  line-height: 1.24;
  letter-spacing: -0.032em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.03em;
  }
`;

const OverviewBlock = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 0.18fr) minmax(0, 1fr);
  gap: clamp(20px, 4vw, 56px);
  padding: clamp(28px, 3.5vw, 42px) 0;
  border-top: 2px solid #1d5fb6;
  border-bottom: 1px solid #d8dee8;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const OverviewTitle = styled.h2`
  margin: 0;
  color: #174d9a;
  font-size: clamp(1.12rem, 1.6vw, 1.34rem);
  font-weight: 900;
  line-height: 1.28;
  letter-spacing: -0.025em;
`;

const OverviewText = styled.p`
  max-width: 940px;
  margin: 0;
  color: #475569;
  font-size: clamp(1.02rem, 1.3vw, 1.15rem);
  line-height: 1.82;
`;

const SectionInner = styled(P.PageContainer)`
  display: grid;
  gap: clamp(34px, 5vw, 62px);
  max-width: 1280px;
`;

const SectionHead = styled.div`
  display: grid;
  gap: 12px;
`;

const SectionLabel = styled.span`
  display: block;
  color: #52647c;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const EditorialTitle = styled.h2`
  max-width: 860px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.14rem, 4.2vw, 4.22rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.05em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const ItemBodyStack = styled.div`
  display: grid;
  gap: 10px;
`;

const DocumentStack = styled.div`
  display: grid;
  border-top: 2px solid #1d5fb6;
`;

const DocumentSectionCard = styled.article`
  display: grid;
  grid-template-columns: minmax(180px, 0.28fr) minmax(0, 1fr);
  gap: clamp(22px, 4vw, 58px);
  padding: clamp(28px, 3.4vw, 46px) 0;
  border-bottom: 1px solid #dbe0e8;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const DocumentSectionTitle = styled.h3`
  margin: 0;
  color: #174d9a;
  font-size: clamp(1.1rem, 1.7vw, 1.36rem);
  font-weight: 900;
  line-height: 1.34;
  letter-spacing: -0.025em;
`;

const ParagraphStack = styled.div`
  display: grid;
  gap: 10px;
`;

const SectionParagraph = styled.p`
  max-width: none;
  margin: 0;
  color: #475569;
  font-size: 1.06rem;
  line-height: 1.78;
`;

const SectionList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #475569;
  font-family: inherit;
  font-size: 1.04rem;
  line-height: 1.72;
`;

const DiagramList = styled.div`
  counter-reset: service-diagram;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const DiagramItem = styled.div`
  counter-increment: service-diagram;
  position: relative;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 18px;
  min-height: 142px;
  padding: 24px;
  border: 1px solid #d8dee8;
  border-top: 2px solid #1d5fb6;
  background: #ffffff;

  &::before {
    content: counter(service-diagram, decimal-leading-zero);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    color: #1d5fb6;
    font-size: 0.82rem;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0.08em;
    padding-top: 4px;
  }
`;

const DiagramTerm = styled.strong`
  color: #111827;
  font-size: clamp(1.04rem, 1.32vw, 1.18rem);
  font-weight: 900;
  line-height: 1.42;
  letter-spacing: -0.015em;
`;

const DiagramDescription = styled.span`
  grid-column: 2;
  color: #475569;
  font-size: clamp(1rem, 1.24vw, 1.08rem);
  line-height: 1.68;
  padding-top: 2px;
  border-top: 1px solid #e4e8ef;
`;

const StepList = styled.ol`
  margin: 0;
  padding-left: 22px;
  color: #475569;
  font-family: inherit;
  font-size: 1.04rem;
  line-height: 1.72;
`;

const ContactGrid = styled(P.Grid)`
  margin-top: 0;
`;

const ContactPanel = styled.article`
  display: grid;
  gap: 20px;
  border-top: 2px solid #1d5fb6;
  border-bottom: 1px solid #d5dbe4;
  background: transparent;
`;

const ContactCard = styled.article`
  display: grid;
  gap: 12px;
  padding: 22px 0;
  border-bottom: 1px solid #dbe0e8;
`;

const ContactName = styled.h3`
  margin: 0;
  color: #111827;
  font-size: clamp(1.12rem, 1.7vw, 1.38rem);
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.02em;
`;

const ContactRole = styled.p`
  margin: 0;
  color: #4e5d70;
  font-size: 1.04rem;
  line-height: 1.72;
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
  font-size: 1.02rem;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FigureGrid = styled.div<{ columns: 1 | 2 }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  gap: clamp(18px, 3vw, 30px);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const FigureCard = styled.figure`
  margin: 0;
  padding-top: 18px;
  border-top: 1px solid #d5dbe4;
`;

const FigureImage = styled.img`
  width: 100%;
  display: block;
  border-radius: 8px;
  border: 1px solid rgba(20, 76, 158, 0.1);
  object-fit: cover;
`;

function splitDiagramItem(item: string) {
  const [term, description] = item.split('->').map((part) => part.trim());
  return { term, description };
}

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
  const contentDetailSections = content.contentSections?.filter((section) => section.heading !== '개요') ?? [];
  const detailSections = hasDocumentSections
    ? contentDetailSections
    : [
        {
          heading: t('지원 범위', 'Support Scope'),
          list: content.scope,
        },
        {
          heading: t('절차 / 체크포인트', 'Process / Checkpoints'),
          list: content.checkpoints,
        },
      ];
  const contactPoints = content.contactPoints ?? [];

  return (
    <>
      <EditorialPageHeader
        config={servicesSubnav}
        title={tx(content.title)}
        titleEn={tx(content.title)}
        heroImage={heroImage}
        heroPosition="center 50%"
      />

      <ServiceNavSection>
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
      </ServiceNavSection>

      <EditorialSection>
        <HeroStatement data-reveal>
          <IntroStack>
            <div>
              <HeroEyebrow>{t('업무 분야', 'Service Detail')}</HeroEyebrow>
              <HeroTitle>{tx(content.title)}</HeroTitle>
            </div>
            <OneLineSummary>{tx(content.subtitle ?? content.summary)}</OneLineSummary>
            <OverviewBlock>
              <OverviewTitle>{t('개요', 'Overview')}</OverviewTitle>
              <OverviewText>{tx(content.overview)}</OverviewText>
            </OverviewBlock>
          </IntroStack>
        </HeroStatement>
      </EditorialSection>

      <EditorialSection>
        <SectionInner data-reveal>
          <DocumentStack>
            {detailSections?.map((section) => (
              <DocumentSectionCard key={section.heading}>
                <DocumentSectionTitle>{t(section.heading, section.headingEn ?? tx(section.heading))}</DocumentSectionTitle>
                <ItemBodyStack>
                  {section.body?.length ? (
                    <ParagraphStack>
                      {section.body.map((paragraph) => (
                        <SectionParagraph key={paragraph}>{tx(paragraph)}</SectionParagraph>
                      ))}
                    </ParagraphStack>
                  ) : null}
                  {section.list?.length ? (
                    section.list.every((item) => item.includes('->')) ? (
                      <DiagramList>
                        {section.list.map((item) => {
                          const { term, description } = splitDiagramItem(tx(item));
                          return (
                            <DiagramItem key={item}>
                              <DiagramTerm>{term}</DiagramTerm>
                              <DiagramDescription>{description}</DiagramDescription>
                            </DiagramItem>
                          );
                        })}
                      </DiagramList>
                    ) : (
                      <SectionList>
                        {section.list.map((item) => (
                          <li key={item}>{tx(item)}</li>
                        ))}
                      </SectionList>
                    )
                  ) : null}
                  {section.steps?.length ? (
                    <StepList>
                      {section.steps.map((step) => (
                        <li key={step}>{tx(step)}</li>
                      ))}
                    </StepList>
                  ) : null}
                </ItemBodyStack>
              </DocumentSectionCard>
            ))}
          </DocumentStack>
        </SectionInner>
      </EditorialSection>

      {hasDocumentImages ? (
        <EditorialSection>
          <SectionInner data-reveal>
            <SectionHead>
              <SectionLabel>{t('자료/도식', 'Figures & Diagrams')}</SectionLabel>
              <EditorialTitle>{t('참고 이미지', 'Reference Images')}</EditorialTitle>
            </SectionHead>
            <FigureGrid columns={(content.documentImages?.length ?? 0) > 1 ? 2 : 1}>
              {content.documentImages?.map((image) => (
                <FigureCard key={image.src}>
                  <FigureImage src={image.src} alt={tx(image.alt)} loading="lazy" />
                </FigureCard>
              ))}
            </FigureGrid>
          </SectionInner>
        </EditorialSection>
      ) : null}

      <EditorialSection>
        <SectionInner data-reveal>
          <SectionHead>
            <SectionLabel>Contact</SectionLabel>
            <EditorialTitle>{t('담당자(Contact Point)', 'Contact Point')}</EditorialTitle>
          </SectionHead>
          <ContactPanel>
            {hasContactPoints ? (
              <ContactGrid columns={2}>
                {contactPoints.map((contact) => (
                  <ContactCard key={`${contact.name}-${contact.phone ?? ''}-${contact.email ?? ''}`}>
                    <ContactName>{tx(contact.name)}</ContactName>
                    {contact.role ? <ContactRole>{tx(contact.role)}</ContactRole> : null}
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
                  </ContactCard>
                ))}
              </ContactGrid>
            ) : (
              <P.BulletList>
                {content.relatedExpertNames.map((name) => (
                  <li key={name}>{tx(name)}</li>
                ))}
              </P.BulletList>
            )}
          </ContactPanel>
        </SectionInner>
      </EditorialSection>
    </>
  );
}
