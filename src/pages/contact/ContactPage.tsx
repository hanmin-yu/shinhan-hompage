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
        heroImage="/hero/homepage/office-tower-clear-sky.jpg"
        heroPosition="center 42%"
      />

      <ContactSection>
        <SectionInner>
          <E.Statement data-reveal>
            <div>
              <E.Eyebrow>Contact Us</E.Eyebrow>
              <E.Title>{t('문의', 'Contact')}</E.Title>
            </div>
            <E.LeadGrid>
              <E.Lead>
                {t(
                  '신한관세법인의 대표 연락 정보입니다. 문의가 필요하신 경우 아래 연락처 또는 온라인 문의 양식을 이용해주세요.',
                  'Primary contact details for Shinhan Customs Service. Use the contact information or online inquiry form below.',
                )}
              </E.Lead>
              <E.FactGrid>
                <E.Fact>
                  <E.FactValue>Tel</E.FactValue>
                  <E.FactLabel>{officePhone}</E.FactLabel>
                </E.Fact>
                <E.Fact>
                  <E.FactValue>Email</E.FactValue>
                  <E.FactLabel>{siteContact.email}</E.FactLabel>
                </E.Fact>
                <E.Fact>
                  <E.FactValue>HQ</E.FactValue>
                  <E.FactLabel>{t('서울본사', 'Seoul HQ')}</E.FactLabel>
                </E.Fact>
              </E.FactGrid>
            </E.LeadGrid>
          </E.Statement>

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
              <FieldGroup>
                <FieldLabel htmlFor="contact-email">{t('이메일', 'Email')}</FieldLabel>
                <TextInput id="contact-email" name="email" placeholder={t('이메일 주소', 'Email address')} />
              </FieldGroup>
              <FieldGroup $wide>
                <FieldLabel htmlFor="contact-message">{t('문의내용', 'Inquiry')}</FieldLabel>
                <TextArea id="contact-message" name="message" placeholder={t('내용을 입력해주세요.', 'Enter your inquiry.')} />
              </FieldGroup>
              <ConsentLabel>
                <input type="checkbox" name="privacy" />
                <span>{t('개인정보 수집 및 이용에 동의합니다.', 'I agree to the collection and use of personal information.')}</span>
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
  background: #ffffff;
`;

const SectionInner = styled(P.PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(24px, 4vw, 58px);
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InfoPanel = styled(E.LinePanel)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: clamp(28px, 3vw, 40px) 0;
`;

const PanelTitle = styled.h2`
  margin: 0;
  color: #172337;
  font-size: clamp(1.8rem, 3.2vw, 3.1rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.05em;
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
  padding: 14px 0;
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
  font-size: 1.04rem;
  font-weight: 600;
  line-height: 1.56;
  word-break: break-word;
`;

const InfoValueLink = styled.a`
  color: #163a70;
  font-size: 1.04rem;
  font-weight: 800;
  line-height: 1.56;
  word-break: break-word;
`;

const InquiryPanel = styled(E.LinePanel)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: clamp(24px, 3vw, 34px) 0;
`;

const InquiryHeader = styled.div`
  display: grid;
  gap: 8px;
`;

const InquiryTitle = styled.h3`
  margin: 0;
  color: #123b70;
  font-size: clamp(1.56rem, 2.6vw, 2.16rem);
  font-weight: 900;
  letter-spacing: -0.05em;
`;

const InquiryText = styled.p`
  margin: 0;
  color: #496582;
  font-size: 1.04rem;
  line-height: 1.62;
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

const SelectInput = styled.select`
  width: 100%;
  min-height: 50px;
  padding: 0 42px 0 16px;
  border: 1px solid rgba(22, 77, 148, 0.18);
  border-radius: 0;
  background: #ffffff;
  color: #55677b;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: rgba(26, 94, 181, 0.52);
    box-shadow: 0 0 0 3px rgba(38, 113, 214, 0.1);
  }
`;

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
