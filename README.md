# V5 Partners | Matchmaking de Negócios

Plataforma de matchmaking para investidores e empresas, focada em conectar oportunidades de investimento de forma inteligente e eficiente.

## Sitemap (Rotas do App)
- `/` - Login (Página Inicial)
- `/registrar` - Cadastro de novos usuários
- `/boas-vindas` - Onboarding visual (Carousel)
- `/escolha-de-perfil` - Seleção do tipo de perfil (Investidor/Empresa)
- `/meus-perfis` - Lista de perfis do usuário
- `/novo-perfil` - Criação de novos perfis
- `/integracao` - Processo de integração de dados
- `/resumo` - Resumo geral das atividades
- `/dashboard` - Painel de controle principal
- `/outras-empresas` - Marketplace de oportunidades
- `/avaliacao` - Ferramentas de valuation
- `/processos` - Gestão de processos em andamento
- `/perfil` - Visualização do perfil atual
- `/editar-perfil` - Edição de dados do perfil
- `/configuracoes` - Configurações de conta e sistema

## Lógica de Dados
A aplicação utiliza um **Mockup Prototyping Stack**, o que significa que:
- **Persistência**: Os dados são armazenados localmente no navegador via `LocalStorage`.
- **API**: Chamadas de rede são simuladas e interceptadas no frontend para retornar dados estáticos ou dinâmicos em memória.
- **Segurança**: Como é um protótipo, não há autenticação de backend real. O login é simulado para fins de fluxo de UI.

## Tecnologias
- React + Vite
- Tailwind CSS
- Lucide React
- Wouter (Roteamento leve)
- TanStack Query (Simulação de cache de dados)

## Como Usar
### Desenvolvimento
```bash
npm install
npm run dev
```

## Estrutura do Projeto
- `client/src/pages/`: Páginas da aplicação
- `client/src/components/`: Componentes UI e Layout
- `.agents`: Regras de ouro do projeto
- `INSTALL.md`: Guia de instalação local
- `client/src/DESIGN_SYSTEM.md`: Guia visual
