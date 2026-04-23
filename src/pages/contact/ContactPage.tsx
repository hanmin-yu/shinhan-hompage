import { siteContact } from '../../data/home';
import * as P from '../../components/site/PagePrimitives';

export function ContactPage() {
  return (
    <P.PageSection>
      <P.SplitGrid data-reveal>
        <P.Panel>
          <P.Kicker>Contact Us</P.Kicker>
          <P.SectionTitle>문의</P.SectionTitle>
          <P.Lead>전화, 이메일, 문의 폼으로 빠르게 연결해드립니다.</P.Lead>
          <P.BulletList>
            <li>대표번호: {siteContact.phone}</li>
            <li>이메일: {siteContact.email}</li>
            <li>주소: {siteContact.address}</li>
          </P.BulletList>
          <P.HeroActions>
            <P.PrimaryButton to="/offices">오시는 길 보기</P.PrimaryButton>
          </P.HeroActions>
        </P.Panel>
        <P.Panel>
          <P.Kicker>Quick Form</P.Kicker>
          <P.SectionTitle>온라인 문의</P.SectionTitle>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            <input
              type="text"
              placeholder="이름"
              style={{ minHeight: 44, borderRadius: 8, border: '1px solid rgba(20,76,158,.2)', padding: '0 12px' }}
            />
            <input
              type="email"
              placeholder="이메일"
              style={{ minHeight: 44, borderRadius: 8, border: '1px solid rgba(20,76,158,.2)', padding: '0 12px' }}
            />
            <textarea
              placeholder="문의 내용을 입력해주세요"
              rows={5}
              style={{ borderRadius: 8, border: '1px solid rgba(20,76,158,.2)', padding: '12px' }}
            />
            <button
              type="button"
              style={{
                minHeight: 46,
                borderRadius: 8,
                border: '1px solid rgba(28,92,184,.28)',
                background: '#1c5cb8',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              문의 등록
            </button>
          </form>
        </P.Panel>
      </P.SplitGrid>
    </P.PageSection>
  );
}

