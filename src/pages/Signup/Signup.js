import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/AuthService";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import "./Signup.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Sign up failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-bg" />

      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">▶</span>
          <h1>CineSearch</h1>
        </div>

        <p className="auth-subtitle">
          Create your account and discover thousands of movies.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <FaArrowRight />}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;