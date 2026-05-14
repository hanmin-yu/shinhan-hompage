import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { palette } from '../../components/home/homeStyles';

export const AdminPanel = styled.section`
  display: grid;
  align-content: start;
  gap: clamp(16px, 2vw, 22px);
  padding: clamp(22px, 2.8vw, 34px);
  border-radius: 10px;
  border: 1px solid ${palette.line};
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 42px rgba(16, 53, 114, 0.07);
`;

export const AdminTopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const AdminActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const AdminButton = styled.button<{ $secondary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 6px;
  border: 1px solid ${({ $secondary }) => ($secondary ? palette.lineStrong : palette.blue)};
  background: ${({ $secondary }) =>
    $secondary ? 'rgba(255, 255, 255, 0.94)' : `linear-gradient(180deg, ${palette.blue}, #0f3674)`};
  color: ${({ $secondary }) => ($secondary ? palette.blueDeep : '#ffffff')};
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const AdminLinkButton = styled(Link)<{ $secondary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 6px;
  border: 1px solid ${({ $secondary }) => ($secondary ? palette.lineStrong : palette.blue)};
  background: ${({ $secondary }) =>
    $secondary ? 'rgba(255, 255, 255, 0.94)' : `linear-gradient(180deg, ${palette.blue}, #0f3674)`};
  color: ${({ $secondary }) => ($secondary ? palette.blueDeep : '#ffffff')};
  font-size: 0.92rem;
  font-weight: 700;
`;

export const AdminModeBadge = styled.span<{ $readonly?: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid ${({ $readonly }) => ($readonly ? 'rgba(214, 154, 54, 0.24)' : 'rgba(24, 86, 170, 0.24)')};
  background: ${({ $readonly }) =>
    $readonly ? 'rgba(255, 247, 233, 0.96)' : 'linear-gradient(180deg, rgba(235, 244, 255, 0.98), rgba(228, 239, 255, 0.94))'};
  color: ${({ $readonly }) => ($readonly ? '#9b6319' : palette.blueDeep)};
  font-size: 0.82rem;
  font-weight: 800;
`;

export const AdminStatusBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid rgba(20, 75, 157, 0.12);
  background: linear-gradient(180deg, rgba(247, 251, 255, 0.98), rgba(240, 246, 255, 0.9));
`;

export const AdminStatusPill = styled.span<{ $accent?: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 11px;
  border-radius: 6px;
  border: 1px solid ${({ $accent }) => ($accent ? 'rgba(23, 159, 150, 0.28)' : 'rgba(20, 75, 157, 0.18)')};
  background: ${({ $accent }) => ($accent ? 'rgba(232, 248, 247, 0.92)' : 'rgba(255, 255, 255, 0.92)')};
  color: ${({ $accent }) => ($accent ? '#087b75' : palette.blueDeep)};
  font-size: 0.82rem;
  font-weight: 800;
`;

export const AdminSubnav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  border-bottom: 1px solid ${palette.line};
`;

export const AdminSubnavLink = styled(Link)<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0 20px;
  border-bottom: 3px solid ${({ $active }) => ($active ? palette.blue : 'transparent')};
  color: ${({ $active }) => ($active ? palette.blueDeep : palette.textMuted)};
  font-size: 0.9rem;
  font-weight: 800;
`;

export const AdminReadonlyBanner = styled.div`
  padding: 16px 18px;
  border-radius: 8px;
  border: 1px solid rgba(214, 154, 54, 0.2);
  background: linear-gradient(180deg, rgba(255, 250, 242, 0.98), rgba(255, 246, 232, 0.96));
  color: #8e5a18;
  font-size: 0.95rem;
  line-height: 1.65;
  font-weight: 600;
`;

export const AdminSplitGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 18px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const AdminCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const AdminMiniCard = styled.article`
  display: grid;
  gap: 8px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${palette.line};
  background: rgba(255, 255, 255, 0.92);
`;

export const AdminCardTitle = styled.h3`
  margin: 0;
  color: ${palette.textPrimary};
  font-size: 1.08rem;
  font-weight: 800;
`;

export const AdminSectionTitle = styled.h2`
  margin: 0;
  color: ${palette.blueDeep};
  font-size: clamp(1.45rem, 2vw, 2rem);
  font-weight: 800;
  line-height: 1.22;
  letter-spacing: 0;
`;

export const AdminMuted = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 0.94rem;
  line-height: 1.68;
`;

export const AdminList = styled.div`
  display: grid;
  gap: 10px;
`;

export const AdminListItem = styled.article`
  display: grid;
  gap: 8px;
  padding: 16px 18px;
  border-radius: 8px;
  border: 1px solid rgba(20, 75, 157, 0.12);
  background: rgba(255, 255, 255, 0.92);
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;

  &:hover {
    border-color: rgba(20, 75, 157, 0.28);
    box-shadow: 0 12px 28px rgba(16, 53, 114, 0.08);
    transform: translateY(-1px);
  }
`;

export const AdminListMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: ${palette.textMuted};
  font-size: 0.84rem;
  font-weight: 700;
`;

export const AdminListTitle = styled.h4`
  margin: 0;
  color: ${palette.textPrimary};
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.45;
`;

export const AdminListSummary = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 0.92rem;
  line-height: 1.66;
`;

export const AdminForm = styled.form`
  display: grid;
  gap: 14px;
`;

export const AdminFieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const AdminField = styled.label`
  display: grid;
  gap: 8px;
`;

export const AdminUploadBox = styled.label<{ $active?: boolean; $disabled?: boolean }>`
  display: grid;
  gap: 9px;
  padding: 22px;
  border-radius: 10px;
  border: 1px dashed ${({ $active }) => ($active ? palette.teal : 'rgba(20, 75, 157, 0.3)')};
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, rgba(232, 248, 247, 0.98), rgba(241, 250, 255, 0.96))'
      : 'linear-gradient(180deg, rgba(248, 251, 255, 0.98), rgba(244, 248, 255, 0.96))'};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.62 : 1)};
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    border-color: ${({ $disabled }) => ($disabled ? 'rgba(20, 75, 157, 0.3)' : palette.teal)};
    box-shadow: ${({ $disabled }) => ($disabled ? 'none' : '0 14px 30px rgba(16, 53, 114, 0.08)')};
  }

  input {
    display: none;
  }
