import { headerNavigation, mobileQuickLinks } from '../../../config/navigation';
import type { NavItem } from '../../../types/site';
import * as S from '../homeStyles';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

function renderMobileSubmenu(items: NavItem[], onClose: () => void, depth = 0) {
  return items.map((item) => {
    if (!item.children?.length) {
      return (
        <S.MobileMenuSubLink key={item.id} href={item.href} onClick={onClose} data-depth={depth}>
          {item.label}
        </S.MobileMenuSubLink>
      );
    }

    return (
      <S.MobileMenuGroup key={item.id}>
        <S.MobileMenuGroupTitle>{item.label}</S.MobileMenuGroupTitle>
        {renderMobileSubmenu(item.children, onClose, depth + 1)}
      </S.MobileMenuGroup>
    );
  });
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <>
      <S.MobileMenuOverlay open={open} onClick={onClose} />
      <S.MobileMenuPanel open={open} aria-hidden={!open}>
        <S.MobileMenuTop>
          <S.MobileMenuTitle>전체 메뉴</S.MobileMenuTitle>
          <S.MobileMenuClose type="button" aria-label="메뉴 닫기" onClick={onClose} />
        </S.MobileMenuTop>

        {headerNavigation.map((item) => (
          <S.MobileMenuSection key={item.id}>
            <S.MobileMenuMainLink href={item.href} onClick={onClose}>
              {item.label}
            </S.MobileMenuMainLink>
            {item.children ? renderMobileSubmenu(item.children, onClose) : null}
          </S.MobileMenuSection>
        ))}

        <S.MobileMenuQuickRow>
          {mobileQuickLinks.map((item) => (
            <S.MobileMenuQuickLink key={item.id} href={item.href} onClick={onClose}>
              {item.label}
            </S.MobileMenuQuickLink>
          ))}
        </S.MobileMenuQuickRow>
      </S.MobileMenuPanel>
    </>
  );
}
