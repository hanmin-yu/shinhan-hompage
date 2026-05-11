import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

import type { SectionSubnavConfig, SectionSubnavItem } from '../../config/sectionSubnav';
import { useI18n } from '../../i18n/useI18n';
import * as P from './PagePrimitives';

type EditorialPageHeaderProps = {
  config: SectionSubnavConfig;
  title?: string;
  titleEn?: string;
  heroImage?: string;
  heroPosition?: string;
};

const VisualHero = styled(P.HeroSection)<{ $image: string; $position: string }>`
  position: relative;
  isolation: isolate;
  margin-top: 0;
  min-height: clamp(430px, 52vh, 620px);
  display: grid;
  place-items: center;
  overflow: hidden;
  padding-top: calc(82px + 38px + clamp(18px, 3vw, 34px));
  padding-bottom: clamp(54px, 7vw, 86px);
  background: #d8e0e8;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background: ${({ $image, $position }) => `url(${$image}) ${$position} / cover no-repeat`};
    filter: brightness(1.34) contrast(0.94) saturate(1.06);
    opacity: 1;
    transform: none;
    animation: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    width: auto;
    aspect-ratio: auto;
    border-radius: 0;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(232, 242, 255, 0.08) 48%, rgba(18, 64, 128, 0.16) 100%),
      linear-gradient(90deg, rgba(8, 32, 72, 0.16) 0%, rgba(8, 32, 72, 0.02) 48%, rgba(8, 32, 72, 0.06) 100%);
    opacity: 1;
    transform: none;
    animation: none;
  }

  @media (max-width: 768px) {
    margin-top: 0;
    min-height: clamp(340px, 50vh, 480px);
    padding-top: clamp(44px, 8vw, 70px);
  }
`;

const VisualTitle = styled.h1`
  position: relative;
  z-index: 1;
  max-width: calc(100% - 48px);
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.28rem, 4.95vw, 4.55rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: 0;
  text-align: center;
  text-shadow:
    0 14px 30px rgba(4, 12, 24, 0.24),
    0 2px 8px rgba(4, 12, 24, 0.22);
`;

const SubnavBand = styled.section`
  background: #ffffff;
  border-bottom: 1px solid #e4e7ec;
  overflow: hidden;

  @media (max-width: 760px) {
    background: #f7f9fc;
  }
`;

const SubnavInner = styled(P.PageContainer)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 66px;
  border-left: 1px solid #e4e7ec;
  border-right: 1px solid #e4e7ec;
  overflow: hidden;

  @media (max-width: 760px) {
    min-height: 48px;
    padding: 8px 14px;
    border-left: 0;
    border-right: 0;
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

  @media (max-width: 760px) {
    width: 38px;
    height: 34px;
    flex-basis: 38px;
    border: 1px solid #d9e0eb;
    border-radius: 999px;
    background: #ffffff;

    &::before {
      width: 15px;
      height: 15px;
    }
  }
`;

const SectionNav = styled.nav`
  display: flex;
  align-items: stretch;
  flex: 1;
  justify-content: flex-end;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 760px) {
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-left: 8px;
  }
`;

const SectionNavLink = styled(Link)`
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  padding: 0 clamp(18px, 2vw, 30px);
  border-right: 1px solid #e4e7ec;
  color: #4f5661;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0;
  white-space: nowrap;
  word-break: keep-all;

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

  @media (max-width: 760px) {
    min-height: 34px;
    min-width: 0;
    padding: 0 14px;
    border: 1px solid #d9e0eb;
    border-radius: 999px;
    background: #ffffff;
    color: #526071;
    font-size: 0.82rem;
    font-weight: 800;

    &:first-of-type {
      border-left: 1px solid #d9e0eb;
    }

    &[data-active='true'] {
      background: #123f85;
      border-color: #123f85;
      color: #ffffff;
      box-shadow: 0 8px 16px rgba(18, 63, 133, 0.16);
    }

    &[data-active='true']::after {
      content: none;
    }
  }
`;

function isActiveItem(pathname: string, item: SectionSubnavItem) {
  return pathname === item.to || Boolean(item.matchPrefixes?.some((prefix) => pathname.startsWith(prefix)));
}

function findActiveItem(pathname: string, items: SectionSubnavItem[]) {
  return items.find((item) => pathname === item.to) ?? items.find((item) => isActiveItem(pathname, item));
}

export function EditorialPageHeader({
  config,
  title,
  titleEn,
  heroImage = '/hero/homepage/office-tower-clear-sky.jpg',
  heroPosition = 'center 42%',
}: EditorialPageHeaderProps) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const activeItem = findActiveItem(pathname, config.items);

  return (
    <>
      <VisualHero $image={heroImage} $position={heroPosition}>
        <VisualTitle data-reveal>{t(title ?? config.title, titleEn ?? config.titleEn)}</VisualTitle>
      </VisualHero>

      <SubnavBand>
        <SubnavInner>
          <HomeCell to="/" aria-label={t('홈', 'Home')} />
          <SectionNav aria-label={t(`${config.title} 하위 메뉴`, `${config.titleEn} sub navigation`)}>
            {config.items.map((item) => (
              <SectionNavLink key={item.to} to={item.to} data-active={item === activeItem}>
                {t(item.label, item.labelEn)}
              </SectionNavLink>
            ))}
          </SectionNav>
        </SubnavInner>
      </SubnavBand>
    </>
  );
}
