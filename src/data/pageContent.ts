export type PointItem = {
  title: string;
  body: string;
};

export type LinkCard = {
  title: string;
  body: string;
  href: string;
};

export type ServiceLandingGroupItem = {
  label: string;
  labelEn: string;
  href: string;
  parentTitle?: string;
  parentTitleEn?: string;
};

export type ServiceLandingGroup = {
  id: 'clearance-refund' | 'quarantine-requirements' | 'consulting' | 'specialized';
  heading: string;
  headingEn: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  items: ServiceLandingGroupItem[];
};

export type ServiceDetailContent = {
  id: string;
  path: string;
  groupKey: ServiceLandingGroup['id'];
  groupTitle: string;
  groupTitleEn: string;
  title: string;
  summary: string;
  heroImage?: string;
  heroImageAlt?: string;
  sectionImage?: string;
  overview: string;
  scope: string[];
  checkpoints: string[];
  relatedExpertNames: string[];
  relatedResources: { label: string; href: string }[];
};

export const aboutStrengths: PointItem[] = [
  {
    title: '운영 대응력',
    body: '법령 검토부터 신고·보완·사후관리까지 실제 업무 흐름에 맞춰 대응합니다.',
  },
  {
    title: '전국 지사 네트워크',
    body: '서울본사와 인천·부산·청주·구미 거점을 연결해 지역별 이슈를 처리합니다.',
  },
  {
    title: '해외 법인 연계',
    body: '하노이 법인과 KORD Partners 협업으로 국내 통관과 해외 규정 대응을 함께 운영합니다.',
  },
];

export const aboutTimeline = [
  { period: '2011-current', year: '2025', event: '03월 신한관세법인 창립 60주년' },
  { period: '2011-current', year: '2023', event: '01월 신한관세법인 AEO 공인인증 AA 인증' },
  { period: '2011-current', year: '2021', event: '08월 관세청 적극행정 및 규제혁신 대국민 공모전 입상' },
  { period: '2011-current', year: '2021', event: '03월 2018~2021년 수출바우처 컨설팅 수행기관 선정' },
  { period: '2011-current', year: '2019', event: '03월 신한 베트남 관세법인(SCV) 설립(현지 컨설팅·통관업무)' },
  { period: '2011-current', year: '2019', event: '01월 관세청 YES FTA 전문교육기관 선정' },
  { period: '2011-current', year: '2018', event: '09월 관세청 블록체인 기반 수출통관 물류서비스 시범사업 업무협약 체결' },
  { period: '2011-current', year: '2018', event: '05월 K-V FTA 활용역량강화 경제협력사업 베트남 현지 포럼 개최' },
  { period: '2011-current', year: '2018', event: '01월 관세청 YES FTA 전문교육기관 선정' },
  { period: '2011-current', year: '2017', event: '04월 포스트차이나 베트남 진출 기업 대상 관세통관제도 설명회 개최' },
  { period: '2011-current', year: '2017', event: '03월 대전충남지사 설립' },
  { period: '2011-current', year: '2017', event: '01월 K-V FTA 활용 역량강화사업 연구' },
  { period: '2011-current', year: '2017', event: '01월 관세청 YES FTA 전문교육기관 선정' },
  { period: '2011-current', year: '2016', event: '09월 한국관세사회 공로패' },
  { period: '2011-current', year: '2016', event: '01월 KORD Partners Inc. 설립(미국 LA 통관/FDA 요건 컨설팅)' },
  { period: '2011-current', year: '2016', event: '01월 중소기업진흥공단 관세법인 활용 FTA 교육' },
  { period: '2011-current', year: '2015', event: '03월 신한관세법인 창립 50주년' },
  { period: '2011-current', year: '2015', event: '01월 KOTRA 한중 FTA 이해·활용전략 포럼 감사패 수상' },
  { period: '2011-current', year: '2015', event: '01월 포워딩 G사 고객사 우수협력상 표창' },
  { period: '2011-current', year: '2015', event: '01월 글로벌 I사 고객사 우수협력상 표창' },
  { period: '2011-current', year: '2014', event: '05월 구미지사 설립' },
  { period: '2011-current', year: '2014', event: '04월 미국 법률·회계 JC&COMPANY MOU 체결' },
  { period: '2011-current', year: '2014', event: '03월 무역협회 OK FTA 컨설팅 수행' },
  { period: '2011-current', year: '2014', event: '01월 FTA 중소기업지원 우수사례 최우수상 수상' },
  { period: '2011-current', year: '2013', event: '05월 중소기업진흥공단 관세법인 활용 FTA 교육' },
  { period: '2011-current', year: '2013', event: '03월 인도 PMP LOGISTICS MOU 체결' },
  { period: '2011-current', year: '2013', event: '01월 신한관세법인 AEO 공인인증 AA 인증' },
  { period: '2011-current', year: '2012', event: '08월 AEO 우수사례 경진대회 본상 수상' },
  { period: '2011-current', year: '2012', event: '03월 무역협회 OK FTA 컨설팅 수행' },
  { period: '2011-current', year: '2011', event: '11월 글로벌 I사 고객사 우수협력사 감사패 수상' },
  { period: '2011-current', year: '2011', event: '01월 ECCK Official Customs Advisor' },
  { period: '2011-current', year: '2011', event: '01월 중소기업진흥공단 FTA 컨설팅 기관' },
  { period: '2001-2010', year: '2010', event: '01월 포워딩 B사 고객사 우수협력사 감사패 수상' },
  { period: '2001-2010', year: '2010', event: '01월 관세법인 최초 AEO 인증 획득' },
  { period: '2001-2010', year: '2010', event: '01월 신한인비스타 보세창고 설립' },
  { period: '2001-2010', year: '2008', event: '08월 FTA BUSINESS MODEL 경진대회 최우수상' },
  { period: '2001-2010', year: '2007', event: '08월 청주지사 설립' },
  { period: '2001-2010', year: '2007', event: '02월 인천경기지사 설립' },
  { period: '2001-2010', year: '2007', event: '01월 신한인비스타 설립' },
  { period: '2001-2010', year: '2006', event: '02월 글로벌 I사 고객사 우수협력사 감사패 수상' },
  { period: '2001-2010', year: '2006', event: '01월 부산지사 설립' },
  { period: '2001-2010', year: '2006', event: '01월 컨설팅본부 설립' },
  { period: '2001-2010', year: '2004', event: '01월 인천공항지사 설립' },
  { period: '1965-2000', year: '1993', event: '03월 신한관세법인 법인 등록' },
  { period: '1965-2000', year: '1982', event: '01월 장흥진 회장 한국관세사회 부회장 역임' },
  { period: '1965-2000', year: '1977', event: '05월 장흥진 회장 사단법인 한국관세협회 상임이사 역임' },
  { period: '1965-2000', year: '1977', event: '01월 장흥진 회장 한국관세사회 서울지부 초대 지부장 역임' },
  { period: '1965-2000', year: '1965', event: '03월 서울통관사 창립' },
];

