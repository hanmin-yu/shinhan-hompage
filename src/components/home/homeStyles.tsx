import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const palette = {
  pageBackground:
    'radial-gradient(circle at top left, rgba(89, 150, 230, 0.18), transparent 28%), radial-gradient(circle at 88% 16%, rgba(37, 170, 166, 0.12), transparent 22%), linear-gradient(180deg, #edf4ff 0%, #f4f8ff 44%, #f8fbff 100%)',
  utilityBackground:
    'linear-gradient(90deg, rgba(11, 43, 89, 0.98) 0%, rgba(18, 76, 146, 0.97) 52%, rgba(24, 116, 164, 0.94) 100%)',
  headerBackground:
    'linear-gradient(180deg, rgba(251, 253, 255, 0.98) 0%, rgba(241, 248, 255, 0.97) 100%)',
  panelBackground:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 255, 0.96) 100%)',
  panelBackgroundStrong:
    'linear-gradient(160deg, rgba(255, 255, 255, 0.99) 0%, rgba(239, 247, 255, 0.95) 62%, rgba(231, 246, 245, 0.9) 100%)',
  chipBackground: 'rgba(247, 251, 255, 0.92)',
  chipBackgroundActive: 'linear-gradient(135deg, #2667c2 0%, #174d9a 100%)',
  line: 'rgba(28, 90, 170, 0.16)',
  lineStrong: 'rgba(26, 88, 168, 0.3)',
  lineSoft: 'rgba(53, 116, 194, 0.12)',
  shadow: 'rgba(10, 45, 99, 0.12)',
  shadowStrong: 'rgba(11, 42, 92, 0.18)',
  textStrong: '#102744',
  textPrimary: '#153a72',
  textBody: '#496687',
  textMuted: '#6681a3',
  blue: '#2165c1',
  blueDeep: '#0f3f85',
  blueInk: '#0b2b59',
  teal: '#179f96',
  tealSoft: 'rgba(23, 159, 150, 0.14)',
  gold: '#d69a36',
  goldSoft: 'rgba(214, 154, 54, 0.16)',
} as const;

export const wordSafeWrap = css`
  word-break: keep-all;
  overflow-wrap: normal;
  line-break: auto;
`;

export const longTokenWrap = css`
  word-break: normal;
  overflow-wrap: anywhere;
`;

