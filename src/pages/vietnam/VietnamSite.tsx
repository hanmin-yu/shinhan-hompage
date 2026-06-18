import styled from '@emotion/styled';
import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { palette } from '../../components/home/homeStyles';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { useSiteContent } from '../../hooks/useSiteContent';
import { ProfessionalCardGrid } from '../members/membersDirectory';
import type { Member, VietnamContent, VnLanguage, VnLocalizedText, VnNavItem } from '../../types/site';
import { getGoogleMapEmbedUrl, getGoogleMapUrl } from '../../utils/mapLinks';

type VnPageProps = {
  page?: 'home' | 'about' | 'members' | 'services' | 'it' | 'news' | 'contact';
  detail?: string;
};

type VnSectionHeroProps = {
  title: VnLocalizedText;
  summary: VnLocalizedText;
  kicker: string;
  image?: string;
  language: VnLanguage;
  sectionId: 'about' | 'people' | 'services' | 'it' | 'news' | 'contact';
};

const languageLabels: Record<VnLanguage, string> = {
  ko: 'KO',
  en: 'EN',
  vi: 'VI',
};

const VN_LANGUAGE_STORAGE_KEY = 'vn-language';
const VN_LANGUAGE_CHANGE_EVENT = 'vn-language-change';

const servicePathById: Record<string, string> = {
  'fta-origin': '/vn/services/fta-origin',
  'import-export-requirements': '/vn/services/import-export-requirements',
  'traceability-management': '/vn/services/traceability-management',
  'customs-audit': '/vn/services/customs-audit',
  'hs-classification': '/vn/services/hs-classification',
  'legal-advisory': '/vn/services/legal-advisory',
};

const itPathById: Record<string, string> = {
  'kord-fta': '/vn/it/kord-fta',
  'kord-liq': '/vn/it/kord-liq',
};

const newsPathByCategory: Record<VietnamContent['news']['items'][number]['category'], string> = {
  newsletter: '/vn/news/newsletter',
  'legal-update': '/vn/news/legal-updates',
  'card-news': '/vn/news/card-news',
};

const newsLabelByCategory: Record<VietnamContent['news']['items'][number]['category'], VnLocalizedText> = {
  newsletter: { ko: '뉴스레터', en: 'Newsletter', vi: 'Bản tin' },
  'legal-update': { ko: '법령 업데이트', en: 'Legal Update', vi: 'Cập nhật pháp luật' },
  'card-news': { ko: '베트남 카드뉴스', en: 'Vietnam Card News', vi: 'Tin ảnh Việt Nam' },
};

const aboutHeroImagesByDetail: Record<string, string> = {
  overview: '/hero/menu-about-shinhan-ai.png',
  message: '/hero/menu-about-message-ai.png',
  history: '/hero/menu-about-history-ai.png',
  location: '/hero/menu-utility-directions-ai.png',
};

const serviceHeroImagesById: Record<string, string> = {
  'fta-origin': '/hero/service-fta-origin-ai.png',
  'import-export-requirements': '/hero/service-import-export-ai.png',
  'traceability-management': '/hero/service-vietnam-ai.png',
  'customs-audit': '/hero/service-customs-audit-ai.png',
  'hs-classification': '/hero/service-import-export-ai.png',
  'legal-advisory': '/hero/service-trade-consulting-ai.png',
};

const newsHeroImagesByCategory: Record<VietnamContent['news']['items'][number]['category'], string> = {
  newsletter: '/hero/menu-news-newsletter-ai.png',
  'legal-update': '/hero/menu-news-trade-insights-ai.png',
  'card-news': '/hero/menu-news-shinhan-insights-ai.png',
};

function localize(value: VnLocalizedText, language: VnLanguage) {
  if (language === 'vi') {
    return value.vi?.trim() || value.en || value.ko;
  }

  return language === 'en' ? value.en || value.ko : value.ko;
}

function getFormValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function useVnLanguage() {
  const [language, setLanguage] = useState<VnLanguage>(() => {
    if (typeof window === 'undefined') return 'ko';
    const saved = window.localStorage.getItem(VN_LANGUAGE_STORAGE_KEY);
    return saved === 'en' || saved === 'vi' ? saved : 'ko';
  });

  const updateLanguage = (nextLanguage: VnLanguage) => {
    setLanguage(nextLanguage);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VN_LANGUAGE_STORAGE_KEY, nextLanguage);
      window.dispatchEvent(new CustomEvent(VN_LANGUAGE_CHANGE_EVENT, { detail: nextLanguage }));
    }
  };

  useEffect(() => {
    const syncLanguage = () => {
      const saved = window.localStorage.getItem(VN_LANGUAGE_STORAGE_KEY);
      setLanguage(saved === 'en' || saved === 'vi' ? saved : 'ko');
    };

    window.addEventListener('storage', syncLanguage);
    window.addEventListener(VN_LANGUAGE_CHANGE_EVENT, syncLanguage);

    return () => {
      window.removeEventListener('storage', syncLanguage);
      window.removeEventListener(VN_LANGUAGE_CHANGE_EVENT, syncLanguage);
    };
  }, []);

  return { language, setLanguage: updateLanguage };
}

function flattenNavigation(items: VnNavItem[]) {
  return items.flatMap((item) => [item, ...(item.children ?? [])]);
}

function getSectionNavItems(vietnam: VietnamContent, sectionId: VnSectionHeroProps['sectionId']): VnNavItem[] {
  if (sectionId === 'services') {
    return vietnam.services.items.map((item) => ({
      id: item.id,
      label: item.title,
      path: servicePathById[item.id] ?? '/vn/services/fta-origin',
    }));
  }

  if (sectionId === 'it') {
    return vietnam.itSolutions.items.map((item) => ({
      id: item.id,
      label: { ko: item.title, en: item.title, vi: item.title },
      path: itPathById[item.id] ?? '/vn/it/kord-fta',
    }));
  }

  if (sectionId === 'news') {
    return [
      { id: 'newsletter', label: { ko: '뉴스레터', en: 'Newsletter', vi: 'Bản tin' }, path: newsPathByCategory.newsletter },
      { id: 'legal-update', label: { ko: '법령 업데이트', en: 'Legal Updates', vi: 'Cập nhật pháp lý' }, path: newsPathByCategory['legal-update'] },
      { id: 'card-news', label: { ko: '베트남 카드뉴스', en: 'Vietnam Card News', vi: 'Tin ảnh Việt Nam' }, path: newsPathByCategory['card-news'] },
    ];
  }

  const navItem = vietnam.navigation.find((item) => item.id === sectionId);
  return navItem?.children?.length ? navItem.children : navItem ? [navItem] : [];
}

function VnLayout({ page = 'home', detail, children }: VnPageProps & { children: ReactNode }) {
  const { content } = useSiteContent();
  const { language, setLanguage } = useVnLanguage();
  const vietnam = content.vietnam;
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<string | null>(null);
  const flatNav = useMemo(() => flattenNavigation(vietnam.navigation), [vietnam.navigation]);
  const headerNavigation = useMemo(() => vietnam.navigation.filter((item) => item.id !== 'contact'), [vietnam.navigation]);
  const activePath = detail ? `/vn/${page}/${detail}` : page === 'home' ? '/vn' : `/vn/${page}`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollTop > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <VnShell>
      <VnHeader $scrolled={isScrolled} onMouseLeave={() => setActiveMegaMenuId(null)}>
        <VnHeaderInner>
          <BrandLink to="/vn" aria-label="Shinhan Vietnam home">
            <HeaderLogoFrame>
              <HeaderLogoImage src="/brand-header-logo-navy-transparent.png" alt="신한관세법인 로고" data-logo-blue="true" />
              <HeaderLogoImage src="/brand-header-logo-transparent.png" alt="" aria-hidden="true" data-logo-light="true" />
            </HeaderLogoFrame>
          </BrandLink>
          <VnNav aria-label="Vietnam navigation">
            {headerNavigation.map((item) => (
              <NavCluster
                key={item.id}
                onMouseEnter={() => setActiveMegaMenuId(item.children?.length ? item.id : null)}
                onFocus={() => setActiveMegaMenuId(item.children?.length ? item.id : null)}
              >
                <NavLink
                  to={item.path}
                  data-active={flatNav.some((nav) => nav.path === activePath && (nav.id === item.id || item.children?.some((child) => child.id === nav.id))) ? 'true' : undefined}
                >
                  {localize(item.label, language)}
                </NavLink>
                {item.children?.length ? (
                  <MegaMenu data-open={activeMegaMenuId === item.id ? 'true' : undefined} onMouseEnter={() => setActiveMegaMenuId(item.id)}>
                    <MegaMenuInner>
                      <MegaMenuTitleBlock data-mega-title>
                        <MegaMenuKicker>SHINHAN</MegaMenuKicker>
                        <MegaMenuTitle>{localize(item.label, language)}</MegaMenuTitle>
                      </MegaMenuTitleBlock>
                      <MegaMenuLinks>
                        {item.children.map((child) => (
                          <MegaMenuLink key={child.id} to={child.path} data-mega-link>
                            {localize(child.label, language)}
                          </MegaMenuLink>
                        ))}
                      </MegaMenuLinks>
                    </MegaMenuInner>
                  </MegaMenu>
                ) : null}
              </NavCluster>
            ))}
          </VnNav>
          <HeaderActions>
            <VnContactButton to="/vn/contact" data-vn-contact-button="true">Contact Us</VnContactButton>
            <LanguageGroup aria-label="Vietnam language" data-vn-language-group="true">
              <LanguageToggleIcon viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3.5 12h17" />
                <path d="M12 3c2.4 2.3 3.7 5.2 3.7 9S14.4 18.7 12 21" />
                <path d="M12 3c-2.4 2.3-3.7 5.2-3.7 9s1.3 6.7 3.7 9" />
                <path d="M5.7 6.2c1.6.9 3.7 1.4 6.3 1.4s4.7-.5 6.3-1.4" />
                <path d="M5.7 17.8c1.6-.9 3.7-1.4 6.3-1.4s4.7.5 6.3 1.4" />
              </LanguageToggleIcon>
              {(Object.keys(languageLabels) as VnLanguage[]).map((key, index) => (
                <LanguageButton key={key} type="button" data-active={language === key ? 'true' : undefined} onClick={() => setLanguage(key)}>
                  {index > 0 ? <LanguageToggleDivider aria-hidden="true" /> : null}
                  <span>{languageLabels[key]}</span>
                </LanguageButton>
              ))}
            </LanguageGroup>
          </HeaderActions>
        </VnHeaderInner>
      </VnHeader>
      <main>{children}</main>
      <VnFooter>
        <FooterInner>
          <FooterBrand>
            <strong>Shinhan Customs Vietnam</strong>
            <span>{localize(vietnam.contact.summary, language)}</span>
          </FooterBrand>
          <FooterLinks>
            <a href={`mailto:${vietnam.contact.email}`}>{vietnam.contact.email}</a>
            <a href={`tel:${vietnam.contact.phone.replace(/[^+\d]/g, '')}`}>{vietnam.contact.phone}</a>
            {vietnam.contact.naverBlogUrl ? <a href={vietnam.contact.naverBlogUrl}>Naver Blog</a> : null}
            {vietnam.contact.facebookUrl ? <a href={vietnam.contact.facebookUrl}>Facebook</a> : null}
          </FooterLinks>
        </FooterInner>
      </VnFooter>
    </VnShell>
  );
}

function SectionHero({ title, summary, kicker, image, language, sectionId }: VnSectionHeroProps) {
  const { content } = useSiteContent();
  const { pathname } = useLocation();
  const vietnam = content.vietnam;
  const sectionNavItems = getSectionNavItems(vietnam, sectionId);

  return (
    <>
      <SectionHeroWrap $image={image ?? null}>
        <SectionHeroCopy>
          <SectionHeroKicker>{kicker}</SectionHeroKicker>
          <SectionHeroTitle>{localize(title, language)}</SectionHeroTitle>
          <SectionHeroLead>{localize(summary, language)}</SectionHeroLead>
        </SectionHeroCopy>
      </SectionHeroWrap>
      <SubnavBand>
        <SubnavInner>
          <SubnavHome to="/vn" aria-label="Vietnam home" />
          <SectionSubnav aria-label={`${kicker} sub navigation`}>
            {sectionNavItems.map((item) => (
              <SectionSubnavLink key={item.id} to={item.path} data-active={pathname === item.path ? 'true' : undefined}>
                {localize(item.label, language)}
              </SectionSubnavLink>
            ))}
          </SectionSubnav>
        </SubnavInner>
      </SubnavBand>
    </>
  );
}

