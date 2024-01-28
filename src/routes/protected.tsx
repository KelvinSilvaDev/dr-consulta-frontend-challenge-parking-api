import { useAuth } from "../hooks/useAuth";
import {Navigate, RouteProps} from "react-router-dom";

export const ProtectedRoute: React.FC<RouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Se o usuário está autenticado, renderize o elemento da rota
    return <>{element}</>;
  } else {
    // Se o usuário não está autenticado, redirecione para a página de login
    // Você pode modificar a lógica de redirecionamento conforme necessário
    return <Navigate to="/login" />;
  }
};