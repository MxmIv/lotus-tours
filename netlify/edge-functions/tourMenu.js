export async function onRequest(context) {
    const tours = [
        {
            slug: 'tour-1',
            frontmatter: {
                title: 'Tour 1',
                images: [
                    'images/tours/Dalat/Main.jpg',
                    'images/tours/Dalat/1.jpg',
                    'images/tours/Dalat/2.jpg'
                    //more
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
        // Add more tour objects here
    ];

    return new Response(JSON.stringify(tours), { headers: { 'Content-Type': 'application/json' } });
}