export const historyMilestones = [
  { year: '1965', ko: '서울통관사 창립', en: 'Founded as Seoul Customs Service' },
  { year: '1993', ko: '신한관세법인 법인 등록', en: 'Registered as Shinhan Customs Service Inc.' },
  { year: '2015', ko: '신한관세법인 창립 50주년', en: '50th Anniversary of Shinhan Customs Service' },
  { year: '2019', ko: '신한 베트남 관세법인(SCV) 설립', en: 'Established Shinhan Customs Vietnam (SCV)' },
  { year: '2025', ko: '신한관세법인 창립 60주년', en: '60th Anniversary of Shinhan Customs Service' },
];

export const managementValues: PointItem[] = [
  { title: 'PASSION', body: '고객의 발전과 성공을 위해 끝까지 해결책을 실행하는 태도' },
  { title: 'INTEGRITY', body: '정확한 기준과 투명한 커뮤니케이션으로 신뢰를 지키는 원칙' },
  { title: 'INNOVATION', body: '변화하는 통상 환경에 맞춰 업무 체계를 지속적으로 개선하는 역량' },
  { title: 'TEAMWORK', body: 'PI·CI·컨설팅·IT·지사 간 협업으로 최적의 해답을 만드는 문화' },
];

export const organizationUnits: PointItem[] = [
  { title: '통관본부(PI/CI)', body: '수출입 신고, HS 검토, 요건 대응, SOP 고도화 및 통관 운영' },
  { title: '컨설팅본부', body: 'FTA·AEO·관세조사·범칙조사·환급·조세불복 등 리스크 자문' },
  { title: 'IT 융합조직', body: 'iOOM/iOOM Q, KORD FTA·LIQ 기반 자동화·데이터 분석·연동 구축' },
  { title: '국내외 네트워크', body: '국내 지사 + 베트남 법인 + KORD Partners 협업 체계 운영' },
];

