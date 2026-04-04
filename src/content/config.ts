import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    year: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    images: z.array(z.string()).optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    paperUrl: z.string().optional(),
    published: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string().default('Francis Sabado'),
    image: z.string().optional(),
  }),
});

export const collections = { projects, blog };
