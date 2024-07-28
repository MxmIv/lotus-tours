import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const md = new markdownIt();

export default function TourPage({ frontmatter, content }) {
    const [showMore, setShowMore] = useState(false);
    const [showIncluded, setShowIncluded] = useState(false);
    const router = useRouter();

    // Reset the state when the slug changes
    useEffect(() => {
        setShowMore(false);
        setShowIncluded(false);
    }, [router.query.slug]);

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
                    <h2>Программа и стоимость</h2>
                    <p><strong>Длительность:</strong> {frontmatter.duration}</p>
                    <p><strong>Описание:</strong> {frontmatter.description}</p>
                    <p><strong>Стоимость:</strong> {frontmatter.price}</p>
                </div>
            </div>
            <div className="tour-buttons">
                <button className="expand-button" onClick={() => setShowIncluded(!showIncluded)}>
                    Что входит в стоимость <span className="plus-icon">{showIncluded ? '-' : '+'}</span>
                </button>
                {showIncluded && (
                    <div className="included-details">
                        <h3>Что входит в стоимость:</h3>
                        <ul>
                            {frontmatter.included.split('\n').filter(Boolean).map((item, index) => (
                                <li key={index}>{item.replace('-', '').trim()}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button className="expand-button" onClick={() => setShowMore(!showMore)}>
                    Подробнее о туре <span className="plus-icon">{showMore ? '-' : '+'}</span>
                </button>
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
          max-width: 800px;
          width: 100%;
          text-align: center;
        }
        .tour-buttons {
          text-align: center;
          margin: 20px 0;
        }
        .expand-button {
          background-color: #FFD700;
          color: #0000FF;
          border: 2px solid #FF0000;
          padding: 15px 20px;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          max-width: 800px;
          margin: 10px auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s, color 0.3s;
        }
        .expand-button:hover {
          background-color: #FF0000;
          color: #FFD700;
        }
        .plus-icon {
          font-size: 1.5rem;
        }
        .included-details, .tour-more div {
          margin-top: 20px;
          text-align: left;
          max-width: 800px;
          margin: 0 auto;
        }
        .included-details ul {
          list-style-type: disc;
          padding-left: 20px;
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
