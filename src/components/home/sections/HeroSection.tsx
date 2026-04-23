import styled from '@emotion/styled';

import { heroSlides } from '../../../data/home';
import { useRotatingIndex } from '../../../hooks/useRotatingIndex';
import * as S from '../homeStyles';

const HeroShell = styled.section`
  position: relative;
  min-height: calc(100vh - 88px);
  overflow: hidden;
  background: #eef0f4;
  border-bottom: 1px solid rgba(21, 77, 159, 0.08);

  @media (max-width: 1024px) {
    min-height: calc(100vh - 76px);
  }

  @media (max-width: 768px) {
    min-height: min(760px, calc(100vh - 76px));
  }
`;

const HeroInner = styled(S.Container)`
  position: relative;
  min-height: inherit;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: center;
  gap: clamp(28px, 5vw, 72px);
  padding: clamp(40px, 8vh, 72px) 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const HeroCopy = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeroKicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1f5cb8;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const HeroGuideLine = styled.span`
  position: absolute;
  left: -34px;
  top: 32%;
  width: 1px;
  height: 160px;
  background: rgba(24, 58, 112, 0.42);

  @media (max-width: 1024px) {
    display: none;
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: #13171f;
  font-family: 'Times New Roman', Georgia, serif;
  font-size: clamp(2.5rem, 4vw, 4.6rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  max-width: 560px;
`;

const HeroValues = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  width: min(520px, 100%);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HeroValueChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(29, 88, 173, 0.35);
  background: rgba(255, 255, 255, 0.68);
  color: #1b4e98;
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    min-height: 42px;
  }
`;

const HeroDot = styled.span`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #f2d42f;

  &[data-dot='one'] {
    right: 34%;
    top: 31%;
  }

  &[data-dot='two'] {
    right: 8%;
    top: 46%;
  }

  &[data-dot='three'] {
    right: 18%;
    top: 62%;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const HeroDescription = styled.p`
  margin: 6px 0 0;
  color: #2f3d54;
  font-size: 1.02rem;
  line-height: 1.68;
  max-width: 560px;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 2px;
`;

const HeroPrimaryAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 7px;
  background: #1f5cb8;
  border: 1px solid rgba(31, 92, 184, 0.5);
  color: #ffffff;
  font-size: 0.94rem;
  font-weight: 700;
`;

const HeroSecondaryAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 7px;
  border: 1px solid rgba(32, 84, 160, 0.26);
  background: rgba(255, 255, 255, 0.7);
  color: #1f4f95;
  font-size: 0.94rem;
  font-weight: 700;
`;

const HeroVisual = styled.div`
  position: relative;
  height: min(78vh, 760px);
  min-height: 420px;

  @media (max-width: 1024px) {
    height: min(58vh, 520px);
    min-height: 320px;
  }
`;

const HeroRing = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(18, 44, 86, 0.44);
  pointer-events: none;

  &[data-ring='large'] {
    width: clamp(460px, 52vw, 740px);
    aspect-ratio: 1 / 1;
    right: 26%;
    top: 2%;
  }
`;

const HeroCircleFrame = styled.div`
  position: absolute;
  right: 0;
  bottom: 4%;
  width: clamp(380px, 48vw, 660px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 22px 40px rgba(22, 54, 103, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.75);
  background: #dfe6f2;

  @media (max-width: 1024px) {
    right: 50%;
    transform: translateX(50%);
  }
`;

const HeroSlideImage = styled.img<{ $active: boolean; $position?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position ?? 'center'};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.6s ease;
`;

const HeroScroll = styled.span`
  position: absolute;
  right: 30px;
  bottom: 36px;
  color: #182f53;
  font-size: 0.84rem;
  letter-spacing: 0.07em;
  writing-mode: vertical-rl;
  text-orientation: mixed;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -52px;
    width: 1.5px;
    height: 40px;
    background: rgba(24, 47, 83, 0.62);
    transform: translateX(-50%);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export function HeroSection() {
  const [activeSlide] = useRotatingIndex(heroSlides.length, 6200);

  return (
    <>
      <S.SectionAnchor id="about" />
      <HeroShell>
        <HeroInner data-reveal>
          <HeroCopy>
            <HeroGuideLine />
            <HeroKicker>Vision</HeroKicker>
            <HeroTitle>Vision-Driven Customs Excellence</HeroTitle>
            <HeroValues>
              <HeroValueChip>Passion</HeroValueChip>
              <HeroValueChip>Integrity</HeroValueChip>
              <HeroValueChip>Innovation</HeroValueChip>
              <HeroValueChip>Teamwork</HeroValueChip>
            </HeroValues>
            <HeroDot data-dot="one" />
            <HeroDot data-dot="two" />
            <HeroDot data-dot="three" />
            <HeroDescription>
              신한관세법인은 열정, 정직, 혁신, 팀워크의 가치로 고객의 발전과 성공을 지원합니다.
            </HeroDescription>
            <HeroActions>
              <HeroPrimaryAction href="#contact">상담 문의하기</HeroPrimaryAction>
              <HeroSecondaryAction href="#practice">업무분야 보기</HeroSecondaryAction>
            </HeroActions>
          </HeroCopy>

          <HeroVisual aria-hidden="true">
            <HeroRing data-ring="large" />
            <HeroCircleFrame>
              {heroSlides.map((slide, index) => (
                <HeroSlideImage
                  key={slide.label}
                  src={slide.image}
                  alt=""
                  $position={slide.objectPosition}
                  $active={index === activeSlide}
                />
              ))}
            </HeroCircleFrame>
          </HeroVisual>
        </HeroInner>
        <HeroScroll>scroll</HeroScroll>
      </HeroShell>
    </>
  );
}
