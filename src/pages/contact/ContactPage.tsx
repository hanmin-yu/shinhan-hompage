import { siteContact } from '../../data/home';
import * as P from '../../components/site/PagePrimitives';
import { useI18n } from '../../i18n/useI18n';

export function ContactPage() {
  const { t } = useI18n();

  return (
    <P.PageSection>
      <P.SplitGrid data-reveal>
        <P.Panel>
          <P.Kicker>Contact Us</P.Kicker>
          <P.SectionTitle>{t('문의', 'Contact')}</P.SectionTitle>
          <P.Lead>{t('전화, 이메일, 문의 폼으로 빠르게 연결해드립니다.', 'Reach us quickly by phone, email, or form.')}</P.Lead>
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
        <P.Panel>
          <P.Kicker>Quick Form</P.Kicker>
          <P.SectionTitle>{t('온라인 문의', 'Online Inquiry')}</P.SectionTitle>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            <input
              type="text"
              placeholder={t('이름', 'Name')}
              style={{ minHeight: 44, borderRadius: 8, border: '1px solid rgba(20,76,158,.2)', padding: '0 12px' }}
            />
            <input
              type="email"
              placeholder={t('이메일', 'Email')}
              style={{ minHeight: 44, borderRadius: 8, border: '1px solid rgba(20,76,158,.2)', padding: '0 12px' }}
            />
            <textarea
              placeholder={t('문의 내용을 입력해주세요', 'Please enter your inquiry')}
              rows={5}
              style={{ borderRadius: 8, border: '1px solid rgba(20,76,158,.2)', padding: '12px' }}
            />
            <button
              type="button"
              style={{
                minHeight: 46,
                borderRadius: 8,
                border: '1px solid rgba(28,92,184,.28)',
                background: '#1c5cb8',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {t('문의 등록', 'Submit')}
            </button>
          </form>
        </P.Panel>
      </P.SplitGrid>
    </P.PageSection>
  );
}
