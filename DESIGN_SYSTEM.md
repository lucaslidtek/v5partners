# Design System - V5 Partners

## Visão Geral
Este documento descreve o padrão visual e os componentes utilizados em toda a aplicação V5 Partners.

---

## Paleta de Cores

### Cores Primárias
- **Primary (Royal Blue)**: `#00205D` - Cor principal da marca
- **Secondary (Cyan)**: `#1BB5F2` - Cor secundária
- **Accent (Bright Blue)**: `#0C70F2` - Cor de destaque

### Cores Neutras
- **Foreground**: `#020909` - Texto principal
- **Muted Foreground**: `#757D8E` - Texto secundário/placeholder
- **Border**: `#E3E8F0` - Bordas e divisores
- **Muted**: `#F1F1F1` - Fundos neutros

### Cores de Status
- **Destructive**: `#EF4444` - Ações perigosas/erros
- **Success**: Verde (usado em badges e status)
- **Warning**: Âmbar (usado em alertas)

---

## Tipografia

### Font Family
- **Principal**: Elza (custom font)
- **Fallback**: Plus Jakarta Sans, Inter, sans-serif

### Hierarquia de Tamanho
- **Display/H1**: `text-3xl font-bold` - Títulos de página
- **H2**: `text-2xl font-bold` - Subtítulos
- **Body**: `text-base font-normal` - Texto padrão
- **Small**: `text-sm font-normal` - Texto secundário
- **Extra Small**: `text-xs font-normal` - Labels, placeholders

### Pesos de Font
- Light: `font-light` (300)
- Normal: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)

---

## Componentes

### Botões

#### Botão de Voltar (Ghost - Navegação)
```jsx
<Button 
  variant="ghost" 
  className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
  onClick={() => setLocation('/dashboard')}
>
  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Dashboard
</Button>
```
- Usado em páginas secundárias para navegação de volta
- Sempre com ícone `ArrowLeft` à esquerda
- Classe: `mb-6 pl-0 hover:bg-transparent hover:text-primary`
- **Variante**: `ghost`

