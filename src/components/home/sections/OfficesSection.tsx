import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import koreaMapAsset from '../../../assets/map-korea.svg';
import { officeBranches } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const officeFallbackImages: Record<string, string> = {
  seoul: '/hero/homepage/shinhan-hq-building.jpg',
  'kord-systems': '/hero/it-server-room.png',
  kord: '/hero/it-digital-network.png',
  airport: '/hero/homepage/cargo-plane-sky.jpg',
  incheon: '/hero/homepage/port-cranes-blue-sky.jpg',
  'sh-food': '/offices/sh-food.jpg',
  busan: '/hero/busan-port.jpg',
  cheongju: '/offices/cheongju-techno-city.png',
  gumi: '/hero/auto-parts.jpg',
  invista: '/hero/practice-aeo-warehouse.jpg',
  vietnam: '/hero/homepage/seoul-skyline-blue-sky.jpg',
};

const mapPinGroups = [
  { id: 'seoul-hq', officeIds: ['seoul', 'kord-systems', 'kord'], x: 33.4, y: 21.3, accent: '#1c4f96' },
  { id: 'gimpo', officeIds: ['invista'], x: 29.2, y: 20.7, accent: '#2f689b' },
  { id: 'incheon-airport', officeIds: ['airport'], x: 25.1, y: 21.9, accent: '#2f78bf' },
  { id: 'songdo', officeIds: ['incheon', 'sh-food'], x: 27.7, y: 23.5, accent: '#3c6ca8' },
  { id: 'cheongju', officeIds: ['cheongju'], x: 44.0, y: 36.4, accent: '#5a7fb2' },
  { id: 'gumi', officeIds: ['gumi'], x: 56.8, y: 48.4, accent: '#4a73a2' },
  { id: 'busan', officeIds: ['busan'], x: 75.0, y: 62.1, accent: '#0f5a8f' },
];

const homeTilePoints: Record<string, { x: number; y: number }> = {
  seoul: { x: 13, y: 11 },
  'kord-systems': { x: 20, y: 25 },
  kord: { x: 14, y: 40 },
  airport: { x: 21, y: 56 },
  incheon: { x: 14, y: 72 },
  'sh-food': { x: 21, y: 87 },
  busan: { x: 87, y: 14 },
  cheongju: { x: 80, y: 30 },
  gumi: { x: 86, y: 47 },
  invista: { x: 80, y: 64 },
  vietnam: { x: 87, y: 81 },
};

