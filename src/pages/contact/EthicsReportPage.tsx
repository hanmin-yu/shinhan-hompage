import styled from '@emotion/styled';
import type { FormEvent } from 'react';
import { useState } from 'react';

import * as E from '../../components/site/EditorialBlocks';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { palette } from '../../components/home/homeStyles';
import { utilitySubnav } from '../../config/utilitySubnav';
import { siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const ethicsContactEmail = 'compliance@shcs.kr';
const ethicsContactPhone = siteContact.phone;

const reportSubjects = [
  { ko: '리베이트, 금품·향응 수수', en: 'Rebates, gifts, or entertainment' },
  { ko: '회사 또는 고객 정보 오남용', en: 'Misuse of company or client information' },
  { ko: '이해상충, 기타 윤리 위반 사항', en: 'Conflicts of interest or other ethics concerns' },
];

const ethicsCodeItems = [
  {
    ko: '우리는 근면과 성실한 자세로써 봉사정신을 드높인다.',
    en: 'We uphold a spirit of service with diligence and sincerity.',
  },
  {
    ko: '우리는 건전한 통관질서를 확립함으로써 관세행정 발전에 기여한다.',
    en: 'We contribute to the development of customs administration by establishing sound clearance order.',
  },
  {
    ko: '우리는 회원 상호간의 인화단결과 품위를 향상함으로써 직업윤리를 함양하고 명랑한 사회풍토를 조성한다.',
    en: 'We cultivate professional ethics and a sound social climate by promoting harmony, unity, and dignity among members.',
  },
];

export function EthicsReportPage() {
  const { t } = useI18n();
  const [isEthicsModalOpen, setIsEthicsModalOpen] = useState(false);

  const handleReportSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const category = String(formData.get('category') ?? '').trim();
    const name = String(formData.get('name') ?? '').trim();
    const contact = String(formData.get('contact') ?? '').trim();
    const title = String(formData.get('title') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const subject = `[부정행위 접수] ${title || category || '제보'}`;
    const body = [
      '부정행위 접수 내용',
      '',
      `접수 유형: ${category || '-'}`,
      `이름: ${name || '-'}`,
      `연락처: ${contact || '-'}`,
      '',
      '접수 내용:',
      message || '-',
    ].join('\n');

    window.location.href = `mailto:${ethicsContactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <EditorialPageHeader
        config={utilitySubnav}
        title="부정행위 접수창구"
        titleEn="Ethics Reporting"
        heroImage="/hero/menu-utility-ethics-compliance-ai.png"
        heroPosition="right 66%"
        heroSize="cover"
        heroOverlay="dark"
      />

      <ReportSection>
        <ReportInner>
          <ReportIntro data-reveal>
            <E.Eyebrow>Ethics Reporting</E.Eyebrow>
            <ReportTitle>{t('부정행위 접수창구', 'Ethics Reporting')}</ReportTitle>
            <ReportLead>
              {t(
                '신한관세법인은 공정하고 투명한 업무 환경을 위해 부정행위 접수창구를 운영하고 있습니다.',
                'Shinhan Customs Service operates an ethics reporting channel to support a fair and transparent workplace.',
              )}
            </ReportLead>
            <EthicsBasisText>
              {t(
                '본 접수창구는 관세사 윤리강령에 근거하여 운영됩니다.',
                'This reporting channel is operated based on the Code of Ethics for Licensed Customs Brokers.',
              )}{' '}
              <EthicsBasisButton type="button" onClick={() => setIsEthicsModalOpen(true)}>
                {t('관세사 윤리강령 보기', 'View the Code of Ethics')}
              </EthicsBasisButton>
            </EthicsBasisText>
          </ReportIntro>

          <ReportGrid>
            <GuidePanel>
              <PanelTitle>{t('운영 방침', 'Operating Policy')}</PanelTitle>

              <NoticeText>
                {t(
                  '제보자는 어떠한 신분상의 불이익이나 차별을 받지 않으며 신원과 제보내용은 철저히 비밀로 유지됩니다.',
                  'Reporters will not face any disadvantage or discrimination, and their identity and report details will be kept strictly confidential.',
                )}
              </NoticeText>

              <GuideBlock>
                <GuideLabel>{t('접수 대상', 'Report Topics')}</GuideLabel>
                <SubjectList>
                  {reportSubjects.map((subject) => (
                    <SubjectItem key={subject.ko}>{t(subject.ko, subject.en)}</SubjectItem>
                  ))}
                </SubjectList>
              </GuideBlock>

              <GuideBlock>
                <GuideLabel>{t('접수 방법', 'How to Report')}</GuideLabel>
                <ContactList>
                  <ContactItem>
                    <ContactLabel>{t('이메일', 'Email')}</ContactLabel>
                    <ContactLink href={`mailto:${ethicsContactEmail}`}>{ethicsContactEmail}</ContactLink>
                  </ContactItem>
                  <ContactItem>
                    <ContactLabel>{t('전화', 'Phone')}</ContactLabel>
                    <ContactLink href={`tel:${ethicsContactPhone.replace(/[^+\d]/g, '')}`}>
                      {ethicsContactPhone}
                    </ContactLink>
                  </ContactItem>
                </ContactList>
              </GuideBlock>

              <ActionLink href={`mailto:${ethicsContactEmail}`}>{t('이메일로 접수하기', 'Report by Email')}</ActionLink>
            </GuidePanel>

            <OnlinePanel>
              <OnlineHeader>
                <PanelTitle>{t('온라인으로 접수하기', 'Submit Online')}</PanelTitle>
                <OnlineText>
                  {t(
                    '아래 항목을 작성해주시면 담당자가 내용을 확인합니다.',
                    'Complete the fields below and the responsible team will review your report.',
                  )}
                </OnlineText>
              </OnlineHeader>

              <ReportForm
                action={`mailto:${ethicsContactEmail}`}
                method="post"
                encType="text/plain"
                onSubmit={handleReportSubmit}
              >
                <FieldGroup>
                  <FieldLabel htmlFor="ethics-category">{t('접수 유형', 'Report Type')}</FieldLabel>
                  <SelectInput id="ethics-category" name="category" defaultValue="">
                    <option value="" disabled>
                      {t('선택해주세요', 'Select a type')}
                    </option>
                    {reportSubjects.map((subject) => (
                      <option key={subject.ko} value={subject.ko}>
                        {t(subject.ko, subject.en)}
                      </option>
                    ))}
                  </SelectInput>
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel htmlFor="ethics-name">{t('이름', 'Name')}</FieldLabel>
                  <TextInput id="ethics-name" name="name" placeholder={t('선택 입력', 'Optional')} />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel htmlFor="ethics-contact">{t('연락처', 'Contact')}</FieldLabel>
                  <TextInput
                    id="ethics-contact"
                    name="contact"
                    placeholder={t('이메일 또는 전화번호', 'Email or phone number')}
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel htmlFor="ethics-title">{t('제목', 'Subject')}</FieldLabel>
                  <TextInput id="ethics-title" name="title" placeholder={t('제목을 입력해주세요', 'Enter a subject')} />
                </FieldGroup>
                <FieldGroup $wide>
                  <FieldLabel htmlFor="ethics-message">{t('접수 내용', 'Details')}</FieldLabel>
                  <TextArea
                    id="ethics-message"
                    name="message"
                    placeholder={t('접수 내용을 입력해주세요.', 'Enter the report details.')}
                  />
                </FieldGroup>
                <ConsentLabel>
                  <input type="checkbox" name="privacy" />
                  <span>
                    {t(
                      '접수 내용과 신고자 정보가 관련 절차에 따라 비공개로 관리되는 것에 동의합니다.',
                      'I understand that report details and reporter information will be managed confidentially.',
                    )}
                  </span>
                </ConsentLabel>
                <SubmitButton type="submit">{t('온라인 접수하기', 'Submit Report')}</SubmitButton>
              </ReportForm>
            </OnlinePanel>
          </ReportGrid>
        </ReportInner>
      </ReportSection>

      {isEthicsModalOpen ? (
        <ModalBackdrop role="presentation" onClick={() => setIsEthicsModalOpen(false)}>
          <ModalDialog
            role="dialog"
            aria-modal="true"
            aria-labelledby="ethics-code-title"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalHeader>
              <div>
                <ModalEyebrow>{t('윤리 강령', 'Code of Ethics')}</ModalEyebrow>
                <ModalTitle id="ethics-code-title">
                  {t('관세사 윤리강령', 'Code of Ethics for Licensed Customs Brokers')}
                </ModalTitle>
              </div>
              <ModalCloseButton type="button" onClick={() => setIsEthicsModalOpen(false)}>
                {t('닫기', 'Close')}
              </ModalCloseButton>
            </ModalHeader>

            <CodeDocument>
              <CodeDocumentTitle>{t('제2조(윤리강령)', 'Article 2 (Code of Ethics)')}</CodeDocumentTitle>
              <CodeIntro>
                {t(
                  '회원은 다음 각 호를 내용으로 한 관세사윤리강령을 사무소 내에 게시하고 관세사의 기본 윤리관으로 삼아야 한다.',
                  'Members must post the following Code of Ethics in their office and uphold it as the basic ethical standard for licensed customs brokers.',
                )}
              </CodeIntro>
              <CodeList>
                {ethicsCodeItems.map((item, index) => (
                  <CodeItem key={item.ko}>
                    <CodeNumber>{index + 1}</CodeNumber>
                    <span>{t(item.ko, item.en)}</span>
                  </CodeItem>
                ))}
              </CodeList>
            </CodeDocument>

            <SourceNote>
              {t(
                '출처: 한국관세사회 제규정 ∙ 회칙위임 > 윤리위원회 운영규정 제2조(윤리강령)',
                'Source: Korea Customs Brokers Association regulations, Ethics Committee Operating Regulation, Article 2 (Code of Ethics).',
              )}
            </SourceNote>
          </ModalDialog>
        </ModalBackdrop>
      ) : null}
    </>
  );
}

const ReportSection = styled(E.Section)`
  padding: clamp(92px, 10vw, 156px) 0;
  background: #ffffff;
`;

const ReportInner = styled(P.PageContainer)`
  display: flex;
  flex-direction: column;
  gap: clamp(44px, 5.6vw, 82px);
  max-width: 1320px;
`;

const ReportIntro = styled.div`
  display: grid;
  gap: 18px;
  max-width: 1160px;
`;

const ReportTitle = styled.h1`
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

const ReportLead = styled.p`
  max-width: 980px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.12rem, 1.38vw, 1.28rem);
  font-weight: 400;
  line-height: 1.82;
`;

const EthicsBasisText = styled.p`
  margin: -4px 0 0;
  color: #5a6780;
  font-size: 0.98rem;
  font-weight: 500;
  line-height: 1.7;
  word-break: keep-all;
`;

const EthicsBasisButton = styled.button`
  appearance: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: #1f5cb2;
  font: inherit;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: #123f85;
    outline: none;
  }
`;

const NoticeText = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.18vw, 1.14rem);
  font-weight: 400;
  line-height: 1.84;
  word-break: keep-all;
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.42fr) minmax(0, 0.58fr);
  gap: clamp(24px, 4vw, 58px);
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const GuidePanel = styled(E.LinePanel)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
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
  word-break: keep-all;
`;

const GuideBlock = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;

const GuideLabel = styled.strong`
  color: ${palette.blue};
  font-size: 0.84rem;
  font-weight: 900;
`;

const SubjectList = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SubjectItem = styled.li`
  padding: 14px 0;
  border-bottom: 1px solid #d8dee8;
  color: #496582;
  font-size: clamp(1.04rem, 1.25vw, 1.16rem);
  font-weight: 400;
  line-height: 1.78;
  word-break: keep-all;
`;

const ContactList = styled.div`
  display: grid;
  gap: 10px;
`;

const ContactItem = styled.div`
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #d8dee8;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const ContactLabel = styled.span`
  color: ${palette.blue};
  font-size: 0.84rem;
  font-weight: 900;
`;

const ContactLink = styled.a`
  color: #163a70;
  font-size: 1.04rem;
  font-weight: 800;
  line-height: 1.56;
  word-break: normal;
  overflow-wrap: anywhere;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 46px;
  margin-top: 4px;
  padding: 0 20px;
  border: 1px solid rgba(18, 78, 160, 0.2);
  background: #2e65ae;
  color: #ffffff;
  font-size: 0.94rem;
  font-weight: 900;

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const OnlinePanel = styled(E.LinePanel)`
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

const OnlineHeader = styled.div`
  display: grid;
  gap: 8px;
`;

const OnlineText = styled.p`
  max-width: 980px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.25vw, 1.16rem);
  font-weight: 400;
  line-height: 1.78;
  word-break: keep-all;
