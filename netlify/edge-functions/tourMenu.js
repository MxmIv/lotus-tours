import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function onRequest(context) {
    const files = fs.readdirSync(path.join('content/tours')).filter(filename => filename.endsWith('.md'));

    const tours = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join('content/tours', filename), 'utf-8');
        const { data: frontmatter } = matter(markdownWithMeta);
        return {
            slug: filename.replace('.md', ''),
            frontmatter
        };
    });

    return new Response(JSON.stringify(tours), { headers: { 'Content-Type': 'application/json' } });
}
