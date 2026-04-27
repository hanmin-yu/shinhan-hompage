import { useEffect, useState } from 'react';

import type { IssueReport } from '../types/site';

type IssueReportResponse = {
  reports?: IssueReport[];
  failedSources?: string[];
  succeededSources?: string[];
  refreshedAt?: string;
};

const LIVE_ISSUE_REPORT_SOURCES = ['한국관세사회', '한국무역협회'] as const;

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
        const response = await fetch('/api/issue-reports', {
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
      const response = await fetch('/api/issue-reports?refresh=1', {
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
