import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const ANCHOR_IDS = [
  'practice-import-export',
  'practice-quarantine',
  'practice-fta',
  'practice-aeo',
  'practice-investigation',
  'practice-acva',
  'practice-tax',
  'practice-refund',
  'practice-consulting',
  'practice-logistics',
  'practice-vietnam',
  'practice-fda',
  'practice-it',
  'it',
];

const practiceCards = [
  {
    id: 'practice-import-export',
    title: '수출입통관',
    meta: 'CLEARANCE',
    body: '60년 이상의 축적된 통관 경험과 전문 인력을 기반으로 신속하고 정확한 수출입 통관 서비스를 제공합니다.',
    href: '/services/import-export',
    titleEn: 'Import & Export Clearance',
    metaEn: 'CLEARANCE',
    bodyEn:
      'Based on over 60 years of accumulated clearance experience and specialized professionals, we provide fast and accurate import/export clearance services.',
  },
  {
    id: 'practice-quarantine',
    title: '검역·요건',
    meta: 'REQUIREMENTS',
    body: '검역, 인증, 인허가, 표시사항까지 함께 검토해 수입 단계의 지연과 보완 리스크를 줄입니다.',
    href: '/services/quarantine',
    titleEn: 'Quarantine & Requirements',
    metaEn: 'REQUIREMENTS',
    bodyEn:
      'With dedicated quarantine/requirements specialists, we conduct detailed HS code-based reviews to ensure legal stability.',
  },
  {
    id: 'practice-fta',
    title: 'FTA',
    meta: 'FTA',
    body: 'FTA 전담팀 운영을 통해 적법한 FTA 적용 및 사후검증 대응을 지원하여 기업의 FTA 활용을 극대화합니다.',
    href: '/services/consulting/fta',
    titleEn: 'FTA',
    metaEn: 'FTA',
    bodyEn:
      'Through our dedicated FTA team, we support compliant FTA application and post-verification response to maximize corporate FTA utilization.',
  },
  {
    id: 'practice-aeo',
    title: 'AEO',
    meta: 'COMPLIANCE',
    body: '풍부한 부문별 AEO공인 및 사후관리 경험을 바탕으로 신속한 공인 획득과 체계적인 사후관리 서비스를 제공합니다.',
    href: '/services/consulting/aeo',
    titleEn: 'AEO',
    metaEn: 'COMPLIANCE',
    bodyEn:
      'Based on extensive experience in AEO certification by sector and follow-up management, we provide rapid certification and structured post-management services.',
  },
  {
    id: 'practice-investigation',
    title: '관세조사',
    meta: 'AUDIT RESPONSE',
    body: '사전 리스크 진단부터 세관 대응까지 관세조사 전 과정을 지원하여 기업의 리스크를 최소화합니다.',
    href: '/services/consulting/customs-audit',
    titleEn: 'Customs Audit',
    metaEn: 'AUDIT RESPONSE',
    bodyEn:
      'From pre-risk diagnosis to customs authority response, we support the full customs audit lifecycle to minimize corporate risk.',
  },
  {
    id: 'practice-foreign-exchange',
    title: '외환검사.조사',
    meta: 'FOREIGN EXCHANGE',
    body: '외환거래 전반에 대한 사전 진단과 법령 검토를 통해 리스크를 예방하고 신고 및 사후 대응을 지원합니다.',
    href: '/services/consulting/foreign-exchange',
    titleEn: 'Foreign Exchange Inspection & Investigation',
    metaEn: 'FOREIGN EXCHANGE',
    bodyEn:
      'We provide pre-diagnosis and legal review across foreign exchange transactions to prevent risk and support reporting and post-response.',
  },
];

const Section = styled.section`
  position: relative;
  padding: 118px 0 88px;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 12%, rgba(255, 255, 255, 0.16), transparent 24%),
    radial-gradient(circle at 86% 18%, rgba(23, 159, 150, 0.22), transparent 20%),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.035) 0,
      rgba(255, 255, 255, 0.035) 1px,
      transparent 1px,
      transparent 140px
    ),
    linear-gradient(180deg, #0b2b59 0%, #123f85 22%, #1c5aa4 38%, #e8f2ff 72%, #f8fbff 100%);
  border-top: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &::before {
    inset: 0;
    background:
      linear-gradient(
        115deg,
        transparent 0%,
        rgba(255, 255, 255, 0.28) calc(18% + (var(--scroll-progress) * 24%)),
        transparent calc(32% + (var(--scroll-progress) * 24%))
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.04) 0,
        rgba(255, 255, 255, 0.04) 1px,
        transparent 1px,
        transparent 118px
      );
    opacity: 0.52;
    transform: translate3d(calc((var(--viewport-progress) - 0.5) * 80px), 0, 0);
  }

  &::after {
    right: -150px;
    top: 18%;
    width: min(44vw, 560px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(23, 159, 150, 0.2), rgba(33, 101, 193, 0.14) 48%, transparent 72%);
    transform: translate3d(0, calc(var(--viewport-progress) * -110px), 0);
    animation: glowPulse 9s ease-in-out infinite;
  }
`;

