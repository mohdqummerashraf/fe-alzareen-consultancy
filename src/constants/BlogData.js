export const posts = [
  {
    slug: 'uae-work-visa-step-by-step',
    title: 'UAE Work Visa, Step by Step: What to Expect After Your Offer Letter',
    excerpt:
      'Medical tests, Emirates ID, and the realistic timeline you should plan around once an employer confirms your role.',
    category: 'Visa Guide',
    author: 'Meera Iyer',
    authorRole: 'Head of Documentation & Compliance',
    publishedAt: '2026-06-02',
    updatedAt: '2026-07-10',
    readTimeMinutes: 6,
    coverImage: '/blog/uae-visa-guide.jpg',
    coverImageAlt: 'Passport and travel documents laid out on a desk',
    content: [
      {
        heading: 'After the offer letter',
        body: 'Once your employer confirms your offer, the visa process usually starts within a week. Your employer applies for an entry permit on your behalf, which is the first official step tying your travel to that specific job.',
      },
      {
        heading: 'The medical test',
        body: 'Before travel, you\u2019ll need to clear a medical fitness test at an approved centre — this checks for communicable diseases and is a standard requirement across all GCC destinations, not specific to any one employer.',
      },
      {
        heading: 'Emirates ID and labour card',
        body: 'After you land, your employer applies for your Emirates ID and labour card. This typically takes 2-3 weeks and is required before you can open a bank account or sign a residential lease.',
      },
      {
        heading: 'Realistic timeline',
        body: 'End to end, most candidates see 3-6 weeks between offer letter and landing in the UAE, though it can run faster for straightforward trade roles or slower during peak hiring seasons.',
      },
    ],
  },
  {
    slug: 'electrician-salary-saudi-arabia-2026',
    title: 'What Electricians Actually Earn in Saudi Arabia in 2026',
    excerpt:
      'A breakdown by experience level, city, and employer type — not just the headline salary range.',
    category: 'Salary Insights',
    author: 'Farhan Qureshi',
    authorRole: 'Head of Employer Relations',
    publishedAt: '2026-05-18',
    updatedAt: '2026-05-18',
    readTimeMinutes: 5,
    coverImage: '/blog/saudi-salary-insights.jpg',
    coverImageAlt: 'Electrician working on wiring at a construction site',
    content: [
      {
        heading: 'The headline range hides a lot',
        body: 'Job boards list SAR 2,000–5,000/month for electricians in Saudi Arabia, but that range collapses once you account for experience level and employer type.',
      },
      {
        heading: 'By experience',
        body: 'Entry-level electricians (0-2 years) typically land around SAR 2,000–2,600. With 3-5 years and a recognised trade certificate, that moves to SAR 2,800–3,600. Beyond 5 years with supervisory experience, SAR 4,000+ is realistic.',
      },
      {
        heading: 'By city',
        body: 'Riyadh and Jeddah roles tend to sit at the higher end of the range due to giga-project demand; Dammam and smaller industrial hubs run slightly lower but often come with lower accommodation costs too.',
      },
      {
        heading: 'What changes the number most',
        body: 'A recognised trade certificate and a clean employment history with prior GCC experience move candidates up a full salary band faster than years of experience alone.',
      },
    ],
  },
  {
    slug: 'gulf-interview-questions-candidates-miss',
    title: 'Six Questions Gulf Employers Ask That Indian Candidates Miss',
    excerpt:
      'Notes from 200+ mock interviews run by our counselling team — the questions that trip people up most.',
    category: 'Interview Tips',
    author: 'Thomas Abraham',
    authorRole: 'Head of Training',
    publishedAt: '2026-04-22',
    updatedAt: '2026-06-01',
    readTimeMinutes: 7,
    coverImage: '/blog/interview-tips.jpg',
    coverImageAlt: 'Two people in a job interview across a desk',
    content: [
      {
        heading: '"Why do you want to leave your current job?"',
        body: 'Employers are listening for stability, not just ambition. Framing this around growth rather than dissatisfaction consistently scores better in our mock interviews.',
      },
      {
        heading: '"Are you comfortable with a 2-year contract away from family?"',
        body: 'This is a genuine screening question, not small talk — employers have been burned by candidates who leave mid-contract. A confident, specific answer about your support plan at home matters.',
      },
      {
        heading: '"What do you know about the accommodation and schedule?"',
        body: 'Candidates who\u2019ve clearly read their offer letter and can speak to shift patterns and living arrangements come across as more prepared and less likely to be surprised (and unhappy) after landing.',
      },
      {
        heading: 'The other three',
        body: 'Salary expectations tied to experience level, willingness to train on new equipment or systems, and basic safety-protocol awareness round out the questions candidates most often under-prepare for.',
      },
    ],
  },
  {
    slug: 'documents-checklist-before-you-apply',
    title: 'The Document Checklist to Have Ready Before You Apply',
    excerpt:
      'What to scan and have on hand before your first interview, so an offer doesn\u2019t stall on paperwork.',
    category: 'Visa Guide',
    author: 'Meera Iyer',
    authorRole: 'Head of Documentation & Compliance',
    publishedAt: '2026-03-14',
    updatedAt: '2026-03-14',
    readTimeMinutes: 4,
    coverImage: '/blog/documents-checklist.jpg',
    coverImageAlt: 'Stack of identification documents and a passport',
    content: [
      {
        heading: 'Before you even interview',
        body: 'Have a clear scan of your passport (valid for at least 12 months), your highest qualification certificate, and any trade or professional licence relevant to your role.',
      },
      {
        heading: 'For skilled trades',
        body: 'Trade test certificates and prior experience letters from previous employers, ideally on letterhead, speed up both interview screening and later visa processing.',
      },
      {
        heading: 'For healthcare roles',
        body: 'Council registration, a recent good-standing certificate, and transcripts are typically requested early — these can take the longest to obtain, so start requesting them as soon as you begin applying.',
      },
      {
        heading: 'What slows people down most',
        body: 'Passports nearing expiry and missing experience letters from earlier employers are, by far, the two most common delays we see once an offer is already confirmed.',
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}
