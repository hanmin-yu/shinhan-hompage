import styled from '@emotion/styled';

import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { ServiceDetailSubnav } from '../../components/site/ServiceDetailSubnav';
import { sectionSubnav } from '../../config/sectionSubnav';
import { expertMembers } from '../../data/home';
import { serviceDetailPages, serviceLandingGroups } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

type ServiceDetailPageProps = {
  path: string;
};

const EditorialSection = styled.section<{ $tone?: 'soft' }>`
  font-family: "NanumSquare", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  padding: clamp(72px, 8vw, 118px) 0;
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
  max-width: 1240px;
  margin: 0;
  color: #1f2937;
  font-size: clamp(1.32rem, 1.86vw, 1.96rem);
  font-weight: 800;
  line-height: 1.36;
  letter-spacing: -0.016em;
  line-break: strict;
  overflow-wrap: break-word;
  text-wrap: pretty;
  white-space: pre-line;
  word-break: keep-all;

  @supports not (text-wrap: pretty) {
    text-wrap: balance;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    font-size: clamp(1.28rem, 7vw, 1.68rem);
    letter-spacing: -0.018em;
    line-height: 1.45;
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

const ContactPanel = styled.article`
  display: grid;
  gap: clamp(18px, 3vw, 28px);
  border-top: 2px solid #1d5fb6;
  padding-top: clamp(22px, 3vw, 32px);
  background: transparent;
`;

const ContactProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 2.4vw, 24px);

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const ContactProfileCard = styled.article<{ $accent: string }>`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(112px, 10vw, 150px);
  min-height: 214px;
  overflow: hidden;
  border: 1px solid rgba(29, 95, 182, 0.14);
  border-top: 3px solid ${({ $accent }) => $accent};
  background:
    linear-gradient(135deg, rgba(29, 95, 182, 0.08), rgba(255, 255, 255, 0) 45%),
    #ffffff;
  box-shadow: 0 20px 45px rgba(15, 38, 76, 0.08);

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const ContactProfileBody = styled.div`
  display: grid;
  align-content: space-between;
  gap: 24px;
  padding: clamp(22px, 3vw, 30px);
`;

const ContactName = styled.h3`
  margin: 0;
  color: #111827;
  font-size: clamp(1.3rem, 2vw, 1.66rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const ContactRole = styled.p`
  margin: 8px 0 0;
  color: #174d9a;
  font-size: 0.98rem;
  font-weight: 800;
  line-height: 1.52;
`;

const ContactDepartment = styled.p`
  margin: 10px 0 0;
  color: #52647c;
  font-size: 0.94rem;
  font-weight: 700;
  line-height: 1.56;
`;

const ContactPractice = styled.p`
  margin: 12px 0 0;
  color: #475569;
  font-size: 0.98rem;
  line-height: 1.68;
`;

const ContactMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
`;

const ContactLabel = styled.span`
  color: #7890ad;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.1em;
`;

const ContactValue = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(29, 95, 182, 0.14);
  background: rgba(29, 95, 182, 0.05);
  color: #174d9a;
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.35;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    border-color: rgba(29, 95, 182, 0.3);
    background: rgba(29, 95, 182, 0.09);
  }
`;

const ContactPhotoPanel = styled.div<{ $accent: string }>`
  position: relative;
  min-height: 100%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0)),
    ${({ $accent }) => $accent};

  @media (max-width: 540px) {
    min-height: 210px;
  }
`;

const ContactPortrait = styled.img<{ $fit?: 'contain' | 'cover'; $position?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit ?? 'cover'};
  object-position: ${({ $position }) => $position ?? '50% 18%'};
`;

const ContactInitialMark = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.04em;
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
  object-fit: contain;
  background: #ffffff;
`;

function splitDiagramItem(item: string) {
  if (item.includes('->')) {
    const [term, description] = item.split('->').map((part) => part.trim());
    return { term, description };
  }

  const separatorIndex = item.indexOf(':');
  if (separatorIndex >= 0) {
    return {
      term: item.slice(0, separatorIndex).trim(),
      description: item.slice(separatorIndex + 1).trim(),
    };
  }

  const [term, description] = [item, ''];
  return { term, description };
}

function isDiagramList(items: string[]) {
  return items.every((item) => item.includes('->') || item.includes(':'));
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
  const contactProfiles = contactPoints.map((contact) => ({
    contact,
    member: expertMembers.find((member) => member.name === contact.name),
  }));

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
                    isDiagramList(section.list) ? (
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
              <ContactProfileGrid>
                {contactProfiles.map(({ contact, member }) => {
                  const phone = contact.phone ?? member?.phone;
                  const email = contact.email ?? member?.email;
                  const role = contact.role ?? member?.title;
                  const accent = member?.accent ?? '#1d5fb6';

                  return (
                    <ContactProfileCard key={`${contact.name}-${phone ?? ''}-${email ?? ''}`} $accent={accent}>
                      <ContactProfileBody>
                        <div>
                          <ContactName>{tx(contact.name)}</ContactName>
                          {role ? <ContactRole>{tx(role)}</ContactRole> : null}
                          {member?.department ? <ContactDepartment>{tx(member.department)}</ContactDepartment> : null}
                          {member?.practice ? <ContactPractice>{tx(member.practice)}</ContactPractice> : null}
                        </div>
                        <ContactMeta>
                          {phone ? (
                            <ContactValue href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
                              <ContactLabel>{t('전화', 'Phone')}</ContactLabel>
                              {phone}
                            </ContactValue>
                          ) : null}
                          {email ? (
                            <ContactValue href={`mailto:${email}`}>
                              <ContactLabel>{t('이메일', 'Email')}</ContactLabel>
                              {email}
                            </ContactValue>
                          ) : null}
                        </ContactMeta>
                      </ContactProfileBody>
                      <ContactPhotoPanel $accent={accent}>
                        {member?.image ? (
                          <ContactPortrait
                            src={member.image}
                            alt={tx(contact.name)}
                            loading="lazy"
                            $fit={member.imageFit}
                            $position={member.imagePosition}
                          />
                        ) : (
                          <ContactInitialMark>{tx(contact.name).slice(0, 1)}</ContactInitialMark>
                        )}
                      </ContactPhotoPanel>
                    </ContactProfileCard>
                  );
                })}
              </ContactProfileGrid>
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
