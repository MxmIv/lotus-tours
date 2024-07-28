export default async function onRequest(context) {
    const request = context.request;
    const url = request ? new URL(request.url) : null;
    const slug = url ? url.searchParams.get('slug') : null;

    const tours = [
        {
            slug: 'tour1',
            frontmatter: {
                title: 'Tour 1',
                description: 'Description of Tour 1',
                price: '$100',
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
                description: 'Description of Tour 2',
                price: '$200',
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
                description: 'Description of Tour 3',
                price: '$300',
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
                description: 'Description of Tour 4',
                price: '$400',
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
                description: 'Description of Tour 5',
                price: '$500',
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
                description: 'Description of Tour 6',
                price: '$600',
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
