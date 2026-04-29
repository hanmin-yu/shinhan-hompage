import type { ShinhanNewsItem } from '../types/site';

type ShinhanNewsNoticeLike = Pick<ShinhanNewsItem, 'categoryLabel'>;
type ShinhanNewsSortable = Pick<ShinhanNewsItem, 'categoryLabel' | 'publishedAt'>;
type ShinhanNewsLabeled = Pick<ShinhanNewsItem, 'category' | 'categoryLabel'>;

export function isShinhanNewsNotice(item: ShinhanNewsNoticeLike) {
  return item.categoryLabel === '공지';
}

export function compareShinhanNewsRecords<T extends ShinhanNewsSortable>(left: T, right: T) {
  const noticeDelta = Number(isShinhanNewsNotice(left)) - Number(isShinhanNewsNotice(right));

  if (noticeDelta !== 0) {
    return -noticeDelta;
  }

  return right.publishedAt.localeCompare(left.publishedAt);
}

export function sortShinhanNewsRecords<T extends ShinhanNewsSortable>(items: T[]) {
  return [...items].sort(compareShinhanNewsRecords);
}

export function getShinhanNewsSourceLabel(item: ShinhanNewsLabeled, seminarLabel: string) {
  if (isShinhanNewsNotice(item)) {
    return '[공지]';
  }

  return item.category === 'seminar' ? seminarLabel : 'FLASH';
}
