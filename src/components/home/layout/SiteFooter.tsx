import { footerLinks, footerSocialLinks, siteContact } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import { BrandMarkGraphic } from '../BrandMarkGraphic';
import * as S from '../homeStyles';

export function SiteFooter() {
  const { t, tx } = useI18n();

  const renderSocialIcon = (id: string) => {
    if (id === 'youtube') {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23 12.1c0-1.8-.2-3.6-.5-5.4a3.1 3.1 0 0 0-2.1-2.2C18.4 4 12 4 12 4s-6.4 0-8.4.5a3.1 3.1 0 0 0-2.1 2.2C1.2 8.5 1 10.3 1 12.1s.2 3.6.5 5.4a3.1 3.1 0 0 0 2.1 2.2c2 .5 8.4.5 8.4.5s6.4 0 8.4-.5a3.1 3.1 0 0 0 2.1-2.2c.3-1.8.5-3.6.5-5.4Zm-13.1 3.5V8.6l6 3.5-6 3.5Z" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 5A2.5 2.5 0 0 0 2 7.5v9A2.5 2.5 0 0 0 4.5 19h15a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 19.5 5h-15Zm0 1.5h15c.55 0 1 .45 1 1v.6l-8.1 5.2a.75.75 0 0 1-.8 0L3.5 8.1v-.6c0-.55.45-1 1-1Zm-1 3.37 7.29 4.68a2.25 2.25 0 0 0 2.42 0l7.29-4.68v6.63c0 .55-.45 1-1 1h-15c-.55 0-1-.45-1-1V9.87Z" />
      </svg>
    );
  };

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
            <S.FooterTopAside>
              <S.FooterSocialLabel>SNS</S.FooterSocialLabel>
              <S.FooterSocialRow>
                {footerSocialLinks.map((item) => (
                  <S.FooterSocialLink
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${t('신한관세법인', 'Shinhan Customs Service')} ${tx(item.label)}`}
                  >
                    {renderSocialIcon(item.id)}
                  </S.FooterSocialLink>
                ))}
              </S.FooterSocialRow>
            </S.FooterTopAside>
          </S.FooterBrandWrap>
        </S.FooterTop>

        <S.FooterPolicyRow>
          {footerLinks.map((item) => (
            <S.FooterPolicyLink key={item.id} to={item.to ?? '/'}>
              {tx(item.label)}
            </S.FooterPolicyLink>
          ))}
        </S.FooterPolicyRow>

        <S.FooterInfo>
          <S.FooterLine>
            <S.FooterLabel>{t('주소', 'Address')}</S.FooterLabel> {t(siteContact.address, siteContact.addressEn)}
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
