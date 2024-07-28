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
                    <p className="price">{tour.frontmatter.price}</p>
                    <Link href={`/tours/${tour.slug}`} legacyBehavior>
                        <a>Read More</a>
                    </Link>
                </div>
            ))}
        </div>
    );
}
