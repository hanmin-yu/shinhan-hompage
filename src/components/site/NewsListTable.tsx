import styled from '@emotion/styled';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { palette } from '../home/homeStyles';
import { downloadFileFromUrl } from '../../utils/downloadFile';

type NewsListTableActionVariant = 'default' | 'primary' | 'recruiting';

export type NewsListTableAction = {
  label: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  external?: boolean;
  disabled?: boolean;
  downloadFileName?: string;
  variant?: NewsListTableActionVariant;
};

export type NewsListTableRow = {
  id: string;
  anchorId?: string;
  publishedAt: string;
  sourceLabel: string;
  title: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  external?: boolean;
  disabled?: boolean;
  actions?: NewsListTableAction[];
};

type NewsListTableProps = {
  rows: NewsListTableRow[];
  dateLabel: string;
  sourceLabel: string;
  titleLabel: string;
  actionLabel: string;
  emptyMessage?: string;
};

const Wrap = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(18, 63, 133, 0.13);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 22px 42px rgba(10, 45, 99, 0.08);

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 4px;
    background: linear-gradient(90deg, #123f85, #2567c2, #8eb8ed);
  }
`;

const List = styled.ul`
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Row = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: minmax(132px, 0.16fr) minmax(0, 1fr) auto;
  gap: 22px;
  align-items: center;
  padding: 24px 24px;
  border-bottom: 1px solid rgba(18, 63, 133, 0.1);
  transition:
    background-color 0.18s ease,
    transform 0.18s ease;

  &:first-of-type {
    padding-top: 28px;
  }

  &:hover {
    background: linear-gradient(90deg, rgba(18, 63, 133, 0.052), rgba(37, 103, 194, 0.035));
  }

  &:last-of-type {
    border-bottom: 0;
  }

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 22px 18px;
  }
`;

const EmptyMessage = styled.p`
  margin: 0;
  padding: 48px 18px 44px;
  color: ${palette.textMuted};
  font-size: 0.94rem;
  font-weight: 600;
  line-height: 1.6;
  text-align: center;
`;

const DateText = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 32px;
  align-items: center;
  padding: 0 11px;
  border-radius: 8px;
  border: 1px solid rgba(18, 63, 133, 0.1);
  background: rgba(244, 248, 253, 0.92);
  color: ${palette.blueInk};
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const Content = styled.div`
  display: grid;
  gap: 10px;
  min-width: 0;
`;

const SourceText = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 26px;
  align-items: center;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(37, 103, 194, 0.1);
  color: ${palette.blueDeep};
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1.35;
`;

const TitleText = styled.span<{ $disabled?: boolean }>`
  display: block;
  color: ${({ $disabled }) => ($disabled ? '#7f93ad' : palette.textStrong)};
  font-size: clamp(1.03rem, 1.28vw, 1.2rem);
  font-weight: 800;
  line-height: 1.45;
`;

const ActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  min-width: 108px;

  @media (max-width: 920px) {
    justify-content: flex-start;
    min-width: 0;
  }
`;

function getActionBorder($disabled?: boolean, $variant: NewsListTableActionVariant = 'default') {
  if ($variant === 'recruiting') return 'rgba(217, 119, 6, 0.62)';
  if ($disabled && $variant === 'primary') return 'rgba(18, 63, 133, 0.26)';
  if ($disabled) return 'rgba(127, 147, 173, 0.24)';
  if ($variant === 'primary') return 'rgba(18, 63, 133, 0.26)';
  return 'rgba(18, 63, 133, 0.18)';
}

function getActionColor($disabled?: boolean, $variant: NewsListTableActionVariant = 'default') {
  if ($variant === 'recruiting') return '#ffffff';
  if ($disabled && $variant === 'primary') return '#ffffff';
  if ($disabled) return '#7f93ad';
  if ($variant === 'primary') return '#ffffff';
  return palette.blueInk;
}

function getActionBackground($disabled?: boolean, $variant: NewsListTableActionVariant = 'default') {
  if ($variant === 'recruiting') return 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)';
  if ($disabled && $variant === 'primary') return 'linear-gradient(135deg, #123f85, #2567c2)';
  if ($disabled) return 'rgba(127, 147, 173, 0.08)';
  if ($variant === 'primary') return 'linear-gradient(135deg, #123f85, #2567c2)';
  return 'rgba(255, 255, 255, 0.92)';
}

function getActionShadow($variant: NewsListTableActionVariant = 'default') {
  if ($variant === 'recruiting') return '0 14px 24px rgba(249, 115, 22, 0.28), 0 0 0 3px rgba(245, 158, 11, 0.12)';
  if ($variant === 'primary') return '0 12px 20px rgba(18, 63, 133, 0.18)';
  return 'none';
}

const ActionAnchor = styled.a<{ $disabled?: boolean; $variant?: NewsListTableActionVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '8px' : '0')};
  min-width: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '96px' : '86px')};
  min-height: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '40px' : '38px')};
  padding: 0 ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '16px' : '14px')};
  border-radius: 8px;
  border: 1px solid ${({ $disabled, $variant = 'default' }) => getActionBorder($disabled, $variant)};
  color: ${({ $disabled, $variant = 'default' }) => getActionColor($disabled, $variant)};
  font-size: 0.82rem;
  font-weight: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? 900 : 800)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  background: ${({ $disabled, $variant = 'default' }) => getActionBackground($disabled, $variant)};
  text-decoration: none;
  box-shadow: ${({ $variant = 'default' }) => getActionShadow($variant)};
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  &::before {
    content: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? "''" : 'none')};
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.24);
  }

  &:hover {
    border-color: ${palette.blueInk};
    background: ${palette.blueInk};
    color: #ffffff;
    box-shadow: 0 10px 18px rgba(18, 63, 133, 0.18);
  }
`;

