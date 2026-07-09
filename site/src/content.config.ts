import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts live as Markdown files in src/content/blog/.
// The Python automation writes them; `draft: true` hides a post until approved.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    // Conversion: topic-matched Bubblelime product link
    shopUrl: z.string().optional(),
    shopLabel: z.string().optional(),
    shopPitch: z.string().optional(),
  }),
});

export const collections = { blog };
