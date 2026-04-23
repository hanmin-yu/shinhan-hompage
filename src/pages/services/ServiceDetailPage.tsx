import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { serviceDetailPages } from '../../data/pageContent';

type ServiceDetailPageProps = {
  path: string;
};

export function ServiceDetailPage({ path }: ServiceDetailPageProps) {
  const content = serviceDetailPages.find((item) => item.path === path);

  if (!content) {
    return (
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Services</P.Kicker>
          <P.SectionTitle>서비스 정보를 찾을 수 없습니다.</P.SectionTitle>
          <P.HeroActions>
            <P.PrimaryButton to="/services">업무분야 허브로 이동</P.PrimaryButton>
          </P.HeroActions>
        </P.PageContainer>
      </P.PageSection>
    );
  }

  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Service Detail</P.Kicker>
          <P.SectionTitle>{content.title}</P.SectionTitle>
          <P.Lead>{content.summary}</P.Lead>

          <P.SplitGrid style={{ marginTop: 24 }}>
            <P.Panel>
              <P.Kicker>개요</P.Kicker>
              <P.Lead>{content.overview}</P.Lead>
            </P.Panel>
            <P.Panel>
              <P.Kicker>주요 지원 범위</P.Kicker>
              <P.BulletList>
                {content.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </P.BulletList>
            </P.Panel>
          </P.SplitGrid>

          <P.PageSection tone="soft" style={{ padding: '26px 0 0', borderTop: 0 }}>
            <P.PageContainer style={{ width: '100%' }}>
              <P.SectionHead>
                <div>
                  <P.Kicker>Checklist</P.Kicker>
                  <P.SectionTitle>절차 / 체크포인트</P.SectionTitle>
                </div>
              </P.SectionHead>
              <P.Grid columns={3}>
                {content.checkpoints.map((point) => (
                  <P.Card key={point}>
                    <P.CardTitle>{point}</P.CardTitle>
                    <P.CardText>실무 진행 단계에서 해당 항목을 기준으로 자료와 일정을 정리합니다.</P.CardText>
                  </P.Card>
                ))}
              </P.Grid>
            </P.PageContainer>
          </P.PageSection>

          <P.SplitGrid style={{ marginTop: 24 }}>
            <P.Panel>
              <P.Kicker>관련 전문가</P.Kicker>
              <P.BulletList>
                {content.relatedExpertNames.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </P.BulletList>
              <P.HeroActions>
                <P.PrimaryButton to="/members/experts">분야별 전문가 보기</P.PrimaryButton>
              </P.HeroActions>
            </P.Panel>
            <P.Panel>
              <P.Kicker>관련 자료</P.Kicker>
              <P.Grid columns={1}>
                {content.relatedResources.map((resource) => (
                  <P.Card key={resource.label}>
                    <P.CardTitle>{resource.label}</P.CardTitle>
                    <P.CardLink to={resource.href}>자료 보기</P.CardLink>
                  </P.Card>
                ))}
              </P.Grid>
            </P.Panel>
          </P.SplitGrid>

          <P.HeroActions style={{ marginTop: 24 }}>
            <P.PrimaryButton to="/contact">문의하기</P.PrimaryButton>
            <P.SecondaryButton to="/services">업무분야 허브로 이동</P.SecondaryButton>
          </P.HeroActions>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

