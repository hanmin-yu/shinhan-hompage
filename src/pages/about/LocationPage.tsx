import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { officeBranches, siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import { getGoogleMapUrl, getNaverMapUrl } from '../../utils/mapLinks';

const SectionInner = styled(P.PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const InfoPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NaverMapPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NaverMapPreview = styled.div`
  width: 100%;
  min-height: 440px;
  border: 1px solid rgba(19, 75, 154, 0.14);
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(20, 76, 158, 0.08), rgba(20, 76, 158, 0.02)),
    url('/subpages/about-history.jpg') center / cover no-repeat;

  @media (max-width: 768px) {
    min-height: 360px;
  }
`;

const MapLinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.2);
  background: #ffffff;
  color: #1d4f97;
  font-size: 0.86rem;
  font-weight: 700;
`;

const NaverPrimary = styled(MapLink)`
  min-height: 44px;
  padding: 0 16px;
  background: linear-gradient(180deg, #1f65c3, #184f9f);
  border-color: rgba(15, 63, 132, 0.32);
  color: #ffffff;
`;

export function LocationPage() {
  const { t } = useI18n();
  const hqOffice = officeBranches.find((office) => office.id === 'seoul') ?? officeBranches[0];
  const officeAddress = hqOffice?.address ?? siteContact.address;
  const officePhone = hqOffice?.tel ?? siteContact.phone;
  const officeFax = hqOffice?.fax ?? '02-540-2323';
  const naverMapUrl = getNaverMapUrl(officeAddress, hqOffice?.label ?? '신한관세법인 서울본사');
  const googleMapUrl = getGoogleMapUrl(officeAddress, hqOffice?.label ?? '신한관세법인 서울본사');

  return (
    <P.PageSection>
      <SectionInner data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>HQ Location</P.Kicker>
            <P.SectionTitle>{t('서울본사 오시는 길', 'Seoul HQ Directions')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <P.Lead>
          {t(
            '오시는 길은 서울본사 기준으로 안내합니다. 방문 전 담당자와 일정 확인 후 내방해 주세요.',
            'Directions are centered on the Seoul headquarters. Please confirm your schedule with the responsible team before visiting.',
          )}
        </P.Lead>

        <P.SplitGrid>
          <InfoPanel>
            <P.Kicker>Office Information</P.Kicker>
            <P.SectionTitle>{t('서울본사', 'Seoul HQ')}</P.SectionTitle>
            <P.BulletList>
              <li>
                {t('주소', 'Address')}: {officeAddress}
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
            </P.BulletList>

            <MapLinkRow>
              <MapLink href={naverMapUrl} target="_blank" rel="noreferrer">
                {t('네이버 지도 열기', 'Open Naver Map')}
              </MapLink>
              <MapLink href={googleMapUrl} target="_blank" rel="noreferrer">
                {t('Google 지도 열기', 'Open Google Maps')}
              </MapLink>
            </MapLinkRow>
          </InfoPanel>

          <NaverMapPanel>
            <P.Kicker>Naver Map</P.Kicker>
            <P.SectionTitle>{t('네이버 지도 안내', 'Naver Map Directions')}</P.SectionTitle>
            <P.CardText style={{ marginBottom: 10 }}>
              {t(
                '본사 위치 확인과 길찾기는 네이버 지도를 기준으로 제공합니다.',
                'Office location and navigation guidance are provided primarily through Naver Map.',
              )}
            </P.CardText>
            <NaverMapPreview aria-hidden="true" />
            <MapLinkRow>
              <NaverPrimary href={naverMapUrl} target="_blank" rel="noreferrer">
                {t('네이버 지도에서 본사 위치 확인', 'Open Seoul HQ in Naver Map')}
              </NaverPrimary>
            </MapLinkRow>
          </NaverMapPanel>
        </P.SplitGrid>
      </SectionInner>
    </P.PageSection>
  );
}
