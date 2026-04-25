import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  width: min(1240px, calc(100% - 56px));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100%, calc(100% - 28px));
  }
`;

export const PageSection = styled.section<{ tone?: 'base' | 'soft' | 'blue' }>`
  padding: clamp(66px, 8vw, 96px) 0;
  background: ${({ tone }) => {
    if (tone === 'soft') return '#f2f7ff';
    if (tone === 'blue') return '#e8f2ff';
    return '#f5f9ff';
  }};
  border-top: 1px solid rgba(17, 72, 149, 0.1);
`;

export const HeroSection = styled(PageSection)`
  padding-top: clamp(72px, 9vw, 112px);
  border-top: 0;
  background: linear-gradient(180deg, #eaf2ff 0%, #f2f7ff 56%, #f8fbff 100%);
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
  color: #14213a;
  font-size: clamp(2rem, 4vw, 3.45rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
`;

export const SectionTitle = styled.h2`
  margin: 10px 0 0;
  color: #123a75;
  font-size: clamp(1.76rem, 3.2vw, 2.65rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
`;

export const Lead = styled.p`
  margin: 16px 0 0;
  color: #445f86;
  font-size: 1rem;
  line-height: 1.7;
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
  min-height: 42px;
  padding: 0 16px;
  border-radius: 6px;
  border: 1px solid rgba(20, 78, 161, 0.26);
  color: #1b4d96;
  background: #eff6ff;
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
  padding: 22px;
  border-radius: 6px;
  border: 1px solid rgba(19, 75, 154, 0.18);
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(16, 53, 114, 0.06);
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
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.div`
  padding: 22px;
  border-radius: 6px;
  border: 1px solid rgba(19, 75, 154, 0.13);
  background: #ffffff;
`;
