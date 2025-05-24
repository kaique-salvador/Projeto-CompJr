"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import "../styles/RedefinirSenha.css"

const RedefinirSenha = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [senhaError, setSenhaError] = useState("")
  const [confirmarSenhaError, setConfirmarSenhaError] = useState("")
  const [loading, setLoading] = useState(false)
  const [concluido, setConcluido] = useState(false)
  const [error, setError] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)
  const [acessoAutorizado, setAcessoAutorizado] = useState(false)

  useEffect(() => {
    // Verifica se o usuário chegou a esta página após validar o token
    const state = location.state
    if (state && state.tokenValidado) {
      setAcessoAutorizado(true)
    } else {
      // Redireciona para a página de recuperação se tentar acessar diretamente
      navigate("/recuperar-senha")
    }
  }, [location, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação do formulário
    let isValid = true

    if (!senha.trim()) {
      setSenhaError("A nova senha é obrigatória")
      isValid = false
    } else if (senha.length < 6) {
      setSenhaError("A senha deve ter pelo menos 6 caracteres")
      isValid = false
    } else {
      setSenhaError("")
    }

    if (!confirmarSenha.trim()) {
      setConfirmarSenhaError("Confirme sua nova senha")
      isValid = false
    } else if (senha !== confirmarSenha) {
      setConfirmarSenhaError("As senhas não coincidem")
      isValid = false
    } else {
      setConfirmarSenhaError("")
    }

    if (!isValid) return

    setLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulação de sucesso
      setConcluido(true)
    } catch (err) {
      setError("Ocorreu um erro ao redefinir sua senha. Tente novamente.")
      console.error("Erro ao redefinir senha:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!acessoAutorizado) {
    return null
  }

  return (
    <div className="redefinir-senha-container">
      <div className="redefinir-senha-card">
        {!concluido ? (
          <>
            <div className="redefinir-senha-header">
              <h1>Redefinir Senha</h1>
              <p>Crie uma nova senha para sua conta</p>
            </div>

            <form className="redefinir-senha-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="senha" className="form-label">
                  Nova Senha
                </label>
                <div className="senha-input-container">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    id="senha"
                    className={`form-input ${senhaError ? "input-error" : ""}`}
                    placeholder="Digite sua nova senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={loading}
                  />
                  <button type="button" className="toggle-senha-btn" onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {senhaError && <div className="error-message">{senhaError}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmarSenha" className="form-label">
                  Confirmar Nova Senha
                </label>
                <div className="senha-input-container">
                  <input
                    type={mostrarConfirmarSenha ? "text" : "password"}
                    id="confirmarSenha"
                    className={`form-input ${confirmarSenhaError ? "input-error" : ""}`}
                    placeholder="Confirme sua nova senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-senha-btn"
                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  >
                    {mostrarConfirmarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {confirmarSenhaError && <div className="error-message">{confirmarSenhaError}</div>}
              </div>

              {error && <div className="error-message redefinir-senha-error">{error}</div>}

              <button type="submit" className="btn btn-primary redefinir-senha-btn" disabled={loading}>
                {loading ? "Processando..." : "Redefinir Senha"}
              </button>
            </form>
          </>
        ) : (
          <div className="redefinir-senha-sucesso">
            <div className="sucesso-icon">✓</div>
            <h2>Senha Alterada com Sucesso!</h2>
            <p>Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.</p>
            <Link to="/" className="btn btn-primary mt-4">
              Ir para o Login
            </Link>
          </div>
        )}

        {!concluido && (
          <div className="redefinir-senha-footer">
            <Link to="/" className="voltar-login-link">
              Voltar para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default RedefinirSenha




