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
import { withNewsletterTitleBrand } from '../utils/newsletter';

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
    label: '신한관세법인 본사',
    labelEn: 'Shinhan Headquarters',
    eyebrow: 'Shinhan Customs Service',
    eyebrowEn: 'Shinhan Customs Service',
    headline: '기업의 무역 현장과 함께하는\n관세 전문 파트너',
    headlineEn: 'A customs partner aligned\nwith global trade operations',
    summary: '신한관세법인은 수출입통관, 관세·무역 컨설팅, 물류서비스를 통합 지원합니다.',
    summaryEn: 'Shinhan Customs Service supports customs clearance, trade consulting, and logistics services.',
    image: '/hero/homepage/shinhan-corporate-blue-office.jpg',
    mobileImage: '/hero/homepage/shinhan-corporate-blue-office.jpg',
    objectPosition: '70% 50%',
    mobileObjectPosition: '62% center',
    theme: 'deep-blue',
  },
  {
    label: '신한의 역사',
    labelEn: 'Shinhan History',
    eyebrow: 'Established 1965',
    eyebrowEn: 'Established 1965',
    headline: '1965년부터 이어온\n관세 실무의 기준',
    headlineEn: 'A customs standard\nbuilt since 1965',
    summary: '서울통관사에서 시작한 신한의 경험을 바탕으로 기업의 관세 리스크를 깊이 있게 점검합니다.',
    summaryEn: 'From Seoul Tongkwansa to Shinhan, we bring decades of practical customs experience to enterprise risk review.',
    image: '/hero/homepage/shinhan-history-building.jpg',
    mobileImage: '/hero/homepage/shinhan-history-building.jpg',
    objectPosition: '58% 50%',
    mobileObjectPosition: '54% center',
    theme: 'deep-blue',
  },
  {
    label: '통합 관세 자문',
    labelEn: 'Integrated Advisory',
    eyebrow: 'Customs Risk Management',
    eyebrowEn: 'Customs Risk Management',
    headline: '기업의 관세 리스크를\n입체적으로 설계합니다',
    headlineEn: 'Designing customs risk\nwith a broader perspective',
    summary: '통관, 요건, FTA, 관세조사까지 복잡한 이슈를 하나의 전략 안에서 정리합니다.',
    summaryEn: 'We align clearance, requirements, FTA, and customs audits into one practical strategy.',
    image: '/hero/homepage/shinhan-glass-facade.jpg',
    mobileImage: '/hero/homepage/shinhan-glass-facade.jpg',
    objectPosition: '72% 48%',
    mobileObjectPosition: '60% center',
    theme: 'deep-blue',
  },
  {
    label: '글로벌 네트워크',
    labelEn: 'Global Network',
    eyebrow: 'Global Customs Advisory',
    eyebrowEn: 'Global Customs Advisory',
    headline: '국내외 네트워크로\n관세 리스크를 관리합니다',
    headlineEn: 'Managing customs risk\nthrough a global network',
    summary: '국내 주요 지사와 베트남 법인, KORD Partners를 연결해 현장 가까운 관세 지원 체계를 운영합니다.',
    summaryEn: 'Our Korean branches, Vietnam entity, and KORD Partners provide customs support close to each operation.',
    image: '/hero/homepage/seoul-skyline-blue-sky.jpg',
    mobileImage: '/hero/homepage/seoul-skyline-blue-sky.jpg',
    objectPosition: '74% 50%',
    mobileObjectPosition: '66% center',
    theme: 'deep-blue',
  },
  {
    label: '전문 컨설팅',
    labelEn: 'Professional Consulting',
    eyebrow: 'FTA · AEO · ACVA',
    eyebrowEn: 'FTA · AEO · ACVA',
    headline: '복잡한 관세 이슈를\n전문 컨설팅으로 풉니다',
    headlineEn: 'Solving complex customs issues\nwith expert consulting',
    summary: 'FTA, AEO, ACVA, 관세조사, 조세불복 등 기업 리스크를 사전에 진단하고 대응합니다.',
    summaryEn: 'We diagnose and respond to enterprise risk across FTA, AEO, ACVA, customs audits, and tax appeals.',
    image: '/hero/homepage/office-tower-clear-sky.jpg',
    mobileImage: '/hero/homepage/office-tower-clear-sky.jpg',
    objectPosition: '74% 50%',
    mobileObjectPosition: '64% center',
    theme: 'deep-blue',
  },
];

