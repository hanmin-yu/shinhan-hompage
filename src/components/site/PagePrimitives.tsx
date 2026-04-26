import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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
    if (tone === 'soft') return '#f3f7fc';
    if (tone === 'blue') return '#e7effa';
    return '#f8fbff';
  }};
  border-top: 1px solid rgba(17, 72, 149, 0.1);
`;

export const HeroSection = styled(PageSection)`
  padding-top: clamp(18px, 2.4vw, 32px);
  border-top: 0;
  background:
    radial-gradient(circle at 10% 14%, rgba(61, 117, 198, 0.1), transparent 28%),
    linear-gradient(180deg, #eef4fc 0%, #f5f8fc 54%, #fbfcfe 100%);
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
  border: 1px solid rgba(20, 74, 152, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(246, 250, 255, 0.98));
  box-shadow: 0 24px 46px rgba(17, 48, 101, 0.08);
`;

export const IntroVisualPanel = styled.div<{ image: string; overlay?: string; minHeight?: number }>`
  min-height: ${({ minHeight = 340 }) => `${minHeight}px`};
  border-radius: 22px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background:
    ${({ overlay = 'linear-gradient(180deg, rgba(8, 37, 81, 0.2), rgba(8, 37, 81, 0.06))' }) => overlay},
    ${({ image }) => `url(${image}) center / cover no-repeat`};
  box-shadow: 0 28px 52px rgba(16, 45, 92, 0.1);

  @media (max-width: 980px) {
    min-height: 260px;
  }
`;

export const HeroVisual = styled.div`
  min-height: 320px;
  border-radius: 12px;
  border: 1px solid rgba(23, 77, 153, 0.15);
  background: linear-gradient(138deg, #0f468f 0%, #1a5fbc 100%);
  box-shadow: 0 10px 24px rgba(15, 58, 128, 0.1);
`;

export const Kicker = styled.span`
  color: #1f5cb2;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 12px 0 0;
  color: #15253a;
  font-size: clamp(2.2rem, 4.4vw, 4.1rem);
  line-height: 1.03;
  letter-spacing: -0.05em;
`;

export const SectionTitle = styled.h2`
  margin: 10px 0 0;
  color: #123a75;
  font-size: clamp(1.86rem, 3.3vw, 2.8rem);
  line-height: 1.12;
  letter-spacing: -0.04em;
`;

export const Lead = styled.p`
  margin: 16px 0 0;
  color: #445f86;
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
  border: 1px solid rgba(19, 84, 180, 0.34);
  background: linear-gradient(180deg, #2567c2, #174d9a);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
`;

export const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 6px;
  border: 1px solid rgba(19, 84, 180, 0.24);
  background: #f6faff;
  color: #1a4f9a;
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
  border: 1px solid rgba(20, 78, 161, 0.18);
  color: #1b4d96;
  background: #f7faff;
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
  border: 1px solid rgba(19, 75, 154, 0.12);
  background: #ffffff;
  box-shadow: 0 18px 38px rgba(16, 53, 114, 0.06);
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: #123d79;
  font-size: 1.14rem;
  letter-spacing: -0.02em;
`;

export const CardText = styled.p`
  margin: 0;
  color: #486485;
  font-size: 0.93rem;
  line-height: 1.64;
`;

export const CardLink = styled(Link)`
  margin-top: auto;
  width: fit-content;
  color: #1a59b0;
  font-size: 0.9rem;
  font-weight: 700;
`;

export const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #50688a;
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
  border: 1px solid rgba(19, 75, 154, 0.12);
  background: #ffffff;
  box-shadow: 0 18px 38px rgba(16, 53, 114, 0.05);
`;

export const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0 0;
  background: linear-gradient(90deg, rgba(17, 72, 149, 0.2), rgba(17, 72, 149, 0));
`;

export const StatementBlock = styled.div`
  display: grid;
  gap: 16px;
  padding: clamp(22px, 2.5vw, 28px);
  border-radius: 18px;
  border: 1px solid rgba(18, 72, 149, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 250, 255, 1));
  box-shadow: 0 18px 36px rgba(15, 49, 106, 0.05);
`;

export const QuotePanel = styled(StatementBlock)`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(33, 97, 186, 0.08), transparent 32%);
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