export function VnHomePage() {
  const { content } = useSiteContent();
  const { language } = useVnLanguage();
  const vietnam = content.vietnam;
  const newsItems = vietnam.news.items.slice(0, 3);

  return (
    <VnLayout page="home">
      <Hero $image={vietnam.hero.image} $position={vietnam.hero.imagePosition}>
        <HeroBackdropOverlay />
        <HeroBottomBlend />
        <HeroOverlay data-reveal="zoom">
          <HeroCopy>
            <HeroTitle $language="en">Shinhan Customs Vietnam</HeroTitle>
            <HeroStatement>{localize(vietnam.hero.title, language)}</HeroStatement>
            <HeroLead>{localize(vietnam.hero.summary, language)}</HeroLead>
          </HeroCopy>
          <HeroControls aria-label="Vietnam hero">
            <HeroProgress aria-hidden="true">
              <HeroProgressBar />
            </HeroProgress>
            <HeroCounter>1 / 1</HeroCounter>
          </HeroControls>
          <VnQuickCard to="/vn/news/newsletter">
            <VnQuickCopy>
              <VnQuickTitle>Vietnam</VnQuickTitle>
              <VnQuickText>{language === 'ko' ? '뉴스레터/자료' : language === 'en' ? 'News & Resources' : 'Tin tức & tài liệu'}</VnQuickText>
            </VnQuickCopy>
            <VnQuickArrow>›</VnQuickArrow>
          </VnQuickCard>
          <HeroScroll>scroll</HeroScroll>
        </HeroOverlay>
      </Hero>

      <VnHomePracticeSection>
        <VnHomePracticeInner data-reveal>
          <VnHomePracticeCopy>
            <VnHomeTitleBlock>
              <VnHomeTitleGhost aria-hidden="true">PRACTICE AREAS</VnHomeTitleGhost>
              <VnHomeSectionTitle>{language === 'ko' ? '업무 분야' : language === 'en' ? 'Practice Areas' : 'Lĩnh vực dịch vụ'}</VnHomeSectionTitle>
            </VnHomeTitleBlock>
            <VnHomeCountLine>
              <VnHomeCountValue>{vietnam.services.items.length}</VnHomeCountValue>
              <VnHomeCountLabelStack>
                <VnHomeCountLabel>Vietnam Services</VnHomeCountLabel>
              </VnHomeCountLabelStack>
            </VnHomeCountLine>
            <VnHomeSummary>{localize(vietnam.services.summary, language)}</VnHomeSummary>
          </VnHomePracticeCopy>

          <VnHomePracticeList aria-label="Vietnam services">
            {vietnam.services.items.map((item) => (
              <VnHomePracticeLink key={item.id} to={servicePathById[item.id] ?? '/vn/services/fta-origin'}>
                <VnHomePracticeLinkCopy>
                  <VnHomePracticeTitle>{localize(item.title, language)}</VnHomePracticeTitle>
                  <VnHomePracticeMeta>{item.manager ?? localize(item.team ?? { ko: '', en: '' }, language)}</VnHomePracticeMeta>
                </VnHomePracticeLinkCopy>
                <VnHomePracticeArrow aria-hidden="true">&gt;</VnHomePracticeArrow>
              </VnHomePracticeLink>
            ))}
          </VnHomePracticeList>
        </VnHomePracticeInner>
      </VnHomePracticeSection>

      <VnHomeUpdatesSection>
        <VnHomeUpdatesInner data-reveal>
          <VnHomeUpdatesHead>
            <VnHomeTitleBlock>
              <VnHomeTitleGhost aria-hidden="true">NEWSLETTER</VnHomeTitleGhost>
              <VnHomeSectionTitle>{language === 'ko' ? '소식/자료' : language === 'en' ? 'News & Resources' : 'Tin tức & tài liệu'}</VnHomeSectionTitle>
            </VnHomeTitleBlock>
            <VnHomeViewAll to="/vn/news/newsletter">
              {language === 'ko' ? '소식/자료 전체보기' : language === 'en' ? 'View all resources' : 'Xem tất cả'}
            </VnHomeViewAll>
          </VnHomeUpdatesHead>
          <VnHomeNewsCards>
            {newsItems.map((item, index) => (
              <VnHomeNewsCard
                key={item.id}
                to={item.href?.startsWith('/') ? item.href : newsPathByCategory[item.category]}
                style={{ '--visual': `url(${newsHeroImagesByCategory[item.category] ?? ['/hero/trade-insights-ai-1.png', '/hero/trade-insights-ai-2.png', '/hero/trade-insights-ai-3.png'][index % 3]})` } as CSSProperties}
              >
                <VnHomeNewsPanel>
                  <VnHomeNewsMeta>
                    <span>{localize(newsLabelByCategory[item.category], language)}</span>
                    <time>{item.publishedAt}</time>
                  </VnHomeNewsMeta>
                  <VnHomeNewsTitle>{localize(item.title, language)}</VnHomeNewsTitle>
                  <VnHomeNewsText>{localize(item.summary, language)}</VnHomeNewsText>
                  <VnHomeNewsFoot>{language === 'ko' ? '자세히 보기' : language === 'en' ? 'View detail' : 'Xem chi tiết'}</VnHomeNewsFoot>
                </VnHomeNewsPanel>
              </VnHomeNewsCard>
            ))}
          </VnHomeNewsCards>
        </VnHomeUpdatesInner>
      </VnHomeUpdatesSection>

    </VnLayout>
  );
}

