import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { executives } from '../../data/home';
import { MembersContentSection, MembersHero, ProfessionalCardGrid } from './membersDirectory';

export function MembersPage() {
  const membersSubnav = sectionSubnav.members;

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
          <ProfessionalCardGrid members={executives} showPracticeOverlay={false} centerFirst />
        </P.PageContainer>
      </MembersContentSection>
    </>
  );
}
