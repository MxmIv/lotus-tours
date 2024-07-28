import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TourGrid from '../components/TourGrid';

export default function Home({ tours }) {
    return (
        <>
            <Header tours={tours} />
            <div className="hero">
                <img src="/backgrounds/background3.jpg" alt="Header Image" />
                <h1>Welcome to Vietnam Tours</h1>
            </div>
            <div className="description">
                <p>Откройте для себя Вьетнам вместе с Lotus Tour: уникальные направления, увлекательные экскурсии и незабываемые впечатления. Мы работаем с опытными гидами и организовываем комфортные поездки, подходящие для всех возрастов. Выберите нас, и максимально насладитесь каждым моментом вашего путешествия.</p>
            </div>
            <TourGrid tours={tours} />
            <Footer />
        </>
    );
}

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('content/tours'));

    const tours = files.filter((filename) => {
        const filepath = path.join('content/tours', filename);
        return fs.statSync(filepath).isFile() && filename.endsWith('.md');
    }).map(filename => {
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
            tours,
        },
    };
}
