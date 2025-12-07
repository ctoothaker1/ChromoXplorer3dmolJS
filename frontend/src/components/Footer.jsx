import { Container, Row, Col } from "reactstrap";
import styles from "./Footer.module.css";
import logo from "../assets/images/logo.png"; // adjust path if needed
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className={styles.footer}>
            <Container>
                <Row className="gy-4">

                    {/* Logo Section */}
                    <Col xs="12" md="4" className="text-center text-md-start">
                        <img src={logo} alt="ChromoXplorer Logo" className={styles.footerLogo} />
                        <p className="mt-3">
                            Explore the 3D genome — from chromosomes<br />
                            to compartments, to TAD interactions.
                        </p>
                    </Col>

                    {/* Company */}
                    <Col xs="12" sm="6" md="4">
                        <div className={styles.footerTitle}>Company</div>
                        <div className={styles.footerLink} onClick={() => navigate("/about")}>About Us</div>
                        <div className={styles.footerLink} onClick={() => navigate("/careers")}>Careers</div>
                        <div className={styles.footerLink} onClick={() => navigate("/blog")}>Blog</div>
                        <div className={styles.footerLink} onClick={() => navigate("/press")}>Press</div>
                    </Col>

                    {/* Resources */}
                    <Col xs="12" sm="6" md="4">
                        <div className={styles.footerTitle}>Resources</div>
                        <div className={styles.footerLink} onClick={() => navigate("/docs")}>Documentation</div>
                        <div className={styles.footerLink} onClick={() => navigate("/support")}>Support</div>
                        <div className={styles.footerLink} onClick={() => navigate("/faq")}>FAQ</div>
                        <div className={styles.footerLink} onClick={() => navigate("/terms")}>Terms of Use</div>
                    </Col>

                </Row>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    © {new Date().getFullYear()} Chromonauts — All Rights Reserved.
                </div>
            </Container>
        </footer>
    );
}
