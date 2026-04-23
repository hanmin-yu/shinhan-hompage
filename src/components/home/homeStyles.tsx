import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import type { FontMode } from '../../types/site';

export const GlobalStyle = ({ fontMode }: { fontMode: FontMode }) => (
  <Global
    styles={css`
      @import url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap');

      :root {
        color-scheme: light;
        background-color: #ffffff;
        color: #111111;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        min-width: 320px;
        min-height: 100vh;
        background-color: #ffffff;
        overflow-x: hidden;
        font-family: ${fontMode === 'nanum'
          ? '"NanumSquare", "Noto Sans KR", sans-serif'
          : '"Noto Sans KR", "Apple SD Gothic Neo", sans-serif'};
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        font: inherit;
      }

      [data-reveal] {
        opacity: 0;
        transform: translateY(34px) scale(0.985);
        transition:
          opacity 0.7s ease,
          transform 0.7s ease;
      }

      [data-reveal].is-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    `}
  />
);

export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f4f7fc 0%, #f8fbff 24%, #ffffff 100%);
  color: #111111;
`;

export const Container = styled.div`
  width: min(1240px, calc(100% - 56px));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100%, calc(100% - 28px));
  }
`;

export const UtilityBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 26;
  background: #143f83;
  border-bottom: 1px solid rgba(223, 234, 250, 0.28);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UtilityBarInner = styled.div`
  position: relative;
`;

export const UtilityInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 40px;
`;

export const UtilityBrandBadge = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.96);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  white-space: nowrap;
`;

export const UtilityBrandLead = styled.span`
  color: rgba(255, 255, 255, 0.72);
  font-style: italic;
`;

export const UtilityBrandName = styled.span`
  font-size: 1.05rem;
  font-weight: 700;
`;

export const UtilityLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0;
`;

export const UtilityLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    right: 0;
    width: 1px;
    height: 12px;
    background: rgba(255, 255, 255, 0.34);
  }
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 25;
  background: rgba(243, 248, 255, 0.96);
  border-bottom: 1px solid rgba(20, 75, 157, 0.12);
  box-shadow: 0 8px 18px rgba(16, 48, 104, 0.07);
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    top: 0;
    background: rgba(243, 248, 255, 0.98);
    border-bottom: 1px solid rgba(20, 75, 157, 0.12);
  }
