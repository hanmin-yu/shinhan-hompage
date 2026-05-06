import styled from '@emotion/styled';

import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { utilitySubnav } from '../../config/utilitySubnav';
import { officeBranches, siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import { getGoogleMapEmbedUrl, getGoogleMapUrl, getNaverMapUrl } from '../../utils/mapLinks';

const LocationContentSection = styled(E.Section)`
  background: #ffffff;
`;

type LocationViewData = {
  address: string;
  addressEn: string;
  phone: string;
  fax: string;
  mapSearchQuery: string;
  naverMapUrl: string;
  googleMapUrl: string;
  googleMapEmbedUrl: string;
};

function useLocationViewData(): LocationViewData {
  const { t } = useI18n();
  const hqOffice = officeBranches.find((office) => office.id === 'seoul') ?? officeBranches[0];
  const address = hqOffice?.address ?? siteContact.address;
  const addressEn = hqOffice?.addressEn ?? siteContact.addressEn;
  const phone = hqOffice?.tel ?? siteContact.phone;
  const fax = hqOffice?.fax ?? '02-540-2323';
  const mapSearchQuery = t(hqOffice?.mapQuery ?? '신한관세법인', hqOffice?.mapQueryEn ?? 'Shinhan Customs Service');

  return {
    address,
    addressEn,
    phone,
    fax,
    mapSearchQuery,
    naverMapUrl: getNaverMapUrl(mapSearchQuery),
    googleMapUrl: getGoogleMapUrl(mapSearchQuery),
    googleMapEmbedUrl: getGoogleMapEmbedUrl(mapSearchQuery),
  };
}

export function LocationPage() {
  const { t } = useI18n();
  const aboutSubnav = sectionSubnav.about;
  const location = useLocationViewData();

  return (
    <>
      <EditorialPageHeader
        config={aboutSubnav}
        title="오시는 길"
        titleEn="Directions"
        heroImage="/hero/menu-about-offices-ai.png"
        heroPosition="center 50%"
      />

      <LocationContentSection>
        <P.PageContainer data-reveal>
          <E.Eyebrow>Directions</E.Eyebrow>
          <E.Title>{t('신한관세법인 서울본사 안내', 'Shinhan Customs Service Seoul HQ')}</E.Title>
          <E.Lead style={{ marginTop: 24, marginBottom: 46 }}>
            {t(
              '방문 전 연락처와 위치를 확인하실 수 있도록 본사 주소, 연락처, 지도 정보를 한 화면에 정리했습니다.',
              'Review Seoul HQ address, contact details, and map information in one place before visiting.',
            )}
          </E.Lead>
          <DirectionsGrid>
            <LocationInfoPanel>
              <E.Eyebrow>Office Information</E.Eyebrow>
              <OfficePanelTitle>{t('서울본사', 'Seoul HQ')}</OfficePanelTitle>
              <InfoRows>
                <InfoRow>
                  <InfoLabel>{t('주소', 'Address')}</InfoLabel>
                  <InfoValue>{t(location.address, location.addressEn)}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>{t('대표번호', 'Phone')}</InfoLabel>
                  <InfoValueLink href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}>{location.phone}</InfoValueLink>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>{t('팩스번호', 'Fax')}</InfoLabel>
                  <InfoValue>{location.fax}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>{t('이메일', 'Email')}</InfoLabel>
                  <InfoValueLink href={`mailto:${siteContact.email}`}>{siteContact.email}</InfoValueLink>
                </InfoRow>
              </InfoRows>
              <ActionRow>
                <PrimaryMapLink href={location.naverMapUrl} target="_blank" rel="noreferrer">
                  {t('네이버 지도 열기', 'Open Naver Map')}
                </PrimaryMapLink>
                <MapLink href={location.googleMapUrl} target="_blank" rel="noreferrer">
                  {t('Google 지도 열기', 'Open Google Maps')}
                </MapLink>
              </ActionRow>
            </LocationInfoPanel>

            <MapPanel>
              <E.Eyebrow>Map</E.Eyebrow>
              <OfficePanelTitle>{t('본사 지도 안내', 'HQ Map')}</OfficePanelTitle>
              <E.Body>
                {t(
                  '지도를 통해 본사 위치를 확인하실 수 있습니다. 정확한 길찾기는 네이버 지도 또는 Google 지도를 이용해 주세요.',
                  'Use the map to review the HQ location. For precise route guidance, open Naver Map or Google Maps.',
                )}
              </E.Body>
              <MapFrame>
                <iframe
                  src={location.googleMapEmbedUrl}
                  title={t('서울본사 지도', 'Seoul HQ Map')}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </MapFrame>
            </MapPanel>
          </DirectionsGrid>
        </P.PageContainer>
      </LocationContentSection>
    </>
  );
}

