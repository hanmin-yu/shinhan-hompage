import styled from '@emotion/styled';

import { palette } from '../home/homeStyles';

export type NewsListChipOption = {
  value: string;
  label: string;
};

export type NewsListSelectOption = {
  value: string;
  label: string;
};

type NewsListToolbarProps = {
  searchLabel: string;
  searchValue: string;
  searchPlaceholder: string;
  onSearchChange: (value: string) => void;
  chipLabel?: string;
  chipOptions?: NewsListChipOption[];
  selectedChip?: string;
  onChipChange?: (value: string) => void;
  sortLabel?: string;
  sortOptions?: NewsListSelectOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  resultLabel: string;
  resetLabel?: string;
  onReset?: () => void;
  resetDisabled?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
};

const ToolbarCard = styled.div`
  display: grid;
  gap: 10px;
  margin: 0 0 14px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid ${palette.line};
  background:
    radial-gradient(circle at top right, rgba(54, 112, 192, 0.16), transparent 34%),
    radial-gradient(circle at 14% 18%, rgba(214, 154, 54, 0.08), transparent 18%),
    ${palette.panelBackgroundStrong};
  box-shadow: 0 20px 40px rgba(16, 53, 114, 0.08);

  @media (max-width: 720px) {
    padding: 14px;
    gap: 12px;
  }
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 1100px) {
    align-items: flex-start;
    flex-wrap: wrap;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  align-items: center;
  gap: 10px;

  @media (max-width: 1100px) {
    flex-wrap: wrap;
  }
`;

const Field = styled.div`
  min-width: 0;
`;

const SearchField = styled(Field)`
  flex: 1 1 460px;

  @media (max-width: 1100px) {
    flex-basis: 100%;
  }
`;

const SelectField = styled(Field)`
  flex: 0 0 180px;

  @media (max-width: 1100px) {
    flex: 1 1 220px;
  }
`;

const SearchInput = styled.input`
  min-height: 42px;
  padding: 0 14px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${palette.line};
  background: rgba(255, 255, 255, 0.98);
  color: ${palette.blueInk};
  font-size: 0.91rem;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:focus {
    border-color: ${palette.lineStrong};
    box-shadow: 0 0 0 4px rgba(36, 101, 190, 0.12);
  }
`;

const SelectInput = styled.select`
  min-height: 42px;
  padding: 0 38px 0 12px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${palette.line};
  background: rgba(255, 255, 255, 0.98);
  color: ${palette.blueInk};
  font-size: 0.91rem;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:focus {
    border-color: ${palette.lineStrong};
    box-shadow: 0 0 0 4px rgba(36, 101, 190, 0.12);
  }
`;

const MetaColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  gap: 10px;
  margin-left: auto;

  @media (max-width: 1100px) {
    width: 100%;
    margin-left: 0;
    justify-content: flex-start;
  }

  @media (max-width: 720px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 980px) {
    justify-content: flex-start;
  }
`;

const ResultCount = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 0.88rem;
  font-weight: 800;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(214, 154, 54, 0.24);
  background:
    linear-gradient(135deg, rgba(214, 154, 54, 0.18), rgba(214, 154, 54, 0) 30%),
    linear-gradient(180deg, #1f69c5 0%, #184a95 100%);
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 800;
  box-shadow: 0 14px 24px rgba(24, 74, 149, 0.2);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;

  &:hover:enabled {
    transform: translateY(-1px);
    box-shadow: 0 18px 28px rgba(24, 74, 149, 0.26);
  }

  &:disabled {
    opacity: 0.58;
    cursor: default;
    box-shadow: none;
  }

  @media (max-width: 540px) {
    width: 100%;
  }
`;

const InlineChipField = styled.div`
  display: flex;
  flex: 0 1 auto;
  min-width: 0;
  align-items: center;
  gap: 10px;

  @media (max-width: 1100px) {
    flex: 1 1 100%;
    align-items: center;
    flex-wrap: wrap;
  }

  @media (max-width: 720px) {
    align-items: flex-start;
  }
`;

const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
`;

const ChipButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(214, 154, 54, 0.24)' : palette.line)};
  background: ${({ $active }) => ($active ? palette.chipBackgroundActive : 'rgba(255, 255, 255, 0.92)')};
  color: ${({ $active }) => ($active ? '#ffffff' : palette.textBody)};
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  transition:
    transform 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${palette.lineStrong};
    box-shadow: 0 10px 18px rgba(16, 53, 114, 0.1);
  }
`;

const ResultMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 18px;

  @media (max-width: 540px) {
    align-items: flex-start;
  }
`;

export function NewsListToolbar({
  searchLabel,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  chipLabel,
  chipOptions,
  selectedChip,
  onChipChange,
  sortLabel,
  sortOptions,
  sortValue,
  onSortChange,
  resultLabel,
  actionLabel,
  onAction,
  actionDisabled = false,
}: NewsListToolbarProps) {
  return (
    <ToolbarCard>
      <ControlRow>
        <FieldGroup>
          <SearchField>
            <SearchInput
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchLabel}
            />
          </SearchField>
          {sortLabel && sortOptions && sortValue && onSortChange ? (
            <SelectField>
              <SelectInput value={sortValue} onChange={(event) => onSortChange(event.target.value)} aria-label={sortLabel}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>
            </SelectField>
          ) : null}
          {chipLabel && chipOptions?.length && selectedChip && onChipChange ? (
            <InlineChipField aria-label={chipLabel} role="group">
              <ChipGroup>
                {chipOptions.map((option) => (
                  <ChipButton
                    key={option.value}
                    type="button"
                    $active={option.value === selectedChip}
                    onClick={() => onChipChange(option.value)}
                  >
                    {option.label}
                  </ChipButton>
                ))}
              </ChipGroup>
            </InlineChipField>
          ) : null}
        </FieldGroup>
        <MetaColumn>
          {actionLabel && onAction ? (
            <ActionRow>
              <ActionButton type="button" onClick={onAction} disabled={actionDisabled}>
                {actionLabel}
              </ActionButton>
            </ActionRow>
          ) : null}
        </MetaColumn>
      </ControlRow>
      <ResultMetaRow>
        <ResultCount>{resultLabel}</ResultCount>
      </ResultMetaRow>
    </ToolbarCard>
  );
}
