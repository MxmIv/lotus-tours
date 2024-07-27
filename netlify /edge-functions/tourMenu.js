export async function onRequest(context) {
    const tours = context.json.tours;
    const html = tours.map(tour => `
    <a href="/tours/${tour.slug}">${tour.frontmatter.title}</a>
  `).join('');
    return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
