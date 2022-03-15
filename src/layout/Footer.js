import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import styles from "./Footer.module.css";

function Footer() {
    function facebook() {
        window.location.href =
            "https://www.facebook.com/douglasbg.biassigavioli/";
    }
    function instagram() {
        window.location.href = "https://www.instagram.com/douglasbgavioli/";
    }
    function linkedin() {
        window.location.href =
            "https://www.linkedin.com/in/douglas-biassi-gavioli-b79653186/";
    }
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook onClick={facebook} />
                </li>

                <li>
                    <FaInstagram onClick={instagram} />
                </li>

                <li>
                    <FaLinkedin onClick={linkedin} />
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>GitApi Project</span> &copy; 2022
            </p>
        </footer>
    );
}
export default Footer;
