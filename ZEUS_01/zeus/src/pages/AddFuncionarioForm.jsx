"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, Check, AlertCircle } from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import "../styles/AddFuncionarioForm.css"

const AddFuncionarioForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    cargo: "",
    telefone: "",
    genero: "",
    foto: null,
    dataIngresso: "",
    habilidades: [],
    area: "",
  })

  const [errors, setErrors] = useState({})
  const [previewUrl, setPreviewUrl] = useState("")
  const fileInputRef = useRef(null)
  const [userName, setUserName] = useState("João Jão")
  const [userRole, setUserRole] = useState("RH")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showBackModal, setShowBackModal] = useState(false)
  const [formModified, setFormModified] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  // Opções para os selects
  const opcoesGenero = ["Masculino", "Feminino", "Outro", "Prefiro não informar"]
  const opcoesCargo = ["Recursos Humanos", "Gerente de projetos", "Desenvolvedor", "Designer", "Analista", "Operações"]
  const opcoesArea = ["RH", "Gerência", "Projetos", "TI", "Marketing", "Comercial", "Financeiro"]
  const opcoesHabilidades = [
    "JavaScript",
    "React",
    "Node.js",
    "Design",
    "Gestão de Projetos",
    "Comunicação",
    "Liderança",
    "Trabalho em Equipe",
  ]

  // Validar se as datas são menores que a data atual e válidas
  const validateDate = (date, fieldName) => {
    if (!date) return false

    // Verificar formato DD/MM/YYYY
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = date.match(dateRegex)

    if (!match) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Formato de data inválido. Use DD/MM/YYYY",
      }))
      return false
    }

    const day = Number.parseInt(match[1], 10)
    const month = Number.parseInt(match[2], 10)
    const year = Number.parseInt(match[3], 10)

    // Validar mês
    if (month < 1 || month > 12) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Mês inválido. Deve estar entre 1 e 12",
      }))
      return false
    }

    // Validar dia com base no mês
    let maxDays = 31
    if (month === 4 || month === 6 || month === 9 || month === 11) {
      maxDays = 30
    } else if (month === 2) {
      // Verificar se é ano bissexto
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      maxDays = isLeapYear ? 29 : 28
    }

    if (day < 1 || day > maxDays) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: `Dia inválido para o mês ${month}. Deve estar entre 1 e ${maxDays}`,
      }))
      return false
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const selectedDate = new Date(year, month - 1, day)
    selectedDate.setHours(0, 0, 0, 0)

    if (selectedDate >= today) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: `A data deve ser menor que a data atual`,
      }))
      return false
    }

    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })

    return true
  }

  // Validar o domínio do email
  const validateEmail = (email) => {
    // Verificar se o email termina com @compjr.com
    if (!email.endsWith("@compjr.com")) {
      setErrors((prev) => ({
        ...prev,
        email: "O email deve ter o domínio @compjr.com",
      }))
      return false
    }

    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.email
      return newErrors
    })

    return true
  }

  // Validar o arquivo de imagem
  const validateImage = (file) => {
    if (!file) return true // Foto não é mais obrigatória

    // Verificar o tipo do arquivo
    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        foto: "O arquivo deve ser JPG, JPEG ou PNG",
      }))
      return false
    }

    // Verificar o tamanho do arquivo (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        foto: "O tamanho máximo do arquivo é 2MB",
      }))
      return false
    }

    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.foto
      return newErrors
    })

    return true
  }

  // Validar todos os campos obrigatórios
  const validateForm = () => {
    const newErrors = {}

    // Validar campos obrigatórios
    const requiredFields = ["nome", "dataNascimento", "email", "cargo", "telefone", "genero", "dataIngresso", "area"]
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Este campo é obrigatório"
      }
    })

    // Validar datas
    if (formData.dataNascimento && !validateDate(formData.dataNascimento, "dataNascimento")) {
      newErrors.dataNascimento = "Data de nascimento inválida"
    }

    if (formData.dataIngresso && !validateDate(formData.dataIngresso, "dataIngresso")) {
      newErrors.dataIngresso = "Data de ingresso inválida"
    }

    // Validar email
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "O email deve ter o domínio @compjr.com"
    }

    // Validar foto (se fornecida)
    if (formData.foto && !validateImage(formData.foto)) {
      newErrors.foto = "Formato de imagem inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Aplicar máscara de data (DD/MM/YYYY)
  const applyDateMask = (value) => {
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, "")

    // Limita a 8 dígitos
    if (value.length > 8) value = value.slice(0, 8)

    // Aplica a máscara
    if (value.length > 4) {
      return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`
    } else if (value.length > 2) {
      return `${value.slice(0, 2)}/${value.slice(2)}`
    }

    return value
  }

  // Aplicar máscara de telefone ((XX) XXXXX-XXXX)
  const applyPhoneMask = (value) => {
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, "")

    // Limita a 11 dígitos (DDD + 9 dígitos)
    if (value.length > 11) value = value.slice(0, 11)

    // Aplica a máscara
    if (value.length > 7) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
    } else if (value.length > 2) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`
    } else if (value.length > 0) {
      return `(${value}`
    }

    return value
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let newValue = value

    // Marca o formulário como modificado
    setFormModified(true)

    // Aplica máscaras específicas para cada campo
    if (name === "dataNascimento" || name === "dataIngresso") {
      newValue = applyDateMask(value)
    } else if (name === "telefone") {
      newValue = applyPhoneMask(value)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    // Validação em tempo real para alguns campos
    if (name === "dataNascimento" || name === "dataIngresso") {
      validateDate(newValue, name)
    } else if (name === "email") {
      validateEmail(newValue)
    }
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setFormModified(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (validateImage(file)) {
      setFormData((prev) => ({
        ...prev,
        foto: file,
      }))
      setFormModified(true)

      // Criar URL para preview
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    } else {
      // Limpar o input de arquivo se a validação falhar
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setShowAddModal(true) // Isso deve mostrar o modal de confirmação
    }
  }

  const handleCancel = () => {
    if (formModified) {
      setShowCancelModal(true)
    } else {
      navigate("/funcionarios")
    }
  }

  const handleBack = () => {
    if (formModified) {
      setShowBackModal(true)
    } else {
      navigate("/funcionarios")
    }
  }

  const confirmAddEmployee = () => {
    console.log("Dados do funcionário:", formData)
    setShowAddModal(false)
    setShowSuccessModal(true)

    // Redirecionar após 2 segundos
    setTimeout(() => {
      navigate("/funcionarios")
    }, 2000)
  }

  useEffect(() => {
    // Obter o nome do usuário e função do localStorage
    const storedUserName = localStorage.getItem("userName")
    const storedUserRole = localStorage.getItem("userRole")

    if (storedUserName) {
      setUserName(storedUserName)
    }

    if (storedUserRole) {
      setUserRole(storedUserRole)
    }

    // Verificar autenticação e permissões
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated || storedUserRole !== "admin") {
      navigate("/dashboard")
    }
  }, [navigate])

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <div className="header-fixed">
          <Header customTitle="Novo funcionário" customSubtitle="Criar um novo funcionário" userName={userName} />
        </div>

        <div className="add-employee-container">
          <div className="back-link" onClick={handleBack}>
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </div>

          <div className="form-container">
            <h2 className="form-title">Adicionar funcionário</h2>

            <div className="form-layout">
              <div className="photo-upload-column">
                <div
                  className={`photo-upload-area ${previewUrl ? "has-image" : ""}`}
                  onClick={() => fileInputRef.current.click()}
                >
                  {previewUrl ? (
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="photo-preview" />
                  ) : (
                    <>
                      <div className="upload-icon">
                        <Upload size={24} />
                      </div>
                      <span className="upload-text">Carregar foto</span>
                    </>
                  )}
                  <input
                    type="file"
                    id="foto"
                    name="foto"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                  />
                </div>

                <div className="photo-info">
                  <p className="photo-format">
                    Formato permitido
                    <br />
                    JPG, JPEG, e PNG
                  </p>
                  <p className="photo-size">
                    Tamanho máximo
                    <br />
                    2MB
                  </p>
                </div>
              </div>

              <div className="form-fields-column">
                <form className="employee-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Digite o primeiro nome"
                        className={errors.nome ? "error" : ""}
                      />
                      {errors.nome && <span className="error-message">{errors.nome}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="dataNascimento">Data de nascimento</label>
                      <input
                        type="text"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                        className={errors.dataNascimento ? "error" : ""}
                        maxLength={10}
                      />
                      {errors.dataNascimento && <span className="error-message">{errors.dataNascimento}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Digite o endereço de e-mail"
                        className={errors.email ? "error" : ""}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="telefone">Número de telefone</label>
                      <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="Digite o número de telefone"
                        className={errors.telefone ? "error" : ""}
                        maxLength={15}
                      />
                      {errors.telefone && <span className="error-message">{errors.telefone}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="genero">Gênero</label>
                      <div className="select-wrapper">
                        <select
                          id="genero"
                          name="genero"
                          value={formData.genero}
                          onChange={handleSelectChange}
                          className={errors.genero ? "error" : ""}
                        >
                          <option value="">Selecionar gênero</option>
                          {opcoesGenero.map((opcao) => (
                            <option key={opcao} value={opcao.toLowerCase()}>
                              {opcao}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.genero && <span className="error-message">{errors.genero}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="dataIngresso">Data de ingresso</label>
                      <input
                        type="text"
                        id="dataIngresso"
                        name="dataIngresso"
                        value={formData.dataIngresso}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                        className={errors.dataIngresso ? "error" : ""}
                        maxLength={10}
                      />
                      {errors.dataIngresso && <span className="error-message">{errors.dataIngresso}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cargo">Cargo</label>
                      <div className="select-wrapper">
                        <select
                          id="cargo"
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleSelectChange}
                          className={errors.cargo ? "error" : ""}
                        >
                          <option value="">Selecionar cargo</option>
                          {opcoesCargo.map((opcao) => (
                            <option key={opcao} value={opcao.toLowerCase()}>
                              {opcao}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.cargo && <span className="error-message">{errors.cargo}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="habilidades">Habilidades</label>
                      <div className="select-wrapper">
                        <select
                          id="habilidades"
                          name="habilidades"
                          multiple
                          value={formData.habilidades}
                          onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
                            setFormData((prev) => ({
                              ...prev,
                              habilidades: selectedOptions,
                            }))
                            setFormModified(true)
                          }}
                          className={errors.habilidades ? "error" : ""}
                          style={{ height: "120px" }}
                        >
                          {opcoesHabilidades.map((opcao) => (
                            <option key={opcao} value={opcao.toLowerCase()}>
                              {opcao}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.habilidades && <span className="error-message">{errors.habilidades}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group area-group">
                      <label htmlFor="area">Área</label>
                      <div className="select-wrapper">
                        <select
                          id="area"
                          name="area"
                          value={formData.area}
                          onChange={handleSelectChange}
                          className={errors.area ? "error" : ""}
                        >
                          <option value="">Selecionar a área</option>
                          {opcoesArea.map((opcao) => (
                            <option key={opcao} value={opcao.toLowerCase()}>
                              {opcao}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.area && <span className="error-message">{errors.area}</span>}
                    </div>
                  </div>

                  <div className="form-actions" style={{ gap: "1rem" }}>
                    <button type="submit" className="submit-button">
                      Adicionar
                    </button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal success-modal">
            <div className="modal-icon success">
              <Check size={32} />
            </div>
            <h2>Cadastro realizado com sucesso!</h2>
            <p>O funcionário foi adicionado à lista.</p>
          </div>
        </div>
      )}

      {/* Modal de cancelamento */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal cancel-modal">
            <div className="modal-icon warning">
              <AlertCircle size={32} />
            </div>
            <h2>Deseja cancelar o cadastro?</h2>
            <p>Os dados não serão mantidos.</p>
            <div className="modal-actions">
              <button className="modal-button secondary" onClick={() => setShowCancelModal(false)}>
                Não, continuar editando
              </button>
              <button className="modal-button primary" onClick={() => navigate("/funcionarios")}>
                Sim, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de voltar */}
      {showBackModal && (
        <div className="modal-overlay">
          <div className="modal cancel-modal">
            <div className="modal-icon warning">
              <AlertCircle size={32} />
            </div>
            <h2>Deseja voltar para a listagem?</h2>
            <p>Os dados não serão mantidos.</p>
            <div className="modal-actions">
              <button className="modal-button secondary" onClick={() => setShowBackModal(false)}>
                Não, continuar editando
              </button>
              <button className="modal-button primary" onClick={() => navigate("/funcionarios")}>
                Sim, voltar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de adicionar funcionário */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon warning">
              <AlertCircle size={32} />
            </div>
            <h2>Deseja adicionar este funcionário?</h2>
            <p>Confirme se todas as informações estão corretas.</p>
            <div className="modal-actions">
              <button className="modal-button secondary" onClick={() => setShowAddModal(false)}>
                Não, revisar
              </button>
              <button className="modal-button primary" onClick={confirmAddEmployee}>
                Sim, adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddFuncionarioForm
