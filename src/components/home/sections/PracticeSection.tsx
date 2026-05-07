import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const ANCHOR_IDS = [
  'practice-import-export',
  'practice-quarantine',
  'practice-fta',
  'practice-aeo',
  'practice-investigation',
  'practice-acva',
  'practice-tax',
  'practice-refund',
  'practice-consulting',
  'practice-logistics',
  'practice-vietnam',
  'practice-fda',
  'practice-it',
  'it',
];

const practiceItems = [
  {
    id: 'practice-import-export',
    title: '수출입통관',
    titleEn: 'Import & Export Clearance',
    label: 'CLEARANCE',
    href: '/services/import-export',
  },
  {
    id: 'practice-quarantine',
    title: '검역·요건',
    titleEn: 'Quarantine & Requirements',
    label: 'REQUIREMENTS',
    href: '/services/quarantine',
  },
  {
    id: 'practice-fta',
    title: 'FTA',
    titleEn: 'FTA',
    label: 'ORIGIN',
    href: '/services/consulting/fta',
  },
  {
    id: 'practice-aeo',
    title: 'AEO',
    titleEn: 'AEO',
    label: 'COMPLIANCE',
    href: '/services/consulting/aeo',
  },
  {
    id: 'practice-investigation',
    title: '관세조사',
    titleEn: 'Customs Audit',
    label: 'AUDIT RESPONSE',
    href: '/services/consulting/customs-audit',
  },
  {
    id: 'practice-foreign-exchange',
    title: '외환검사·조사',
    titleEn: 'Foreign Exchange Inspection & Investigation',
    label: 'FOREIGN EXCHANGE',
    href: '/services/consulting/foreign-exchange',
  },
];

function useCountUp(target: number, duration = 1200) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(target);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setValue(target);
      setIsCounting(false);
      return;
    }

    setValue(0);
    setIsCounting(false);
    let frameId = 0;

    const runCount = () => {
      let startedAt = 0;

      setValue(0);
      setIsCounting(true);

      const tick = (timestamp: number) => {
        if (!startedAt) startedAt = timestamp;
        const progress = Math.min((timestamp - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const pulse = Math.sin(progress * Math.PI * 5) * 0.05;
        setValue(Math.max(1, Math.round(target * Math.min(eased + pulse, 1))));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        } else {
          setValue(target);
          window.setTimeout(() => setIsCounting(false), 260);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.cancelAnimationFrame(frameId);

        if (entry.isIntersecting) {
          runCount();
          return;
        }

        setValue(0);
        setIsCounting(false);
      },
      { threshold: 0.36 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, target]);

  return { ref, value, isCounting };
}

const Section = styled.section`
  position: relative;
  min-height: 760px;
  padding: 104px 0 96px;
  overflow: hidden;
  background:
    linear-gradient(126deg, rgba(238, 246, 252, 0.88) 0%, rgba(255, 255, 255, 0.6) 44%, rgba(232, 243, 247, 0.64) 100%),
    linear-gradient(180deg, #fbfdff 0%, #f6f9fc 100%);
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::before {
    content: 'PRACTICE';
    position: absolute;
    left: 24px;
    top: 22px;
    color: rgba(15, 35, 62, 0.05);
    font-size: clamp(4.6rem, 10vw, 10.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0;
  }

  &::after {
    content: '';
    position: absolute;
    right: -110px;
    bottom: clamp(18px, 4vw, 58px);
    width: min(46vw, 620px);
    aspect-ratio: 1;
    pointer-events: none;
    background: url('/brand-mark-shinhan.png') center / contain no-repeat;
    opacity: 0.045;
    transform: rotate(-10deg);
  }

  @keyframes countPop {
    0% {
      transform: translateY(10px) scale(0.92);
      filter: drop-shadow(0 0 0 rgba(39, 111, 207, 0));
    }

    36% {
      transform: translateY(-8px) scale(1.08);
      color: #165cb8;
      filter: drop-shadow(0 18px 24px rgba(39, 111, 207, 0.2));
    }

    72% {
      transform: translateY(2px) scale(0.98);
    }

    100% {
      transform: translateY(0) scale(1);
      filter: drop-shadow(0 0 0 rgba(39, 111, 207, 0));
    }
  }

  @media (max-width: 860px) {
    min-height: auto;
    padding: 82px 0 76px;

    &::after {
      width: 82vw;
      right: -42vw;
      bottom: 18px;
      background-size: 84%;
      opacity: 0.035;
    }
  }
`;

const Inner = styled(S.Container)`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(360px, 0.82fr);
  gap: clamp(34px, 5vw, 86px);
  align-items: center;
  min-height: 560px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    align-items: start;
    min-height: 0;
  }
`;

const CountPanel = styled.div`
  display: grid;
  gap: 28px;
`;

const CountLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 22px;
  color: #2c2e33;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    gap: 10px 16px;
  }
`;

const CountLabelStack = styled.span`
  display: inline-grid;
  gap: 10px;
  padding-bottom: 0.22em;
`;

const CountValue = styled.strong`
  display: inline-flex;
  align-items: flex-start;
  color: #2f3136;
  font-size: clamp(5.8rem, 14vw, 10.4rem);
  font-weight: 800;
  line-height: 0.84;
  letter-spacing: 0;
`;

const Plus = styled.span`
  margin-left: 0.06em;
  font-size: 0.48em;
  line-height: 0.92;
