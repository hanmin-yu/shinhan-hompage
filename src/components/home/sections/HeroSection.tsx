import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { heroSlides } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { useRotatingIndex } from '../../../hooks/useRotatingIndex';
import * as S from '../homeStyles';

const HeroShell = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #dcecff;
  border-bottom: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
    display: none;
  }

  &::before {
    inset: -24% -16%;
    background: transparent;
    opacity: 0.62;
    transform: translate3d(calc(var(--viewport-progress) * 92px), calc(var(--viewport-progress) * -34px), 0)
      rotate(-4deg);
    animation: kineticSweep 7.5s ease-in-out infinite alternate;
  }

  &::after {
    right: -8vw;
    bottom: -10vw;
    width: min(62vw, 820px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: transparent;
    transform: translate3d(0, calc(var(--viewport-progress) * -120px), 0);
    animation: glowPulse 8s ease-in-out infinite;
  }

  @media (max-width: 1024px) {
    min-height: 100vh;
  }

  @media (max-width: 768px) {
    min-height: min(780px, 100vh);
  }
`;

const HeroBackdropImage = styled.img<{ $active: boolean; $position?: string; $mobilePosition?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position ?? 'center'};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: scale(1.035) translate3d(-0.45%, -0.25%, 0);
  transform-origin: center;
  backface-visibility: hidden;
  will-change: opacity, transform;
  animation: ${({ $active }) => ($active ? 'heroImageZoom 6.2s cubic-bezier(0.18, 0, 0.12, 1) forwards' : 'none')};
  filter: saturate(1.06) contrast(1.08) brightness(0.96);
  transition: opacity 1.15s ease;

  @media (max-width: 768px) {
    object-position: ${({ $mobilePosition, $position }) => $mobilePosition ?? $position ?? 'center'};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scale(1.04) translate3d(0, 0, 0);
    transition: opacity 0.2s ease;
  }

  @keyframes heroImageZoom {
    0% {
      transform: scale(1.035) translate3d(-0.45%, -0.25%, 0);
      filter: saturate(1.04) contrast(1.06) brightness(0.96);
    }

    100% {
      transform: scale(1.105) translate3d(0.52%, -0.46%, 0);
      filter: saturate(1.08) contrast(1.08) brightness(0.97);
    }
  }
`;

const HeroBackdropOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: transparent;

  @media (max-width: 768px) {
    background: transparent;
  }
`;

const HeroBottomBlend = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  z-index: 1;
  height: min(28vh, 260px);
  pointer-events: none;
  background: transparent;
`;

const HeroInner = styled(S.Container)`
  position: relative;
  z-index: 1;
  min-height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(116px, 15vh, 150px) 0 clamp(40px, 8vh, 78px);

  @media (max-width: 1120px) {
  }

  @media (max-width: 920px) {
    padding: clamp(104px, 13vh, 132px) 0 clamp(32px, 6vh, 56px);
  }

  @media (max-width: 768px) {
  }
`;

const HeroCopy = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(22px, 2.2vw, 34px);
  width: min(1120px, 82vw);
  text-align: center;
  transform: translate3d(0, calc(-56px + (var(--viewport-progress) * -34px)), 0);
  transition: transform 0.16s linear;

  @media (max-width: 920px) {
    width: min(100%, 680px);
    text-align: center;
    align-items: center;
    gap: 18px;
  }
`;

const HeroTitle = styled.h1`
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 0 clamp(16px, 1.8vw, 24px);
  color: #ffffff;
  font-family:
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Pretendard',
    system-ui,
    sans-serif;
  font-size: clamp(2.9rem, 6.18vw, 6.72rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: 0;
  word-break: keep-all;
  white-space: nowrap;
  text-shadow:
    0 26px 58px rgba(3, 15, 34, 0.58),
    0 8px 20px rgba(3, 15, 34, 0.38),
    0 0 1px rgba(255, 255, 255, 0.72);
  text-transform: none;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: -22% -8% 8%;
    border-radius: 999px;
    background:
      radial-gradient(circle at 50% 50%, rgba(13, 73, 146, 0.36), transparent 62%),
      linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
    filter: blur(18px);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: min(74%, 520px);
    height: clamp(4px, 0.42vw, 7px);
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(18, 63, 133, 0.18) 12%,
      rgba(18, 63, 133, 0.46) 32%,
      rgba(18, 63, 133, 0.68) 50%,
      rgba(18, 63, 133, 0.46) 68%,
      rgba(18, 63, 133, 0.18) 88%,
      rgba(255, 255, 255, 0)
    );
    box-shadow: 0 10px 22px rgba(18, 63, 133, 0.22);
    transform: translateX(-50%);
  }

  @media (max-width: 920px) {
    font-size: clamp(2.58rem, 9.85vw, 4.72rem);
  }

  @media (max-width: 520px) {
    white-space: normal;
    font-size: clamp(2.24rem, 11.1vw, 3.48rem);
  }
`;

const HeroStatement = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.34rem, 2.2vw, 2.35rem);
  font-weight: 520;
  line-height: 1.28;
  letter-spacing: -0.012em;
  word-break: keep-all;
  text-wrap: balance;
  white-space: pre-line;
  text-shadow:
    0 16px 42px rgba(3, 15, 34, 0.62),
    0 2px 8px rgba(3, 15, 34, 0.38);

  b {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.12rem, 4.8vw, 1.72rem);
  }
`;

