import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const ANCHOR_IDS = [
  'practice-import-export',
  'practice-quarantine',
  'practice-fta',
  'practice-aeo',
  'practice-investigation',
  'practice-acva',
  'practice-tax',
  'practice-refund',
  'practice-consulting',
  'practice-logistics',
  'practice-vietnam',
  'practice-fda',
  'practice-it',
  'it',
];

const practiceCards = [
  {
    id: 'practice-import-export',
    title: '수출입통관',
    body: '60년 이상의 축적된 통관 경험과 전문 인력을 기반으로 신속하고 정확한 수출입 통관 서비스를 제공합니다.',
    href: '/services/import-export',
    titleEn: 'Import & Export Clearance',
    bodyEn:
      'Based on over 60 years of accumulated clearance experience and specialized professionals, we provide fast and accurate import/export clearance services.',
  },
  {
    id: 'practice-quarantine',
    title: '검역.요건',
    body: '검역/요건 전담인력 운영을 통해 HSK별로 세분화된 검토를 수행하여 법적 안정성을 보장합니다.',
    href: '/services/quarantine-requirements',
    titleEn: 'Quarantine & Requirements',
    bodyEn:
      'With dedicated quarantine/requirements specialists, we conduct detailed HS code-based reviews to ensure legal stability.',
  },
  {
    id: 'practice-fta',
    title: 'FTA',
    body: 'FTA 전담팀 운영을 통해 적법한 FTA 적용 및 사후검증 대응을 지원하여 기업의 FTA 활용을 극대화합니다.',
    href: '/services/consulting/fta',
    titleEn: 'FTA',
    bodyEn:
      'Through our dedicated FTA team, we support compliant FTA application and post-verification response to maximize corporate FTA utilization.',
  },
  {
    id: 'practice-aeo',
    title: 'AEO',
    body: '풍부한 부문별 AEO공인 및 사후관리 경험을 바탕으로 신속한 공인 획득과 체계적인 사후관리 서비스를 제공합니다.',
    href: '/services/consulting/aeo',
    titleEn: 'AEO',
    bodyEn:
      'Based on extensive experience in AEO certification by sector and follow-up management, we provide rapid certification and structured post-management services.',
  },
  {
    id: 'practice-investigation',
    title: '관세조사',
    body: '사전 리스크 진단부터 세관 대응까지 관세조사 전 과정을 지원하여 기업의 리스크를 최소화합니다.',
    href: '/services/consulting/customs-audit',
    titleEn: 'Customs Audit',
    bodyEn:
      'From pre-risk diagnosis to customs authority response, we support the full customs audit lifecycle to minimize corporate risk.',
  },
  {
    id: 'practice-foreign-exchange',
    title: '외환검사.조사',
    body: '외환거래 전반에 대한 사전 진단과 법령 검토를 통해 리스크를 예방하고 신고 및 사후 대응을 지원합니다.',
    href: '/services/consulting/foreign-exchange',
    titleEn: 'Foreign Exchange Inspection & Investigation',
    bodyEn:
      'We provide pre-diagnosis and legal review across foreign exchange transactions to prevent risk and support reporting and post-response.',
  },
];

const Section = styled.section`
  padding: 88px 0;
  background: linear-gradient(180deg, #eef5ff 0%, #f4f9ff 100%);
  border-top: 1px solid rgba(17, 67, 143, 0.11);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 38px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: end;
  gap: 24px;
  gap: 16px;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #20549c;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(29, 87, 170, 0.54);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #10396f;
  font-size: clamp(2.04rem, 3.8vw, 3rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 222px;
  padding: 24px 22px;
  border-radius: 6px;
  border: 1px solid rgba(20, 73, 152, 0.2);
  background: #ffffff;
  box-shadow: 0 10px 22px rgba(15, 48, 102, 0.08);
  position: relative;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 22px;
    top: 0;
    width: 48px;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, #2a6bc6, #6d97d7);
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(20, 73, 152, 0.3);
    box-shadow: 0 14px 24px rgba(15, 48, 102, 0.11);
  }

  &:focus-visible {
    outline: 2px solid rgba(27, 91, 178, 0.7);
    outline-offset: 2px;
    border-color: rgba(27, 91, 178, 0.55);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #11407d;
  font-size: 1.18rem;
  letter-spacing: -0.02em;
`;

const CardBody = styled.p`
  margin: 0;
  color: #3f618b;
  font-size: 0.92rem;
  line-height: 1.65;
`;

const CardHint = styled.p`
  margin: auto 0 0;
  color: #2d5a90;
  font-size: 0.84rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::after {
    content: '→';
    font-size: 0.86rem;
  }
`;

export function PracticeSection() {
  const { t, tx } = useI18n();

  return (
    <>
      {ANCHOR_IDS.map((anchorId) => (
        <S.SectionAnchor key={anchorId} id={anchorId} />
      ))}

      <Section id="practice">
        <Inner data-reveal>
          <Head>
            <div>
              <Label>Practice Areas</Label>
              <Title>{t('핵심 업무분야', 'Core Service Areas')}</Title>
            </div>
          </Head>

          <Grid>
            {practiceCards.map((item) => (
              <Card key={item.id} id={item.id} to={item.href}>
                <CardTitle>{t(item.title, item.titleEn ?? tx(item.title))}</CardTitle>
                <CardBody>{t(item.body, item.bodyEn ?? tx(item.body))}</CardBody>
                <CardHint>{t('자세히 보기', 'Learn more')}</CardHint>
              </Card>
            ))}
          </Grid>
        </Inner>
      </Section>
    </>
  );
}
