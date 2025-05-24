"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import CardResumo from "../components/CardResumo"
import Header from "../components/Header"
import { Users, FileText, Briefcase, Building2 } from "lucide-react"
import "../styles/Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("João Jão")
  const [currentDate, setCurrentDate] = useState("")
  const [userRole, setUserRole] = useState("user")

  // Dados simulados para as tabelas
  const comunicados = [
    { id: "01", titulo: "Comunicado de operações", enviadoDe: "João Jão", enviadoPara: "Israel", status: "Pendente" },
    { id: "02", titulo: "Projeto de operações", enviadoDe: "Fatima", enviadoPara: "Mu de Áries", status: "Aprovado" },
    { id: "03", titulo: "Aviso de projeto", enviadoDe: "João Jão", enviadoPara: "James brown", status: "Aprovado" },
    { id: "04", titulo: "Relatório mensal", enviadoDe: "Maria Silva", enviadoPara: "Todos", status: "Pendente" },
  ]

  const funcionarios = [
    { id: "01", nome: "Israel kamakawiwo'ole", funcao: "Admin", designacao: "Recursos Humanos" },
    { id: "02", nome: "Obi-Wan Kenobi", funcao: "Admin", designacao: "Gerenciamento" },
    { id: "03", nome: "Darth Sidious", funcao: "Head TI", designacao: "Pessoas e Operação" },
    { id: "04", nome: "Luke Skywalker", funcao: "Gerente", designacao: "Projetos Especiais" },
  ]

  const comprovantes = [
    { id: "01", assunto: "Solicitação de orçamento para outubro", data: "25/01/2023", status: "Pendente" },
    { id: "02", assunto: "Solicitação de taxa de proposta", data: "19/01/2023", status: "Aprovado" },
    { id: "03", assunto: "Solicitação de orçamento para fevereiro", data: "10/01/2023", status: "Aprovado" },
    { id: "04", assunto: "Solicitação de orçamento para março", data: "05/01/2023", status: "Rejeitado" },
  ]

  const candidaturas = {
    total: 500,
    pendentes: 75, 
    aprovadas: 375, 
    rejeitadas: 50,
  }

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole") || "user"
    console.log("Dashboard - User role:", role)
    setUserRole(role)

    const now = new Date()
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    setCurrentDate(now.toLocaleDateString("pt-BR", options))

    // Obter o nome do usuário do localStorage
    const storedUserName = localStorage.getItem("userName")
    if (storedUserName) {
      setUserName(storedUserName)
    }

    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    navigate("/")
  }

  return (
    <div className={`dashboard-layout ${userRole === "user" ? "no-sidebar" : ""}`}>
      {userRole === "admin" && <Sidebar />}

      <div className="dashboard-content">
        <Header userName={userName} currentDate={currentDate} onLogout={handleLogout} showLogo={userRole === "user"} />

        <main className="main-content">
          <div className="cards-container">
            <CardResumo
              icon={<Users size={20} />}
              title="Total de funcionários"
              value="250"
              trend="up"
              trendValue="12% a mais que no último trimestre"
              color="blue"
            />
            <CardResumo
              icon={<FileText size={20} />}
              title="Total de candidaturas"
              value="100"
              trend="down"
              trendValue="0.2% abaixo do último trimestre"
              color="blue"
            />
            <CardResumo
              icon={<Briefcase size={20} />}
              title="Total de projetos"
              value="10"
              trend="up"
              trendValue="2% a mais que no último trimestre"
              color="purple"
            />
            <CardResumo icon={<Building2 size={20} />} title="Total de departamentos" value="10" color="green" />
          </div>

          <div className="dashboard-grid">
            {/* Seção de Comunicados */}
            <div className="dashboard-section comunicados-section">
              <div className="section-header">
                <h2>Comunicados</h2>
              </div>
              <div className="table-container">
                <table className="data-table comunicados-table">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Título</th>
                      <th>Enviado de</th>
                      <th>Enviado para</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comunicados.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.titulo}</td>
                        <td>{item.enviadoDe}</td>
                        <td>{item.enviadoPara}</td>
                        <td>
                          <span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seção de Lista de Funcionários */}
            <div className="dashboard-section funcionarios-section">
              <div className="section-header">
                <h2>Lista de funcionários</h2>
              </div>
              <div className="table-container">
                <table className="data-table funcionarios-table">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Nome</th>
                      <th>Função</th>
                      <th>Designação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funcionarios.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.funcao}</td>
                        <td>{item.designacao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seção de Comprovantes de Pagamento */}
            <div className="dashboard-section comprovantes-section">
              <div className="section-header">
                <h2>Comprovantes de pagamento</h2>
              </div>
              <div className="table-container">
                <table className="data-table comprovantes-table">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Assunto</th>
                      <th>Data</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comprovantes.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.assunto}</td>
                        <td>{item.data}</td>
                        <td>
                          <span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seção de Card de Candidaturas */}
            <div className="dashboard-section candidaturas-section">
              <div className="section-header">
                <h2>Card de candidaturas</h2>
              </div>
              <div className="candidaturas-card">
                <div className="candidaturas-total">{candidaturas.total} Total de candidaturas</div>
                <div className="candidaturas-chart-container">
                  <div className="candidaturas-chart">
                    <div className="donut-chart">
                      <div className="donut-hole"></div>
                    </div>
                  </div>
                  <div className="candidaturas-legend">
                    <div className="legend-item">
                      <span className="legend-color legend-pending"></span>
                      <div className="legend-text">
                        <span className="legend-value">{candidaturas.pendentes}</span>
                        <span className="legend-label">Pendente</span>
                      </div>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color legend-approved"></span>
                      <div className="legend-text">
                        <span className="legend-value">{candidaturas.aprovadas}</span>
                        <span className="legend-label">Aprovado</span>
                      </div>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color legend-rejected"></span>
                      <div className="legend-text">
                        <span className="legend-value">{candidaturas.rejeitadas}</span>
                        <span className="legend-label">Rejeitado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
