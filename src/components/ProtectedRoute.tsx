import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};