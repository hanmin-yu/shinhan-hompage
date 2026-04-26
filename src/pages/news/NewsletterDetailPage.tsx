import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { newsletterItems } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import { getNewsletterAssetSlug } from '../../utils/newsletter';

type NewsletterManifest = {
  slug: string;
  pdf?: string | null;
  images: string[];
};

const ContentBlock = styled.div`
  margin-top: 12px;
`;

const ViewerWrap = styled.div`
  padding: clamp(16px, 2.4vw, 24px);
  border-radius: 18px;
  border: 1px solid rgba(20, 75, 157, 0.18);
  background: linear-gradient(180deg, #f9fbff, #eef4fb);
  box-shadow: 0 24px 44px rgba(13, 44, 92, 0.08);
`;

const ViewerHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 15px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.2);
  background: #f7fbff;
  color: #1b56a8;
  font-size: 0.88rem;
  font-weight: 700;
`;

const ViewerControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const NavButton = styled.button<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ $primary }) => ($primary ? 'rgba(19, 81, 174, 0.3)' : 'rgba(19, 75, 154, 0.18)')};
  background: ${({ $primary }) => ($primary ? 'linear-gradient(180deg, #2567c2, #174d9a)' : '#ffffff')};
  color: ${({ $primary }) => ($primary ? '#ffffff' : '#1b4f95')};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;

const PageCounter = styled.div`
  min-width: 96px;
  color: #173f77;
  font-size: 0.93rem;
  font-weight: 800;
  text-align: center;
`;

const ViewerStage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 68vh;
  padding: clamp(12px, 2vw, 20px);
  border-radius: 16px;
  background:
    radial-gradient(circle at top, rgba(54, 110, 191, 0.12), transparent 32%),
    linear-gradient(180deg, #dfe9f7, #edf3fb 22%, #dde8f7 100%);
  border: 1px solid rgba(20, 75, 157, 0.14);

  @media (max-width: 820px) {
    min-height: 50vh;
  }
`;

const PageImage = styled.img`
  width: min(100%, 980px);
  height: auto;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 26px 50px rgba(14, 36, 77, 0.16);
`;

const ThumbnailRail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(88px, 108px);
  gap: 10px;
  overflow-x: auto;
  margin-top: 16px;
  padding-bottom: 4px;
`;

const ThumbnailButton = styled.button<{ $active: boolean }>`
  display: grid;
  gap: 6px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(20, 75, 157, 0.36)' : 'rgba(20, 75, 157, 0.12)')};
  background: ${({ $active }) => ($active ? 'rgba(234, 242, 255, 0.9)' : 'rgba(255, 255, 255, 0.82)')};
  cursor: pointer;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  background: #ffffff;
`;

const ThumbnailLabel = styled.span`
  color: #325682;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
`;

export function NewsletterDetailPage() {
  const { t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { newsletterId } = useParams<{ newsletterId: string }>();

  const item = useMemo(() => newsletterItems.find((entry) => entry.id === newsletterId) ?? null, [newsletterId]);
  const [manifest, setManifest] = useState<NewsletterManifest | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const activeSlug = getNewsletterAssetSlug(item?.downloadHref);

  useEffect(() => {
    let ignore = false;

    if (!activeSlug) {
      setManifest(null);
      return;
    }

    setLoadingPreview(true);

    fetch(`/newsletters/render/${activeSlug}/manifest.json`)
      .then(async (res) => {
        if (!res.ok) throw new Error('manifest not found');
        const data = (await res.json()) as NewsletterManifest;
        if (!ignore) setManifest(data);
      })
      .catch(() => {
        if (!ignore) setManifest(null);
      })
      .finally(() => {
        if (!ignore) setLoadingPreview(false);
      });

    return () => {
      ignore = true;
    };
  }, [activeSlug]);

  const imageUrls =
    manifest?.images && activeSlug ? manifest.images.map((name) => `/newsletters/render/${activeSlug}/${name}`) : [];
  const currentImageUrl = imageUrls[activePageIndex] ?? null;

  useEffect(() => {
    setActivePageIndex(0);
  }, [activeSlug, imageUrls.length]);

  useEffect(() => {
    if (!imageUrls.length) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setActivePageIndex((current) => Math.min(current + 1, imageUrls.length - 1));
      }

      if (event.key === 'ArrowLeft') {
        setActivePageIndex((current) => Math.max(current - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [imageUrls.length]);

  const movePage = (direction: -1 | 1) => {
    setActivePageIndex((current) => Math.min(Math.max(current + direction, 0), imageUrls.length - 1));
  };

  if (!item) {
    return <Navigate to="/news/newsletter" replace />;
  }

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

          <ContentBlock data-reveal>
            <ViewerWrap>
              <ViewerHeader>
                <ActionRow>
                  <P.CardLink to="/news/newsletter">{t('소식지 목록', 'Newsletter List')}</P.CardLink>
                  {item.downloadHref ? (
                    <DownloadLink href={item.downloadHref} target="_blank" rel="noreferrer">
                      {t('원본 다운로드', 'Download Original')}
                    </DownloadLink>
                  ) : null}
                </ActionRow>
                {imageUrls.length ? (
                  <ViewerControls>
                    <NavButton type="button" onClick={() => movePage(-1)} disabled={activePageIndex === 0}>
                      {t('이전 페이지', 'Previous')}
                    </NavButton>
                    <PageCounter>
                      {t(`${activePageIndex + 1} / ${imageUrls.length} 페이지`, `Page ${activePageIndex + 1} / ${imageUrls.length}`)}
                    </PageCounter>
                    <NavButton
                      type="button"
                      $primary
                      onClick={() => movePage(1)}
                      disabled={activePageIndex === imageUrls.length - 1}
                    >
                      {t('다음 페이지', 'Next')}
                    </NavButton>
                  </ViewerControls>
                ) : null}
              </ViewerHeader>

              {loadingPreview ? <P.CardText>{t('소식지를 불러오는 중입니다...', 'Loading newsletter...')}</P.CardText> : null}

              {!loadingPreview && currentImageUrl ? (
                <>
                  <ViewerStage>
                    <PageImage
                      src={currentImageUrl}
                      alt={`${t(item.title, item.titleEn)} ${t(`${activePageIndex + 1}페이지`, `page ${activePageIndex + 1}`)}`}
                    />
                  </ViewerStage>

                  <ThumbnailRail aria-label={t('소식지 페이지 목록', 'Newsletter page list')}>
                    {imageUrls.map((src, index) => (
                      <ThumbnailButton
                        key={src}
                        type="button"
                        $active={index === activePageIndex}
                        onClick={() => setActivePageIndex(index)}
                      >
                        <ThumbnailImage
                          src={src}
                          alt={`${t(item.title, item.titleEn)} ${t(`${index + 1}페이지 미리보기`, `page ${index + 1} preview`)}`}
                          loading="lazy"
                        />
                        <ThumbnailLabel>{t(`${index + 1}페이지`, `Page ${index + 1}`)}</ThumbnailLabel>
                      </ThumbnailButton>
                    ))}
                  </ThumbnailRail>
                </>
              ) : null}

              {!loadingPreview && !imageUrls.length ? (
                <P.CardText>
                  {t(
                    '웹 미리보기 파일이 아직 준비되지 않았습니다. 원본 다운로드 버튼으로 확인해주세요.',
                    'Web preview files are not available yet. Please use the original download button.',
                  )}
                </P.CardText>
              ) : null}
            </ViewerWrap>
          </ContentBlock>
        </P.PageContainer>
      </P.HeroSection>
    </>
  );
}
