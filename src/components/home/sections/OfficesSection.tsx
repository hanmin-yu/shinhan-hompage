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
  'sh-food': '/hero/pharma.jpg',
  busan: '/hero/busan-port.jpg',
  cheongju: '/offices/cheongju-techno-city.png',
  gumi: '/hero/auto-parts.jpg',
  invista: '/hero/practice-aeo-warehouse.jpg',
  vietnam: '/hero/homepage/seoul-skyline-blue-sky.jpg',
};

const officeMapIds = new Set(['seoul', 'airport', 'incheon', 'busan', 'cheongju', 'gumi', 'invista']);

const officeMapAliases: Record<string, string> = {
  'kord-systems': 'seoul',
  kord: 'seoul',
  'sh-food': 'incheon',
};

const clampCoordinate = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

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
      color: #165cb8;
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
  font-size: clamp(2.2rem, 5vw, 5rem);
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
  font-size: clamp(2.8rem, 6vw, 5.9rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;

  @media (max-width: 640px) {
    font-size: clamp(2.5rem, 12vw, 4.4rem);
    letter-spacing: 0.04em;
  }
`;

const SectionTitle = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  color: #222a34;
  font-size: clamp(2.05rem, 4.6vw, 4.35rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.06em;
`;

const MapStage = styled.div`
  position: relative;
  min-height: 760px;
  display: grid;
  place-items: center;

  @media (max-width: 1180px) {
    min-height: 730px;
  }

  @media (max-width: 780px) {
    min-height: 500px;
  }
`;

const MapPanel = styled.div`
  position: relative;
  width: min(100%, 1120px);
  aspect-ratio: 1.42;

  &::before {
    content: '';
    position: absolute;
    left: 54%;
    top: 50%;
    width: min(62%, 700px);
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid rgba(70, 181, 209, 0.2);
    transform: translate(-50%, -50%);
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

const KoreaMapImage = styled.img`
  position: absolute;
  left: 54%;
  top: 50%;
  width: min(58%, 670px);
  height: 100%;
  object-fit: contain;
  opacity: 0.2;
  filter: grayscale(1) contrast(1.1) drop-shadow(0 18px 26px rgba(20, 62, 121, 0.08));
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

const MapHalo = styled.span`
  position: absolute;
  left: 54%;
  top: 50%;
  width: min(66%, 740px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(70, 181, 209, 0.16), rgba(70, 181, 209, 0.04) 42%, transparent 68%),
    conic-gradient(from 16deg, rgba(70, 181, 209, 0.16), transparent 16%, rgba(70, 181, 209, 0.12), transparent 38%, rgba(70, 181, 209, 0.14), transparent 62%);
  transform: translate(-50%, -50%);
  opacity: 0.22;

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
  width: ${({ $active }) => ($active ? '22px' : '16px')};
  height: ${({ $active }) => ($active ? '22px' : '16px')};
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.92);
  background: ${({ $active, accent }) => ($active ? '#165cb8' : accent)};
  color: transparent;
  font-size: 0;
  line-height: 0;
  box-shadow: ${({ $active }) =>
    $active
      ? '0 0 0 8px rgba(39, 111, 207, 0.14), 0 0 0 16px rgba(39, 111, 207, 0.06), 0 18px 30px rgba(15, 43, 89, 0.18)'
      : '0 0 0 5px rgba(39, 111, 207, 0.09), 0 12px 22px rgba(15, 43, 89, 0.12)'};
  transform: translate(-50%, -50%) scale(${({ $active }) => ($active ? 1.08 : 1)});
  transition:
    width 0.24s ease,
    height 0.24s ease,
    background 0.24s ease,
    box-shadow 0.24s ease,
    transform 0.24s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: ${({ $active }) => ($active ? '-20px' : '-16px')};
    border-radius: 50%;
    border: 1px solid ${({ $active }) => ($active ? 'rgba(39, 111, 207, 0.48)' : 'rgba(39, 111, 207, 0.32)')};
    animation: officePulse ${({ $active }) => ($active ? '1.65s' : '2.8s')} ease-out infinite;
  }

  &::after {
    animation-delay: 1.4s;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const ConnectorLayer = styled.svg`
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;

  @media (max-width: 780px) {
    display: none;
  }
`;

const ConnectorLine = styled.line<{ $active: boolean; accent: string }>`
  stroke: ${({ $active, accent }) => ($active ? accent : 'rgba(38, 137, 182, 0.34)')};
  stroke-width: ${({ $active }) => ($active ? 0.82 : 0.42)};
  stroke-linecap: round;
  stroke-dasharray: ${({ $active }) => ($active ? 'none' : '1.6 2.4')};
  vector-effect: non-scaling-stroke;
  filter: ${({ $active }) => ($active ? 'drop-shadow(0 8px 10px rgba(15, 43, 89, 0.18))' : 'none')};
  transition:
    stroke 0.2s ease,
    stroke-width 0.2s ease,
    filter 0.2s ease;
`;

const CountLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  color: #2c2e33;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    gap: 10px 16px;
  }
`;

const CountLabelStack = styled.span`
  display: inline-grid;
  gap: 10px;
  padding-bottom: 0.22em;
`;

const Count = styled.strong<{ $counting: boolean }>`
  display: inline-block;
  color: #2f3136;
  font-size: clamp(3.2rem, 8vw, 6.2rem);
  font-weight: 800;
  line-height: 0.84;
  letter-spacing: 0;
  transform-origin: 50% 78%;
  animation: ${({ $counting }) => ($counting ? 'countPop 0.38s cubic-bezier(0.2, 0.9, 0.24, 1.28)' : 'none')};
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
  margin: 0;
  color: #52697f;
  font-size: clamp(1.14rem, 1.35vw, 1.28rem);
  line-height: 1.78;
`;

const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 10px;
  color: #164f99;
  font-size: clamp(1.08rem, 1.45vw, 1.3rem);
  font-weight: 900;
  text-decoration: none;

  &::after {
    content: '';
    width: 36px;
    height: 1px;
    background: currentColor;
  }
`;

const Tiles = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;

  @media (max-width: 700px) {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 184px;
    gap: 18px;
    pointer-events: auto;
  }
`;

const OfficeTile = styled.a<{ x: number; y: number; $active: boolean }>`
  position: absolute;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: clamp(150px, 15vw, 214px);
  min-height: 128px;
  padding: 15px;
  color: #ffffff;
  text-decoration: none;
  background: #d9e3ed;
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-radius: 4px;
  box-shadow: ${({ $active }) =>
    $active ? '0 24px 46px rgba(15, 43, 89, 0.2)' : '0 16px 30px rgba(15, 43, 89, 0.1)'};
  overflow: hidden;
  pointer-events: auto;
  transform: translate(-50%, -50%);
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    filter 0.24s ease;

  &:hover {
    transform: translate(-50%, calc(-50% - 4px));
    box-shadow: 0 22px 40px rgba(15, 43, 89, 0.15);
    filter: saturate(1.05);
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
  background: linear-gradient(180deg, rgba(3, 20, 42, 0.02), rgba(3, 20, 42, 0.64));
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
  const mapOffices = visibleOffices.filter((office) => officeMapIds.has(office.id));
  const connectorOffices = visibleOffices.filter((office) => office.id !== 'vietnam');
  const [activeOfficeId, setActiveOfficeId] = useState<string | null>(null);
  const activeMapOfficeId = activeOfficeId ? (officeMapAliases[activeOfficeId] ?? activeOfficeId) : null;
  const { ref: countRef, value: officeCount, isCounting } = useCountUp(visibleOffices.length);
  const getStagePoint = (office: (typeof visibleOffices)[number]) => ({
    x: 33 + office.x * 0.42,
    y: 6 + office.y * 0.88,
  });
  const getTilePoint = (office: (typeof visibleOffices)[number]) => {
    const centerX = 54;
    const centerY = 50;

    return {
      x: clampCoordinate(centerX + (office.labelX - centerX) * 1.1, 9, 91),
      y: clampCoordinate(centerY + (office.labelY - centerY) * 1.08, 8, 92),
    };
  };
  const getMapOffice = (office: (typeof visibleOffices)[number]) => {
    const mapOfficeId = officeMapAliases[office.id] ?? office.id;

    return visibleOffices.find((candidate) => candidate.id === mapOfficeId) ?? office;
  };
  const getCardAnchor = (tilePoint: { x: number; y: number }, point: { x: number; y: number }) => {
    const cardHalfWidth = 8.8;
    const x = tilePoint.x < point.x ? tilePoint.x + cardHalfWidth : tilePoint.x - cardHalfWidth;

    return { x, y: tilePoint.y };
  };

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
              <ConnectorLayer viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {connectorOffices.map((office) => {
                  const mapOffice = getMapOffice(office);
                  const point = getStagePoint(mapOffice);
                  const tilePoint = getTilePoint(office);
                  const cardAnchor = getCardAnchor(tilePoint, point);

                  return (
                    <ConnectorLine
                      key={`${office.id}-connector`}
                      x1={point.x}
                      y1={point.y}
                      x2={cardAnchor.x}
                      y2={cardAnchor.y}
                      accent={mapOffice.accent}
                      $active={activeOfficeId === office.id || activeMapOfficeId === mapOffice.id}
                    />
                  );
                })}
              </ConnectorLayer>
              <MapHalo aria-hidden="true" />
              <KoreaMapImage src={koreaMapAsset} alt="" />
              {mapOffices.map((office) => {
                const point = getStagePoint(office);

                return (
                  <MapPoint
                    key={`${office.id}-point`}
                    x={point.x}
                    y={point.y}
                    accent={office.accent}
                    $active={activeMapOfficeId === office.id}
                    aria-label={t(office.label, office.labelEn)}
                  />
                );
              })}

              <Tiles aria-label={t('사무소 목록', 'Office list')}>
                {visibleOffices.map((office) => {
                  const tilePoint = getTilePoint(office);

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
