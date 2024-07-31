import Link from 'next/link';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section-left">
                    <p>Phone: YOUR_PHONE_NUMBER</p>
                </div>
                <div className="footer-logo">
                    <Image src="/logos/lotus_logo_nobg_yellow.png" alt="Logo" width={100} height={70} />
                </div>
                <div className="footer-section-right">
                    <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={30} /> WhatsApp
                    </a>
                    <a href="https://t.me/YOUR_TELEGRAM_USERNAME" target="_blank" rel="noopener noreferrer">
                        <FaTelegram size={30} /> Telegram
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <Link href="/privacy-policy" legacyBehavior>
                    <a>Политика кофидициальности</a>
                </Link>
            </div>
        </footer>
    );
}
