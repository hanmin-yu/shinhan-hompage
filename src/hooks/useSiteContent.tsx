import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { loadSiteContent, getStaticSiteContent } from '../repositories/siteContentRepository';
import type { ManagedMember, ManagedMemberGroup, SiteContentPayload } from '../types/site';

const SiteContentContext = createContext<SiteContentPayload>(getStaticSiteContent());

function filterManagedMembers(content: SiteContentPayload, group: ManagedMemberGroup) {
  return content.members.managedMembers.filter((member) => member.groups.includes(group));
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContentPayload>(getStaticSiteContent);

  useEffect(() => {
    let isMounted = true;

    void loadSiteContent().then((payload) => {
      if (isMounted) {
        setContent(payload);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const content = useContext(SiteContentContext);

  return useMemo(
    () => ({
      content,
      featuredMembers: filterManagedMembers(content, 'featured'),
      executives: filterManagedMembers(content, 'executive'),
      expertMembers: filterManagedMembers(content, 'expert'),
      advisors: filterManagedMembers(content, 'advisor'),
      findMemberById: (memberId?: string | null) =>
        memberId ? content.members.managedMembers.find((member) => member.id === memberId) ?? null : null,
      findMemberByName: (name?: string | null) =>
        name ? content.members.managedMembers.find((member) => member.name === name) ?? null : null,
      getExpertsByCategory: (category: string) => {
        const memberIds = content.members.expertCategoryConfig.assignments[category] ?? [];

        return memberIds
          .map((memberId): ManagedMember | null => {
            const member = content.members.managedMembers.find((item) => item.id === memberId);
            if (!member) {
              return null;
            }

            const categoryHighlights = content.members.expertCategoryConfig.highlights[category]?.[memberId];
            return {
              ...member,
              careerHighlights: categoryHighlights ?? member.careerHighlights,
            } satisfies ManagedMember;
          })
          .filter((value): value is ManagedMember => Boolean(value));
      },
    }),
    [content],
  );
}