`;

const ReportForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 18px;
  width: 100%;

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

const TextInput = styled.input`
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
  min-height: 160px;
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
  align-items: flex-start;
  gap: 8px;
  color: #4d6076;
  font-size: 0.98rem;
  line-height: 1.5;
  word-break: keep-all;

  input {
    width: 15px;
    height: 15px;
    margin-top: 4px;
    flex: 0 0 auto;
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

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: clamp(18px, 4vw, 48px);
  background: rgba(7, 18, 33, 0.58);
  backdrop-filter: blur(6px);
`;

const ModalDialog = styled.div`
  width: min(100%, 760px);
  max-height: min(86vh, 760px);
  overflow: auto;
  border: 1px solid rgba(216, 222, 232, 0.92);
  background: #ffffff;
  box-shadow:
    0 34px 90px rgba(4, 16, 32, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.96);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  padding: clamp(24px, 3vw, 34px);
  border-bottom: 1px solid #d8dee8;
  background:
    linear-gradient(180deg, rgba(248, 251, 255, 0.98), rgba(255, 255, 255, 0.98)),
    #ffffff;
`;

const ModalEyebrow = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${palette.blue};
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #10233f;
  font-size: clamp(1.44rem, 2.4vw, 2rem);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -0.015em;
  word-break: keep-all;
`;

const ModalCloseButton = styled.button`
  flex: 0 0 auto;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid rgba(18, 63, 133, 0.18);
  background: #ffffff;
  color: #123f85;
  font-size: 0.86rem;
  font-weight: 900;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: #123f85;
    outline: none;
  }
`;

const CodeDocument = styled.div`
  margin: clamp(24px, 3vw, 34px);
  padding: clamp(24px, 3.2vw, 38px);
  border: 1px solid #d8dee8;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(248, 251, 255, 0.96)),
    #ffffff;
`;

const CodeDocumentTitle = styled.h3`
  margin: 0 0 18px;
  color: #0f3f84;
  font-size: clamp(1.18rem, 1.75vw, 1.46rem);
  font-weight: 900;
  line-height: 1.28;
  word-break: keep-all;
`;

const CodeIntro = styled.p`
  margin: 0 0 20px;
  color: #4d5a6c;
  font-size: 1rem;
  line-height: 1.76;
  word-break: keep-all;
`;

const CodeList = styled.ol`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const CodeItem = styled.li`
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  color: #263d5a;
  font-size: 1.02rem;
  font-weight: 650;
  line-height: 1.7;
  word-break: keep-all;
`;

const CodeNumber = styled.span`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #123f85;
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 900;
`;

const SourceNote = styled.p`
  margin: 0;
  padding: 18px clamp(24px, 3vw, 34px) clamp(24px, 3vw, 34px);
  border-top: 1px solid #e4e8ef;
  color: #687385;
  font-size: 0.92rem;
  font-weight: 650;
  line-height: 1.62;
  word-break: keep-all;
`;
