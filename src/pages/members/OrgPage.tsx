import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useI18n } from '../../i18n/useI18n';

type OrgLeaf = {
  ko: string;
  en: string;
};

type OrgGroup = {
  ko: string;
  en: string;
  icon: 'building' | 'bridge' | 'lighthouse' | 'document' | 'chart' | 'globe' | 'people';
  items: OrgLeaf[];
};

const supportNodes = [
  { ko: '부대표', en: 'Vice President', position: 'top-right' as const },
  { ko: '경영관리팀', en: 'Management Team', position: 'mid-left' as const },
  { ko: '고문단', en: 'Advisory Group', position: 'mid-right' as const },
];

const orgGroups: OrgGroup[] = [
  {
    ko: '서울통관본부',
    en: 'Seoul Clearance HQ',
    icon: 'building',
    items: [
      { ko: '전문통관팀', en: 'Specialized Clearance Team' },
      { ko: '상품통관팀', en: 'Product Clearance Team' },
      { ko: '기계전자통관팀', en: 'Machinery & Electronics Team' },
      { ko: '보쉬파트', en: 'Bosch Part' },
    ],
  },
  {
    ko: '경인통관본부',
    en: 'Gyeongin Clearance HQ',
    icon: 'bridge',
    items: [
      { ko: '인천경기지사', en: 'Incheon-Gyeonggi Branch' },
      { ko: 'SH Food Consulting', en: 'SH Food Consulting' },
      { ko: '인천공항지사', en: 'Incheon Airport Branch' },
    ],
  },
  {
    ko: '남부통관본부',
    en: 'Southern Clearance HQ',
    icon: 'lighthouse',
    items: [{ ko: '부산지사', en: 'Busan Branch' }],
  },
  {
    ko: '컨설팅본부',
    en: 'Consulting Division',
    icon: 'document',
    items: [
      { ko: '컨설팅본부', en: 'Consulting Division' },
      { ko: 'AEO 컨설팅팀', en: 'AEO Consulting Team' },
    ],
  },
  {
    ko: '가치성장본부',
    en: 'Value Growth Division',
    icon: 'chart',
    items: [
      { ko: '1팀', en: 'Team 1' },
      { ko: '2팀', en: 'Team 2' },
      { ko: 'CI팀', en: 'CI Team' },
      { ko: 'Process Innovation팀', en: 'Process Innovation Team' },
    ],
  },
  {
    ko: '해외',
    en: 'Global',
    icon: 'globe',
    items: [{ ko: 'SHINHAN Customs VIETNAM', en: 'SHINHAN Customs Vietnam' }],
  },
  {
    ko: '관계사',
    en: 'Affiliates',
    icon: 'people',
    items: [
      { ko: '(주)신한인비스타\n(물류서비스)', en: 'Shinhan Invista\n(Logistics Service)' },
      { ko: 'SH FOOD 컨설팅', en: 'SH FOOD Consulting' },
      { ko: 'KORD SYSTEMS', en: 'KORD SYSTEMS' },
      { ko: 'KORD PARTNERS\n(미국 FDA)', en: 'KORD PARTNERS\n(US FDA)' },
    ],
  },
];

