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
  padding: clamp(78px, 9vw, 128px) 0;
  border-top: 1px solid #d8dee8;
  background: ${({ $tone }) => ($tone === 'soft' ? 'linear-gradient(180deg, #f5f6f8 0%, #fbfcfd 100%)' : '#ffffff')};
`;

const ServiceNavSection = styled.section`
  padding: clamp(18px, 2.6vw, 28px) 0;
  border-top: 1px solid #e4e7ec;
  border-bottom: 1px solid #e4e7ec;
  background: #ffffff;
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 54px);
`;

const HeroEyebrow = styled.span`
  color: #52647c;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.44rem, 5.6vw, 5.4rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.055em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const HeroLeadGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(280px, 0.42fr);
  gap: clamp(28px, 5vw, 74px);
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const BodyStack = styled.div`
  display: grid;
  gap: 18px;
`;

const HeroLead = styled.p`
  max-width: 820px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.45vw, 1.22rem);
  line-height: 1.82;
`;

const ServiceFacts = styled.div`
  display: grid;
  border: 1px solid #d5dbe4;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 252, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);
  overflow: hidden;
`;

const ServiceFact = styled.div`
  position: relative;
  display: grid;
  gap: 12px;
  padding: 22px 22px 20px;
  border-bottom: 1px solid #dbe0e8;

  &::before {
    content: '';
    width: 34px;
    height: 3px;
    background: linear-gradient(90deg, #1d5fb6, #1aa398);
  }

  &:last-of-type {
    border-bottom: 0;
  }
`;

const ServiceFactValue = styled.strong`
  color: #172337;
  font-size: clamp(1.24rem, 1.8vw, 1.62rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.035em;
  overflow-wrap: anywhere;
`;

const ServiceFactLabel = styled.span`
  color: #687385;
  font-size: 0.92rem;
  line-height: 1.58;
  overflow-wrap: anywhere;
`;

const SubtitleText = styled.p`
  margin: 0;
  color: #52647c;
  font-size: 0.98rem;
  font-weight: 800;
  line-height: 1.7;
`;

const SectionInner = styled(P.PageContainer)`
  display: grid;
  gap: clamp(34px, 5vw, 62px);
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.38fr) minmax(0, 0.62fr);
  gap: clamp(34px, 6vw, 86px);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedPanel = styled.article`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(24px, 3vw, 38px);
  border-top: 1px solid #d5dbe4;
  border-bottom: 1px solid #d5dbe4;
`;

const FeaturedMeta = styled.span`
  color: rgba(45, 58, 76, 0.34);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h3`
  margin: 0;
  color: #18283e;
  font-size: clamp(1.36rem, 2vw, 1.72rem);
  font-weight: 800;
  line-height: 1.28;
  letter-spacing: -0.03em;
`;

const FeaturedBody = styled.p`
  margin: 0;
  color: #4e5d70;
  font-size: 0.98rem;
  line-height: 1.76;
`;

const ItemList = styled.div`
  display: grid;
  border-top: 1px solid #d5dbe4;
`;

const Item = styled.article`
  display: grid;
  grid-template-columns: minmax(112px, 0.22fr) minmax(0, 1fr);
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid #dbe0e8;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ItemCategory = styled.span`
  color: #52647c;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const ItemBodyStack = styled.div`
  display: grid;
  gap: 10px;
`;

const ItemTitle = styled.h4`
  margin: 0;
  color: #18283e;
  font-size: clamp(1.12rem, 1.7vw, 1.38rem);
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.02em;
`;

const ItemBody = styled.p`
  margin: 0;
  color: #4e5d70;
  font-size: 0.94rem;
  line-height: 1.72;
`;

const DocumentStack = styled.div`
  display: grid;
  border-top: 1px solid #d5dbe4;
`;

const DocumentSectionCard = styled.article`
  display: grid;
  grid-template-columns: minmax(140px, 0.24fr) minmax(0, 1fr);
  gap: clamp(20px, 4vw, 48px);
  padding: clamp(24px, 3vw, 34px) 0;
  border-bottom: 1px solid #dbe0e8;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ParagraphStack = styled.div`
  display: grid;
  gap: 10px;
`;

const SectionParagraph = styled.p`
  max-width: none;
  margin: 0;
  color: #4e5d70;
  font-size: 0.96rem;
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
  margin-top: 0;
`;

const ContactPanel = styled.article`
  display: grid;
  gap: 20px;
  padding: clamp(24px, 3vw, 38px);
  border-top: 1px solid #d5dbe4;
  border-bottom: 1px solid #d5dbe4;
  background: rgba(255, 255, 255, 0.58);
`;

const ContactCard = styled.article`
  display: grid;
  gap: 12px;
  padding: 20px 0;
  border-top: 1px solid #dbe0e8;