const ActionRouterLink = styled(Link)<{ $variant?: NewsListTableActionVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '8px' : '0')};
  min-width: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '96px' : '86px')};
  min-height: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '40px' : '38px')};
  padding: 0 ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '16px' : '14px')};
  border-radius: 8px;
  border: 1px solid ${({ $variant = 'default' }) => getActionBorder(false, $variant)};
  color: ${({ $variant = 'default' }) => getActionColor(false, $variant)};
  font-size: 0.82rem;
  font-weight: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? 900 : 800)};
  background: ${({ $variant = 'default' }) => getActionBackground(false, $variant)};
  box-shadow: ${({ $variant = 'default' }) => getActionShadow($variant)};
  text-decoration: none;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  &::before {
    content: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? "''" : 'none')};
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.24);
  }

  &:hover {
    border-color: ${palette.blueInk};
    background: ${palette.blueInk};
    color: #ffffff;
    box-shadow: 0 10px 18px rgba(18, 63, 133, 0.18);
  }
`;

const ActionButton = styled.button<{ $variant?: NewsListTableActionVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '8px' : '0')};
  min-width: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '96px' : '86px')};
  min-height: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '40px' : '38px')};
  padding: 0 ${({ $variant = 'default' }) => ($variant === 'recruiting' ? '16px' : '14px')};
  border-radius: 8px;
  border: 1px solid ${({ $variant = 'default' }) => getActionBorder(false, $variant)};
  color: ${({ $variant = 'default' }) => getActionColor(false, $variant)};
  font-size: 0.82rem;
  font-weight: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? 900 : 800)};
  background: ${({ $variant = 'default' }) => getActionBackground(false, $variant)};
  box-shadow: ${({ $variant = 'default' }) => getActionShadow($variant)};
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  &::before {
    content: ${({ $variant = 'default' }) => ($variant === 'recruiting' ? "''" : 'none')};
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.24);
  }

  &:hover {
    border-color: ${palette.blueInk};
    background: ${palette.blueInk};
    color: #ffffff;
    box-shadow: 0 10px 18px rgba(18, 63, 133, 0.18);
  }
`;

const TitleAnchor = styled.a`
  text-decoration: none;

  &:hover [data-title-text] {
    color: ${palette.blue};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const TitleRouterLink = styled(Link)`
  text-decoration: none;

  &:hover [data-title-text] {
    color: ${palette.blue};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const TitleButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;

  &:hover [data-title-text] {
    color: ${palette.blue};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

function renderTitle(row: NewsListTableRow) {
  if (row.disabled || (!row.href && !row.to && !row.onClick)) {
    return <TitleText data-title-text $disabled={row.disabled}>{row.title}</TitleText>;
  }

  if (row.to) {
    return (
      <TitleRouterLink to={row.to}>
        <TitleText data-title-text>{row.title}</TitleText>
      </TitleRouterLink>
    );
  }

  if (row.onClick) {
    return (
      <TitleButton type="button" onClick={row.onClick}>
        <TitleText data-title-text>{row.title}</TitleText>
      </TitleButton>
    );
  }

  return (
    <TitleAnchor href={row.href} target={row.external ? '_blank' : undefined} rel={row.external ? 'noreferrer' : undefined}>
      <TitleText data-title-text>{row.title}</TitleText>
    </TitleAnchor>
  );
}

function renderAction(action: NewsListTableAction, key: string) {
  if (action.disabled || (!action.href && !action.to && !action.onClick)) {
    return (
      <ActionAnchor key={key} as="span" $disabled $variant={action.variant}>
        {action.label}
      </ActionAnchor>
    );
  }

  if (action.to) {
    return (
      <ActionRouterLink key={key} to={action.to} $variant={action.variant}>
        {action.label}
      </ActionRouterLink>
    );
  }

  if (action.onClick) {
    return (
      <ActionButton key={key} type="button" onClick={action.onClick} $variant={action.variant}>
        {action.label}
      </ActionButton>
    );
  }

  return (
    <ActionAnchor
      key={key}
      href={action.href}
      download={action.downloadFileName}
      onClick={
        action.downloadFileName && action.href
          ? (event: MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              void downloadFileFromUrl(action.href!, action.downloadFileName!);
            }
          : undefined
      }
      target={action.external ? '_blank' : undefined}
      rel={action.external ? 'noreferrer' : undefined}
      $variant={action.variant}
    >
      {action.label}
    </ActionAnchor>
  );
}

export function NewsListTable({ rows, dateLabel, sourceLabel, titleLabel, actionLabel, emptyMessage }: NewsListTableProps) {
  return (
    <Wrap>
      <List aria-label={`${dateLabel}, ${sourceLabel}, ${titleLabel}, ${actionLabel}`}>
        {rows.length ? (
          rows.map((row) => (
            <Row key={row.id} id={row.anchorId}>
              <DateText>
                <SrOnly>{dateLabel}: </SrOnly>
                {row.publishedAt}
              </DateText>
              <Content>
                <SourceText>
                  <SrOnly>{sourceLabel}: </SrOnly>
                  {row.sourceLabel}
                </SourceText>
                <div>
                  <SrOnly>{titleLabel}: </SrOnly>
                  {renderTitle(row)}
                </div>
              </Content>
              <ActionGroup aria-label={actionLabel}>
                {(row.actions ?? []).map((action, index) => renderAction(action, `${row.id}-${index}`))}
              </ActionGroup>
            </Row>
          ))
        ) : emptyMessage ? (
          <li>
            <EmptyMessage>{emptyMessage}</EmptyMessage>
          </li>
        ) : null}
      </List>
    </Wrap>
  );
}
