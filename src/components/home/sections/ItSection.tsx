import styled from '@emotion/styled';

import { itServices } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 88px 0;
  background: linear-gradient(180deg, #e9f2ff 0%, #f1f7ff 100%);
  border-top: 1px solid rgba(21, 77, 159, 0.12);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: end;
  gap: 16px;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #21559e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(47, 87, 146, 0.56);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #103b73;
  font-size: clamp(2rem, 3.6vw, 2.85rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
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
  border-radius: 6px;
  border: 1px solid rgba(24, 79, 160, 0.26);
  background: linear-gradient(160deg, #0f3d7b 0%, #18539f 56%, #1f63bb 100%);
  box-shadow: 0 14px 26px rgba(14, 50, 108, 0.15);
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

const FeaturedHint = styled.span`
  margin-top: auto;
  width: fit-content;
  color: rgba(236, 244, 255, 0.9);
  font-size: 0.84rem;
  font-weight: 700;
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
  border-radius: 6px;
  border: 1px solid rgba(19, 76, 158, 0.18);
  background: #f8fbff;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(19, 76, 158, 0.28);
    box-shadow: 0 12px 20px rgba(16, 53, 114, 0.1);
  }
`;

const ItemCategory = styled.span`
  color: #1f5cb1;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ItemTitle = styled.h4`
  margin: 0;
  color: #11407e;
  font-size: 1.01rem;
  line-height: 1.42;
`;

const ItemBody = styled.p`
  margin: 0;
  color: #44658e;
  font-size: 0.88rem;
  line-height: 1.58;
`;

export function ItSection() {
  const { t, tx } = useI18n();
  const [featuredService, ...secondaryServices] = itServices;

  if (!featuredService) return null;

  return (
    <Section id="it">
      <Inner data-reveal>
        <Head>
          <div>
            <Label>IT Services</Label>
            <Title>{t('관세·IT 융합 서비스', 'Customs + IT Services')}</Title>
          </div>
        </Head>

        <Grid>
          <Featured>
            <FeaturedMeta>{tx(featuredService.category)}</FeaturedMeta>
            <FeaturedTitle>{tx(featuredService.title)}</FeaturedTitle>
            <FeaturedBody>{tx(featuredService.body)}</FeaturedBody>
            <FeaturedHint>{t('주요 기능 보기', 'View key capabilities')}</FeaturedHint>
          </Featured>

          <List>
            {secondaryServices.slice(0, 3).map((item) => (
              <Item key={item.title}>
                <ItemCategory>{tx(item.category)}</ItemCategory>
                <ItemTitle>{tx(item.title)}</ItemTitle>
                <ItemBody>{tx(item.body)}</ItemBody>
              </Item>
            ))}
          </List>
        </Grid>
      </Inner>
    </Section>
  );
}
