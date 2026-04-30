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
  const overHero = pathname === '/';
  const [megaMenuSuppressed, setMegaMenuSuppressed] = useState(false);

  const isActive = (path?: string) => {
    if (!path) return false;
    return pathname === path;
  };

  const closeMegaMenu = () => {
    setMegaMenuSuppressed(true);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handlePrimaryNavClick = (event: MouseEvent<HTMLAnchorElement>, hasChildren: boolean) => {
    if (hasChildren) {
      event.preventDefault();
      return;
    }

    closeMegaMenu();
  };

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
    <S.Header $overHero={overHero}>
      <S.HeaderInner data-mega-suppressed={megaMenuSuppressed ? 'true' : undefined}>
        <S.Brand to="/" aria-label={t('신한관세법인 홈', 'Shinhan Customs Service home')}>
          <S.BrandMark aria-hidden="true">
            <S.BrandMarkImage src="/brand-mark.svg" alt="" />
          </S.BrandMark>
          <S.BrandText>
            <S.BrandTop>
              <S.BrandTopLine />
              <S.BrandEstablished>Established 1965</S.BrandEstablished>
            </S.BrandTop>
            <S.BrandTitle>SHINHAN</S.BrandTitle>
            <S.BrandSub>SHINHAN Customs Service Inc.</S.BrandSub>
          </S.BrandText>
        </S.Brand>

        <S.MenuArea>
          <S.Nav>
            {headerNavigation.map((item) => (
              <S.NavItem key={item.id}>
                <S.NavLink
                  to={item.to ?? item.href ?? '/'}
                  hasChildren={Boolean(item.children?.length)}
                  data-active={isActive(item.to ?? item.href)}
                  onClick={(event) => handlePrimaryNavClick(event, Boolean(item.children?.length))}
                >
                  {item.label}
                </S.NavLink>
                {item.children && item.children.length > 0 ? (
                  <S.MegaMenu>
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
