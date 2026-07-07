# PRD — Quiz Web "Verdadeiro ou Falso: Logística e Supply Chain"

## 1. Visão Geral

Aplicação web single-page de perguntas e respostas no formato **Verdadeiro/Falso** sobre **Logística e Supply Chain** (gestão de estoque/demanda, transporte e distribuição, supply chain estratégico, armazenagem e operações de CD), cobrindo do nível iniciante (conceitual/negócio) ao avançado (técnico/operacional do setor).

O objetivo é servir como ferramenta de **estudo pessoal**, permitindo ao usuário testar e reforçar seu conhecimento sobre Logística e Supply Chain de forma rápida e gamificada.

## 2. Objetivo de Negócio

- **Propósito:** aprendizado pessoal / autoavaliação de conhecimento sobre Logística e Supply Chain.
- **Público-alvo:** o próprio usuário (uso individual), sem necessidade de contas, login ou compartilhamento.
- **Critério de sucesso:** o usuário consegue selecionar um nível de dificuldade, responder a uma sequência de perguntas V/F com feedback imediato, e ver um resultado final claro (pontuação e acertos por nível).
- **Fora de escopo (v1):** múltiplos usuários, backend, autenticação, ranking compartilhado, deploy público. Tudo roda localmente (`npm run dev`).

## 3. Estrutura de Conteúdo

### 3.1 Níveis de dificuldade

| Nível | Foco | Exemplos de tópicos |
|---|---|---|
| **Iniciante** | Conceitos gerais de negócio + termos/siglas básicos do setor | O que é SCM (Supply Chain Management), por que importa para as empresas, cadeia de suprimentos vs. logística, SKU, Lead Time, JIT (Just in Time), FOB |
| **Intermediário** | Aprofundamento de conceitos de negócio + siglas/termos mais específicos | Trade-off custo x nível de serviço, tipos de estoque, Incoterms, Lead Time de fornecedor vs. cliente, indicadores básicos de desempenho, diferença entre CD e depósito |
| **Avançado** | Técnico/operacional do setor, dividido em 4 sub-áreas | (a) Gestão de estoque/demanda: forecasting, EOQ (lote econômico), safety stock; (b) Transporte e distribuição: modais, roteirização, frete; (c) Supply chain estratégico: S&OP, sourcing, KPIs (OTIF, fill rate); (d) Armazenagem/operações de CD: WMS, cross-docking, picking |

### 3.2 Volume de conteúdo (v1)

- **10 perguntas por nível** → **30 perguntas no total** para a primeira versão.
- No nível Avançado, buscar distribuir as 10 perguntas entre as 4 sub-áreas (gestão de estoque/demanda, transporte/distribuição, supply chain estratégico, armazenagem/CD), evitando concentrar tudo em uma única sub-área.
- Nos níveis Iniciante e Intermediário, misturar perguntas de conceito geral de negócio com perguntas focadas em termos/siglas do setor (SKU, JIT, FOB, Lead Time, Incoterms etc.).
- Cada pergunta deve ter: enunciado (afirmação), resposta correta (`true`/`false`) e uma **explicação curta** exibida no feedback.
- Conteúdo deve ser factualmente correto — basear-se em conceitos consolidados de Logística e Supply Chain (bibliografia/prática de mercado) ao redigir as perguntas, evitando informações desatualizadas ou inventadas.

### 3.3 Modelo de dados (JSON estático)

Arquivo `src/data/questions.json`, sem backend/banco de dados:

```json
[
  {
    "id": "ini-01",
    "level": "iniciante",
    "category": "conceitos-gerais",
    "statement": "SCM (Supply Chain Management) trata apenas do transporte de mercadorias entre fábrica e cliente final.",
    "answer": false,
    "explanation": "SCM envolve toda a cadeia — fornecedores, produção, armazenagem, distribuição e informação — não somente o transporte."
  },
  {
    "id": "int-05",
    "level": "intermediario",
    "category": "siglas-termos",
    "statement": "Lead Time é o tempo total decorrido entre o momento em que um pedido é feito e o momento em que ele é efetivamente entregue.",
    "answer": true,
    "explanation": "Lead Time é justamente esse intervalo entre a colocação do pedido e seu recebimento/entrega."
  },
  {
    "id": "adv-07",
    "level": "avancado",
    "category": "armazenagem-cd",
    "statement": "Cross-docking consiste em armazenar produtos por longos períodos no centro de distribuição antes de expedi-los.",
    "answer": false,
    "explanation": "Cross-docking é o oposto: a mercadoria é recebida e redirecionada para expedição rapidamente, com pouco ou nenhum tempo de armazenagem."
  }
]
```

Campos: `id` (string única), `level` (`iniciante` | `intermediario` | `avancado`), `category` (string livre, ex.: `conceitos-gerais`, `siglas-termos`, `estoque-demanda`, `transporte-distribuicao`, `supply-chain-estrategico`, `armazenagem-cd`, para agrupar/exibir tags), `statement` (string), `answer` (boolean), `explanation` (string).

