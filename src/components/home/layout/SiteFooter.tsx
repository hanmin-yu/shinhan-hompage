import { footerLinks, siteContact } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { BrandMarkGraphic } from '../BrandMarkGraphic';
import * as S from '../homeStyles';

export function SiteFooter() {
  const { t, tx } = useI18n();

  return (
    <S.Footer>
      <S.FooterInner>
        <S.FooterTop>
          <S.FooterBrandWrap>
            <S.BrandMark aria-hidden="true">
              <BrandMarkGraphic alt={t('신한관세법인 로고', 'Shinhan Customs Service logo')} />
            </S.BrandMark>
            <S.FooterBrandText>
              <S.FooterBrandTitle>SHINHAN</S.FooterBrandTitle>
              <S.FooterBrandSub>{t('신한관세법인', 'Shinhan Customs Service')}</S.FooterBrandSub>
            </S.FooterBrandText>
          </S.FooterBrandWrap>
        </S.FooterTop>

        <S.FooterPolicyRow>
          {footerLinks.map((item) => (
            <S.FooterPolicyLink key={item.id} href={item.href ?? '/'}>
              {tx(item.label)}
            </S.FooterPolicyLink>
          ))}
        </S.FooterPolicyRow>

        <S.FooterInfo>
          <S.FooterLine>
            <S.FooterLabel>{t('주소', 'Address')}</S.FooterLabel> {siteContact.address}
          </S.FooterLine>
          <S.FooterLine>
            <S.FooterLabel>T.</S.FooterLabel> {siteContact.phone} | <S.FooterLabel>E.</S.FooterLabel>{' '}
            {siteContact.email}
          </S.FooterLine>
          <S.FooterLine>
            <S.FooterLabel>{t('사업자등록번호', 'Business Registration No.')}</S.FooterLabel> {siteContact.businessNumber}
          </S.FooterLine>
          <S.FooterCopyright>
            {t('COPYRIGHT © 신한관세법인 ALL RIGHTS RESERVED.', 'COPYRIGHT © SHINHAN CUSTOMS SERVICE INC. ALL RIGHTS RESERVED.')}
          </S.FooterCopyright>
        </S.FooterInfo>
      </S.FooterInner>
    </S.Footer>
  );
}
