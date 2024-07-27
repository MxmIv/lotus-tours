import Header from '../components/Header';
import Footer from '../components/Footer';
import TourGrid from '../components/TourGrid';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ tours }) {
    return (
        <>
            <Header />
            <div className="hero">
                <img src="/backgrounds/background3.jpg" alt="Header Image" />
                <h1>Welcome to Vietnam Tours</h1>
            </div>
            <div className="description">
                <p>Description of the company</p>
            </div>
            <TourGrid tours={tours} />
            <Footer />
        </>
    );
}

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('markdown/tours'));
    const tours = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(
            path.join('markdown/tours', filename),
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
            tours,
        },
    };
}
