# MODELO DE ALGORITMO DE MATCHMAKING

*Plataforma de Match entre Empresas, Investidores e Franqueadoras*

---

## 1. Objetivo do Algoritmo

Criar um sistema de pontuação ponderada que:

* Não restrinja matches de forma binária
* Classifique oportunidades por nível de aderência
* Gere ranking inteligente de oportunidades

---

## 2. Estrutura Geral do Score

| Pilar           | Descrição                                    | Peso Total |
| --------------- | -------------------------------------------- | ---------- |
| Fit Estrutural  | Critérios objetivos e estruturais            | 40%        |
| Fit Estratégico | Aderência de tese e modelo de negócio        | 35%        |
| Fit de Perfil   | Compatibilidade comportamental e operacional | 25%        |

---

## 3. Fit Estrutural (40%)

| Critério                          | Descrição                                               | Peso |
| --------------------------------- | ------------------------------------------------------- | ---- |
| Localização                       | Região de interesse vs região da empresa                | 15%  |
| Faixa de Investimento / Valuation | Compatibilidade entre ticket e valuation                | 15%  |
| Segmento / Setor                  | Alinhamento entre setor de interesse e setor da empresa | 10%  |

---

## 4. Fit Estratégico (35%)

| Critério             | Descrição                                   | Peso |
| -------------------- | ------------------------------------------- | ---- |
| Tipo de Investimento | Minoritário, majoritário ou aquisição total | 10%  |
| Estágio do Negócio   | Faturamento, maturidade e estrutura         | 10%  |
| Objetivo da Operação | Expansão, sucessão ou saída total           | 10%  |
| Ticket Mínimo/Máximo | Compatibilidade com capacidade financeira   | 5%   |

---

## 5. Fit de Perfil (25%)

| Critério               | Descrição                          | Peso |
| ---------------------- | ---------------------------------- | ---- |
| Apetite a Risco        | Conservador, moderado ou agressivo | 10%  |
| Envolvimento na Gestão | Investidor ativo ou passivo        | 5%   |
| Prazo de Retorno       | Curto, médio ou longo prazo        | 5%   |
| Experiência no Setor   | Know-how no segmento               | 5%   |

---

## 6. Cálculo do Match Score

Cada critério recebe nota de **0 a 1** (ou **0 a 100%**).

**Match Score Final =**

```
(Localização × 15%) +
(Valor × 15%) +
(Setor × 10%) +
(Tipo Investimento × 10%) +
(Estágio × 10%) +
(Objetivo × 10%) +
(Risco × 10%) +
(Gestão × 5%) +
(Prazo × 5%) +
(Experiência × 5%)
```

---

## 7. Classificação de Resultado

| Score Final   | Classificação   |
| ------------- | --------------- |
| 80% – 100%    | Match Forte     |
| 65% – 79%     | Match Potencial |
| 50% – 64%     | Match Fraco     |
| Abaixo de 50% | Baixa Aderência |
