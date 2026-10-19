/**
 * Gera o documento de revisão de texto (materials/REVISAO-DE-TEXTO.html).
 *
 * A professora Carla revisa COPY, não layout. Ela precisa ler o texto corrido,
 * na ordem em que ele aparece no site, sem caçar frases dentro de uma página —
 * e precisa que a correção volte aplicável, por isso cada trecho vem com o
 * caminho exato do campo em `site.ts`.
 *
 * O documento é gerado a partir do conteúdo, nunca escrito à mão: assim ele não
 * diverge do que está publicado. Para regerar:
 *
 *     npx tsx scripts/gerar-revisao-de-texto.mts
 */
import { writeFileSync } from 'node:fs';
import { CONTEUDO, SEO, ESCOLA } from '../src/content/site.ts';
import { interpolateYearsDeep } from '../src/content/helpers.ts';

type Trecho = { caminho: string; texto: string };

/** Campos que não são texto de leitura: URLs, telefones, ícones, bandeiras. */
const IGNORAR = new Set([
  'image_url', 'photo_url', 'video_url', 'external_url', 'cover_url', 'url',
  'logo_light_url', 'logo_dark_url', 'symbol_url', 'bridge_image_url',
  'og_image_url', 'privacy_url', 'terms_url', 'value', 'type', 'anchor',
  'phone_number', 'whatsapp_number', 'key', 'id', 'n', 'kind', 'circled',
]);

/** Campos que são texto de interface, úteis para a revisão mesmo sendo curtos. */
const CURTOS_RELEVANTES = new Set([
  'label', 'cta_label', 'login_label', 'title', 'name', 'day', 'time',
]);

function ehTextoDeLeitura(chave: string, valor: unknown): valor is string {
  if (typeof valor !== 'string' || !valor.trim()) return false;
  if (IGNORAR.has(chave)) return false;
  if (/^(https?:|mailto:|tel:|#|\/)/.test(valor)) return false;
  // strings de uma palavra só interessam se forem rótulo de interface
  if (!valor.includes(' ') && !CURTOS_RELEVANTES.has(chave)) return false;
  return true;
}

function coletar(no: unknown, caminho: string, saida: Trecho[]): void {
  if (Array.isArray(no)) {
    no.forEach((item, i) => coletar(item, `${caminho}[${i}]`, saida));
    return;
  }
  if (no && typeof no === 'object') {
    for (const [chave, valor] of Object.entries(no)) {
      const sub = caminho ? `${caminho}.${chave}` : chave;
      if (ehTextoDeLeitura(chave, valor)) saida.push({ caminho: sub, texto: valor });
      else coletar(valor, sub, saida);
    }
  }
}

/** Ordem de leitura no site, com o nome que o leitor reconhece. */
const SECOES: { chave: string; titulo: string; nota?: string }[] = [
  { chave: 'nav', titulo: 'Menu do topo' },
  { chave: 'hero', titulo: 'Primeira tela' },
  { chave: 'results', titulo: 'Resultados' },
  { chave: 'method', titulo: 'Método' },
  { chave: 'travessia', titulo: 'Tempo de Travessia — Redação e Humanidades', nota: 'Seção nova.' },
  { chave: 'miguilim', titulo: 'Curso Miguilim', nota: 'Seção nova.' },
  { chave: 'inside', titulo: 'Por dentro da Ave, Palavra!' },
  { chave: 'services', titulo: 'Outros serviços', nota: 'Seção nova.' },
  { chave: 'enroll', titulo: 'Matrículas' },
  { chave: 'footer', titulo: 'Rodapé' },
];

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Mostra o HTML permitido na copy (só <strong> e <em>) como marcação visível. */
function formatar(texto: string): string {
  return esc(texto)
    .replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/g, '<b>$1</b>')
    .replace(/&lt;em&gt;(.*?)&lt;\/em&gt;/g, '<i>$1</i>');
}

const conteudo = interpolateYearsDeep(CONTEUDO, CONTEUDO.hero?.founded_year);
const blocos: string[] = [];
let total = 0;

for (const secao of SECOES) {
  const dados = (conteudo as Record<string, unknown>)[secao.chave];
  if (!dados) continue;
  const trechos: Trecho[] = [];
  coletar(dados, secao.chave, trechos);
  if (!trechos.length) continue;
  total += trechos.length;
  blocos.push(`
  <section>
    <h2>${esc(secao.titulo)}</h2>
    ${secao.nota ? `<p class="nota">${esc(secao.nota)}</p>` : ''}
    ${trechos
      .map(
        (t) => `<article>
      <p class="t">${formatar(t.texto)}</p>
      <p class="c">site.ts → ${esc(t.caminho)}</p>
    </article>`,
      )
      .join('\n    ')}
  </section>`);
}

// metadados que aparecem no Google e no compartilhamento, mas não na página
const metaTrechos: Trecho[] = [];
coletar({ title: SEO.title, description: SEO.description }, 'SEO', metaTrechos);
blocos.push(`
  <section>
    <h2>Título e descrição para o Google e o WhatsApp</h2>
    <p class="nota">Não aparece na página; aparece na busca e no compartilhamento do link.</p>
    ${metaTrechos
      .map(
        (t) => `<article>
      <p class="t">${formatar(t.texto)}</p>
      <p class="c">site.ts → ${esc(t.caminho)}</p>
    </article>`,
      )
      .join('\n    ')}
  </section>`);

const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Revisão de texto — site da ${esc(ESCOLA.nome)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;600;700&display=swap">
<style>
  /* A Carla lê para revisar a COPY. Vale ela ver o texto nas mesmas fontes do
     site — Fraunces nos títulos, Manrope no corpo —, porque parte do julgamento
     de um texto é como ele assenta na página em que vai sair. */
  :root{
    --ink:#0d1a4a; --muted:#5b6788; --accent:#0f7489; --rule:rgba(13,26,74,.12);
    --ground:#fbfaf6; --card:#ffffff;
  }
  @media (prefers-color-scheme: dark){
    :root:not([data-theme="light"]){
      --ink:#eef2fb; --muted:#97a3c2; --accent:#5fd3e8; --rule:rgba(238,244,251,.16);
      --ground:#0e1430; --card:rgba(255,255,255,.045);
    }
  }
  :root[data-theme="dark"]{
    --ink:#eef2fb; --muted:#97a3c2; --accent:#5fd3e8; --rule:rgba(238,244,251,.16);
    --ground:#0e1430; --card:rgba(255,255,255,.045);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Manrope,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
       font-size:16px;line-height:1.65;color:var(--ink);background:var(--ground);
       padding:28px 20px 80px;-webkit-text-size-adjust:100%}
  main{max-width:660px;margin:0 auto}
  header{padding-bottom:26px;border-bottom:2px solid var(--ink);margin-bottom:34px}
  h1{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:clamp(26px,6vw,34px);
     line-height:1.12;letter-spacing:-.02em;margin-bottom:10px;text-wrap:balance}
  .sub{color:var(--muted);font-size:15px;font-variant-numeric:tabular-nums}
  .como{margin-top:18px;padding:16px 18px;background:var(--card);border:1px solid var(--rule);
        border-radius:12px;font-size:14.5px;color:var(--muted)}
  .como b{color:var(--ink);font-weight:700}
  h2{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:21px;letter-spacing:-.015em;
     margin:40px 0 4px;padding-top:24px;border-top:1px solid var(--rule);text-wrap:balance}
  section:first-of-type h2{border-top:0;padding-top:0;margin-top:0}
  .nota{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);
        font-weight:700;margin-bottom:14px}
  article{padding:15px 0;border-bottom:1px solid var(--rule)}
  .t{font-size:17px;line-height:1.6}
  .t b{font-weight:700}
  .c{margin-top:7px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;
     line-height:1.4;color:var(--muted);word-break:break-word}
  footer{margin-top:44px;padding-top:20px;border-top:1px solid var(--rule);
         font-size:13.5px;color:var(--muted)}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.92em}
  a:focus-visible,article:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
