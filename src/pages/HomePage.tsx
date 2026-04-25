import { HeroSection } from '../components/home/sections/HeroSection';
import { IssueReportSection } from '../components/home/sections/IssueReportSection';
import { ItSection } from '../components/home/sections/ItSection';
import { MembersSection } from '../components/home/sections/MembersSection';
import { OfficesSection } from '../components/home/sections/OfficesSection';
import { PracticeSection } from '../components/home/sections/PracticeSection';
import { StrengthSection } from '../components/home/sections/StrengthSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PracticeSection />
      <StrengthSection />
      <IssueReportSection />
      <MembersSection />
      <ItSection />
      <OfficesSection />
    </>
  );
}
