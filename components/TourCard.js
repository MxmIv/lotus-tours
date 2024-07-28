import Link from 'next/link';
import Carousel from './Carousel';

export default function TourCard({ tour }) {
    return (
        <div className="tour-card">
            <Carousel images={tour.frontmatter.images} />
            <h2>{tour.frontmatter.title}</h2>
            <p>{tour.frontmatter.description}</p>
            <p className="price">{tour.frontmatter.price}</p>
            <Link href={`/tours/${tour.slug}`} legacyBehavior>
                <a>Read More</a>
            </Link>
        </div>
    );
}
