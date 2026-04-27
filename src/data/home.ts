import type {
  HeroSlide,
  IssueReport,
  ItService,
  LinkItem,
  Member,
  NewsletterItem,
  OfficeBranch,
  PracticeAreaDetail,
  SiteContact,
  ShinhanNewsItem,
} from '../types/site';
import { issueReportsSnapshot } from './issueReportsSnapshot';
import { newsletterItems as legacyNewsletterItems } from './pageContent';
import { shinhanNewsArchive } from './shinhanNewsArchive';

export const brandMarkPath = '/brand-mark.svg';

export const utilityLinks: LinkItem[] = [
  { id: 'kor', label: 'KOR', href: '/' },
];

export const footerLinks: LinkItem[] = [
  { id: 'terms', label: '서비스 이용약관', to: '/legal/terms' },
  { id: 'privacy', label: '개인정보처리방침', to: '/legal/privacy' },
  { id: 'recruit-disclaimer', label: '채용면책공고', to: '/legal/recruit-disclaimer' },
  { id: 'email-protection', label: '이메일무단수집거부', to: '/legal/no-email-collection' },
];

export const footerSocialLinks: LinkItem[] = [
  {
    id: 'youtube',
    label: '유튜브',
    href: 'https://www.youtube.com/@%EC%8B%A0%ED%95%9C%EA%B4%80%EC%84%B8%EB%B2%95%EC%9D%B8',
  },
  {
    id: 'blog',
    label: '블로그',
    href: 'https://blog.naver.com/shinhan22',
  },
];

export const siteContact: SiteContact = {
  phone: '02-3448-1181',
  email: 'shinhan@shcs.kr',
  address: '서울시 강남구 논현로 704',
  addressEn: '704, Nonhyeon-ro, Gangnam-gu, Seoul, Korea',
  businessNumber: '211-86-05953',
};

