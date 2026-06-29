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
        summary: {
          ko: '원산지 관리는 베트남이 체결한 FTA에 따른 특혜관세 혜택 적용 가능 여부에 영향을 미치는 핵심 기능입니다. 신한 베트남은 표준화되고 효율적인 원산지 관리 프로세스 구축을 지원합니다.',
          en: 'Origin management is a critical business function that affects eligibility for preferential tariff benefits under Vietnam’s FTAs. Shinhan Vietnam supports standardized, efficient, and sustainable origin management processes.',
          vi: 'Quản lý xuất xứ là nhiệm vụ quan trọng quyết định khả năng hưởng ưu đãi thuế quan theo các FTA mà Việt Nam là thành viên. Shinhan Vietnam hỗ trợ xây dựng quy trình quản lý xuất xứ chuẩn hóa, hiệu quả và bền vững.',
        },
        manager: '김선웅 관세사, Nguyen Minh Tri, Pham Ngoc Thao Ly',
        team: { ko: 'FTA 원산지 관리 담당팀', en: 'FTA Origin Management Team', vi: 'Đội phụ trách quản lý xuất xứ FTA' },
        sections: [
          {
            title: { ko: '서비스 체계', en: 'Framework', vi: 'Các hạng mục chính' },
            items: [
              {
                title: { ko: 'C/O 발급 지원', en: 'C/O issuance support', vi: 'Hỗ trợ làm hồ sơ cấp C/O' },
                body: {
                  ko: '베트남에서 원산지증명서(C/O)를 발급받기 위해서는 데이터 준비, 적절한 FTA 및 원산지 결정기준 선택, BOM 관리와 원산지 판정 분석, 원재료 소요량 추적 관리, 입증서류 준비 및 전자시스템 신고가 필요합니다.',
                  en: 'Obtaining a Certificate of Origin in Vietnam involves data preparation, selection of the appropriate FTA and origin criteria, BOM management and origin qualification analysis, material consumption tracking, supporting documentation, e-system declaration, and regulatory procedures.',
                  vi: 'Việc xin cấp C/O tại Việt Nam bao gồm chuẩn bị dữ liệu, lựa chọn FTA và tiêu chí xuất xứ phù hợp, quản lý BOM, phân tích đáp ứng tiêu chí xuất xứ, theo dõi tiêu hao nguyên vật liệu, chuẩn bị hồ sơ và khai báo điện tử.',
                },
                bullets: [
                  { ko: '데이터 준비', en: 'Data preparation', vi: 'Chuẩn bị dữ liệu' },
                  { ko: 'FTA 및 원산지 결정기준 선택', en: 'Selection of FTA and origin criteria', vi: 'Lựa chọn FTA và tiêu chí xuất xứ phù hợp' },
                  { ko: 'BOM 관리, 원산지 판정 분석, 원재료 소요량 추적', en: 'BOM management, origin qualification analysis, and material consumption tracking', vi: 'Quản lý BOM, phân tích tiêu chí xuất xứ và theo dõi tiêu hao nguyên vật liệu' },
                  { ko: 'EcoSys, co.moit 신고 및 C/O 발급 법정 절차 이행', en: 'EcoSys/co.moit declarations and regulatory procedures for C/O issuance', vi: 'Khai báo trên EcoSys, co.moit và hoàn tất thủ tục pháp lý để cấp C/O' },
                ],
              },
              {
                title: { ko: '원산지 관리 프로세스 진단', en: 'Origin management process review', vi: 'Rà soát quy trình quản lý xuất xứ' },
                body: {
                  ko: '종합적인 원산지 관리 진단, 평가 및 컨설팅을 통해 기업이 법규 준수를 확보하고 운영 효율성을 최적화하며 최신 규제 요건에 부합할 수 있도록 지원합니다.',
                  en: 'We provide comprehensive origin management review, assessment, and consulting services to help businesses ensure compliance, optimize operational efficiency, and stay aligned with the latest regulatory requirements.',
                  vi: 'Chúng tôi cung cấp dịch vụ rà soát, đánh giá và tư vấn toàn diện về quản lý xuất xứ, giúp doanh nghiệp đảm bảo tuân thủ, tối ưu hóa vận hành và cập nhật yêu cầu pháp lý mới nhất.',
                },
                bullets: [
                  { ko: '사업 유형, 수출입 물품, 제조공정, 재고관리 검토', en: 'Review of business type, import-export goods, manufacturing process, and inventory management', vi: 'Rà soát loại hình doanh nghiệp, hàng hóa XNK, quy trình sản xuất và quản lý tồn kho' },
                  { ko: '생산 소요량, 주요 시장, 원산지 판정 및 C/O 발급 절차 검토', en: 'Review of production norms, key markets, origin determination, and C/O issuance process', vi: 'Rà soát định mức sản xuất, thị trường trọng điểm, xác định xuất xứ và quy trình cấp C/O' },
                  { ko: '관리 절차상 이슈 및 잠재 리스크 진단', en: 'Identification of procedural issues and potential risks', vi: 'Xác định vấn đề trong quy trình và rủi ro tiềm ẩn' },
                  { ko: '관리 프로세스 개선, 표준화 및 내부 업무 흐름 강화 자문', en: 'Recommendations for process improvement, standardization, and stronger internal workflow', vi: 'Tư vấn cải thiện, chuẩn hóa quy trình và củng cố luồng vận hành nội bộ' },
                ],
              },
              {
                title: { ko: 'FTA 교육', en: 'FTA Training', vi: 'Đào tạo nghiệp vụ FTA' },
                body: {
                  ko: '고객이 FTA 원산지 관리의 적용, 준수 및 이행에 필요한 지식과 실무 역량을 갖출 수 있도록 교육 서비스를 제공합니다.',
                  en: 'We provide training services to equip clients with knowledge and practical skills in application, compliance, and implementation of FTA origin management.',
                  vi: 'Chúng tôi cung cấp dịch vụ đào tạo nhằm trang bị kiến thức và kỹ năng thực tiễn trong việc áp dụng, tuân thủ và triển khai quản lý xuất xứ theo FTA.',
                },
                bullets: [
                  { ko: 'FTA의 전략적 가치와 원산지 관리의 핵심 역할 이해 제고', en: 'Enhance understanding of FTAs, their strategic value, and the critical role of origin management', vi: 'Nâng cao hiểu biết về FTA, giá trị chiến lược và vai trò then chốt của quản lý xuất xứ' },
                  { ko: '표준화·일관성·효율성을 갖춘 원산지 관리 프로세스 구축 지원', en: 'Support establishment of standardized, consistent, and efficient origin management processes', vi: 'Hỗ trợ xây dựng quy trình quản lý xuất xứ chuẩn hóa, đồng bộ và hiệu quả' },
                ],
              },
              {
                title: { ko: '원산지 검증 대응', en: 'Origin verification response', vi: 'Hỗ trợ công tác giải trình xác minh xuất xứ' },
                body: {
                  ko: '기업의 원산지 관리 프로세스, 입증서류 및 데이터 관리 체계를 검토하고, 원산지 관리 관련 잠재 리스크를 평가하며 적용 법령에 따른 대응전략을 제공합니다.',
                  en: 'We review origin management processes, supporting documentation, and data management practices, assess potential risks, and provide response strategies in accordance with applicable laws and regulations.',
                  vi: 'Chúng tôi rà soát quy trình quản lý xuất xứ, hồ sơ chứng minh, công tác quản lý dữ liệu, đánh giá rủi ro tiềm ẩn và tư vấn chiến lược phù hợp với quy định hiện hành.',
                },
                bullets: [
                  { ko: '원산지 관리 프로세스, 입증서류, 데이터 관리 체계 검토', en: 'Review origin management processes, supporting documentation, and data management practices', vi: 'Rà soát quy trình quản lý xuất xứ, hồ sơ chứng minh và quản lý dữ liệu' },
                  { ko: '원산지 관리 관련 잠재 리스크 평가 및 식별', en: 'Assess and identify potential risks related to origin management', vi: 'Đánh giá và xác định rủi ro tiềm ẩn liên quan đến quản lý xuất xứ' },
                  { ko: '적용 법령 및 규정에 따른 대응전략 자문', en: 'Consulting on response strategies under applicable laws and regulations', vi: 'Tư vấn chiến lược ứng phó theo quy định pháp luật hiện hành' },
                ],
              },
            ],
          },
          {
            title: { ko: '당사의 전략', en: 'Our strategies', vi: 'Chiến lược của chúng tôi' },
            items: [
              {
                title: { ko: '고객별 맞춤형 해결방안', en: 'Tailored solutions', vi: 'Giải pháp phù hợp từng khách hàng' },
                body: {
                  ko: '각 고객의 필요에 맞는 종합적이고 효과적인 해결방안을 제공합니다.',
                  en: 'We provide comprehensive and effective solutions tailored to each client’s needs.',
                  vi: 'Cung cấp các giải pháp toàn diện và hiệu quả, phù hợp với nhu cầu riêng của từng khách hàng.',
                },
              },
              {
                title: { ko: '기술 기반 관리', en: 'Technology-enabled management', vi: 'Quản lý ứng dụng công nghệ' },
                body: {
                  ko: '관리 시스템 및 디지털 도구를 통해 데이터 정확성, 추적 가능성 및 업무 효율성을 향상시킵니다.',
                  en: 'Our management systems and digital tools help enhance data accuracy, traceability, and operational effectiveness.',
                  vi: 'Hệ thống quản lý và công cụ số giúp nâng cao độ chính xác dữ liệu, khả năng truy xuất nguồn gốc và hiệu quả vận hành.',
                },
              },
              {
                title: { ko: '컴플라이언스 리스크 저감', en: 'Compliance risk mitigation', vi: 'Giảm thiểu rủi ro tuân thủ' },
                body: {
                  ko: '고객이 운영 및 법규 준수 리스크를 최소화하면서 최고 수준의 법규 준수 기준을 달성할 수 있도록 지원합니다.',
                  en: 'We help clients achieve the highest standards of compliance while mitigating operational and compliance risks.',
                  vi: 'Giúp khách hàng đạt tiêu chuẩn tuân thủ cao nhất, đồng thời giảm thiểu rủi ro vận hành và tuân thủ.',
                },
              },
            ],
          },
          {
            title: { ko: '담당자', en: 'Contact point', vi: 'Đầu mối liên hệ' },
            items: [
              {
                title: { ko: '김선웅 관세사, Nguyen Minh Tri, Pham Ngoc Thao Ly', en: 'Kim Sunwoong, Nguyen Minh Tri, Pham Ngoc Thao Ly', vi: 'Kim Sunwoong, Nguyen Minh Tri, Pham Ngoc Thao Ly' },
                body: {
                  ko: '팀 관리 및 지정 담당자가 FTA 원산지 관리 업무를 지원합니다.',
                  en: 'Team management and assigned PICs support FTA origin management work.',
                  vi: 'Quản lý trực tiếp và người phụ trách được chỉ định hỗ trợ nghiệp vụ quản lý xuất xứ FTA.',
                },
              },
            ],
          },
        ],
        details: [
          {
            ko: '개요: 원산지 요건의 복잡성과 FTA별 상이한 기준을 고려할 때, 기업은 현행 원산지 관련 규정에 부합하는 표준화되고 효율적이며 지속 가능한 원산지 관리 프로세스를 구축할 필요가 있습니다.',
            en: 'Overview: Given the complexity of origin requirements and the varying standards across different FTAs, enterprises need a standardized, efficient, and sustainable origin management process that complies with current origin regulations.',
            vi: 'Tổng quan: Do tính phức tạp của quy định xuất xứ và sự khác biệt giữa các FTA, doanh nghiệp cần xây dựng quy trình quản lý xuất xứ chuẩn hóa, hiệu quả, bền vững và tuân thủ quy định hiện hành.',
          },
          {
            ko: 'C/O 발급 지원: 베트남에서 원산지증명서(C/O)를 발급받기 위해서는 데이터 준비, 적절한 FTA 및 원산지 결정기준 선택, BOM 관리와 원산지 판정 분석, 원재료 소요량 추적 관리가 필요합니다.',
            en: 'C/O issuance support: Obtaining a Certificate of Origin in Vietnam requires data preparation, selection of the appropriate FTA and origin criteria, BOM management, origin qualification analysis, and material consumption tracking.',
            vi: 'Hỗ trợ cấp C/O: Việc xin cấp C/O tại Việt Nam cần chuẩn bị dữ liệu, lựa chọn FTA và tiêu chí xuất xứ phù hợp, quản lý BOM, phân tích tiêu chí xuất xứ và theo dõi tiêu hao nguyên vật liệu.',
          },
          {
            ko: 'C/O 발급 절차 지원: 입증서류 준비, 전자시스템(EcoSys, co.moit) 신고, C/O 발급에 필요한 법정 절차 이행을 지원합니다.',
            en: 'C/O process support: We support preparation of supporting documentation, e-system declarations through EcoSys and co.moit, and completion of the regulatory procedures required for C/O issuance.',
            vi: 'Hỗ trợ thủ tục C/O: Chúng tôi hỗ trợ chuẩn bị hồ sơ chứng minh, khai báo trên hệ thống điện tử EcoSys và co.moit, đồng thời hoàn tất các thủ tục pháp lý cần thiết để cấp C/O.',
          },
          {
            ko: 'KORD FTA 활용: 전문 원산지 관리 및 신고 소프트웨어인 KORD FTA와 경험 있는 인력을 바탕으로, 고객이 관련 법령을 준수하면서 효율적으로 C/O를 준비·신고·발급받을 수 있도록 지원합니다.',
            en: 'KORD FTA support: With specialized origin management and declaration software, KORD FTA, and experienced personnel, we help clients prepare, declare, and obtain C/O efficiently and in compliance with applicable regulations.',
            vi: 'Ứng dụng KORD FTA: Với phần mềm chuyên dụng KORD FTA và đội ngũ giàu kinh nghiệm, chúng tôi hỗ trợ khách hàng chuẩn bị, khai báo và xin cấp C/O hiệu quả, đúng quy định.',
          },
          {
            ko: '원산지 관리 프로세스 진단: 종합적인 원산지 관리 진단, 평가 및 컨설팅을 통해 기업의 법규 준수 확보, 운영 효율 최적화, 최신 규제 요건 대응을 지원합니다.',
            en: 'Origin management process review: We provide comprehensive review, assessment, and consulting services to help businesses ensure compliance, optimize operational efficiency, and align with the latest regulatory requirements.',
            vi: 'Rà soát quy trình quản lý xuất xứ: Chúng tôi cung cấp dịch vụ rà soát, đánh giá và tư vấn toàn diện, giúp doanh nghiệp đảm bảo tuân thủ, tối ưu vận hành và cập nhật yêu cầu pháp lý mới nhất.',
          },
          {
            ko: '기초 데이터 및 내부 관리 흐름 검토: 사업 유형, 수출입 물품, 제조공정, 재고관리, 생산 소요량 관리, 주요 시장, 원산지 판정 및 C/O 발급 절차를 검토합니다.',
            en: 'Fundamental data and internal flow review: We review business type, import-export goods, manufacturing process, inventory management, production norm management, key markets, origin determination, and C/O issuance processes.',
            vi: 'Rà soát dữ liệu nền tảng và quy trình nội bộ: Chúng tôi xem xét loại hình doanh nghiệp, hàng hóa XNK, quy trình sản xuất, quản lý tồn kho, định mức sản xuất, thị trường trọng điểm, xác định xuất xứ và quy trình cấp C/O.',
          },
          {
            ko: '평가: 적용 법령 및 규정을 기준으로 관리 절차상의 주요 이슈를 식별하고, 잠재적인 법규 준수 및 운영 리스크를 진단합니다.',
            en: 'Assessment: Based on applicable laws and regulations, we identify outstanding issues in management procedures and point out potential compliance and operational risks.',
            vi: 'Đánh giá: Dựa trên quy định pháp luật hiện hành, chúng tôi xác định các vấn đề tồn đọng trong quy trình quản lý và chỉ ra rủi ro tiềm ẩn về tuân thủ, vận hành.',
          },
          {
            ko: '컨설팅: 기존 관리 프로세스 개선을 위한 권고사항과 실무적 해결방안을 제공하고, 관리 프로세스 표준화 및 내부 업무 흐름 강화를 위한 방안을 제안합니다.',
            en: 'Consultation: We provide recommendations and practical solutions to improve existing management processes and propose approaches to standardize management processes and strengthen internal workflows.',
            vi: 'Tư vấn: Chúng tôi đưa ra khuyến nghị, giải pháp thực tiễn để cải thiện quy trình hiện tại, đồng thời đề xuất phương án chuẩn hóa quy trình và củng cố luồng vận hành nội bộ.',
          },
          {
            ko: '전문 자문: 고객의 우려사항 및 요구사항에 대해 적용 법령, 실행 가능성, 잠재적인 법규 준수·운영 리스크를 고려한 전문 자문을 제공합니다.',
            en: 'Professional advisory: For client concerns and requirements, we provide professional advice based on applicable regulations, implementation feasibility, and potential compliance and operational risks.',
            vi: 'Tư vấn chuyên môn: Đối với vướng mắc và yêu cầu cụ thể, chúng tôi tư vấn dựa trên quy định pháp luật, tính khả thi triển khai và rủi ro tiềm ẩn về tuân thủ, vận hành.',
          },
          {
            ko: 'FTA 교육: 고객이 FTA 원산지 관리의 적용, 준수 및 이행에 필요한 지식과 실무 역량을 갖출 수 있도록 교육 서비스를 제공합니다.',
            en: 'FTA training: We provide training services to equip clients with the knowledge and practical skills required for application, compliance, and implementation of FTA origin management.',
            vi: 'Đào tạo nghiệp vụ FTA: Chúng tôi đào tạo nhằm trang bị kiến thức và kỹ năng thực tiễn trong việc áp dụng, tuân thủ và triển khai quản lý xuất xứ theo FTA.',
          },
          {
            ko: '교육 목표: FTA의 전략적 가치와 특혜관세 혜택 확보 및 법규 준수를 위한 원산지 관리의 핵심 역할에 대한 이해도를 높입니다.',
            en: 'Training objectives: We enhance understanding of FTAs, their strategic value, and the critical role of origin management in achieving tariff benefits and regulatory compliance.',
            vi: 'Mục tiêu đào tạo: Nâng cao hiểu biết về FTA, giá trị chiến lược và vai trò then chốt của quản lý xuất xứ trong việc đạt ưu đãi thuế quan và tuân thủ quy định.',
          },
          {
            ko: '프로세스 구축 지원: 법적 요건과 운영상 필요에 부합하면서 실무적이고 지속 가능한, 표준화·일관성·효율성을 갖춘 원산지 관리 프로세스를 구축할 수 있도록 지원합니다.',
            en: 'Process establishment support: We help clients establish standardized, consistent, efficient, practical, and sustainable origin management processes aligned with regulatory requirements and operational needs.',
            vi: 'Hỗ trợ xây dựng quy trình: Chúng tôi hỗ trợ xây dựng quy trình quản lý xuất xứ chuẩn hóa, đồng bộ, hiệu quả, thực tiễn, bền vững và phù hợp với yêu cầu pháp lý, nhu cầu vận hành.',
          },
          {
            ko: '원산지 검증 대응: 기업의 원산지 관리 프로세스, 입증서류 및 데이터 관리 체계를 검토하고 원산지 관리 관련 잠재 리스크를 평가·식별합니다.',
            en: 'Origin verification response: We review origin management processes, supporting documentation, and data management practices, and assess potential risks related to origin management.',
            vi: 'Hỗ trợ xác minh xuất xứ: Chúng tôi rà soát quy trình quản lý xuất xứ, hồ sơ chứng minh, quản lý dữ liệu và đánh giá rủi ro tiềm ẩn liên quan đến xuất xứ.',
          },
          {
            ko: '대응전략 자문: 적용 법령 및 규정에 따라 원산지 검증 대응전략을 수립하고 실행 가능한 대응 방향을 제공합니다.',
            en: 'Response strategy advisory: We provide consulting on response strategies in accordance with applicable laws and regulations.',
            vi: 'Tư vấn chiến lược phản hồi: Chúng tôi tư vấn chiến lược ứng phó phù hợp với quy định pháp luật hiện hành.',
          },
          {
            ko: '당사의 전략: 각 고객의 필요에 맞는 종합적이고 효과적인 해결방안을 제공하며, 관리 시스템과 디지털 도구를 통해 데이터 정확성, 추적 가능성 및 업무 효율성을 높입니다.',
            en: 'Our strategy: We provide comprehensive and effective solutions tailored to each client and use management systems and digital tools to enhance data accuracy, traceability, and operational effectiveness.',
            vi: 'Chiến lược của chúng tôi: Cung cấp giải pháp toàn diện, hiệu quả theo nhu cầu từng khách hàng và ứng dụng hệ thống, công cụ số để nâng cao độ chính xác dữ liệu, khả năng truy xuất và hiệu quả vận hành.',
          },
          {
            ko: '리스크 관리: 고객이 운영 및 법규 준수 리스크를 최소화하면서 최고 수준의 컴플라이언스 기준을 달성할 수 있도록 지원합니다.',
            en: 'Risk management: We help clients achieve high compliance standards while mitigating operational and compliance risks.',
            vi: 'Quản trị rủi ro: Chúng tôi giúp khách hàng đạt tiêu chuẩn tuân thủ cao, đồng thời giảm thiểu rủi ro vận hành và tuân thủ.',
          },
        ],
      },
      {
        id: 'import-export-requirements',
        title: { ko: '수출입통관/요건', en: 'Import/Export Clearance & Requirements', vi: 'Thông quan XNK và điều kiện quản lý' },
        summary: {
          ko: '신한관세법인 베트남은 통관 전 서류 검토부터 VNACCS/VCIS 전자신고, 전문검사 대응, 내국수출입, 라이센스 및 품질검사 등록까지 수출입 통관 전 과정을 지원합니다.',
          en: 'Shinhan Customs Vietnam supports the full customs clearance process, from pre-clearance document review and VNACCS/VCIS declaration to specialized inspection, on-spot import-export, licensing, and quality inspection registration.',
          vi: 'Shinhan Customs Việt Nam hỗ trợ toàn bộ quy trình thông quan, từ rà soát chứng từ, khai báo VNACCS/VCIS, kiểm tra chuyên ngành đến xuất nhập khẩu tại chỗ, giấy phép và đăng ký kiểm tra chất lượng.',
        },
        manager: 'Nguyen Thi Thu Trang, Le Thi Kim Ngan, Hoang Gia Minh',
        team: { ko: '수출입 통관·요건 담당팀', en: 'Customs Clearance & Requirements Team', vi: 'Đội thông quan và điều kiện quản lý' },
        sections: [
          {
            title: { ko: '종합 수출입 통관 서비스', en: 'Full-service customs clearance services', vi: 'Dịch vụ thông quan trọn gói' },
            summary: {
              ko: '통관 속도는 전체 공급망의 효율성을 좌우합니다. 지속적으로 변경되는 법규와 복잡한 전문검사 절차로 인한 병목, 서류 오류, 예상치 못한 비용을 줄이기 위해 종합 통관 서비스를 제공합니다.',
              en: 'Clearance speed determines supply-chain efficiency. We provide end-to-end customs services to reduce bottlenecks, documentation errors, and unexpected costs caused by changing regulations and specialized inspections.',
              vi: 'Tốc độ thông quan quyết định hiệu quả chuỗi cung ứng. Chúng tôi cung cấp dịch vụ thông quan trọn gói nhằm giảm tắc nghẽn quy trình, sai sót chứng từ và chi phí phát sinh.',
            },
            items: [
              {
                title: { ko: '고객 지원 효과', en: 'Client benefits', vi: 'Lợi ích cho khách hàng' },
                body: {
                  ko: '10년 이상의 경험을 보유한 전문가가 법규 준수, 비용 관리, 시간 최적화, 베트남 전문가와 한국 관세사의 효율적인 커뮤니케이션을 지원합니다.',
                  en: 'With over 10 years of expertise, our specialists support legal compliance, cost control, time optimization, and efficient communication between Vietnam experts and Korean customs professionals.',
                  vi: 'Với hơn 10 năm kinh nghiệm, đội ngũ chuyên gia hỗ trợ tuân thủ pháp luật, kiểm soát chi phí, tối ưu thời gian và phối hợp hiệu quả giữa chuyên gia Việt Nam và chuyên gia Hàn Quốc.',
                },
                bullets: [
                  { ko: '최신 규정 준수 및 과태료·화물 지연 리스크 최소화', en: 'Stay aligned with current regulations and mitigate penalty or cargo-delay risks', vi: 'Tuân thủ quy định hiện hành và giảm rủi ro bị phạt hoặc chậm trễ hàng hóa' },
                  { ko: '사전 투명 견적으로 예상치 못한 비용 발생 감소', en: 'Transparent upfront quotes and reduced unexpected expenditures', vi: 'Báo giá minh bạch từ đầu và giảm chi phí phát sinh ngoài dự kiến' },
                  { ko: '정확한 서류 처리로 통관 시간 최적화', en: 'Precise documentation handling to accelerate cargo clearance', vi: 'Xử lý chứng từ chính xác để đẩy nhanh thông quan hàng hóa' },
                  { ko: '베트남 전문가와 한국 관세사의 협업 커뮤니케이션', en: 'Coordinated communication by Vietnam experts and Korean customs professionals', vi: 'Phối hợp giữa chuyên gia Việt Nam và chuyên gia hải quan Hàn Quốc' },
                ],
              },
              {
                title: { ko: '종합 통관 서비스란?', en: 'What is full-service customs clearance?', vi: 'Dịch vụ hải quan trọn gói là gì?' },
                body: {
                  ko: '수출입 화물의 통관 관련 업무를 전 과정에서 대리·지원하는 서비스입니다.',
                  en: 'This service represents and supports clients throughout all customs procedures for import and export cargo.',
                  vi: 'Đây là dịch vụ đại diện và hỗ trợ khách hàng thực hiện toàn bộ thủ tục hải quan cho lô hàng xuất nhập khẩu.',
                },
                bullets: [
                  { ko: '통관 전 절차 및 서류 관련 컨설팅', en: 'Pre-clearance procedures and documentation consulting', vi: 'Tư vấn thủ tục, chứng từ trước thông quan' },
                  { ko: '서류 검토 및 표준화', en: 'Document review and standardization', vi: 'Kiểm tra và chuẩn hóa bộ chứng từ' },
                  { ko: 'VNACCS/VCIS 전자 세관신고', en: 'Electronic customs declaration via VNACCS/VCIS', vi: 'Khai báo hải quan điện tử trên VNACCS/VCIS' },
                  { ko: '화물 실물검사 및 전문관리기관 대응', en: 'Physical cargo inspection support and liaison with specialized agencies', vi: 'Xử lý kiểm hóa hàng hóa và kết nối cơ quan chuyên ngành' },
                  { ko: '수수료 납부, 발생 이슈 처리, 최종 통관 및 화물 인도·수령', en: 'Fee payment, issue handling, final customs clearance, and cargo delivery/receipt', vi: 'Thanh toán phí, xử lý phát sinh, thông quan và giao/nhận hàng hóa' },
                ],
              },
              {
                title: { ko: '수출입 유형', en: 'Import-export types', vi: 'Các loại hình hàng hóa xuất nhập khẩu' },
                body: {
                  ko: '당사는 모든 운영 형태의 수출입 통관 절차를 처리합니다.',
                  en: 'We handle customs procedures across all operational models.',
                  vi: 'Chúng tôi cung cấp dịch vụ cho tất cả các loại hình thủ tục hải quan.',
                },
                bullets: [
                  { ko: '상업용 화물 및 비상업용 화물', en: 'Commercial and non-commercial cargo', vi: 'Hàng kinh doanh và hàng phi mậu dịch' },
                  { ko: '일시수입 후 재수출 및 일시수출 후 재수입', en: 'Temporary import/re-export and temporary export/re-import', vi: 'Tạm nhập tái xuất, tạm xuất tái nhập' },
                  { ko: '내국 수출입', en: 'On-spot import-export', vi: 'Xuất nhập khẩu tại chỗ' },
                  { ko: '임가공, 수출생산 및 순환용 포장재', en: 'Processing, manufacturing for export, and circulating packaging', vi: 'Gia công, sản xuất xuất khẩu và phương tiện quay vòng' },
                  { ko: '통과 화물', en: 'Transit cargo', vi: 'Hàng quá cảnh' },
                ],
              },
              {
                title: { ko: '주요 취급 품목군', en: 'Core product categories handled', vi: 'Các loại hàng hóa' },
                body: {
                  ko: '살아 있는 동물부터 전자제품, 기계, 축산물, 수산물, 철강, 화학물질, 가공식품까지 다양한 품목을 처리합니다.',
                  en: 'We handle a wide range of product categories from live animals to electronics, machinery, livestock products, aquatic animals, steel, chemicals, and processed food.',
                  vi: 'Chúng tôi xử lý nhiều nhóm hàng như động vật sống, điện tử, máy móc, sản phẩm chăn nuôi, thủy sản, thép, hóa chất và thực phẩm chế biến.',
                },
                bullets: [
                  { ko: '살아 있는 동물, 수산생물 및 관상용 반려동물', en: 'Live animals, aquatic life, and ornamental pets', vi: 'Động vật, thủy sản sống, làm cảnh' },
                  { ko: '전자제품, 부품, 장치 및 산업기계', en: 'Electronics, components, devices, and industrial machinery', vi: 'Điện tử, linh kiện, thiết bị và máy móc công nghiệp' },
                  { ko: '송신장비 및 수신·송신장비', en: 'Transmitting and receiving/transmitting equipment', vi: 'Thiết bị phát, thu-phát sóng' },
                  { ko: '육류·축산물 및 식용 수산동물', en: 'Meat, livestock products, and aquatic animals for food', vi: 'Thịt, sản phẩm thịt và động vật thủy sản làm thực phẩm' },
                  { ko: '철강, 건설자재, 화학물질, 가공식품', en: 'Iron, steel, construction materials, chemicals, and processed food', vi: 'Sắt thép, vật liệu xây dựng, hóa chất và thực phẩm chế biến' },
                ],
              },
            ],
          },
          {
            title: { ko: '내국 수출입 통관 서비스', en: 'On-spot import-export customs services', vi: 'Dịch vụ hải quan xuất nhập khẩu tại chỗ' },
            summary: {
              ko: '베트남에서 제조, 임가공, 상거래 활동 중 국내 물품 거래가 발생하더라도 정식 세관신고가 필요한 경우가 있습니다. 이를 내국 수출입이라고 하며 처음부터 정확한 규정 이해와 이행이 필요합니다.',
              en: 'Domestic transactions in Vietnam can still require formal customs declarations. This on-spot import-export operation requires accurate regulatory understanding and execution from the start.',
              vi: 'Nhiều giao dịch mua bán, chuyển giao hàng hóa trong nước vẫn phải làm thủ tục hải quan. Đây là nghiệp vụ xuất nhập khẩu tại chỗ, yêu cầu hiểu đúng và thực hiện chính xác ngay từ đầu.',
            },
            items: [
              {
                title: { ko: '내국수출입이란?', en: 'What is on-spot import-export?', vi: 'Xuất nhập khẩu tại chỗ là gì?' },
                body: {
                  ko: '베트남 관세법 제47a조 및 시행령 제167/2025/ND-CP에 따라, 외국상인의 지정으로 베트남 내에서 인도·인수되는 물품 또는 베트남에서 임가공된 후 국내 조직·개인에게 판매·이전되는 물품 등이 포함됩니다.',
                  en: 'Under Article 47a of the Customs Law and Decree No. 167/2025/ND-CP, on-spot goods include goods delivered and received within Vietnam under the designation of foreign traders and processed goods sold or transferred domestically by foreign principals.',
                  vi: 'Theo Điều 47a Luật Hải quan và Nghị định 167/2025/NĐ-CP, hàng hóa xuất nhập khẩu tại chỗ bao gồm hàng giao nhận tại Việt Nam theo chỉ định của thương nhân nước ngoài và hàng gia công được bán, chuyển giao trong nước.',
                },
              },
              {
                title: { ko: '컨설팅 및 지원 서비스', en: 'Advisory and support services', vi: 'Dịch vụ tư vấn, hỗ trợ thủ tục' },
                body: {
                  ko: '신한관세법인 베트남은 내국수출입 관련 종합적인 신고 및 컨설팅 서비스를 제공합니다.',
                  en: 'Shinhan Customs Vietnam provides comprehensive declaration and advisory services for on-spot import-export.',
                  vi: 'Shinhan Customs Việt Nam cung cấp dịch vụ khai báo, tư vấn và hỗ trợ thủ tục hải quan xuất nhập khẩu tại chỗ.',
                },
                bullets: [
                  { ko: '적절한 내국수출입 유형 컨설팅', en: 'Consulting on the correct on-spot import-export model', vi: 'Tư vấn đúng loại hình xuất nhập khẩu tại chỗ' },
                  { ko: '세관신고 서류 준비 및 검토', en: 'Preparing and verifying customs declaration dossiers', vi: 'Chuẩn bị và kiểm tra hồ sơ khai báo hải quan' },
                  { ko: '전자 세관신고 처리', en: 'Handling electronic customs declarations', vi: 'Khai báo hải quan điện tử' },
                  { ko: '통관 완료 지원', en: 'Securing customs clearance', vi: 'Thông quan tờ khai' },
                ],
              },
              {
                title: { ko: '주요 대상 고객', en: 'Target clients', vi: 'Đối tượng khách hàng phù hợp' },
                body: {
                  ko: 'FDI 기업, 임가공 및 수출생산 기업, 수출가공기업(EPE), EPE와 처음 거래하는 기업에 적합합니다.',
                  en: 'This service is suitable for FDI enterprises, processing and export-manufacturing enterprises, EPEs, and enterprises engaging in transactions with EPEs for the first time.',
                  vi: 'Dịch vụ phù hợp với doanh nghiệp FDI, doanh nghiệp gia công - sản xuất xuất khẩu, doanh nghiệp chế xuất và doanh nghiệp lần đầu giao dịch với EPE.',
                },
              },
              {
                title: { ko: '주요 준수사항', en: 'Critical compliance notes', vi: 'Lưu ý khi làm thủ tục' },
                body: {
                  ko: '행정처분 및 세무 리스크를 방지하기 위해 신고기한, 신고장소, 우선기업 특례, 납세 의무, 지급 관련 증빙을 정확히 관리해야 합니다.',
                  en: 'To prevent administrative penalties and tax risks, businesses must manage filing deadlines, filing location, priority-enterprise privileges, tax obligations, and payment documentation.',
                  vi: 'Để tránh bị phạt hoặc rủi ro thuế, doanh nghiệp cần quản lý đúng thời hạn, địa điểm làm thủ tục, ưu tiên doanh nghiệp tuân thủ, nghĩa vụ thuế và chứng từ thanh toán.',
                },
                bullets: [
                  { ko: '수출신고 통관일로부터 15영업일 이내 수입 통관 절차 완료', en: 'Complete import procedures within 15 working days from export declaration clearance', vi: 'Hoàn tất thủ tục nhập khẩu trong 15 ngày làm việc kể từ ngày tờ khai xuất khẩu được thông quan' },
                  { ko: '유형별 규정에 따라 편리한 세관지국 선택 가능', en: 'Select a convenient Customs Branch subject to model regulations', vi: 'Được chọn Chi cục Hải quan thuận tiện theo quy định từng loại hình' },
                  { ko: '우선기업 또는 거래상대방은 조건 충족 시 선인도 후신고 가능', en: 'Priority Enterprises or partners may deliver first and declare later under conditions', vi: 'Doanh nghiệp ưu tiên hoặc đối tác có thể giao hàng trước, khai báo sau nếu đáp ứng điều kiện' },
                  { ko: '정확한 HS 코드 및 세율 결정, 은행 지급 증빙과 물품 인도 증빙 보관', en: 'Determine accurate HS code and tax rate, and retain bank payment and delivery proofs', vi: 'Xác định đúng mã HS, thuế suất và lưu trữ chứng từ thanh toán, giao nhận' },
                ],
              },
            ],
          },
          {
            title: { ko: '수출입 라이센스 및 품질검사 등록 서비스', en: 'Import-export licensing & quality inspection registration', vi: 'Dịch vụ xin giấy phép và đăng ký kiểm tra chất lượng' },
            summary: {
              ko: '수출입 라이선스 취득은 전문 경험이 부족한 기업에게 많은 시간과 어려움을 요구할 수 있습니다. 신뢰할 수 있는 라이선스 및 검사 등록 서비스로 공급망의 원활한 운영과 규정 준수를 지원합니다.',
              en: 'Securing import-export licenses can be time-consuming and challenging without specialized experience. Our licensing and inspection-registration services help keep supply chains seamless and compliant.',
              vi: 'Việc xin giấy phép xuất nhập khẩu có thể mất nhiều thời gian nếu thiếu kinh nghiệm chuyên môn. Dịch vụ giấy phép và đăng ký kiểm tra giúp chuỗi cung ứng vận hành thông suốt và tuân thủ.',
            },
            items: [
              {
                title: { ko: '수출입 라이센스란?', en: 'What is an import-export license?', vi: 'Giấy phép xuất nhập khẩu là gì?' },
                body: {
                  ko: '수출입 라이센스란 관할기관이 법인 또는 개인에게 베트남으로 물품을 수입하거나 해외로 수출할 수 있도록 승인하는 공식 문서입니다. 품목별로 통관을 위해 특정 허가가 요구될 수 있습니다.',
                  en: 'An import-export license is an official document issued by competent authorities permitting an entity or individual to import goods into Vietnam or export them abroad. Different commodities may require specific licenses for customs clearance.',
                  vi: 'Giấy phép xuất nhập khẩu là văn bản của cơ quan có thẩm quyền cho phép nhập khẩu hàng hóa vào Việt Nam hoặc xuất khẩu ra nước ngoài. Mỗi mặt hàng có thể cần loại giấy phép riêng để thông quan.',
                },
              },
              {
                title: { ko: '주요 허가 유형', en: 'Common licensing types', vi: 'Các loại giấy phép thường gặp' },
                body: {
                  ko: '산업 분야별로 가공식품·음료, 농림수산물, 의약품·화장품, 화학물질·첨가제·산업용 원재료, 기계·장비, 특별관리 대상 물품, 제2군 제품 품질검사 등록 등이 필요할 수 있습니다.',
                  en: 'Common licensing areas include processed food and beverages, agricultural/forestry/aquatic products, pharmaceuticals and cosmetics, chemicals/additives/industrial materials, machinery and equipment, restricted or specially controlled goods, and Group II quality inspection registration.',
                  vi: 'Các nhóm thường gặp gồm thực phẩm và đồ uống chế biến, nông lâm thủy sản, dược phẩm và mỹ phẩm, hóa chất/phụ gia/nguyên liệu công nghiệp, máy móc thiết bị, hàng hạn chế hoặc kiểm soát đặc biệt và đăng ký kiểm tra chất lượng nhóm II.',
                },
                bullets: [
                  { ko: '가공식품·음료: 시험성적서, 영양성분, 라벨, 식품안전증명서', en: 'Processed food and beverages: test reports, nutrition/composition, labels, and food safety certificate', vi: 'Thực phẩm, đồ uống chế biến: phiếu kiểm nghiệm, thành phần dinh dưỡng, nhãn mác và chứng nhận an toàn thực phẩm' },
                  { ko: '농림수산물: 검역증명서, 잔류농약 시험성적서, 필요 시 C/O', en: 'Agricultural, forestry, and aquatic products: quarantine certificates, residue reports, and C/O if required', vi: 'Nông lâm thủy sản: giấy chứng nhận kiểm dịch, kiểm nghiệm dư lượng và C/O nếu cần' },
                  { ko: '의약품·화장품: GMP, 제품 신고서류, 시험결과, 안전성 서류', en: 'Pharmaceuticals and cosmetics: GMP, notification dossiers, testing results, and safety documentation', vi: 'Dược phẩm, mỹ phẩm: GMP, hồ sơ công bố, kết quả thử nghiệm và tài liệu an toàn' },
                  { ko: '화학물질·산업 원재료: MSDS, 자유판매증명서, 품질검사성적서', en: 'Chemicals and industrial materials: MSDS, free sale certificates, and quality inspection reports', vi: 'Hóa chất và nguyên liệu công nghiệp: MSDS, giấy phép lưu hành và kiểm định chất lượng' },
                  { ko: '기계·장비 및 특별관리 대상 물품: 기술사양서, 기술적합성 인증, 특수 서류 또는 허가', en: 'Machinery, equipment, and controlled goods: technical sheets, conformity certificates, specialized dossiers, or special permits', vi: 'Máy móc, thiết bị và hàng kiểm soát: tài liệu kỹ thuật, chứng nhận phù hợp, hồ sơ đặc thù hoặc giấy phép đặc biệt' },
                ],
              },
              {
                title: { ko: '발급기관 및 절차 유의사항', en: 'Authority and procedure note', vi: 'Lưu ý về cơ quan cấp và quy trình' },
                body: {
                  ko: '발급기관의 명칭 및 신청 절차는 법률, 시행령 및 시행규칙의 개정에 따라 변경될 수 있습니다. 기업은 공식 개정사항을 지속적으로 확인하거나 전문기관에 관련 업무를 위임할 필요가 있습니다.',
                  en: 'The names of issuing authorities and application procedures may change based on evolving laws, decrees, and circulars. Businesses should monitor official updates or authorize a specialized professional unit to track changes.',
                  vi: 'Tên cơ quan cấp và quy trình có thể thay đổi theo luật, nghị định và thông tư. Doanh nghiệp nên cập nhật chính thức hoặc ủy quyền cho đơn vị chuyên môn theo dõi.',
                },
              },
              {
                title: { ko: '신한관세법인 베트남의 강점', en: 'Shinhan Customs Vietnam strengths', vi: 'Thế mạnh của Shinhan Customs Việt Nam' },
                body: {
                  ko: '전문 허가 취득, 적합성 시험, 국가 품질검사 분야에서 풍부한 전문성을 보유하고 있습니다.',
                  en: 'We hold strong expertise in specialized licensing, conformity testing, and state quality inspections.',
                  vi: 'Chúng tôi có thế mạnh về giấy phép chuyên ngành, đo kiểm hợp quy và đăng ký kiểm tra chất lượng nhà nước.',
                },
                bullets: [
                  { ko: '통신제품 시험 및 적합성 선언', en: 'Testing and declaration of conformity for telecommunications products', vi: 'Đo kiểm và chứng nhận hợp quy sản phẩm viễn thông' },
                  { ko: '정보통신부, 화학물질국, 산업무역부 수입허가', en: 'Import licensing from the Ministry of Information and Communications, Vietnam Chemicals Agency, and Ministry of Industry and Trade', vi: 'Giấy phép nhập khẩu từ Bộ TT&TT, Cục Hóa Chất và Bộ Công Thương' },
                  { ko: '화장품, 건강기능식품, 식이보충제 제품 신고', en: 'Product notification for cosmetics, functional foods, and dietary supplements', vi: 'Công bố mỹ phẩm, thực phẩm chức năng và thực phẩm bổ sung' },
                  { ko: '식물검역 및 동물검역 증명서', en: 'Phytosanitary and veterinary quarantine certificates', vi: 'Giấy phép kiểm dịch thực vật và động vật' },
                  { ko: '국가 품질검사 등록', en: 'State quality inspection registration', vi: 'Đăng ký kiểm tra chất lượng nhà nước' },
                ],
              },
            ],
          },
          {
            title: { ko: '담당자', en: 'Contact point', vi: 'Đầu mối liên hệ' },
            items: [
              {
                title: { ko: 'Nguyen Thi Thu Trang, Le Thi Kim Ngan, Hoang Gia Minh', en: 'Nguyen Thi Thu Trang, Le Thi Kim Ngan, Hoang Gia Minh', vi: 'Nguyen Thi Thu Trang, Le Thi Kim Ngan, Hoang Gia Minh' },
                body: {
                  ko: '수출입 통관, 내국수출입, 라이센스 및 품질검사 등록 업무를 담당합니다.',
                  en: 'They support customs clearance, on-spot import-export, licensing, and quality inspection registration work.',
                  vi: 'Phụ trách thông quan, xuất nhập khẩu tại chỗ, giấy phép và đăng ký kiểm tra chất lượng.',
                },
              },
            ],
          },
        ],
        details: [
          { ko: '수입통관 및 수출통관', en: 'Import and export clearance', vi: 'Thông quan nhập khẩu và xuất khẩu' },
          { ko: '내국수출입 대응', en: 'Local export/import handling', vi: 'Xử lý xuất nhập khẩu nội địa' },
          { ko: '요건 대행', en: 'Requirement agency support', vi: 'Đại diện xử lý điều kiện quản lý' },
        ],
      },
      {
        id: 'traceability-management',
        title: { ko: '수책 관리', en: 'Liquidation Management', vi: 'Quản lý quyết toán' },
        summary: {
          ko: '신한관세법인 베트남은 수책보고서 검토, 월별 데이터 분석 및 대사, 연간 수책보고서 작성까지 수책 관리 전 과정을 지원합니다.',
          en: 'Shinhan Customs Vietnam supports the full liquidation management cycle, including liquidation report review, monthly data analysis and reconciliation, and annual report preparation.',
          vi: 'Shinhan Customs Việt Nam hỗ trợ toàn bộ quy trình quản lý quyết toán, gồm rà soát báo cáo quyết toán, phân tích đối chiếu dữ liệu hàng tháng và lập báo cáo quyết toán hằng năm.',
        },
        manager: '신종호 법인장, Phung Ngoc Ha, Nguyen Minh Tri, Phạm Ngọc Thảo Ly',
        team: { ko: '수책 관리 담당팀', en: 'Liquidation Management Team', vi: 'Đội quản lý quyết toán' },
        sections: [
          {
            title: { ko: '수책 보고서 검토', en: 'Liquidation report review', vi: 'Dịch vụ rà soát báo cáo quyết toán hải quan' },
            summary: {
              ko: '수책보고서 검토는 기업 내부 회계시스템, 창고관리 기록 및 기업이 작성한 수책보고서 간 원재료, 자재 및 완제품의 수입·수출·재고 데이터의 정확성, 완전성 및 일관성을 평가하는 서비스입니다.',
              en: 'The Customs Finalization Report review assesses the accuracy, completeness, and consistency of import, export, and inventory data for raw materials, supplies, and finished goods across accounting, warehouse, and customs finalization records.',
              vi: 'Dịch vụ rà soát Báo cáo quyết toán hải quan đánh giá tính chính xác, đầy đủ và nhất quán của dữ liệu nhập khẩu, xuất khẩu, tồn kho nguyên vật liệu, vật tư và thành phẩm giữa hệ thống kế toán, quản lý kho và báo cáo quyết toán.',
            },
            items: [
              {
                title: { ko: '검토 목적', en: 'Review objective', vi: 'Mục tiêu rà soát' },
                body: {
                  ko: '세관당국 제출 전에 잠재적인 불일치를 식별하고 해소할 수 있도록 수책보고서 데이터의 신뢰성과 법규 준수 여부를 사전에 점검합니다.',
                  en: 'We help enterprises identify and address potential discrepancies before submitting the finalization report to the Customs authority.',
                  vi: 'Hỗ trợ doanh nghiệp phát hiện và xử lý các sai lệch tiềm ẩn trước khi nộp Báo cáo quyết toán cho cơ quan Hải quan.',
                },
              },
              {
                title: { ko: '데이터 완전성 및 정확성 검토', en: 'Data completeness and accuracy review', vi: 'Rà soát tính đầy đủ và chính xác dữ liệu' },
                body: {
                  ko: '수입, 수출, 생산 및 재고 데이터의 완전성과 정확성을 검토합니다.',
                  en: 'We review the completeness and accuracy of import, export, production, and inventory data.',
                  vi: 'Rà soát tính đầy đủ và chính xác của dữ liệu nhập khẩu, xuất khẩu, sản xuất và tồn kho.',
                },
              },
              {
                title: { ko: '시스템 간 데이터 대사', en: 'Cross-system reconciliation', vi: 'Đối chiếu dữ liệu giữa các hệ thống' },
                body: {
                  ko: '수책보고서, 세관신고서, 회계기록 및 ERP/SAP 시스템 간 데이터를 대사합니다.',
                  en: 'We reconcile data between the Customs Finalization Report, customs declarations, accounting records, and the ERP/SAP system.',
                  vi: 'Đối chiếu dữ liệu giữa Báo cáo quyết toán hải quan, tờ khai hải quan, sổ sách kế toán và hệ thống ERP/SAP.',
                },
              },
              {
                title: { ko: 'BOM 및 Form F16 검토', en: 'BOM and Form F16 review', vi: 'Rà soát BOM và Mẫu F16' },
                body: {
                  ko: 'Form F16에 보고된 생산 소요량 기준(BOM)의 완전성과 정확성을 검토합니다.',
                  en: 'We review the completeness and accuracy of production consumption norms (BOMs) reported in Form F16.',
                  vi: 'Rà soát tính đầy đủ và chính xác của định mức tiêu hao nguyên vật liệu (BOM) được khai báo trên Mẫu F16.',
                },
              },
              {
                title: { ko: '리스크 식별 및 제출 전 평가', en: 'Risk identification and pre-submission assessment', vi: 'Đánh giá rủi ro trước khi nộp' },
                body: {
                  ko: '잠재적인 불일치와 법규 준수 리스크를 식별하고 세무상 영향을 조기에 평가하며, 필요 시 데이터 조정과 소명자료 준비를 지원합니다.',
                  en: 'We identify potential discrepancies and compliance risks, assess tax implications at an early stage, recommend data adjustments, and support preparation of supporting documents and explanations.',
                  vi: 'Phát hiện sai lệch tiềm ẩn, đánh giá rủi ro tuân thủ và tác động thuế, đồng thời hỗ trợ điều chỉnh dữ liệu và chuẩn bị hồ sơ giải trình.',
                },
              },
            ],
          },
          {
            title: { ko: '월별 데이터 분석 및 보고', en: 'Monthly data analysis & reporting', vi: 'Dịch vụ phân tích và đối chiếu dữ liệu hàng tháng' },
            summary: {
              ko: '월별 데이터 분석 및 대사는 보고기간 동안 발생한 거래 데이터에 대해 내부 관리시스템, 세관기록 및 입증서류 간 일관성을 검토·비교·검증하는 과정입니다.',
              en: 'Monthly data analysis and reconciliation reviews, compares, and verifies the consistency of transactional data across internal management systems, customs records, and supporting documents.',
              vi: 'Dịch vụ phân tích và đối chiếu dữ liệu hàng tháng rà soát, so sánh và xác minh tính nhất quán của dữ liệu phát sinh giữa hệ thống nội bộ, dữ liệu hải quan và chứng từ liên quan.',
            },
            items: [
              {
                title: { ko: '월별 데이터 대사', en: 'Monthly reconciliation', vi: 'Đối chiếu dữ liệu hàng tháng' },
                body: {
                  ko: '내부 관리시스템과 세관기록 간 수입, 수출, 생산 및 재고 데이터를 매월 대사합니다.',
                  en: 'We reconcile import, export, production, and inventory data between internal management systems and customs records on a monthly basis.',
                  vi: 'Đối chiếu dữ liệu nhập khẩu, xuất khẩu, sản xuất và tồn kho giữa hệ thống quản lý nội bộ và dữ liệu hải quan theo từng tháng.',
                },
              },
              {
                title: { ko: '거래 기록 검토', en: 'Transaction review', vi: 'Rà soát giao dịch phát sinh' },
                body: {
                  ko: '해당 월에 기록된 모든 거래의 완전성, 정확성 및 일관성을 검토합니다.',
                  en: 'We review the completeness, accuracy, and consistency of all transactions recorded during the month.',
                  vi: 'Rà soát tính đầy đủ, chính xác và nhất quán của toàn bộ giao dịch phát sinh trong tháng.',
                },
              },
              {
                title: { ko: '차이 분석', en: 'Discrepancy analysis', vi: 'Phân tích sai lệch' },
                body: {
                  ko: '수량, 금액, 품목코드, 측정단위 및 거래 기록 시점의 불일치를 분석합니다.',
                  en: 'We analyze discrepancies in quantity, value, item code, unit of measure, and transaction recording timing.',
                  vi: 'Phân tích sai lệch về số lượng, trị giá, mã hàng, đơn vị tính và thời điểm ghi nhận giao dịch.',
                },
              },
              {
                title: { ko: '원인 파악 및 시정 권고', en: 'Root-cause analysis and corrective actions', vi: 'Xác định nguyên nhân và đề xuất điều chỉnh' },
                body: {
                  ko: '불일치의 근본 원인을 식별하고 적절한 시정조치와 조정방안을 권고하여 월별 운영 흐름을 효과적으로 관리할 수 있도록 지원합니다.',
                  en: 'We identify root causes of discrepancies and recommend appropriate corrective actions and adjustments so enterprises can monitor and control operational flows throughout each month.',
                  vi: 'Xác định nguyên nhân gốc rễ của sai lệch và đề xuất phương án điều chỉnh phù hợp để doanh nghiệp kiểm soát hiệu quả luồng nghiệp vụ từng tháng.',
                },
              },
              {
                title: { ko: '연간 보고 기반 구축', en: 'Annual report data foundation', vi: 'Nền tảng dữ liệu cho báo cáo năm' },
                body: {
                  ko: '발생 이슈를 적시에 해결하고 월별 프로세스와 데이터의 연속성 및 누적적 완전성을 확보해 연간 수책보고서 작성 기반을 구축합니다.',
                  en: 'This approach enables timely issue resolution, cumulative data continuity from month to month, and a consistent foundation for the annual Customs Finalization Report.',
                  vi: 'Cách tiếp cận này giúp xử lý kịp thời vấn đề phát sinh, đảm bảo tính liên tục và nhất quán của dữ liệu theo từng tháng, tạo nền tảng cho Báo cáo quyết toán hằng năm.',
                },
              },
            ],
          },
          {
            title: { ko: '연간 수책보고서 작성 서비스', en: 'Annual liquidation report preparation service', vi: 'Dịch vụ lập Báo cáo quyết toán hải quan hằng năm' },
            summary: {
              ko: '연간 수책보고서 작성, 검토 및 최종 확정을 위한 전문 컨설팅과 지원을 제공하여 수출입·생산·재고 데이터의 정확성, 완전성 및 일관성을 확보합니다.',
              en: 'This service provides professional consulting and support to prepare, review, and finalize the Annual Customs Finalization Report while ensuring data accuracy, completeness, and consistency.',
              vi: 'Dịch vụ cung cấp tư vấn và hỗ trợ chuyên nghiệp trong quá trình lập, rà soát và hoàn thiện Báo cáo quyết toán hải quan hằng năm.',
            },
            items: [
              {
                title: { ko: '기초 데이터 검토', en: 'Base data review', vi: 'Rà soát dữ liệu nền tảng' },
                body: {
                  ko: '수입, 수출, 생산 및 재고 데이터의 완전성과 정확성을 검토합니다.',
                  en: 'We review the completeness and accuracy of import, export, production, and inventory data.',
                  vi: 'Rà soát tính đầy đủ và chính xác của dữ liệu nhập khẩu, xuất khẩu, sản xuất và tồn kho.',
                },
              },
              {
                title: { ko: '보고서 대사 및 작성', en: 'Report reconciliation and preparation', vi: 'Đối chiếu và lập báo cáo' },
                body: {
                  ko: '수책보고서, 세관신고서, 회계기록 및 ERP/SAP 시스템 간 데이터를 대사하고 세관당국 요구사항에 따라 수책보고서를 작성·취합합니다.',
                  en: 'We reconcile the finalization report with customs declarations, accounting records, and ERP/SAP data, then prepare and compile the report according to Customs Authority requirements.',
                  vi: 'Đối chiếu dữ liệu giữa Báo cáo quyết toán, tờ khai hải quan, sổ sách kế toán và hệ thống ERP/SAP, sau đó lập và hoàn thiện báo cáo theo yêu cầu của cơ quan Hải quan.',
                },
              },
              {
                title: { ko: 'BOM 및 원재료 배부 검토', en: 'BOM and material allocation review', vi: 'Rà soát BOM và phương pháp phân bổ nguyên vật liệu' },
                body: {
                  ko: '생산 소요량 기준(BOM), 원재료 배부 방법론 및 Form 16용 실제 BOM 계산을 검토합니다.',
                  en: 'We review production consumption norms, material allocation methodologies, and actual BOM calculations for Form 16.',
                  vi: 'Rà soát định mức tiêu hao nguyên vật liệu, phương pháp phân bổ nguyên vật liệu và phương pháp tính Actual BOM để lập Mẫu F16.',
                },
              },
              {
                title: { ko: '조정 이슈 및 리스크 분석', en: 'Adjustment issues and risk analysis', vi: 'Phân tích sai lệch và rủi ro' },
                body: {
                  ko: '불일치를 분석하고 법규 준수 리스크를 평가하며 조정 또는 시정조치가 필요한 이슈를 식별합니다.',
                  en: 'We analyze discrepancies, assess compliance risks, and identify issues requiring adjustment or corrective actions.',
                  vi: 'Phân tích sai lệch, đánh giá rủi ro tuân thủ và xác định nội dung cần điều chỉnh hoặc khắc phục.',
                },
              },
              {
                title: { ko: '소명자료 및 세관 대응 지원', en: 'Supporting documents and customs response', vi: 'Hỗ trợ hồ sơ giải trình và làm việc với Hải quan' },
                body: {
                  ko: '불일치 해소 권고안을 제공하고 입증서류 및 소명자료 준비를 지원하며, 필요한 경우 세관당국의 질의 또는 검사 대응을 지원합니다.',
                  en: 'We recommend discrepancy-resolution measures, help prepare supporting documents and explanations, and support responses to Customs inquiries or inspections when required.',
                  vi: 'Đề xuất phương án xử lý sai lệch, hỗ trợ chuẩn bị hồ sơ giải trình và làm việc với cơ quan Hải quan khi có yêu cầu kiểm tra hoặc thanh tra.',
                },
              },
              {
                title: { ko: '내부통제 개선 권고', en: 'Internal control recommendations', vi: 'Đề xuất tăng cường kiểm soát nội bộ' },
                body: {
                  ko: '데이터 품질 향상, 법규 준수 관리 강화 및 향후 보고기간의 리스크 저감을 위한 내부통제 방안을 권고합니다.',
                  en: 'We recommend internal control measures to enhance data quality, strengthen compliance management, and reduce risks in future reporting periods.',
                  vi: 'Đề xuất biện pháp kiểm soát nội bộ nhằm nâng cao chất lượng dữ liệu, củng cố quản lý tuân thủ và giảm rủi ro cho kỳ báo cáo tiếp theo.',
                },
              },
            ],
          },
        ],
        details: [
          { ko: '수책 보고서 검토', en: 'Liquidation report review', vi: 'Rà soát báo cáo quyết toán hải quan' },
          { ko: '월별 데이터 분석 및 보고', en: 'Monthly data analysis and reporting', vi: 'Phân tích và đối chiếu dữ liệu hàng tháng' },
          { ko: '연간 수책보고서 작성 서비스', en: 'Annual liquidation report preparation service', vi: 'Lập Báo cáo quyết toán hải quan hằng năm' },
        ],
      },
      {
        id: 'customs-audit',
        title: { ko: '세관 조사', en: 'Customs Audit', vi: 'Kiểm tra hải quan' },
        summary: {
          ko: '사후심사 이전에 리스크를 면밀히 분석하고 다각적인 대응전략을 적용하여 세관심사 과정의 불확실성을 줄이고 기업의 안정적인 운영을 지원합니다.',
          en: 'Through meticulous pre-risk analysis and a multi-dimensional response strategy, we reduce uncertainty in customs audits and support business stability.',
          vi: 'Thông qua phân tích rủi ro kỹ lưỡng trước kiểm tra và chiến lược ứng phó đa chiều, chúng tôi giúp giảm bất định trong quá trình kiểm tra hải quan và bảo đảm sự ổn định cho doanh nghiệp.',
        },
        manager: '신종호 법인장, Phung Ngoc Ha, Nguyen Minh Tri, Phạm Ngọc Thảo Ly',
        team: { ko: '세관 조사 대응 담당팀', en: 'Customs Audit Response Team', vi: 'Đội ứng phó kiểm tra hải quan' },
        sections: [
          {
            title: { ko: '사후심사 개요', en: 'Post-clearance audit overview', vi: 'Tổng quan kiểm tra sau thông quan' },
            summary: {
              ko: '사후심사는 세관당국이 세관서류, 회계장부, 회계증빙서류 및 물품 관련 증빙서류를 검토해 신고 내용의 정확성과 법령 준수 여부를 평가하는 절차입니다.',
              en: 'A Post-Clearance Audit is a customs inspection of declarations, accounting books, accounting records, and other import-export documents to verify declared information and compliance.',
              vi: 'Kiểm tra sau thông quan là việc cơ quan hải quan kiểm tra hồ sơ hải quan, sổ kế toán, chứng từ kế toán và chứng từ liên quan nhằm đánh giá tính chính xác và tuân thủ.',
            },
            items: [
              {
                title: { ko: '심사 목적', en: 'Audit purpose', vi: 'Mục đích kiểm tra' },
                body: {
                  ko: '세관에 신고·제출·제시한 자료의 정확성과 진실성, 그리고 관세법 및 수출입 관리 관련 법령 준수 여부를 확인합니다.',
                  en: 'The audit verifies the accuracy and authenticity of information declared, submitted, and presented to Customs, and assesses compliance with customs and import-export laws.',
                  vi: 'Đánh giá tính chính xác, trung thực của nội dung đã khai, nộp, xuất trình với cơ quan hải quan và việc tuân thủ pháp luật hải quan, pháp luật liên quan.',
                },
              },
              {
                title: { ko: '심사 가능 기간', en: 'Audit period', vi: 'Thời hạn kiểm tra' },
                body: {
                  ko: '현행 규정상 사후심사는 세관신고서 등록일로부터 5년 이내에 실시될 수 있습니다.',
                  en: 'Under current regulations, a Post-Clearance Audit may be conducted within five years from the date of customs declaration registration.',
                  vi: 'Theo quy định hiện hành, thời hạn kiểm tra sau thông quan là 05 năm kể từ ngày đăng ký tờ khai hải quan.',
                },
              },
            ],
          },
          {
            title: { ko: '사후심사의 유형', en: 'Types of customs audits', vi: 'Các loại kiểm tra sau thông quan' },
            summary: {
              ko: '사후심사는 위반 징후, 리스크 관리, 법령 준수 평가 등 유형에 따라 실시 방식과 대응 전략이 달라집니다.',
              en: 'Customs audits vary by trigger and purpose, including non-compliance indicators, risk management, and overall compliance assessment.',
              vi: 'Các cuộc kiểm tra sau thông quan khác nhau theo dấu hiệu vi phạm, quản lý rủi ro và đánh giá tuân thủ pháp luật.',
            },
            items: [
              {
                title: { ko: '법령 위반 징후에 따른 심사', en: 'Audit based on signs of non-compliance', vi: 'Kiểm tra khi có dấu hiệu vi phạm' },
                body: {
                  ko: '관세법 또는 수출입 관리 관련 법령 위반 징후가 식별된 경우 실시되며, 세관신고인에게 사전 통지 없이 진행될 수 있습니다.',
                  en: 'This audit is initiated when Customs identifies signs of violations and may proceed without prior notice to the declarant.',
                  vi: 'Được thực hiện khi đã xác định dấu hiệu vi phạm và có thể tiến hành không cần thông báo trước cho người khai hải quan.',
                },
              },
              {
                title: { ko: '리스크 관리 적용 심사', en: 'Risk-based post-clearance audit', vi: 'Kiểm tra trên cơ sở quản lý rủi ro' },
                body: {
                  ko: '분기별 계획에 따른 정기 심사와 권한 있는 기관의 요구 또는 지시에 따른 수시 심사를 포함합니다.',
                  en: 'Risk-based audits include regular quarterly audits and ad hoc audits based on requests or directives from competent authorities.',
                  vi: 'Bao gồm kiểm tra thường xuyên theo kế hoạch quý và kiểm tra đột xuất theo yêu cầu hoặc chỉ đạo của cấp có thẩm quyền.',
                },
              },
              {
                title: { ko: '법령 준수 여부 심사', en: 'Customs compliance audit', vi: 'Kiểm tra tuân thủ pháp luật' },
                body: {
                  ko: '리스크관리 부서가 매년 계획하고 관세국장이 승인하는 심사로, 기업의 전반적인 법령 준수 수준을 평가합니다.',
                  en: 'Compliance audits are planned annually by the Customs Risk Management Division and approved by the Director General of Customs to assess enterprise compliance levels.',
                  vi: 'Được lập kế hoạch hằng năm nhằm đánh giá mức độ tuân thủ pháp luật của doanh nghiệp.',
                },
              },
            ],
          },
          {
            title: { ko: '주요 심사 항목', en: 'Key areas of investigation', vi: 'Các nội dung kiểm tra trọng tâm' },
            summary: {
              ko: '세관당국은 관세평가, 품목분류, 관세 환급, 면세·비과세 원재료 관리, 통관요건, 원산지 등 주요 리스크 영역을 검토합니다.',
              en: 'Customs authorities review key risk areas including valuation, HS classification, refunds and drawbacks, duty-exempt material management, import requirements, and origin.',
              vi: 'Cơ quan hải quan kiểm tra các lĩnh vực rủi ro chính như trị giá hải quan, phân loại HS, hoàn thuế, quản lý nguyên liệu miễn thuế, điều kiện nhập khẩu và xuất xứ.',
            },
            items: [
              {
                title: { ko: '관세평가', en: 'Customs valuation', vi: 'Trị giá hải quan' },
                body: {
                  ko: '신고가격의 정확성과 진실성을 심사하며 특수관계, 수수료, 지원비용, 로열티, 라이선스 수수료, 할인 등 조정 항목을 중점 검토합니다.',
                  en: 'Customs reviews declared value accuracy, related-party transactions, additions such as commissions, assists, royalties and license fees, and deductions such as discounts.',
                  vi: 'Kiểm tra tính chính xác của trị giá khai báo, quan hệ đặc biệt, khoản điều chỉnh cộng/trừ như hoa hồng, trợ giúp, bản quyền, phí giấy phép và giảm giá.',
                },
              },
              {
                title: { ko: '품목분류', en: 'HS classification', vi: 'Phân loại hàng hóa' },
                body: {
                  ko: '적용 세율과 품목관리 정책의 기초가 되는 신고 HS 코드의 정확성을 심사합니다.',
                  en: 'Customs verifies declared HS code accuracy because classification determines duty rates and regulatory requirements.',
                  vi: 'Kiểm tra tính chính xác của mã HS khai báo làm cơ sở xác định thuế suất và chính sách mặt hàng.',
                },
              },
              {
                title: { ko: '관세 환급', en: 'Customs refunds and drawbacks', vi: 'Hoàn thuế hải quan' },
                body: {
                  ko: '환급 신청서류의 적법성·완전성, 환급 요건 충족 여부, 실제 생산 소요량과 회계·기술자료의 부합 여부를 확인합니다.',
                  en: 'Auditors assess refund documentation, statutory conditions, and consistency of actual consumption rates with accounting and technical production data.',
                  vi: 'Kiểm tra hồ sơ hoàn thuế, điều kiện hoàn thuế và sự phù hợp giữa định mức sử dụng thực tế với sổ sách, chứng từ kế toán và tài liệu kỹ thuật.',
                },
              },
              {
                title: { ko: '면세·비과세 자재 및 수출물품 관리', en: 'Duty-exempt materials and exported goods', vi: 'Nguyên liệu miễn thuế và hàng xuất khẩu' },
                body: {
                  ko: '수책보고서, 회계장부, 입출고 기록, 실제 소요량과 수입 원재료 사용의 정합성을 검토합니다.',
                  en: 'Customs may review finalization reports, accounting records, inventory movement records, production consumption norms, and imported material usage.',
                  vi: 'Kiểm tra báo cáo quyết toán, chứng từ kế toán, nhập xuất kho, định mức thực tế và sự phù hợp giữa sản phẩm xuất khẩu với nguyên liệu nhập khẩu.',
                },
              },
              {
                title: { ko: '통관요건 및 전문관리 허가', en: 'Import requirements and licenses', vi: 'Điều kiện thông quan và giấy phép chuyên ngành' },
                body: {
                  ko: '품질기준, 수출입 허가, 기술규정, 검역요건, 제품 인증 등 전문관리 법령상 수입요건 준수 여부를 확인합니다.',
                  en: 'Audits examine permits, licenses, quality standards, technical regulations, quarantine requirements, product certifications, and other non-tariff measures.',
                  vi: 'Kiểm tra giấy phép, tiêu chuẩn chất lượng, quy chuẩn kỹ thuật, kiểm dịch, chứng nhận sản phẩm và các biện pháp phi thuế quan.',
                },
              },
              {
                title: { ko: '원산지 및 기타 준수 사항', en: 'Country of origin and other compliance areas', vi: 'Xuất xứ và nội dung tuân thủ khác' },
                body: {
                  ko: 'C/O의 적법성, 원산지 증빙서류, 신고서상 원산지 표시와 함께 EPE 관리요건, 생산능력 변경, 면세 자재 보관 장소 등을 검토합니다.',
                  en: 'Customs reviews C/O validity, origin documentation, origin declarations, EPE supervision requirements, production capacity changes, and storage of duty-exempt materials.',
                  vi: 'Kiểm tra C/O, hồ sơ xuất xứ, khai báo xuất xứ, điều kiện giám sát EPE, thay đổi năng lực sản xuất và nơi lưu trữ nguyên liệu miễn thuế.',
                },
              },
            ],
          },
        ],
        details: [
          { ko: '세관 조사 대응', en: 'Customs audit response', vi: 'Ứng phó kiểm tra hải quan' },
          { ko: '세관 제기 이슈 대응논리 수립', en: 'Response logic for customs issues', vi: 'Xây dựng lập luận ứng phó vấn đề hải quan' },
        ],
      },
      {
        id: 'hs-classification',
        title: { ko: 'HS 품목 분류', en: 'HS Classification', vi: 'Phân loại mã HS' },
        summary: {
          ko: 'HS 코드 자문, 품목분류 사전심사 신청, 미국 Customs Ruling 지원을 통해 품목분류 리스크와 통관 지연을 줄입니다.',
          en: 'We support HS classification advisory, advance determination applications, and U.S. Customs Ruling support to reduce classification risks and clearance delays.',
          vi: 'Chúng tôi hỗ trợ tư vấn mã HS, xác định trước mã số hàng hóa và US Customs Ruling nhằm giảm rủi ro phân loại và chậm thông quan.',
        },
        manager: 'Nguyen Thi Thu Trang, Le Thi Kim Ngan, Ngoc Diep',
        team: { ko: 'HS 품목분류 담당팀', en: 'HS Classification Team', vi: 'Đội phân loại mã HS' },
        sections: [
          {
            title: { ko: '품목분류 개요', en: 'HS classification overview', vi: 'Tổng quan phân loại HS' },
            summary: {
              ko: 'HS 코드는 세계관세기구가 제정·관리하는 국제표준 상품분류 코드 체계이며, 세액 산정과 물품관리 정책 적용의 기준입니다.',
              en: 'HS Code is a globally standardized product classification system developed and regulated by the WCO and used for tax calculation and goods management policies.',
              vi: 'Mã HS là hệ thống mã số tiêu chuẩn quốc tế do WCO xây dựng và quản lý, dùng làm cơ sở áp dụng chính sách quản lý hàng hóa và tính thuế.',
            },
            items: [
              {
                title: { ko: '분류 오류 리스크', en: 'Risk of incorrect classification', vi: 'Rủi ro áp dụng sai mã HS' },
                body: {
                  ko: '부정확한 HS 코드 적용은 잘못된 세율, 통관 지연, 세액 추징 및 행정처분으로 이어질 수 있습니다.',
                  en: 'Incorrect HS classification can result in incorrect duty rates, customs clearance delays, additional tax assessments, and administrative penalties.',
                  vi: 'Áp dụng sai mã HS có thể dẫn đến sai thuế suất, chậm thông quan, truy thu thuế và xử phạt hành chính.',
                },
              },
            ],
          },
          {
            title: { ko: 'HS Code 검토 및 품목분류 사전심사', en: 'HS classification & customs ruling services', vi: 'Dịch vụ xác định mã HS và xác định trước mã số' },
            summary: {
              ko: '베트남 수출입물품목록, 관세율표, 국제 HS 분류 원칙 및 베트남 법령을 기준으로 품목분류와 사전심사 업무를 지원합니다.',
              en: 'We support classification and advance ruling work based on the Vietnam nomenclature, tariff schedule, international HS principles, and Vietnamese regulations.',
              vi: 'Chúng tôi hỗ trợ phân loại và xác định trước mã số dựa trên Danh mục hàng hóa XNK Việt Nam, biểu thuế, nguyên tắc HS quốc tế và pháp luật Việt Nam.',
            },
            items: [
              {
                title: { ko: 'HS 코드 자문', en: 'HS classification advisory', vi: 'Tư vấn mã HS' },
                body: {
                  ko: '세관서류, 기술자료 및 물품 관련 정보를 바탕으로 품명과 품목번호를 결정하고 적용 가능한 HS 코드를 제안합니다.',
                  en: 'We determine product description and tariff code based on customs documentation, technical specifications, and other product information, then propose applicable HS codes.',
                  vi: 'Xác định tên gọi, mã số hàng hóa dựa trên hồ sơ hải quan, tài liệu kỹ thuật và thông tin liên quan, đồng thời đề xuất mã HS phù hợp.',
                },
              },
              {
                title: { ko: '세금 및 무역준수 자문', en: 'Tax and trade compliance advisory', vi: 'Tư vấn thuế và tuân thủ thương mại' },
                body: {
                  ko: '수입세, 부가가치세, 기타 세금·수수료와 함께 전문관리 규정, 수출입 요건, 허가, 전문검사 등 준수 요건을 자문합니다.',
                  en: 'We advise on import duty, VAT, other taxes and charges, product-specific regulatory requirements, licensing, specialized inspections, and trade compliance.',
                  vi: 'Tư vấn thuế nhập khẩu, VAT, các khoản thuế phí khác, quy định quản lý chuyên ngành, điều kiện XNK, giấy phép và kiểm tra chuyên ngành.',
                },
              },
              {
                title: { ko: '품목분류 사전심사 신청 지원', en: 'Advance HS classification ruling support', vi: 'Hỗ trợ xác định trước mã số hàng hóa' },
                body: {
                  ko: '기술자료, 제품 설명서, 카탈로그, 시험성적서, 샘플 등 신청서류 준비와 작성, 세관당국 제출 및 진행상황 확인을 지원합니다.',
                  en: 'We support preparation and drafting of application dossiers, including technical specifications, product descriptions, catalogues, test reports, samples, submission, clarification, and follow-up with Customs.',
                  vi: 'Hỗ trợ chuẩn bị hồ sơ gồm tài liệu kỹ thuật, mô tả sản phẩm, catalogue, kết quả thử nghiệm, mẫu hàng, nộp hồ sơ, giải trình và theo dõi kết quả.',
                },
              },
            ],
          },
          {
            title: { ko: '미국 품목분류 사전판정 지원', en: 'U.S. Customs Ruling support', vi: 'Hỗ trợ xác định trước mã số hàng hóa của Hoa Kỳ' },
            summary: {
              ko: '미국 Customs Classification Ruling은 CBP가 HTSUS에 따른 적정 품목분류를 결정하는 구속력 있는 제도입니다.',
              en: 'A U.S. Customs Classification Ruling is a binding CBP decision on proper product classification under the HTSUS.',
              vi: 'Customs Classification Ruling của Hoa Kỳ là quyết định có tính ràng buộc của CBP về mã phân loại phù hợp theo HTSUS.',
            },
            items: [
              {
                title: { ko: 'Ruling 활용 효과', en: 'Value of obtaining a ruling', vi: 'Lợi ích của ruling' },
                body: {
                  ko: '분류가 명확하지 않거나 여러 가능성이 있는 경우 Ruling을 통해 수입항별 일관된 적용, 합리적인 주의의무 이행, 분쟁·추징·지연 리스크 완화를 도모할 수 있습니다.',
                  en: 'When classification is unclear, a ruling helps ensure consistent treatment across ports, strengthen reasonable care, and reduce disputes, duty assessments, delays, and post-entry corrections.',
                  vi: 'Khi việc phân loại chưa rõ, ruling giúp áp dụng thống nhất tại các cửa khẩu, đáp ứng reasonable care và giảm tranh chấp, truy thu, chậm thông quan.',
                },
              },
              {
                title: { ko: 'HTS 품목분류 분석', en: 'HTS classification analysis', vi: 'Phân tích phân loại HTS' },
                body: {
                  ko: '제품의 기술사양, 구성 성분, 기능, 용도 및 생산 정보를 검토하여 HTSUS상 적정 품목번호를 결정합니다.',
                  en: 'We review product specifications, composition, functionality, intended use, and manufacturing information to determine the appropriate HTSUS classification.',
                  vi: 'Rà soát thông số kỹ thuật, thành phần, chức năng, công dụng và thông tin sản xuất để xác định mã HTSUS phù hợp.',
                },
              },
              {
                title: { ko: 'CBP 선례 조사 및 전략 수립', en: 'CBP ruling research and strategy', vi: 'Nghiên cứu tiền lệ CBP và chiến lược phân loại' },
                body: {
                  ko: 'CBP 결정, 관련 선례, 세관 가이드라인을 조사하고 HTSUS 규정, 법적 주석, GRI에 근거한 분류 논리를 수립합니다.',
                  en: 'We research CBP rulings, precedents, and customs guidance, then develop a classification position supported by HTS provisions, legal notes, GRI, and relevant rulings.',
                  vi: 'Nghiên cứu ruling, tiền lệ và hướng dẫn của CBP, sau đó xây dựng lập luận dựa trên HTSUS, chú giải pháp lý, GRI và quyết định liên quan.',
                },
              },
              {
                title: { ko: '무역준수 자문', en: 'Trade compliance advisory', vi: 'Tư vấn tuân thủ thương mại' },
                body: {
                  ko: '제안된 HTS 코드와 관련한 품목분류 리스크, 수입관세 영향 및 준수 유의사항을 권고합니다.',
                  en: 'We provide recommendations on classification risks, duty implications, and compliance considerations related to the proposed HTS classification.',
                  vi: 'Đưa ra khuyến nghị về rủi ro phân loại, tác động thuế nhập khẩu và lưu ý tuân thủ đối với mã HTS đề xuất.',
                },
              },
            ],
          },
        ],
        details: [
          { ko: '품목분류 자문', en: 'Classification advisory', vi: 'Tư vấn phân loại' },
          { ko: '품목분류 사전심사', en: 'Advance classification review', vi: 'Thẩm định trước phân loại' },
          { ko: '미국 Ruling 대행', en: 'U.S. ruling support', vi: 'Hỗ trợ ruling Hoa Kỳ' },
        ],
      },
      {
        id: 'legal-advisory',
        title: { ko: '법령 자문', en: 'Regulatory Advisory', vi: 'Tư vấn pháp lý' },
        summary: {
          ko: '심층적인 법령 분석과 실무적인 컴플라이언스 솔루션을 통해 베트남 관세·무역 규정 준수와 법적·재무적 리스크 저감을 지원합니다.',
          en: 'Through in-depth regulatory analysis and practical compliance solutions, we help businesses navigate Vietnam customs and trade regulations while minimizing legal and financial risks.',
          vi: 'Thông qua phân tích chuyên sâu quy định pháp luật và giải pháp thực tiễn, chúng tôi hỗ trợ doanh nghiệp tuân thủ quy định hải quan, thương mại và giảm rủi ro pháp lý, tài chính.',
        },
        manager: 'Nguyen Thi Thu Trang, Le Viet The Hung, Ngoc Diep',
        team: { ko: '컴플라이언스 자문 담당팀', en: 'Regulatory Advisory Team', vi: 'Đội tư vấn tuân thủ' },
        sections: [
          {
            title: { ko: '컴플라이언스 자문 개요', en: 'Regulatory advisory overview', vi: 'Tổng quan tư vấn tuân thủ' },
            summary: {
              ko: '컴플라이언스 자문 서비스는 베트남의 관세, 무역 및 수출입 관련 법령에 관한 전문 자문 솔루션을 제공합니다.',
              en: 'Regulatory Advisory services provide professional guidance on customs, trade, and import-export regulations in Vietnam.',
              vi: 'Dịch vụ Tư vấn Tuân thủ cung cấp giải pháp tư vấn chuyên sâu về pháp luật hải quan, thương mại và xuất nhập khẩu tại Việt Nam.',
            },
            items: [
              {
                title: { ko: '서비스 목적', en: 'Service objective', vi: 'Mục tiêu dịch vụ' },
                body: {
                  ko: '고객이 관련 법규를 명확히 이해하고 준수 여부를 평가하며 국제무역 활동에 적합한 전략을 수립할 수 있도록 지원합니다.',
                  en: 'We support businesses in understanding legal requirements, assessing compliance risks, and implementing strategies for cross-border transactions and customs operations.',
                  vi: 'Hỗ trợ khách hàng hiểu rõ quy định pháp lý, đánh giá tuân thủ và xây dựng chiến lược phù hợp cho hoạt động thương mại quốc tế.',
                },
              },
            ],
          },
          {
            title: { ko: '주요 서비스', en: 'Core services', vi: 'Các dịch vụ chính' },
            summary: {
              ko: '면세, 화학물질법, 수출입세, 반덤핑, 공문서 작성 등 베트남 관세·무역 실무에서 필요한 핵심 자문을 제공합니다.',
              en: 'We provide core advisory services for duty exemption, chemicals regulations, import-export tariffs, anti-dumping measures, and official inquiry submission.',
              vi: 'Cung cấp tư vấn chính về miễn thuế, luật hóa chất, thuế xuất nhập khẩu, chống bán phá giá và hỗ trợ soạn thảo công văn.',
            },
            items: [
              {
                title: { ko: '베트남 면세 자문', en: 'Vietnam duty exemption advisory', vi: 'Tư vấn miễn thuế tại Việt Nam' },
                body: {
                  ko: '면세 정책 적용 요건을 확인하고 준수 여부를 평가하며 수출입 활동에서 세제상 혜택을 최적화할 수 있도록 지원합니다.',
                  en: 'We help businesses identify applicable duty exemption incentives, assess compliance requirements, and optimize customs duty savings while minimizing risks.',
                  vi: 'Hỗ trợ xác định điều kiện áp dụng chính sách miễn thuế, đánh giá tuân thủ và tối ưu hóa lợi ích thuế trong hoạt động XNK.',
                },
              },
              {
                title: { ko: '화학물질법 자문', en: 'Law on chemicals advisory', vi: 'Tư vấn Luật Hóa chất' },
                body: {
                  ko: '허가, 수입요건, 세관신고 및 법령상 기타 의무에 관한 실무 자문으로 최신 화학물질법 준수를 지원합니다.',
                  en: 'We provide practical guidance on licensing, import requirements, declarations, and obligations under Vietnam’s chemical regulations.',
                  vi: 'Cung cấp tư vấn thực tiễn về giấy phép, điều kiện nhập khẩu, khai báo hải quan và nghĩa vụ theo quy định hóa chất.',
                },
              },
              {
                title: { ko: '수출입세 자문', en: 'Import-export tariff law advisory', vi: 'Tư vấn Thuế xuất nhập khẩu' },
                body: {
                  ko: '수출입세 규정의 해석과 적용, 품목분류, 관세평가, 특혜관세 적용 및 세금 관련 준수를 자문합니다.',
                  en: 'We advise on tariff interpretation, HS classification, customs valuation, preferential duty treatment, and overall customs tax compliance.',
                  vi: 'Tư vấn diễn giải và áp dụng quy định thuế XNK, phân loại hàng hóa, trị giá hải quan, ưu đãi thuế và tuân thủ thuế.',
                },
              },
              {
                title: { ko: '반덤핑 정책 자문', en: 'Anti-dumping duty advisory', vi: 'Tư vấn chính sách chống bán phá giá' },
                body: {
                  ko: '반덤핑 및 무역구제 조치와 관련된 적용 범위, 세율 영향, 준수 또는 리스크 완화 방안을 분석합니다.',
                  en: 'We help businesses assess anti-dumping and trade remedy risks by analyzing product coverage, duty implications, and mitigation strategies.',
                  vi: 'Hỗ trợ đánh giá rủi ro chống bán phá giá và phòng vệ thương mại thông qua phân tích phạm vi áp dụng, tác động thuế và phương án giảm thiểu.',
                },
              },
              {
                title: { ko: '공문서 작성 지원', en: 'Official inquiry submission', vi: 'Hỗ trợ soạn thảo công văn' },
                body: {
                  ko: '세관당국 및 권한 있는 국가기관에 제출하는 공문 작성과 제출을 지원하여 복잡한 관세·무역 사안에 대한 공식 지침을 받을 수 있도록 돕습니다.',
                  en: 'We support preparation and submission of official inquiries to customs and government authorities to obtain guidance on complex trade and customs matters.',
                  vi: 'Hỗ trợ soạn thảo và nộp công văn tới cơ quan Hải quan và cơ quan nhà nước để nhận hướng dẫn đối với vấn đề hải quan, thương mại phức tạp.',
                },
              },
            ],
          },
          {
            title: { ko: '왜 신한을 선택해야 합니까?', en: 'Why choose SHINHAN?', vi: 'Tại sao nên chọn SHINHAN?' },
            summary: {
              ko: '관세 및 국제무역 분야에서 축적한 경험을 바탕으로 법령 준수, 운영 리스크 저감, 복잡한 관세·무역 이슈 해결을 지원합니다.',
              en: 'With extensive customs and international trade experience, our professionals help businesses comply with regulations, reduce operational risks, and resolve complex customs and trade issues.',
              vi: 'Với kinh nghiệm trong lĩnh vực hải quan và thương mại quốc tế, đội ngũ chuyên gia hỗ trợ tuân thủ pháp luật, giảm rủi ro vận hành và xử lý hiệu quả vấn đề thương mại.',
            },
            items: [
              {
                title: { ko: '실무 중심 해결방안', en: 'Practical compliance solutions', vi: 'Giải pháp tuân thủ thực tiễn' },
                body: {
                  ko: '규정 해석에 그치지 않고 기업의 실제 수출입 운영에 적용 가능한 대응 방향을 제시합니다.',
                  en: 'We go beyond legal interpretation and provide actionable directions applicable to real import-export operations.',
                  vi: 'Không chỉ diễn giải quy định, chúng tôi đề xuất hướng xử lý có thể áp dụng vào hoạt động XNK thực tế.',
                },
              },
            ],
          },
        ],
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
          ko: '베트남 진출 기업을 위해 15개 FTA 협정과 GSP 등 복잡한 현지 규정을 반영한 원산지 관리 시스템을 제공합니다.',
          en: 'For companies expanding into Vietnam, KORD FTA integrates complex local regulations including 15 FTA agreements and GSP into origin management.',
          vi: 'Đối với doanh nghiệp mở rộng tại Việt Nam, KORD FTA tích hợp toàn diện các quy định địa phương phức tạp, gồm 15 FTA và GSP, vào quản lý xuất xứ.',
        },
        image: '/it-systems/fta/fta-dashboard.png',
        manager: '신종호 법인장, 김선웅 관세사, Nguyen Minh Tri',
        team: { ko: 'KORD FTA 담당팀', en: 'KORD FTA Team', vi: 'Đội phụ trách KORD FTA' },
        sections: [
          {
            title: { ko: 'KORD FTA 개요', en: 'KORD FTA overview', vi: 'Tổng quan KORD FTA' },
            summary: {
              ko: '회사의 회계정보를 토대로 수출·판매물품의 FTA 원산지를 판정하고, 원산지소명서 및 C/O를 출력하며, 관련서류를 보관하는 시스템입니다.',
              en: 'KORD FTA determines FTA origin for exported and sold goods based on company accounting information, prints C/O, and stores related documents.',
              vi: 'KORD FTA xác định xuất xứ FTA của hàng xuất khẩu/hàng bán nội địa dựa trên dữ liệu doanh nghiệp, in C/O và lưu trữ chứng từ liên quan.',
            },
            items: [
              {
                title: { ko: '베트남 FTA 환경 반영', en: 'Designed for Vietnam FTA management', vi: 'Thiết kế cho môi trường FTA Việt Nam' },
                body: {
                  ko: 'FTA 전문가와 시스템 전문가가 베트남의 FTA 원산지 관리 환경에 부합하도록 설계했습니다.',
                  en: 'The system was designed by FTA and system experts to fit Vietnam’s FTA origin management environment.',
                  vi: 'Hệ thống được thiết kế bởi chuyên gia FTA và chuyên gia phần mềm để phù hợp với môi trường quản lý xuất xứ FTA tại Việt Nam.',
                },
              },
              {
                title: { ko: 'FTA·GSP·일반 C/O 대응', en: 'FTA, GSP, and general C/O support', vi: 'Hỗ trợ FTA, GSP và C/O thông thường' },
                body: {
                  ko: '베트남의 모든 FTA는 물론 GSP와 일반 C/O 발급을 위한 원산지 판정 및 서류 출력이 가능합니다.',
                  en: 'KORD FTA can determine origin and print documents for all Vietnam FTAs, GSP, and general C/O issuance.',
                  vi: 'KORD FTA có thể xác định xuất xứ và in chứng từ cho các FTA của Việt Nam, GSP và C/O thông thường.',
                },
              },
              {
                title: { ko: '사후 검증 리스크 대응', en: 'Post-verification risk response', vi: 'Ứng phó rủi ro kiểm tra sau thông quan' },
                body: {
                  ko: '체계적인 분석을 통한 정밀한 원산지 판정과 증빙 서류 보관 기능으로 글로벌 사후 검증 리스크에 선제적으로 대응합니다.',
                  en: 'Precise origin determination and structured supporting-document storage help businesses proactively respond to global verification risks.',
                  vi: 'Hệ thống hỗ trợ xác định xuất xứ chính xác và quản lý chứng từ chứng minh, giúp doanh nghiệp chủ động ứng phó rủi ro xác minh xuất xứ.',
                },
              },
            ],
          },
          {
            title: { ko: '시스템 기초와 운영', en: 'System basis and operation', vi: 'Nền tảng và vận hành hệ thống' },
            summary: {
              ko: '원문 자료의 시스템 기초 및 운영 항목을 기반으로, 회계정보와 원산지 판정 로직을 연결하는 원산지 관리 흐름을 제공합니다.',
              en: 'Based on the system basis and operation framework in the source material, KORD FTA connects accounting data with origin determination workflows.',
              vi: 'Dựa trên nền tảng và phương thức vận hành trong tài liệu, KORD FTA kết nối dữ liệu kế toán với quy trình xác định xuất xứ.',
            },
            items: [
              {
                title: { ko: '회계정보 기반 판정', en: 'Accounting-data-based determination', vi: 'Xác định dựa trên dữ liệu kế toán' },
                body: {
                  ko: '회사의 회계정보를 활용해 수출·판매물품의 원산지 판정과 C/O 관련 서류 관리를 지원합니다.',
                  en: 'The system uses company accounting information to support origin determination and C/O-related document management.',
                  vi: 'Hệ thống sử dụng dữ liệu kế toán của doanh nghiệp để hỗ trợ xác định xuất xứ và quản lý chứng từ C/O.',
                },
              },
              {
                title: { ko: 'KORD FTA Benefit', en: 'KORD FTA benefit', vi: 'Lợi ích KORD FTA' },
                body: {
                  ko: '정밀한 판정, 증빙 보관, 사후검증 대응을 통해 원산지 관리 업무의 정확성과 안정성을 높입니다.',
                  en: 'Precise determination, evidence storage, and verification readiness improve the accuracy and stability of origin management.',
                  vi: 'Xác định chính xác, lưu trữ chứng từ và chuẩn bị kiểm tra giúp nâng cao độ chính xác, ổn định của quản lý xuất xứ.',
                },
              },
            ],
          },
        ],
        details: [
          { ko: '원산지 판정 및 증빙 관리', en: 'Origin determination and evidence management', vi: 'Xác định xuất xứ và quản lý chứng từ' },
          { ko: 'FTA 업무 이력 관리', en: 'FTA workflow history management', vi: 'Quản lý lịch sử nghiệp vụ FTA' },
        ],
      },
      {
        id: 'kord-liq',
        title: 'KORD LIQ',
        summary: {
          ko: '통관 수량과 회계 재고의 차이를 정밀 분석하여 예상 관세 리스크 금액을 실시간으로 산출하고 수책보고서를 자동 생성합니다.',
          en: 'KORD LIQ analyzes gaps between customs clearance volumes and accounting inventory, calculates estimated customs risk amounts in real time, and generates liquidation documents.',
          vi: 'KORD LIQ phân tích chênh lệch giữa số liệu thông quan và tồn kho kế toán, tính toán rủi ro hải quan ước tính theo thời gian thực và tự động tạo hồ sơ quyết toán.',
        },
        image: '/it-systems/liq/liq-dashboard.png',
        manager: '신종호 법인장, 김선웅 관세사, Phung Ngoc Ha, Phạm Ngọc Thảo Ly',
        team: { ko: 'KORD LIQ 담당팀', en: 'KORD LIQ Team', vi: 'Đội phụ trách KORD LIQ' },
        sections: [
          {
            title: { ko: 'KORD LIQ 개요', en: 'KORD LIQ overview', vi: 'Tổng quan KORD LIQ' },
            summary: {
              ko: '회사의 회계정보와 수출입통관 정보를 토대로 관세 면세 또는 관세 유보 자재의 재고와 수책보고를 관리하는 시스템입니다.',
              en: 'KORD LIQ manages liquidation and inventory for duty-exempt or tariff-reserved materials based on accounting and import-export customs clearance information.',
              vi: 'KORD LIQ quản lý báo cáo quyết toán và tồn kho hàng miễn thuế dựa trên dữ liệu kế toán và dữ liệu xuất nhập khẩu của doanh nghiệp.',
            },
            items: [
              {
                title: { ko: '베트남 수책 규정 기반 설계', en: 'Built for Vietnam liquidation regulations', vi: 'Xây dựng theo quy định quyết toán Việt Nam' },
                body: {
                  ko: '베트남 관세 전문가와 시스템 전문가가 베트남의 관세 면세 재고관리 및 수책 규정과 실무를 바탕으로 구축했습니다.',
                  en: 'The system was built by Vietnamese customs and system experts based on Vietnam’s customs exemption liquidation regulations and practices.',
                  vi: 'Hệ thống được xây dựng bởi chuyên gia hải quan Việt Nam và chuyên gia phần mềm dựa trên quy định, kinh nghiệm thực tế về báo cáo quyết toán.',
                },
              },
              {
                title: { ko: '관세 리스크 실시간 산출', en: 'Real-time customs risk calculation', vi: 'Tính toán rủi ro hải quan theo thời gian thực' },
                body: {
                  ko: '통관 수량과 회계 재고의 격차를 정밀 분석하여 예상 관세 리스크 금액을 실시간으로 산출합니다.',
                  en: 'By precisely analyzing gaps between customs clearance volumes and accounting inventory, KORD LIQ calculates estimated customs risk amounts in real time.',
                  vi: 'Thông qua phân tích chênh lệch giữa số liệu thông quan và tồn kho kế toán, hệ thống tính toán giá trị rủi ro hải quan ước tính theo thời gian thực.',
                },
              },
              {
                title: { ko: '수책보고서 자동 생성', en: 'Automated liquidation report generation', vi: 'Tự động tạo hồ sơ quyết toán' },
                body: {
                  ko: '세관 제출용 재고 결산 서류인 수책보고서를 자동 생성하여 잠재적인 과세 위험에 선제적으로 대응합니다.',
                  en: 'The system automatically generates inventory reconciliation documents for customs submission to proactively defend against potential taxation risks.',
                  vi: 'Hệ thống tự động tạo hồ sơ đối chiếu tồn kho để nộp cơ quan hải quan, giúp doanh nghiệp chủ động phòng ngừa rủi ro bị ấn định thuế.',
                },
              },
            ],
          },
          {
            title: { ko: '운영 방식', en: 'How to operate', vi: 'Phương thức vận hành' },
            summary: {
              ko: '원문 자료의 운영 항목을 기준으로, 회계정보와 수출입통관 정보를 연결해 면세 자재 재고와 수책보고 흐름을 관리합니다.',
              en: 'Based on the operation framework in the source material, KORD LIQ connects accounting and customs clearance data to manage duty-exempt inventory and liquidation reporting.',
              vi: 'Dựa trên phương thức vận hành trong tài liệu, KORD LIQ kết nối dữ liệu kế toán và thông quan để quản lý tồn kho miễn thuế và báo cáo quyết toán.',
            },
            items: [
              {
                title: { ko: '회계·통관 데이터 연결', en: 'Accounting and customs data linkage', vi: 'Liên kết dữ liệu kế toán và hải quan' },
                body: {
                  ko: '기업의 회계정보와 수출입통관 정보를 기반으로 관세 면세 자재의 재고 흐름을 추적합니다.',
                  en: 'The system tracks duty-exempt material inventory flows using company accounting information and import-export clearance data.',
                  vi: 'Hệ thống theo dõi luồng tồn kho nguyên liệu miễn thuế dựa trên dữ liệu kế toán và dữ liệu thông quan xuất nhập khẩu.',
                },
              },
              {
                title: { ko: '잠재 리스크 선제 방어', en: 'Proactive risk prevention', vi: 'Chủ động phòng ngừa rủi ro' },
                body: {
                  ko: '통관 수량과 회계 재고 간 차이를 사전에 확인해 과세 리스크를 조기에 파악하고 대응할 수 있도록 지원합니다.',
                  en: 'By identifying gaps between customs volumes and accounting inventory in advance, the system helps detect and respond to tax risks early.',
                  vi: 'Thông qua phát hiện sớm chênh lệch giữa số liệu thông quan và tồn kho kế toán, hệ thống hỗ trợ nhận diện và xử lý rủi ro thuế.',
                },
              },
            ],
          },
        ],
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
