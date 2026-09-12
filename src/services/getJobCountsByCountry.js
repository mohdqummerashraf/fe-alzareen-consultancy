const ALIASES = {
  'united arab emirates': ['uae', 'u.a.e', 'u.a.e.'],
  'saudi arabia': ['ksa', 'kingdom of saudi arabia'],
  'south korea': ['korea', 'republic of korea'],
};

function normalize(str) {
  return (str || '').trim().toLowerCase();
}

/**
 * Tallies active Job postings by country string, across all pages.
 * Returns a lowercase-keyed dict, e.g. { "united arab emirates": 42 }
 */
export async function getJobCountsByCountry() {
  const counts = {};
  let nextUrl = `${process.env.NEXT_PUBLIC_API_URL}/job-listing/?page_size=100`;
  let guard = 0; // safety cap so a pagination bug can't loop forever

  try {
    while (nextUrl && guard < 25) {
      const res = await fetch(nextUrl, { next: { revalidate: 3600 } });
      if (!res.ok) break;
      const data = await res.json();

      (data.results || []).forEach((job) => {
        const key = normalize(job.country);
        if (!key) return;
        counts[key] = (counts[key] || 0) + 1;
      });

      nextUrl = data.next || null;
      guard += 1;
    }
  } catch (error) {
    console.error('getJobCountsByCountry failed:', error);
  }

  return counts;
}

/** Looks up a country's live count, trying name, ISO code, then known aliases. */
export function getCountryJobCount(counts, country) {
  const primary = normalize(country.name);
  if (counts[primary]) return counts[primary];

  const isoKey = normalize(country.isoCode);
  if (counts[isoKey]) return counts[isoKey];

  for (const alias of ALIASES[primary] || []) {
    if (counts[alias]) return counts[alias];
  }

  return 0;
}
