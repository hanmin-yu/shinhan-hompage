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
    body: 'PI·CI 기반 통관 SOP를 운영하고 iOOM으로 신고 진행과 이슈를 관리합니다.',
    href: '/services/import-export',
  },
  {
    id: 'practice-quarantine',
    title: '검역/요건',
    body: '검역, 인증, 수입요건을 사전에 점검해 통관 단계의 지연 가능성을 낮춥니다.',
    href: '/services/quarantine-requirements',
  },
  {
    id: 'practice-fta',
    title: '원산지/FTA',
    body: 'FTA 원산지와 일반 원산지 업무를 구분해 운영하고 사후검증 대응 기준을 정리합니다.',
    href: '/services/consulting/fta',
  },
  {
    id: 'practice-aeo',
    title: 'AEO · ACVA',
    body: 'AEO 공인·갱신·사후관리와 ACVA 사전심사 업무를 한 구조에서 확인할 수 있습니다.',
    href: '/services/consulting',
  },
  {
    id: 'practice-investigation',
    title: '관세조사 · 범칙조사',
    body: '관세조사와 범칙조사에서 필요한 단계별 대응 항목을 정리해 제공합니다.',
    href: '/services/consulting',
  },
  {
    id: 'practice-vietnam',
    title: '베트남 · 특화서비스',
    body: '베트남·물류·미국 FDA 관련 지원 항목을 제공합니다.',
    href: '/services',
  },
];

const practiceIaGroups = [
  {
    title: '핵심 통관',
    items: ['수출입통관', '검역', '요건'],
  },
  {
    title: '컨설팅',
    items: ['FTA', 'AEO', '관세조사', '외환검사/조사', 'ACVA', '범칙조사', '조세불복', '환급', '기타 관세무역컨설팅'],
  },
  {
    title: '특화 서비스',
    items: ['IT', '물류', '베트남', '미국 FDA'],
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

const IaMap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const IaGroup = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  border-radius: 6px;
  border: 1px solid rgba(20, 73, 152, 0.16);
  background: #eef5ff;
`;

const IaGroupTitle = styled.strong`
  color: #174888;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const IaChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const IaChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(20, 73, 152, 0.24);
  color: #2b568b;
  background: #f8fbff;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: -0.01em;
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
                <CardTitle>{tx(item.title)}</CardTitle>
                <CardBody>{tx(item.body)}</CardBody>
                <CardHint>{t('자세히 보기', 'Learn more')}</CardHint>
              </Card>
            ))}
          </Grid>

          <IaMap>
            {practiceIaGroups.map((group) => (
              <IaGroup key={group.title}>
                <IaGroupTitle>{tx(group.title)}</IaGroupTitle>
                <IaChipRow>
                  {group.items.map((item) => (
                    <IaChip key={item}>{tx(item)}</IaChip>
                  ))}
                </IaChipRow>
              </IaGroup>
            ))}
          </IaMap>
        </Inner>
      </Section>
    </>
  );
}
