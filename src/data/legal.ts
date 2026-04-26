import type { LegalPageContent } from '../types/site';

export const legalPages: Record<LegalPageContent['id'], LegalPageContent> = {
  terms: {
    id: 'terms',
    title: '서비스 이용약관',
    titleEn: 'Terms of Service',
    summary:
      '신한관세법인 웹사이트는 회사 소개와 서비스 안내를 위한 정보 제공 채널입니다. 본 페이지는 사이트 이용 기준, 정보 활용 범위, 책임 제한, 문의 원칙을 안내합니다.',
    summaryEn:
      'The Shinhan Customs Service website is an informational channel for introducing the firm and its services. This page outlines site usage standards, permitted use of information, limitations of liability, and contact principles.',
    sections: [
      {
        title: '서비스의 목적',
        titleEn: 'Purpose of the Service',
        paragraphs: [
          '본 웹사이트는 신한관세법인과 그 서비스, 업무 분야, 소식 및 채용 정보를 일반적으로 안내하기 위한 목적으로 운영됩니다.',
          '웹사이트에 게시된 자료는 이용자의 이해를 돕기 위한 일반 정보이며, 개별 사안에 대한 법률적·세무적·관세 실무 자문 또는 확정적 견해를 제공하기 위한 것은 아닙니다.',
        ],
        paragraphsEn: [
          'This website is operated to provide general information about Shinhan Customs Service, its services, practice areas, news, and recruitment information.',
          'Materials published on the website are intended as general information to assist users and are not meant to provide legal, tax, or customs advice or a definitive opinion on any specific matter.',
        ],
      },
      {
        title: '이용자의 이용 원칙',
        titleEn: 'User Responsibilities',
        paragraphs: [
          '이용자는 본 웹사이트를 관련 법령, 공공질서 및 선량한 풍속에 반하지 않는 범위에서 이용하여야 합니다.',
          '웹사이트의 정상적인 운영을 방해하거나, 허위 정보 입력, 무단 접근, 악성 코드 유포 등 타인 또는 회사에 손해를 줄 수 있는 행위는 금지됩니다.',
        ],
        paragraphsEn: [
          'Users must use this website in compliance with applicable laws and regulations and in a manner consistent with public order and good morals.',
          'Any act that interferes with the normal operation of the website or may cause harm to others or the firm, including entering false information, unauthorized access, or distributing malicious code, is prohibited.',
        ],
        bullets: [
          '웹사이트 정보의 상업적 무단 활용 금지',
          '자동화된 수단을 통한 비정상적 접근 금지',
          '회사 또는 제3자의 권리를 침해하는 행위 금지',
        ],
        bulletsEn: [
          'No unauthorized commercial use of website information',
          'No abnormal access through automated means',
          'No infringement of the rights of the firm or third parties',
        ],
      },
      {
        title: '정보 이용과 책임 제한',
        titleEn: 'Use of Information and Limitation of Liability',
        paragraphs: [
          '신한관세법인은 웹사이트에 게시되는 정보의 정확성과 최신성을 유지하기 위해 노력하지만, 모든 정보의 완전성, 적시성 또는 특정 목적 적합성을 보증하지는 않습니다.',
          '이용자가 본 웹사이트의 게시 내용만을 기초로 의사결정 또는 조치를 취함으로써 발생하는 직·간접적 손해에 대하여 신한관세법인은 관련 법령상 허용되는 범위 내에서 책임을 부담하지 않습니다.',
          '구체적인 업무 진행이나 법적 판단이 필요한 경우에는 반드시 별도의 상담 또는 자문 절차를 통해 사실관계를 확인하시기 바랍니다.',
        ],
        paragraphsEn: [
          'Shinhan Customs Service strives to keep the information on the website accurate and up to date, but does not guarantee completeness, timeliness, or fitness for a particular purpose.',
          'To the extent permitted by applicable law, Shinhan Customs Service shall not be liable for any direct or indirect loss arising from decisions or actions taken solely on the basis of information posted on this website.',
          'If a specific engagement or legal judgment is required, please confirm the facts through a separate consultation or advisory process.',
        ],
      },
      {
        title: '저작권 및 콘텐츠 사용',
        titleEn: 'Copyright and Content Use',
        paragraphs: [
          '본 웹사이트에 게시된 텍스트, 이미지, 디자인, 편집물 및 기타 자료에 관한 권리는 별도 표시가 없는 한 신한관세법인 또는 정당한 권리자에게 있습니다.',
          '회사의 사전 서면 동의 없이 자료를 복제, 배포, 전송, 전시, 2차적 저작물 작성 등으로 이용할 수 없습니다.',
        ],
        paragraphsEn: [
          'Unless otherwise indicated, the rights to the text, images, designs, compilations, and other materials posted on this website belong to Shinhan Customs Service or the relevant rights holders.',
          'Without prior written consent from the firm, the materials may not be copied, distributed, transmitted, displayed, or used to create derivative works.',
        ],
      },
      {
        title: '문의 및 변경',
        titleEn: 'Contact and Changes',
        paragraphs: [
          '본 이용약관의 내용은 웹사이트 운영 정책 또는 관계 법령의 변경에 따라 조정될 수 있으며, 변경 시 본 페이지를 통해 반영됩니다.',
          '웹사이트 이용과 관련한 문의는 대표 연락처 또는 문의 페이지를 통해 접수하실 수 있습니다.',
        ],
        paragraphsEn: [
          'These terms may be revised in accordance with changes in website operating policies or applicable laws, and any revision will be reflected on this page.',
          'Questions regarding the use of the website may be submitted through the main contact channels or the contact page.',
        ],
      },
    ],
  },
  privacy: {
    id: 'privacy',
    title: '개인정보처리방침',
    titleEn: 'Privacy Policy',
    summary:
      '신한관세법인은 웹사이트 이용 과정에서 제공되거나 생성되는 개인정보를 관련 법령과 내부 기준에 따라 처리합니다. 본 방침은 수집 항목, 처리 목적, 보유 기간, 이용자 권리를 안내합니다.',
    summaryEn:
      'Shinhan Customs Service processes personal information provided or generated through use of the website in accordance with applicable laws and internal standards. This policy explains the categories collected, purposes of processing, retention periods, and user rights.',
    sections: [
      {
        title: '수집하는 개인정보 항목',
        titleEn: 'Categories of Personal Information Collected',
        paragraphs: [
          '회사는 문의 접수, 상담 요청, 채용 지원 또는 서비스 안내 과정에서 이름, 연락처, 이메일 주소, 회사명, 직책, 문의 내용 등 이용자가 직접 제공한 정보를 수집할 수 있습니다.',
          '서비스 안정성 확보와 방문 통계 확인을 위해 접속 일시, 브라우저 정보, IP 주소, 이용 기록 등 기술적 정보가 자동으로 생성·수집될 수 있습니다.',
        ],
        paragraphsEn: [
          'The firm may collect information directly provided by users in connection with inquiries, consultation requests, recruitment applications, or service guidance, including name, contact details, email address, company name, title, and inquiry details.',
          'For service stability and visitor statistics, technical information such as access time, browser information, IP address, and usage history may be automatically generated and collected.',
        ],
      },
      {
        title: '개인정보의 처리 목적',
        titleEn: 'Purposes of Processing',
        paragraphs: [
          '수집된 개인정보는 문의 대응, 상담 진행, 서비스 안내, 요청사항 처리, 채용 검토, 관계 법령상 의무 이행, 서비스 품질 개선을 위하여 사용됩니다.',
        ],
        paragraphsEn: [
          'Collected personal information is used to respond to inquiries, conduct consultations, provide service guidance, process requests, review recruitment applications, comply with legal obligations, and improve service quality.',
        ],
        bullets: [
          '문의 내용 확인 및 회신',
          '서비스 제공 또는 상담 일정 조율',
          '채용 지원자의 검토 및 결과 안내',
          '웹사이트 운영 안정성 및 이용 통계 분석',
        ],
        bulletsEn: [
          'Verifying and responding to inquiries',
          'Providing services or coordinating consultation schedules',
          'Reviewing applicants and communicating recruitment results',
          'Analyzing website stability and usage statistics',
        ],
      },
      {
        title: '보유 및 이용 기간',
        titleEn: 'Retention and Use Period',
        paragraphs: [
          '개인정보는 수집·이용 목적이 달성될 때까지 보유하며, 목적 달성 후에는 지체 없이 파기하는 것을 원칙으로 합니다.',
          '다만 관계 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 법령이 정한 기간 동안 보관 후 파기합니다.',
        ],
        paragraphsEn: [
          'Personal information is retained until the purpose of collection and use has been fulfilled and is then destroyed without undue delay as a general rule.',
          'However, if retention is required by applicable law, the information will be kept for the period prescribed by that law and then destroyed.',
        ],
      },
      {
        title: '제3자 제공 및 처리 위탁',
        titleEn: 'Third-Party Provision and Outsourcing',
        paragraphs: [
          '회사는 원칙적으로 정보주체의 개인정보를 외부에 제공하지 않으며, 법령상 근거가 있거나 정보주체의 동의가 있는 경우에 한하여 필요한 범위에서 제공할 수 있습니다.',
          '웹사이트 운영, 호스팅, 유지보수, 문의 관리 등 업무 수행을 위해 필요한 경우에는 적절한 보호조치를 전제로 관련 업무를 외부 전문업체에 위탁할 수 있습니다.',
        ],
        paragraphsEn: [
          'As a general rule, the firm does not provide personal information to third parties, except where there is a legal basis or the data subject has given consent, and only to the extent necessary.',
          'Where necessary for website operation, hosting, maintenance, or inquiry management, related tasks may be outsourced to specialized service providers subject to appropriate safeguards.',
        ],
      },
      {
        title: '정보주체의 권리와 행사 방법',
        titleEn: 'Rights of Data Subjects and How to Exercise Them',
        paragraphs: [
          '이용자는 자신의 개인정보에 대하여 열람, 정정, 삭제, 처리정지 요청을 할 수 있으며, 동의에 기반한 처리의 경우 동의를 철회할 수 있습니다.',
          '권리 행사는 회사의 대표 이메일 또는 문의 채널을 통해 요청할 수 있으며, 회사는 관련 법령이 정하는 바에 따라 지체 없이 검토·조치합니다.',
        ],
        paragraphsEn: [
          'Users may request access to, correction of, deletion of, or suspension of processing of their personal information and may withdraw consent where processing is based on consent.',
          'Such requests may be made through the firm’s main email or inquiry channels, and the firm will review and respond without undue delay in accordance with applicable law.',
        ],
      },
      {
        title: '파기 및 보호 조치',
        titleEn: 'Destruction and Safeguards',
        paragraphs: [
          '개인정보는 처리 목적 달성 후 복구 또는 재생이 어렵도록 안전한 방법으로 파기합니다.',
          '회사는 접근 권한 관리, 보관 환경 통제, 전송 구간 보호, 내부 관리 절차 운영 등 합리적인 보호조치를 통해 개인정보를 관리합니다.',
        ],
        paragraphsEn: [
          'After the purpose of processing has been achieved, personal information is destroyed in a secure manner that makes recovery or restoration difficult.',
          'The firm manages personal information through reasonable safeguards such as access control, storage environment control, transmission protection, and internal administrative procedures.',
        ],
      },
    ],
  },
  'recruit-disclaimer': {
    id: 'recruit-disclaimer',
    title: '채용면책공고',
    titleEn: 'Recruitment Disclaimer',
    summary:
      '신한관세법인의 채용 정보와 지원 절차 관련 안내는 지원자의 이해를 돕기 위한 일반 정보입니다. 본 페이지는 채용 공고, 제출 자료, 심사 결과에 관한 기본 고지사항을 설명합니다.',
    summaryEn:
      'Information on recruitment opportunities and application procedures at Shinhan Customs Service is provided as general guidance for applicants. This page explains the basic notices related to recruitment postings, submitted materials, and review results.',
    sections: [
      {
        title: '채용 정보의 성격',
        titleEn: 'Nature of Recruitment Information',
        paragraphs: [
          '웹사이트 또는 채용 안내 페이지에 게시되는 모집 분야, 일정, 자격요건, 전형 절차 및 기타 정보는 일반적인 안내를 위한 것이며, 회사의 운영 상황과 채용 계획에 따라 변경 또는 종료될 수 있습니다.',
          '회사는 필요에 따라 공고 내용을 수정하거나 모집을 연기·중단할 수 있으며, 변경 사항은 회사가 정한 방식으로 공지합니다.',
        ],
        paragraphsEn: [
          'The recruitment fields, schedules, qualifications, hiring procedures, and other information posted on the website or recruitment pages are provided for general guidance and may be changed or discontinued depending on the firm’s operating conditions and hiring plans.',
          'The firm may revise announcement details or postpone or suspend recruitment as necessary, and any changes will be communicated in the manner determined by the firm.',
        ],
      },
      {
        title: '지원 자료와 사실 확인',
        titleEn: 'Application Materials and Verification',
        paragraphs: [
          '지원자는 제출하는 이력서, 자기소개서, 증빙서류 및 기타 자료의 내용이 사실과 일치하도록 작성하여야 합니다.',
          '허위 기재, 중요 사항 누락, 타인 명의 사용 또는 기타 부정한 방법이 확인되는 경우 전형 진행 중 또는 합격 이후라도 결과가 취소되거나 채용이 철회될 수 있습니다.',
        ],
        paragraphsEn: [
          'Applicants must ensure that resumes, personal statements, supporting documents, and other submitted materials accurately reflect the facts.',
          'If false statements, omission of material information, use of another person’s identity, or any other improper conduct is identified, the application result may be canceled or the offer withdrawn even after a hiring decision has been made.',
        ],
      },
      {
        title: '심사와 결과 통지',
        titleEn: 'Review and Notification of Results',
        paragraphs: [
          '전형 일정, 심사 기준, 평가 결과 및 최종 선발 여부는 회사의 내부 기준과 필요에 따라 결정됩니다.',
          '모든 지원자에게 개별적인 평가 사유 또는 내부 검토 내용을 공개하지 않을 수 있으며, 결과 통지 방식과 시점은 전형별 안내에 따릅니다.',
        ],
        paragraphsEn: [
          'Selection schedules, review standards, evaluation results, and final hiring decisions are determined according to the firm’s internal standards and operational needs.',
          'The firm may choose not to disclose individual evaluation reasons or internal review details to all applicants, and the method and timing of notification will follow the applicable recruitment guidance.',
        ],
      },
      {
        title: '제출 자료의 이용 범위',
        titleEn: 'Scope of Use of Submitted Materials',
        paragraphs: [
          '지원자가 제출한 자료는 채용 검토, 지원자 확인, 전형 운영, 향후 적합한 포지션 검토 등 채용 관련 목적 범위 내에서 이용될 수 있습니다.',
          '제출 자료의 보관 및 파기는 회사의 개인정보처리방침과 내부 보관 기준에 따라 처리됩니다.',
        ],
        paragraphsEn: [
          'Materials submitted by applicants may be used within the scope of recruitment-related purposes, including hiring review, applicant verification, operation of the recruitment process, and consideration for future suitable positions.',
          'Retention and destruction of submitted materials are handled in accordance with the firm’s privacy policy and internal retention standards.',
        ],
      },
    ],
  },
  'no-email-collection': {
    id: 'no-email-collection',
    title: '이메일무단수집거부',
    titleEn: 'No Unauthorized Email Collection',
    summary:
      '신한관세법인은 본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램 또는 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부합니다.',
    summaryEn:
      'Shinhan Customs Service prohibits the unauthorized collection of email addresses posted on this website by means of email harvesting programs or other technical devices.',
    sections: [
      {
        title: '무단 수집 금지',
        titleEn: 'Prohibition of Unauthorized Collection',
        paragraphs: [
          '본 웹사이트에 표시된 이메일 주소는 문의와 업무 연락을 위한 것이며, 자동 수집 프로그램이나 기술적 장치를 이용한 수집 대상이 아닙니다.',
          '이메일 주소를 무단으로 수집, 판매, 유통하거나 이를 이용하여 영리 목적의 광고성 정보를 발송하는 행위를 금지합니다.',
        ],
        paragraphsEn: [
          'Email addresses displayed on this website are provided for inquiries and business communication and are not intended to be collected by automated harvesting programs or technical devices.',
          'Unauthorized collection, sale, distribution, or use of such email addresses for sending commercial advertising information is prohibited.',
        ],
      },
      {
        title: '관련 법령 및 책임',
        titleEn: 'Applicable Laws and Responsibility',
        paragraphs: [
          '이와 같은 행위는 정보통신망 관련 법령 등 관계 법령에 위반될 수 있으며, 위반자에게는 민·형사상 책임이 부과될 수 있습니다.',
          '회사는 무단 수집 또는 스팸 발송 등 부당 이용이 확인되는 경우 관련 조치를 검토할 수 있습니다.',
        ],
        paragraphsEn: [
          'Such conduct may violate applicable laws, including laws relating to information and communications networks, and violators may be subject to civil or criminal liability.',
          'If unauthorized collection or abusive use such as spam distribution is identified, the firm may review and pursue appropriate measures.',
        ],
      },
    ],
  },
};