`;

export const HeaderInner = styled(Container)`
  width: min(1680px, calc(100% - 56px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  min-height: 88px;

  @media (max-width: 1200px) {
    width: min(100%, calc(100% - 28px));
    gap: 14px;
  }

  @media (max-width: 1024px) {
    min-height: 76px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const MenuArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 1 auto;
  min-height: 88px;
  min-width: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 0 0 auto;
`;

export const BrandMark = styled.div`
  width: 54px;
  height: 54px;
  border: 1px solid rgba(17, 78, 168, 0.18);
  border-radius: 12px;
  background: linear-gradient(180deg, #1661c6, #0f4ca5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(17, 78, 168, 0.18);
  overflow: hidden;

  @media (max-width: 768px) {
    border-color: rgba(17, 78, 168, 0.18);
    background: linear-gradient(180deg, #1661c6, #0f4ca5);
    color: #ffffff;
  }
`;

export const BrandMarkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const BrandLogo = styled.svg`
  width: 34px;
  height: 34px;
  overflow: visible;
`;

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 1100px) {
    gap: 2px;
  }
`;

export const BrandTitle = styled.strong`
  font-size: 1.85rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: #103c83;

  @media (max-width: 1100px) {
    font-size: 1.6rem;
  }
`;

export const BrandSub = styled.span`
  color: #4e617e;
  font-size: 1rem;

  @media (max-width: 1100px) {
    font-size: 0.92rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  font-size: 1rem;
  color: #153c7b;
  white-space: nowrap;

  @media (max-width: 1200px) {
    gap: 6px;
    font-size: 0.95rem;
  }

  @media (max-width: 980px) {
    gap: 4px;
  }
`;

export const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88px;

  &:hover .nav-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    min-height: 76px;
  }
`;

export const NavLink = styled.a<{ hasChildren?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 88px;
  padding: 0 12px;
  position: relative;
  color: #153c7b;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  white-space: nowrap;
  word-break: keep-all;
  transition: color 0.18s ease;

  @media (max-width: 1200px) {
    gap: 6px;
    padding: 0 9px;
    font-size: 0.93rem;
  }

  @media (max-width: 1024px) {
    min-height: 76px;
    padding: 0 6px;
    font-size: 0.9rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 18px;
    height: 2px;
    border-radius: 999px;
    background: #1e62bf;
    transform: scaleX(0.35);
    transform-origin: center;
    opacity: 0;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  ${({ hasChildren }) =>
    hasChildren
      ? `
    &::after {
      content: '';
      width: 8px;
      height: 8px;
      margin-top: -2px;
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform: rotate(45deg);
      opacity: 0.65;
    }
  `
      : ''}

  &:hover {
    color: #1b5bb2;
  }

  &:hover::before {
    transform: scaleX(1);
    opacity: 1;
  }
`;

export const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  width: max-content;
  min-width: 210px;
  max-width: 420px;
  transform: translateX(-50%) translateY(8px);
  padding: 12px 0 10px;
  border-radius: 0 0 10px 10px;
  background: rgba(247, 251, 255, 0.98);
  border: 1px solid rgba(20, 75, 157, 0.16);
  border-top: 0;
  box-shadow: 0 14px 28px rgba(16, 32, 68, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s ease;
  z-index: 5;
`;

export const NavDropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavDropdownLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0 22px;
  color: #4f6688;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: normal;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    color: #1e5db5;
    background: rgba(209, 225, 246, 0.34);
  }
`;

export const NavDropdownGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 0;

  &:not(:first-of-type) {
    border-top: 1px solid rgba(17, 78, 168, 0.09);
    margin-top: 2px;
    padding-top: 10px;
  }
`;

export const NavDropdownGroupTitle = styled.span`
  display: block;
  padding: 0 22px;
  color: #1c4d93;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const NavDropdownGroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NavDropdownSubLink = styled(NavDropdownLink)`
  min-height: 34px;
  padding-left: 28px;
  font-size: 0.9rem;
  color: #637593;
`;

export const HeaderTools = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const HeaderUtilityLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0;

  @media (max-width: 1560px) {
    display: none;
  }
`;

export const HeaderUtilityLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  color: #3f5577;
  font-size: 0.86rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  white-space: nowrap;
  word-break: keep-all;
  transition: color 0.18s ease;

  &:hover {
    color: #1d56a8;
  }

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 1px;
    height: 12px;
    transform: translateY(-50%);
    background: rgba(58, 82, 118, 0.26);
  }
`;

export const HeaderIconButton = styled.button<{ kind: 'pin' | 'menu' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(22, 72, 147, 0.18);
  border-radius: 6px;
  background: #f7fbff;
  color: #284f8f;
  cursor: pointer;
  position: relative;
  flex: 0 0 auto;

  @media (max-width: 980px) {
    display: none;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
  }

  ${({ kind }) =>
    kind === 'pin'
      ? `
    &::before {
      width: 10px;
      height: 10px;
      border: 1.8px solid currentColor;
      border-radius: 50%;
      top: 8px;
    }

    &::after {
      width: 2px;
      height: 11px;
      background: currentColor;
      bottom: 7px;
      border-radius: 999px;
      clip-path: polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%);
    }
  `
      : `
    &::before {
      width: 14px;
      height: 2px;
      background: currentColor;
      top: 10px;
      box-shadow: 0 6px 0 currentColor, 0 12px 0 currentColor;
      border-radius: 999px;
    }
  `}
`;

export const FontModeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 7px;
  border: 1px solid rgba(17, 78, 168, 0.16);
  color: #1b3f77;
  background: #f8fbff;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: rgba(17, 78, 168, 0.08);
    border-color: rgba(17, 78, 168, 0.3);
  }

  @media (max-width: 1460px) {
    display: none;
  }
`;

export const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid rgba(17, 78, 168, 0.16);
  border-radius: 8px;
  color: #ffffff;
  background: #1f5cb8;
  box-shadow: 0 10px 20px rgba(16, 84, 177, 0.16);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.03em;

  @media (max-width: 1520px) {
    min-height: 42px;
    padding: 0 14px;
    font-size: 0.86rem;
  }

  @media (max-width: 1360px) {
    display: none;
  }

  @media (max-width: 768px) {
    min-height: 38px;
    padding: 0 14px;
    font-size: 0.88rem;
    display: inline-flex;
  }
`;

export const MobileIconButton = styled.button<{ kind: 'search' | 'menu' }>`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid rgba(23, 59, 132, 0.12);
    border-radius: 50%;
    background: #ffffff;
    position: relative;
    color: #173b84;
    cursor: pointer;
    flex: 0 0 auto;

    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
    }

    ${({ kind }) =>
      kind === 'search'
        ? `
      &::before {
        width: 12px;
        height: 12px;
        border: 2px solid currentColor;
        border-radius: 50%;
        transform: translate(-2px, -2px);
      }

      &::after {
        width: 9px;
        height: 2px;
        background: currentColor;
        transform: translate(7px, 7px) rotate(45deg);
        border-radius: 999px;
      }
    `
        : `
      &::before {
        width: 16px;
        height: 2px;
        background: currentColor;
        border-radius: 999px;
        top: 12px;
        box-shadow: 0 6px 0 currentColor, 0 12px 0 currentColor;
      }
    `}
  }
`;

export const MobileMenuOverlay = styled.div<{ open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.52);
    opacity: ${({ open }) => (open ? 1 : 0)};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
    transition:
      opacity 0.22s ease,
      visibility 0.22s ease;
    z-index: 40;
  }
`;

export const MobileMenuPanel = styled.aside<{ open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    width: min(88vw, 360px);
    height: 100vh;
    padding: 28px 22px 32px;
    flex-direction: column;
    gap: 22px;
    background: rgba(39, 43, 48, 0.96);
    color: #ffffff;
    transform: translateX(${({ open }) => (open ? '0' : '100%')});
    transition: transform 0.24s ease;
    z-index: 41;
    overflow-y: auto;
  }
`;

export const MobileMenuTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const MobileMenuTitle = styled.strong`
  font-size: 1.2rem;
  letter-spacing: -0.02em;
`;

export const MobileMenuClose = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 50%;
  background: transparent;
  color: #ffffff;
  position: relative;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16px;
    height: 2px;
    background: currentColor;
    border-radius: 999px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const MobileMenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
`;

export const MobileMenuMainLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 40px;
  font-size: 1.1rem;
  font-weight: 800;
`;

export const MobileMenuSubLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 34px;
  color: rgba(255, 255, 255, 0.74);
  font-size: 0.96rem;

  &[data-depth='1'] {
    padding-left: 14px;
    font-size: 0.9rem;
  }
`;

export const MobileMenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
`;

export const MobileMenuGroupTitle = styled.span`
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-left: 2px;
`;

export const MobileMenuQuickRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

export const MobileMenuQuickLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.92rem;
  font-weight: 700;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.section`
  padding: 0;
  margin-top: -136px;

  @media (max-width: 768px) {
    margin-top: -82px;
  }
`;

export const HeroFrame = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const HeroBanner = styled.div`
  min-height: clamp(760px, 100vh, 960px);
  padding: 182px 0 98px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 84% 20%, rgba(63, 132, 228, 0.22), transparent 30%),
    radial-gradient(circle at 12% 80%, rgba(29, 69, 139, 0.24), transparent 28%),
    linear-gradient(180deg, #050d1d 0%, #0a1730 48%, #0d223f 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(6, 18, 38, 0.24), rgba(10, 30, 58, 0.08) 28%, rgba(6, 18, 36, 0.28) 100%);
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 1120px) {
    min-height: clamp(700px, 94vh, 860px);
    padding: 162px 0 86px;
  }

  @media (max-width: 768px) {
    min-height: min(820px, calc(100vh - 8px));
    padding: 132px 0 72px;
  }

  @media (max-height: 920px) and (min-width: 769px) {
    min-height: clamp(620px, 76vh, 700px);
    padding: 150px 24px 64px;
  }

  @media (max-height: 820px) and (min-width: 769px) {
    min-height: clamp(580px, 74vh, 660px);
    padding: 138px 24px 54px;
  }
`;

export const HeroGlow = styled.div`
  display: none;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: left;
  color: #ffffff;
`;

export const HeroCanvas = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(24px, 4vw, 72px);
  align-items: center;
  position: relative;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
    gap: 36px;
    justify-items: center;
  }
