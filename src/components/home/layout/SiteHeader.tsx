import { useLocation } from 'react-router-dom';

import { getHeaderNavigation } from '../../../config/navigation';
import { useI18n } from '../../../i18n/useI18n';
import { BrandMarkGraphic } from '../BrandMarkGraphic';
import * as S from '../homeStyles';

type SiteHeaderProps = {
  onOpenMobileMenu: () => void;
};

export function SiteHeader({ onOpenMobileMenu }: SiteHeaderProps) {
  const { language, setLanguage, t } = useI18n();
  const { pathname } = useLocation();
  const headerNavigation = getHeaderNavigation(language);

  const isActive = (path?: string) => {
    if (!path) return false;
    return pathname === path;
  };

  return (
    <S.Header>
      <S.HeaderInner>
        <S.Brand to="/">
          <S.BrandMark aria-hidden="true">
            <BrandMarkGraphic alt={t('신한관세법인 로고', 'Shinhan Customs Service logo')} />
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

        <S.HeaderRight>
          <S.MenuArea>
            <S.Nav>
              {headerNavigation.map((item) => (
                <S.NavItem key={item.id}>
                  <S.NavLink to={item.to ?? item.href ?? '/'} hasChildren={false} data-active={isActive(item.to ?? item.href)}>
                    {item.label}
                  </S.NavLink>
                </S.NavItem>
              ))}
            </S.Nav>
          </S.MenuArea>

          <S.HeaderTools>
            <S.HeaderUtilityLinks>
              <S.HeaderUtilityLink to="/recruit">{t('채용', 'Recruit')}</S.HeaderUtilityLink>
              <S.HeaderUtilityButton type="button" onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>
                {language === 'ko' ? 'KOR' : 'ENG'}
              </S.HeaderUtilityButton>
              <S.HeaderUtilityIconLink to="/about/location" aria-label={t('찾아오시는 길', 'Directions')}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21c-2.5-3.2-6.5-7-6.5-11.2A6.5 6.5 0 0 1 12 3.3a6.5 6.5 0 0 1 6.5 6.5C18.5 14 14.5 17.8 12 21Z" />
                  <circle cx="12" cy="9.8" r="2.4" />
                </svg>
              </S.HeaderUtilityIconLink>
            </S.HeaderUtilityLinks>
            <S.ContactButton to="/contact">Contact Us</S.ContactButton>
            <S.MobileIconButton type="button" kind="menu" aria-label={t('메뉴', 'Menu')} onClick={onOpenMobileMenu} />
          </S.HeaderTools>
        </S.HeaderRight>
      </S.HeaderInner>
    </S.Header>
  );
}
