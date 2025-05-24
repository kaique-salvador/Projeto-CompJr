import { useState, useEffect, useRef } from "react"
import { Bell, User, ChevronDown, LogOut, Settings } from "lucide-react"
import "../styles/Header.css"

const Header = ({ userName, currentDate, onLogout, showLogo = false, customTitle, customSubtitle }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [userRole, setUserRole] = useState("user")
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Get user role para localStorage
    const role = localStorage.getItem("userRole") || "user"
    console.log("Header - User role:", role)
    setUserRole(role)
  }, [])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleCliqueFora = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleCliqueFora)
    return () => {
      document.removeEventListener("mousedown", handleCliqueFora)
    }
  }, [])

  return (
    <header className={`dashboard-header ${showLogo ? "header-expanded" : ""} ${customTitle ? "header-compact" : ""}`}>
      {showLogo && (
        <div className="header-logo">
          <img
            src={require("../assets/logo-placeholder.jpg") || "/placeholder.svg"}
            alt="CompJr Logo"
            className="header-logo-image"
          />
          <div className="header-logo-text">
            <span className="header-logo-name">CompJr</span>
            <span className="header-logo-subtitle">Sistema ERP</span>
          </div>
        </div>
      )}
      <div className="header-welcome">
        {customTitle ? (
          <>
            <h2>{customTitle}</h2>
            {customSubtitle && <p>{customSubtitle}</p>}
          </>
        ) : (
          <>
            <h2>Bem-vindo, Sr. {userName}</h2>
            <p>Hoje é {currentDate}</p>
          </>
        )}
      </div>

      <div className="header-actions">
        <div className="notification-icon">
          <Bell size={18} color="#64748b" />
          <span className="notification-badge"></span>
        </div>

        <div className="user-profile" ref={dropdownRef}>
          <div className="profile-info" onClick={toggleDropdown}>
            <div className="avatar">
              <User size={16} />
            </div>
            <div className="user-details">
              <span className="user-name">{userName || "Admin"}</span>
              <span className="user-role">{userRole === "admin" ? "Administrador" : "Usuário"}</span>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </div>

          {showDropdown && (
            <div className="profile-dropdown">
              <ul>
                <li>
                  <a href="#perfil">
                    <User size={14} />
                    <span>Meu Perfil</span>
                  </a>
                </li>
                <li>
                  <a href="#configuracoes">
                    <Settings size={14} />
                    <span>Configurações</span>
                  </a>
                </li>
                <li>
                  <a href="#sair" onClick={onLogout}>
                    <LogOut size={14} />
                    <span>Sair</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
