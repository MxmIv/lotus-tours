const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const toursDirectory = path.join(process.cwd(), 'content/tours');
const outputFile = path.join(process.cwd(), 'public', 'tours.json');

const generateTours = () => {
    const files = fs.readdirSync(toursDirectory).filter(filename => filename.endsWith('.md'));

    const tours = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join(toursDirectory, filename), 'utf-8');
        const { data: frontmatter } = matter(markdownWithMeta);
        return {
            slug: filename.replace('.md', ''),
            frontmatter
        };
    });

    fs.writeFileSync(outputFile, JSON.stringify(tours, null, 2));
    console.log('Tours data generated.');
};

generateTours();
