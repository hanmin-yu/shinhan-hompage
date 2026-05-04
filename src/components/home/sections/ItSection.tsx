import styled from '@emotion/styled';

import { itServices } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import * as P from '../../site/PagePrimitives';

const Section = styled.section`
  position: relative;
  padding: clamp(78px, 9vw, 128px) 0;
  border-top: 1px solid #d8dee8;
  background: linear-gradient(180deg, #f5f6f8 0%, #fbfcfd 100%);
`;

const Inner = styled(P.PageContainer)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(34px, 5vw, 62px);
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: end;
  gap: 16px;
`;

const Label = styled.span`
  display: block;
  color: #52647c;
  font-size: 0.94rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  max-width: 860px;
  margin: 12px 0 0;
  color: #172337;
  font-size: clamp(2.14rem, 4.2vw, 4.22rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.05em;
  text-wrap: balance;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
  gap: clamp(34px, 6vw, 86px);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Featured = styled.article`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(24px, 3vw, 38px);
  border-top: 1px solid #d5dbe4;
  border-bottom: 1px solid #d5dbe4;
`;

const FeaturedMeta = styled.span`
  color: rgba(45, 58, 76, 0.34);
  font-size: 0.94rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h3`
  margin: 0;
  color: #18283e;
  font-size: clamp(1.36rem, 2vw, 1.72rem);
  font-weight: 800;
  line-height: 1.28;
  letter-spacing: -0.03em;
`;

const FeaturedBody = styled.p`
  margin: 0;
  color: #4e5d70;
  font-size: 1.1rem;
  line-height: 1.76;
`;

const FeaturedSummary = styled(FeaturedBody)`
  color: #172337;
  font-size: 1.14rem;
  font-weight: 800;
`;

const FeaturedHint = styled.span`
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid #e2e6ec;
  color: #4b596b;
  font-size: 0.98rem;
  font-weight: 800;
`;

const List = styled.div`
  display: grid;
  border-top: 1px solid #d5dbe4;
`;

const Item = styled.article`
  display: grid;
  grid-template-columns: minmax(110px, 0.22fr) minmax(0, 1fr);
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid #dbe0e8;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ItemCategory = styled.span`
  color: #52647c;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const ItemTitle = styled.h4`
  margin: 0;
  color: #18283e;
  font-size: clamp(1.12rem, 1.7vw, 1.38rem);
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.02em;
`;

const ItemBody = styled.p`
  margin: 0;
  color: #4e5d70;
  font-size: 1.06rem;
  line-height: 1.72;
`;

const ItemSummary = styled(ItemBody)`
  color: #172337;
  font-weight: 800;
`;

const ItemBodyStack = styled.div`
  display: grid;
  gap: 8px;
`;

export function ItSection() {
  const { t } = useI18n();
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
            <FeaturedMeta>{t(featuredService.category, featuredService.categoryEn)}</FeaturedMeta>
            <FeaturedTitle>{t(featuredService.title, featuredService.titleEn)}</FeaturedTitle>
            {featuredService.summary ? <FeaturedSummary>{t(featuredService.summary, featuredService.summaryEn ?? featuredService.summary)}</FeaturedSummary> : null}
            <FeaturedBody>{t(featuredService.body, featuredService.bodyEn)}</FeaturedBody>
            <FeaturedHint>{t('주요 기능 보기', 'View key capabilities')}</FeaturedHint>
          </Featured>

          <List>
            {secondaryServices.map((item) => (
              <Item key={item.title}>
                <ItemCategory>{t(item.category, item.categoryEn)}</ItemCategory>
                <ItemBodyStack>
                  <ItemTitle>{t(item.title, item.titleEn)}</ItemTitle>
                  {item.summary ? <ItemSummary>{t(item.summary, item.summaryEn ?? item.summary)}</ItemSummary> : null}
                  <ItemBody>{t(item.body, item.bodyEn)}</ItemBody>
                </ItemBodyStack>
              </Item>
            ))}
          </List>
        </Grid>
      </Inner>
    </Section>
  );
}
