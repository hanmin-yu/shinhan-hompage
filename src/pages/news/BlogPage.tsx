import * as P from '../../components/site/PagePrimitives';
import { flashItems } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const blogSeries = [
  {
    id: 'blog-1',
    title: '수출입통관 실무 브리핑',
    summary: '월간 핵심 규정 변화와 현장 체크포인트를 짧게 정리합니다.',
  },
  {
    id: 'blog-2',
    title: '조사 대응 인사이트',
    summary: '관세조사·범칙조사 대응에서 자주 발생하는 쟁점을 사례 중심으로 안내합니다.',
  },
  {
    id: 'blog-3',
    title: '원산지·FTA 운영 가이드',
    summary: '원산지 판정, 증빙 관리, 사후검증 준비를 실무 관점에서 설명합니다.',
  },
];

export function BlogPage() {
  const { t, tx } = useI18n();

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <P.SectionHead>
          <div>
            <P.Kicker>Blog</P.Kicker>
            <P.SectionTitle>{t('블로그', 'Blog')}</P.SectionTitle>
          </div>
        </P.SectionHead>
        <P.Lead>
          {t(
            '블로그는 통관·컨설팅 관련 콘텐츠를 순차적으로 추가하며, 현재는 신한 NEWS의 FLASH와 함께 운영됩니다.',
            'The blog will be expanded with customs and consulting content and currently runs with FLASH items from Shinhan NEWS.',
          )}
        </P.Lead>
        <P.Grid columns={2}>
          {blogSeries.map((item) => (
            <P.Card key={item.id}>
              <P.CardTitle>{t(item.title, item.title)}</P.CardTitle>
              <P.CardText>{t(item.summary, item.summary)}</P.CardText>
            </P.Card>
          ))}
          {flashItems.slice(0, 2).map((item) => (
            <P.Card key={item.title}>
              <P.CardTitle>{tx(item.title)}</P.CardTitle>
              <P.CardText>{tx(item.body)}</P.CardText>
            </P.Card>
          ))}
        </P.Grid>
      </P.PageContainer>
    </P.PageSection>
  );
}
