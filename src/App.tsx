import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MobileMenu } from './components/home/layout/MobileMenu';
import { SiteFooter } from './components/home/layout/SiteFooter';
import { SiteHeader } from './components/home/layout/SiteHeader';
import * as S from './components/home/homeStyles';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { AboutPage } from './pages/about/AboutPage';
import { HistoryPage } from './pages/about/HistoryPage';
import { LocationPage } from './pages/about/LocationPage';
import { MessagePage } from './pages/about/MessagePage';
import { ContactPage } from './pages/contact/ContactPage';
import { HomePage } from './pages/HomePage';
import { ItPage } from './pages/it/ItPage';
import { ExpertsPage } from './pages/members/ExpertsPage';
import { MembersPage } from './pages/members/MembersPage';
import { OrgPage } from './pages/members/OrgPage';
import { BlogPage } from './pages/news/BlogPage';
import { IssueReportPage } from './pages/news/IssueReportPage';
import { NewsPage } from './pages/news/NewsPage';
import { NewsletterPage } from './pages/news/NewsletterPage';
import { SeminarPage } from './pages/news/SeminarPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OfficesPage } from './pages/offices/OfficesPage';
import { RecruitPage } from './pages/recruit/RecruitPage';
import { ConsultingPage } from './pages/services/ConsultingPage';
import { ServiceDetailPage } from './pages/services/ServiceDetailPage';
import { ServicesPage } from './pages/services/ServicesPage';
import type { FontMode } from './types/site';

const serviceRoutes = [
  '/services/import-export',
  '/services/quarantine-requirements',
  '/services/consulting/fta',
  '/services/consulting/aeo',
  '/services/consulting/customs-audit',
  '/services/consulting/foreign-exchange',
  '/services/consulting/acva',
  '/services/consulting/penalty-investigation',
  '/services/consulting/tax-appeal',
  '/services/consulting/refund',
  '/services/consulting/trade-consulting',
  '/services/logistics',
  '/services/vietnam',
  '/services/us-fda',
];

function App() {
  const [fontMode, setFontMode] = useState<FontMode>('nanum');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useRevealOnScroll();

  return (
    <>
      <S.GlobalStyle fontMode={fontMode} />
      <BrowserRouter>
        <S.Page>
          <SiteHeader
            fontMode={fontMode}
            onToggleFontMode={() => setFontMode((prev) => (prev === 'nanum' ? 'notosans' : 'nanum'))}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
          <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

          <S.Main id="top">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/history" element={<HistoryPage />} />
              <Route path="/about/message" element={<MessagePage />} />
              <Route path="/about/location" element={<LocationPage />} />

              <Route path="/members" element={<MembersPage />} />
              <Route path="/members/org" element={<OrgPage />} />
              <Route path="/members/experts" element={<ExpertsPage />} />

              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/consulting" element={<ConsultingPage />} />
              {serviceRoutes.map((path) => (
                <Route key={path} path={path} element={<ServiceDetailPage path={path} />} />
              ))}

              <Route path="/it" element={<ItPage />} />

              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/issue-report" element={<IssueReportPage />} />
              <Route path="/news/newsletter" element={<NewsletterPage />} />
              <Route path="/news/seminar" element={<SeminarPage />} />
              <Route path="/news/blog" element={<BlogPage />} />

              <Route path="/offices" element={<OfficesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/recruit" element={<RecruitPage />} />

              <Route path="/about/*" element={<Navigate to="/about" replace />} />
              <Route path="/members/*" element={<Navigate to="/members" replace />} />
              <Route path="/services/*" element={<Navigate to="/services" replace />} />
              <Route path="/news/*" element={<Navigate to="/news" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </S.Main>

          <SiteFooter />
        </S.Page>
      </BrowserRouter>
    </>
  );
}

export default App;

