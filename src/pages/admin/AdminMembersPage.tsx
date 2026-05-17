import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import type { ExpertCategoryConfig, ManagedMember } from '../../types/site';
import {
  AdminActionRow,
  AdminButton,
  AdminField,
  AdminFieldGrid,
  AdminForm,
  AdminHint,
  AdminInput,
  AdminLabel,
  AdminList,
  AdminListItem,
  AdminListMeta,
  AdminListSummary,
  AdminListTitle,
  AdminModeBadge,
  AdminPanel,
  AdminReadonlyBanner,
  AdminSelect,
  AdminSplitGrid,
  AdminSubnav,
  AdminSubnavLink,
  AdminTextarea,
  AdminTopRow,
  AdminUploadBox,
  AdminUploadTitle,
  AdminUploadMeta,
} from './AdminShared';
import { adminNavigationItems } from './adminContentConfig';

type MemberResponse = {
  mode: string;
  members: ManagedMember[];
  expertCategoryConfig: ExpertCategoryConfig;
  contactMemberIds: string[];
};

type MemberFormState = {
  id: string;
  name: string;
  phone: string;
  email: string;
  title: string;
  department: string;
  practice: string;
  accent: string;
  image: string;
  imageFit: 'contain' | 'cover';
  imagePosition: string;
  groups: string;
  careerHighlights: string;
};

const emptyForm: MemberFormState = {
  id: '',
  name: '',
  phone: '',
  email: '',
  title: '',
  department: '',
  practice: '',
  accent: '#526f9e',
  image: '',
  imageFit: 'cover',
  imagePosition: '',
  groups: 'expert',
  careerHighlights: '',
};

function toForm(member?: ManagedMember | null): MemberFormState {
  if (!member) {
    return emptyForm;
  }

  return {
    id: member.id,
    name: member.name,
    phone: member.phone,
    email: member.email,
    title: member.title,
    department: member.department,
    practice: member.practice,
    accent: member.accent,
    image: member.image ?? '',
    imageFit: member.imageFit ?? 'cover',
    imagePosition: member.imagePosition ?? '',
    groups: member.groups.join(', '),
    careerHighlights: member.careerHighlights?.join('\n') ?? '',
  };
}

