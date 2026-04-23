import * as S from './homeStyles';

type SectionHeaderProps = {
  label: string;
  title: string;
  linkLabel: string;
  href: string;
};

export function SectionHeader({ label, title, linkLabel, href }: SectionHeaderProps) {
  return (
    <S.LandingSectionTop>
      <div>
        <S.LandingLabel>{label}</S.LandingLabel>
        <S.LandingTitle>{title}</S.LandingTitle>
      </div>
      <S.LandingLink href={href}>{linkLabel}</S.LandingLink>
    </S.LandingSectionTop>
  );
}

