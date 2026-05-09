import styled from '@emotion/styled';

import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { utilitySubnav } from '../../config/utilitySubnav';
import { officeBranches, siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

export function ContactPage() {
  const { t } = useI18n();
  const hqOffice = officeBranches.find((office) => office.id === 'seoul') ?? officeBranches[0];
  const officeAddress = hqOffice?.address ?? siteContact.address;
  const officeAddressEn = hqOffice?.addressEn ?? siteContact.addressEn;
  const officePhone = hqOffice?.tel ?? siteContact.phone;
  const officeFax = hqOffice?.fax ?? '02-540-2323';

  return (
    <>
      <EditorialPageHeader
        config={utilitySubnav}
        title="문의"
        titleEn="Contact"
        heroImage="/hero/menu-utility-contact-ai.png"
        heroPosition="center 50%"
      />

      <ContactSection>
        <SectionInner>
          <ContactIntro data-reveal>
            <E.Eyebrow>Contact Us</E.Eyebrow>
            <ContactTitle>{t('문의', 'Contact')}</ContactTitle>
            <ContactLead>
              {t(
                '신한관세법인에 문의가 필요하신 경우 대표 연락처로 연락주시거나 온라인 문의를 남겨주세요. 담당자가 확인 후 안내드립니다.',
                'For inquiries, contact Shinhan Customs Service through the main contact details or leave an online inquiry below.',
              )}
            </ContactLead>
          </ContactIntro>

          <ContactGrid>
            <InfoPanel>
              <E.Eyebrow>Contact Information</E.Eyebrow>
              <PanelTitle>{t('대표 연락처', 'Main Contact')}</PanelTitle>

              <InfoActions>
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
                <E.Eyebrow>Online Inquiry</E.Eyebrow>
                <InquiryTitle>{t('온라인 문의', 'Online Inquiry')}</InquiryTitle>
                <InquiryText>
                  {t(
                    '문의 내용을 남겨주시면 담당자가 확인 후 안내드립니다.',
                    'Leave your inquiry and our team will review it.',
                  )}
                </InquiryText>
              </InquiryHeader>

              <InquiryForm onSubmit={(event) => event.preventDefault()}>
                <FieldGroup>
                  <FieldLabel htmlFor="contact-name">{t('이름', 'Name')}</FieldLabel>
                  <TextInput id="contact-name" name="name" placeholder={t('입력해주세요', 'Enter your name')} />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel htmlFor="contact-phone">{t('연락처', 'Contact')}</FieldLabel>
                  <TextInput
                    id="contact-phone"
                    name="phone"
                    placeholder={t('- 없이 입력해주세요', 'Enter without hyphens')}
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel htmlFor="contact-email">{t('이메일', 'Email')}</FieldLabel>
                  <TextInput id="contact-email" name="email" placeholder={t('이메일 주소', 'Email address')} />
                </FieldGroup>
                <FieldGroup $wide>
                  <FieldLabel htmlFor="contact-message">{t('문의내용', 'Inquiry')}</FieldLabel>
                  <TextArea
                    id="contact-message"
                    name="message"
                    placeholder={t('내용을 입력해주세요.', 'Enter your inquiry.')}
                  />
                </FieldGroup>
                <ConsentLabel>
                  <input type="checkbox" name="privacy" />
                  <span>
                    {t(
                      '개인정보 수집 및 이용에 동의합니다.',
                      'I agree to the collection and use of personal information.',
                    )}
                  </span>
                </ConsentLabel>
                <SubmitButton type="submit">{t('문의 보내기', 'Send Inquiry')}</SubmitButton>
              </InquiryForm>
            </InquiryPanel>
          </ContactGrid>
        </SectionInner>
      </ContactSection>
    </>
  );
}

const ContactSection = styled(E.Section)`
  padding: clamp(92px, 10vw, 156px) 0;
  background: #ffffff;
`;

const SectionInner = styled(P.PageContainer)`
  display: flex;
  flex-direction: column;
  gap: clamp(44px, 5.6vw, 82px);
  max-width: 1320px;
`;

const ContactIntro = styled.div`
  display: grid;
  gap: 18px;
  max-width: 1160px;
`;

const ContactTitle = styled.h1`
  max-width: 1160px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.42rem, 4.9vw, 4.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const ContactLead = styled.p`
  max-width: 980px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.12rem, 1.38vw, 1.28rem);
  font-weight: 400;
  line-height: 1.82;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.42fr) minmax(0, 0.58fr);
  gap: clamp(24px, 4vw, 58px);
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InfoPanel = styled(E.LinePanel)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: clamp(24px, 3vw, 40px) 0;
`;

const PanelTitle = styled.h2`
  max-width: 980px;
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.03em;
  text-wrap: balance;
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
  border-radius: 0;
  border: 1px solid rgba(18, 78, 160, 0.16);
  background: rgba(255, 255, 255, 0.94);
  color: #1a4f9a;
  font-size: 0.94rem;
  font-weight: 800;
`;

const InfoList = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 8px;
`;

const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  padding: 16px 0;
  border-bottom: 1px solid #d8dee8;
  background: transparent;

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
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.56;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const InfoValueLink = styled.a`
  color: #123f85;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.56;
  word-break: normal;
  overflow-wrap: anywhere;
`;

const InquiryPanel = styled(E.LinePanel)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: clamp(28px, 3vw, 40px);
  border: 1px solid #d8dee8;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(248, 251, 255, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);
`;

const InquiryHeader = styled.div`
  display: grid;
  gap: 8px;
`;

const InquiryTitle = styled.h3`
  max-width: 980px;
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.03em;
  text-wrap: balance;
`;

const InquiryText = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.18vw, 1.14rem);
  font-weight: 400;
  line-height: 1.84;
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
  font-size: 0.98rem;
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
  font-size: 1rem;
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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 152px;
  padding: 16px;
  border: 1px solid rgba(22, 77, 148, 0.18);
  border-radius: 0;
  background: #ffffff;
  color: #243f5f;
  font-size: 1rem;
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

const ConsentLabel = styled.label`
  display: inline-flex;
  grid-column: 1 / -1;
  align-items: center;
  gap: 8px;
  color: #4d6076;
  font-size: 0.98rem;

  input {
    width: 15px;
    height: 15px;
    accent-color: #2467c3;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  justify-self: stretch;
  min-height: 56px;
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
