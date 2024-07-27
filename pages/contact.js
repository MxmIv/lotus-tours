import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
    return (
        <>
            <Header />
            <div className="contact-form">
                <h1>Contact Us</h1>
                <form action="/api/contact" method="post">
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your Message" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
            <Footer />
        </>
    );
}
