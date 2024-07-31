import Link from 'next/link';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={30} /> WhatsApp
                    </a>
                </div>
                <div className="footer-section">
                    <a href="https://t.me/YOUR_TELEGRAM_USERNAME" target="_blank" rel="noopener noreferrer">
                        <FaTelegram size={30} /> Telegram
                    </a>
                </div>
                <div className="footer-section">
                    <p>Phone: YOUR_PHONE_NUMBER</p>
                </div>
                <div className="footer-section">
                    <Link href="/privacy-policy" legacyBehavior>
                        <a>Политика кофидициальности</a>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
