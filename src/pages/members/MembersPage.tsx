import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { members } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

export function MembersPage() {
  const { t, tx } = useI18n();
  const membersSubnav = sectionSubnav.members;
  const preview = members.slice(0, 3);

  return (
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

        <P.SectionHead>
          <div>
            <P.Kicker>Executives</P.Kicker>
            <P.SectionTitle>{t('임원진', 'Executives')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <P.Lead>
          {t(
            '신한의 주요 임원진과 핵심 역할을 한눈에 확인할 수 있습니다.',
            'You can quickly review Shinhan’s key executives and their primary roles.',
          )}
        </P.Lead>
        <P.Grid columns={3}>
          {preview.map((member) => (
            <P.Card key={member.name}>
              <P.CardTitle>{tx(member.name)}</P.CardTitle>
              <P.CardText>{tx(member.title)}</P.CardText>
              <P.CardText>{tx(member.practice)}</P.CardText>
            </P.Card>
          ))}
        </P.Grid>
      </P.PageContainer>
    </P.HeroSection>
  );
}