`;

const ContactName = styled.h3`
  margin: 0;
  color: #18283e;
  font-size: clamp(1.12rem, 1.7vw, 1.38rem);
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.02em;
`;

const ContactRole = styled.p`
  margin: 0;
  color: #4e5d70;
  font-size: 0.94rem;
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
          <div>
            <HeroEyebrow>Service Detail</HeroEyebrow>
            <HeroTitle>{tx(content.title)}</HeroTitle>
          </div>
          <HeroLeadGrid>
            <BodyStack>
              {content.subtitle ? <SubtitleText>{tx(content.subtitle)}</SubtitleText> : null}
              <HeroLead>{tx(content.summary)}</HeroLead>
              <HeroLead>{tx(content.overview)}</HeroLead>
            </BodyStack>
            <ServiceFacts>
              <ServiceFact>
                <ServiceFactValue>{t('업무분야', 'Practice')}</ServiceFactValue>
                <ServiceFactLabel>{t(servicesSubnav.title, servicesSubnav.titleEn)}</ServiceFactLabel>
              </ServiceFact>
              <ServiceFact>
                <ServiceFactValue>
                  {t(
                    serviceLandingGroups.find((group) => group.id === content.groupKey)?.title ?? servicesSubnav.title,
                    serviceLandingGroups.find((group) => group.id === content.groupKey)?.titleEn ?? servicesSubnav.titleEn,
                  )}
                </ServiceFactValue>
                <ServiceFactLabel>{t('중분류 기준의 서비스 체계', 'Service category')}</ServiceFactLabel>
              </ServiceFact>
              <ServiceFact>
                <ServiceFactValue>{t('Detail', 'Detail')}</ServiceFactValue>
                <ServiceFactLabel>{t('세부 업무 범위와 체크포인트', 'Detailed scope and checkpoints')}</ServiceFactLabel>
              </ServiceFact>
            </ServiceFacts>
          </HeroLeadGrid>
        </HeroStatement>
      </EditorialSection>

      {useDocumentLayout ? (
        <>
          {hasDocumentSections ? (
            <EditorialSection $tone="soft">
              <SectionInner data-reveal>
                <SectionHead>
                  <SectionLabel>{t('문서 구성', 'Document Flow')}</SectionLabel>
                  <EditorialTitle>{t('상세 내용', 'Detailed Content')}</EditorialTitle>
                </SectionHead>
                <DocumentStack>
                  {content.contentSections?.map((section, index) => (
                    <DocumentSectionCard key={section.heading}>
                      <ItemCategory>{String(index + 1).padStart(2, '0')}</ItemCategory>
                      <ItemBodyStack>
                        <ItemTitle>{t(section.heading, section.headingEn ?? tx(section.heading))}</ItemTitle>
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
                      </ItemBodyStack>
                    </DocumentSectionCard>
                  ))}
                  {!hasDocumentImages && content.sectionImage ? (
                    <SummaryImage image={content.sectionImage} role="img" aria-hidden="true" />
                  ) : null}
                </DocumentStack>
              </SectionInner>
            </EditorialSection>
          ) : null}

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
        </>
      ) : (
        <>
          <EditorialSection $tone="soft">
            <SectionInner data-reveal>
              <SectionHead>
                <SectionLabel>{t('주요 지원 범위', 'Scope')}</SectionLabel>
                <EditorialTitle>{t('지원 범위', 'Support Scope')}</EditorialTitle>
              </SectionHead>
              <ContentGrid>
                <FeaturedPanel>
                  <FeaturedMeta>Service Scope</FeaturedMeta>
                  <FeaturedTitle>{tx(content.title)}</FeaturedTitle>
                  <FeaturedBody>
                    {t(
                      '현장 운영과 법령 적용을 함께 고려해 업무 범위와 우선순위를 정리합니다.',
                      'We define scope and priorities by aligning field operations with regulatory application.',
                    )}
                  </FeaturedBody>
                  {content.sectionImage ? <SummaryImage image={content.sectionImage} role="img" aria-hidden="true" /> : null}
                </FeaturedPanel>
                <ItemList>
                  {content.scope.map((item, index) => (
                    <Item key={item}>
                      <ItemCategory>{String(index + 1).padStart(2, '0')}</ItemCategory>
                      <ItemBodyStack>
                        <ItemTitle>{tx(item)}</ItemTitle>
                        <ItemBody>
                          {t(
                            '통관 실무와 사후 리스크를 함께 검토해 필요한 대응 범위를 구체화합니다.',
                            'We define the practical response by reviewing customs operations and post-clearance risk together.',
                          )}
                        </ItemBody>
                      </ItemBodyStack>
                    </Item>
                  ))}
                </ItemList>
              </ContentGrid>
            </SectionInner>
          </EditorialSection>

          <EditorialSection>
            <SectionInner data-reveal>
              <SectionHead>
                <SectionLabel>Checklist</SectionLabel>
                <EditorialTitle>{t('절차 / 체크포인트', 'Process / Checkpoints')}</EditorialTitle>
              </SectionHead>
              <ItemList>
                {content.checkpoints.map((point, index) => (
                  <Item key={point}>
                    <ItemCategory>{String(index + 1).padStart(2, '0')}</ItemCategory>
                    <ItemBodyStack>
                      <ItemTitle>{tx(point)}</ItemTitle>
                      <ItemBody>
                        {t(
                          '각 단계별로 필요한 자료와 확인 항목을 정리해 대응합니다.',
                          'We organize required documents and checkpoints for each phase.',
                        )}
                      </ItemBody>
                    </ItemBodyStack>
                  </Item>
                ))}
              </ItemList>
            </SectionInner>
          </EditorialSection>
        </>
      )}

      <EditorialSection $tone="soft">
        <SectionInner data-reveal>
          <SectionHead>
            <SectionLabel>{hasContactPoints ? t('연락처', 'Contact') : t('관련 전문가', 'Related Experts')}</SectionLabel>
            <EditorialTitle>{hasContactPoints ? t('Contact Point', 'Contact Point') : t('전문가 연계', 'Expert Connection')}</EditorialTitle>
          </SectionHead>
          <ContactPanel>
            {hasContactPoints ? (
              <ContactGrid columns={2}>
                {content.contactPoints?.map((contact) => (
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
