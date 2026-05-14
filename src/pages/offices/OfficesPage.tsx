import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { palette } from '../../components/home/homeStyles';
import { sectionSubnav } from '../../config/sectionSubnav';
import { officeBranches, siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import {
  getGoogleMapEmbedUrl,
  getGoogleMapEmbedUrlByCoordinates,
  getGoogleMapUrl,
  getGoogleMapUrlByCoordinates,
  getNaverMapUrl,
} from '../../utils/mapLinks';

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
  email?: string;
  fax?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  showNaverMap: boolean;
  naverMapUrl?: string;
  googleMapUrl: string;
  googleMapEmbedUrl: string;
  locations: OfficeLocationViewData[];
};

type OfficeLocationViewData = {
  id: string;
  label: string;
  labelEn: string;
  address: string;
  addressEn: string;
  showNaverMap: boolean;
  naverMapUrl?: string;
  googleMapUrl: string;
  googleMapEmbedUrl: string;
};

const primaryOfficeIds = new Set(['seoul', 'airport', 'incheon', 'busan', 'cheongju', 'gumi']);
const googleMapQueryOverrides: Record<string, string> = {
  vietnam: 'Star Tower, Duong Dinh Nghe, Yen Hoa, Cau Giay, Hanoi, Vietnam',
};

function useOfficeViewData(): OfficeViewData[] {
  const { t } = useI18n();

  return officeBranches.map((office) => {
      const isVietnamOffice = office.id === 'vietnam';
      const baseLocations = office.locations?.length
        ? office.locations
        : [
            {
              id: office.id,
              label: office.label,
              labelEn: office.labelEn,
              address: office.address,
              addressEn: office.addressEn,
              mapQuery: office.mapQuery,
              mapQueryEn: office.mapQueryEn,
              naverMapUrl: office.naverMapUrl,
              coordinates: undefined,
            },
          ];
      const locations = baseLocations.map((location) => {
        const mapSearchQuery = t(location.mapQuery ?? location.address, location.mapQueryEn ?? location.addressEn);
        const googleMapQuery =
          googleMapQueryOverrides[location.id] ??
          googleMapQueryOverrides[office.id] ??
          (isVietnamOffice ? location.addressEn : mapSearchQuery);
        const coordinates = location.coordinates;

        return {
          id: location.id,
          label: location.label,
          labelEn: location.labelEn,
          address: location.address,
          addressEn: location.addressEn,
          showNaverMap: !isVietnamOffice,
          naverMapUrl: isVietnamOffice ? undefined : location.naverMapUrl ?? getNaverMapUrl(mapSearchQuery),
          googleMapUrl: coordinates ? getGoogleMapUrlByCoordinates(coordinates.lat, coordinates.lng) : getGoogleMapUrl(googleMapQuery),
          googleMapEmbedUrl: coordinates
            ? getGoogleMapEmbedUrlByCoordinates(coordinates.lat, coordinates.lng)
            : getGoogleMapEmbedUrl(googleMapQuery),
        };
      });
      const primaryLocation = locations[0];

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
        email: office.email,
        fax: office.fax,
        websiteUrl: office.websiteUrl,
        websiteLabel: office.websiteLabel,
        showNaverMap: !isVietnamOffice,
        naverMapUrl: primaryLocation?.naverMapUrl,
        googleMapUrl: primaryLocation?.googleMapUrl ?? getGoogleMapUrl(t(office.address, office.addressEn)),
        googleMapEmbedUrl: primaryLocation?.googleMapEmbedUrl ?? getGoogleMapEmbedUrl(t(office.address, office.addressEn)),
        locations,
      };
  });
}

