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
  padding: clamp(72px, 8vw, 118px) 0;
  background: ${({ $tone }) => ($tone === 'soft' ? '#f6f7f9' : '#ffffff')};
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 52px);
  max-width: 1280px;
`;

const HeroEyebrow = styled.span`
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.2em;
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
  letter-spacing: 0;
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
  background:
    linear-gradient(135deg, rgba(29, 95, 182, 0.08), rgba(255, 255, 255, 0) 45%),
    #ffffff;
  box-shadow: 0 20px 45px rgba(15, 38, 76, 0.08);
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #123f85;
    box-shadow: 0 24px 56px rgba(13, 35, 66, 0.12);
  }

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
  font-size: 1.62rem;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0;

  @media (max-width: 640px) {
    font-size: 1.36rem;
  }
`;

const ContactRole = styled.p`
  margin: 8px 0 0;
  color: ${palette.blue};
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
  word-break: keep-all;
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
  letter-spacing: 0;
`;

const ContactValue = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(18, 63, 133, 0.14);
  background: rgba(18, 63, 133, 0.05);
  color: ${palette.blue};
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
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: 0;
`;

const itContactNames = ['최대규', '홍성훈'];

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
            <div>
              <HeroEyebrow>IT Service</HeroEyebrow>
              <HeroTitle>{t(itOverview.title, itOverview.titleEn)}</HeroTitle>
            </div>
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
            <SectionLabel>Contact</SectionLabel>
            <EditorialTitle>{t('담당자', 'Contact')}</EditorialTitle>
          </SectionHead>
          <ContactPanel>
            <ContactProfileGrid>
              {contactProfiles.map((member) => {
                const accent = member?.accent ?? '#1d5fb6';

                return (
                  <ContactProfileCard key={member?.name} $accent={accent}>
                    <ContactProfileBody>
                      <div>
                        <ContactName>{tx(member?.name ?? '')}</ContactName>
                        {member?.title ? <ContactRole>{tx(member.title)}</ContactRole> : null}
                        {member?.department ? <ContactDepartment>{tx(member.department)}</ContactDepartment> : null}
                        {member?.practice ? <ContactPractice>{tx(member.practice)}</ContactPractice> : null}
                      </div>
                      <ContactMeta>
                        {member?.phone ? (
                          <ContactValue href={`tel:${member.phone.replace(/[^+\d]/g, '')}`}>
                            <ContactLabel>{t('전화', 'Phone')}</ContactLabel>
                            {member.phone}
                          </ContactValue>
                        ) : null}
                        {member?.email ? (
                          <ContactValue href={`mailto:${member.email}`}>
                            <ContactLabel>{t('이메일', 'Email')}</ContactLabel>
                            {member.email}
                          </ContactValue>
                        ) : null}
                      </ContactMeta>
                    </ContactProfileBody>
                    <ContactPhotoPanel $accent={accent}>
                      {member?.image ? (
                        <ContactPortrait
                          src={member.image}
                          alt={tx(member.name)}
                          loading="lazy"
                          $fit={member.imageFit}
                          $position={member.imagePosition}
                        />
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