## 4. Funcionalidades (Escopo MVP)

1. **Tela inicial** com breve descrição do quiz e **seleção de nível** antes de começar:
   - Opções: Iniciante / Intermediário / Avançado / Misto (todas as perguntas embaralhadas).
2. **Tela de pergunta**:
   - Exibe o enunciado e dois botões: **Verdadeiro** / **Falso**.
   - **Timer por pergunta** (ex.: 20 segundos, configurável via constante). Se o tempo esgotar sem resposta, conta como erro automaticamente.
   - Barra/indicador de progresso (pergunta X de N).
3. **Feedback imediato**:
   - Ao responder (ou o tempo esgotar), mostra visualmente se acertou ou errou (cores/ícones) e exibe a `explanation`.
   - Botão "Próxima pergunta" para avançar (sem avanço automático, para dar tempo de ler a explicação).
4. **Tela de resultado final**:
   - Pontuação total (ex.: 24/30) e percentual de acerto.
   - Detalhamento por nível (se o modo "Misto" foi usado).
   - Botão para "Jogar novamente" (reinicia com nova seleção de nível).
5. **Sem persistência entre sessões**: não há histórico salvo em localStorage nem backend — cada sessão é independente.

### Fora de escopo nesta versão (backlog futuro)
- Histórico/ranking local (localStorage).
- Deploy público (Vercel/Netlify/GitHub Pages).
- Painel administrativo para gerenciar perguntas.
- Banco de perguntas maior (15-30+ por nível).
- Compartilhamento de resultado (redes sociais).

## 5. Requisitos Técnicos

### 5.1 Stack

- **React + Vite** (SPA), JavaScript (sem TypeScript, para manter simplicidade — pode evoluir depois se necessário).
- Sem backend, sem banco de dados: dados vêm de `questions.json` importado localmente.
- Estilização: CSS puro (CSS Modules ou styled-components simples), com **estilo visual colorido e lúdico/gamificado**: cores vibrantes, transições/animações leves, barra de progresso animada, ícones/emojis de acerto e erro. Biblioteca de animação (ex. `framer-motion`) é opcional, não obrigatória.
- Sem autenticação, sem roteamento complexo (pode usar estado local de "tela atual" em vez de React Router, dado o escopo pequeno).

### 5.2 Estrutura de pastas sugerida

```
src/
  main.jsx
  App.jsx
  data/
    questions.json
  components/
    HomeScreen.jsx
    LevelSelect.jsx
    QuizScreen.jsx
    QuestionCard.jsx
    Timer.jsx
    ProgressBar.jsx
    ResultScreen.jsx
  styles/
    (CSS correspondente aos componentes, ou CSS Modules)
```

### 5.3 Lógica de estado (alto nível)

- Estado da aplicação controla: tela atual (`home` | `quiz` | `result`), nível selecionado, lista de perguntas embaralhadas do nível, índice da pergunta atual, respostas do usuário (array de acertos/erros), tempo restante da pergunta atual.
- Ao entrar em `quiz`: embaralhar perguntas do(s) nível(is) selecionado(s) e resetar índice/pontuação.
- Timer decrementado a cada segundo; ao chegar a 0, trata como resposta errada automaticamente e mostra feedback.
- Ao finalizar a última pergunta, transita para tela `result` com o resumo calculado.

### 5.4 Requisitos não-funcionais

- Responsivo (funcionar bem em desktop e mobile/tablet).
- Rodar localmente com `npm install && npm run dev`, sem variáveis de ambiente ou configuração externa.
- Sem dependência de rede em runtime (dados 100% locais via JSON importado).

## 6. Critérios de Aceite

- [ ] Usuário consegue escolher um nível (Iniciante, Intermediário, Avançado ou Misto) na tela inicial.
- [ ] Quiz exibe uma pergunta por vez com dois botões (Verdadeiro/Falso) e timer visível.
- [ ] Ao responder (ou o tempo esgotar), o app mostra imediatamente se a resposta está certa/errada, junto com a explicação.
- [ ] Usuário consegue avançar manualmente para a próxima pergunta após ver o feedback.
- [ ] Ao final, é exibida a pontuação total e (se modo Misto) o detalhamento por nível.
- [ ] Usuário pode reiniciar o quiz e escolher um novo nível.
- [ ] Existem pelo menos 10 perguntas válidas e factualmente corretas por nível (30 no total) no arquivo `questions.json`, cobrindo os tópicos definidos na seção 3.1 (incluindo as 4 sub-áreas do nível Avançado).
- [ ] Layout é colorido, com boa legibilidade e responsivo em telas menores.

## 7. Próximos Passos (fora do MVP, para versões futuras)

- Adicionar persistência local (histórico de tentativas via localStorage).
- Aumentar o banco de perguntas (15-30+ por nível).
- Preparar build estático para deploy público (Vercel/Netlify/GitHub Pages).
- Avaliar painel simples para adicionar/editar perguntas sem mexer direto no JSON.
