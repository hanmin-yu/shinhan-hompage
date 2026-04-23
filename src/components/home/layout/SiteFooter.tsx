import { footerLinks, siteContact } from '../../../data/home';
import { BrandMarkGraphic } from '../BrandMarkGraphic';
import * as S from '../homeStyles';

export function SiteFooter() {
  return (
    <S.Footer>
      <S.FooterInner>
        <S.FooterTop>
          <S.FooterBrandWrap>
            <S.BrandMark aria-hidden="true">
              <BrandMarkGraphic alt="신한관세법인 로고" />
            </S.BrandMark>
            <S.FooterBrandText>
              <S.FooterBrandTitle>SHINHAN</S.FooterBrandTitle>
              <S.FooterBrandSub>신한관세법인</S.FooterBrandSub>
            </S.FooterBrandText>
          </S.FooterBrandWrap>
        </S.FooterTop>

        <S.FooterPolicyRow>
          {footerLinks.map((item) => (
            <S.FooterPolicyLink key={item.id} href={item.href ?? '/'}>
              {item.label}
            </S.FooterPolicyLink>
          ))}
        </S.FooterPolicyRow>

        <S.FooterInfo>
          <S.FooterLine>
            <S.FooterLabel>주소</S.FooterLabel> {siteContact.address}
          </S.FooterLine>
          <S.FooterLine>
            <S.FooterLabel>T.</S.FooterLabel> {siteContact.phone} | <S.FooterLabel>E.</S.FooterLabel>{' '}
            {siteContact.email}
          </S.FooterLine>
          <S.FooterLine>
            <S.FooterLabel>사업자등록번호</S.FooterLabel> {siteContact.businessNumber}
          </S.FooterLine>
          <S.FooterCopyright>COPYRIGHT © 신한관세법인 ALL RIGHTS RESERVED.</S.FooterCopyright>
        </S.FooterInfo>
      </S.FooterInner>
    </S.Footer>
  );
}
