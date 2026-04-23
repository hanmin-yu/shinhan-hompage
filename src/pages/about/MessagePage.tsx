import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { managementValues } from '../../data/pageContent';

export function MessagePage() {
  return (
    <>
      <P.PageSection>
        <P.SplitGrid data-reveal>
          <P.Panel>
            <P.Kicker>Message</P.Kicker>
            <P.SectionTitle>인사말</P.SectionTitle>
            <P.Lead>
              신한관세법인은 고객의 발전과 성공을 목표로, 정확한 기준과 빠른 실행을 기반으로 한 전문 자문 서비스를
              제공합니다.
            </P.Lead>
            <P.Lead>
              변화하는 통상 환경에서도 현장에 바로 적용 가능한 솔루션을 제시해 고객의 의사결정을 안정적으로
              지원하겠습니다.
            </P.Lead>
          </P.Panel>
          <P.Panel>
            <P.Kicker>Core Value</P.Kicker>
            <P.SectionTitle>경영 가치</P.SectionTitle>
            <P.Grid columns={1}>
              {managementValues.map((item) => (
                <P.Card key={item.title}>
                  <P.CardTitle>{item.title}</P.CardTitle>
                  <P.CardText>{item.body}</P.CardText>
                </P.Card>
              ))}
            </P.Grid>
          </P.Panel>
        </P.SplitGrid>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

