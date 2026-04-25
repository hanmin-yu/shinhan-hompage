export function getMapQuery(address: string, label?: string) {
  return label ? `${label} ${address}` : address;
}

export function getGoogleMapUrl(address: string, label?: string) {
  const query = encodeURIComponent(getMapQuery(address, label));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getGoogleMapEmbedUrl(address: string, label?: string) {
  const query = encodeURIComponent(getMapQuery(address, label));
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export function getNaverMapUrl(address: string, label?: string) {
  const query = encodeURIComponent(getMapQuery(address, label));
  return `https://map.naver.com/p/search/${query}`;
}