#### Botão Primário
```jsx
<Button 
  className="bg-primary hover:bg-primary/90 text-white font-semibold h-9 text-sm rounded-lg transition-all active:scale-95"
  onClick={() => handleAction()}
>
  <HeartIcon className="h-4 w-4 mr-1" /> Tenho Interesse
</Button>
```
- Fundo azul royal (#00205D)
- Texto branco, bold
- Com ícone à esquerda (`mr-1` de margem)
- Altura: `h-9` (36px)
- Tamanho texto: `text-sm`
- Border radius: `rounded-lg`
- Hover: escurece 10% (`hover:bg-primary/90`)
- Active: diminui levemente (`active:scale-95`)
- **Variante**: padrão (sem variant especificado)
- **Exemplo de uso**: "Tenho Interesse", ações de confirmação

#### Botão Secundário
```jsx
<Button 
  variant="outline" 
  className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors h-9 text-sm rounded-lg"
  onClick={() => handleAction()}
>
  Ver Detalhes
</Button>
```
- Borda cinza clara (#E3E8F0)
- Sem fundo ou fundo suave no hover
- Texto escuro
- Altura: `h-9` (36px)
- Tamanho texto: `text-sm`
- Border radius: `rounded-lg`
- Hover: fundo cinzento suave
- **Variante**: `outline`
- **Exemplo de uso**: "Editar", "Ver Detalhes", ações secundárias


#### Botão Ghost
```jsx
<Button 
  variant="ghost"
  onClick={() => handleAction()}
>
  Link Text
</Button>
```
- Sem borda ou fundo
- Usado para ações menos relevantes
- **Variante**: `ghost`

---

## Layout de Página

### Estrutura Padrão
```jsx
<Layout>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Botão Voltar */}
    <Button className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
      <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Dashboard
    </Button>
    
    {/* Header da Página */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-900">Título</h1>
      <p className="text-slate-500 mt-1">Descrição/Subtítulo</p>
    </div>
    
    {/* Conteúdo */}
    <Card className="p-6">
      {/* Seu conteúdo aqui */}
    </Card>
  </div>
</Layout>
```

### Largura Máxima
- Desktop: `max-w-7xl` (1280px)
- Padding: `px-4 sm:px-6 lg:px-8`
- Padding Vertical: `py-8`

---

## Cards e Containers

### Card Padrão
```jsx
<Card className="p-6">
  <div className="space-y-6">
    {/* Conteúdo */}
  </div>
</Card>
```
- Padding: `p-6` (24px)
- Espaçamento interno: `space-y-6` (24px entre elementos)

### Separadores em Cards
Para dividir seções dentro de um card:
```jsx
<div className="border-t border-border pt-6">
  {/* Nova seção */}
</div>
```

---

## Espaçamento

### Margem Vertical
- Entre seções: `mb-8`
- Entre componentes: `mb-6` ou `mb-4`
- Nenhuma margem: `mb-0`

### Espaçamento Interno (Padding)
- Cards: `p-6` (24px)
- Rows em listas: `py-4` (16px vertical, 0 horizontal)
- Containers: `px-4 sm:px-6 lg:px-8`

### Gap entre elementos (Flexbox)
- Pequeno: `gap-2` (8px)
- Médio: `gap-4` (16px)
- Grande: `gap-6` (24px)

---

## Header

### Estrutura do Header
- Altura fixa: `h-16` (64px)
- Fundo branco com borda inferior
- Sticky: `sticky top-0 z-50`
- Sombra suave: `shadow-sm`

### Avatar do Usuário
- Tamanho: `h-8 w-8` (32px)
- Forma: `rounded-full`
- Interações: Clicável com dropdown menu

---

## Data-TestID Conventions

Todos os elementos interativos e informativos devem ter `data-testid`:

### Padrão
- Botões: `button-{ação}-{alvo}` (ex: `button-back-profile`)
- Menu: `menu-{item}` (ex: `menu-profile`, `menu-settings`)
- Texto: `text-{tipo}-{descrição}` (ex: `text-profile-name`)
- Cards: `card-{tipo}` (ex: `card-profile`)
- Switch: `switch-{opção}` (ex: `switch-notifications`)

---

## Responsividade

### Breakpoints (Tailwind)
- Mobile: < 640px
- Tablet: 640px - 1024px (`sm:`, `md:`)
- Desktop: > 1024px (`lg:`)

### Classes de Visibilidade
- `hidden sm:block` - Oculto em mobile, visível em tablet+
- `sm:flex` - Flex em tablet+
- `lg:px-8` - Padding maior em desktop

---

## Ícones

### Lucide React Icons
- Tamanho padrão em botões: `h-4 w-4`
- Tamanho grande em destaques: `h-5 w-5`
- Margem após ícone em botões: `mr-2`

### Ícones Utilizados
- `ArrowLeft` - Voltar/navegação
- `Bell` - Notificações
- `User` - Perfil
- `Settings` - Configurações
- `LogOut` - Sair

---

## Badges e Status

### Cores de Badges
- Success: Verde
- Warning: Âmbar
- Error: Vermelho
- Info: Azul

---

## Estados de Interação

### Hover
- Botões primários: Escurecem levemente
- Botões ghost: Mudam cor para primary `hover:text-primary`
- Cards: Elevação sutil (shadow)

### Focus
- Acessibilidade com `focus:outline-none focus:ring-2 focus:ring-primary`

### Active
- Botões: Cor mais escura

---

## Meta Tags (SEO)

Todos os meta tags devem ser atualizados em `client/index.html`:
```html
<meta property="og:title" content="Título da App" />
<meta property="og:description" content="Descrição breve" />
<meta name="twitter:title" content="Título da App" />
<meta name="twitter:description" content="Descrição breve" />
<meta name="twitter:site" content="@replit" />
```

---

## Componentes Radix UI Utilizados

- Dialog - Modais
- DropdownMenu - Menus suspensos
- Popover - Popovers
- Sheet - Drawers/Side panels
- Tabs - Abas
- Switch - Toggle switch
- Checkbox - Checkboxes
- Slider - Ranges
- Badge - Badges

---

## Notas Importantes

1. **Sempre usar Layout wrapper** - Garante header consistente
2. **Manter consistência de espaçamento** - Usar classes pré-definidas
3. **Data-TestID obrigatório** - Todo elemento interativo precisa
4. **Mobile first** - Pensar em mobile, depois escalar para desktop
5. **Não duplicar estilos** - Usar classes Tailwind ao máximo
6. **Cores via CSS vars** - Nunca hardcoding cores, usar var(--primary), etc.

