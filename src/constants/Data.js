// export type JobStatus = 'boarding' | 'final-call';

import { FileText, Stamp, GraduationCap, HeartPulse, MessagesSquare, Plane } from 'lucide-react';

export const jobs = [
  {
    role: 'Electrician',
    detail: 'Industrial maintenance',
    country: 'United Arab Emirates',
    city: 'Sharjah',
    salaryDisplay: 'AED 2,800–3,400',
    salaryCurrency: 'AED',
    salaryMin: 2800,
    salaryMax: 3400,
    openings: 14,
    status: 'boarding',
  },
  {
    role: 'Registered Nurse',
    detail: 'General ward, 2yr exp.',
    country: 'Qatar',
    city: 'Doha',
    salaryDisplay: 'QAR 4,200–5,000',
    salaryCurrency: 'QAR',
    salaryMin: 4200,
    salaryMax: 5000,
    openings: 8,
    status: 'boarding',
  },
  {
    role: 'CNC Machinist',
    detail: 'Precision tooling',
    country: 'Germany',
    city: 'Stuttgart',
    salaryDisplay: '€ 2,600–3,100',
    salaryCurrency: 'EUR',
    salaryMin: 2600,
    salaryMax: 3100,
    openings: 6,
    status: 'final-call',
  },
  {
    role: 'Hotel Steward',
    detail: '5-star hospitality',
    country: 'Saudi Arabia',
    city: 'Jeddah',
    salaryDisplay: 'SAR 2,100–2,500',
    salaryCurrency: 'SAR',
    salaryMin: 2100,
    salaryMax: 2500,
    openings: 22,
    status: 'boarding',
  },
  {
    role: 'Welder (6G)',
    detail: 'Pipeline fabrication',
    country: 'Kuwait',
    city: 'Ahmadi',
    salaryDisplay: 'KWD 280–330',
    salaryCurrency: 'KWD',
    salaryMin: 280,
    salaryMax: 330,
    openings: 11,
    status: 'boarding',
  },
];

export const countries = [
  {
    code: 'UAE',
    name: 'United Arab Emirates',
    color: '#1F7A6C',
    roles: 'Construction, hospitality, healthcare, technical trades',
    roleCount: '118 roles',
    salaryRange: 'AED 2.5K–6K',
    link: 'countries/uae',
  },
  {
    code: 'KSA',
    name: 'Saudi Arabia',
    color: '#8B4B2B',
    roles: 'Facilities management, retail, industrial, logistics',
    roleCount: '96 roles',
    salaryRange: 'SAR 2K–5K',
    link: 'countries/saudi-arabia',
  },
  {
    code: 'QAT',
    name: 'Qatar',
    color: '#2C4A7C',
    roles: 'Healthcare, engineering, aviation ground services',
    roleCount: '52 roles',
    salaryRange: 'QAR 1.5K–5K',
    link: 'countries/qatar',
  },
  {
    code: 'OM',
    name: 'Oman',
    color: '#B9862B',
    roles: 'Skilled trades, elder care, logistics, hospitality',
    roleCount: '34 roles',
    salaryRange: 'OMR 1K–3K',
    link: 'countries/oman',
  },
];

export const serviceList = [
  {
    title: 'Resume Building',
    description: 'Employer-ready CVs formatted to the standards of each destination market.',
    logo: FileText,
  },
  {
    title: 'Visa & Documentation',
    description: 'End-to-end filing, embassy coordination, and status tracking on your dashboard.',
    logo: Stamp,
  },
  {
    title: 'Training & Certification',
    description: 'Skill-upgrade and trade-test prep aligned to destination country requirements.',
    logo: GraduationCap,
  },
  {
    title: 'Medical Coordination',
    description: 'Scheduling with approved medical centres and fitness-certificate follow-up.',
    logo: HeartPulse,
  },
  {
    title: 'Interview Coaching',
    description: "Mock interviews with recruiters familiar with each employer's process.",
    logo: MessagesSquare,
  },
  {
    title: 'Travel Assistance',
    description: 'Flight booking, pre-departure briefing, and airport pickup on arrival.',
    logo: Plane,
  },
];

export const reviews = [
  {
    quote:
      'Alzareen International handled my visa paperwork while I kept working my old job. By the time I landed in Dubai, my employer already had my accommodation sorted.',
    name: 'Rakesh Patil',
    role: 'HVAC Technician · UAE',
    initial: 'R',
  },
  {
    quote:
      'The mock interviews made the real one feel easy. I knew exactly what the hospital in Doha would ask before I ever spoke to them.',
    name: 'Sunita Rawat',
    role: 'Registered Nurse · Qatar',
    initial: 'S',
  },
  {
    quote:
      'I applied for a welding role and ended up with three offers to compare. My counsellor never pushed me toward the one with the highest commission.',
    name: 'Manoj Kumar',
    role: 'Welder (6G) · Kuwait',
    initial: 'M',
  },
];

export const articles = [
  {
    tag: 'Visa Guide',
    title: 'UAE work visa, step by step: what to expect after your offer letter',
    description: 'Medical tests, Emirates ID, and the timeline you should plan around.',
    gradient: 'linear-gradient(135deg, var(--route), var(--ink))',
  },
  {
    tag: 'Salary Insights',
    title: 'What electricians actually earn in Saudi Arabia in 2026',
    description: 'A breakdown by experience level, city, and employer type.',
    gradient: 'linear-gradient(135deg,#B9862B,#1B1F27)',
  },
  {
    tag: 'Interview Tips',
    title: 'Six questions Gulf employers ask that Indian candidates miss',
    description: 'Notes from 200+ mock interviews run by our counselling team.',
    gradient: 'linear-gradient(135deg,#1F7A6C,#131B34)',
  },
];
