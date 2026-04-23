import styled from '@emotion/styled';

import * as S from '../homeStyles';

const strengths = [
  {
    title: '실무형 대응',
    body: '설명 중심 자문이 아니라 신고, 보완, 사후관리까지 실제 운영 단계에서 바로 적용 가능한 대응 체계를 제공합니다.',
  },
  {
    title: '전국 지사 네트워크',
    body: '서울·인천·부산·청주·구미·인비스타 거점 협업으로 지역별 통관 특성과 산업 이슈에 신속히 대응합니다.',
  },
  {
    title: '해외 법인 연계',
    body: '하노이 법인과 KORD Partners 협업으로 베트남 및 해외 거래의 규정 변화에 선제적으로 대응합니다.',
  },
];

const Section = styled.section`
  padding: 92px 0;
  background: #f2f6fb;
  border-top: 1px solid rgba(19, 73, 152, 0.09);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #2d5592;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(41, 93, 173, 0.4);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #122f57;
  font-size: clamp(1.98rem, 3.5vw, 2.85rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  padding: 24px 22px;
  border-radius: 10px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(16, 53, 114, 0.06);
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #163e78;
  font-size: 1.16rem;
  letter-spacing: -0.02em;
`;

const CardBody = styled.p`
  margin: 12px 0 0;
  color: #4f6688;
  font-size: 0.92rem;
  line-height: 1.66;
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