`;

export const HeroContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 620px;
  align-items: flex-start;
  padding: 0;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;

  @media (max-width: 1120px) {
    align-items: center;
    text-align: center;
    max-width: 760px;
  }
`;

export const HeroBackdropLayer = styled.img<{
  active: boolean;
  objectPosition?: string;
  mobileObjectPosition?: string;
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ objectPosition }) => objectPosition ?? 'center'};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: ${({ active }) => (active ? 'scale(1.03)' : 'scale(1.07)')};
  transition:
    opacity 1.2s ease,
    transform 2.4s ease,
    filter 0.8s ease;
  filter: saturate(0.75) contrast(1.04) brightness(0.28) blur(8px);
  z-index: 0;

  @media (max-width: 768px) {
    object-position: ${({ mobileObjectPosition, objectPosition }) => mobileObjectPosition ?? objectPosition ?? 'center'};
  }
`;

export const HeroVisualStage = styled.div<{ $progress: number }>`
  position: relative;
  width: min(760px, 92vw);
  height: min(640px, 66vh);
  min-height: 420px;
  pointer-events: none;
  z-index: 0;
  transform: translateY(${({ $progress }) => `${$progress * -22}px`});
  transition: transform 0.18s linear;

  @media (max-width: 1120px) {
    width: min(600px, 92vw);
    height: min(560px, 58vh);
  }

  @media (max-width: 768px) {
    width: min(520px, 94vw);
    min-height: 360px;
    height: min(520px, 56vh);
  }
`;

export const HeroBackgroundLayer = styled.img<{
  active: boolean;
  objectPosition?: string;
  mobileObjectPosition?: string;
}>`
  position: absolute;
  right: 0;
  top: 6%;
  width: min(520px, 72vw);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  object-position: ${({ objectPosition }) => objectPosition ?? 'center'};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: ${({ active }) => (active ? 'scale(1)' : 'scale(1.06)')};
  transition:
    opacity 0.9s ease,
    transform 2.2s ease;
  z-index: 1;
  border: 1px solid rgba(225, 237, 255, 0.46);
  box-shadow:
    0 24px 64px rgba(6, 16, 32, 0.46),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  filter: saturate(1.04) contrast(1.02) brightness(0.98);

  @media (max-width: 1120px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%) scale(${({ active }) => (active ? 1 : 1.06)});
  }

  @media (max-width: 768px) {
    width: min(360px, 76vw);
    top: 8%;
    object-position: ${({ mobileObjectPosition, objectPosition }) => mobileObjectPosition ?? objectPosition ?? 'center'};
  }
