import { getHeaderNavigation, getMobileQuickLinks } from '../../../config/navigation';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { language, setLanguage, t } = useI18n();
  const headerNavigation = getHeaderNavigation(language);
  const mobileQuickLinks = getMobileQuickLinks(language);

  return (
    <>
      <S.MobileMenuOverlay open={open} onClick={onClose} />
      <S.MobileMenuPanel
        id="site-mobile-menu"
        open={open}
        aria-hidden={!open}
        aria-modal="true"
        role="dialog"
        aria-label={t('전체 메뉴', 'All Menu')}
      >
        <S.MobileMenuTop>
          <S.MobileMenuTitle>{t('전체 메뉴', 'All Menu')}</S.MobileMenuTitle>
          <S.MobileMenuClose type="button" aria-label={t('메뉴 닫기', 'Close Menu')} onClick={onClose} />
        </S.MobileMenuTop>

        <S.MobileMenuQuickRow $columns={1}>
          <S.MobileMenuQuickButton type="button" onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>
            {language === 'ko' ? 'ENG' : 'KOR'}
          </S.MobileMenuQuickButton>
        </S.MobileMenuQuickRow>

        {headerNavigation.map((item) => (
          <S.MobileMenuSection key={item.id}>
            <S.MobileMenuMainLink to={item.to ?? item.href ?? '/'} onClick={onClose}>
              {item.label}
            </S.MobileMenuMainLink>
          </S.MobileMenuSection>
        ))}

        <S.MobileMenuQuickRow $columns={2}>
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
