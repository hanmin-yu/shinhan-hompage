import styled from '@emotion/styled';

import { palette } from '../home/homeStyles';
import * as P from './PagePrimitives';

export const Section = styled.section<{ $tone?: 'soft' | 'navy' }>`
  padding: clamp(78px, 9vw, 128px) 0;
  border-top: 1px solid ${({ $tone }) => ($tone === 'navy' ? 'rgba(226, 231, 238, 0.12)' : '#d8dee8')};
  background: ${({ $tone }) => {
    if ($tone === 'navy') {
      return 'linear-gradient(180deg, #0a1424 0%, #121f33 100%)';
    }
    if ($tone === 'soft') {
      return 'linear-gradient(180deg, #f5f6f8 0%, #fbfcfd 100%)';
    }
    return '#ffffff';
  }};
`;

export const Statement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 54px);
`;

export const TwoColumn = styled(P.PageContainer)`
  display: grid;
  grid-template-columns: minmax(0, 0.56fr) minmax(0, 0.44fr);
  gap: clamp(36px, 6vw, 88px);
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

export const Eyebrow = styled.span<{ $light?: boolean }>`
  display: block;
  margin: 0 0 10px 6px;
  color: ${({ $light }) => ($light ? 'rgba(221, 232, 247, 0.72)' : palette.blue)};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const Title = styled.h1<{ $light?: boolean }>`
  max-width: 1040px;
  margin: 0;
  color: ${({ $light }) => ($light ? '#ffffff' : palette.blue)};
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.04em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

export const SectionTitle = styled.h2<{ $light?: boolean }>`
  max-width: 900px;
  margin: 0;
  color: ${({ $light }) => ($light ? '#ffffff' : palette.blue)};
  font-size: clamp(1.72rem, 3vw, 2.82rem);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: -0.035em;
  text-wrap: balance;
`;

export const LeadGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(280px, 0.42fr);
  gap: clamp(28px, 5vw, 74px);
  align-items: end;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

export const Lead = styled.p<{ $light?: boolean }>`
  max-width: 760px;
  margin: 0;
  color: ${({ $light }) => ($light ? 'rgba(230, 238, 250, 0.84)' : '#4d5a6c')};
  font-size: clamp(1.04rem, 1.25vw, 1.16rem);
  line-height: 1.78;
`;

export const Body = styled.p<{ $light?: boolean }>`
  margin: 0;
  color: ${({ $light }) => ($light ? 'rgba(230, 238, 250, 0.82)' : '#4d5a6c')};
  font-size: clamp(1rem, 1.08vw, 1.06rem);
  line-height: 1.78;
`;

export const BodyStack = styled.div`
  display: grid;
  gap: 18px;
`;

export const Rule = styled.div<{ $light?: boolean }>`
  width: 100%;
  height: 1px;
  background: ${({ $light }) => ($light ? 'rgba(226, 231, 238, 0.18)' : '#d5dbe4')};
`;

export const FactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid #d5dbe4;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 252, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);
  overflow: hidden;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Fact = styled.div`
  position: relative;
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 136px;
  padding: 24px 24px 22px;
  border-right: 1px solid #dbe0e8;

  &::before {
    content: '';
    width: 34px;
    height: 3px;
    background: linear-gradient(90deg, #1d5fb6, #1aa398);
  }

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 640px) {
    min-height: auto;
    padding: 22px 20px;
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const FactValue = styled.strong`
  color: ${palette.blue};
  font-size: clamp(1.26rem, 1.7vw, 1.68rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  word-break: keep-all;
  overflow-wrap: normal;
`;

export const FactLabel = styled.span`
  color: #687385;
  font-size: 0.98rem;
  line-height: 1.58;
  word-break: keep-all;
  overflow-wrap: normal;
`;

export const LinePanel = styled.div`
  display: grid;
  gap: 14px;
  padding: 24px 0;
  border-top: 1px solid #d8dee8;
`;

export const LineGrid = styled.div<{ $columns?: 2 | 3 | 4 }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns = 3 }) => $columns}, minmax(0, 1fr));
  gap: clamp(20px, 3vw, 36px);

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
