import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

import { palette } from '../home/homeStyles';
import { useI18n } from '../../i18n/useI18n';

export type LandingSubnavItem = {
  label: string;
  labelEn?: string;
  to: string;
  matchPrefixes?: string[];
};

type LandingSubnavProps = {
  kicker?: string;
  kickerEn?: string;
  title: string;
  titleEn: string;
  summary?: string;
  summaryEn?: string;
  items: LandingSubnavItem[];
  compactBottom?: boolean;
};

const Wrap = styled.section<{ $compactBottom?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: ${({ $compactBottom }) => ($compactBottom ? '14px' : '26px')};
  margin-bottom: ${({ $compactBottom }) => ($compactBottom ? '18px' : '42px')};
  border-bottom: 1px solid ${palette.lineSoft};

  @media (max-width: 980px) {
    gap: 18px;
    padding-bottom: ${({ $compactBottom }) => ($compactBottom ? '12px' : '22px')};
    margin-bottom: ${({ $compactBottom }) => ($compactBottom ? '16px' : '34px')};
  }

  @media (max-width: 640px) {
    gap: 14px;
    padding-bottom: ${({ $compactBottom }) => ($compactBottom ? '10px' : '18px')};
    margin-bottom: ${({ $compactBottom }) => ($compactBottom ? '14px' : '26px')};
  }
`;

const Intro = styled.div`
  display: grid;
  gap: 10px;
  max-width: 920px;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${palette.blue};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, rgba(33, 101, 193, 0.56), rgba(23, 159, 150, 0.34));
  }
`;

const IntroTitle = styled.h1`
  margin: 0;
  color: ${palette.textStrong};
  font-size: clamp(1.5rem, 2.8vw, 2.3rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
`;

const IntroSummary = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 0.95rem;
  line-height: 1.72;
  max-width: 760px;
`;

const Tabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 2px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: rgba(26, 86, 170, 0.44) transparent;

  @media (max-width: 980px) {
    gap: 8px;
    flex-wrap: nowrap;
  }

  @media (max-width: 640px) {
    gap: 7px;
  }
`;

const TabLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${palette.line};
  background: ${palette.chipBackground};
  color: ${palette.textMuted};
  font-family: 'Noto Sans KR', 'NanumSquare', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  position: relative;
  transition:
    color 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &[data-active='true'] {
    color: #ffffff;
    background: ${palette.chipBackgroundActive};
    border-color: rgba(214, 154, 54, 0.24);
    box-shadow: 0 12px 24px rgba(16, 52, 113, 0.14);
  }

  &:hover {
    color: ${palette.blueDeep};
    border-color: ${palette.lineStrong};
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.46);
    outline-offset: 2px;
    border-radius: 999px;
  }

  @media (max-width: 980px) {
    min-height: 36px;
    padding: 0 13px;
  }

  @media (max-width: 640px) {
    min-height: 34px;
    padding: 0 11px;
    font-size: 0.84rem;
  }
`;

export function LandingSubnav({
  kicker,
  kickerEn,
  title,
  titleEn,
  summary,
  summaryEn,
  items,
  compactBottom = false,
}: LandingSubnavProps) {
  const { t } = useI18n();
  const { pathname } = useLocation();

  const isActivePath = (item: LandingSubnavItem) => {
    if (pathname === item.to) {
      return true;
    }
    return (item.matchPrefixes ?? []).some((prefix) => pathname.startsWith(prefix));
  };

  return (
    <Wrap data-reveal $compactBottom={compactBottom}>
      <Intro>
        {kicker ? <Eyebrow>{t(kicker, kickerEn ?? kicker)}</Eyebrow> : null}
        <IntroTitle>{t(title, titleEn)}</IntroTitle>
        {summary ? <IntroSummary>{t(summary, summaryEn ?? summary)}</IntroSummary> : null}
      </Intro>
      <Tabs aria-label={t(`${title} 하위 메뉴`, `${titleEn} sub navigation`)}>
        {items.map((item) => (
          <TabLink key={item.to} to={item.to} data-active={isActivePath(item)}>
            {t(item.label, item.labelEn ?? item.label)}
          </TabLink>
        ))}
      </Tabs>
    </Wrap>
  );
}
