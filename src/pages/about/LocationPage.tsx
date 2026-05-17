import styled from '@emotion/styled';

import { palette } from '../../components/home/homeStyles';
import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useI18n } from '../../i18n/useI18n';
import { getGoogleMapEmbedUrl, getGoogleMapUrl, getNaverMapUrl } from '../../utils/mapLinks';

const LocationContentSection = styled(E.Section)`
  padding: clamp(92px, 10vw, 156px) 0;
  background: #ffffff;
`;

const LocationTitle = styled(E.Title)`
  max-width: 1160px;
  color: #172337;
  font-size: clamp(2.42rem, 4.9vw, 4.6rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
`;

const LocationHead = styled.div`
  display: grid;
  gap: 24px;
  max-width: 1160px;
  margin: 0 0 46px;
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
  const { content } = useSiteContent();
  const officeBranches = content.offices.officeBranches;
  const siteContact = content.global.siteContact;
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
  const { content } = useSiteContent();
  const aboutSubnav = content.global.sectionSubnav.about;
  const siteContact = content.global.siteContact;
  const locationCopy = content.about.copy.location;
  const location = useLocationViewData();

  return (
    <>
      <EditorialPageHeader
        config={aboutSubnav}
        title="오시는 길"
        titleEn="Directions"
        heroImage="/hero/menu-utility-directions-ai.png"
        heroPosition="center 50%"
      />

      <LocationContentSection>
        <P.PageContainer data-reveal>
          <LocationHead>
            <E.Eyebrow>Directions</E.Eyebrow>
            <LocationTitle>{t(locationCopy.aboutTitle, locationCopy.aboutTitleEn)}</LocationTitle>
          </LocationHead>
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
  const { content } = useSiteContent();
  const utilitySubnav = content.global.utilitySubnav;
  const siteContact = content.global.siteContact;
  const locationCopy = content.about.copy.location;
  const location = useLocationViewData();

  return (
    <>
      <EditorialPageHeader
        config={utilitySubnav}
        title="오시는 길"
        titleEn="Directions"
        heroImage="/hero/menu-utility-directions-ai.png"
        heroPosition="center 50%"
      />

      <LocationContentSection>
        <StandaloneContainer data-reveal>
          <StandaloneHead>
            <E.Eyebrow>Directions</E.Eyebrow>
            <LocationTitle>{t(locationCopy.standaloneTitle, locationCopy.standaloneTitleEn)}</LocationTitle>
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
  font-size: clamp(1.72rem, 3vw, 2.82rem);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: -0.035em;
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
  color: ${palette.blue};
  font-size: 0.82rem;
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
  color: ${palette.blue};
  font-size: 0.94rem;
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
  max-width: 1320px;
`;

const StandaloneHead = styled.div`
  display: grid;
  gap: 24px;
  max-width: 1160px;
  margin: 0;
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