export const members: Member[] = [
  {
    name: '장승희',
    phone: '02-3448-1181',
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

export const expertMembers: Member[] = [
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
    name: '오규태',
    phone: '032-744-9961',
    email: 'ktoh@shcs.kr',
    title: '지사장 / 관세사',
    department: '인천공항지사',
    practice: '수출입 통관 및 적정성 검토, 법률자문, 환급컨설팅, 검역/요건',
    accent: '#2f658f',
    image: '/members/experts/오규태_정면.jpg',
  },
  {
    name: '김학현',
    phone: '070-4343-7764',
    email: 'hhkim@shcs.kr',
    title: '관세사',
    department: '서울본사 무역컨설팅팀',
    practice: 'FTA 컨설팅, 관세환급, 통관',
    accent: '#406182',
    image: '/members/experts/김학현_정면.png',
  },
  {
    name: '신종호',
    phone: '+84 97 783 4319',
    email: 'jhshin@shcs.kr',
    title: '법인장 / 관세사',
    department: '신한 베트남관세법인',
    practice: '베트남 수출입통관 및 관세재고 관리 컨설팅, 베트남 세관 심사 대응 자문, 관세 이슈 사전 점검, FTA 원산지판정, FTA 원산지증명, 관세 자문 등',
    accent: '#4e6987',
    image: '/members/experts/신종호_정면.jpg',
  },
  {
    name: '홍동엽',
    phone: '070-4343-7707',
    email: 'dyhong@shcs.kr',
    title: '팀장',
    department: '서울본사 AEO 컨설팅팀',
    practice: 'AEO컨설팅, 검역/요건, 통관',
    accent: '#5d7aa2',
    image: '/members/experts/홍동엽_정면.jpg',
  },
  {
    name: '강현우',
    phone: '070-4343-7735',
    email: 'hwkang@shcs.kr',
    title: '수석 / 원산지관리사',
    department: '서울본사 AEO 컨설팅팀',
    practice: 'AEO 컨설팅(인증, 사후관리, 종합심사)',
    accent: '#526f9e',
    image: '/members/experts/강현우_정면.jpg',
  },
  {
    name: '강민지',
    phone: '070-4343-7772',
    email: 'mjkang@shcs.kr',
    title: '책임 / 원산지관리사',
    department: 'KORD Systems',
    practice: 'FTA 컨설팅, 통관',
    accent: '#637ca1',
    image: '/members/experts/강민지_정면.jpg',
  },
  {
    name: '이경심',
    phone: '070-4343-7789',
    email: 'kslee@shcs.kr',
    title: '책임 / 원산지관리사',
    department: 'SH FOOD 컨설팅',
    practice: '요건/검역',
    accent: '#7486a0',
    image: '/members/experts/이경심_정면_최신.jpg',
  },
  {
    name: '조원희',
    phone: '070-4343-7763',
    email: 'whcho@shcs.kr',
    title: '관세사',
    department: '서울본사 CI팀',
    practice: '수출입 통관',
    accent: '#455f84',
    image: '/members/experts/조원희_정면.jpg',
  },
  {
    name: '손성곤',
    phone: '070-4343-7757',
    email: 'skson@shcs.kr',
    title: '지사장 / 관세사',
    department: '부산지사',
    practice: '통관, 검역/요건, FTA컨설팅',
    accent: '#345f97',
    image: '/members/experts/손성곤_정면.jpg',
  },
  {
    name: '김유경',
    phone: '070-4343-7716',
    email: 'ykkim@shcs.kr',
    title: '이사 / 물류관리사',
    department: '신한인비스타',
    practice: '인사, 회계, 물류',
    accent: '#6a7ea0',
    image: '/members/experts/김유경_정면.jpg',
  },
  {
    name: '서인석',
    phone: '070-4343-7759',
    email: 'isseo@shcs.kr',
    title: '책임',
    department: 'Process Innovation 팀',
    practice: '웹 개발 및 전산관리',
    accent: '#5b7597',
    image: '/members/experts/서인석_정면.jpg',
  },
  {
    name: '차미정',
    phone: '070-4343-7755',
    email: 'mjcha@shcs.kr',
    title: '팀장 / 관세사',
    department: '서울본사 CI팀',
    practice: '통관, 품목분류, 요건확인, 잠정/확정신고, 관세/물류 컨설팅',
    accent: '#2f658f',
    image: '/members/experts/차미정_정면.jpg',
  },
  {
    name: '홍성훈',
    phone: '070-4343-7703',
    email: 'shhong@shcs.kr',
    title: '팀장',
    department: 'Process Innovation 팀',
    practice: '웹 개발 및 전산관리',
    accent: '#4b6d9c',
    image: '/members/experts/홍성훈_정면.jpg',
  },
  {
    name: '권민성',
    phone: '070-4343-7745',
    email: 'kms@shcs.kr',
    title: '팀장 / 보세사',
    department: '신한인비스타',
    practice: '국제물류, 창고, 3PL, 내륙운송',
    accent: '#406182',
    image: '/members/experts/권민성_정면.jpg',
  },
  {
    name: '이미경',
    phone: '070-4397-2051',
    email: 'mklee@customsservice.co.kr',
    title: '차장',
    department: '신한인비스타',
    practice: '국제물류, 창고, 3PL, 내륙운송',
    accent: '#58749a',
    image: '/members/experts/이미경_정면.jpeg',
  },
  {
    name: '조나현',
    phone: '070-4343-7725',
    email: 'nhcho@shcs.kr',
    title: '관세사',
    department: '서울본사 CI팀',
    practice: '수출입 통관 적정성 검토 및 법률자문, 검역/요건, 조세불복',
    accent: '#526f9e',
    image: '/members/experts/조나현_정면.jpg',
  },
  {
    name: '나지원',
    phone: '070-4343-7736',
    email: 'jwna@shcs.kr',
    title: '관세사',
    department: '서울본사 CI팀',
    practice: '관세불복, 수출입 통관 적정성 검토, 법률자문, 품목분류, 관세환급, AEO',
    accent: '#637ca1',
    image: '/members/experts/나지원_정면.png',
  },
  {
    name: '박성현',
    phone: '070-4343-7777',
    email: 'sh.park@shcs.kr',
    title: '팀장 / 관세사',
    department: '서울본사 무역컨설팅팀',
    practice: 'FTA 컨설팅',
    accent: '#7486a0',
    image: '/members/experts/박성현_정면.jpg',
  },
  {
    name: '이하나',
    phone: '070-4343-7795',
    email: 'hnlee@shcs.kr',
    title: '관세사',
    department: '서울본사 법률컨설팅팀',
    practice: '통관, 검역',
    accent: '#455f84',
    image: '/members/experts/이하나_정면.jpg',
  },
  {
    name: '김선웅',
    phone: '+84 96 330 2890',
    email: 'swkim@shcs.kr',
    title: '관세사',
    department: '신한 베트남관세법인',
    practice: '베트남 수출입통관 및 관세재고 관리 컨설팅, 베트남 세관 심사 대응 자문, 관세 이슈 사전 점검, FTA 원산지판정, FTA 원산지증명, 관세 자문 등',
    accent: '#345f97',
    image: '/members/experts/김선웅.jpg',
  },
  {
    name: '서정용',
    phone: '070-4343-7787',
    email: 'jyseo@shcs.kr',
    title: '책임',
    department: 'SH FOOD 컨설팅',
    practice: '요건/검역',
    accent: '#6a7ea0',
    image: '/members/experts/서정용-정면.jpg',
  },
  {
    name: '김다혜',
    phone: '010-3449-7731',
    email: 'dhkim@customsservice.co.kr',
    title: '',
    department: '',
    practice: '',
    accent: '#5b7597',
    image: '/members/experts/김다혜.jpeg',
  },
  {
    name: '엄동규',
    phone: '010-5330-7393',
    email: 'dgeom@customsservice.co.kr',
    title: '',
    department: '',
    practice: '',
    accent: '#2f658f',
    image: '/members/experts/엄동규.png',
  },
  {
    name: '김유진',
    phone: '070-4343-7703',
    email: 'yj.kim@customsservice.co.kr',
    title: '',
    department: '',
    practice: '',
    accent: '#4b6d9c',
    image: '/members/experts/김유진_정면.jpg',
  },
  {
    name: '오보람',
    phone: '070-4343-7790',
    email: 'broh@customsservice.co.kr',
    title: '',
    department: '',
    practice: '',
    accent: '#406182',
    image: '/members/experts/오보람_정면.jpg',
  },
  {
    name: '조석현',
    phone: '070-4343-7736',
    email: 'chosh@customsservice.co.kr',
    title: '',
    department: '',
    practice: '',
    accent: '#526f9e',
    image: '/members/experts/조석현_정면.jpg',
  },
];

export const executives: Member[] = [
  {
    name: '장승희',
    phone: '02-3448-1181',
    email: 'vision@shcs.kr',
    title: '대표이사 / 관세사',
    department: '신한관세법인',
    practice: '',
    accent: '#345f97',
    image: '/members/executives/장승희.png',
    imagePosition: '50% 16%',
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
    imagePosition: '50% 17%',
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
    imagePosition: '50% 17%',
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
    imagePosition: '50% 22%',
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
    imagePosition: '50% 18%',
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
    imagePosition: '50% 20%',
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
    imagePosition: '50% 20%',
  },
  {
    name: '최병찬',
    phone: '070-4343-7708',
    email: 'hbchoi@shcs.kr',
    title: '이사',
    department: '서울본사 통관본부',
    practice: '통관, 관세환급, 검역/요건',
    accent: '#455f84',
    image: '/members/executives/최병한.png',
    imagePosition: '50% 18%',
  },
];

export const officeBranches: OfficeBranch[] = [
  {
    id: 'seoul',
    label: '서울본사',
    labelEn: 'Seoul HQ',
    mapQuery: '신한관세법인 서울본사',
    mapQueryEn: 'Shinhan Customs Service Seoul HQ',
    shortLabel: '본사',
    shortLabelEn: 'HQ',
    region: '서울 강남',
    regionEn: 'Gangnam, Seoul',
    summary: '컨설팅본부와 통관본부를 중심으로 전국 화주사 대응, 기업심사, 조사 대응, FTA 및 통관 자문을 총괄하는 메인 허브입니다.',
    summaryEn:
      'Our main hub integrates the consulting and clearance divisions to lead nationwide client support across corporate audits, investigations, FTA, and customs advisory.',
    address: '서울시 강남구 논현로 704',
    addressEn: '704, Nonhyeon-ro, Gangnam-gu, Seoul, Korea',
    tel: '02-3448-1181',
    fax: '02-540-2323',
    image: '/offices/seoul.jpg',
    imagePosition: '50% 50%',
    accent: '#1c4f96',
    x: 42,
    y: 32,
    labelX: -34,
    labelY: 36,
  },
  {
    id: 'airport',
    label: '인천공항지사',
    labelEn: 'Incheon Airport Branch',
    mapQuery: '신한관세법인 인천공항지사',
    mapQueryEn: 'Shinhan Customs Service Incheon Airport Branch',
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
    image: '/offices/airport.jpg',
    imagePosition: '50% 50%',
    accent: '#2f78bf',
    x: 28,
    y: 28,
    labelX: 125,
    labelY: 26,
  },
  {
    id: 'incheon',
    label: '인천경기지사',
    labelEn: 'Incheon-Gyeonggi Branch',
    mapQuery: '신한관세법인 인천경기지사',
    mapQueryEn: 'Shinhan Customs Service Incheon-Gyeonggi Branch',
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
    image: '/offices/incheon.jpg',
    imagePosition: '50% 50%',
    accent: '#3c6ca8',
    x: 32,
    y: 37,
    labelX: -38,
    labelY: 49,
  },
  {
    id: 'busan',
    label: '부산지사',
    labelEn: 'Busan Branch',
    mapQuery: '신한관세법인 부산지사',
    mapQueryEn: 'Shinhan Customs Service Busan Branch',
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
    image: '/offices/busan.jpg',
    imagePosition: '50% 50%',
    accent: '#0f5a8f',
    x: 72,
    y: 77,
    labelX: 124,
    labelY: 84,
  },
  {
    id: 'cheongju',
    label: '청주지사',
    labelEn: 'Cheongju Branch',
    mapQuery: '신한관세법인 청주지사',
    mapQueryEn: 'Shinhan Customs Service Cheongju Branch',
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
    image: '/offices/cheongju.jpg',
    imagePosition: '50% 50%',
    accent: '#5a7fb2',
    x: 48,
    y: 49,
    labelX: -20,
    labelY: 62,
  },
  {
    id: 'gumi',
    label: '구미지사',
    labelEn: 'Gumi Branch',
    mapQuery: '신한관세법인 구미지사',
    mapQueryEn: 'Shinhan Customs Service Gumi Branch',
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
    image: '/offices/gumi.jpg',
    imagePosition: '50% 50%',
    accent: '#4a73a2',
    x: 63,
    y: 62,
    labelX: 132,
    labelY: 66,
  },
  {
    id: 'invista',
    label: '신한인비스타',
    labelEn: 'Shinhan Invista',
    mapQuery: '신한인비스타',
    mapQueryEn: 'Shinhan Invista',
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
    image: '/offices/invista.jpg',
    imagePosition: '50% 50%',
    accent: '#2f689b',
    x: 35,
    y: 30,
    labelX: -44,
    labelY: 25,
  },
  {
    id: 'vietnam',
    label: '신한 베트남 관세법인',
    labelEn: 'Shinhan Customs Vietnam',
    mapQuery: '신한 베트남 관세법인',
    mapQueryEn: 'Shinhan Customs Vietnam',
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
    image: '/offices/vietnam.jpg',
    imagePosition: '50% 50%',
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
    mapQuery: 'KORD Partners',
    mapQueryEn: 'KORD Partners',
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
    image: '/offices/kord.jpg',
    imagePosition: '50% 50%',
    accent: '#365c92',
    x: 43,
    y: 34,
    labelX: 127,
    labelY: 41,
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
  '/hero/issue-report-ai-insight.png',
];

export const issueReports: IssueReport[] = issueReportsSnapshot.slice(0, 4).map((item, index) => ({
  ...item,
  image: issueReportImages[index % issueReportImages.length],
}));

export const itOverview = {
  title: '관세 실무와 기술을 연결하는 IT팀',
  titleEn: '관세 실무와 기술을 연결하는 IT팀',
  summary:
    '신한관세법인 IT팀은 관세 실무 지식과 최첨단 기술을 결합하여 데이터 중심의 스마트 통관 환경을 구축하고, 현장의 요구를 정교한 솔루션으로 해결하며 무역 업무의 디지털 전환을 선도합니다.',
  summaryEn:
    '신한관세법인 IT팀은 관세 실무 지식과 최첨단 기술을 결합하여 데이터 중심의 스마트 통관 환경을 구축하고, 현장의 요구를 정교한 솔루션으로 해결하며 무역 업무의 디지털 전환을 선도합니다.',
  body:
    '신한관세법인 IT팀은 단순한 시스템 운영의 차원을 넘어, 관세 및 무역 실무에 대한 깊은 통찰력과 최첨단 기술력을 결합하여 업무 자동화와 AI 전환(AX)을 선도하고 있습니다. 관세 전문가와의 밀착 협업을 통해 현장의 복잡하고 까다로운 요구사항을 정교한 기술적 솔루션으로 해결하며, 데이터 중심의 스마트한 통관 시스템을 구축하여 미래 지향적인 관세 서비스를 실현합니다.',
  bodyEn:
    '신한관세법인 IT팀은 단순한 시스템 운영의 차원을 넘어, 관세 및 무역 실무에 대한 깊은 통찰력과 최첨단 기술력을 결합하여 업무 자동화와 AI 전환(AX)을 선도하고 있습니다. 관세 전문가와의 밀착 협업을 통해 현장의 복잡하고 까다로운 요구사항을 정교한 기술적 솔루션으로 해결하며, 데이터 중심의 스마트한 통관 시스템을 구축하여 미래 지향적인 관세 서비스를 실현합니다.',
};

export const itServices: ItService[] = [
  {
    category: 'IT',
    categoryEn: 'IT',
    title: '통관·신고 시스템 개발 및 유지보수',
    titleEn: '통관·신고 시스템 개발 및 유지보수',
    summary:
      '수출입 신고부터 관세청 연계 인터페이스까지 전 과정을 아우르는 전용 시스템을 직접 운영하며, 정확하고 신속한 처리를 통해 고객사의 중단 없는 물류 흐름을 보장합니다.',
    summaryEn:
      '수출입 신고부터 관세청 연계 인터페이스까지 전 과정을 아우르는 전용 시스템을 직접 운영하며, 정확하고 신속한 처리를 통해 고객사의 중단 없는 물류 흐름을 보장합니다.',
    body:
      '수출입 신고 자동화부터 신고필증 데이터 처리, 관세청 연계 인터페이스 구축에 이르기까지 관세 실무의 전 과정을 아우르는 전용 시스템을 직접 개발하고 운영합니다. 이를 통해 수출입 신고의 정확성과 신속성을 극대화하며, 안정적인 환경을 보장하여 고객사의 물류 흐름이 중단 없이 이어질 수 있도록 최상의 기술 지원을 제공합니다.',
    bodyEn:
      '수출입 신고 자동화부터 신고필증 데이터 처리, 관세청 연계 인터페이스 구축에 이르기까지 관세 실무의 전 과정을 아우르는 전용 시스템을 직접 개발하고 운영합니다. 이를 통해 수출입 신고의 정확성과 신속성을 극대화하며, 안정적인 환경을 보장하여 고객사의 물류 흐름이 중단 없이 이어질 수 있도록 최상의 기술 지원을 제공합니다.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: '업무 자동화',
    titleEn: '업무 자동화',
    summary:
      '반복적인 서류 작업을 디지털로 전환하여 인적 오류를 방지하고 처리 속도를 높였으며, 전문가가 고부가가치 검토 업무에 집중할 수 있는 효율적인 환경을 조성합니다.',
    summaryEn:
      '반복적인 서류 작업을 디지털로 전환하여 인적 오류를 방지하고 처리 속도를 높였으며, 전문가가 고부가가치 검토 업무에 집중할 수 있는 효율적인 환경을 조성합니다.',
    body:
      '반복적이고 소모적인 수출입 신고 및 데이터 처리 프로세스를 지능화된 시스템으로 자동화하여 업무 전반의 생산성을 획기적으로 향상시키고 있습니다. 단순 서류 작업의 디지털화를 통해 인적 오류를 원천적으로 방지하고 처리 속도를 높임으로써, 전문가들이 보다 고부가가치 서비스와 정밀한 검토에 집중할 수 있는 환경을 조성합니다.',
    bodyEn:
      '반복적이고 소모적인 수출입 신고 및 데이터 처리 프로세스를 지능화된 시스템으로 자동화하여 업무 전반의 생산성을 획기적으로 향상시키고 있습니다. 단순 서류 작업의 디지털화를 통해 인적 오류를 원천적으로 방지하고 처리 속도를 높임으로써, 전문가들이 보다 고부가가치 서비스와 정밀한 검토에 집중할 수 있는 환경을 조성합니다.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: 'iOOM',
    titleEn: 'iOOM',
    summary:
      '실시간 통관 모니터링과 HS Code 관리, 분석 리포트 기능을 제공하여 고객사가 데이터를 기반으로 최적의 전략적 의사결정을 내릴 수 있도록 돕는 비즈니스 파트너입니다.',
    summaryEn:
      '실시간 통관 모니터링과 HS Code 관리, 분석 리포트 기능을 제공하여 고객사가 데이터를 기반으로 최적의 전략적 의사결정을 내릴 수 있도록 돕는 비즈니스 파트너입니다.',
    body:
      '외부 고객사용 시스템인 iOOM은 단순한 정보 조회를 넘어 실시간 통관 현황 모니터링과 체계적인 보관 서류 관리를 지원합니다. 아이템별 단가 및 HS Code 관리, 물류 리드타임 분석, 상세 월별 리포트 기능을 통해 고객사가 수출입 데이터를 기반으로 보다 객관적이고 전략적인 의사결정을 내릴 수 있도록 돕는 든든한 파트너 역할을 수행합니다.',
    bodyEn:
      '외부 고객사용 시스템인 iOOM은 단순한 정보 조회를 넘어 실시간 통관 현황 모니터링과 체계적인 보관 서류 관리를 지원합니다. 아이템별 단가 및 HS Code 관리, 물류 리드타임 분석, 상세 월별 리포트 기능을 통해 고객사가 수출입 데이터를 기반으로 보다 객관적이고 전략적인 의사결정을 내릴 수 있도록 돕는 든든한 파트너 역할을 수행합니다.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: 'iOOM Q',
    titleEn: 'iOOM Q',
    summary:
      '수출입 의뢰부터 신고까지 전 과정을 통합 관리하며, 실시간 알림과 체크리스트 기능을 통해 업무 누락을 방지하고 협업의 생산성을 극대화합니다.',
    summaryEn:
      '수출입 의뢰부터 신고까지 전 과정을 통합 관리하며, 실시간 알림과 체크리스트 기능을 통해 업무 누락을 방지하고 협업의 생산성을 극대화합니다.',
    body:
      '내부 직원용 업무 시스템인 iOOM Q는 수출입 의뢰부터 현황 관리, 자동 신고 및 사후 제출에 이르는 전 과정을 디지털로 통합 관리합니다. 실시간 업무 알림과 체계적인 체크리스트 기능을 통해 업무 누락을 방지하고 협업의 효율성을 극대화하여, 고객에게 보다 빠르고 정확한 관세 서비스를 제공하는 기반이 됩니다.',
    bodyEn:
      '내부 직원용 업무 시스템인 iOOM Q는 수출입 의뢰부터 현황 관리, 자동 신고 및 사후 제출에 이르는 전 과정을 디지털로 통합 관리합니다. 실시간 업무 알림과 체계적인 체크리스트 기능을 통해 업무 누락을 방지하고 협업의 효율성을 극대화하여, 고객에게 보다 빠르고 정확한 관세 서비스를 제공하는 기반이 됩니다.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: 'KORD FTA',
    titleEn: 'KORD FTA',
    summary:
      '베트남의 복잡한 15개 FTA 규정을 완벽히 반영하여 정밀한 원산지 판정 및 서류 보관을 지원하며, 글로벌 사후 검증 리스크에 선제적으로 대응합니다.',
    summaryEn:
      '베트남의 복잡한 15개 FTA 규정을 완벽히 반영하여 정밀한 원산지 판정 및 서류 보관을 지원하며, 글로벌 사후 검증 리스크에 선제적으로 대응합니다.',
    body:
      '베트남에 진출한 기업들을 위해 15개의 FTA 협정과 GSP, Form B 등 복잡한 규정을 완벽히 반영한 원산지 관리 시스템을 제공합니다. 체계적인 데이터 분석을 통해 정확한 원산지 판정을 내릴 뿐만 아니라, 증빙 서류의 출력과 안전한 보관 기능을 지원하여 사후 검증 리스크에 완벽하게 대비할 수 있는 글로벌 표준 모델을 제시합니다.',
    bodyEn:
      '베트남에 진출한 기업들을 위해 15개의 FTA 협정과 GSP, Form B 등 복잡한 규정을 완벽히 반영한 원산지 관리 시스템을 제공합니다. 체계적인 데이터 분석을 통해 정확한 원산지 판정을 내릴 뿐만 아니라, 증빙 서류의 출력과 안전한 보관 기능을 지원하여 사후 검증 리스크에 완벽하게 대비할 수 있는 글로벌 표준 모델을 제시합니다.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: 'KORD LIQ',
    titleEn: 'KORD LIQ',
    summary:
      '통관 및 회계 재고의 격차를 정밀 분석하여 관세 리스크 금액을 산출하고, 세관 제출용 결산 서류를 자동 생성함으로써 기업의 과세 위험을 안전하게 방어합니다.',
    summaryEn:
      '통관 및 회계 재고의 격차를 정밀 분석하여 관세 리스크 금액을 산출하고, 세관 제출용 결산 서류를 자동 생성함으로써 기업의 과세 위험을 안전하게 방어합니다.',
    body:
      '베트남 세관 업무의 핵심인 재고 관리를 위해 통관 수량과 회계상의 재고 수량을 정밀하게 비교 분석하는 기능을 제공합니다. 수량 격차(GAP)에 따른 예상 관세 리스크 금액을 실시간으로 산출하고, 세관 제출용 재고 결산(Liquidation) 서류를 자동 생성함으로써 기업의 잠재적인 과세 위험을 선제적으로 관리하고 방어합니다.',
    bodyEn:
      '베트남 세관 업무의 핵심인 재고 관리를 위해 통관 수량과 회계상의 재고 수량을 정밀하게 비교 분석하는 기능을 제공합니다. 수량 격차(GAP)에 따른 예상 관세 리스크 금액을 실시간으로 산출하고, 세관 제출용 재고 결산(Liquidation) 서류를 자동 생성함으로써 기업의 잠재적인 과세 위험을 선제적으로 관리하고 방어합니다.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: '고객사 맞춤 솔루션 및 시스템 연동',
    titleEn: '고객사 맞춤 솔루션 및 시스템 연동',
    summary:
      '고객사 ERP와의 유연한 인터페이스 연동 및 맞춤형 로직 개발을 통해 데이터의 단절 없는 흐름을 구현하고 각 기업에 최적화된 디지털 업무 환경을 제공합니다.',
    summaryEn:
      '고객사 ERP와의 유연한 인터페이스 연동 및 맞춤형 로직 개발을 통해 데이터의 단절 없는 흐름을 구현하고 각 기업에 최적화된 디지털 업무 환경을 제공합니다.',
    body:
      '고객사가 사용 중인 ERP 시스템과의 유연한 인터페이스 연동을 통해 데이터의 단절 없는 흐름을 보장하며, 각 기업의 특수한 비즈니스 로직에 최적화된 맞춤형 솔루션을 개발합니다. 현장의 요구를 즉각적으로 반영하는 기술 유연성을 바탕으로 고객사별 최적화된 디지털 업무 환경을 구축하는 데 앞장서고 있습니다.',
    bodyEn:
      '고객사가 사용 중인 ERP 시스템과의 유연한 인터페이스 연동을 통해 데이터의 단절 없는 흐름을 보장하며, 각 기업의 특수한 비즈니스 로직에 최적화된 맞춤형 솔루션을 개발합니다. 현장의 요구를 즉각적으로 반영하는 기술 유연성을 바탕으로 고객사별 최적화된 디지털 업무 환경을 구축하는 데 앞장서고 있습니다.',
  },
  {
    category: 'IT',
    categoryEn: 'IT',
    title: 'IT 인프라 관리',
    titleEn: 'IT 인프라 관리',
    summary:
      '방대한 무역 데이터 수집·분석으로 비즈니스 인사이트를 제공하며, 강력한 보안 프로토콜과 철저한 네트워크 관리를 통해 24시간 중단 없는 안정적인 인프라를 운영합니다.',
    summaryEn:
      '방대한 무역 데이터 수집·분석으로 비즈니스 인사이트를 제공하며, 강력한 보안 프로토콜과 철저한 네트워크 관리를 통해 24시간 중단 없는 안정적인 인프라를 운영합니다.',
    body:
      '통관 과정에서 발생하는 방대한 데이터를 체계적으로 수집하고 정교하게 분석하여 비즈니스 통찰력을 제공하는 것은 물론, 강력한 보안 프로토콜을 기반으로 소중한 정보를 안전하게 보호합니다. 외부 협력사 및 유관 기관과의 유기적인 시스템 연동과 철저한 네트워크 관리를 통해 24시간 중단 없는 안정적인 IT 인프라를 유지하고 있습니다.',
    bodyEn:
      '통관 과정에서 발생하는 방대한 데이터를 체계적으로 수집하고 정교하게 분석하여 비즈니스 통찰력을 제공하는 것은 물론, 강력한 보안 프로토콜을 기반으로 소중한 정보를 안전하게 보호합니다. 외부 협력사 및 유관 기관과의 유기적인 시스템 연동과 철저한 네트워크 관리를 통해 24시간 중단 없는 안정적인 IT 인프라를 유지하고 있습니다.',
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
  title: withNewsletterTitleBrand(item.title),
  titleEn: withNewsletterTitleBrand(getNewsletterTitleEn(item.title)),
  summary: item.body,
  summaryEn: getNewsletterSummaryEn(item.body),
  publishedAt: item.date,
  href: item.downloadHref ?? '/news/newsletter',
  language: item.language,
  languageEn: item.language === '영문' ? 'English' : 'Korean',
  downloadHref: item.downloadHref,
}));
