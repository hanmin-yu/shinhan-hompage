import styled from '@emotion/styled';

import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { ServiceDetailSubnav } from '../../components/site/ServiceDetailSubnav';
import { palette } from '../../components/home/homeStyles';
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
  font-size: clamp(1.92rem, 3vw, 3.18rem);
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
  font-size: clamp(1.08rem, 1.48vw, 1.42rem);
  font-weight: 700;
  line-height: 1.42;
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
    font-size: 1.08rem;
    letter-spacing: -0.018em;
    line-height: 1.5;
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
  font-size: clamp(1.02rem, 1.45vw, 1.22rem);
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
  word-break: keep-all;
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
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const EditorialTitle = styled.h2`
  max-width: 860px;
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.92rem, 3vw, 3.18rem);
  font-weight: 700;
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
  border-top: 2px solid ${palette.blue};
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
  color: ${palette.blue};
  font-size: clamp(1.02rem, 1.48vw, 1.22rem);
  font-weight: 700;
  line-height: 1.34;
  letter-spacing: -0.025em;
`;

const ParagraphStack = styled.div`
  display: grid;
  gap: 12px;
`;

const SectionParagraph = styled.p`
  max-width: none;
  margin: 0;
  color: #475569;
  font-size: 1.06rem;
  line-height: 1.78;
  word-break: keep-all;
`;

const ImportExportFlow = styled.div`
  --flow-line: color-mix(in srgb, ${palette.blue} 22%, transparent);
  --flow-text: ${palette.blue};
  --flow-muted: #687385;

  position: relative;
  overflow: hidden;
  min-height: clamp(500px, 52vw, 610px);
  padding: clamp(30px, 4vw, 50px);
  border-radius: 8px;
  border: 1px solid #d8dee8;
  border-top: 2px solid ${palette.blue};
  background:
    linear-gradient(90deg, rgba(18, 63, 133, 0.045) 1px, transparent 1px) 0 0 / 42px 42px,
    linear-gradient(0deg, rgba(18, 63, 133, 0.035) 1px, transparent 1px) 0 0 / 42px 42px,
    linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);

  &::before {
    content: '';
    position: absolute;
    inset: 120px 74px 98px;
    background:
      linear-gradient(var(--flow-line), var(--flow-line)) 12% 32% / 27% 2px no-repeat,
      linear-gradient(var(--flow-line), var(--flow-line)) 39% 32% / 2px 26% no-repeat,
      linear-gradient(var(--flow-line), var(--flow-line)) 39% 58% / 21% 2px no-repeat,
      linear-gradient(var(--flow-line), var(--flow-line)) 60% 58% / 2px 20% no-repeat,
      linear-gradient(var(--flow-line), var(--flow-line)) 60% 78% / 20% 2px no-repeat,
      linear-gradient(var(--flow-line), var(--flow-line)) 80% 34% / 2px 44% no-repeat,
      linear-gradient(var(--flow-line), var(--flow-line)) 70% 34% / 10% 2px no-repeat;
    pointer-events: none;
  }

  @media (max-width: 820px) {
    min-height: auto;
    padding: 28px 18px;

    &::before {
      inset: 160px auto 70px 34px;
      width: 2px;
      background: var(--flow-line);
    }
  }
`;

const FlowHeader = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
  margin-bottom: clamp(34px, 4vw, 48px);
  text-align: center;
`;

const FlowKicker = styled.span`
  color: ${palette.blue};
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const FlowTitle = styled.h4`
  margin: 0;
  color: var(--flow-text);
  font-size: clamp(1.28rem, 2vw, 1.82rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.025em;
`;

const FlowCaption = styled.p`
  max-width: 680px;
  margin: 0;
  color: var(--flow-muted);
  font-size: 0.9rem;
  line-height: 1.58;
  word-break: keep-all;
`;

const FlowGrid = styled.div`
  counter-reset: flow-step;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(104px, auto));
  gap: clamp(18px, 3vw, 30px) clamp(28px, 5vw, 72px);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    gap: 18px;
    padding-left: 34px;
  }
`;

