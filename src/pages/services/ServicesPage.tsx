import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { serviceLandingGroups } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const EditorialSection = styled.section<{ $tone?: 'soft' }>`
  padding: clamp(78px, 9vw, 128px) 0;
  border-top: 1px solid #d8dee8;
  background: ${({ $tone }) => ($tone === 'soft' ? 'linear-gradient(180deg, #f5f6f8 0%, #fbfcfd 100%)' : '#ffffff')};
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 54px);
`;

const HeroEyebrow = styled.span`
  color: #52647c;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.64rem, 6.4vw, 6.2rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.055em;
  text-wrap: balance;
`;

const HeroLeadGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(280px, 0.42fr);
  gap: clamp(28px, 5vw, 74px);
  align-items: end;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLead = styled.p`
  max-width: 760px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.6vw, 1.28rem);
  line-height: 1.82;
`;

const HeroFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid #d5dbe4;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 252, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);
  overflow: hidden;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const HeroFact = styled.div`
  position: relative;
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 136px;
  padding: 24px 24px 22px;
  border-right: 1px solid #dbe0e8;

  &::before {
    content: '';
    width: 34px;
    height: 3px;
    background: linear-gradient(90deg, #1d5fb6, #1aa398);
  }

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 640px) {
    min-height: auto;
    padding: 22px 20px;
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const HeroFactValue = styled.strong`
  color: #172337;
  font-size: clamp(1.32rem, 2vw, 1.92rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  overflow-wrap: anywhere;
`;

const HeroFactLabel = styled.span`
  color: #687385;
  font-size: 0.92rem;
  line-height: 1.58;
  overflow-wrap: anywhere;
`;

const SectionLabel = styled.span`
  display: inline-flex;
  margin-bottom: 16px;
  color: #52647c;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const EditorialTitle = styled.h2`
  max-width: 940px;
  margin: 0 0 clamp(28px, 4vw, 48px);
  color: #172337;
  font-size: clamp(2.2rem, 4.8vw, 4.8rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.055em;
  text-wrap: balance;
`;

const ServiceMap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid #d5dbe4;
  border-bottom: 1px solid #d5dbe4;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceMapCard = styled.a`
  display: grid;
  align-content: start;
  gap: 14px;
  min-height: 210px;
  padding: clamp(20px, 2.6vw, 34px);
  border-right: 1px solid #dbe0e8;
  color: #172337;

  &:last-of-type {
    border-right: 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.72);
  }

  @media (max-width: 1180px) {
    &:nth-of-type(2n) {
      border-right: 0;
    }
  }

  @media (max-width: 720px) {
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const ServiceMapMeta = styled.span`
  color: #52647c;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const ServiceMapTitle = styled.h3`
  margin: 0;
  color: #172337;
  font-size: clamp(1.3rem, 2.2vw, 1.82rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.035em;
`;

const ServiceMapItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ServiceMapTag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid #dbe0e8;
  color: #4f5661;
  font-size: 0.8rem;
  font-weight: 800;
`;

const GroupStack = styled.div`
  display: grid;
  gap: clamp(26px, 4vw, 42px);
`;

const GroupPanel = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 0.46fr) minmax(0, 0.54fr);
  border-top: 1px solid #d5dbe4;
  background: #ffffff;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const GroupVisual = styled.div<{ image: string }>`
  min-height: clamp(280px, 31vw, 420px);
  background:
    linear-gradient(180deg, rgba(8, 17, 31, 0.08), rgba(8, 17, 31, 0.28)),
    ${({ image }) => `url(${image}) center / cover no-repeat`};
`;

const GroupBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  padding: clamp(28px, 4vw, 54px);
`;

const GroupMeta = styled.span`
  color: #52647c;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const GroupTitle = styled.h3`
  margin: 0;
  color: #172337;
  font-size: clamp(2rem, 3.6vw, 3.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.055em;
`;

const GroupText = styled.p`
  margin: 0;
  color: #52647c;
  font-size: 1rem;
  line-height: 1.76;
`;

const ItemList = styled.div`
  display: grid;
  border-top: 1px solid #dbe0e8;
`;

const ItemLink = styled(Link)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 56px;
  border-bottom: 1px solid #dbe0e8;
  color: #172337;
  font-size: 0.98rem;
  font-weight: 800;

  &:hover {
    color: #1d4f96;
  }
`;

const ItemHint = styled.span`
  color: #687385;
  font-size: 0.8rem;
  font-weight: 800;
`;

export function ServicesPage() {
  const { t } = useI18n();
  const servicesSubnav = sectionSubnav.services;

  return (
    <>
      <EditorialPageHeader
        config={servicesSubnav}
        title={servicesSubnav.title}
        titleEn={servicesSubnav.titleEn}
        heroImage="/hero/menu-services-ai.png"
        heroPosition="center 50%"
      />

      <EditorialSection>
        <HeroStatement data-reveal>
          <div>
            <HeroEyebrow>Practice Areas</HeroEyebrow>
            <HeroTitle>{t('무역 현장의 흐름을 하나의 서비스 체계로 연결합니다.', 'Connecting trade operations through one service system.')}</HeroTitle>
          </div>
          <HeroLeadGrid>
            <HeroLead>
              {t(
                '신한관세법인은 수출입통관 및 환급, 검역/요건, 컨설팅, 물류와 해외 지원까지 기업의 무역 실무에 필요한 업무를 체계적으로 제공합니다.',
                'Shinhan Customs Service provides a structured practice system covering clearance and refunds, quarantine and requirements, consulting, logistics, and overseas support.',
              )}
            </HeroLead>
            <HeroFacts>
              <HeroFact>
                <HeroFactValue>4</HeroFactValue>
                <HeroFactLabel>{t('중분류 업무 체계', 'Main practice categories')}</HeroFactLabel>
              </HeroFact>
              <HeroFact>
                <HeroFactValue>14+</HeroFactValue>
                <HeroFactLabel>{t('세부 서비스 페이지', 'Detailed service pages')}</HeroFactLabel>
              </HeroFact>
              <HeroFact>
                <HeroFactValue>All-in-One</HeroFactValue>
                <HeroFactLabel>{t('통관·컨설팅·물류 연계', 'Clearance, consulting, and logistics')}</HeroFactLabel>
              </HeroFact>
            </HeroFacts>
          </HeroLeadGrid>
        </HeroStatement>
      </EditorialSection>

      <EditorialSection $tone="soft">
        <P.PageContainer data-reveal>
          <SectionLabel>Service Map</SectionLabel>
          <EditorialTitle>{t('필요한 업무영역으로 바로 이동하세요.', 'Move directly to the practice area you need.')}</EditorialTitle>
          <ServiceMap>
            {serviceLandingGroups.map((group) => (
              <ServiceMapCard key={`map-${group.id}`} href={`#${group.id}`}>
                <ServiceMapMeta>{t(group.heading, group.headingEn)}</ServiceMapMeta>
                <ServiceMapTitle>{t(group.title, group.titleEn)}</ServiceMapTitle>
                <ServiceMapItems>
                  {group.items.map((item) => (
                    <ServiceMapTag key={`${group.id}-${item.label}`}>{t(item.label, item.labelEn)}</ServiceMapTag>
                  ))}
                </ServiceMapItems>
              </ServiceMapCard>
            ))}
          </ServiceMap>
        </P.PageContainer>
      </EditorialSection>

      <EditorialSection>
        <P.PageContainer data-reveal>
          <SectionLabel>Practice Detail</SectionLabel>
          <EditorialTitle>{t('업무별 범위와 상세 서비스를 확인할 수 있습니다.', 'Review scope and detailed services by practice area.')}</EditorialTitle>
          <GroupStack>
            {serviceLandingGroups.map((group) => (
              <GroupPanel key={group.id} id={group.id}>
                <GroupVisual image={group.image} aria-hidden="true" />
                <GroupBody>
                  <GroupMeta>{t(group.heading, group.headingEn)}</GroupMeta>
                  <GroupTitle>{t(group.title, group.titleEn)}</GroupTitle>
                  <GroupText>{t(group.description, group.descriptionEn)}</GroupText>
                  <ItemList>
                    {group.items.map((item) => (
                      <ItemLink key={item.href + item.label} to={item.href}>
                        <span>{t(item.label, item.labelEn)}</span>
                        <ItemHint>{t('상세 보기', 'Details')}</ItemHint>
                      </ItemLink>
                    ))}
                  </ItemList>
                </GroupBody>
              </GroupPanel>
            ))}
          </GroupStack>
        </P.PageContainer>
      </EditorialSection>
    </>
  );
}
