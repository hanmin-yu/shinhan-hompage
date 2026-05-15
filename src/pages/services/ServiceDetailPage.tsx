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

const EditorialSection = styled.section<{ $tone?: 'soft'; $spacing?: 'default' | 'intro' | 'detail' }>`
  font-family: "NanumSquare", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  padding: ${({ $spacing = 'default' }) =>
    $spacing === 'intro'
      ? 'clamp(72px, 8vw, 118px) 0 clamp(24px, 3.6vw, 42px)'
      : $spacing === 'detail'
        ? 'clamp(18px, 3vw, 34px) 0 clamp(72px, 8vw, 118px)'
        : 'clamp(72px, 8vw, 118px) 0'};
  background: ${({ $tone }) => ($tone === 'soft' ? '#f6f7f9' : '#ffffff')};
`;

const ServiceNavSection = styled.section`
  padding: clamp(18px, 2.6vw, 28px) 0;
  border-top: 1px solid #e4e7ec;
  border-bottom: 1px solid #e4e7ec;
  background: #ffffff;

  @media (max-width: 760px) {
    padding: 10px 0;
    background: #f7f9fc;
  }
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 52px);
  max-width: 1280px;
`;

const HeroHeading = styled.div`
  display: grid;
  gap: clamp(8px, 1vw, 12px);
  justify-items: start;
  min-width: 0;
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
  font-size: clamp(1.92rem, 3vw, 3.18rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;
  word-break: keep-all;

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
  letter-spacing: 0.08em;
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
  grid-template-columns: minmax(120px, 0.18fr) minmax(0, 1fr);
  gap: clamp(20px, 4vw, 56px);
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
  --flow-text: ${palette.blue};
  --flow-muted: #687385;

  position: relative;
  overflow: hidden;
  display: grid;
  padding: 0;
  border-radius: 8px;
  border: 1px solid #d8dee8;
  background: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);
`;

const FlowHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px clamp(22px, 3vw, 32px);
  background: ${palette.blue};
  color: #ffffff;
