import Header from '../components/Header';
import Footer from '../components/Footer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Contact({ tours }) {
    return (
        <>
            <Header tours={tours} />
            <div className="contact-form">
                <h1>Contact Us</h1>
                <form action="/api/contact" method="post">
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your Message" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
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