`;

export const AdminUploadTitle = styled.span`
  color: ${palette.blueDeep};
  font-size: 1.02rem;
  font-weight: 800;
  line-height: 1.45;
`;

export const AdminUploadMeta = styled.span`
  color: ${palette.textMuted};
  font-size: 0.86rem;
  font-weight: 700;
  line-height: 1.55;
`;

export const AdminInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const AdminInfoItem = styled.div`
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid rgba(20, 75, 157, 0.12);
  background: rgba(255, 255, 255, 0.92);

  strong {
    color: ${palette.blueDeep};
    font-size: 0.82rem;
    font-weight: 800;
  }

  span {
    color: ${palette.textBody};
    font-size: 0.9rem;
    line-height: 1.45;
  }
`;

export const AdminLabel = styled.span`
  color: ${palette.textPrimary};
  font-size: 0.88rem;
  font-weight: 700;
`;

export const AdminInput = styled.input`
  min-height: 46px;
  padding: 0 14px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.16);
  background: #ffffff;
  color: ${palette.textPrimary};
  font-size: 0.94rem;
`;

export const AdminSelect = styled.select`
  min-height: 46px;
  padding: 0 14px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.16);
  background: #ffffff;
  color: ${palette.textPrimary};
  font-size: 0.94rem;
`;

export const AdminTextarea = styled.textarea`
  min-height: 140px;
  padding: 14px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.16);
  background: #ffffff;
  color: ${palette.textPrimary};
  font-size: 0.94rem;
  line-height: 1.66;
  resize: vertical;
`;

export const AdminHint = styled.p`
  margin: 0;
  color: ${palette.textMuted};
  font-size: 0.85rem;
  line-height: 1.58;
`;
