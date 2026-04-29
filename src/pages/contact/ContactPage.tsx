import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { officeBranches, siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import { getGoogleMapEmbedUrl, getGoogleMapUrl, getNaverMapUrl } from '../../utils/mapLinks';

export function ContactPage() {
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
        <HeroGrid>
          <HeroCopy>
            <P.Kicker>Contact Us</P.Kicker>
            <P.SectionTitle>{t('문의', 'Contact')}</P.SectionTitle>
            <P.Lead>
              {t(
                '대표 연락처와 본사 위치를 한 화면에서 확인하고, 바로 연결할 수 있도록 구성했습니다.',
                'This page brings together our primary contact channels and HQ location so you can connect right away.',
              )}
            </P.Lead>

            <HeroActions>
              <P.PrimaryButton to="/about/location">{t('오시는 길 보기', 'View Directions')}</P.PrimaryButton>
              <ActionAnchor href={`tel:${siteContact.phone.replace(/[^+\d]/g, '')}`}>
                {t('대표번호 연결', 'Call Main Line')}
              </ActionAnchor>
              <ActionAnchor href={`mailto:${siteContact.email}`}>{t('이메일 보내기', 'Send Email')}</ActionAnchor>
            </HeroActions>

            <QuickFacts>
              <QuickFact>
                <QuickLabel>{t('대표번호', 'Phone')}</QuickLabel>
                <QuickValue href={`tel:${siteContact.phone.replace(/[^+\d]/g, '')}`}>{siteContact.phone}</QuickValue>
              </QuickFact>
              <QuickFact>
                <QuickLabel>{t('이메일', 'Email')}</QuickLabel>
                <QuickValue href={`mailto:${siteContact.email}`}>{siteContact.email}</QuickValue>
              </QuickFact>
            </QuickFacts>
          </HeroCopy>

          <HeroPanel>
            <HeroPanelKicker>{t('Head Office', 'Head Office')}</HeroPanelKicker>
            <HeroPanelTitle>{t('서울본사 안내', 'Seoul HQ Information')}</HeroPanelTitle>
            <HeroPanelText>{t(officeAddress, officeAddressEn)}</HeroPanelText>
            <HeroMetaList>
              <HeroMetaItem>
                <MetaLabel>{t('대표번호', 'Phone')}</MetaLabel>
                <MetaValue href={`tel:${officePhone.replace(/[^+\d]/g, '')}`}>{officePhone}</MetaValue>
              </HeroMetaItem>
              <HeroMetaItem>
                <MetaLabel>{t('팩스번호', 'Fax')}</MetaLabel>
                <MetaStatic>{officeFax}</MetaStatic>
              </HeroMetaItem>
              <HeroMetaItem>
                <MetaLabel>{t('사업자등록번호', 'Business Registration No.')}</MetaLabel>
                <MetaStatic>{siteContact.businessNumber}</MetaStatic>
              </HeroMetaItem>
            </HeroMetaList>
          </HeroPanel>
        </HeroGrid>

        <ContactGrid>
          <ContactCard>
            <CardKicker>{t('Call', 'Call')}</CardKicker>
            <P.CardTitle>{t('대표번호', 'Phone')}</P.CardTitle>
            <P.CardText>
              {t(
                '전화 상담이 필요한 경우 대표번호로 바로 연결할 수 있습니다.',
                'For direct consultation, connect immediately through our main phone line.',
              )}
            </P.CardText>
            <ContactLink href={`tel:${siteContact.phone.replace(/[^+\d]/g, '')}`}>{siteContact.phone}</ContactLink>
          </ContactCard>

          <ContactCard>
            <CardKicker>{t('Email', 'Email')}</CardKicker>
            <P.CardTitle>{t('이메일', 'Email')}</P.CardTitle>
            <P.CardText>
              {t(
                '문의 사항을 메일로 보내주시면 확인 후 빠르게 안내드립니다.',
                'Send your inquiry by email and our team will respond as promptly as possible.',
              )}
            </P.CardText>
            <ContactLink href={`mailto:${siteContact.email}`}>{siteContact.email}</ContactLink>
          </ContactCard>

          <ContactCard>
            <CardKicker>{t('Location', 'Location')}</CardKicker>
            <P.CardTitle>{t('본사 위치', 'HQ Location')}</P.CardTitle>
            <P.CardText>{t(officeAddress, officeAddressEn)}</P.CardText>
            <ContactLink href={naverMapUrl} target="_blank" rel="noreferrer">
              {t('네이버 지도 열기', 'Open Naver Map')}
            </ContactLink>
          </ContactCard>
        </ContactGrid>

        <LocationGrid>
          <MapPanel>
            <P.Kicker>Map</P.Kicker>
            <P.SectionTitle>{t('본사 지도 안내', 'HQ Map')}</P.SectionTitle>
            <P.CardText>
              {t(
                '서울 본사 위치를 크게 확인하고, 네이버 지도와 Google 지도로 바로 이동할 수 있습니다.',
                'Review the Seoul HQ location in detail and jump directly to Naver Map or Google Maps.',
              )}
            </P.CardText>
            <MapActions>
              <MapPrimaryLink href={naverMapUrl} target="_blank" rel="noreferrer">
                {t('네이버 지도 열기', 'Open Naver Map')}
              </MapPrimaryLink>
              <MapSecondaryLink href={googleMapUrl} target="_blank" rel="noreferrer">
                {t('Google 지도 열기', 'Open Google Maps')}
              </MapSecondaryLink>
            </MapActions>
            <MapFrame>
              <iframe
                src={googleMapEmbedUrl}
                title={t('서울본사 지도', 'Seoul HQ Map')}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </MapFrame>
          </MapPanel>

          <GuidePanel>
            <P.Kicker>Visit Guide</P.Kicker>
            <P.SectionTitle>{t('방문 전 확인사항', 'Before Your Visit')}</P.SectionTitle>
            <GuideList>
              <GuideItem>
                <GuideLabel>{t('주소', 'Address')}</GuideLabel>
                <GuideText>{t(officeAddress, officeAddressEn)}</GuideText>
              </GuideItem>
              <GuideItem>
                <GuideLabel>{t('대표번호', 'Phone')}</GuideLabel>
                <GuideText>{officePhone}</GuideText>
              </GuideItem>
              <GuideItem>
                <GuideLabel>{t('팩스번호', 'Fax')}</GuideLabel>
                <GuideText>{officeFax}</GuideText>
              </GuideItem>
              <GuideItem>
                <GuideLabel>{t('이메일', 'Email')}</GuideLabel>
                <GuideText>{siteContact.email}</GuideText>
              </GuideItem>
            </GuideList>
            <GuideCallout>
              {t(
                '방문 전 담당자와 일정을 조율하시면 보다 정확한 안내를 받으실 수 있습니다.',
                'Coordinating your visit with the responsible team in advance helps us guide you more accurately.',
              )}
            </GuideCallout>
            <P.HeroActions>
              <P.PrimaryButton to="/about/location">{t('오시는 길 보기', 'View Directions')}</P.PrimaryButton>
            </P.HeroActions>
          </GuidePanel>
        </LocationGrid>
      </SectionInner>
    </P.HeroSection>
  );
}

