import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { officeBranches, siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import { getGoogleMapEmbedUrl, getGoogleMapUrl, getNaverMapUrl } from '../../utils/mapLinks';

const SectionInner = styled(P.PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid rgba(19, 75, 154, 0.16);
  background: #ffffff;
`;

const InfoList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #3f5f88;
  font-size: 1rem;
  line-height: 1.7;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 15px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.2);
  background: #ffffff;
  color: #1d4f97;
  font-size: 0.9rem;
  font-weight: 700;
`;

const NaverPrimary = styled(MapLink)`
  background: linear-gradient(180deg, #1f65c3, #184f9f);
  border-color: rgba(15, 63, 132, 0.32);
  color: #ffffff;
`;

const MapPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  border-radius: 8px;
  border: 1px solid rgba(19, 75, 154, 0.16);
  background: #ffffff;
`;

const MapFrame = styled.div`
  width: 100%;
  min-height: 620px;
  border-radius: 8px;
  border: 1px solid rgba(19, 75, 154, 0.14);
  overflow: hidden;
  background: #edf4ff;

  iframe {
    width: 100%;
    height: 620px;
    border: 0;
    display: block;
  }

  @media (max-width: 1024px) {
    min-height: 520px;

    iframe {
      height: 520px;
    }
  }

  @media (max-width: 768px) {
    min-height: 400px;

    iframe {
      height: 400px;
    }
  }
`;

export function LocationPage() {
  const { t } = useI18n();
  const hqOffice = officeBranches.find((office) => office.id === 'seoul') ?? officeBranches[0];
  const officeAddress = hqOffice?.address ?? siteContact.address;
  const officeAddressEn = hqOffice?.addressEn ?? siteContact.addressEn;
  const officePhone = hqOffice?.tel ?? siteContact.phone;
  const officeFax = hqOffice?.fax ?? '02-540-2323';
  const mapSearchQuery = '신한관세법인';
  const naverMapUrl = getNaverMapUrl(mapSearchQuery);
  const googleMapUrl = getGoogleMapUrl(mapSearchQuery);
  const googleMapEmbedUrl = getGoogleMapEmbedUrl(mapSearchQuery);

  return (
    <P.HeroSection>
      <SectionInner data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>HQ Location</P.Kicker>
            <P.SectionTitle>{t('오시는 길', 'Directions')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <P.Lead>
          {t(
            '서울본사 기준 위치 정보를 먼저 확인한 뒤, 아래 지도에서 경로를 바로 확인하실 수 있습니다.',
            'Check Seoul HQ location details first, then review route guidance on the map below.',
          )}
        </P.Lead>

        <InfoPanel>
          <P.Kicker>Office Information</P.Kicker>
          <P.SectionTitle>{t('서울본사', 'Seoul HQ')}</P.SectionTitle>
          <InfoList>
            <li>
              {t('주소', 'Address')}: {t(officeAddress, officeAddressEn)}
            </li>
            <li>
              {t('대표번호', 'Phone')}: {officePhone}
            </li>
            <li>
              {t('팩스번호', 'Fax')}: {officeFax}
            </li>
            <li>
              {t('이메일', 'Email')}: {siteContact.email}
            </li>
          </InfoList>

          <ActionRow>
            <NaverPrimary href={naverMapUrl} target="_blank" rel="noreferrer">
              {t('네이버 지도 열기', 'Open Naver Map')}
            </NaverPrimary>
            <MapLink href={googleMapUrl} target="_blank" rel="noreferrer">
              {t('Google 지도 열기', 'Open Google Maps')}
            </MapLink>
          </ActionRow>
        </InfoPanel>

        <MapPanel>
          <P.Kicker>Map</P.Kicker>
          <P.SectionTitle>{t('본사 지도 안내', 'HQ Map')}</P.SectionTitle>
          <P.CardText>
            {t(
              '아래 지도에서 본사 위치를 크게 확인할 수 있습니다. 네이버 지도는 상단 버튼으로 바로 이동할 수 있습니다.',
              'You can view the HQ location on the large map below. Use the upper button for direct Naver Map access.',
            )}
          </P.CardText>
          <MapFrame>
            <iframe
              src={googleMapEmbedUrl}
              title={t('서울본사 지도', 'Seoul HQ Map')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapFrame>
        </MapPanel>
      </SectionInner>
    </P.HeroSection>
  );
}
