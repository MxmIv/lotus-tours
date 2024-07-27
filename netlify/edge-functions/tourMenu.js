export default async function onRequest(context) {
    const tours = [
        {
            slug: 'tour-1',
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
            slug: 'tour-2',
            frontmatter: {
                title: 'Tour 2',
                images: [
                    'images/tours/Dalat/Main.jpg',
                    'images/tours/Dalat/1.jpg',
                    'images/tours/Dalat/2.jpg'
                ]
            }
        }
    ];

    return new Response(JSON.stringify(tours), { headers: { 'Content-Type': 'application/json' } });
}
