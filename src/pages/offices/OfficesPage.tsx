import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { officeBranches, siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import { getGoogleMapEmbedUrl, getGoogleMapUrl, getNaverMapUrl } from '../../utils/mapLinks';

type OfficeViewData = {
  id: string;
  label: string;
  labelEn: string;
  region: string;
  regionEn: string;
  summary: string;
  summaryEn: string;
  address: string;
  addressEn: string;
  tel: string;
  fax?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  showNaverMap: boolean;
  naverMapUrl?: string;
  googleMapUrl: string;
  googleMapEmbedUrl: string;
};

const addressOnlyMapOfficeIds = new Set(['busan', 'cheongju', 'gumi']);
const googleMapQueryOverrides: Record<string, string> = {
  vietnam: 'Star Tower, Duong Dinh Nghe, Yen Hoa, Cau Giay, Hanoi, Vietnam',
};

function useOfficeViewData(): OfficeViewData[] {
  const { t } = useI18n();

  return officeBranches.map((office) => {
      const isVietnamOffice = office.id === 'vietnam';
      const useAddressOnly = addressOnlyMapOfficeIds.has(office.id);
      const mapSearchQuery = useAddressOnly
        ? t(office.address, office.addressEn)
        : t(office.mapQuery ?? office.address, office.mapQueryEn ?? office.addressEn);
      const googleMapQuery = googleMapQueryOverrides[office.id] ?? (isVietnamOffice ? office.addressEn : mapSearchQuery);

      return {
        id: office.id,
        label: office.label,
        labelEn: office.labelEn,
        region: office.region,
        regionEn: office.regionEn,
        summary: office.summary,
        summaryEn: office.summaryEn,
        address: office.address,
        addressEn: office.addressEn,
        tel: office.tel,
        fax: office.fax,
        websiteUrl: office.websiteUrl,
        websiteLabel: office.websiteLabel,
        showNaverMap: !isVietnamOffice,
        naverMapUrl: isVietnamOffice ? undefined : getNaverMapUrl(mapSearchQuery),
        googleMapUrl: getGoogleMapUrl(googleMapQuery),
        googleMapEmbedUrl: getGoogleMapEmbedUrl(googleMapQuery),
      };
  });
}

export function OfficesPage() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const officeTabsRef = useRef<HTMLDivElement | null>(null);
  const offices = useOfficeViewData();
  const requestedOfficeId = searchParams.get('office');
  const initialOfficeId = offices.some((office) => office.id === requestedOfficeId) ? requestedOfficeId ?? '' : offices[0]?.id ?? '';
  const [selectedOfficeId, setSelectedOfficeId] = useState(initialOfficeId);
  const selectedOffice = offices.find((office) => office.id === selectedOfficeId) ?? offices[0];

  useEffect(() => {
    if (!requestedOfficeId) return;
    if (!offices.some((office) => office.id === requestedOfficeId)) return;
    setSelectedOfficeId(requestedOfficeId);
  }, [offices, requestedOfficeId]);

  const selectOffice = (officeId: string) => {
    setSelectedOfficeId(officeId);
    setSearchParams({ office: officeId }, { preventScrollReset: true });
  };
  const scrollOfficeTabs = (direction: 'prev' | 'next') => {
    const tabs = officeTabsRef.current;
    if (!tabs) return;

    const offset = tabs.clientWidth * 0.72 * (direction === 'prev' ? -1 : 1);
    tabs.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <>
      <EditorialPageHeader
        config={sectionSubnav.about}
        title="사무소"
        titleEn="Offices"
        heroImage="/hero/menu-about-offices-ai.png"
        heroPosition="center 50%"
      />

      <OfficesSection>
        <P.PageContainer>
          <E.Statement data-reveal>
            <div>
              <E.Eyebrow>Office Network</E.Eyebrow>
              <E.Title>{t('신한관세법인 사무소 안내', 'Shinhan Customs Service Office Network')}</E.Title>
            </div>
            <E.LeadGrid>
              <E.Lead>
                {t('전국 주요 거점과 베트남 법인의 연락처와 위치를 확인하실 수 있습니다.', 'Find contact details and map locations for Shinhan offices across Korea and Vietnam.')}
                <br />
                {t('방문 전 담당 사무소와 일정을 조율해 주세요.', 'Please coordinate with the relevant office before visiting.')}
              </E.Lead>
              <E.FactGrid>
                <E.Fact>
                  <E.FactValue>7</E.FactValue>
                  <E.FactLabel>{t('국내외 주요 거점', 'Domestic and overseas offices')}</E.FactLabel>
                </E.Fact>
                <E.Fact>
                  <E.FactValue>Seoul</E.FactValue>
                  <E.FactLabel>{t('서울본사 중심 운영', 'HQ-centered operations')}</E.FactLabel>
                </E.Fact>
                <E.Fact>
                  <E.FactValue>Vietnam</E.FactValue>
                  <E.FactLabel>{t('해외 법인 연계', 'Overseas entity connection')}</E.FactLabel>
                </E.Fact>
              </E.FactGrid>
            </E.LeadGrid>
          </E.Statement>

          {selectedOffice ? (
            <>
              <OfficeTabsShell>
                <OfficeScrollControls aria-label={t('사무소 목록 스크롤', 'Scroll office list')}>
                  <OfficeScrollButton
                    type="button"
                    aria-label={t('이전 사무소 보기', 'Show previous offices')}
                    onClick={() => scrollOfficeTabs('prev')}
                  >
                    ‹
                  </OfficeScrollButton>
                  <OfficeScrollButton
                    type="button"
                    aria-label={t('다음 사무소 보기', 'Show next offices')}
                    onClick={() => scrollOfficeTabs('next')}
                  >
                    ›
                  </OfficeScrollButton>
                </OfficeScrollControls>
                <OfficeTabs ref={officeTabsRef} aria-label={t('사무소 선택', 'Select office')}>
                  {offices.map((office) => {
                    const isActive = office.id === selectedOffice.id;

                    if (office.websiteUrl) {
                      return (
                        <OfficeTabLink
                          key={office.id}
                          href={office.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={t(`${office.label} 홈페이지 열기`, `Open ${office.labelEn} website`)}
                        >
                          <OfficeTabLabel>{t(office.label, office.labelEn)}</OfficeTabLabel>
                          <OfficeTabRegion>{t(office.region, office.regionEn)}</OfficeTabRegion>
                        </OfficeTabLink>
                      );
                    }

                    return (
                      <OfficeTab
                        key={office.id}
                        type="button"
                        aria-selected={isActive}
                        data-active={isActive}
                        onClick={() => selectOffice(office.id)}
                      >
                        <OfficeTabLabel>{t(office.label, office.labelEn)}</OfficeTabLabel>
                        <OfficeTabRegion>{t(office.region, office.regionEn)}</OfficeTabRegion>
                      </OfficeTab>
                    );
                  })}
                </OfficeTabs>
              </OfficeTabsShell>

              <OfficeBlock aria-live="polite">
                <OfficeInfoPanel>
                  <E.Eyebrow>Office Information</E.Eyebrow>
                  <OfficeName>{t(selectedOffice.label, selectedOffice.labelEn)}</OfficeName>
                  <OfficeRegion>{t(selectedOffice.region, selectedOffice.regionEn)}</OfficeRegion>
                  <OfficeSummary>{t(selectedOffice.summary, selectedOffice.summaryEn)}</OfficeSummary>

                  <InfoRows>
                    <InfoRow>
                      <InfoLabel>{t('주소', 'Address')}</InfoLabel>
                      <InfoValue>{t(selectedOffice.address, selectedOffice.addressEn)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{t('대표번호', 'Phone')}</InfoLabel>
                      <InfoValueLink href={`tel:${selectedOffice.tel.replace(/[^+\d]/g, '')}`}>{selectedOffice.tel}</InfoValueLink>
                    </InfoRow>
                    {selectedOffice.fax ? (
                      <InfoRow>
                        <InfoLabel>{t('팩스번호', 'Fax')}</InfoLabel>
                        <InfoValue>{selectedOffice.fax}</InfoValue>
                      </InfoRow>
                    ) : null}
                    <InfoRow>
                      <InfoLabel>{t('이메일', 'Email')}</InfoLabel>
                      <InfoValueLink href={`mailto:${siteContact.email}`}>{siteContact.email}</InfoValueLink>
                    </InfoRow>
                    {selectedOffice.websiteUrl ? (
                      <InfoRow>
                        <InfoLabel>{t('사이트', 'Website')}</InfoLabel>
                        <InfoValueLink href={selectedOffice.websiteUrl} target="_blank" rel="noreferrer">
                          {selectedOffice.websiteLabel ?? selectedOffice.websiteUrl}
                        </InfoValueLink>
                      </InfoRow>
                    ) : null}
                  </InfoRows>

                  <ActionRow>
                    {selectedOffice.showNaverMap && selectedOffice.naverMapUrl ? (
                      <>
                        <PrimaryMapLink href={selectedOffice.naverMapUrl} target="_blank" rel="noreferrer">
                          {t('네이버 지도 열기', 'Open Naver Map')}
                        </PrimaryMapLink>
                        <MapLink href={selectedOffice.googleMapUrl} target="_blank" rel="noreferrer">
                          {t('Google 지도 열기', 'Open Google Maps')}
                        </MapLink>
                      </>
                    ) : (
                      <PrimaryMapLink href={selectedOffice.googleMapUrl} target="_blank" rel="noreferrer">
                        {t('Google 지도 열기', 'Open Google Maps')}
                      </PrimaryMapLink>
                    )}
                    {selectedOffice.websiteUrl ? (
                      <MapLink href={selectedOffice.websiteUrl} target="_blank" rel="noreferrer">
                        {t('사이트 바로가기', 'Visit Website')}
                      </MapLink>
                    ) : null}
                  </ActionRow>
                </OfficeInfoPanel>

                <OfficeMapPanel>
                  <E.Eyebrow>Map</E.Eyebrow>
                  <MapTitle>{t(`${selectedOffice.label} 지도 안내`, `${selectedOffice.labelEn} Map`)}</MapTitle>
                  <E.Body>
                    {t(
                      '지도를 통해 사무소 위치를 확인하실 수 있습니다. 정확한 길찾기는 네이버 지도 또는 Google 지도를 이용해 주세요.',
                      'Use the map to review this office location. For precise route guidance, open Naver Map or Google Maps.',
                    )}
                  </E.Body>
                  <MapFrame>
                    <iframe
                      key={selectedOffice.id}
                      src={selectedOffice.googleMapEmbedUrl}
                      title={t(`${selectedOffice.label} 지도`, `${selectedOffice.labelEn} Map`)}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </MapFrame>
                </OfficeMapPanel>
              </OfficeBlock>
            </>
          ) : null}
        </P.PageContainer>
      </OfficesSection>
    </>
  );
}

const OfficesSection = styled(E.Section)`
  background: #ffffff;
`;

const OfficeTabsShell = styled.div`
  position: relative;
  margin-top: clamp(50px, 6vw, 76px);
  margin-bottom: 34px;
`;

const OfficeScrollControls = styled.div`
  position: absolute;
  right: 0;
  top: -52px;
  z-index: 2;
  display: inline-flex;
  gap: 8px;

  @media (max-width: 620px) {
    position: static;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
`;

const OfficeScrollButton = styled.button`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(24, 86, 178, 0.18);
  border-radius: 999px;
  background: #ffffff;
  color: #1f5cb2;
  font-size: 1.8rem;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(16, 54, 112, 0.08);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(24, 86, 178, 0.36);
    color: #173b73;
    box-shadow: 0 16px 30px rgba(16, 54, 112, 0.12);
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.46);
    outline-offset: 3px;
  }
`;

const OfficeTabs = styled.div`
  display: flex;
  gap: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  border-top: 1px solid #d8dee8;
  border-bottom: 1px solid #d8dee8;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const officeTabBase = css`
  position: relative;
  display: grid;
  flex: 0 0 auto;
  gap: 4px;
  min-width: 158px;
  min-height: 76px;
  padding: 15px 18px;
  border: 0;
  border-right: 1px solid #d8dee8;
  border-radius: 0;
  background: #ffffff;
  color: #496582;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  &[data-active='true'] {
    color: #172337;
    box-shadow: none;
  }

  &[data-active='true']::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 3px;
    background: #172337;
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.46);
    outline-offset: 2px;
  }
