import { headerNavigation } from '../../../config/navigation';
import { utilityLinks } from '../../../data/home';
import type { NavItem } from '../../../types/site';
import type { FontMode } from '../../../types/site';
import { BrandMarkGraphic } from '../BrandMarkGraphic';
import * as S from '../homeStyles';

type SiteHeaderProps = {
  fontMode: FontMode;
  onToggleFontMode: () => void;
  onOpenMobileMenu: () => void;
};

function renderDropdownItems(items: NavItem[]) {
  return items.map((child) => {
    if (!child.children?.length) {
      return (
        <S.NavDropdownLink key={child.id} href={child.href}>
          {child.label}
        </S.NavDropdownLink>
      );
    }

    return (
      <S.NavDropdownGroup key={child.id}>
        <S.NavDropdownGroupTitle>{child.label}</S.NavDropdownGroupTitle>
        <S.NavDropdownGroupList>
          {child.children.map((grandChild) => (
            <S.NavDropdownSubLink key={grandChild.id} href={grandChild.href}>
              {grandChild.label}
            </S.NavDropdownSubLink>
          ))}
        </S.NavDropdownGroupList>
      </S.NavDropdownGroup>
    );
  });
}

export function SiteHeader({ fontMode, onToggleFontMode, onOpenMobileMenu }: SiteHeaderProps) {
  const handleMoveToOffices = () => {
    window.location.hash = '#offices';
  };

  return (
    <S.Header>
      <S.HeaderInner>
        <S.Brand href="#top">
          <S.BrandMark aria-hidden="true">
            <BrandMarkGraphic alt="신한관세법인 로고" />
          </S.BrandMark>
          <S.BrandText>
            <S.BrandTitle>SHINHAN</S.BrandTitle>
            <S.BrandSub>신한 관세법인</S.BrandSub>
          </S.BrandText>
        </S.Brand>

        <S.HeaderRight>
          <S.MenuArea>
            <S.Nav>
              {headerNavigation.map((item) => (
                <S.NavItem key={item.id}>
                  <S.NavLink href={item.href} hasChildren={Boolean(item.children?.length)}>
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
              {utilityLinks.map((item) => (
                <S.HeaderUtilityLink key={item.id} href={item.href}>
                  {item.label}
                </S.HeaderUtilityLink>
              ))}
            </S.HeaderUtilityLinks>
            <S.FontModeToggle type="button" onClick={onToggleFontMode}>
              {fontMode === 'nanum' ? '본고딕 보기' : '나눔스퀘어 보기'}
            </S.FontModeToggle>
            <S.HeaderIconButton type="button" kind="pin" aria-label="위치 안내" onClick={handleMoveToOffices} />
            <S.HeaderIconButton type="button" kind="menu" aria-label="전체 메뉴" onClick={onOpenMobileMenu} />
            <S.ContactButton href="#contact">Contact Us</S.ContactButton>
            <S.MobileIconButton type="button" kind="search" aria-label="검색" />
            <S.MobileIconButton type="button" kind="menu" aria-label="메뉴" onClick={onOpenMobileMenu} />
          </S.HeaderTools>
        </S.HeaderRight>
      </S.HeaderInner>
    </S.Header>
  );
}
