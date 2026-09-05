// constants/RecruitmentDriveData.js

export const recruitmentDrives = [
  {
    id: 1,
    slug: 'emaar-dubai-mega-hiring',
    title: 'Emaar Dubai Mega Recruitment Drive',
    country: 'United Arab Emirates',
    city: 'Dubai',
    industry: 'Construction',
    summary:
      'Urgent hiring for AC Technicians, Electricians, Helpers, Plumbers, Masons and Steel Fixers for multiple Emaar construction projects in Dubai.',
    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',
    vacancies: 275,
    positions: 8,
    postedDaysAgo: 4,

    vacancyBreakdown: [
      {
        role: 'AC Technician',
        count: 45,
        salaryDisplay: 'AED 1,800 – 2,200/mo',
        link: '/job-listing/ac-technician-dubai',
      },
      {
        role: 'Electrician',
        count: 60,
        salaryDisplay: 'AED 1,900 – 2,400/mo',
        link: '/job-listing/electrician-dubai',
      },
      {
        role: 'Plumber',
        count: 40,
        salaryDisplay: 'AED 1,700 – 2,100/mo',
        link: '/job-listing/plumber-dubai',
      },
      {
        role: 'Mason',
        count: 50,
        salaryDisplay: 'AED 1,600 – 2,000/mo',
        link: '/job-listing/mason-dubai',
      },
      {
        role: 'Steel Fixer',
        count: 35,
        salaryDisplay: 'AED 1,700 – 2,100/mo',
        link: '/job-listing/steel-fixer-dubai',
      },
      {
        role: 'Helper',
        count: 45,
        salaryDisplay: 'AED 1,200 – 1,500/mo',
        link: '/job-listing/helper-dubai',
      },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
    importantNote: [
      'Candidates must be available for immediate joining.',
      'All selected candidates will undergo a mandatory medical examination before deployment.',
      'Accommodation and transportation will be provided by the employer.',
    ],
  },

  {
    id: 2,
    slug: 'aramco-facility-management-saudi',
    title: 'Saudi Aramco Facility Management Hiring',
    country: 'Saudi Arabia',
    industry: 'Facilities Management',
    summary:
      'Hiring HVAC Technicians, Electricians, BMS Operators, Plumbers and Maintenance Helpers for long-term facility projects.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 180,
    positions: 6,
    postedDaysAgo: 7,

    vacancyBreakdown: [
      { role: 'HVAC Technician', count: 40, salaryDisplay: 'SAR 2,200 – 2,800/mo' },
      { role: 'Electrician', count: 35, salaryDisplay: 'SAR 2,100 – 2,600/mo' },
      { role: 'BMS Operator', count: 25, salaryDisplay: 'SAR 2,500 – 3,000/mo' },
      { role: 'Plumber', count: 30, salaryDisplay: 'SAR 2,000 – 2,400/mo' },
      { role: 'Maintenance Helper', count: 50, salaryDisplay: 'SAR 1,600 – 1,900/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },

  {
    id: 3,
    slug: 'qatar-hospitality-hiring',
    title: 'Qatar Hospitality Recruitment Campaign',
    country: 'Qatar',
    industry: 'Hospitality',
    summary:
      'Hotels and resorts across Doha are hiring Waiters, Housekeeping Staff, Receptionists and Kitchen Assistants.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 120,
    positions: 5,
    postedDaysAgo: 2,

    vacancyBreakdown: [
      { role: 'Waiter', count: 30, salaryDisplay: 'QAR 1,800 – 2,200/mo' },
      { role: 'Housekeeping Staff', count: 35, salaryDisplay: 'QAR 1,600 – 1,900/mo' },
      { role: 'Receptionist', count: 20, salaryDisplay: 'QAR 2,200 – 2,600/mo' },
      { role: 'Kitchen Assistant', count: 25, salaryDisplay: 'QAR 1,700 – 2,000/mo' },
      { role: 'Bellboy', count: 10, salaryDisplay: 'QAR 1,500 – 1,800/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },

  {
    id: 4,
    slug: 'kuwait-oil-gas-project',
    title: 'Kuwait Oil & Gas Project Recruitment',
    country: 'Kuwait',
    industry: 'Oil & Gas',
    summary: 'Multiple openings for Welders, Pipe Fitters, Fabricators and Mechanical Technicians.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 210,
    positions: 7,
    postedDaysAgo: 12,

    vacancyBreakdown: [
      { role: 'Welder (6G)', count: 50, salaryDisplay: 'KWD 220 – 280/mo' },
      { role: 'Pipe Fitter', count: 45, salaryDisplay: 'KWD 200 – 260/mo' },
      { role: 'Fabricator', count: 40, salaryDisplay: 'KWD 210 – 270/mo' },
      { role: 'Mechanical Technician', count: 35, salaryDisplay: 'KWD 230 – 290/mo' },
      { role: 'Rigger', count: 25, salaryDisplay: 'KWD 190 – 240/mo' },
      { role: 'Helper', count: 15, salaryDisplay: 'KWD 130 – 160/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },

  {
    id: 5,
    slug: 'oman-logistics-warehouse-jobs',
    title: 'Oman Logistics & Warehousing Hiring',
    country: 'Oman',
    industry: 'Logistics',
    summary:
      'Warehouse Assistants, Forklift Operators, Storekeepers and Inventory Controllers required immediately.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 95,
    positions: 4,
    postedDaysAgo: 9,

    vacancyBreakdown: [
      { role: 'Forklift Operator', count: 25, salaryDisplay: 'OMR 220 – 260/mo' },
      { role: 'Warehouse Assistant', count: 35, salaryDisplay: 'OMR 160 – 190/mo' },
      { role: 'Storekeeper', count: 20, salaryDisplay: 'OMR 200 – 240/mo' },
      { role: 'Inventory Controller', count: 15, salaryDisplay: 'OMR 230 – 270/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },

  {
    id: 6,
    slug: 'germany-skilled-workers-drive',
    title: 'Germany Skilled Workers Recruitment',
    country: 'Germany',
    industry: 'Manufacturing',
    summary:
      'Opportunities for CNC Operators, Welders, Maintenance Technicians and Manufacturing Assistants.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 65,
    positions: 5,
    postedDaysAgo: 15,

    vacancyBreakdown: [
      { role: 'CNC Operator', count: 15, salaryDisplay: '€2,200 – 2,600/mo' },
      { role: 'Welder', count: 15, salaryDisplay: '€2,100 – 2,500/mo' },
      { role: 'Maintenance Technician', count: 15, salaryDisplay: '€2,300 – 2,700/mo' },
      { role: 'Manufacturing Assistant', count: 12, salaryDisplay: '€1,900 – 2,200/mo' },
      { role: 'Quality Inspector', count: 8, salaryDisplay: '€2,000 – 2,400/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },

  {
    id: 7,
    slug: 'poland-factory-workers-hiring',
    title: 'Poland Factory Workers Hiring',
    country: 'Poland',
    industry: 'Manufacturing',
    summary:
      'Food processing plants and packaging facilities recruiting production workers and machine operators.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 140,
    positions: 6,
    postedDaysAgo: 22,

    vacancyBreakdown: [
      { role: 'Production Worker', count: 45, salaryDisplay: 'PLN 3,800 – 4,300/mo' },
      { role: 'Machine Operator', count: 35, salaryDisplay: 'PLN 4,000 – 4,500/mo' },
      { role: 'Packaging Assistant', count: 30, salaryDisplay: 'PLN 3,600 – 4,000/mo' },
      { role: 'Quality Checker', count: 15, salaryDisplay: 'PLN 3,900 – 4,300/mo' },
      { role: 'Forklift Operator', count: 10, salaryDisplay: 'PLN 4,100 – 4,600/mo' },
      { role: 'Supervisor', count: 5, salaryDisplay: 'PLN 5,000 – 5,600/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },

  {
    id: 8,
    slug: 'malaysia-electronics-industry',
    title: 'Malaysia Electronics Industry Recruitment',
    country: 'Malaysia',
    industry: 'Electronics',
    summary:
      'Large manufacturing employers seeking assembly workers, quality inspectors and technicians.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 160,
    positions: 5,
    postedDaysAgo: 5,

    vacancyBreakdown: [
      { role: 'Assembly Worker', count: 60, salaryDisplay: 'MYR 1,600 – 1,900/mo' },
      { role: 'Quality Inspector', count: 30, salaryDisplay: 'MYR 1,900 – 2,200/mo' },
      { role: 'Machine Technician', count: 35, salaryDisplay: 'MYR 2,000 – 2,400/mo' },
      { role: 'Line Supervisor', count: 20, salaryDisplay: 'MYR 2,400 – 2,800/mo' },
      { role: 'Packing Staff', count: 15, salaryDisplay: 'MYR 1,500 – 1,800/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },

  {
    id: 9,
    slug: 'singapore-marine-yard-jobs',
    title: 'Singapore Marine & Shipyard Hiring',
    country: 'Singapore',
    industry: 'Marine',
    summary: 'Urgent requirement for Welders, Pipe Fabricators, Electricians and Supervisors.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 75,
    positions: 4,
    postedDaysAgo: 28,

    vacancyBreakdown: [
      { role: 'Welder', count: 25, salaryDisplay: 'SGD 1,800 – 2,200/mo' },
      { role: 'Pipe Fabricator', count: 20, salaryDisplay: 'SGD 1,900 – 2,300/mo' },
      { role: 'Electrician', count: 20, salaryDisplay: 'SGD 2,000 – 2,400/mo' },
      { role: 'Supervisor', count: 10, salaryDisplay: 'SGD 2,600 – 3,100/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },

  {
    id: 10,
    slug: 'neom-project-hiring-saudi',
    title: 'NEOM Project Mega Recruitment',
    country: 'Saudi Arabia',
    industry: 'Construction',
    summary:
      'Large-scale hiring for the NEOM development project including civil, electrical and mechanical trades.',

    poster: 'https://placehold.co/800x500/131B34/FFFFFF?text=Dubai+Construction+Jobs',

    vacancies: 450,
    positions: 12,
    postedDaysAgo: 1,

    vacancyBreakdown: [
      { role: 'Civil Engineer', count: 30, salaryDisplay: 'SAR 6,000 – 8,000/mo' },
      { role: 'Electrical Engineer', count: 25, salaryDisplay: 'SAR 6,500 – 8,500/mo' },
      { role: 'Mechanical Technician', count: 60, salaryDisplay: 'SAR 2,800 – 3,400/mo' },
      { role: 'Crane Operator', count: 35, salaryDisplay: 'SAR 3,000 – 3,600/mo' },
      { role: 'Electrician', count: 70, salaryDisplay: 'SAR 2,200 – 2,700/mo' },
      { role: 'Steel Fixer', count: 60, salaryDisplay: 'SAR 2,000 – 2,400/mo' },
      { role: 'Mason', count: 55, salaryDisplay: 'SAR 1,900 – 2,300/mo' },
      { role: 'Carpenter', count: 45, salaryDisplay: 'SAR 1,900 – 2,300/mo' },
      { role: 'Safety Officer', count: 20, salaryDisplay: 'SAR 3,500 – 4,200/mo' },
      { role: 'Surveyor', count: 15, salaryDisplay: 'SAR 3,200 – 3,900/mo' },
      { role: 'Helper', count: 25, salaryDisplay: 'SAR 1,400 – 1,700/mo' },
      { role: 'Storekeeper', count: 10, salaryDisplay: 'SAR 2,200 – 2,600/mo' },
    ],
    eligibility: [
      'Minimum 2 years relevant trade experience',
      'Valid passport with at least 18 months validity',
      'Basic English communication skills',
      'Age between 21 and 45 years',
      'Trade test certificate preferred but not mandatory',
    ],

    documentsRequired: [
      'Original passport + 2 photocopies',
      'Recent passport-size photographs (white background)',
      'Educational and trade certificates',
      'Previous experience/relieving letters',
      'Medical fitness certificate (if available)',
    ],
  },
];

/**
 * Look up a single drive by its slug — used by the detail page's
 * generateStaticParams / generateMetadata / page component.
 */
export function getDriveBySlug(slug) {
  return recruitmentDrives.find((d) => d.slug === slug) || null;
}

/**
 * Sanity check helper (optional) — confirms vacancyBreakdown counts add
 * up to the top-level `vacancies` figure, so stale data doesn't silently
 * drift. Not used at runtime; run manually if you edit the data by hand.
 */
export function validateVacancyTotals() {
  return recruitmentDrives
    .map((d) => {
      const sum = d.vacancyBreakdown.reduce((acc, v) => acc + v.count, 0);
      return { slug: d.slug, declared: d.vacancies, sum, matches: sum === d.vacancies };
    })
    .filter((r) => !r.matches);
}

const DEFAULT_ELIGIBILITY = [
  'Minimum 1–2 years relevant trade or industry experience',
  'Valid passport with at least 18 months validity',
  'Basic English communication skills',
  'Age between 21 and 45 years',
];

const DEFAULT_DOCUMENTS = [
  'Original passport + 2 photocopies',
  'Recent passport-size photographs (white background)',
  'Educational and trade certificates',
  'Previous experience/relieving letters',
  'Medical fitness certificate (if available)',
];