export const serviceHubCards: LinkCard[] = [
  {
    title: '수출입통관',
    body: 'PI·CI 체계와 iOOM으로 신고부터 사후관리까지 통관 전 과정을 관리합니다.',
    href: '/services/import-export',
  },
  {
    title: '검역/요건',
    body: '검역·인증·수입요건을 선제 점검해 통관 지연과 보완 요청 리스크를 줄입니다.',
    href: '/services/quarantine-requirements',
  },
  {
    title: '컨설팅',
    body: '원산지/FTA, AEO, 조사 대응, ACVA, 조세불복, 환급 항목을 기업 상황에 맞춰 제공합니다.',
    href: '/services/consulting',
  },
  {
    title: '기타 서비스',
    body: '물류, 베트남 법인, 미국 FDA 등 통관 이후 단계에서 필요한 지원 항목을 제공합니다.',
    href: '/services/logistics',
  },
];

export const consultingHubCards: LinkCard[] = [
  { title: 'FTA', body: '특혜/비특혜 원산지 운영과 사후검증 대응', href: '/services/consulting/fta' },
  { title: 'AEO', body: '신규 공인·갱신·사후관리·등급조정 지원', href: '/services/consulting/aeo' },
  { title: '관세조사', body: '정기·비정기·간이 조사 대응 및 리스크 정비', href: '/services/consulting/customs-audit' },
  { title: '외환검사/조사', body: '거래 구조 점검과 외환 규정 대응', href: '/services/consulting/foreign-exchange' },
  { title: 'ACVA', body: '사전심사 기반 과세가격 안정화', href: '/services/consulting/acva' },
  { title: '범칙조사', body: '세관·검찰 단계별 형사 리스크 대응', href: '/services/consulting/penalty-investigation' },
  { title: '조세불복', body: '과세전적부·이의·심판·소송 단계 지원', href: '/services/consulting/tax-appeal' },
  { title: '환급', body: '환급 항목 진단부터 신청·사후관리까지', href: '/services/consulting/refund' },
  {
    title: '기타 관세무역컨설팅',
    body: '품목분류/과세가격/원산지 사전심사 등 사전 리스크 관리',
    href: '/services/consulting/trade-consulting',
  },
];

