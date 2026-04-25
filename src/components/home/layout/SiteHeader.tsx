import { getHeaderNavigation } from '../../../config/navigation';
import type { NavItem } from '../../../types/site';
import { useI18n } from '../../../i18n/useI18n';
import { BrandMarkGraphic } from '../BrandMarkGraphic';
import * as S from '../homeStyles';

type SiteHeaderProps = {
  onOpenMobileMenu: () => void;
};

function renderDropdownItems(items: NavItem[]) {
  return items.map((child) => {
    const childTo = child.to ?? child.href ?? '/';

    if (!child.children?.length) {
      return (
        <S.NavDropdownLink key={child.id} to={childTo}>
          {child.label}
        </S.NavDropdownLink>
      );
    }

    return (
      <S.NavDropdownGroup key={child.id}>
        <S.NavDropdownGroupTitle>{child.label}</S.NavDropdownGroupTitle>
        <S.NavDropdownGroupList>
          {child.children.map((grandChild) => (
            <S.NavDropdownSubLink key={grandChild.id} to={grandChild.to ?? grandChild.href ?? '/'}>
              {grandChild.label}
            </S.NavDropdownSubLink>
          ))}
        </S.NavDropdownGroupList>
      </S.NavDropdownGroup>
    );
  });
}

export function SiteHeader({ onOpenMobileMenu }: SiteHeaderProps) {
  const { language, setLanguage, t } = useI18n();
  const headerNavigation = getHeaderNavigation(language);

  return (
    <S.Header>
      <S.HeaderInner>
        <S.Brand to="/">
          <S.BrandMark aria-hidden="true">
            <BrandMarkGraphic alt={t('신한관세법인 로고', 'Shinhan Customs Service logo')} />
          </S.BrandMark>
          <S.BrandText>
            <S.BrandTitle>SHINHAN</S.BrandTitle>
          </S.BrandText>
        </S.Brand>

        <S.HeaderRight>
          <S.MenuArea>
            <S.Nav>
              {headerNavigation.map((item) => (
                <S.NavItem key={item.id}>
                  <S.NavLink to={item.to ?? item.href ?? '/'} hasChildren={Boolean(item.children?.length)}>
                    {item.label}
                  </S.NavLink>
                  {item.children ? (
                    <S.NavDropdown className="nav-dropdown">
                      <S.NavDropdownList>{renderDropdownItems(item.children)}</S.NavDropdownList>
                    </S.NavDropdown>
                  ) : null}
                </S.NavItem>
              ))}
            </S.Nav>
          </S.MenuArea>

          <S.HeaderTools>
            <S.HeaderUtilityLinks>
              <S.HeaderUtilityButton type="button" onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>
                {language === 'ko' ? 'KOR' : 'ENG'}
              </S.HeaderUtilityButton>
              <S.HeaderUtilityLink to="/about/location">{t('찾아오시는 길', 'Directions')}</S.HeaderUtilityLink>
            </S.HeaderUtilityLinks>
            <S.ContactButton to="/contact">Contact Us</S.ContactButton>
            <S.MobileIconButton type="button" kind="menu" aria-label={t('메뉴', 'Menu')} onClick={onOpenMobileMenu} />
          </S.HeaderTools>
        </S.HeaderRight>
      </S.HeaderInner>
    </S.Header>
  );
}
