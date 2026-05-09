import { useEffect, useState, type MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';

import { getHeaderNavigation } from '../../../config/navigation';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

type SiteHeaderProps = {
  mobileMenuOpen: boolean;
  onOpenMobileMenu: () => void;
};

export function SiteHeader({ mobileMenuOpen, onOpenMobileMenu }: SiteHeaderProps) {
  const { language, setLanguage, t } = useI18n();
  const { pathname } = useLocation();
  const headerNavigation = getHeaderNavigation(language);
  const overHero = !pathname.startsWith('/admin');
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuSuppressed, setMegaMenuSuppressed] = useState(false);
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<string | null>(null);

  const isActive = (path?: string) => {
    if (!path) return false;
    return pathname === path;
  };

  const closeMegaMenu = () => {
    setActiveMegaMenuId(null);
    setMegaMenuSuppressed(true);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const openMegaMenu = (itemId: string, hasChildren: boolean) => {
    if (!hasChildren) {
      setActiveMegaMenuId(null);
      return;
    }

    setMegaMenuSuppressed(false);
    setActiveMegaMenuId(itemId);
  };

  const handlePrimaryNavClick = (event: MouseEvent<HTMLAnchorElement>, itemId: string, hasChildren: boolean) => {
    if (hasChildren) {
      event.preventDefault();
      setMegaMenuSuppressed(false);
      setActiveMegaMenuId((current) => (current === itemId ? null : itemId));
      return;
    }

    closeMegaMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollTop > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!megaMenuSuppressed) return;

    const timeoutId = window.setTimeout(() => {
      setMegaMenuSuppressed(false);
    }, 260);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [megaMenuSuppressed, pathname]);

  return (
    <S.Header $overHero={overHero} $scrolled={isScrolled} $megaMenuOpen={Boolean(activeMegaMenuId)} onMouseLeave={() => setActiveMegaMenuId(null)}>
      <S.HeaderInner data-mega-suppressed={megaMenuSuppressed ? 'true' : undefined}>
        <S.Brand to="/" aria-label={t('신한관세법인 홈', 'Shinhan Customs Service home')}>
          <S.HeaderLogoFrame>
            <S.HeaderLogoImage src="/brand-header-logo-blue-transparent.png" alt={t('신한관세법인 로고', 'Shinhan Customs Service logo')} data-logo-blue="true" />
            <S.HeaderLogoImage src="/brand-header-logo-transparent.png" alt="" aria-hidden="true" data-logo-light="true" />
          </S.HeaderLogoFrame>
        </S.Brand>

        <S.MenuArea>
          <S.Nav>
            {headerNavigation.map((item) => (
              <S.NavItem
                key={item.id}
                onMouseEnter={() => openMegaMenu(item.id, Boolean(item.children?.length))}
                onFocus={() => openMegaMenu(item.id, Boolean(item.children?.length))}
              >
                <S.NavLink
                  to={item.to ?? item.href ?? '/'}
                  hasChildren={Boolean(item.children?.length)}
                  data-active={isActive(item.to ?? item.href)}
                  onClick={(event) => handlePrimaryNavClick(event, item.id, Boolean(item.children?.length))}
                >
                  {item.label}
                </S.NavLink>
                {item.children && item.children.length > 0 ? (
                  <S.MegaMenu data-open={activeMegaMenuId === item.id ? 'true' : undefined}>
                    <S.MegaMenuInner>
                      <S.MegaMenuTitleBlock data-mega-title>
                        <S.MegaMenuKicker>SHINHAN</S.MegaMenuKicker>
                        <S.MegaMenuTitle>{item.label}</S.MegaMenuTitle>
                      </S.MegaMenuTitleBlock>
                      <S.MegaMenuLinks>
                        {item.children.map((child) =>
                          child.href ? (
                            <S.MegaMenuAnchor key={child.id} href={child.href} target="_blank" rel="noreferrer" data-mega-link onClick={closeMegaMenu}>
                              {child.label}
                            </S.MegaMenuAnchor>
                          ) : (
                            <S.MegaMenuLink key={child.id} to={child.to ?? '/'} data-mega-link onClick={closeMegaMenu}>
                              {child.label}
                            </S.MegaMenuLink>
                          ),
                        )}
                      </S.MegaMenuLinks>
                    </S.MegaMenuInner>
                  </S.MegaMenu>
                ) : null}
              </S.NavItem>
            ))}
          </S.Nav>
        </S.MenuArea>

        <S.HeaderRight>
          <S.HeaderTools>
            <S.ContactButton to="/contact">{t('Contact Us', 'Contact Us')}</S.ContactButton>
            <S.HeaderUtilityLinks>
              <S.HeaderUtilityLink to="/recruit">{t('채용', 'Recruit')}</S.HeaderUtilityLink>
              <S.HeaderUtilityButton type="button" onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>
                {language === 'ko' ? 'KOR' : 'ENG'}
              </S.HeaderUtilityButton>
              <S.HeaderUtilityIconLink to="/location" aria-label={t('찾아오시는 길', 'Directions')}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21c-2.5-3.2-6.5-7-6.5-11.2A6.5 6.5 0 0 1 12 3.3a6.5 6.5 0 0 1 6.5 6.5C18.5 14 14.5 17.8 12 21Z" />
                  <circle cx="12" cy="9.8" r="2.4" />
                </svg>
              </S.HeaderUtilityIconLink>
            </S.HeaderUtilityLinks>
            <S.MobileIconButton
              type="button"
              kind="menu"
              aria-label={t('메뉴', 'Menu')}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              aria-controls="site-mobile-menu"
              onClick={onOpenMobileMenu}
            />
          </S.HeaderTools>
        </S.HeaderRight>
      </S.HeaderInner>
    </S.Header>
  );
}
