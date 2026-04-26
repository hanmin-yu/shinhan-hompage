import { siteContact } from '../../data/home';
import * as P from '../../components/site/PagePrimitives';
import { useI18n } from '../../i18n/useI18n';

export function ContactPage() {
  const { t } = useI18n();

  return (
    <P.PageSection>
      <div data-reveal>
        <P.Panel>
          <P.Kicker>Contact Us</P.Kicker>
          <P.SectionTitle>{t('문의', 'Contact')}</P.SectionTitle>
          <P.Lead>{t('전화와 이메일로 빠르게 연결해드립니다.', 'Reach us quickly by phone or email.')}</P.Lead>
          <P.BulletList>
            <li>
              {t('대표번호', 'Phone')}: {siteContact.phone}
            </li>
            <li>
              {t('이메일', 'Email')}: {siteContact.email}
            </li>
            <li>
              {t('주소', 'Address')}: {siteContact.address}
            </li>
          </P.BulletList>
          <P.HeroActions>
            <P.PrimaryButton to="/about/location">{t('오시는 길 보기', 'View Directions')}</P.PrimaryButton>
          </P.HeroActions>
        </P.Panel>
      </div>
    </P.PageSection>
  );
}