export const GlobalStyle = () => (
  <Global
    styles={css`
      @import url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap');

      :root {
        color-scheme: light;
        background: ${palette.pageBackground};
        color: ${palette.textStrong};
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
        background: ${palette.pageBackground};
        overflow-x: hidden;
        font-family: "NanumSquare", "Noto Sans KR", sans-serif;
        color: ${palette.textStrong};
        ${wordSafeWrap};
      }

      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      li,
      dt,
      dd,
      blockquote,
      figcaption {
        ${wordSafeWrap};
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
  background: ${palette.pageBackground};
  color: ${palette.textStrong};
`;

export const Container = styled.div`
  width: min(1320px, calc(100% - 28px));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100%, calc(100% - 18px));
  }
`;

export const UtilityBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 26;
  background:
    radial-gradient(circle at 86% 50%, rgba(214, 154, 54, 0.22), transparent 24%),
    ${palette.utilityBackground};
  border-bottom: 1px solid rgba(235, 244, 255, 0.24);

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
  background: ${palette.headerBackground};
  border-bottom: 1px solid ${palette.lineSoft};
  box-shadow: 0 12px 30px rgba(16, 48, 104, 0.06);
  backdrop-filter: blur(18px);

  @media (max-width: 768px) {
    top: 0;
    background: ${palette.headerBackground};
    border-bottom: 1px solid ${palette.line};
  }
`;

export const HeaderInner = styled(Container)`
  width: min(1720px, calc(100% - 28px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 82px;

  @media (max-width: 1200px) {
    width: min(100%, calc(100% - 22px));
    gap: 12px;
  }

  @media (max-width: 1320px) {
    min-height: 76px;
  }

  @media (max-width: 1024px) {
    min-height: 70px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
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
  flex: 1 1 auto;
  min-height: 82px;
  min-width: 0;
  overflow: visible;

  @media (max-width: 1320px) {
    display: none;
  }
`;

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  width: fit-content;
  min-width: 0;
`;

export const HeaderBrandImage = styled.img`
  display: block;
  width: auto;
  max-width: 430px;
  height: auto;
  max-height: 66px;
  object-fit: contain;

  @media (max-width: 1320px) {
    max-width: 360px;
    max-height: 58px;
  }

  @media (max-width: 980px) {
    max-width: 280px;
    max-height: 48px;
  }

  @media (max-width: 520px) {
    max-width: 220px;
    max-height: 40px;
  }
`;

export const BrandMark = styled.div`
  width: 52px;
  height: 52px;
  border: 1px solid rgba(28, 92, 179, 0.24);
  border-radius: 10px;
  background:
    radial-gradient(circle at 26% 24%, rgba(255, 255, 255, 0.22), transparent 24%),
    linear-gradient(155deg, #2f7dd9 0%, #1a5ab2 56%, #123f85 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 14px 26px rgba(17, 78, 168, 0.2);
  overflow: hidden;

  @media (max-width: 768px) {
    border-color: rgba(28, 92, 179, 0.24);
    background:
      radial-gradient(circle at 26% 24%, rgba(255, 255, 255, 0.22), transparent 24%),
      linear-gradient(155deg, #2f7dd9 0%, #1a5ab2 56%, #123f85 100%);
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
  gap: 2px;
  min-width: 0;

  @media (max-width: 520px) {
    gap: 0;
  }
`;

export const BrandTop = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const BrandTopLine = styled.span`
  width: 74px;
  height: 1px;
  background: linear-gradient(90deg, rgba(33, 101, 193, 0.5), rgba(23, 159, 150, 0.3));

  @media (max-width: 980px) {
    display: none;
  }
`;

export const BrandEstablished = styled.span`
  color: ${palette.textMuted};
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;

  @media (max-width: 980px) {
    display: none;
  }
`;

export const BrandTitle = styled.strong`
  font-size: 3rem;
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: 0.03em;
  color: ${palette.blueDeep};
  white-space: nowrap;
  font-family: 'Times New Roman', Georgia, serif;
  text-transform: uppercase;

  @media (max-width: 1440px) {
    font-size: 2.45rem;
  }

  @media (max-width: 1280px) {
    font-size: 2rem;
  }

  @media (max-width: 980px) {
    font-size: 1.8rem;
  }

  @media (max-width: 520px) {
    font-size: 1.52rem;
  }
`;

export const BrandSub = styled.span`
  color: ${palette.textMuted};
  font-size: 0.95rem;
  font-family: 'Times New Roman', Georgia, serif;
  white-space: nowrap;

  @media (max-width: 1100px) {
    font-size: 0.92rem;
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0;
  font-size: 1.08rem;
  color: ${palette.textPrimary};
  white-space: nowrap;

  @media (max-width: 1680px) {
    font-size: 1.02rem;
  }

  @media (max-width: 1480px) {
    font-size: 0.95rem;
  }
`;

export const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 82px;

  @media (max-width: 1320px) {
    min-height: 78px;
  }
`;

export const NavLink = styled(Link)<{ hasChildren?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 80px;
  padding: 0 12px;
  position: relative;
  color: ${palette.textPrimary};
  font-family: 'Noto Sans KR', 'NanumSquare', sans-serif;
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: -0.01em;
  white-space: nowrap;
  word-break: keep-all;
  transition: color 0.18s ease;

  @media (max-width: 1680px) {
    gap: 6px;
    padding: 0 10px;
    font-size: 1.1rem;
  }

  @media (max-width: 1480px) {
    padding: 0 8px;
    font-size: 1rem;
  }

  @media (max-width: 1380px) {
    min-height: 78px;
    padding: 0 5px;
    font-size: 0.92rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 19px;
    height: 4px;
    border-radius: 999px;
    background: linear-gradient(90deg, ${palette.blue}, ${palette.teal});
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
    color: ${palette.blueDeep};
  }

  &:hover::before {
    transform: scaleX(1);
    opacity: 1;
  }

  &[data-active='true'] {
    color: ${palette.blueInk};
  }

  &[data-active='true']::before {
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
  transform: translateX(-50%) translateY(6px);
  padding: 10px 0;
  border-radius: 10px;
  background: ${palette.panelBackgroundStrong};
  border: 1px solid ${palette.line};
  box-shadow: 0 18px 32px rgba(16, 40, 86, 0.12);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s ease;
  z-index: 28;
`;

export const NavDropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NavDropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 0 22px;
  color: ${palette.textBody};
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: normal;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    color: ${palette.blue};
    background: rgba(33, 101, 193, 0.08);
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
  color: ${palette.blueDeep};
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
  min-height: 32px;
  padding-left: 28px;
  font-size: 0.9rem;
  color: ${palette.textMuted};
`;

export const HeaderTools = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;

  @media (max-width: 1320px) {
    gap: 10px;
  }

  @media (max-width: 560px) {
    gap: 8px;
  }
`;

export const HeaderUtilityLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 4px;
  padding-left: 8px;
  border-left: 1px solid rgba(70, 102, 144, 0.22);

  @media (max-width: 1320px) {
    display: none;
  }
`;

export const HeaderUtilityLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 8px;
  color: ${palette.textBody};
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  white-space: nowrap;
  word-break: keep-all;
  transition: color 0.18s ease;

  &:hover {
    color: ${palette.blue};
  }

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 1px;
    height: 12px;
    transform: translateY(-50%);
    background: rgba(70, 102, 144, 0.26);
  }
`;

export const HeaderUtilityIconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: ${palette.textBody};
  transition:
    color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    color: ${palette.blue};
    transform: translateY(-1px);
  }

  svg {
    width: 18px;
    height: 18px;
    display: block;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

export const HeaderUtilityButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: ${palette.textBody};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  white-space: nowrap;
  word-break: keep-all;
  cursor: pointer;
  transition: color 0.18s ease;

  &:hover {
    color: ${palette.blue};
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 1px;
    height: 12px;
    transform: translateY(-50%);
    background: rgba(70, 102, 144, 0.26);
  }
`;

export const HeaderIconButton = styled.button<{ kind: 'pin' | 'menu' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${palette.line};
  border-radius: 7px;
  background: ${palette.panelBackground};
  color: ${palette.textPrimary};
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
  min-height: 38px;
  padding: 0 14px;
  border-radius: 7px;
  border: 1px solid ${palette.line};
  color: ${palette.textPrimary};
  background: ${palette.panelBackground};
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: rgba(33, 101, 193, 0.08);
    border-color: ${palette.lineStrong};
  }

  @media (max-width: 1760px) {
    display: none;
  }
`;

export const ContactButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 20px;
  border: 1px solid rgba(214, 154, 54, 0.22);
  border-radius: 8px;
  color: #ffffff;
  background:
    linear-gradient(135deg, rgba(214, 154, 54, 0.18), rgba(214, 154, 54, 0) 30%),
    linear-gradient(135deg, #2a72d2 0%, #1a56ac 56%, #123f85 100%);
  box-shadow: 0 14px 26px rgba(16, 84, 177, 0.2);
  font-size: 0.94rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 30px rgba(16, 84, 177, 0.24);
    filter: saturate(1.04);
  }

  @media (max-width: 1180px) {
    display: none;
  }

  @media (max-width: 1320px) {
    min-height: 40px;
    padding: 0 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    min-height: 38px;
    padding: 0 14px;
    font-size: 0.88rem;
  }
`;

export const MobileIconButton = styled.button<{ kind: 'search' | 'menu' }>`
  display: none;

  @media (max-width: 1320px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid ${palette.line};
    border-radius: 50%;
    background: ${palette.panelBackground};
    position: relative;
    color: ${palette.textPrimary};
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

  @media (max-width: 1320px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(8, 18, 36, 0.56);
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

  @media (max-width: 1320px) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    width: min(420px, 42vw);
    height: 100vh;
    padding: 30px 24px 34px;
    flex-direction: column;
    gap: 22px;
    background:
      radial-gradient(circle at top right, rgba(214, 154, 54, 0.16), transparent 22%),
      radial-gradient(circle at 18% 16%, rgba(38, 124, 226, 0.18), transparent 22%),
      linear-gradient(180deg, rgba(10, 27, 55, 0.98) 0%, rgba(11, 36, 72, 0.98) 100%);
    color: #ffffff;
    transform: translateX(${({ open }) => (open ? '0' : '100%')});
    transition: transform 0.24s ease;
    z-index: 41;
    overflow-y: auto;
    box-shadow: -18px 0 42px rgba(4, 14, 29, 0.34);
  }

  @media (max-width: 768px) {
    width: min(88vw, 360px);
    padding: 28px 22px 32px;
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
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

export const MobileMenuClose = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;

export const MobileMenuMainLink = styled(Link)`
  display: flex;
  align-items: center;
  min-height: 40px;
  font-size: 1.1rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.96);
`;

export const MobileMenuSubLink = styled(Link)`
  display: flex;
  align-items: center;
  min-height: 34px;
  color: rgba(227, 236, 250, 0.82);
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
  color: rgba(214, 230, 255, 0.62);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-left: 2px;
`;

export const MobileMenuQuickRow = styled.div<{ $columns?: 1 | 2 }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns = 2 }) => $columns}, minmax(0, 1fr));
  gap: 10px;
`;

export const MobileMenuQuickButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.06)),
    rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  word-break: keep-all;
  cursor: pointer;
`;

export const MobileMenuQuickLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.06)),
    rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  word-break: keep-all;
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
  font-weight: 800;
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
  font-weight: 800;
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
  font-weight: 700;
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
  font-weight: 800;
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
  font-weight: 700;
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
  font-weight: 700;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #111111;
  ${wordSafeWrap};
`;

export const DarkCardHeadline = styled(CardHeadline)`
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.24);
`;

export const CardText = styled.p`
  margin: 0;
  color: #797979;
  line-height: 1.78;
  ${wordSafeWrap};
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
  ${longTokenWrap};
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
  ${wordSafeWrap};
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
  font-weight: 700;
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
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.04em;
  ${wordSafeWrap};
