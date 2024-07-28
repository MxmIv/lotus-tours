import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const md = new markdownIt();

export default function TourPage({ frontmatter, content }) {
    const [showMore, setShowMore] = useState(false);

    return (
        <>
            <Header />
            <div className="tour-header" style={{ backgroundImage: `url(/${frontmatter.images[0]})` }}>
                <h1>{frontmatter.title}</h1>
            </div>
            <div className="tour-description">
                <p>{frontmatter.description}</p>
            </div>
            <div className="tour-details">
                <div className="grey-box">
                    <h2>{frontmatter.title}</h2>
                    <p>{frontmatter.description}</p>
                    <p><strong>Price:</strong> {frontmatter.price}</p>
                </div>
            </div>
            <div className="tour-more">
                <button onClick={() => setShowMore(!showMore)}>Подробнее о туре</button>
                {showMore && <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />}
            </div>
            <Footer />
            <style jsx>{`
        .tour-header {
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .tour-header h1 {
          font-size: 3rem;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 10px 20px;
          border-radius: 5px;
        }
        .tour-description {
          text-align: center;
          margin: 20px 0;
          font-size: 1.2rem;
        }
        .tour-details {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .grey-box {
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          text-align: center;
        }
        .tour-more {
          text-align: center;
          margin: 20px 0;
        }
        .tour-more button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
        }
        .tour-more button:hover {
          background-color: #005bb5;
        }
        .tour-more div {
          margin-top: 20px;
          text-align: left;
          max-width: 800px;
          margin: 0 auto;
        }
      `}</style>
        </>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('content/tours')).filter(filename => filename.endsWith('.md'));

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