`;

export const HeroMinorCircle = styled.div<{ $variant: 'upper' | 'lower'; $offset: number }>`
  position: absolute;
  width: ${({ $variant }) => ($variant === 'upper' ? '210px' : '164px')};
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(214, 231, 255, 0.38);
  box-shadow: 0 16px 36px rgba(9, 18, 34, 0.32);
  transform: ${({ $variant, $offset }) =>
    $variant === 'upper' ? `translateY(${16 - $offset}px)` : `translateY(${8 + $offset}px)`};
  transition: transform 0.18s linear;

  ${({ $variant }) =>
    $variant === 'upper'
      ? `
    right: 410px;
    top: 2%;
  `
      : `
    right: 40px;
    bottom: 4%;
  `}

  @media (max-width: 1120px) {
    ${({ $variant }) =>
      $variant === 'upper'
        ? `
      left: 12%;
      right: auto;
      top: 2%;
    `
        : `
      right: 8%;
      bottom: 0;
    `}
  }

  @media (max-width: 768px) {
    width: ${({ $variant }) => ($variant === 'upper' ? '120px' : '96px')};
  }
`;

export const HeroMinorCircleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HeroKicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: rgba(209, 226, 252, 0.88);
  font-size: 0.98rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 46px;
    height: 1px;
    background: rgba(204, 223, 251, 0.54);
  }
`;

export const HeroActiveTag = styled.div`
  position: absolute;
  left: 18px;
  bottom: 16px;
  z-index: 2;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(6, 17, 34, 0.62);
  border: 1px solid rgba(180, 205, 238, 0.28);
  color: rgba(244, 249, 255, 0.96);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.74rem;
    padding: 8px 11px;
  }
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-family: "Times New Roman", Georgia, serif;
  font-size: clamp(2.9rem, 5.2vw, 5.2rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-shadow:
    0 14px 34px rgba(3, 14, 32, 0.48),
    0 2px 10px rgba(3, 14, 32, 0.34);

  @media (max-width: 768px) {
    font-size: clamp(2.16rem, 9vw, 3.18rem);
  }
`;

export const HeroBody = styled.p`
  margin: 0;
  max-width: 620px;
  font-size: 0.98rem;
  line-height: 1.64;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 6px 22px rgba(3, 14, 32, 0.34);
`;

export const HeroSearch = styled.div`
  width: min(620px, calc(100vw - 60px));
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 26px 0 30px;
  background: rgba(8, 27, 52, 0.66);
  border: 1px solid rgba(220, 236, 255, 0.26);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: none;
  box-shadow: 0 18px 36px rgba(6, 18, 36, 0.18);

  @media (max-width: 900px) {
    width: 100%;
    min-height: 62px;
    padding: 0 18px;
    gap: 16px;
  }
`;

export const HeroSearchText = styled.span`
  font-size: clamp(0.92rem, 1.15vw, 1.04rem);
  line-height: 1.45;
  text-align: left;
  color: rgba(255, 255, 255, 0.96);
  text-shadow: 0 2px 10px rgba(4, 18, 38, 0.22);

  @media (max-width: 768px) {
    font-size: 0.92rem;
    line-height: 1.5;
  }
`;

export const HeroSearchIcon = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 50%;
  position: relative;
  flex: 0 0 auto;
  background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 10px 18px rgba(3, 14, 32, 0.16);

  &::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 2.5px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 999px;
    right: 8px;
    bottom: 10px;
    transform: rotate(45deg);
    transform-origin: center;
  }

  &::before {
    content: '';
    position: absolute;
    left: 13px;
    top: 12px;
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.96);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 1px;

    &::after {
      width: 12px;
      height: 2px;
      right: 6px;
      bottom: 8px;
    }

    &::before {
      left: 10px;
      top: 9px;
      width: 14px;
      height: 14px;
      border-width: 2px;
    }
  }

`;

export const ScrollHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.06em;
  position: relative;
  margin-top: -46px;
  z-index: 3;
  font-size: 0.9rem;

  &::before {
    content: '';
    width: 11px;
    height: 11px;
    border-right: 2px solid rgba(255, 255, 255, 0.92);
    border-bottom: 2px solid rgba(255, 255, 255, 0.92);
    position: absolute;
    transform: rotate(45deg);
    top: -12px;
  }
`;

export const QuickMenu = styled.aside`
  position: fixed;
  right: 36px;
  top: 58%;
  transform: translateY(-50%);
  z-index: 16;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92px;
  overflow: hidden;
  border-radius: 34px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(23, 31, 47, 0.18);

  @media (max-width: 1120px) {
    display: none;
  }
`;

export const QuickMenuHead = styled.div`
  width: 100%;
  padding: 18px 0 14px;
  background: #2b356d;
  color: #ffffff;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.3;
`;

export const QuickMenuBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0 12px;
`;

export const QuickMenuItem = styled.a`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 6px;
  color: #222222;
  font-size: 0.82rem;
  text-align: center;
  line-height: 1.35;
