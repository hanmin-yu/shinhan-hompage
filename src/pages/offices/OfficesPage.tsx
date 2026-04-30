import styled from '@emotion/styled';
import { useState } from 'react';

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

  return officeBranches
    .filter((office) => office.id !== 'kord')
    .map((office) => {
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
        showNaverMap: !isVietnamOffice,
        naverMapUrl: isVietnamOffice ? undefined : getNaverMapUrl(mapSearchQuery),
        googleMapUrl: getGoogleMapUrl(googleMapQuery),
        googleMapEmbedUrl: getGoogleMapEmbedUrl(googleMapQuery),
      };
    });
}

export function OfficesPage() {
  const { t } = useI18n();
  const offices = useOfficeViewData();
  const [selectedOfficeId, setSelectedOfficeId] = useState(offices[0]?.id ?? '');
  const selectedOffice = offices.find((office) => office.id === selectedOfficeId) ?? offices[0];

  return (
    <>
      <EditorialPageHeader
        config={sectionSubnav.about}
        title="사무소"
        titleEn="Offices"
        heroImage="/hero/homepage/seoul-skyline-blue-sky.jpg"
        heroPosition="center 45%"
      />

      <OfficesSection>
        <P.PageContainer>
          <P.Kicker>Office Network</P.Kicker>
          <P.Title>{t('신한관세법인 사무소 안내', 'Shinhan Customs Service Office Network')}</P.Title>
          <P.Lead>
            {t(
              '전국 주요 거점과 베트남 법인의 연락처와 위치를 확인하실 수 있습니다. 방문 전 담당 사무소와 일정을 조율해 주세요.',
              'Find contact details and map locations for Shinhan offices across Korea and Vietnam. Please coordinate with the relevant office before visiting.',
            )}
          </P.Lead>
          <P.SectionDivider />

          {selectedOffice ? (
            <>
              <OfficeTabs aria-label={t('사무소 선택', 'Select office')}>
                {offices.map((office) => {
                  const isActive = office.id === selectedOffice.id;

                  return (
                    <OfficeTab
                      key={office.id}
                      type="button"
                      aria-selected={isActive}
                      data-active={isActive}
                      onClick={() => setSelectedOfficeId(office.id)}
                    >
                      <OfficeTabLabel>{t(office.label, office.labelEn)}</OfficeTabLabel>
                      <OfficeTabRegion>{t(office.region, office.regionEn)}</OfficeTabRegion>
                    </OfficeTab>
                  );
                })}
              </OfficeTabs>

              <OfficeBlock aria-live="polite">
                <OfficeInfoPanel>
                  <P.Kicker>Office Information</P.Kicker>
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
                  </ActionRow>
                </OfficeInfoPanel>

                <OfficeMapPanel>
                  <P.Kicker>Map</P.Kicker>
                  <P.SectionTitle>{t(`${selectedOffice.label} 지도 안내`, `${selectedOffice.labelEn} Map`)}</P.SectionTitle>
                  <P.CardText>
                    {t(
                      '지도를 통해 사무소 위치를 확인하실 수 있습니다. 정확한 길찾기는 네이버 지도 또는 Google 지도를 이용해 주세요.',
                      'Use the map to review this office location. For precise route guidance, open Naver Map or Google Maps.',
                    )}
                  </P.CardText>
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

const OfficesSection = styled(P.PageSection)`
  background: #ffffff;

  &::after {
    display: none;
  }
`;

const OfficeTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-top: clamp(30px, 4vw, 46px);
  margin-bottom: 22px;
  padding-bottom: 8px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const OfficeTab = styled.button`
  display: grid;
  flex: 0 0 auto;
  gap: 4px;
  min-width: 154px;
  min-height: 74px;
  padding: 14px 16px;
  border: 1px solid rgba(18, 72, 143, 0.12);
  border-radius: 12px;
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
    border-color: rgba(24, 79, 159, 0.36);
    background: linear-gradient(180deg, #1f65c3, #184f9f);
    color: #ffffff;
    box-shadow: 0 16px 28px rgba(24, 74, 149, 0.16);
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.46);
    outline-offset: 2px;
  }
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

const OfficeInfoPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 100%;
  padding: clamp(24px, 3vw, 40px);
  background:
    radial-gradient(circle at 100% 0%, rgba(43, 105, 190, 0.08), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(247, 251, 255, 0.98));
`;

const OfficeName = styled.h2`
  margin: 12px 0 0;
  color: #173b73;
  font-size: clamp(2.6rem, 5vw, 4.7rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.055em;
`;

const OfficeRegion = styled.p`
  margin: 0;
  color: #235da8;
  font-size: 0.98rem;
  font-weight: 800;
`;

const OfficeSummary = styled.p`
  margin: 0;
  color: #546d8a;
  font-size: 0.96rem;
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
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(18, 72, 143, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(246, 250, 255, 0.96));

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
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.56;
  word-break: break-word;
`;

const InfoValueLink = styled.a`
  color: #163a70;
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.56;
  word-break: break-word;
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
  border-radius: 999px;
  border: 1px solid rgba(20, 75, 157, 0.2);
  background: #ffffff;
  color: #1d4f97;
  font-size: 0.9rem;
  font-weight: 800;
`;

const PrimaryMapLink = styled(MapLink)`
  background: linear-gradient(180deg, #1f65c3, #184f9f);
  border-color: rgba(15, 63, 132, 0.32);
  color: #ffffff;
`;

const OfficeMapPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 100%;
  padding: clamp(22px, 2.5vw, 34px);
`;

const MapFrame = styled.div`
  width: 100%;
  min-height: 520px;
  border-radius: 16px;
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
