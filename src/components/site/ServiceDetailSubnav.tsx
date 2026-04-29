import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import type { ServiceLandingGroup } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';
import { palette } from '../home/homeStyles';

type ServiceDetailSubnavProps = {
  kicker?: string;
  kickerEn?: string;
  title: string;
  titleEn: string;
  summary?: string;
  summaryEn?: string;
  groups: ServiceLandingGroup[];
  activeGroupId: ServiceLandingGroup['id'];
  activePath: string;
};

const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 34px 0 30px;
  margin-bottom: 34px;
  border-bottom: 1px solid rgba(225, 238, 255, 0.22);
  color: #ffffff;

  @media (max-width: 980px) {
    gap: 18px;
    padding: 28px 0 24px;
    margin-bottom: 34px;
  }

  @media (max-width: 640px) {
    gap: 14px;
    padding: 22px 0 20px;
    margin-bottom: 26px;
  }
`;

const Intro = styled.div`
  display: grid;
  gap: 14px;
  width: fit-content;
  max-width: 1080px;
  padding: clamp(16px, 2.2vw, 24px);
  border-radius: 24px;
  border: 1px solid rgba(225, 238, 255, 0.18);
  background:
    radial-gradient(circle at 92% 0%, rgba(23, 159, 150, 0.14), transparent 28%),
    linear-gradient(135deg, rgba(4, 18, 44, 0.62), rgba(10, 43, 89, 0.26));
  box-shadow: 0 24px 52px rgba(3, 15, 34, 0.2);
  backdrop-filter: blur(12px);
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(232, 242, 255, 0.96);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-shadow: 0 12px 28px rgba(3, 15, 34, 0.34);

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, rgba(225, 238, 255, 0.74), rgba(23, 159, 150, 0.62));
  }
`;

const IntroTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.85rem, 8vw, 7.4rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.075em;
  text-shadow:
    0 20px 48px rgba(3, 15, 34, 0.5),
    0 2px 8px rgba(3, 15, 34, 0.34);

  @media (max-width: 640px) {
    font-size: clamp(2.36rem, 13vw, 4.4rem);
    line-height: 0.98;
  }
`;

const IntroSummary = styled.p`
  margin: 0;
  color: rgba(232, 242, 255, 0.9);
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.72;
  max-width: 820px;
  text-shadow: 0 14px 32px rgba(3, 15, 34, 0.34);
`;

const PrimaryTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 100%;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid rgba(225, 238, 255, 0.24);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(22, 91, 176, 0.08));
  box-shadow: 0 18px 38px rgba(3, 15, 34, 0.14);
  backdrop-filter: blur(14px);
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: rgba(26, 86, 170, 0.44) transparent;

  @media (max-width: 980px) {
    gap: 8px;
    flex-wrap: nowrap;
  }

  @media (max-width: 640px) {
    gap: 7px;
  }
`;

const PrimaryLink = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(225, 238, 255, 0.72)' : 'rgba(225, 238, 255, 0.22)')};
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.12)')};
  color: ${({ $active }) => ($active ? palette.blueInk : 'rgba(255, 255, 255, 0.86)')};
  font-family: 'Noto Sans KR', 'NanumSquare', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  box-shadow: ${({ $active }) =>
    $active ? '0 16px 30px rgba(3, 15, 34, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.72)' : 'none'};
  transition:
    color 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;

  &:hover {
    color: ${({ $active }) => ($active ? palette.blueInk : '#ffffff')};
    border-color: rgba(225, 238, 255, 0.5);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.46);
    outline-offset: 2px;
    border-radius: 999px;
  }

  @media (max-width: 980px) {
    min-height: 36px;
    padding: 0 13px;
  }

  @media (max-width: 640px) {
    min-height: 34px;
    padding: 0 11px;
    font-size: 0.84rem;
  }
`;

const SecondaryWrap = styled.div`
  display: grid;
  gap: 10px;
  padding: clamp(18px, 2vw, 22px);
  border-radius: 24px;
  border: 1px solid rgba(225, 238, 255, 0.28);
  background:
    radial-gradient(circle at 92% 10%, rgba(23, 159, 150, 0.1), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(239, 247, 255, 0.88));
  box-shadow: 0 24px 46px rgba(3, 15, 34, 0.18);
  backdrop-filter: blur(12px);

  @media (max-width: 640px) {
    padding: 14px;
  }
`;

const SecondaryMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const SecondaryLabel = styled.span`
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const SecondaryTitle = styled.strong`
  color: ${palette.textPrimary};
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const SecondaryTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: rgba(26, 86, 170, 0.44) transparent;

  @media (max-width: 980px) {
    gap: 8px;
    flex-wrap: nowrap;
  }
`;

const SecondaryLink = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 13px;
  border-radius: 10px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(23, 159, 150, 0.26)' : palette.line)};
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, rgba(23, 159, 150, 0.16), rgba(33, 101, 193, 0.12))'
      : 'rgba(255, 255, 255, 0.94)'};
  color: ${({ $active }) => ($active ? palette.blueInk : palette.blueDeep)};
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  transition: all 0.18s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(23, 159, 150, 0.28);
    background: linear-gradient(180deg, rgba(23, 159, 150, 0.16), rgba(33, 101, 193, 0.12));
    color: ${palette.blueInk};
  }

  &:focus-visible {
    outline: 2px solid rgba(24, 86, 178, 0.36);
    outline-offset: 2px;
  }
`;

export function ServiceDetailSubnav({
  kicker,
  kickerEn,
  title,
  titleEn,
  summary,
  summaryEn,
  groups,
  activeGroupId,
  activePath,
}: ServiceDetailSubnavProps) {
  const { t } = useI18n();

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  return (
    <Wrap data-reveal>
      <Intro>
        {kicker ? <Eyebrow>{t(kicker, kickerEn ?? kicker)}</Eyebrow> : null}
        <IntroTitle>{t(title, titleEn)}</IntroTitle>
        {summary ? <IntroSummary>{t(summary, summaryEn ?? summary)}</IntroSummary> : null}
      </Intro>

      <PrimaryTabs aria-label={t('업무분야 1차 메뉴', 'Practice area primary navigation')}>
        {groups.map((group) => (
          <PrimaryLink key={group.id} to={group.primaryHref} $active={group.id === activeGroupId}>
            {t(group.title, group.titleEn)}
          </PrimaryLink>
        ))}
      </PrimaryTabs>

      {activeGroup ? (
        <SecondaryWrap>
          <SecondaryMeta>
            <SecondaryLabel>{t('세부 분야', 'Service Areas')}</SecondaryLabel>
            <SecondaryTitle>{t(activeGroup.title, activeGroup.titleEn)}</SecondaryTitle>
          </SecondaryMeta>
          <SecondaryTabs aria-label={t('업무분야 2차 메뉴', 'Practice area secondary navigation')}>
            {activeGroup.items.map((item) => (
              <SecondaryLink key={item.href} to={item.href} $active={item.href === activePath}>
                {t(item.label, item.labelEn)}
              </SecondaryLink>
            ))}
          </SecondaryTabs>
        </SecondaryWrap>
      ) : null}
    </Wrap>
  );
}