`;

export const QuickMenuIcon = styled.div<{ kind: 'online' | 'kakao' | 'phone' }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ kind }) =>
    kind === 'online'
      ? 'linear-gradient(180deg, #eff6ff, #d9e7ff)'
      : kind === 'kakao'
        ? 'linear-gradient(180deg, #fff4b8, #ffe04f)'
        : 'linear-gradient(180deg, #eaf4ff, #c8ddff)'};
  border: 1px solid
    ${({ kind }) => (kind === 'kakao' ? 'rgba(170, 130, 0, 0.2)' : 'rgba(23, 59, 132, 0.14)')};
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
  }

  ${({ kind }) =>
    kind === 'online'
      ? `
    &::before {
      left: 11px;
      top: 12px;
      width: 20px;
      height: 14px;
      border: 2px solid #173b84;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.9);
    }

    &::after {
      left: 16px;
      top: 29px;
      width: 10px;
      height: 2px;
      background: #173b84;
      box-shadow: 0 -5px 0 #173b84;
    }
  `
      : kind === 'kakao'
        ? `
    &::before {
      left: 10px;
      top: 11px;
      width: 24px;
      height: 18px;
      border-radius: 10px;
      background: #402000;
    }

    &::after {
      left: 16px;
      top: 27px;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 7px solid #402000;
      transform: rotate(18deg);
    }
  `
        : `
    &::before {
      left: 14px;
      top: 10px;
      width: 16px;
      height: 16px;
      border: 3px solid #173b84;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom-color: transparent;
      transform: rotate(45deg);
    }

    &::after {
      left: 19px;
      top: 23px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #173b84;
    }
  `}
`;

export const HeroSearchLink = styled.a`
  width: 100%;
  display: block;
`;

export const PracticeShowcaseSection = styled.section`
  position: relative;
  padding: 108px 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 20%, rgba(26, 82, 165, 0.11), transparent 18%),
    radial-gradient(circle at 14% 78%, rgba(27, 102, 201, 0.06), transparent 18%),
    linear-gradient(180deg, rgba(246, 249, 253, 0.96), rgba(255, 255, 255, 0.98)),
    #ffffff;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent, rgba(27, 102, 201, 0.08), transparent);
    top: 46px;
    bottom: auto;
    height: 1px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: -90px;
    bottom: -40px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(27, 102, 201, 0.08), transparent 68%);
  }

  @media (max-width: 768px) {
    padding: 64px 0;
  }
`;

export const PracticeShowcaseInner = styled(Container)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const PracticeShowcaseHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 34px 32px;
  color: #143c79;
  max-width: 360px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(19, 63, 139, 0.1);
  border-top: 2px solid #1b66c9;
  box-shadow: 0 16px 34px rgba(19, 55, 109, 0.08);

  @media (max-width: 768px) {
    max-width: none;
    padding: 24px 22px;
    border-radius: 22px;
  }
`;

export const PracticeShowcaseEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #8ea0bb;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 32px;
    height: 1px;
    background: rgba(27, 102, 201, 0.28);
  }
`;

export const PracticeShowcaseMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;

export const PracticeShowcaseMetaCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 88px;
  padding: 16px 18px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(248, 251, 255, 0.98), rgba(242, 247, 253, 0.98));
  border: 1px solid rgba(20, 60, 121, 0.07);
`;

export const PracticeShowcaseMetaValue = styled.strong`
  font-size: 1.5rem;
  line-height: 1;
  color: #143c79;
`;

export const PracticeShowcaseMetaLabel = styled.span`
  color: rgba(20, 60, 121, 0.68);
  font-size: 0.9rem;
  line-height: 1.45;
`;

export const PracticeShowcaseTitle = styled.h2`
  margin: 0;
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  color: #143c79;
`;

export const PracticeShowcaseBody = styled.p`
  margin: 0;
  color: rgba(20, 60, 121, 0.72);
  font-size: 1.08rem;
  line-height: 1.7;
`;

export const PracticeDetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 0.92fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const PracticeColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1080px) {
    gap: 14px;
  }
`;

export const PracticeDetailCard = styled.article`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
  min-height: 168px;
  padding: 26px 26px 24px;
  color: #143c79;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 253, 0.98));
  border: 1px solid rgba(20, 60, 121, 0.1);
  box-shadow: 0 14px 28px rgba(19, 55, 109, 0.06);
  position: relative;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;

  &::before {
    content: '';
    position: absolute;
    left: 26px;
    top: 0;
    width: 56px;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, #1b66c9, #7aa8dd);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 36px rgba(19, 55, 109, 0.09);
    border-color: rgba(27, 102, 201, 0.18);
  }

  &:hover .practice-arrow {
    transform: translateX(6px);
    color: #ffffff;
    background: linear-gradient(135deg, #1b66c9, #3f88e7);
    border-color: transparent;
  }

  @media (max-width: 1080px) {
    min-height: auto;
    padding: 24px 22px 22px;
  }
`;

export const PracticeDetailTitle = styled.strong`
  display: block;
  margin-bottom: 12px;
  font-size: 1.18rem;
  line-height: 1.2;
  color: #143c79;
`;

export const PracticeDetailText = styled.p`
  margin: 0;
  color: rgba(20, 60, 121, 0.68);
  line-height: 1.68;
  max-width: 372px;
`;

export const PracticeDetailArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(20, 60, 121, 0.14);
  background: rgba(245, 248, 253, 0.96);
  color: rgba(20, 60, 121, 0.82);
  font-size: 1.55rem;
  line-height: 1;
  flex: 0 0 auto;
  transition:
    transform 0.24s ease,
    color 0.24s ease,
    background-color 0.24s ease,
    border-color 0.24s ease;
