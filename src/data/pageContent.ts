import benefitSummaryCompensation from '../assets/recruit-benefits/summary-compensation.svg';
import benefitSummaryFlexible from '../assets/recruit-benefits/summary-flexible.svg';
import benefitSummaryGrowth from '../assets/recruit-benefits/summary-growth.svg';

export type PointItem = {
  title: string;
  body: string;
};

export type LinkCard = {
  title: string;
  body: string;
  href: string;
};

export type RecruitRole = {
  title: string;
  titleEn: string;
};

export type RecruitPostingLink = {
  label: string;
  labelEn: string;
  href: string;
};

export type RecruitBenefitGroup = {
  category: string;
  categoryEn: string;
  items: {
    label: string;
    labelEn: string;
    detail: string;
    detailEn: string;
  }[];
};

export type RecruitBenefitSummaryCard = {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  accent: string;
  accentEn: string;
  image: string;
  imageAlt: string;
  imageAltEn: string;
  tags: {
    label: string;
    labelEn: string;
  }[];
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
  primaryHref: string;
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
  subtitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
  sectionImage?: string;
  overview: string;
  scope: string[];
  checkpoints: string[];
  contentSections?: ServiceDetailSection[];
  contactPoints?: ServiceContactPoint[];
  documentImages?: ServiceDocumentImage[];
  relatedExpertNames: string[];
  relatedResources: { label: string; href: string }[];
};

export type ServiceDetailSection = {
  heading: string;
  headingEn?: string;
  body?: string[];
  list?: string[];
  steps?: string[];
};

export type ServiceContactPoint = {
  name: string;
  role?: string;
  phone?: string;
  email?: string;
};