`;

const FlowKicker = styled.span`
  display: grid;
  place-items: center;
  width: 24px;
  aspect-ratio: 1;
  border-radius: 6px;
  background:
    linear-gradient(#ffffff, #ffffff) 50% 31% / 12px 2px no-repeat,
    linear-gradient(#ffffff, #ffffff) 50% 50% / 12px 2px no-repeat,
    linear-gradient(#ffffff, #ffffff) 50% 69% / 12px 2px no-repeat;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.38);
  color: transparent;
  font-size: 0;
`;

const FlowTitle = styled.h4`
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.18rem, 1.8vw, 1.58rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.02em;
`;

const FlowCaption = styled.p`
  display: none;
`;

const FlowGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px clamp(22px, 4vw, 52px);
  padding: clamp(28px, 4vw, 46px) clamp(22px, 4vw, 40px);
  background: #f8fafc;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const FlowCard = styled.article<{ $accent: string }>`
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 20px;
  align-items: start;
  min-height: 116px;
  padding: 20px 24px;
  border: 1px solid #edf0f5;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(15, 38, 76, 0.045);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 4px 0 0 ${({ $accent }) => $accent};
    pointer-events: none;
  }

  @media (max-width: 820px) {
    min-height: auto;
    padding: 20px;
  }
`;

const FlowBadge = styled.span<{ $accent: string }>`
  display: grid;
  place-items: center;
  width: 38px;
  aspect-ratio: 1;
  margin-top: 2px;
  border-radius: 8px;
  background: color-mix(in srgb, ${palette.blue} 10%, #ffffff);
  color: ${palette.blue};
  font-size: 0.96rem;
  font-weight: 900;
  line-height: 1;
  box-shadow: inset 0 0 0 1px rgba(18, 63, 133, 0.14);

  @media (max-width: 420px) {
    width: 34px;
  }
`;

const FlowCardBody = styled.div`
  display: grid;
  gap: 7px;
  min-width: 0;
`;

const FlowTerm = styled.strong`
  color: var(--flow-text);
  font-size: clamp(1.02rem, 1.35vw, 1.18rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
  word-break: keep-all;
  text-wrap: balance;
`;

const FlowDescription = styled.span`
  color: var(--flow-muted);
  font-size: 0.82rem;
  line-height: 1.58;
  word-break: keep-all;
  text-wrap: pretty;
`;

const RefundFlow = styled.div<{ $showConnector?: boolean }>`
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
    display: ${({ $showConnector = true }) => ($showConnector ? 'block' : 'none')};
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
  letter-spacing: 0.08em;
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

const RefundStep = styled.article<{ $accent: string; $showConnector?: boolean }>`
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
    display: ${({ $showConnector = true }) => ($showConnector ? 'block' : 'none')};
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
      display: ${({ $showConnector = true }) => ($showConnector ? 'block' : 'none')};
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

const ProcessStrip = styled.div<{ $tone?: 'default' | 'navy'; $columns?: number }>`
  counter-reset: process-node;
  position: relative;
  display: grid;
  grid-template-columns: ${({ $columns }) =>
    $columns ? `repeat(${$columns}, minmax(0, 1fr))` : 'repeat(auto-fit, minmax(148px, 1fr))'};
  gap: 18px 26px;
  padding: clamp(28px, 4vw, 44px);
  border: 1px solid #d8dee8;
  border-top: 2px solid ${palette.blue};
  border-radius: 8px;
  background: ${({ $tone = 'default' }) =>
    $tone === 'navy'
      ? 'radial-gradient(circle at 16% 20%, rgba(18, 63, 133, 0.12), transparent 28%), radial-gradient(circle at 86% 18%, rgba(29, 95, 182, 0.1), transparent 30%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)'
      : 'radial-gradient(circle at 16% 20%, rgba(31, 199, 195, 0.18), transparent 28%), radial-gradient(circle at 86% 18%, rgba(107, 143, 242, 0.16), transparent 30%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)'};

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessNode = styled.article<{ $accent: string; $showConnector?: boolean }>`
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
    display: ${({ $showConnector = true }) => ($showConnector ? 'block' : 'none')};
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

const PenaltyProcedureBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(18px, 3vw, 28px);
  padding: clamp(24px, 3.6vw, 42px);
  border: 1px solid #d8dee8;
  border-top: 2px solid ${palette.blue};
  border-radius: 8px;
  background:
    radial-gradient(circle at 16% 16%, rgba(18, 63, 133, 0.08), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const PenaltyProcedureLane = styled.article`
  display: grid;
  gap: 18px;
  min-width: 0;
  padding: clamp(22px, 3vw, 30px);
  border: 1px solid #dbe4f0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 30px rgba(15, 38, 76, 0.06);
`;

const PenaltyProcedureLaneTitle = styled.h4`
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.08rem, 1.45vw, 1.28rem);
  font-weight: 800;
  line-height: 1.28;
  letter-spacing: -0.02em;
`;

const PenaltyProcedureSteps = styled.ol`
  counter-reset: penalty-step;
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const PenaltyProcedureStep = styled.li`
  counter-increment: penalty-step;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  min-width: 0;
  padding: 14px;
  border-radius: 8px;
  background: #f6f9fd;

  &::before {
    content: counter(penalty-step, decimal-leading-zero);
    display: grid;
    place-items: center;
    width: 34px;
    aspect-ratio: 1;
    border-radius: 999px;
    background: ${palette.blue};
    color: #ffffff;
    font-size: 0.72rem;
    font-weight: 900;
    line-height: 1;
  }
`;

const PenaltyProcedureStepBody = styled.div`
  display: grid;
  gap: 4px;
  min-width: 0;
`;

const PenaltyProcedureStepTitle = styled.strong`
  color: ${palette.blue};
  font-size: 0.94rem;
  font-weight: 800;
  line-height: 1.34;
  word-break: keep-all;
`;

const PenaltyProcedureStepText = styled.span`
  color: #687385;
  font-size: 0.8rem;
  line-height: 1.52;
  word-break: keep-all;
`;

const StageCards = styled.div<{ $columns?: number; $titleRows?: number }>`
  --stage-title-lines: ${({ $titleRows = 3 }) => $titleRows};

  counter-reset: stage-card;
  display: grid;
  grid-template-columns: ${({ $columns }) =>
    $columns ? `repeat(${$columns}, minmax(0, 1fr))` : 'repeat(auto-fit, minmax(150px, 1fr))'};
  gap: 20px;
  padding-top: 18px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const StageCard = styled.article<{ $accent: string; $tone?: 'solid' | 'plain' }>`
  counter-increment: stage-card;
  position: relative;
  display: grid;
  align-content: start;
  gap: 14px;
  min-height: 188px;
  padding: 58px 20px 24px;
  border: ${({ $tone = 'solid' }) => ($tone === 'plain' ? '1px solid #cbdcf0' : '0')};
  border-radius: 22px 22px 10px 10px;
  background: ${({ $tone = 'solid', $accent }) =>
    $tone === 'plain'
      ? 'linear-gradient(180deg, #f6f9ff 0%, #eaf2fb 100%)'
      : `linear-gradient(180deg, color-mix(in srgb, ${$accent} 74%, #ffffff), ${$accent})`};
  color: ${({ $tone = 'solid' }) => ($tone === 'plain' ? '#143b6f' : '#ffffff')};
  box-shadow: ${({ $tone = 'solid', $accent }) =>
    $tone === 'plain'
      ? '0 16px 30px rgba(18, 63, 133, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.86)'
      : `0 22px 40px color-mix(in srgb, ${$accent} 24%, transparent)`};
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
    border: 7px solid ${({ $tone = 'solid' }) => ($tone === 'plain' ? '#f6f9ff' : '#ffffff')};
    border-radius: 999px;
    background: ${({ $tone = 'solid', $accent }) =>
      $tone === 'plain' ? 'linear-gradient(180deg, #1d5fb6 0%, #123f85 100%)' : `color-mix(in srgb, ${$accent} 78%, #172337)`};
    color: #ffffff;
    font-size: 0.82rem;
    font-weight: 900;
    transform: translateX(-50%);
    box-shadow: 0 14px 28px rgba(15, 38, 76, 0.16);
  }
`;

const StageCardTitle = styled.strong`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(1em * 1.34 * var(--stage-title-lines));
  font-size: clamp(0.98rem, 1.08vw, 1.08rem);
  font-weight: 800;
  line-height: 1.34;
  letter-spacing: 0;
  word-break: keep-all;
  text-wrap: balance;
`;

const StageCardText = styled.span`
  color: inherit;
  opacity: 0.72;
  font-size: 0.8rem;
  line-height: 1.62;
  word-break: keep-all;
  text-wrap: pretty;
`;

const MetricBoard = styled.div<{ $tone?: 'dark' | 'plain' }>`
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(260px, 1.2fr);
  gap: clamp(24px, 4vw, 46px);
  padding: clamp(30px, 4.4vw, 52px);
  border: ${({ $tone = 'dark' }) => ($tone === 'plain' ? '1px solid #d8dee8' : '0')};
  border-top: ${({ $tone = 'dark' }) => ($tone === 'plain' ? `2px solid ${palette.blue}` : '0')};
  border-radius: 8px;
  background: ${({ $tone = 'dark' }) =>
    $tone === 'plain'
      ? 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)'
      : 'radial-gradient(circle at 78% 44%, rgba(31, 199, 195, 0.2), transparent 30%), linear-gradient(135deg, #172337 0%, #233247 100%)'};
  color: ${({ $tone = 'dark' }) => ($tone === 'plain' ? palette.blue : '#ffffff')};
  box-shadow: ${({ $tone = 'dark' }) =>
    $tone === 'plain' ? '0 18px 34px rgba(15, 38, 76, 0.07)' : '0 24px 48px rgba(15, 38, 76, 0.18)'};

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const MetricBoardTitle = styled.div<{ $tone?: 'dark' | 'plain' }>`
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
    color: ${({ $tone = 'dark' }) => ($tone === 'plain' ? '#687385' : 'rgba(255, 255, 255, 0.64)')};
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

const MetricItem = styled.article<{ $accent: string; $tone?: 'dark' | 'plain' }>`
  counter-increment: metric-item;
  display: grid;
  gap: 10px;
  padding: 22px;
  border: ${({ $tone = 'dark' }) => ($tone === 'plain' ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.12)')};
  border-radius: ${({ $tone = 'dark' }) => ($tone === 'plain' ? '8px' : '999px 999px 18px 18px')};
  background: ${({ $tone = 'dark', $accent }) =>
    $tone === 'plain'
      ? '#ffffff'
      : `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${$accent} 28%, transparent), transparent 48%), rgba(255, 255, 255, 0.045)`};
  box-shadow: ${({ $tone = 'dark' }) => ($tone === 'plain' ? '0 12px 24px rgba(15, 38, 76, 0.05)' : 'none')};

  &::before {
    content: counter(metric-item, decimal-leading-zero);
    display: grid;
    place-items: center;
    width: 58px;
    aspect-ratio: 1;
    border: ${({ $tone = 'dark', $accent }) => ($tone === 'plain' ? '0' : `3px solid ${$accent}`)};
    border-radius: 999px;
    background: ${({ $tone = 'dark' }) => ($tone === 'plain' ? palette.blue : 'transparent')};
    color: ${({ $tone = 'dark', $accent }) => ($tone === 'plain' ? '#ffffff' : $accent)};
    font-size: 0.82rem;
    font-weight: 900;
  }
`;

const MetricItemTitle = styled.strong<{ $tone?: 'dark' | 'plain' }>`
  color: ${({ $tone = 'dark' }) => ($tone === 'plain' ? palette.blue : '#ffffff')};
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.34;
  word-break: keep-all;
`;

const MetricItemText = styled.span<{ $tone?: 'dark' | 'plain' }>`
  color: ${({ $tone = 'dark' }) => ($tone === 'plain' ? '#687385' : 'rgba(255, 255, 255, 0.66)')};
  font-size: 0.8rem;
  line-height: 1.54;
  word-break: keep-all;
`;

const PlatformFeatureMatrix = styled.div`
  overflow: hidden;
  position: relative;
  border: 1px solid #d8dee8;
  border-radius: 8px;
  background: #ffffff;

  &::before {
    content: '';
    display: block;
    height: 4px;
    background: linear-gradient(90deg, ${palette.blue} 0%, #1d5fb6 62%, #8fb7e8 100%);
  }
`;

const FeatureMatrixHeader = styled.div`
  display: grid;
  grid-template-columns: 82px minmax(180px, 0.42fr) minmax(0, 1fr);
  min-height: 52px;
  border-bottom: 1px solid #dbe3ee;
  background: linear-gradient(180deg, #fbfdff 0%, #f2f6fb 100%);
  color: ${palette.blue};

  @media (max-width: 760px) {
    display: none;
  }
`;

const FeatureHeaderCell = styled.span`
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 14px 20px;
  border-right: 1px solid #dbe3ee;
  font-size: 0.86rem;
  font-weight: 900;
  letter-spacing: 0;

  &:last-of-type {
    border-right: 0;
  }
`;

const FeatureMatrixRow = styled.article`
  display: grid;
  grid-template-columns: 82px minmax(180px, 0.42fr) minmax(0, 1fr);
  min-height: 102px;
  border-bottom: 1px solid #dbe0e8;

  &:last-of-type {
    border-bottom: 0;
  }

  @media (max-width: 760px) {
    grid-template-columns: 58px minmax(0, 1fr);
    min-height: auto;
    padding: 18px;
    gap: 8px 14px;
  }
`;

const FeatureNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #dbe0e8;
  background: #f6f9fd;
  color: ${palette.blue};
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: -0.02em;

  @media (max-width: 760px) {
    grid-row: 1 / span 2;
    width: 48px;
    aspect-ratio: 1;
    border: 0;
    border-radius: 8px;
  }
`;

const FeatureName = styled.strong`
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 20px 22px;
  border-right: 1px solid #dbe0e8;
  color: ${palette.blue};
  font-size: clamp(1rem, 1.26vw, 1.14rem);
  font-weight: 850;
  line-height: 1.36;
  letter-spacing: -0.02em;
  word-break: keep-all;

  @media (max-width: 760px) {
    padding: 0;
    border-right: 0;
  }
`;

const FeatureDetail = styled.span`
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 20px 24px;
  color: #596579;
  font-size: 0.92rem;
  line-height: 1.62;
  word-break: keep-all;

  @media (max-width: 760px) {
    padding: 0;
  }
`;

const ImpactTable = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid #d8dee8;
  border-top: 2px solid ${palette.blue};
  border-radius: 8px;
  background: #ffffff;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ImpactColumn = styled.article`
  display: grid;
  grid-template-rows: auto minmax(136px, 1fr);
  min-width: 0;
  border-right: 1px solid #dbe0e8;

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 760px) {
    grid-template-rows: auto auto;
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const ImpactHeaderCell = styled.strong`
  min-width: 0;
  padding: 22px 24px;
  border-bottom: 1px solid #dbe0e8;
  background: #f6f9fd;
  color: ${palette.blue};
  font-size: clamp(1.04rem, 1.4vw, 1.24rem);
  font-weight: 900;
  line-height: 1.34;
  letter-spacing: -0.025em;
  word-break: keep-all;
`;

const ImpactBodyCell = styled.span`
  min-width: 0;
  padding: 24px;
  color: #384456;
  font-size: clamp(0.98rem, 1.26vw, 1.12rem);
  line-height: 1.72;
  word-break: keep-all;

  @media (max-width: 760px) {
    min-height: auto;
  }
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

const importExportFlowAccents = [palette.blue];
const refundFlowAccents = [palette.blue];
const ftaCircleAccents = [palette.blue];
const vividAccents = ['#1d5fb6', '#1fc7c3', '#6b8ff2', '#f36f8f', '#d59c2a', '#6f74a8', '#2f8f7b'];

type DiagramKind = 'circle' | 'process' | 'stage' | 'metric' | 'split' | 'featureMatrix' | 'impactTable';

type ReferenceDiagramSection = {
  heading: string;
  body?: string[];
  list: string[];
  kind: DiagramKind;
};

function getBalancedDiagramColumns(itemCount: number): number | undefined {
  if (itemCount === 6) return 3;
  if (itemCount === 7 || itemCount === 8) return 4;
  if (itemCount >= 2 && itemCount <= 5) return itemCount;
  return undefined;
}

function getDiagramKind(contentId: string, heading: string, isSteps = false): DiagramKind {
  if (isSteps) {
    if (contentId === 'acva' && heading === 'ACVA 처리절차') return 'process';
    return 'stage';
  }

  if (contentId === 'import-export') {
    if (heading === '주요 핵심 기능') return 'featureMatrix';
    if (heading === '도입 기대 효과') return 'impactTable';
  }
  if (contentId === 'import-export') return 'process';
  if (contentId === 'refund') {
    if (heading === '환급 종류') return 'circle';
    if (heading === '주요 서비스') return 'stage';
  }
  if (contentId === 'quarantine') {
    if (heading === '요건의 종류') return 'circle';
    if (heading.includes('주요 서비스')) return 'process';
  }
  if (contentId === 'fta') {
    if (heading === '원산지 관리의 종류') return 'circle';
    if (heading === '일반 원산지 컨설팅') return 'stage';
    if (heading === 'FTA 원산지 컨설팅') return 'stage';
  }
  if (contentId === 'customs-audit') {
    if (heading === '관세조사의 종류') return 'circle';
    if (heading === '주요 조사 분야') return 'process';
    return 'metric';
  }
  if (contentId === 'penalty-investigation') {
    if (heading === '범칙조사 구분') return 'circle';
    if (heading === '통고처분 및 검찰송치') return 'process';
    if (heading === '업무범위') return 'stage';
  }
  if (contentId === 'tax-appeal') {
    if (heading === '업무범위') return 'stage';
    return 'process';
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
    if (heading.includes('리스크')) return 'stage';
  }
  if (contentId === 'acva' && heading === 'ACVA 이점') return 'process';
  if (heading.includes('종류') || heading.includes('구분') || heading.includes('카테고리')) {
    return 'circle';
  }
  if (
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

  if (contentId === 'customs-audit') return [];

  if (contentId === 'penalty-investigation') {
    return [
      {
        heading: '범칙조사 절차',
        kind: 'split',
        list: [
          '세관조사 및 통고처분|세관조사 착수: 조사 범위와 혐의 사실을 확인합니다.',
          '세관조사 및 통고처분|자료 제출·입회: 요구 자료를 정리하고 조사 과정에 입회합니다.',
          '세관조사 및 통고처분|의견진술: 사실관계와 법리 쟁점을 정리해 의견을 제출합니다.',
          '세관조사 및 통고처분|통고처분 검토: 벌금·추징금 납부 여부와 사건 종결 가능성을 검토합니다.',
          '세관조사 및 통고처분|종결 또는 송치: 통고처분 이행 시 종결, 불이행 시 검찰 송치로 이어집니다.',
          '검찰조사 및 형사처분|검찰 송치: 세관조사 결과가 검찰 단계로 이관됩니다.',
          '검찰조사 및 형사처분|검찰 수사: 사실관계와 위법성, 고의성 여부를 검토합니다.',
          '검찰조사 및 형사처분|불기소 처분: 혐의 없음 또는 기소유예 등으로 사건이 종결될 수 있습니다.',
          '검찰조사 및 형사처분|약식기소: 약식명령 송달 후 벌금 납부 또는 정식재판 청구로 이어집니다.',
          '검찰조사 및 형사처분|공판기소: 정식 재판을 통해 판결 확정 단계로 진행됩니다.',
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
  const activeLandingGroup = serviceLandingGroups.find((group) => group.id === content.groupKey);
  const showServiceSubnav = Boolean(activeLandingGroup && activeLandingGroup.items.length > 1);
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
  const isFtaPage = content.id === 'fta';
  const isAeoPage = content.id === 'aeo';
  const isCustomsAuditPage = content.id === 'customs-audit';
  const isForeignExchangePage = content.id === 'foreign-exchange';
  const isAcvaPage = content.id === 'acva';
  const isPenaltyInvestigationPage = content.id === 'penalty-investigation';
  const isTaxAppealPage = content.id === 'tax-appeal';
  const isLogisticsPage = content.id === 'logistics';
  const isVietnamPage = content.id === 'vietnam';
  const isUsFdaPage = content.id === 'us-fda';
  const referenceDiagramSections = getReferenceDiagramSections(content.id);
  const showReferenceDiagramsFirst = content.id === 'vietnam';
  const deferredDetailSections = isPenaltyInvestigationPage
    ? detailSections.filter((section) => section.heading === '업무범위')
    : [];
  const primaryDetailSections = isPenaltyInvestigationPage
    ? detailSections.filter((section) => section.heading !== '업무범위')
    : detailSections;

  const renderCircleDiagram = (items: string[], sectionHeading: string) => {
    const accents = isQuarantinePage || isVietnamPage || isUsFdaPage ? [palette.blue] : isFtaPage ? ftaCircleAccents : refundFlowAccents;
    const isRefundTypes = isRefundPage && sectionHeading === '환급 종류';
    const isCustomsAuditTypes = isCustomsAuditPage && sectionHeading === '관세조사의 종류';
    const isPenaltyInvestigationTypes = isPenaltyInvestigationPage && sectionHeading === '범칙조사 구분';
    const isFtaOriginTypes = isFtaPage && sectionHeading === '원산지 관리의 종류';
    const isQuarantineTypes = isQuarantinePage && sectionHeading === '요건의 종류';
    const isLogisticsTrucking = isLogisticsPage && sectionHeading.includes('Trucking');
    const isVietnamSection = isVietnamPage;
    const isUsFdaSection = isUsFdaPage;
    const showConnector =
      !isRefundTypes &&
      !isCustomsAuditTypes &&
      !isPenaltyInvestigationTypes &&
      !isFtaOriginTypes &&
      !isQuarantineTypes &&
      !isLogisticsTrucking &&
      !isVietnamSection &&
      !isUsFdaSection;

    return (
      <RefundFlow $showConnector={showConnector}>
        <RefundHeader>
          <RefundKicker>
            {isQuarantinePage ? 'REQUIREMENT CHECK' : isRefundTypes ? 'REFUND TYPES' : isRefundPage ? 'REFUND SERVICE' : 'SERVICE MAP'}
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
                ? t(sectionHeading, sectionHeading)
                : t(sectionHeading, sectionHeading)}
          </RefundTitle>
        </RefundHeader>
        <RefundGrid $columns={items.length}>
          {items.map((item, index) => {
            const { term, description } = splitDiagramItem(tx(item));
            return (
              <RefundStep key={item} $accent={accents[index % accents.length]} $showConnector={showConnector}>
                <RefundStepTitle>{term}</RefundStepTitle>
                {description ? <RefundStepDescription>{description}</RefundStepDescription> : null}
              </RefundStep>
            );
          })}
        </RefundGrid>
      </RefundFlow>
    );
  };

  const renderProcessDiagram = (items: string[], sectionHeading = '') => {
    const isCustomsAuditFocus = isCustomsAuditPage && sectionHeading === '주요 조사 분야';
    const isForeignExchangeService = isForeignExchangePage && sectionHeading === '주요 서비스';
    const isAcvaBenefits = isAcvaPage && sectionHeading === 'ACVA 이점';
    const isQuarantineService = isQuarantinePage && sectionHeading === '주요 서비스';
    const isUsFdaCoreService = isUsFdaPage && sectionHeading.includes('핵심 서비스');

    if (isImportExportPage || isCustomsAuditFocus || isForeignExchangeService || isAcvaBenefits || isQuarantineService || isUsFdaCoreService) {
      const accents = importExportFlowAccents;
      const boardTitle = isImportExportPage
        ? sectionHeading === '주요 서비스 상세 설명'
          ? t('주요 서비스', 'Key Services')
          : t(sectionHeading, sectionHeading)
        : t(sectionHeading, sectionHeading);

      return (
        <ImportExportFlow>
          <FlowHeader>
            <FlowKicker aria-hidden="true">LIST</FlowKicker>
            <FlowTitle>{boardTitle}</FlowTitle>
            <FlowCaption>
              {isImportExportPage
                ? t(
                    '시스템 기반 관리와 실무 대응 역량을 중심으로 통관 운영의 강점을 정리했습니다.',
                    'Key strengths of customs operations organized around system-based management and practical response capabilities.',
                  )
                : null}
            </FlowCaption>
          </FlowHeader>
          <FlowGrid>
            {items.map((item, index) => {
              const { term, description } = splitDiagramItem(tx(item));
              const accent = accents[index % accents.length];
              return (
                <FlowCard key={item} $accent={accent}>
                  <FlowBadge $accent={accent}>{index + 1}</FlowBadge>
                  <FlowCardBody>
                    <FlowTerm>{term}</FlowTerm>
                    {description ? <FlowDescription>{description}</FlowDescription> : null}
                  </FlowCardBody>
                </FlowCard>
              );
            })}
          </FlowGrid>
        </ImportExportFlow>
      );
    }

    const columns = getBalancedDiagramColumns(items.length);

    return (
      <ProcessStrip
        $tone={isAcvaPage || isPenaltyInvestigationPage || isLogisticsPage || isVietnamPage || isUsFdaPage ? 'navy' : 'default'}
        $columns={columns}
      >
        {items.map((item, index) => {
          const { term, description } = splitDiagramItem(tx(item));
          const accent =
            isAeoPage || isFtaPage || isAcvaPage || isPenaltyInvestigationPage || isLogisticsPage || isVietnamPage || isUsFdaPage
              ? palette.blue
              : vividAccents[index % vividAccents.length];
          const isRowEnd = columns ? (index + 1) % columns === 0 : false;
          const showConnector =
            !(isLogisticsPage && sectionHeading.includes('Forwarding')) &&
            !isVietnamPage &&
            !isUsFdaPage &&
            !isRowEnd;
          return (
            <ProcessNode key={item} $accent={accent} $showConnector={showConnector}>
              <ProcessNodeTitle>{term}</ProcessNodeTitle>
              {description ? <ProcessNodeText>{description}</ProcessNodeText> : null}
            </ProcessNode>
          );
        })}
      </ProcessStrip>
    );
  };

  const renderPenaltyProcedureBoard = (items: string[]) => {
    const groups = items.reduce<Array<{ title: string; items: string[] }>>((acc, item) => {
      const [rawTitle, detail] = item.split('|');
      const title = rawTitle?.trim();
      const body = detail?.trim();
      if (!title || !body) return acc;

      const existing = acc.find((group) => group.title === title);
      if (existing) {
        existing.items.push(body);
      } else {
        acc.push({ title, items: [body] });
      }
      return acc;
    }, []);

    return (
      <PenaltyProcedureBoard>
        {groups.map((group) => (
          <PenaltyProcedureLane key={group.title}>
            <PenaltyProcedureLaneTitle>{tx(group.title)}</PenaltyProcedureLaneTitle>
            <PenaltyProcedureSteps>
              {group.items.map((item) => {
                const { term, description } = splitDiagramItem(tx(item));
                return (
                  <PenaltyProcedureStep key={`${group.title}-${item}`}>
                    <PenaltyProcedureStepBody>
                      <PenaltyProcedureStepTitle>{term}</PenaltyProcedureStepTitle>
                      {description ? <PenaltyProcedureStepText>{description}</PenaltyProcedureStepText> : null}
                    </PenaltyProcedureStepBody>
                  </PenaltyProcedureStep>
                );
              })}
            </PenaltyProcedureSteps>
          </PenaltyProcedureLane>
        ))}
      </PenaltyProcedureBoard>
    );
  };

  const renderFeatureMatrix = (items: string[]) => (
    <PlatformFeatureMatrix>
      <FeatureMatrixHeader>
        <FeatureHeaderCell>{t('번호', 'No.')}</FeatureHeaderCell>
        <FeatureHeaderCell>{t('기능', 'Feature')}</FeatureHeaderCell>
        <FeatureHeaderCell>{t('관리 범위', 'Management Scope')}</FeatureHeaderCell>
      </FeatureMatrixHeader>
      {items.map((item, index) => {
        const { term, description } = splitDiagramItem(tx(item));
        return (
          <FeatureMatrixRow key={item}>
            <FeatureNumber>{String(index + 1).padStart(2, '0')}</FeatureNumber>
            <FeatureName>{term}</FeatureName>
            {description ? <FeatureDetail>{description}</FeatureDetail> : null}
          </FeatureMatrixRow>
        );
      })}
    </PlatformFeatureMatrix>
  );

  const renderImpactTable = (items: string[]) => {
    const parsedItems = items.map((item) => splitDiagramItem(tx(item)));

    return (
      <ImpactTable>
        {parsedItems.map(({ term, description }) => (
          <ImpactColumn key={term}>
            <ImpactHeaderCell key={term}>{term}</ImpactHeaderCell>
            <ImpactBodyCell key={`${term}-body`}>{description}</ImpactBodyCell>
          </ImpactColumn>
        ))}
      </ImpactTable>
    );
  };

  const renderStageDiagram = (items: string[]) => (
    <StageCards $columns={getBalancedDiagramColumns(items.length)} $titleRows={isTaxAppealPage || items.length > 5 ? 3 : 2}>
      {items.map((item, index) => {
        const { term, description } = splitDiagramItem(tx(item));
        const accent =
          isRefundPage
            ? palette.blue
            : isForeignExchangePage
              ? palette.blue
            : isAcvaPage
              ? palette.blue
            : isPenaltyInvestigationPage || isFtaPage || isTaxAppealPage || isLogisticsPage || isVietnamPage || isUsFdaPage
              ? palette.blue
              : vividAccents[index % vividAccents.length];
        return (
          <StageCard key={item} $accent={accent} $tone="plain">
            <StageCardTitle>{term}</StageCardTitle>
            {description ? <StageCardText>{description}</StageCardText> : null}
          </StageCard>
        );
      })}
    </StageCards>
  );

  const renderMetricDiagram = (items: string[], sectionHeading: string) => {
    const tone = isCustomsAuditPage || isVietnamPage ? 'plain' : 'dark';
    const accents = isCustomsAuditPage || isAcvaPage || isVietnamPage ? [palette.blue] : vividAccents;

    return (
      <MetricBoard $tone={tone}>
      <MetricBoardTitle $tone={tone}>
        <strong>{t(sectionHeading, sectionHeading)}</strong>
        <span>{t('핵심 효과를 리스크 완화와 운영 안정성 관점에서 정리했습니다.', 'Key effects organized by risk reduction and operational stability.')}</span>
      </MetricBoardTitle>
      <MetricGrid>
        {items.map((item, index) => {
          const { term, description } = splitDiagramItem(tx(item));
          return (
            <MetricItem key={item} $accent={accents[index % accents.length]} $tone={tone}>
              <MetricItemTitle $tone={tone}>{term}</MetricItemTitle>
              {description ? <MetricItemText $tone={tone}>{description}</MetricItemText> : null}
            </MetricItem>
          );
        })}
      </MetricGrid>
    </MetricBoard>
    );
  };

  const renderItemsDiagram = (items: string[], sectionHeading: string, isSteps = false) => {
    const kind = getDiagramKind(content.id, sectionHeading, isSteps);

    if (kind === 'circle') return renderCircleDiagram(items, sectionHeading);
    if (kind === 'stage') return renderStageDiagram(items);
    if (kind === 'metric') return renderMetricDiagram(items, sectionHeading);
    if (kind === 'split') return renderPenaltyProcedureBoard(items);
    if (kind === 'featureMatrix') return renderFeatureMatrix(items);
    if (kind === 'impactTable') return renderImpactTable(items);
    return renderProcessDiagram(items, sectionHeading);
  };

  const renderDiagramByKind = (items: string[], sectionHeading: string, kind: DiagramKind) => {
    if (kind === 'circle') return renderCircleDiagram(items, sectionHeading);
    if (kind === 'stage') return renderStageDiagram(items);
    if (kind === 'metric') return renderMetricDiagram(items, sectionHeading);
    if (kind === 'split') return renderPenaltyProcedureBoard(items);
    if (kind === 'featureMatrix') return renderFeatureMatrix(items);
    if (kind === 'impactTable') return renderImpactTable(items);
    return renderProcessDiagram(items, sectionHeading);
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

      {showServiceSubnav ? (
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
      ) : null}

      <EditorialSection $spacing="intro">
        <HeroStatement data-reveal>
          <IntroStack>
            <HeroHeading>
              <HeroEyebrow>{t('업무 분야', 'Service Detail')}</HeroEyebrow>
              <HeroTitle>{tx(content.title)}</HeroTitle>
            </HeroHeading>
            <OneLineSummary>{tx(content.subtitle ?? content.summary)}</OneLineSummary>
            <OverviewBlock>
              <OverviewTitle>{t('개요', 'Overview')}</OverviewTitle>
              <OverviewText>{tx(content.overview)}</OverviewText>
            </OverviewBlock>
          </IntroStack>
        </HeroStatement>
      </EditorialSection>

      <EditorialSection $spacing="detail">
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
            {primaryDetailSections?.map((section) => (
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
            {deferredDetailSections.map((section) => (
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
          </DocumentStack>
        </SectionInner>
      </EditorialSection>

      <EditorialSection>
        <SectionInner data-reveal>
          <SectionHead>
            <SectionLabel>Contact Point</SectionLabel>
            <EditorialTitle>{t('담당자', 'Contact Point')}</EditorialTitle>
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
                          <ContactPortraitFrame>
                            <ContactPortrait
                              src={member.image}
                              alt={tx(contact.name)}
                              loading="lazy"
                              $fit={member.imageFit}
                              $position={member.imagePosition}
                            />
                          </ContactPortraitFrame>
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