`;

export const LandingSection = styled.section`
  position: relative;
  padding: 108px 0;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &[id='about'] {
    background:
      linear-gradient(180deg, rgba(247, 250, 255, 0.96), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='about']::before {
    top: 40px;
    right: -80px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(80, 127, 198, 0.12), transparent 68%);
  }

  &[id='issue-report'] {
    background:
      linear-gradient(180deg, rgba(247, 249, 252, 0.96), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='issue-report']::before {
    left: -60px;
    top: 90px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(4, 50, 90, 0.08), transparent 70%);
  }

  &[id='members'] {
    background:
      linear-gradient(180deg, rgba(248, 250, 254, 0.98), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='members']::before {
    left: 0;
    right: 0;
    top: 48px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(27, 102, 201, 0.18), transparent);
  }

  &[id='members']::after {
    right: -120px;
    bottom: -60px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(27, 102, 201, 0.08), transparent 68%);
  }

  &[id='it'] {
    background:
      radial-gradient(circle at 82% 20%, rgba(26, 82, 165, 0.14), transparent 18%),
      linear-gradient(180deg, rgba(243, 247, 253, 0.94), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='news'] {
    background:
      linear-gradient(180deg, rgba(249, 251, 255, 0.96), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  &[id='news']::before {
    right: 6%;
    top: 56px;
    width: 180px;
    height: 180px;
    border-radius: 24px;
    background:
      linear-gradient(135deg, rgba(27, 102, 201, 0.08), rgba(27, 102, 201, 0.02)),
      transparent;
    transform: rotate(16deg);
  }

  &[id='offices'] {
    background:
      linear-gradient(180deg, rgba(245, 248, 252, 0.95), rgba(255, 255, 255, 0.98)),
      #ffffff;
  }

  @media (max-width: 768px) {
    padding: 64px 0;
  }
`;

export const LandingSectionInner = styled(Container)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

export const SectionAnchor = styled.div`
  position: relative;
  top: -108px;
  height: 0;
  visibility: hidden;

  @media (max-width: 768px) {
    top: -84px;
  }
`;

export const LandingSectionTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LandingLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #b6b6b6;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.36em;

  &::after {
    content: '';
    width: 120px;
    height: 1px;
    background: #bcbcbc;
  }
`;

export const LandingTitle = styled.h2`
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 3.75rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: #111111;
`;

export const LandingLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid rgba(4, 50, 90, 0.24);
  color: #04325a;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.58);
  backdrop-filter: blur(10px);
`;

export const IssueReportCarousel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const IssueCard = styled.article`
  display: grid;
  grid-template-columns: minmax(280px, 38%) minmax(0, 1fr);
  gap: 36px;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const IssueImage = styled.div<{ image: string }>`
  min-height: 420px;
  border-radius: 0;
  background:
    linear-gradient(180deg, rgba(7, 17, 30, 0.06), rgba(7, 17, 30, 0.18)),
    url(${({ image }) => image});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    min-height: 240px;
  }
`;

export const IssueBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  padding-right: 8px;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

export const IssueMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  color: #47648f;
  font-size: 0.92rem;
  font-weight: 700;
`;

export const IssueMetaDivider = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(71, 100, 143, 0.42);
`;

export const IssueHeadline = styled.h3`
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  line-height: 1.38;
  letter-spacing: -0.04em;
  color: #1b1b1b;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const IssueText = styled.p`
  margin: 0;
  color: #797979;
  font-size: 1.08rem;
  line-height: 1.72;
`;

export const DividerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const DividerLine = styled.span`
  display: block;
  flex: 1;
  height: 1px;
  background: #bcbcbc;
`;

export const RelatedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const RelatedItem = styled.a`
  color: #797979;
  font-size: 1.02rem;
  line-height: 1.55;
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid #bcbcbc;
  color: #8a8a8a;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
`;

export const IssueSliderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const IssueDots = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IssueDot = styled.button<{ active: boolean }>`
  width: ${({ active }) => (active ? '34px' : '10px')};
  height: 10px;
  border: 0;
  border-radius: 999px;
  background: ${({ active }) => (active ? '#04325a' : 'rgba(4, 50, 90, 0.18)')};
  cursor: pointer;
  transition: all 0.22s ease;
`;

export const IssueArrows = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ArrowButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid rgba(4, 50, 90, 0.18);
  background: #ffffff;
  color: #04325a;
  border-radius: 50%;
  cursor: pointer;
`;

export const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const MembersOverviewCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: 100%;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(19, 63, 139, 0.12);
  border-top: 2px solid #1b66c9;
  backdrop-filter: blur(12px);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 36px rgba(19, 63, 139, 0.1);
  }

  @media (max-width: 768px) {
    min-height: auto;
  }
`;

export const MemberVisual = styled.div<{ accent: string }>`
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 24px 20px;
  position: relative;
  background:
    radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.95), rgba(242, 246, 252, 0.98) 60%, rgba(229, 237, 248, 0.92) 100%),
    linear-gradient(160deg, ${({ accent }) => accent}, #eef3fa 88%);

  &::after {
    content: '';
    position: absolute;
    inset: auto 18px 12px auto;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.44), transparent 70%);
  }

  @media (max-width: 768px) {
    min-height: 180px;
  }
