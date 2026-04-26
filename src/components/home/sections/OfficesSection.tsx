import { useMemo, useState } from 'react';
import styled from '@emotion/styled';

import koreaMapAsset from '../../../assets/map-korea.svg';
import vietnamMapAsset from '../../../assets/map-vietnam.svg';
import { officeBranches } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { getGoogleMapUrl, getNaverMapUrl } from '../../../utils/mapLinks';
import * as S from '../homeStyles';

const PRIMARY_OFFICE_IDS = ['seoul', 'airport', 'incheon', 'busan', 'cheongju', 'gumi'] as const;
const NETWORK_OFFICE_IDS = ['invista', 'vietnam', 'kord'] as const;

const Section = styled.section`
  padding: 88px 0 92px;
  background:
    radial-gradient(circle at 12% 18%, rgba(33, 101, 193, 0.1), transparent 20%),
    radial-gradient(circle at 86% 14%, rgba(214, 154, 54, 0.08), transparent 18%),
    linear-gradient(180deg, #f1f6fc 0%, #f7fbff 58%, #fbfdff 100%);
  border-top: 1px solid ${S.palette.lineSoft};
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Head = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: ${S.palette.textPrimary};
  font-size: clamp(2rem, 3.8vw, 2.9rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Label = styled.span`
  color: ${S.palette.blueDeep};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Intro = styled.p`
  max-width: 720px;
  margin: 14px 0 0;
  color: ${S.palette.textBody};
  font-size: 0.95rem;
  line-height: 1.76;
`;

const TabGroups = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 16px 24px;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const TabGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const TabGroupLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${S.palette.textPrimary};
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.01em;

  &::before {
    content: '';
    width: 22px;
    height: 1px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(33, 101, 193, 0.5), rgba(214, 154, 54, 0.28));
  }
