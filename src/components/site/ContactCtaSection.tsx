import { siteContact } from '../../data/home';
import * as P from './PagePrimitives';

type ContactCtaSectionProps = {
  title?: string;
  body?: string;
};

export function ContactCtaSection({
  title = '문의가 필요한 이슈가 있으신가요?',
  body = '전화 상담, 분야별 전문가 연결, 온라인 문의 중 편한 방식으로 바로 연결해드립니다.',
}: ContactCtaSectionProps) {
  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <P.Kicker>Contact</P.Kicker>
        <P.SectionTitle>{title}</P.SectionTitle>
        <P.Lead>{body}</P.Lead>
        <P.HeroActions>
          <P.PrimaryButton to="/contact">Contact Us</P.PrimaryButton>
          <P.SecondaryButton to="/members/experts">분야별 전문가 보기</P.SecondaryButton>
          <P.SecondaryButton to="/offices">사무소 보기</P.SecondaryButton>
        </P.HeroActions>
        <P.Lead>
          T. {siteContact.phone} · E. {siteContact.email}
        </P.Lead>
      </P.PageContainer>
    </P.PageSection>
  );
}
