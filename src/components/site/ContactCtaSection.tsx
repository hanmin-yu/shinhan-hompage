import { siteContact } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import * as P from './PagePrimitives';

type ContactCtaSectionProps = {
  title?: string;
  body?: string;
};

export function ContactCtaSection({
  title = '문의가 필요한 이슈가 있으신가요?',
  body = '전화 또는 온라인 문의로 필요한 상담 채널을 안내해드립니다.',
}: ContactCtaSectionProps) {
  const { t } = useI18n();

  return (
    <P.PageSection tone="blue">
      <P.PageContainer data-reveal>
        <P.Kicker>Contact</P.Kicker>
        <P.SectionTitle>
          {title === '문의가 필요한 이슈가 있으신가요?'
            ? t('문의가 필요한 이슈가 있으신가요?', 'Need support on a customs issue?')
            : title}
        </P.SectionTitle>
        <P.Lead>
          {body === '전화 또는 온라인 문의로 필요한 상담 채널을 안내해드립니다.'
            ? t(
                '전화 또는 온라인 문의로 필요한 상담 채널을 안내해드립니다.',
                'We guide you to the right consultation channel by phone or online.',
              )
            : body}
        </P.Lead>
        <P.HeroActions>
          <P.PrimaryButton to="/contact">{t('문의하기', 'Contact Us')}</P.PrimaryButton>
        </P.HeroActions>
        <P.Lead>
          {t('대표번호', 'Phone')} {siteContact.phone} · {t('이메일', 'Email')} {siteContact.email}
        </P.Lead>
      </P.PageContainer>
    </P.PageSection>
  );
}
