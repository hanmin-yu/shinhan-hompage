import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';

export const NewsHeroSection = styled(P.HeroSection)`
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

export const NewsCompactHeroSection = styled(P.CompactHeroSection)`
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

export const NewsContentSection = styled(P.PageSection)`
  background: #ffffff;

  &::after {
    display: none;
  }
`;

export const NewsFlushPageSection = styled(P.CompactPageSection)`
  padding-top: clamp(20px, 2.6vw, 36px);
  background: #ffffff;

  &::after {
    display: none;
  }
`;