export function VnAboutPage({ detail = 'overview' }: { detail?: string }) {
  const { content } = useSiteContent();
  const { language } = useVnLanguage();
  const vietnam = content.vietnam;
  const representative = vietnam.people.members.find((member) => member.id === 'jang-seunghee');
  const aboutPath = detail === 'overview' ? '/vn/about' : `/vn/about/${detail}`;
  const aboutHeroTitle = getSectionNavItems(vietnam, 'about').find((item) => item.path === aboutPath)?.label ?? vietnam.about.intro.title;
  const aboutHeroImage = aboutHeroImagesByDetail[detail] ?? aboutHeroImagesByDetail.overview;

  let body: React.ReactNode;

  if (detail === 'message') {
    const representativePhoto = representative?.image ?? vietnam.about.message.image;

    body = (
      <VnMessageStack>
        <VnMessageLayout>
          <VnMessageArticle>
            <VnMessageHeader>
              <VnMessageTitle>{localize(vietnam.about.message.title, language)}</VnMessageTitle>
            </VnMessageHeader>
            <VnBodyStack>
              <VnMessageLead>{localize(vietnam.about.intro.mission, language)}</VnMessageLead>
              {vietnam.about.message.body.map((paragraph, index) => (
                <VnMessageBody key={index}>{localize(paragraph, language)}</VnMessageBody>
              ))}
            </VnBodyStack>
            <VnClosing>
              <VnThanks>{localize(vietnam.about.message.signer, language)}</VnThanks>
            </VnClosing>
          </VnMessageArticle>
          {representativePhoto ? (
            <VnCeoFigure>
              <VnCeoImage src={representativePhoto} alt={localize(representative?.name ?? vietnam.about.message.signer, language)} />
            </VnCeoFigure>
          ) : null}
        </VnMessageLayout>

        <VnLegacyBand>
          <VnLegacyStatement>
            <VnLegacyText>
              <VnLegacyMark src="/brand-mark-shinhan-navy.png" alt="" aria-hidden="true" />
              <VnLegacyEstablished>Shinhan Customs Vietnam</VnLegacyEstablished>
              <VnLegacyName>SHINHAN Customs Service Inc.</VnLegacyName>
            </VnLegacyText>
          </VnLegacyStatement>
        </VnLegacyBand>
      </VnMessageStack>
    );
  } else if (detail === 'history') {
    const sortedHistory = [...vietnam.about.history].sort((a, b) => Number(b.year) - Number(a.year));
    const featuredHistory = sortedHistory[0];
    const supportingHistory = sortedHistory.slice(1);

    body = (
      <VnHistoryStack>
        <VnHistoryIntro>
          <VnHistoryFigure>
            <VnHistoryImage src="/subpages/about-history.jpg" alt="" aria-hidden="true" />
          </VnHistoryFigure>
          <VnHistoryArticle>
            <div>
              <VnEditorialKicker>History</VnEditorialKicker>
              <VnEditorialTitle>{localize(aboutHeroTitle, language)}</VnEditorialTitle>
            </div>
            <VnBodyStack>
              <VnEditorialLead>{localize(vietnam.about.intro.mission, language)}</VnEditorialLead>
              {vietnam.about.intro.body.map((paragraph, index) => (
                <VnEditorialBody key={index}>{localize(paragraph, language)}</VnEditorialBody>
              ))}
            </VnBodyStack>
            <VnFactGrid>
              <VnFact>
                <VnFactValue>{featuredHistory?.year ?? '2026'}</VnFactValue>
                <VnFactLabel>{featuredHistory ? localize(featuredHistory.text, language) : localize(vietnam.about.intro.mission, language)}</VnFactLabel>
              </VnFact>
              <VnFact>
                <VnFactValue>Vietnam</VnFactValue>
                <VnFactLabel>{language === 'ko' ? '현지 고객 커뮤니케이션 강화' : language === 'en' ? 'Local client communication' : 'Giao tiếp khách hàng địa phương'}</VnFactLabel>
              </VnFact>
              <VnFact>
                <VnFactValue>SCV</VnFactValue>
                <VnFactLabel>{language === 'ko' ? '통관·원산지·수책 자문 확대' : language === 'en' ? 'Customs, origin, and liquidation advisory' : 'Tư vấn hải quan, xuất xứ và quyết toán'}</VnFactLabel>
              </VnFact>
            </VnFactGrid>
          </VnHistoryArticle>
        </VnHistoryIntro>

        <VnHistoryPanel>
          <VnSectionIntro>
            <VnEditorialKicker>Milestone</VnEditorialKicker>
            <VnSectionLargeTitle>{language === 'ko' ? '주요 이정표' : language === 'en' ? 'Key Milestones' : 'Các cột mốc chính'}</VnSectionLargeTitle>
          </VnSectionIntro>
          <VnMilestoneShowcase>
            {featuredHistory ? (
              <VnFeaturedMilestone>
                <div>
                  <VnFeaturedYear>{featuredHistory.year}</VnFeaturedYear>
                  <VnFeaturedTitle>{localize(featuredHistory.text, language)}</VnFeaturedTitle>
                  <VnFeaturedBody>{localize(vietnam.about.intro.mission, language)}</VnFeaturedBody>
                </div>
              </VnFeaturedMilestone>
            ) : null}
            <VnMilestoneRail>
              {supportingHistory.map((item) => (
                <VnMilestoneCard key={`${item.year}-${localize(item.text, language)}`}>
                  <VnMilestoneYear>{item.year}</VnMilestoneYear>
                  <VnMilestoneTitle>{localize(item.text, language)}</VnMilestoneTitle>
                </VnMilestoneCard>
              ))}
            </VnMilestoneRail>
          </VnMilestoneShowcase>
        </VnHistoryPanel>

        <VnHistoryPanel>
          <VnSectionIntro>
            <VnEditorialKicker>Timeline</VnEditorialKicker>
            <VnSectionLargeTitle>{language === 'ko' ? '연대별 상세 연혁' : language === 'en' ? 'Timeline' : 'Dòng thời gian'}</VnSectionLargeTitle>
          </VnSectionIntro>
          <VnTimelineBoard>
            <VnEraPanel>
              <VnEraHead data-index="01">
                <VnEraTitle>{language === 'ko' ? '베트남 지사 성장 과정' : language === 'en' ? 'Vietnam Branch Growth' : 'Quá trình phát triển chi nhánh Việt Nam'}</VnEraTitle>
              </VnEraHead>
              <VnTimelineList>
                {sortedHistory.map((item) => (
                  <VnTimelineRow key={`${item.year}-${localize(item.text, language)}`}>
                    <VnTimelineYear>{item.year}</VnTimelineYear>
                    <VnTimelineDot aria-hidden="true" />
                    <VnEventList>
                      <li>{localize(item.text, language)}</li>
                    </VnEventList>
                  </VnTimelineRow>
                ))}
              </VnTimelineList>
            </VnEraPanel>
          </VnTimelineBoard>
        </VnHistoryPanel>
      </VnHistoryStack>
    );
  } else if (detail === 'location') {
    const location = vietnam.about.location;
    const locationTitle = { ko: '베트남 지사', en: 'Vietnam Branch', vi: 'Chi nhánh Việt Nam' };
    const mapQuery = `${localize(locationTitle, language)} ${localize(location.address, language)}`;
    const googleMapUrl = location.googleMapUrl && location.googleMapUrl !== 'https://www.google.com/maps' ? location.googleMapUrl : getGoogleMapUrl(mapQuery);
    const googleMapEmbedUrl = getGoogleMapEmbedUrl(mapQuery);

    body = (
      <DirectionsGrid>
        <LocationInfoPanel>
          <Kicker>Office Information</Kicker>
          <LocationPanelTitle>{localize(locationTitle, language)}</LocationPanelTitle>
          <InfoRows>
            <InfoRow>
              <InfoLabel>{language === 'ko' ? '주소' : language === 'en' ? 'Address' : 'Địa chỉ'}</InfoLabel>
              <InfoValue>{localize(location.address, language)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{language === 'ko' ? '대표번호' : language === 'en' ? 'Phone' : 'Điện thoại'}</InfoLabel>
              <InfoValueLink href={`tel:${vietnam.contact.phone.replace(/[^+\d]/g, '')}`}>{vietnam.contact.phone}</InfoValueLink>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{language === 'ko' ? '이메일' : language === 'en' ? 'Email' : 'Email'}</InfoLabel>
              <InfoValueLink href={`mailto:${vietnam.contact.email}`}>{vietnam.contact.email}</InfoValueLink>
            </InfoRow>
          </InfoRows>
          <ActionRow>
            <PrimaryMapLink href={googleMapUrl} target="_blank" rel="noreferrer">
              {language === 'ko' ? 'Google 지도 열기' : language === 'en' ? 'Open Google Maps' : 'Mở Google Maps'}
            </PrimaryMapLink>
          </ActionRow>
        </LocationInfoPanel>
        <MapPanel>
          <Kicker>Map</Kicker>
          <LocationPanelTitle>{language === 'ko' ? '베트남 지사 지도 안내' : language === 'en' ? 'Vietnam Office Map' : 'Bản đồ văn phòng Việt Nam'}</LocationPanelTitle>
          <MapFrame>
            <iframe
              src={googleMapEmbedUrl}
              title={language === 'ko' ? '베트남 지사 지도' : language === 'en' ? 'Vietnam Office Map' : 'Bản đồ văn phòng Việt Nam'}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapFrame>
        </MapPanel>
      </DirectionsGrid>
    );
  } else {
    body = (
      <VnOverviewStack>
        <VnHeroStatement>
          <VnHeroHeading>
            <VnEditorialKicker>Shinhan Customs Vietnam</VnEditorialKicker>
            <VnEditorialTitle>{localize(vietnam.about.intro.title, language)}</VnEditorialTitle>
          </VnHeroHeading>
          <VnLeadGrid>
            <VnBodyStack>
              {vietnam.about.intro.body.map((paragraph, index) => (
                <VnEditorialLead key={index}>{localize(paragraph, language)}</VnEditorialLead>
              ))}
            </VnBodyStack>
            <VnFactGrid>
              <VnFact>
                <VnFactValue>Hanoi</VnFactValue>
                <VnFactLabel>{language === 'ko' ? '베트남 현지 실행 거점' : language === 'en' ? 'Local execution base in Vietnam' : 'Cơ sở vận hành tại Việt Nam'}</VnFactLabel>
              </VnFact>
              <VnFact>
                <VnFactValue>FTA</VnFactValue>
                <VnFactLabel>{language === 'ko' ? '원산지·통관 실무 지원' : language === 'en' ? 'Origin and customs support' : 'Hỗ trợ xuất xứ và hải quan'}</VnFactLabel>
              </VnFact>
              <VnFact>
                <VnFactValue>SCV</VnFactValue>
                <VnFactLabel>{language === 'ko' ? '한국 전문가와 현지팀 협업' : language === 'en' ? 'Korean experts and local team' : 'Chuyên gia Hàn Quốc và đội ngũ địa phương'}</VnFactLabel>
              </VnFact>
            </VnFactGrid>
          </VnLeadGrid>
        </VnHeroStatement>

        <VnNavyPanel>
          <div>
            <VnEditorialKicker $light>Vision</VnEditorialKicker>
            <VnNavyTitle>{localize(vietnam.about.intro.mission, language)}</VnNavyTitle>
            <VnRule $light />
            <VnNavyBody>{localize(vietnam.about.intro.body[0] ?? vietnam.about.intro.mission, language)}</VnNavyBody>
          </div>
          <VnValueList>
            <VnValueRow>
              <VnValueTitle>LOCAL</VnValueTitle>
              <VnValueBody>{language === 'ko' ? '베트남 현지 제도와 고객 업무 흐름을 함께 이해합니다.' : language === 'en' ? 'We understand local rules and client workflows in Vietnam.' : 'Chúng tôi hiểu quy định địa phương và quy trình của khách hàng tại Việt Nam.'}</VnValueBody>
            </VnValueRow>
            <VnValueRow>
              <VnValueTitle>EXPERTISE</VnValueTitle>
              <VnValueBody>{language === 'ko' ? '한국 관세 전문성과 현지 실행력을 연결합니다.' : language === 'en' ? 'We connect Korean customs expertise with local execution.' : 'Chúng tôi kết nối chuyên môn hải quan Hàn Quốc với năng lực thực thi địa phương.'}</VnValueBody>
            </VnValueRow>
          </VnValueList>
        </VnNavyPanel>

        <VnServiceColumns>
          {[
            { index: '01', title: vietnam.services.title, body: vietnam.services.summary, items: vietnam.services.items.slice(0, 3).map((item) => item.title) },
            { index: '02', title: vietnam.itSolutions.title, body: vietnam.itSolutions.summary, items: vietnam.itSolutions.items.map((item) => ({ ko: item.title, en: item.title, vi: item.title })) },
            { index: '03', title: vietnam.contact.title, body: vietnam.contact.summary, items: [{ ko: 'Email', en: 'Email', vi: 'Email' }, { ko: '온라인 문의', en: 'Online Inquiry', vi: 'Liên hệ trực tuyến' }] },
          ].map((pillar) => (
            <VnServiceColumn key={pillar.index}>
              <VnServiceIndex>{pillar.index}</VnServiceIndex>
              <VnServiceTitle>{localize(pillar.title, language)}</VnServiceTitle>
              <VnServiceDescription>{localize(pillar.body, language)}</VnServiceDescription>
              <VnServiceList>
                {pillar.items.map((item) => (
                  <VnServiceItem key={localize(item, language)}>{localize(item, language)}</VnServiceItem>
                ))}
              </VnServiceList>
            </VnServiceColumn>
          ))}
        </VnServiceColumns>
      </VnOverviewStack>
    );
  }

  return (
    <VnLayout page="about" detail={detail === 'overview' ? undefined : detail}>
      <SectionHero
        title={aboutHeroTitle}
        summary={vietnam.about.intro.mission}
        kicker="About SCV"
        image={aboutHeroImage}
        language={language}
        sectionId="about"
      />
      <Band>
        {body}
      </Band>
    </VnLayout>
  );
}

export function VnMembersPage({ group = 'executive' }: { group?: 'executive' | 'expert' }) {
  const { content, executives } = useSiteContent();
  const { language } = useVnLanguage();
  const vietnam = content.vietnam;
  const expertMembers = useMemo<Member[]>(
    () =>
      vietnam.people.members
        .filter((member) => member.group === 'expert')
        .map((member) => ({
          id: `vn-${member.id}`,
          name: localize(member.name, language),
          phone: '',
          email: '',
          title: localize(member.role, language),
          department: member.team ? localize(member.team, language) : '',
          practice: '',
          accent: palette.blue,
          careerHighlights: member.highlights.map((highlight) => localize(highlight, language)),
        })),
    [language, vietnam.people.members],
  );
  const members = group === 'executive' ? executives : expertMembers;
  const membersPath = group === 'executive' ? '/vn/members/executives' : '/vn/members/experts';
  const membersHeroTitle = getSectionNavItems(vietnam, 'people').find((item) => item.path === membersPath)?.label ?? vietnam.people.title;
  const membersHeroImage = group === 'executive' ? '/hero/menu-members-executives-ai.png' : '/hero/menu-members-experts-ai.png';

  return (
    <VnLayout page="members" detail={group === 'executive' ? 'executives' : 'experts'}>
      <SectionHero title={membersHeroTitle} summary={vietnam.people.summary} kicker="People" image={membersHeroImage} language={language} sectionId="people" />
      <Band>
        <ProfessionalCardGrid members={members} showPracticeOverlay={group === 'expert'} />
      </Band>
    </VnLayout>
  );
}

export function VnServicePage({ serviceId = 'fta-origin' }: { serviceId?: string }) {
  const { content } = useSiteContent();
  const { language } = useVnLanguage();
  const vietnam = content.vietnam;
  const service = vietnam.services.items.find((item) => item.id === serviceId);

  if (!service) {
    return <Navigate to="/vn/services/fta-origin" replace />;
  }

  return (
    <VnLayout page="services" detail={serviceId}>
      <SectionHero title={service.title} summary={service.summary} kicker="Services" image={serviceHeroImagesById[service.id] ?? '/hero/service-vietnam-ai.png'} language={language} sectionId="services" />
      <VnDetailSection>
        <VnDetailInner data-reveal>
          <VnDetailIntroStack>
            <VnDetailIntroHeading>
              <VnDetailEyebrow>Vietnam Service</VnDetailEyebrow>
              <VnDetailTitle>{localize(service.title, language)}</VnDetailTitle>
            </VnDetailIntroHeading>
            <VnDetailSummary>{localize(service.summary, language)}</VnDetailSummary>
            <VnOverviewBlock>
              <VnOverviewTitle>{language === 'ko' ? '개요' : language === 'en' ? 'Overview' : 'Tổng quan'}</VnOverviewTitle>
              <VnOverviewText>{localize(service.summary, language)}</VnOverviewText>
            </VnOverviewBlock>
          </VnDetailIntroStack>
        </VnDetailInner>
      </VnDetailSection>

      <VnDetailSection $tone="soft">
        <VnDetailInner data-reveal>
          <VnDetailSectionHead>
            <VnDetailEyebrow>Practice Detail</VnDetailEyebrow>
            <VnDetailSectionTitle>{language === 'ko' ? '주요 지원 내용' : language === 'en' ? 'Key Support' : 'Hỗ trợ chính'}</VnDetailSectionTitle>
          </VnDetailSectionHead>
          <VnDocumentStack>
            <VnDocumentSectionCard>
              <VnDocumentSectionTitle>{localize(service.title, language)}</VnDocumentSectionTitle>
              <VnDetailList>
                {service.details.map((item, index) => (
                  <li key={index}>{localize(item, language)}</li>
                ))}
              </VnDetailList>
            </VnDocumentSectionCard>
            {service.manager || service.team ? (
              <VnDocumentSectionCard>
                <VnDocumentSectionTitle>{language === 'ko' ? '담당' : language === 'en' ? 'Contact' : 'Phụ trách'}</VnDocumentSectionTitle>
                <VnDetailMetaGrid>
                  {service.manager ? (
                    <VnDetailMetaItem>
                      <span>{language === 'ko' ? '담당자' : language === 'en' ? 'Manager' : 'Người phụ trách'}</span>
                      <strong>{service.manager}</strong>
                    </VnDetailMetaItem>
                  ) : null}
                  {service.team ? (
                    <VnDetailMetaItem>
                      <span>{language === 'ko' ? '팀' : language === 'en' ? 'Team' : 'Đội'}</span>
                      <strong>{localize(service.team, language)}</strong>
                    </VnDetailMetaItem>
                  ) : null}
                </VnDetailMetaGrid>
              </VnDocumentSectionCard>
            ) : null}
          </VnDocumentStack>
        </VnDetailInner>
      </VnDetailSection>
    </VnLayout>
  );
}

export function VnItPage({ solutionId = 'kord-fta' }: { solutionId?: string }) {
  const { content } = useSiteContent();
  const { language } = useVnLanguage();
  const vietnam = content.vietnam;
  const solution = vietnam.itSolutions.items.find((item) => item.id === solutionId);

  if (!solution) {
    return <Navigate to="/vn/it/kord-fta" replace />;
  }

  return (
    <VnLayout page="it" detail={solutionId}>
      <SectionHero title={{ ko: solution.title, en: solution.title, vi: solution.title }} summary={solution.summary} kicker="IT Solutions" image="/hero/menu-it-ai.png" language={language} sectionId="it" />
      <VnDetailSection>
        <VnDetailInner data-reveal>
          <VnDetailIntroStack>
            <VnDetailIntroHeading>
              <VnDetailEyebrow>IT Service</VnDetailEyebrow>
              <VnDetailTitle>{solution.title}</VnDetailTitle>
            </VnDetailIntroHeading>
            <VnDetailSummary>{localize(solution.summary, language)}</VnDetailSummary>
            <VnOverviewBlock>
              <VnOverviewTitle>{language === 'ko' ? '개요' : language === 'en' ? 'Overview' : 'Tổng quan'}</VnOverviewTitle>
              <VnOverviewText>{localize(solution.summary, language)}</VnOverviewText>
            </VnOverviewBlock>
          </VnDetailIntroStack>
        </VnDetailInner>
      </VnDetailSection>

      <VnDetailSection $tone="soft">
        <VnDetailInner data-reveal>
          <VnDetailSectionHead>
            <VnDetailEyebrow>Solution Detail</VnDetailEyebrow>
            <VnDetailSectionTitle>{language === 'ko' ? '핵심 기능' : language === 'en' ? 'Core Modules' : 'Chức năng chính'}</VnDetailSectionTitle>
          </VnDetailSectionHead>
          <VnDocumentStack>
            <VnDocumentSectionCard>
              <VnDocumentSectionTitle>{solution.title}</VnDocumentSectionTitle>
              <VnDetailList>
                {solution.details.map((item, index) => (
                  <li key={index}>{localize(item, language)}</li>
                ))}
              </VnDetailList>
            </VnDocumentSectionCard>
          </VnDocumentStack>
        </VnDetailInner>
      </VnDetailSection>
    </VnLayout>
  );
}

export function VnNewsPage({ category = 'newsletter' }: { category?: VietnamContent['news']['items'][number]['category'] }) {
  const { content } = useSiteContent();
  const { language } = useVnLanguage();
  const vietnam = content.vietnam;
  const items = vietnam.news.items.filter((item) => item.category === category);
  const newsHeroTitle = getSectionNavItems(vietnam, 'news').find((item) => item.path === newsPathByCategory[category])?.label ?? vietnam.news.title;
  const rows = useMemo<NewsListTableRow[]>(
    () =>
      items.map((item) => {
        const externalHref = item.href && !item.href.startsWith('/') ? item.href : undefined;
        const targetPath = item.href?.startsWith('/') ? item.href : newsPathByCategory[item.category];
        const actionLabel = language === 'ko' ? '바로가기' : language === 'en' ? 'Open' : 'Mở';

        return {
          id: item.id,
          anchorId: item.id,
          publishedAt: item.publishedAt,
          sourceLabel: localize(newsLabelByCategory[item.category], language),
          title: localize(item.title, language),
          href: externalHref,
          to: externalHref ? undefined : targetPath,
          external: Boolean(externalHref),
          actions: [
            {
              label: actionLabel,
              href: externalHref,
              to: externalHref ? undefined : targetPath,
              external: Boolean(externalHref),
            },
          ],
        };
      }),
    [items, language],
  );
  const emptyMessage = language === 'ko' ? '등록된 자료가 없습니다.' : language === 'en' ? 'No resources are listed.' : 'Chưa có tài liệu.';

  return (
    <VnLayout page="news" detail={category}>
      <SectionHero title={newsHeroTitle} summary={vietnam.news.summary} kicker="News & Resources" image={newsHeroImagesByCategory[category]} language={language} sectionId="news" />
      <VnNewsListSection>
        <VnNewsListInner data-reveal>
          <VnNewsListHead>
            <VnDetailEyebrow>Archive</VnDetailEyebrow>
            <VnNewsListTitle>{localize(newsHeroTitle, language)}</VnNewsListTitle>
            <VnNewsListLead>{localize(vietnam.news.summary, language)}</VnNewsListLead>
          </VnNewsListHead>
          <NewsListTable
            rows={rows}
            dateLabel={language === 'ko' ? '일자' : language === 'en' ? 'Date' : 'Ngày'}
            sourceLabel={language === 'ko' ? '구분' : language === 'en' ? 'Category' : 'Phân loại'}
            titleLabel={language === 'ko' ? '제목' : language === 'en' ? 'Title' : 'Tiêu đề'}
            actionLabel={language === 'ko' ? '바로가기' : language === 'en' ? 'Open' : 'Mở'}
            emptyMessage={emptyMessage}
          />
        </VnNewsListInner>
      </VnNewsListSection>
    </VnLayout>
  );
}

export function VnContactPage() {
  const { content } = useSiteContent();
  const { language } = useVnLanguage();
  const vietnam = content.vietnam;
  const contactHeroTitle = { ko: 'Contact Us', en: 'Contact Us', vi: 'Contact Us' };
  const locationTitle = vietnam.about.location.title;

  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = getFormValue(formData, 'name');
    const phone = getFormValue(formData, 'phone');
    const email = getFormValue(formData, 'email');
    const message = getFormValue(formData, 'message');
    const subject = `[신한관세법인 베트남 온라인 문의] ${name || '문의'}`;
    const body = [
      '베트남 법인 온라인 문의 내용',
      '',
      `이름: ${name || '-'}`,
      `연락처: ${phone || '-'}`,
      `이메일: ${email || '-'}`,
      '',
      '문의내용:',
      message || '-',
    ].join('\n');

    window.location.href = `mailto:${vietnam.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <VnLayout page="contact">
      <SectionHero title={contactHeroTitle} summary={vietnam.contact.summary} kicker="Contact" image="/hero/menu-utility-contact-ai.png" language={language} sectionId="contact" />
      <VnContactSection>
        <VnContactInner data-reveal>
          <VnContactIntro>
            <VnDetailEyebrow>Contact Us</VnDetailEyebrow>
            <VnContactTitle>Contact Us</VnContactTitle>
            <VnContactLead>{localize(vietnam.contact.summary, language)}</VnContactLead>
          </VnContactIntro>

          <VnContactGrid>
            <VnInfoPanel>
              <VnDetailEyebrow>Contact Information</VnDetailEyebrow>
              <VnPanelTitle>{language === 'ko' ? '베트남 법인 연락처' : language === 'en' ? 'Vietnam Contact Information' : 'Thông tin liên hệ Việt Nam'}</VnPanelTitle>

              <VnInfoActions>
                <VnInfoActionLink href={`tel:${vietnam.contact.phone.replace(/[^+\d]/g, '')}`}>
                  {language === 'ko' ? '대표번호 연결' : language === 'en' ? 'Call Main Line' : 'Gọi số chính'}
                </VnInfoActionLink>
                <VnInfoActionLink href={`mailto:${vietnam.contact.email}`}>
                  {language === 'ko' ? '이메일 보내기' : language === 'en' ? 'Send Email' : 'Gửi email'}
                </VnInfoActionLink>
              </VnInfoActions>

              <VnInfoList>
                <VnInfoItem>
                  <VnInfoLabel>{language === 'ko' ? '대표번호' : language === 'en' ? 'Phone' : 'Điện thoại'}</VnInfoLabel>
                  <VnInfoValueLink href={`tel:${vietnam.contact.phone.replace(/[^+\d]/g, '')}`}>{vietnam.contact.phone}</VnInfoValueLink>
                </VnInfoItem>
                <VnInfoItem>
                  <VnInfoLabel>{language === 'ko' ? '이메일' : language === 'en' ? 'Email' : 'Email'}</VnInfoLabel>
                  <VnInfoValueLink href={`mailto:${vietnam.contact.email}`}>{vietnam.contact.email}</VnInfoValueLink>
                </VnInfoItem>
                <VnInfoItem>
                  <VnInfoLabel>{language === 'ko' ? '베트남 지사' : language === 'en' ? 'Vietnam Branch' : 'Chi nhánh Việt Nam'}</VnInfoLabel>
                  <VnInfoValue>{localize(locationTitle, language)}</VnInfoValue>
                </VnInfoItem>
                <VnInfoItem>
                  <VnInfoLabel>{language === 'ko' ? '주소' : language === 'en' ? 'Address' : 'Địa chỉ'}</VnInfoLabel>
                  <VnInfoValue>{localize(vietnam.about.location.address, language)}</VnInfoValue>
                </VnInfoItem>
                {vietnam.contact.naverBlogUrl || vietnam.contact.facebookUrl ? (
                  <VnInfoItem>
                    <VnInfoLabel>{language === 'ko' ? '소셜 플랫폼' : language === 'en' ? 'Social' : 'Mạng xã hội'}</VnInfoLabel>
                    <VnInfoValueGroup>
                      {vietnam.contact.naverBlogUrl ? <VnInfoValueLink href={vietnam.contact.naverBlogUrl}>Naver Blog</VnInfoValueLink> : null}
                      {vietnam.contact.facebookUrl ? <VnInfoValueLink href={vietnam.contact.facebookUrl}>Facebook</VnInfoValueLink> : null}
                    </VnInfoValueGroup>
                  </VnInfoItem>
                ) : null}
              </VnInfoList>
            </VnInfoPanel>

            <VnInquiryPanel>
              <VnInquiryHeader>
                <VnDetailEyebrow>Online Inquiry</VnDetailEyebrow>
                <VnInquiryTitle>{language === 'ko' ? '온라인 문의' : language === 'en' ? 'Online Inquiry' : 'Liên hệ trực tuyến'}</VnInquiryTitle>
                <VnInquiryText>
                  {language === 'ko'
                    ? '문의 내용을 남겨주시면 담당자가 확인 후 연락드립니다.'
                    : language === 'en'
                      ? 'Leave your inquiry and our team will contact you after review.'
                      : 'Vui lòng để lại nội dung liên hệ, đội ngũ phụ trách sẽ phản hồi sau khi xem xét.'}
                </VnInquiryText>
              </VnInquiryHeader>

              <VnInquiryForm action={`mailto:${vietnam.contact.email}`} method="post" encType="text/plain" onSubmit={handleInquirySubmit}>
                <VnFieldGroup>
                  <VnFieldLabel htmlFor="vn-contact-name">{language === 'ko' ? '이름' : language === 'en' ? 'Name' : 'Tên'}</VnFieldLabel>
                  <VnTextInput id="vn-contact-name" name="name" placeholder={language === 'ko' ? '입력해주세요' : language === 'en' ? 'Enter your name' : 'Nhập tên'} />
                </VnFieldGroup>
                <VnFieldGroup>
                  <VnFieldLabel htmlFor="vn-contact-phone">{language === 'ko' ? '연락처' : language === 'en' ? 'Contact' : 'Liên hệ'}</VnFieldLabel>
                  <VnTextInput id="vn-contact-phone" name="phone" placeholder={language === 'ko' ? '- 없이 입력해주세요' : language === 'en' ? 'Enter without hyphens' : 'Nhập không dấu gạch nối'} />
                </VnFieldGroup>
                <VnFieldGroup>
                  <VnFieldLabel htmlFor="vn-contact-email">{language === 'ko' ? '이메일' : language === 'en' ? 'Email' : 'Email'}</VnFieldLabel>
                  <VnTextInput id="vn-contact-email" name="email" placeholder={language === 'ko' ? '이메일 주소' : language === 'en' ? 'Email address' : 'Địa chỉ email'} />
                </VnFieldGroup>
                <VnFieldGroup $wide>
                  <VnFieldLabel htmlFor="vn-contact-message">{language === 'ko' ? '문의내용' : language === 'en' ? 'Inquiry' : 'Nội dung'}</VnFieldLabel>
                  <VnTextArea id="vn-contact-message" name="message" placeholder={language === 'ko' ? '내용을 입력해주세요.' : language === 'en' ? 'Enter your inquiry.' : 'Nhập nội dung liên hệ.'} />
                </VnFieldGroup>
                <VnConsentLabel>
                  <input type="checkbox" name="privacy" />
                  <span>
                    {language === 'ko'
                      ? '개인정보 수집 및 이용에 동의합니다.'
                      : language === 'en'
                        ? 'I agree to the collection and use of personal information.'
                        : 'Tôi đồng ý với việc thu thập và sử dụng thông tin cá nhân.'}
                  </span>
                </VnConsentLabel>
                <VnSubmitButton type="submit">{language === 'ko' ? '문의 보내기' : language === 'en' ? 'Send Inquiry' : 'Gửi liên hệ'}</VnSubmitButton>
              </VnInquiryForm>
            </VnInquiryPanel>
          </VnContactGrid>
        </VnContactInner>
      </VnContactSection>
    </VnLayout>
  );
}

const VnShell = styled.div`
  min-height: 100vh;
  background: #ffffff;
  color: ${palette.textPrimary};
`;

const VnHeader = styled.header<{ $scrolled: boolean }>`
  --site-header-height: 108px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 12000;
  margin-bottom: 0;
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? '#e5ebf3' : 'transparent')};
  background: ${({ $scrolled }) => ($scrolled ? '#ffffff' : 'transparent')};
  box-shadow: ${({ $scrolled }) => ($scrolled ? '0 10px 28px rgba(18, 36, 60, 0.06)' : 'none')};
  overflow: visible;
  isolation: isolate;
  transition:
    background 0.24s ease,
    border-color 0.24s ease,
    box-shadow 0.24s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    height: ${({ $scrolled }) => ($scrolled ? '0' : '148px')};
    pointer-events: none;
    opacity: ${({ $scrolled }) => ($scrolled ? 0 : 1)};
    background: transparent;
    transition:
      opacity 0.24s ease,
      height 0.24s ease;
  }

  a[href='/vn'] img[data-logo-blue='true'] {
    opacity: ${({ $scrolled }) => ($scrolled ? 1 : 0)};
  }

  a[href='/vn'] img[data-logo-light='true'] {
    opacity: ${({ $scrolled }) => ($scrolled ? 0 : 1)};
  }

  nav a,
  a[data-vn-contact-button='true'],
  button {
    color: ${({ $scrolled }) => ($scrolled ? palette.textPrimary : '#ffffff')};
    text-shadow: ${({ $scrolled }) => ($scrolled ? 'none' : '0 3px 10px rgba(0, 24, 70, 0.62)')};
  }

  div[data-vn-language-group='true'] {
    color: ${({ $scrolled }) => ($scrolled ? palette.textBody : '#ffffff')};
    text-shadow: ${({ $scrolled }) => ($scrolled ? 'none' : '0 3px 10px rgba(0, 24, 70, 0.62)')};
  }

  div[data-vn-language-group='true'] button {
    color: inherit;
    text-shadow: inherit;
  }

  div[data-vn-language-group='true'] button[data-active='true'] {
    color: ${({ $scrolled }) => ($scrolled ? palette.textPrimary : '#ffffff')};
  }

  &:has(nav > div:hover),
  &:has(nav > div:focus-within) {
    background: #ffffff;
    border-bottom-color: rgba(33, 101, 193, 0.16);
    box-shadow: 0 12px 28px rgba(3, 15, 34, 0.08);
  }

  &:has(nav > div:hover)::before,
  &:has(nav > div:focus-within)::before {
    opacity: 0;
    height: 76px;
  }

  &:has(nav > div:hover) a[href='/vn'] img[data-logo-blue='true'],
  &:has(nav > div:focus-within) a[href='/vn'] img[data-logo-blue='true'] {
    opacity: 1;
  }

  &:has(nav > div:hover) a[href='/vn'] img[data-logo-light='true'],
  &:has(nav > div:focus-within) a[href='/vn'] img[data-logo-light='true'] {
    opacity: 0;
  }

  &:has(nav > div:hover) nav a,
  &:has(nav > div:focus-within) nav a,
  &:has(nav > div:hover) a[data-vn-contact-button='true'],
  &:has(nav > div:focus-within) a[data-vn-contact-button='true'],
  &:has(nav > div:hover) button,
  &:has(nav > div:focus-within) button {
    color: ${palette.textPrimary};
    text-shadow: none;
  }

  &:has(nav > div:hover) div[data-vn-language-group='true'],
  &:has(nav > div:focus-within) div[data-vn-language-group='true'] {
    color: ${palette.textBody};
    text-shadow: none;
  }

  @media (max-width: 768px) {
    --site-header-height: 72px;
    border-bottom-color: ${({ $scrolled }) => ($scrolled ? '#e5ebf3' : 'rgba(255, 255, 255, 0.1)')};
  }
