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
import styles from "./SignupPage.module.css";

export default function SignupPage() {
    const navigate = useNavigate();

    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Simple localStorage signup (prototype)
    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        const user = { email, password };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/login");
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.signupCard}>
                <h2 className={styles.title}>Create an Account</h2>
                <p className={styles.subtitle}>Join ChromoXplorer today</p>

                {error && <div className={styles.error}>{error}</div>}

                <Form onSubmit={handleSignup}>
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            className={styles.input}
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <Button type="submit" className={styles.purpleButton}>
                        Sign Up
                    </Button>
                </Form>

                <div className={styles.linkText}>
                    Already have an account?{" "}
                    <span className={styles.linkButton} onClick={() => navigate("/login")}>
                        Log in
                    </span>
                </div>
            </div>
        </div>
    );
}
