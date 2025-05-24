"use client"

import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import CardResumo from "../components/CardResumo"
import { useNavigate } from "react-router-dom"
import { DollarSign, PieChart, Wallet, Percent, Eye, Edit, Trash2 } from "lucide-react"
import "../styles/Orcamento.css"

const Orcamento = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("Usuário")
  const [currentDate, setCurrentDate] = useState("")
  const [historico, setHistorico] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  // Dados iniciais padrão
  const initialData = [
    {
      id: "01",
      numero: "00211235",
      projeto: "Landingpage beneficente",
      estimado: "1.400.000,00",
      custos: "1.380.000,00",
      cliente: "Clovis",
      status: "Em análise",
    },
    {
      id: "02",
      numero: "36211235",
      projeto: "Sistema de eventos",
      estimado: "400.000,00",
      custos: "500.000,00",
      cliente: "Carlota",
      status: "Reprovado",
    },
    {
      id: "03",
      numero: "00211235",
      projeto: "Chatbot eventos",
      estimado: "2.000.000,00",
      custos: "1.800.000,00",
      cliente: "Jão",
      status: "Em análise",
    },
    {
      id: "04",
      numero: "00214465",
      projeto: "Sistema de ingressos",
      estimado: "1.400.000,00",
      custos: "1.380.000,00",
      cliente: "Gesonel",
      status: "Aprovado",
    },
    {
      id: "05",
      numero: "36211235",
      projeto: "Sistema para leitura de arquivos",
      estimado: "400.000,00",
      custos: "500.000,00",
      cliente: "Alex",
      status: "Reprovado",
    },
    {
      id: "06",
      numero: "00211235",
      projeto: "Site da empresa junior",
      estimado: "1.400.000,00",
      custos: "1.380.000,00",
      cliente: "Interno",
      status: "Aprovado",
    },
    {
      id: "07",
      numero: "00211235",
      projeto: "Sistema de fluxo de caixa",
      estimado: "1.400.000,00",
      custos: "1.380.000,00",
      cliente: "Gustavo",
      status: "Aprovado",
    },
  ]

  // Função para carregar os orçamentos
  const loadOrcamentos = () => {
    try {
      // Tentar carregar do localStorage
      const savedOrcamentos = localStorage.getItem("historicoOrcamentos")

      if (savedOrcamentos.length > 0) {
        // Se existir no localStorage, usar esses dados
        const parsedData = JSON.parse(savedOrcamentos)
        console.log("Orçamentos carregados do localStorage:", parsedData)
        return parsedData
      } else {
        // Se não existir, usar os dados iniciais e salvar no localStorage
        console.log("Usando dados iniciais padrão")
        localStorage.setItem("historicoOrcamentos", JSON.stringify(initialData))
        return initialData
      }
    } catch (error) {
      console.error("Erro ao carregar orçamentos:", error)
      // Em caso de erro, usar os dados iniciais
      return initialData
    }
  }

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "Usuário")
    const now = new Date()
    setCurrentDate(
      now.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    )

    // Carregar orçamentos
    const orcamentosData = loadOrcamentos()
    setHistorico(orcamentosData)
  }, [])

  // Verificar se há novos orçamentos a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const savedOrcamentos = localStorage.getItem("historicoOrcamentos")
        if (savedOrcamentos) {
          const parsedData = JSON.parse(savedOrcamentos)
          // Só atualiza se o número de orçamentos for diferente
          if (parsedData.length !== historico.length) {
            console.log("Atualizando orçamentos:", parsedData)
            setHistorico(parsedData)
          }
        }
      } catch (error) {
        console.error("Erro ao verificar novos orçamentos:", error)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Salvar orçamentos no localStorage quando mudar
  useEffect(() => {
    if (historico.length > 0) {
      localStorage.setItem("historicoOrcamentos", JSON.stringify(historico))
    }
  }, [historico])

  const handleConsultar = (item) => {
    setModalData(item)
    setShowModal(true)
  }

  const handleEditar = (item) => {
    // Ainda preciso implementar a página de edição
    // Por enquanto, apenas mostra os detalhes
    setModalData(item)
    setShowModal(true)
  }

  const handleExcluir = (item) => {
    setItemToDelete(item)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      // Cria uma nova lista sem o item a ser excluído
      const updatedHistorico = historico.filter((item) => item.id !== itemToDelete.id)

      // Atualiza o estado e o localStorage
      setHistorico(updatedHistorico)
      localStorage.setItem("historicoOrcamentos", JSON.stringify(updatedHistorico))

      setShowDeleteModal(false)
      setItemToDelete(null)
    }
  }

  const handleStatusChange = (id, newStatus) => {
    const updatedHistorico = historico.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus }
      }
      return item
    })
    setHistorico(updatedHistorico)
  }

  return (
    <div className="orcamento-layout">
      <Sidebar />
      <div className="orcamento-content">
        <div className="header-fixed">
          <Header
            customTitle="Orçamento"
            customSubtitle="Criar e enviar, solicitações de orçamentos"
            userName={userName}
            currentDate={currentDate}
          />
        </div>

        <div className="cards-resumo">
          <CardResumo
            icon={<DollarSign size={20} />}
            title="Orçamento total"
            value="R$23.000.000"
            trend="up"
            trendValue="+5% este ano"
            color="blue"
          />
          <CardResumo icon={<PieChart size={20} />} title="Quantidade usada" value="R$10.000.000" color="purple" />
          <CardResumo icon={<Wallet size={20} />} title="Saldo orçamentário" value="R$13.000.000" color="indigo" />
          <CardResumo icon={<Percent size={20} />} title="Orçamento utilizado" value="48%" color="green" />
        </div>

        <div className="orcamento-body">
          <div className="orcamento-header-bar">
            <h2>Crie um orçamento</h2>
            <button className="button-criar" onClick={() => navigate("/orcamentos/novo")}>
              Criar orçamento
            </button>
          </div>

          <div className="orcamento-table-container">
            <table className="orcamento-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Orçamento nº</th>
                  <th>Projeto</th>
                  <th>Estimado (R$)</th>
                  <th>Custos (R$)</th>
                  <th>Cliente</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {historico.length > 0 ? (
                  historico.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.numero}</td>
                      <td>{item.projeto || item.descricao}</td>
                      <td>{item.estimado}</td>
                      <td>{item.custos}</td>
                      <td>{item.cliente}</td>
                      <td>
                        <select
                          className="status-select"
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          style={{
                            backgroundColor:
                              item.status === "Aprovado"
                                ? "#ecfdf5"
                                : item.status === "Reprovado"
                                  ? "#fef2f2"
                                  : "#fefce8",
                            color:
                              item.status === "Aprovado"
                                ? "#059669"
                                : item.status === "Reprovado"
                                  ? "#dc2626"
                                  : "#b45309",
                          }}
                        >
                          <option value="Em análise">Em análise</option>
                          <option value="Aprovado">Aprovado</option>
                          <option value="Reprovado">Reprovado</option>
                        </select>
                      </td>
                      <td>
                        <div className="acoes-container">
                          <button
                            className="btn-acao btn-consultar"
                            onClick={() => handleConsultar(item)}
                            title="Consultar"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="btn-acao btn-editar" onClick={() => handleEditar(item)} title="Editar">
                            <Edit size={16} />
                          </button>
                          <button className="btn-acao btn-excluir" onClick={() => handleExcluir(item)} title="Excluir">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "2rem" }}>
                      Nenhum orçamento encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de detalhes/consulta */}
      {showModal && modalData && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Detalhes do Orçamento</h2>
            <div className="modal-info">
              <div className="modal-info-row">
                <div className="modal-info-label">Número:</div>
                <div className="modal-info-value">{modalData.numero}</div>
              </div>
              <div className="modal-info-row">
                <div className="modal-info-label">Projeto:</div>
                <div className="modal-info-value">{modalData.projeto || modalData.descricao}</div>
              </div>
              <div className="modal-info-row">
                <div className="modal-info-label">Cliente:</div>
                <div className="modal-info-value">{modalData.cliente}</div>
              </div>
              <div className="modal-info-row">
                <div className="modal-info-label">Valor Estimado:</div>
                <div className="modal-info-value">R$ {modalData.estimado}</div>
              </div>
              <div className="modal-info-row">
                <div className="modal-info-label">Custos Previstos:</div>
                <div className="modal-info-value">R$ {modalData.custos}</div>
              </div>
              <div className="modal-info-row">
                <div className="modal-info-label">Status:</div>
                <div className="modal-info-value">{modalData.status}</div>
              </div>
              {modalData.dataCriacao && (
                <div className="modal-info-row">
                  <div className="modal-info-label">Data de Criação:</div>
                  <div className="modal-info-value">{modalData.dataCriacao}</div>
                </div>
              )}
              {modalData.membro && (
                <div className="modal-info-row">
                  <div className="modal-info-label">Membro Responsável:</div>
                  <div className="modal-info-value">{modalData.membro}</div>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn-confirmar" onClick={() => setShowModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o orçamento "{itemToDelete?.projeto || itemToDelete?.descricao}"?</p>
            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={confirmDelete}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orcamento