`;

const VnHeaderInner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) auto minmax(280px, 1fr);
  align-items: center;
  gap: 24px;
  width: calc(100% - 72px);
  min-height: 88px;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;

  @media (max-width: 1400px) {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  @media (max-width: 768px) {
    width: calc(100% - 28px);
    min-height: 66px;
    gap: 12px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-self: start;
  width: fit-content;
  color: ${palette.blueDeep};
`;

const HeaderLogoFrame = styled.span`
  position: relative;
  display: block;
  width: min(230px, 18vw);
  aspect-ratio: 706 / 268;
  overflow: hidden;
  transform: translateY(1px);

  @media (max-width: 1320px) {
    width: 206px;
  }

  @media (max-width: 980px) {
    width: 184px;
  }

  @media (max-width: 520px) {
    width: 150px;
  }
`;

const HeaderLogoImage = styled.img`
  display: block;
  width: auto;
  max-width: none;
  height: 100%;
  object-fit: contain;
  transform: translateX(-31.25%);

  &[data-logo-light='true'] {
    position: absolute;
    inset: 0;
    opacity: 0;
  }
`;

const VnNav = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: clamp(12px, 2.2vw, 36px);

  @media (max-width: 1400px) {
    display: none;
  }
`;

const NavCluster = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90px;

  &:hover > div,
  &:focus-within > div {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);

    &::before {
      transform: translateX(0);
    }

    &::after {
      opacity: 0.7;
      transform: translate3d(0, 0, 0);
    }

    [data-mega-title],
    [data-mega-link] {
      opacity: 1;
      transform: translate3d(0, 0, 0) rotateX(0);
    }
  }
`;

const NavLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 56px;
  padding: 0 2px;
  color: ${palette.textPrimary};
  font-size: 1rem;
  font-weight: 800;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 7px;
    height: 2px;
    background: transparent;
    transition: background 0.18s ease;
  }

  &[data-active='true'] {
    color: ${palette.blue};
  }

  &[data-active='true']::before,
  &:hover::before {
    background: currentColor;
  }
`;

const MegaMenu = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: calc(var(--site-header-height, 108px) - 1px);
  z-index: 12010;
  min-height: 392px;
  padding: 42px 0 50px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-18px) scaleY(0.98);
  transform-origin: top center;
  background: #ffffff;
  border-top: 1px solid rgba(33, 101, 193, 0.16);
  border-bottom: 1px solid rgba(15, 54, 112, 0.12);
  box-shadow: 0 24px 44px rgba(3, 15, 34, 0.1);
  transition:
    opacity 0.34s cubic-bezier(0.18, 0.9, 0.28, 1),
    visibility 0.34s ease,
    transform 0.34s cubic-bezier(0.18, 0.9, 0.28, 1);

  &[data-open='true'] {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }

  &[data-open='true']::before {
    transform: translateX(0);
  }

  &[data-open='true']::after {
    opacity: 0.7;
    transform: translate3d(0, 0, 0);
  }

  &[data-open='true'] [data-mega-title],
  &[data-open='true'] [data-mega-link] {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotateX(0);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &::before {
    left: 0;
    top: 0;
    bottom: 0;
    width: min(31vw, 420px);
    background: #f5f8fc;
    border-right: 1px solid rgba(15, 54, 112, 0.07);
    opacity: 1;
    transform: translateX(0);
    transition: transform 0.42s cubic-bezier(0.18, 0.9, 0.28, 1);
  }

  &::after {
    left: 44px;
    bottom: 44px;
    width: 210px;
    height: 82px;
    border-left: 1px solid rgba(15, 54, 112, 0.12);
    border-bottom: 1px solid rgba(15, 54, 112, 0.1);
    opacity: 0;
    transform: translate3d(-10px, 14px, 0);
    transition:
      opacity 0.42s ease,
      transform 0.42s cubic-bezier(0.18, 0.9, 0.28, 1);
  }

  a {
    color: ${palette.blueInk};
    text-shadow: none;
  }

  a::before {
    display: none;
  }

  @media (max-width: 1320px) {
    top: calc(var(--site-header-height, 92px) - 1px);
  }
`;

const MegaMenuInner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(260px, 0.27fr) minmax(0, 1fr);
  gap: clamp(44px, 5vw, 84px);
  align-items: start;
  width: calc(100% - 96px);
  margin: 0 auto;
`;

const MegaMenuTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  min-height: 152px;
  padding: 14px 26px 20px;
  color: ${palette.blueInk};
  text-align: left;
  opacity: 0;
  transform: translate3d(-24px, 16px, 0);
  transition:
    opacity 0.42s ease,
    transform 0.42s cubic-bezier(0.18, 0.9, 0.28, 1);
`;

const MegaMenuKicker = styled.span`
  align-self: flex-start;
  margin-left: clamp(24px, 2.4vw, 38px);
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
`;

const MegaMenuTitle = styled.strong`
  color: ${palette.textPrimary};
  font-size: clamp(2.22rem, 3.4vw, 3.2rem);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: 0;
  text-shadow: none;
`;

const MegaMenuLinks = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(160px, 1fr));
  gap: 12px;
  padding: 8px 0 0;
  perspective: 1000px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -18px;
    height: 1px;
    background: rgba(33, 101, 193, 0.26);
  }

  @media (max-width: 1600px) {
    grid-template-columns: repeat(4, minmax(128px, 1fr));
  }
`;

const MegaMenuLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-height: 62px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-bottom-color: rgba(15, 54, 112, 0.08);
  background: #ffffff;
  color: ${palette.blueInk};
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 0;
  text-align: left;
  white-space: normal;
  word-break: keep-all;
  opacity: 0;
  transform: translate3d(0, 22px, 0) rotateX(8deg);
  transform-origin: center top;
  transition:
    opacity 0.36s ease,
    color 0.18s ease,
    transform 0.36s cubic-bezier(0.18, 0.9, 0.28, 1),
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;

  &::after {
    content: '';
    width: 7px;
    height: 7px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    opacity: 0.44;
    transform: rotate(45deg);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  &:hover,
  &:focus-visible {
    color: ${palette.blueDeep};
    background: rgba(245, 248, 252, 0.98);
    border-color: rgba(15, 54, 112, 0.08);
    transform: translateY(-2px);
    outline: none;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
    transform: translateX(3px) rotate(45deg);
  }
`;

const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const VnContactButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 38px;
  padding: 0 13px 0 10px;
  color: ${palette.textBody};
  font-size: 0.98rem;
  font-weight: 900;
  letter-spacing: 0;
  white-space: nowrap;
  word-break: keep-all;
  transition: transform 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    outline: none;
  }

  &::after {
    content: '';
    width: 1px;
    height: 12px;
    margin-left: 6px;
    background: currentColor;
    opacity: 0.26;
  }
`;

const LanguageGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 38px;
  color: ${palette.textBody};
`;

const LanguageButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 38px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 1.03rem;
  font-weight: 900;
  line-height: 1;
  opacity: 0.58;
  cursor: pointer;
  transition:
    color 0.18s ease,
    opacity 0.18s ease,
    transform 0.18s ease;

  &[data-active='true'] {
    opacity: 1;
  }

  &:hover,
  &:focus-visible {
    color: ${palette.blue};
    opacity: 1;
    transform: translateY(-1px);
    outline: none;
  }
`;

const LanguageToggleIcon = styled.svg`
  display: block;
  width: 25px;
  height: 25px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.85;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const LanguageToggleDivider = styled.span`
  width: 1px;
  height: 18px;
  background: currentColor;
  opacity: 0.42;
`;

const Hero = styled.section<{ $image: string; $position: string }>`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  border-bottom: 0;
  background-color: #dcecff;
  background:
    linear-gradient(180deg, rgba(4, 17, 39, 0.12), rgba(4, 17, 39, 0.08)),
    linear-gradient(90deg, rgba(8, 31, 70, 0.58), rgba(8, 31, 70, 0.22), rgba(8, 31, 70, 0.06)),
    url(${({ $image }) => $image}) ${({ $position }) => $position} / cover no-repeat;

  @media (max-width: 768px) {
    min-height: min(780px, 100vh);
  }
`;

const HeroBackdropOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: transparent;
`;

const HeroBottomBlend = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  z-index: 1;
  height: min(28vh, 260px);
  pointer-events: none;
  background: transparent;
`;

const HeroOverlay = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 48px);
  min-height: inherit;
  margin: 0 auto;
  padding: clamp(116px, 15vh, 150px) 0 clamp(40px, 8vh, 78px);

  @media (max-width: 920px) {
    padding: clamp(104px, 13vh, 132px) 0 clamp(32px, 6vh, 56px);
  }

  @media (max-width: 768px) {
    width: calc(100% - 28px);
  }
`;

const HeroCopy = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(22px, 2.2vw, 34px);
  width: min(1120px, 82vw);
  color: #ffffff;
  text-align: center;
  transform: translate3d(0, calc(-56px + (var(--viewport-progress) * -34px)), 0);
  transition: transform 0.16s linear;

  @media (max-width: 920px) {
    width: min(100%, 680px);
    gap: 18px;
    transform: translate3d(0, -28px, 0);
  }
`;

const Kicker = styled.p`
  margin: 0;
  color: ${palette.blue};
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1<{ $language: 'ko' | 'en' }>`
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 0 clamp(16px, 1.8vw, 24px);
  color: #ffffff;
  font-family:
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Pretendard',
    system-ui,
    sans-serif;
  font-size: ${({ $language }) => ($language === 'en' ? 'clamp(2.3rem, 4.75vw, 4.9rem)' : 'clamp(2.9rem, 6.18vw, 6.72rem)')};
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: 0;
  word-break: keep-all;
  white-space: nowrap;
  text-shadow:
    0 26px 58px rgba(3, 15, 34, 0.58),
    0 8px 20px rgba(3, 15, 34, 0.38),
    0 0 1px rgba(255, 255, 255, 0.72);

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: -22% -8% 8%;
    border-radius: 999px;
    background:
      radial-gradient(circle at 50% 50%, rgba(13, 73, 146, 0.36), transparent 62%),
      linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
    filter: blur(18px);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: min(74%, 520px);
    height: clamp(4px, 0.42vw, 7px);
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(18, 63, 133, 0.18) 12%,
      rgba(18, 63, 133, 0.46) 32%,
      rgba(18, 63, 133, 0.68) 50%,
      rgba(18, 63, 133, 0.46) 68%,
      rgba(18, 63, 133, 0.18) 88%,
      rgba(255, 255, 255, 0)
    );
    box-shadow: 0 10px 22px rgba(18, 63, 133, 0.22);
    transform: translateX(-50%);
  }

  @media (max-width: 920px) {
    font-size: ${({ $language }) => ($language === 'en' ? 'clamp(2.12rem, 7.2vw, 3.9rem)' : 'clamp(2.58rem, 9.85vw, 4.72rem)')};
    white-space: normal;
    text-wrap: balance;
  }

  @media (max-width: 520px) {
    white-space: normal;
    font-size: ${({ $language }) => ($language === 'en' ? 'clamp(1.86rem, 9vw, 2.72rem)' : 'clamp(2.24rem, 11.1vw, 3.48rem)')};
  }
`;

const HeroStatement = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.34rem, 2.2vw, 2.35rem);
  font-weight: 520;
  line-height: 1.28;
  letter-spacing: 0;
  word-break: keep-all;
  text-wrap: balance;
  white-space: pre-line;
  text-shadow:
    0 16px 42px rgba(3, 15, 34, 0.62),
    0 2px 8px rgba(3, 15, 34, 0.38);

  @media (max-width: 768px) {
    font-size: clamp(1.12rem, 4.8vw, 1.72rem);
  }
`;

const HeroLead = styled.p`
  max-width: 720px;
  margin: -10px auto 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.98rem, 1.14vw, 1.14rem);
  font-weight: 520;
  line-height: 1.72;
  letter-spacing: 0;
  word-break: keep-all;
  text-wrap: pretty;
  white-space: pre-line;
  text-shadow:
    0 12px 34px rgba(3, 15, 34, 0.58),
    0 2px 8px rgba(3, 15, 34, 0.34);
`;

const HeroControls = styled.div`
  position: absolute;
  left: 50%;
  bottom: clamp(86px, 11vh, 128px);
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 16px;
  width: min(620px, 52vw);
  transform: translateX(-50%);

  @media (max-width: 920px) {
    width: min(88vw, 520px);
    bottom: 88px;
  }
`;

const HeroProgress = styled.div`
  position: relative;
  flex: 1 1 auto;
  height: 2px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.28);
`;

const HeroProgressBar = styled.span`
  position: absolute;
  inset: 0 auto 0 0;
  width: 100%;
  background: #ffffff;
`;

const HeroCounter = styled.span`
  min-width: 74px;
  color: #ffffff;
  font-size: 1.22rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-align: center;
  text-shadow: 0 10px 28px rgba(3, 15, 34, 0.42);
`;

const VnQuickCard = styled(Link)`
  position: absolute;
  right: clamp(24px, 4vw, 76px);
  bottom: clamp(54px, 8vh, 92px);
  z-index: 3;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 40px;
  align-items: stretch;
  width: 224px;
  min-height: 100px;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(18, 63, 133, 0.92), rgba(23, 159, 150, 0.82)),
    url('/subpages/service-main-vietnam.jpg') center / cover no-repeat;
  color: #ffffff;
  box-shadow: 0 22px 44px rgba(3, 15, 34, 0.28);

  @media (max-width: 920px) {
    display: none;
  }
`;

