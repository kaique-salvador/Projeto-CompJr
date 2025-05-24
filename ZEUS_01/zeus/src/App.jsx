import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import RecuperarSenha from "./pages/RecuperarSenha"
import RedefinirSenha from "./pages/RedefinirSenha"
import Dashboard from "./pages/Dashboard"
import Funcionarios from "./pages/Funcionarios"
import AddEmployeeForm from "./pages/AddFuncionarioForm"
import Orcamento from "./pages/Orcamento"
import AddOrcamento from "./pages/AddOrcamento"
import "./styles/global.css"

function AppRoutes() {
  // Função simples para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true"
  }

  // Componente para rotas protegidas que requerem autenticação
  const RotaProtegida = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />
    }
    return children
  }

  // Componente para rotas que requerem privilégios de administrador
  const RotaAdmin = ({ children }) => {
    console.log(
      "RotaAdmin check - Auth:",
      localStorage.getItem("isAuthenticated"),
      "Role:",
      localStorage.getItem("userRole"),
    )

    if (localStorage.getItem("isAuthenticated") !== "true") {
      console.log("Not authenticated, redirecting to login")
      return <Navigate to="/" replace />
    }

    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      console.log("Not admin, redirecting to dashboard")
      return <Navigate to="/dashboard" replace />
    }

    console.log("Admin access granted")
    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              <Dashboard />
            </RotaProtegida>
          }
        />
        {/* Rotas que requerem privilégios de administrador */}
        <Route
          path="/funcionarios"
          element={
            <RotaAdmin>
              <Funcionarios />
            </RotaAdmin>
          }
        />
        <Route
          path="/funcionarios/adicionar"
          element={
            <RotaAdmin>
              <AddEmployeeForm />
            </RotaAdmin>
          }
        />
        <Route
          path="/comprovantes"
          element={
            <RotaAdmin>
              <Dashboard />
            </RotaAdmin>
          }
        />
        <Route
          path="/orcamentos"
          element={
            <RotaAdmin>
              <Orcamento />
            </RotaAdmin>
          }
        />
        <Route
          path="/orcamentos/novo"
          element={
            <RotaAdmin>
              <AddOrcamento />
            </RotaAdmin>
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
