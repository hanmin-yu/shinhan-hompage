import styled from '@emotion/styled';

import { heroSlides } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { useRotatingIndex } from '../../../hooks/useRotatingIndex';
import * as S from '../homeStyles';

const HeroShell = styled.section`
  position: relative;
  min-height: calc(100vh - 88px);
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 18%, rgba(58, 124, 214, 0.18), transparent 24%),
    radial-gradient(circle at 82% 24%, rgba(23, 159, 150, 0.12), transparent 18%),
    radial-gradient(circle at 76% 82%, rgba(214, 154, 54, 0.1), transparent 18%),
    linear-gradient(180deg, #eaf3ff 0%, #f2f7ff 56%, #f8fbff 100%);
  border-bottom: 1px solid ${S.palette.lineSoft};

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
    grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr);
    gap: clamp(18px, 3vw, 30px);
  }

  @media (max-width: 920px) {
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.82fr);
    gap: 18px;
    padding: clamp(32px, 6vh, 56px) 0;
  }

  @media (max-width: 768px) {
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

  @media (max-width: 920px) {
    gap: 14px;
  }
`;

const HeroGuideLine = styled.span`
  position: absolute;
  left: -40px;
  top: 33%;
  width: 1px;
  height: 182px;
  background: linear-gradient(180deg, rgba(33, 101, 193, 0.32), rgba(23, 159, 150, 0.18));

  @media (max-width: 1120px) {
    display: none;
  }
`;

const HeroKicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: ${S.palette.blue};
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, rgba(33, 101, 193, 0.52), rgba(23, 159, 150, 0.34));
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: ${S.palette.textStrong};
  font-family: 'Times New Roman', Georgia, serif;
  font-size: clamp(2.52rem, 4.2vw, 4.96rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.03em;
  max-width: 640px;

  @media (max-width: 920px) {
    max-width: 14ch;
    font-size: clamp(2.2rem, 5vw, 3.4rem);
  }
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
  border: 1px solid rgba(23, 159, 150, 0.18);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(239, 248, 255, 0.82));
  color: ${S.palette.blueDeep};
  box-shadow: 0 10px 20px rgba(16, 53, 114, 0.08);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeroDescription = styled.p`
  margin: 4px 0 0;
  color: ${S.palette.textBody};
  font-size: 1.02rem;
  line-height: 1.68;
  max-width: 620px;

  @media (max-width: 920px) {
    font-size: 0.94rem;
    line-height: 1.62;
    max-width: 44ch;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  height: min(76vh, 760px);
  min-height: 460px;

  @media (max-width: 1120px) {
    height: min(50vw, 500px);
    min-height: 360px;
  }

  @media (max-width: 920px) {
    height: min(44vw, 380px);
    min-height: 260px;
  }

  @media (max-width: 768px) {
    height: min(60vh, 560px);
    min-height: 330px;
  }
`;

const HeroRing = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(33, 101, 193, 0.24);
  pointer-events: none;

  &[data-ring='large'] {
    width: min(clamp(490px, 52vw, 760px), 78vh);
    aspect-ratio: 1 / 1;
    right: 24%;
    top: 1%;
  }

  @media (max-width: 1120px) {
    &[data-ring='large'] {
      width: min(420px, 42vw);
      right: 14%;
      top: 5%;
    }
  }

  @media (max-width: 920px) {
    &[data-ring='large'] {
      width: min(300px, 36vw);
      right: 8%;
      top: 10%;
    }
  }

  @media (max-width: 768px) {
    &[data-ring='large'] {
      width: min(440px, 76vw);
      right: 50%;
      top: 2%;
      transform: translateX(50%);
    }
  }
`;

const HeroCircleFrame = styled.div`
  position: absolute;
  right: 0;
  bottom: 3%;
  width: min(clamp(390px, 48vw, 680px), 68vh);
  height: min(clamp(390px, 48vw, 680px), 68vh);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 18px 34px rgba(17, 45, 91, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.84);
  background: linear-gradient(180deg, #dce8fa 0%, #edf5ff 100%);

  @media (max-width: 1120px) {
    width: min(420px, 42vw);
    height: min(420px, 42vw);
    right: 0;
    bottom: 5%;
  }

  @media (max-width: 920px) {
    width: min(300px, 34vw);
    height: min(300px, 34vw);
    bottom: 8%;
  }

  @media (max-width: 768px) {
    width: clamp(260px, 60vw, 440px);
    height: clamp(260px, 60vw, 440px);
    right: 50%;
    bottom: 3%;
    transform: translateX(50%);
  }
`;

const HeroSlideImage = styled.img<{ $active: boolean; $position?: string; $mobilePosition?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position ?? 'center'};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.7s ease;

  @media (max-width: 768px) {
    object-position: ${({ $mobilePosition, $position }) => $mobilePosition ?? $position ?? 'center'};
  }
`;

const HeroScroll = styled.span`
  position: absolute;
  right: clamp(-20px, -1vw, -8px);
  bottom: 34px;
  color: ${S.palette.blueInk};
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
    background: rgba(33, 66, 111, 0.5);
    transform: translateX(-50%);
  }

  @media (max-width: 920px) {
    display: none;
  }
`;

export function HeroSection() {
  const { t } = useI18n();
  const [activeSlide] = useRotatingIndex(heroSlides.length, 6200);

  return (
    <>
      <S.SectionAnchor id="about" />
      <HeroShell>
        <HeroInner data-reveal>
          <HeroCopy>
            <HeroGuideLine />
            <HeroKicker>Shinhan</HeroKicker>
            <HeroTitle>Vision-Driven Customs Excellence</HeroTitle>
            <HeroValues>
              <HeroValueChip>PASSION</HeroValueChip>
              <HeroValueChip>INTEGRITY</HeroValueChip>
              <HeroValueChip>INNOVATION</HeroValueChip>
              <HeroValueChip>TEAMWORK</HeroValueChip>
            </HeroValues>
            <HeroDescription>
              {t(
                '신한관세법인은 열정, 정직, 혁신, 팀워크의 가치 위에서 수출입통관·검역/요건·컨설팅·물류 연계까지 기업의 실무 과제를 통합 지원합니다.',
                'Shinhan Customs Service supports business operations end-to-end, from import/export clearance and quarantine requirements to consulting and logistics coordination, grounded in passion, integrity, innovation, and teamwork.',
              )}
            </HeroDescription>
          </HeroCopy>

          <HeroVisual aria-hidden="true">
            <HeroRing data-ring="large" />
            <HeroCircleFrame>
              {heroSlides.map((slide, index) => (
                <HeroSlideImage
                  key={slide.label}
                  src={slide.image}
                  alt={t(slide.label, slide.labelEn ?? slide.label)}
                  $active={activeSlide === index}
                  $position={slide.objectPosition}
                  $mobilePosition={slide.mobileObjectPosition}
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
