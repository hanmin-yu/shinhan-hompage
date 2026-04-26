import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

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
};

const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 26px;
  margin-bottom: 42px;
  border-bottom: 1px solid rgba(16, 58, 126, 0.12);

  @media (max-width: 980px) {
    gap: 18px;
    padding-bottom: 22px;
    margin-bottom: 34px;
  }

  @media (max-width: 640px) {
    gap: 14px;
    padding-bottom: 18px;
    margin-bottom: 26px;
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
  color: #1d5cb2;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: rgba(28, 92, 179, 0.42);
  }
`;

const IntroTitle = styled.h1`
  margin: 0;
  color: #13263f;
  font-size: clamp(1.5rem, 2.8vw, 2.3rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
`;

const IntroSummary = styled.p`
  margin: 0;
  color: #526a8c;
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
  scrollbar-color: rgba(26, 86, 170, 0.36) transparent;

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
  border: 1px solid rgba(21, 78, 161, 0.16);
  background: rgba(246, 250, 255, 0.88);
  color: #577090;
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
    color: #123c79;
    background: #ffffff;
    border-color: rgba(19, 75, 154, 0.3);
    box-shadow: 0 10px 20px rgba(16, 52, 113, 0.08);
  }

  &:hover {
    color: #184b92;
    border-color: rgba(19, 75, 154, 0.28);
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.4);
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

export function LandingSubnav({ kicker, kickerEn, title, titleEn, summary, summaryEn, items }: LandingSubnavProps) {
  const { t } = useI18n();
  const { pathname } = useLocation();

  const isActivePath = (item: LandingSubnavItem) => {
    if (pathname === item.to) {
      return true;
    }
    return (item.matchPrefixes ?? []).some((prefix) => pathname.startsWith(prefix));
  };

  return (
    <Wrap data-reveal>
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
