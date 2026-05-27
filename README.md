# Wallet Manager Frontend

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![RxJS](https://img.shields.io/badge/RxJS-7B42BC?logo=reactivex)

Interface web para gerenciamento financeiro pessoal integrada ao backend Wallet Manager.

</div>

---

## 📌 Sobre o projeto

O **Wallet Manager Frontend** é uma aplicação em Angular para controle financeiro pessoal.

Permite autenticação de usuários e gerenciamento de transações e categorias de forma simples e organizada, consumindo uma API REST com JWT.

---

## 🚀 Funcionalidades

### 🔐 Autenticação
- Login de usuário
- Registro de usuário
- Logout
- Persistência de sessão com JWT

### 💰 Transações
- Criar transações
- Editar transações
- Remover transações
- Filtro por período

### 🗂 Categorias
- Criar categorias
- Editar categorias
- Remover categorias

---

## 🧪 Usuários de teste

### ADMIN
Email: user1@mail.com
Senha: 123

### USER
Email: user2@mail.com
Senha: 123

---

## 🖼️ Preview do sistema

### Login
![Login](./screenshots/login.png)

### Transações
![Transactions](./screenshots/transactions.png)

### Criar Transações
![Transactions](./screenshots/create_transaction.png)

### Demo do sistema

![Demo](./screenshots/Animação.gif)


---

## 🧱 Tecnologias utilizadas

- Angular 19
- TypeScript
- RxJS
- Angular Router
- HTTP Client
- JWT Authentication
- Tailwind CSS

---

## 🔗 Integração com backend

Este frontend consome a API do backend:

👉 Wallet Manager Backend  
https://github.com/IgorDv5/WalletManager-Backend

---

## ⚙️ Como executar o projeto

### Pré-requisitos
- Node.js
- Angular CLI

---

### Instalar dependências

```bash
npm install
```

Rodar o projeto
```
ng serve
```
