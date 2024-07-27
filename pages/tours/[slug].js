import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const md = new markdownIt();

export default function TourPage({ frontmatter, content, tours }) {
    return (
        <>
            <Header tours={tours} />
            <div className="tour-content">
                <h1>{frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
            </div>
            <Footer />
        </>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('content/tours'));
    const paths = files.filter((filename) => filename.endsWith('.md')).map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('content/tours', slug + '.md'),
        'utf-8'
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    const files = fs.readdirSync(path.join('content/tours'));
    const tours = files.filter((filename) => filename.endsWith('.md')).map(filename => {
        const markdownWithMeta = fs.readFileSync(
            path.join('content/tours', filename),
            'utf-8'
        );
        const { data: frontmatter } = matter(markdownWithMeta);
        return {
            frontmatter,
            slug: filename.split('.')[0]
        };
    });

    return {
        props: {
            frontmatter,
            content,
            tours,
        },
    };
}
