import { utilityLinks } from '../../../data/home';
import * as S from '../homeStyles';

export function UtilityBar() {
  return (
    <S.UtilityBar>
      <S.UtilityBarInner>
        <S.UtilityBrandBadge aria-label="Established 1965 SHINHAN Customs Service Inc.">
          <S.UtilityBrandLead>Established 1965</S.UtilityBrandLead>
          <S.UtilityBrandName>SHINHAN Customs Service Inc.</S.UtilityBrandName>
        </S.UtilityBrandBadge>
        <S.UtilityInner>
          <S.UtilityLinks>
            {utilityLinks.map((link) => (
              <S.UtilityLink key={link.id} href={link.href}>
                {link.label}
              </S.UtilityLink>
            ))}
          </S.UtilityLinks>
        </S.UtilityInner>
      </S.UtilityBarInner>
    </S.UtilityBar>
  );
}

