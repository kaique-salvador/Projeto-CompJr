"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import "../styles/Funcionarios.css"

const Funcionarios = () => {
  console.log("Funcionarios component rendering")
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtro, setFiltro] = useState("Todos")
  const [itensPorPagina, setItensPorPagina] = useState(10)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [showFiltroDropdown, setShowFiltroDropdown] = useState(false)
  const [showPaginaDropdown, setShowPaginaDropdown] = useState(false)

  // Refs para os dropdowns
  const filtroDropdownRef = useRef(null)
  const paginaDropdownRef = useRef(null)

  // Dados simulados de funcionários
  const funcionarios = [
    {
      id: "01",
      nome: "Sandra",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "sandra@compjr.com",
      area: "Gerência",
      cargo: "Recursos Humanos",
    },
    {
      id: "02",
      nome: "Abdu",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "abdu@compjr.com",
      area: "Projetos",
      cargo: "Operações",
    },
    {
      id: "03",
      nome: "Jão",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "jao@compjr.com",
      area: "Projetos",
      cargo: "Operações",
    },
    {
      id: "04",
      nome: "José",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "jose@compjr.com",
      area: "Gerência",
      cargo: "Gerente de projetos",
    },
    {
      id: "05",
      nome: "Fatima",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "fatima@compjr.com",
      area: "RH",
      cargo: "Atendimento ao Cliente",
    },
    {
      id: "06",
      nome: "Carlota",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "carlota@compjr.com",
      area: "RH",
      cargo: "Recursos Humanos",
    },
    {
      id: "07",
      nome: "Sandro",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "sandro@compjr.com",
      area: "RH",
      cargo: "Recursos Humanos",
    },
    {
      id: "08",
      nome: "Josué",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "josue@compjr.com",
      area: "Projetos",
      cargo: "Infraestrutura",
    },
    {
      id: "09",
      nome: "Jericó",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "jerico@compjr.com",
      area: "Comercial",
      cargo: "Operações",
    },
    {
      id: "10",
      nome: "Lele",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "lele@compjr.com",
      area: "Gerência",
      cargo: "Segurança",
    },
    {
      id: "11",
      nome: "Marcos",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "marcos@compjr.com",
      area: "TI",
      cargo: "Desenvolvedor",
    },
    {
      id: "12",
      nome: "Luiza",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "luiza@compjr.com",
      area: "Marketing",
      cargo: "Designer",
    },
    {
      id: "13",
      nome: "Pedro",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "pedro@compjr.com",
      area: "Financeiro",
      cargo: "Analista",
    },
    {
      id: "14",
      nome: "Ana",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "ana@compjr.com",
      area: "Vendas",
      cargo: "Gerente",
    },
    {
      id: "15",
      nome: "Carlos",
      telefone: "(35) 98765-4321",
      nascimento: "01/01/1999",
      ingresso: "01/01/2024",
      email: "carlos@compjr.com",
      area: "Suporte",
      cargo: "Técnico",
    },
  ]

  // Filtrar funcionários com base na pesquisa
  const funcionariosFiltrados = funcionarios.filter((funcionario) => {
    const termoDeBusca = searchTerm.toLowerCase()
    return (
      funcionario.nome.toLowerCase().includes(termoDeBusca) ||
      funcionario.email.toLowerCase().includes(termoDeBusca) ||
      funcionario.cargo.toLowerCase().includes(termoDeBusca) ||
      funcionario.area.toLowerCase().includes(termoDeBusca)
    )
  })

  // Calcular paginação
  const indexDoUltimoItem = paginaAtual * itensPorPagina
  const indexDoPrimeiroItem = indexDoUltimoItem - itensPorPagina
  const itensPaginaAtual = funcionariosFiltrados.slice(indexDoPrimeiroItem, indexDoUltimoItem)
  const totalPaginas = Math.ceil(funcionariosFiltrados.length / itensPorPagina)

  // Mudar página
  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina)
  }

  // Fechar dropdowns quando clicar fora deles
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtroDropdownRef.current && !filtroDropdownRef.current.contains(event.target)) {
        setShowFiltroDropdown(false)
      }

      if (paginaDropdownRef.current && !paginaDropdownRef.current.contains(event.target)) {
        setShowPaginaDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    console.log("Funcionarios useEffect running")

    // Verificar autenticação e permissões
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")
    console.log("Auth check:", isAuthenticated, userRole)

    if (!isAuthenticated || userRole !== "admin") {
      console.log("Redirecting to dashboard due to insufficient permissions")
      navigate("/dashboard")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    navigate("/")
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Header
          customTitle="Todos os funcionários"
          customSubtitle="Visualizar, pesquisar e adicionar novos funcionários"
          onLogout={handleLogout}
        />

        <main className="funcionarios-content">
          <div className="funcionarios-actions">
            <div className="search-container">
              <h3>Pesquisa rápida de um funcionário</h3>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Digite o nome de pesquisa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <Search className="search-icon" size={20} />
              </div>
            </div>

            <div className="funcionarios-count">
              <h2>{funcionarios.length}</h2>
              <p>Total de funcionários</p>
            </div>

            <div className="filter-add-container">
              <div className="filter-container">
                <h3>Filtrar funcionário</h3>
                <div className="dropdown-container" ref={filtroDropdownRef}>
                  <button className="dropdown-button" onClick={() => setShowFiltroDropdown(!showFiltroDropdown)}>
                    {filtro}
                    <ChevronDown size={16} />
                  </button>
                  {showFiltroDropdown && (
                    <div className="dropdown-menu">
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          setFiltro("Todos")
                          setShowFiltroDropdown(false)
                        }}
                      >
                        Todos
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          setFiltro("RH")
                          setShowFiltroDropdown(false)
                        }}
                      >
                        RH
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          setFiltro("Gerência")
                          setShowFiltroDropdown(false)
                        }}
                      >
                        Gerência
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          setFiltro("Projetos")
                          setShowFiltroDropdown(false)
                        }}
                      >
                        Projetos
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="add-button-container">
                <button className="add-button" onClick={() => navigate("/funcionarios/adicionar")}>
                  Adicionar novo
                </button>
              </div>
            </div>
          </div>

          <div className="funcionarios-table-container">
            <div className="table-header">
              <h2>Todos os funcionários</h2>
              <div className="table-options">
                <span>Mostrando</span>
                <div className="dropdown-container" ref={paginaDropdownRef}>
                  <button className="dropdown-button small" onClick={() => setShowPaginaDropdown(!showPaginaDropdown)}>
                    {itensPorPagina}
                    <ChevronDown size={16} />
                  </button>
                  {showPaginaDropdown && (
                    <div className="dropdown-menu">
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          setItensPorPagina(10)
                          setShowPaginaDropdown(false)
                        }}
                      >
                        10
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          setItensPorPagina(12)
                          setShowPaginaDropdown(false)
                        }}
                      >
                        12
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          setItensPorPagina(20)
                          setShowPaginaDropdown(false)
                        }}
                      >
                        20
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          setItensPorPagina(50)
                          setShowPaginaDropdown(false)
                        }}
                      >
                        50
                      </div>
                    </div>
                  )}
                </div>
                <span>por página</span>
              </div>
            </div>

            <div className="funcionarios-table">
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Nascimento</th>
                    <th>Ingresso</th>
                    <th>Email</th>
                    <th>Área</th>
                    <th>Cargo</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {itensPaginaAtual.length > 0 ? (
                    itensPaginaAtual.map((funcionario) => (
                      <tr key={funcionario.id}>
                        <td>{funcionario.id}</td>
                        <td>{funcionario.nome}</td>
                        <td>{funcionario.telefone}</td>
                        <td>{funcionario.nascimento}</td>
                        <td>{funcionario.ingresso}</td>
                        <td>{funcionario.email}</td>
                        <td>{funcionario.area}</td>
                        <td>{funcionario.cargo}</td>
                        <td>
                          <button type="button" className="ver-mais-btn">
                            Ver mais
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="empty-row">
                      <td colSpan="9">Nenhum funcionário encontrado</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                // Mostrar no máximo 5 páginas
                const pageNum = i + 1
                if (paginaAtual > 3 && totalPaginas > 5) {
                  if (i === 0) return paginaAtual - 2
                  if (i === 1) return paginaAtual - 1
                  if (i === 2) return paginaAtual
                  if (i === 3) return paginaAtual + 1
                  if (i === 4) return paginaAtual + 2
                }
                return pageNum
              }).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`pagination-button ${paginaAtual === pageNum ? "active" : ""}`}
                  onClick={() => mudarPagina(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
              {totalPaginas > 5 && (
                <button
                  className="pagination-button next"
                  onClick={() => mudarPagina(Math.min(paginaAtual + 1, totalPaginas))}
                >
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Funcionarios
