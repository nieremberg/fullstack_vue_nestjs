# 🚀 Fullstack Vue + NestJS Application

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

## 📋 Sobre o Projeto

Uma aplicação fullstack moderna construída com **Vue 3** e **NestJS**, implementando as melhores práticas de desenvolvimento de 2025. O projeto foi estruturado para ser **escalável**, **manutenível** e **fácil de entender** para desenvolvedores de todos os níveis.

## 🛠️ Stack Tecnológica

### 🎨 Frontend
- **Vue 3** com Composition API + TypeScript
- **Pinia** para gerenciamento de estado
- **Vue Router** para roteamento
- **Vite** como build tool
- **TailwindCSS** para estilização
- **Axios** para requisições HTTP
- **Storybook** para desenvolvimento de componentes
- **Vitest** para testes unitários
- **Playwright** para testes E2E

### 🏗️ Backend
- **NestJS** com TypeScript
- **Prisma** como ORM
- **PostgreSQL** como banco de dados
- **JWT** para autenticação
- **Swagger** para documentação da API
- **Jest** para testes
- **Helmet** para segurança
- **Rate Limiting** para proteção

### 🐳 DevOps
- **Docker** e **Docker Compose**
- **GitHub Actions** para CI/CD
- **Nginx** como reverse proxy
- **ESLint** e **Prettier** para qualidade de código

## 🚀 Início Rápido

### Pré-requisitos

Certifique-se de ter instalado:

| Ferramenta | Versão Mínima | Verificação |
|------------|---------------|-------------|
| Node.js | 18.x | `node -v` |
| npm | 10.x | `npm -v` |
| Docker | 24.x | `docker -v` |
| Docker Compose | 2.x | `docker-compose -v` |

### 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd fullstack-vue-nestjs-app
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Instale as dependências**
```bash
npm run install:all
```

4. **Inicie os serviços com Docker**
```bash
npm run docker:dev
```

5. **Acesse a aplicação**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger UI: http://localhost:3001/api
- Storybook: http://localhost:6006

## 📁 Estrutura do Projeto

```
fullstack-vue-nestjs-app/
├── 📁 frontend/                 # Aplicação Vue.js
│   ├── 📁 src/
│   │   ├── 📁 components/      # Componentes reutilizáveis
│   │   ├── 📁 views/          # Páginas da aplicação
│   │   ├── 📁 stores/         # Estados Pinia
│   │   ├── 📁 services/       # Serviços de API
│   │   ├── 📁 types/          # Definições TypeScript
│   │   └── 📁 composables/    # Composables Vue
│   ├── 📁 .storybook/         # Configuração Storybook
│   └── 📁 tests/              # Testes automatizados
├── 📁 backend/                 # API NestJS
│   ├── 📁 src/
│   │   ├── 📁 auth/           # Módulo de autenticação
│   │   ├── 📁 users/          # Módulo de usuários
│   │   ├── 📁 common/         # Utilitários compartilhados
│   │   └── 📁 config/         # Configurações
│   ├── 📁 prisma/             # Schema e migrações
│   └── 📁 test/               # Testes automatizados
├── 📁 docker/                  # Configurações Docker
├── 📁 docs/                    # Documentação adicional
├── 📁 scripts/                 # Scripts de automação
└── 📁 .github/                 # GitHub Actions
```

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev                    # Inicia frontend e backend
npm run dev:frontend          # Inicia apenas frontend
npm run dev:backend           # Inicia apenas backend
npm run storybook             # Inicia Storybook
```

### Docker
```bash
npm run docker:dev            # Ambiente completo com Docker
npm run docker:prod           # Ambiente de produção
npm run docker:clean          # Limpa containers e volumes
```

### Testes
```bash
npm run test                  # Executa todos os testes
npm run test:frontend         # Testes do frontend
npm run test:backend          # Testes do backend
npm run test:e2e              # Testes end-to-end
npm run test:coverage         # Cobertura de testes
```

### Banco de Dados
```bash
npm run db:migrate            # Executa migrações
npm run db:seed               # Popula dados iniciais
npm run db:studio             # Abre Prisma Studio
npm run db:reset              # Reseta banco de dados
```

### Qualidade de Código
```bash
npm run lint                  # Executa linting
npm run lint:fix              # Corrige problemas de lint
npm run format                # Formata código com Prettier
npm run type-check            # Verifica tipos TypeScript
```

## 🔐 Autenticação

A aplicação implementa autenticação JWT com refresh tokens:

1. **Login**: `POST /auth/login`
2. **Registro**: `POST /auth/register`
3. **Refresh Token**: `POST /auth/refresh`
4. **Logout**: `POST /auth/logout`

### Exemplo de uso:
```typescript
// Frontend - Login
const { data } = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Token é armazenado automaticamente
// e incluído em requisições subsequentes
```

## 🧪 Testes

### Frontend
- **Vitest**: Testes unitários de componentes
- **Playwright**: Testes end-to-end
- **Storybook**: Testes visuais

### Backend
- **Jest**: Testes unitários e integração
- **Supertest**: Testes de API

### Executar testes específicos:
```bash
# Testes unitários Frontend
npm run test:unit:frontend

