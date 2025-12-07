import styles from "./AccountPage.module.css";
import AccountSidebar from "../components/Account/AccountSidebar";
import EditProfileForm from "../components/Account/EditProfileForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function AccountPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    console.log("ACCOUNT PAGE LOADED");


    if (!user) return <div className={styles.notLoggedIn}>You must be logged in.</div>;

    return (
        <div className={styles.wrapper}>

            {/* LEFT SIDEBAR */}
            <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* MAIN CONTENT */}
            <div className={styles.content}>
                <h1 className={styles.header}>My Account</h1>

                {activeTab === "profile" && <EditProfileForm />}
                {activeTab === "security" && <ChangePasswordForm />}
            </div>
        </div>
    );
}