const VnQuickCopy = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  padding: 14px 18px 13px;
`;

const VnQuickTitle = styled.strong`
  font-size: 1.12rem;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
`;

const VnQuickText = styled.span`
  font-size: 0.84rem;
  font-weight: 800;
`;

const VnQuickArrow = styled.span`
  display: grid;
  place-items: center;
  background: #ffffff;
  color: ${palette.blue};
  font-size: 1.62rem;
  font-weight: 300;
`;

const HeroScroll = styled.span`
  position: absolute;
  left: 50%;
  bottom: 38px;
  color: rgba(24, 72, 132, 0.76);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: translateX(-50%);
  animation: scrollPulse 1.55s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -48px;
    width: 1px;
    height: 38px;
    background: rgba(24, 72, 132, 0.38);
    transform: translateX(-50%);
  }

  @media (max-width: 920px) {
    display: none;
  }

  @keyframes scrollPulse {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.72;
    }

    50% {
      transform: translate(-50%, 10px);
      opacity: 1;
    }
  }
`;

const VnHomeSectionBase = styled.section`
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::after {
    content: '';
    position: absolute;
    right: -110px;
    bottom: clamp(18px, 4vw, 58px);
    width: min(46vw, 620px);
    aspect-ratio: 1;
    pointer-events: none;
    background: url('/brand-mark-shinhan.png') center / contain no-repeat;
    opacity: 0.045;
    transform: rotate(-10deg);
  }

  @media (max-width: 860px) {
    &::after {
      width: 82vw;
      right: -42vw;
      bottom: 18px;
      background-size: 84%;
      opacity: 0.035;
    }
  }
`;

const VnHomePracticeSection = styled(VnHomeSectionBase)`
  min-height: 760px;
  padding: 78px 0 96px;
  background:
    linear-gradient(126deg, rgba(238, 246, 252, 0.88) 0%, rgba(255, 255, 255, 0.6) 44%, rgba(232, 243, 247, 0.64) 100%),
    linear-gradient(180deg, #fbfdff 0%, #f6f9fc 100%);

  @media (max-width: 860px) {
    min-height: auto;
    padding: 82px 0 76px;
  }
`;

const VnHomePracticeInner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(360px, 0.82fr);
  gap: clamp(34px, 5vw, 86px);
  align-items: center;
  width: min(100% - 72px, 1440px);
  min-height: 560px;
  margin: 0 auto;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    align-items: start;
    min-height: 0;
  }

  @media (max-width: 768px) {
    width: calc(100% - 28px);
  }
`;

const VnHomePracticeCopy = styled.div`
  align-self: start;
  display: grid;
  gap: 38px;
`;

const VnHomeTitleBlock = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: 820px;
  min-height: clamp(76px, 9vw, 128px);
  overflow: visible;
`;

const VnHomeTitleGhost = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  color: rgba(15, 35, 62, 0.062);
  font-size: clamp(2.45rem, 5.2vw, 5.1rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;

  @media (max-width: 640px) {
    font-size: clamp(2.2rem, 10.6vw, 3.9rem);
    letter-spacing: 0.04em;
  }
`;

const VnHomeSectionTitle = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(2.05rem, 4.6vw, 4.35rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.06em;
`;

const VnHomeCountLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  color: #2c2e33;
  margin: clamp(42px, 6vw, 92px) 0 0 clamp(92px, 13vw, 220px);

  @media (max-width: 700px) {
    flex-wrap: wrap;
    gap: 10px 16px;
    margin-left: 0;
  }
`;

const VnHomeCountValue = styled.strong`
  display: inline-flex;
  align-items: flex-start;
  color: ${palette.blue};
  font-size: clamp(6.8rem, 14vw, 12.8rem);
  font-weight: 900;
  line-height: 0.78;
  letter-spacing: 0;
  text-shadow:
    0 16px 34px rgba(20, 41, 75, 0.1),
    0 2px 0 rgba(255, 255, 255, 0.82);
`;

const VnHomeCountLabelStack = styled.span`
  display: inline-grid;
  gap: 10px;
  padding-bottom: 0.22em;
`;

const VnHomeCountLabel = styled.span`
  position: relative;
  display: inline-flex;
  color: #30343a;
  font-size: clamp(1.1rem, 1.9vw, 1.62rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: -8px;
    bottom: 0;
    height: 10px;
    background: linear-gradient(90deg, rgba(28, 90, 169, 0.72), rgba(33, 101, 193, 0.28));
    z-index: -1;
  }
`;

const VnHomeSummary = styled.p`
  max-width: 620px;
  margin: 0 0 0 clamp(92px, 13vw, 220px);
  color: #52697f;
  font-size: clamp(1.14rem, 1.35vw, 1.28rem);
  line-height: 1.78;
  word-break: keep-all;

  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

const VnHomePracticeList = styled.div`
  position: relative;
  display: grid;
  padding: 10px 0;

  &::before {
    content: '';
    position: absolute;
    left: -32px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, rgba(15, 43, 89, 0), rgba(15, 43, 89, 0.16), rgba(15, 43, 89, 0));
  }

  @media (max-width: 980px) {
    &::before {
      display: none;
    }
  }
`;

const VnHomePracticeLink = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  min-height: 92px;
  padding: 22px 0 22px 24px;
  border-bottom: 1px solid rgba(15, 43, 89, 0.11);
  text-decoration: none;
  overflow: hidden;
  transition:
    padding-left 0.24s ease,
    background 0.24s ease,
    border-color 0.24s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 25%;
    bottom: 25%;
    width: 2px;
    background: rgba(28, 90, 169, 0.18);
    transform: scaleY(0.72);
    transform-origin: center;
    transition:
      background 0.24s ease,
      transform 0.24s ease;
  }

  &:hover {
    padding-left: 34px;
    background: linear-gradient(90deg, rgba(33, 101, 193, 0.06), rgba(33, 101, 193, 0));
    border-color: rgba(28, 90, 169, 0.42);
  }

  &:hover::before {
    background: ${palette.blue};
    transform: scaleY(1);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
    min-height: 0;
    padding-left: 18px;

    &:hover {
      padding-left: 24px;
    }
  }
`;

const VnHomePracticeLinkCopy = styled.span`
  display: grid;
  gap: 8px;
  min-width: 0;
`;

const VnHomePracticeTitle = styled.strong`
  color: ${palette.blue};
  font-size: clamp(1.62rem, 2.6vw, 2.38rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.02em;
`;

const VnHomePracticeMeta = styled.span`
  color: #687782;
  font-size: clamp(1.06rem, 1.2vw, 1.18rem);
  font-weight: 800;
  line-height: 1.38;
`;

const VnHomePracticeArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(15, 43, 89, 0.12);
  border-radius: 50%;
  color: ${palette.blue};
  font-size: 1.08rem;
  font-weight: 800;
  transition:
    transform 0.24s ease,
    border-color 0.24s ease,
    background 0.24s ease;

  a:hover & {
    transform: translateX(5px);
    border-color: rgba(28, 90, 169, 0.34);
    background: rgba(255, 255, 255, 0.74);
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const VnHomeUpdatesSection = styled(VnHomeSectionBase)`
  padding: 76px 0 78px;
  background:
    linear-gradient(132deg, rgba(237, 245, 251, 0.82) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(242, 249, 247, 0.76) 100%),
    linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);

  &::after {
    top: 42px;
    bottom: auto;
    transform: rotate(8deg);
  }
`;

const VnHomeUpdatesInner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 34px;
  width: min(100% - 72px, 1440px);
  margin: 0 auto;

  @media (max-width: 768px) {
    width: calc(100% - 28px);
  }
`;

const VnHomeUpdatesHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 24px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const VnHomeViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 10px;
  color: ${palette.blue};
  font-size: 1.06rem;
  font-weight: 800;
  text-decoration: none;

  &::after {
    content: '';
    width: 36px;
    height: 1px;
    background: currentColor;
  }
`;

const VnHomeNewsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(28px, 4vw, 58px);
  padding: 22px clamp(22px, 3vw, 54px) 34px;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
    padding-inline: 0;
  }
`;

const VnHomeNewsCard = styled(Link)`
  position: relative;
  min-height: 530px;
  color: #30343a;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 178px;
    background:
      linear-gradient(90deg, color-mix(in srgb, ${palette.blue} 70%, #ffffff), rgba(255, 255, 255, 0.08)),
      var(--visual) center / cover no-repeat;
    filter: saturate(0.9);
  }

  &:hover article {
    transform: translateY(-7px);
    border-color: color-mix(in srgb, ${palette.blue} 76%, #ffffff);
    box-shadow: 0 34px 70px rgba(15, 43, 89, 0.15);
  }
`;

const VnHomeNewsPanel = styled.article`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: auto minmax(108px, auto) minmax(64px, 1fr) auto;
  gap: 18px;
  min-height: 398px;
  margin: 96px 30px 0;
  padding: 42px 42px 30px;
  border: 1px solid rgba(15, 43, 89, 0.08);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(247, 251, 253, 0.9)),
    #ffffff;
  box-shadow: 0 24px 58px rgba(15, 43, 89, 0.08);
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 44px;
    height: 44px;
    border-right: 2px solid ${palette.blue};
    border-bottom: 2px solid ${palette.blue};
  }

  @media (max-width: 640px) {
    margin-inline: 16px;
    padding: 34px 28px 26px;
  }
`;

const VnHomeNewsMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: ${palette.blue};
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.02em;

  time {
    color: #8a949d;
    font-size: 0.96rem;
    font-weight: 800;
    white-space: nowrap;
  }
`;

const VnHomeNewsTitle = styled.strong`
  display: -webkit-box;
  color: #33373c;
  font-size: clamp(1.34rem, 1.72vw, 1.76rem);
  font-weight: 850;
  line-height: 1.36;
  letter-spacing: -0.035em;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const VnHomeNewsText = styled.p`
  display: -webkit-box;
  margin: 0;
  color: #637180;
  font-size: 0.98rem;
  line-height: 1.58;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const VnHomeNewsFoot = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(28, 90, 169, 0.26);
  color: #8a949d;
  font-size: 0.98rem;
  font-weight: 800;

  &::after {
    content: '→';
    color: ${palette.blue};
    font-size: 1.7rem;
    line-height: 1;
  }
`;

const Band = styled.section<{ $tone?: 'soft' }>`
  display: grid;
  gap: clamp(28px, 4vw, 48px);
  padding: clamp(72px, 8vw, 116px) max(20px, calc((100vw - 1180px) / 2));
  background: ${({ $tone }) => ($tone === 'soft' ? 'linear-gradient(180deg, #f5f8fc, #ffffff)' : '#ffffff')};
`;

const VnDetailSection = styled.section<{ $tone?: 'soft' }>`
  font-family: "NanumSquare", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  padding: clamp(72px, 8vw, 118px) max(20px, calc((100vw - 1280px) / 2));
  border-top: 1px solid ${({ $tone }) => ($tone === 'soft' ? '#d8dee8' : 'transparent')};
  background: ${({ $tone }) => ($tone === 'soft' ? '#f6f7f9' : '#ffffff')};
`;

const VnDetailInner = styled.div`
  display: grid;
  gap: clamp(32px, 4.6vw, 62px);
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`;

const VnDetailIntroStack = styled.div`
  display: grid;
  gap: clamp(24px, 3.6vw, 44px);
`;

const VnDetailIntroHeading = styled.div`
  display: grid;
  gap: clamp(8px, 1vw, 12px);
  justify-items: start;
  min-width: 0;
`;

const VnDetailEyebrow = styled.span`
  display: block;
  margin-left: clamp(4px, 0.5vw, 8px);
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
`;

const VnDetailTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.92rem, 3vw, 3.18rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;
  word-break: keep-all;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const VnDetailSummary = styled.p`
  max-width: 1240px;
  margin: 0;
  color: #1f2937;
  font-size: clamp(1.08rem, 1.48vw, 1.42rem);
  font-weight: 700;
  line-height: 1.42;
  letter-spacing: -0.016em;
  line-break: strict;
  overflow-wrap: break-word;
  text-wrap: pretty;
  white-space: pre-line;
  word-break: keep-all;

  @supports not (text-wrap: pretty) {
    text-wrap: balance;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    font-size: 1.08rem;
    letter-spacing: -0.018em;
    line-height: 1.5;
  }
`;

const VnOverviewBlock = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 0.18fr) minmax(0, 1fr);
  gap: clamp(20px, 4vw, 56px);
  padding: clamp(28px, 3.5vw, 42px) 0;
  border-top: 2px solid ${palette.blue};
  border-bottom: 1px solid #d8dee8;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const VnOverviewTitle = styled.h2`
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.02rem, 1.45vw, 1.22rem);
  font-weight: 700;
  line-height: 1.28;
  letter-spacing: -0.025em;
`;

const VnOverviewText = styled.p`
  max-width: 940px;
  margin: 0;
  color: #475569;
  font-size: clamp(1.02rem, 1.3vw, 1.15rem);
  line-height: 1.82;
  word-break: keep-all;
`;

const VnDetailSectionHead = styled.div`
  display: grid;
  gap: 12px;
`;

const VnDetailSectionTitle = styled.h2`
  max-width: 860px;
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.92rem, 3vw, 3.18rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.05em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const VnDocumentStack = styled.div`
  display: grid;
  border-top: 2px solid ${palette.blue};
`;