export function OfficesPage() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const offices = useOfficeViewData();
  const requestedOfficeId = searchParams.get('office');
  const initialOfficeId = offices.some((office) => office.id === requestedOfficeId) ? requestedOfficeId ?? '' : offices[0]?.id ?? '';
  const [selectedOfficeId, setSelectedOfficeId] = useState(initialOfficeId);
  const selectedOffice = offices.find((office) => office.id === selectedOfficeId) ?? offices[0];
  const primaryOffices = offices.filter((office) => primaryOfficeIds.has(office.id));
  const affiliateOffices = offices.filter((office) => !primaryOfficeIds.has(office.id));

  useEffect(() => {
    if (!requestedOfficeId) return;
    if (!offices.some((office) => office.id === requestedOfficeId)) return;
    setSelectedOfficeId(requestedOfficeId);
  }, [offices, requestedOfficeId]);

  const selectOffice = (officeId: string) => {
    setSelectedOfficeId(officeId);
    setSearchParams({ office: officeId }, { preventScrollReset: true });
  };
  const renderOfficeTab = (office: OfficeViewData) => {
    const isActive = office.id === selectedOffice?.id;

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
  };

  return (
    <>
      <EditorialPageHeader
        config={sectionSubnav.about}
        title="관계사 안내"
        titleEn="Affiliates"
        heroImage="/hero/menu-about-offices-ai.png"
        heroPosition="center 50%"
      />

      <OfficesSection>
        <OfficeContainer>
          <E.Statement data-reveal>
            <div>
              <E.Eyebrow>Office Network</E.Eyebrow>
              <OfficePageTitle>{t('신한관세법인 및 관계사 안내', 'Shinhan Customs Service & Affiliates')}</OfficePageTitle>
            </div>
            <OfficeLeadGrid>
              <OfficePageLead>
                {t('전국 주요 거점과 베트남 법인의 연락처와 위치를 확인하실 수 있습니다.', 'Find contact details and map locations for Shinhan offices across Korea and Vietnam.')}
                <br />
                {t('방문 전 담당 사무소와 일정을 조율해 주세요.', 'Please coordinate with the relevant office before visiting.')}
              </OfficePageLead>
              <OfficeFactGrid>
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
              </OfficeFactGrid>
            </OfficeLeadGrid>
          </E.Statement>

          {selectedOffice ? (
            <>
              <OfficeTabsShell>
                <OfficeTabs aria-label={t('사무소 선택', 'Select office')}>
                  <OfficeTabGroup>
                    <OfficeTabGroupLabel>{t('신한 FAMILY', 'Shinhan Family')}</OfficeTabGroupLabel>
                    <OfficeTabGroupItems $columns={primaryOffices.length}>{primaryOffices.map(renderOfficeTab)}</OfficeTabGroupItems>
                  </OfficeTabGroup>
                  <OfficeTabDivider aria-hidden="true" />
                  <OfficeTabGroup>
                    <OfficeTabGroupLabel>{t('관계사', 'Affiliates')}</OfficeTabGroupLabel>
                    <OfficeTabGroupItems $columns={affiliateOffices.length}>{affiliateOffices.map(renderOfficeTab)}</OfficeTabGroupItems>
                  </OfficeTabGroup>
                </OfficeTabs>
              </OfficeTabsShell>

              <OfficeBlock aria-live="polite">
                <OfficeInfoPanel>
                  <E.Eyebrow>Office Information</E.Eyebrow>
                  <OfficeName>{t(selectedOffice.label, selectedOffice.labelEn)}</OfficeName>
                  <OfficeRegion>{t(selectedOffice.region, selectedOffice.regionEn)}</OfficeRegion>
                  <OfficeSummary>{t(selectedOffice.summary, selectedOffice.summaryEn)}</OfficeSummary>

                  <InfoRows>
                    {selectedOffice.locations.length > 1 ? (
                      <InfoRow>
                        <InfoLabel>{t('창고', 'Warehouses')}</InfoLabel>
                        <WarehouseList>
                          {selectedOffice.locations.map((location) => (
                            <WarehouseItem key={location.id}>
                              <WarehouseLabel>{t(location.label, location.labelEn)}</WarehouseLabel>
                              <InfoValue>{t(location.address, location.addressEn)}</InfoValue>
                            </WarehouseItem>
                          ))}
                        </WarehouseList>
                      </InfoRow>
                    ) : (
                      <InfoRow>
                        <InfoLabel>{t('주소', 'Address')}</InfoLabel>
                        <InfoValue>{t(selectedOffice.address, selectedOffice.addressEn)}</InfoValue>
                      </InfoRow>
                    )}
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
                      <InfoValueLink href={`mailto:${selectedOffice.email ?? siteContact.email}`}>
                        {selectedOffice.email ?? siteContact.email}
                      </InfoValueLink>
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
                    {selectedOffice.locations.length > 1 ? (
                      selectedOffice.locations.map((location) => (
                        <MapActionGroup key={location.id}>
                          <MapActionLabel>{t(location.label, location.labelEn)}</MapActionLabel>
                          {location.showNaverMap && location.naverMapUrl ? (
                            <PrimaryMapLink href={location.naverMapUrl} target="_blank" rel="noreferrer">
                              {t('네이버 지도 열기', 'Open Naver Map')}
                            </PrimaryMapLink>
                          ) : null}
                          <MapLink href={location.googleMapUrl} target="_blank" rel="noreferrer">
                            {t('Google 지도 열기', 'Open Google Maps')}
                          </MapLink>
                        </MapActionGroup>
                      ))
                    ) : selectedOffice.showNaverMap && selectedOffice.naverMapUrl ? (
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
                    {selectedOffice.locations.length > 1
                      ? t(
                          '지도에서 각 창고 위치를 확인하실 수 있습니다. 정확한 길찾기는 네이버 지도 또는 Google 지도를 이용해 주세요.',
                          'Use the maps to review each warehouse location. For precise route guidance, open Naver Map or Google Maps.',
                        )
                      : t(
                          '지도를 통해 사무소 위치를 확인하실 수 있습니다. 정확한 길찾기는 네이버 지도 또는 Google 지도를 이용해 주세요.',
                          'Use the map to review this office location. For precise route guidance, open Naver Map or Google Maps.',
                        )}
                  </E.Body>
                  <MapFrameGrid $multiple={selectedOffice.locations.length > 1}>
                    {selectedOffice.locations.map((location) => (
                      <MapFrame key={location.id} $multiple={selectedOffice.locations.length > 1}>
                        {selectedOffice.locations.length > 1 ? (
                          <MapFrameLabel>{t(location.label, location.labelEn)}</MapFrameLabel>
                        ) : null}
                        <iframe
                          src={location.googleMapEmbedUrl}
                          title={t(`${selectedOffice.label} ${location.label} 지도`, `${selectedOffice.labelEn} ${location.labelEn} Map`)}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </MapFrame>
                    ))}
                  </MapFrameGrid>
                </OfficeMapPanel>
              </OfficeBlock>
            </>
          ) : null}
        </OfficeContainer>
      </OfficesSection>
    </>
  );
}

const OfficesSection = styled(E.Section)`
  padding: clamp(92px, 10vw, 156px) 0;
  background: #ffffff;
`;

const OfficeContainer = styled(P.PageContainer)`
  max-width: 1480px;
`;

const OfficePageTitle = styled.h1`
  max-width: 1160px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.08rem, 3.7vw, 3.72rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0.015em;
  text-wrap: balance;
`;

const OfficePageLead = styled.p`
  max-width: 980px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.12rem, 1.38vw, 1.28rem);
  line-height: 1.82;
`;

const OfficeLeadGrid = styled(E.LeadGrid)`
  grid-template-columns: minmax(420px, 0.8fr) minmax(640px, 1fr);
  gap: clamp(30px, 4vw, 58px);
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

const OfficeFactGrid = styled(E.FactGrid)`
  width: 100%;
  min-width: 0;

  ${E.Fact} {
    min-height: 152px;
    padding: 28px 26px 24px;
  }

  ${E.FactLabel} {
    max-width: 180px;
  }

  @media (max-width: 1180px) {
    max-width: 780px;
  }

  @media (max-width: 640px) {
    ${E.FactLabel} {
      max-width: none;
    }
  }
`;

const OfficeTabsShell = styled.div`
  position: relative;
  margin-top: clamp(50px, 6vw, 76px);
  margin-bottom: clamp(40px, 4.8vw, 58px);

  @media (max-width: 760px) {
    margin-top: 34px;
    margin-bottom: 28px;
  }
`;

const OfficeTabs = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  gap: 16px;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  overflow: visible;
  padding: clamp(18px, 2vw, 24px);
  border: 1px solid #d8dee8;
  background:
    linear-gradient(180deg, rgba(248, 251, 255, 0.96), rgba(255, 255, 255, 0.98)),
    #ffffff;

  @media (max-width: 1180px) {
    gap: 14px;
    padding: 16px;
  }
`;

const OfficeTabGroup = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  min-width: 0;
`;

const OfficeTabGroupLabel = styled.span`
  display: inline-flex;
  align-items: center;
  justify-self: start;
  min-height: 22px;
  color: #243247;
  font-size: clamp(0.72rem, 0.78vw, 0.86rem);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;

  &::before {
    content: '';
    width: 18px;
    height: 2px;
    margin-right: 8px;
    border-radius: 999px;
    background: #1f5cb2;
  }
`;

const OfficeTabGroupItems = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: clamp(8px, 0.8vw, 12px);
  min-width: 0;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const OfficeTabDivider = styled.span`
  align-self: stretch;
  width: 100%;
  height: 1px;
  margin: 8px 0 2px;
  background: linear-gradient(90deg, transparent 0%, #c9d4e3 18%, #c9d4e3 82%, transparent 100%);
`;

const officeTabBase = css`
  position: relative;
  display: inline-flex;
  width: 100%;
  min-width: 0;
  min-height: 84px;
  padding: 14px 22px 15px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  border: 1px solid rgba(31, 92, 178, 0.14);
  border-radius: 6px;
  background: #ffffff;
  color: #496582;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(16, 54, 112, 0.04);
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;

  &[data-active='true'] {
    border-color: rgba(31, 92, 178, 0.34);
    background:
      linear-gradient(180deg, rgba(235, 244, 255, 0.98), rgba(255, 255, 255, 0.98)),
      #ffffff;
    color: #172337;
    box-shadow: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 14px;
    bottom: 14px;
    width: 4px;
    border-radius: 999px;
    background: #1f5cb2;
    opacity: 0;
    transform: scaleY(0.45);
    transform-origin: center;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  &[data-active='true']::before,
  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    transform: scaleY(1);
  }

  &:hover,
  &:focus-visible {
    border-color: rgba(31, 92, 178, 0.3);
    background: #f7f9fc;
    color: #172337;
    box-shadow: 0 12px 24px rgba(16, 54, 112, 0.08);
    transform: translateY(-1px);
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.46);
    outline-offset: 2px;
  }

  @media (max-width: 760px) {
    min-height: 58px;
    padding: 11px 14px 11px 18px;
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
  padding-left: 20px;
  min-width: 0;
  max-width: 100%;
  font-size: clamp(0.82rem, 0.82vw, 0.96rem);
  font-weight: 850;
  letter-spacing: 0;
  line-height: 1.22;
  white-space: normal;
  word-break: keep-all;

  @media (max-width: 760px) {
    font-size: 0.8rem;
  }
`;

const OfficeTabRegion = styled.span`
  color: currentColor;
  opacity: 0.72;
  padding-left: 20px;
  min-width: 0;
  max-width: 100%;
  font-size: clamp(0.66rem, 0.68vw, 0.76rem);
  font-weight: 800;
  line-height: 1.25;
  white-space: normal;
  word-break: keep-all;

  @media (max-width: 760px) {
    font-size: 0.68rem;
  }
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
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.03em;
`;

const MapTitle = styled.h2`
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.03em;
`;

const OfficeRegion = styled.p`
  margin: 0;
  color: #235da8;
  font-size: 1.06rem;
  font-weight: 800;
`;

const OfficeSummary = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.18vw, 1.14rem);
  line-height: 1.84;
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
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.56;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const WarehouseList = styled.div`
  display: grid;
  gap: 14px;
`;

const WarehouseItem = styled.div`
  display: grid;
  gap: 5px;
`;

const WarehouseLabel = styled.strong`
  color: #172337;
  font-size: 0.98rem;
  font-weight: 850;
`;

const InfoValueLink = styled.a`
  color: ${palette.blue};
  font-size: 1rem;
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

const MapActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 0;
  border-top: 1px solid #d8dee8;

  &:first-of-type {
    border-top: 0;
    padding-top: 0;
  }

  @media (max-width: 560px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const MapActionLabel = styled.span`
  min-width: 62px;
  color: #172337;
  font-size: 0.94rem;
  font-weight: 850;
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

const MapFrameGrid = styled.div<{ $multiple: boolean }>`
  display: grid;
  grid-template-columns: ${({ $multiple }) => ($multiple ? 'repeat(2, minmax(0, 1fr))' : '1fr')};
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const MapFrame = styled.div<{ $multiple: boolean }>`
  position: relative;
  width: 100%;
  min-height: ${({ $multiple }) => ($multiple ? '390px' : '520px')};
  border-radius: 0;
  border: 1px solid rgba(19, 75, 154, 0.14);
  overflow: hidden;
  background: #edf4ff;

  iframe {
    display: block;
    width: 100%;
    height: ${({ $multiple }) => ($multiple ? '390px' : '520px')};
    border: 0;
  }

  @media (max-width: 1024px) {
    min-height: ${({ $multiple }) => ($multiple ? '360px' : '460px')};

    iframe {
      height: ${({ $multiple }) => ($multiple ? '360px' : '460px')};
    }
  }

  @media (max-width: 768px) {
    min-height: 340px;

    iframe {
      height: 340px;
    }
  }
`;

const MapFrameLabel = styled.span`
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: rgba(18, 63, 133, 0.92);
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 850;
  box-shadow: 0 10px 20px rgba(16, 54, 112, 0.18);
`;
