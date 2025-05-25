
# ZEUS - Sistema de Gerenciamento

> Interface web desenvolvida com React.js para gerenciamento de usuários, orçamentos e operações administrativas. Foco em usabilidade, performance e escalabilidade.

---

## 📌 Visão Geral

ZEUS é um sistema frontend moderno, modular e extensível. Foi criado com o intuito de ser uma base sólida para projetos que envolvam autenticação, dashboards administrativos e controle de registros internos.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia     | Descrição                         |
|----------------|-----------------------------------|
| React.js       | Biblioteca principal de UI        |
| JavaScript ES6 | Lógica da aplicação               |
| HTML5 & CSS3   | Estrutura e estilização           |
| Node.js + NPM  | Gerenciamento de pacotes          |
| Vite/CRA       | Bundler (aparentemente CRA)       |
| Git            | Controle de versão                |

---

## 📁 Estrutura de Pastas

```plaintext
zeus/
├── public/                     # Arquivos públicos
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/                 # Imagens e logos
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── CardResumo.jsx
│   │   └── LoginForm.jsx
│   ├── pages/                 # Telas principais
│   │   ├── Dashboard.jsx
│   │   ├── Funcionarios.jsx
│   │   ├── AddFuncionarioForm.jsx
│   │   ├── AddOrcamento.jsx
│   │   ├── Orcamento.jsx
│   │   ├── Login.jsx
│   │   ├── RecuperarSenha.jsx
│   │   └── RedefinirSenha.jsx
│   ├── styles/                # Arquivos CSS organizados por componente/página
│   ├── App.jsx                # Componente principal
│   ├── index.js               # Ponto de entrada
│   └── setupTests.js          # Arquivo de setup para testes
├── .vscode/                   # Configurações de ambiente (VSCode)
├── package.json               # Dependências e scripts
├── package-lock.json
└── README.md                  # Este arquivo
```

---

## 🔑 Funcionalidades

- ✅ **Autenticação** de usuários (login e senha)
- 🔁 **Recuperação e Redefinição de Senha**
- 📊 **Dashboard** com resumos e visualização de dados
- 👥 **Gerenciamento de Funcionários**
  - Cadastro
  - Listagem
  - Edição (se implementado)
- 💰 **Gerenciamento de Orçamentos**
  - Criação de orçamentos
  - Visualização
- ⚙️ **Componentes reutilizáveis** e estrutura modular

---

## ⚙️ Instalação Local

### Pré-requisitos

- Node.js instalado
- Git

### Passo a passo

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd zeus

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 📈 Melhorias Futuras (To-do)

- [ ] Integração com API externa (backend)
- [ ] Implementar rotas privadas com `React Router`
- [ ] Validação de formulários com feedback visual
- [ ] Tela de edição para funcionários/orçamentos
- [ ] Responsividade total (mobile-first)
- [ ] Internacionalização (i18n)

---

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma nova branch com sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'feat: minha nova feature'
   ```
4. Push para sua branch:
   ```bash
   git push origin feature/nome-da-feature
   ```
5. Crie um Pull Request

---

---

## ✨ Contato

Caso deseje entrar em contato com os responsáveis ou mantenedores do projeto, envie um e-mail para: **kaique.salvador@compjunior.com.br**
