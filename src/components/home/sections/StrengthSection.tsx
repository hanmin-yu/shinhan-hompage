import styled from '@emotion/styled';
import networkGraphic from '../../../assets/hero-corporate-network.svg';
import officeGraphic from '../../../assets/hero-corporate-office.svg';

import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const strengths = [
  {
    titleKo: '운영 대응력',
    titleEn: 'Operational Responsiveness',
    bodyKo: '신고, 보완, 사후관리까지 업무 단계별 핵심 항목을 정리해 운영 공백을 줄입니다.',
    bodyEn: 'We organize key actions by stage, from declaration and correction to post-management, to reduce operational gaps.',
    labelKo: '현장 실행 체계',
    labelEn: 'Execution Framework',
  },
  {
    titleKo: '전국 지사 네트워크',
    titleEn: 'Nationwide Branch Network',
    bodyKo: '서울·인천·부산·청주·구미·인비스타 거점 협업으로 지역별 통관 이슈를 처리합니다.',
    bodyEn: 'Regional customs issues are handled through coordinated work across Seoul, Incheon, Busan, Cheongju, Gumi, and Invista.',
    labelKo: '전국 협업 체계',
    labelEn: 'Nationwide Collaboration',
    graphic: networkGraphic,
  },
  {
    titleKo: '해외 법인 연계',
    titleEn: 'Overseas Office Integration',
    bodyKo: '하노이 법인과 KORD Partners 협업으로 해외 거래 규정 변경 대응을 지원합니다.',
    bodyEn: 'We support responses to overseas regulatory changes through coordination with the Hanoi office and KORD Partners.',
    labelKo: '해외 연계 운영',
    labelEn: 'Overseas Coordination',
    graphic: officeGraphic,
  },
];

const Section = styled.section`
  padding: 88px 0;
  background: linear-gradient(180deg, #edf5ff 0%, #f3f8ff 100%);
  border-top: 1px solid rgba(19, 73, 152, 0.11);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #21549a;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(41, 93, 173, 0.54);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #103a72;
  font-size: clamp(1.98rem, 3.5vw, 2.85rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 14px;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.article`
  position: relative;
  min-height: 398px;
  padding: 28px 26px;
  border-radius: 6px;
  border: 1px solid rgba(20, 76, 158, 0.2);
  background:
    linear-gradient(180deg, rgba(12, 38, 78, 0.14) 0%, rgba(9, 31, 64, 0.5) 100%),
    url('/subpages/about-coms1.jpg') center / cover no-repeat;
  box-shadow: 0 12px 22px rgba(16, 53, 114, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(20, 76, 158, 0.28);
    box-shadow: 0 14px 24px rgba(16, 53, 114, 0.14);
  }
`;

const FeatureContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 18px;
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(8, 28, 58, 0.76), rgba(8, 28, 58, 0.62));
  border: 1px solid rgba(214, 229, 248, 0.3);
`;

const FeatureLabel = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(238, 246, 255, 0.14);
  border: 1px solid rgba(220, 234, 252, 0.4);
  color: #d9e9ff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const CardTitle = styled.h3<{ light?: boolean }>`
  margin: 0;
  color: ${({ light }) => (light ? '#f5f9ff' : '#11407c')};
  font-size: 1.16rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const CardBody = styled.p<{ light?: boolean }>`
  margin: 12px 0 0;
  color: ${({ light }) => (light ? 'rgba(232, 241, 255, 0.92)' : '#42658f')};
  font-size: 0.92rem;
  line-height: 1.66;
`;

const SideStack = styled.div`
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-rows: none;
    grid-template-columns: 1fr;
  }
`;

const SideCard = styled.article<{ image: string }>`
  position: relative;
  min-height: 190px;
  padding: 22px 22px 20px;
  border-radius: 6px;
  border: 1px solid rgba(20, 76, 158, 0.18);
  background:
    linear-gradient(135deg, rgba(240, 247, 255, 0.97) 0%, rgba(233, 243, 255, 0.95) 100%),
    ${({ image }) => `url(${image}) right 14px bottom 14px / 124px no-repeat`};
  box-shadow: 0 10px 18px rgba(16, 53, 114, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(20, 76, 158, 0.27);
    box-shadow: 0 12px 20px rgba(16, 53, 114, 0.11);
  }
`;

const SideLabel = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(20, 76, 158, 0.26);
  color: #26579c;
  background: #f5f9ff;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export function StrengthSection() {
  const { t } = useI18n();
  const [feature, ...sideItems] = strengths;

  if (!feature) return null;

  return (
    <Section>
      <Inner data-reveal>
        <div>
          <Label>Shinhan Strength</Label>
          <Title>{t('신한의 강점', 'Why Shinhan')}</Title>
        </div>

        <Grid>
          <FeatureCard>
            <FeatureContent>
              <FeatureLabel>{t(feature.labelKo, feature.labelEn)}</FeatureLabel>
              <CardTitle light style={{ marginTop: '10px' }}>
                {t(feature.titleKo, feature.titleEn)}
              </CardTitle>
              <CardBody light>{t(feature.bodyKo, feature.bodyEn)}</CardBody>
            </FeatureContent>
          </FeatureCard>

          <SideStack>
            {sideItems.map((strength) => (
              <SideCard key={strength.titleKo} image={strength.graphic ?? networkGraphic}>
                <SideLabel>{t(strength.labelKo, strength.labelEn)}</SideLabel>
                <CardTitle style={{ marginTop: '10px' }}>{t(strength.titleKo, strength.titleEn)}</CardTitle>
                <CardBody>{t(strength.bodyKo, strength.bodyEn)}</CardBody>
              </SideCard>
            ))}
          </SideStack>
        </Grid>
      </Inner>
    </Section>
  );
}
