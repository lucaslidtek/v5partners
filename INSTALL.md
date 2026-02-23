# Passo a Passo para Rodar Localmente

## Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

## Instalação
1. Clone o repositório em sua máquina local.
2. Abra o terminal na raiz do projeto.
3. Execute o comando para instalar as dependências:
   ```bash
   npm install
   ```

## Desenvolvimento
Para iniciar o servidor de desenvolvimento local:
```bash
npm run dev
```
O projeto estará disponível por padrão em `http://localhost:5555` (ou a porta indicada no terminal).

## Build de Produção
Para criar a versão otimizada de produção:
```bash
npm run build
```
Os arquivos gerados estarão na pasta `dist/`.

## Notas Importantes
- Como este é um **Mockup Prototyping Stack**, não há necessidade de configurar um banco de dados real localmente para a interface funcionar.
- A persistência de dados ocorre via `LocalStorage` no navegador.
