import { useEffect, useState } from 'react';

import type { IssueReport } from '../types/site';

type IssueReportResponse = {
  reports?: IssueReport[];
  failedSources?: string[];
  succeededSources?: string[];
  refreshedAt?: string;
};

const LIVE_ISSUE_REPORT_SOURCES = ['한국관세사회', '한국무역협회'] as const;
type IssueReportDataMode = 'api' | 'static-json';

function isVercelPreviewHost(hostname: string) {
  return hostname === 'shinhan-homepage.vercel.app' || hostname.endsWith('.vercel.app');
}

function resolveIssueReportDataMode(): IssueReportDataMode {
  const configuredMode = import.meta.env.VITE_ISSUE_REPORT_MODE;

  if (configuredMode === 'static-json' || configuredMode === 'api') {
    return configuredMode;
  }

  if (typeof window !== 'undefined' && isVercelPreviewHost(window.location.hostname)) {
    return 'static-json';
  }

  return 'api';
}

function resolveIssueReportUrl(refresh: boolean) {
  const mode = resolveIssueReportDataMode();

  if (mode === 'static-json') {
    const cacheBust = refresh ? `?ts=${Date.now()}` : '';
    return `/issue-reports.json${cacheBust}`;
  }

  return refresh ? '/api/issue-reports?refresh=1' : '/api/issue-reports';
}

export function useIssueReports() {
  const [reports, setReports] = useState<IssueReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const [succeededSources, setSucceededSources] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [refreshedAt, setRefreshedAt] = useState<string | undefined>(undefined);

  function applyResponse(data: IssueReportResponse) {
    setReports(Array.isArray(data.reports) ? data.reports : []);
    setFailedSources(Array.isArray(data.failedSources) ? data.failedSources : []);
    setSucceededSources(Array.isArray(data.succeededSources) ? data.succeededSources : []);
    setRefreshedAt(typeof data.refreshedAt === 'string' ? data.refreshedAt : undefined);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadReports() {
      try {
        const response = await fetch(resolveIssueReportUrl(false), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch issue reports: ${response.status}`);
        }

        const data = (await response.json()) as IssueReportResponse;

        applyResponse(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setReports([]);
          setFailedSources([...LIVE_ISSUE_REPORT_SOURCES]);
          setSucceededSources([]);
          setRefreshedAt(undefined);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadReports();

    return () => {
      controller.abort();
    };
  }, []);

  async function refreshReports() {
    if (refreshing) {
      return;
    }

    setRefreshing(true);
    setRefreshStatus('idle');

    try {
      const response = await fetch(resolveIssueReportUrl(true), {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to refresh issue reports: ${response.status}`);
      }

      const data = (await response.json()) as IssueReportResponse;
      applyResponse(data);
      setRefreshStatus('success');
    } catch (error) {
      setRefreshStatus('error');
    } finally {
      setRefreshing(false);
    }
  }

  return {
    reports,
    loading,
    failedSources,
    succeededSources,
    refreshing,
    refreshStatus,
    refreshedAt,
    refreshReports,
  };
}