const VnDocumentSectionCard = styled.article`
  display: grid;
  grid-template-columns: minmax(120px, 0.18fr) minmax(0, 1fr);
  gap: clamp(20px, 4vw, 56px);
  padding: clamp(28px, 3.4vw, 46px) 0;
  border-bottom: 1px solid #dbe0e8;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const VnDocumentSectionTitle = styled.h3`
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(1.02rem, 1.48vw, 1.22rem);
  font-weight: 700;
  line-height: 1.34;
  letter-spacing: -0.025em;
`;

const VnDetailList = styled.ul`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    margin: 0;
    padding-left: 18px;
    color: #475569;
    font-size: 1.06rem;
    line-height: 1.78;
    word-break: keep-all;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.82em;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: ${palette.blue};
  }
`;

const VnDetailMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const VnDetailMetaItem = styled.div`
  display: grid;
  gap: 8px;
  min-height: 112px;
  align-content: center;
  padding: 22px 24px;
  border: 1px solid #d8dee8;
  background: #ffffff;

  span {
    color: ${palette.blue};
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  strong {
    color: #172337;
    font-size: clamp(1.08rem, 1.4vw, 1.28rem);
    font-weight: 800;
    line-height: 1.3;
  }
`;

const VnNewsListSection = styled.section`
  padding: clamp(72px, 8vw, 118px) max(20px, calc((100vw - 1360px) / 2));
  background: #ffffff;
`;

const VnNewsListInner = styled.div`
  display: grid;
  gap: clamp(28px, 4vw, 46px);
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
`;

const VnNewsListHead = styled.div`
  display: grid;
  gap: 12px;
  max-width: 920px;
`;

const VnNewsListTitle = styled.h2`
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.04em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const VnNewsListLead = styled.p`
  max-width: 760px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.25vw, 1.16rem);
  line-height: 1.78;
  word-break: keep-all;
  overflow-wrap: normal;
  text-wrap: pretty;
`;

const VnContactSection = styled.section`
  padding: clamp(92px, 10vw, 156px) max(20px, calc((100vw - 1320px) / 2));
  background: #ffffff;
`;

const VnContactInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(44px, 5.6vw, 82px);
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
`;

const VnContactIntro = styled.div`
  display: grid;
  gap: 18px;
  max-width: 1160px;
`;

const VnContactTitle = styled.h1`
  max-width: 1160px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.42rem, 4.9vw, 4.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const VnContactLead = styled.p`
  max-width: 980px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.12rem, 1.38vw, 1.28rem);
  font-weight: 400;
  line-height: 1.82;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const VnContactGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.42fr) minmax(0, 0.58fr);
  gap: clamp(24px, 4vw, 58px);
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const VnInfoPanel = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: clamp(24px, 3vw, 40px) 0;
  border-top: 1px solid #d8dee8;
`;

const VnPanelTitle = styled.h2`
  max-width: 980px;
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.03em;
  text-wrap: balance;
`;

const VnInfoActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 14px;
`;

const VnInfoActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border: 1px solid rgba(18, 78, 160, 0.16);
  background: rgba(255, 255, 255, 0.94);
  color: #1a4f9a;
  font-size: 0.94rem;
  font-weight: 800;
`;

const VnInfoList = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 8px;
`;

const VnInfoItem = styled.div`
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  padding: 16px 0;
  border-bottom: 1px solid #d8dee8;
  background: transparent;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const VnInfoLabel = styled.span`
  color: ${palette.blue};
  font-size: 0.84rem;
  font-weight: 800;
`;

const VnInfoValue = styled.span`
  color: #496582;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.56;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const VnInfoValueGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const VnInfoValueLink = styled.a`
  color: #123f85;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.56;
  word-break: normal;
  overflow-wrap: anywhere;
`;

const VnInquiryPanel = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: clamp(28px, 3vw, 40px);
  border: 1px solid #d8dee8;
  border-top: 1px solid #d8dee8;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(248, 251, 255, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);
`;

const VnInquiryHeader = styled.div`
  display: grid;
  gap: 8px;
`;

const VnInquiryTitle = styled.h3`
  max-width: 980px;
  margin: 0;
  color: #0f3f84;
  font-size: clamp(1.36rem, 1.9vw, 1.74rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.03em;
  text-wrap: balance;
`;

const VnInquiryText = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.18vw, 1.14rem);
  font-weight: 400;
  line-height: 1.84;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const VnInquiryForm = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const VnFieldGroup = styled.div<{ $wide?: boolean }>`
  display: grid;
  gap: 8px;
  grid-column: ${({ $wide }) => ($wide ? '1 / -1' : 'auto')};
`;

const VnFieldLabel = styled.label`
  color: #112f56;
  font-size: 0.98rem;
  font-weight: 800;
`;

const VnInputBase = styled.input`
  width: 100%;
  min-height: 50px;
  padding: 0 16px;
  border: 1px solid rgba(22, 77, 148, 0.18);
  border-radius: 0;
  background: #ffffff;
  color: #243f5f;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #8996a7;
  }

  &:focus {
    border-color: rgba(26, 94, 181, 0.52);
    box-shadow: 0 0 0 3px rgba(38, 113, 214, 0.1);
  }
`;

const VnTextInput = styled(VnInputBase)``;

const VnTextArea = styled.textarea`
  width: 100%;
  min-height: 152px;
  padding: 16px;
  border: 1px solid rgba(22, 77, 148, 0.18);
  border-radius: 0;
  background: #ffffff;
  color: #243f5f;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: #8996a7;
  }

  &:focus {
    border-color: rgba(26, 94, 181, 0.52);
    box-shadow: 0 0 0 3px rgba(38, 113, 214, 0.1);
  }
`;

const VnConsentLabel = styled.label`
  display: inline-flex;
  grid-column: 1 / -1;
  align-items: center;
  gap: 8px;
  color: #4d6076;
  font-size: 0.98rem;

  input {
    width: 15px;
    height: 15px;
    accent-color: #2467c3;
  }
`;

const VnSubmitButton = styled.button`
  grid-column: 1 / -1;
  justify-self: stretch;
  min-height: 56px;
  border: 0;
  border-radius: 0;
  background: #2e65ae;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    background 180ms ease,
    transform 180ms ease;

  &:hover,
  &:focus-visible {
    background: #1e559d;
    transform: translateY(-1px);
    outline: none;
  }
`;

const SectionHeroWrap = styled.section<{ $image: string | null }>`
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  min-height: clamp(430px, 52vh, 620px);
  margin-top: 0;
  overflow: hidden;
  padding: calc(82px + 38px + clamp(18px, 3vw, 34px)) 24px clamp(54px, 7vw, 86px);
  background: #d8e0e8;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background: ${({ $image }) => ($image ? `url(${$image}) center 50% / cover no-repeat` : 'linear-gradient(135deg, #f4f7fb 0%, #d8e3f1 100%)')};
    filter: brightness(1.08) contrast(0.98) saturate(1.04);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(5, 16, 34, 0.48) 0%, rgba(5, 16, 34, 0.28) 34%, rgba(5, 16, 34, 0.2) 100%),
      linear-gradient(90deg, rgba(5, 16, 34, 0.38) 0%, rgba(5, 16, 34, 0.14) 48%, rgba(5, 16, 34, 0.1) 100%);
  }

  @media (max-width: 880px) {
    min-height: clamp(340px, 50vh, 480px);
    padding-top: clamp(96px, 18vw, 136px);
    padding-bottom: clamp(48px, 10vw, 70px);
  }
`;

const SectionHeroCopy = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 14px;
  width: min(920px, 100%);
  color: #ffffff;
  text-align: center;
`;

const SectionHeroKicker = styled.p`
  margin: 0;
  color: rgba(232, 242, 255, 0.96);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow: 0 14px 34px rgba(3, 15, 34, 0.3);
`;

const SectionHeroTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.28rem, 4.95vw, 4.55rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: 0;
  word-break: keep-all;
  text-wrap: balance;
  text-shadow:
    0 14px 30px rgba(4, 12, 24, 0.24),
    0 2px 8px rgba(4, 12, 24, 0.22);
`;

const SectionHeroLead = styled.p`
  max-width: 760px;
  margin: 0 auto;
  color: rgba(232, 242, 255, 0.92);
  font-size: clamp(1rem, 1.4vw, 1.14rem);
  font-weight: 520;
  line-height: 1.72;
  text-shadow: 0 12px 28px rgba(3, 15, 34, 0.28);
`;

const SubnavBand = styled.section`
  background: #ffffff;
  border-bottom: 1px solid #e4e7ec;
  overflow: hidden;

  @media (max-width: 760px) {
    background: #f7f9fc;
  }
`;

const SubnavInner = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: calc(100% - 48px);
  min-height: 66px;
  margin: 0 auto;
  border-left: 1px solid #e4e7ec;
  border-right: 1px solid #e4e7ec;
  overflow: hidden;

  @media (max-width: 760px) {
    width: calc(100% - 28px);
    min-height: 48px;
    padding: 8px 0;
    border-left: 0;
    border-right: 0;
    overflow-x: auto;
  }
`;

const SubnavHome = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  flex: 0 0 66px;
  border-right: 1px solid #e4e7ec;
  color: #303844;

  &::before {
    content: '';
    width: 18px;
    height: 18px;
    background: currentColor;
    clip-path: polygon(50% 8%, 92% 42%, 82% 42%, 82% 90%, 60% 90%, 60% 62%, 40% 62%, 40% 90%, 18% 90%, 18% 42%, 8% 42%);
  }

  @media (max-width: 760px) {
    width: 38px;
    height: 34px;
    flex-basis: 38px;
    border: 1px solid #d9e0eb;
    border-radius: 999px;
    background: #ffffff;

    &::before {
      width: 15px;
      height: 15px;
    }
  }
`;

const SectionSubnav = styled.nav`
  display: flex;
  align-items: stretch;
  flex: 1;
  justify-content: flex-end;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 760px) {
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-left: 8px;
  }
`;

const SectionSubnavLink = styled(Link)`
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  padding: 0 clamp(18px, 2vw, 30px);
  border-right: 1px solid #e4e7ec;
  color: #4f5661;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0;
  white-space: nowrap;
  word-break: keep-all;

  &:first-of-type {
    border-left: 1px solid #e4e7ec;
  }

  &[data-active='true'] {
    color: #121c2b;
  }

  &[data-active='true']::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background: #121c2b;
  }

  &:hover {
    color: #121c2b;
  }

  @media (max-width: 760px) {
    min-height: 34px;
    min-width: 0;
    padding: 0 14px;
    border: 1px solid #d9e0eb;
    border-radius: 999px;
    background: #ffffff;
    color: #526071;
    font-size: 0.82rem;
    font-weight: 800;

    &:first-of-type {
      border-left: 1px solid #d9e0eb;
    }

    &[data-active='true'] {
      background: ${palette.blueDeep};
      border-color: ${palette.blueDeep};
      color: #ffffff;
      box-shadow: 0 8px 16px rgba(18, 63, 133, 0.16);
    }

    &[data-active='true']::after {
      content: none;
    }
  }
`;

const VnOverviewStack = styled.div`
  display: grid;
  gap: clamp(70px, 8vw, 112px);
`;

const VnHeroStatement = styled.section`
  display: grid;
  gap: clamp(30px, 4vw, 54px);
`;

const VnHeroHeading = styled.div`
  display: grid;
  gap: 12px;
`;

const VnEditorialKicker = styled.span<{ $light?: boolean }>`
  display: block;
  margin: 0 0 10px clamp(4px, 0.5vw, 8px);
  color: ${({ $light }) => ($light ? 'rgba(221, 232, 247, 0.72)' : palette.blue)};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
`;

const VnEditorialTitle = styled.h2`
  max-width: 1040px;
  margin: 0;
  color: ${palette.blue};
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: 0;
  text-wrap: balance;
`;

const VnLeadGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(280px, 0.42fr);
  gap: clamp(28px, 5vw, 74px);
  align-items: end;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const VnBodyStack = styled.div`
  display: grid;
  gap: 18px;
`;

const VnEditorialLead = styled.p`
  max-width: 760px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.25vw, 1.16rem);
  line-height: 1.78;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const VnEditorialBody = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1rem, 1.08vw, 1.06rem);
  line-height: 1.78;
`;

const VnFactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid #d5dbe4;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 252, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);
  overflow: hidden;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const VnFact = styled.div`
  position: relative;
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 136px;
  padding: 24px 24px 22px;
  border-right: 1px solid #dbe0e8;

  &::before {
    content: '';
    width: 34px;
    height: 3px;
    background: linear-gradient(90deg, #1d5fb6, #1aa398);
  }

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 640px) {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const VnFactValue = styled.strong`
  color: ${palette.blue};
  font-size: clamp(1.26rem, 1.7vw, 1.68rem);
  font-weight: 800;
  line-height: 1.08;
`;

const VnFactLabel = styled.span`
  color: #687385;
  font-size: 0.98rem;
  line-height: 1.58;
  word-break: keep-all;
`;

const VnNavyPanel = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 0.48fr) minmax(0, 0.52fr);
  gap: clamp(36px, 5vw, 78px);
  padding: clamp(42px, 5vw, 72px);
  background: linear-gradient(180deg, #0a1424 0%, #121f33 100%);
  color: #ffffff;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const VnNavyTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.72rem, 3vw, 2.82rem);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: 0;
`;

const VnRule = styled.div<{ $light?: boolean }>`
  width: 100%;
  height: 1px;
  margin: 24px 0;
  background: ${({ $light }) => ($light ? 'rgba(226, 231, 238, 0.18)' : '#d5dbe4')};
`;

