import styled from '@emotion/styled';

import { itServices } from '../../../data/home';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 84px 0;
  background: #f5f8fd;
  border-top: 1px solid rgba(21, 77, 159, 0.08);
  border-bottom: 1px solid rgba(21, 77, 159, 0.08);
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
  color: #2f5792;
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

const Description = styled.p`
  margin: 0;
  max-width: 520px;
  color: #4e6484;
  font-size: 0.96rem;
  line-height: 1.68;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Featured = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 260px;
  padding: 26px;
  border-radius: 12px;
  border: 1px solid rgba(24, 79, 160, 0.18);
  background: linear-gradient(160deg, #114998 0%, #0f407f 100%);
  box-shadow: 0 18px 34px rgba(14, 50, 108, 0.15);
`;

const FeaturedMeta = styled.span`
  color: rgba(207, 225, 250, 0.9);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
`;

const FeaturedBody = styled.p`
  margin: 0;
  color: rgba(224, 236, 255, 0.9);
  font-size: 0.94rem;
  line-height: 1.66;
`;

const FeaturedLink = styled.a`
  margin-top: auto;
  width: fit-content;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 20px;
  border-radius: 10px;
  border: 1px solid rgba(19, 76, 158, 0.12);
  background: #ffffff;
`;

const ItemCategory = styled.span`
  color: #2e5a99;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ItemTitle = styled.h4`
  margin: 0;
  color: #1b416f;
  font-size: 1.02rem;
  line-height: 1.42;
`;

const ItemBody = styled.p`
  margin: 0;
  color: #586f8f;
  font-size: 0.9rem;
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
            <Title>IT 서비스 소개</Title>
          </div>
          <Description>
            통관 실무와 데이터 흐름을 연결하는 운영형 IT 서비스를 통해 업무 안정성과 보고 정확도를 높입니다.
          </Description>
        </Head>

        <Grid>
          <Featured>
            <FeaturedMeta>{featuredService.category}</FeaturedMeta>
            <FeaturedTitle>{featuredService.title}</FeaturedTitle>
            <FeaturedBody>{featuredService.body}</FeaturedBody>
            <FeaturedLink href="#it">IT 상세보기</FeaturedLink>
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
