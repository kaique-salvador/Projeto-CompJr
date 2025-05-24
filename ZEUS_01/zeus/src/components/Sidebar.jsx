import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  ClipboardList,
  Mail,
  FileIcon,
  PenToolIcon as Tool,
  Truck,
  Package,
  Bell,
  GraduationCap,
  ShoppingCart,
  Menu,
} from "lucide-react"
import "../styles/Sidebar.css"
import logoImage from "../assets/logo-placeholder.jpg"

const Sidebar = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [userRole, setUserRole] = useState("user") 

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole") || "user"
    setUserRole(role)

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const isActive = (path) => {
    console.log("Current path:", location.pathname, "Checking path:", path)
    return location.pathname === path
  }

  // Define menu baseado no tipo de usuário (admin ou usuário normal)
  const getMenuItems = () => {
    const items = [
      {
        path: "/dashboard",
        icon: <LayoutDashboard size={18} />,
        label: "Dashboard",
      },
    ]

    // Só usuários tem acesso a todas as informações do dashboard 
    if (userRole === "admin") {
      items.push(
        {
          path: "/funcionarios",
          icon: <Users size={18} />,
          label: "Funcionários",
        },
        {
          path: "/comprovantes",
          icon: <ClipboardList size={18} />,
          label: "Comprovantes de pagamento",
        },
        {
          path: "/pagamentos",
          icon: <CreditCard size={18} />,
          label: "Pagamentos Recebidos",
        },
        {
          path: "/comunicados",
          icon: <Mail size={18} />,
          label: "Comunicados",
        },
        {
          path: "/circulares",
          icon: <FileIcon size={18} />,
          label: "Circulares",
        },
        {
          path: "/manutencao",
          icon: <Tool size={18} />,
          label: "Manutenção",
        },
        {
          path: "/logistica",
          icon: <Truck size={18} />,
          label: "Logística",
        },
        {
          path: "/orcamentos",
          icon: <FileText size={18} />,
          label: "Orçamento",
        },
        {
          path: "/estoques",
          icon: <Package size={18} />,
          label: "Estoques e inventário",
        },
        {
          path: "/notificacoes",
          icon: <Bell size={18} />,
          label: "Notificações",
        },
        {
          path: "/capacitacao",
          icon: <GraduationCap size={18} />,
          label: "Capacitação",
        },
        {
          path: "/aquisicoes",
          icon: <ShoppingCart size={18} />,
          label: "Aquisições",
        },
      )
    }

    return items
  }

  const menuItems = getMenuItems()

  return (
    <>
      {isMobile && (
        <button className="mobile-menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      )}

      <aside className={`sidebar ${isMobile ? (mobileOpen ? "mobile-open" : "mobile-closed") : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo">
              <img src={logoImage || "/placeholder.svg"} alt="CompJr Logo" className="logo-image" />
            </div>
            <div className="logo-text">
              <span className="logo-name">CompJr</span>
              <span className="logo-subtitle">Sistema ERP</span>
              {userRole === "admin" && <span className="user-role-badge">Administrador</span>}
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className={`nav-item ${isActive(item.path) ? "active" : ""}`}>
                <Link
                  to={item.path}
                  className="nav-link"
                  onClick={() => {
                    console.log("Navigating to:", item.path)
                    if (isMobile) {
                      setMobileOpen(false)
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isMobile && mobileOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  )
}

export default Sidebar