export const heroSlides: HeroSlide[] = [
  {
    label: '반도체',
    labelEn: 'Semiconductor',
    eyebrow: 'Advanced Manufacturing',
    eyebrowEn: 'Advanced Manufacturing',
    headline: '정밀한 통관 운영으로\n반도체 공급망을 지킵니다',
    headlineEn: 'Protecting semiconductor supply chains\nthrough precise customs operations',
    summary: '수입·수출 신고부터 사후 검증까지 생산 일정에 맞춰 실무를 관리합니다.',
    summaryEn: 'We manage import-export declarations and post-verification in line with production schedules.',
    image: '/hero/practice-import-port.jpg',
    secondaryImage: '/hero/practice-fta-containers.jpg',
    objectPosition: '50% 52%',
    secondaryObjectPosition: '50% 52%',
    mobileObjectPosition: '54% center',
    mobileSecondaryObjectPosition: '54% center',
    theme: 'deep-blue',
  },
  {
    label: '항공물류',
    labelEn: 'Air Cargo',
    eyebrow: 'Air Cargo Operations',
    eyebrowEn: 'Air Cargo Operations',
    headline: '항공 물류권역의 긴급 통관을\n신속하게 연결합니다',
    headlineEn: 'Rapidly connecting urgent customs\noperations for air cargo zones',
    summary: '공항 기반 통관과 물류 연계를 한 흐름으로 운영해 납기 리스크를 줄입니다.',
    summaryEn: 'Airport customs and logistics are managed as one flow to reduce lead-time risk.',
    image: '/hero/practice-fta-containers.jpg',
    secondaryImage: '/hero/practice-import-port.jpg',
    objectPosition: '50% 50%',
    secondaryObjectPosition: '50% 52%',
    mobileObjectPosition: '50% center',
    mobileSecondaryObjectPosition: '54% center',
    theme: 'deep-blue',
  },
  {
    label: '항만',
    labelEn: 'Port Logistics',
    eyebrow: 'Port Logistics',
    eyebrowEn: 'Port Logistics',
    headline: '항만 통관부터 보세·운송 연계까지\n현장 기준으로 대응합니다',
    headlineEn: 'From port clearance to bonded\ntransport support, aligned to field operations',
    summary: '부산항 중심의 해상 물류 흐름에 맞춰 신고·검사·사후 대응을 지원합니다.',
    summaryEn: 'We support declarations, inspections, and follow-up actions for maritime logistics at Busan Port.',
    image: '/hero/practice-aeo-warehouse.jpg',
    secondaryImage: '/hero/practice-fta-containers.jpg',
    objectPosition: '50% 54%',
    secondaryObjectPosition: '50% 50%',
    mobileObjectPosition: '50% center',
    mobileSecondaryObjectPosition: '50% center',
    theme: 'light-blue',
  },
  {
    label: '제약',
    labelEn: 'Pharma',
    eyebrow: 'Healthcare Compliance',
    eyebrowEn: 'Healthcare Compliance',
    headline: '규정 대응이 까다로운 의약 품목도\n체계적으로 관리합니다',
    headlineEn: 'Systematic customs control for\nhigh-compliance pharmaceutical goods',
    summary: '요건 검토, 인허가 확인, 통관 단계 점검을 일관된 프로세스로 운영합니다.',
    summaryEn: 'Requirements review, permit checks, and clearance checkpoints are handled in one consistent process.',
    image: '/hero/practice-investigation-robot.jpg',
    secondaryImage: '/hero/practice-fta-containers.jpg',
    objectPosition: '50% 48%',
    secondaryObjectPosition: '50% 50%',
    mobileObjectPosition: '52% center',
    mobileSecondaryObjectPosition: '50% center',
    theme: 'light-blue',
  },
  {
    label: '자동차 부품',
    labelEn: 'Auto Parts',
    eyebrow: 'Automotive Components',
    eyebrowEn: 'Automotive Components',
    headline: '자동차 부품 통관 업무를\n안정적으로 운영합니다',
    headlineEn: 'Reliable customs operations for\nautomotive parts',
    summary: '반복 거래 품목의 신고 품질을 높이고 공급 일정에 맞춘 대응 체계를 제공합니다.',
    summaryEn: 'We improve declaration quality for recurring parts and align operations with supply schedules.',
    image: '/hero/practice-forex-monitors.jpg',
    secondaryImage: '/hero/practice-investigation-robot.jpg',
    objectPosition: '58% 46%',
    secondaryObjectPosition: '50% 48%',
    mobileObjectPosition: '60% center',
    mobileSecondaryObjectPosition: '52% center',
    theme: 'deep-blue',
  },
];

export const members: Member[] = [
  {
    name: '장승희',
    phone: '02-542-1181',
    email: 'vision@shcs.kr',
    title: '대표이사 / 관세사',
    department: '신한관세법인',
    practice: '기업심사, 조사 대응, 수출입 통관 총괄',
    accent: '#526f9e',
    image: '/members/jang.png',
  },
  {
    name: '서영진',
    phone: '070-4343-7714',
    email: 'wedin8@shcs.kr',
    title: '부대표 / 관세사',
    department: '서울본사 컨설팅본부',
    practice: '기업심사 및 조사, 외환, FTA 자문',
    accent: '#7486a0',
    image: '/members/seo.png',
  },
  {
    name: '최대규',
    phone: '070-4343-7751',
    email: 'dkchoi@shcs.kr',
    title: '상무 / 관세사 자격 / 미국공인회계사',
    department: '서울본사 컨설팅본부',
    practice: 'FTA 컨설팅, 베트남 관세 및 재고관리',
    accent: '#4e6987',
    image: '/members/choi.png',
  },
  {
    name: '전무열',
    phone: '070-4343-7783',
    email: 'myzeon@shcs.kr',
    title: '본부장 / 지사장 / 관세사',
    department: '서울본사 통관본부 / 인천경기지사',
    practice: '기업심사 및 외환, FTA 지원',
    accent: '#637ca1',
    image: '/members/jeon.png',
  },
];