const SectionInner = styled(P.PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
  gap: 22px;
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: clamp(28px, 3vw, 40px);
`;

const HeroActions = styled(P.HeroActions)`
  margin-top: 14px;
`;

const ActionAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 6px;
  border: 1px solid rgba(18, 78, 160, 0.16);
  background: rgba(255, 255, 255, 0.94);
  color: #1a4f9a;
  font-size: 0.92rem;
  font-weight: 700;
`;

const QuickFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 6px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const QuickFact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 18px 20px;
  border-radius: 16px;
  border: 1px solid rgba(18, 72, 143, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(243, 249, 255, 0.94));
`;

const QuickLabel = styled.span`
  color: #5f7594;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const QuickValue = styled.a`
  color: #143d79;
  font-size: 1.14rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  word-break: break-word;
`;

const HeroPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: clamp(26px, 2.8vw, 34px);
  background:
    radial-gradient(circle at top right, rgba(31, 93, 184, 0.14), transparent 26%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 248, 255, 0.96));
`;

const HeroPanelKicker = styled.span`
  color: #1e5bb4;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const HeroPanelTitle = styled.h3`
  margin: 0;
  color: #123a75;
  font-size: clamp(1.32rem, 2vw, 1.76rem);
  letter-spacing: -0.03em;
`;

const HeroPanelText = styled.p`
  margin: 0;
  color: #4c6788;
  font-size: 0.96rem;
  line-height: 1.68;
`;

const HeroMetaList = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 6px;
`;

const HeroMetaItem = styled.div`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 12px;
  align-items: start;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const MetaLabel = styled.span`
  color: #1f5cb2;
  font-size: 0.84rem;
  font-weight: 800;
`;

const MetaValue = styled.a`
  color: #163a70;
  font-size: 0.95rem;
  font-weight: 700;
  word-break: break-word;
`;

const MetaStatic = styled.span`
  color: #496582;
  font-size: 0.95rem;
  font-weight: 600;
  word-break: break-word;
`;

const ContactGrid = styled(P.Grid)`
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled(P.Card)`
  padding: 24px;
  gap: 12px;
`;

const CardKicker = styled.span`
  color: #5f7594;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const ContactLink = styled.a`
  margin-top: auto;
  color: #1b56ad;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.5;
  word-break: break-word;
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(320px, 0.82fr);
  gap: 22px;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const MapPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
`;

const MapActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MapBaseLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
`;

const MapPrimaryLink = styled(MapBaseLink)`
  background: linear-gradient(180deg, #2567c2, #174d9a);
  border: 1px solid rgba(19, 84, 180, 0.34);
  color: #ffffff;
  box-shadow: 0 14px 24px rgba(24, 74, 149, 0.16);
`;

const MapSecondaryLink = styled(MapBaseLink)`
  border: 1px solid rgba(18, 78, 160, 0.16);
  background: rgba(255, 255, 255, 0.96);
  color: #1a4f9a;
`;

const MapFrame = styled.div`
  width: 100%;
  min-height: 520px;
  margin-top: 2px;
  border-radius: 16px;
  border: 1px solid rgba(18, 72, 143, 0.12);
  overflow: hidden;
  background: #edf4ff;

  iframe {
    width: 100%;
    height: 520px;
    border: 0;
    display: block;
  }

  @media (max-width: 960px) {
    min-height: 420px;

    iframe {
      height: 420px;
    }
  }

  @media (max-width: 640px) {
    min-height: 340px;

    iframe {
      height: 340px;
    }
  }
`;

const GuidePanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
`;

const GuideList = styled.div`
  display: grid;
  gap: 12px;
`;

const GuideItem = styled.div`
  display: grid;
  gap: 4px;
  padding: 16px 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(18, 72, 143, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 249, 255, 0.95));
`;

const GuideLabel = styled.span`
  color: #1f5cb2;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const GuideText = styled.p`
  margin: 0;
  color: #496582;
  font-size: 0.94rem;
  line-height: 1.66;
  word-break: break-word;
`;

const GuideCallout = styled.p`
  margin: 2px 0 0;
  padding: 16px 18px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(232, 242, 255, 0.96), rgba(244, 249, 255, 0.96));
  color: #3f5f88;
  font-size: 0.94rem;
  line-height: 1.66;
`;
