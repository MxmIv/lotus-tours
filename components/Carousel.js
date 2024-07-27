import { useState } from 'react';

export default function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="carousel">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
            <div className="carousel-controls">
                <button onClick={handlePrev}>&lt;</button>
                <button onClick={handleNext}>&gt;</button>
            </div>
            <style jsx>{`
                .carousel {
                    position: relative;
                    width: 100%;
                    max-width: 300px;
                    margin: 0 auto;
                }

                .carousel img {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                }

                .carousel-controls {
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    transform: translateY(-50%);
                }

                .carousel-controls button {
                    background: rgba(0, 0, 0, 0.5);
                    border: none;
                    color: white;
                    padding: 10px;
                    cursor: pointer;
                }

                .carousel-controls button:hover {
                    background: rgba(0, 0, 0, 0.8);
                }
            `}</style>
        </div>
    );
}
