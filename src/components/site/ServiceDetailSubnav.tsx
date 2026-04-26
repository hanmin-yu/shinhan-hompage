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
  gap: 20px;
  padding-bottom: 26px;
  margin-bottom: 42px;
  border-bottom: 1px solid ${palette.lineSoft};

  @media (max-width: 980px) {
    gap: 18px;
    padding-bottom: 22px;
    margin-bottom: 34px;
  }

  @media (max-width: 640px) {
    gap: 14px;
    padding-bottom: 18px;
    margin-bottom: 26px;
  }
`;

const Intro = styled.div`
  display: grid;
  gap: 10px;
  max-width: 920px;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${palette.blue};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, rgba(33, 101, 193, 0.56), rgba(23, 159, 150, 0.34));
  }
`;

const IntroTitle = styled.h1`
  margin: 0;
  color: ${palette.textStrong};
  font-size: clamp(1.5rem, 2.8vw, 2.3rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
`;

const IntroSummary = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 0.95rem;
  line-height: 1.72;
  max-width: 760px;
`;

const PrimaryTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  overflow-x: auto;
  padding-top: 2px;
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
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(214, 154, 54, 0.24)' : palette.line)};
  background: ${({ $active }) => ($active ? palette.chipBackgroundActive : palette.chipBackground)};
  color: ${({ $active }) => ($active ? '#ffffff' : palette.textMuted)};
  font-family: 'Noto Sans KR', 'NanumSquare', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  box-shadow: ${({ $active }) => ($active ? '0 12px 24px rgba(16, 52, 113, 0.14)' : 'none')};
  transition:
    color 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    color: ${({ $active }) => ($active ? '#ffffff' : palette.blueDeep)};
    border-color: ${palette.lineStrong};
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
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid ${palette.line};
  background: ${palette.panelBackgroundStrong};

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
  font-size: 0.74rem;
  font-weight: 800;
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
  border-radius: 999px;
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
