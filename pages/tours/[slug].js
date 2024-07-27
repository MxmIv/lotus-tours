import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const md = new markdownIt();

export default function TourPage({ frontmatter, content }) {
    return (
        <>
            <Header />
            <div className="tour-content">
                <h1>{frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
                <div className="tour-images">
                    {frontmatter.images.map((image, index) => (
                        <img key={index} src={`/${image}`} alt={`Image ${index + 1}`} />
                    ))}
                </div>
            </div>
            <Footer />
            <style jsx>{`
        .tour-content {
          padding: 20px;
        }
        .tour-images img {
          width: 100%;
          max-width: 300px;
          margin: 10px;
        }
      `}</style>
        </>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('content/tours'));

    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('content/tours', slug + '.md'),
        'utf-8'
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
        props: {
            frontmatter,
            content,
        },
    };
}