function useCountUp(target: number, duration = 1100) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(target);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setValue(target);
      setIsCounting(false);
      return;
    }

    setValue(0);
    setIsCounting(false);
    let frameId = 0;

    const runCount = () => {
      let startedAt = 0;

      setValue(0);
      setIsCounting(true);

      const tick = (timestamp: number) => {
        if (!startedAt) startedAt = timestamp;
        const progress = Math.min((timestamp - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const pulse = Math.sin(progress * Math.PI * 5) * 0.05;
        setValue(Math.max(1, Math.round(target * Math.min(eased + pulse, 1))));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        } else {
          setValue(target);
          window.setTimeout(() => setIsCounting(false), 260);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.cancelAnimationFrame(frameId);

        if (entry.isIntersecting) {
          runCount();
          return;
        }

        setValue(0);
        setIsCounting(false);
      },
      { threshold: 0.36 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, target]);

  return { ref, value, isCounting };
}

const Section = styled.section`
  position: relative;
  min-height: 860px;
  padding: 72px 0 108px;
  overflow: hidden;
  background:
    linear-gradient(132deg, rgba(237, 245, 251, 0.82) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(242, 249, 247, 0.76) 100%),
    linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::before {
    content: none;
  }

  &::after {
    content: none;
  }

  @keyframes officePulse {
    0% {
      opacity: 0.72;
      transform: scale(0.44);
    }

    100% {
      opacity: 0;
      transform: scale(1.9);
    }
  }

  @keyframes officeDash {
    to {
      stroke-dashoffset: -22;
    }
  }

  @keyframes countPop {
    0% {
      transform: translateY(10px) scale(0.92);
      filter: drop-shadow(0 0 0 rgba(39, 111, 207, 0));
    }

    36% {
      transform: translateY(-8px) scale(1.08);
      color: ${S.palette.blue};
      filter: drop-shadow(0 18px 24px rgba(39, 111, 207, 0.2));
    }

    72% {
      transform: translateY(2px) scale(0.98);
    }

    100% {
      transform: translateY(0) scale(1);
      filter: drop-shadow(0 0 0 rgba(39, 111, 207, 0));
    }
  }

  @media (max-width: 860px) {
    min-height: auto;
    padding: 82px 0;

  }
`;

const MapLabel = styled.span`
  position: absolute;
  right: clamp(18px, 5vw, 76px);
  bottom: clamp(24px, 6vw, 78px);
  z-index: 0;
  color: rgba(15, 43, 89, 0.045);
  font-size: clamp(2rem, 4.4vw, 4.4rem);
  font-weight: 900;
  line-height: 0.86;
  letter-spacing: 0.08em;
  pointer-events: none;
  white-space: nowrap;

  @media (max-width: 860px) {
    display: none;
  }
`;

const Inner = styled(S.Container)`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(260px, 0.42fr) minmax(0, 1fr);
  gap: clamp(18px, 2.4vw, 34px);
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled.div`
  display: grid;
  width: min(100%, 440px);
  gap: 38px;
  padding-top: 0;

  @media (max-width: 1080px) {
    width: min(100%, 620px);
    padding-top: 0;
  }
`;

const SectionTitleBlock = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: 720px;
  min-height: clamp(76px, 9vw, 128px);
  overflow: visible;
`;

const SectionTitleGhost = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  color: rgba(15, 35, 62, 0.062);
  font-size: clamp(2.45rem, 5.2vw, 5.1rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;

  @media (max-width: 640px) {
    font-size: clamp(2.2rem, 10.6vw, 3.9rem);
    letter-spacing: 0.04em;
  }
`;

const SectionTitle = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  color: ${S.palette.blue};
  font-size: clamp(2.05rem, 4.6vw, 4.35rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.06em;
`;

const MapStage = styled.div`
  position: relative;
  min-width: 0;
  min-height: 760px;
  display: grid;
  place-items: center;

  @media (max-width: 1180px) {
    min-height: 730px;
  }

  @media (max-width: 780px) {
    display: none;
  }
`;

const MapPanel = styled.div`
  position: relative;
  width: 100%;
  max-width: 1240px;
  min-width: 0;
  min-height: 760px;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: min(68%, 760px);
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid rgba(38, 103, 175, 0.22);
    transform: translate(-50%, -50%);
  }

  @media (max-width: 1180px) {
    min-height: 720px;
  }

  @media (max-width: 700px) {
    width: min(100%, 430px);
    aspect-ratio: auto;
    margin: 0 auto;

    &::before {
      display: none;
    }
  }
`;

const KoreaMapCanvas = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  height: clamp(620px, 48vw, 760px);
  aspect-ratio: 800 / 1200;
  transform: translate(-50%, -50%);

  @media (max-width: 700px) {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    height: auto;
    margin-bottom: 18px;
    transform: none;
  }
`;

const KoreaMapImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.72;
  filter: grayscale(0.28) contrast(1.42) saturate(0.82) drop-shadow(0 26px 40px rgba(20, 62, 121, 0.18));
`;

const MapHalo = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(72%, 820px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(48, 116, 193, 0.16), rgba(48, 116, 193, 0.04) 42%, transparent 68%),
    conic-gradient(from 16deg, rgba(23, 159, 150, 0.14), transparent 16%, rgba(48, 116, 193, 0.12), transparent 38%, rgba(214, 154, 54, 0.12), transparent 62%);
  transform: translate(-50%, -50%);
  opacity: 0.5;

  @media (max-width: 700px) {
    display: none;
  }
`;

const MapPoint = styled.span<{ x: number; y: number; accent: string; $active: boolean }>`
  position: absolute;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  z-index: ${({ $active }) => ($active ? 4 : 2)};
  display: grid;
  place-items: center;
  width: ${({ $active }) => ($active ? '22px' : '17px')};
  height: ${({ $active }) => ($active ? '22px' : '17px')};
  border-radius: 999px 999px 999px 0;
  border: 2px solid rgba(255, 255, 255, 0.95);
  background: ${({ $active, accent }) => ($active ? S.palette.blue : accent)};
  color: transparent;
  font-size: 0;
  line-height: 0;
  box-shadow: ${({ $active }) =>
    $active
      ? '0 0 0 8px rgba(39, 111, 207, 0.14), 0 0 0 16px rgba(39, 111, 207, 0.06), 0 18px 30px rgba(15, 43, 89, 0.22)'
      : '0 0 0 5px rgba(39, 111, 207, 0.1), 0 12px 22px rgba(15, 43, 89, 0.16)'};
  transform: translate(-50%, -100%) rotate(-45deg) scale(${({ $active }) => ($active ? 1.08 : 1)});
  transform-origin: 50% 100%;
  transition:
    width 0.24s ease,
    height 0.24s ease,
    background 0.24s ease,
    box-shadow 0.24s ease,
    transform 0.24s ease;

  &::before {
    content: '';
    width: 42%;
    height: 42%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.96);
    transform: rotate(45deg);
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const CountLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  color: #2c2e33;
  margin: clamp(42px, 6vw, 92px) 0 0 clamp(92px, 13vw, 220px);

  @media (max-width: 700px) {
    flex-wrap: wrap;
    gap: 10px 16px;
    margin-left: 0;
  }
`;

const CountLabelStack = styled.span`
  display: inline-grid;
  gap: 10px;
  padding-bottom: 0.22em;
`;

const Count = styled.strong<{ $counting: boolean }>`
  display: inline-block;
  color: ${S.palette.blue};
  font-size: clamp(6.8rem, 14vw, 12.8rem);
  font-weight: 900;
  line-height: 0.78;
  letter-spacing: 0;
  transform-origin: 50% 78%;
  animation: ${({ $counting }) => ($counting ? 'countPop 0.38s cubic-bezier(0.2, 0.9, 0.24, 1.28)' : 'none')};
  text-shadow:
    0 16px 34px rgba(20, 41, 75, 0.1),
    0 2px 0 rgba(255, 255, 255, 0.82);
  transition:
    color 0.18s ease,
    filter 0.18s ease;
`;

const CountLabel = styled.span`
  position: relative;
  display: inline-flex;
  color: #30343a;
  font-size: clamp(1.1rem, 1.9vw, 1.62rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: -8px;
    bottom: 0;
    height: 10px;
    background: rgba(39, 111, 207, 0.58);
    z-index: -1;
  }
`;

const Summary = styled.p`
  max-width: 620px;
  margin: 0 0 0 clamp(92px, 13vw, 220px);
  color: #52697f;
  font-size: clamp(1.14rem, 1.35vw, 1.28rem);
  line-height: 1.78;

  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 10px;
  margin-left: clamp(92px, 13vw, 220px);
  color: ${S.palette.blue};
  font-size: clamp(1.08rem, 1.45vw, 1.3rem);
  font-weight: 900;
  text-decoration: none;

  &::after {
    content: '';
    width: 36px;
    height: 1px;
    background: currentColor;
  }

  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

const Tiles = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: auto;

  @media (max-width: 700px) {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 184px;
    gap: 18px;
  }
`;

const OfficeTile = styled.a<{ x: number; y: number; $active: boolean }>`
  position: absolute;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: clamp(136px, 12vw, 180px);
  min-height: 112px;
  padding: 14px;
  color: #ffffff;
  text-decoration: none;
  background: #d9e3ed;
  border: 1px solid rgba(255, 255, 255, 0.56);
  border-radius: 3px;
  box-shadow: ${({ $active }) =>
    $active ? '0 20px 38px rgba(15, 43, 89, 0.18)' : '0 12px 24px rgba(15, 43, 89, 0.1)'};
  overflow: hidden;
  pointer-events: auto;
  transform: translate(-50%, -50%);
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    filter 0.24s ease;

  &:hover {
    transform: translate(-50%, calc(-50% - 4px));
    box-shadow: 0 20px 34px rgba(15, 43, 89, 0.16);
    filter: saturate(1.03);
  }

  @media (max-width: 1180px) {
    width: clamp(126px, 15vw, 156px);
    min-height: 104px;
  }

  @media (max-width: 700px) {
    position: relative;
    left: auto;
    top: auto;
    grid-column: auto;
    grid-row: auto;
    width: auto;
    min-height: 178px;
    transform: none;

    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const OfficeImage = styled.img<{ position?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ position }) => position ?? 'center'};
  transition:
    transform 0.32s ease,
    filter 0.32s ease;

  ${OfficeTile}:hover & {
    transform: scale(1.04);
    filter: saturate(1.05);
  }
`;

const OfficeShade = styled.span`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(3, 20, 42, 0.08), rgba(3, 20, 42, 0.68)),
    linear-gradient(90deg, rgba(15, 43, 89, 0.3), rgba(15, 43, 89, 0));
