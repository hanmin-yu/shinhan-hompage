import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { MobileMenu } from './components/home/layout/MobileMenu';
import { SiteFooter } from './components/home/layout/SiteFooter';
import { SiteHeader } from './components/home/layout/SiteHeader';
import * as S from './components/home/homeStyles';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { SiteLanguageProvider } from './i18n/useI18n';
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
import { LegalPage } from './pages/legal/LegalPage';
import { IssueReportPage } from './pages/news/IssueReportPage';
import { BlogPage } from './pages/news/BlogPage';
import { NewsletterDetailPage } from './pages/news/NewsletterDetailPage';
import { NewsletterPage } from './pages/news/NewsletterPage';
import { SeminarPage } from './pages/news/SeminarPage';
import { ShinhanNewsPage } from './pages/news/ShinhanNewsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OfficesPage } from './pages/offices/OfficesPage';
import { RecruitPage } from './pages/recruit/RecruitPage';
import { ServiceDetailPage } from './pages/services/ServiceDetailPage';

const serviceRoutes = [
  '/services/import-export',
  '/services/quarantine',
  '/services/requirements',
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
  return (
    <>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </>
  );
}

function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useRevealOnScroll(`${location.pathname}:${location.key}`);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.key]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.key]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <S.GlobalStyle />
      <SiteLanguageProvider>
        <S.Page>
          <SiteHeader mobileMenuOpen={mobileMenuOpen} onOpenMobileMenu={() => setMobileMenuOpen(true)} />
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

              <Route path="/services" element={<Navigate to="/services/import-export" replace />} />
              <Route path="/services/consulting" element={<Navigate to="/services/consulting/fta" replace />} />
              <Route path="/services/quarantine-requirements" element={<Navigate to="/services/quarantine" replace />} />
              {serviceRoutes.map((path) => (
                <Route key={path} path={path} element={<ServiceDetailPage path={path} />} />
              ))}

              <Route path="/it" element={<ItPage />} />

              <Route path="/news" element={<Navigate to="/news/issue-report" replace />} />
              <Route path="/news/issue-report" element={<IssueReportPage />} />
              <Route path="/news/shinhan-news" element={<ShinhanNewsPage />} />
              <Route path="/news/newsletter" element={<NewsletterPage />} />
              <Route path="/news/newsletter/:newsletterId" element={<NewsletterDetailPage />} />
              <Route path="/news/seminar" element={<SeminarPage />} />
              <Route path="/news/blog" element={<BlogPage />} />

              <Route path="/offices" element={<OfficesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/recruit" element={<RecruitPage />} />
              <Route path="/legal" element={<Navigate to="/legal/terms" replace />} />
              <Route path="/legal/terms" element={<LegalPage pageKey="terms" />} />
              <Route path="/legal/privacy" element={<LegalPage pageKey="privacy" />} />
              <Route path="/legal/recruit-disclaimer" element={<LegalPage pageKey="recruit-disclaimer" />} />
              <Route path="/legal/no-email-collection" element={<LegalPage pageKey="no-email-collection" />} />

              <Route path="/about/*" element={<Navigate to="/about" replace />} />
              <Route path="/legal/*" element={<Navigate to="/legal/terms" replace />} />
              <Route path="/members/*" element={<Navigate to="/members" replace />} />
              <Route path="/services/*" element={<Navigate to="/services/import-export" replace />} />
              <Route path="/news/*" element={<Navigate to="/news" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </S.Main>

          <SiteFooter />
        </S.Page>
      </SiteLanguageProvider>
    </>
  );
}

export default App;
