import { Button } from "reactstrap";
import styles from "../pages/ExplorerPage.module.css";

export default function ExplorerLevelControls({ level, setLevel }) {
    return (
        <div>
            <Button
                className="mb-2"
                color={level === 1 ? "primary" : "light"}
                onClick={() => setLevel(1)}
            >
                Level 1: Chromosome Territories
            </Button>
            <Button
                className="mb-2"
                color={level === 2 ? "primary" : "light"}
                onClick={() => setLevel(2)}
            >
                Level 2: A/B Compartments
            </Button>
            <Button
                className="mb-2"
                color={level === 3 ? "primary" : "light"}
                onClick={() => setLevel(3)}
            >
                Level 3: TAD Interactions
            </Button>
        </div>
    );
}
