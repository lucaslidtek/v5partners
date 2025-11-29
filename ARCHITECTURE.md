# Arquitetura do Sistema - Business Profiles Manager

## Visão Geral

Sistema web de gestão de perfis empresariais que permite usuários atuarem como investidores, vendedores ou franqueadores. A aplicação foi construída com React (frontend) e Express (backend), utilizando Vite para build e desenvolvimento.

## Pilares da Arquitetura

### 1. **Camada de Frontend (React + TypeScript)**

#### Routing
- **Framework**: Wouter (lightweight router para React)
- **Tipo**: Client-side routing
- **Rotas Principais**:
  - `/` - Login
  - `/registrar` - Registro de usuário
  - `/escolha-de-perfil` - Seleção de tipo de perfil
  - `/meus-perfis` - Listagem de múltiplos perfis
  - `/novo-perfil` - Criação de novo perfil
  - `/integracao` - Onboarding
  - `/resumo` - Dashboard resumido
  - `/dashboard` - Dashboard principal
  - `/outras-empresas` - Visualização de outras empresas
  - `/avaliacao` - Página de avaliação
  - `/processos` - Gerenciamento de processos
  - `/perfil` - Visualização de perfil
  - `/editar-perfil` - Edição de perfil
  - `/configuracoes` - Configurações do usuário

#### Gerenciamento de Estado
- **Auth Context**: Contexto centralizado para gerenciamento de autenticação e dados do usuário
  - `AuthProvider` encapsula toda a aplicação
  - Armazena: usuário, perfis ativos, configurações

- **React Query**: Gerenciamento de dados remotos e cache
  - Query client configurado em `lib/queryClient.ts`
  - Permite fetching, caching e sincronização de dados

#### Componentes de UI
- **Biblioteca Base**: Radix UI (primitivos acessíveis)
- **Estilização**: Tailwind CSS + Custom CSS
- **Estrutura**:
  - `/components/ui/` - Componentes base reutilizáveis (50+)
  - `/components/layout.tsx` - Layout principal

#### Hooks Customizados
- `use-mobile.tsx` - Detecção de viewport mobile

### 2. **Camada de Backend (Express + TypeScript)**

#### Estrutura
```
server/
├── index.ts      - Entrada do servidor
├── routes.ts     - Definição de rotas
├── storage.ts    - Persistência de dados
├── static.ts     - Servimento de arquivos estáticos
└── vite.ts       - Integração com Vite
```

#### Tecnologias
- **Express**: Framework HTTP
- **Passport.js**: Autenticação (strategy: local)
- **Express Session**: Gerenciamento de sessões
- **connect-pg-simple**: Session store com PostgreSQL
- **Drizzle ORM**: Query builder type-safe com TypeSQL

#### Autenticação
- Strategy: Local (username/password)
- Session-based com cookies
- Suporta múltiplos usuários

### 3. **Camada de Dados**

#### Database
- **Sistema**: PostgreSQL (via Neon - serverless)
- **ORM**: Drizzle ORM
- **Migrações**: Drizzle Kit

#### Schema (shared/schema.ts)
```typescript
users {
  id: UUID (primary key)
  username: text (unique)
  password: text
}
```

#### Validação
- **Zod**: Schema validation
- **Drizzle-Zod**: Integração entre schemas

### 4. **Modelo de Dados - Perfis de Negócio**

#### Tipos de Perfis
Cada usuário pode criar múltiplos perfis:

**1. Investor Profile**
- Localização geográfica
- Faixa etária e educação
- Range de investimento
- Modalidade de investimento
- ROI esperado
- Experiência e setor
- Habilidades
- Setores de interesse
- Envolvimento operacional (slider)
- Tolerância a risco (slider)

**2. Seller Profile**
- Nome da empresa
- Logo
- Segmento de negócio
- Tipo de operação
- Receita mensal
- Ticket médio
- EBITDA
- Número de funcionários
- Dependência do dono
- Motivo da venda
- Estágio empresarial

**3. Franchise Profile**
- Dados de franquia
- Requisitos de investimento
- Suporte e treinamento

#### Context API Structure
```typescript
interface UserData {
  name: string
  email: string
  city: string
  role: ProfileType
  profilePhoto?: string
  profiles: Profile[]
  activeProfileId?: string
}

interface Profile {
  id: string
  type: "investor" | "seller" | "franchise"
  name: string
  data: Record<string, any>
}

interface SettingsData {
  darkMode: boolean
  notifications: boolean
  shareData: boolean
}
```

### 5. **Build & Development**

#### Vite Configuration
- Port: 5000 (frontend)
- Plugin React: JSX transform
- Tailwind CSS via plugin
- Meta images plugin customizado
- Plugins Replit: dev-banner, cartographer, runtime-error-modal

#### Scripts
- `npm run dev:client` - Dev server frontend
- `npm run dev` - Dev server backend
- `npm run build` - Build para produção
- `npm start` - Iniciar produção
- `npm run check` - Type checking
- `npm run db:push` - Sincronizar schema com DB

### 6. **Design System**

- **Cores**: Paleta definida em tema Tailwind
- **Tipografia**: Fontes sistema + customizações
- **Componentes**: Sistema completo via Radix UI + customizações
- **Documentação**: DESIGN_SYSTEM.md

## Fluxo de Dados

```
User Request
    ↓
Frontend Router (Wouter)
    ↓
React Component
    ↓
AuthContext (if autenticação) / React Query (if dados remotos)
    ↓
Express Backend
    ↓
Passport Auth / Routes
    ↓
Drizzle ORM
    ↓
PostgreSQL Database
    ↓
Response → React Query Cache → Component → UI
```

## Ciclo de Desenvolvimento

1. **Desenvolvimento**
   - Frontend: `npm run dev:client`
   - Backend: `npm run dev`
   - Dev banner e runtime error modal ativos

2. **Builld**
   - TypeScript transpilado via esbuild
   - React components bundled
   - Assets otimizados

3. **Produção**
   - Node.js rodando servidor Express
   - Frontend servido estaticamente
   - Sessões em PostgreSQL

## Dependências Principais

| Categoria | Pacotes |
|-----------|---------|
| **UI/React** | react, react-dom, @radix-ui/*, framer-motion |
| **Roteamento** | wouter |
| **Dados** | @tanstack/react-query, react-hook-form, zod |
| **Backend** | express, passport, express-session |
| **Database** | drizzle-orm, @neondatabase/serverless |
| **Estilos** | tailwindcss, lucide-react |
| **Build** | vite, typescript, esbuild |

## Próximos Passos para Expansão

1. Integração com APIs externas (validação de dados, webhooks)
2. Sistema de notificações em tempo real (WebSocket)
3. Persistência de dados do perfil no banco
4. Sistema de matching entre investidores e vendedores
5. Dashboard analítico com Recharts
6. Upload de arquivos e media
7. Sistema de chat/comunicação