export const serviceLandingGroups: ServiceLandingGroup[] = [
  {
    id: 'clearance-refund',
    heading: '중분류',
    headingEn: 'Category',
    title: '수출입통관 및 환급',
    titleEn: 'Import/Export Clearance & Refund',
    description: '신고부터 환급까지 통관 운영 전 과정을 연결해 실무 효율과 정확도를 함께 관리합니다.',
    descriptionEn: 'From declarations to refunds, we connect the full clearance workflow for operational accuracy.',
    image: '/subpages/service-main-import.jpg',
    items: [
      {
        label: '수출입통관',
        labelEn: 'Import/Export Clearance',
        href: '/services/import-export',
        parentTitle: '수출입통관 및 환급',
        parentTitleEn: 'Import/Export Clearance & Refund',
      },
      {
        label: '환급',
        labelEn: 'Refund',
        href: '/services/consulting/refund',
        parentTitle: '수출입통관 및 환급',
        parentTitleEn: 'Import/Export Clearance & Refund',
      },
    ],
  },
  {
    id: 'quarantine-requirements',
    heading: '중분류',
    headingEn: 'Category',
    title: '검역/요건',
    titleEn: 'Quarantine / Requirements',
    description: '검역과 수입요건을 HSK별로 사전 검토해 통관 지연 리스크를 줄입니다.',
    descriptionEn: 'We review quarantine and import requirements in advance by HSK to reduce delay risks.',
    image: '/subpages/service-import-export.jpg',
    items: [
      {
        label: '검역',
        labelEn: 'Quarantine',
        href: '/services/quarantine-requirements',
        parentTitle: '검역/요건',
        parentTitleEn: 'Quarantine / Requirements',
      },
      {
        label: '요건',
        labelEn: 'Requirements',
        href: '/services/quarantine-requirements',
        parentTitle: '검역/요건',
        parentTitleEn: 'Quarantine / Requirements',
      },
    ],
  },
  {
    id: 'consulting',
    heading: '중분류',
    headingEn: 'Category',
    title: '컨설팅',
    titleEn: 'Consulting',
    description: '조사 대응, 원산지/FTA, AEO, ACVA, 조세불복까지 기업 리스크 관리를 지원합니다.',
    descriptionEn: 'We support enterprise risk management across audits, FTA, AEO, ACVA, and tax appeals.',
    image: '/subpages/service-main-consulting.jpg',
    items: [
      { label: 'FTA', labelEn: 'FTA', href: '/services/consulting/fta', parentTitle: '컨설팅', parentTitleEn: 'Consulting' },
      { label: 'AEO', labelEn: 'AEO', href: '/services/consulting/aeo', parentTitle: '컨설팅', parentTitleEn: 'Consulting' },
      {
        label: '관세조사',
        labelEn: 'Customs Audit',
        href: '/services/consulting/customs-audit',
        parentTitle: '컨설팅',
        parentTitleEn: 'Consulting',
      },
      {
        label: '외환검사/조사',
        labelEn: 'Foreign Exchange',
        href: '/services/consulting/foreign-exchange',
        parentTitle: '컨설팅',
        parentTitleEn: 'Consulting',
      },
      { label: 'ACVA', labelEn: 'ACVA', href: '/services/consulting/acva', parentTitle: '컨설팅', parentTitleEn: 'Consulting' },
      {
        label: '범칙조사',
        labelEn: 'Penalty Investigation',
        href: '/services/consulting/penalty-investigation',
        parentTitle: '컨설팅',
        parentTitleEn: 'Consulting',
      },
      {
        label: '조세불복',
        labelEn: 'Tax Appeal',
        href: '/services/consulting/tax-appeal',
        parentTitle: '컨설팅',
        parentTitleEn: 'Consulting',
      },
      {
        label: '관세무역컨설팅',
        labelEn: 'Trade Consulting',
        href: '/services/consulting/trade-consulting',
        parentTitle: '컨설팅',
        parentTitleEn: 'Consulting',
      },
    ],
  },
  {
    id: 'specialized',
    heading: '중분류',
    headingEn: 'Category',
    title: '기타',
    titleEn: 'Specialized',
    description: '물류, 베트남 법인, 미국 FDA 대응 등 통관 이후 확장 업무를 지원합니다.',
    descriptionEn: 'We cover extended operations including logistics, Vietnam entity support, and U.S. FDA response.',
    image: '/subpages/service-main-vietnam.jpg',
    items: [
      { label: '물류', labelEn: 'Logistics', href: '/services/logistics', parentTitle: '기타', parentTitleEn: 'Specialized' },
      { label: '베트남', labelEn: 'Vietnam', href: '/services/vietnam', parentTitle: '기타', parentTitleEn: 'Specialized' },
      { label: '미국 FDA', labelEn: 'US FDA', href: '/services/us-fda', parentTitle: '기타', parentTitleEn: 'Specialized' },
    ],
  },
];

export const newsHubCards: LinkCard[] = [
  { title: '이슈 리포트', body: '외부기관 이슈를 기반으로 관세·통상 핵심 쟁점을 정리한 리포트', href: '/news/issue-report' },
  { title: '신한 NEWS', body: 'FLASH와 세미나를 통합한 내부 활동·인사이트 아카이브', href: '/news/shinhan-news' },
  { title: '소식지', body: '월별 주요 정책 변화와 실무 체크포인트 요약', href: '/news/newsletter' },
];

