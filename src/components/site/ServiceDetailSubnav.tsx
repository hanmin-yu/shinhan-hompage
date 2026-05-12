import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import type { ServiceLandingGroup } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

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
  display: grid;
  justify-items: center;
  gap: 16px;
  background: #ffffff;
  text-align: center;

  @media (max-width: 900px) {
    justify-items: stretch;
  }

  @media (max-width: 760px) {
    gap: 10px;
  }
`;

const SecondaryWrap = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
`;

const SecondaryTabs = styled.nav`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  width: 100%;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 760px) {
    flex-wrap: nowrap;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SecondaryLink = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid ${({ $active }) => ($active ? '#121c2b' : '#d5dbe4')};
  background: ${({ $active }) => ($active ? '#121c2b' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#4f5661')};
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0;
  white-space: nowrap;
  word-break: keep-all;
  transition:
    border-color 0.18s ease,
    color 0.18s ease,
    background-color 0.18s ease;

  &:hover,
  &:focus-visible {
    color: ${({ $active }) => ($active ? '#ffffff' : '#121c2b')};
  }

  &:focus-visible {
    outline: 2px solid rgba(18, 28, 43, 0.24);
    outline-offset: 2px;
  }

  @media (max-width: 760px) {
    flex: 0 0 auto;
    min-height: 36px;
    padding: 0 14px;
    border-color: ${({ $active }) => ($active ? '#123f85' : '#d9e0eb')};
    border-radius: 999px;
    background: ${({ $active }) => ($active ? '#123f85' : '#ffffff')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#526071')};
    font-size: 0.82rem;
    font-weight: 800;
  }
`;

export function ServiceDetailSubnav({
  groups,
  activeGroupId,
  activePath,
}: ServiceDetailSubnavProps) {
  const { t } = useI18n();

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  if (!activeGroup || activeGroup.items.length <= 1) {
    return null;
  }

  return (
    <Wrap>
      <SecondaryWrap>
        <SecondaryTabs aria-label={t('업무분야 2차 메뉴', 'Practice area secondary navigation')}>
          {activeGroup.items.map((item) => (
            <SecondaryLink key={item.href} to={item.href} $active={item.href === activePath}>
              {t(item.label, item.labelEn)}
            </SecondaryLink>
          ))}
        </SecondaryTabs>
      </SecondaryWrap>
    </Wrap>
  );
}
