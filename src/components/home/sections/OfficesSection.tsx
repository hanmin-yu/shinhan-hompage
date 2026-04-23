import { useMemo, useState } from 'react';
import styled from '@emotion/styled';

import koreaMapAsset from '../../../assets/map-korea.svg';
import vietnamMapAsset from '../../../assets/map-vietnam.svg';
import { officeBranches, siteContact } from '../../../data/home';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 92px 0 96px;
  background: #f7f9fc;
  border-top: 1px solid rgba(21, 77, 159, 0.08);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Head = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  color: #2e5692;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #122f57;
  font-size: clamp(2rem, 3.8vw, 2.9rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 0;
  max-width: 580px;
  color: #4d6384;
  font-size: 0.95rem;
  line-height: 1.7;
`;

const OfficeTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OfficeTab = styled.button<{ $active: boolean }>`
  min-height: 40px;
  padding: 0 14px;
  border-radius: 7px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(19, 74, 154, 0.42)' : 'rgba(20, 76, 158, 0.16)')};
  background: ${({ $active }) => ($active ? '#ebf2ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#194c92' : '#5e738f')};
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
  border-radius: 10px;
  border: 1px solid rgba(19, 74, 154, 0.16);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(16, 53, 114, 0.07);
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(22, 79, 159, 0.12);
  color: #1e4f92;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const OfficeName = styled.h3`
  margin: 0;
  color: #173d74;
  font-size: 1.46rem;
  letter-spacing: -0.02em;
`;

const OfficeSummary = styled.p`
  margin: 0;
  color: #4f6789;
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
  border-radius: 8px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background: #ffffff;
`;

const FactLabel = styled.strong`
  display: block;
  color: #245493;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const FactValue = styled.p`
  margin: 6px 0 0;
  color: #4f6789;
  font-size: 0.9rem;
  line-height: 1.56;
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
  border-radius: 8px;
  border: 1px solid rgba(20, 76, 158, 0.14);
  background: #f8fbff;
`;

const ContactLabel = styled.strong`
  color: #1e4f92;
  font-size: 1.02rem;
  letter-spacing: -0.01em;
`;

const ContactText = styled.p`
  margin: 0;
  color: #5a7091;
  font-size: 0.9rem;
  line-height: 1.56;
`;

const ContactAction = styled.span`
  margin-top: auto;
  color: #1c57a8;
  font-size: 0.88rem;
  font-weight: 700;
`;

export function OfficesSection() {
  const [selectedOfficeId, setSelectedOfficeId] = useState(officeBranches[0]?.id ?? '');
  const selectedOffice = officeBranches.find((office) => office.id === selectedOfficeId) ?? officeBranches[0];
  const domesticOffices = officeBranches.filter((office) => office.id !== 'vietnam');
  const vietnamOffice = officeBranches.find((office) => office.id === 'vietnam');

  const phoneHref = useMemo(() => `tel:${siteContact.phone.replace(/-/g, '')}`, []);
  const mailHref = useMemo(() => `mailto:${siteContact.email}`, []);

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
              <Title>사무소 / 문의</Title>
            </div>
            <Description>
              국내 지사와 해외 법인 정보를 한 화면에서 확인하고, 선택 지사 기준 상세 정보와 문의 채널을 바로 연결할 수
              있도록 구성했습니다.
            </Description>
          </Head>

          <OfficeTabs>
            {officeBranches.map((office) => (
              <OfficeTab
                key={office.id}
                type="button"
                $active={office.id === selectedOffice.id}
                onClick={() => setSelectedOfficeId(office.id)}
              >
                {office.label}
              </OfficeTab>
            ))}
          </OfficeTabs>

          <Grid>
            <InfoCard>
              <Badge>{selectedOffice.region}</Badge>
              <OfficeName>{selectedOffice.label}</OfficeName>
              <OfficeSummary>{selectedOffice.summary}</OfficeSummary>

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
            </InfoCard>

            <S.OfficesMapCard>
              <S.OfficesMapHeader>
                <S.OfficesMapTitle>지사 미니맵</S.OfficesMapTitle>
                <S.OfficesMapBody>
                  국내 지사와 베트남 법인을 한눈에 확인하고, 마커를 눌러 상세 정보를 볼 수 있습니다.
                </S.OfficesMapBody>
              </S.OfficesMapHeader>

              <S.OfficesMiniMap>
                <S.OfficesMiniMapKoreaZone>
                  <S.OfficesMiniMapKoreaImage src={koreaMapAsset} alt="대한민국 지사 지도" />
                  <S.OfficesMapLines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {domesticOffices.map((office) => (
                      <line
                        key={office.id}
                        x1={office.x}
                        y1={office.y}
                        x2={office.labelX}
                        y2={office.labelY}
                        stroke={
                          selectedOffice.id === office.id ? 'rgba(54, 92, 146, 0.36)' : 'rgba(54, 92, 146, 0.18)'
                        }
                        strokeWidth={selectedOffice.id === office.id ? 0.8 : 0.48}
                        strokeLinecap="round"
                      />
                    ))}
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
                      aria-label={`${office.label} 보기`}
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
                        aria-label={`${office.label} 보기`}
                      >
                        <S.OfficesMapLabelDot active={true} accent={office.accent} />
                        {office.shortLabel}
                      </S.OfficesMapLabel>
                    ))}
                </S.OfficesMiniMapKoreaZone>

                {vietnamOffice ? (
                  <S.OfficesMiniMapVietnamZone>
                    <S.OfficesMiniMapInsetLabel>베트남 법인</S.OfficesMiniMapInsetLabel>
                    <S.OfficesMiniMapVietnamImage src={vietnamMapAsset} alt="베트남 법인 지도" />
                    <S.OfficesMiniMapInsetMeta>
                      <S.OfficesMiniMapInsetTitle>Vietnam Office</S.OfficesMiniMapInsetTitle>
                      <S.OfficesMiniMapInsetCity>Hanoi</S.OfficesMiniMapInsetCity>
                    </S.OfficesMiniMapInsetMeta>

                    <S.OfficesMapLines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      <line
                        x1={vietnamOffice.x}
                        y1={vietnamOffice.y}
                        x2={vietnamOffice.labelX}
                        y2={vietnamOffice.labelY}
                        stroke={
                          selectedOffice.id === vietnamOffice.id ? 'rgba(54, 92, 146, 0.34)' : 'rgba(54, 92, 146, 0.18)'
                        }
                        strokeWidth={selectedOffice.id === vietnamOffice.id ? 0.95 : 0.58}
                        strokeLinecap="round"
                      />
                    </S.OfficesMapLines>

                    <S.OfficesMapAnchor
                      type="button"
                      active={selectedOffice.id === vietnamOffice.id}
                      accent={vietnamOffice.accent}
                      x={vietnamOffice.x}
                      y={vietnamOffice.y}
                      onClick={() => setSelectedOfficeId(vietnamOffice.id)}
                      aria-label={`${vietnamOffice.label} 보기`}
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
                        aria-label={`${vietnamOffice.label} 보기`}
                      >
                        <S.OfficesMapLabelDot active={true} accent={vietnamOffice.accent} />
                        {vietnamOffice.shortLabel}
                      </S.OfficesMapInsetLabelButton>
                    ) : null}
                  </S.OfficesMiniMapVietnamZone>
                ) : null}
              </S.OfficesMiniMap>

              <S.OfficesMapHint>
                선택 지사: <strong>{selectedOffice.label}</strong> · {selectedOffice.region}
              </S.OfficesMapHint>
            </S.OfficesMapCard>
          </Grid>

          <ContactBlock>
            <ContactItem href={phoneHref}>
              <ContactLabel>전화 문의</ContactLabel>
              <ContactText>대표번호로 연결 후 담당자와 실무 상담을 바로 진행하실 수 있습니다.</ContactText>
              <ContactAction>{siteContact.phone}</ContactAction>
            </ContactItem>
            <ContactItem href={mailHref}>
              <ContactLabel>온라인 문의</ContactLabel>
              <ContactText>문의 내용을 남겨주시면 담당 부서 확인 후 신속히 회신드립니다.</ContactText>
              <ContactAction>{siteContact.email}</ContactAction>
            </ContactItem>
            <ContactItem href="/offices">
              <ContactLabel>오시는 길</ContactLabel>
              <ContactText>서울본사 및 국내/해외 지사 위치 정보를 확인하실 수 있습니다.</ContactText>
              <ContactAction>{siteContact.address}</ContactAction>
            </ContactItem>
          </ContactBlock>
        </Inner>
      </Section>
    </>
  );
}
