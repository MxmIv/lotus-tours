import Link from 'next/link';

export default function Header() {
  return (
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/contact">Contact</Link>
          <div className="dropdown">
            <button className="dropbtn">Tours</button>
            <div className="dropdown-content">
              {/* This will be populated by an edge function */}
            </div>
          </div>
        </nav>
      </header>
  );
}
