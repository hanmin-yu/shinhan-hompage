import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { palette, wordSafeWrap } from '../home/homeStyles';

export const PageContainer = styled.div`
  width: calc(100% - 48px);
  max-width: none;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: calc(100% - 28px);
  }
`;

export const PageSection = styled.section<{ tone?: 'base' | 'soft' | 'blue' }>`
  position: relative;
  padding: clamp(74px, 8vw, 108px) 0;
  overflow: hidden;
  background: ${({ tone }) => {
    if (tone === 'soft') {
      return 'radial-gradient(circle at 86% 14%, rgba(23, 159, 150, 0.08), transparent 18%), linear-gradient(180deg, #f3f8ff 0%, #f7fbff 100%)';
    }
    if (tone === 'blue') {
      return 'radial-gradient(circle at 12% 18%, rgba(33, 101, 193, 0.12), transparent 20%), linear-gradient(180deg, #e7f1ff 0%, #f1f7ff 100%)';
    }
    return 'radial-gradient(circle at top right, rgba(214, 154, 54, 0.08), transparent 18%), linear-gradient(180deg, #f8fbff 0%, #fbfdff 100%)';
  }};
  border-top: 1px solid ${palette.lineSoft};

  > * {
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(
        110deg,
        transparent 0%,
        rgba(255, 255, 255, 0.58) calc(22% + (var(--scroll-progress) * 18%)),
        transparent calc(36% + (var(--scroll-progress) * 18%))
      );
    mix-blend-mode: screen;
    opacity: 0.42;
    transform: translate3d(calc((var(--viewport-progress) - 0.5) * 52px), 0, 0);
  }
`;

export const HeroSection = styled(PageSection)`
  margin-top: -82px;
  padding-top: calc(82px + clamp(34px, 5vw, 68px));
  padding-bottom: clamp(64px, 8vw, 112px);
  min-height: clamp(420px, 54vh, 680px);
  border-top: 0;
  color: #ffffff;
  --page-kicker-color: rgba(232, 242, 255, 0.96);
  --page-title-color: #ffffff;
  --page-heading-color: #ffffff;
  --page-lead-color: rgba(232, 242, 255, 0.9);
  --page-text-shadow: 0 18px 42px rgba(3, 15, 34, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(241, 247, 255, 0.82) 13%, rgba(154, 190, 231, 0.5) 27%, rgba(20, 69, 137, 0.5) 42%, rgba(8, 28, 64, 0.9) 100%),
    linear-gradient(115deg, rgba(255, 255, 255, 0.08) 0%, rgba(22, 91, 176, 0.22) 36%, rgba(8, 24, 54, 0.28) 72%),
    radial-gradient(circle at 82% 86%, rgba(23, 159, 150, 0.3), transparent 34%),
    radial-gradient(circle at 16% 12%, rgba(33, 101, 193, 0.34), transparent 30%),
    #102744;

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &::before {
    inset: -22% -12%;
    background:
      linear-gradient(105deg, transparent 16%, rgba(255, 255, 255, 0.2) 31%, transparent 46%),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.055) 0,
        rgba(255, 255, 255, 0.055) 1px,
        transparent 1px,
        transparent 118px
      );
    opacity: 0.58;
    transform: translate3d(calc(var(--viewport-progress) * 72px), calc(var(--viewport-progress) * -28px), 0)
      rotate(-4deg);
    animation: kineticSweep 8s ease-in-out infinite alternate;
  }

  &::after {
    right: -8vw;
    bottom: -12vw;
    width: min(58vw, 760px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(23, 159, 150, 0.28), rgba(33, 101, 193, 0.16) 42%, transparent 68%);
    transform: translate3d(0, calc(var(--viewport-progress) * -96px), 0);
    animation: glowPulse 8s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    margin-top: -70px;
    min-height: clamp(360px, 62vh, 560px);
    padding-top: calc(70px + clamp(26px, 6vw, 46px));
    padding-bottom: clamp(48px, 9vw, 72px);
  }

  @media (min-width: 769px) and (max-width: 1320px) {
    margin-top: -76px;
    padding-top: calc(76px + clamp(34px, 5vw, 68px));
  }
`;

export const CompactHeroSection = styled(HeroSection)`
  min-height: auto;
  padding-top: clamp(30px, 4vw, 52px);
  padding-bottom: clamp(28px, 4vw, 52px);
`;

export const CompactPageSection = styled(PageSection)`
  padding-top: clamp(30px, 4.2vw, 48px);
  border-top: 0;
`;

export const HeroGrid = styled(PageContainer)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 28px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const IntroBlock = styled(HeroGrid)`
  align-items: stretch;
  margin-top: 8px;

  @media (max-width: 980px) {
    margin-top: 0;
  }
`;

export const IntroPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  padding: clamp(26px, 3vw, 36px);
  border-radius: 26px;
  border: 1px solid rgba(225, 238, 255, 0.34);
  color: ${palette.textStrong};
  --page-kicker-color: ${palette.blue};
  --page-title-color: ${palette.textStrong};
  --page-heading-color: ${palette.textPrimary};
  --page-lead-color: ${palette.textBody};
  --page-text-shadow: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(241, 248, 255, 0.82)),
    radial-gradient(circle at 90% 0%, rgba(23, 159, 150, 0.16), transparent 30%);
  box-shadow: 0 28px 52px rgba(3, 15, 34, 0.2);
  backdrop-filter: blur(14px);
