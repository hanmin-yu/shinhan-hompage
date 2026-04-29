import styled from '@emotion/styled';

import { heroSlides } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { useRotatingIndex } from '../../../hooks/useRotatingIndex';
import * as S from '../homeStyles';

const HeroShell = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #102744;
  border-bottom: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &::before {
    inset: -24% -16%;
    background:
      linear-gradient(105deg, transparent 16%, rgba(255, 255, 255, 0.2) 31%, transparent 46%),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.06) 0,
        rgba(255, 255, 255, 0.06) 1px,
        transparent 1px,
        transparent 118px
      );
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
    background: radial-gradient(circle, rgba(23, 159, 150, 0.28), rgba(33, 101, 193, 0.16) 42%, transparent 68%);
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
  transform: ${({ $active }) => ($active ? 'scale(1.04)' : 'scale(1.11)')};
  animation: ${({ $active }) => ($active ? 'heroImageDrift 18s ease-in-out infinite alternate' : 'none')};
  filter: saturate(1.06) contrast(1.08) brightness(0.96);
  transition:
    opacity 1s ease,
    transform 5.6s ease;

  @media (max-width: 768px) {
    object-position: ${({ $mobilePosition, $position }) => $mobilePosition ?? $position ?? 'center'};
  }

  @keyframes heroImageDrift {
    0% {
      transform: scale(1.035) translate3d(-0.8%, -0.4%, 0);
      filter: saturate(1.04) contrast(1.06) brightness(0.96);
    }

    50% {
      transform: scale(1.07) translate3d(0.7%, -1.1%, 0);
      filter: saturate(1.1) contrast(1.09) brightness(0.98);
    }

    100% {
      transform: scale(1.095) translate3d(1.1%, 0.4%, 0);
      filter: saturate(1.07) contrast(1.08) brightness(0.97);
    }
  }
`;

const HeroBackdropOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(238, 246, 255, 0.28) 18%, rgba(14, 38, 78, 0.14) 46%, rgba(8, 28, 64, 0.84) 100%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.34) 0%, rgba(22, 91, 176, 0.16) 38%, rgba(8, 24, 54, 0.08) 70%, rgba(8, 24, 54, 0.28) 100%);

  @media (max-width: 768px) {
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(238, 246, 255, 0.28) 22%, rgba(14, 38, 78, 0.18) 58%, rgba(8, 28, 64, 0.84) 100%),
      linear-gradient(90deg, rgba(255, 255, 255, 0.24), rgba(8, 24, 54, 0.18));
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
  background:
    linear-gradient(180deg, rgba(8, 28, 64, 0) 0%, rgba(10, 43, 89, 0.62) 46%, rgba(11, 43, 89, 1) 100%),
    radial-gradient(circle at 80% 100%, rgba(23, 159, 150, 0.18), transparent 42%);
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
  gap: 24px;
  width: min(1120px, 100%);
  text-align: center;
  transform: translate3d(0, calc(var(--viewport-progress) * -34px), 0);
  transition: transform 0.16s linear;

  @media (max-width: 920px) {
    gap: 14px;
  }
`;

const HeroGuideLine = styled.span`
  position: absolute;
  left: 50%;
  top: -54px;
  width: min(460px, 54vw);
  height: 2px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.82), transparent);

  @media (max-width: 1120px) {
    top: -38px;
  }
`;

const HeroKicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: rgba(232, 242, 255, 0.96);
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, rgba(225, 238, 255, 0.72), rgba(23, 159, 150, 0.62));
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-family: 'Times New Roman', Georgia, serif;
  font-size: clamp(5.2rem, 13vw, 13.8rem);
  font-weight: 700;
  line-height: 0.82;
  letter-spacing: 0.01em;
  max-width: none;
  text-shadow:
    0 18px 46px rgba(3, 15, 34, 0.56),
    0 2px 8px rgba(3, 15, 34, 0.34);
  text-transform: uppercase;

  @media (max-width: 920px) {
    font-size: clamp(4rem, 17vw, 8rem);
  }
`;

const HeroStatement = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 4.2vw, 4.4rem);
  font-weight: 300;
  line-height: 1.22;
  letter-spacing: -0.04em;
  text-shadow:
    0 16px 42px rgba(3, 15, 34, 0.62),
    0 2px 8px rgba(3, 15, 34, 0.38);

  b {
    font-weight: 800;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 7vw, 2.8rem);
  }
`;

const HeroValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  width: min(720px, 100%);

  @media (max-width: 760px) {
    gap: 8px;
  }
`;

const HeroValueChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 6px;
  border: 1px solid rgba(225, 238, 255, 0.34);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(22, 91, 176, 0.12));
  color: rgba(255, 255, 255, 0.94);
  box-shadow: 0 10px 20px rgba(3, 15, 34, 0.16);
  backdrop-filter: blur(10px);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: -0.01em;
`;

const HeroDescription = styled.p`
  margin: 4px 0 0;
  color: rgba(248, 251, 255, 0.94);
  text-shadow: 0 8px 24px rgba(3, 15, 34, 0.44);
  font-size: 1.08rem;
  line-height: 1.68;
  max-width: 760px;

  @media (max-width: 920px) {
    font-size: 0.94rem;
    line-height: 1.62;
    max-width: 44ch;
  }
`;

const HeroScroll = styled.span`
  position: absolute;
  right: clamp(-20px, -1vw, -8px);
  bottom: 34px;
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  animation: scrollPulse 1.55s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -48px;
    width: 1px;
    height: 38px;
    background: rgba(255, 255, 255, 0.58);
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
      transform: translateY(10px);
      opacity: 1;
    }
  }
`;

export function HeroSection() {
  const { t } = useI18n();
  const [activeSlide] = useRotatingIndex(heroSlides.length, 6200);

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
            <HeroGuideLine />
            <HeroKicker>Shinhan Customs Service</HeroKicker>
            <HeroTitle>ShinHan</HeroTitle>
            <HeroStatement>
              관세 업무의 <b>새로운 기준</b>을 열다.
            </HeroStatement>
            <HeroValues>
              <HeroValueChip>수출입통관</HeroValueChip>
              <HeroValueChip>관세·무역 컨설팅</HeroValueChip>
              <HeroValueChip>물류서비스</HeroValueChip>
              <HeroValueChip>해외 관세 자문</HeroValueChip>
            </HeroValues>
            <HeroDescription>
              {t(
                '신한관세법인은 열정, 정직, 혁신, 팀워크의 가치 위에서 수출입통관·검역/요건·컨설팅·물류 연계까지 기업의 실무 과제를 통합 지원합니다.',
                'Shinhan Customs Service supports business operations end-to-end, from import/export clearance and quarantine requirements to consulting and logistics coordination, grounded in passion, integrity, innovation, and teamwork.',
              )}
            </HeroDescription>
          </HeroCopy>

          <HeroScroll>scroll</HeroScroll>
        </HeroInner>
      </HeroShell>
    </>
  );
}
