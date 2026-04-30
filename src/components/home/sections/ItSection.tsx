import styled from '@emotion/styled';

import { itServices } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const Section = styled.section`
  position: relative;
  padding: 88px 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.14), transparent 22%),
    radial-gradient(circle at 88% 18%, rgba(23, 159, 150, 0.18), transparent 20%),
    linear-gradient(180deg, #102744 0%, #18539f 30%, #dcecff 76%, #f2f8ff 100%);
  border-top: 0;
`;

const Inner = styled(S.Container)`
  position: relative;
  z-index: 1;
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
  color: rgba(235, 246, 255, 0.94);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.72), rgba(23, 159, 150, 0.58));
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #ffffff;
  font-size: clamp(2rem, 3.6vw, 2.85rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.03em;
  text-shadow: 0 16px 38px rgba(3, 15, 34, 0.34);
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
  border: 1px solid rgba(214, 154, 54, 0.22);
  background:
    radial-gradient(circle at top right, rgba(214, 154, 54, 0.2), transparent 24%),
    linear-gradient(160deg, #0f3d7b 0%, #18539f 56%, #1f63bb 82%, #179f96 100%);
  box-shadow: 0 18px 30px rgba(14, 50, 108, 0.18);
`;

const FeaturedMeta = styled.span`
  color: rgba(223, 236, 255, 0.94);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 1.44rem;
  font-weight: 700;
  line-height: 1.34;
  letter-spacing: -0.02em;
`;

const FeaturedBody = styled.p`
  margin: 0;
  color: rgba(231, 240, 255, 0.92);
  font-size: 0.92rem;
  line-height: 1.66;
`;

const FeaturedSummary = styled(FeaturedBody)`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
`;

const FeaturedHint = styled.span`
  margin-top: auto;
  width: fit-content;
  color: rgba(244, 248, 255, 0.94);
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
  border: 1px solid rgba(225, 238, 255, 0.3);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(231, 243, 255, 0.88) 72%, rgba(211, 235, 248, 0.82) 100%);
  box-shadow: 0 12px 26px rgba(3, 15, 34, 0.12);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(23, 159, 150, 0.28);
    box-shadow: 0 14px 22px rgba(16, 53, 114, 0.12);
  }
`;

const ItemCategory = styled.span`
  color: ${S.palette.blue};
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ItemTitle = styled.h4`
  margin: 0;
  color: ${S.palette.textPrimary};
  font-size: 1.01rem;
  font-weight: 700;
  line-height: 1.42;
`;

const ItemBody = styled.p`
  margin: 0;
  color: ${S.palette.textBody};
  font-size: 0.88rem;
  line-height: 1.58;
`;

const ItemSummary = styled(ItemBody)`
  color: ${S.palette.textPrimary};
  font-weight: 700;
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
                <ItemTitle>{t(item.title, item.titleEn)}</ItemTitle>
                {item.summary ? <ItemSummary>{t(item.summary, item.summaryEn ?? item.summary)}</ItemSummary> : null}
                <ItemBody>{t(item.body, item.bodyEn)}</ItemBody>
              </Item>
            ))}
          </List>
        </Grid>
      </Inner>
    </Section>
  );
}
