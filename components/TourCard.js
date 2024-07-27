import Link from 'next/link';

export default function TourCard({ tour }) {
    return (
        <div className="tour-card">
            <img src={tour.frontmatter.image} alt={tour.frontmatter.title} />
            <h2>{tour.frontmatter.title}</h2>
            <p>{tour.frontmatter.description}</p>
            <Link href={`/tours/${tour.slug}`}>Learn More</Link>
        </div>
    );
}