# Testes de integração Backend
npm run test:integration:backend

# Testes E2E
npm run test:e2e
```

## 🔒 Segurança

### Implementações de segurança:
- ✅ **JWT** com refresh tokens
- ✅ **Rate limiting** por IP
- ✅ **CORS** configurado
- ✅ **Helmet** para headers de segurança
- ✅ **Validação** de entrada com DTOs
- ✅ **Bcrypt** para hash de senhas
- ✅ **Docker** security hardening

### Variáveis de ambiente sensíveis:
```env
# Nunca committar estes valores
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=postgresql://user:pass@localhost:5432/db
```

## 📊 Monitoramento

### Health Checks
- **Frontend**: http://localhost:3000/health
- **Backend**: http://localhost:3001/health
- **Database**: Verificação automática de conexão

### Logs
```bash
# Visualizar logs em tempo real
npm run logs

# Logs específicos
npm run logs:frontend
npm run logs:backend
```

## 🚀 Deploy

### Desenvolvimento
```bash
npm run deploy:dev
```

### Produção
```bash
npm run build
npm run deploy:prod
```

### Verificações pré-deploy:
- ✅ Todos os testes passando
- ✅ Build sem erros
- ✅ Variáveis de ambiente configuradas
- ✅ Banco de dados migrado

## 🤝 Contribuição

### Para desenvolvedores júnior:

1. **Familiarize-se com a stack**
   - Leia a documentação do Vue 3 e NestJS
   - Explore os componentes no Storybook
   - Execute os testes para entender o comportamento

2. **Fluxo de desenvolvimento**
   ```bash
   git checkout -b feature/nova-funcionalidade
   npm run dev
   # Desenvolva sua funcionalidade
   npm run test
   npm run lint
   git commit -m "feat: adiciona nova funcionalidade"
   git push origin feature/nova-funcionalidade
   ```

3. **Boas práticas**
   - Escreva testes para novas funcionalidades
   - Siga os padrões de commit conventional
   - Documente componentes no Storybook
   - Mantenha o TypeScript strict

### Convenções de código:
- **Commits**: Conventional Commits
- **Branches**: feature/, bugfix/, hotfix/
- **Code Style**: ESLint + Prettier
- **Testes**: Cobertura mínima de 80%

## 📚 Documentação Adicional

- [Guia de Arquitetura](./docs/ARCHITECTURE.md)
- [Guia de Desenvolvimento](./docs/DEVELOPMENT.md)
- [Guia de Deploy](./docs/DEPLOYMENT.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [API Documentation](http://localhost:3001/api) (Swagger)

## 🆘 Solução de Problemas

### Problemas comuns:

**Erro de porta em uso:**
```bash
# Verificar processos nas portas
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

**Erro de permissão Docker:**
```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

**Erro de dependências:**
```bash
# Limpar cache e reinstalar
npm run clean
npm run install:all
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

Desenvolvido com ❤️ para facilitar o desenvolvimento fullstack moderno.

---

**📞 Suporte**: Para dúvidas técnicas, abra uma issue no GitHub ou consulte a documentação.

**🎯 Roadmap**: Veja nossas próximas funcionalidades no [projeto do GitHub](https://github.com/user/repo/projects).
