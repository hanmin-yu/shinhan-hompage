import { useSiteContent } from '../../../hooks/useSiteContent';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

export function SiteFooter() {
  const { t, tx } = useI18n();
  const { content } = useSiteContent();
  const { footerLinks, footerSocialLinks, siteContact, footerCopyright } = content.global;

  return (
    <S.Footer>
      <S.FooterInner>
        <S.FooterPolicyRow>
          {footerLinks.map((item) => (
            <S.FooterPolicyLink key={item.id} to={item.to ?? '/'}>
              {tx(item.label)}
            </S.FooterPolicyLink>
          ))}
        </S.FooterPolicyRow>

        <S.FooterBody>
          <S.FooterInfo>
            <S.FooterInfoGrid>
              <S.FooterInfoItem>
                <S.FooterLabel>{t('주소', 'Address')}</S.FooterLabel>
                <S.FooterValue>{t(siteContact.address, siteContact.addressEn)}</S.FooterValue>
              </S.FooterInfoItem>
              <S.FooterInfoItem>
                <S.FooterLabel>{t('대표전화', 'Tel')}</S.FooterLabel>
                <S.FooterValue>{siteContact.phone}</S.FooterValue>
              </S.FooterInfoItem>
              <S.FooterInfoItem>
                <S.FooterLabel>{t('이메일', 'Email')}</S.FooterLabel>
                <S.FooterValue>{siteContact.email}</S.FooterValue>
              </S.FooterInfoItem>
              <S.FooterInfoItem>
                <S.FooterLabel>{t('사업자등록번호', 'Business Registration No.')}</S.FooterLabel>
                <S.FooterValue>{siteContact.businessNumber}</S.FooterValue>
              </S.FooterInfoItem>
            </S.FooterInfoGrid>
            <S.FooterCopyright>
              {t(footerCopyright.ko, footerCopyright.en)}
            </S.FooterCopyright>
          </S.FooterInfo>

          <S.FooterTopAside>
            <S.FooterCertificationMark>
              <S.FooterCertificationImage src="/aeo-certification-mark.png" alt={t('KOREA AEO 인증 기업 마크', 'KOREA AEO certified company mark')} />
            </S.FooterCertificationMark>
            <S.FooterSocialGroup>
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
                    <S.FooterSocialImage
                      src={item.id === 'blog' ? '/social/naver-blog-badge.svg' : '/social/youtube-red-badge.svg'}
                      alt={tx(item.label)}
                    />
                  </S.FooterSocialLink>
                ))}
              </S.FooterSocialRow>
            </S.FooterSocialGroup>
          </S.FooterTopAside>
        </S.FooterBody>
      </S.FooterInner>
    </S.Footer>
  );
}
