import { HeroSection } from '../components/home/sections/HeroSection';
import { IssueReportSection } from '../components/home/sections/IssueReportSection';
import { ItSection } from '../components/home/sections/ItSection';
import { OfficesSection } from '../components/home/sections/OfficesSection';
import { PracticeSection } from '../components/home/sections/PracticeSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PracticeSection />
      <IssueReportSection />
      <ItSection />
      <OfficesSection />
    </>
  );
}
