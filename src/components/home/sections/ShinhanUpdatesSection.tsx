import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useNewsletterRecords } from '../../../hooks/useNewsContent';
import { useSiteContent } from '../../../hooks/useSiteContent';
import { getNewsletterRecords } from '../../../repositories/newsRepository';
import { useI18n } from '../../../i18n/useI18n';
import type { NewsletterRecord } from '../../../types/site';
import * as S from '../homeStyles';

const newsletterVisuals = [
  '/hero/trade-insights-ai-1.png',
  '/hero/trade-insights-ai-2.png',
  '/hero/trade-insights-ai-3.png',
  '/hero/trade-insights-ai-4.png',
  '/hero/trade-insights-ai-5.png',
];

const Section = styled.section`
  position: relative;
  padding: 76px 0 78px;
  overflow: hidden;
  background:
    linear-gradient(132deg, rgba(237, 245, 251, 0.82) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(242, 249, 247, 0.76) 100%),
    linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::before {
    content: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: -120px;
    top: 42px;
    width: min(42vw, 560px);
    aspect-ratio: 1;
    pointer-events: none;
    background: url('/brand-mark-shinhan.png') center / contain no-repeat;
    opacity: 0.034;
    transform: rotate(8deg);
  }

  @media (max-width: 860px) {
    padding: 82px 0;

    &::after {
      width: 82vw;
      right: -42vw;
      top: 120px;
    }
  }
`;

const Inner = styled(S.Container)`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 34px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 24px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const TitleBlock = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: 1040px;
  min-height: clamp(76px, 9vw, 128px);
  overflow: visible;
`;

const TitleGhost = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  color: rgba(15, 35, 62, 0.062);
  font-size: clamp(2.25rem, 4.8vw, 4.55rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;

  @media (max-width: 640px) {
    font-size: clamp(2rem, 9.5vw, 3.55rem);
    letter-spacing: 0.04em;
  }
`;

const Title = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  color: ${S.palette.blue};
  font-size: clamp(2.05rem, 4.6vw, 4.35rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.06em;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
`;

const HeadActions = styled.div`
  display: grid;
  justify-items: end;
  gap: 18px;
  padding-right: clamp(18px, 3vw, 46px);

  @media (max-width: 780px) {
    justify-items: start;
    padding-right: 0;
  }
`;

const ControlButton = styled.button<{ $direction: 'prev' | 'next' }>`
  display: inline-grid;
  place-items: center;
  width: 66px;
  height: 66px;
  border: 1px solid rgba(28, 90, 169, 0.14);
  border-radius: 50%;
  color: ${S.palette.blue};
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(239, 247, 252, 0.88));
  box-shadow:
    0 18px 34px rgba(15, 43, 89, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition:
    transform 0.22s ease,
    background 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: ${({ $direction }) => ($direction === 'prev' ? 'rotate(-135deg) translate(-1px, -1px)' : 'rotate(45deg) translate(-1px, 1px)')};
    transition: transform 0.22s ease;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(28, 90, 169, 0.34);
    background:
      linear-gradient(145deg, #ffffff, rgba(232, 244, 252, 0.96));
    box-shadow: 0 22px 42px rgba(15, 43, 89, 0.13);
  }

  &:hover::before {
    transform: ${({ $direction }) => ($direction === 'prev' ? 'rotate(-135deg) translate(2px, 2px)' : 'rotate(45deg) translate(2px, -2px)')};
  }
`;

const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 10px;
  color: ${S.palette.blue};
  font-size: 1.06rem;
  font-weight: 800;
  text-decoration: none;

  &::after {
    content: '';
    width: 36px;
    height: 1px;
    background: currentColor;
  }
`;

const Carousel = styled.div`
  min-width: 0;
  overflow: visible;
`;

const Viewport = styled.div`
  --card-width: clamp(360px, 31vw, 500px);
  --card-gap: clamp(28px, 4vw, 58px);
  overflow: hidden;
  padding: 22px clamp(22px, 3vw, 54px) 64px;

  @media (max-width: 780px) {
    --card-width: min(84vw, 420px);
    overflow-x: auto;
    padding-bottom: 34px;
    scroll-snap-type: x mandatory;
  }
`;

const Track = styled.div<{ $activeIndex: number }>`
  display: flex;
  align-items: flex-start;
  gap: var(--card-gap);
  transform: translate3d(calc(${({ $activeIndex }) => $activeIndex} * -1 * (var(--card-width) + var(--card-gap))), 0, 0);
  transition: transform 0.56s cubic-bezier(0.2, 0.82, 0.2, 1);

  @media (max-width: 780px) {
    transform: none;
  }
`;

const Card = styled(Link)<{ $accent: string; $visual: string }>`
  position: relative;
  flex: 0 0 var(--card-width);
  height: 530px;
  color: #30343a;
  text-decoration: none;
  scroll-snap-align: start;
  --accent: ${({ $accent }) => $accent};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 178px;
    background:
      linear-gradient(90deg, color-mix(in srgb, var(--accent) 70%, #ffffff), rgba(255, 255, 255, 0.08)),
      url(${({ $visual }) => $visual}) center / cover no-repeat;
    filter: saturate(0.9);
  }

  &:hover article {
    transform: translateY(-7px);
    border-color: color-mix(in srgb, var(--accent) 76%, #ffffff);
    box-shadow: 0 34px 70px rgba(15, 43, 89, 0.15);
  }
`;

const CardPanel = styled.article`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: auto auto minmax(64px, 1fr) auto;
  gap: 18px;
  height: 398px;
  margin: 96px 30px 0;
  padding: 42px 42px 30px;
  border: 1px solid rgba(15, 43, 89, 0.08);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(247, 251, 253, 0.9)),
    #ffffff;
  box-shadow: 0 24px 58px rgba(15, 43, 89, 0.08);
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 44px;
    height: 44px;
    border-right: 2px solid var(--accent);
    border-bottom: 2px solid var(--accent);
  }

  @media (max-width: 640px) {
    height: 386px;
    margin-inline: 16px;
    padding: 34px 28px 26px;
  }
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--accent);
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.02em;
`;

const CardDate = styled.span`
  color: #8a949d;
  font-size: 0.96rem;
  font-weight: 800;
  white-space: nowrap;
