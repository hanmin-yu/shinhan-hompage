import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useI18n } from '../../i18n/useI18n';

const shinhanNavy = '#123f85';

const MessageHero = styled(P.HeroSection)`
  margin-top: 0;
  min-height: auto;
  padding-top: 0;
  padding-bottom: 0;
  background: transparent;

  &::before,
  &::after {
    display: none;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding-bottom: 0;
  }
`;

const EditorialSection = styled.section`
  padding: clamp(86px, 9vw, 138px) 0 clamp(96px, 11vw, 164px);
  border-top: 1px solid #dbe7f6;
  background:
    linear-gradient(180deg, rgba(245, 249, 255, 0.84) 0%, rgba(255, 255, 255, 0) 310px),
    #ffffff;
`;

const MessageLayout = styled(P.PageContainer)`
  display: grid;
  grid-template-columns: minmax(0, 0.56fr) minmax(340px, 0.44fr);
  gap: clamp(38px, 5.4vw, 92px);
  align-items: center;
  max-width: 1420px;

  & + & {
    margin-top: clamp(70px, 8vw, 112px);
    padding-top: clamp(70px, 8vw, 112px);
    border-top: 1px solid #dce7f6;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const CeoFigure = styled.figure<{ $reverse?: boolean }>`
  width: 100%;
  margin: 0;
  justify-self: ${({ $reverse }) => ($reverse ? 'start' : 'end')};
  position: relative;
  z-index: 0;
  order: ${({ $reverse }) => ($reverse ? 1 : 2)};
  padding: clamp(12px, 1.6vw, 22px);
  background: linear-gradient(135deg, rgba(0, 88, 168, 0.08), rgba(18, 63, 133, 0.18));
  box-shadow: 0 24px 60px rgba(23, 45, 78, 0.12);

  @media (max-width: 980px) {
    order: 2;
    justify-self: stretch;
  }
`;

const CeoImage = styled.img<{ $position?: string }>`
  display: block;
  width: 100%;
  aspect-ratio: 1.24 / 1;
  object-fit: cover;
  object-position: ${({ $position }) => $position ?? 'center'};
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
`;

const MessageArticle = styled.article<{ $reverse?: boolean }>`
  display: grid;
  gap: clamp(28px, 3.6vw, 46px);
  order: ${({ $reverse }) => ($reverse ? 2 : 1)};

  @media (max-width: 980px) {
    order: 1;
  }
`;

const MessageHeader = styled.div`
  display: grid;
  gap: 16px;
`;

const MessageTitle = styled.h2`
  position: relative;
  max-width: 760px;
  margin: 0;
  padding-bottom: 24px;
  color: #172337;
  font-size: 3.32rem;
  font-weight: 850;
  line-height: 1.08;
  letter-spacing: 0;
  text-wrap: balance;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: clamp(96px, 12vw, 156px);
    height: 3px;
    background: linear-gradient(90deg, #0058a8 0%, rgba(0, 88, 168, 0.16) 100%);
  }

  @media (max-width: 980px) {
    font-size: 2.72rem;
  }

  @media (max-width: 640px) {
    font-size: 2.08rem;
  }
`;

const TitleBreak = styled.span`
  display: block;
`;

const BodyStack = styled.div`
  display: grid;
  gap: clamp(18px, 2.2vw, 26px);
`;

const MessageBody = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: 1.1rem;
  line-height: 1.84;
  word-break: keep-all;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const LeadBody = styled(MessageBody)`
  color: #172337;
  font-size: 1.28rem;
  font-weight: 800;
  line-height: 1.68;

  @media (max-width: 640px) {
    font-size: 1.12rem;
  }
`;

const Closing = styled.div`
  padding-top: clamp(24px, 4vw, 44px);
  border-top: 1px solid #d5e0ef;
`;

const Thanks = styled.p`
  margin: 0;
  color: #172337;
  font-size: 2.02rem;
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: 0;

  @media (max-width: 640px) {
    font-size: 1.52rem;
  }
`;

const LegacyBand = styled(P.PageContainer)`
  max-width: 1320px;
