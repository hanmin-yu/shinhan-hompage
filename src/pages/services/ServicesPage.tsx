import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { serviceLandingGroups } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const IntroVisual = styled(P.IntroVisualPanel)`
  border-radius: 14px;
`;

const ServiceMap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 22px;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceMapCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100%;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid rgba(20, 74, 152, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(242, 247, 255, 0.94));
  box-shadow: 0 12px 28px rgba(14, 47, 98, 0.05);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(20, 74, 152, 0.28);
    box-shadow: 0 18px 36px rgba(14, 47, 98, 0.08);
  }
`;

const ServiceMapMeta = styled.span`
  color: #6482a7;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const ServiceMapTitle = styled.h3`
  margin: 0;
  color: #123d78;
  font-size: 1.08rem;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;
`;

const ServiceMapItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ServiceMapTag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(28, 88, 168, 0.08);
  color: #1a4f98;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const GroupStack = styled.div`
  display: grid;
  gap: 18px;
`;

const GroupPanel = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 0.46fr) minmax(0, 0.54fr);
  border-radius: 12px;
  border: 1px solid rgba(20, 74, 152, 0.16);
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 10px 26px rgba(14, 47, 98, 0.07);

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const GroupVisual = styled.div<{ image: string }>`
  min-height: 250px;
  background:
    linear-gradient(180deg, rgba(6, 30, 68, 0.28), rgba(6, 30, 68, 0.08)),
    ${({ image }) => `url(${image}) center / cover no-repeat`};
`;

const GroupBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(18px, 2vw, 24px);
`;

const GroupMeta = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #eef5ff;
  color: #1c58a8;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const GroupTitle = styled.h3`
  margin: 0;
  color: #143d78;
  font-size: clamp(1.44rem, 2.6vw, 1.86rem);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const GroupText = styled.p`
  margin: 0;
  color: #426181;
  font-size: 0.97rem;
  line-height: 1.7;
`;

const ItemList = styled.div`
  display: grid;
  gap: 8px;
`;

const ItemLink = styled(Link)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 48px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid rgba(20, 74, 152, 0.12);
  background: #f7faff;
  color: #1a4f98;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  transition: all 0.18s ease;

  &:hover,
  &:focus-visible {
    background: #eef5ff;
    border-color: rgba(20, 74, 152, 0.3);
    color: #123d78;
  }
`;

const ItemHint = styled.span`
  color: #6e83a0;
  font-size: 0.8rem;
  font-weight: 700;
`;

export function ServicesPage() {
  const { t } = useI18n();
  const servicesSubnav = sectionSubnav.services;

  return (
    <>
      <P.HeroSection>
        <P.PageContainer>
          <LandingSubnav
            kicker={servicesSubnav.kicker}
            kickerEn={servicesSubnav.kickerEn}
            title={servicesSubnav.title}
            titleEn={servicesSubnav.titleEn}
            items={servicesSubnav.items}
          />
        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <P.IntroPanel>
            <P.Kicker>Practice Areas</P.Kicker>
            <P.Title>{t('업무분야', 'Practice Areas')}</P.Title>
            <P.Lead>
              {t(
                '신한관세법인의 업무분야는 4개 중분류 체계로 구성되며, 각 중분류 안에서 세부 서비스를 바로 확인할 수 있습니다.',
                'Our practice areas are organized into four mid-level categories, each showing detailed services at a glance.',
              )}
            </P.Lead>
            <P.Lead>
              {t(
                '수출입통관 및 환급, 검역/요건, 컨설팅, 기타 체계를 기준으로 필요한 업무영역으로 바로 이동할 수 있습니다.',
                'You can move directly into the right practice area through clearance & refund, quarantine/requirements, consulting, and specialized services.',
              )}
            </P.Lead>
          </P.IntroPanel>
          <IntroVisual image="/subpages/service-main-import.jpg" minHeight={380} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
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
      </P.PageSection>
    </>
  );
}
