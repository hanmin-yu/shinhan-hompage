import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import type { SiteContentGroupKey } from '../../types/site';
import {
  AdminActionRow,
  AdminButton,
  AdminField,
  AdminForm,
  AdminHint,
  AdminInput,
  AdminLabel,
  AdminModeBadge,
  AdminPanel,
  AdminReadonlyBanner,
  AdminSplitGrid,
  AdminSubnav,
  AdminSubnavLink,
  AdminTextarea,
  AdminTopRow,
  AdminUploadBox,
  AdminUploadMeta,
  AdminUploadTitle,
} from './AdminShared';
import { adminContentGroups } from './adminContentConfig';

type GroupResponse = {
  mode: string;
  groupId: SiteContentGroupKey;
  content: unknown;
};

export function AdminContentPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const params = useParams<{ groupId: SiteContentGroupKey }>();
  const groupId = params.groupId ?? 'global';
  const group = adminContentGroups.find((item) => item.id === groupId);
  const [value, setValue] = useState('');
  const [savedValue, setSavedValue] = useState('');
  const [message, setMessage] = useState('');
  const [assetGroup, setAssetGroup] = useState<string>(groupId);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setAssetGroup(groupId);
  }, [groupId]);

  useEffect(() => {
    if (!session.isAuthenticated || !group) {
      return;
    }

    void (async () => {
      const response = await fetch(`/api/admin/content/${group.id}`, {
        credentials: 'same-origin',
      });

      const payload = (await response.json()) as GroupResponse;
      const nextValue = JSON.stringify(payload.content, null, 2);
      setValue(nextValue);
      setSavedValue(nextValue);
      setMessage('');
    })();
  }, [group, session.isAuthenticated]);

  const hasChanges = useMemo(() => value !== savedValue, [savedValue, value]);

  if (loading) {
    return (
      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.CardText>{t('관리자 세션을 확인하는 중입니다.', 'Checking admin session.')}</P.CardText>
        </P.PageContainer>
      </P.PageSection>
    );
  }

  if (!session.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!group) {
    return <Navigate to="/admin" replace />;
  }

  const handleSave = async () => {
    try {
      const content = JSON.parse(value);
      const response = await fetch(`/api/admin/content/${group.id}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const payload = (await response.json()) as GroupResponse & { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? '저장에 실패했습니다.');
      }

      const nextValue = JSON.stringify(payload.content, null, 2);
      setValue(nextValue);
      setSavedValue(nextValue);
      setMessage(t('저장되었습니다.', 'Saved.'));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('저장에 실패했습니다.', 'Save failed.'));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage(t('업로드할 이미지를 선택해주세요.', 'Select an image to upload.'));
      return;
    }

    const formData = new FormData();
    formData.append('group', assetGroup);
    formData.append('file', selectedFile);

    const response = await fetch('/api/admin/assets/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    });

    const payload = (await response.json()) as { url?: string; message?: string };

    if (!response.ok || !payload.url) {
      setMessage(payload.message ?? t('이미지 업로드에 실패했습니다.', 'Image upload failed.'));
      return;
    }

    setMessage(`${t('업로드 완료', 'Uploaded')}: ${payload.url}`);
    setSelectedFile(null);
  };

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <AdminPanel>
          <AdminTopRow>
            <div>
              <P.Kicker>Admin</P.Kicker>
              <P.SectionTitle>{t(group.label, group.labelEn)}</P.SectionTitle>
            </div>
            <AdminActionRow>
              <AdminModeBadge $readonly={session.isReadOnly}>
                {session.isReadOnly ? t('데모 읽기 전용', 'Demo Read-only') : t('운영 모드', 'Runtime Enabled')}
              </AdminModeBadge>
              <AdminButton type="button" $secondary onClick={() => void logout()}>
                {t('로그아웃', 'Logout')}
              </AdminButton>
            </AdminActionRow>
          </AdminTopRow>

          <AdminSubnav>
            <AdminSubnavLink to="/admin" $active={false}>
              {t('대시보드', 'Dashboard')}
            </AdminSubnavLink>
            {adminContentGroups.map((item) => (
              <AdminSubnavLink
                key={item.id}
                to={item.id === 'members' ? '/admin/members' : `/admin/content/${item.id}`}
                $active={item.id === group.id}
              >
                {t(item.label, item.labelEn)}
              </AdminSubnavLink>
            ))}
            <AdminSubnavLink to="/admin/news/shinhan-news" $active={false}>
              {t('뉴스/소식지', 'News / Newsletter')}
            </AdminSubnavLink>
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                '읽기 전용 모드에서는 내용을 확인할 수 있지만 저장과 업로드는 비활성화됩니다.',
                'You can review content in read-only mode, but saves and uploads are disabled.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <AdminSplitGrid>
            <AdminPanel>
              <P.Kicker>{t('JSON 편집', 'JSON Editor')}</P.Kicker>
              <AdminHint>{t(group.summary, group.summaryEn)}</AdminHint>
              <AdminForm>
                <AdminField as="div">
                  <AdminLabel>{t('콘텐츠 JSON', 'Content JSON')}</AdminLabel>
                  <AdminTextarea value={value} onChange={(event) => setValue(event.target.value)} spellCheck={false} />
                </AdminField>
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleSave()} disabled={session.isReadOnly || !hasChanges}>
                    {t('저장', 'Save')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={() => setValue(savedValue)}>
                    {t('되돌리기', 'Reset')}
                  </AdminButton>
                </AdminActionRow>
                {message ? <AdminHint>{message}</AdminHint> : null}
              </AdminForm>
            </AdminPanel>

            <AdminPanel>
              <P.Kicker>{t('이미지 업로드', 'Asset Upload')}</P.Kicker>
              <AdminHint>
                {t(
                  '주요 페이지 이미지와 구성원 사진은 업로드 후 반환된 경로를 JSON에 넣어 연결합니다.',
                  'Upload hero/member images here, then paste the returned path into the JSON payload.',
                )}
              </AdminHint>
              <AdminForm>
                <AdminField>
                  <AdminLabel>{t('저장 폴더 그룹', 'Asset Group')}</AdminLabel>
                  <AdminInput value={assetGroup} onChange={(event) => setAssetGroup(event.target.value)} />
                </AdminField>
                <AdminUploadBox $active={Boolean(selectedFile)} $disabled={session.isReadOnly}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    disabled={session.isReadOnly}
                    onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                  />
                  <AdminUploadTitle>{selectedFile ? selectedFile.name : t('이미지 선택', 'Select Image')}</AdminUploadTitle>
                  <AdminUploadMeta>{t('PNG, JPG, WEBP, GIF 업로드 가능', 'PNG, JPG, WEBP, GIF supported')}</AdminUploadMeta>
                </AdminUploadBox>
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleUpload()} disabled={session.isReadOnly || !selectedFile}>
                    {t('업로드', 'Upload')}
                  </AdminButton>
                </AdminActionRow>
              </AdminForm>
            </AdminPanel>
          </AdminSplitGrid>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
