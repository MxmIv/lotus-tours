import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
                    <Link href="/contact" legacyBehavior>
                        <a className="nav-link">Contact</a>
                    </Link>
                    <div className="dropdown">
                        <button className="dropbtn">Tours</button>
                        <div className="dropdown-content">
                            {/* This will be populated by an edge function */}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
