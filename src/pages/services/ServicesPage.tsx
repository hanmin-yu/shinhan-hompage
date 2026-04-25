import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { serviceDetailPages } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const IntroGrid = styled(P.SplitGrid)`
  margin-top: 20px;
  align-items: stretch;
`;

const IntroVisual = styled.div`
  min-height: 280px;
  border-radius: 10px;
  border: 1px solid rgba(20, 75, 157, 0.16);
  background:
    linear-gradient(180deg, rgba(9, 37, 81, 0.2), rgba(9, 37, 81, 0.06)),
    url('/subpages/service-main-import.jpg') center / cover no-repeat;
`;

const sectionPathGroups = {
  core: ['/services/import-export', '/services/quarantine-requirements'],
  consulting: [
    '/services/consulting/fta',
    '/services/consulting/aeo',
    '/services/consulting/customs-audit',
    '/services/consulting/foreign-exchange',
    '/services/consulting/acva',
    '/services/consulting/penalty-investigation',
    '/services/consulting/tax-appeal',
    '/services/consulting/refund',
    '/services/consulting/trade-consulting',
  ],
  specialized: ['/services/logistics', '/services/vietnam', '/services/us-fda'],
} as const;

const serviceByPath = new Map(serviceDetailPages.map((item) => [item.path, item]));

function mapByPaths(paths: readonly string[]) {
  return paths
    .map((path) => serviceByPath.get(path))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export function ServicesPage() {
  const { t, tx } = useI18n();
  const coreServices = mapByPaths(sectionPathGroups.core);
  const consultingServices = mapByPaths(sectionPathGroups.consulting);
  const specializedServices = mapByPaths(sectionPathGroups.specialized);

  return (
    <P.PageSection>
      <P.PageContainer data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>Services Hub</P.Kicker>
            <P.SectionTitle>{t('업무분야', 'Services')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <IntroGrid>
          <P.Panel>
            <P.Lead style={{ marginTop: 0 }}>
              {t(
                '업무분야 전체 목록과 핵심 설명을 이 페이지에서 함께 확인할 수 있습니다.',
                'This page presents the full service list and key summaries together.',
              )}
            </P.Lead>
          </P.Panel>
          <IntroVisual aria-hidden="true" />
        </IntroGrid>

        <div id="services-core" style={{ marginTop: 26 }}>
          <P.Kicker>Core</P.Kicker>
          <P.SectionTitle>{t('수출입통관 · 검역/요건', 'Import & Quarantine')}</P.SectionTitle>
          <P.Grid columns={2} style={{ marginTop: 12 }}>
            {coreServices.map((service) => (
              <P.Card key={service.id}>
                <P.CardTitle>{tx(service.title)}</P.CardTitle>
                <P.CardText>{tx(service.summary)}</P.CardText>
                <P.CardLink to={service.path}>{t('자세히 보기', 'Learn More')}</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </div>

        <div id="services-consulting" style={{ marginTop: 34 }}>
          <P.Kicker>Consulting</P.Kicker>
          <P.SectionTitle>{t('컨설팅', 'Consulting')}</P.SectionTitle>
          <P.Grid columns={3} style={{ marginTop: 12 }}>
            {consultingServices.map((service) => (
              <P.Card key={service.id}>
                <P.CardTitle>{tx(service.title)}</P.CardTitle>
                <P.CardText>{tx(service.summary)}</P.CardText>
                <P.CardLink to={service.path}>{t('자세히 보기', 'Learn More')}</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </div>

        <div id="services-specialized" style={{ marginTop: 34 }}>
          <P.Kicker>Specialized</P.Kicker>
          <P.SectionTitle>{t('특화 서비스', 'Specialized Services')}</P.SectionTitle>
          <P.Grid columns={2} style={{ marginTop: 12 }}>
            {specializedServices.map((service) => (
              <P.Card key={service.id}>
                <P.CardTitle>{tx(service.title)}</P.CardTitle>
                <P.CardText>{tx(service.summary)}</P.CardText>
                <P.CardLink to={service.path}>{t('자세히 보기', 'Learn More')}</P.CardLink>
              </P.Card>
            ))}
            <P.Card>
              <P.CardTitle>{t('IT 서비스 소개', 'IT Service Overview')}</P.CardTitle>
              <P.CardText>
                {t(
                  'iOOM, iOOM Q, KORD FTA·LIQ 기반으로 통관 업무를 자동화하고 데이터 운영 안정성을 높입니다.',
                  'With iOOM, iOOM Q, and KORD FTA/LIQ, we automate customs workflows and improve data operations stability.',
                )}
              </P.CardText>
              <P.CardLink to="/it">{t('IT 자세히 보기', 'View IT Services')}</P.CardLink>
            </P.Card>
          </P.Grid>
        </div>
      </P.PageContainer>
    </P.PageSection>
  );
}