export type ServiceDocumentImage = {
  src: string;
  alt: string;
  caption?: string;
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
    href: '/services/quarantine',
  },
  {
    title: '컨설팅',
    body: '원산지/FTA, AEO, 조사 대응, ACVA, 조세불복, 환급 항목을 기업 상황에 맞춰 제공합니다.',
    href: '/services/consulting/fta',
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
    primaryHref: '/services/import-export',
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
    primaryHref: '/services/quarantine',
    description: '검역과 수입요건을 HSK별로 사전 검토해 통관 지연 리스크를 줄입니다.',
    descriptionEn: 'We review quarantine and import requirements in advance by HSK to reduce delay risks.',
    image: '/subpages/service-import-export.jpg',
    items: [
      {
        label: '검역',
        labelEn: 'Quarantine',
        href: '/services/quarantine',
        parentTitle: '검역/요건',
        parentTitleEn: 'Quarantine / Requirements',
      },
      {
        label: '요건',
        labelEn: 'Requirements',
        href: '/services/requirements',
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
    primaryHref: '/services/consulting/fta',
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
    primaryHref: '/services/logistics',
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

export const recruitRoles: RecruitRole[] = [
  { title: '관세사', titleEn: 'Licensed Customs Broker' },
  { title: '요건/검사/검역 전문가', titleEn: 'Requirements, Inspection & Quarantine Specialist' },
  { title: 'AEO 컨설턴트', titleEn: 'AEO Consultant' },
  { title: '통관 사무원', titleEn: 'Customs Clearance Administrator' },
  { title: '경영/인사/회계 전문가', titleEn: 'Management, HR & Accounting Specialist' },
  { title: 'IT개발 전문가', titleEn: 'IT Developer' },
];

export const recruitPostingLinks: RecruitPostingLink[] = [
  {
    label: '사람인 바로가기',
    labelEn: 'Open Saramin',
    href:
      'https://www.saramin.co.kr/zf_user/search?searchType=search&company_cd=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C9%2C10&keydownAccess=&searchword=%EC%8B%A0%ED%95%9C%EA%B4%80%EC%84%B8%EB%B2%95%EC%9D%B8&panel_type=&search_optional_item=y&search_done=y&panel_count=y&pr',
  },
  {
    label: '잡코리아 바로가기',
    labelEn: 'Open JobKorea',
    href: 'https://www.jobkorea.co.kr/Search/?stext=%EC%8B%A0%ED%95%9C%EA%B4%80%EC%84%B8%EB%B2%95%EC%9D%B8&tabType=corp',
  },
];

export const recruitBenefitGroups: RecruitBenefitGroup[] = [
  {
    category: '교육/생활',
    categoryEn: 'Learning & Daily Life',
    items: [
      { label: '창립일행사, 워크샵', labelEn: 'Anniversary events and workshops', detail: '창립일 행사와 워크샵을 운영합니다.', detailEn: 'Anniversary events and workshops are part of the program.' },
      { label: '신규 입사자 교육(OJT)', labelEn: 'New hire onboarding (OJT)', detail: '입사 초기 적응을 돕는 OJT 교육입니다.', detailEn: 'OJT helps new hires settle into the role.' },
      { label: '직무능력향상교육', labelEn: 'Job competency training', detail: '직무 역량 강화를 위한 교육입니다.', detailEn: 'Training supports stronger job capability.' },
      { label: '도서구입비지원', labelEn: 'Book purchase support', detail: '업무와 학습에 필요한 도서 구입을 지원합니다.', detailEn: 'Book purchases for work and learning are supported.' },
      { label: '자격증취득지원', labelEn: 'Certification support', detail: '직무 관련 자격 취득을 지원합니다.', detailEn: 'Support is available for job-related certifications.' },
      { label: '교육비 지원', labelEn: 'Tuition and course fee support', detail: '교육 과정과 수강 비용을 지원합니다.', detailEn: 'Course and tuition costs are supported.' },
      { label: '자기계발비 지원', labelEn: 'Self-development allowance', detail: '자기계발을 위한 비용을 지원합니다.', detailEn: 'Allowance is provided for self-development.' },
      { label: '사내 동호회 운영', labelEn: 'In-house clubs', detail: '사내 동호회 활동을 운영합니다.', detailEn: 'Employees can join in-house clubs.' },
      { label: '사우회(경조사회)', labelEn: 'Employee mutual aid for life events', detail: '경조사를 함께 챙기는 사우회를 운영합니다.', detailEn: 'A mutual aid group supports major life events.' },
      { label: '간식 제공', labelEn: 'Snacks provided', detail: '업무 중 즐길 수 있는 간식을 제공합니다.', detailEn: 'Snacks are available during the workday.' },
      { label: '음료제공(차, 커피)', labelEn: 'Tea and coffee provided', detail: '차와 커피 등 음료를 제공합니다.', detailEn: 'Tea, coffee, and beverages are provided.' },
    ],
  },
  {
    category: '리프레시',
    categoryEn: 'Time Off & Refresh',
    items: [
      { label: '연차, 경조휴가제, 반차', labelEn: 'Annual leave, special leave, and half-day leave', detail: '연차와 반차, 경조휴가를 사용할 수 있습니다.', detailEn: 'Annual, half-day, and special leave are available.' },
      { label: '산전 후 휴가', labelEn: 'Pre- and post-natal leave', detail: '출산 전후 휴가를 지원합니다.', detailEn: 'Pre- and post-natal leave is supported.' },
      { label: '육아휴직', labelEn: 'Childcare leave', detail: '육아를 위한 휴직 제도를 운영합니다.', detailEn: 'Childcare leave is available for parenting needs.' },
      { label: '남성출산휴가', labelEn: 'Paternity leave', detail: '배우자 출산 시 사용할 수 있는 휴가입니다.', detailEn: 'Paternity leave is available around childbirth.' },
      { label: '시간제 연차', labelEn: 'Hourly leave', detail: '필요한 시간만큼 연차를 사용할 수 있습니다.', detailEn: 'Leave can be used in hourly units.' },
    ],
  },
  {
    category: '급여제도',
    categoryEn: 'Compensation',
    items: [
      { label: '퇴직연금', labelEn: 'Retirement pension', detail: '장기적인 근속 이후를 위한 퇴직연금 제도입니다.', detailEn: 'A retirement pension supports long-term security.' },
      { label: '인센티브제', labelEn: 'Incentive program', detail: '성과에 따른 인센티브 제도를 운영합니다.', detailEn: 'An incentive program rewards performance.' },
      { label: '상여금', labelEn: 'Bonuses', detail: '기본 보상 외 상여금을 제공합니다.', detailEn: 'Bonuses are provided in addition to base compensation.' },
      { label: '장기근속자 포상', labelEn: 'Long-service awards', detail: '오랜 근속에 대한 포상을 운영합니다.', detailEn: 'Long-service awards recognize continued tenure.' },
      { label: '퇴직금', labelEn: 'Severance pay', detail: '퇴직 시 지급되는 퇴직금 제도입니다.', detailEn: 'Severance pay is provided at the end of employment.' },
      { label: '성과급', labelEn: 'Performance bonuses', detail: '성과에 따른 보상 체계를 운영합니다.', detailEn: 'Performance-based bonuses are part of the package.' },
      { label: '야근수당', labelEn: 'Overtime pay', detail: '야간 근무에 대한 수당을 지급합니다.', detailEn: 'Overtime pay is available for late work hours.' },
      { label: '휴일(특근)수당', labelEn: 'Holiday and special duty pay', detail: '휴일과 특근에 대한 수당을 제공합니다.', detailEn: 'Holiday and special duty pay is provided.' },
      { label: '직책수당', labelEn: 'Position allowance', detail: '직책에 따른 수당을 운영합니다.', detailEn: 'Position-based allowances are provided.' },
      { label: '자격증수당', labelEn: 'Certification allowance', detail: '자격 보유에 따른 수당을 지급합니다.', detailEn: 'Allowances are available for certifications.' },
      { label: '장기근속수당', labelEn: 'Long-service allowance', detail: '장기근속에 따른 추가 수당이 있습니다.', detailEn: 'An additional allowance supports long-service employees.' },
      { label: '4대 보험', labelEn: 'Four major social insurances', detail: '4대 보험을 기본으로 제공합니다.', detailEn: 'The four major social insurances are included.' },
    ],
  },
  {
    category: '지원금/보험',
    categoryEn: 'Support & Insurance',
    items: [
      { label: '건강검진', labelEn: 'Health checkups', detail: '정기 건강검진을 지원합니다.', detailEn: 'Regular health checkups are supported.' },
      { label: '금연수당', labelEn: 'Non-smoking allowance', detail: '금연 실천을 위한 수당을 운영합니다.', detailEn: 'A non-smoking allowance encourages healthy habits.' },
      { label: '직원대출제도', labelEn: 'Employee loan program', detail: '직원을 위한 대출 제도를 운영합니다.', detailEn: 'An employee loan program is available.' },
      { label: '각종 경조사 지원', labelEn: 'Support for family and ceremonial events', detail: '경조사에 필요한 지원을 제공합니다.', detailEn: 'Support is provided for family and ceremonial events.' },
    ],
  },
  {
    category: '조직 문화',
    categoryEn: 'Culture',
    items: [
      { label: '회식강요 안함', labelEn: 'No pressure to attend company dinners', detail: '회식 참석을 강요하지 않는 문화를 지향합니다.', detailEn: 'The culture avoids pressure around company dinners.' },
      { label: '야근강요 안함', labelEn: 'No pressure for overtime', detail: '불필요한 야근을 지양합니다.', detailEn: 'The culture avoids unnecessary overtime pressure.' },
      { label: '자유로운 연차사용', labelEn: 'Flexible use of annual leave', detail: '연차를 비교적 자유롭게 사용할 수 있습니다.', detailEn: 'Annual leave can be used with flexibility.' },
    ],
  },
  {
    category: '선물 / 명절선물·귀향비',
    categoryEn: 'Gifts & Holiday Support',
    items: [
      { label: '창립일선물지급', labelEn: 'Anniversary gifts', detail: '창립일에 맞춘 선물을 제공합니다.', detailEn: 'Gifts are provided for the company anniversary.' },
      { label: '명절선물/파티', labelEn: 'Holiday gifts and parties', detail: '명절 시즌 선물과 이벤트를 운영합니다.', detailEn: 'Holiday gifts and seasonal events are provided.' },
      { label: '생일선물/파티', labelEn: 'Birthday gifts and parties', detail: '생일을 함께 기념하는 선물과 이벤트입니다.', detailEn: 'Birthday gifts and celebrations mark personal milestones.' },
      { label: '도서 무제한 제공', labelEn: 'Unlimited access to books', detail: '도서를 자유롭게 이용할 수 있습니다.', detailEn: 'Books are available for broad employee use.' },
    ],
  },
  {
    category: '근무 환경',
    categoryEn: 'Work Environment',
    items: [
      { label: '휴게실', labelEn: 'Break room', detail: '업무 중 쉴 수 있는 휴게 공간을 운영합니다.', detailEn: 'A break room is available during the day.' },
      { label: '회의실', labelEn: 'Meeting rooms', detail: '협업을 위한 회의 공간을 제공합니다.', detailEn: 'Meeting rooms support team collaboration.' },
      { label: '공기청정기', labelEn: 'Air purifiers', detail: '쾌적한 사무 환경을 위한 설비입니다.', detailEn: 'Air purifiers help maintain a comfortable office.' },
      { label: '사원증', labelEn: 'Employee ID cards', detail: '사원증을 발급해 기본 근무 환경을 지원합니다.', detailEn: 'Employee ID cards are issued as part of the work setup.' },
      { label: '사내도서관', labelEn: 'In-house library', detail: '업무와 학습을 위한 사내도서관을 운영합니다.', detailEn: 'An in-house library supports work and learning.' },
      { label: '사무용품 지급', labelEn: 'Office supplies provided', detail: '업무에 필요한 사무용품을 제공합니다.', detailEn: 'Office supplies needed for work are provided.' },
    ],
  },
  {
    category: '출퇴근',
    categoryEn: 'Commute & Schedule',
    items: [
      { label: '야간교통비지급', labelEn: 'Night transportation subsidy', detail: '야간 이동에 필요한 교통비를 지원합니다.', detailEn: 'Transportation costs are supported for late hours.' },
      { label: '회사차량 있음', labelEn: 'Company vehicles available', detail: '업무용 회사 차량을 운영합니다.', detailEn: 'Company vehicles are available when needed.' },
      { label: '탄력근무제', labelEn: 'Flexible working hours', detail: '업무 상황에 맞춰 근무 시간을 조정할 수 있습니다.', detailEn: 'Work hours can be adjusted with flexibility.' },
      { label: '재택근무', labelEn: 'Remote work', detail: '직무와 상황에 따라 재택근무를 운영합니다.', detailEn: 'Remote work is available depending on role and needs.' },
      { label: '주 52시간제 준수', labelEn: 'Compliance with the 52-hour workweek', detail: '주 52시간 기준을 준수합니다.', detailEn: 'The 52-hour workweek standard is respected.' },
    ],
  },
];

const getRecruitBenefitGroup = (category: string) => {
  const group = recruitBenefitGroups.find((item) => item.category === category);
  if (!group) {
    throw new Error(`Unknown recruit benefit category: ${category}`);
  }
  return group;
};

export const recruitBenefitDisplayGroups: RecruitBenefitGroup[] = [
  '급여제도',
  '리프레시',
  '출퇴근',
  '교육/생활',
  '지원금/보험',
  '조직 문화',
  '근무 환경',
  '선물 / 명절선물·귀향비',
].map(getRecruitBenefitGroup);

export const recruitBenefitTotalCount = recruitBenefitGroups.reduce((count, group) => count + group.items.length, 0);

export const recruitBenefitSummaryCards: RecruitBenefitSummaryCard[] = [
  {
    title: '보상과 안정',
    titleEn: 'Compensation & Stability',
    description: '퇴직연금, 성과급, 장기근속 포상과 4대 보험 등 기본적인 보상 체계를 폭넓게 갖추고 있습니다.',
    descriptionEn:
      'The package provides broad foundational support including retirement pension, performance bonuses, long-service awards, and social insurance.',
    accent: '급여·보험 중심',
    accentEn: 'Pay & insurance',
    image: benefitSummaryCompensation,
    imageAlt: '보상과 안정을 나타내는 복리후생 일러스트',
    imageAltEn: 'Illustration representing compensation and stability benefits',
    tags: [
      { label: '퇴직연금', labelEn: 'Retirement pension' },
      { label: '성과급', labelEn: 'Performance bonus' },
      { label: '4대 보험', labelEn: 'Social insurance' },
    ],
  },
  {
    title: '유연한 근무 운영',
    titleEn: 'Flexible Work Setup',
    description: '연차, 반차, 시간제 연차와 탄력근무, 재택근무까지 일하는 방식의 유연성을 높였습니다.',
    descriptionEn:
      'Leave options, hourly time off, flexible schedules, and remote work support a more adaptable work rhythm.',
    accent: '휴가·근무 유연성',
    accentEn: 'Leave & flexibility',
    image: benefitSummaryFlexible,
    imageAlt: '유연한 근무 운영을 나타내는 복리후생 일러스트',
    imageAltEn: 'Illustration representing flexible work benefits',
    tags: [
      { label: '반차', labelEn: 'Half-day leave' },
      { label: '시간제 연차', labelEn: 'Hourly leave' },
      { label: '재택근무', labelEn: 'Remote work' },
    ],
  },
  {
    title: '성장과 생활 지원',
    titleEn: 'Growth & Everyday Support',
    description: '신규 입사자 교육, 자기계발비, 건강검진, 경조사 지원 등 일과 생활에 연결되는 지원 항목을 운영합니다.',
    descriptionEn:
      'The company supports onboarding, self-development, health checkups, and everyday life assistance connected to work.',
    accent: '교육·생활 지원',
    accentEn: 'Learning & life',
    image: benefitSummaryGrowth,
    imageAlt: '성장과 생활 지원을 나타내는 복리후생 일러스트',
    imageAltEn: 'Illustration representing growth and everyday support benefits',
    tags: [
      { label: '신규 입사자 교육(OJT)', labelEn: 'New hire onboarding (OJT)' },
      { label: '자기계발비 지원', labelEn: 'Self-development allowance' },
      { label: '건강검진', labelEn: 'Health checkups' },
    ],
  },
];

const sharedResources = [
  { label: '대표 이슈리포트', href: '/news/issue-report' },
  { label: '관련 전문가', href: '/members/experts' },
];

const importExportSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '수출입 통관 전 과정에 대해 정확한 법령 해석과 실무 경험을 기반으로 신속하고 안정적인 서비스를 제공합니다.',
      'PI(Process Innovation)팀의 AI 기반 수출입 및 전후 절차 간소화와 CI(Customs Innovation)팀의 통관 SOP 최적화를 결합하여, 수입통관 전 과정의 효율성과 정확성을 동시에 확보합니다.',
      '당사 개발 이음(IOOM)시스템을 활용하여 수입통관 전 과정의 정보를 실시간으로 관리하고, 고객사가 보다 쉽고 편리하게 통관 현황 및 데이터를 확인할 수 있도록 지원합니다.',
    ],
  },
  {
    heading: '수출입통관의 종류',
    headingEn: 'Types of Clearance',
    list: ['수입통관', '수출통관', '품목분류(HS CODE)'],
  },
  {
    heading: '주요 서비스',
    headingEn: 'Key Services',
    list: [
      'HS CODE 마스터 관리 시스템 -> 품목별 오류를 사전에 차단합니다.',
      'RMS 기반 통관 리스크 관리 -> 휴먼에러를 최소화합니다.',
      '풍부한 경험을 기반으로 한 통관 이슈 대응 -> 신고 수리까지의 리드타임을 단축합니다.',
      '고객사 시스템 연동 -> 반복 업무를 자동화합니다.',
      '고객사 맞춤형 수출입통관 분석 데이터 제공 -> 사후 리스크까지 관리합니다.',
      '자체 개발 IOOM(이음) 시스템 -> 통관 현황과 데이터를 체계적으로 관리합니다.',
    ],
  },
  {
    heading: '통관 서비스 프로세스',
    headingEn: 'Clearance Process',
    steps: [
      '사전 검토 (거래조건 / 과세요소 분석)',
      'HS CODE 및 세율 검토',
      '요건확인 및 인증 대응',
      '수입신고 및 세관 심사 대응',
      '신고수리 및 물품 반출',
      '사후관리 (리스크 및 사후 심사 대응)',
    ],
  },
];

