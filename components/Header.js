import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header({ tours }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown')) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
                <nav className="nav">
                    <Link href="/" legacyBehavior>
                        <a className="nav-link">Home</a>
                    </Link>
                    <div className="dropdown" onClick={toggleDropdown}>
                        <button className="dropbtn">Tours</button>
                        {dropdownVisible && (
                            <div className="dropdown-content">
                                {tours.map((tour) => (
                                    <Link key={tour.slug} href={`/tours/${tour.slug}`} legacyBehavior>
                                        <a>{tour.frontmatter.title}</a>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link href="/contact" legacyBehavior>
                        <a className="nav-link">Contact</a>
                    </Link>
                </nav>
            </div>
            <style jsx>{`
        .header {
          background-color: #333;
          color: #fff;
          padding: 10px 0;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .logo a {
          display: flex;
          align-items: center;
        }

        .nav {
          display: flex;
          align-items: center;
        }

        .nav-link {
          color: #fff;
          text-decoration: none;
          margin-right: 20px;
          font-weight: bold;
        }

        .nav-link:hover {
          text-decoration: underline;
        }

        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropbtn {
          background-color: #333;
          color: white;
          border: none;
          cursor: pointer;
          padding: 10px;
          font-size: 16px;
        }

        .dropdown-content {
          display: block;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .dropdown-content a:hover {
          background-color: #f1f1f1;
        }

        .dropdown:hover .dropbtn {
          background-color: #555;
        }
      `}</style>
        </header>
    );
}