export const newsletterItems = [
  {
    title: '2026년 4월호 소식지 (국문)',
    body: '사전심사 제도와 조사 대응 체크포인트',
    date: '2026.04',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2026-04-ko.zip',
  },
  {
    title: '2026년 4월호 소식지 (영문)',
    body: 'April issue (English) - customs risk and pre-ruling highlights',
    date: '2026.04',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2026-04-en.zip',
  },
  {
    title: '2026년 3월호 소식지 (국문)',
    body: '수출입통관 SOP 운영과 보완 대응 사례',
    date: '2026.03',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2026-03-ko.zip',
  },
  {
    title: '2026년 3월호 소식지 (영문)',
    body: 'March issue (English) - operational SOP and compliance updates',
    date: '2026.03',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2026-03-en.zip',
  },
  {
    title: '2026년 2월호 소식지 (국문)',
    body: '원산지 검증 및 AEO 사후관리 실무 브리핑',
    date: '2026.02',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2026-02-ko.zip',
  },
  {
    title: '2026년 2월호 소식지 (영문)',
    body: 'February issue (English) - origin verification and AEO follow-up',
    date: '2026.02',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2026-02-en.zip',
  },
  {
    title: '2025년 12월~2026년 1월 통합 소식지 (국문)',
    body: '연말/연초 주요 정책 및 실무 이슈 통합본',
    date: '2025.12~2026.01',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-12-2026-01-ko.zip',
  },
  {
    title: '2025년 12월~2026년 1월 통합 소식지 (영문)',
    body: 'Year-end combined issue (English) - key policy and practice updates',
    date: '2025.12~2026.01',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-12-2026-01-en.zip',
  },
];

export const seminarItems = [
  { title: 'AEO 갱신심사 실무 세미나', body: '예정 · 서울본사', status: '예정' },
  { title: '베트남 수책(LIQ)·FTA 대응 세미나', body: '지난 세미나 · 온라인', status: '완료' },
  { title: '관세조사·범칙조사 대응 브리핑', body: '지난 세미나 · 부산지사', status: '완료' },
];

export const flashItems = [
  { title: 'PI·CI 기반 통관 프로세스 고도화 포인트', body: '신고 정확도와 리드타임을 함께 개선하는 운영 방법' },
  { title: 'ACVA로 과세가격 리스크를 줄이는 방법', body: '사전심사 제도 활용 시 기업이 얻는 실질적 효과' },
  { title: '베트남 통관/수책 관리 실무 체크리스트', body: '현지 규정 변화에 대비한 운영 포인트 정리' },
];

export const recruitSteps: PointItem[] = [
  { title: '지원서 접수', body: '관세사, 통관, 요건/검사, AEO, IT 등 직무별 지원서를 상시 검토합니다.' },
  { title: '실무 인터뷰', body: '업무 경험, 문제 해결 방식, 협업 역량을 중심으로 인터뷰를 진행합니다.' },
  { title: '최종 안내', body: '처우 협의 후 온보딩과 OJT, 직무교육 연계를 통해 빠른 적응을 지원합니다.' },
];

const sharedResources = [
  { label: '대표 이슈리포트', href: '/news/issue-report' },
  { label: '관련 전문가', href: '/members/experts' },
];

