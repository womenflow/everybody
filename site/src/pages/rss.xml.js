import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

// RSS feed — published, non-future posts only (same gate as the site).
export async function GET(context) {
  const posts = (
    await getCollection('blog', ({ data }) => !data.draft && data.pubDate <= new Date())
  ).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: SITE.name,
    description: SITE.tagline,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/posts/${p.id}/`,
      categories: p.data.tags,
    })),
  });
}
