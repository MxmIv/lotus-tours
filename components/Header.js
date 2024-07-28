import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [tours, setTours] = useState([]);

    useEffect(() => {
        fetch('/tours.json')
            .then(response => response.json())
            .then(data => {
                setTours(data);
            })
            .catch(error => console.error('Error fetching tours:', error));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuVisible(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link href="/" legacyBehavior>
                        <a>
                            <Image src="/logos/lotus_logo_nobg_yellow.png" alt="Logo" width={100} height={50} />
                        </a>
                    </Link>
                </div>
                <button className="burger-menu" onClick={handleMenuToggle}>
                    ☰
                </button>
                <nav className={`nav ${menuVisible ? 'visible' : ''}`}>
                    <Link href="/" legacyBehavior>
                        <a className="nav-link" onClick={handleMenuToggle}>Home</a>
                    </Link>
                    <div className="dropdown" onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
                        <button className="dropbtn">Tours</button>
                        {dropdownVisible && (
                            <div className="dropdown-content">
                                {tours.map((tour, index) => (
                                    <Link key={index} href={`/tours/${tour.slug}`} legacyBehavior>
                                        <a onClick={handleMenuToggle}>{tour.frontmatter.title}</a>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link href="/contact" legacyBehavior>
                        <a className="nav-link" onClick={handleMenuToggle}>Contact</a>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
