import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { managementValues } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const HeroWrap = styled(P.SplitGrid)`
  align-items: stretch;
`;

const MessageVisual = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(20, 78, 161, 0.18);
  background: url('/subpages/message-ceo.jpg') center / cover no-repeat;
  min-height: 360px;
  position: relative;
  overflow: hidden;
`;

const QuoteBox = styled.blockquote`
  margin: 0;
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  padding: 16px 18px;
  border-radius: 8px;
  border: 1px solid rgba(216, 229, 248, 0.58);
  background: rgba(12, 41, 84, 0.72);
  color: #eaf2ff;
  font-size: 0.9rem;
  line-height: 1.6;
`;

export function MessagePage() {
  const { t, tx } = useI18n();

  return (
    <>
      <P.PageSection>
        <HeroWrap data-reveal>
          <P.Panel>
            <P.Kicker>Message</P.Kicker>
            <P.SectionTitle>{t('인사말', 'Message')}</P.SectionTitle>
            <P.Lead>
              {t(
                '신한관세법인은 고객의 발전과 성공을 목표로 정확한 기준과 책임 있는 대응을 이어가고 있습니다.',
                'Shinhan Customs Service remains committed to client growth and success through clear standards and accountable execution.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '변화하는 통상 환경에서도 현장에 바로 적용 가능한 기준을 제시하고, 기업의 의사결정을 안정적으로 지원하겠습니다.',
                'Even in rapidly changing trade environments, we provide practical standards that support stable business decisions.',
              )}
            </P.Lead>
          </P.Panel>

          <MessageVisual aria-hidden="true">
            <QuoteBox>
              {t(
                '고객의 발전과 성공을 위해 열정, 정직, 혁신, 팀워크를 기반으로 책임 있는 서비스를 제공하겠습니다.',
                'With passion, integrity, innovation, and teamwork, we will continue to deliver responsible services for our clients.',
              )}
            </QuoteBox>
          </MessageVisual>
        </HeroWrap>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Core Value</P.Kicker>
          <P.SectionTitle>{t('경영 가치', 'Management Values')}</P.SectionTitle>
          <P.Grid columns={2}>
            {managementValues.map((item) => (
              <P.Card key={item.title}>
                <P.CardTitle>{tx(item.title)}</P.CardTitle>
                <P.CardText>{tx(item.body)}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
