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
    const [showWhatToBring, setShowWhatToBring] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showIncluded, setShowIncluded] = useState(false);
    const router = useRouter();

    // Reset the state when the slug changes
    useEffect(() => {
        setShowWhatToBring(false);
        setShowPhotos(false);
        setShowMoreInfo(false);
        setShowIncluded(false);
    }, [router.query.slug]);

    const formatList = (text) => {
        return text.split('\n').filter(Boolean).map((item, index) => (
            <li key={index}>{item.replace(/•\s*/g, '').trim()}</li>
        ));
    };

    return (
        <>
            <Header />
            <div className="tour-header" style={{ backgroundImage: `url(/${frontmatter.images[0]})` }}>
                <h1>{frontmatter.title}</h1>
            </div>
            <div className="tour-details">
                <div className="grey-box">
                    <div className="grey-box-content">
                        <img className="tour-image" src={`/${frontmatter.images[1]}`} alt="Tour Image" />
                        <div className="tour-text">
                            <h2 className="fancy-font">Программа и стоимость</h2>
                            <p><strong>Длительность:</strong> {frontmatter.duration}</p>
                            <p><strong>Программа:</strong></p>
                            <ul className="program-list">
                                {formatList(frontmatter.program)}
                            </ul>
                            <p><strong>Стоимость:</strong> {frontmatter.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tour-buttons">
                <button className="expand-button" onClick={() => setShowWhatToBring(!showWhatToBring)}>
                    Советуем взять с собой <span className="plus-icon">{showWhatToBring ? '-' : '+'}</span>
                </button>
                {showWhatToBring && (
                    <div className="included-details">
                        <ul>
                            {formatList(frontmatter.whatToBring)}
                        </ul>
                    </div>
                )}
                {frontmatter.included && (
                    <>
                        <button className="expand-button" onClick={() => setShowIncluded(!showIncluded)}>
                            В стоимость тура входит <span className="plus-icon">{showIncluded ? '-' : '+'}</span>
                        </button>
                        {showIncluded && (
                            <div className="included-details">
                                <ul>
                                    {formatList(frontmatter.included)}
                                </ul>
                            </div>
                        )}
                    </>
                )}
                <button className="expand-button" onClick={() => setShowPhotos(!showPhotos)}>
                    Фото с тура <span className="plus-icon">{showPhotos ? '-' : '+'}</span>
                </button>
                {showPhotos && (
                    <div className="photo-gallery">
                        {frontmatter.images.slice(1).map((image, index) => (
                            <img key={index} src={`/${image}`} alt={`Gallery Image ${index}`} className="gallery-image" />
                        ))}
                    </div>
                )}
                <button className="expand-button" onClick={() => setShowMoreInfo(!showMoreInfo)}>
                    Больше информации <span className="plus-icon">{showMoreInfo ? '-' : '+'}</span>
                </button>
                {showMoreInfo && (
                    <div className="more-info">
                        <div dangerouslySetInnerHTML={{ __html: md.render(frontmatter.moreInfo) }} />
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
