import styled from '@emotion/styled';

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
    body: 'PI·CI 기반 SOP 최적화와 iOOM 실시간 관리로 신고 정확도와 리드타임을 함께 개선합니다.',
  },
  {
    id: 'practice-quarantine',
    title: '검역/요건',
    body: '품목별 검역·인증·수입요건을 사전 점검해 통관 지연과 보완 요청 리스크를 줄입니다.',
  },
  {
    id: 'practice-fta',
    title: '원산지/FTA',
    body: '특혜(FTA)와 비특혜(일반 원산지) 관리 체계를 구분 설계해 관세 절감과 규정 준수를 동시에 지원합니다.',
  },
  {
    id: 'practice-aeo',
    title: 'AEO · ACVA',
    body: 'AEO 신규/갱신/사후관리와 ACVA 사전심사 대응으로 기업의 예측 가능성과 경영 안정성을 높입니다.',
  },
  {
    id: 'practice-investigation',
    title: '관세조사 · 범칙조사',
    body: '정기·비정기 조사부터 통고처분·검찰 단계까지 조사 대응 및 리스크 통제를 통합 지원합니다.',
  },
  {
    id: 'practice-vietnam',
    title: '베트남 · 특화서비스',
    body: '하노이 법인 네트워크 기반 통관·수책·FTA 자문과 물류·FDA 이슈까지 확장형 서비스를 제공합니다.',
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
  background: #f8fafd;
  border-top: 1px solid rgba(17, 67, 143, 0.08);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 38px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr) auto;
  align-items: end;
  gap: 24px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #2a568f;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(29, 87, 170, 0.42);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #122f57;
  font-size: clamp(2.04rem, 3.8vw, 3rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 0;
  color: #4a6080;
  font-size: 0.96rem;
  line-height: 1.72;
`;

const HeadLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 7px;
  border: 1px solid rgba(21, 77, 159, 0.2);
  color: #1b4f98;
  background: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
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

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 222px;
  padding: 24px 22px;
  border-radius: 8px;
  border: 1px solid rgba(20, 73, 152, 0.15);
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(15, 48, 102, 0.06);
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #163e78;
  font-size: 1.18rem;
  letter-spacing: -0.02em;
`;

const CardBody = styled.p`
  margin: 0;
  color: #4f6688;
  font-size: 0.92rem;
  line-height: 1.65;
`;

const CardLink = styled.a`
  margin-top: auto;
  width: fit-content;
  color: #1c57a8;
  font-size: 0.88rem;
  font-weight: 700;
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
  border-radius: 8px;
  border: 1px solid rgba(20, 73, 152, 0.13);
  background: #f6f9fd;
`;

const IaGroupTitle = styled.strong`
  color: #1d487f;
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
  border: 1px solid rgba(20, 73, 152, 0.18);
  color: #33557f;
  background: #ffffff;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export function PracticeSection() {
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
              <Title>핵심 업무분야</Title>
            </div>
            <Description>
              메인에서는 핵심 업무를 요약해 보여주고, 상세 대응 범위와 절차는 업무분야 페이지에서 확인할 수 있도록
              구성했습니다.
            </Description>
            <HeadLink href="/services">전체 업무분야 보기</HeadLink>
          </Head>

          <Grid>
            {practiceCards.map((item) => (
              <Card key={item.id} id={item.id}>
                <CardTitle>{item.title}</CardTitle>
                <CardBody>{item.body}</CardBody>
                <CardLink href="/services">자세히 보기</CardLink>
              </Card>
            ))}
          </Grid>

          <IaMap>
            {practiceIaGroups.map((group) => (
              <IaGroup key={group.title}>
                <IaGroupTitle>{group.title}</IaGroupTitle>
                <IaChipRow>
                  {group.items.map((item) => (
                    <IaChip key={item}>{item}</IaChip>
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
