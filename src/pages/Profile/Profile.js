import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/AuthService";
import { getFavorites } from "../../services/favoritesService";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
    FaEnvelope,
    FaCalendar,
    FaHeart,
    FaSignOutAlt,
    FaShieldAlt,
    FaFilm,
} from "react-icons/fa";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [favCount, setFavCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser) {
                    navigate("/login");
                    return;
                }
                setUser(currentUser);
                setFavCount(getFavorites().length);
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
            setLoading(false);
        };
        loadUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const getInitials = (email) => {
        return email ? email.charAt(0).toUpperCase() : "?";
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="profile-page">
                <Navbar />
                <div className="profile-loading">
                    <div className="profile-loader" />
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <Navbar />

            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-header-bg" />
                    <div className="profile-header-content">
                        <div className="profile-avatar">
                            {getInitials(user?.email)}
                        </div>
                        <h1 className="profile-name">
                            {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                        </h1>
                        <p className="profile-email">{user?.email}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="profile-stats">
                    <div className="stat-card">
                        <FaHeart className="stat-icon fav-icon" />
                        <div>
                            <h3>{favCount}</h3>
                            <p>Favorites</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FaFilm className="stat-icon film-icon" />
                        <div>
                            <h3>∞</h3>
                            <p>Movies to Explore</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FaShieldAlt className="stat-icon shield-icon" />
                        <div>
                            <h3>Active</h3>
                            <p>Account Status</p>
                        </div>
                    </div>
                </div>

                {/* Account Info */}
                <div className="profile-section">
                    <h2 className="section-title">Account Information</h2>

                    <div className="info-grid">
                        <div className="info-card">
                            <FaEnvelope className="info-icon" />
                            <div>
                                <span className="info-label">Email Address</span>
                                <span className="info-value">{user?.email}</span>
                            </div>
                        </div>

                        <div className="info-card">
                            <FaCalendar className="info-icon" />
                            <div>
                                <span className="info-label">Member Since</span>
                                <span className="info-value">
                                    {formatDate(user?.created_at)}
                                </span>
                            </div>
                        </div>

                        <div className="info-card">
                            <FaCalendar className="info-icon" />
                            <div>
                                <span className="info-label">Last Sign In</span>
                                <span className="info-value">
                                    {formatDate(user?.last_sign_in_at)}
                                </span>
                            </div>
                        </div>

                        <div className="info-card">
                            <FaShieldAlt className="info-icon" />
                            <div>
                                <span className="info-label">Auth Provider</span>
                                <span className="info-value">
                                    {user?.app_metadata?.provider || "Email"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="profile-section">
                    <h2 className="section-title">Quick Actions</h2>
                    <div className="action-grid">
                        <button
                            className="action-btn favorites-action"
                            onClick={() => navigate("/favorites")}
                        >
                            <FaHeart />
                            <span>View Favorites</span>
                        </button>

                        <button
                            className="action-btn logout-action"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Profile;