export const executives: Member[] = [
  {
    name: '장승희',
    phone: '02-542-1181',
    email: 'vision@shcs.kr',
    title: '대표이사 / 관세사',
    department: '신한관세법인',
    practice: '',
    accent: '#345f97',
    image: '/members/executives/장승희.png',
  },
  {
    name: '서영진',
    phone: '070-4343-7714',
    email: 'wedin8@shcs.kr',
    title: '부대표 / 관세사',
    department: '서울본사 컨설팅본부',
    practice: '기업심사 및 조사, 외환',
    accent: '#4b6d9c',
    image: '/members/executives/서영진.png',
  },
  {
    name: '최대규',
    phone: '070-4343-7751',
    email: 'dkchoi@shcs.kr',
    title: '상무 / 관세사 자격 / 미국공인회계사 자격',
    department: '서울본사 컨설팅본부',
    practice: 'FTA 컨설팅, 베트남 관세 및 재고정산(Liquidation) 컨설팅',
    accent: '#406182',
    image: '/members/executives/최대규.png',
  },
  {
    name: '전무열',
    phone: '070-4343-7783',
    email: 'myzeon@shcs.kr',
    title: '본부장 / 지사장 / 관세사',
    department: '서울본사 통관본부 / 인천경기지사',
    practice: '기업심사 및 외환, FTA지원',
    accent: '#5d7aa2',
    image: '/members/executives/전무열.png',
  },
  {
    name: '강인성',
    phone: '070-4343-7778',
    email: 'iskang@shcs.kr',
    title: '본부장 / 관세사',
    department: '부산지사',
    practice: '통관, 검역/요건, FTA컨설팅',
    accent: '#2f658f',
    image: '/members/executives/강인성.png',
  },
  {
    name: '최병한',
    phone: '070-4343-7708',
    email: 'hbchoi@shcs.kr',
    title: '이사',
    department: '서울본사 통관본부',
    practice: '통관, 관세환급, 검역/요건',
    accent: '#455f84',
    image: '/members/executives/최병한.png',
  },
  {
    name: '손성곤',
    phone: '070-4343-7757',
    email: 'skson@shcs.kr',
    title: '지사장 / 관세사',
    department: '부산지사',
    practice: '통관, 검역/요건, FTA컨설팅',
    accent: '#516886',
    image: '/members/executives/손성곤.png',
  },
  {
    name: '오규태',
    phone: '032-744-9961',
    email: 'ktoh@shcs.kr',
    title: '지사장 / 관세사',
    department: '인천공항지사',
    practice: '수출입 통관 및 적정성 검토, 법률자문, 환급컨설팅, 검역/요건',
    accent: '#355a87',
    image: '/members/executives/오규태.png',
  },
  {
    name: '김희정',
    phone: '070-4343-7718',
    email: 'hjkim@shcs.kr',
    title: '팀장 / 이사 / 관세사',
    department: '서울본사 법률컨설팅팀',
    practice: '기업심사, ACVA, FTA 검증 및 외환',
    accent: '#6a7ea0',
    image: '/members/executives/김희정.png',
  },
  {
    name: '차미정',
    phone: '070-4343-7755',
    email: 'mjcha@shcs.kr',
    title: '팀장 / 관세사',
    department: '서울본사 CI팀',
    practice: '통관, 품목분류, 요건확인, 잠정/확정신고, 관세/물류 컨설팅',
    accent: '#5b7597',
    image: '/members/executives/차미정.png',
  },
];

