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
  border-top: 1px solid #d5dbe4;
`;

const Item = styled.article`
  display: grid;
  grid-template-columns: minmax(220px, 0.28fr) minmax(0, 0.72fr);
  gap: clamp(22px, 4vw, 58px);
  padding: clamp(28px, 3.4vw, 46px) 0;
  border-bottom: 1px solid #dbe0e8;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ItemCategory = styled.span`
  display: block;
  color: #52647c;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const ItemTitle = styled.h4`
  margin: 10px 0 0;
  color: #18283e;
  font-size: clamp(1.22rem, 2vw, 1.72rem);
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

const ItemContent = styled.div`
  display: grid;
  gap: 18px;
`;

const ImageGrid = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => ($count > 1 ? 2 : 1)}, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ImageFrame = styled.figure`
  margin: 0;
  padding-top: 14px;
  border-top: 1px solid #d5dbe4;
`;

const ServiceImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  object-position: top left;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background: #ffffff;
`;

export function ItSection() {
  const { t } = useI18n();

  if (!itServices.length) return null;

  return (
    <Section id="it">
      <Inner data-reveal>
        <Head>
          <div>
            <Title>{t('관세·IT 융합 서비스', 'Customs + IT Services')}</Title>
          </div>
        </Head>

        <Grid>
          {itServices.map((item) => (
            <Item key={item.title}>
              <div>
                <ItemCategory>{t(item.category, item.categoryEn)}</ItemCategory>
                <ItemTitle>{t(item.title, item.titleEn)}</ItemTitle>
              </div>
              <ItemContent>
                <ItemBodyStack>
                  {item.summary ? <ItemSummary>{t(item.summary, item.summaryEn ?? item.summary)}</ItemSummary> : null}
                  <ItemBody>{t(item.body, item.bodyEn)}</ItemBody>
                </ItemBodyStack>
                {item.images?.length ? (
                  <ImageGrid $count={item.images.length}>
                    {item.images.map((image) => (
                      <ImageFrame key={image.src}>
                        <ServiceImage src={image.src} alt={t(image.alt, image.altEn ?? image.alt)} loading="lazy" />
                      </ImageFrame>
                    ))}
                  </ImageGrid>
                ) : null}
              </ItemContent>
            </Item>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
