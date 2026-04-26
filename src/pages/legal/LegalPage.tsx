import styled from '@emotion/styled';

import * as P from '../../components/site/PagePrimitives';
import { legalPages } from '../../data/legal';
import { useI18n } from '../../i18n/useI18n';
import type { LegalPageContent } from '../../types/site';

const HeroCard = styled(P.Panel)`
  display: grid;
  gap: 16px;
  padding: clamp(28px, 3vw, 40px);
  border-radius: 22px;
  background:
    radial-gradient(circle at top right, rgba(46, 101, 185, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 250, 255, 0.98));
  box-shadow: 0 24px 46px rgba(15, 53, 111, 0.08);
`;

const SectionStack = styled.div`
  display: grid;
  gap: 18px;
`;

const SectionCard = styled(P.Panel)`
  display: grid;
  gap: 16px;
  padding: clamp(22px, 2.6vw, 30px);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const SectionNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  border-radius: 999px;
  background: linear-gradient(180deg, #2365be, #15488f);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 800;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #143c76;
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.02em;
`;

const SectionBody = styled.div`
  display: grid;
  gap: 12px;
`;

const Paragraph = styled.p`
  margin: 0;
  color: #496280;
  font-size: 0.96rem;
  line-height: 1.82;
`;

type LegalPageProps = {
  pageKey: LegalPageContent['id'];
};

export function LegalPage({ pageKey }: LegalPageProps) {
  const { language, t } = useI18n();
  const page = legalPages[pageKey];

  const title = language === 'en' ? page.titleEn : page.title;
  const summary = language === 'en' ? page.summaryEn : page.summary;

  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <HeroCard>
            <div>
              <P.Kicker>{t('법적 고지', 'Legal Notice')}</P.Kicker>
              <P.SectionTitle>{title}</P.SectionTitle>
              <P.Lead>{summary}</P.Lead>
            </div>
          </HeroCard>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <SectionStack>
            {page.sections.map((section, index) => {
              const sectionTitle = language === 'en' ? section.titleEn : section.title;
              const paragraphs = language === 'en' ? section.paragraphsEn : section.paragraphs;
              const bullets = language === 'en' ? section.bulletsEn : section.bullets;

              return (
                <SectionCard key={section.title}>
                  <SectionHeader>
                    <SectionNumber>{String(index + 1).padStart(2, '0')}</SectionNumber>
                    <SectionTitle>{sectionTitle}</SectionTitle>
                  </SectionHeader>
                  <SectionBody>
                    {paragraphs.map((paragraph) => (
                      <Paragraph key={paragraph}>{paragraph}</Paragraph>
                    ))}
                    {bullets && bullets.length > 0 ? (
                      <P.BulletList>
                        {bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </P.BulletList>
                    ) : null}
                  </SectionBody>
                </SectionCard>
              );
            })}
          </SectionStack>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
