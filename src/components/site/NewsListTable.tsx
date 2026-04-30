import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { palette } from '../home/homeStyles';

export type NewsListTableAction = {
  label: string;
  href?: string;
  to?: string;
  external?: boolean;
  disabled?: boolean;
};

export type NewsListTableRow = {
  id: string;
  anchorId?: string;
  publishedAt: string;
  sourceLabel: string;
  title: string;
  href?: string;
  to?: string;
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
  border-top: 2px solid ${palette.blueInk};
  background: rgba(255, 255, 255, 0.86);
`;

const List = styled.ul`
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Row = styled.li`
  display: grid;
  grid-template-columns: minmax(140px, 0.18fr) minmax(0, 1fr) auto;
  gap: 22px;
  align-items: center;
  padding: 28px 6px;
  border-bottom: 1px solid rgba(16, 39, 68, 0.14);

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 24px 0;
  }
`;

const EmptyMessage = styled.p`
  margin: 0;
  padding: 42px 8px;
  border-bottom: 1px solid rgba(16, 39, 68, 0.14);
  color: ${palette.textMuted};
  font-size: 0.94rem;
  font-weight: 600;
  line-height: 1.6;
  text-align: center;
`;

const DateText = styled.span`
  display: block;
  color: ${palette.textMuted};
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const Content = styled.div`
  display: grid;
  gap: 10px;
  min-width: 0;
`;

const SourceText = styled.span`
  display: block;
  color: ${palette.blueDeep};
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.35;
`;

const TitleText = styled.span<{ $disabled?: boolean }>`
  display: block;
  color: ${({ $disabled }) => ($disabled ? '#7f93ad' : palette.textStrong)};
  font-size: clamp(1.05rem, 1.6vw, 1.32rem);
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

const ActionAnchor = styled.a<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 86px;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 0;
  border: 1px solid ${({ $disabled }) => ($disabled ? 'rgba(127, 147, 173, 0.28)' : 'rgba(16, 39, 68, 0.42)')};
  color: ${({ $disabled }) => ($disabled ? '#7f93ad' : palette.blueInk)};
  font-size: 0.82rem;
  font-weight: 800;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  background: ${({ $disabled }) => ($disabled ? 'rgba(127, 147, 173, 0.08)' : '#ffffff')};
  text-decoration: none;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    border-color: ${palette.blueInk};
    background: ${palette.blueInk};
    color: #ffffff;
  }
`;

const ActionRouterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 86px;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 0;
  border: 1px solid rgba(16, 39, 68, 0.42);
  color: ${palette.blueInk};
  font-size: 0.82rem;
  font-weight: 800;
  text-decoration: none;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    border-color: ${palette.blueInk};
    background: ${palette.blueInk};
    color: #ffffff;
  }
`;

const TitleAnchor = styled.a`
  text-decoration: none;

  &:hover ${TitleText} {
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

  &:hover ${TitleText} {
    color: ${palette.blue};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

function renderTitle(row: NewsListTableRow) {
  if (row.disabled || (!row.href && !row.to)) {
    return <TitleText $disabled={row.disabled}>{row.title}</TitleText>;
  }

  if (row.to) {
    return (
      <TitleRouterLink to={row.to}>
        <TitleText>{row.title}</TitleText>
      </TitleRouterLink>
    );
  }

  return (
    <TitleAnchor href={row.href} target={row.external ? '_blank' : undefined} rel={row.external ? 'noreferrer' : undefined}>
      <TitleText>{row.title}</TitleText>
    </TitleAnchor>
  );
}

function renderAction(action: NewsListTableAction, key: string) {
  if (action.disabled || (!action.href && !action.to)) {
    return (
      <ActionAnchor key={key} as="span" $disabled={action.disabled}>
        {action.label}
      </ActionAnchor>
    );
  }

  if (action.to) {
    return (
      <ActionRouterLink key={key} to={action.to}>
        {action.label}
      </ActionRouterLink>
    );
  }

  return (
    <ActionAnchor
      key={key}
      href={action.href}
      target={action.external ? '_blank' : undefined}
      rel={action.external ? 'noreferrer' : undefined}
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
