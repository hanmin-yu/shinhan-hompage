export type ShinhanInsightCategory = 'customs' | 'trade';

export type ShinhanInsight = {
  id: string;
  category: ShinhanInsightCategory;
  categoryLabel: string;
  categoryLabelEn: string;
  publishedAt: string;
  author: string;
  authorEn: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  body: string[];
  bodyEn: string[];
};

export const shinhanInsightCategories: Array<{
  value: 'all' | ShinhanInsightCategory;
  label: string;
  labelEn: string;
}> = [
  { value: 'all', label: '전체', labelEn: 'All' },
  { value: 'customs', label: '관세', labelEn: 'Customs' },
  { value: 'trade', label: '국제 통상', labelEn: 'International Trade' },
];

export const shinhanInsights: ShinhanInsight[] = [
  {
    id: 'customs-valuation-supply-chain-review-2026',
    category: 'customs',
    categoryLabel: '관세',
    categoryLabelEn: 'Customs',
    publishedAt: '2026-05-13',
    author: '신한관세법인 관세전략팀',
    authorEn: 'Shinhan Customs Strategy Team',
    title: '수입가격 변동이 과세가격 검토로 이어지는 지점',
    titleEn: 'When Import Price Changes Trigger Customs Valuation Review',
    summary:
      '동일 품목의 단가가 반복적으로 조정되거나 특수관계자 거래 조건이 바뀌는 경우, 세관은 가격 변동의 상업적 합리성과 과세가격 산정 근거를 함께 확인하는 경향이 있습니다.',
    summaryEn:
      'When unit prices for identical goods are repeatedly adjusted or related-party transaction terms change, customs tends to review both commercial rationale and valuation support.',
    body: [
      '수입가격 변동은 단순한 구매 조건 조정으로 끝나지 않습니다. 동일 공급자와의 거래에서 단가가 단기간에 크게 변하거나, 로열티·금형비·개발비 등 별도 지급 항목이 함께 움직이는 경우에는 과세가격 검토 대상이 될 수 있습니다.',
      '실무상 중요한 것은 가격 변동 자체보다 그 변동을 설명할 수 있는 자료의 일관성입니다. 계약서, 발주서, 가격 협상 자료, 원가 변동 근거, 회계 처리 내역이 서로 다른 방향을 가리키면 사후심사 단계에서 보완 요구가 길어질 수 있습니다.',
      '특수관계자 거래에서는 이전가격 정책과 관세평가 논리가 별도로 관리되는 경우가 많습니다. 법인세 목적의 정상가격 검토가 곧바로 관세 과세가격의 충분한 입증이 되는 것은 아니므로, 수입신고 전 단계에서 관세평가 관점의 체크리스트를 별도로 두는 것이 안전합니다.',
      '가격 조정이 예정되어 있다면 조정 사유, 적용 시점, 대상 품목, 정산 방식, 향후 신고 반영 방법을 미리 문서화해야 합니다. 특히 연말 정산, 크레딧 노트, 사후 할인은 신고가격 보정 또는 수정신고 필요성과 연결될 수 있으므로 거래 구조별로 판단해야 합니다.',
    ],
    bodyEn: [
      'A change in import price is rarely just a purchasing adjustment. If unit prices with the same supplier move sharply over a short period, or separate payments such as royalties, tooling costs, and development fees move together, the transaction may become a customs valuation review item.',
      'In practice, the key issue is not the price change itself but the consistency of the documents explaining it. If contracts, purchase orders, negotiation records, cost-change evidence, and accounting entries point in different directions, post-clearance review can become longer and more document-heavy.',
      'For related-party transactions, transfer pricing policies and customs valuation logic are often managed separately. A tax-oriented arm’s-length review does not automatically prove the customs value, so a customs valuation checklist should be maintained before import declaration.',
      'When price adjustments are expected, the reason, timing, covered items, settlement method, and declaration impact should be documented in advance. Year-end true-ups, credit notes, and post-import discounts in particular may require correction or amended declaration depending on the transaction structure.',
    ],
  },
  {
    id: 'trade-origin-strategy-supply-chain-shift-2026',
    category: 'trade',
    categoryLabel: '국제 통상',
    categoryLabelEn: 'International Trade',
    publishedAt: '2026-05-07',
    author: '신한관세법인 국제통상자문팀',
    authorEn: 'Shinhan International Trade Advisory Team',
    title: '공급망 재편 국면에서 원산지 전략이 먼저 검토되어야 하는 이유',
    titleEn: 'Why Origin Strategy Should Come First in Supply Chain Reconfiguration',
    summary:
      '생산지를 이전하거나 복수 국가 조달 구조를 도입할 때 원산지 기준을 뒤늦게 검토하면, 관세 절감 기회뿐 아니라 수입국 규제 대응 일정까지 놓칠 수 있습니다.',
    summaryEn:
      'When production shifts or multi-country sourcing structures are introduced, reviewing origin rules too late can risk both tariff-saving opportunities and regulatory response timelines.',
    body: [
      '공급망 재편은 생산비와 납기만의 문제가 아닙니다. 생산 공정이 어느 국가에서 수행되는지, 핵심 원재료의 HS 코드와 가액 비중이 어떻게 구성되는지에 따라 FTA 활용 가능성과 비특혜 원산지 판단이 동시에 달라집니다.',
      '최근 기업들은 중국, 아세안, 미국, 유럽을 연결하는 복수 생산·조달 구조를 검토하는 경우가 많습니다. 이때 원산지 기준을 프로젝트 후반에 확인하면 설비 배치, 공정 이전, 원재료 전환 계획을 다시 조정해야 할 수 있습니다.',
      '원산지 전략은 구매·생산·물류·영업 부서가 함께 보는 운영 기준이어야 합니다. 품목별 원산지 결정 기준, 부가가치 산식, 직접운송 요건, 증빙 보관 책임을 사전에 정리하면 수출 단계에서 원산지증명서 발급과 사후검증 대응이 훨씬 안정적입니다.',
      '특히 통상 환경이 빠르게 바뀌는 품목은 관세율뿐 아니라 반덤핑, 세이프가드, 수입규제, 강제노동 관련 공급망 실사 이슈까지 함께 봐야 합니다. 공급망 설계 단계에서 원산지 시뮬레이션을 수행하면 비용 절감과 규제 리스크 관리를 동시에 달성할 수 있습니다.',
    ],
    bodyEn: [
      'Supply chain reconfiguration is not only about production cost and lead time. FTA eligibility and non-preferential origin analysis can both change depending on where production steps occur and how key materials are classified and valued.',
      'Many companies now review multi-country production and sourcing structures connecting China, ASEAN, the United States, and Europe. If origin criteria are checked late in the project, facility placement, process relocation, and material conversion plans may need to be revised.',
      'Origin strategy should be an operating standard shared by purchasing, production, logistics, and sales teams. When product-specific rules of origin, value-added formulas, direct transport requirements, and evidence retention responsibilities are defined early, certificate issuance and post-verification response become far more stable.',
      'For products exposed to fast-changing trade policy, companies should review not only tariff rates but also anti-dumping, safeguard measures, import controls, and supply chain due diligence issues such as forced labor. Origin simulation during supply chain design can support both cost savings and regulatory risk management.',
    ],
  },
];

export function getShinhanInsightById(id: string | undefined) {
  if (!id) return undefined;
  return shinhanInsights.find((item) => item.id === id);
}