`;

export const MemberBadge = styled.span<{ image?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background:
    ${({ image }) => (image ? `url(${image}) center/cover no-repeat,` : '')}
    radial-gradient(circle at 48% 32%, rgba(255, 255, 255, 0.95), rgba(209, 216, 226, 0.96) 72%, rgba(164, 172, 184, 0.94) 100%);
  border: 1px solid rgba(116, 128, 146, 0.22);
  color: #31455f;
  font-weight: 800;
  font-size: 2.2rem;
  box-shadow: inset 0 -10px 18px rgba(91, 102, 122, 0.12);
  overflow: hidden;
`;

export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 26px 24px 30px;

  @media (max-width: 768px) {
    padding: 20px 20px 24px;
  }
`;

export const MemberIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const CaseFeatured = styled.article`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 34px 30px;
  min-height: 320px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02)),
    linear-gradient(180deg, #0f2d63, #10254b);
  color: #ffffff;
  border: 1px solid rgba(19, 63, 139, 0.1);
  box-shadow: 0 20px 40px rgba(15, 26, 52, 0.06);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 46px rgba(15, 26, 52, 0.1);
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 28px 22px;
  }
`;

export const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const CaseMeta = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

export const CaseCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(19, 63, 139, 0.1);
  box-shadow: 0 18px 36px rgba(15, 26, 52, 0.05);
  backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const CaseCategory = styled.span`
  color: inherit;
  font-size: 0.9rem;
  font-weight: 700;
`;

export const CardHeadline = styled.h3`
  margin: 0;
  font-size: 1.34rem;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #111111;
`;

export const DarkCardHeadline = styled(CardHeadline)`
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.24);
`;

export const CardText = styled.p`
  margin: 0;
  color: #797979;
  line-height: 1.78;
`;

export const DarkCardText = styled(CardText)`
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.22);
`;

export const MemberContact = styled.p`
  margin: 0;
  color: #536070;
  font-size: 0.98rem;
  line-height: 1.65;
  word-break: break-word;
`;

export const MemberSectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const MemberSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MemberSectionTitle = styled.strong`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #3d4a5c;
  font-size: 0.95rem;
  font-weight: 800;

  &::before {
    content: '';
    width: 44px;
    height: 3px;
    background: #1b66c9;
  }
`;

export const MemberSectionBody = styled.p`
  margin: 0;
  color: #556273;
  line-height: 1.65;
`;

export const NewsletterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const NewsletterCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 30px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.66), rgba(242, 246, 252, 0.66)),
    rgba(255, 255, 255, 0.36);
  border: 1px solid rgba(19, 63, 139, 0.1);
  backdrop-filter: blur(12px);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 40px rgba(19, 63, 139, 0.09);
  }

  @media (max-width: 768px) {
    padding: 22px 20px;
  }
`;

export const NewsletterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const MemberName = styled.strong`
  font-size: 1.2rem;
`;

export const OfficesSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const OfficesSelectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const OfficesSelectorButton = styled.button<{ active: boolean }>`
  min-height: 54px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid ${({ active }) => (active ? 'transparent' : 'rgba(19, 63, 139, 0.14)')};
  background: ${({ active }) =>
    active
      ? 'linear-gradient(90deg, #144e9f, #1b66c9)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(242, 246, 251, 0.88))'};
  color: ${({ active }) => (active ? '#ffffff' : '#30507c')};
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: ${({ active }) =>
    active ? '0 16px 30px rgba(20, 78, 159, 0.22)' : '0 8px 20px rgba(19, 63, 139, 0.05)'};
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    background 0.22s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const OfficesContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(320px, 0.96fr);
  gap: 24px;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const OfficesFeatureCard = styled.article<{ accent: string }>`
  position: relative;
  overflow: hidden;
  padding: 34px 34px 30px;
  border-radius: 32px;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.22), transparent 24%),
    linear-gradient(180deg, ${({ accent }) => accent}, #10284c 82%);
  color: #ffffff;
  box-shadow: 0 24px 60px rgba(11, 24, 43, 0.16);

  &::before {
    content: '';
    position: absolute;
    inset: auto -6% -34% auto;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.24), transparent 68%);
  }

  @media (max-width: 768px) {
    padding: 28px 22px 24px;
    border-radius: 24px;
  }
`;

export const OfficesFeatureTop = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OfficesBadge = styled.span`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const OfficesFeatureTitle = styled.h3`
  margin: 0;
  font-size: clamp(2rem, 3.6vw, 3rem);
  line-height: 1.14;
  letter-spacing: -0.04em;
`;

export const OfficesFeatureBody = styled.p`
  margin: 0;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.08rem;
  line-height: 1.72;
`;

export const OfficesFactsGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 26px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const OfficesFactCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 110px;
  padding: 18px 18px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
`;

export const OfficesFactLabel = styled.span`
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const OfficesFactValue = styled.strong`
  font-size: 1.08rem;
  line-height: 1.6;
  color: #ffffff;
  word-break: break-word;
`;

export const OfficesMapCard = styled.aside`
  position: relative;
  overflow: hidden;
  padding: 26px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(243, 247, 252, 0.94)),
    rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(19, 63, 139, 0.1);
  box-shadow: 0 20px 44px rgba(19, 63, 139, 0.08);
  backdrop-filter: blur(16px);
`;

export const OfficesMapHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
`;

export const OfficesMapTitle = styled.strong`
  font-size: 1.24rem;
  color: #163d77;
`;

export const OfficesMapBody = styled.p`
  margin: 0;
  color: #60708a;
  line-height: 1.65;