`;

const CardTitle = styled.strong`
  display: grid;
  align-content: start;
  gap: 7px;
  min-height: 108px;
  color: #33373c;
  letter-spacing: -0.035em;

  @media (max-width: 640px) {
    min-height: 100px;
  }
`;

const CardTitlePrefix = styled.span`
  color: var(--accent);
  font-size: clamp(0.92rem, 1.08vw, 1.04rem);
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -0.01em;
`;

const CardTitleBrand = styled.span`
  color: #6d7a88;
  font-size: clamp(0.8rem, 0.9vw, 0.92rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const CardTitleText = styled.span`
  display: -webkit-box;
  font-size: clamp(1.34rem, 1.72vw, 1.76rem);
  font-weight: 850;
  line-height: 1.36;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const CardText = styled.p`
  display: -webkit-box;
  margin: 0;
  color: #637180;
  font-size: 0.98rem;
  line-height: 1.58;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const CardFoot = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 18px;
  border-top: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
  color: #8a949d;
  font-size: 0.98rem;
  font-weight: 800;

  &::after {
    content: '→';
    color: var(--accent);
    font-size: 1.7rem;
    line-height: 1;
  }
`;

type NewsListItem = {
  id: string;
  category: string;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  publishedAt: string;
  href: string;
};

type CarouselItem = NewsListItem & {
  accent: string;
  groupLabel: string;
  visual: string;
};

function splitNewsletterTitle(title: string) {
  const match = title.match(/^(\[[^\]]*(?:소식지|Newsletter)[^\]]*\])\s*(.*)$/i);
  const prefix = match ? match[1] : null;
  const body = (match ? match[2] : title).trim();
  const brandMatch = body.match(/^(Zoom In Trade)\s*[-–—:]\s*(.*)$/i);

  return {
    prefix,
    brand: brandMatch ? brandMatch[1] : null,
    title: brandMatch ? brandMatch[2] || body : body,
  };
}

function buildNewsletterItems(items: NewsletterRecord[]): NewsListItem[] {
  return [...items]
    .filter((item) => item.language !== '영문')
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .slice(0, 10)
    .map((item) => ({
      id: item.id,
      category: item.language ?? 'Shinhan Report',
      titleKo: item.title,
      titleEn: item.titleEn,
      summaryKo: item.summary,
      summaryEn: item.summaryEn,
      publishedAt: item.publishedAt,
      href: `/news/newsletter/${item.id}`,
    }));
}

export function ShinhanUpdatesSection() {
  const { t } = useI18n();
  const { content } = useSiteContent();
  const homeCopy = content.home.copy as Record<string, string | undefined>;
  const { items: dynamicNewsletterItems } = useNewsletterRecords();
  const [activeIndex, setActiveIndex] = useState(0);

  const newsletterItems = dynamicNewsletterItems.length > 0 ? dynamicNewsletterItems : getNewsletterRecords();
  const newsletterList = buildNewsletterItems(newsletterItems);
  const carouselItems: CarouselItem[] = newsletterList.map((item, index) => ({
      ...item,
      accent: S.palette.blue,
      groupLabel: t('소식지', 'Shinhan Newsletter'),
      visual: newsletterVisuals[index % newsletterVisuals.length],
    }));
  const normalizedActiveIndex = carouselItems.length > 0 ? activeIndex % carouselItems.length : 0;

  const moveSlide = (direction: 'prev' | 'next') => {
    setActiveIndex((current) => {
      if (carouselItems.length <= 1) return 0;
      if (direction === 'prev') return (current - 1 + carouselItems.length) % carouselItems.length;
      return (current + 1) % carouselItems.length;
    });
  };

  if (carouselItems.length === 0) return null;

  return (
    <Section>
      <Inner>
        <Head>
          <TitleBlock>
            <TitleGhost aria-hidden="true">{homeCopy.newsletterGhost ?? 'NEWSLETTER'}</TitleGhost>
            <Title>{t(homeCopy.newsletterTitle ?? '소식지', homeCopy.newsletterTitleEn ?? 'Shinhan Newsletter')}</Title>
          </TitleBlock>
          <HeadActions>
            <Controls aria-label={t('신한 소식 슬라이드 이동', 'Move Shinhan updates slider')}>
              <ControlButton type="button" $direction="prev" aria-label={t('이전 소식', 'Previous update')} onClick={() => moveSlide('prev')} />
              <ControlButton type="button" $direction="next" aria-label={t('다음 소식', 'Next update')} onClick={() => moveSlide('next')} />
            </Controls>
            <ViewAll to="/news/newsletter">
              {t(homeCopy.newsletterViewLabel ?? '소식지 전체보기', homeCopy.newsletterViewLabelEn ?? 'View all Shinhan Newsletters')}
            </ViewAll>
          </HeadActions>
        </Head>

        <Carousel>
          <Viewport>
            <Track $activeIndex={normalizedActiveIndex}>
              {carouselItems.map((item, index) => (
                <Card
                  key={`${item.href}-${index}`}
                  to={item.href}
                  $accent={item.accent}
                  $visual={item.visual}
                  aria-label={t(item.titleKo, item.titleEn)}
                >
                  <CardPanel>
                    <CardMeta>
                      <span>{item.groupLabel}</span>
                      <CardDate>{item.publishedAt}</CardDate>
                    </CardMeta>
                    {(() => {
                      const title = splitNewsletterTitle(t(item.titleKo, item.titleEn));

                      return (
                        <CardTitle>
                          {title.prefix ? <CardTitlePrefix>{title.prefix}</CardTitlePrefix> : null}
                          {title.brand ? <CardTitleBrand>{title.brand}</CardTitleBrand> : null}
                          <CardTitleText>{title.title}</CardTitleText>
                        </CardTitle>
                      );
                    })()}
                    <CardText>{t(item.summaryKo, item.summaryEn)}</CardText>
                    <CardFoot>{item.groupLabel}</CardFoot>
                  </CardPanel>
                </Card>
              ))}
            </Track>
          </Viewport>
        </Carousel>
      </Inner>
    </Section>
  );
}