export function DirectionsPage() {
  const { t } = useI18n();
  const location = useLocationViewData();

  return (
    <>
      <EditorialPageHeader
        config={utilitySubnav}
        title="오시는 길"
        titleEn="Directions"
        heroImage="/hero/menu-about-offices-ai.png"
        heroPosition="center 50%"
      />

      <LocationContentSection>
        <StandaloneContainer data-reveal>
          <StandaloneHead>
            <E.Eyebrow>Directions</E.Eyebrow>
            <E.Title>{t('오시는 길', 'Directions')}</E.Title>
            <E.Lead>
              {t(
                '신한관세법인 서울본사 위치와 연락처를 한눈에 확인하실 수 있습니다.',
                'Find Shinhan Customs Service Seoul HQ location and contact details at a glance.',
              )}
            </E.Lead>
          </StandaloneHead>

          <StandaloneGrid>
            <LocationInfoPanel>
              <E.Eyebrow>Seoul HQ</E.Eyebrow>
              <OfficePanelTitle>{t('서울본사', 'Seoul HQ')}</OfficePanelTitle>
              <InfoRows>
                <InfoRow>
                  <InfoLabel>{t('주소', 'Address')}</InfoLabel>
                  <InfoValue>{t(location.address, location.addressEn)}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>{t('대표번호', 'Phone')}</InfoLabel>
                  <InfoValueLink href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}>{location.phone}</InfoValueLink>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>{t('팩스번호', 'Fax')}</InfoLabel>
                  <InfoValue>{location.fax}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>{t('이메일', 'Email')}</InfoLabel>
                  <InfoValueLink href={`mailto:${siteContact.email}`}>{siteContact.email}</InfoValueLink>
                </InfoRow>
              </InfoRows>
              <ActionRow>
                <PrimaryMapLink href={location.naverMapUrl} target="_blank" rel="noreferrer">
                  {t('네이버 지도 열기', 'Open Naver Map')}
                </PrimaryMapLink>
                <MapLink href={location.googleMapUrl} target="_blank" rel="noreferrer">
                  {t('Google 지도 열기', 'Open Google Maps')}
                </MapLink>
              </ActionRow>
            </LocationInfoPanel>

            <StandaloneMapPanel>
              <MapFrame $compact>
                <iframe
                  src={location.googleMapEmbedUrl}
                  title={t('서울본사 지도', 'Seoul HQ Map')}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </MapFrame>
            </StandaloneMapPanel>
          </StandaloneGrid>
        </StandaloneContainer>
      </LocationContentSection>
    </>
  );
}

const DirectionsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.82fr) minmax(0, 1.18fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const LocationInfoPanel = styled(E.LinePanel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(24px, 2.6vw, 34px) 0;
`;

const OfficePanelTitle = styled.h2`
  margin: 0;
  color: #172337;
  font-size: clamp(1.8rem, 3.2vw, 3.1rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.05em;
`;

const InfoRows = styled.div`
  display: grid;
  gap: 10px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 14px;
  padding: 14px 0;
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
  margin-top: 4px;
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 0;
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

const MapPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(24px, 2.6vw, 34px) 0;
  border: 0;
  border-top: 1px solid #d8dee8;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
`;

const MapFrame = styled.div<{ $compact?: boolean }>`
  width: 100%;
  min-height: ${({ $compact }) => ($compact ? '520px' : '560px')};
  border-radius: 16px;
  border: 1px solid rgba(19, 75, 154, 0.14);
  overflow: hidden;
  background: #edf4ff;

  iframe {
    width: 100%;
    height: ${({ $compact }) => ($compact ? '520px' : '560px')};
    border: 0;
    display: block;
  }

  @media (max-width: 1024px) {
    min-height: 480px;

    iframe {
      height: 480px;
    }
  }

  @media (max-width: 768px) {
    min-height: 360px;

    iframe {
      height: 360px;
    }
  }
`;

const StandaloneContainer = styled(P.PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const StandaloneHead = styled.div`
  max-width: 760px;
`;

const StandaloneGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.64fr) minmax(0, 1.36fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const StandaloneMapPanel = styled(P.Panel)`
  padding: 12px;
  overflow: hidden;
`;
