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
  gap: 22px;
  padding: ${({ $compactBottom }) => ($compactBottom ? '22px 0 16px' : '34px 0 28px')};
  margin-bottom: ${({ $compactBottom }) => ($compactBottom ? '12px' : '36px')};
  border-bottom: 1px solid rgba(225, 238, 255, 0.22);
  color: #ffffff;

  @media (max-width: 980px) {
    gap: 18px;
    padding: ${({ $compactBottom }) => ($compactBottom ? '18px 0 14px' : '28px 0 22px')};
    margin-bottom: ${({ $compactBottom }) => ($compactBottom ? '16px' : '34px')};
  }

  @media (max-width: 640px) {
    gap: 14px;
    padding: ${({ $compactBottom }) => ($compactBottom ? '16px 0 12px' : '22px 0 18px')};
    margin-bottom: ${({ $compactBottom }) => ($compactBottom ? '14px' : '26px')};
  }
`;

const Intro = styled.div`
  display: grid;
  gap: 14px;
  max-width: 1080px;
  width: fit-content;
  padding: clamp(16px, 2.2vw, 24px);
  border-radius: 24px;
  border: 1px solid rgba(225, 238, 255, 0.16);
  background:
    radial-gradient(circle at 92% 0%, rgba(23, 159, 150, 0.12), transparent 28%),
    linear-gradient(135deg, rgba(7, 22, 54, 0.54), rgba(10, 43, 89, 0.22));
  box-shadow: 0 22px 48px rgba(3, 15, 34, 0.16);
  backdrop-filter: blur(10px);
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(232, 242, 255, 0.96);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-shadow: 0 12px 28px rgba(3, 15, 34, 0.34);

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, rgba(225, 238, 255, 0.74), rgba(23, 159, 150, 0.62));
  }
`;

const IntroTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.85rem, 8vw, 7.4rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.075em;
  text-shadow:
    0 20px 48px rgba(3, 15, 34, 0.48),
    0 2px 8px rgba(3, 15, 34, 0.28);

  @media (max-width: 640px) {
    font-size: clamp(2.36rem, 13vw, 4.4rem);
    line-height: 0.98;
  }
`;

const IntroSummary = styled.p`
  margin: 0;
  color: rgba(232, 242, 255, 0.9);
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.72;
  max-width: 820px;
  text-shadow: 0 14px 32px rgba(3, 15, 34, 0.34);
`;

const Tabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 100%;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid rgba(225, 238, 255, 0.24);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(22, 91, 176, 0.08));
  box-shadow: 0 18px 38px rgba(3, 15, 34, 0.14);
  backdrop-filter: blur(14px);
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
  min-height: 40px;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid rgba(225, 238, 255, 0.22);
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.86);
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
    box-shadow 0.18s ease,
    transform 0.18s ease;

  &[data-active='true'] {
    color: ${palette.blueInk};
    background: rgba(255, 255, 255, 0.92);
    border-color: rgba(225, 238, 255, 0.72);
    box-shadow:
      0 16px 30px rgba(3, 15, 34, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.72);
  }

  &:hover {
    color: #ffffff;
    border-color: rgba(225, 238, 255, 0.5);
    transform: translateY(-1px);
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
