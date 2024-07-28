import Link from 'next/link';
import Image from 'next/image';

export default function TourGrid({ tours }) {
    return (
        <div className="tour-grid">
            {tours.map((tour, index) => (
                <div key={index} className="tour-card">
                    <Image src={`/${tour.frontmatter.images[0]}`} alt={tour.frontmatter.title} width={300} height={200} />
                    <h2>{tour.frontmatter.title}</h2>
                    <p>{tour.frontmatter.description}</p>
                    <Link href={`/tours/${tour.slug}`} legacyBehavior>
                        <a>Read More</a>
                    </Link>
                </div>
            ))}
            <style jsx>{`
                .tour-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px; /* Reduce gap between tours */
                    padding: 20px;
                }

                .tour-card {
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    overflow: hidden;
                    text-align: center;
                    margin: 10px;
                }

                .tour-card img {
                    width: 100%;
                    height: auto;
                }

                .tour-card h2 {
                    font-size: 1.5rem;
                    margin: 10px 0;
                }

                .tour-card p {
                    padding: 0 10px;
                }

                .tour-card a {
                    display: inline-block;
                    margin: 10px;
                    padding: 10px 20px;
                    background: #FFCD00; /* New Yellow background */
                    color: #000000; /* Black text */
                    text-decoration: none;
                    border-radius: 5px;
                    border: 2px solid #C8102E; /* New Red border */
                }

                .tour-card a:hover {
                    background: #C8102E; /* New Red background on hover */
                    color: #FFCD00; /* New Yellow text on hover */
                }

                @media (max-width: 900px) {
                    .tour-grid {
                        grid-template-columns: repeat(2, 1fr); /* Two columns on medium screens */
                    }
                }

                @media (max-width: 600px) {
                    .tour-grid {
                        grid-template-columns: 1fr; /* Single column on mobile */
                    }
                }
            `}</style>
        </div>
    );
}