`;

export const IntroVisualPanel = styled.div<{ image: string; overlay?: string; minHeight?: number }>`
  min-height: ${({ minHeight = 340 }) => `${minHeight}px`};
  border-radius: 28px;
  border: 1px solid rgba(225, 238, 255, 0.3);
  background:
    ${({ overlay = 'linear-gradient(180deg, rgba(8, 37, 81, 0.18), rgba(8, 37, 81, 0.42))' }) => overlay},
    ${({ image }) => `url(${image}) center / cover no-repeat`};
  box-shadow: 0 28px 56px rgba(3, 15, 34, 0.22);

  @media (max-width: 980px) {
    min-height: 260px;
  }
`;

export const HeroVisual = styled.div`
  min-height: 320px;
  border-radius: 12px;
  border: 1px solid ${palette.line};
  background: linear-gradient(138deg, #1452a5 0%, #1f63bb 72%, #179f96 100%);
  box-shadow: 0 10px 24px ${palette.shadow};
`;

export const Kicker = styled.span`
  color: var(--page-kicker-color, ${palette.blue});
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-shadow: var(--page-text-shadow, none);
`;

export const Title = styled.h1`
  margin: 12px 0 0;
  color: var(--page-title-color, ${palette.textStrong});
  font-size: clamp(2.76rem, 5.6vw, 5.4rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.06em;
  text-shadow: var(--page-text-shadow, none);
  ${wordSafeWrap};
`;

export const SectionTitle = styled.h2`
  margin: 10px 0 0;
  color: var(--page-heading-color, ${palette.textPrimary});
  font-size: clamp(2.18rem, 3.9vw, 3.34rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.04em;
  text-shadow: var(--page-text-shadow, none);
  ${wordSafeWrap};
`;

export const Lead = styled.p`
  margin: 16px 0 0;
  color: var(--page-lead-color, ${palette.textBody});
  font-size: 1.02rem;
  line-height: 1.78;
  max-width: 720px;
  text-shadow: var(--page-text-shadow, none);
  ${wordSafeWrap};
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 6px;
  border: 1px solid rgba(214, 154, 54, 0.24);
  background:
    linear-gradient(135deg, rgba(214, 154, 54, 0.18), rgba(214, 154, 54, 0) 30%),
    linear-gradient(180deg, #2a72d2, #174d9a);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
  box-shadow: 0 16px 28px rgba(24, 74, 149, 0.18);
`;

export const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 6px;
  border: 1px solid ${palette.line};
  background: ${palette.panelBackground};
  color: ${palette.blueDeep};
  font-size: 0.92rem;
  font-weight: 700;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 26px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeadLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 15px;
  border-radius: 999px;
  border: 1px solid ${palette.line};
  color: ${palette.blueDeep};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 248, 255, 0.95));
  font-size: 0.9rem;
  font-weight: 700;
`;

export const Grid = styled.div<{ columns?: 1 | 2 | 3 | 4 }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 3 }) => columns}, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid ${palette.line};
  color: ${palette.textStrong};
  --page-kicker-color: ${palette.blue};
  --page-title-color: ${palette.textStrong};
  --page-heading-color: ${palette.textPrimary};
  --page-lead-color: ${palette.textBody};
  --page-text-shadow: none;
  background: ${palette.panelBackgroundStrong};
  box-shadow: 0 18px 38px rgba(16, 53, 114, 0.08);
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: ${palette.textPrimary};
  font-size: 1.14rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  ${wordSafeWrap};
`;

export const CardText = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 0.93rem;
  line-height: 1.64;
  ${wordSafeWrap};
`;

export const CardLink = styled(Link)`
  margin-top: auto;
  width: fit-content;
  color: ${palette.blue};
  font-size: 0.9rem;
  font-weight: 700;
`;

export const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${palette.textBody};
  font-size: 0.94rem;
  line-height: 1.68;
  ${wordSafeWrap};
`;

export const SplitGrid = styled(PageContainer)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 22px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.div`
  padding: 24px;
  border-radius: 16px;
  border: 1px solid ${palette.line};
  color: ${palette.textStrong};
  --page-kicker-color: ${palette.blue};
  --page-title-color: ${palette.textStrong};
  --page-heading-color: ${palette.textPrimary};
  --page-lead-color: ${palette.textBody};
  --page-text-shadow: none;
  background: ${palette.panelBackgroundStrong};
  box-shadow: 0 18px 38px rgba(16, 53, 114, 0.07);
`;

export const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0 0;
  background: linear-gradient(90deg, rgba(33, 101, 193, 0.28), rgba(23, 159, 150, 0.12), rgba(17, 72, 149, 0));
`;

export const StatementBlock = styled.div`
  display: grid;
  gap: 16px;
  padding: clamp(22px, 2.5vw, 28px);
  border-radius: 18px;
  border: 1px solid ${palette.line};
  color: ${palette.textStrong};
  --page-kicker-color: ${palette.blue};
  --page-title-color: ${palette.textStrong};
  --page-heading-color: ${palette.textPrimary};
  --page-lead-color: ${palette.textBody};
  --page-text-shadow: none;
  background: ${palette.panelBackgroundStrong};
  box-shadow: 0 18px 36px rgba(15, 49, 106, 0.07);
`;

export const QuotePanel = styled(StatementBlock)`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top right, rgba(33, 97, 186, 0.12), transparent 32%),
      radial-gradient(circle at 18% 76%, rgba(214, 154, 54, 0.08), transparent 16%);
    pointer-events: none;
  }
`;

export const MilestoneBand = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;