export const officeBranches: OfficeBranch[] = [
  {
    id: 'seoul',
    label: '서울본사',
    labelEn: 'Seoul HQ',
    shortLabel: '본사',
    shortLabelEn: 'HQ',
    region: '서울 강남',
    regionEn: 'Gangnam, Seoul',
    summary: '컨설팅본부와 통관본부를 중심으로 전국 화주사 대응, 기업심사, 조사 대응, FTA 및 통관 자문을 총괄하는 메인 허브입니다.',
    summaryEn:
      'Our main hub integrates the consulting and clearance divisions to lead nationwide client support across corporate audits, investigations, FTA, and customs advisory.',
    address: '서울시 강남구 논현로 704',
    addressEn: '704, Nonhyeon-ro, Gangnam-gu, Seoul, Korea',
    tel: '02-542-1181',
    fax: '02-540-2323',
    accent: '#1c4f96',
    x: 34,
    y: 30,
    labelX: 12,
    labelY: 31,
  },
  {
    id: 'airport',
    label: '인천공항지사',
    labelEn: 'Incheon Airport Branch',
    shortLabel: '공항',
    shortLabelEn: 'Airport',
    region: '인천공항 물류권역',
    regionEn: 'Incheon Airport Logistics Zone',
    summary: '항공 화물 중심의 수출입통관, 긴급 통관, 공항 물류 연계 대응에 강점을 가진 현장 밀착형 지사입니다.',
    summaryEn:
      'A field-focused branch specializing in air cargo import/export clearance, urgent declarations, and airport logistics coordination.',
    address: '인천광역시 중구 햇내로27번길 14, 304호',
    addressEn: 'Suite 304, 14 Haennae-ro 27beon-gil, Jung-gu, Incheon, Korea',
    tel: '032-744-9961~2',
    fax: '032-744-9960',
    accent: '#2f78bf',
    x: 28,
    y: 23,
    labelX: 61,
    labelY: 18,
  },
  {
    id: 'incheon',
    label: '인천경기지사',
    labelEn: 'Incheon-Gyeonggi Branch',
    shortLabel: '경기',
    shortLabelEn: 'Gyeonggi',
    region: '인천항 · 수도권',
    regionEn: 'Incheon Port / Metro Area',
    summary:
      '인천항과 수도권 제조·유통 기업을 대상으로 수출입통관, 관세환급, 요건 대응을 함께 지원하는 권역 거점입니다.',
    summaryEn:
      'A regional hub supporting import/export clearance, duty refunds, and compliance matters for manufacturers and distributors around Incheon Port and the Seoul metro area.',
    address: '인천광역시 연수구 인천타워대로 301, A동 906호',
    addressEn: 'Suite A-906, 301 Incheontaero, Yeonsu-gu, Incheon, Korea',
    tel: '032-772-1181',
    fax: '032-773-1181',
    accent: '#3c6ca8',
    x: 27,
    y: 31,
    labelX: 12,
    labelY: 43,
  },
  {
    id: 'busan',
    label: '부산지사',
    labelEn: 'Busan Branch',
    shortLabel: '부산',
    shortLabelEn: 'Busan',
    region: '부산항',
    regionEn: 'Busan Port',
    summary: '해상 수출입통관과 항만 물류 흐름에 강점을 가진 남부권 핵심 지사로, 부산항 기반 고객 대응을 빠르게 수행합니다.',
    summaryEn:
      'A key southern branch with strengths in ocean import/export clearance and port logistics, delivering rapid Busan Port-based client support.',
    address: '부산광역시 중구 충장대로 9번길 11 미광빌딩 501호',
    addressEn: 'Suite 501, Migwang Building, 11 Chungjang-daero 9beon-gil, Jung-gu, Busan, Korea',
    tel: '051-463-1181',
    fax: '051-465-1181',
    accent: '#0f5a8f',
    x: 58,
    y: 66,
    labelX: 72,
    labelY: 72,
  },
  {
    id: 'cheongju',
    label: '청주지사',
    labelEn: 'Cheongju Branch',
    shortLabel: '청주',
    shortLabelEn: 'Cheongju',
    region: '충북 내륙권',
    regionEn: 'Chungbuk Inland Region',
    summary: '청주·충북 지역 제조기업의 통관, 검역/요건, 환급 업무를 밀착 지원하는 중부권 실무 거점입니다.',
    summaryEn:
      'A central operations base closely supporting clearance, quarantine/requirements, and refunds for manufacturers in Cheongju and Chungbuk.',
    address: '충청북도 청주시 흥덕구 직지대로 530, 1동 청주테크노 S타워 2층 216호, 221호',
    addressEn:
      'Suite 216 / 221, 2F, Building 1, Cheongju Techno S Tower, 530 Jikji-daero, Heungdeok-gu, Cheongju-si, Chungcheongbuk-do, Korea',
    tel: '043-273-3160~1',
    fax: '043-273-3162',
    accent: '#5a7fb2',
    x: 43,
    y: 46,
    labelX: 14,
    labelY: 57,
  },
  {
    id: 'gumi',
    label: '구미지사',
    labelEn: 'Gumi Branch',
    shortLabel: '구미',
    shortLabelEn: 'Gumi',
    region: '경북 산업벨트',
    regionEn: 'Gyeongbuk Industrial Belt',
    summary: '전자·부품 제조업체가 밀집한 경북권 고객사를 대상으로 수출입통관과 기업 맞춤형 현장 대응을 지원합니다.',
    summaryEn:
      'Supports electronics and component manufacturers across the Gyeongbuk region with import/export clearance and tailored on-site response.',
    address: '경상북도 구미시 1공단로 182 금오빌딩 504호',
    addressEn: 'Suite 504, Geumoh Building, 182 1gongdan-ro, Gumi-si, Gyeongsangbuk-do, Korea',
    tel: '054-464-1133',
    fax: '054-464-1131',
    accent: '#4a73a2',
    x: 53,
    y: 50,
    labelX: 74,
    labelY: 51,
  },
  {
    id: 'invista',
    label: '신한인비스타',
    labelEn: 'Shinhan Invista',
    shortLabel: '인비스타',
    shortLabelEn: 'Invista',
    region: '김포공항 물류권역',
    regionEn: 'Gimpo Airport Logistics Zone',
    summary: '국제물류, 창고 운영, 3PL, 내륙운송을 담당하며 통관 이후 물류 업무를 연계합니다.',
    summaryEn:
      'Connects post-clearance logistics execution across global forwarding, warehousing, 3PL, and inland transportation.',
    address: '서울시 강서구 하늘길 210 김포국제공항 화물청사 8-4 3,6게이트',
    addressEn: 'Gates 3 and 6, Cargo Terminal 8-4, 210 Haneul-gil, Gangseo-gu, Seoul, Korea',
    tel: '02-2663-1181',
    fax: '02-2665-9114',
    accent: '#2f689b',
    x: 24,
    y: 21,
    labelX: 12,
    labelY: 14,
  },
  {
    id: 'vietnam',
    label: '신한 베트남 관세법인',
    labelEn: 'Shinhan Customs Vietnam',
    shortLabel: '베트남',
    shortLabelEn: 'Vietnam',
    region: '하노이',
    regionEn: 'Hanoi',
    summary: '베트남 현지 통관 규정 대응, 해외 법인 운영 지원, 수출입 구조 검토까지 연결하는 해외 현지 법인입니다.',
    summaryEn:
      'An overseas entity supporting Vietnam customs compliance, local operations, and import/export structure reviews.',
    address: '5F, Star Tower, Duong Dinh Nghe street, Cau Giay New Urban Area, Yen Hoa Ward, Cau Giay District, Hanoi city, Vietnam',
    addressEn: '5F, Star Tower, Duong Dinh Nghe St., Yen Hoa Ward, Cau Giay District, Hanoi, Vietnam',
    tel: '+84-(0)24-7300-8630',
    accent: '#2f84ae',
    x: 54,
    y: 40,
    labelX: 58,
    labelY: 104,
  },
  {
    id: 'kord',
    label: 'KORD Partners',
    labelEn: 'KORD Partners',
    shortLabel: 'KORD',
    shortLabelEn: 'KORD',
    region: '서울 강남',
    regionEn: 'Gangnam, Seoul',
    summary: '관세·통관 프로젝트와 연계되는 전문 파트너 조직으로, 협업형 자문과 운영 지원 기능을 담당합니다.',
    summaryEn:
      'A specialized partner organization supporting customs projects through collaborative advisory and operational support.',
    address: '서울시 강남구 논현로 704',
    addressEn: '704, Nonhyeon-ro, Gangnam-gu, Seoul, Korea',
    tel: '070-4343-7791',
    fax: '02-3448-1184',
    accent: '#365c92',
    x: 37,
    y: 33,
    labelX: 63,
    labelY: 35,
  },
];

