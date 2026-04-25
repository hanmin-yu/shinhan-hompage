import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { newsletterItems } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';
import { getNewsletterAssetSlug } from '../../utils/newsletter';

type NewsletterManifest = {
  slug: string;
  pdf?: string | null;
  images: string[];
};

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: #5d7496;
  font-size: 0.86rem;
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
  font-size: 0.74rem;
  font-weight: 700;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 15px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.2);
  background: #ffffff;
  color: #1b4f95;
  font-size: 0.88rem;
  font-weight: 700;
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

const ViewerWrap = styled.div`
  margin-top: 18px;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid rgba(20, 75, 157, 0.18);
  background: #fbfdff;
`;

const ViewerTitle = styled.h3`
  margin: 0 0 12px;
  color: #173f77;
  font-size: 1.02rem;
  line-height: 1.4;
`;

const PdfFrame = styled.iframe`
  width: 100%;
  height: min(72vh, 900px);
  border: 1px solid rgba(20, 75, 157, 0.16);
  border-radius: 8px;
  background: #ffffff;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImagePage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.12);
  background: #ffffff;
`;

export function NewsletterDetailPage() {
  const { t, tx } = useI18n();
  const { newsletterId } = useParams<{ newsletterId: string }>();

  const activeItem = useMemo(
    () => newsletterItems.find((item) => item.id === newsletterId) ?? null,
    [newsletterId],
  );

  const [manifest, setManifest] = useState<NewsletterManifest | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const activeSlug = getNewsletterAssetSlug(activeItem?.downloadHref);

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

  const pdfUrl = manifest?.pdf && activeSlug ? `/newsletters/render/${activeSlug}/${manifest.pdf}` : null;
  const imageUrls =
    manifest?.images && activeSlug ? manifest.images.map((name) => `/newsletters/render/${activeSlug}/${name}`) : [];

  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Newsletter</P.Kicker>
          <P.SectionTitle>{t('소식지 보기', 'Newsletter Detail')}</P.SectionTitle>

          {activeItem ? (
            <>
              <P.Lead>{tx(activeItem.title)}</P.Lead>
              <MetaRow>
                <span>{activeItem.publishedAt}</span>
                {activeItem.language ? <LangBadge>{tx(activeItem.language)}</LangBadge> : null}
              </MetaRow>
              <P.CardText style={{ marginTop: 8 }}>{tx(activeItem.summary)}</P.CardText>

              <ActionRow>
                <BackLink to="/news/newsletter">{t('소식지 목록', 'Newsletter List')}</BackLink>
                {activeItem.downloadHref ? (
                  <DownloadLink href={activeItem.downloadHref} target="_blank" rel="noreferrer">
                    {t('원본 다운로드', 'Download Original')}
                  </DownloadLink>
                ) : null}
              </ActionRow>

              <ViewerWrap>
                <ViewerTitle>{t('소식지 원문', 'Newsletter Content')}</ViewerTitle>

                {loadingPreview ? (
                  <P.CardText>{t('소식지를 불러오는 중입니다...', 'Loading newsletter...')}</P.CardText>
                ) : null}

                {!loadingPreview && pdfUrl ? <PdfFrame src={pdfUrl} title={`${tx(activeItem.title)} PDF`} /> : null}

                {!loadingPreview && !pdfUrl && imageUrls.length ? (
                  <ImageList>
                    {imageUrls.map((src, idx) => (
                      <ImagePage key={src} src={src} alt={`${tx(activeItem.title)} ${idx + 1}`} loading="lazy" />
                    ))}
                  </ImageList>
                ) : null}

                {!loadingPreview && !pdfUrl && !imageUrls.length ? (
                  <P.CardText>
                    {t(
                      '웹 미리보기 파일이 아직 준비되지 않았습니다. 원본 다운로드 버튼으로 확인해주세요.',
                      'Web preview files are not available yet. Please use the original download button.',
                    )}
                  </P.CardText>
                ) : null}
              </ViewerWrap>
            </>
          ) : (
            <P.Card style={{ marginTop: 20 }}>
              <P.CardTitle>{t('소식지를 찾을 수 없습니다.', 'Newsletter not found')}</P.CardTitle>
              <P.CardText>
                {t(
                  '요청하신 소식지 경로가 올바르지 않거나 삭제되었습니다. 목록 페이지에서 다시 선택해주세요.',
                  'The requested newsletter path is invalid or no longer available. Please choose it again from the list.',
                )}
              </P.CardText>
              <P.CardLink to="/news/newsletter">{t('소식지 목록으로 이동', 'Go to Newsletter List')}</P.CardLink>
            </P.Card>
          )}
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
