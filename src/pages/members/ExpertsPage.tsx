import { useMemo, useState } from 'react';
import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useI18n } from '../../i18n/useI18n';
import {
  MembersContentSection,
  MembersHero,
  ProfessionalCardGrid,
  ProfessionalCategoryMenu,
} from './membersDirectory';

export function ExpertsPage() {
  const { t, tx } = useI18n();
  const { content, getExpertsByCategory } = useSiteContent();
  const membersSubnav = content.global.sectionSubnav.members;
  const membersCopy = content.members.copy;
  const expertCategories = content.members.expertCategoryConfig.categories;
  const [activeCategory, setActiveCategory] = useState<string>(expertCategories[0] ?? '수출입통관');

  const filteredMembers = useMemo(() => {
    return getExpertsByCategory(activeCategory);
  }, [activeCategory, getExpertsByCategory]);

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
            emptyMessage={t(membersCopy.expertsEmptyMessage, membersCopy.expertsEmptyMessageEn)}
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
