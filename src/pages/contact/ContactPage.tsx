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
      <SectionInner>
        <InquiryGrid>
          <InfoPanel>
            <P.Kicker>Contact Us</P.Kicker>
            <P.SectionTitle>{t('문의', 'Contact')}</P.SectionTitle>
            <P.Lead>
              {t(
                '기본 연락처와 본사 위치를 확인하고, 필요한 상담 내용을 온라인으로 남길 수 있습니다.',
                'Check our primary contact details and leave your inquiry online.',
              )}
            </P.Lead>

            <InfoActions>
              <P.PrimaryButton to="/about/location">{t('오시는 길 보기', 'View Directions')}</P.PrimaryButton>
              <InfoActionLink href={`tel:${siteContact.phone.replace(/[^+\d]/g, '')}`}>
                {t('대표번호 연결', 'Call Main Line')}
              </InfoActionLink>
              <InfoActionLink href={`mailto:${siteContact.email}`}>{t('이메일 보내기', 'Send Email')}</InfoActionLink>
            </InfoActions>

            <InfoList>
              <InfoItem>
                <InfoLabel>{t('대표번호', 'Phone')}</InfoLabel>
                <InfoValueLink href={`tel:${officePhone.replace(/[^+\d]/g, '')}`}>{officePhone}</InfoValueLink>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('팩스번호', 'Fax')}</InfoLabel>
                <InfoValue>{officeFax}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('이메일', 'Email')}</InfoLabel>
                <InfoValueLink href={`mailto:${siteContact.email}`}>{siteContact.email}</InfoValueLink>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('본사 주소', 'HQ Address')}</InfoLabel>
                <InfoValue>{t(officeAddress, officeAddressEn)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('사업자등록번호', 'Business Registration No.')}</InfoLabel>
                <InfoValue>{siteContact.businessNumber}</InfoValue>
              </InfoItem>
            </InfoList>
          </InfoPanel>

          <InquiryPanel>
            <InquiryHeader>
              <InquiryIcon aria-hidden="true">?</InquiryIcon>
              <div>
                <InquiryTitle>{t('온라인 문의하기', 'Online Inquiry')}</InquiryTitle>
                <InquiryText>
                  {t(
                    '문의 내용을 남겨주시면 담당자가 확인 후 안내드립니다.',
                    'Leave your inquiry and our team will review it.',
                  )}
                </InquiryText>
              </div>
            </InquiryHeader>

            <PrivacyNotice>
              {t(
                '안심하세요. 문의 내용은 상담 안내 목적으로만 확인합니다.',
                'Your inquiry is reviewed only for consultation guidance.',
              )}
            </PrivacyNotice>

            <InquiryForm onSubmit={(event) => event.preventDefault()}>
              <FieldGroup>
                <FieldLabel htmlFor="contact-name">{t('이름', 'Name')}</FieldLabel>
                <TextInput id="contact-name" name="name" placeholder={t('입력해주세요', 'Enter your name')} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel htmlFor="contact-phone">{t('연락처', 'Contact')}</FieldLabel>
                <TextInput id="contact-phone" name="phone" placeholder={t('- 없이 입력해주세요', 'Enter without hyphens')} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel htmlFor="contact-office">{t('사무소', 'Office')}</FieldLabel>
                <SelectInput id="contact-office" name="office" defaultValue="">
                  <option value="" disabled>
                    {t('사무소를 선택해주세요', 'Select an office')}
                  </option>
                  {officeBranches.map((office) => (
                    <option key={office.id} value={office.id}>
                      {t(office.label, office.labelEn)}
                    </option>
                  ))}
                </SelectInput>
              </FieldGroup>
              <FieldGroup $wide>
                <FieldLabel htmlFor="contact-message">{t('문의내용', 'Inquiry')}</FieldLabel>
                <TextArea id="contact-message" name="message" placeholder={t('내용을 입력해주세요.', 'Enter your inquiry.')} />
              </FieldGroup>
              <ConsentArea>
                <ConsentLabel>
                  <input type="checkbox" name="privacy" />
                  <span>{t('개인정보수집에 동의합니다.', 'I agree to the collection of personal information.')}</span>
                </ConsentLabel>
                <ConsentLabel>
                  <input type="checkbox" name="age" />
                  <span>{t('만 14세 이상입니다.', 'I am 14 years of age or older.')}</span>
                </ConsentLabel>
              </ConsentArea>
              <SubmitButton type="submit">{t('상담신청서 제출', 'Submit Inquiry')}</SubmitButton>
            </InquiryForm>
          </InquiryPanel>
        </InquiryGrid>

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

const InquiryGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InfoPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: clamp(28px, 3vw, 40px);
`;

const InfoActions = styled(P.HeroActions)`
  margin-top: 14px;
`;

const InfoActionLink = styled.a`
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

const InfoList = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;

const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(18, 72, 143, 0.09);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 250, 255, 0.96));

  @media (max-width: 640px) {
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

const InquiryPanel = styled(P.Panel)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: clamp(24px, 3vw, 34px);
  background:
    radial-gradient(circle at top right, rgba(31, 93, 184, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(244, 249, 255, 0.98));
`;

const InquiryHeader = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 18px;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InquiryIcon = styled.div`
  display: grid;
  width: 70px;
  height: 70px;
  place-items: center;
  border-radius: 24px;
  background: linear-gradient(180deg, #edf5ff, #dceaf8);
  color: #1a6da7;
  font-size: 2rem;
  font-weight: 900;
`;

const InquiryTitle = styled.h3`
  margin: 0;
  color: #087fa6;
  font-size: clamp(1.52rem, 2.6vw, 2.2rem);
  font-weight: 900;
  letter-spacing: -0.05em;
`;

const InquiryText = styled.p`
  margin: 8px 0 0;
  color: #263f58;
  font-size: 0.98rem;
  line-height: 1.62;
`;

const PrivacyNotice = styled.p`
  margin: 0;
  padding: 12px 16px;
  border-radius: 14px;
  background: #eef7fb;
  color: #3d5a70;
  font-size: 0.92rem;
  line-height: 1.55;
`;

const InquiryForm = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div<{ $wide?: boolean }>`
  display: grid;
  gap: 8px;
  grid-column: ${({ $wide }) => ($wide ? '1 / -1' : 'auto')};
`;

const FieldLabel = styled.label`
  color: #112f56;
  font-size: 0.9rem;
  font-weight: 800;
`;

const InputBase = styled.input`
  width: 100%;
  min-height: 50px;
  padding: 0 16px;
  border: 1px solid rgba(22, 77, 148, 0.18);
  border-radius: 0;
  background: #ffffff;
  color: #243f5f;
  font-size: 0.94rem;
  outline: none;

  &::placeholder {
    color: #8996a7;
  }

  &:focus {
    border-color: rgba(26, 94, 181, 0.52);
    box-shadow: 0 0 0 3px rgba(38, 113, 214, 0.1);
  }
`;

const TextInput = styled(InputBase)``;

const SelectInput = styled.select`
  width: 100%;
  min-height: 50px;
  padding: 0 42px 0 16px;
  border: 1px solid rgba(22, 77, 148, 0.18);
  border-radius: 0;
  background: #ffffff;
  color: #55677b;
  font-size: 0.94rem;
  outline: none;

  &:focus {
    border-color: rgba(26, 94, 181, 0.52);
    box-shadow: 0 0 0 3px rgba(38, 113, 214, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 168px;
  padding: 16px;
  border: 1px solid rgba(22, 77, 148, 0.18);
  border-radius: 0;
  background: #ffffff;
  color: #243f5f;
  font-size: 0.94rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: #8996a7;
  }

  &:focus {
    border-color: rgba(26, 94, 181, 0.52);
    box-shadow: 0 0 0 3px rgba(38, 113, 214, 0.1);
  }
`;

const ConsentArea = styled.div`
  display: grid;
  grid-column: 1 / -1;
  justify-content: center;
  gap: 8px;
  padding-top: 4px;
`;

const ConsentLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4d6076;
  font-size: 0.9rem;

  input {
    width: 15px;
    height: 15px;
    accent-color: #2467c3;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  justify-self: center;
  width: min(100%, 476px);
  min-height: 58px;
  margin-top: 8px;
  border: 0;
  border-radius: 0;
  background: #2e65ae;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    background 180ms ease,
    transform 180ms ease;

  &:hover,
  &:focus-visible {
    background: #1e559d;
    transform: translateY(-1px);
    outline: none;
  }
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