export const serviceDetailPages: ServiceDetailContent[] = [
  {
    id: 'import-export',
    path: '/services/import-export',
    groupKey: 'clearance-refund',
    groupTitle: '수출입통관 및 환급',
    groupTitleEn: 'Import/Export Clearance & Refund',
    title: '수출입통관',
    summary: 'PI·CI 운영 체계와 iOOM 데이터 관리로 통관 정확도와 속도를 관리합니다.',
    heroImage: '/subpages/service-main-import.jpg',
    heroImageAlt: '수출입통관 서비스',
    sectionImage: '/subpages/service-import-export.jpg',
    overview:
      '수입·수출 신고, HS Code 검토, 요건 확인, 세관 심사 대응, 사후관리까지 통관 전 과정을 체계적으로 설계합니다. PI(Process Innovation)팀과 CI(Customs Innovation)팀 협업으로 고객사 SOP를 최적화합니다.',
    scope: [
      'HS Code 마스터 관리 및 세율 검토',
      'RMS 기반 통관 리스크 관리',
      '고객사 시스템 연동 및 반복 업무 자동화',
      'iOOM 기반 통관 현황·데이터 실시간 제공',
    ],
    checkpoints: [
      '사전 검토(거래조건·과세요소 분석)',
      'HS Code/세율 및 요건 점검',
      '신고·심사 대응 및 반출',
      '사후 리스크 관리 체계 운영',
    ],
    relatedExpertNames: ['장승희', '전무열'],
    relatedResources: sharedResources,
  },
  {
    id: 'quarantine-requirements',
    path: '/services/quarantine-requirements',
    groupKey: 'quarantine-requirements',
    groupTitle: '검역/요건',
    groupTitleEn: 'Quarantine / Requirements',
    title: '검역/요건',
    summary: '검역·요건을 사전 정리해 통관 지연과 보완 리스크를 최소화합니다.',
    heroImage: '/subpages/service-main-import.jpg',
    heroImageAlt: '검역 및 요건 서비스',
    overview:
      '품목별 검역, 인증, 허가 요건을 거래 단계에서 점검해 통관 단계의 불확실성을 줄입니다. 체크리스트 기준으로 서류 누락과 반복 보완을 예방합니다.',
    scope: [
      '검역/인증 대상 품목 사전 판별',
      '수입요건·인허가 기준 검토',
      '필수 제출서류 사전 점검',
      '보완 요청 대응 및 커뮤니케이션 지원',
    ],
    checkpoints: ['품목 분류 확인', '요건/검역 항목 매핑', '사전서류 준비', '신고 후 보완 대응'],
    relatedExpertNames: ['서영진', '전무열'],
    relatedResources: sharedResources,
  },
  {
    id: 'fta',
    path: '/services/consulting/fta',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: '원산지/FTA',
    summary: '특혜(FTA)와 비특혜(일반 원산지)를 구분 운영해 관세 절감과 규정 준수를 함께 달성합니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: '원산지 FTA 컨설팅',
    overview:
      '협정별 원산지결정기준 분석, 원산지 판정 및 증빙 체계화, 사후검증 대응까지 전 주기를 지원합니다. 원산지 시스템/DB 구축을 통해 지속 가능한 관리 체계를 정착시킵니다.',
    scope: [
      '특혜 원산지(FTA) 판정·증명서 운영',
      '비특혜 원산지(일반 원산지) 규정 대응',
      '원산지 검증 대응 자료 구축',
      '맞춤형 원산지 관리 시스템 및 DB 설계',
    ],
    checkpoints: ['협정·품목별 기준 확인', '증빙 체계 점검', '검증 대응 시나리오 준비', '정기 운영 모니터링'],
    relatedExpertNames: ['최대규', '서영진'],
    relatedResources: sharedResources,
  },
  {
    id: 'aeo',
    path: '/services/consulting/aeo',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: 'AEO 컨설팅',
    summary: '신규 공인부터 갱신·사후관리·등급조정까지 AEO 운영 전 과정을 지원합니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: 'AEO 컨설팅',
    overview:
      '제도 도입 초기부터 축적된 실무 경험을 기반으로 기업 맞춤형 AEO 프로세스를 설계합니다. 인증 획득에 그치지 않고 조직 내 AEO 역량이 내재화되도록 실행 중심으로 지원합니다.',
    scope: [
      'AEO 신규 공인/갱신 심사 컨설팅',
      '정기 자율평가·세관 보고 의무 지원',
      '등급조정(AAA 포함) 대응 전략 수립',
      '대관 업무 및 MRA·C-TPAT 관련 지원',
    ],
    checkpoints: ['현황 진단', '220+ 공인기준 대응 체계 수립', '심사 대응 리허설', '사후관리 정착'],
    relatedExpertNames: ['서영진', '전무열'],
    relatedResources: sharedResources,
  },
  {
    id: 'customs-audit',
    path: '/services/consulting/customs-audit',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: '관세조사',
    summary: '정기·비정기·간이 관세조사 전 단계에서 자료 체계화와 쟁점 대응을 지원합니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: '관세조사 대응',
    overview:
      '관세조사는 통관 후 기업 단위 적정성을 검증하는 핵심 절차입니다. 사전 리스크 진단과 입체적 대응 전략으로 조사 불확실성을 낮추고 경영 안정성을 확보합니다.',
    scope: ['조사 유형별 대응 전략 수립', '핵심 자료 구조화 및 제출 대응', '조사 쟁점 협의 및 사후 개선 지원'],
    checkpoints: ['사전 리스크 스크리닝', '자료 정합성 점검', '현장/서면 조사 대응', '사후 개선안 실행'],
    relatedExpertNames: ['장승희', '서영진'],
    relatedResources: sharedResources,
  },
  {
    id: 'foreign-exchange',
    path: '/services/consulting/foreign-exchange',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: '외환검사/조사',
    summary: '외환 규정과 거래 구조를 함께 점검해 검사 대응 리스크를 줄입니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: '외환검사 조사 대응',
    overview:
      '대금결제 구조, 계약 조건, 증빙 체계를 통합 점검해 외환검사·조사에 대비합니다. 관세 이슈와 연결되는 외환 리스크를 함께 관리해 대응 효율을 높입니다.',
    scope: ['외환 거래 구조 진단', '규정 준수 점검', '검사/조사 대응 자료 정리', '재발 방지 체계 설계'],
    checkpoints: ['거래 흐름 분석', '취약 구간 도출', '대응 문서 준비', '사후 개선 실행'],
    relatedExpertNames: ['서영진', '전무열'],
    relatedResources: sharedResources,
  },
  {
    id: 'acva',
    path: '/services/consulting/acva',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: 'ACVA',
    summary: '특수관계자 과세가격 사전심사로 조사 리스크를 완화하고 경영 예측 가능성을 높입니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: 'ACVA 컨설팅',
    overview:
      'ACVA는 특수관계자 거래의 과세가격 결정방법을 과세당국과 사전에 합의하는 제도입니다. 조사 유예, 가산세 면제, 자료 제출 부담 완화 등 실질적 이점으로 경영 안정성을 지원합니다.',
    scope: [
      '사전상담 및 신청 전략 수립',
      '가격결정 근거자료·가산/공제요소 정리',
      '심사 대응 및 결과 반영',
      '연례보고 및 후속 운영 지원',
    ],
    checkpoints: ['사전상담', '사전심사 신청', '심사 대응', '결과 반영 및 연례보고'],
    relatedExpertNames: ['최대규', '장승희'],
    relatedResources: sharedResources,
  },
  {
    id: 'penalty-investigation',
    path: '/services/consulting/penalty-investigation',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: '범칙조사',
    summary: '세관 조사부터 통고처분·검찰 단계까지 형사 리스크를 통합 관리합니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: '범칙조사 대응',
    overview:
      '범칙조사는 관세법·대외무역법·외국환거래법 위반 혐의에 대한 절차입니다. 법무법인 협업 체계로 임의·강제 조사 대응, 통고처분, 송치 이후 단계까지 전략적으로 지원합니다.',
    scope: [
      '임의/강제 조사 대응 전략 수립',
      '세관 조사자료 정리 및 진술 지원',
      '통고처분 이행·불이행 리스크 대응',
      '검찰 단계 커뮤니케이션 및 후속 자문',
    ],
    checkpoints: ['조사 착수 대응', '핵심 사실관계 정리', '통고처분/송치 대응', '사후 리스크 통제'],
    relatedExpertNames: ['장승희', '전무열'],
    relatedResources: sharedResources,
  },
  {
    id: 'tax-appeal',
    path: '/services/consulting/tax-appeal',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: '조세불복',
    summary: '과세전적부·이의·심사·심판·소송까지 단계별 불복 절차를 체계적으로 지원합니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: '조세불복 자문',
    overview:
      '세관 처분으로 침해된 권익을 회복하기 위해 사실관계와 법리를 정교하게 정리합니다. 과세관청의 심사 논리를 반영한 전략 설계로 권리구제 가능성을 높입니다.',
    scope: ['쟁점 분석 및 법리 구성', '불복서류 작성 대리', '심판·소송 단계 연계 자문'],
    checkpoints: ['사실관계 정리', '불복 전략 수립', '단계별 제출/대응', '결과 후속 조치'],
    relatedExpertNames: ['서영진', '장승희'],
    relatedResources: sharedResources,
  },
  {
    id: 'refund',
    path: '/services/consulting/refund',
    groupKey: 'clearance-refund',
    groupTitle: '수출입통관 및 환급',
    groupTitleEn: 'Import/Export Clearance & Refund',
    title: '환급',
    summary: '환급 가능 항목 발굴부터 신청·사후관리까지 실무 흐름에 맞춰 지원합니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: '관세 환급 서비스',
    overview:
      '원가·거래 구조와 신고 데이터를 기반으로 환급 가능성을 진단하고, 신청 근거 자료를 정비해 환급 실현률을 높입니다.',
    scope: ['환급 대상 식별', '근거자료 정리', '환급 신청 진행', '사후관리 및 이슈 대응'],
    checkpoints: ['대상 진단', '증빙 준비', '신청 및 보완', '사후 점검'],
    relatedExpertNames: ['최대규', '전무열'],
    relatedResources: sharedResources,
  },
  {
    id: 'trade-consulting',
    path: '/services/consulting/trade-consulting',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: '기타 관세무역컨설팅',
    summary: '사전심사 제도를 활용한 사전 리스크 관리 중심의 맞춤형 컨설팅을 제공합니다.',
    heroImage: '/subpages/service-main-consulting.jpg',
    heroImageAlt: '관세무역 컨설팅',
    overview:
      '품목분류·과세가격·원산지 사전심사를 포함한 사전 확정형 컨설팅으로 불확실성을 줄이고 의사결정 속도를 높입니다.',
    scope: ['품목분류 사전심사', '과세가격 사전심사', '원산지 사전심사', '거래 구조 맞춤형 운영 자문'],
    checkpoints: ['사전 쟁점 정의', '신청자료 정비', '심사 대응', '결정사항 운영 반영'],
    relatedExpertNames: ['장승희', '최대규'],
    relatedResources: sharedResources,
  },
  {
    id: 'logistics',
    path: '/services/logistics',
    groupKey: 'specialized',
    groupTitle: '기타',
    groupTitleEn: 'Specialized',
    title: '물류',
    summary: '통관 이후 물류 운영까지 연결해 공급망 전반의 리스크를 관리합니다.',
    heroImage: '/subpages/service-main-logistics.jpg',
    heroImageAlt: '물류 서비스',
    sectionImage: '/subpages/service-logistics.jpg',
    overview:
      '반출기간, 보세창고, 운송 연계 등 통관 후 물류 이슈를 현장 기준으로 점검해 지연과 추가비용 발생 가능성을 최소화합니다.',
    scope: ['반출기간·보관 리스크 관리', '운송/통관 연계 프로세스 점검', '물류 파트너 협업 체계 지원'],
    checkpoints: ['물류 흐름 진단', '병목 구간 도출', '개선 시나리오 실행', '성과 모니터링'],
    relatedExpertNames: ['전무열', '서영진'],
    relatedResources: sharedResources,
  },
  {
    id: 'vietnam',
    path: '/services/vietnam',
    groupKey: 'specialized',
    groupTitle: '기타',
    groupTitleEn: 'Specialized',
    title: '베트남 법인',
    summary: '하노이 현지 법인과 한국 본사의 협업으로 베트남 통관·수책·FTA 리스크를 선제 대응합니다.',
    heroImage: '/subpages/service-main-vietnam.jpg',
    heroImageAlt: '베트남 현지 관세 컨설팅',
    sectionImage: '/subpages/service-vietnam.jpg',
    overview:
      '신한 베트남 관세법인(SCV)은 현지 세관 인가 기반으로 수출입통관, 수책(LIQ) 관리, FTA 원산지 운영, 관세심사 대응, 상시 자문을 제공하며 국내 의사결정과 현지 실행을 연결합니다.',
    scope: [
      '수책(LIQ) 관리 및 보고 체계 구축',
      'KORD FTA 기반 원산지 운영·검증 대응',
      '현지 통관/요건/인허가 대응',
      '관세심사 및 규정 개정 상시 자문',
    ],
    checkpoints: ['현지 진단', '운영체계 설계', '월별 모니터링', '규정 변화 대응'],
    relatedExpertNames: ['최대규', '장승희'],
    relatedResources: sharedResources,
  },
  {
    id: 'us-fda',
    path: '/services/us-fda',
    groupKey: 'specialized',
    groupTitle: '기타',
    groupTitleEn: 'Specialized',
    title: '미국 FDA',
    summary: '미국 수출 시 필요한 FDA 준비 항목을 통관 실무와 연결해 지원합니다.',
    heroImage: '/hero/pharma.jpg',
    heroImageAlt: '미국 FDA 대응 서비스',
    overview:
      '품목별 FDA 체크포인트, 제출자료, 통관 연계 절차를 사전에 정리해 미국 수출 단계의 불확실성을 줄이고 대응 속도를 높입니다.',
    scope: ['FDA 요건/대상 판별', '서류 준비 및 점검', '통관·물류 연계 대응', '사후 이슈 대응 자문'],
    checkpoints: ['품목 분류 확인', '요건 체크리스트 점검', '제출자료 정비', '출고 전 최종 검토'],
    relatedExpertNames: ['서영진', '전무열'],
    relatedResources: sharedResources,
  },
];
