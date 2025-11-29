# Business Profiles Manager

## O que é?

Sistema web que conecta investidores, vendedores e franqueadores de negócios. Usuários criam perfis especializados para diferentes tipos de participação no mercado de M&A (Fusões e Aquisições).

## Funcionalidades Principais

✅ **Autenticação** - Sistema de login/registro com Passport.js
✅ **Múltiplos Perfis** - Um usuário pode gerenciar perfis de Investidor, Vendedor e Franqueador
✅ **Dashboards** - Visualizações customizadas por tipo de perfil
✅ **Onboarding** - Fluxo guiado de integração
✅ **Gerenciamento de Processos** - Rastreamento de negociações
✅ **Avaliações** - Sistema de análise de perfis
✅ **Configurações** - Controle de preferências e privacidade

## Stack Tecnológico

**Frontend**
- React 19 com TypeScript
- Wouter (roteamento)
- Tailwind CSS + Radix UI
- React Hook Form + Zod (validação)
- React Query (state management)
- Framer Motion (animações)

**Backend**
- Express.js
- Passport.js (autenticação)
- Drizzle ORM
- PostgreSQL (Neon serverless)

**Ferramentas**
- Vite (build)
- TypeScript
- Recharts (gráficos)
- Sonner (notificações toast)

## Como Usar

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar frontend (porta 5000)
npm run dev:client

# Rodar backend
npm run dev

# Type checking
npm run check

# Sincronizar banco de dados
npm run db:push
```

### Produção

```bash
# Build
npm run build

# Iniciar
npm start
```

## Estrutura do Projeto

```
root/
├── client/src/          # Frontend React
│   ├── pages/          # Páginas da aplicação
│   ├── components/     # Componentes UI
│   ├── lib/            # Utilities e contextos
│   └── index.css       # Estilos globais
├── server/             # Backend Express
│   ├── routes.ts       # Rotas HTTP
│   ├── storage.ts      # Persistência
│   └── index.ts        # Entrada
├── shared/             # Código compartilhado
│   └── schema.ts       # Schemas DB + Zod
└── package.json        # Dependências
```

## Fluxo de Usuário

1. **Login/Registro** - Autenticar ou criar conta
2. **Escolher Perfil** - Selecionar tipo de participação
3. **Onboarding** - Preencher dados do perfil
4. **Dashboard** - Visualizar oportunidades/status
5. **Processos** - Gerenciar negociações ativas
6. **Avaliações** - Analisar propostas

## Tipos de Perfil

### 👨‍💼 Investidor
- Busca oportunidades para comprar negócios
- Define critérios de investimento
- Analisa ROI e risco
- Visualiza empresas disponíveis

### 🏢 Vendedor
- Oferece seu negócio
- Define preço e termos
- Acompanha negociações
- Gerencia processos de venda

### 🍔 Franqueador
- Expande através de franchising
- Define termos de parceria
- Conecta com potenciais franqueados
- Gerencia relacionamentos

## Autenticação

Sistema local com Passport.js:
- Username/senha
- Sessions baseadas em cookies
- Store no PostgreSQL
- Logout automático possível

## Configurações

Usuários podem gerenciar:
- 🌙 Modo escuro
- 🔔 Notificações
- 📊 Compartilhamento de dados
- 👤 Dados do perfil

## Status Atual

✅ Arquitetura base implementada
✅ Roteamento funcional
✅ Autenticação integrada
✅ Contexto de usuário/perfis
✅ UI componentes base
⏳ Funcionalidades em progresso:
  - Persistência de dados do perfil
  - Matching entre usuários
  - Sistema de notificações
  - Integração com APIs externas

## Próximas Features

- Sistema de chat entre usuários
- Matching algorítmico de perfis
- Analytics e relatórios
- Export de documentos
- Integração com serviços de pagamento
- Mobile app nativo

## Documentação Adicional

- Veja `ARCHITECTURE.md` para detalhes técnicos aprofundados
- Veja `DESIGN_SYSTEM.md` para guia de estilos

---

**Desenvolvido com ❤️ em Replit**
