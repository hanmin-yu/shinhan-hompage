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
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid ${palette.line};
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 42px rgba(16, 53, 114, 0.08);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background:
    radial-gradient(circle at top right, rgba(23, 159, 150, 0.08), transparent 26%),
    linear-gradient(180deg, rgba(242, 247, 255, 0.98), rgba(250, 252, 255, 0.98));
`;

const HeadCell = styled.th`
  padding: 16px 18px;
  border-bottom: 1px solid ${palette.line};
  color: ${palette.textBody};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: left;

  &:last-of-type {
    text-align: center;
  }

  @media (max-width: 920px) {
    &:last-of-type {
      display: none;
    }
  }
`;

const Row = styled.tr`
  border-bottom: 1px solid ${palette.lineSoft};

  &:last-of-type {
    border-bottom: 0;
  }
`;

const EmptyCell = styled.td`
  padding: 34px 18px;
  color: ${palette.textMuted};
  font-size: 0.94rem;
  font-weight: 600;
  line-height: 1.6;
  text-align: center;
`;

const Cell = styled.td`
  padding: 16px 18px;
  vertical-align: top;
  color: ${palette.textBody};
  font-size: 0.92rem;
  line-height: 1.6;

  @media (max-width: 920px) {
    &:last-of-type {
      display: none;
    }
  }
`;

const DateCell = styled(Cell)`
  color: ${palette.textMuted};
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const SourceBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid ${palette.line};
  background: linear-gradient(180deg, rgba(243, 249, 255, 0.98), rgba(234, 246, 244, 0.9));
  color: ${palette.blueDeep};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
`;

const TitleText = styled.span<{ $disabled?: boolean }>`
  color: ${({ $disabled }) => ($disabled ? '#7f93ad' : palette.blueInk)};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.55;
`;

const ActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  @media (max-width: 920px) {
    justify-content: flex-start;
  }
`;

const ActionAnchor = styled.a<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid ${palette.line};
  color: ${({ $disabled }) => ($disabled ? '#7f93ad' : palette.blue)};
  font-size: 0.84rem;
  font-weight: 700;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  background: ${({ $disabled }) => ($disabled ? 'rgba(127, 147, 173, 0.08)' : 'rgba(255, 255, 255, 0.92)')};
  text-decoration: none;
`;

const ActionRouterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid ${palette.line};
  color: ${palette.blue};
  font-size: 0.84rem;
  font-weight: 700;
  text-decoration: none;
`;

const TitleAnchor = styled.a`
  text-decoration: none;

  &:hover ${TitleText} {
    color: ${palette.blue};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
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
      <Table>
        <TableHead>
          <tr>
            <HeadCell>{dateLabel}</HeadCell>
            <HeadCell>{sourceLabel}</HeadCell>
            <HeadCell>{titleLabel}</HeadCell>
            <HeadCell>{actionLabel}</HeadCell>
          </tr>
        </TableHead>
        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <Row key={row.id} id={row.anchorId}>
                <DateCell>{row.publishedAt}</DateCell>
                <Cell>
                  <SourceBadge>{row.sourceLabel}</SourceBadge>
                </Cell>
                <Cell>{renderTitle(row)}</Cell>
                <Cell>
                  <ActionGroup>
                    {(row.actions ?? []).map((action, index) => renderAction(action, `${row.id}-${index}`))}
                  </ActionGroup>
                </Cell>
              </Row>
            ))
          ) : emptyMessage ? (
            <Row>
              <EmptyCell colSpan={4}>{emptyMessage}</EmptyCell>
            </Row>
          ) : null}
        </tbody>
      </Table>
    </Wrap>
  );
}
