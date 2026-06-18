import {
  advisors,
  brandMarkPath,
  expertMembers,
  footerLinks,
  footerSocialLinks,
  heroSlides,
  issueReports,
  itOverview,
  itServices,
  members,
  officeBranches,
  practiceAreaDetails,
  siteContact,
  utilityLinks,
  executives,
} from './home';
import { legalPages } from './legal';
import {
  aboutStrengths,
  aboutTimeline,
  consultingHubCards,
  historyMilestones,
  managementValues,
  organizationUnits,
  recruitBenefitDisplayGroups,
  recruitBenefitGroups,
  recruitBenefitSummaryCards,
  recruitPostingLinks,
  recruitRoles,
  serviceDetailPages,
  serviceHubCards,
  serviceLandingGroups,
} from './pageContent';
import { shinhanInsights } from './shinhanInsights';
import { headerNavigation, mobileQuickLinks } from '../config/navigation';
import { sectionSubnav } from '../config/sectionSubnav';
import { utilitySubnav } from '../config/utilitySubnav';
import type { ManagedMember, ManagedMemberGroup, SiteContentPayload, VietnamContent } from '../types/site';

function createMemberId(name: string) {
  return `member-${name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;
}

function registerMembers(
  source: ManagedMember[],
  input: typeof members,
  group: ManagedMemberGroup,
) {
  input.forEach((member) => {
    const existing = source.find((item) => item.name === member.name);

    if (existing) {
      if (!existing.groups.includes(group)) {
        existing.groups.push(group);
      }

      existing.careerHighlights = existing.careerHighlights?.length ? existing.careerHighlights : member.careerHighlights;
      existing.image = existing.image ?? member.image;
      existing.imageFit = existing.imageFit ?? member.imageFit;
      existing.imagePosition = existing.imagePosition ?? member.imagePosition;
      return;
    }

    source.push({
      ...member,
      id: createMemberId(member.name),
      groups: [group],
    });
  });
}

const managedMembers: ManagedMember[] = [];

registerMembers(managedMembers, members, 'featured');
registerMembers(managedMembers, executives, 'executive');
registerMembers(managedMembers, expertMembers, 'expert');
registerMembers(managedMembers, advisors, 'advisor');

const memberIdByName = new Map(managedMembers.map((member) => [member.name, member.id]));

const expertCategories = [
  '수출입통관',
  '환급',
  'FTA',
  'AEO',
  '관세조사',
  '외환 검사·조사',
  '범칙조사',
  '조세불복',
  'ACVA',
  '검역/요건',
  '물류',
  '베트남',
  '미국 FDA',
  'IT',
];

const expertAssignmentsByName: Record<string, string[]> = {
  수출입통관: ['조나현', '나지원', '손성곤', '오규태'],
  환급: ['김학현', '김유진'],
  FTA: ['박성현', '오보람'],
  AEO: ['홍동엽', '강현우'],
  관세조사: ['이하나', '김정훈'],
  '외환 검사·조사': ['김정훈', '조원희'],
  범칙조사: ['조원희', '김유진'],
  조세불복: ['이하나', '김유진'],
  ACVA: ['이하나', '조원희'],
  '검역/요건': ['서정용', '이경심'],
  물류: ['김유경', '권민성', '이미경'],
  베트남: ['신종호', '김선웅'],
  '미국 FDA': ['김다혜', '엄동규'],
  IT: ['홍성훈', '서인석'],
};

const expertHighlightsByName: Record<string, Record<string, string[]>> = {
  수출입통관: {
    조나현: ['수출입 통관 업무 셋팅 및 법률 자문', '과세가격, 품목분류, 감면, 요건 등 검토', '고객사 맞춤형 분석 리포트 제공'],
    나지원: ['수출입 통관 업무 셋팅 및 법률 자문', '과세가격, 품목분류, 감면, 요건 등 검토', '고객사 맞춤형 분석 리포트 제공'],
    손성곤: ['수출입 통관 업무 셋팅 및 법률 컨설팅', '과세가격, 품목분류, 감면, 요건 등 검토', '각종 요건 업무 대행 컨설팅'],
    오규태: ['수출입 통관 업무 셋팅 및 법률 자문', '과세가격, 품목분류, 감면, 요건 등 검토', '수출용 원재료 등에 대한 관세환급'],
  },
  환급: {
    김학현: ['수출용 원재료 등에 대한 관세환급', '원산지 사후 검증 대응 및 사후관리 시스템 컨설팅', '환급 및 FTA 교육'],
    김유진: ['수출용 원재료 등에 대한 관세환급', 'FTA 원산지 판정, 특혜 및 비특혜 CO 발급', '품목분류 사전심사'],
  },
  FTA: {
    박성현: ['FTA 원산지 판정, 특혜 및 비특혜 C/O 발급', '원산지 사후검증 대응 및 원산지 관리 시스템 컨설팅', 'FTA 교육'],
    오보람: ['FTA 원산지 판정, 특혜 및 비특혜 C/O 발급', '원산지 사후검증 대응 및 원산지 관리 시스템 컨설팅', 'FTA 교육'],
  },
  AEO: {
    홍동엽: ['AEO 신규공인·사후관리·종합심사 컨설팅', 'AEO 등급조정 및 AEO 활용 사례 컨설팅', '보세구역 특허 컨설팅'],
    강현우: ['AEO 신규공인·사후관리·종합심사 컨설팅', 'AEO 등급조정 및 AEO 활용 사례 컨설팅', '보세구역 특허 컨설팅'],
  },
  관세조사: {
    이하나: ['관세조사', '조세불복', 'ACVA'],
    김정훈: ['관세조사', '외환검사·조사', '통관적법성 사전점검'],
  },
  '외환 검사·조사': {
    조원희: ['외환검사·조사', 'ACVA', '범칙조사'],
    김정훈: ['외환검사·조사', '관세조사', '통관적법성 사전점검'],
  },
  범칙조사: {
    조원희: ['범칙조사', 'ACVA', '외환검사·조사'],
    김유진: ['범칙조사', '조세불복', '납세도움정보'],
  },
  조세불복: {
    이하나: ['조세불복', '관세조사', 'ACVA'],
    김유진: ['조세불복', '범칙조사', '납세도움정보'],
  },
  ACVA: {
    이하나: ['ACVA', '조세불복', '관세조사'],
    조원희: ['ACVA', '범칙조사', '외환검사·조사'],
  },
  '검역/요건': {
    서정용: ['수입식품 및 위생용품 검역 대행', '농림축산검역본부 축산물 및 식물검역 대행', 'KC(생활용품, 어린이) 인증대행'],
    이경심: ['수입식품 및 위생용품 검역 대행', '농림축산검역본부 축산물 및 식물검역 대행', '화장품 표준통관예정보고'],
  },
  물류: {
    김유경: ['신한 인비스타 운영 및 인력 관리 총괄', '보세 및 내국물류 통합관리와 법규준수 시스템 구축', '3PL 운영 효율화 및 서비스 품질 관리'],
    권민성: ['화물 운송 관리', '보세 및 내국 화물 분리 보관', '보수작업 및 폐기 대행'],
    이미경: ['화물 운송 관리', '고객사 물품 입출고 관리', '내국화물 3PL 대행업무'],
  },
  베트남: {
    신종호: ['베트남 통관 및 수출입 무역거래 자문', 'FTA 원산지 관리 시스템 서비스 제공', '베트남 Liquidation 및 수책제도 관련 자문'],
    김선웅: ['베트남 통관 및 수출입 무역거래 자문', 'FTA 원산지 관리 시스템 서비스 제공', '베트남 Liquidation 및 수책제도 관련 자문'],
  },
  '미국 FDA': {
    김다혜: ['미국 수출입 제품 통관 적합성 사전검토', 'FDA 규제 대응 및 Prop 65 컨설팅'],
    엄동규: ['미국 수출입 제품 통관 적합성 사전검토', 'FDA 규제 대응 및 Prop 65 컨설팅'],
  },
  IT: {
    홍성훈: ['통관 시스템 개발 및 운영 총괄', '고객사 맞춤 솔루션 제공', '네트워크 및 보안 관리'],
    서인석: ['통관 시스템 구축 및 관리', '고객사 맞춤 솔루션 제공', '네트워크 및 보안 관리'],
  },
};

function mapMemberNamesToIds(entries: Record<string, string[]>) {
  return Object.fromEntries(
    Object.entries(entries).map(([category, names]) => [
      category,
      names.map((name) => memberIdByName.get(name)).filter((value): value is string => Boolean(value)),
    ]),
  );
}

function mapHighlightsToIds(entries: Record<string, Record<string, string[]>>) {
  return Object.fromEntries(
    Object.entries(entries).map(([category, membersByName]) => [
      category,
      Object.fromEntries(
        Object.entries(membersByName)
          .map(([name, highlights]) => {
            const id = memberIdByName.get(name);
            return id ? [id, highlights] : null;
          })
          .filter((value): value is [string, string[]] => Boolean(value)),
      ),
    ]),
  );
}

const vietnamContent: VietnamContent = {
  hero: {
    eyebrow: {
      ko: 'Shinhan Customs Vietnam',
      en: 'Shinhan Customs Vietnam',
      vi: 'Shinhan Customs Vietnam',
    },
    title: {
      ko: '베트남 현지에서 연결하는 통관, 원산지, 수책 관리',
      en: 'Customs, origin, and liquidation support in Vietnam',
      vi: 'Hỗ trợ hải quan, xuất xứ và quyết toán tại Việt Nam',
    },
    summary: {
      ko: '하노이 법인을 중심으로 한국 관세 전문가와 베트남 현지 실무팀이 고객사의 베트남 무역 운영을 지원합니다.',
      en: 'From Hanoi, our Korean customs specialists and local Vietnam team support practical trade operations.',
      vi: 'Từ Hà Nội, đội ngũ chuyên gia Hàn Quốc và Việt Nam hỗ trợ hoạt động thương mại thực tế của khách hàng.',
    },
    image: '/hero/homepage/vietnam-hanoi-network-ai.png',
    imagePosition: 'center 54%',
  },
  navigation: [
    {
      id: 'about',
      label: { ko: '베트남법인 소개', en: 'About SCV', vi: 'Giới thiệu SCV' },
      path: '/vn/about',
      children: [
        { id: 'about-overview', label: { ko: '회사소개', en: 'Overview', vi: 'Tổng quan' }, path: '/vn/about' },
        { id: 'about-message', label: { ko: '인사말', en: 'Message', vi: 'Lời chào' }, path: '/vn/about/message' },
        { id: 'about-history', label: { ko: '연혁', en: 'History', vi: 'Lịch sử' }, path: '/vn/about/history' },
        { id: 'about-location', label: { ko: '오시는 길', en: 'Location', vi: 'Địa chỉ' }, path: '/vn/about/location' },
      ],
    },
    {
      id: 'people',
      label: { ko: '구성원', en: 'People', vi: 'Nhân sự' },
      path: '/vn/members/executives',
      children: [
        { id: 'executives', label: { ko: '임원진', en: 'Executives', vi: 'Ban lãnh đạo' }, path: '/vn/members/executives' },
        { id: 'experts', label: { ko: '전문가', en: 'Experts', vi: 'Chuyên gia' }, path: '/vn/members/experts' },
      ],
    },
    {
      id: 'services',
      label: { ko: '업무분야', en: 'Services', vi: 'Dịch vụ' },
      path: '/vn/services/fta-origin',
    },
    {
      id: 'it',
      label: { ko: 'IT Solutions', en: 'IT Solutions', vi: 'Giải pháp IT' },
      path: '/vn/it/kord-fta',
    },
    {
      id: 'news',
      label: { ko: '소식/자료', en: 'News & Resources', vi: 'Tin tức & Tài liệu' },
      path: '/vn/news/newsletter',
    },
    {
      id: 'contact',
      label: { ko: '문의', en: 'Contact', vi: 'Liên hệ' },
      path: '/vn/contact',
    },
  ],
  about: {
    intro: {
      title: {
        ko: '베트남 무역 현장을 가까이에서 지원하는 신한의 현지 법인',
        en: 'A local Shinhan entity close to Vietnam trade operations',
        vi: 'Pháp nhân Shinhan đồng hành cùng hoạt động thương mại tại Việt Nam',
      },
      body: [
        {
          ko: '신한베트남법인은 베트남에 진출한 한국 기업과 현지 고객을 위해 통관, 원산지, 수책, 법령 자문을 연결합니다.',
          en: 'Shinhan Customs Vietnam connects customs clearance, origin management, liquidation, and regulatory advisory for Korean and local clients in Vietnam.',
          vi: 'Shinhan Customs Vietnam kết nối dịch vụ thông quan, quản lý xuất xứ, quyết toán và tư vấn pháp lý cho khách hàng Hàn Quốc và Việt Nam.',
        },
        {
          ko: '한국 본사의 관세 전문성과 베트남 현지 실행력을 함께 활용해 실무 중심의 대응 체계를 제공합니다.',
          en: 'We combine Korean customs expertise with local execution capacity to provide practical support.',
          vi: 'Chúng tôi kết hợp chuyên môn hải quan Hàn Quốc với năng lực thực thi tại Việt Nam để hỗ trợ thực tiễn.',
        },
      ],
      mission: {
        ko: '베트남 고객사의 무역 리스크를 줄이고 운영 효율을 높이는 현지 파트너가 되겠습니다.',
        en: 'We aim to be the local partner that reduces trade risk and improves operational efficiency in Vietnam.',
        vi: 'Chúng tôi hướng tới trở thành đối tác địa phương giúp giảm rủi ro thương mại và nâng cao hiệu quả vận hành tại Việt Nam.',
      },
    },
    message: {
      title: {
        ko: '고객의 베트남 비즈니스가 안정적으로 성장하도록 돕겠습니다.',
        en: 'We support stable growth for your Vietnam business.',
        vi: 'Chúng tôi hỗ trợ doanh nghiệp của bạn phát triển ổn định tại Việt Nam.',
      },
      body: [
        {
          ko: '베트남은 제조, 물류, 원산지 관리가 빠르게 고도화되는 시장입니다. 신한베트남법인은 현지 제도와 고객사의 업무 흐름을 함께 이해하는 실무 파트너로 움직입니다.',
          en: 'Vietnam is a market where manufacturing, logistics, and origin management continue to advance. Shinhan Customs Vietnam works as a practical partner that understands local rules and client workflows.',
          vi: 'Việt Nam là thị trường mà sản xuất, logistics và quản lý xuất xứ đang phát triển nhanh. Shinhan Customs Vietnam là đối tác thực tiễn am hiểu quy định địa phương và quy trình của khách hàng.',
        },
      ],
      signer: {
        ko: '대표 장승희',
        en: 'CEO Jang Seung Hee',
        vi: 'Tổng giám đốc Jang Seung Hee',
      },
      image: '/members/executives/jang-seunghee.png',
    },
    history: [
      {
        year: '2026',
        text: {
          ko: '베트남 법인 홈페이지 구축 및 현지 고객 커뮤니케이션 강화',
          en: 'Vietnam website launch and strengthened local client communication',
          vi: 'Ra mắt website Việt Nam và tăng cường giao tiếp với khách hàng địa phương',
        },
      },
      {
        year: '2025',
        text: {
          ko: '베트남 통관, 원산지, 수책 관리 자문 서비스 확대',
          en: 'Expanded Vietnam customs, origin, and liquidation advisory services',
          vi: 'Mở rộng dịch vụ tư vấn hải quan, xuất xứ và quyết toán tại Việt Nam',
        },
      },
    ],
    location: {
      title: { ko: '베트남 지사', en: 'Vietnam Branch', vi: 'Chi nhánh Việt Nam' },
      address: {
        ko: '베트남 하노이 중심 업무권역',
        en: 'Central business district, Hanoi, Vietnam',
        vi: 'Khu vực trung tâm kinh doanh, Hà Nội, Việt Nam',
      },
      transport: {
        ko: '방문 전 담당자와 일정을 조율해 주세요. Google Maps와 교통편 안내를 제공합니다.',
        en: 'Please coordinate your visit in advance. Google Maps and transport guidance are available.',
        vi: 'Vui lòng sắp xếp lịch hẹn trước khi đến. Có hỗ trợ Google Maps và hướng dẫn di chuyển.',
      },
      googleMapUrl: 'https://www.google.com/maps',
    },
  },
  people: {
    title: { ko: '한국 전문가와 베트남 현지팀이 함께합니다.', en: 'Korean experts and local Vietnam teams work together.', vi: 'Chuyên gia Hàn Quốc và đội ngũ Việt Nam phối hợp cùng nhau.' },
    summary: { ko: '임원진, 한국 관세사 그룹, 통관팀, 컨설팅팀이 분야별로 고객을 지원합니다.', en: 'Executives, Korean customs consultants, CD team, and consulting team support clients by specialty.', vi: 'Ban lãnh đạo, nhóm tư vấn hải quan Hàn Quốc, đội thông quan và đội tư vấn hỗ trợ khách hàng theo từng lĩnh vực.' },
    members: [
      {
        id: 'jang-seunghee',
        name: { ko: '장승희', en: 'Jang Seung Hee', vi: 'Jang Seung Hee' },
        role: { ko: '대표님', en: 'Representative', vi: 'Đại diện' },
        group: 'executive',
        image: '/members/executives/jang-seunghee.png',
        highlights: [
          { ko: '베트남 법인 운영 총괄', en: 'Vietnam entity leadership', vi: 'Phụ trách pháp nhân Việt Nam' },
        ],
      },
      {
        id: 'mr-shin',
        name: { ko: 'Mr Shin', en: 'Mr Shin', vi: 'Mr Shin' },
        role: { ko: '한국 관세사 그룹', en: 'Korea Customs Consultant Group', vi: 'Nhóm tư vấn hải quan Hàn Quốc' },
        group: 'expert',
        team: { ko: '한국 관세사 그룹', en: 'Korea Customs Consultant Group', vi: 'Nhóm tư vấn hải quan Hàn Quốc' },
        highlights: [
          { ko: '원산지·통관 자문', en: 'Origin and customs advisory', vi: 'Tư vấn xuất xứ và hải quan' },
        ],
      },
      {
        id: 'ms-trang',
        name: { ko: 'Ms Trang', en: 'Ms Trang', vi: 'Ms Trang' },
        role: { ko: '통관팀', en: 'CD Team', vi: 'Đội thông quan' },
        group: 'expert',
        team: { ko: '통관팀', en: 'CD Team', vi: 'Đội thông quan' },
        highlights: [
          { ko: 'FTA 원산지 관리 및 수출입통관', en: 'FTA origin management and clearance', vi: 'Quản lý xuất xứ FTA và thông quan' },
        ],
      },
      {
        id: 'ms-nhung',
        name: { ko: 'Ms Nhung', en: 'Ms Nhung', vi: 'Ms Nhung' },
        role: { ko: '컨설팅팀', en: 'Consulting Team', vi: 'Đội tư vấn' },
        group: 'expert',
        team: { ko: '컨설팅팀', en: 'Consulting Team', vi: 'Đội tư vấn' },
        highlights: [
          { ko: '수책 관리, 세관 조사, 법령 자문', en: 'Liquidation, audit, and regulatory advisory', vi: 'Quyết toán, kiểm tra hải quan và tư vấn pháp lý' },
        ],
      },
    ],
  },
  services: {
    title: { ko: '베트남 법인 업무분야', en: 'Vietnam Services', vi: 'Dịch vụ tại Việt Nam' },
    summary: {
      ko: '원산지 관리부터 통관, 수책, 세관 조사, 품목분류, 법령 자문까지 베트남 현지 업무를 지원합니다.',
      en: 'We support Vietnam operations from origin management to clearance, liquidation, audit, classification, and legal advisory.',
      vi: 'Chúng tôi hỗ trợ quản lý xuất xứ, thông quan, quyết toán, kiểm tra hải quan, phân loại HS và tư vấn pháp lý tại Việt Nam.',
    },
    items: [
      {
        id: 'fta-origin',
        title: { ko: 'FTA 원산지 관리', en: 'FTA Origin Management', vi: 'Quản lý xuất xứ FTA' },
        summary: { ko: '원산지증명서 발급대행, 관리 프로세스 점검, FTA 교육과 검증 대응을 지원합니다.', en: 'Certificate issuance, origin process review, FTA training, and verification response.', vi: 'Hỗ trợ cấp C/O, kiểm tra quy trình xuất xứ, đào tạo FTA và ứng phó xác minh.' },
        manager: 'Ms Trang',
        team: { ko: '통관팀', en: 'CD Team', vi: 'Đội thông quan' },
        details: [
          { ko: '원산지증명서 발급 대행', en: 'Certificate of origin issuance support', vi: 'Hỗ trợ cấp giấy chứng nhận xuất xứ' },
          { ko: '원산지 관리 프로세스 점검', en: 'Origin management process review', vi: 'Kiểm tra quy trình quản lý xuất xứ' },
          { ko: 'FTA 교육 및 원산지 검증 대응', en: 'FTA training and verification response', vi: 'Đào tạo FTA và ứng phó xác minh xuất xứ' },
        ],
      },
      {
        id: 'import-export-requirements',
        title: { ko: '수출입통관/요건', en: 'Import/Export Clearance & Requirements', vi: 'Thông quan XNK và điều kiện quản lý' },
        summary: { ko: '수입통관, 수출통관, 내국수출입 대응과 요건 대행을 제공합니다.', en: 'Import/export clearance, local export/import handling, and requirement agency services.', vi: 'Thông quan nhập/xuất khẩu, xử lý XNK nội địa và đại diện thủ tục điều kiện.' },
        manager: 'Ms Trang',
        team: { ko: '통관팀', en: 'CD Team', vi: 'Đội thông quan' },
        details: [
          { ko: '수입통관 및 수출통관', en: 'Import and export clearance', vi: 'Thông quan nhập khẩu và xuất khẩu' },
          { ko: '내국수출입 대응', en: 'Local export/import handling', vi: 'Xử lý xuất nhập khẩu nội địa' },
          { ko: '요건 대행', en: 'Requirement agency support', vi: 'Đại diện xử lý điều kiện quản lý' },
        ],
      },
      {
        id: 'traceability-management',
        title: { ko: '수책 관리', en: 'Liquidation Management', vi: 'Quản lý quyết toán' },
        summary: { ko: '수책관리 프로세스 점검, 월간 데이터 분석 및 보고, 연간 수책보고 자문을 지원합니다.', en: 'Process review, monthly data analysis/reporting, and annual liquidation advisory.', vi: 'Kiểm tra quy trình, phân tích/báo cáo dữ liệu hàng tháng và tư vấn báo cáo quyết toán năm.' },
        manager: 'Ms Nhung',
        team: { ko: '컨설팅팀', en: 'Consulting Team', vi: 'Đội tư vấn' },
        details: [
          { ko: '월간 데이터 분석 및 보고', en: 'Monthly data analysis and reporting', vi: 'Phân tích và báo cáo dữ liệu hàng tháng' },
          { ko: '연간 수책보고 자문', en: 'Annual liquidation report advisory', vi: 'Tư vấn báo cáo quyết toán năm' },
        ],
      },
      {
        id: 'customs-audit',
        title: { ko: '세관 조사', en: 'Customs Audit', vi: 'Kiểm tra hải quan' },
        summary: { ko: '세관 조사 대응과 세관 제기 이슈 대응논리 수립을 지원합니다.', en: 'Customs audit response and issue-position logic development.', vi: 'Hỗ trợ ứng phó kiểm tra hải quan và xây dựng lập luận xử lý vấn đề.' },
        manager: 'Ms Nhung',
        team: { ko: '컨설팅팀', en: 'Consulting Team', vi: 'Đội tư vấn' },
        details: [
          { ko: '세관 조사 대응', en: 'Customs audit response', vi: 'Ứng phó kiểm tra hải quan' },
          { ko: '세관 제기 이슈 대응논리 수립', en: 'Response logic for customs issues', vi: 'Xây dựng lập luận ứng phó vấn đề hải quan' },
        ],
      },
      {
        id: 'hs-classification',
        title: { ko: 'HS 품목 분류', en: 'HS Classification', vi: 'Phân loại mã HS' },
        summary: { ko: '품목분류 자문, 사전심사, 미국 Ruling 대행을 지원합니다.', en: 'Classification advisory, advance ruling, and U.S. ruling support.', vi: 'Tư vấn phân loại, thẩm định trước và hỗ trợ ruling Hoa Kỳ.' },
        manager: 'Ms Trang',
        team: { ko: '통관팀', en: 'CD Team', vi: 'Đội thông quan' },
        details: [
          { ko: '품목분류 자문', en: 'Classification advisory', vi: 'Tư vấn phân loại' },
          { ko: '품목분류 사전심사', en: 'Advance classification review', vi: 'Thẩm định trước phân loại' },
          { ko: '미국 Ruling 대행', en: 'U.S. ruling support', vi: 'Hỗ trợ ruling Hoa Kỳ' },
        ],
      },
      {
        id: 'legal-advisory',
        title: { ko: '법령 자문', en: 'Regulatory Advisory', vi: 'Tư vấn pháp lý' },
        summary: { ko: '베트남 면세제도, 화학물질법, 수출입세법, 덤핑방지관세 제도와 당국 질의 대행을 지원합니다.', en: 'Vietnam duty exemption, chemical, import/export tax, anti-dumping advisory, and authority inquiries.', vi: 'Tư vấn miễn thuế, hóa chất, thuế XNK, chống bán phá giá và hỗ trợ hỏi đáp cơ quan chức năng.' },
        manager: 'Ms Nhung',
        team: { ko: '컨설팅팀', en: 'Consulting Team', vi: 'Đội tư vấn' },
        details: [
          { ko: '베트남 당국 질의 대행', en: 'Authority inquiry support', vi: 'Hỗ trợ gửi câu hỏi tới cơ quan chức năng' },
          { ko: '수출입세법 및 덤핑방지관세 자문', en: 'Import/export tax and anti-dumping advisory', vi: 'Tư vấn thuế XNK và chống bán phá giá' },
        ],
      },
    ],
  },
  itSolutions: {
    title: { ko: 'IT Solutions', en: 'IT Solutions', vi: 'Giải pháp IT' },
    summary: {
      ko: 'FTA 원산지 관리와 수책보고 자동화를 위한 KORD 솔루션을 소개합니다.',
      en: 'Introducing KORD solutions for FTA origin management and liquidation reporting automation.',
      vi: 'Giới thiệu giải pháp KORD cho quản lý xuất xứ FTA và tự động hóa báo cáo quyết toán.',
    },
    items: [
      {
        id: 'kord-fta',
        title: 'KORD FTA',
        summary: {
          ko: 'FTA 원산지관리 시스템 데모 영상, 도입 효과, 견적 문의를 제공합니다.',
          en: 'Demo video, adoption benefits, and quotation inquiry for FTA origin management.',
          vi: 'Video demo, hiệu quả triển khai và yêu cầu báo giá cho hệ thống quản lý xuất xứ FTA.',
        },
        image: '/it-systems/fta/fta-dashboard.png',
        details: [
          { ko: '원산지 판정 및 증빙 관리', en: 'Origin determination and evidence management', vi: 'Xác định xuất xứ và quản lý chứng từ' },
          { ko: 'FTA 업무 이력 관리', en: 'FTA workflow history management', vi: 'Quản lý lịch sử nghiệp vụ FTA' },
        ],
      },
      {
        id: 'kord-liq',
        title: 'KORD LIQ',
        summary: {
          ko: '수책보고 자동화 시스템 구조, 도입 효과, 임가공 수량 관리 모듈을 소개합니다.',
          en: 'System structure, adoption benefits, and processing quantity management module for liquidation automation.',
          vi: 'Cấu trúc hệ thống, hiệu quả triển khai và module quản lý số lượng gia công cho tự động hóa quyết toán.',
        },
        image: '/it-systems/liq/liq-dashboard.png',
        details: [
          { ko: '수책보고 데이터 자동 정리', en: 'Automated liquidation data organization', vi: 'Tự động tổng hợp dữ liệu quyết toán' },
          { ko: '임가공 수량 관리 모듈', en: 'Processing quantity management module', vi: 'Module quản lý số lượng gia công' },
        ],
      },
    ],
  },
  news: {
    title: { ko: '베트남 소식/자료', en: 'Vietnam News & Resources', vi: 'Tin tức & Tài liệu Việt Nam' },
    summary: {
      ko: '뉴스레터, 법령 업데이트, 베트남 카드뉴스를 통해 현지 이슈를 공유합니다.',
      en: 'We share local issues through newsletters, legal updates, and Vietnam card news.',
      vi: 'Chúng tôi chia sẻ vấn đề địa phương qua bản tin, cập nhật pháp luật và tin ảnh Việt Nam.',
    },
    items: [
      {
        id: 'weekly-flash',
        category: 'newsletter',
        title: { ko: '주간 베트남 Shinhan Flash', en: 'Weekly Vietnam Shinhan Flash', vi: 'Shinhan Flash Việt Nam hàng tuần' },
        summary: { ko: '주간 발행물 업로드 영역입니다.', en: 'Weekly publication upload area.', vi: 'Khu vực đăng tải bản tin hàng tuần.' },
        publishedAt: '2026.06.08',
      },
      {
        id: 'legal-updates',
        category: 'legal-update',
        title: { ko: '베트남 관세 법령 업데이트', en: 'Vietnam Customs Legal Updates', vi: 'Cập nhật pháp luật hải quan Việt Nam' },
        summary: { ko: 'Decree, Circular, Decision 등 주요 법령 업데이트를 정리합니다.', en: 'Key updates including Decree, Circular, and Decision.', vi: 'Tổng hợp cập nhật quan trọng về Nghị định, Thông tư và Quyết định.' },
        publishedAt: '2026.06.08',
      },
      {
        id: 'facebook-card-news',
        category: 'card-news',
        title: { ko: '베트남 카드뉴스', en: 'Vietnam Card News', vi: 'Tin ảnh Việt Nam' },
        summary: { ko: 'Facebook 연동 콘텐츠를 매주 업로드합니다.', en: 'Weekly Facebook-linked content.', vi: 'Nội dung liên kết Facebook hàng tuần.' },
        publishedAt: '2026.06.08',
      },
    ],
  },
  contact: {
    title: { ko: '문의', en: 'Contact', vi: 'Liên hệ' },
    summary: {
      ko: '베트남 법인 상담이 필요하시면 이메일, 대표번호, 온라인 문의 또는 소셜 채널을 이용해 주세요.',
      en: 'For Vietnam consulting inquiries, contact us by email, phone, online inquiry, or social channels.',
      vi: 'Nếu cần tư vấn tại Việt Nam, vui lòng liên hệ qua email, điện thoại, biểu mẫu trực tuyến hoặc kênh mạng xã hội.',
    },
    email: 'vietnam@shcs.kr',
    phone: '+84-00-0000-0000',
    onlineInquiryHref: 'mailto:vietnam@shcs.kr',
    naverBlogUrl: '',
    facebookUrl: '',
  },
};

export const staticSiteContent: SiteContentPayload = {
  global: {
    brandMarkPath,
    utilityLinks,
    footerLinks,
    footerSocialLinks,
    siteContact,
    footerCopyright: {
      ko: 'COPYRIGHT © 신한관세법인 ALL RIGHTS RESERVED.',
      en: 'COPYRIGHT © SHINHAN CUSTOMS SERVICE INC. ALL RIGHTS RESERVED.',
    },
    headerNavigation,
    mobileQuickLinks,
    sectionSubnav,
    utilitySubnav,
  },
  home: {
    heroSlides,
    issueReports,
    practiceAreaDetails,
    copy: {
      heroBrandTitle: '신한관세법인',
      heroBrandTitleEn: 'Shinhan Customs Service',
      practiceGhost: 'PRACTICE AREAS',
      practiceTitle: '업무 분야',
      practiceTitleEn: 'Practice Areas',
      practiceSummary:
        '전문 인력의 실무 경험을 바탕으로 수출입통관, 검역·요건, FTA, AEO, 조사 대응과 외환 이슈까지 연결해 대응합니다.',
      practiceSummaryEn:
        'Our professionals connect practical experience across clearance, requirements, FTA, AEO, audit response, and foreign exchange issues.',
      issueGhost: 'TRADE INSIGHTS',
      issueTitle: '무역 동향',
      issueTitleEn: 'Trade Insights',
      issueViewLabel: '무역 동향 전체보기',
      issueViewLabelEn: 'View all Trade Insights',
      newsletterGhost: 'NEWSLETTER',
      newsletterTitle: '소식지',
      newsletterTitleEn: 'Shinhan Newsletter',
      newsletterViewLabel: '소식지 전체보기',
      newsletterViewLabelEn: 'View all Shinhan Newsletters',
      officesGhost: 'OFFICES',
      officesTitle: '사무소',
      officesTitleEn: 'Offices',
      officesSummary:
        '국내 주요 지사와 베트남 현지 법인을 연결해 고객사의 통관과 물류 현장 가까이에서 대응합니다.',
      officesSummaryEn:
        'Our domestic branches and Vietnam office support customs and logistics operations close to client sites.',
      officesViewLabel: '사무소 전체보기',
      officesViewLabelEn: 'View all offices',
      membersTitle: '대표 구성원',
      membersTitleEn: 'Key Professionals',
    },
  },
  news: {
    shinhanInsights,
    copy: {
      landing: {
        lead:
          '신한 NEWS, 신한 Insights, 세미나/교육, 소식지의 최신 소식을 한 화면에서 빠르게 확인할 수 있도록 구성했습니다.',
        leadEn:
          'Shinhan NEWS, Shinhan Insights, seminars/training, and newsletters are organized in one quick editorial view.',
        introItems: [
          '신한 NEWS: 최신 공지와 FLASH 3건',
          '신한 Insights: 전문가 칼럼과 실무 해설',
          '세미나/교육: 최신 교육·세미나 3건',
          '소식지: 최신 발행물 3건',
        ],
        introItemsEn: [
          'Shinhan NEWS: 3 latest notices and FLASH updates',
          'Shinhan Insights: expert columns and practical commentary',
          'Seminar / Training: 3 latest seminar or training updates',
          'Newsletter: 3 latest publications',
        ],
      },
      insights: {
        searchPlaceholder: '제목, 분야, 작성팀, 날짜로 검색',
        searchPlaceholderEn: 'Search by title, field, author, or date',
        emptyMessage: '검색 조건에 맞는 신한 Insights가 없습니다.',
        emptyMessageEn: 'No Shinhan Insights match the current filters.',
        backToListLabel: '목록으로',
        backToListLabelEn: 'Back to List',
      },
    },
  },
  about: {
    aboutStrengths,
    aboutTimeline,
    historyMilestones,
    managementValues,
    organizationUnits,
    copy: {
      overview: {
        visualTitle: '회사소개',
        visualTitleEn: 'Overview',
        heroTitle: '고객의 무역 문제를 해결하고 가치를 더합니다.',
        heroTitleEn: 'We solve trade challenges and add lasting value.',
        leadParagraphs: [
          '신한관세법인은 1965년 창립 이래 수출입 무역 업체의 든든한 동반자로서 고객과 함께 성장해왔습니다.',
          '오랜 신뢰와 KNOW-HOW를 바탕으로 통관, 컨설팅, 물류를 연결한 전문 서비스를 제공합니다.',
        ],
        leadParagraphsEn: [
          'Since its founding in 1965, Shinhan Customs Service has grown with import and export companies as a trusted partner.',
          'Built on long-standing trust and know-how, we connect customs clearance, consulting, and logistics into one professional service.',
        ],
        factLabels: ['서울통관사 창립', '관세·무역 서비스 경험', '통관·컨설팅·물류 통합 지원'],
        factLabelsEn: ['Founded as Seoul Customs Service', 'Years of customs and trade experience', 'Clearance, consulting, and logistics'],
        philosophyTitle: '경영이념',
        philosophyTitleEn: 'Management Philosophy',
        philosophyBody:
          '고객의 발전과 성공을 위해 열정과 정직, 혁신과 팀워크를 하나의 실행 원칙으로 연결합니다.',
        philosophyBodyEn:
          'For client growth and success, we connect passion, integrity, innovation, and teamwork into one execution principle.',
        serviceTitle: '통관부터 물류, 자문까지 하나의 흐름으로 연결합니다.',
        serviceTitleEn: 'From clearance to logistics and advisory, every step works as one flow.',
      },
      history: {
        heroTitle: '1965년부터 이어온 신한의 성장 기록',
        heroTitleEn: 'A record of Shinhan’s growth since 1965.',
        lead:
          '창립 이후 축적해온 신한관세법인의 주요 이력을 연대별로 정리했습니다. 신한은 고객의 무역 현장과 함께 성장하며 전국 지사와 해외 거점을 넓혀왔습니다.',
        leadEn:
          'This page presents Shinhan Customs Service milestones by period. Shinhan has grown alongside clients’ trade operations while expanding domestic branches and overseas hubs.',
        body:
          '서울통관사로 출발한 신한관세법인은 관세 실무의 기준을 현장에서 쌓아왔고, 변화하는 무역 환경에 맞춰 통관·컨설팅·물류·해외 네트워크로 서비스 영역을 확장해 왔습니다.',
        bodyEn:
          'Starting as Seoul Customs Service, Shinhan has built its customs practice in the field and expanded into clearance, consulting, logistics, and overseas networks as trade environments changed.',
        factLabels: ['서울통관사 창립', '관세·무역 서비스 경험', '국내외 네트워크 확장'],
        factLabelsEn: ['Founded as Seoul Customs Service', 'Years of customs and trade experience', 'Domestic and overseas network'],
        featuredBody:
          '1965년 서울통관사로 시작한 신한은 60년의 경험을 기반으로 국내외 관세·무역 서비스를 확장해 왔습니다.',
        featuredBodyEn:
          'Since beginning as Seoul Customs Service in 1965, Shinhan has expanded customs and trade services at home and abroad on 60 years of experience.',
      },
      message: {
        leadTitleTop: '60년의 신뢰를 넘어,',
        leadTitleTopEn: 'Beyond 60 Years of Trust,',
        leadTitleBottom: '100년의 가치를 완성하는 파트너십',
        leadTitleBottomEn: 'a Partnership Completing 100 Years of Value',
        leadHeading: '세 명의 신념으로 시작된 신한의 약속',
        leadHeadingEn: 'Shinhan’s Promise Began with the Conviction of Three People',
        introParagraphs: [
          "1965년 3월 22일, 단 세 명의 구성원으로 시작한 신한관세법인의 전신 '서울통관사'는 지난 60년간 대한민국 경제 및 무역 발전과 더불어 꾸준히 성장해 왔습니다.",
          '척박했던 환경에서 시작된 고객을 향한 진심 어린 약속은 오늘날 전국 7개 주요 거점 지사와 보세창고 기반의 3PL 물류 시스템, 그리고 미국 로스앤젤레스와 베트남 하노이를 잇는 글로벌 네트워크까지 다양한 서비스를 제공하고 있습니다.',
        ],
        introParagraphsEn: [
          "On March 22, 1965, Seoul Customs Service, the predecessor of Shinhan Customs Service, began with just three members and has grown steadily alongside Korea's economic and trade development over the past 60 years.",
          'A sincere promise to clients that began in challenging conditions has grown into a broad service network today, including seven key branch offices across Korea, a bonded-warehouse-based 3PL logistics system, and global connections spanning Los Angeles and Hanoi.',
        ],
        secondTitle: '고객의 성공과 함께하는 글로벌 무역의 동반자',
        secondTitleEn: 'A Global Trade Partner Growing with Our Clients’ Success',
        secondParagraphs: [
          '신한관세법인은 신속하고 정확한 통관 서비스를 넘어, 급변하는 글로벌 통상 환경 속에서 고객이 직면한 복합적인 과제에 최적의 해법을 제시합니다.',
          '우리는 관세 조사 및 외환 검사 대응, 조세 불복 대리와 같은 전략적 리스크 관리는 물론, AEO 인증, FTA 활용 전략, 관세 환급 및 수출입 요건 컨설팅에 이르기까지 비즈니스 전 과정의 전문성을 심화하고 있습니다.',
          '이를 통해 고객사가 글로벌 시장에서 압도적인 경쟁력을 확보하고 비즈니스 가치를 극대화할 수 있도록 전력을 다합니다.',
          '우리는 과거의 성과에 안주하지 않습니다. 신한관세법인의 모든 임직원은 ‘고객의 성공이 곧 우리의 성공’이라는 철학을 공유하며, 60년의 신뢰를 바탕으로 100년의 역사를 완성하기 위해 멈추지 않고 정진하겠습니다.',
          '지금까지 신한과 함께해주신 고객사와 협력사 여러분께 깊은 감사를 표하며, 앞으로도 진실하고 품격 있는 최고의 서비스로 귀사의 든든한 무역 전진기지가 될 것을 약속드립니다.',
        ],
        secondParagraphsEn: [
          'Beyond fast and accurate customs clearance, Shinhan Customs Service provides optimal solutions for the complex challenges clients face in a rapidly changing global trade environment.',
          'We continue to deepen our expertise across the entire business process, from strategic risk management such as customs audit and foreign exchange inspection response and tax appeal representation to AEO certification, FTA utilization strategy, customs refunds, and import/export requirements consulting.',
          'Through this, we devote ourselves to helping our clients secure strong competitiveness in the global market and maximize business value.',
          'We do not rest on past achievements. Every member of Shinhan Customs Service shares the philosophy that our clients’ success is our success, and we will continue moving forward to complete a 100-year history built on 60 years of trust.',
          'We express our deep gratitude to the clients and partners who have been with Shinhan, and we promise to remain your dependable trade base with sincere, refined, and outstanding service.',
        ],
        thanks: '감사합니다.',
        thanksEn: 'Thank you.',
      },
      location: {
        aboutTitle: '신한관세법인 서울본사 안내',
        aboutTitleEn: 'Shinhan Customs Service Seoul HQ',
        standaloneTitle: '오시는 길',
        standaloneTitleEn: 'Directions',
      },
    },
  },
  services: {
    serviceHubCards,
    consultingHubCards,
    serviceLandingGroups,
    serviceDetailPages,
    copy: {
      servicesLanding: {
        heroTitle: '무역 현장의 흐름을 하나의 서비스 체계로 연결합니다.',
        heroTitleEn: 'Connecting trade operations through one service system.',
        heroLead:
          '신한관세법인은 수출입통관 및 환급, 검역/요건, 컨설팅, 물류와 해외 지원까지 기업의 무역 실무에 필요한 업무를 체계적으로 제공합니다.',
        heroLeadEn:
          'Shinhan Customs Service provides a structured practice system covering clearance and refunds, quarantine and requirements, consulting, logistics, and overseas support.',
        factLabels: ['중분류 업무 체계', '세부 서비스 페이지', '통관·컨설팅·물류 연계'],
        factLabelsEn: ['Main practice categories', 'Detailed service pages', 'Clearance, consulting, and logistics'],
        serviceMapTitle: '필요한 업무영역으로 바로 이동하세요.',
        serviceMapTitleEn: 'Move directly to the practice area you need.',
        detailTitle: '업무별 범위와 상세 서비스를 확인할 수 있습니다.',
        detailTitleEn: 'Review scope and detailed services by practice area.',
      },
      consultingLanding: {
        heroTitle: '복잡한 관세 이슈를 실무 가능한 전략으로 정리합니다.',
        heroTitleEn: 'Turning complex customs issues into executable strategy.',
        heroLead:
          'FTA, AEO, ACVA, 관세조사, 외환검사, 조세불복 등 기업이 마주하는 주요 리스크를 사전에 진단하고 단계별 대응을 지원합니다.',
        heroLeadEn:
          'We diagnose and respond to key enterprise risks across FTA, AEO, ACVA, customs audits, foreign exchange reviews, tax appeals, and more.',
        sectionTitle: '항목별 주요 대응 범위와 상세 페이지를 확인하세요.',
        sectionTitleEn: 'Review key response scope and detail pages by consulting area.',
      },
    },
  },
  recruit: {
    recruitRoles,
    recruitPostingLinks,
    recruitBenefitGroups,
    recruitBenefitDisplayGroups,
    recruitBenefitSummaryCards,
    copy: {
      title: '신한과 함께 성장할 인재를 기다립니다.',
      titleEn: 'Grow your career with Shinhan.',
      rolesTitle: '모집 중인 직무',
      rolesTitleEn: 'Open roles',
      benefitsTitle: '근무 및 지원 제도',
      benefitsTitleEn: 'Benefits & Support',
      detailedBenefitsTitle: '카테고리별 전체 혜택',
      detailedBenefitsTitleEn: 'Full Benefits by Category',
      applyTitle: '채용 채널 바로가기',
      applyTitleEn: 'Recruiting channels',
    },
  },
  contact: {
    copy: {
      contact: {
        title: '문의',
        titleEn: 'Contact',
        lead:
          '신한관세법인에 문의가 필요하신 경우 대표 연락처 또는 온라인 문의를 이용해주세요.',
        leadEn: 'If you have an inquiry, please use our main contact details or the online inquiry form below.',
        mainContactTitle: '대표 연락처',
        mainContactTitleEn: 'Main Contact',
        inquiryTitle: '온라인 문의',
        inquiryTitleEn: 'Online Inquiry',
        inquiryText: '문의 내용을 남겨주시면 확인 후 안내드립니다.',
        inquiryTextEn: 'Leave your inquiry and we will review it.',
        mainPhone: '02-3448-1181',
        fax: '02-540-2323',
        email: 'shinhan@customsservice.co.kr',
        address: '서울시 강남구 논현로 704, 6·7층',
        addressEn: '6·7F, 704, Nonhyeon-ro, Gangnam-gu, Seoul, Korea',
        businessNumber: '211-86-81916',
        inquiryEmail: 'shkim914@customsservice.co.kr',
      },
      ethics: {
        title: '부정행위 접수창구',
        titleEn: 'Ethics Reporting',
        lead: '신한관세법인은 공정하고 투명한 업무 환경을 위해 부정행위 접수창구를 운영하고 있습니다.',
        leadEn: 'Shinhan Customs Service operates an ethics reporting channel to support a fair and transparent workplace.',
        basisText: '본 접수창구는 관세사 윤리강령에 근거하여 운영됩니다.',
        basisTextEn: 'This reporting channel is operated based on the Code of Ethics for Licensed Customs Brokers.',
        policyTitle: '운영 방침',
        policyTitleEn: 'Operating Policy',
        policyNotice:
          '제보자는 어떠한 신분상의 불이익이나 차별을 받지 않으며 신원과 제보내용은 철저히 비밀로 유지됩니다.',
        policyNoticeEn:
          'Reporters will not face any disadvantage or discrimination, and their identity and report details will be kept strictly confidential.',
        onlineTitle: '온라인으로 접수하기',
        onlineTitleEn: 'Submit Online',
        onlineText: '아래 항목을 작성해주시면 담당자가 내용을 확인합니다.',
        onlineTextEn: 'Complete the fields below and the responsible team will review your report.',
        reportSubjects: [
          { ko: '리베이트, 금품·향응 수수', en: 'Rebates, gifts, or entertainment' },
          { ko: '회사 또는 고객 정보 오남용', en: 'Misuse of company or client information' },
          { ko: '이해상충, 기타 윤리 위반 사항', en: 'Conflicts of interest or other ethics concerns' },
        ],
        ethicsCodeItems: [
          {
            ko: '우리는 근면과 성실한 자세로써 봉사정신을 드높인다.',
            en: 'We uphold a spirit of service with diligence and sincerity.',
          },
          {
            ko: '우리는 건전한 통관질서를 확립함으로써 관세행정 발전에 기여한다.',
            en: 'We contribute to the development of customs administration by establishing sound clearance order.',
          },
          {
            ko: '우리는 회원 상호간의 인화단결과 품위를 향상함으로써 직업윤리를 함양하고 명랑한 사회풍토를 조성한다.',
            en: 'We cultivate professional ethics and a sound social climate by promoting harmony, unity, and dignity among members.',
          },
        ],
        reportEmail: 'compliance@shcs.kr',
        reportPhone: '02-3448-1181',
      },
    },
  },
  vietnam: vietnamContent,
  offices: {
    officeBranches,
    copy: {
      title: '신한관세법인 및 관계사 안내',
      titleEn: 'Shinhan Customs Service and Affiliates',
      leadLines: ['전국 주요 거점과 베트남 법인의 연락처와 위치를 확인하실 수 있습니다.', '방문 전 담당 사무소와 일정을 조율해 주세요.'],
      leadLinesEn: [
        'Find contact details and map locations for Shinhan offices across Korea and Vietnam.',
        'Please coordinate with the relevant office before visiting.',
      ],
      factLabels: ['국내외 주요 거점', '서울본사 중심 운영', '해외 법인 연계'],
      factLabelsEn: ['Domestic and overseas offices', 'HQ-centered operations', 'Overseas entity connection'],
      primaryGroupTitle: '신한관세법인',
      primaryGroupTitleEn: 'Shinhan Customs Service',
      affiliateGroupTitle: '관계사',
      affiliateGroupTitleEn: 'Affiliates',
    },
  },
  it: {
    itOverview,
    itServices,
    contactMemberIds: [memberIdByName.get('최대규'), memberIdByName.get('홍성훈')].filter((value): value is string => Boolean(value)),
    copy: {
      overviewTitle: '개요',
      overviewTitleEn: 'Overview',
      contactTitle: '담당자',
      contactTitleEn: 'Contact Point',
    },
  },
  members: {
    managedMembers,
    expertCategoryConfig: {
      categories: expertCategories,
      assignments: mapMemberNamesToIds(expertAssignmentsByName),
      highlights: mapHighlightsToIds(expertHighlightsByName),
    },
    copy: {
      executivesTitle: '임원진',
      executivesTitleEn: 'Executives',
      expertsEmptyMessage: '해당 업무분야의 전문가 정보가 없습니다.',
      expertsEmptyMessageEn: 'No experts are listed for this specialty.',
      orgTitle: '조직도',
      orgTitleEn: 'Organization',
    },
  },
  legal: {
    legalPages,
  },
};
