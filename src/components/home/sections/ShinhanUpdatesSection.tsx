import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useNewsletterRecords, useShinhanNewsRecords } from '../../../hooks/useNewsContent';
import { getNewsletterRecords, getShinhanNewsRecords } from '../../../repositories/newsRepository';
import { useI18n } from '../../../i18n/useI18n';
import type { NewsletterRecord, ShinhanNewsRecord } from '../../../types/site';
import { getShinhanNewsSourceLabel, sortShinhanNewsRecords } from '../../../utils/shinhanNews';
import * as S from '../homeStyles';

const newsVisuals = {
  flash: '/hero/issue-report-ai-insight.png',
  newsletter: '/hero/homepage/shinhan-glass-facade.jpg',
};

const Section = styled.section`
  position: relative;
  padding: clamp(98px, 10vw, 142px) 0;
  overflow: hidden;
  background:
    linear-gradient(90deg, rgba(15, 43, 89, 0.055) 1px, transparent 1px) 0 0 / 20vw 100%,
    radial-gradient(circle at 18% 18%, rgba(33, 101, 193, 0.1), transparent 30%),
    linear-gradient(135deg, #eef5fa 0%, #f8fbfd 48%, #eaf3f8 100%);
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 24%;
    width: 4px;
    height: 142px;
    background: linear-gradient(180deg, rgba(28, 90, 169, 0.1), #1c8ec2, rgba(28, 90, 169, 0.1));
  }
`;

const Inner = styled(S.Container)`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(220px, 0.26fr) minmax(0, 1fr);
  gap: clamp(34px, 5vw, 78px);
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Rail = styled.div`
  display: grid;
  gap: 34px;
  align-content: center;
  min-height: 520px;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #1c5aa9;
  font-size: 0.94rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 36px;
    height: 1px;
    background: rgba(33, 101, 193, 0.48);
  }
`;

const Title = styled.h2`
  margin: 14px 0 0;
  color: #2c3137;
  font-size: clamp(3rem, 5.6vw, 6.4rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.065em;
`;

const HeadText = styled.p`
  max-width: 320px;
  margin: 18px 0 0;
  color: #5c6d7c;
  font-size: 1.14rem;
  line-height: 1.7;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
`;

const ControlButton = styled.button`
  display: inline-grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border: 1px solid rgba(15, 43, 89, 0.1);
  border-radius: 50%;
  color: #6b7481;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 34px rgba(15, 43, 89, 0.08);
  font-size: 2rem;
  cursor: pointer;
  transition:
    transform 0.22s ease,
    color 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    color: #1c5aa9;
    border-color: rgba(28, 90, 169, 0.24);
    box-shadow: 0 22px 42px rgba(15, 43, 89, 0.13);
  }
`;

const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 10px;
  color: #164f99;
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
  --card-width: clamp(390px, 33vw, 540px);
  --card-gap: clamp(44px, 5vw, 82px);
  overflow: hidden;
  padding: 36px 0 74px;

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
  min-height: 430px;
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
  grid-template-rows: auto 1fr auto;
  gap: 22px;
  min-height: 316px;
  margin: 96px 30px 0;
  padding: 46px 42px 30px;
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
    margin-inline: 16px;
    padding: 36px 28px 26px;
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
  display: -webkit-box;
  color: #33373c;
  font-size: clamp(1.46rem, 2vw, 2rem);
  font-weight: 850;
  line-height: 1.42;
  letter-spacing: -0.035em;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const CardText = styled.p`
  display: -webkit-box;
  margin: 0;
  color: #637180;
  font-size: 1.04rem;
  line-height: 1.62;
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

function buildShinhanNewsItems(items: ShinhanNewsRecord[], category: 'flash' | 'seminar'): NewsListItem[] {
  return sortShinhanNewsRecords(items)
    .filter((item) => item.category === category)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      category: category === 'seminar' ? 'SEMINAR' : getShinhanNewsSourceLabel(item, 'SEMINAR'),
      titleKo: item.title,
      titleEn: item.titleEn,
      summaryKo: item.summary,
      summaryEn: item.summaryEn,
      publishedAt: item.publishedAt,
      href: category === 'seminar' ? `/news/seminar/${item.id}` : `/news/shinhan-news/${item.id}`,
    }));
}

function buildNewsletterItems(items: NewsletterRecord[]): NewsListItem[] {
  return [...items]
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      category: item.language ?? 'Newsletter',
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
  const { items: dynamicShinhanNewsItems } = useShinhanNewsRecords();
  const { items: dynamicNewsletterItems } = useNewsletterRecords();
  const [activeIndex, setActiveIndex] = useState(0);

  const shinhanNewsItems = dynamicShinhanNewsItems.length > 0 ? dynamicShinhanNewsItems : getShinhanNewsRecords();
  const newsletterItems = dynamicNewsletterItems.length > 0 ? dynamicNewsletterItems : getNewsletterRecords();
  const flashList = buildShinhanNewsItems(shinhanNewsItems, 'flash');
  const newsletterList = buildNewsletterItems(newsletterItems);
  const carouselItems: CarouselItem[] = [
    ...flashList.map((item) => ({
      ...item,
      accent: '#1c5aa9',
      groupLabel: t('신한 NEWS', 'Shinhan NEWS'),
      visual: newsVisuals.flash,
    })),
    ...newsletterList.map((item) => ({
      ...item,
      accent: '#123f85',
      groupLabel: t('소식지', 'Newsletter'),
      visual: newsVisuals.newsletter,
    })),
  ];
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
      <Inner data-reveal>
        <Rail>
          <div>
            <Label>Shinhan Updates</Label>
            <Title>{t('신한 소식', 'Shinhan Updates')}</Title>
            <HeadText>
              {t(
                '신한 NEWS와 소식지를 가로형 카드로 넘겨보며 확인할 수 있습니다.',
                'Browse Shinhan NEWS and newsletters through a horizontal editorial carousel.',
              )}
            </HeadText>
          </div>
          <Controls aria-label={t('신한 소식 슬라이드 이동', 'Move Shinhan updates slider')}>
            <ControlButton type="button" aria-label={t('이전 소식', 'Previous update')} onClick={() => moveSlide('prev')}>
              ‹
            </ControlButton>
            <ControlButton type="button" aria-label={t('다음 소식', 'Next update')} onClick={() => moveSlide('next')}>
              ›
            </ControlButton>
          </Controls>
          <ViewAll to="/news">{t('소식 전체보기', 'View all news')}</ViewAll>
        </Rail>

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
                    <CardTitle>{t(item.titleKo, item.titleEn)}</CardTitle>
                    <CardText>{t(item.summaryKo, item.summaryEn)}</CardText>
                    <CardFoot>{item.category}</CardFoot>
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
