import * as P from '../../components/site/PagePrimitives';
import { members } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

export function MembersPage() {
  const { t, tx } = useI18n();
  const preview = members.slice(0, 3);

  return (
    <P.PageSection>
      <P.PageContainer data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>Members</P.Kicker>
            <P.SectionTitle>{t('구성원', 'Members')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <P.Lead>
          {t(
            '조직도와 분야별 전문가 페이지를 통해 담당 영역별로 빠르게 확인하실 수 있습니다.',
            'You can quickly find the right contacts through the organization and expert pages.',
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
    </P.PageSection>
  );
}
