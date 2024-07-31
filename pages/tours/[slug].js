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
    const [showIncluded, setShowIncluded] = useState(false);
    const [showWhatToBring, setShowWhatToBring] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    const router = useRouter();

    // Reset the state when the slug changes
    useEffect(() => {
        setShowIncluded(false);
        setShowWhatToBring(false);
        setShowMoreInfo(false);
        setShowPhotos(false);
    }, [router.query.slug]);

    return (
        <>
            <Header />
            <div className="tour-header" style={{ backgroundImage: `url(/${frontmatter.images[0]})` }}>
                <h1>{frontmatter.title}</h1>
            </div>
            <div className="tour-details">
                <div className="grey-box">
                    <h2 className="fancy-font">Программа и стоимость</h2>
                    <div className="grey-box-content">
                        <img src={`/${frontmatter.images[1]}`} alt="Tour Image" className="tour-image" />
                        <div className="tour-text">
                            <p><strong>Длительность:</strong> {frontmatter.duration}</p>
                            <p><strong>Программа:</strong> {frontmatter.program}</p>
                            <p><strong>Стоимость:</strong> {frontmatter.price}</p>
                        </div>
                    </div>
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
                <button className="expand-button" onClick={() => setShowWhatToBring(!showWhatToBring)}>
                    Что взять с собой? <span className="plus-icon">{showWhatToBring ? '-' : '+'}</span>
                </button>
                {showWhatToBring && (
                    <div className="included-details">
                        <h3>Что взять с собой:</h3>
                        <ul>
                            {frontmatter.whatToBring.split('\n').filter(Boolean).map((item, index) => (
                                <li key={index}>{item.replace('-', '').trim()}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button className="expand-button" onClick={() => setShowMoreInfo(!showMoreInfo)}>
                    Больше информации <span className="plus-icon">{showMoreInfo ? '-' : '+'}</span>
                </button>
                {showMoreInfo && (
                    <div className="included-details">
                        <h3>Больше информации:</h3>
                        <div dangerouslySetInnerHTML={{ __html: md.render(frontmatter.moreInfo) }} />
                    </div>
                )}
                <button className="expand-button" onClick={() => setShowPhotos(!showPhotos)}>
                    Фото с тура <span className="plus-icon">{showPhotos ? '-' : '+'}</span>
                </button>
                {showPhotos && (
                    <div className="photo-gallery">
                        {frontmatter.images.slice(2).map((image, index) => (
                            <img key={index} src={`/${image}`} alt={`Tour photo ${index + 1}`} className="gallery-image" />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
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
