# Ave, Palavra! — site institucional

Site da **Ave, Palavra! Português e Cia** (Franca/SP). Next.js com exportação
estática: `npm run build` gera HTML/CSS/JS prontos em `out/`, que sobem em
qualquer hospedagem (Vercel, Netlify, S3, servidor próprio).

Não há banco, API nem área autenticada. Tudo o que o site mostra está neste
repositório. O portal do aluno continua na StudyTrack — os botões "Entrar" e
de matrícula apontam para lá.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # gera out/
npm start          # serve out/ localmente, para conferir o resultado final
npm run typecheck
```

## Editar o conteúdo

Tudo vive em **`src/content/site.ts`**: textos, imagens, depoimentos, telefones,
endereço, CTAs. Edite, rode `npm run build` e publique. O arquivo é tipado — se
um campo não existir ou estiver no formato errado, `npm run typecheck` acusa
antes de ir para o ar.

Pontos que vale conhecer:

- **`{years}`** é substituído pelos anos desde `hero.founded_year` na hora de
  renderizar. Nunca escreva "há 16 anos" fixo; o texto envelheceria sozinho.
- **`is_example: true`** faz o bloco aparecer com o selo amarelo "Exemplo
  ilustrativo". A nota 960, a evolução 560→960 e as notas C1–C5 são
  demonstrações do método, não resultados reais. **Não remova o selo** de um
  dado que não seja um resultado real e autorizado.
- **Mural de aprovações**: está oculto porque `results.approvals.items` está
  vazio. Preencha a lista e mude `placeholder_when_empty` se quiser exibi-lo.
- **Depoimentos** (`inside.testimonials`): publique apenas com autorização de
  quem escreveu — e dos responsáveis, se for menor de idade. Hoje estão sem
  nome, foto, curso ou ano, de propósito: menos dado pessoal exposto, mesma
  mensagem.
- **Vídeos**: cada card de `inside` aceita `video_url` (toca na própria página,
  em lightbox) ou `external_url` (abre o Instagram). Coloque os arquivos em
  `public/videos/` e aponte `video_url` para `/videos/arquivo.mp4`.

## Imagens

`public/img/` — já em WebP, nos tamanhos servidos. O herói está sem foto (a ave
da logomarca é a protagonista). Para voltar a ter uma, preencha `hero.person`
com uma foto natural, recortada sem fundo, em três larguras (480/800/1200) para
o `srcset`: ela vira o maior elemento da primeira tela.

`og-1200x630.jpg` é o card de compartilhamento do WhatsApp e das redes.

## Estrutura

```
src/
  app/            layout (metadados, Open Graph) e a página
  components/
    SiteTemplate.tsx   monta as seções
    sections/          nav, herói, resultados, método, por dentro, matrículas, rodapé
    primitives.tsx     revelação ao rolar, parallax, tilt, lightbox, botões
    premium-v1.css     todo o estilo, sob [data-org-site]
    fonts.ts           Fraunces, Manrope e Caveat, auto-hospedadas
  content/
    site.ts       o conteúdo (edite aqui)
    types.ts      o formato do conteúdo
    helpers.ts    tema, CTAs, {years}
```

## Acessibilidade e movimento

Com `prefers-reduced-motion: reduce` o site desliga flutuação, parallax, tilt,
o "chão" animado e as revelações — o conteúdo aparece de imediato, no lugar
final. A opacidade zero da revelação só vale quando há JavaScript e o usuário
não pediu redução de movimento; sem isso o pior caso é "sem animação", nunca
uma página em branco.

## Fontes

Fraunces, Manrope e Caveat, todas sob SIL Open Font License, auto-hospedadas em
`public/fonts/`.
