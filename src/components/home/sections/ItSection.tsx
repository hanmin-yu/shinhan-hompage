import styled from '@emotion/styled';

import { itServices } from '../../../data/home';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 88px 0;
  background: #f5f8fc;
  border-top: 1px solid rgba(21, 77, 159, 0.08);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.84fr);
  align-items: end;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #2f5792;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(47, 87, 146, 0.42);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #122f57;
  font-size: clamp(2rem, 3.6vw, 2.85rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 0;
  color: #4e6484;
  font-size: 0.95rem;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Featured = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 260px;
  padding: 24px 22px;
  border-radius: 8px;
  border: 1px solid rgba(24, 79, 160, 0.18);
  background: linear-gradient(160deg, #123f82 0%, #153f79 100%);
  box-shadow: 0 10px 20px rgba(14, 50, 108, 0.12);
`;

const FeaturedMeta = styled.span`
  color: rgba(207, 225, 250, 0.92);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 1.44rem;
  line-height: 1.34;
  letter-spacing: -0.02em;
`;

const FeaturedBody = styled.p`
  margin: 0;
  color: rgba(224, 236, 255, 0.9);
  font-size: 0.92rem;
  line-height: 1.66;
`;

const FeaturedLink = styled.a`
  margin-top: auto;
  width: fit-content;
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 106px;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid rgba(19, 76, 158, 0.13);
  background: #ffffff;
`;

const ItemCategory = styled.span`
  color: #2e5a99;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ItemTitle = styled.h4`
  margin: 0;
  color: #1b416f;
  font-size: 1.01rem;
  line-height: 1.42;
`;

const ItemBody = styled.p`
  margin: 0;
  color: #586f8f;
  font-size: 0.88rem;
  line-height: 1.58;
`;

export function ItSection() {
  const [featuredService, ...secondaryServices] = itServices;

  if (!featuredService) return null;

  return (
    <Section id="it">
      <Inner data-reveal>
        <Head>
          <div>
            <Label>IT Services</Label>
            <Title>관세·IT 융합 서비스</Title>
          </div>
          <Description>
            신한 IT팀은 단순 운영 조직이 아니라 관세 실무와 기술을 연결해 자동화·데이터 분석·인프라 안정성을 함께
            강화하는 실무형 조직입니다.
          </Description>
        </Head>

        <Grid>
          <Featured>
            <FeaturedMeta>{featuredService.category}</FeaturedMeta>
            <FeaturedTitle>{featuredService.title}</FeaturedTitle>
            <FeaturedBody>{featuredService.body}</FeaturedBody>
            <FeaturedLink href="/it">IT 상세보기</FeaturedLink>
          </Featured>

          <List>
            {secondaryServices.slice(0, 3).map((item) => (
              <Item key={item.title}>
                <ItemCategory>{item.category}</ItemCategory>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemBody>{item.body}</ItemBody>
              </Item>
            ))}
          </List>
        </Grid>
      </Inner>
    </Section>
  );
}
