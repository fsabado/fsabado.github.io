import { getCollection } from 'astro:content';

export async function GET() {
  const [projects, posts] = await Promise.all([
    getCollection('projects', (p) => p.data.published),
    getCollection('blog'),
  ]);

  const index = [
    ...projects.map((p) => ({
      type: 'project',
      slug: `/projects/${p.slug}/`,
      title: p.data.title,
      description: p.data.subtitle,
      tags: p.data.tags,
    })),
    ...posts.map((b) => ({
      type: 'blog',
      slug: `/blog/${b.slug}/`,
      title: b.data.title,
      description: b.data.description,
      tags: b.data.tags,
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
