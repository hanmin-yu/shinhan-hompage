import styled from '@emotion/styled';

import { palette } from '../home/homeStyles';

type NewsListPaginationProps = {
  currentPage: number;
  totalPages: number;
  previousLabel: string;
  nextLabel: string;
  onPageChange: (page: number) => void;
};

type PaginationItem =
  | {
      type: 'page';
      value: number;
    }
  | {
      type: 'ellipsis';
      value: string;
    };

const Wrap = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 18px;
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const NavButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(214, 154, 54, 0.24)' : palette.line)};
  background: ${({ $active }) => ($active ? palette.chipBackgroundActive : 'rgba(255, 255, 255, 0.94)')};
  color: ${({ $active }) => ($active ? '#ffffff' : palette.textBody)};
  font-size: 0.88rem;
  font-weight: 800;
  transition:
    color 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(16, 53, 114, 0.1);
  }

  &:disabled {
    color: #93a7c0;
    background: rgba(248, 250, 253, 0.92);
    border-color: rgba(147, 167, 192, 0.18);
    cursor: default;
    box-shadow: none;
  }
`;

const Ellipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  color: ${palette.textMuted};
  font-size: 0.88rem;
  font-weight: 800;
`;

function buildPaginationItems(totalPages: number, currentPage: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => ({
      type: 'page' as const,
      value: index + 1,
    }));
  }

  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
  }

  const sortedPages = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((left, right) => left - right);
  const items: PaginationItem[] = [];

  sortedPages.forEach((page, index) => {
    if (index > 0) {
      const previousPage = sortedPages[index - 1];
      if (page - previousPage > 1) {
        items.push({
          type: 'ellipsis',
          value: `${previousPage}-${page}`,
        });
      }
    }

    items.push({
      type: 'page',
      value: page,
    });
  });

  return items;
}

export function NewsListPagination({
  currentPage,
  totalPages,
  previousLabel,
  nextLabel,
  onPageChange,
}: NewsListPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = buildPaginationItems(totalPages, currentPage);

  return (
    <Wrap aria-label="Pagination">
      <Inner>
        <NavButton type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          {previousLabel}
        </NavButton>
        {items.map((item) =>
          item.type === 'ellipsis' ? (
            <Ellipsis key={item.value}>...</Ellipsis>
          ) : (
            <NavButton
              key={item.value}
              type="button"
              $active={item.value === currentPage}
              onClick={() => onPageChange(item.value)}
              aria-current={item.value === currentPage ? 'page' : undefined}
            >
              {item.value}
            </NavButton>
          ),
        )}
        <NavButton type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          {nextLabel}
        </NavButton>
      </Inner>
    </Wrap>
  );
}
