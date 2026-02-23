# Guia de Instalação e Execução Local

Este projeto foi exportado do Replit e está configurado para rodar em qualquer ambiente local (VS Code, Cursor, Antigravity).

## Pré-requisitos
- **Node.js**: Versão 20 ou superior recomendada.
- **npm**: Instalado junto com o Node.js.

## Instalação
1. Extraia o conteúdo do ZIP em uma pasta.
2. Abra o terminal na raiz do projeto.
3. Instale as dependências:
   ```bash
   npm install
   ```

## Execução (Modo Desenvolvimento)
Para rodar apenas o frontend (Vite):
```bash
npm run dev:client
```
O app estará disponível em `http://localhost:5555`.

## Scripts Disponíveis
- `npm run dev:client`: Inicia o servidor de desenvolvimento do Vite.
- `npm run build`: Gera a versão de produção na pasta `dist/`.
- `npm run check`: Validação de tipos com TypeScript.

## Observação sobre o Backend
Este projeto é um **Mockup de Frontend**. A pasta `server/` contém apenas lógica mínima para suportar o roteamento e servir os arquivos estáticos durante o desenvolvimento, não havendo um banco de dados real persistente.
