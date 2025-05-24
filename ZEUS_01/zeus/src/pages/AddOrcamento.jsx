import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Check, AlertCircle } from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import "../styles/AddOrcamento.css"

const AddOrcamento = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    numero: "",
    descricao: "",
    cliente: "",
    membro: "",
    estimado: "",
    custos: "",
  })
  const [errors, setErrors] = useState({})
  const [membros, setMembros] = useState(["João Jão", "Maria Silva", "Carlos Lima"])
  const [orcamentosPendentes, setOrcamentosPendentes] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showBackModal, setShowBackModal] = useState(false)
  const [showSendSuccessModal, setShowSendSuccessModal] = useState(false)

  // Carregar orçamentos pendentes do localStorage ao iniciar
  useEffect(() => {
    const savedOrcamentos = localStorage.getItem("orcamentosPendentes")
    if (savedOrcamentos) {
      setOrcamentosPendentes(JSON.parse(savedOrcamentos))
    }
  }, [])

  // Salvar orçamentos pendentes no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("orcamentosPendentes", JSON.stringify(orcamentosPendentes))
  }, [orcamentosPendentes])

  const handleChange = (e) => {
    const { name, value } = e.target

    // Validação para permitir apenas números em campos numéricos
    if ((name === "estimado" || name === "custos" || name === "numero") && !/^\d*$/.test(value)) {
      return
    }

    setFormData({ ...formData, [name]: value })

    // Limpar erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Verificar campos obrigatórios
    if (!formData.numero) newErrors.numero = "O número do orçamento é obrigatório"
    if (!formData.descricao) newErrors.descricao = "A descrição do projeto é obrigatória"
    if (!formData.estimado) newErrors.estimado = "O valor estimado é obrigatório"
    if (!formData.custos) newErrors.custos = "Os custos previstos são obrigatórios"
    if (!formData.cliente) newErrors.cliente = "O cliente associado é obrigatório"
    if (!formData.membro) newErrors.membro = "O membro responsável é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Gerar ID único para o orçamento
      const newId = String(Math.floor(Math.random() * 1000)).padStart(2, "0")

      // Criar uma cópia do formData com a data atual e status padrão
      const newOrcamento = {
        ...formData,
        id: newId,
        dataCriacao: new Date().toLocaleDateString("pt-BR"),
        status: "Em análise",
        projeto: formData.descricao, 
      }

      // Adicionar à lista de orçamentos pendentes
      setOrcamentosPendentes((prevOrcamentos) => [...prevOrcamentos, newOrcamento])
      setShowSuccess(true)

      setFormData({
        numero: "",
        descricao: "",
        cliente: "",
        membro: "",
        estimado: "",
        custos: "",
      })
    }
  }

  const openSendModal = (index) => {
    // Obtem o orçamento a ser enviado
    const orcamentoToSend = orcamentosPendentes[index]

    // Obtem orçamentos existentes do localStorage
    let existingOrcamentos = []
    try {
      const savedOrcamentos = localStorage.getItem("historicoOrcamentos")
      if (savedOrcamentos) {
        existingOrcamentos = JSON.parse(savedOrcamentos)
      }
    } catch (error) {
      console.error("Erro ao carregar orçamentos existentes:", error)
      existingOrcamentos = []
    }

    const updatedOrcamentos = [...existingOrcamentos, orcamentoToSend]

    // Salvar no localStorage
    localStorage.setItem("historicoOrcamentos", JSON.stringify(updatedOrcamentos))
    console.log("Orçamento enviado e salvo:", updatedOrcamentos)

    // Remover da lista de pendentes
    const updated = [...orcamentosPendentes]
    updated.splice(index, 1)
    setOrcamentosPendentes(updated)

    setShowSendSuccessModal(true)
  }

  const handleCancel = () => {
    setShowCancelModal(true)
  }

  const confirmCancel = () => {
    navigate("/orcamentos")
  }

  const handleBack = () => {
    // Verificar se algum campo foi preenchido
    const isFormFilled = Object.values(formData).some((value) => value !== "")

    if (isFormFilled) {
      setShowBackModal(true)
    } else {
      navigate("/orcamentos")
    }
  }

  return (
    <div className="orcamento-layout">
      <Sidebar />
      <div className="orcamento-content">
        <div className="header-fixed">
          <Header customTitle="Orçamento" customSubtitle="Criar e enviar, solicitações de orçamentos" />
        </div>

        <main className="add-orcamento-container">
          <div className="back-button-container">
            <button type="button" className="btn-voltar" onClick={handleBack}>
              <ArrowLeft size={16} />
              <span> Voltar</span>
            </button>
          </div>

          

          <form className="orcamento-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Preencha todos os campos abaixo para criar um novo orçamento</h2>
            <div className="form-group">
              <label>Número do orçamento</label>
              <input
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Insira o item"
                className={errors.numero ? "error" : ""}
              />
              {errors.numero && <span className="error-message">{errors.numero}</span>}
            </div>

            <div className="form-group">
              <label>Descrição do projeto</label>
              <input
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Insira a descrição"
                className={errors.descricao ? "error" : ""}
              />
              {errors.descricao && <span className="error-message">{errors.descricao}</span>}
            </div>

            <div className="form-group">
              <label>Valor estimado</label>
              <input
                name="estimado"
                value={formData.estimado}
                onChange={handleChange}
                placeholder="Insira o valor em R$"
                className={errors.estimado ? "error" : ""}
              />
              {errors.estimado && <span className="error-message">{errors.estimado}</span>}
            </div>

            <div className="form-group">
              <label>Custos previstos</label>
              <input
                name="custos"
                value={formData.custos}
                onChange={handleChange}
                placeholder="Insira o valor em R$"
                className={errors.custos ? "error" : ""}
              />
              {errors.custos && <span className="error-message">{errors.custos}</span>}
            </div>

            <div className="form-group">
              <label>Cliente associado</label>
              <select
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                className={errors.cliente ? "error" : ""}
              >
                <option value="">Selecione a opção</option>
                <option value="Clovis">Clovis</option>
                <option value="Carlota">Carlota</option>
                <option value="Gesonel">Gesonel</option>
              </select>
              {errors.cliente && <span className="error-message">{errors.cliente}</span>}
            </div>

            <div className="form-group">
              <label>Membro responsável</label>
              <select
                name="membro"
                value={formData.membro}
                onChange={handleChange}
                className={errors.membro ? "error" : ""}
              >
                <option value="">Selecione a opção</option>
                {membros.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.membro && <span className="error-message">{errors.membro}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-confirmar">
                Criar orçamento
              </button>
              <button type="button" className="btn-cancelar" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>

          {/* Lista de orçamentos pendentes */}
          <div className="orcamento-pendentes">
            <h2 className="table-title">Solicitações de Orçamentos</h2>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Orçamento nº</th>
                  <th>Descrição do projeto</th>
                  <th>Valor estimado (R$)</th>
                  <th>Data de criação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {orcamentosPendentes.length > 0 ? (
                  orcamentosPendentes.map((o, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{o.numero}</td>
                      <td>{o.descricao}</td>
                      <td>{o.estimado}</td>
                      <td>{o.dataCriacao}</td>
                      <td>
                        <button className="btn-enviar" onClick={() => openSendModal(i)}>
                          Enviar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      Nenhum orçamento pendente
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal de sucesso */}
          {showSuccess && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-icon success">
                  <Check size={32} />
                </div>
                <h2>Orçamento criado com sucesso!</h2>
                <p>O orçamento foi adicionado à lista de solicitações abaixo.</p>
                <div className="modal-actions">
                  <button className="btn-confirmar" onClick={() => setShowSuccess(false)}>
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de sucesso ao enviar */}
          {showSendSuccessModal && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-icon success">
                  <Check size={32} />
                </div>
                <h2>Parabéns!</h2>
                <p>Seu orçamento foi enviado com sucesso!</p>
                <div className="modal-actions">
                  <button className="btn-confirmar" onClick={() => setShowSendSuccessModal(false)}>
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de cancelamento */}
          {showCancelModal && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-icon warning">
                  <AlertCircle size={32} />
                </div>
                <h2>Deseja realmente cancelar?</h2>
                <p>Os dados não serão mantidos.</p>
                <div className="modal-actions">
                  <button onClick={confirmCancel} className="btn-confirmar">
                    Sim
                  </button>
                  <button onClick={() => setShowCancelModal(false)} className="btn-cancelar">
                    Não
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de voltar */}
          {showBackModal && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-icon warning">
                  <AlertCircle size={32} />
                </div>
                <h2>Deseja voltar para a listagem?</h2>
                <p>Os dados não serão mantidos.</p>
                <div className="modal-actions">
                  <button className="btn-cancelar" onClick={() => setShowBackModal(false)}>
                    Não, continuar editando
                  </button>
                  <button className="btn-confirmar" onClick={() => navigate("/orcamentos")}>
                    Sim, voltar
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AddOrcamento