`;

export const OfficesFeatureBody = styled.p`
  margin: 0;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.08rem;
  line-height: 1.72;
  ${wordSafeWrap};
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
  ${longTokenWrap};
`;

export const OfficesMapCard = styled.aside`
  position: relative;
  overflow: hidden;
  padding: 28px;
  border-radius: 18px;
  background:
    radial-gradient(circle at top right, rgba(23, 159, 150, 0.08), transparent 22%),
    ${palette.panelBackgroundStrong};
  border: 1px solid ${palette.line};
  box-shadow: 0 18px 40px rgba(16, 53, 114, 0.1);
`;

export const OfficesMapHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const OfficesMapTitle = styled.strong`
  font-size: 1.36rem;
  font-weight: 700;
  color: ${palette.textPrimary};
  ${wordSafeWrap};
`;

export const OfficesMapBody = styled.p`
  margin: 0;
  color: ${palette.textBody};
  line-height: 1.65;
  ${wordSafeWrap};
`;

export const OfficesMiniMap = styled.div`
  position: relative;
  min-height: 470px;
  border-radius: 18px;
  background:
    radial-gradient(circle at 18% 16%, rgba(33, 101, 193, 0.08), transparent 18%),
    linear-gradient(180deg, #fbfdff, #f3f8fc);
  border: 1px solid ${palette.lineSoft};
  overflow: hidden;
`;

export const OfficesMiniMapKoreaZone = styled.div`
  position: absolute;
  inset: 6% 24% 8% 6%;
`;

export const OfficesMiniMapKoreaImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  opacity: 0.42;
  filter: saturate(0.12) brightness(1.03) contrast(0.98);
`;

export const OfficesMiniMapVietnamZone = styled.div`
  position: absolute;
  right: 6%;
  bottom: 7%;
  width: 14%;
  height: 24%;
  padding: 14px 14px 12px;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff, #f3f8fc);
  border: 1px solid ${palette.lineSoft};
  box-shadow: 0 10px 20px rgba(29, 63, 114, 0.08);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &[data-active='true'] {
    border-color: rgba(23, 159, 150, 0.24);
    box-shadow: 0 14px 24px rgba(23, 77, 152, 0.12);
    transform: translateY(-1px);
  }

  &::before {
    display: none;
  }
`;

export const OfficesMiniMapInsetLabel = styled.span`
  position: absolute;
  left: 14px;
  top: 10px;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.84);
  color: ${palette.textBody};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  z-index: 2;
`;

export const OfficesMiniMapVietnamImage = styled.img`
  position: absolute;
  inset: 28% 22% 30%;
  width: auto;
  height: auto;
  max-width: calc(100% - 32%);
  max-height: calc(100% - 42%);
  object-fit: contain;
  object-position: center;
  opacity: 0.44;
  filter: saturate(0.26) brightness(1.02) contrast(0.96);
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
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
`;

export const OfficesMapAnchorDot = styled.span<{ active: boolean; accent: string }>`
  display: block;
  width: ${({ active }) => (active ? '100%' : '78%')};
  height: ${({ active }) => (active ? '100%' : '78%')};
  margin: auto;
  border-radius: 50%;
  background: ${({ active, accent }) => (active ? accent : '#b3c3db')};
  box-shadow:
    0 0 0 ${({ active }) => (active ? '5px' : '4px')} rgba(255, 255, 255, 0.94),
    0 8px 14px rgba(20, 60, 121, 0.1);
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
  gap: 0;
  min-height: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: ${({ active }) => (active ? palette.blueInk : palette.textMuted)};
  font-size: 0.92rem;
  font-weight: ${({ active }) => (active ? 800 : 700)};
  box-shadow: none;
  white-space: nowrap;
  cursor: pointer;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.95);
  transition:
    transform 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: translate(-50%, calc(-50% - 1px));
    color: ${palette.blueInk};
  }
`;

export const OfficesMapLabelDot = styled.span<{ active: boolean; accent: string }>`
  display: none;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: ${({ active, accent }) => (active ? accent : '#afc1da')};
  flex: 0 0 auto;
`;

export const OfficesMapInsetLabelButton = styled(OfficesMapLabel)`
  min-height: 30px;
  padding: 0 10px;
  font-size: 0.76rem;
  box-shadow: none;
`;

export const OfficesMiniMapInsetMeta = styled.div`
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 2;
`;

export const OfficesMiniMapInsetTitle = styled.span`
  position: absolute;
  left: 14px;
  top: 14px;
  color: #536a83;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const OfficesMiniMapInsetDivider = styled.span`
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 42px;
  height: 1px;
  background: rgba(32, 72, 131, 0.08);
`;

export const OfficesMiniMapInsetCity = styled.span`
  color: #19487f;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const OfficesMapHint = styled.p`
  margin: 18px 0 0;
  color: ${palette.textMuted};
  font-size: 0.88rem;
  line-height: 1.6;
`;

export const Footer = styled.footer`
  position: relative;
  background:
    radial-gradient(circle at top right, rgba(214, 154, 54, 0.16), transparent 22%),
    radial-gradient(circle at 12% 18%, rgba(30, 126, 195, 0.18), transparent 24%),
    linear-gradient(180deg, #0b264d 0%, #0d2e5f 52%, #10243f 100%);
  color: rgba(255, 255, 255, 0.82);
  overflow: hidden;
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
  align-items: center;
  gap: 24px;

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;

export const FooterBrandWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const FooterTopAside = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-left: clamp(10px, 1.4vw, 20px);

  @media (max-width: 900px) {
    width: 100%;
    justify-content: flex-start;
    margin-left: 68px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const FooterBrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FooterBrandTitle = styled.strong`
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.04em;
  color: #ffffff;
`;

export const FooterBrandSub = styled.span`
  color: rgba(232, 240, 255, 0.72);
  font-size: 0.9rem;
`;

export const FooterPolicyRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const FooterPolicyLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  min-height: 28px;
  white-space: nowrap;
`;

export const FooterSocialLabel = styled.span`
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const FooterSocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FooterSocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.92;
  }
`;

export const FooterSocialImage = styled.img`
  display: block;
  height: 32px;
  width: auto;

  @media (max-width: 768px) {
    height: 28px;
  }
`;

export const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterLine = styled.p`
  margin: 0;
  color: rgba(230, 239, 255, 0.74);
  font-size: 0.92rem;
  line-height: 1.8;
`;

export const FooterLabel = styled.strong`
  color: #ffffff;
  font-weight: 800;
`;

export const FooterCopyright = styled.p`
  margin: 8px 0 0;
  color: rgba(222, 233, 251, 0.48);
  font-size: 0.86rem;
  letter-spacing: 0.02em;
`;
