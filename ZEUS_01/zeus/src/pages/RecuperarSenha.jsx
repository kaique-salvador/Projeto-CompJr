"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/RecuperarSenha.css"
import VerificationCodeInput from "../components/VerificationCodeInput"

const RecuperarSenha = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [emailError, setEmailError] = useState("")
  const [tokenError, setTokenError] = useState("")
  const [loading, setLoading] = useState(false)
  const [etapa, setEtapa] = useState("email") // "email" ou "token"
  const [error, setError] = useState("")

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault()

    // Validação do e-mail
    if (!email.trim()) {
      setEmailError("O e-mail é obrigatório")
      return
    } else if (!validarEmail(email)) {
      setEmailError("Digite um e-mail válido")
      return
    } else {
      setEmailError("")
    }

    setLoading(true)
    setError("")

    try {
      // Simulação de uma chamada de API para enviar o email com o token
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulação de sucesso - avança para a próxima etapa
      setEtapa("token")
    } catch (err) {
      setError("Ocorreu um erro ao enviar o e-mail. Tente novamente.")
      console.error("Erro ao recuperar senha:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitToken = async (e) => {
    e.preventDefault()

    // Validação do token
    if (!token.trim()) {
      setTokenError("O código de verificação é obrigatório")
      return
    } else if (token.length < 6) {
      setTokenError("O código de verificação deve ter 6 dígitos")
      return
    } else {
      setTokenError("")
    }

    setLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (token === "123456") {
        navigate("/redefinir-senha", { state: { email, tokenValidado: true } })
      } else {
        setTokenError("Código de verificação inválido. Tente novamente.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao validar o código. Tente novamente.")
      console.error("Erro ao validar token:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="recuperar-senha-container">
      <div className="recuperar-senha-card">
        {etapa === "email" ? (
          <>
            <div className="recuperar-senha-header">
              <h1>Recuperar Senha</h1>
              <p>Informe seu e-mail para receber um código de verificação</p>
            </div>

            <form className="recuperar-senha-form" onSubmit={handleSubmitEmail}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${emailError ? "input-error" : ""}`}
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                {emailError && <div className="error-message">{emailError}</div>}
              </div>

              {error && <div className="error-message recuperar-senha-error">{error}</div>}

              <button type="submit" className="btn btn-primary recuperar-senha-btn" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Código de Verificação"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="recuperar-senha-header">
              <div className="email-enviado-container">
                <div className="sucesso-icon">✓</div>
                <h2>E-mail Enviado</h2>
                <p>
                  Enviamos um código de verificação para <strong>{email}</strong>. Insira o código abaixo para continuar
                  com a redefinição de senha.
                </p>
              </div>
            </div>

            <form className="recuperar-senha-form" onSubmit={handleSubmitToken}>
              <div className="form-group verification-group">
                <label htmlFor="token" className="form-label text-center">
                  Código de Verificação
                </label>
                <VerificationCodeInput length={6} onChange={setToken} />
                {tokenError && <div className="error-message text-center">{tokenError}</div>}
              </div>

              {error && <div className="error-message recuperar-senha-error">{error}</div>}

              <button type="submit" className="btn btn-primary recuperar-senha-btn" disabled={loading}>
                {loading ? "Verificando..." : "Verificar Código"}
              </button>
            </form>
          </>
        )}

        <div className="recuperar-senha-footer">
          <Link to="/" className="voltar-login-link">
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecuperarSenha
