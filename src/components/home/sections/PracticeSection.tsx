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
    body: '수입·수출 신고, 세번 검토, 보완 대응까지 통관 전체 프로세스를 실무 기준으로 설계합니다.',
  },
  {
    id: 'practice-quarantine',
    title: '검역/요건',
    body: '품목별 검역과 수입요건을 사전에 점검해 통관 지연과 규제 리스크를 줄입니다.',
  },
  {
    id: 'practice-fta',
    title: 'FTA / AEO 컨설팅',
    body: '원산지 판정, 사후검증, AEO 심사 대응까지 운영 가능한 체계로 연결합니다.',
  },
  {
    id: 'practice-investigation',
    title: '관세조사 · 외환검사',
    body: '기업심사와 조사 대응 과정에서 필요한 자료 구조화와 쟁점 대응 전략을 지원합니다.',
  },
  {
    id: 'practice-refund',
    title: '환급 · 조세불복',
    body: '환급 가능 항목 검토부터 신청·사후관리, 불복 절차 대응까지 한 흐름으로 지원합니다.',
  },
  {
    id: 'practice-logistics',
    title: '특화 서비스',
    body: '물류, 베트남 법인, 미국 FDA 자문까지 산업별 해외 실무 과제를 함께 지원합니다.',
  },
];

const Section = styled.section`
  padding: 82px 0;
  background: #ffffff;
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 34px;
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2f568f;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 26px;
    height: 1px;
    background: rgba(36, 90, 171, 0.42);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #153f7f;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 0;
  max-width: 540px;
  color: #4b6182;
  font-size: 0.98rem;
  line-height: 1.72;
`;

const HeadLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 8px;
  border: 1px solid rgba(21, 77, 159, 0.2);
  color: #1b4f98;
  background: #f8fbff;
  font-size: 0.9rem;
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

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
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(20, 73, 152, 0.12);
  background: #ffffff;
  box-shadow: 0 14px 28px rgba(20, 67, 144, 0.08);
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #163e78;
  font-size: 1.24rem;
  letter-spacing: -0.02em;
`;

const CardBody = styled.p`
  margin: 0;
  color: #52698b;
  font-size: 0.94rem;
  line-height: 1.65;
`;

const CardLink = styled.a`
  margin-top: auto;
  color: #1c57a8;
  font-size: 0.9rem;
  font-weight: 700;
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
              <Title>핵심 업무분야 요약</Title>
            </div>
            <Description>
              메인 페이지에서는 핵심 서비스만 간결하게 안내하고, 세부 자문 범위는 업무분야 상세 페이지에서 확인할 수
              있도록 구성했습니다.
            </Description>
            <HeadLink href="#contact">업무 상담 요청</HeadLink>
          </Head>

          <Grid>
            {practiceCards.map((item) => (
              <Card key={item.id} id={item.id}>
                <CardTitle>{item.title}</CardTitle>
                <CardBody>{item.body}</CardBody>
                <CardLink href="#contact">자세히 보기</CardLink>
              </Card>
            ))}
          </Grid>
        </Inner>
      </Section>
    </>
  );
}
