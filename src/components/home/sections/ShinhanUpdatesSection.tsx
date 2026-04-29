import styled from '@emotion/styled';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { useNewsletterRecords, useShinhanNewsRecords } from '../../../hooks/useNewsContent';
import { getNewsletterRecords, getShinhanNewsRecords } from '../../../repositories/newsRepository';
import { useI18n } from '../../../i18n/useI18n';
import type { NewsletterRecord, ShinhanNewsRecord } from '../../../types/site';
import { sortShinhanNewsRecords } from '../../../utils/shinhanNews';
import * as S from '../homeStyles';

const Section = styled.section`
  position: relative;
  padding: 92px 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 16%, rgba(17, 93, 187, 0.16), transparent 20%),
    radial-gradient(circle at 88% 12%, rgba(0, 184, 107, 0.14), transparent 18%),
    linear-gradient(180deg, #eef5ff 0%, #f6f9ff 38%, #fbfdff 100%);
  border-top: 1px solid rgba(21, 77, 159, 0.08);
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
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const HeadCopy = styled.div`
  display: grid;
  gap: 14px;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #23549a;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(36, 90, 171, 0.54);
  }
`;

const Title = styled.h2`
  margin: 0;
  color: #103b73;
  font-size: clamp(2rem, 3.7vw, 3rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
`;

const Summary = styled.p`
  margin: 0;
  max-width: 760px;
  color: #4e6785;
  font-size: 0.98rem;
  line-height: 1.72;
`;

const HeadTools = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-self: end;

  @media (max-width: 900px) {
    justify-self: start;
  }
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(24, 83, 165, 0.12);
  background: rgba(255, 255, 255, 0.82);
  color: #1c59ab;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
`;

const CarouselButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid rgba(24, 83, 165, 0.12);
  background: rgba(255, 255, 255, 0.82);
  color: #184f98;
  font-size: 1rem;
  font-weight: 800;
  box-shadow: 0 12px 22px rgba(16, 53, 114, 0.08);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(24, 83, 165, 0.22);
    box-shadow: 0 16px 28px rgba(16, 53, 114, 0.12);
  }
`;

const RailWrap = styled.div`
  position: relative;
`;

const Rail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(300px, 31%);
  gap: 18px;
  overflow-x: auto;
  padding: 4px 6px 10px;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 6px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(32, 81, 151, 0.18);
  }

  &::-webkit-scrollbar-track {
    background: rgba(227, 236, 250, 0.6);
    border-radius: 999px;
  }

  @media (max-width: 1180px) {
    grid-auto-columns: minmax(300px, 44%);
  }

  @media (max-width: 760px) {
    grid-auto-columns: minmax(286px, 86%);
  }
`;

const Card = styled(Link)<{ $theme: 'seminar' | 'flash' | 'newsletter' }>`
  position: relative;
  display: grid;
  gap: 16px;
  min-height: 330px;
  padding: 24px 24px 22px;
  border-radius: 28px;
  border: 1px solid
    ${({ $theme }) =>
      $theme === 'seminar'
        ? 'rgba(24, 93, 173, 0.16)'
        : $theme === 'flash'
          ? 'rgba(28, 135, 104, 0.18)'
          : 'rgba(128, 85, 193, 0.16)'};
  background:
    ${({ $theme }) =>
      $theme === 'seminar'
        ? 'radial-gradient(circle at top right, rgba(69, 131, 214, 0.22), transparent 32%), linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(239, 247, 255, 0.98) 56%, rgba(227, 241, 255, 0.96) 100%)'
        : $theme === 'flash'
          ? 'radial-gradient(circle at top right, rgba(32, 185, 124, 0.24), transparent 30%), linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(238, 250, 245, 0.98) 56%, rgba(225, 247, 237, 0.96) 100%)'
          : 'radial-gradient(circle at top right, rgba(146, 112, 221, 0.2), transparent 30%), linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 242, 255, 0.98) 56%, rgba(237, 232, 255, 0.96) 100%)'};
  box-shadow: 0 18px 30px rgba(16, 53, 114, 0.08);
  scroll-snap-align: start;
  text-decoration: none;
  overflow: hidden;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto auto 0;
    width: 100%;
    height: 5px;
    background:
      ${({ $theme }) =>
        $theme === 'seminar'
          ? 'linear-gradient(90deg, #1c63bb, #4a96e5)'
          : $theme === 'flash'
            ? 'linear-gradient(90deg, #07b56a, #36d48e)'
            : 'linear-gradient(90deg, #7b5ad8, #aa87ff)'};
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 24px 38px rgba(16, 53, 114, 0.12);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const CardLabel = styled.span<{ $theme: 'seminar' | 'flash' | 'newsletter' }>`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background:
    ${({ $theme }) =>
      $theme === 'seminar' ? 'rgba(33, 101, 193, 0.1)' : $theme === 'flash' ? 'rgba(5, 183, 105, 0.12)' : 'rgba(123, 90, 216, 0.12)'};
  color: ${({ $theme }) => ($theme === 'seminar' ? '#1f5eb2' : $theme === 'flash' ? '#078d57' : '#714fd1')};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const CardDate = styled.span`
  color: #5b7596;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
`;