function renderDivisionIcon(icon: OrgGroup['icon']) {
  switch (icon) {
    case 'building':
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 26V12l8-5 8 5v14" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 26v-5h4v5M10 14h1M14 14h1M18 14h1M10 18h1M14 18h1M18 18h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'bridge':
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 23h24M7 23l5-10m13 10-5-10M12 13v10m8-10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'lighthouse':
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 26h8l-2-14h-4l-2 14Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 12h4l-1-4h-2l-1 4ZM10 26h12M8 14l4-2M24 14l-4-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'document':
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="6" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 12h8M12 17h8M12 22h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 25h20M10 22v-6M16 22V9M22 22v-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 15l6-4 4 2 6-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 16h20M16 6c3 3 4 6.5 4 10s-1 7-4 10m0-20c-3 3-4 6.5-4 10s1 7 4 10" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'people':
      return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="21" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 24c0-3 2.5-5 5-5s5 2 5 5M16 24c0-3 2.5-5 5-5s5 2 5 5M10.5 24c0-3.5 2.4-6 5.5-6s5.5 2.5 5.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

export function OrgPage() {
  const { t } = useI18n();
  const membersSubnav = sectionSubnav.members;

  return (
    <P.HeroSection>
      <P.PageContainer data-reveal>
        <LandingSubnav
          kicker={membersSubnav.kicker}
          kickerEn={membersSubnav.kickerEn}
          title={membersSubnav.title}
          titleEn={membersSubnav.titleEn}
          summary={membersSubnav.summary}
          summaryEn={membersSubnav.summaryEn}
          items={membersSubnav.items}
        />

        <TitleWrap>
          <P.SectionTitle>{t('조직도', 'Organization')}</P.SectionTitle>
        </TitleWrap>

        <ChartFrame>
          <ChartInner>
          <TopZone>
            <ChiefNode>
              <ChiefIcon aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="20" r="10" fill="currentColor" />
                  <path
                    d="M18 50c0-8.837 6.268-16 14-16s14 7.163 14 16"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M32 34v16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </ChiefIcon>
              <ChiefLabel>{t('대표이사', 'Chief Executive Officer')}</ChiefLabel>
            </ChiefNode>

            <ChiefLine />

            <SupportRail>
              {supportNodes.map((node) => (
                <SupportNode key={node.ko} position={node.position}>
                  {t(node.ko, node.en)}
                </SupportNode>
              ))}
            </SupportRail>
          </TopZone>

          <DivisionRail />

          <DivisionGrid>
            {orgGroups.map((group) => (
              <DivisionColumn key={group.ko}>
                <DivisionNode>
                  <DivisionIcon>{renderDivisionIcon(group.icon)}</DivisionIcon>
                  <DivisionLabel>{t(group.ko, group.en)}</DivisionLabel>
                </DivisionNode>
                <LeafStack>
                  {group.items.map((item) => (
                    <LeafNode key={item.ko}>
                      {t(item.ko, item.en)
                        .split('\n')
                        .map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                    </LeafNode>
                  ))}
                </LeafStack>
              </DivisionColumn>
            ))}
          </DivisionGrid>
          </ChartInner>
        </ChartFrame>
      </P.PageContainer>
    </P.HeroSection>
  );
}

const TitleWrap = styled.div`
  margin-top: 16px;
  text-align: center;

  h2 {
    margin-top: 0;
  }

  &::after {
    content: '';
    display: block;
    width: 96px;
    height: 18px;
    margin: 10px auto 0;
    background:
      linear-gradient(90deg, transparent 0, transparent 8px, rgba(53, 96, 166, 0.22) 8px, rgba(53, 96, 166, 0.22) calc(50% - 8px), transparent calc(50% - 8px), transparent calc(50% + 8px), rgba(53, 96, 166, 0.22) calc(50% + 8px), rgba(53, 96, 166, 0.22) calc(100% - 8px), transparent calc(100% - 8px)),
      radial-gradient(circle at 50% 50%, rgba(53, 96, 166, 0.28) 0 3px, transparent 3px);
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const ChartFrame = styled.section`
  position: relative;
  margin-top: 26px;
  padding: clamp(22px, 2.6vw, 28px) clamp(10px, 1.8vw, 16px) clamp(34px, 4vw, 44px);
  border-radius: 34px;
  border: 1px solid rgba(20, 78, 161, 0.08);
  background:
    radial-gradient(circle at 50% 10%, rgba(86, 130, 206, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(248, 251, 255, 1));
  box-shadow: 0 26px 56px rgba(16, 45, 92, 0.06);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 18px 10px 28px;
    border-radius: 24px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 16%, rgba(255, 255, 255, 0.95), transparent 22%),
      radial-gradient(circle at 18% 22%, rgba(111, 165, 224, 0.08), transparent 16%),
      radial-gradient(circle at 82% 22%, rgba(111, 165, 224, 0.08), transparent 16%);
    pointer-events: none;
  }
`;

const ChartInner = styled.div`
  position: relative;
  z-index: 1;
  width: min(1120px, 100%);
  margin: 0 auto;
`;

const TopZone = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 348px;
  z-index: 1;

  @media (max-width: 980px) {
    min-height: auto;
    gap: 16px;
  }

  @media (max-width: 640px) {
    gap: 12px;
  }
`;

const ChiefNode = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: clamp(156px, 16vw, 176px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid #2b73c7;
  color: #1767bf;
  background: #ffffff;
  box-shadow: 0 18px 32px rgba(30, 86, 163, 0.14);

  &::before {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 50%;
    border: 1px solid rgba(22, 104, 193, 0.14);
  }

  @media (max-width: 640px) {
    width: min(140px, 46vw);
    border-width: 4px;
  }
`;

const ChiefIcon = styled.div`
  width: 42px;
  height: 42px;
  color: #1767bf;

  @media (max-width: 640px) {
    width: 34px;
    height: 34px;
  }
`;

const ChiefLabel = styled.div`
  margin-top: 8px;
  color: #1767bf;
  font-size: clamp(1.2rem, 1.8vw, 1.65rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  text-align: center;
`;

const ChiefLine = styled.div`
  position: absolute;
  top: 166px;
  left: 50%;
  width: 1px;
  height: 170px;
  background: linear-gradient(180deg, rgba(28, 69, 114, 0.2), rgba(28, 69, 114, 0.08));
  transform: translateX(-50%);

  @media (max-width: 980px) {
    display: none;
  }
`;

const SupportRail = styled.div`
  position: absolute;
  inset: 0;

  @media (max-width: 980px) {
    position: static;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 100%;
    gap: 14px;
    align-items: stretch;
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const SupportNode = styled.div<{ position: 'top-right' | 'mid-left' | 'mid-right' }>`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 26px;
  border-radius: 999px;
  border: 2px solid #2b73c7;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 250, 255, 0.98));
  color: #1d66b9;
  font-size: clamp(1rem, 1.2vw, 1.14rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  white-space: nowrap;
  box-shadow: 0 10px 18px rgba(20, 79, 154, 0.07);

  ${({ position }) =>
    position === 'top-right'
      ? `
    top: 58px;
    left: calc(50% + 156px);
    min-width: 170px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -156px;
      width: 156px;
      height: 1px;
      background: rgba(28, 69, 114, 0.14);
    }
  `
      : ''}

  ${({ position }) =>
    position === 'mid-left' || position === 'mid-right'
      ? `
    top: 170px;
    min-width: 168px;
  `
      : ''}

  ${({ position }) =>
    position === 'mid-left' || position === 'mid-right'
      ? `
    ${position === 'mid-left' ? 'left: calc(50% - 314px);' : ''}
    ${position === 'mid-right' ? 'left: calc(50% + 156px);' : ''}

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      width: 156px;
      height: 1px;
      background: rgba(28, 69, 114, 0.14);
    }

    ${position === 'mid-left' ? '&::before { right: -156px; }' : ''}
    ${position === 'mid-right' ? '&::before { left: -156px; }' : ''}
  `
      : ''}

  @media (max-width: 980px) {
    position: static;
    width: 100%;
    min-width: 0;
    min-height: 44px;
    padding: 10px 14px;

    &::before {
      display: none;
    }
  }

  @media (max-width: 520px) {
    font-size: 0.94rem;
  }
`;

const DivisionRail = styled.div`
  position: relative;
  margin: 8px auto 0;
  width: calc(100% - 108px);
  height: 30px;
  border-top: 1px solid rgba(28, 69, 114, 0.14);

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 50%;
    width: 1px;
    height: 30px;
    background: rgba(28, 69, 114, 0.14);
    transform: translateX(-50%);
  }

  @media (max-width: 1280px) {
    width: calc(100% - 40px);
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

const DivisionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 12px;
  align-items: start;

  @media (max-width: 1380px) {
    gap: 14px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 28px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const DivisionColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  @media (min-width: 981px) {
    &::before {
      content: '';
      position: absolute;
      top: -30px;
      left: 50%;
      width: 1px;
      height: 30px;
      background: rgba(28, 69, 114, 0.14);
      transform: translateX(-50%);
    }
  }
`;

const DivisionNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: clamp(108px, 9.6vw, 126px);
  aspect-ratio: 1;
  padding: 16px 12px;
  border-radius: 50%;
  border: 5px solid #69b8cb;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 252, 252, 0.98));
  color: #2d7284;
  box-shadow: 0 14px 28px rgba(51, 114, 136, 0.07);

  @media (max-width: 640px) {
    width: min(116px, 34vw);
    padding: 14px 10px;
    border-width: 4px;
  }
`;

const DivisionIcon = styled.div`
  width: 30px;
  height: 30px;
  color: #456f8f;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const DivisionLabel = styled.div`
  margin-top: 8px;
  color: #335f7b;
  font-size: clamp(0.9rem, 0.95vw, 1.04rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.04em;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: normal;
  line-break: auto;
`;

const LeafStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(100%, 156px);
  margin-top: 12px;
`;

const LeafNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 8px 12px;
  border-radius: 16px;
  background: linear-gradient(180deg, #edf7f7, #e4f0ef);
  color: #446269;
  font-size: clamp(0.82rem, 0.82vw, 0.94rem);
  font-weight: 700;
  line-height: 1.22;
  letter-spacing: -0.03em;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: normal;
  line-break: auto;
  box-shadow:
    inset 0 0 0 1px rgba(65, 134, 148, 0.05),
    0 6px 14px rgba(105, 156, 162, 0.07);

  span {
    display: block;
  }
`;