export const practiceAreaDetails: PracticeAreaDetail[] = [
  {
    id: 'practice-import-export',
    title: '수출입통관',
    body: 'PI·CI 기반 SOP 최적화와 iOOM 시스템으로 신고부터 사후관리까지 통관 전 과정을 정밀하게 운영합니다.',
  },
  {
    id: 'practice-refund',
    title: '환급',
    body: '관세환급 가능 항목 검토부터 증빙 준비, 신청 절차, 사후 관리까지 실무 흐름에 맞춰 지원합니다.',
  },
  {
    id: 'practice-quarantine',
    title: '검역/요건',
    body: '품목별 검역, 인증, 수입요건을 사전에 점검해 통관 지연과 보완 리스크를 줄입니다.',
  },
  {
    id: 'practice-fta',
    title: '원산지/FTA',
    body: '특혜 원산지(FTA)와 일반 원산지(비특혜)를 구분 관리해 관세 절감과 규정 준수 안정성을 함께 확보합니다.',
  },
  {
    id: 'practice-aeo',
    title: 'AEO',
    body: '신규 공인, 갱신, 사후관리, 등급조정까지 AEO 운영 단계별 업무를 지원합니다.',
  },
  {
    id: 'practice-investigation',
    title: '관세조사/범칙조사',
    body: '정기·비정기 조사 대응과 범칙 리스크 관리까지 조사 단계별 쟁점 정리와 대응 전략을 제공합니다.',
  },
  {
    id: 'practice-it',
    title: 'IT',
    body: '통관 관리 시스템, 고객 포털, 업무 대시보드로 관세 실무를 디지털화합니다.',
  },
  {
    id: 'practice-logistics',
    title: '물류',
    body: '반출기간 관리, 보관 이슈, 운송 흐름 점검까지 통관과 연결되는 물류 리스크를 함께 관리합니다.',
  },
  {
    id: 'practice-vietnam',
    title: '베트남',
    body: '하노이 법인 중심으로 통관, 수책관리, FTA, 심사 대응, 상시 자문을 제공합니다.',
  },
  {
    id: 'practice-fda',
    title: '미국 FDA',
    body: '미국 수출 시 필요한 FDA 관련 체크포인트와 준비 서류 흐름을 정리합니다.',
  },
];