export function AdminMembersPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const [members, setMembers] = useState<ManagedMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [form, setForm] = useState<MemberFormState>(emptyForm);
  const [configText, setConfigText] = useState('');
  const [savedConfigText, setSavedConfigText] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!session.isAuthenticated) {
      return;
    }

    void (async () => {
      const response = await fetch('/api/admin/members', {
        credentials: 'same-origin',
      });
      const payload = (await response.json()) as MemberResponse;
      setMembers(payload.members);
      const configValue = JSON.stringify(
        {
          expertCategoryConfig: payload.expertCategoryConfig,
          contactMemberIds: payload.contactMemberIds,
        },
        null,
        2,
      );
      setConfigText(configValue);
      setSavedConfigText(configValue);
    })();
  }, [session.isAuthenticated]);

  const selectedMember = useMemo(() => members.find((member) => member.id === selectedMemberId) ?? null, [members, selectedMemberId]);

  useEffect(() => {
    setForm(toForm(selectedMember));
  }, [selectedMember]);

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

  const upsertLocalMember = (member: ManagedMember) => {
    setMembers((current) => {
      const existingIndex = current.findIndex((item) => item.id === member.id);
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = member;
        return next;
      }
      return [member, ...current];
    });
    setSelectedMemberId(member.id);
    setForm(toForm(member));
  };

  const handleMemberSave = async () => {
    const payload = {
      id: form.id || undefined,
      name: form.name,
      phone: form.phone,
      email: form.email,
      title: form.title,
      department: form.department,
      practice: form.practice,
      accent: form.accent,
      image: form.image,
      imageFit: form.imageFit,
      imagePosition: form.imagePosition,
      groups: form.groups
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      careerHighlights: form.careerHighlights
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const isUpdate = Boolean(form.id);
    const response = await fetch(isUpdate ? `/api/admin/members/${form.id}` : '/api/admin/members', {
      method: isUpdate ? 'PUT' : 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ member: payload }),
    });

    const result = (await response.json()) as { member?: ManagedMember; message?: string };

    if (!response.ok || !result.member) {
      setMessage(result.message ?? t('구성원 저장에 실패했습니다.', 'Failed to save member.'));
      return;
    }

    upsertLocalMember(result.member);
    setMessage(t('구성원 정보가 저장되었습니다.', 'Member saved.'));
  };

  const handleDelete = async () => {
    if (!form.id) {
      return;
    }

    const response = await fetch(`/api/admin/members/${form.id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });
    const result = (await response.json()) as { message?: string };

    if (!response.ok) {
      setMessage(result.message ?? t('구성원 삭제에 실패했습니다.', 'Failed to delete member.'));
      return;
    }

    setMembers((current) => current.filter((item) => item.id !== form.id));
    setSelectedMemberId('');
    setForm(emptyForm);
    setMessage(t('구성원을 삭제했습니다.', 'Member removed.'));
  };

  const handleConfigSave = async () => {
    try {
      const parsed = JSON.parse(configText) as {
        expertCategoryConfig: ExpertCategoryConfig;
        contactMemberIds: string[];
      };

      const response = await fetch('/api/admin/members/config', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message ?? '구성원 설정 저장에 실패했습니다.');
      }

      setSavedConfigText(configText);
      setMessage(t('구성원 설정이 저장되었습니다.', 'Member configuration saved.'));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('구성원 설정 저장에 실패했습니다.', 'Member configuration failed.'));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage(t('업로드할 이미지를 선택해주세요.', 'Select an image to upload.'));
      return;
    }

    const formData = new FormData();
    formData.append('group', 'members');
    formData.append('file', selectedFile);

    const response = await fetch('/api/admin/assets/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    });

    const result = (await response.json()) as { url?: string; message?: string };
    if (!response.ok || !result.url) {
      setMessage(result.message ?? t('이미지 업로드에 실패했습니다.', 'Image upload failed.'));
      return;
    }

    setForm((current) => ({
      ...current,
      image: result.url ?? current.image,
    }));
    setSelectedFile(null);
    setMessage(`${t('업로드 완료', 'Uploaded')}: ${result.url}`);
  };

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <AdminPanel>
          <AdminTopRow>
            <div>
              <P.Kicker>Admin</P.Kicker>
              <P.SectionTitle>{t('구성원 관리자', 'Members Admin')}</P.SectionTitle>
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
            {adminNavigationItems.map((item) => (
              <AdminSubnavLink
                key={item.id}
                to={item.to}
                $active={item.id === 'members'}
              >
                {item.label}
              </AdminSubnavLink>
            ))}
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                '읽기 전용 모드에서는 구성원 구조를 확인할 수 있지만 저장과 삭제는 비활성화됩니다.',
                'You can review the member structure in read-only mode, but saves and deletes are disabled.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <AdminSplitGrid>
            <AdminPanel>
              <P.Kicker>{t('구성원 목록', 'Member List')}</P.Kicker>
              <AdminList>
                {members.map((member) => (
                  <AdminListItem
                    key={member.id}
                    as="button"
                    $active={selectedMemberId === member.id}
                    onClick={() => setSelectedMemberId(member.id)}
                  >
                    <AdminListMeta>{member.groups.join(', ')}</AdminListMeta>
                    <AdminListTitle>{member.name}</AdminListTitle>
                    <AdminListSummary>{member.title}</AdminListSummary>
                  </AdminListItem>
                ))}
              </AdminList>
            </AdminPanel>

            <AdminPanel>
              <P.Kicker>{t('구성원 편집', 'Member Form')}</P.Kicker>
              <AdminForm>
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('이름', 'Name')}</AdminLabel>
                    <AdminInput value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
                  </AdminField>
                  <AdminField>
                    <AdminLabel>{t('그룹', 'Groups')}</AdminLabel>
                    <AdminInput
                      value={form.groups}
                      onChange={(event) => setForm((current) => ({ ...current, groups: event.target.value }))}
                      placeholder="featured, executive, expert, advisor"
                    />
                  </AdminField>
                </AdminFieldGrid>
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('직함', 'Title')}</AdminLabel>
                    <AdminInput value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                  </AdminField>
                  <AdminField>
                    <AdminLabel>{t('부서', 'Department')}</AdminLabel>
                    <AdminInput value={form.department} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} />
                  </AdminField>
                </AdminFieldGrid>
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('전화', 'Phone')}</AdminLabel>
                    <AdminInput value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
                  </AdminField>
                  <AdminField>
                    <AdminLabel>{t('이메일', 'Email')}</AdminLabel>
                    <AdminInput value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
                  </AdminField>
                </AdminFieldGrid>
                <AdminField>
                  <AdminLabel>{t('전문분야 설명', 'Practice')}</AdminLabel>
                  <AdminTextarea value={form.practice} onChange={(event) => setForm((current) => ({ ...current, practice: event.target.value }))} />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('주요 경력/강조 문구', 'Highlights')}</AdminLabel>
                  <AdminTextarea
                    value={form.careerHighlights}
                    onChange={(event) => setForm((current) => ({ ...current, careerHighlights: event.target.value }))}
                    placeholder={t('한 줄에 하나씩 입력', 'One item per line')}
                  />
                </AdminField>
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('이미지 경로', 'Image URL')}</AdminLabel>
                    <AdminInput value={form.image} onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))} />
                  </AdminField>
                  <AdminField>
                    <AdminLabel>{t('이미지 정렬', 'Image Position')}</AdminLabel>
                    <AdminInput
                      value={form.imagePosition}
                      onChange={(event) => setForm((current) => ({ ...current, imagePosition: event.target.value }))}
                    />
                  </AdminField>
                </AdminFieldGrid>
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('이미지 채우기', 'Image Fit')}</AdminLabel>
                    <AdminSelect
                      value={form.imageFit}
                      onChange={(event) => setForm((current) => ({ ...current, imageFit: event.target.value as 'contain' | 'cover' }))}
                    >
                      <option value="cover">cover</option>
                      <option value="contain">contain</option>
                    </AdminSelect>
                  </AdminField>
                  <AdminField>
                    <AdminLabel>{t('강조 색상', 'Accent')}</AdminLabel>
                    <AdminInput value={form.accent} onChange={(event) => setForm((current) => ({ ...current, accent: event.target.value }))} />
                  </AdminField>
                </AdminFieldGrid>
                <AdminUploadBox $active={Boolean(selectedFile)} $disabled={session.isReadOnly}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    disabled={session.isReadOnly}
                    onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                  />
                  <AdminUploadTitle>{selectedFile ? selectedFile.name : t('프로필 이미지 선택', 'Select Profile Image')}</AdminUploadTitle>
                  <AdminUploadMeta>{t('업로드 후 이미지 경로가 입력란에 반영됩니다.', 'Uploaded image path will be inserted into the field.')}</AdminUploadMeta>
                </AdminUploadBox>
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleUpload()} disabled={session.isReadOnly || !selectedFile}>
                    {t('이미지 업로드', 'Upload Image')}
                  </AdminButton>
                  <AdminButton type="button" onClick={() => void handleMemberSave()} disabled={session.isReadOnly}>
                    {t('구성원 저장', 'Save Member')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={() => void handleDelete()} disabled={session.isReadOnly || !form.id}>
                    {t('구성원 삭제', 'Delete Member')}
                  </AdminButton>
                </AdminActionRow>
              </AdminForm>
            </AdminPanel>
          </AdminSplitGrid>

          <AdminPanel>
            <P.Kicker>{t('전문가 배치 설정', 'Expert Assignment Settings')}</P.Kicker>
            <AdminHint>
              {t(
                '분야별 전문가 카테고리 배치, 카테고리별 강조 문구, IT 연락 담당 연결은 아래 JSON에서 관리합니다.',
                'Manage expert category assignments, category-specific highlights, and IT contact links in the JSON below.',
              )}
            </AdminHint>
            <AdminForm>
              <AdminField as="div">
                <AdminLabel>{t('구성원 설정 JSON', 'Member Config JSON')}</AdminLabel>
                <AdminTextarea value={configText} onChange={(event) => setConfigText(event.target.value)} spellCheck={false} />
              </AdminField>
              <AdminActionRow>
                <AdminButton type="button" onClick={() => void handleConfigSave()} disabled={session.isReadOnly || configText === savedConfigText}>
                  {t('설정 저장', 'Save Config')}
                </AdminButton>
                <AdminButton type="button" $secondary onClick={() => setConfigText(savedConfigText)}>
                  {t('되돌리기', 'Reset')}
                </AdminButton>
                <AdminButton type="button" $secondary onClick={() => { setSelectedMemberId(''); setForm(emptyForm); }}>
                  {t('새 구성원', 'New Member')}
                </AdminButton>
              </AdminActionRow>
              {message ? <AdminHint>{message}</AdminHint> : null}
            </AdminForm>
          </AdminPanel>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
