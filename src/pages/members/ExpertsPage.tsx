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
  수출입통관: ['조나현', '나지원', '손성곤', '오규태'],
  환급: ['김학현', '김유진'],
  FTA: ['박성현', '오보람'],
  AEO: ['홍동엽', '강현우'],
  관세조사: ['이하나', '김정훈'],
  '외환 검사·조사': ['김정훈', '조원희'],
  범칙조사: ['조원희', '김유진'],
  조세불복: ['이하나', '김유진'],
  ACVA: ['이하나', '조원희'],
  '검역/요건': ['서정용', '이경심'],
  물류: ['김유경', '권민성', '이미경'],
  베트남: ['신종호', '김선웅'],
  '미국 FDA': ['김다혜', '엄동규'],
  IT: ['홍성훈', '서인석'],
} satisfies Record<ExpertCategory, string[]>;

const expertCategoryHighlights: Partial<Record<ExpertCategory, Record<string, string[]>>> = {
  수출입통관: {
    조나현: [
      '수출입 통관 업무 셋팅 및 법률 자문',
      '과세가격, 품목분류, 감면, 요건 등 검토',
      '고객사 맞춤형 분석 리포트 제공',
    ],
    나지원: [
      '수출입 통관 업무 셋팅 및 법률 자문',
      '과세가격, 품목분류, 감면, 요건 등 검토',
      '고객사 맞춤형 분석 리포트 제공',
    ],
    손성곤: [
      '수출입 통관 업무 셋팅 및 법률 컨설팅',
      '과세가격, 품목분류, 감면, 요건 등 검토',
      '각종 요건 업무 대행 컨설팅',
    ],
    오규태: [
      '수출입 통관 업무 셋팅 및 법률 자문',
      '과세가격, 품목분류, 감면, 요건 등 검토',
      '수출용 원재료 등에 대한 관세환급',
    ],
  },
  환급: {
    김학현: [
      '수출용 원재료 등에 대한 관세환급',
      '원산지 사후 검증 대응 및 사후관리 시스템 컨설팅',
      '환급 및 FTA 교육',
    ],
    김유진: [
      '수출용 원재료 등에 대한 관세환급',
      'FTA 원산지 판정, 특혜 및 비특혜 CO 발급',
      '품목분류 사전심사',
    ],
  },
  FTA: {
    박성현: [
      'FTA 원산지 판정, 특혜 및 비특혜 C/O 발급',
      '원산지 사후검증 대응 및 원산지 관리 시스템 컨설팅',
      'FTA 교육',
    ],
    오보람: [
      'FTA 원산지 판정, 특혜 및 비특혜 C/O 발급',
      '원산지 사후검증 대응 및 원산지 관리 시스템 컨설팅',
      'FTA 교육',
    ],
  },
  AEO: {
    홍동엽: [
      'AEO 신규공인·사후관리·종합심사 컨설팅',
      'AEO 등급조정 및 AEO 활용 사례 컨설팅',
      '보세구역 특허 컨설팅',
    ],
    강현우: [
      'AEO 신규공인·사후관리·종합심사 컨설팅',
      'AEO 등급조정 및 AEO 활용 사례 컨설팅',
      '보세구역 특허 컨설팅',
    ],
  },
  관세조사: {
    이하나: ['관세조사', '조세불복', 'ACVA'],
    김정훈: ['관세조사', '외환검사·조사', '통관적법성 사전점검'],
  },
  '외환 검사·조사': {
    조원희: ['외환검사·조사', 'ACVA', '범칙조사'],
    김정훈: ['외환검사·조사', '관세조사', '통관적법성 사전점검'],
  },
  범칙조사: {
    조원희: ['범칙조사', 'ACVA', '외환검사·조사'],
    김유진: ['범칙조사', '조세불복', '납세도움정보'],
  },
  조세불복: {
    이하나: ['조세불복', '관세조사', 'ACVA'],
    김유진: ['조세불복', '범칙조사', '납세도움정보'],
  },
  ACVA: {
    이하나: ['ACVA', '조세불복', '관세조사'],
    조원희: ['ACVA', '범칙조사', '외환검사·조사'],
  },
  '검역/요건': {
    서정용: [
      '수입식품 및 위생용품 검역 대행',
      '농림축산검역본부 축산물 및 식물검역 대행',
      'KC(생활용품, 어린이) 인증대행',
    ],
    이경심: [
      '수입식품 및 위생용품 검역 대행',
      '농림축산검역본부 축산물 및 식물검역 대행',
      '화장품 표준통관예정보고',
    ],
  },
  물류: {
    김유경: [
      '신한 인비스타 운영 및 인력 관리 총괄',
      '보세 및 내국물류 통합관리와 법규준수 시스템 구축',
      '3PL 운영 효율화 및 서비스 품질 관리',
    ],
    권민성: ['화물 운송 관리', '보세 및 내국 화물 분리 보관', '보수작업 및 폐기 대행'],
    이미경: ['화물 운송 관리', '고객사 물품 입출고 관리', '내국화물 3PL 대행업무'],
  },
  베트남: {
    신종호: [
      '베트남 통관 및 수출입 무역거래 자문',
      'FTA 원산지 관리 시스템 서비스 제공',
      '베트남 Liquidation 및 수책제도 관련 자문',
    ],
    김선웅: [
      '베트남 통관 및 수출입 무역거래 자문',
      'FTA 원산지 관리 시스템 서비스 제공',
      '베트남 Liquidation 및 수책제도 관련 자문',
    ],
  },
  '미국 FDA': {
    김다혜: [
      '미국 수출입 제품 통관 적합성 사전검토',
      'FDA 규제 대응 및 Prop 65 컨설팅',
    ],
    엄동규: [
      '미국 수출입 제품 통관 적합성 사전검토',
      'FDA 규제 대응 및 Prop 65 컨설팅',
    ],
  },
  IT: {
    홍성훈: ['통관 시스템 개발 및 운영 총괄', '고객사 맞춤 솔루션 제공', '네트워크 및 보안 관리'],
    서인석: ['통관 시스템 구축 및 관리', '고객사 맞춤 솔루션 제공', '네트워크 및 보안 관리'],
  },
};

function findExpert(name: string) {
  return expertMembers.find((member) => member.name === name);
}

function getAssignedExperts(category: ExpertCategory) {
  return expertAssignments[category].map((name) => {
    const highlights = expertCategoryHighlights[category]?.[name];
    const member = findExpert(name);

    if (member) {
      return {
        ...member,
        careerHighlights: highlights ?? member.careerHighlights,
      };
    }

    return {
        name,
        phone: '',
        email: '',
        title: '',
        department: '',
        practice: '',
        accent: '#526f9e',
        careerHighlights: highlights,
      } satisfies Member;
  });
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
  grid-template-columns: minmax(0, 1fr);
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
