# V5 Partners | Matchmaking de Negócios

## Sobre o Projeto
Este é um protótipo interativo para a plataforma V5 Partners, focada em matchmaking de negócios entre investidores e empresas.

## Mapa do Site (Sitemap)
- `/`: Login (Página Inicial)
- `/registrar`: Cadastro de novos usuários
- `/boas-vindas`: Onboarding visual (Carousel)
- `/escolha-de-perfil`: Seleção do tipo de perfil (Investidor/Empresa)
- `/meus-perfis`: Lista de perfis do usuário
- `/novo-perfil`: Criação de novos perfis
- `/integracao`: Processo de integração de dados
- `/resumo`: Resumo geral das atividades
- `/dashboard`: Painel de controle principal
- `/outras-empresas`: Marketplace de oportunidades
- `/avaliacao`: Ferramentas de valuation
- `/processos`: Gestão de processos em andamento
- `/perfil`: Visualização do perfil atual
- `/editar-perfil`: Edição de dados do perfil
- `/configuracoes`: Configurações de conta e sistema

## Lógica de Dados
- **Persistência**: Os dados são armazenados localmente no navegador via `LocalStorage`.
- **API**: Chamadas de rede são simuladas e interceptadas no frontend para retornar dados estáticos ou dinâmicos em memória.
- **Mocking**: Dados estáticos em `client/src/pages`.

## Tecnologias
- React 19 + Vite 7
- Tailwind CSS 4
- Lucide React
- Wouter (Roteamento leve)
- TanStack Query (Simulação de cache de dados)

## Como Usar
### Desenvolvimento Local
1. `npm install`
2. `npm run dev:client`
O app estará disponível em `http://localhost:5000`.

## Estrutura do Projeto
- `client/src/pages/`: Páginas da aplicação
- `client/src/components/`: Componentes UI e Layout
- `.agents`: Regras de ouro do projeto
- `INSTALL.md`: Guia de instalação detalhado
- `client/DESIGN_SYSTEM.md`: Guia visual completo
