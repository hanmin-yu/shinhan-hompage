import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

import { useI18n } from '../../i18n/useI18n';

export type LandingSubnavItem = {
  label: string;
  labelEn?: string;
  to: string;
  matchPrefixes?: string[];
  heroImage?: string;
  heroPosition?: string;
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
  matchAboutHero?: boolean;
};

const heroImagesByTitle: Record<string, { image: string; position: string }> = {
  '신한 소개': { image: '/hero/menu-about-shinhan-ai.png', position: 'center 50%' },
  'About Shinhan': { image: '/hero/menu-about-shinhan-ai.png', position: 'center 50%' },
  구성원: { image: '/hero/menu-members-executives-ai.png', position: 'center 50%' },
  Professionals: { image: '/hero/menu-members-executives-ai.png', position: 'center 50%' },
  업무분야: { image: '/hero/menu-services-ai.png', position: 'center 50%' },
  Services: { image: '/hero/menu-services-ai.png', position: 'center 50%' },
  IT: { image: '/hero/menu-it-ai.png', position: 'center 50%' },
  '소식/자료': { image: '/hero/menu-news-shinhan-ai.png', position: 'center 50%' },
  'News & Resources': { image: '/hero/menu-news-shinhan-ai.png', position: 'center 50%' },
};

const Wrap = styled.section<{ $compactBottom?: boolean; $matchAboutHero?: boolean }>`
  position: relative;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;
  margin-top: ${({ $compactBottom, $matchAboutHero }) => {
    if ($matchAboutHero) {
      return '0';
    }
    return $compactBottom ? 'calc(-1 * clamp(30px, 4vw, 52px))' : 'calc(-82px - clamp(34px, 5vw, 68px))';
  }};
  margin-bottom: 0;
  color: #121c2b;
  overflow: hidden;

  @media (max-width: 980px) {
    margin-bottom: 0;
  }

  @media (max-width: 640px) {
    margin-bottom: 0;
  }
`;

const VisualHero = styled.div<{ $image: string; $position: string }>`
  position: relative;
  isolation: isolate;
  min-height: clamp(260px, 31vw, 410px);
  display: grid;
  place-items: center;
  width: 100%;
  padding: calc(82px + 38px + clamp(18px, 3vw, 34px)) max(24px, env(safe-area-inset-left)) clamp(34px, 5vw, 56px);
  background: #d8e0e8;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background: ${({ $image, $position }) => `url(${$image}) ${$position} / cover no-repeat`};
    filter: brightness(1.34) contrast(0.94) saturate(1.06);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(232, 242, 255, 0.08) 48%, rgba(18, 64, 128, 0.16) 100%),
      linear-gradient(90deg, rgba(8, 32, 72, 0.16) 0%, rgba(8, 32, 72, 0.02) 48%, rgba(8, 32, 72, 0.06) 100%);
  }

  @media (max-width: 768px) {
    min-height: clamp(260px, 44vh, 380px);
    padding-top: calc(70px + clamp(26px, 6vw, 46px));
  }
`;

const Eyebrow = styled.span`
  display: none;
`;

const IntroTitle = styled.h1`
  position: relative;
  z-index: 1;
  max-width: min(100%, 920px);
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.54rem, 5vw, 4.9rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  text-align: center;
  text-shadow:
    0 14px 30px rgba(4, 12, 24, 0.24),
    0 2px 8px rgba(4, 12, 24, 0.22);

  @media (max-width: 640px) {
    font-size: clamp(2.2rem, 11vw, 3.8rem);
  }
`;

const IntroSummary = styled.p`
  display: none;
`;

const SubnavBand = styled.div`
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e4e7ec;
  overflow: hidden;
`;

const SubnavInner = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  width: calc(100% - 48px);
  max-width: none;
  min-height: 66px;
  margin: 0 auto;
  border-left: 1px solid #e4e7ec;
  border-right: 1px solid #e4e7ec;
  overflow: hidden;

  @media (max-width: 768px) {
    width: calc(100% - 28px);
    overflow-x: auto;
  }
`;

const HomeCell = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  flex: 0 0 66px;
  border-right: 1px solid #e4e7ec;
  color: #303844;

  &::before {
    content: '';
    width: 18px;
    height: 18px;
    background: currentColor;
    clip-path: polygon(50% 8%, 92% 42%, 82% 42%, 82% 90%, 60% 90%, 60% 62%, 40% 62%, 40% 90%, 18% 90%, 18% 42%, 8% 42%);
  }

  @media (max-width: 860px) {
    width: 56px;
    flex-basis: 56px;
  }
`;

const Tabs = styled.nav`
  display: flex;
  align-items: stretch;
  flex: 1;
  justify-content: flex-end;
  white-space: nowrap;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  padding: 0 clamp(18px, 2vw, 30px);
  border-right: 1px solid #e4e7ec;
  color: #4f5661;
  font-family: 'Noto Sans KR', 'NanumSquare', sans-serif;
  font-size: 1.12rem;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1;
  position: relative;
  transition: color 0.18s ease;

  &:first-of-type {
    border-left: 1px solid #e4e7ec;
  }

  &[data-active='true'] {
    color: #121c2b;
  }

  &[data-active='true']::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background: #121c2b;
  }

  &:hover {
    color: #121c2b;
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.46);
    outline-offset: 2px;
    border-radius: 999px;
  }

  @media (max-width: 980px) {
    min-height: 58px;
    min-width: 118px;
    padding: 0 18px;
  }

  @media (max-width: 640px) {
    min-height: 52px;
    padding: 0 18px;
    min-width: auto;
    font-size: 0.98rem;
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
  matchAboutHero = false,
}: LandingSubnavProps) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const baseHero = heroImagesByTitle[title] ?? heroImagesByTitle[titleEn] ?? heroImagesByTitle['신한 소개'];

  const isActivePath = (item: LandingSubnavItem) => {
    if (pathname === item.to) {
      return true;
    }
    return (item.matchPrefixes ?? []).some((prefix) => pathname.startsWith(prefix));
  };
  const activeItem = items.find(isActivePath);
  const hero = {
    image: activeItem?.heroImage ?? baseHero.image,
    position: activeItem?.heroPosition ?? baseHero.position,
  };
  const visualTitle = activeItem ? t(activeItem.label, activeItem.labelEn ?? activeItem.label) : t(title, titleEn);

  return (
    <Wrap data-reveal $compactBottom={compactBottom} $matchAboutHero={matchAboutHero}>
      <VisualHero $image={hero.image} $position={hero.position} data-title={title}>
        {kicker ? <Eyebrow>{t(kicker, kickerEn ?? kicker)}</Eyebrow> : null}
        <IntroTitle>{visualTitle}</IntroTitle>
        {summary ? <IntroSummary>{t(summary, summaryEn ?? summary)}</IntroSummary> : null}
      </VisualHero>
      <SubnavBand>
        <SubnavInner>
          <HomeCell to="/" aria-label={t('홈', 'Home')} />
          <Tabs aria-label={t(`${title} 하위 메뉴`, `${titleEn} sub navigation`)}>
            {items.map((item) => (
              <TabLink key={item.to} to={item.to} data-active={isActivePath(item)}>
                {t(item.label, item.labelEn ?? item.label)}
              </TabLink>
            ))}
          </Tabs>
        </SubnavInner>
      </SubnavBand>
    </Wrap>
  );
}
