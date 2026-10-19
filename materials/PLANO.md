# Plano — evolução do site com o material de 2026

Documento de trabalho. O relatório final (`RELATORIO.md`) é o que vale como entrega.

## Diagnóstico da base

Medido antes de mexer, com o build de produção servido estaticamente:

| Métrica | Antes |
|---|---|
| Lighthouse desktop (performance) | 92 no dev server / ver build |
| Acessibilidade | 100 |
| SEO | 100 |
| CLS | 0,001 |
| LCP | 1,8 s |
| Scroll horizontal em 1440/1280/1024/768/390/360 | nenhum |
| `<h1>` por página | 1 em todas as larguras |
| Altura da página em 1440 | 6492 px |

Ritmo de fundos atual: escuro → claro → escuro → claro → painel → escuro.

## Decisões de design

### 1. Miguilim: ilha quente, não aba (caminho 2)

O material do Miguilim é pastel amarelo→rosa, oposto ao navy do site. Três
caminhos estavam na mesa; escolhi a **ilha**, com três amarras ao sistema:

- mesma tipografia (Fraunces/Manrope/Caveat), mesmas primitivas de card e botão,
  mesmo ritmo de espaçamento — só o fundo muda;
- a paleta quente **não é importada do PDF**. Ela nasce do `--sun` que já existe
  no site, com um tom rosado local, declarado apenas no escopo da seção e fora
  do `TEMA` — não é uma mudança de paleta do site;
- o texto segue navy (`--ink`), que é a tinta do site inteiro.

**Por que não abas.** O founder deixou em aberto ("não sei se tá pensando em
criar algumas abas, mas tá na sua mão"). Duas razões para não usar:

1. Ele pediu explicitamente que o Miguilim tenha presença. Aba esconde um dos
   cursos atrás de um clique — é o contrário de presença.
2. O site é composição em rolagem, não interface de aplicativo. Abas seriam o
   primeiro controle de UI numa página feita de papel 3D, selo de nota e
   caneta-tinteiro. Leria como outro designer.

O ritmo de fundos já alterna; uma seção quente entre duas frias é respiro, não
ruptura.

### 2. "Tempo de Travessia" como fio condutor

A assinatura de 2026 (ponte + ampulheta + despertador) não existia no site. Ela
amarra os dois cursos numa narrativa só: a ponte liga duas margens, e os dois
cursos são dois momentos da mesma travessia — Miguilim no começo (7º e 8º ano),
Redação e Humanidades no vestibular.

A arte da ponte foi extraída dos PDFs em 600 dpi, com o fundo removido por
distância de cor, e recolorida em navy para fundo claro.

Fica numa seção própria, não no herói: é campanha de 2026 e vai envelhecer. Numa
seção própria, sai com uma edição.

### 3. O 87% real substitui o gráfico de evolução ilustrativo

Hoje a seção Resultados tem **dois** blocos ilustrativos (nota 960 e evolução
560→960) e nenhum dado real. Com o 87% disponível, dois ilustrativos ao lado de
um real enfraquecem o real.

- O gráfico de evolução (`results.evolution`) passa a `visible: false` — fica no
  arquivo, é uma linha para voltar, nada se perde.
- O card do 87% ocupa o lugar dele, sem selo, com a fonte declarada numa linha
  pequena.
- A folha de redação 3D com a nota 960 **continua**, com o selo: é a assinatura
  visual do site e demonstra a correção.

Resultado: um ilustrativo + um real, em vez de dois ilustrativos + nenhum real.

### 4. Copy do Instagram vira seção nativa, não imagem colada

As três artes de feed não entram como imagem. Delas saem:

- **as fotos** (sala de aula, fachada da escola), recortadas de dentro das peças;
- **a copy**, reescrita na tipografia do site: "não ensinamos redação como
  fórmula pronta" vira a abertura do Método, e a lista *aula · produção ·
  correção · repertório · acompanhamento* vira o ciclo semanal, logo abaixo das
  três etapas que já existem.

A foto da aluna em close (`11.44.24(2)`) **não vai ao ar**: é menor de idade
identificável em primeiro plano. A foto de sala de aula, documental e com rostos
em escala menor, vai — com a ressalva registrada no relatório.

### 5. Estrutura final

| # | Seção | Fundo | Estado |
|---|---|---|---|
| 1 | Herói | escuro | inalterado |
| 2 | Resultados | claro | 87% real entra; evolução ilustrativa desligada |
| 3 | Método | escuro | + abertura "fórmula pronta" + ciclo semanal |
| 4 | **Travessia + Redação e Humanidades** | claro | nova |
| 5 | **Miguilim** | quente | nova |
| 6 | Por dentro | claro | + equipe (desligada) + foto de sala |
| 7 | **Outros serviços** | escuro, compacto | nova |
| 8 | Matrículas | painel | + fachada da escola |
| 9 | Rodapé | escuro | + links de serviços |

Nav ganha "Cursos". "Outros serviços" fica fora da nav principal (pedido de
discrição) e entra pelo rodapé.

## O que fica de fora, e por quê

- **Preço da gramática (R$ 120,00).** O site não exibe preço nenhum, por decisão
  deliberada. Publicar é mudança de estratégia comercial, não de layout.
- **Dinâmica minuto a minuto da aula** (15h–15h55, 5' intervalo…). A estrutura
  de 55'/45'/60' entra como linha do tempo; o horário exato de cada bloco é
  operacional demais para a página e muda por turma.
- **"Redações produzidas dentro do prazo garantem a correção"** e avisos do
  gênero: regra interna, não argumento de venda.
- **Acompanhamento escolar / profissional / aula particular** ficam como chips em
  Outros serviços, sem corpo próprio — não há conteúdo para mais que isso.

## Pendências com o founder

Vão no relatório final, em destaque. Nenhuma delas bloqueia a entrega; cada uma
tem um lugar pronto no código esperando o dado.
