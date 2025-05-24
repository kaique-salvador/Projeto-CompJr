"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import "../styles/Login.css"
import logo from "../assets/logo.jpg"

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [tentativas, setTentativas] = useState(0)

  const handleLogin = async (email, senha) => {
    setLoading(true)
    setError("")

    try {
      // Simulação de uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulação de validação com dois tipos de usuários
      if (email === "admin@exemplo.com" && senha === "senha123") {
        // Usuário administrador
        console.log("Admin login successful")
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userName", "Admin")
        navigate("/dashboard")
      } else if (email === "usuario@exemplo.com" && senha === "senha123") {
        // Usuário normal
        console.log("User login successful")
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userRole", "user")
        localStorage.setItem("userName", "João Jão")
        navigate("/dashboard")
      } else {
        const novasTentativas = tentativas + 1
        setTentativas(novasTentativas)

        if (novasTentativas >= 3) {
          setError("Número máximo de tentativas excedido. Tente novamente em alguns minutos.")
          // Em um ambiente real, você bloquearia temporariamente a conta
          setTimeout(() => {
            setTentativas(0)
            setError("")
          }, 30000) // 30 segundos de bloqueio para demonstração
        } else {
          setError("E-mail ou senha incorretos. Tente novamente.")
        }
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar fazer login. Tente novamente.")
      console.error("Erro de login:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          {logo && <img src={logo || "/placeholder.svg"} alt="Logo" className="login-logo" />}
          <h1>Acesso ao Sistema</h1>
          <p>Entre com suas credenciais para acessar a plataforma</p>
          
        </div>

        <LoginForm onSubmit={handleLogin} error={error} loading={loading} />

        <div className="login-options">
          <div className="login-recuperar">
            <p>Não consegue acessar sua conta?</p>
            <Link to="/recuperar-senha" className="recuperar-senha-link">
              Esqueci minha senha
            </Link>
          </div>

          <div className="login-separator">
            <span>ou</span>
          </div>

          <div className="login-criar-conta">
            <p>Ainda não tem uma conta?</p>
            <Link to="/cadastro" className="criar-conta-link">
              Criar uma conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
