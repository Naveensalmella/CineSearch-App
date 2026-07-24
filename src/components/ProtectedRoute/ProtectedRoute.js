import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/AuthService";

// Wrap any route that should require a logged-in user, e.g.:
// <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
function ProtectedRoute({ children }) {
    const [checking, setChecking] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isMounted = true;
        getCurrentUser()
            .then((u) => {
                if (isMounted) setUser(u);
            })
            .finally(() => {
                if (isMounted) setChecking(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    if (checking) {
        // Avoid a flash of the protected page (or the login page) while we
        // check the session with Supabase.
        return (
            <div style={{ padding: "60px", textAlign: "center", color: "#e2e8f0" }}>
                Checking session…
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;