`;

const LegacyStatement = styled.div`
  position: relative;
  margin-top: clamp(76px, 8vw, 122px);
  padding: clamp(72px, 8vw, 112px) 0 0;
  border-top: 1px solid rgba(15, 43, 89, 0.08);
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -52px;
    width: 1px;
    height: 52px;
    background: linear-gradient(180deg, transparent, rgba(0, 88, 168, 0.28));
  }
`;

const LegacyText = styled.p`
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 16px;
  margin: 0;
  padding-bottom: 28px;
  color: #172337;
  line-height: 1.08;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: clamp(92px, 11vw, 170px);
    height: 2px;
    background: ${shinhanNavy};
    transform: translateX(-50%);
  }
`;

const LegacyMark = styled.img`
  width: clamp(42px, 4.4vw, 62px);
  height: auto;
  align-self: center;
`;

const LegacyEstablished = styled.span`
  color: ${shinhanNavy};
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.04rem;
  font-style: italic;
  font-weight: 700;

  @media (max-width: 640px) {
    font-size: 0.92rem;
  }
`;

const LegacyName = styled.span`
  color: ${shinhanNavy};
  font-family: 'Times New Roman', Times, serif;
  font-size: 2.72rem;
  font-weight: 700;
  letter-spacing: 0;

  @media (max-width: 980px) {
    font-size: 2.12rem;
  }

  @media (max-width: 640px) {
    font-size: 1.42rem;
  }
`;

export function MessagePage() {
  const { t } = useI18n();
  const { content } = useSiteContent();
  const aboutSubnav = content.global.sectionSubnav.about;
  const messageCopy = content.about.copy.message;

  return (
    <>
      <MessageHero>
        <P.PageContainer>
          <LandingSubnav
            kicker={aboutSubnav.kicker}
            kickerEn={aboutSubnav.kickerEn}
            title={aboutSubnav.title}
            titleEn={aboutSubnav.titleEn}
            items={aboutSubnav.items}
            matchAboutHero
          />
        </P.PageContainer>
      </MessageHero>

      <EditorialSection>
        <MessageLayout data-reveal>
          <MessageArticle>
            <MessageHeader>
              <MessageTitle>
                {t(messageCopy.leadTitleTop, messageCopy.leadTitleTopEn)}
                <TitleBreak>{t(messageCopy.leadTitleBottom, messageCopy.leadTitleBottomEn)}</TitleBreak>
              </MessageTitle>
            </MessageHeader>

            <BodyStack>
              <LeadBody>{t(messageCopy.leadHeading, messageCopy.leadHeadingEn)}</LeadBody>
              {messageCopy.introParagraphs.map((paragraph, index) => (
                <MessageBody key={paragraph}>{t(paragraph, messageCopy.introParagraphsEn[index] ?? paragraph)}</MessageBody>
              ))}
            </BodyStack>
          </MessageArticle>

          <CeoFigure>
            <CeoImage src="/subpages/message-ceo-quote.jpg" alt="" aria-hidden="true" $position="center" />
          </CeoFigure>
        </MessageLayout>

        <MessageLayout data-reveal>
          <MessageArticle $reverse>
            <MessageHeader>
              <MessageTitle>{t(messageCopy.secondTitle, messageCopy.secondTitleEn)}</MessageTitle>
            </MessageHeader>

            <BodyStack>
              {messageCopy.secondParagraphs.map((paragraph, index) => (
                <MessageBody key={paragraph}>{t(paragraph, messageCopy.secondParagraphsEn[index] ?? paragraph)}</MessageBody>
              ))}
            </BodyStack>

            <Closing>
              <Thanks>{t(messageCopy.thanks, messageCopy.thanksEn)}</Thanks>
            </Closing>
          </MessageArticle>

          <CeoFigure $reverse>
            <CeoImage src="/subpages/message-ceo.jpg" alt="" aria-hidden="true" $position="center 45%" />
          </CeoFigure>
        </MessageLayout>

        <LegacyBand data-reveal>
          <LegacyStatement>
            <LegacyText>
              <LegacyMark src="/brand-mark-shinhan-navy.png" alt="" aria-hidden="true" />
              <LegacyEstablished>Established 1965</LegacyEstablished>
              <LegacyName>SHINHAN Customs Service Inc.</LegacyName>
            </LegacyText>
          </LegacyStatement>
        </LegacyBand>
      </EditorialSection>
    </>
  );
}