`;

const OfficeRegion = styled.span`
  position: relative;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.88rem;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.34);
`;

const OfficeName = styled.strong`
  position: relative;
  margin-top: 8px;
  color: #ffffff;
  font-size: clamp(0.92rem, 1.12vw, 1.08rem);
  font-weight: 900;
  line-height: 1.18;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.34);
`;

export function OfficesSection() {
  const { t } = useI18n();
  const visibleOffices = officeBranches;
  const [activeOfficeId, setActiveOfficeId] = useState<string | null>(null);
  const { ref: countRef, value: officeCount, isCounting } = useCountUp(visibleOffices.length);

  return (
    <>
      <S.SectionAnchor id="offices" />
      <S.SectionAnchor id="contact" />

      <Section>
        <MapLabel aria-hidden="true">NETWORK</MapLabel>
        <Inner data-reveal>
          <Copy>
            <SectionTitleBlock>
              <SectionTitleGhost aria-hidden="true">OFFICES</SectionTitleGhost>
              <SectionTitle>사무소</SectionTitle>
            </SectionTitleBlock>
            <CountLine ref={countRef} aria-label={t(`${visibleOffices.length}개 사무소`, `${visibleOffices.length} offices`)}>
              <Count key={officeCount} $counting={isCounting}>{officeCount}</Count>
              <CountLabelStack>
                <CountLabel>Offices</CountLabel>
              </CountLabelStack>
            </CountLine>
            <Summary>
              {t(
                '국내 주요 지사와 베트남 현지 법인을 연결해 고객사의 통관과 물류 현장 가까이에서 대응합니다.',
                'Our domestic branches and Vietnam office support customs and logistics operations close to client sites.',
              )}
            </Summary>
            <ViewAll to="/offices">{t('사무소 전체보기', 'View all offices')}</ViewAll>
          </Copy>

          <MapStage aria-label={t('국내 사무소 위치 지도', 'Domestic office location map')}>
            <MapPanel>
              <MapHalo aria-hidden="true" />
              <KoreaMapCanvas>
                <KoreaMapImage src={koreaMapAsset} alt="" />
                {mapPinGroups.map((pin) => (
                  <MapPoint
                    key={`${pin.id}-point`}
                    x={pin.x}
                    y={pin.y}
                    accent={pin.accent}
                    $active={activeOfficeId ? pin.officeIds.includes(activeOfficeId) : false}
                    aria-label={pin.officeIds
                      .map((officeId) => {
                        const office = visibleOffices.find((candidate) => candidate.id === officeId);
                        return office ? t(office.label, office.labelEn) : '';
                      })
                      .filter(Boolean)
                      .join(', ')}
                  />
                ))}
              </KoreaMapCanvas>

              <Tiles aria-label={t('사무소 목록', 'Office list')}>
                {visibleOffices.map((office) => {
                  const tilePoint = homeTilePoints[office.id] ?? { x: office.labelX, y: office.labelY };

                  return (
                    <OfficeTile
                      key={office.id}
                      href={office.websiteUrl ?? `/offices?office=${office.id}`}
                      target={office.websiteUrl ? '_blank' : undefined}
                      rel={office.websiteUrl ? 'noreferrer' : undefined}
                      x={tilePoint.x}
                      y={tilePoint.y}
                      $active={activeOfficeId === office.id}
                      onMouseEnter={() => setActiveOfficeId(office.id)}
                      onMouseLeave={() => setActiveOfficeId(null)}
                      onFocus={() => setActiveOfficeId(office.id)}
                      onBlur={() => setActiveOfficeId(null)}
                    >
                      <OfficeImage
                        src={officeFallbackImages[office.id] ?? office.image ?? '/hero/homepage/office-blue-sky.jpg'}
                        alt=""
                        position={office.imagePosition}
                        onError={(event) => {
                          const fallback = officeFallbackImages[office.id] ?? '/hero/homepage/office-blue-sky.jpg';
                          if (event.currentTarget.src.endsWith(fallback)) return;
                          event.currentTarget.src = fallback;
                        }}
                      />
                      <OfficeShade aria-hidden="true" />
                      <OfficeRegion>{t(office.region, office.regionEn)}</OfficeRegion>
                      <OfficeName>{t(office.label, office.labelEn)}</OfficeName>
                    </OfficeTile>
                  );
                })}
              </Tiles>
            </MapPanel>
          </MapStage>
        </Inner>
      </Section>
    </>
  );
}