const importExportContacts: ServiceContactPoint[] = [
  { name: '이선희', role: '팀장' },
  { name: '정미화', role: '팀장' },
];

const customsAuditSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '"관세조사"란 관세의 과세표준과 세액의 결정 또는 경정하기 위하여 방문 또는 서면으로 납세자의 장부·서류 또는 그 밖의 물건을 조사하는 것을 말하며, 통관 후 세액심사 이외 통관적법성 전반에 대하여 기업단위로 적정성을 확인하는 절차입니다.',
    ],
  },
  {
    heading: '관세조사의 종류',
    headingEn: 'Types of Customs Audit',
    list: [
      '정기 관세조사: 일정 수입규모 이상 업체(최근 2년간 연평균 수입액 3천만불 이상 및 매출액 1억원 이상인 업체)에 대해 4~5년 주기로 실시합니다.',
      '비정기 관세조사: 통관적법성 위반 고위험 업체를 수시로 선정하여 정기 관세조사와 동일한 방법으로 실시합니다.',
      '간이 관세조사: 관세행정 협력도와 성실도를 고려해 위험도가 낮다고 판단되는 업체에 대해 전체 조사 기간을 축소하여 실시합니다.',
    ],
  },
  {
    heading: '주요 조사 분야',
    headingEn: 'Primary Audit Focus Areas',
    body: ['관세평가, 품목분류, 관세환급, 감면, 외국환거래, 통관요건, 보세화물 관리 등 주요 조사 분야를 아래 도식으로 정리했습니다.'],
  },
];

const customsAuditImages: ServiceDocumentImage[] = [
  {
    src: '/services/docs/customs-audit/image1.png',
    alt: '관세조사 주요 조사 분야 도식',
    caption: '관세평가, 품목분류, 관세환급, 감면, 외국환거래, 통관요건, 보세화물 관리 등 관세조사 주요 쟁점을 한눈에 보여주는 자료입니다.',
  },
];

const penaltyInvestigationSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '세관은 관세법, 대외무역법, 외국환거래법, 특정경제범죄가중처벌등에관한법률 등의 법령을 위반한 혐의가 있다고 판단되는 경우 범칙조사를 실시합니다.',
    ],
  },
  {
    heading: '범칙조사의 구분',
    headingEn: 'Types of Penalty Investigation',
    list: [
      '임의조사: 당사자의 동의 또는 승낙을 받고 행하는 조사로서 관세범의 조사는 임의조사가 원칙입니다.',
      '강제조사: 물리력을 동원하는 강제처분으로서 체포, 구속, 압수수색 등이 이에 해당합니다.',
    ],
  },
  {
    heading: '세관조사',
    headingEn: 'Customs Investigation',
    steps: ['정보분석 및 내사', '조사착수', '범죄혐의 인지', '입건'],
  },
  {
    heading: '통고처분',
    headingEn: 'Notice Disposition',
    list: [
      '관세청장이나 세관장은 고발 전까지 부족세액을 자진 납부한 자, 수출입 안전관리 우수업체, 세관 출석 요구 전에 자수하거나 조사에 적극 협조한 자, 관세범죄 검거 및 예방에 협조한 자, 수출유공 또는 납세유공으로 표창을 수상한 자 등에 대해 관세청장 사전승인을 받아 통고처분 할 수 있습니다.',
      '통고처분 이행(벌금이나 추징금 납부) 시 사건이 종결됩니다.',
      '통고처분 불이행(벌금이나 추징금 미납) 시 검찰로 송치됩니다.',
    ],
  },
  {
    heading: '검찰조사',
    headingEn: 'Prosecutorial Investigation',
    list: [
      '관세청·세관이 사건을 고발·송치합니다.',
      '검찰은 수사 후 기소 여부를 결정합니다.',
      '처분 결과는 불기소처분, 공판기소, 약식기소로 이어질 수 있으며, 공판기소 시 정식 재판과 판결 확정, 약식기소 시 약식명령 송달과 벌금 납부 또는 정식 재판 청구로 연결됩니다.',
    ],
  },
];

const penaltyInvestigationImages: ServiceDocumentImage[] = [
  {
    src: '/services/docs/penalty-investigation/image1.png',
    alt: '범칙조사 세관조사 및 통고처분 절차 도식',
    caption: '세관조사 단계와 통고처분 흐름을 정리한 참고 도식입니다.',
  },
  {
    src: '/services/docs/penalty-investigation/image2.png',
    alt: '범칙조사 검찰조사 및 형사처분 절차 도식',
    caption: '검찰조사 이후 불기소, 공판기소, 약식기소로 이어지는 형사 절차를 정리한 자료입니다.',
  },
];

const vietnamSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '한국은 누적 투자 기준 베트남 최대 외국인 투자국으로, 약 900억 달러 이상의 투자와 약 1만여 개의 기업이 현지에 진출해 있습니다. 신한관세법인 베트남은 이러한 한·베트남 경제 협력의 최전선에서 한국 기업의 베트남 세관 리스크를 선제적으로 관리하고, 실질적인 비용 절감과 컴플라이언스 강화를 지원하기 위해 2019년 하노이에 설립되었습니다.',
      '베트남 관세총국으로부터 정식 인가를 받은 관세법인으로서, 한국 관세사와 베트남 관세사/컨설턴트 총 14인이 현지에서 수출입 통관부터 베트남 원산지 및 수책관리 시스템 컨설팅까지 종합적인 서비스를 제공합니다.',
    ],
  },
  {
    heading: '주요 서비스 1. 수책(Liquidation) 관리',
    headingEn: 'Key Service 1. Liquidation Management',
    body: [
      '수출제조 면세(EPE·SXXK·GC) 적용 기업은 연간 수책보고서를 세관에 제출해야 합니다. 신한관세법인 베트남은 수책보고서 작성 대리부터 월별 수책 관리 컨설팅까지, 고객사가 세관 리스크에 노출되지 않도록 체계적으로 지원합니다. 자체 개발 시스템 KORD LIQ를 통해 재고 정산 데이터의 정확성과 추적 가능성을 높였습니다.',
    ],
  },
  {
    heading: '주요 서비스 2. FTA 컨설팅 및 원산지증명서 발급',
    headingEn: 'Key Service 2. FTA Consulting and COO Issuance',
    body: [
      'VKFTA·AKFTA 등 한베트남 양자 FTA와 ATIGA·RCEP·EVFTA·CPTPP 등 베트남이 참여한 주요 다자간 FTA를 망라하는 종합 활용 전략을 제공합니다. 원산지증명서 발급 대행은 물론, 원산지 관리 시스템 KORD FTA를 통해 고객사의 적법한 원산지관리, FTA 활용률 제고와 사후 검증 대응을 지원합니다.',
    ],
  },
  {
    heading: '주요 서비스 3. 수출입 통관',
    headingEn: 'Key Service 3. Import and Export Clearance',
    body: [
      '동물·기계류 등 다양한 품목에 걸친 실무 통관 이력과, 현지 세관 및 파트너 기관과의 긴밀한 협력 관계를 기반으로 신속하고 정확한 통관 서비스를 제공합니다. 베트남 HS Code 자문, 수출입 요건 분석 및 인허가 대행 업무도 함께 수행합니다.',
    ],
  },
  {
    heading: '주요 서비스 4. 관세심사',
    headingEn: 'Key Service 4. Customs Review',
    body: [
      '수입신고일로부터 5년 이내에 수입신고내역의 적정성에 대해 관세 사후조사를 할 수 있습니다. 사전에 세관 조사 주요항목에 대해 점검을 하며, 기업의 관세 업무 현황에 대한 면밀한 분석으로 세관의 제기 이슈에 대응 논리를 수립합니다.',
    ],
  },
  {
    heading: '주요 서비스 5. 무역 컨설팅 및 교육',
    headingEn: 'Key Service 5. Trade Consulting and Training',
    body: [
      '베트남 내국수출입(domestic export/import) 거래 가능 여부 분석, 반덤핑관세 대응 전략, 대외 관세 정책 변동에 따른 영향 분석 등 복잡한 무역 환경 변화에 능동적으로 대응할 수 있도록 전략적 자문을 제공합니다. 베트남 실무자들을 대상으로 한 수책관리 실무 교육도 제공합니다.',
    ],
  },
  {
    heading: '주요 서비스 6. 상시 자문 서비스',
    headingEn: 'Key Service 6. Ongoing Advisory',
    body: [
      '베트남 관세·무역 법령의 개정 동향 및 최신 공문을 모니터링하고, 고객사에 맞춤형 해석과 실무 적용 방안을 제공합니다. 급변하는 베트남 규제 환경 속에서 고객사가 선제적으로 대응할 수 있도록 지속적으로 지원합니다.',
    ],
  },
];

const vietnamContacts: ServiceContactPoint[] = [
  { name: '신종호', role: '법인장' },
  { name: '김선웅', role: '관세사' },
];

const acvaSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '"ACVA"란 특수관계자간 과세가격 결정방법 사전심사(Advance Customs Valuation Arrangement for transactions between related parties)로 특수관계자간에 거래되는 수입물품의 과세가격 결정방법을 납세자의 신청에 따라 과세당국과 납세자의 상호합의를 통해 사전에 결정하여 주는 제도를 의미합니다.',
    ],
  },
  {
    heading: 'ACVA 이점',
    headingEn: 'Benefits of ACVA',
    list: [
      '관세조사 유예: ACVA 신청물품의 과세가격에 대하여 신청시점부터 승인 시점까지 관세조사가 유예되며, 승인 시점부터 3년 동안 신고가격을 과세가격으로 인정받을 수 있습니다.',
      '가산세 면제: ACVA 신청 시점부터 잠정가격신고 제도 이용이 가능하고, 결과 통보일로부터 2개월 이내 수정신고 시 신고불성실 가산세가 면제됩니다.',
      '과세가격 결정자료 제출 생략: ACVA 결정을 받은 물품은 과세가격 결정자료 제출을 생략할 수 있습니다.',
      '기업 신뢰성 및 경영안정 제고: 과세가격에 대한 과세관청의 신뢰를 확보하고 조세마찰을 최소화해 경영 안정성을 높일 수 있습니다.',
    ],
  },
  {
    heading: 'ACVA 처리절차',
    headingEn: 'ACVA Process',
    steps: [
      '사전상담: 필요 시 사전상담을 신청할 수 있습니다.',
      '사전심사 신청: 특수관계자간 수입물품 가격결정 근거자료 등을 제출합니다.',
      '사전심사: 심사기간은 1년입니다.',
      '심사결과 통보: 신청인은 심사결과 동의 여부를 의사표시합니다.',
      '사전 심사서 배부: 유효기간은 3년이며 2년 연장이 가능합니다.',
      '연례보고서 제출',
    ],
  },
  {
    heading: '업무 범위',
    headingEn: 'Scope of Work',
    list: [
      '특수관계가 거래가격에 영향을 미쳤는지 여부',
      '신청 과세가격 결정방법의 타당성 여부',
      '가산 또는 공제요소 해당 여부',
      '과세가격 적정성 여부',
    ],
  },
];

const taxAppealSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '세관의 위법 또는 부당한 처분으로 인해 기업의 권리나 이익이 침해되었을 때, 이를 법적으로 바로잡기 위해 다투는 모든 절차를 의미합니다.',
      '세관 현장에서의 풍부한 실무 경험을 갖춘 베테랑 전문가들과 업계 최고 수준의 관세사들로 구성된 전담팀을 운영하고 있습니다.',
      '과세관청의 논리와 심사 매커니즘을 심도있게 꿰뚫어 보는 통찰력을 바탕으로, 납세자의 권익보호를 위해 과세전적부심사, 관세심사청구, 조세심판청구 등 모든 단계에서 치밀한 전략과 최적의 법률 서비스를 제공합니다.',
    ],
  },
  {
    heading: '관세행정 권리구제제도',
    headingEn: 'Customs Remedies Framework',
    body: ['과세 전 구제와 사후 구제를 포함한 관세행정 권리구제 흐름은 아래 도식으로 확인하실 수 있습니다.'],
  },
  {
    heading: '업무범위',
    headingEn: 'Scope of Work',
    list: ['과세전적부심사청구 대리', '이의신청 대리, 심사청구 대리, 심판청구 대리', '행정소송 수행 자문 등'],
  },
];

const taxAppealImages: ServiceDocumentImage[] = [
  {
    src: '/services/docs/acva-tax-appeal/image1.png',
    alt: '조세불복 관세행정 권리구제제도 도식',
    caption: '과세전적부심사, 이의신청, 심사청구, 심판청구, 행정소송 등 관세행정 권리구제 절차를 정리한 자료입니다.',
  },
];

const aeoSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '“AEO(Authorized Economic Operator) 제도”는 수출업체, 수입업체, 관세사, 보세구역 운영인, 보세운송업자, 하역업자, 화물운송주선업자, 선박회사, 항공사 등 9개 공급망을 대상으로, 법규 준수와 안전관리 기준을 충족한 기업을 관세청이 우수업체로 공인하고 통관 절차상 다양한 우대를 제공하는 제도로 2009년에 도입되었습니다.',
      '해당 제도를 통해 기업은 글로벌 공급망에서의 신뢰도를 확보하고, 통관 효율성 및 물류 경쟁력을 강화할 수 있습니다.',
    ],
  },
  {
    heading: 'AEO인증 & 갱신심사 컨설팅',
    headingEn: 'Certification and Renewal Consulting',
    body: [
      'AEO 신규 인증을 준비하는 대부분의 기업이 전사적인 참여 유도, 공인기준 이해, 신규 프로세스의 적용과정에서 어려움을 겪습니다. 당사는 부서별 집중 교육과 기업 맞춤형 프로세스 구축을 통해 기존 업무 흐름에 신규 프로세스가 자연스럽게 정착되도록 지원합니다.',
      '갱신심사 과정에서는 개정된 기준이나 수시로 변하는 심사 트렌드를 적시에 반영하지 못해 요건을 충족하지 못하는 사례가 발생할 수 있습니다. 당사는 최신 공인 기준과 심사 동향을 신속하고 정확하게 반영하여 갱신심사가 원활하게 진행되도록 적극 지원합니다.',
      '또한 신규 공인 취득 및 갱신심사 시 요구되는 약 220여 개 이상의 공인기준에 대해, 제도 도입 초기부터 현재까지 경험이 축적된 전문 컨설턴트를 배정하여 신속하고 정확한 (재)공인을 지원합니다.',
    ],
  },
  {
    heading: '사후관리',
    headingEn: 'Post-Certification Management',
    body: [
      'AEO (재)공인 후 연간 정기 자율평가 및 심사자 확인서 제출 등 필수적인 세관 보고 의무를 컨설팅 일정에 따라 체계적으로 대행하며, 인적·사업장 변동 사항을 모니터링하여 세관 신고와 현장 실사 대응까지 빈틈없이 지원합니다.',
      '업무 절차 변경 시 누락이 발생하지 않도록 관련 규정의 현행화를 상시 모니터링하고 개정 전 과정을 밀착 지원합니다.',
      '특히 사후관리 수행에 가장 어려움을 겪는 3대 평가(위험평가, 내부통제활동평가, 거래업체 평가) 과정에서는 분야별 전문 컨설턴트가 세세하게 개입하여 단기간 내 평가가 종료될 수 있도록 지원하고, 실질적인 리스크를 도출해 형식적 평가를 넘어 기업 운영에 도움이 되도록 지원합니다.',
    ],
  },
  {
    heading: '등급조정 및 관세 협력 활동 지원',
    headingEn: 'Grade Adjustment and Cooperation Support',
    body: [
      '등급조정은 서류 제출 이후 현장심사를 통해 진행되며, 신규 공인이나 갱신심사와 달리 현장 보완 없이 성패가 결정됩니다. 당사는 AAA 승급 성공 컨설팅 경험을 바탕으로 신청 전 면밀한 서류 사전 검토와 철저한 현장심사 대응을 지원합니다.',
      'AEO 활용사례 나눔대회 수상 이력이 있는 기업은 공인등급 상향을 위한 자격 요건을 충족할 수 있습니다. 당사는 사례 소재 발굴부터 본선 진출, 대상 포함 다수의 수상 실적을 기반으로 발표 구성과 발표 역량 강화까지 전 과정을 체계적으로 지원합니다.',
      '또한 국내 AEO 인증을 넘어 미국 관세국경보호청의 C-TPAT 검증 대응과 국가 간 MRA 체결을 위한 합동심사 지원 등 다양한 국내외 대관 업무 경험을 바탕으로 각국 세관 및 유관기관 대응을 지원합니다.',
    ],
  },
  {
    heading: 'AEO 컨설팅 전략',
    headingEn: 'AEO Consulting Strategy',
    body: ['신규인증·갱신심사 전략과 사후관리 전략은 아래 도식으로 정리했습니다.'],
  },
];

const aeoContacts: ServiceContactPoint[] = [
  { name: '홍동엽', role: '팀장', phone: '070-4343-7707', email: 'dyhong@shcs.kr' },
  { name: '강현우', role: '수석', phone: '070-4343-7735', email: 'hwkang@shcs.kr' },
];

const aeoImages: ServiceDocumentImage[] = [
  {
    src: '/services/docs/aeo/image1.png',
    alt: 'AEO 신규인증 및 갱신심사 전략 도식',
    caption: '현황진단부터 현장심사 대응, 심의위원회 준비까지 신규인증·갱신심사 전략을 정리한 도식입니다.',
  },
];

const ftaSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '원산지는 물품의 "경제적 국적"을 규정하는 기준입니다. 이는 단순히 물품의 생산지를 확인하는 것을 넘어, 국제 무역에서 적용되는 세율과 각종 수입 규제의 향방을 결정하는 핵심 지표입니다. 기업은 일반 원산지 규정을 통해 무역 질서를 준수하고, FTA 원산지 규정을 활용하여 실질적인 관세 절감 및 가격 경쟁력을 확보해야 합니다.',
    ],
  },
  {
    heading: '원산지 관리의 종류',
    headingEn: 'Types of Origin Management',
    list: [
      '특혜 원산지 관리: 자유무역협정(FTA) 체결국 간의 특혜 관세 혜택을 향유하기 위한 종합 관리 절차로, 수출 물품의 원산지 판정과 수입 시 원산지 증빙 서류의 적정성 관리가 핵심입니다.',
      '비특혜 원산지 관리: 특혜 관세 혜택과 관계없이 대외무역법 및 수입국 규정에 따라 차등적인 관세·비관세 조치를 적용하기 위한 절차로, 덤핑방지관세 적용 여부 판단, 수입 쿼터 관리, 원산지 표시 준수를 통해 통상 환경의 불확실성을 줄입니다.',
    ],
  },
  {
    heading: '일반원산지 컨설팅',
    headingEn: 'Non-Preferential Origin Consulting',
    list: [
      '원산지 표시 자문: 대외무역법 검토를 통한 수입물품의 원산지 판정, 표시 방법 가이드, 위반 리스크 점검',
      '해외 비특혜 원산지 판정 대응: 미국, 중국 등 주요국의 비특혜 원산지 규정과 국가별 특수 규정에 대한 전문 자문',
    ],
  },
  {
    heading: 'FTA 원산지 컨설팅',
    headingEn: 'FTA Origin Consulting',
    list: [
      '원산지 판정 및 증명: 협정별 원산지결정기준 분석을 통한 정확한 원산지 판정과 입증자료 구비',
      '원산지증명서 발급 지원 및 품목별·업체별 인증수출자 취득·유지 컨설팅',
      '수입물품 자율점검 및 원산지조사 대응: 협정관세 정합성 의심 및 조사 시 원산지 충족 여부 소명과 방어',
      '수출물품 원산지검증 대응: 미국, 유럽, 아세안 등 주요 수입국 세관의 검증 요청에 대한 전략적 입증자료 작성과 직접 대응',
      '원산지 시스템 및 DB 구축: 기업 맞춤형 자체 FTA 시스템 설계·구축과 전 세계 98개 이상의 FTA 협정·관세율 정보 기반 Best Option 솔루션 제공',
    ],
  },
];

const ftaContacts: ServiceContactPoint[] = [
  { name: '오보람', phone: '070-4343-7790', email: 'broh@shcs.kr' },
  { name: '전지엽', phone: '070-4343-7749', email: 'jyjeon@shcs.kr' },
];

const tradeConsultingSections: ServiceDetailSection[] = [
  {
    heading: '개요',
    headingEn: 'Overview',
    body: [
      '사전심사 제도란 수출입신고를 하기 전 과세가격 결정과 관련한 사항, 품목번호, 원산지 결정기준의 충족여부 등을 관세청장에게 미리 심사하여 줄 것을 신청하는 제도입니다.',
    ],
  },
  {
    heading: '사전심사 제도의 종류',
    headingEn: 'Types of Advance Rulings',
    list: [
      '과세가격 결정방법 사전심사: 가격신고 전에 가산비용, 공제요소, 거래가격 배제요건, 특수관계자간 거래물품의 과세가격 결정방법 등에 의문이 있는 경우 미리 심사를 신청할 수 있습니다.',
      '품목분류 사전심사: 수출입자가 스스로 품목을 분류하기 어려운 경우 신청서, 견본, 설명자료 등을 갖추어 해당 물품의 품목번호를 미리 심사받을 수 있습니다.',
      '원산지 사전심사: 협정관세 적용에 기초가 되는 원산지 결정기준 충족 여부 등에 대해 신청서, 원재료내역서, 공정명세서 등을 제출하여 미리 심사를 받을 수 있습니다.',
    ],
  },
  {
    heading: '주요 내용 및 절차',
    headingEn: 'Key Content and Process',
    body: ['과세가격, ACVA, 품목분류, 원산지 사전심사의 신청 주체, 처리 기간, 유효기간, 후속 효과는 아래 비교 자료로 정리했습니다.'],
  },
];

const tradeConsultingContacts: ServiceContactPoint[] = [
  { name: '김유진', role: '관세사', phone: '070-4343-7703' },
  { name: '전인선', role: '관세사', phone: '070-4343-7774' },
];

const tradeConsultingImages: ServiceDocumentImage[] = [
  {
    src: '/services/docs/trade-consulting/image1.png',
    alt: '기타 관세무역컨설팅 사전심사 제도 비교표',
    caption: '과세가격, ACVA, 품목분류, 원산지 사전심사의 법적 근거와 처리 절차를 비교한 자료입니다.',
  },
];

