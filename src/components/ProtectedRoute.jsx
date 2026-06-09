import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "Please login to access your watchlist.",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;























// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="text-white text-center mt-20">Loading...</div>;
//   }

//   return user ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;