const FlowCard = styled.article<{ $index: number; $accent: string }>`
  position: relative;
  display: grid;
  align-content: center;
  gap: 8px;
  min-height: 108px;
  padding: 18px 22px;
  border: 1px solid #d8dee8;
  border-top: 2px solid ${({ $accent }) => $accent};
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow:
    0 16px 30px rgba(15, 38, 76, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  ${({ $index }) => {
    const positions = [
      'grid-column: 1; grid-row: 2;',
      'grid-column: 2; grid-row: 1;',
      'grid-column: 3; grid-row: 1;',
      'grid-column: 3; grid-row: 2;',
      'grid-column: 3; grid-row: 3;',
      'grid-column: 2; grid-row: 3;',
    ];
    return positions[$index] ?? '';
  }}

  &::before {
    content: counter(flow-step, decimal-leading-zero);
    counter-increment: flow-step;
    position: absolute;
    top: 50%;
    left: -13px;
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border: 2px solid ${({ $accent }) => $accent};
    border-radius: 999px;
    background: #ffffff;
    color: ${palette.blue};
    font-size: 0.64rem;
    font-weight: 900;
    line-height: 1;
    transform: translateY(-50%);
    box-shadow: 0 0 0 4px #f8fbff;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -26px;
    width: 9px;
    height: 9px;
    border-top: 2px solid rgba(29, 95, 182, 0.46);
    border-right: 2px solid rgba(29, 95, 182, 0.46);
    transform: translateY(-50%) rotate(45deg);
  }

  &:nth-of-type(3)::after,
  &:last-of-type::after {
    display: none;
  }

  @media (max-width: 820px) {
    grid-column: auto;
    grid-row: auto;
    min-height: 96px;

    &::before {
      left: -44px;
    }

    &::after {
      top: auto;
      right: auto;
      bottom: -17px;
      left: -38px;
      transform: rotate(135deg);
    }

    &:nth-of-type(3)::after {
      display: block;
    }
  }
`;

const FlowTerm = styled.strong`
  color: var(--flow-text);
  font-size: clamp(0.98rem, 1.28vw, 1.14rem);
  font-weight: 700;
  line-height: 1.34;
  letter-spacing: -0.025em;
  word-break: keep-all;
`;

const FlowDescription = styled.span`
  color: var(--flow-muted);
  font-size: 0.84rem;
  line-height: 1.5;
  word-break: keep-all;
`;

const RefundFlow = styled.div`
  position: relative;
  overflow: hidden;
  padding: clamp(34px, 4.6vw, 56px) clamp(22px, 4vw, 46px);
  border: 1px solid #d8dee8;
  border-top: 2px solid ${palette.blue};
  border-radius: 8px;
  background:
    radial-gradient(circle at 50% 22%, rgba(18, 63, 133, 0.06), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);

  &::before {
    content: '';
    position: absolute;
    left: clamp(68px, 9vw, 110px);
    right: clamp(68px, 9vw, 110px);
    top: clamp(118px, 11vw, 146px);
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(29, 95, 182, 0.2), transparent);
  }

  @media (max-width: 900px) {
    &::before {
      display: none;
    }
  }
`;

const RefundHeader = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
  margin-bottom: clamp(26px, 4vw, 42px);
  text-align: center;
`;

const RefundKicker = styled.span`
  color: ${palette.blue};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

const RefundTitle = styled.h4`
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.24rem, 2vw, 1.78rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
`;

