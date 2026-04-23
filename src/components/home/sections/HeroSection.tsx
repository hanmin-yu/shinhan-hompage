import styled from '@emotion/styled';

import { heroSlides } from '../../../data/home';
import { useRotatingIndex } from '../../../hooks/useRotatingIndex';
import * as S from '../homeStyles';

const HeroShell = styled.section`
  position: relative;
  min-height: calc(100vh - 88px);
  overflow: hidden;
  background:
    radial-gradient(circle at 76% 18%, rgba(47, 112, 201, 0.18), transparent 32%),
    radial-gradient(circle at 10% 84%, rgba(29, 89, 176, 0.12), transparent 28%),
    linear-gradient(180deg, #eef2f8 0%, #f3f6fb 44%, #f7f9fc 100%);
  border-bottom: 1px solid rgba(19, 67, 142, 0.1);

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
  grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr);
  align-items: center;
  gap: clamp(28px, 5vw, 84px);
  padding: clamp(40px, 8vh, 78px) 0;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const HeroCopy = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const HeroGuideLine = styled.span`
  position: absolute;
  left: -40px;
  top: 33%;
  width: 1px;
  height: 182px;
  background: rgba(32, 71, 136, 0.28);

  @media (max-width: 1120px) {
    display: none;
  }
`;

const HeroKicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #1f5db8;
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: rgba(31, 93, 184, 0.38);
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: #0f1728;
  font-family: 'Times New Roman', Georgia, serif;
  font-size: clamp(2.52rem, 4.2vw, 4.96rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  max-width: 640px;
`;

const HeroValues = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  width: min(520px, 100%);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const HeroValueChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(21, 79, 163, 0.32);
  background: rgba(255, 255, 255, 0.74);
  color: #1a4f99;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeroDescription = styled.p`
  margin: 4px 0 0;
  color: #304563;
  font-size: 1.02rem;
  line-height: 1.68;
  max-width: 620px;
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
  border: 1px solid rgba(31, 92, 184, 0.48);
  color: #ffffff;
  font-size: 0.94rem;
  font-weight: 700;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #184f9f;
    transform: translateY(-1px);
  }
`;

const HeroSecondaryAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 7px;
  border: 1px solid rgba(32, 84, 160, 0.22);
  background: rgba(255, 255, 255, 0.76);
  color: #1f4f95;
  font-size: 0.94rem;
  font-weight: 700;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #ffffff;
    transform: translateY(-1px);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  height: min(76vh, 760px);
  min-height: 430px;

  @media (max-width: 1120px) {
    height: min(60vh, 560px);
    min-height: 330px;
  }
`;

const HeroRing = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(32, 71, 136, 0.26);
  pointer-events: none;

  &[data-ring='large'] {
    width: clamp(490px, 52vw, 760px);
    aspect-ratio: 1 / 1;
    right: 24%;
    top: 1%;
  }
`;

const HeroCircleFrame = styled.div`
  position: absolute;
  right: 0;
  bottom: 3%;
  width: clamp(390px, 48vw, 680px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(17, 45, 91, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: #dce4f2;

  @media (max-width: 1120px) {
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
  transition: opacity 0.7s ease;
`;

const HeroScroll = styled.span`
  position: absolute;
  right: 30px;
  bottom: 34px;
  color: #21426f;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
  text-orientation: mixed;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -48px;
    width: 1px;
    height: 38px;
    background: rgba(33, 66, 111, 0.52);
    transform: translateX(-50%);
  }

  @media (max-width: 1120px) {
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
              <HeroValueChip>PASSION</HeroValueChip>
              <HeroValueChip>INTEGRITY</HeroValueChip>
              <HeroValueChip>INNOVATION</HeroValueChip>
              <HeroValueChip>TEAMWORK</HeroValueChip>
            </HeroValues>
            <HeroDescription>
              신한관세법인은 열정, 정직, 혁신, 팀워크의 가치 위에서 수출입통관·검역/요건·컨설팅·물류 연계까지
              기업의 실무 과제를 통합 지원합니다.
            </HeroDescription>
            <HeroActions>
              <HeroPrimaryAction href="/contact">상담 문의하기</HeroPrimaryAction>
              <HeroSecondaryAction href="/services">업무분야 보기</HeroSecondaryAction>
            </HeroActions>
          </HeroCopy>

          <HeroVisual aria-hidden="true">
            <HeroRing data-ring="large" />
            <HeroCircleFrame>
              {heroSlides.map((slide, index) => (
                <HeroSlideImage
                  key={slide.label}
                  src={slide.image}
                  alt={slide.label}
                  $active={activeSlide === index}
                  $position={slide.objectPosition}
                />
              ))}
            </HeroCircleFrame>
          </HeroVisual>

          <HeroScroll>scroll</HeroScroll>
        </HeroInner>
      </HeroShell>
    </>
  );
}
