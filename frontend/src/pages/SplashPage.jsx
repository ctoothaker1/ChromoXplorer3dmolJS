import styles from "./SplashPage.module.css";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
    const navigate = useNavigate();

    return (
        <>
            {/* HERO SECTION */}
            <div className={styles.hero}>
                <Container>
                    <h1 className={`display-4 ${styles.heroTitle}`}>ChromoXplorer</h1>
                    <h3 className={styles.heroSubtitle}>Navigate the genome like never before.</h3>
                </Container>
            </div>

            {/* CARD GRID SECTION */}
            <Container className="py-5">
                <Row className="gy-4">

                    {/* Card 1 */}
                    <Col xs="12" sm="6" md="4">
                        <Card className="shadow-sm h-100">
                            <img
                                src="https://placehold.co/300x200?text=3D+Genome"
                                className="card-img-top img-fluid"
                                alt="Explore Genome"
                            />
                            <CardBody>
                                <h4 className="fs-5 fw-semibold">Explore the 3D Genome</h4>
                                <p className="text-muted">
                                    Navigate chromosomal territories, A/B compartments, and TAD structures in
                                    an immersive 3D environment. Gain spatial insight into how the genome is
                                    organized and how structure influences biological function.
                                </p>
                                <Button color="secondary" className="mt-auto">Learn More</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Card 2 */}
                    <Col xs="12" sm="6" md="4">
                        <Card className="shadow-sm h-100">
                            <img
                                src="https://placehold.co/300x200?text=Chromatin+Loops"
                                className="card-img-top img-fluid"
                                alt="Chromatin Interactions"
                            />
                            <CardBody>
                                <h4 className="fs-5 fw-semibold">Visualize Chromatin Interactions</h4>
                                <p className="text-muted">
                                    Move seamlessly from high-level chromosomal architecture to detailed TAD
                                    interaction networks. See how enhancer–promoter loops and structural
                                    domains shape gene expression.
                                </p>
                                <Button color="secondary" className="mt-auto">View Interactions</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Card 3 */}
                    <Col xs="12" sm="6" md="4">
                        <Card className="shadow-sm h-100">
                            <img
                                src="https://placehold.co/300x200?text=ChromoXplorer"
                                className="card-img-top img-fluid"
                                alt="ChromoXplorer Overview"
                            />
                            <CardBody>
                                <h4 className="fs-5 fw-semibold">What is ChromoXplorer?</h4>
                                <p className="text-muted">
                                    ChromoXplorer is an interactive platform designed to help researchers and
                                    students explore the multi-scale organization of the genome. Discover how
                                    spatial genome architecture drives cellular identity and function.
                                </p>
                                <Button color="secondary" className="mt-auto">Get Started</Button>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Container>


        </>
    );
}