export const serviceDetailPages: ServiceDetailContent[] = [
  {
    id: 'import-export',
    path: '/services/import-export',
    groupKey: 'clearance-refund',
    groupTitle: '수출입통관 및 환급',
    groupTitleEn: 'Import/Export Clearance & Refund',
    title: '수출입통관',
    summary: '정확한 법령 해석과 실무 경험을 기반으로 복잡한 수출입 통관을 빠르고 안정적으로 지원합니다.',
    subtitle: '복잡한 수출입 통관, 분야별 통관 전문가가 빠르고 정확하게 해결합니다.',
    heroImage: '/services/heroes/import-export.jpg',
    heroImageAlt: '수출입통관 서비스',
    overview:
      '수출입 통관 전 과정에 대해 정확한 법령 해석과 실무 경험을 기반으로 신속하고 안정적인 서비스를 제공합니다. PI(Process Innovation)팀의 AI 기반 수출입 및 전후 절차 간소화와 CI(Customs Innovation)팀의 통관 SOP 최적화를 결합해 효율성과 정확성을 동시에 확보하며, 자체 개발 iOOM 시스템으로 통관 현황과 데이터를 실시간 관리합니다.',
    scope: [
      'HS CODE 마스터 관리 시스템 운영',
      'RMS 기반 통관 리스크 관리',
      '풍부한 경험을 기반으로 한 통관 이슈 대응',
      '고객사 시스템 연동 및 반복 업무 자동화',
      '고객사 맞춤형 수출입통관 분석 데이터 제공',
      '자체 개발 iOOM 시스템 기반 통관 현황·데이터 관리',
    ],
    checkpoints: [
      '사전 검토(거래조건·과세요소 분석)',
      'HS CODE 및 세율 검토',
      '요건확인 및 인증 대응',
      '수입신고 및 세관 심사 대응',
      '신고수리 및 물품 반출',
      '사후관리(리스크 및 사후 심사 대응)',
    ],
    contentSections: importExportSections,
    contactPoints: importExportContacts,
    relatedExpertNames: ['이선희', '정미화'],
    relatedResources: sharedResources,
  },
  {
    id: 'quarantine',
    path: '/services/quarantine',
    groupKey: 'quarantine-requirements',
    groupTitle: '검역/요건',
    groupTitleEn: 'Quarantine / Requirements',
    title: '검역',
    summary: '검역 대상 여부와 제출 절차를 선제 점검해 통관 지연과 보완 리스크를 줄입니다.',
    heroImage: '/services/heroes/quarantine.jpg',
    heroImageAlt: '검역 서비스',
    overview:
      '품목별 검역 대상 여부와 기관별 제출 절차를 거래 단계에서 먼저 확인해 통관 단계의 불확실성을 줄입니다. 검역 일정과 필요 서류를 체크리스트로 관리해 반복 보완을 예방합니다.',
    scope: [
      '검역 대상 품목 사전 판별',
      '기관별 제출 절차 및 일정 점검',
      '필수 검역 서류 사전 준비',
      '보완 요청 대응 및 커뮤니케이션 지원',
    ],
    checkpoints: ['품목 분류 확인', '검역 대상 항목 매핑', '사전서류 준비', '신고 후 보완 대응'],
    relatedExpertNames: ['서영진', '전무열'],
    relatedResources: sharedResources,
  },
  {
    id: 'requirements',
    path: '/services/requirements',
    groupKey: 'quarantine-requirements',
    groupTitle: '검역/요건',
    groupTitleEn: 'Quarantine / Requirements',
    title: '요건',
    summary: '수입요건과 인허가 기준을 사전에 정리해 신고 보완과 반출 지연 가능성을 낮춥니다.',
    heroImage: '/services/heroes/requirements.jpg',
    heroImageAlt: '요건 서비스',
    overview:
      '수입요건, 인증, 허가 기준을 품목별로 점검해 신고 전 단계에서 필요한 자료를 정비합니다. 거래 구조와 제출 서류를 함께 검토해 반복 보완 없이 통관 흐름이 이어지도록 지원합니다.',
    scope: [
      '수입요건·인허가 기준 검토',
      '인증 및 제출서류 체크리스트 설계',
      '신고 전 정합성 사전 점검',
      '보완 요청 대응 및 후속 관리',
    ],
    checkpoints: ['품목별 요건 확인', '인허가 기준 매핑', '제출자료 정비', '신고 후 이슈 대응'],
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
    summary: '20년의 FTA 컨설팅 경험을 보유한 전담팀이 공급망 전 과정의 원산지 리스크를 선제적으로 진단합니다.',
    subtitle:
      '20년의 FTA 컨설팅 경험을 보유한 전담팀이 공급망 전 과정의 원산지 리스크를 선제적으로 진단하고, 전략적인 관리 체계를 통해 글로벌 통상 환경에서의 경영 안정성과 이익을 극대화합니다.',
    heroImage: '/services/heroes/fta.jpg',
    heroImageAlt: '원산지 FTA 컨설팅',
    overview:
      '원산지는 물품의 경제적 국적을 규정하는 기준으로, 세율과 수입 규제의 적용 방향을 결정하는 핵심 지표입니다. 신한은 일반 원산지 규정을 통한 무역 질서 준수와 FTA 원산지 규정 활용을 통한 실질적 관세 절감을 함께 지원하며, 전략적인 관리 체계를 통해 글로벌 통상 환경에서의 경영 안정성과 이익 극대화를 돕습니다.',
    scope: [
      '일반 원산지 컨설팅 및 표시 자문',
      '해외 비특혜 원산지 판정 대응',
      'FTA 원산지 판정 및 증명서 발급 지원',
      '원산지 조사·검증 대응',
      '원산지 시스템 및 글로벌 FTA DB 구축',
    ],
    checkpoints: ['협정·품목별 원산지 기준 분석', '입증자료 및 증빙 체계 정비', '인증수출자·증명서 운영 지원', '원산지 검증 대응 자료 작성', '시스템·DB 기반 상시 관리'],
    contentSections: ftaSections,
    contactPoints: ftaContacts,
    relatedExpertNames: ['오보람', '전지엽'],
    relatedResources: sharedResources,
  },
  {
    id: 'aeo',
    path: '/services/consulting/aeo',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: 'AEO 컨설팅',
    summary: '글로벌 관세 규제가 급변하는 환경 속에서 AEO 신규 공인부터 사후관리와 갱신까지 전 과정을 지원합니다.',
    subtitle:
      '글로벌 관세 규제가 급변하는 환경 속에서, 전 세계 무역 안전을 위한 글로벌 약속인 AEO는 다변화된 통관 리스크를 선제적으로 차단하고 기업의 비즈니스 연속성을 보장하는 강력한 안전장치입니다.',
    heroImage: '/services/heroes/aeo.jpg',
    heroImageAlt: 'AEO 컨설팅',
    overview:
      '신한은 관세업계 최초로 AEO 공인을 획득한 이후 제도 도입 초기부터 현재까지 다양한 산업군의 고객사를 대상으로 수준 높은 컨설팅을 제공해 왔습니다. 단순한 인증 획득에 그치지 않고, 효율성 추구와 AEO 역량 내재화를 원칙으로 삼아 실효성 있는 AEO 체계가 조직 내에 안정적으로 정착되도록 지원합니다.',
    scope: [
      'AEO 신규 인증 및 갱신심사 컨설팅',
      'AEO 사후관리 및 세관 보고 의무 지원',
      '등급조정 및 AEO 활용사례 나눔대회 지원',
      'C-TPAT·MRA 등 국내외 대관 업무 지원',
    ],
    checkpoints: ['현황 진단 및 부서별 집중 교육', '220여 개 공인기준 대응 프로세스 구축', '현장심사 및 갱신 대응', '사후관리·3대 평가 운영 지원'],
    contentSections: aeoSections,
    contactPoints: aeoContacts,
    documentImages: aeoImages,
    relatedExpertNames: ['홍동엽', '강현우'],
    relatedResources: sharedResources,
  },
  {
    id: 'customs-audit',
    path: '/services/consulting/customs-audit',
    groupKey: 'consulting',
    groupTitle: '컨설팅',
    groupTitleEn: 'Consulting',
    title: '관세조사',
    summary: '치밀한 사전 리스크 분석과 입체적인 대응 전략으로 관세조사의 불확실성을 줄이고 경영 안정성을 지원합니다.',
    subtitle: '치밀한 사전 리스크 분석과 입체적인 대응 전략으로, 관세조사의 불확실성을 제거하고 기업의 경영 안정성을 실현합니다.',
    heroImage: '/services/heroes/customs-audit.jpg',
    heroImageAlt: '관세조사 대응',
    overview:
      '관세조사는 관세의 과세표준과 세액의 결정 또는 경정을 위하여 방문 또는 서면으로 납세자의 장부·서류 등을 조사하는 절차입니다. 통관 후 세액심사 외에도 통관적법성 전반에 대해 기업 단위로 적정성을 확인하는 과정이기 때문에, 신한은 사전 리스크 분석과 전략적 대응으로 조사 불확실성을 낮추고 경영 안정성을 돕습니다.',
    scope: ['정기 관세조사 대응', '비정기 관세조사 대응', '간이 관세조사 대응', '통관적법성 전반 사전 리스크 분석'],
    checkpoints: ['사전 리스크 스크리닝', '장부·서류 정합성 점검', '방문·서면 조사 대응 전략 수립', '조사 후속 개선안 실행'],
    contentSections: customsAuditSections,
    documentImages: customsAuditImages,
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
    heroImage: '/services/heroes/foreign-exchange.jpg',
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
    summary: 'ACVA 컨설팅은 특수관계자간 과세가격의 안정성을 제공하고 관세 리스크를 줄이는 데 초점을 둡니다.',
    subtitle: 'ACVA 컨설팅은 특수관계자간 과세가격의 안정성을 제공합니다.',
    heroImage: '/services/heroes/acva.jpg',
    heroImageAlt: 'ACVA 컨설팅',
    overview:
      'ACVA는 특수관계자간 과세가격 결정방법 사전심사 제도로, 특수관계자간에 거래되는 수입물품의 과세가격 결정방법을 납세자의 신청에 따라 과세당국과 상호 합의해 사전에 결정하는 제도입니다. 관세조사 유예, 가산세 면제, 과세가격 결정자료 제출 생략 등 실질적 이점을 통해 기업의 신뢰성과 경영 안정성을 높입니다.',
    scope: [
      '특수관계가 거래가격에 영향을 미쳤는지 여부 검토',
      '신청 과세가격 결정방법의 타당성 검토',
      '가산 또는 공제요소 해당 여부 분석',
      '과세가격 적정성 검토 및 후속 자문',
    ],
    checkpoints: ['사전상담', '사전심사 신청', '사전심사 진행', '심사결과 통보 대응', '사전심사서 배부 및 효력 관리', '연례보고서 제출'],
    contentSections: acvaSections,
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
    summary: '법령 전문성과 풍부한 대관 경험을 바탕으로 조사 대응부터 형사 리스크 관리까지 통합 지원합니다.',
    subtitle:
      '관세법령에 대한 전문성과 풍부한 대관 경험을 바탕으로, 법무법인과의 협업을 통해 조사 대응부터 형사 리스크 관리까지 전 과정을 아우르는 통합 솔루션을 제공합니다.',
    heroImage: '/services/heroes/penalty-investigation.jpg',
    heroImageAlt: '범칙조사 대응',
    overview:
      '세관은 관세법, 대외무역법, 외국환거래법, 특정경제범죄가중처벌등에관한법률 등을 위반한 혐의가 있다고 판단되는 경우 범칙조사를 실시합니다. 신한은 법무법인과의 협업을 통해 임의·강제 조사 대응부터 통고처분, 검찰 조사와 형사 리스크 관리까지 전 과정을 아우르는 통합 솔루션을 제공합니다.',
    scope: [
      '임의조사 대응 및 진술 전략 수립',
      '강제조사 대응 및 압수수색 리스크 관리',
      '통고처분 이행·불이행 대응',
      '검찰 조사 및 기소 단계 후속 자문',
    ],
    checkpoints: ['세관조사 대응', '통고처분 검토 및 이행 전략 수립', '검찰 송치·수사 대응', '불기소·약식기소·공판기소 후속 대응'],
    contentSections: penaltyInvestigationSections,
    documentImages: penaltyInvestigationImages,
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
    summary: '불합리한 과세 처분에 대해 치밀한 법리 검토와 풍부한 실무 경험으로 권리구제 절차를 지원합니다.',
    subtitle: '불합리한 과세 처분, 치밀한 법리 검토와 풍부한 실무 경험으로 대응합니다.',
    heroImage: '/services/heroes/tax-appeal.jpg',
    heroImageAlt: '조세불복 자문',
    overview:
      '조세불복은 세관의 위법 또는 부당한 처분으로 인해 기업의 권리나 이익이 침해되었을 때 이를 법적으로 바로잡기 위해 다투는 모든 절차를 의미합니다. 세관 현장의 풍부한 실무 경험과 과세관청의 심사 메커니즘에 대한 깊은 이해를 바탕으로 과세전적부심사부터 심판과 소송 단계까지 치밀한 전략을 제공합니다.',
    scope: ['과세전적부심사청구 대리', '이의신청·심사청구·심판청구 대리', '행정소송 수행 자문 및 대응 전략 수립'],
    checkpoints: ['사실관계 및 처분 논리 분석', '불복 전략 수립', '단계별 청구서류 작성·제출', '심판·소송 후속 대응'],
    contentSections: taxAppealSections,
    documentImages: taxAppealImages,
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
    heroImage: '/services/heroes/refund.jpg',
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
    summary: '사전심사 제도를 활용해 수출입 전 불확실성을 줄이고 기업의 경영 안정성을 지원합니다.',
    subtitle:
      '관세법 및 자유무역협정의 이행을 위한 관세법의 특례에 관한 법(FTA관세법)에 규정된 사전심사 제도를 활용하여 고객사의 불확실성을 제거하고 기업의 경영 안정성을 실현합니다.',
    heroImage: '/services/heroes/trade-consulting.jpg',
    heroImageAlt: '관세무역 컨설팅',
    overview:
      '관세법과 FTA관세법에 규정된 사전심사 제도를 활용해 과세가격, 품목번호, 원산지 결정기준 충족 여부 등을 신고 전에 미리 검토함으로써 고객사의 불확실성을 제거하고 경영 안정성을 실현합니다.',
    scope: ['과세가격 결정방법 사전심사', '품목분류 사전심사', '원산지 사전심사', '사전심사 결과 반영 및 운영 자문'],
    checkpoints: ['사전 쟁점 정의', '신청서·견본·원재료내역 준비', '사전심사 신청 및 대응', '심사결과 운영 반영'],
    contentSections: tradeConsultingSections,
    contactPoints: tradeConsultingContacts,
    documentImages: tradeConsultingImages,
    relatedExpertNames: ['김유진', '전인선'],
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
    heroImage: '/services/heroes/logistics.jpg',
    heroImageAlt: '물류 서비스',
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
    summary: '한국 60년 관세 전문성과 베트남 현지 네트워크를 결합해 베트남 진출 기업의 관세 리스크를 선제적으로 관리합니다.',
    subtitle:
      '한국 60년 역사의 관세 전문성과 베트남 현지 네트워크를 결합한 독자적인 역량을 바탕으로, 신한관세법인 베트남(Shinhan Customs Vietnam)은 베트남 진출 한국 기업의 가장 신뢰받는 파트너를 지향합니다.',
    heroImage: '/services/heroes/vietnam.jpg',
    heroImageAlt: '베트남 현지 관세 컨설팅',
    overview:
      '신한관세법인 베트남(Shinhan Customs Vietnam)은 2019년 하노이에 설립된 베트남 관세총국 인가 관세법인으로, 한국 관세사와 베트남 관세사·컨설턴트가 함께 현지 한국 기업의 세관 리스크를 관리합니다. 수출입 통관부터 수책관리, FTA, 관세심사, 상시 자문까지 종합 서비스를 제공하며 실질적인 비용 절감과 컴플라이언스 강화를 지원합니다.',
    scope: [
      '수책(Liquidation) 관리 및 월별 컨설팅',
      'FTA 컨설팅 및 원산지증명서 발급',
      '수출입 통관 및 HS Code·인허가 자문',
      '관세심사 대응',
      '무역 컨설팅 및 교육',
      '상시 자문 서비스',
    ],
    checkpoints: ['현지 관세 리스크 진단', '서비스 범위별 운영체계 설계', '월별 수책·FTA·통관 관리', '관세심사 및 규정 변화 대응', '상시 자문 및 교육 연계'],
    contentSections: vietnamSections,
    contactPoints: vietnamContacts,
    relatedExpertNames: ['신종호', '김선웅'],
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
    heroImage: '/services/heroes/us-fda.jpg',
    heroImageAlt: '미국 FDA 대응 서비스',
    overview:
      '품목별 FDA 체크포인트, 제출자료, 통관 연계 절차를 사전에 정리해 미국 수출 단계의 불확실성을 줄이고 대응 속도를 높입니다.',
    scope: ['FDA 요건/대상 판별', '서류 준비 및 점검', '통관·물류 연계 대응', '사후 이슈 대응 자문'],
    checkpoints: ['품목 분류 확인', '요건 체크리스트 점검', '제출자료 정비', '출고 전 최종 검토'],
    relatedExpertNames: ['서영진', '전무열'],
    relatedResources: sharedResources,
  },
];
