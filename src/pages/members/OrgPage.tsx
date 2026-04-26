import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { organizationUnits } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

export function OrgPage() {
  const { t, tx } = useI18n();
  const membersSubnav = sectionSubnav.members;

  return (
    <>
      <P.HeroSection>
        <P.PageContainer data-reveal>
          <LandingSubnav
            kicker={membersSubnav.kicker}
            kickerEn={membersSubnav.kickerEn}
            title={membersSubnav.title}
            titleEn={membersSubnav.titleEn}
            summary={membersSubnav.summary}
            summaryEn={membersSubnav.summaryEn}
            items={membersSubnav.items}
          />

          <P.Kicker>Organization</P.Kicker>
          <P.SectionTitle>{t('조직도', 'Organization')}</P.SectionTitle>
          <P.Lead>
            {t(
              '통관본부, 컨설팅본부, IT/운영지원 조직이 유기적으로 연결되어 고객 과제를 지원합니다.',
              'Our clearance, consulting, and IT/operations teams work as one system to support client priorities.',
            )}
          </P.Lead>
          <P.Grid columns={3}>
            {organizationUnits.map((unit) => (
              <P.Card key={unit.title}>
                <P.CardTitle>{tx(unit.title)}</P.CardTitle>
                <P.CardText>{tx(unit.body)}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.HeroSection>
    </>
  );
}