`;

const OfficeTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const OfficeTab = styled.button<{ $active: boolean }>`
  min-height: 40px;
  padding: 0 16px;
  border-radius: 7px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(214, 154, 54, 0.22)' : S.palette.line)};
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(243, 249, 255, 0.96))'
      : 'rgba(255, 255, 255, 0.72)'};
  color: ${({ $active }) => ($active ? S.palette.blueInk : S.palette.textMuted)};
  font-size: 0.92rem;
  font-weight: ${({ $active }) => ($active ? 800 : 700)};
  box-shadow: ${({ $active }) =>
    $active ? 'inset 3px 0 0 #1d5aa9, 0 10px 18px rgba(16, 53, 114, 0.08)' : 'none'};
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: 24px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 28px;
  border-radius: 12px;
  border: 1px solid ${S.palette.line};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(244, 250, 255, 0.97), rgba(239, 248, 247, 0.88));
  box-shadow: 0 18px 32px rgba(16, 53, 114, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto auto 0;
    width: 96px;
    height: 2px;
    background: linear-gradient(90deg, #1d5aa9, rgba(23, 159, 150, 0.34), rgba(29, 90, 169, 0));
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 24px;
  padding: 0;
  color: ${S.palette.textMuted};
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const OfficeName = styled.h3`
  margin: 0;
  color: ${S.palette.textPrimary};
  font-size: clamp(1.7rem, 2vw, 2.1rem);
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const OfficeSummary = styled.p`
  margin: 0;
  color: ${S.palette.textBody};
  font-size: 0.98rem;
  line-height: 1.76;
`;

const FactGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Fact = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 18px 16px;
  border-radius: 10px;
  border: 1px solid ${S.palette.lineSoft};
  background: linear-gradient(180deg, #fcfdfe 0%, #f5f9fd 100%);
`;

const FactIconWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(20, 55, 101, 0.06);
  flex: 0 0 auto;
`;

const FactContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const FactLabel = styled.strong`
  display: block;
  color: ${S.palette.textBody};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const FactValue = styled.p`
  margin: 8px 0 0;
  color: ${S.palette.textBody};
  font-size: 0.98rem;
  line-height: 1.62;
`;

const ActionRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid ${S.palette.line};
  color: ${S.palette.blueDeep};
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  background: rgba(255, 255, 255, 0.94);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 20px rgba(20, 55, 101, 0.1);
  }
`;

const PrimaryAction = styled(ActionButton)`
  border-color: rgba(23, 159, 150, 0.18);
  background: linear-gradient(180deg, #f4f9fd 0%, #edf6fb 100%);
  color: ${S.palette.blueInk};
  box-shadow: 0 10px 18px rgba(20, 55, 101, 0.08);
`;

const SecondaryAction = styled(ActionButton)`
  color: #ffffff;
  background:
    linear-gradient(135deg, rgba(214, 154, 54, 0.18), rgba(214, 154, 54, 0) 28%),
    linear-gradient(180deg, #1d5aa9 0%, #174987 100%);
  border-color: transparent;
  box-shadow: 0 14px 24px rgba(23, 77, 152, 0.18);
`;

const UtilityLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: -2px;
`;

const UtilityLink = styled.a`
  color: ${S.palette.textMuted};
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid rgba(104, 122, 147, 0.32);
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${S.palette.blueDeep};
    border-color: rgba(37, 75, 128, 0.46);
  }
`;

const FactIcon = ({ kind }: { kind: 'pin' | 'phone' }) => {
  if (kind === 'pin') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 20C15.5 15.9 18 13 18 9.5C18 6.46 15.54 4 12.5 4C9.46 4 7 6.46 7 9.5C7 13 9.5 15.9 12 20Z"
          fill="#1C5AB0"
        />
        <circle cx="12.5" cy="9.5" r="2.4" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.4 5.5C7.8 5.1 8.4 5 8.9 5.2L10.9 6.1C11.5 6.3 11.8 7 11.7 7.6L11.3 9.5C11.2 9.9 11.3 10.3 11.6 10.6L13.4 12.4C13.7 12.7 14.1 12.8 14.5 12.7L16.4 12.3C17 12.2 17.7 12.5 17.9 13.1L18.8 15.1C19 15.6 18.9 16.2 18.5 16.6L17.4 17.7C16.8 18.3 15.9 18.5 15.1 18.2C12.7 17.3 10.5 15.8 8.7 14C6.9 12.2 5.4 10 4.5 7.6C4.2 6.8 4.4 5.9 5 5.3L7.4 5.5Z"
        fill="#1C5AB0"
      />
    </svg>
  );
};

const ActionIcon = ({ kind }: { kind: 'phone' | 'pin' | 'mail' }) => {
  if (kind === 'mail') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7.5L12 13.5L20 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (kind === 'pin') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 20C15.5 15.9 18 13 18 9.5C18 6.46 15.54 4 12.5 4C9.46 4 7 6.46 7 9.5C7 13 9.5 15.9 12 20Z"
          fill="currentColor"
        />
        <circle cx="12.5" cy="9.5" r="2.4" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.4 5.5C7.8 5.1 8.4 5 8.9 5.2L10.9 6.1C11.5 6.3 11.8 7 11.7 7.6L11.3 9.5C11.2 9.9 11.3 10.3 11.6 10.6L13.4 12.4C13.7 12.7 14.1 12.8 14.5 12.7L16.4 12.3C17 12.2 17.7 12.5 17.9 13.1L18.8 15.1C19 15.6 18.9 16.2 18.5 16.6L17.4 17.7C16.8 18.3 15.9 18.5 15.1 18.2C12.7 17.3 10.5 15.8 8.7 14C6.9 12.2 5.4 10 4.5 7.6C4.2 6.8 4.4 5.9 5 5.3L7.4 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

function getOfficeGroup(officeId: string) {
  if (PRIMARY_OFFICE_IDS.includes(officeId as (typeof PRIMARY_OFFICE_IDS)[number])) return 'primary';
  if (NETWORK_OFFICE_IDS.includes(officeId as (typeof NETWORK_OFFICE_IDS)[number])) return 'network';
  return 'primary';
}

function getDialNumber(tel: string) {
  const [first] = tel.split('~');
  return first.replace(/[^\d+]/g, '');
}

export function OfficesSection() {
  const { t } = useI18n();
  const [selectedOfficeId, setSelectedOfficeId] = useState('incheon');
  const selectedOffice = officeBranches.find((office) => office.id === selectedOfficeId) ?? officeBranches[0];

  const primaryOffices = officeBranches.filter((office) => getOfficeGroup(office.id) === 'primary');
  const networkOffices = officeBranches.filter((office) => getOfficeGroup(office.id) === 'network');
  const koreaMapOffices = officeBranches.filter((office) => office.id !== 'vietnam');
  const vietnamOffice = officeBranches.find((office) => office.id === 'vietnam');

  const phoneHref = useMemo(() => `tel:${getDialNumber(selectedOffice.tel)}`, [selectedOffice.tel]);
  const googleMapUrl = useMemo(
    () => getGoogleMapUrl(selectedOffice.address, selectedOffice.label),
    [selectedOffice.address, selectedOffice.label],
  );
  const naverMapUrl = useMemo(
    () => getNaverMapUrl(selectedOffice.address, selectedOffice.label),
    [selectedOffice.address, selectedOffice.label],
  );
  const directionsUrl = selectedOffice.id === 'vietnam' ? googleMapUrl : naverMapUrl;

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
              <Intro>
                {t(
                  '국내 주요 지사와 해외 네트워크를 통해 고객 실무에 가까운 관세 지원 체계를 운영합니다.',
                  'Our domestic offices and overseas network provide customs support close to where client operations happen.',
                )}
              </Intro>
            </div>
          </Head>

          <TabGroups>
            <TabGroup>
              <TabGroupLabel>{t('국내 주요 지사', 'Domestic Offices')}</TabGroupLabel>
              <OfficeTabs>
                {primaryOffices.map((office) => (
                  <OfficeTab
                    key={office.id}
                    type="button"
                    $active={office.id === selectedOffice.id}
                    onClick={() => setSelectedOfficeId(office.id)}
                  >
                    {t(office.label, office.labelEn)}
                  </OfficeTab>
                ))}
              </OfficeTabs>
            </TabGroup>

            <TabGroup>
              <TabGroupLabel>{t('해외 · 네트워크', 'Overseas / Network')}</TabGroupLabel>
              <OfficeTabs>
                {networkOffices.map((office) => (
                  <OfficeTab
                    key={office.id}
                    type="button"
                    $active={office.id === selectedOffice.id}
                    onClick={() => setSelectedOfficeId(office.id)}
                  >
                    {t(office.label, office.labelEn)}
                  </OfficeTab>
                ))}
              </OfficeTabs>
            </TabGroup>
          </TabGroups>

          <Grid>
            <InfoCard>
              <Badge>{t(selectedOffice.region, selectedOffice.regionEn)}</Badge>
              <OfficeName>{t(selectedOffice.label, selectedOffice.labelEn)}</OfficeName>
              <OfficeSummary>{t(selectedOffice.summary, selectedOffice.summaryEn)}</OfficeSummary>

              <FactGrid>
                <Fact>
                  <FactIconWrap>
                    <FactIcon kind="pin" />
                  </FactIconWrap>
                  <FactContent>
                    <FactLabel>Address</FactLabel>
                    <FactValue>{t(selectedOffice.address, selectedOffice.addressEn)}</FactValue>
                  </FactContent>
                </Fact>
                <Fact>
                  <FactIconWrap>
                    <FactIcon kind="phone" />
                  </FactIconWrap>
                  <FactContent>
                    <FactLabel>Contact</FactLabel>
                    <FactValue>
                      TEL. {selectedOffice.tel}
                      {selectedOffice.fax ? `  |  FAX. ${selectedOffice.fax}` : ''}
                    </FactValue>
                  </FactContent>
                </Fact>
              </FactGrid>

              <ActionRow>
                <PrimaryAction href={phoneHref}>
                  <ActionIcon kind="phone" />
                  {t('전화 문의', 'Phone Inquiry')}
                </PrimaryAction>
                <SecondaryAction href={directionsUrl} target="_blank" rel="noreferrer">
                  <ActionIcon kind="pin" />
                  {t('오시는 길', 'Directions')}
                </SecondaryAction>
              </ActionRow>

              <UtilityLinks>
                <UtilityLink href={googleMapUrl} target="_blank" rel="noreferrer">
                  {t('Google 지도 열기', 'Open in Google Maps')}
                </UtilityLink>
                {selectedOffice.id !== 'vietnam' ? (
                  <UtilityLink href={naverMapUrl} target="_blank" rel="noreferrer">
                    {t('네이버 지도 열기', 'Open in Naver Map')}
                  </UtilityLink>
                ) : null}
              </UtilityLinks>
            </InfoCard>

            <S.OfficesMapCard>
              <S.OfficesMapHeader>
                <S.OfficesMapTitle>{t('국내 지사 네트워크', 'Domestic Office Network')}</S.OfficesMapTitle>
                <S.OfficesMapBody>
                  {t(
                    '국내 주요 지사를 한 화면에서 확인할 수 있도록 정리한 미니맵입니다.',
                    'A minimap showing our domestic office network at a glance.',
                  )}
                </S.OfficesMapBody>
              </S.OfficesMapHeader>

              <S.OfficesMiniMap>
                <S.OfficesMiniMapKoreaZone>
                  <S.OfficesMiniMapKoreaImage src={koreaMapAsset} alt={t('대한민국 지사 지도', 'Korea branch map')} />

                  <S.OfficesMapLines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {koreaMapOffices.map((office) => (
                      <line
                        key={`${office.id}-line`}
                        x1={office.x}
                        y1={office.y}
                        x2={office.labelX}
                        y2={office.labelY}
                        stroke={office.id === selectedOffice.id ? 'rgba(44, 81, 138, 0.42)' : 'rgba(92, 114, 145, 0.18)'}
                        strokeWidth={office.id === selectedOffice.id ? 0.9 : 0.7}
                        strokeLinecap="round"
                      />
                    ))}
                  </S.OfficesMapLines>

                  {koreaMapOffices.map((office) => (
                    <S.OfficesMapAnchor
                      key={office.id}
                      type="button"
                      active={office.id === selectedOffice.id}
                      accent={office.accent}
                      x={office.x}
                      y={office.y}
                      onClick={() => setSelectedOfficeId(office.id)}
                      aria-label={`${t(office.label, office.labelEn)} ${t('보기', 'view')}`}
                    >
                      <S.OfficesMapAnchorDot active={office.id === selectedOffice.id} accent={office.accent} />
                    </S.OfficesMapAnchor>
                  ))}

                  {koreaMapOffices.map((office) => (
                    <S.OfficesMapLabel
                      key={`${office.id}-label`}
                      type="button"
                      x={office.labelX}
                      y={office.labelY}
                      active={office.id === selectedOffice.id}
                      accent={office.accent}
                      onClick={() => setSelectedOfficeId(office.id)}
                      aria-label={`${t(office.label, office.labelEn)} ${t('보기', 'view')}`}
                    >
                      {t(office.label, office.labelEn)}
                    </S.OfficesMapLabel>
                  ))}
                </S.OfficesMiniMapKoreaZone>

                {vietnamOffice ? (
                  <S.OfficesMiniMapVietnamZone data-active={selectedOffice.id === vietnamOffice.id}>
                    <S.OfficesMiniMapInsetTitle>Overseas</S.OfficesMiniMapInsetTitle>
                    <S.OfficesMiniMapVietnamImage src={vietnamMapAsset} alt={t('베트남 법인 지도', 'Vietnam office map')} />
                    <S.OfficesMiniMapInsetMeta>
                      <S.OfficesMiniMapInsetCity>Hanoi</S.OfficesMiniMapInsetCity>
                    </S.OfficesMiniMapInsetMeta>

                    <S.OfficesMapAnchor
                      type="button"
                      active={selectedOffice.id === vietnamOffice.id}
                      accent={vietnamOffice.accent}
                      x={vietnamOffice.x}
                      y={vietnamOffice.y}
                      onClick={() => setSelectedOfficeId(vietnamOffice.id)}
                      aria-label={`${t(vietnamOffice.label, vietnamOffice.labelEn)} ${t('보기', 'view')}`}
                    >
                      <S.OfficesMapAnchorDot
                        active={selectedOffice.id === vietnamOffice.id}
                        accent={vietnamOffice.accent}
                      />
                    </S.OfficesMapAnchor>
                  </S.OfficesMiniMapVietnamZone>
                ) : null}
              </S.OfficesMiniMap>

              <S.OfficesMapHint>
                {t('선택 지사', 'Selected Office')}: <strong>{t(selectedOffice.label, selectedOffice.labelEn)}</strong> ·{' '}
                {t(selectedOffice.region, selectedOffice.regionEn)}
              </S.OfficesMapHint>
            </S.OfficesMapCard>
          </Grid>
        </Inner>
      </Section>
    </>
  );
}
