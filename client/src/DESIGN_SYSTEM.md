# Design System - V5 Partners

Este documento define o guia visual e os padrões de interface da plataforma V5 Partners, garantindo consistência, sofisticação e uma experiência de usuário premium.

## Identidade Visual e Cores

A paleta de cores foi inspirada na marca V5 Partners, utilizando tons de azul profundo e ciano para transmitir confiança e modernidade.

### Cores Principais (Light Mode)
- **Primária (Royal Blue)**: `hsl(219 100% 18%)` (#00205D) - Usada para elementos de marca e ações principais.
- **Secundária (Cyan)**: `hsl(200 88% 53%)` (#1BB5F2) - Usada para destaques e elementos complementares.
- **Acento (Bright Blue)**: `hsl(214 91% 50%)` (#0C70F2) - Usada para interações e estados ativos.
- **Background**: `hsl(210 20% 98%)` (#F9FAFB) - Um cinza muito claro para evitar o cansaço visual do branco puro.
- **Muted**: `hsl(0 0% 95%)` (#F1F1F1) - Para backgrounds de componentes secundários.

### Dark Mode
A plataforma possui suporte nativo a tema escuro, com uma paleta de marinhos profundos:
- **Background**: `hsl(219 40% 10%)`
- **Card**: `hsl(219 35% 15%)`
- **Primary**: `hsl(219 100% 50%)` (Versão mais vibrante para contraste)

## Tipografia

Utilizamos uma hierarquia tipográfica moderna e legível.

- **Fonte Principal**: `Elza` (Geométrica, moderna e sofisticada).
- **Fallback**: `Plus Jakarta Sans`, `Inter`.
- **Pesos Utilizados**:
  - 300 (Light) - Detalhes finos.
  - 400 (Regular) - Texto de corpo.
  - 500 (Medium) - UI elements e labels.
  - 600 (Semi-bold) - Subtítulos.
  - 700 (Bold) - Títulos principais.

## Componentes e Padrões

### 1. Bordas e Arredondamento
- **Raio Padrão (`--radius`)**: `1rem` (16px).
- Criamos uma interface "suave" com cantos arredondados generosos em cards, inputs e botões.

### 2. Cards e Elevação
- Uso de `shadow-sm` por padrão para profundidade sutil.
- Border-color utilizando a variável `--border` (`hsl(214 32% 91%)`).

### 3. Feedback Visual
- **Transições**: Utilizamos `tw-animate-css` para animações de entrada e estados.
- **Hover States**: Mudanças sutis de opacidade ou escala em botões e cards interativos.

## Estrutura de Arquivos de Design
- `client/src/index.css`: Definições globais de variáveis CSS e Tailwind `@theme`.
- `client/src/components/ui/`: Biblioteca de componentes baseados em Radix UI / Shadcn.

## Glossário de Termos
- **V5 Partners Blue**: O azul marinho clássico da marca.
- **Surface**: Qualquer superfície de card ou container que eleva o conteúdo do background.
