import { useState } from "react"
import "../styles/LoginForm.css"

const LoginForm = ({ onSubmit, error, loading }) => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [senhaError, setSenhaError] = useState("")

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validação do formulário
    let isValid = true

    if (!email.trim()) {
      setEmailError("O e-mail é obrigatório")
      isValid = false
    } else if (!validarEmail(email)) {
      setEmailError("Digite um e-mail válido")
      isValid = false
    } else {
      setEmailError("")
    }

    if (!senha.trim()) {
      setSenhaError("A senha é obrigatória")
      isValid = false
    } else if (senha.length < 6) {
      setSenhaError("A senha deve ter pelo menos 6 caracteres")
      isValid = false
    } else {
      setSenhaError("")
    }

    if (isValid) {
      onSubmit(email, senha)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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

      <div className="form-group">
        <label htmlFor="senha" className="form-label">
          Senha
        </label>
        <div className="senha-input-container">
          <input
            type={mostrarSenha ? "text" : "password"}
            id="senha"
            className={`form-input ${senhaError ? "input-error" : ""}`}
            placeholder="Digite sua senha"
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

      {error && <div className="error-message login-error">{error}</div>}

      <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  )
}

export default LoginForm
