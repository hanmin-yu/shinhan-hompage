import styled from '@emotion/styled';
import { useMemo } from 'react';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { newsletterItems } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5d7496;
  font-size: 0.84rem;
  font-weight: 700;
`;

const LangBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid rgba(20, 75, 157, 0.2);
  background: #f6faff;
  color: #1e4f93;
  font-size: 0.75rem;
  font-weight: 700;
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  color: #1b56a8;
  font-size: 0.88rem;
  font-weight: 700;
`;

const ModeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 2px;
`;

const ModeButton = styled.button<{ $active: boolean }>`
  min-height: 36px;
  padding: 0 14px;
  border-radius: 6px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(20, 75, 157, 0.4)' : 'rgba(20, 75, 157, 0.18)')};
  background: ${({ $active }) => ($active ? '#eaf2ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#1b4f95' : '#567092')};
  font-size: 0.84rem;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  cursor: pointer;
`;

const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: auto;
`;

export function NewsletterPage() {
  const { language, setLanguage, t, tx } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const languageMode = language === 'en' ? 'en' : 'ko';

  const filteredItems = useMemo(
    () =>
      newsletterItems.filter((item) =>
        languageMode === 'en' ? item.language === '영문' : item.language !== '영문',
      ),
    [languageMode],
  );

  const handleModeChange = (nextMode: 'ko' | 'en') => {
    setLanguage(nextMode);
  };

  return (
    <>
      <P.HeroSection>
        <P.PageContainer>
          <LandingSubnav
            kicker={newsSubnav.kicker}
            kickerEn={newsSubnav.kickerEn}
            title={newsSubnav.title}
            titleEn={newsSubnav.titleEn}
            summary={newsSubnav.summary}
            summaryEn={newsSubnav.summaryEn}
            items={newsSubnav.items}
          />

        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <P.IntroPanel>
            <P.Kicker>Newsletter</P.Kicker>
            <P.Title>{t('소식지', 'Newsletter')}</P.Title>
            <P.Lead>
              {languageMode === 'en'
                ? 'You can review and download original English newsletters by month.'
                : '국문 소식지 원본을 월별로 확인하고 다운로드할 수 있습니다.'}
            </P.Lead>
            <ModeRow>
              <ModeButton type="button" $active={languageMode === 'ko'} onClick={() => handleModeChange('ko')}>
                {t('국문 모드', 'Korean Mode')}
              </ModeButton>
              <ModeButton type="button" $active={languageMode === 'en'} onClick={() => handleModeChange('en')}>
                {t('영문 모드', 'English Mode')}
              </ModeButton>
            </ModeRow>
          </P.IntroPanel>
          <P.IntroVisualPanel image="/subpages/about-coms1.jpg" minHeight={320} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Grid columns={2}>
            {filteredItems.length ? (
              filteredItems.map((item) => (
                <P.Card key={item.id}>
                  <MetaRow>
                    <span>{item.publishedAt}</span>
                    {item.language ? <LangBadge>{tx(item.language)}</LangBadge> : null}
                  </MetaRow>
                  <P.CardTitle>{tx(item.title)}</P.CardTitle>
                  <P.CardText>{tx(item.summary)}</P.CardText>
                  <CardActions>
                    <P.CardLink to={`/news/newsletter/${item.id}`}>
                      {t('소식지 보기', 'Read Newsletter')}
                    </P.CardLink>
                    {item.downloadHref ? (
                      <DownloadLink href={item.downloadHref} target="_blank" rel="noreferrer">
                        {t('소식지 다운로드', 'Download Newsletter')}
                      </DownloadLink>
                    ) : null}
                  </CardActions>
                </P.Card>
              ))
            ) : (
              <P.Card>
                <P.CardTitle>{t('등록된 소식지가 없습니다.', 'No newsletters are available.')}</P.CardTitle>
                <P.CardText>
                  {t(
                    '선택한 언어의 소식지 파일이 추가되면 이 영역에 자동으로 표시됩니다.',
                    'This section will be automatically populated when files for the selected language are added.',
                  )}
                </P.CardText>
              </P.Card>
            )}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