const CardVisual = styled.div<{ $theme: 'seminar' | 'flash' | 'newsletter' }>`
  display: grid;
  align-content: end;
  min-height: 118px;
  padding: 18px 18px 16px;
  border-radius: 22px;
  background:
    ${({ $theme }) =>
      $theme === 'seminar'
        ? 'linear-gradient(135deg, #0d4f9e 0%, #2f78d3 100%)'
        : $theme === 'flash'
          ? 'linear-gradient(135deg, #078957 0%, #17c57b 100%)'
          : 'linear-gradient(135deg, #6945d0 0%, #9b77ff 100%)'};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
`;

const CardVisualMeta = styled.span`
  color: rgba(232, 242, 255, 0.82);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const CardVisualTitle = styled.strong`
  margin-top: 10px;
  color: #ffffff;
  font-size: 1.28rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.14;
  max-width: 10ch;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #143f79;
  font-size: 1.08rem;
  font-weight: 700;
  line-height: 1.54;
`;

const CardText = styled.p`
  margin: 0;
  color: #4d6889;
  font-size: 0.92rem;
  line-height: 1.66;
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const CardHint = styled.span`
  color: #1c59ab;
  font-size: 0.88rem;
  font-weight: 700;
`;

const SwipeHint = styled.span`
  color: #6580a3;
  font-size: 0.84rem;
  font-weight: 700;
`;

type UpdateCard = {
  id: string;
  kind: 'seminar' | 'flash' | 'newsletter';
  labelKo: string;
  labelEn: string;
  eyebrow: string;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  publishedAt: string;
  href: string;
};

function getSeminarRecord(items: ShinhanNewsRecord[]) {
  return sortShinhanNewsRecords(items).find((item) => item.category === 'seminar') ?? null;
}

function getFlashRecord(items: ShinhanNewsRecord[]) {
  return sortShinhanNewsRecords(items).find((item) => item.category === 'flash') ?? null;
}

function buildSeminarCard(item: ShinhanNewsRecord | null): UpdateCard | null {
  if (!item) return null;
  return {
    id: item.id,
    kind: 'seminar',
    labelKo: '세미나',
    labelEn: 'Seminar',
    eyebrow: 'SEMINAR',
    titleKo: item.title,
    titleEn: item.titleEn,
    summaryKo: item.summary,
    summaryEn: item.summaryEn,
    publishedAt: item.publishedAt,
    href: `/news/shinhan-news/${item.id}`,
  };
}

function buildFlashCard(item: ShinhanNewsRecord | null): UpdateCard | null {
  if (!item) return null;
  return {
    id: item.id,
    kind: 'flash',
    labelKo: '플래시',
    labelEn: 'FLASH',
    eyebrow: 'FLASH',
    titleKo: item.title,
    titleEn: item.titleEn,
    summaryKo: item.summary,
    summaryEn: item.summaryEn,
    publishedAt: item.publishedAt,
    href: `/news/shinhan-news/${item.id}`,
  };
}

