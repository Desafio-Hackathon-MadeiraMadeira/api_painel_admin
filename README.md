# 📘 Documentação da API – Painel Administrativo

API backend em **Node.js + TypeScript** para autenticação e acesso a um **painel administrativo** de uma landing page.

---

## 🧱 Visão Geral

Esta API fornece:

* Autenticação simples por **senha** (armazenada como **hash**)
* Geração de **JWT** para sessão
* Proteção de rotas administrativas

Arquitetura resumida:

```
Frontend (Landing / Admin)
        ↓ HTTPS
Backend (Node.js + Express)
        ↓
Autenticação (bcrypt + JWT)
```

---

## 🗂 Estrutura do Projeto

```
src/
├── app.ts
├── routes/
│   ├── auth.routes.ts
│   └── admin.routes.ts
├── middleware/
│   └── auth.middleware.ts
└── utils/
    └── generateHash.ts
```

---

## ⚙️ Tecnologias e Dependências

### Dependências de Produção

| Biblioteca       | Uso                                   |
| ---------------- | ------------------------------------- |
| **express**      | Framework HTTP para criação da API    |
| **dotenv**       | Carregamento de variáveis de ambiente |
| **cors**         | Permitir requisições do frontend      |
| **bcryptjs**     | Comparação segura de senha (hash)     |
| **jsonwebtoken** | Geração e validação de JWT            |

### Dependências de Desenvolvimento

| Biblioteca     | Uso                                    |
| -------------- | -------------------------------------- |
| **typescript** | Tipagem estática                       |
| **tsx**        | Executar TS com ESM em desenvolvimento |
| **@types/***   | Tipos para TypeScript                  |

---

## 🔐 Segurança de Senha (Hash)

### Conceito

* A **senha real nunca é armazenada**
* Apenas o **hash da senha** fica salvo no `.env`
* A validação é feita com `bcrypt.compare`

### Gerar Hash da Senha

```ts
import bcrypt from "bcryptjs";

const password = "SUA_SENHA_FORTE_AQUI";
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

> ⚠️ **A senha real nunca deve aparecer em documentação pública.**
> Use uma senha forte apenas localmente para gerar o hash e **não versione nem compartilhe a senha**.

---

## 🔑 Variáveis de Ambiente (`.env`)

```env
PORT=0000
ADMIN_PASSWORD_HASH=$2a$10$xxxxxxxxxxxxxxxxxxxxxxxx
JWT_SECRET=chave_super_secreta
```

⚠️ O arquivo `.env` **não deve ser versionado**.

---

## 🔐 Autenticação (JWT)

* Após login bem-sucedido, a API retorna um **token JWT**
* O token deve ser enviado no header:

```
Authorization: Bearer <TOKEN>
```

* O token tem validade de **1 hora**

---

## 📌 Rotas da API

### 🔓 Rota Pública

#### `GET /`

Verificação de status da API.

**Resposta:**

```text
API rodando 🔥
```

---

### 🔑 Login

#### `POST /auth/login`

Autentica o administrador.

**Body (JSON):**

```json
{
  "password": "<SENHA_DO_ADMIN>"
}
```

**Respostas:**

* ✅ **200 OK**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

* ❌ **400 Bad Request**

```json
{ "error": "Senha obrigatória" }
```

* ❌ **401 Unauthorized**

```json
{ "error": "Senha inválida" }
```

---

### 🔒 Painel Administrativo (Protegido)

#### `GET /admin`

Acesso restrito ao painel.

**Headers:**

```
Authorization: Bearer <TOKEN>
```

**Resposta:**

```json
{
  "message": "Bem-vindo ao painel"
}
```

* ❌ **401 Unauthorized** se token estiver ausente ou inválido

---

## 🛡 Middleware de Autenticação

O middleware:

* Lê o header `Authorization`
* Valida o token JWT
* Bloqueia acesso sem token válido

Arquivo:

```
src/middleware/auth.middleware.ts
```

---

## 🚀 Execução do Projeto

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Produção

```bash
npm start
```

---

## ☁️ Deploy

* Render

---

## ✅ Boas Práticas Adotadas

* Senha nunca exposta
* Hash com bcrypt
* JWT com expiração
* `.env` fora do Git
* Separação de rotas e middleware

---


📌 **API pronta para produção e integração com frontend (React / Next.js).**
