import { useSiteContent } from '../../../hooks/useSiteContent';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

export function UtilityBar() {
  const { t } = useI18n();
  const { content } = useSiteContent();

  return (
    <S.UtilityBar>
      <S.UtilityBarInner>
        <S.UtilityBrandBadge aria-label="Established 1965 SHINHAN Customs Service Inc.">
          <S.UtilityBrandLead>Established 1965</S.UtilityBrandLead>
          <S.UtilityBrandName>SHINHAN Customs Service Inc.</S.UtilityBrandName>
        </S.UtilityBrandBadge>
        <S.UtilityInner>
          <S.UtilityLinks>
            {content.global.utilityLinks.map((link) => (
              <S.UtilityLink key={link.id} href={link.href ?? '/'}>
                {t(link.label, link.labelEn ?? link.label)}
              </S.UtilityLink>
            ))}
          </S.UtilityLinks>
        </S.UtilityInner>
      </S.UtilityBarInner>
    </S.UtilityBar>
  );
}
