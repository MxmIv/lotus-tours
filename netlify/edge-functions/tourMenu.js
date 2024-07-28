export default async function onRequest(context) {
    const request = context.request;
    const url = request ? new URL(request.url) : null;
    const slug = url ? url.searchParams.get('slug') : null;

    const tours = [
        {
            slug: 'tour1',
            frontmatter: {
                title: 'Tour 1',
                images: [
                    'images/tours/Dalat/Main.jpg',
                    'images/tours/Dalat/1.jpg',
                    'images/tours/Dalat/2.jpg'
                ]
            }
        },
        {
            slug: 'tour2',
            frontmatter: {
                title: 'Tour 2',
                images: [
                    'images/tours/Dalat/Main.jpg',
                    'images/tours/Dalat/1.jpg',
                    'images/tours/Dalat/2.jpg'
                ]
            }
        },
        {
            slug: 'tour3',
            frontmatter: {
                title: 'Tour 3',
                images: [
                    'images/tours/Dalat/Main.jpg',
                    'images/tours/Dalat/1.jpg',
                    'images/tours/Dalat/2.jpg'
                ]
            }
        },
        {
            slug: 'tour4',
            frontmatter: {
                title: 'Tour 4',
                images: [
                    'images/tours/Dalat/Main.jpg',
                    'images/tours/Dalat/1.jpg',
                    'images/tours/Dalat/2.jpg'
                ]
            }
        },
        {
            slug: 'tour5',
            frontmatter: {
                title: 'Tour 5',
                images: [
                    'images/tours/Dalat/Main.jpg',
                    'images/tours/Dalat/1.jpg',
                    'images/tours/Dalat/2.jpg'
                ]
            }
        },
        {
            slug: 'tour6',
            frontmatter: {
                title: 'Tour 6',
                images: [
                    'images/tours/Dalat/Main.jpg',
                    'images/tours/Dalat/1.jpg',
                    'images/tours/Dalat/2.jpg'
                ]
            }
        }
    ];

    if (slug) {
        const tour = tours.find(t => t.slug === slug);
        if (tour) {
            return new Response(JSON.stringify(tour), { headers: { 'Content-Type': 'application/json' } });
        } else {
            return new Response('Tour not found', { status: 404 });
        }
    }

    return new Response(JSON.stringify(tours), { headers: { 'Content-Type': 'application/json' } });
}
