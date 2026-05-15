import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
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
  const aboutSubnav = sectionSubnav.about;

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
                {t('60년의 신뢰를 넘어,', 'Beyond 60 Years of Trust,')}
                <TitleBreak>
                  {t('100년의 가치를 완성하는 파트너십', 'a Partnership Completing 100 Years of Value')}
                </TitleBreak>
              </MessageTitle>
            </MessageHeader>

            <BodyStack>
              <LeadBody>
                {t(
                  '세 명의 신념으로 시작된 신한의 약속',
                  'Shinhan’s Promise Began with the Conviction of Three People',
                )}
              </LeadBody>
              <MessageBody>
                {t(
                  "1965년 3월 22일, 단 세 명의 구성원으로 시작한 신한관세법인의 전신 '서울통관사'는 지난 60년간 대한민국 경제 및 무역 발전과 더불어 꾸준히 성장해 왔습니다.",
                  "On March 22, 1965, Seoul Customs Service, the predecessor of Shinhan Customs Service, began with just three members and has grown steadily alongside Korea's economic and trade development over the past 60 years.",
                )}
              </MessageBody>
              <MessageBody>
                {t(
                  '척박했던 환경에서 시작된 고객을 향한 진심 어린 약속은 오늘날 전국 7개 주요 거점 지사와 보세창고 기반의 3PL 물류 시스템, 그리고 미국 로스앤젤레스와 베트남 하노이를 잇는 글로벌 네트워크까지 다양한 서비스를 제공하고 있습니다.',
                  'A sincere promise to clients that began in challenging conditions has grown into a broad service network today, including seven key branch offices across Korea, a bonded-warehouse-based 3PL logistics system, and global connections spanning Los Angeles and Hanoi.',
                )}
              </MessageBody>
            </BodyStack>
          </MessageArticle>

          <CeoFigure>
            <CeoImage src="/subpages/message-ceo-quote.jpg" alt="" aria-hidden="true" $position="center" />
          </CeoFigure>
        </MessageLayout>

        <MessageLayout data-reveal>
          <MessageArticle $reverse>
            <MessageHeader>
              <MessageTitle>
                {t(
                  '고객의 성공과 함께하는 글로벌 무역의 동반자',
                  'A Global Trade Partner Growing with Our Clients’ Success',
                )}
              </MessageTitle>
            </MessageHeader>

            <BodyStack>
              <MessageBody>
                {t(
                  '신한관세법인은 신속하고 정확한 통관 서비스를 넘어, 급변하는 글로벌 통상 환경 속에서 고객이 직면한 복합적인 과제에 최적의 해법을 제시합니다.',
                  'Beyond fast and accurate customs clearance, Shinhan Customs Service provides optimal solutions for the complex challenges clients face in a rapidly changing global trade environment.',
                )}
              </MessageBody>
              <MessageBody>
                {t(
                  '우리는 관세 조사 및 외환 검사 대응, 조세 불복 대리와 같은 전략적 리스크 관리는 물론, AEO 인증, FTA 활용 전략, 관세 환급 및 수출입 요건 컨설팅에 이르기까지 비즈니스 전 과정의 전문성을 심화하고 있습니다.',
                  'We continue to deepen our expertise across the entire business process, from strategic risk management such as customs audit and foreign exchange inspection response and tax appeal representation to AEO certification, FTA utilization strategy, customs refunds, and import/export requirements consulting.',
                )}
              </MessageBody>
              <MessageBody>
                {t(
                  '이를 통해 고객사가 글로벌 시장에서 압도적인 경쟁력을 확보하고 비즈니스 가치를 극대화할 수 있도록 전력을 다합니다.',
                  'Through this, we devote ourselves to helping our clients secure strong competitiveness in the global market and maximize business value.',
                )}
              </MessageBody>
              <MessageBody>
                {t(
                  '우리는 과거의 성과에 안주하지 않습니다. 신한관세법인의 모든 임직원은 ‘고객의 성공이 곧 우리의 성공’이라는 철학을 공유하며, 60년의 신뢰를 바탕으로 100년의 역사를 완성하기 위해 멈추지 않고 정진하겠습니다.',
                  'We do not rest on past achievements. Every member of Shinhan Customs Service shares the philosophy that our clients’ success is our success, and we will continue moving forward to complete a 100-year history built on 60 years of trust.',
                )}
              </MessageBody>
              <MessageBody>
                {t(
                  '지금까지 신한과 함께해주신 고객사와 협력사 여러분께 깊은 감사를 표하며, 앞으로도 진실하고 품격 있는 최고의 서비스로 귀사의 든든한 무역 전진기지가 될 것을 약속드립니다.',
                  'We express our deep gratitude to the clients and partners who have been with Shinhan, and we promise to remain your dependable trade base with sincere, refined, and outstanding service.',
                )}
              </MessageBody>
            </BodyStack>

            <Closing>
              <Thanks>{t('감사합니다.', 'Thank you.')}</Thanks>
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