</style>
</head>
<body>
<main>
  <header>
    <h1>Revisão de texto — site da ${esc(ESCOLA.nome)}</h1>
    <p class="sub">Todo o texto publicado, na ordem em que aparece. ${total} trechos · ${hoje}</p>
    <div class="como">
      <b>Como usar:</b> leia e anote a correção ao lado do trecho. A linha cinza
      embaixo de cada texto diz onde ele vive no código — basta citá-la para a
      correção ser aplicada no lugar certo. <b>Negrito</b> e <i>itálico</i> aparecem
      aqui como aparecem no site.
    </div>
  </header>
${blocos.join('\n')}
  <footer>
    Gerado a partir de <code>src/content/site.ts</code>. Se o texto mudar no
    site, este documento é regerado e volta a bater.
  </footer>
</main>
</body>
</html>
`;

writeFileSync(new URL('../materials/REVISAO-DE-TEXTO.html', import.meta.url), html, 'utf8');

/**
 * Segunda saída: a mesma página sem o esqueleto externo, para publicar como
 * link que a Carla e o founder abrem no celular sem baixar arquivo nenhum.
 */
const corpo = html
  .slice(html.indexOf('<style>'), html.indexOf('</head>'))
  .concat(html.slice(html.indexOf('<main>'), html.indexOf('</main>') + 7));
writeFileSync(new URL('../materials/revisao-corpo.html', import.meta.url), `<title>Revisão de texto — site da ${esc(ESCOLA.nome)}</title>\n${corpo}`, 'utf8');

console.log(`materials/REVISAO-DE-TEXTO.html — ${total} trechos`);
console.log('materials/revisao-corpo.html — versão para publicar como link');
