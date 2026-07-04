import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
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
          Welcome back! Sign in to explore movies.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <FaArrowRight />}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;