import { HeroSection } from '../components/home/sections/HeroSection';
import { IssueReportSection } from '../components/home/sections/IssueReportSection';
import { OfficesSection } from '../components/home/sections/OfficesSection';
import { PracticeSection } from '../components/home/sections/PracticeSection';
import { ShinhanUpdatesSection } from '../components/home/sections/ShinhanUpdatesSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PracticeSection />
      <IssueReportSection />
      <ShinhanUpdatesSection />
      <OfficesSection />
    </>
  );
}
