import { useMemo, useState } from 'react';
import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { expertMembers } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import type { Member } from '../../types/site';
import {
  MembersContentSection,
  MembersHero,
  ProfessionalCardGrid,
  ProfessionalCategoryMenu,
} from './membersDirectory';

const expertCategories = [
  '수출입통관',
  '환급',
  'FTA',
  'AEO',
  '관세조사',
  '외환 검사·조사',
  '범칙조사',
  '조세불복',
  'ACVA',
  '검역/요건',
  '물류',
  '베트남',
  '미국 FDA',
  'IT',
] as const;

type ExpertCategory = (typeof expertCategories)[number];

const expertAssignments = {
  수출입통관: ['차미정', '조나현', '손성곤', '오규태'],
  환급: ['김학현', '나지원'],
  FTA: ['박성현', '오보람', '강민지', '조석현'],
  AEO: ['홍동엽', '강현우'],
  관세조사: ['이하나', '김정훈'],
  '외환 검사·조사': ['조원희', '김정훈'],
  범칙조사: ['조원희', '김유진'],
  조세불복: ['이하나', '김유진'],
  ACVA: ['조원희', '이하나'],
  '검역/요건': ['서정용', '이경심'],
  물류: ['김유경', '권민성', '이미경'],
  베트남: ['신종호', '김선웅'],
  '미국 FDA': ['김다혜', '엄동규'],
  IT: ['최대규', '홍성훈'],
} satisfies Record<ExpertCategory, string[]>;

function findExpert(name: string) {
  return expertMembers.find((member) => member.name === name);
}

function getAssignedExperts(category: ExpertCategory) {
  return expertAssignments[category].map(
    (name) =>
      findExpert(name) ??
      ({
        name,
        phone: '',
        email: '',
        title: '',
        department: '',
        practice: '',
        accent: '#526f9e',
      } satisfies Member),
  );
}

export function ExpertsPage() {
  const { t, tx } = useI18n();
  const membersSubnav = sectionSubnav.members;
  const [activeCategory, setActiveCategory] = useState<ExpertCategory>('수출입통관');

  const filteredMembers = useMemo(() => {
    return getAssignedExperts(activeCategory);
  }, [activeCategory]);

  return (
    <>
      <MembersHero>
        <P.PageContainer>
          <LandingSubnav
            kicker={membersSubnav.kicker}
            kickerEn={membersSubnav.kickerEn}
            title={membersSubnav.title}
            titleEn={membersSubnav.titleEn}
            summary={membersSubnav.summary}
            summaryEn={membersSubnav.summaryEn}
            items={membersSubnav.items}
            matchAboutHero
          />
        </P.PageContainer>
      </MembersHero>

      <MembersContentSection>
        <P.PageContainer data-reveal>
          <ProfessionalCategoryMenu
            categories={expertCategories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
            ariaLabel={t('업무분야 필터', 'Practice filter')}
          />

          <ActiveCategoryHeader>
            <ActiveCategoryText>
              <ActiveCategoryTitle>{tx(activeCategory)}</ActiveCategoryTitle>
            </ActiveCategoryText>
            <ActiveCategoryCount>
              {t(`${filteredMembers.length}명의 전문가`, `${filteredMembers.length} Experts`)}
            </ActiveCategoryCount>
          </ActiveCategoryHeader>

          <ProfessionalCardGrid
            members={filteredMembers}
            emptyMessage={t('해당 업무분야의 전문가 정보가 없습니다.', 'No experts are listed for this specialty.')}
          />
        </P.PageContainer>
      </MembersContentSection>
    </>
  );
}

const ActiveCategoryHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px 24px;
  width: min(100%, 1240px);
  margin: 0 auto clamp(24px, 3vw, 34px);
  padding: 0 0 clamp(20px, 2.6vw, 30px);
  border-bottom: 1px solid rgba(18, 63, 133, 0.18);
  text-align: left;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ActiveCategoryText = styled.div`
  display: grid;
  gap: 6px;
`;

const ActiveCategoryTitle = styled.h2`
  margin: 0;
  color: #172337;
  font-size: clamp(1.58rem, 2.4vw, 2.36rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.035em;
`;

const ActiveCategoryCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid rgba(18, 63, 133, 0.12);
  border-radius: 999px;
  background: #ffffff;
  color: #123f85;
  font-size: 0.88rem;
  font-weight: 900;
  box-shadow: 0 10px 22px rgba(13, 35, 66, 0.06);

  @media (max-width: 640px) {
    justify-self: start;
  }
`;
