import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import koreaMapAsset from '../../../assets/map-korea.svg';
import { officeBranches } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const officeFallbackImages: Record<string, string> = {
  seoul: '/hero/homepage/office-blue-sky.jpg',
  airport: '/hero/homepage/cargo-plane-sky.jpg',
  incheon: '/hero/incheon-airport.jpg',
  busan: '/hero/busan-port.jpg',
  cheongju: '/hero/homepage/office-tower-clear-sky.jpg',
  gumi: '/hero/auto-parts.jpg',
  invista: '/hero/practice-aeo-warehouse.jpg',
  vietnam: '/hero/homepage/seoul-skyline-blue-sky.jpg',
};

const Section = styled.section`
  position: relative;
  min-height: 780px;
  padding: 104px 0 112px;
  overflow: hidden;
  background:
    linear-gradient(128deg, rgba(239, 247, 253, 0.88) 0%, rgba(255, 255, 255, 0.74) 46%, rgba(233, 246, 244, 0.68) 100%),
    linear-gradient(180deg, #fbfdff 0%, #f5f8fb 100%);
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::before {
    content: '';
    position: absolute;
    right: -140px;
    top: -180px;
    width: min(42vw, 620px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(44, 157, 198, 0.14), rgba(44, 157, 198, 0.04) 42%, transparent 70%);
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

  @media (max-width: 860px) {
    min-height: auto;
    padding: 82px 0;

    &::before {
      width: 80vw;
      right: -46vw;
      top: -80px;
    }

  }
`;

const MapLabel = styled.span`
  position: absolute;
  right: clamp(18px, 5vw, 76px);
  bottom: clamp(24px, 6vw, 78px);
  z-index: 0;
  color: rgba(15, 43, 89, 0.055);
  font-size: clamp(4rem, 9vw, 9.2rem);
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
  grid-template-columns: minmax(240px, 0.7fr) minmax(340px, 0.78fr) minmax(420px, 0.9fr);
  gap: clamp(28px, 4vw, 58px);
  align-items: center;

  @media (max-width: 1180px) {
    grid-template-columns: minmax(0, 0.82fr) minmax(360px, 1.18fr);
    align-items: start;
  }

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled.div`
  display: grid;
  gap: 26px;
  min-height: 420px;
  align-content: center;

  @media (max-width: 1080px) {
    min-height: 0;
  }
`;

const MapStage = styled.div`
  position: relative;
  min-height: 640px;
  display: grid;
  place-items: center;

  @media (max-width: 1180px) {
    min-height: 560px;
  }

  @media (max-width: 780px) {
    min-height: 500px;
  }
`;

const MapPanel = styled.div`
  position: relative;
  width: min(118%, 680px);
  aspect-ratio: 0.86;
`;

const KoreaMapImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.42;
  filter: grayscale(1) contrast(1.42);
`;

const MapHalo = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 70%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(70, 181, 209, 0.14), rgba(70, 181, 209, 0.035) 45%, transparent 70%);
  transform: translate(-50%, -50%);
`;

const MapPoint = styled.span<{ x: number; y: number; accent: string }>`
  position: absolute;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ accent }) => accent};
  box-shadow: 0 0 0 6px rgba(70, 181, 209, 0.16), 0 14px 28px rgba(15, 43, 89, 0.16);
  transform: translate(-50%, -50%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 1px solid rgba(70, 181, 209, 0.36);
    animation: officePulse 2.8s ease-out infinite;
  }

  &::after {
    animation-delay: 1.4s;
  }
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #1c5aa9;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 36px;
    height: 1px;
    background: rgba(33, 101, 193, 0.48);
  }
`;

const CountLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 22px;
  color: #2c2e33;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    gap: 10px 16px;
  }
`;

const Count = styled.strong`
  color: #2f3136;
  font-size: clamp(5.8rem, 13vw, 10rem);
  font-weight: 800;
  line-height: 0.84;
  letter-spacing: 0;
`;

const CountLabel = styled.span`
  position: relative;
  display: inline-flex;
  padding-bottom: 0.22em;
  color: #30343a;
  font-size: clamp(2.1rem, 4vw, 4rem);
  font-weight: 500;
  line-height: 0.98;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: -8px;
    bottom: 0;
    height: 10px;
    background: rgba(70, 181, 209, 0.64);
    z-index: -1;
  }
`;

const Summary = styled.p`
  max-width: 620px;
  margin: 0;
  color: #52697f;
  font-size: 1rem;
  line-height: 1.78;
`;

const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 10px;
  color: #164f99;
  font-size: 0.92rem;
  font-weight: 800;
  text-decoration: none;

  &::after {
    content: '';
    width: 36px;
    height: 1px;
    background: currentColor;
  }
`;

const Tiles = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 86px;
  gap: 18px;

  @media (max-width: 1180px) {
    grid-column: 1 / -1;
    grid-auto-rows: 100px;
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 180px;
    gap: 12px;
  }
`;

const OfficeTile = styled(Link)<{ index: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 0;
  grid-column: ${({ index }) => {
    const spans = ['1 / span 4', '5 / span 4', '9 / span 4', '2 / span 4', '6 / span 4', '10 / span 3', '4 / span 4', '8 / span 4'];
    return spans[index % spans.length];
  }};
  grid-row: ${({ index }) => {
    const rows = ['1 / span 2', '2 / span 2', '1 / span 2', '4 / span 2', '4 / span 2', '3 / span 2', '6 / span 2', '6 / span 2'];
    return rows[index % rows.length];
  }};
  padding: 20px;
  color: #ffffff;
  text-decoration: none;
  background: #d9e3ed;
  box-shadow: 0 18px 34px rgba(15, 43, 89, 0.12);
  overflow: hidden;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    filter 0.24s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 42px rgba(15, 43, 89, 0.16);
    filter: saturate(1.05);
  }

  @media (max-width: 700px) {
    grid-column: auto;
    grid-row: auto;
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
  font-size: 0.78rem;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.34);
`;

const OfficeName = styled.strong`
  position: relative;
  margin-top: 8px;
  color: #ffffff;
  font-size: clamp(1.02rem, 1.5vw, 1.4rem);
  font-weight: 900;
  line-height: 1.18;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.34);
`;

export function OfficesSection() {
  const { t } = useI18n();
  const visibleOffices = officeBranches.filter((office) => office.id !== 'kord').slice(0, 8);
  const domesticOffices = visibleOffices.filter((office) => office.id !== 'vietnam');

  return (
    <>
      <S.SectionAnchor id="offices" />
      <S.SectionAnchor id="contact" />

      <Section>
        <MapLabel aria-hidden="true">NETWORK</MapLabel>
        <Inner data-reveal>
          <Copy>
            <Label>Offices</Label>
            <CountLine aria-label={t('8개 사무소', '8 offices')}>
              <Count>{visibleOffices.length}</Count>
              <CountLabel>Offices</CountLabel>
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
              <KoreaMapImage src={koreaMapAsset} alt="" />
              {domesticOffices.map((office) => (
                <MapPoint
                  key={`${office.id}-point`}
                  x={office.x}
                  y={office.y}
                  accent={office.accent}
                  aria-label={t(office.label, office.labelEn)}
                />
              ))}
            </MapPanel>
          </MapStage>

          <Tiles aria-label={t('사무소 목록', 'Office list')}>
            {visibleOffices.map((office, index) => (
              <OfficeTile
                key={office.id}
                to="/offices"
                index={index}
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
            ))}
          </Tiles>
        </Inner>
      </Section>
    </>
  );
}