`;

const OfficeTab = styled.button`
  ${officeTabBase}
`;

const OfficeTabLink = styled.a`
  ${officeTabBase}
  text-decoration: none;
`;

const OfficeTabLabel = styled.span`
  font-size: 0.98rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  white-space: nowrap;
`;

const OfficeTabRegion = styled.span`
  color: currentColor;
  opacity: 0.72;
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
`;

const OfficeBlock = styled.section`
  display: grid;
  grid-template-columns: minmax(320px, 0.82fr) minmax(0, 1.18fr);
  gap: 24px;
  align-items: stretch;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const OfficeInfoPanel = styled(E.LinePanel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 100%;
  padding: clamp(24px, 3vw, 40px) 0;
`;

const OfficeName = styled.h2`
  margin: 12px 0 0;
  color: #173b73;
  font-size: clamp(2.6rem, 5vw, 4.7rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.055em;
`;

const MapTitle = styled.h2`
  margin: 0;
  color: #172337;
  font-size: clamp(1.72rem, 3vw, 2.8rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.05em;
`;

const OfficeRegion = styled.p`
  margin: 0;
  color: #235da8;
  font-size: 1.06rem;
  font-weight: 800;
`;

const OfficeSummary = styled.p`
  margin: 0;
  color: #546d8a;
  font-size: 1.06rem;
  line-height: 1.72;
`;

const InfoRows = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 8px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  padding: 16px 0;
  border-bottom: 1px solid #d8dee8;
  background: transparent;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const InfoLabel = styled.span`
  color: #1f5cb2;
  font-size: 0.84rem;
  font-weight: 800;
`;

const InfoValue = styled.span`
  color: #496582;
  font-size: 1.04rem;
  font-weight: 600;
  line-height: 1.56;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const InfoValueLink = styled.a`
  color: #163a70;
  font-size: 1.04rem;
  font-weight: 800;
  line-height: 1.56;
  word-break: normal;
  overflow-wrap: anywhere;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;

  @media (max-width: 560px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 0;
  border: 1px solid rgba(20, 75, 157, 0.2);
  background: #ffffff;
  color: #1d4f97;
  font-size: 0.98rem;
  font-weight: 800;
`;

const PrimaryMapLink = styled(MapLink)`
  background: linear-gradient(180deg, #1f65c3, #184f9f);
  border-color: rgba(15, 63, 132, 0.32);
  color: #ffffff;
`;

const OfficeMapPanel = styled(E.LinePanel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 100%;
  padding: clamp(22px, 2.5vw, 34px) 0;
`;

const MapFrame = styled.div`
  width: 100%;
  min-height: 520px;
  border-radius: 0;
  border: 1px solid rgba(19, 75, 154, 0.14);
  overflow: hidden;
  background: #edf4ff;

  iframe {
    display: block;
    width: 100%;
    height: 520px;
    border: 0;
  }

  @media (max-width: 1024px) {
    min-height: 460px;

    iframe {
      height: 460px;
    }
  }

  @media (max-width: 768px) {
    min-height: 340px;

    iframe {
      height: 340px;
    }
  }
`;
