import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { useSiteContent } from '../../hooks/useSiteContent';
import { MembersContentSection, MembersHero, ProfessionalCardGrid } from './membersDirectory';

const AdvisoryDivider = styled.div`
  display: grid;
  gap: 12px;
  width: min(100%, 1120px);
  margin: clamp(46px, 5vw, 72px) auto clamp(22px, 3vw, 34px);
  padding-top: clamp(24px, 3vw, 34px);
  border-top: 1px solid rgba(18, 63, 133, 0.2);
`;

const AdvisoryTitle = styled.h2`
  margin: 0;
  color: #123f85;
  font-size: clamp(1.34rem, 2vw, 1.86rem);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -0.02em;
`;

export function MembersPage() {
  const { content, advisors, executives } = useSiteContent();
  const membersSubnav = content.global.sectionSubnav.members;

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
          <ProfessionalCardGrid members={executives} showPracticeOverlay={false} />
          <AdvisoryDivider>
            <AdvisoryTitle>고문단</AdvisoryTitle>
          </AdvisoryDivider>
          <ProfessionalCardGrid members={advisors} showPracticeOverlay={false} />
        </P.PageContainer>
      </MembersContentSection>
    </>
  );
}
