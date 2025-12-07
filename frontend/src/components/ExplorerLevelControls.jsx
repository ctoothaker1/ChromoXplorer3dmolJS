import { Button } from "reactstrap";
import styles from "../pages/ExplorerPage.module.css";

export default function ExplorerLevelControls({ level, setLevel }) {
    return (
        <>
            {/* Level 1 */}
            <Button
                className={
                    level === 1 ? styles.levelButtonActive : styles.levelButtonInactive
                }
                onClick={() => setLevel(1)}
            >
                Level 1: Chromosome Territories
            </Button>

            {/* Level 2 */}
            <Button
                className={
                    level === 2 ? styles.levelButtonActive : styles.levelButtonInactive
                }
                onClick={() => setLevel(2)}
            >
                Level 2: A/B Compartments
            </Button>

            {/* Level 3 → Real Genome Model */}
            <Button
                className={
                    level === 3 ? styles.levelButtonActive : styles.levelButtonInactive
                }
                onClick={() => setLevel(3)}
            >
                Level 3: Genome Model
            </Button>
        </>
    );
}
