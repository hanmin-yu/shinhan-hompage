import { useMemo, useState } from 'react';
import styled from '@emotion/styled';

import koreaMapAsset from '../../../assets/map-korea.svg';
import vietnamMapAsset from '../../../assets/map-vietnam.svg';
import { officeBranches, siteContact } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { getGoogleMapUrl, getNaverMapUrl } from '../../../utils/mapLinks';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 88px 0 92px;
  background: linear-gradient(180deg, #edf4ff 0%, #f3f8ff 100%);
  border-top: 1px solid rgba(21, 77, 159, 0.12);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Head = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #103b72;
  font-size: clamp(2rem, 3.8vw, 2.9rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Label = styled.span`
  color: #21559d;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const OfficeTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OfficeTab = styled.button<{ $active: boolean }>`
  min-height: 40px;
  padding: 0 14px;
  border-radius: 6px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(19, 74, 154, 0.5)' : 'rgba(20, 76, 158, 0.2)')};
  background: ${({ $active }) => ($active ? '#dfeeff' : '#f8fbff')};
  color: ${({ $active }) => ($active ? '#154b94' : '#47698f')};
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr);
  gap: 16px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border-radius: 6px;
  border: 1px solid rgba(19, 74, 154, 0.19);
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(16, 53, 114, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    width: 56px;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, #2a6bc6, #7ba7de);
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(22, 79, 159, 0.16);
  color: #1a5197;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const OfficeName = styled.h3`
  margin: 0;
  color: #11407a;
  font-size: 1.46rem;
  letter-spacing: -0.02em;
`;

const OfficeSummary = styled.p`
  margin: 0;
  color: #43658e;
  font-size: 0.94rem;
  line-height: 1.66;
`;

const FactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const Fact = styled.div`
  padding: 14px;
  border-radius: 6px;
  border: 1px solid rgba(20, 76, 158, 0.16);
  background: #f1f7ff;
`;

const FactLabel = styled.strong`
  display: block;
  color: #1e559f;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const FactValue = styled.p`
  margin: 6px 0 0;
  color: #45678e;
  font-size: 0.9rem;
  line-height: 1.56;
`;

const MapLinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.26);
  background: #eef6ff;
  color: #19519c;
  font-size: 0.84rem;
  font-weight: 700;
`;

const ContactBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ContactItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 118px;
  padding: 18px;
  border-radius: 6px;
  border: 1px solid rgba(20, 76, 158, 0.18);
  background: #f0f7ff;
`;

const ContactLabel = styled.strong`
  color: #15509d;
  font-size: 1.02rem;
  letter-spacing: -0.01em;
`;

const ContactAction = styled.span`
  margin-top: auto;
  color: #1a59ae;
  font-size: 0.88rem;
  font-weight: 700;
`;

export function OfficesSection() {
  const { t, tx } = useI18n();
  const [selectedOfficeId, setSelectedOfficeId] = useState(officeBranches[0]?.id ?? '');
  const selectedOffice = officeBranches.find((office) => office.id === selectedOfficeId) ?? officeBranches[0];
  const domesticOffices = officeBranches.filter((office) => office.id !== 'vietnam');
  const vietnamOffice = officeBranches.find((office) => office.id === 'vietnam');
  const selectedDomesticOffice = domesticOffices.find((office) => office.id === selectedOffice.id);

  const phoneHref = useMemo(() => `tel:${siteContact.phone.replace(/-/g, '')}`, []);
  const mailHref = useMemo(() => `mailto:${siteContact.email}`, []);
  const googleMapUrl = useMemo(
    () => getGoogleMapUrl(selectedOffice?.address ?? siteContact.address, selectedOffice?.label),
    [selectedOffice],
  );
  const naverMapUrl = useMemo(
    () => getNaverMapUrl(selectedOffice?.address ?? siteContact.address, selectedOffice?.label),
    [selectedOffice],
  );

  if (!selectedOffice) return null;

  return (
    <>
      <S.SectionAnchor id="offices" />
      <S.SectionAnchor id="contact" />

      <Section>
        <Inner data-reveal>
          <Head>
            <div>
              <Label>Offices & Contact</Label>
              <Title>{t('사무소 / 문의', 'Offices / Contact')}</Title>
            </div>
          </Head>

          <OfficeTabs>
            {officeBranches.map((office) => (
              <OfficeTab
                key={office.id}
                type="button"
                $active={office.id === selectedOffice.id}
                onClick={() => setSelectedOfficeId(office.id)}
              >
                {tx(office.label)}
              </OfficeTab>
            ))}
          </OfficeTabs>

          <Grid>
            <InfoCard>
              <Badge>{tx(selectedOffice.region)}</Badge>
              <OfficeName>{tx(selectedOffice.label)}</OfficeName>
              <OfficeSummary>{tx(selectedOffice.summary)}</OfficeSummary>

              <FactGrid>
                <Fact>
                  <FactLabel>Address</FactLabel>
                  <FactValue>{selectedOffice.address}</FactValue>
                </Fact>
                <Fact>
                  <FactLabel>Contact</FactLabel>
                  <FactValue>TEL. {selectedOffice.tel}</FactValue>
                  {selectedOffice.fax ? <FactValue>FAX. {selectedOffice.fax}</FactValue> : null}
                </Fact>
              </FactGrid>

              <MapLinkRow>
                <MapLink href={googleMapUrl} target="_blank" rel="noreferrer">
                  {t('Google 지도', 'Google Maps')}
                </MapLink>
                <MapLink href={naverMapUrl} target="_blank" rel="noreferrer">
                  {t('네이버 지도', 'Naver Map')}
                </MapLink>
              </MapLinkRow>
            </InfoCard>

            <S.OfficesMapCard>
              <S.OfficesMapHeader>
                <S.OfficesMapTitle>{t('지사 미니맵', 'Office Mini Map')}</S.OfficesMapTitle>
                <S.OfficesMapBody>
                  {t(
                    '국내 지사와 베트남 법인을 한눈에 확인하고, 마커를 눌러 상세 정보를 볼 수 있습니다.',
                    'Check domestic branches and the Vietnam office at a glance, and click markers to view details.',
                  )}
                </S.OfficesMapBody>
              </S.OfficesMapHeader>

              <S.OfficesMiniMap>
                <S.OfficesMiniMapKoreaZone>
                  <S.OfficesMiniMapKoreaImage src={koreaMapAsset} alt={t('대한민국 지사 지도', 'Korea branch map')} />
                  <S.OfficesMapLines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {selectedDomesticOffice ? (
                      <line
                        x1={selectedDomesticOffice.x}
                        y1={selectedDomesticOffice.y}
                        x2={selectedDomesticOffice.labelX}
                        y2={selectedDomesticOffice.labelY}
                        stroke="rgba(54, 92, 146, 0.36)"
                        strokeWidth={0.85}
                        strokeLinecap="round"
                      />
                    ) : null}
                  </S.OfficesMapLines>

                  {domesticOffices.map((office) => (
                    <S.OfficesMapAnchor
                      key={office.id}
                      type="button"
                      active={selectedOffice.id === office.id}
                      accent={office.accent}
                      x={office.x}
                      y={office.y}
                      onClick={() => setSelectedOfficeId(office.id)}
                      aria-label={`${tx(office.label)} ${t('보기', 'view')}`}
                    >
                      <S.OfficesMapAnchorDot active={selectedOffice.id === office.id} accent={office.accent} />
                    </S.OfficesMapAnchor>
                  ))}

                  {domesticOffices
                    .filter((office) => office.id === selectedOffice.id)
                    .map((office) => (
                      <S.OfficesMapLabel
                        key={`${office.id}-label`}
                        type="button"
                        x={office.labelX}
                        y={office.labelY}
                        active={true}
                        accent={office.accent}
                        onClick={() => setSelectedOfficeId(office.id)}
                        aria-label={`${tx(office.label)} ${t('보기', 'view')}`}
                      >
                        <S.OfficesMapLabelDot active={true} accent={office.accent} />
                        {tx(office.shortLabel)}
                      </S.OfficesMapLabel>
                    ))}
                </S.OfficesMiniMapKoreaZone>

                {vietnamOffice ? (
                  <S.OfficesMiniMapVietnamZone>
                    <S.OfficesMiniMapInsetLabel>{t('베트남 법인', 'Vietnam Office')}</S.OfficesMiniMapInsetLabel>
                    <S.OfficesMiniMapVietnamImage src={vietnamMapAsset} alt={t('베트남 법인 지도', 'Vietnam office map')} />
                    <S.OfficesMiniMapInsetMeta>
                      <S.OfficesMiniMapInsetTitle>Vietnam Office</S.OfficesMiniMapInsetTitle>
                      <S.OfficesMiniMapInsetCity>Hanoi</S.OfficesMiniMapInsetCity>
                    </S.OfficesMiniMapInsetMeta>

                    <S.OfficesMapLines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      {selectedOffice.id === vietnamOffice.id ? (
                        <line
                          x1={vietnamOffice.x}
                          y1={vietnamOffice.y}
                          x2={vietnamOffice.labelX}
                          y2={vietnamOffice.labelY}
                          stroke="rgba(54, 92, 146, 0.34)"
                          strokeWidth={0.95}
                          strokeLinecap="round"
                        />
                      ) : null}
                    </S.OfficesMapLines>

                    <S.OfficesMapAnchor
                      type="button"
                      active={selectedOffice.id === vietnamOffice.id}
                      accent={vietnamOffice.accent}
                      x={vietnamOffice.x}
                      y={vietnamOffice.y}
                      onClick={() => setSelectedOfficeId(vietnamOffice.id)}
                      aria-label={`${tx(vietnamOffice.label)} ${t('보기', 'view')}`}
                    >
                      <S.OfficesMapAnchorDot
                        active={selectedOffice.id === vietnamOffice.id}
                        accent={vietnamOffice.accent}
                      />
                    </S.OfficesMapAnchor>

                    {selectedOffice.id === vietnamOffice.id ? (
                      <S.OfficesMapInsetLabelButton
                        type="button"
                        x={vietnamOffice.labelX}
                        y={vietnamOffice.labelY}
                        active={true}
                        accent={vietnamOffice.accent}
                        onClick={() => setSelectedOfficeId(vietnamOffice.id)}
                        aria-label={`${tx(vietnamOffice.label)} ${t('보기', 'view')}`}
                      >
                        <S.OfficesMapLabelDot active={true} accent={vietnamOffice.accent} />
                        {tx(vietnamOffice.shortLabel)}
                      </S.OfficesMapInsetLabelButton>
                    ) : null}
                  </S.OfficesMiniMapVietnamZone>
                ) : null}
              </S.OfficesMiniMap>

              <S.OfficesMapHint>
                {t('선택 지사', 'Selected Office')}: <strong>{tx(selectedOffice.label)}</strong> ·{' '}
                {tx(selectedOffice.region)}
              </S.OfficesMapHint>
            </S.OfficesMapCard>
          </Grid>

          <ContactBlock>
            <ContactItem href={phoneHref}>
              <ContactLabel>{t('전화 문의', 'Phone')}</ContactLabel>
              <ContactAction>{siteContact.phone}</ContactAction>
            </ContactItem>
            <ContactItem href={mailHref}>
              <ContactLabel>{t('온라인 문의', 'Online Inquiry')}</ContactLabel>
              <ContactAction>{siteContact.email}</ContactAction>
            </ContactItem>
            <ContactItem href={naverMapUrl} target="_blank" rel="noreferrer">
              <ContactLabel>{t('오시는 길', 'Directions')}</ContactLabel>
              <ContactAction>{selectedOffice.address}</ContactAction>
            </ContactItem>
          </ContactBlock>
        </Inner>
      </Section>
    </>
  );
}
