import styled from '@emotion/styled';

import { ItSection } from '../../components/home/sections/ItSection';
import { palette } from '../../components/home/homeStyles';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { expertMembers, itOverview } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const EditorialSection = styled.section<{ $tone?: 'soft' }>`
  font-family: "NanumSquare", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  padding: clamp(72px, 8vw, 118px) 0 clamp(34px, 5vw, 64px);
  background: ${({ $tone }) => ($tone === 'soft' ? '#f6f7f9' : '#ffffff')};
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 52px);
  max-width: 1280px;
`;

const HeroEyebrow = styled.span`
  display: block;
  margin-left: clamp(4px, 0.5vw, 8px);
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.92rem, 3.7vw, 3.72rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;
  word-break: keep-all;

  @media (max-width: 640px) {
    font-size: clamp(2.08rem, 12vw, 3.18rem);
    letter-spacing: -0.035em;
  }
`;

const IntroStack = styled.div`
  display: grid;
  gap: clamp(24px, 3.6vw, 44px);
`;

const IntroHeading = styled.div`
  display: grid;
  gap: clamp(10px, 1.4vw, 16px);
  justify-items: start;
  min-width: 0;
`;

const OneLineSummary = styled.p`
  max-width: 1240px;
  margin: 0;
  color: #1f2937;
  font-size: clamp(1.14rem, 1.58vw, 1.68rem);
  font-weight: 700;
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
  border-top: 2px solid ${palette.blue};
  border-bottom: 1px solid #d8dee8;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const OverviewTitle = styled.h2`
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.12rem, 1.6vw, 1.34rem);
  font-weight: 700;
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
  gap: clamp(32px, 4vw, 50px);
  max-width: 1320px;
`;

const SectionHead = styled.div`
  display: grid;
  gap: 10px;
`;

const SectionLabel = styled.span`
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const EditorialTitle = styled.h2`
  max-width: 960px;
  margin: 0;
  color: #172337;
  font-size: 3.02rem;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: 0;
  text-wrap: balance;

  @media (max-width: 980px) {
    font-size: 2.38rem;
  }

  @media (max-width: 640px) {
    font-size: 1.86rem;
  }
`;

const ContactPanel = styled.article`
  display: grid;
  gap: clamp(18px, 3vw, 28px);
  border-top: 2px solid ${palette.blue};
  padding-top: clamp(22px, 3vw, 32px);
`;

const ContactProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(360px, 530px));
  justify-content: center;
  gap: clamp(20px, 2.5vw, 34px);
  width: min(100%, 1120px);
  margin: 0 auto;

  @media (max-width: 980px) {
    grid-template-columns: minmax(0, 530px);
  }
`;

const ContactProfileCard = styled.article<{ $accent: string }>`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(142px, 11.5vw, 184px);
  min-height: 238px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(26, 55, 91, 0.14);
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow:
    0 16px 38px rgba(13, 35, 66, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.92) inset;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    border-color: #123f85;
    box-shadow:
      0 24px 56px rgba(13, 35, 66, 0.12),
      0 1px 0 rgba(255, 255, 255, 0.96) inset;
    outline: none;
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) 100px;
    min-height: 184px;
  }
`;

const ContactProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(20px, 2.4vw, 30px);

  @media (max-width: 560px) {
    padding: 16px;
  }
`;

const ContactTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
`;

const ContactName = styled.h3`
  flex: 0 0 auto;
  margin: 0;
  color: #121c2b;
  font-size: clamp(1.48rem, 2.05vw, 1.95rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0;

  @media (max-width: 560px) {
    font-size: 1.3rem;
  }
`;

const ContactNameDivider = styled.span`
  flex: 0 0 auto;
  width: 2px;
  height: 34px;
  margin-top: 2px;
  background: linear-gradient(180deg, #102a55, #1d5fb6);
  opacity: 0.9;

  @media (max-width: 560px) {
    height: 28px;
  }
`;

const ContactRoleStack = styled.div`
  display: grid;
  gap: 3px;
  min-width: 0;
`;

const ContactRole = styled.p`
  margin: 0;
  color: #0c4e96;
  font-size: 0.94rem;
  font-weight: 850;
  line-height: 1.38;

  @media (max-width: 560px) {
    font-size: 0.86rem;
  }
`;

const ContactDepartment = styled.p`
  margin: 0;
  color: #6a7482;
  font-size: 0.9rem;
  font-weight: 650;
  line-height: 1.45;

  @media (max-width: 560px) {
    font-size: 0.82rem;
  }
`;

const ContactMeta = styled.div`
  display: grid;
  gap: 7px;
  margin-top: auto;
  padding-top: 18px;

  @media (max-width: 560px) {
    gap: 6px;
    padding-top: 14px;
  }
`;

const ContactMetaItem = styled.p`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  color: #526174;
  font-size: 0.9rem;
  font-weight: 650;
  line-height: 1.45;
  word-break: keep-all;
  overflow-wrap: normal;

  @media (max-width: 560px) {
    font-size: 0.82rem;
  }
`;

const ContactLabel = styled.span`
  flex: 0 0 44px;
  color: #0c4e96;
  font-weight: 900;
`;

const ContactValue = styled.a`
  color: inherit;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover,
  &:focus-visible {
    color: #1c5aa7;
    text-decoration: underline;
    text-underline-offset: 3px;
    outline: none;
  }
`;

const ContactPhotoPanel = styled.div<{ $accent: string }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
  border-left: 1px solid rgba(26, 55, 91, 0.14);
  background:
    radial-gradient(circle at 74% 8%, rgba(28, 90, 167, 0.12), transparent 38%),
    linear-gradient(145deg, #ffffff 0%, #f3f7fc 48%, #eaf1f8 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 12px 10px;
    z-index: 1;
    border-radius: 12px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.28)),
      rgba(255, 255, 255, 0.38);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.92),
      inset 0 0 0 1px rgba(255, 255, 255, 0.58);
  }
`;

const ContactPortraitFrame = styled.div`
  position: absolute;
  inset: 15px 13px;
  z-index: 2;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(26, 55, 91, 0.08);
  background: #ffffff;
  box-shadow:
    0 18px 32px rgba(13, 35, 66, 0.09),
    0 2px 8px rgba(13, 35, 66, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);

  @media (max-width: 560px) {
    inset: 10px 8px;
    border-radius: 8px;
  }
`;

const ContactPortrait = styled.img<{ $fit?: 'contain' | 'cover'; $position?: string }>`
  display: block;
  width: 100%;
  height: 100%;
  background: #ffffff;
  object-fit: ${({ $fit }) => $fit ?? 'cover'};
  object-position: ${({ $position }) => $position ?? '50% 18%'};
  filter: saturate(1.01) contrast(1.02);
`;

const ContactInitialMark = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  margin-bottom: 28px;
  border-radius: 50%;
  background: #0c4e96;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 900;
`;

const itContactNames = ['홍성훈', '서인석'];

export function ItPage() {
  const { t, tx } = useI18n();
  const itSubnav = sectionSubnav.it;
  const contactProfiles = itContactNames.map((name) => expertMembers.find((member) => member.name === name)).filter(Boolean);

  return (
    <>
      <EditorialPageHeader config={itSubnav} heroImage="/hero/menu-it-ai.png" heroPosition="center 50%" />

      <EditorialSection>
        <HeroStatement data-reveal>
          <IntroStack>
            <IntroHeading>
              <HeroEyebrow>IT Service</HeroEyebrow>
              <HeroTitle>{t(itOverview.title, itOverview.titleEn)}</HeroTitle>
            </IntroHeading>
            <OneLineSummary>{t(itOverview.summary, itOverview.summaryEn)}</OneLineSummary>
            <OverviewBlock>
              <OverviewTitle>{t('개요', 'Overview')}</OverviewTitle>
              <OverviewText>{t(itOverview.body, itOverview.bodyEn)}</OverviewText>
            </OverviewBlock>
          </IntroStack>
        </HeroStatement>
      </EditorialSection>

      <ItSection />

      <EditorialSection>
        <SectionInner data-reveal>
          <SectionHead>
            <SectionLabel>Contact Point</SectionLabel>
            <EditorialTitle>{t('담당자', 'Contact Point')}</EditorialTitle>
          </SectionHead>
          <ContactPanel>
            <ContactProfileGrid>
              {contactProfiles.map((member) => {
                const accent = member?.accent ?? '#1d5fb6';

                return (
                  <ContactProfileCard key={member?.name} $accent={accent}>
                    <ContactProfileBody>
                      <ContactTitleRow>
                        <ContactName>{tx(member?.name ?? '')}</ContactName>
                        <ContactNameDivider aria-hidden="true" />
                        <ContactRoleStack>
                          {member?.title ? <ContactRole>{tx(member.title)}</ContactRole> : null}
                          {member?.department ? <ContactDepartment>{tx(member.department)}</ContactDepartment> : null}
                        </ContactRoleStack>
                      </ContactTitleRow>
                      <ContactMeta>
                        {member?.phone ? (
                          <ContactMetaItem>
                            <ContactLabel>{t('전화', 'Phone')}</ContactLabel>
                            <ContactValue href={`tel:${member.phone.replace(/[^+\d]/g, '')}`}>{member.phone}</ContactValue>
                          </ContactMetaItem>
                        ) : null}
                        {member?.email ? (
                          <ContactMetaItem>
                            <ContactLabel>{t('이메일', 'Email')}</ContactLabel>
                            <ContactValue href={`mailto:${member.email}`}>{member.email}</ContactValue>
                          </ContactMetaItem>
                        ) : null}
                      </ContactMeta>
                    </ContactProfileBody>
                    <ContactPhotoPanel $accent={accent}>
                      {member?.image ? (
                        <ContactPortraitFrame>
                          <ContactPortrait
                            src={member.image}
                            alt={tx(member.name)}
                            loading="lazy"
                            $fit={member.imageFit}
                            $position={member.imagePosition}
                          />
                        </ContactPortraitFrame>
                      ) : (
                        <ContactInitialMark>{tx(member?.name ?? '').slice(0, 1)}</ContactInitialMark>
                      )}
                    </ContactPhotoPanel>
                  </ContactProfileCard>
                );
              })}
            </ContactProfileGrid>
          </ContactPanel>
        </SectionInner>
      </EditorialSection>
    </>
  );
}