`;

export const OfficesMiniMap = styled.div`
  position: relative;
  min-height: 420px;
  border-radius: 24px;
  background: linear-gradient(180deg, #f7fbff, #eef4fb);
  border: 1px solid rgba(19, 63, 139, 0.08);
  overflow: hidden;
`;

export const OfficesMiniMapKoreaZone = styled.div`
  position: absolute;
  inset: 5% 20% 6% 6%;
`;

export const OfficesMiniMapKoreaImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  opacity: 0.58;
  filter: saturate(0.48) brightness(1.02) contrast(0.92);
`;

export const OfficesMiniMapVietnamZone = styled.div`
  position: absolute;
  right: 5%;
  bottom: 6%;
  width: 21%;
  height: 36%;
  padding: 12px 12px 12px;
  border-radius: 26px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(243, 248, 253, 0.9)),
    rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(20, 60, 121, 0.08);
  box-shadow: 0 18px 34px rgba(29, 63, 114, 0.08);
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 68px;
    background: linear-gradient(180deg, rgba(33, 72, 128, 0.08), rgba(33, 72, 128, 0));
    pointer-events: none;
  }
`;

export const OfficesMiniMapInsetLabel = styled.span`
  position: absolute;
  left: 14px;
  top: 10px;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #214880;
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  z-index: 2;
`;

export const OfficesMiniMapVietnamImage = styled.img`
  position: absolute;
  inset: 16% 16% 22%;
  width: auto;
  height: auto;
  max-width: calc(100% - 32%);
  max-height: calc(100% - 38%);
  object-fit: contain;
  object-position: center;
  opacity: 0.72;
  filter: saturate(0.56) brightness(1.02) contrast(0.94);
`;

export const OfficesMapLines = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
`;

export const OfficesMapAnchor = styled.button<{ x: number; y: number; active: boolean; accent: string }>`
  position: absolute;
  left: ${({ x }) => `${x}%`};
  top: ${({ y }) => `${y}%`};
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
`;

export const OfficesMapAnchorDot = styled.span<{ active: boolean; accent: string }>`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ active, accent }) => (active ? accent : '#2e6dcc')};
  box-shadow:
    0 0 0 6px rgba(255, 255, 255, 0.82),
    0 10px 18px rgba(20, 60, 121, 0.14);
`;

export const OfficesMapLabel = styled.button<{ x: number; y: number; active: boolean; accent: string }>`
  position: absolute;
  left: ${({ x }) => `${x}%`};
  top: ${({ y }) => `${y}%`};
  transform: translate(-50%, -50%);
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: ${({ active, accent }) =>
    active ? `linear-gradient(180deg, ${accent}, #3f74b7)` : 'rgba(255, 255, 255, 0.88)'};
  color: ${({ active }) => (active ? '#ffffff' : '#36557e')};
  font-size: 0.88rem;
  font-weight: 800;
  box-shadow: ${({ active }) =>
    active ? '0 12px 24px rgba(41, 86, 145, 0.18)' : '0 8px 16px rgba(19, 63, 139, 0.06)'};
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: translate(-50%, calc(-50% - 1px));
  }
`;

export const OfficesMapLabelDot = styled.span<{ active: boolean; accent: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active, accent }) => (active ? 'rgba(255, 255, 255, 0.94)' : accent)};
  flex: 0 0 auto;
`;

export const OfficesMapInsetLabelButton = styled(OfficesMapLabel)`
  min-height: 34px;
  padding: 0 12px;
  font-size: 0.82rem;
  box-shadow: 0 10px 18px rgba(19, 63, 139, 0.1);
`;

export const OfficesMiniMapInsetMeta = styled.div`
  position: absolute;
  left: 16px;
  bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
`;

export const OfficesMiniMapInsetTitle = styled.span`
  color: #6c7c95;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const OfficesMiniMapInsetCity = styled.span`
  color: #123b75;
  font-size: 1.08rem;
  font-weight: 800;
`;

export const OfficesMapHint = styled.p`
  margin: 16px 0 0;
  color: #6c7c95;
  font-size: 0.92rem;
  line-height: 1.6;
`;

export const Footer = styled.footer`
  position: relative;
  background:
    radial-gradient(circle at top right, rgba(58, 89, 138, 0.18), transparent 18%),
    linear-gradient(180deg, #22252b, #1c1e23);
  color: rgba(255, 255, 255, 0.82);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.03), transparent 24%, transparent 76%, rgba(255, 255, 255, 0.02)),
      linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.02));
    pointer-events: none;
  }
`;

export const FooterInner = styled(Container)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 46px 0 54px;
`;

export const FooterTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const FooterBrandWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const FooterBrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FooterBrandTitle = styled.strong`
  font-size: 2rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: #ffffff;
`;

export const FooterBrandSub = styled.span`
  color: rgba(255, 255, 255, 0.66);
  font-size: 1rem;
`;

export const FooterPolicyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const FooterPolicyLink = styled.a`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.98rem;
  font-weight: 700;
`;

export const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterLine = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.8;
`;

export const FooterLabel = styled.strong`
  color: #ffffff;
  font-weight: 800;
`;

export const FooterCopyright = styled.p`
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.44);
  font-size: 0.98rem;
  letter-spacing: 0.02em;
`;