const HeroScroll = styled.span`
  position: absolute;
  left: 50%;
  bottom: 38px;
  color: rgba(24, 72, 132, 0.76);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: translateX(-50%);
  animation: scrollPulse 1.55s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -48px;
    width: 1px;
    height: 38px;
    background: rgba(24, 72, 132, 0.38);
    transform: translateX(-50%);
  }

  @media (max-width: 920px) {
    display: none;
  }

  @keyframes scrollPulse {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.72;
    }

    50% {
      transform: translate(-50%, 10px);
      opacity: 1;
    }
  }
`;

const HeroControls = styled.div`
  position: absolute;
  left: 50%;
  bottom: clamp(86px, 11vh, 128px);
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 16px;
  width: min(620px, 52vw);
  transform: translateX(-50%);

  @media (max-width: 920px) {
    width: min(88vw, 520px);
    bottom: 88px;
  }
`;

const HeroProgress = styled.div`
  position: relative;
  flex: 1 1 auto;
  height: 2px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.28);
`;

const HeroProgressBar = styled.span<{ $progress: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $progress }) => `${$progress}%`};
  background: #ffffff;
  transition: width 0.52s cubic-bezier(0.22, 1, 0.36, 1);
`;

const HeroCounter = styled.span`
  min-width: 74px;
  color: #ffffff;
  font-size: 1.22rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-align: center;
  text-shadow: 0 10px 28px rgba(3, 15, 34, 0.42);
`;

const HeroControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border: 1px solid rgba(255, 255, 255, 0.36);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.84);
  color: ${S.palette.blue};
  font-size: 1.45rem;
  font-weight: 800;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition:
    transform 0.18s ease,
    background 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    background: #ffffff;
    outline: none;
  }
`;

const SeminarQuickCard = styled(Link)`
  position: absolute;
  right: clamp(24px, 4vw, 76px);
  bottom: clamp(54px, 8vh, 92px);
  z-index: 3;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 40px;
  align-items: stretch;
  width: 224px;
  min-height: 100px;
  overflow: hidden;
  background: url('/hero/homepage/seminar-quick-card-ai.png') center / cover no-repeat;
  color: #ffffff;
  box-shadow: 0 22px 44px rgba(3, 15, 34, 0.28);

  @media (max-width: 920px) {
    display: none;
  }
`;

const SeminarQuickCopy = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  padding: 16px 18px;
`;

const SeminarQuickTitle = styled.strong`
  font-size: 1.12rem;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
`;

const SeminarQuickText = styled.span`
  font-size: 0.84rem;
  font-weight: 800;
`;

const SeminarQuickArrow = styled.span`
  display: grid;
  place-items: center;
  background: #ffffff;
  color: ${S.palette.blue};
  font-size: 1.62rem;
  font-weight: 300;
`;

export function HeroSection() {
  const { t } = useI18n();
  const [activeSlide, setActiveSlide] = useRotatingIndex(heroSlides.length, 6200);
  const slide = heroSlides[activeSlide] ?? heroSlides[0];
  const progress = heroSlides.length > 0 ? ((activeSlide + 1) / heroSlides.length) * 100 : 0;

  const moveSlide = (direction: 'prev' | 'next') => {
    setActiveSlide((current) => {
      if (direction === 'prev') {
        return (current - 1 + heroSlides.length) % heroSlides.length;
      }

      return (current + 1) % heroSlides.length;
    });
  };

  return (
    <>
      <S.SectionAnchor id="about" />
      <HeroShell>
        {heroSlides.map((slide, index) => (
          <HeroBackdropImage
            key={`${slide.label}-backdrop`}
            src={slide.image}
            srcSet={slide.mobileImage ? `${slide.mobileImage} 768w, ${slide.image} 1600w` : undefined}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            $active={activeSlide === index}
            $position={slide.objectPosition}
            $mobilePosition={slide.mobileObjectPosition}
          />
        ))}
        <HeroBackdropOverlay />
        <HeroBottomBlend />
        <HeroInner data-reveal="zoom">
          <HeroCopy data-reveal="slide-left">
            <HeroTitle>신한관세법인</HeroTitle>
            <HeroStatement>
              {t(slide.headline, slide.headlineEn ?? slide.headline)}
            </HeroStatement>
          </HeroCopy>

          <HeroControls aria-label={t('대표 이미지 슬라이드', 'Hero image slider')}>
            <HeroProgress aria-hidden="true">
              <HeroProgressBar $progress={progress} />
            </HeroProgress>
            <HeroCounter>
              {activeSlide + 1} / {heroSlides.length}
            </HeroCounter>
            <HeroControlButton type="button" aria-label={t('이전 이미지', 'Previous slide')} onClick={() => moveSlide('prev')}>
              ‹
            </HeroControlButton>
            <HeroControlButton type="button" aria-label={t('다음 이미지', 'Next slide')} onClick={() => moveSlide('next')}>
              ›
            </HeroControlButton>
          </HeroControls>

          <SeminarQuickCard to="/news/seminar">
            <SeminarQuickCopy>
              <SeminarQuickTitle>Seminar</SeminarQuickTitle>
              <SeminarQuickText>{t('세미나/교육', 'Seminar / Training')}</SeminarQuickText>
            </SeminarQuickCopy>
            <SeminarQuickArrow>›</SeminarQuickArrow>
          </SeminarQuickCard>

          <HeroScroll>scroll</HeroScroll>
        </HeroInner>
      </HeroShell>
    </>
  );
}
