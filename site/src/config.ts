// Google Analytics 4 Measurement ID (e.g. "G-XXXXXXX"). Leave '' to disable.
export const GA_ID = 'G-73B5F8HD76';

// Site + banner settings. This is the single place to edit branding.

export const SITE = {
  name: 'Everybody Moves',
  tagline: 'Body-positive fitness for every body',
  // Header hero background image. Leave '' for a clean gradient header.
  heroImage: '',
};

// The Bubblelime banner appended to every article (separate from the content).
// A photo banner: background image + overlaid text/button = an intuitive shop link.
export const BANNER = {
  linkUrl: 'https://www.bubblelime.com/', // a specific collection converts better
  photoUrl: '/images/everybody-banner.png',
  name: 'Bubblelime',
  subtext: 'Activewear that moves with you.',
  ctaLabel: 'Shop the collection →',
  amazonUrl:
    'https://www.amazon.com/stores/BUBBLELIMESPORTSWEAR/page/96D4D667-F31E-494F-9562-0EDD6EBEED44',
};

// Standard "not medical advice" disclaimer added to every article.
export const DISCLAIMER =
  'This article is for general informational purposes only and is not medical ' +
  'advice. It is not a substitute for professional diagnosis or treatment. ' +
  'Always consult a qualified healthcare provider about your individual ' +
  'situation, especially before making significant changes to your diet or ' +
  'exercise routine.';
