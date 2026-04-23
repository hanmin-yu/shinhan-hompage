import styled from '@emotion/styled';

import * as S from '../homeStyles';

const strengths = [
  {
    title: '실무형 대응',
    body: '서류·절차 설명에 그치지 않고 실제 신고, 보완, 사후 대응까지 실행 중심으로 지원합니다.',
  },
  {
    title: '전국 지사 네트워크',
    body: '서울·인천·부산·청주·구미 등 주요 거점 협업으로 지역별 통관 이슈에 빠르게 대응합니다.',
  },
  {
    title: '해외 법인 연계',
    body: '베트남 법인을 포함한 해외 네트워크를 통해 현지 규정 대응과 국내 실무를 연결합니다.',
  },
];

const Section = styled.section`
  padding: 82px 0;
  background: #f5f9ff;
  border-top: 1px solid rgba(19, 73, 152, 0.08);
  border-bottom: 1px solid rgba(19, 73, 152, 0.08);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Label = styled.span`
  color: #2d5592;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #153f7f;
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background: #ffffff;
  box-shadow: 0 14px 26px rgba(16, 53, 114, 0.08);
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #163e78;
  font-size: 1.2rem;
  letter-spacing: -0.02em;
`;

const CardBody = styled.p`
  margin: 12px 0 0;
  color: #51688a;
  font-size: 0.94rem;
  line-height: 1.64;
`;

export function StrengthSection() {
  return (
    <Section>
      <Inner data-reveal>
        <div>
          <Label>Shinhan Strength</Label>
          <Title>신한의 강점</Title>
        </div>

        <Grid>
          {strengths.map((strength) => (
            <Card key={strength.title}>
              <CardTitle>{strength.title}</CardTitle>
              <CardBody>{strength.body}</CardBody>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
