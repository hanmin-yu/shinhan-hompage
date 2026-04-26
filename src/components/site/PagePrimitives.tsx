import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { palette } from '../home/homeStyles';

export const PageContainer = styled.div`
  width: min(1320px, calc(100% - 28px));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100%, calc(100% - 18px));
  }
`;

export const PageSection = styled.section<{ tone?: 'base' | 'soft' | 'blue' }>`
  padding: clamp(74px, 8vw, 108px) 0;
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
`;

export const HeroSection = styled(PageSection)`
  padding-top: clamp(18px, 2.4vw, 32px);
  border-top: 0;
  background:
    radial-gradient(circle at 10% 14%, rgba(61, 117, 198, 0.16), transparent 28%),
    radial-gradient(circle at 88% 18%, rgba(23, 159, 150, 0.09), transparent 20%),
    linear-gradient(180deg, #ecf4ff 0%, #f4f8ff 54%, #fbfcff 100%);
`;

export const CompactHeroSection = styled(HeroSection)`
  padding-bottom: clamp(20px, 3vw, 34px);
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
  border-radius: 18px;
  border: 1px solid ${palette.line};
  background: ${palette.panelBackgroundStrong};
  box-shadow: 0 24px 46px ${palette.shadow};
`;

export const IntroVisualPanel = styled.div<{ image: string; overlay?: string; minHeight?: number }>`
  min-height: ${({ minHeight = 340 }) => `${minHeight}px`};
  border-radius: 22px;
  border: 1px solid ${palette.line};
  background:
    ${({ overlay = 'linear-gradient(180deg, rgba(8, 37, 81, 0.2), rgba(8, 37, 81, 0.06))' }) => overlay},
    ${({ image }) => `url(${image}) center / cover no-repeat`};
  box-shadow: 0 28px 52px ${palette.shadow};

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
  color: ${palette.blue};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 12px 0 0;
  color: ${palette.textStrong};
  font-size: clamp(2.2rem, 4.4vw, 4.1rem);
  font-weight: 800;
  line-height: 1.03;
  letter-spacing: -0.05em;
`;

export const SectionTitle = styled.h2`
  margin: 10px 0 0;
  color: ${palette.textPrimary};
  font-size: clamp(1.86rem, 3.3vw, 2.8rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.04em;
`;

export const Lead = styled.p`
  margin: 16px 0 0;
  color: ${palette.textBody};
  font-size: 1.02rem;
  line-height: 1.78;
  max-width: 720px;
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
  background: ${palette.panelBackgroundStrong};
  box-shadow: 0 18px 38px rgba(16, 53, 114, 0.08);
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: ${palette.textPrimary};
  font-size: 1.14rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const CardText = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 0.93rem;
  line-height: 1.64;
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