`;

const CountLabel = styled.span`
  position: relative;
  display: inline-flex;
  color: #30343a;
  font-size: clamp(2.1rem, 4vw, 4rem);
  font-weight: 500;
  line-height: 0.98;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: -8px;
    bottom: 0;
    height: 10px;
    background: linear-gradient(90deg, rgba(28, 90, 169, 0.72), rgba(33, 101, 193, 0.28));
    z-index: -1;
  }

  @media (max-width: 700px) {
    white-space: normal;
  }
`;

const CountLabelKo = styled.span`
  color: #1c5aa9;
  font-size: clamp(1.12rem, 1.8vw, 1.7rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const Summary = styled.p`
  max-width: 620px;
  margin: 0;
  color: #52697f;
  font-size: clamp(1.14rem, 1.35vw, 1.28rem);
  line-height: 1.78;
`;

const CountNumber = styled.span<{ $counting: boolean }>`
  display: inline-flex;
  align-items: flex-start;
  transform-origin: 50% 78%;
  animation: ${({ $counting }) => ($counting ? 'countPop 0.38s cubic-bezier(0.2, 0.9, 0.24, 1.28)' : 'none')};
  transition:
    color 0.18s ease,
    filter 0.18s ease;
`;

const List = styled.div`
  position: relative;
  display: grid;
  padding: 10px 0;

  &::before {
    content: '';
    position: absolute;
    left: -32px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, rgba(15, 43, 89, 0), rgba(15, 43, 89, 0.16), rgba(15, 43, 89, 0));
  }

  @media (max-width: 980px) {
    &::before {
      display: none;
    }
  }
`;

const PracticeLink = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  min-height: 92px;
  padding: 22px 0 22px 24px;
  border-bottom: 1px solid rgba(15, 43, 89, 0.11);
  text-decoration: none;
  overflow: hidden;
  transition:
    padding-left 0.24s ease,
    background 0.24s ease,
    border-color 0.24s ease,
    color 0.24s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 25%;
    bottom: 25%;
    width: 2px;
    background: rgba(28, 90, 169, 0.18);
    transform: scaleY(0.72);
    transform-origin: center;
    transition:
      background 0.24s ease,
      transform 0.24s ease;
  }

  &:hover {
    padding-left: 34px;
    background: linear-gradient(90deg, rgba(33, 101, 193, 0.06), rgba(33, 101, 193, 0));
    border-color: rgba(28, 90, 169, 0.42);

    &::before {
      background: #1c5aa9;
      transform: scaleY(1);
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(28, 90, 169, 0.56);
    outline-offset: 3px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
    min-height: 0;
    padding-left: 18px;

    &:hover {
      padding-left: 24px;
    }
  }
`;

const PracticeCopy = styled.span`
  display: grid;
  gap: 8px;
  min-width: 0;
`;

const PracticeTitle = styled.strong`
  color: #2f3338;
  font-size: clamp(1.62rem, 2.6vw, 2.38rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.02em;
`;

const PracticeMeta = styled.span`
  color: #687782;
  font-size: clamp(1.06rem, 1.2vw, 1.18rem);
  font-weight: 800;
  line-height: 1.38;
`;

const PracticeArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(15, 43, 89, 0.12);
  border-radius: 50%;
  color: #1c5aa9;
  font-size: 1.08rem;
  font-weight: 800;
  transition:
    transform 0.24s ease,
    border-color 0.24s ease,
    background 0.24s ease;

  ${PracticeLink}:hover & {
    transform: translateX(5px);
    border-color: rgba(28, 90, 169, 0.34);
    background: rgba(255, 255, 255, 0.74);
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export function PracticeSection() {
  const { t } = useI18n();
  const { ref, value, isCounting } = useCountUp(100);

  return (
    <>
      {ANCHOR_IDS.map((anchorId) => (
        <S.SectionAnchor key={anchorId} id={anchorId} />
      ))}

      <Section id="practice">
        <Inner data-reveal>
          <CountPanel ref={ref}>
            <CountLine aria-label={t('100명 이상의 전문 인력', 'More than 100 professionals')}>
              <CountValue>
                <CountNumber key={value} $counting={isCounting}>{value}</CountNumber>
                <Plus>+</Plus>
              </CountValue>
              <CountLabelStack>
                <CountLabelKo>업무분야</CountLabelKo>
                <CountLabel>Professionals</CountLabel>
              </CountLabelStack>
            </CountLine>
            <Summary>
              {t(
                '전문 인력의 실무 경험을 바탕으로 수출입통관, 검역·요건, FTA, AEO, 조사 대응과 외환 이슈까지 연결해 대응합니다.',
                'Our professionals connect practical experience across clearance, requirements, FTA, AEO, audit response, and foreign exchange issues.',
              )}
            </Summary>
          </CountPanel>

          <List aria-label={t('업무 분야 목록', 'Practice area list')}>
            {practiceItems.map((item) => (
              <PracticeLink key={item.id} id={item.id} to={item.href}>
                <PracticeCopy>
                  <PracticeTitle>{item.title}</PracticeTitle>
                  <PracticeMeta>{item.titleEn}</PracticeMeta>
                </PracticeCopy>
                <PracticeArrow aria-hidden="true">&gt;</PracticeArrow>
              </PracticeLink>
            ))}
          </List>
        </Inner>
      </Section>
    </>
  );
}
