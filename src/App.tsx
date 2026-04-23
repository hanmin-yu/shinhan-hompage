import { useState } from 'react';

import { MobileMenu } from './components/home/layout/MobileMenu';
import { SiteFooter } from './components/home/layout/SiteFooter';
import { SiteHeader } from './components/home/layout/SiteHeader';
import { HeroSection } from './components/home/sections/HeroSection';
import { IssueReportSection } from './components/home/sections/IssueReportSection';
import { ItSection } from './components/home/sections/ItSection';
import { MembersSection } from './components/home/sections/MembersSection';
import { OfficesSection } from './components/home/sections/OfficesSection';
import { PracticeSection } from './components/home/sections/PracticeSection';
import { StrengthSection } from './components/home/sections/StrengthSection';
import * as S from './components/home/homeStyles';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import type { FontMode } from './types/site';

function App() {
  const [fontMode, setFontMode] = useState<FontMode>('nanum');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useRevealOnScroll();

  return (
    <>
      <S.GlobalStyle fontMode={fontMode} />
      <S.Page>
        <SiteHeader
          fontMode={fontMode}
          onToggleFontMode={() => setFontMode((prev) => (prev === 'nanum' ? 'notosans' : 'nanum'))}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <S.Main id="top">
          <HeroSection />
          <PracticeSection />
          <StrengthSection />
          <IssueReportSection />
          <MembersSection />
          <ItSection />
          <OfficesSection />
        </S.Main>

        <SiteFooter />
      </S.Page>
    </>
  );
}

export default App;
