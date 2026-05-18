export function getSeminarEventDate(title: string) {
  const match = title.match(/\[(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999);
}

export function isSeminarRecruiting(title: string, now = new Date()) {
  const eventDate = getSeminarEventDate(title);

  if (!eventDate) {
    return false;
  }

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  return eventDate >= today;
}
