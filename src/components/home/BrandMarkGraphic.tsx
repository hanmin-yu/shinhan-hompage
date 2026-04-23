import { useState } from 'react';

import { brandMarkPath } from '../../data/home';
import * as S from './homeStyles';

type BrandMarkGraphicProps = {
  alt: string;
};

export function BrandMarkGraphic({ alt }: BrandMarkGraphicProps) {
  const [missing, setMissing] = useState(false);

  if (!missing) {
    return <S.BrandMarkImage src={brandMarkPath} alt={alt} onError={() => setMissing(true)} />;
  }

  return (
    <S.BrandLogo viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="white" />
      <path d="M32 10L49 37H15L32 10Z" fill="#1661C6" />
      <rect x="28" y="28" width="8" height="18" rx="2" fill="white" />
      <path d="M8 56H56" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </S.BrandLogo>
  );
}

