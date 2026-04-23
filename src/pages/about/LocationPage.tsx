import koreaMapAsset from '../../assets/map-korea.svg';
import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { officeBranches, siteContact } from '../../data/home';

const headOffice = officeBranches.find((office) => office.id === 'seoul') ?? officeBranches[0];

export function LocationPage() {
  return (
    <>
      <P.PageSection>
        <P.SplitGrid data-reveal>
          <P.Panel>
            <P.Kicker>Location</P.Kicker>
            <P.SectionTitle>오시는 길</P.SectionTitle>
            <P.Lead>본사 기준 위치 정보를 먼저 안내드리며, 다른 지사는 사무소 전체보기에서 확인할 수 있습니다.</P.Lead>
            <P.BulletList>
              <li>주소: {headOffice?.address ?? siteContact.address}</li>
              <li>대표번호: {headOffice?.tel ?? siteContact.phone}</li>
              {headOffice?.fax ? <li>팩스번호: {headOffice.fax}</li> : null}
              <li>이메일: {siteContact.email}</li>
              <li>주차/교통: 사전 문의 시 방문 목적에 맞는 안내 제공</li>
            </P.BulletList>
            <P.HeroActions>
              <P.PrimaryButton to="/offices">다른 사무소 보기</P.PrimaryButton>
              <P.SecondaryButton to="/contact">문의하기</P.SecondaryButton>
            </P.HeroActions>
          </P.Panel>
          <P.Panel>
            <P.Kicker>Head Office</P.Kicker>
            <P.SectionTitle>{headOffice?.label ?? '서울본사'}</P.SectionTitle>
            <img
              src={koreaMapAsset}
              alt="대한민국 지도"
              style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(19, 76, 158, 0.14)' }}
            />
          </P.Panel>
        </P.SplitGrid>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}