const RefundGrid = styled.div<{ $columns?: number }>`
  counter-reset: refund-step;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(${({ $columns = 7 }) => Math.min($columns, 7)}, minmax(0, 1fr));
  gap: clamp(14px, 2vw, 20px);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    row-gap: 30px;
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;

const RefundStep = styled.article<{ $accent: string }>`
  counter-increment: refund-step;
  position: relative;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 14px;
  min-width: 0;
  text-align: center;

  &::before {
    content: counter(refund-step, decimal-leading-zero);
    display: grid;
    place-items: center;
    width: clamp(72px, 7vw, 92px);
    aspect-ratio: 1;
    border: 1px solid #d8dee8;
    border-top: 3px solid ${({ $accent }) => $accent};
    border-radius: 999px;
    background:
      linear-gradient(180deg, #ffffff 0%, #f6f9fd 100%);
    color: ${palette.blue};
    font-size: clamp(1rem, 1.35vw, 1.24rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    box-shadow:
      0 18px 30px rgba(15, 38, 76, 0.1),
      inset 0 0 0 10px rgba(29, 95, 182, 0.035);
  }

  &::after {
    content: '';
    position: absolute;
    top: clamp(32px, 3.3vw, 42px);
    right: calc(-1 * clamp(13px, 1.8vw, 18px));
    width: 8px;
    height: 8px;
    border-top: 2px solid rgba(29, 95, 182, 0.42);
    border-right: 2px solid rgba(29, 95, 182, 0.42);
    transform: rotate(45deg);
  }

  &:last-of-type::after {
    display: none;
  }

  @media (max-width: 1100px) {
    &:nth-of-type(4)::after {
      display: none;
    }
  }

  @media (max-width: 700px) {
    &:nth-of-type(4)::after {
      display: block;
    }

    &:nth-of-type(2n)::after {
      display: none;
    }
  }

  @media (max-width: 460px) {
    grid-template-columns: 76px minmax(0, 1fr);
    justify-items: start;
    align-items: center;
    text-align: left;

    &::before {
      width: 68px;
      grid-row: 1 / span 2;
    }

    &::after,
    &:nth-of-type(2n)::after {
      display: none;
    }
  }
`;

const RefundStepTitle = styled.strong`
  color: ${palette.blue};
  font-size: clamp(0.92rem, 1.08vw, 1rem);
  font-weight: 700;
  line-height: 1.36;
  letter-spacing: -0.02em;
  word-break: keep-all;
`;

const RefundStepDescription = styled.span`
  color: #687385;
  font-size: 0.78rem;
  line-height: 1.5;
  word-break: keep-all;
`;

const ProcessStrip = styled.div`
  counter-reset: process-node;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
  gap: 18px 26px;
  padding: clamp(28px, 4vw, 44px);
  border: 1px solid #d8dee8;
  border-top: 2px solid ${palette.blue};
  border-radius: 8px;
  background:
    radial-gradient(circle at 16% 20%, rgba(31, 199, 195, 0.18), transparent 28%),
    radial-gradient(circle at 86% 18%, rgba(107, 143, 242, 0.16), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
`;

const ProcessNode = styled.article<{ $accent: string }>`
  counter-increment: process-node;
  position: relative;
  display: grid;
  justify-items: center;
  gap: 12px;
  min-width: 0;
  text-align: center;

  &::before {
    content: counter(process-node, decimal-leading-zero);
    display: grid;
    place-items: center;
    width: clamp(72px, 7vw, 92px);
    aspect-ratio: 1;
    border-radius: 999px;
    background:
      radial-gradient(circle at 50% 50%, #ffffff 0 44%, transparent 45%),
      conic-gradient(${({ $accent }) => $accent} 0 82%, rgba(216, 222, 232, 0.9) 82% 100%);
    color: ${palette.blue};
    font-size: clamp(0.94rem, 1.2vw, 1.08rem);
    font-weight: 900;
    box-shadow: 0 18px 34px color-mix(in srgb, ${({ $accent }) => $accent} 22%, transparent);
  }

  &::after {
    content: '';
    position: absolute;
    top: clamp(32px, 3.3vw, 42px);
    right: -20px;
    width: 28px;
    height: 12px;
    background:
      linear-gradient(90deg, ${({ $accent }) => $accent}, ${({ $accent }) => $accent}) 0 50% / 18px 3px no-repeat,
      linear-gradient(45deg, transparent 50%, ${({ $accent }) => $accent} 51%) 16px 2px / 8px 8px no-repeat,
      linear-gradient(-45deg, transparent 50%, ${({ $accent }) => $accent} 51%) 16px 2px / 8px 8px no-repeat;
  }

  &:last-of-type::after {
    display: none;
  }

  @media (max-width: 760px) {
    &::after {
      display: none;
    }
  }
`;

const ProcessNodeTitle = styled.strong`
  color: ${palette.blue};
  font-size: clamp(0.94rem, 1.12vw, 1.04rem);
  font-weight: 800;
  line-height: 1.34;
  letter-spacing: -0.02em;
  word-break: keep-all;
`;

const ProcessNodeText = styled.span`
  color: #687385;
  font-size: 0.78rem;
  line-height: 1.52;
  word-break: keep-all;
`;

const StageCards = styled.div`
  counter-reset: stage-card;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding-top: 18px;
`;

const StageCard = styled.article<{ $accent: string }>`
  counter-increment: stage-card;
  position: relative;
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 188px;
  padding: 58px 22px 24px;
  border-radius: 22px 22px 10px 10px;
  background:
    linear-gradient(180deg, color-mix(in srgb, ${({ $accent }) => $accent} 74%, #ffffff), ${({ $accent }) => $accent});
  color: #ffffff;
  box-shadow: 0 22px 40px color-mix(in srgb, ${({ $accent }) => $accent} 24%, transparent);
  text-align: center;

  &::before {
    content: counter(stage-card, decimal-leading-zero);
    position: absolute;
    top: -22px;
    left: 50%;
    display: grid;
    place-items: center;
    width: 56px;
    aspect-ratio: 1;
    border: 7px solid #ffffff;
    border-radius: 999px;
    background: color-mix(in srgb, ${({ $accent }) => $accent} 78%, #172337);
    color: #ffffff;
    font-size: 0.82rem;
    font-weight: 900;
    transform: translateX(-50%);
    box-shadow: 0 14px 28px rgba(15, 38, 76, 0.16);
  }
`;

const StageCardTitle = styled.strong`
  font-size: clamp(1rem, 1.2vw, 1.12rem);
  font-weight: 800;
  line-height: 1.34;
  letter-spacing: -0.02em;
  word-break: keep-all;
`;

const StageCardText = styled.span`
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.82rem;
  line-height: 1.56;
  word-break: keep-all;
`;

const MetricBoard = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(260px, 1.2fr);
  gap: clamp(24px, 4vw, 46px);
  padding: clamp(30px, 4.4vw, 52px);
  border-radius: 8px;
  background:
    radial-gradient(circle at 78% 44%, rgba(31, 199, 195, 0.2), transparent 30%),
    linear-gradient(135deg, #172337 0%, #233247 100%);
  color: #ffffff;
  box-shadow: 0 24px 48px rgba(15, 38, 76, 0.18);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const MetricBoardTitle = styled.div`
  display: grid;
  align-content: center;
  gap: 16px;

  strong {
    font-size: clamp(1.56rem, 2.8vw, 2.6rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  span {
    color: rgba(255, 255, 255, 0.64);
    font-size: 0.9rem;
    line-height: 1.58;
  }
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const MetricItem = styled.article<{ $accent: string }>`
  counter-increment: metric-item;
  display: grid;
  gap: 10px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px 999px 18px 18px;
  background:
    radial-gradient(circle at 50% 0%, color-mix(in srgb, ${({ $accent }) => $accent} 28%, transparent), transparent 48%),
    rgba(255, 255, 255, 0.045);

  &::before {
    content: counter(metric-item, decimal-leading-zero);
    display: grid;
    place-items: center;
    width: 58px;
    aspect-ratio: 1;
    border: 3px solid ${({ $accent }) => $accent};
    border-radius: 999px;
    color: ${({ $accent }) => $accent};
    font-size: 0.82rem;
    font-weight: 900;
  }
`;

const MetricItemTitle = styled.strong`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.34;
  word-break: keep-all;
`;

const MetricItemText = styled.span`
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.8rem;
  line-height: 1.54;
  word-break: keep-all;
`;

const ContactPanel = styled.article`
  display: grid;
  gap: clamp(18px, 3vw, 28px);
  border-top: 2px solid ${palette.blue};
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
  grid-template-columns: minmax(0, 1fr) clamp(158px, 13vw, 206px);
  min-height: 268px;
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

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto auto 0;
    z-index: 3;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #071f43 0%, #1557a8 54%, #69a7e8 100%);
  }

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(18, 63, 133, 0.24);
    box-shadow:
      0 24px 56px rgba(13, 35, 66, 0.12),
      0 1px 0 rgba(255, 255, 255, 0.96) inset;
  }

  @media (max-width: 540px) {
    grid-template-columns: minmax(0, 1fr) 132px;
    min-height: 228px;
  }
`;

const ContactProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(24px, 3vw, 38px);
`;

const ContactTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
`;

const ContactName = styled.h3`
  flex: 0 0 auto;
  margin: 0;
  color: #121c2b;
  font-size: clamp(1.66rem, 2.35vw, 2.22rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0;
`;

const ContactNameDivider = styled.span`
  flex: 0 0 auto;
  width: 2px;
  height: 38px;
  margin-top: 2px;
  background: linear-gradient(180deg, #102a55, #1d5fb6);
  opacity: 0.9;
`;

const ContactRoleStack = styled.div`
  display: grid;
  gap: 3px;
  min-width: 0;
`;

const ContactRole = styled.p`
  margin: 0;
  color: #0c4e96;
  font-size: 1rem;
  font-weight: 850;
  line-height: 1.38;
`;

const ContactDepartment = styled.p`
  margin: 0;
  color: #6a7482;
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.45;
`;

const ContactPractice = styled.p`
  margin: 0;
  color: #6a7482;
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.45;
  word-break: keep-all;
`;

const ContactMeta = styled.div`
  display: grid;
  gap: 9px;
  margin-top: auto;
  padding-top: 22px;
`;

const ContactMetaItem = styled.p`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  color: #526174;
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.45;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const ContactLabel = styled.span`
  flex: 0 0 48px;
  color: #0c4e96;
  font-size: 0.96rem;
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
  min-height: 100%;
  overflow: hidden;
  border-left: 1px solid rgba(26, 55, 91, 0.14);
  background: #ffffff;

  @media (max-width: 540px) {
    min-height: 100%;
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
  background: #0c4e96;
  color: #ffffff;
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.04em;
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

const importExportFlowAccents = ['#e58f77', '#9bb8d7', '#34d1d0', '#2cb6c9', '#8f7ed2', '#9bb8d7'];
const refundFlowAccents = ['#1d5fb6', '#4d86c8', '#1d7d6a', '#7b8faa', '#2f8f7b', '#5d789f', '#174d9a'];
const quarantineFlowAccents = ['#1d5fb6', '#1d7d6a', '#5d789f', '#2f8f7b', '#4d86c8', '#7b8faa', '#174d9a'];
const vividAccents = ['#1d5fb6', '#1fc7c3', '#6b8ff2', '#f36f8f', '#d59c2a', '#6f74a8', '#2f8f7b'];

type DiagramKind = 'circle' | 'process' | 'stage' | 'metric';

type ReferenceDiagramSection = {
  heading: string;
  body?: string[];
  list: string[];
  kind: DiagramKind;
};

function getDiagramKind(contentId: string, heading: string, isSteps = false): DiagramKind {
  if (isSteps) return 'stage';

  if (contentId === 'import-export') return 'process';
  if (contentId === 'refund') {
    if (heading === '관세환급') return 'circle';
    if (heading === '주요 서비스') return 'stage';
  }
  if (contentId === 'quarantine') {
    if (heading === '요건의 종류') return 'circle';
    if (heading.includes('주요 서비스')) return 'process';
  }
  if (contentId === 'fta') {
    if (heading === '원산지 관리의 종류') return 'circle';
    if (heading === '일반 원산지 컨설팅') return 'stage';
    if (heading === 'FTA 원산지 컨설팅') return 'process';
  }
  if (contentId === 'customs-audit') {
    if (heading === '관세조사의 종류') return 'circle';
    return 'metric';
  }
  if (contentId === 'penalty-investigation') {
    if (heading === '범칙조사 구분') return 'circle';
    if (heading === '통고처분 및 검찰송치') return 'process';
    if (heading === '업무범위') return 'stage';
  }
  if (contentId === 'trade-consulting') {
    if (heading === '사전심사 제도의 종류') return 'circle';
    if (heading === '업무범위') return 'stage';
  }
  if (contentId === 'logistics') {
    if (heading.includes('Warehouse')) return 'stage';
    if (heading.includes('Forwarding')) return 'process';
    if (heading.includes('Trucking')) return 'circle';
  }
  if (contentId === 'vietnam') {
    if (heading.includes('수책') || heading.includes('FTA')) return 'process';
    if (heading.includes('수출입 통관') || heading.includes('무역 컨설팅')) return 'stage';
    if (heading.includes('관세심사') || heading.includes('상시 자문')) return 'metric';
  }
  if (contentId === 'us-fda') {
    if (heading.includes('핵심 서비스')) return 'process';
    if (heading.includes('지원 카테고리')) return 'circle';
    if (heading.includes('리스크')) return 'metric';
  }
  if (contentId === 'acva' && heading === 'ACVA 이점') return 'metric';
  if (heading.includes('종류') || heading.includes('구분') || heading.includes('카테고리')) {
    return 'circle';
  }
  if (
    contentId === 'foreign-exchange' ||
    contentId === 'tax-appeal' ||
    heading.includes('처리절차') ||
    heading.includes('통고처분')
  ) {
    return 'process';
  }
  if (heading.includes('업무') || heading.includes('서비스')) {
    return 'stage';
  }

  return 'process';
}

function getReferenceDiagramSections(contentId: string): ReferenceDiagramSection[] {
  if (contentId === 'aeo') {
    return [
      {
        heading: '신규인증·갱신심사 전략',
        kind: 'process',
        list: [
          '현황진단: 공인기준 충족 여부와 조직별 준비 수준을 점검합니다.',
          '기준 설계: 약 220여 개 공인기준에 맞춰 업무 프로세스와 증빙 체계를 설계합니다.',
          '문서·교육 정비: 부서별 실행 문서와 교육 체계를 정비합니다.',
          '현장심사 대응: 심사 동향에 맞춰 현장 보완과 질의 대응을 준비합니다.',
          '심의·사후관리: 심의위원회 대응 이후 자율평가와 변경 신고까지 관리합니다.',
        ],
      },
    ];
  }

  if (contentId === 'customs-audit') {
    return [
      {
        heading: '관세조사 주요 쟁점',
        kind: 'metric',
        list: [
          '관세평가: 거래가격과 가산·공제 요소의 적정성을 점검합니다.',
          '품목분류: HS CODE 정합성과 세율 적용 리스크를 검토합니다.',
          '관세환급: 환급 산정과 증빙 적정성을 확인합니다.',
          '감면: 감면 요건 충족 여부와 사후관리 리스크를 점검합니다.',
          '외국환거래: 지급 구조와 신고 의무 위반 가능성을 검토합니다.',
          '통관요건: 인증·허가·표시 기준 등 수입 요건을 점검합니다.',
          '보세화물 관리: 보세구역 반출입과 재고 관리 적정성을 확인합니다.',
        ],
      },
    ];
  }

  if (contentId === 'penalty-investigation') {
    return [
      {
        heading: '세관조사 및 통고처분 절차',
        kind: 'stage',
        list: [
          '세관조사 착수: 조사 범위와 혐의 사실을 확인합니다.',
          '자료 제출·입회: 요구 자료를 정리하고 조사 과정에 입회합니다.',
          '의견진술: 사실관계와 법리 쟁점을 정리해 의견을 제출합니다.',
          '통고처분 검토: 벌금·추징금 납부 여부와 사건 종결 가능성을 검토합니다.',
          '종결 또는 송치: 통고처분 이행 시 종결, 불이행 시 검찰 송치로 이어집니다.',
        ],
      },
      {
        heading: '검찰조사 및 형사처분 절차',
        kind: 'metric',
        list: [
          '검찰 송치: 세관조사 결과가 검찰 단계로 이관됩니다.',
          '검찰 수사: 사실관계와 위법성, 고의성 여부를 검토합니다.',
          '불기소 처분: 혐의 없음 또는 기소유예 등으로 사건이 종결될 수 있습니다.',
          '약식기소: 약식명령 송달 후 벌금 납부 또는 정식재판 청구로 이어집니다.',
          '공판기소: 정식 재판을 통해 판결 확정 단계로 진행됩니다.',
        ],
      },
    ];
  }

  if (contentId === 'vietnam') {
    return [
      {
        heading: '주요 서비스 상세 설명',
        kind: 'process',
        list: [
          '수책(Liquidation) 관리: 수책보고서 작성 대리와 월별 수책 관리 컨설팅을 지원합니다.',
          'FTA 컨설팅 및 원산지증명서 발급: 다자·양자 FTA 활용 전략과 원산지 관리 시스템 기반 대응을 제공합니다.',
          '수출입 통관: 현지 세관 및 파트너 기관과 연계해 HS Code 자문과 인허가 대행까지 수행합니다.',
          '관세심사: 세관 조사 주요항목을 사전 점검하고 제기 이슈에 대한 대응 논리를 수립합니다.',
          '무역 컨설팅 및 교육: 내국수출입, 반덤핑관세, 정책 변동 영향 분석과 실무 교육을 제공합니다.',
          '상시 자문 서비스: 베트남 관세·무역 법령 개정 동향과 최신 공문을 모니터링해 실무 적용 방안을 제공합니다.',
        ],
      },
    ];
  }

  return [];
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
  const isImportExportPage = content.id === 'import-export';
  const isRefundPage = content.id === 'refund';
  const isQuarantinePage = content.id === 'quarantine';
  const referenceDiagramSections = getReferenceDiagramSections(content.id);
  const showReferenceDiagramsFirst = content.id === 'vietnam';

  const renderCircleDiagram = (items: string[], sectionHeading: string) => {
    const accents = isQuarantinePage ? quarantineFlowAccents : refundFlowAccents;

    return (
      <RefundFlow>
        <RefundHeader>
          <RefundKicker>
            {isQuarantinePage ? 'REQUIREMENT CHECK' : isRefundPage ? 'REFUND PROCESS' : 'SERVICE MAP'}
          </RefundKicker>
          <RefundTitle>
            {isQuarantinePage
              ? t(
                  sectionHeading === '요건의 종류' ? '검역·요건 분류' : '검역·요건 업무 흐름',
                  sectionHeading === '요건의 종류'
                    ? 'Quarantine & Requirement Categories'
                    : 'Quarantine & Requirement Service Flow',
                )
              : isRefundPage
                ? t('관세환급 주요 서비스 흐름', 'Customs Refund Service Flow')
                : t(sectionHeading, sectionHeading)}
          </RefundTitle>
        </RefundHeader>
        <RefundGrid $columns={items.length}>
          {items.map((item, index) => {
            const { term, description } = splitDiagramItem(tx(item));
            return (
              <RefundStep key={item} $accent={accents[index % accents.length]}>
                <RefundStepTitle>{term}</RefundStepTitle>
                {description ? <RefundStepDescription>{description}</RefundStepDescription> : null}
              </RefundStep>
            );
          })}
        </RefundGrid>
      </RefundFlow>
    );
  };

  const renderProcessDiagram = (items: string[]) => {
    if (isImportExportPage) {
      return (
        <ImportExportFlow>
          <FlowHeader>
            <FlowKicker>PROCESS FLOW</FlowKicker>
            <FlowTitle>{t('수출입 통관 운영 흐름', 'Import & Export Clearance Flow')}</FlowTitle>
            <FlowCaption>
              {t(
                '품목 관리부터 리스크 점검, 이슈 대응, 시스템 연동과 데이터 관리까지 하나의 흐름으로 연결합니다.',
                'From item master management to risk control, issue response, system integration, and data management.',
              )}
            </FlowCaption>
          </FlowHeader>
          <FlowGrid>
            {items.map((item, index) => {
              const { term, description } = splitDiagramItem(tx(item));
              return (
                <FlowCard key={item} $index={index} $accent={importExportFlowAccents[index % importExportFlowAccents.length]}>
                  <FlowTerm>{term}</FlowTerm>
                  {description ? <FlowDescription>{description}</FlowDescription> : null}
                </FlowCard>
              );
            })}
          </FlowGrid>
        </ImportExportFlow>
      );
    }

    return (
      <ProcessStrip>
        {items.map((item, index) => {
          const { term, description } = splitDiagramItem(tx(item));
          return (
            <ProcessNode key={item} $accent={vividAccents[index % vividAccents.length]}>
              <ProcessNodeTitle>{term}</ProcessNodeTitle>
              {description ? <ProcessNodeText>{description}</ProcessNodeText> : null}
            </ProcessNode>
          );
        })}
      </ProcessStrip>
    );
  };

  const renderStageDiagram = (items: string[]) => (
    <StageCards>
      {items.map((item, index) => {
        const { term, description } = splitDiagramItem(tx(item));
        return (
          <StageCard key={item} $accent={vividAccents[index % vividAccents.length]}>
            <StageCardTitle>{term}</StageCardTitle>
            {description ? <StageCardText>{description}</StageCardText> : null}
          </StageCard>
        );
      })}
    </StageCards>
  );

  const renderMetricDiagram = (items: string[], sectionHeading: string) => (
    <MetricBoard>
      <MetricBoardTitle>
        <strong>{t(sectionHeading, sectionHeading)}</strong>
        <span>{t('핵심 효과를 리스크 완화와 운영 안정성 관점에서 정리했습니다.', 'Key effects organized by risk reduction and operational stability.')}</span>
      </MetricBoardTitle>
      <MetricGrid>
        {items.map((item, index) => {
          const { term, description } = splitDiagramItem(tx(item));
          return (
            <MetricItem key={item} $accent={vividAccents[index % vividAccents.length]}>
              <MetricItemTitle>{term}</MetricItemTitle>
              {description ? <MetricItemText>{description}</MetricItemText> : null}
            </MetricItem>
          );
        })}
      </MetricGrid>
    </MetricBoard>
  );

  const renderItemsDiagram = (items: string[], sectionHeading: string, isSteps = false) => {
    const kind = getDiagramKind(content.id, sectionHeading, isSteps);

    if (kind === 'circle') return renderCircleDiagram(items, sectionHeading);
    if (kind === 'stage') return renderStageDiagram(items);
    if (kind === 'metric') return renderMetricDiagram(items, sectionHeading);
    return renderProcessDiagram(items);
  };

  const renderDiagramByKind = (items: string[], sectionHeading: string, kind: DiagramKind) => {
    if (kind === 'circle') return renderCircleDiagram(items, sectionHeading);
    if (kind === 'stage') return renderStageDiagram(items);
    if (kind === 'metric') return renderMetricDiagram(items, sectionHeading);
    return renderProcessDiagram(items);
  };

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
            {showReferenceDiagramsFirst
              ? referenceDiagramSections.map((section) => (
                  <DocumentSectionCard key={section.heading}>
                    <DocumentSectionTitle>{t(section.heading, section.heading)}</DocumentSectionTitle>
                    <ItemBodyStack>
                      {section.body?.length ? (
                        <ParagraphStack>
                          {section.body.map((paragraph) => (
                            <SectionParagraph key={paragraph}>{tx(paragraph)}</SectionParagraph>
                          ))}
                        </ParagraphStack>
                      ) : null}
                      {renderDiagramByKind(section.list, section.heading, section.kind)}
                    </ItemBodyStack>
                  </DocumentSectionCard>
                ))
              : null}
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
                    renderItemsDiagram(section.list, section.heading)
                  ) : null}
                  {section.steps?.length ? (
                    renderItemsDiagram(section.steps, section.heading, true)
                  ) : null}
                </ItemBodyStack>
              </DocumentSectionCard>
            ))}
            {!showReferenceDiagramsFirst
              ? referenceDiagramSections.map((section) => (
                  <DocumentSectionCard key={section.heading}>
                    <DocumentSectionTitle>{t(section.heading, section.heading)}</DocumentSectionTitle>
                    <ItemBodyStack>
                      {section.body?.length ? (
                        <ParagraphStack>
                          {section.body.map((paragraph) => (
                            <SectionParagraph key={paragraph}>{tx(paragraph)}</SectionParagraph>
                          ))}
                        </ParagraphStack>
                      ) : null}
                      {renderDiagramByKind(section.list, section.heading, section.kind)}
                    </ItemBodyStack>
                  </DocumentSectionCard>
                ))
              : null}
          </DocumentStack>
        </SectionInner>
      </EditorialSection>

      <EditorialSection>
        <SectionInner data-reveal>
          <SectionHead>
            <SectionLabel>Contact</SectionLabel>
            <EditorialTitle>{t('담당자', 'Contact')}</EditorialTitle>
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
                        <ContactTitleRow>
                          <ContactName>{tx(contact.name)}</ContactName>
                          <ContactNameDivider aria-hidden="true" />
                          <ContactRoleStack>
                            {role ? <ContactRole>{tx(role)}</ContactRole> : null}
                            {member?.department ? <ContactDepartment>{tx(member.department)}</ContactDepartment> : null}
                            {member?.practice ? <ContactPractice>{tx(member.practice)}</ContactPractice> : null}
                          </ContactRoleStack>
                        </ContactTitleRow>
                        <ContactMeta>
                          {phone ? (
                            <ContactMetaItem>
                              <ContactLabel>{t('전화', 'Phone')}</ContactLabel>
                              <ContactValue href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</ContactValue>
                            </ContactMetaItem>
                          ) : null}
                          {email ? (
                            <ContactMetaItem>
                              <ContactLabel>{t('이메일', 'Email')}</ContactLabel>
                              <ContactValue href={`mailto:${email}`}>{email}</ContactValue>
                            </ContactMetaItem>
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
