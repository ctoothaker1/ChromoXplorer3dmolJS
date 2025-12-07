import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
    const navigate = useNavigate();

    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Simple prototype authentication using localStorage
    const handleLogin = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            return setError("No account found. Please sign up first.");
        }

        if (storedUser.email === email && storedUser.password === password) {
            localStorage.setItem("loggedIn", "true");
            navigate("/explorer");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.loginCard}>
                <h2 className={styles.title}>Welcome Back</h2>
                <p className={styles.subtitle}>Log in to continue your exploration</p>

                {error && <div className={styles.error}>{error}</div>}

                <Form onSubmit={handleLogin}>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            className={styles.input}
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            className={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <Button className={styles.purpleButton} type="submit">
                        Log In
                    </Button>
                </Form>

                <div className={styles.linkText}>
                    Don’t have an account?{" "}
                    <span
                        className={styles.linkButton}
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </div>
            </div>
        </div>
    );
}
