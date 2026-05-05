import { useMemo, useState } from 'react';

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
  'FTA/CO',
  'AEO',
  '관세조사/외환검사',
  '외환조사/범칙조사',
  '조세불복',
  'ACVA',
  '관세자문',
  '검역/요건',
  '물류',
  '베트남',
  '미국 FDA',
  'IT',
] as const;

type ExpertCategory = (typeof expertCategories)[number];

const expertAssignments = {
  수출입통관: ['차미정', '조나현', '오규태', '손성곤'],
  환급: ['김학현', '나지원'],
  'FTA/CO': ['박성현', '오보람', '강민지', '조석현'],
  AEO: ['홍동엽', '강현우'],
  '관세조사/외환검사': ['이하나', '김정훈'],
  '외환조사/범칙조사': ['조원희', '김정훈'],
  조세불복: ['이하나', '김유진'],
  ACVA: ['조원희', '이하나'],
  관세자문: ['김정훈', '김유진'],
  '검역/요건': ['서정용', '이경심'],
  물류: ['권민성', '이미경'],
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
  const { t } = useI18n();
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

          <ProfessionalCardGrid
            members={filteredMembers}
            emptyMessage={t('해당 업무분야의 전문가 정보가 없습니다.', 'No experts are listed for this specialty.')}
          />
        </P.PageContainer>
      </MembersContentSection>
    </>
  );
}
