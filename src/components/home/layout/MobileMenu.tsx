import { getHeaderNavigation, getMobileQuickLinks } from '../../../config/navigation';
import { useI18n } from '../../../i18n/useI18n';
import type { NavItem } from '../../../types/site';
import * as S from '../homeStyles';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

function renderMobileSubmenu(items: NavItem[], onClose: () => void, depth = 0) {
  return items.map((item) => {
    const itemTo = item.to ?? item.href ?? '/';

    if (!item.children?.length) {
      return (
        <S.MobileMenuSubLink key={item.id} to={itemTo} onClick={onClose} data-depth={depth}>
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
  const { language, setLanguage, t } = useI18n();
  const headerNavigation = getHeaderNavigation(language);
  const mobileQuickLinks = getMobileQuickLinks(language);

  return (
    <>
      <S.MobileMenuOverlay open={open} onClick={onClose} />
      <S.MobileMenuPanel open={open} aria-hidden={!open}>
        <S.MobileMenuTop>
          <S.MobileMenuTitle>{t('전체 메뉴', 'All Menu')}</S.MobileMenuTitle>
          <S.MobileMenuClose type="button" aria-label={t('메뉴 닫기', 'Close Menu')} onClick={onClose} />
        </S.MobileMenuTop>

        <S.MobileMenuQuickRow>
          <S.MobileMenuQuickButton type="button" onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>
            {language === 'ko' ? 'ENG' : 'KOR'}
          </S.MobileMenuQuickButton>
        </S.MobileMenuQuickRow>

        {headerNavigation.map((item) => (
          <S.MobileMenuSection key={item.id}>
            <S.MobileMenuMainLink to={item.to ?? item.href ?? '/'} onClick={onClose}>
              {item.label}
            </S.MobileMenuMainLink>
            {item.children ? renderMobileSubmenu(item.children, onClose) : null}
          </S.MobileMenuSection>
        ))}

        <S.MobileMenuQuickRow>
          {mobileQuickLinks.map((item) => (
            <S.MobileMenuQuickLink key={item.id} to={item.to ?? item.href ?? '/'} onClick={onClose}>
              {item.label}
            </S.MobileMenuQuickLink>
          ))}
        </S.MobileMenuQuickRow>
      </S.MobileMenuPanel>
    </>
  );
}
