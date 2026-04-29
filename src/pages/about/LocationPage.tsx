import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { officeBranches, siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import { getGoogleMapEmbedUrl, getGoogleMapUrl, getNaverMapUrl } from '../../utils/mapLinks';

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
      <P.HeroSection>
        <P.PageContainer>
          <LandingSubnav
            kicker={aboutSubnav.kicker}
            kickerEn={aboutSubnav.kickerEn}
            title={aboutSubnav.title}
            titleEn={aboutSubnav.titleEn}
            items={aboutSubnav.items}
            compactBottom
          />
        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <P.IntroPanel>
            <P.Kicker>HQ Directions</P.Kicker>
            <P.Title>{t('오시는 길', 'Directions')}</P.Title>
            <P.Lead>
              {t(
                '신한관세법인 서울본사는 고객 미팅과 상담이 편리하도록 강남구 언주로에 위치해 있습니다.',
                'Shinhan Customs Service Seoul HQ is located on Eonju-ro in Gangnam-gu for convenient client meetings and consultations.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '아래에서 주소와 연락처를 확인하시고, 방문 전 담당자와 일정을 조율해 주시면 더 원활하게 안내해 드리겠습니다.',
                'Please review the address and contact details below, and coordinate with your Shinhan contact before visiting for smoother guidance.',
              )}
            </P.Lead>
            <LocationChips>
              <LocationChip>{t('서울본사', 'Seoul HQ')}</LocationChip>
              <LocationChip>{t('강남구 언주로', 'Eonju-ro, Gangnam-gu')}</LocationChip>
              <LocationChip>{t('방문 전 일정 조율', 'Schedule Before Visiting')}</LocationChip>
            </LocationChips>
          </P.IntroPanel>
          <LocationHeroVisual aria-hidden="true">
            <VisualBadge>{t('SHINHAN HQ', 'SHINHAN HQ')}</VisualBadge>
            <VisualTitle>{t('본사 위치 안내', 'HQ Location Guide')}</VisualTitle>
            <VisualAddress>{t(location.address, location.addressEn)}</VisualAddress>
          </LocationHeroVisual>
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Visit Information</P.Kicker>
              <P.SectionTitle>{t('방문 안내', 'Visit Information')}</P.SectionTitle>
            </div>
          </P.SectionHead>
          <DirectionsGrid>
            <LocationInfoPanel>
              <P.Kicker>Office Information</P.Kicker>
              <P.SectionTitle>{t('서울본사', 'Seoul HQ')}</P.SectionTitle>
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
              <P.Kicker>Map</P.Kicker>
              <P.SectionTitle>{t('본사 지도 안내', 'HQ Map')}</P.SectionTitle>
              <P.CardText>
                {t(
                  '지도를 통해 본사 위치를 확인하실 수 있습니다. 정확한 길찾기는 네이버 지도 또는 Google 지도를 이용해 주세요.',
                  'Use the map to review the HQ location. For precise route guidance, open Naver Map or Google Maps.',
                )}
              </P.CardText>
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
      </P.PageSection>
    </>
  );
}

export function DirectionsPage() {
  const { t } = useI18n();
  const location = useLocationViewData();

  return (
    <P.HeroSection>
      <StandaloneContainer data-reveal>
        <StandaloneHead>
          <P.Kicker>Directions</P.Kicker>
          <P.Title>{t('오시는 길', 'Directions')}</P.Title>
          <P.Lead>
            {t(
              '신한관세법인 서울본사 위치와 연락처를 한눈에 확인하실 수 있습니다.',
              'Find Shinhan Customs Service Seoul HQ location and contact details at a glance.',
            )}
          </P.Lead>
        </StandaloneHead>

        <StandaloneGrid>
          <LocationInfoPanel>
            <P.Kicker>Seoul HQ</P.Kicker>
            <P.SectionTitle>{t('서울본사', 'Seoul HQ')}</P.SectionTitle>
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
    </P.HeroSection>
  );
}

const LocationChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
`;

const LocationChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(20, 78, 161, 0.18);
  background: #f7fbff;
  color: #21539a;
  font-size: 0.82rem;
  font-weight: 700;
`;

const LocationHeroVisual = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 390px;
  padding: clamp(24px, 3vw, 36px);
  border-radius: 28px;
  border: 1px solid rgba(225, 238, 255, 0.3);
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(8, 37, 81, 0.04), rgba(8, 37, 81, 0.76)),
    radial-gradient(circle at 24% 22%, rgba(23, 159, 150, 0.34), transparent 18%),
    radial-gradient(circle at 74% 34%, rgba(255, 255, 255, 0.34), transparent 12%),
    url('/subpages/about-coms2.jpg') center / cover no-repeat;
  box-shadow: 0 28px 56px rgba(3, 15, 34, 0.22);

  &::before {
    content: '';
    position: absolute;
    inset: 18px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    pointer-events: none;
  }

  @media (max-width: 980px) {
    min-height: 280px;
  }
`;

const VisualBadge = styled.span`
  position: relative;
  z-index: 1;
  width: fit-content;
  min-height: 32px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #1f5cb2;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const VisualTitle = styled.strong`
  position: relative;
  z-index: 1;
  margin-top: 14px;
  color: #ffffff;
  font-size: clamp(1.8rem, 3.2vw, 3rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
`;

const VisualAddress = styled.span`
  position: relative;
  z-index: 1;
  margin-top: 10px;
  color: rgba(236, 245, 255, 0.92);
  font-size: 0.96rem;
  line-height: 1.6;
`;

const DirectionsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.82fr) minmax(0, 1.18fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const LocationInfoPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(24px, 2.6vw, 34px);
`;

const InfoRows = styled.div`
  display: grid;
  gap: 10px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(18, 72, 143, 0.09);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 250, 255, 0.96));

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

const MapPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(22px, 2.4vw, 28px);
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