const Inner = styled(S.Container)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 38px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: end;
  gap: 16px;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: rgba(235, 246, 255, 0.94);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.72), rgba(23, 159, 150, 0.58));
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #ffffff;
  font-size: clamp(2.42rem, 4.4vw, 3.62rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.03em;
  text-shadow: 0 16px 38px rgba(3, 15, 34, 0.34);
`;

const Summary = styled.p`
  margin: 0;
  max-width: 720px;
  color: rgba(235, 246, 255, 0.86);
  font-size: 0.97rem;
  line-height: 1.72;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 248px;
  padding: 22px 22px 20px;
  border-radius: 8px;
  border: 1px solid rgba(225, 238, 255, 0.32);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(231, 243, 255, 0.88) 62%, rgba(211, 235, 248, 0.82) 100%);
  box-shadow: 0 18px 36px rgba(3, 15, 34, 0.18);
  backdrop-filter: blur(10px);
  position: relative;
  transition:
    transform 0.28s cubic-bezier(0.18, 0.9, 0.28, 1),
    border-color 0.28s ease,
    box-shadow 0.28s ease,
    filter 0.28s ease;
  text-decoration: none;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(35, 79, 134, 0.18);
    transition: background 0.2s ease;
  }

  &::before {
    left: 22px;
    top: 18px;
    width: 36px;
    height: 1px;
  }

  &::after {
    right: 22px;
    bottom: 18px;
    width: 34px;
    height: 1px;
  }

  &:hover {
    transform: translateY(-12px) scale(1.025);
    border-color: rgba(23, 159, 150, 0.26);
    box-shadow: 0 28px 48px rgba(17, 40, 74, 0.16);
    filter: saturate(1.08);

    &::before,
    &::after {
      background: linear-gradient(90deg, rgba(33, 101, 193, 0.34), rgba(23, 159, 150, 0.24));
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(27, 91, 178, 0.7);
    outline-offset: 2px;
    border-color: rgba(27, 91, 178, 0.55);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
`;

const CardIndex = styled.span`
  color: ${S.palette.blue};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
`;

const CardMeta = styled.span`
  color: ${S.palette.textBody};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${S.palette.textPrimary};
  font-size: 1.38rem;
  font-weight: 700;
  line-height: 1.24;
  letter-spacing: -0.03em;
`;

const CardBody = styled.p`
  margin: 0;
  color: ${S.palette.textBody};
  max-width: 28ch;
  font-size: 0.93rem;
  line-height: 1.72;
`;

const CardDivider = styled.span`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(35, 79, 134, 0.24) 0%, rgba(23, 159, 150, 0.08) 62%, rgba(35, 79, 134, 0.02) 100%);
`;

const CardHint = styled.p`
  margin: auto 0 0;
  color: ${S.palette.blueDeep};
  align-self: flex-end;
  font-size: 0.8rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.02em;

  &::after {
    content: '→';
    font-size: 0.86rem;
  }
`;

export function PracticeSection() {
  const { t, tx } = useI18n();

  return (
    <>
      {ANCHOR_IDS.map((anchorId) => (
        <S.SectionAnchor key={anchorId} id={anchorId} />
      ))}

      <Section id="practice">
        <Inner>
          <Head data-reveal="slide-left">
            <div>
              <Label>Practice Areas</Label>
              <Title>{t('핵심 업무분야', 'Core Service Areas')}</Title>
              <Summary>
                {t(
                  '수출입통관부터 외환검사·조사까지, 기업 실무 리스크를 줄이는 핵심 관세 서비스를 제공합니다.',
                  'From customs clearance to foreign exchange investigations, we provide the core customs services that reduce practical business risk.',
                )}
              </Summary>
            </div>
          </Head>

          <Grid data-reveal="zoom">
            {practiceCards.map((item, index) => (
              <Card key={item.id} id={item.id} to={item.href}>
                <CardHeader>
                  <CardIndex>{String(index + 1).padStart(2, '0')}</CardIndex>
                  <CardMeta>{t(item.meta, item.metaEn ?? tx(item.meta))}</CardMeta>
                </CardHeader>
                <CardTitle>{t(item.title, item.titleEn ?? tx(item.title))}</CardTitle>
                <CardDivider />
                <CardBody>{t(item.body, item.bodyEn ?? tx(item.body))}</CardBody>
                <CardHint>{t('자세히 보기', 'Learn more')}</CardHint>
              </Card>
            ))}
          </Grid>
        </Inner>
      </Section>
    </>
  );
}
