import TourCard from './TourCard';

export default function TourGrid({ tours }) {
    return (
        <div className="tour-grid">
            {tours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
            ))}
        </div>
    );
}
