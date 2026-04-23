import { newsItems } from '../../../data/home';
import { SectionHeader } from '../SectionHeader';
import * as S from '../homeStyles';

export function NewsSection() {
  const [featuredItem, ...secondaryItems] = newsItems;

  if (!featuredItem) return null;

  return (
    <S.LandingSection id="news">
      <S.LandingSectionInner data-reveal>
        <SectionHeader label="NEWS & RESOURCES" title="소식 / 자료" linkLabel="소식 더보기" href="/news" />

        <S.NewsletterGrid>
          <S.NewsletterCard>
            <S.CaseCategory style={{ color: '#04325a' }}>{featuredItem.category}</S.CaseCategory>
            <S.CardHeadline>{featuredItem.title}</S.CardHeadline>
            <S.CardText>{featuredItem.body}</S.CardText>
            <S.LandingLink href="/news">자료 보기</S.LandingLink>
          </S.NewsletterCard>
          <S.NewsletterList>
            {secondaryItems.map((item) => (
              <S.NewsletterCard key={item.title}>
                <S.CaseCategory style={{ color: '#04325a' }}>{item.category}</S.CaseCategory>
                <S.CardHeadline>{item.title}</S.CardHeadline>
                <S.CardText>{item.body}</S.CardText>
              </S.NewsletterCard>
            ))}
          </S.NewsletterList>
        </S.NewsletterGrid>
      </S.LandingSectionInner>
    </S.LandingSection>
  );
}