const issueReportImages = [
  '/hero/practice-fta-containers.jpg',
  '/hero/practice-import-port.jpg',
  '/hero/practice-aeo-warehouse.jpg',
  '/hero/practice-forex-monitors.jpg',
];

export const issueReports: IssueReport[] = issueReportsSnapshot.slice(0, 4).map((item, index) => ({
  ...item,
  image: issueReportImages[index % issueReportImages.length],
}));

export const itServices: ItService[] = [
  {
    category: 'IT',
    categoryEn: 'IT',
    title: '통관·신고 시스템 개발 및 운영',
    titleEn: 'Customs Declaration System Development and Operations',
    body: '수출입 신고 자동화, 신고필증 데이터 처리, 관세청 연계 인터페이스까지 관세 실무 중심으로 직접 구축·운영합니다.',
    bodyEn:
      'We build and operate customs-focused systems covering declaration automation, customs certificate data processing, and Korea Customs Service integration interfaces.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: 'iOOM / iOOM Q 기반 업무 자동화',
    titleEn: 'Workflow Automation Powered by iOOM / iOOM Q',
    body: '외부 고객용 iOOM, 내부 업무 효율화용 iOOM Q를 통해 반복 업무를 줄이고 처리 정확도와 속도를 높입니다.',
    bodyEn:
      'Using iOOM for external clients and iOOM Q for internal efficiency, we reduce repetitive work while improving speed and processing accuracy.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: 'KORD FTA / KORD LIQ 솔루션',
    titleEn: 'KORD FTA / KORD LIQ Solutions',
    body: '베트남 원산지관리(KORD FTA), 면세재고·수책관리(KORD LIQ)로 현지 통관과 FTA 운영을 데이터 기반으로 지원합니다.',
    bodyEn:
      'We support Vietnam customs and FTA operations with data-driven origin management (KORD FTA) and bonded inventory / liquidation control (KORD LIQ).',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: '맞춤형 연동·데이터 분석·인프라 관리',
    titleEn: 'Custom Integration, Data Analytics, and Infrastructure Management',
    body: '고객사 시스템 연동, 데이터 수집·분석, 네트워크/보안 인프라 관리까지 통합해 실무 운영 안정성을 강화합니다.',
    bodyEn:
      'We strengthen operational stability by integrating client system connectivity, data collection and analysis, plus network and security infrastructure management.',
  },
];