const VnNavyBody = styled.p`
  margin: 0;
  color: rgba(230, 238, 250, 0.82);
  font-size: clamp(1rem, 1.08vw, 1.06rem);
  line-height: 1.78;
`;

const VnValueList = styled.div`
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(226, 231, 238, 0.16);
`;

const VnValueRow = styled.article`
  display: grid;
  gap: 8px;
  padding: 22px 0;
  border-bottom: 1px solid rgba(226, 231, 238, 0.16);
`;

const VnValueTitle = styled.strong`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 900;
`;

const VnValueBody = styled.p`
  margin: 0;
  color: rgba(230, 238, 250, 0.8);
  line-height: 1.72;
`;

const VnServiceColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const VnServiceColumn = styled.article`
  display: grid;
  align-content: start;
  gap: 16px;
  min-height: 300px;
  padding: clamp(26px, 3vw, 38px);
  border: 1px solid #d8e2ef;
  background: #ffffff;
  box-shadow: 0 20px 42px rgba(16, 54, 112, 0.08);
`;

const VnServiceIndex = styled.span`
  color: ${palette.blue};
  font-size: 0.82rem;
  font-weight: 900;
`;

const VnServiceTitle = styled.h3`
  margin: 0;
  color: #172337;
  font-size: clamp(1.2rem, 1.6vw, 1.48rem);
  font-weight: 850;
  line-height: 1.26;
`;

const VnServiceDescription = styled.p`
  margin: 0;
  color: #4d5a6c;
  line-height: 1.72;
`;

const VnServiceList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const VnServiceItem = styled.li`
  color: #4d5a6c;
  line-height: 1.58;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 8px;
    border-radius: 999px;
    background: ${palette.blue};
    vertical-align: 0.12em;
  }
`;

const VnHistoryStack = styled.div`
  display: grid;
  gap: clamp(70px, 8vw, 112px);
`;

const VnHistoryIntro = styled.section`
  display: grid;
  grid-template-columns: minmax(320px, 0.34fr) minmax(0, 0.66fr);
  gap: clamp(42px, 6.2vw, 104px);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const VnHistoryFigure = styled.figure`
  margin: 0;
`;

const VnHistoryImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const VnHistoryArticle = styled.article`
  display: grid;
  gap: clamp(28px, 4vw, 48px);
`;

const VnHistoryPanel = styled.section`
  display: grid;
  gap: clamp(38px, 5vw, 64px);
`;

const VnSectionIntro = styled.div`
  display: grid;
  gap: 0;
`;

const VnSectionLargeTitle = styled.h3`
  max-width: 980px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.12rem, 3.65vw, 3.48rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: 0;
`;

const VnMilestoneShowcase = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 0.34fr) minmax(0, 0.66fr);
  gap: clamp(22px, 3vw, 34px);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const VnFeaturedMilestone = styled.article`
  position: relative;
  display: grid;
  align-content: end;
  min-height: clamp(300px, 28vw, 440px);
  padding: clamp(28px, 3.4vw, 46px);
  overflow: hidden;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(8, 31, 69, 0.96) 0%, rgba(18, 75, 151, 0.94) 62%, rgba(23, 159, 150, 0.84) 100%);
  box-shadow: 0 26px 54px rgba(10, 38, 84, 0.18);

  &::before {
    content: '';
    position: absolute;
    inset: 22px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    pointer-events: none;
  }
`;

const VnFeaturedYear = styled.span`
  display: block;
  margin: 0 0 14px;
  color: rgba(230, 242, 255, 0.82);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const VnFeaturedTitle = styled.h4`
  position: relative;
  z-index: 1;
  max-width: 420px;
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.08rem, 3.2vw, 3.45rem);
  font-weight: 850;
  line-height: 1.08;
  letter-spacing: 0;
`;

const VnFeaturedBody = styled.p`
  position: relative;
  z-index: 1;
  max-width: 440px;
  margin: 18px 0 0;
  color: rgba(230, 242, 255, 0.84);
  font-size: clamp(0.98rem, 1.08vw, 1.06rem);
  line-height: 1.78;
`;

const VnMilestoneRail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const VnMilestoneCard = styled.article`
  display: grid;
  align-content: start;
  gap: 18px;
  min-height: 210px;
  padding: clamp(24px, 2.5vw, 32px);
  border: 1px solid #d8e2ef;
  background: #ffffff;
  box-shadow: 0 20px 42px rgba(16, 54, 112, 0.08);

  &::before {
    content: '';
    width: 38px;
    height: 38px;
    border: 8px solid rgba(31, 92, 178, 0.12);
    border-top-color: #1f5cb2;
    border-radius: 50%;
    background: #ffffff;
  }
`;

const VnMilestoneYear = styled.strong`
  color: ${palette.blue};
  font-size: clamp(1.48rem, 2vw, 2.05rem);
  font-weight: 850;
  line-height: 1;
`;

const VnMilestoneTitle = styled.h4`
  margin: 0;
  color: #172337;
  font-size: clamp(1.08rem, 1.3vw, 1.24rem);
  font-weight: 800;
  line-height: 1.38;
`;

const VnTimelineBoard = styled.div`
  display: grid;
  gap: clamp(22px, 3vw, 32px);
`;

const VnEraPanel = styled.section`
  display: grid;
  grid-template-columns: minmax(220px, 0.24fr) minmax(0, 0.76fr);
  min-height: 240px;
  border: 1px solid #d8e2ef;
  background: #ffffff;
  box-shadow: 0 22px 48px rgba(16, 54, 112, 0.07);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const VnEraHead = styled.div`
  position: relative;
  display: grid;
  align-content: space-between;
  gap: 26px;
  padding: clamp(26px, 3.2vw, 42px);
  overflow: hidden;
  color: #ffffff;
  background: linear-gradient(155deg, rgba(9, 37, 76, 0.98), rgba(18, 72, 142, 0.94)), #09254c;

  &::after {
    content: attr(data-index);
    position: absolute;
    right: -10px;
    bottom: -24px;
    color: rgba(255, 255, 255, 0.08);
    font-size: clamp(5.4rem, 9vw, 9.5rem);
    font-weight: 900;
    line-height: 1;
  }
`;

const VnEraTitle = styled.h4`
  position: relative;
  z-index: 1;
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.54rem, 2.25vw, 2.28rem);
  font-weight: 800;
  line-height: 1.14;
`;

const VnTimelineList = styled.div`
  position: relative;
  display: grid;
  padding: clamp(22px, 3vw, 38px) clamp(22px, 3.6vw, 48px);
  --timeline-year-width: clamp(70px, 8vw, 104px);
  --timeline-dot-column: 30px;
  --timeline-col-gap: clamp(14px, 2.4vw, 26px);
`;

const VnTimelineRow = styled.article`
  display: grid;
  grid-template-columns: var(--timeline-year-width) var(--timeline-dot-column) minmax(0, 1fr);
  column-gap: var(--timeline-col-gap);
  align-items: start;
  padding: 18px 0;
  border-bottom: 1px solid #edf1f7;

  &:last-of-type {
    border-bottom: 0;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const VnTimelineYear = styled.strong`
  color: #0f3f84;
  font-size: clamp(1.22rem, 1.7vw, 1.62rem);
  font-weight: 850;
  line-height: 1.12;
`;

const VnTimelineDot = styled.span`
  justify-self: center;
  width: 13px;
  height: 13px;
  margin-top: 0.42rem;
  border: 3px solid #ffffff;
  border-radius: 50%;
  background: #1f5cb2;
  box-shadow: 0 0 0 4px rgba(31, 92, 178, 0.12);

  @media (max-width: 640px) {
    display: none;
  }
`;

const VnEventList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #4d5a6c;
  font-size: clamp(0.98rem, 1.08vw, 1.06rem);
  line-height: 1.7;
`;

const VnMessageStack = styled.div`
  display: grid;
  gap: clamp(70px, 8vw, 112px);
`;

const VnMessageLayout = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 0.48fr) minmax(420px, 0.52fr);
  gap: clamp(42px, 5.8vw, 104px);
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const VnMessageArticle = styled.article`
  display: grid;
  gap: clamp(28px, 3.6vw, 46px);
`;

const VnMessageHeader = styled.div`
  display: grid;
  gap: 16px;
`;

const VnMessageTitle = styled.h2`
  position: relative;
  max-width: 760px;
  margin: 0;
  padding-bottom: 24px;
  color: #172337;
  font-size: clamp(2.08rem, 4vw, 3.32rem);
  font-weight: 850;
  line-height: 1.08;
  letter-spacing: 0;
  text-wrap: balance;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: clamp(96px, 12vw, 156px);
    height: 3px;
    background: linear-gradient(90deg, #0058a8 0%, rgba(0, 88, 168, 0.16) 100%);
  }
`;

const VnMessageLead = styled.p`
  margin: 0;
  color: #172337;
  font-size: clamp(1.12rem, 1.6vw, 1.28rem);
  font-weight: 800;
  line-height: 1.68;
`;

const VnMessageBody = styled.p`
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1rem, 1.18vw, 1.1rem);
  line-height: 1.84;
`;

const VnClosing = styled.div`
  padding-top: clamp(24px, 4vw, 44px);
  border-top: 1px solid #d5e0ef;
`;

const VnThanks = styled.p`
  margin: 0;
  color: #172337;
  font-size: clamp(1.52rem, 2.4vw, 2.02rem);
  font-weight: 800;
  line-height: 1.18;
`;

const VnCeoFigure = styled.figure`
  width: 100%;
  margin: 0;
  justify-self: end;
  padding: clamp(14px, 1.8vw, 26px);
  background: linear-gradient(135deg, rgba(0, 88, 168, 0.08), rgba(18, 63, 133, 0.18));
  box-shadow: 0 28px 68px rgba(23, 45, 78, 0.14);

  @media (max-width: 980px) {
    justify-self: stretch;
  }
`;

const VnCeoImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1.02 / 1;
  object-fit: cover;
  object-position: center top;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
`;

const VnLegacyBand = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

const VnLegacyStatement = styled.div`
  position: relative;
  padding: clamp(72px, 8vw, 112px) 0 0;
  border-top: 1px solid rgba(15, 43, 89, 0.08);
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -52px;
    width: 1px;
    height: 52px;
    background: linear-gradient(180deg, transparent, rgba(0, 88, 168, 0.28));
  }
`;

const VnLegacyText = styled.p`
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 16px;
  margin: 0;
  padding-bottom: 28px;
  color: #172337;
  line-height: 1.08;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: clamp(92px, 11vw, 170px);
    height: 2px;
    background: ${palette.blueDeep};
    transform: translateX(-50%);
  }
`;

const VnLegacyMark = styled.img`
  width: clamp(42px, 4.4vw, 62px);
  height: auto;
  align-self: center;
`;

const VnLegacyEstablished = styled.span`
  color: ${palette.blueDeep};
  font-size: 1.04rem;
  font-style: italic;
  font-weight: 700;
`;

const VnLegacyName = styled.span`
  color: ${palette.blueDeep};
  font-family: 'Times New Roman', Times, serif;
  font-size: clamp(1.42rem, 3vw, 2.72rem);
  font-weight: 700;
  letter-spacing: 0;
`;

const DirectionsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.82fr) minmax(0, 1.18fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const LocationInfoPanel = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(24px, 2.6vw, 34px) 0;
  border-top: 1px solid #d8dee8;
`;

const LocationPanelTitle = styled.h2`
  margin: 0;
  color: #172337;
  font-size: clamp(1.72rem, 3vw, 2.82rem);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: 0;
`;

const InfoRows = styled.div`
  display: grid;
  gap: 10px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #d8dee8;
  background: transparent;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const InfoLabel = styled.span`
  color: ${palette.blue};
  font-size: 0.82rem;
  font-weight: 800;
`;

const InfoValue = styled.span`
  color: #496582;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.56;
  word-break: keep-all;
  overflow-wrap: normal;
`;

const InfoValueLink = styled.a`
  color: ${palette.blue};
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.56;
  word-break: normal;
  overflow-wrap: anywhere;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

const PrimaryMapLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid rgba(15, 63, 132, 0.32);
  background: linear-gradient(180deg, #1f65c3, #184f9f);
  color: #ffffff;
  font-size: 0.94rem;
  font-weight: 800;
`;

const MapPanel = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(24px, 2.6vw, 34px) 0;
  border-top: 1px solid #d8dee8;
  background: transparent;
`;

const MapFrame = styled.div`
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  border: 1px solid rgba(19, 75, 154, 0.14);
  border-radius: 16px;
  background: #edf4ff;

  iframe {
    display: block;
    width: 100%;
    height: 560px;
    border: 0;
  }

  @media (max-width: 1024px) {
    min-height: 480px;

    iframe {
      height: 480px;
    }
  }

  @media (max-width: 768px) {
    min-height: 360px;

    iframe {
      height: 360px;
    }
  }
`;

const VnFooter = styled.footer`
  padding: 36px max(20px, calc((100vw - 1180px) / 2));
  border-top: 1px solid rgba(18, 63, 133, 0.12);
  background: #071a38;
  color: #ffffff;
`;

const FooterInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

const FooterBrand = styled.div`
  display: grid;
  gap: 8px;
  max-width: 520px;

  span {
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.62;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  justify-content: flex-end;
  gap: 12px 18px;

  a {
    color: #ffffff;
    font-weight: 800;
  }
`;
