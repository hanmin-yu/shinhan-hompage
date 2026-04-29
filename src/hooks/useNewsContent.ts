import { useEffect, useState } from 'react';

import {
  loadNewsletterRecord,
  loadNewsletterRecords,
  loadShinhanNewsRecord,
  loadShinhanNewsRecords,
} from '../repositories/newsApi';
import type { NewsletterRecord, ShinhanNewsRecord } from '../types/site';

export function useShinhanNewsRecords() {
  const [items, setItems] = useState<ShinhanNewsRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    void loadShinhanNewsRecords()
      .then((nextItems) => {
        if (!ignore) {
          setItems(nextItems);
        }
      })
      .catch(() => {
        if (!ignore) {
          setItems([]);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { items, loading };
}

export function useShinhanNewsRecord(newsId?: string) {
  const [item, setItem] = useState<ShinhanNewsRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    if (!newsId) {
      setItem(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    void loadShinhanNewsRecord(newsId)
      .then((nextItem) => {
        if (!ignore) {
          setItem(nextItem);
        }
      })
      .catch(() => {
        if (!ignore) {
          setItem(null);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [newsId]);

  return { item, loading };
}

export function useNewsletterRecords() {
  const [items, setItems] = useState<NewsletterRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    void loadNewsletterRecords()
      .then((nextItems) => {
        if (!ignore) {
          setItems(nextItems);
        }
      })
      .catch(() => {
        if (!ignore) {
          setItems([]);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { items, loading };
}

export function useNewsletterRecord(newsletterId?: string) {
  const [item, setItem] = useState<NewsletterRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    if (!newsletterId) {
      setItem(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    void loadNewsletterRecord(newsletterId)
      .then((nextItem) => {
        if (!ignore) {
          setItem(nextItem);
        }
      })
      .catch(() => {
        if (!ignore) {
          setItem(null);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [newsletterId]);

  return { item, loading };
}