export const shinhanNewsItems: ShinhanNewsItem[] = shinhanNewsArchive;

function getNewsletterTitleEn(title: string) {
  switch (title) {
    case '2026년 4월호 소식지 (국문)':
      return 'April 2026 Newsletter (Korean)';
    case '2026년 4월호 소식지 (영문)':
      return 'April 2026 Newsletter (English)';
    case '2026년 3월호 소식지 (국문)':
      return 'March 2026 Newsletter (Korean)';
    case '2026년 3월호 소식지 (영문)':
      return 'March 2026 Newsletter (English)';
    case '2026년 2월호 소식지 (국문)':
      return 'February 2026 Newsletter (Korean)';
    case '2026년 2월호 소식지 (영문)':
      return 'February 2026 Newsletter (English)';
    case '2025년 12월~2026년 1월 통합 소식지 (국문)':
      return 'December 2025 to January 2026 Combined Newsletter (Korean)';
    case '2025년 12월~2026년 1월 통합 소식지 (영문)':
      return 'December 2025 to January 2026 Combined Newsletter (English)';
    default:
      return title;
  }
}

function getNewsletterSummaryEn(summary: string) {
  switch (summary) {
    case '사전심사 제도와 조사 대응 체크포인트':
      return 'Advance ruling procedures and investigation response checkpoints';
    case '수출입통관 SOP 운영과 보완 대응 사례':
      return 'Import/export clearance SOP operations and corrective-response cases';
    case '원산지 검증 및 AEO 사후관리 실무 브리핑':
      return 'Practical briefing on origin verification and AEO follow-up management';
    case '연말/연초 주요 정책 및 실무 이슈 통합본':
      return 'Combined issue covering key year-end and new-year policy and practice topics';
    default:
      return summary;
  }
}

export const newsletterItems: NewsletterItem[] = legacyNewsletterItems.map((item, index) => ({
  id: `newsletter-${index + 1}`,
  issue: item.date,
  title: item.title,
  titleEn: getNewsletterTitleEn(item.title),
  summary: item.body,
  summaryEn: getNewsletterSummaryEn(item.body),
  publishedAt: item.date,
  href: item.downloadHref ?? '/news/newsletter',
  language: item.language,
  languageEn: item.language === '영문' ? 'English' : 'Korean',
  downloadHref: item.downloadHref,
}));