function buildNewsletterCard(item: NewsletterRecord | null): UpdateCard | null {
  if (!item) return null;
  return {
    id: item.id,
    kind: 'newsletter',
    labelKo: '소식지',
    labelEn: 'Newsletter',
    eyebrow: 'NEWSLETTER',
    titleKo: item.title,
    titleEn: item.titleEn,
    summaryKo: item.summary,
    summaryEn: item.summaryEn,
    publishedAt: item.publishedAt,
    href: `/news/newsletter/${item.id}`,
  };
}

export function ShinhanUpdatesSection() {
  const { t } = useI18n();
  const railRef = useRef<HTMLDivElement | null>(null);
  const { items: dynamicShinhanNewsItems } = useShinhanNewsRecords();
  const { items: dynamicNewsletterItems } = useNewsletterRecords();

  const shinhanNewsItems = dynamicShinhanNewsItems.length > 0 ? dynamicShinhanNewsItems : getShinhanNewsRecords();
  const newsletterItems = dynamicNewsletterItems.length > 0 ? dynamicNewsletterItems : getNewsletterRecords();

  const cards = [
    buildSeminarCard(getSeminarRecord(shinhanNewsItems)),
    buildFlashCard(getFlashRecord(shinhanNewsItems)),
    buildNewsletterCard(newsletterItems[0] ?? null),
  ].filter((item): item is UpdateCard => item !== null);

  const scrollRail = (direction: 'prev' | 'next') => {
    const rail = railRef.current;
    if (!rail) return;

    const firstCard = rail.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 18 : rail.clientWidth * 0.9;
    rail.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  if (cards.length === 0) return null;

  return (
    <Section>
      <Inner data-reveal>
        <Head>
          <HeadCopy>
            <Label>Shinhan Updates</Label>
            <Title>{t('신한 소식', 'Shinhan Updates')}</Title>
            <Summary>
              {t(
                '세미나, FLASH, 소식지를 카드형으로 넘기며 최신 소식을 빠르게 확인해보세요.',
                'Swipe through Seminar, FLASH, and Newsletter cards to check the latest updates at a glance.',
              )}
            </Summary>
          </HeadCopy>

          <HeadTools>
            <CarouselButton type="button" aria-label={t('이전 소식 보기', 'View previous update')} onClick={() => scrollRail('prev')}>
              ←
            </CarouselButton>
            <CarouselButton type="button" aria-label={t('다음 소식 보기', 'View next update')} onClick={() => scrollRail('next')}>
              →
            </CarouselButton>
            <ViewAllLink to="/news/shinhan-news">{t('전체 보기', 'View all')}</ViewAllLink>
          </HeadTools>
        </Head>

        <RailWrap>
          <Rail ref={railRef}>
            {cards.map((card) => (
              <Card key={card.id} to={card.href} $theme={card.kind}>
                <CardTop>
                  <CardLabel $theme={card.kind}>{t(card.labelKo, card.labelEn)}</CardLabel>
                  <CardDate>{card.publishedAt}</CardDate>
                </CardTop>

                <CardVisual $theme={card.kind}>
                  <CardVisualMeta>{card.eyebrow}</CardVisualMeta>
                  <CardVisualTitle>{t(card.labelKo, card.labelEn)}</CardVisualTitle>
                </CardVisual>

                <CardTitle>{t(card.titleKo, card.titleEn)}</CardTitle>
                <CardText>{t(card.summaryKo, card.summaryEn)}</CardText>

                <CardFooter>
                  <CardHint>{t('자세히 보기', 'Learn more')}</CardHint>
                  <SwipeHint>{t('좌우로 넘기기', 'Swipe')}</SwipeHint>
                </CardFooter>
              </Card>
            ))}
          </Rail>
        </RailWrap>
      </Inner>
    </Section>
  );
}
