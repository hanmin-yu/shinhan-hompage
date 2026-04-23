import { useMemo, useState } from 'react';

import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { members } from '../../data/home';

function detectCategory(practice: string) {
  if (practice.includes('FTA') || practice.includes('AEO')) return '컨설팅';
  if (practice.includes('통관')) return '통관';
  if (practice.includes('조사') || practice.includes('심사')) return '조사';
  return '기타';
}

export function ExpertsPage() {
  const categories = useMemo(
    () => ['전체', ...Array.from(new Set(members.map((member) => detectCategory(member.practice))))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredMembers = members.filter((member) =>
    activeCategory === '전체' ? true : detectCategory(member.practice) === activeCategory,
  );

  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Experts</P.Kicker>
              <P.SectionTitle>분야별 전문가</P.SectionTitle>
            </div>
            <P.HeadLink to="/contact">전문가 문의하기</P.HeadLink>
          </P.SectionHead>
          <P.Lead>전문 분야별로 구성원을 탐색하고 관련 업무분야와 함께 확인할 수 있습니다.</P.Lead>
          <P.HeroActions>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                style={{
                  minHeight: 38,
                  padding: '0 14px',
                  borderRadius: 999,
                  border: `1px solid ${activeCategory === category ? 'rgba(28,88,170,.42)' : 'rgba(21,77,159,.18)'}`,
                  background: activeCategory === category ? '#e9f2ff' : '#fff',
                  color: activeCategory === category ? '#1c56a9' : '#4f6486',
                  fontWeight: activeCategory === category ? 700 : 600,
                  cursor: 'pointer',
                }}
              >
                {category}
              </button>
            ))}
          </P.HeroActions>
          <P.Grid columns={3}>
            {filteredMembers.map((member) => (
              <P.Card key={member.name}>
                <P.CardTitle>{member.name}</P.CardTitle>
                <P.CardText>{member.title}</P.CardText>
                <P.CardText>{member.practice}</P.CardText>
                <P.CardText>T. {member.phone}</P.CardText>
                <P.CardLink to="/services">담당 업무분야 보기</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

