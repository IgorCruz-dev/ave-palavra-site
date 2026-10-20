'use client';

import { BrandMark, DemoTag, Reveal, SectionTitle, useTilt } from '../primitives';
import type { Approvals, Evolution, FeaturedEssay, RealStat, ResultsSection as ResultsData } from '@/content/types';

/**
 * Seção "Resultados": folha de redação 3D com o selo da nota, card de evolução
 * e mural de aprovações, mais a faixa de fatos verificados.
 *
 * A folha de redação é ilustrativa (`is_example`) e não leva mais o selo
 * amarelo, a pedido. Para continuar honesta sem o selo, ela não mostra nota:
 * numa seção chamada "Resultados", um 960 sem aviso leria como resultado real
 * de aluno. Com uma redação real e autorizada (`is_example: false`), o selo da
 * nota volta.
 */
export function ResultsSection({
  results,
  symbolUrl,
  preview,
}: {
  results: ResultsData;
  symbolUrl: string | null;
  preview: boolean;
}) {
  const essay = results.featured_essay;
  const evolution = results.evolution;
  const approvals = results.approvals;
  const realStat = results.real_stat;

  const showEssay = Boolean(essay?.visible && essay.score != null);
  const showEvolution = Boolean(evolution?.visible && evolution.points.length >= 2);
  // Mural vazio: só aparece em preview, e como espaço reservado explícito.
  const showApprovals = Boolean(
    approvals?.visible && (approvals.items.length > 0 || approvals.placeholder_when_empty),
  );
  const showRealStat = Boolean(realStat?.visible && realStat.value);

  return (
    <section className="results" id="resultados" aria-labelledby="res-title">
      <div className="wrap">
        <header className="sec-head">
          {results.eyebrow && (
            <Reveal as="p" index={0} className="eyebrow eyebrow--dark">
              <span className="dot" />
              {results.eyebrow}
            </Reveal>
          )}
          <Reveal index={1}>
            <SectionTitle id="res-title" title={results.title} highlight={results.title_highlight} inline={results.title_highlight_inline} />
          </Reveal>
          {results.lead && (
            <Reveal as="p" index={2} className="sec-lead">
              {results.lead}
            </Reveal>
          )}
        </header>

        {(showEssay || showEvolution || showApprovals || showRealStat) && (
          <div className="results__grid">
            {showEssay && essay && <EssaySheet3D essay={essay} symbolUrl={symbolUrl} />}

            {(showEvolution || showApprovals || showRealStat) && (
              <div className="results__side">
                {showRealStat && realStat && <RealStatCard stat={realStat} />}
                {showEvolution && evolution && <EvolutionCard evolution={evolution} />}
                {showApprovals && approvals && <ApprovalsCard approvals={approvals} preview={preview} />}
              </div>
            )}
          </div>
        )}

        {results.facts.length > 0 && (
          <Reveal as="ul" className="facts">
            {results.facts.map((fact) => (
              <li key={fact.value + fact.text}>
                <b>{fact.value}</b>
                <span>{fact.text}</span>
              </li>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/**
 * Dado REAL, sem selo de exemplo.
 *
 * É o primeiro número verificado do site, e por isso vem acompanhado da fonte:
 * número grande sem recorte envelhece mal, e quem lê tem direito de saber de
 * onde ele saiu. A linha da fonte não é rodapé decorativo — é parte do dado.
 */
function RealStatCard({ stat }: { stat: RealStat }) {
  return (
    <Reveal className="card card--real">
      <p className="card__kicker">{stat.kicker}</p>
      <p className="real__v">{stat.value}</p>
      <p className="real__l">{stat.label}</p>
      {stat.source && <p className="real__src">{stat.source}</p>}
    </Reveal>
  );
}

/** Folha de redação em 3D, com o selo circular da nota em translateZ. */
function EssaySheet3D({ essay, symbolUrl }: { essay: FeaturedEssay; symbolUrl: string | null }) {
  const [first, second] = essay.comments;
  const tilt = useTilt('.essay3d__paper');
  return (
      <Reveal as="figure" className="essay3d" {...tilt}>
        <div className="essay3d__shadow" aria-hidden="true" />
        <div className="essay3d__paper">
          <div className="essay3d__top">
            <span className="essay3d__brand">
              <BrandMark symbolUrl={symbolUrl} size={34} />
              Folha de redação
            </span>
            {essay.theme && <span className="essay3d__meta">{essay.theme}</span>}
          </div>
          <div className="essay3d__body">
            <p>{essay.excerpt}</p>
            <div className="ruled" aria-hidden="true">
              {Array.from({ length: 9 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
          </div>
          {!essay.is_example && essay.score != null && <ScoreStamp score={essay.score} max={essay.max_score} />}
          {first && <span className="hand hand--1">{first}</span>}
          {second && <span className="hand hand--2">{second}</span>}
        </div>
      </Reveal>
  );
}

export function ScoreStamp({ score, max }: { score: number; max: number }) {
  return (
    <div className="stamp">
      <span className="stamp__label">Nota final</span>
      <span className="stamp__n">{score}</span>
      <span className="stamp__sub">de {max}</span>
    </div>
  );
}

/**
 * Gráfico de evolução. A linha se desenha ao entrar na viewport via
 * stroke-dashoffset, como no protótipo; a geometria é calculada a partir dos
 * pontos do conteúdo, então qualquer org pode ter a própria curva.
 */
function EvolutionCard({ evolution }: { evolution: Evolution }) {
  const tilt = useTilt();

  const pts = evolution.points;
  const W = 420;
  const H = 170;
  const padX = 14;
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = max - min || 1;
  const coords = pts.map((p, i) => {
    const x = padX + (i * (W - padX * 2 - 2)) / Math.max(1, pts.length - 1);
    const y = 140 - ((p - min) / span) * 114;
    return { x: Math.round(x), y: Math.round(y), value: p };
  });
  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x} ${c.y}`).join(' ');
  const area = `${line} L${coords[coords.length - 1].x} ${H} L${coords[0].x} ${H} Z`;
  const delta = pts[pts.length - 1] - pts[0];

  return (
      <Reveal as="article" index={0} className="card evo" {...tilt}>
        <div className="evo__head">
          <div>
            <p className="card__kicker">{evolution.kicker}</p>
            <p className="card__title">{evolution.title}</p>
          </div>
          {delta > 0 && <span className="badge-up">+{delta}</span>}
        </div>

        <svg
          className="evo__chart"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Evolução das notas: ${pts.join(', ')}`}
        >
          <defs>
            <linearGradient id="ops-evoFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--teal)" stopOpacity=".35" />
              <stop offset="1" stopColor="var(--teal)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="evo__grid">
            <line x1="0" y1="20" x2={W} y2="20" />
            <line x1="0" y1="70" x2={W} y2="70" />
            <line x1="0" y1="120" x2={W} y2="120" />
          </g>
          <path d={area} fill="url(#ops-evoFill)" />
          <path className="evo__line" d={line} />
          <g className="evo__pts">
            {coords.map((c, i) => (
              <circle
                key={c.x}
                cx={c.x}
                cy={c.y}
                r={i === coords.length - 1 ? 7 : 5}
                className={i === coords.length - 1 ? 'last' : undefined}
              />
            ))}
          </g>
          <g className="evo__lbl">
            {coords.map((c, i) => (
              <text key={c.x} x={i === coords.length - 1 ? c.x - 12 : c.x} y={c.y + (i === coords.length - 1 ? -12 : 22)}>
                {c.value}
              </text>
            ))}
          </g>
        </svg>

        {evolution.is_example && <DemoTag variant="inline">Exemplo ilustrativo</DemoTag>}
      </Reveal>
  );
}

function ApprovalsCard({ approvals, preview }: { approvals: Approvals; preview: boolean }) {
  const hasItems = approvals.items.length > 0;
  const tilt = useTilt();

  return (
      <Reveal as="article" index={1} className="card approvals" {...tilt}>
        <p className="card__kicker">{approvals.kicker}</p>
        <p className="card__title">{approvals.title}</p>

        <div className="approvals__chips">
          {hasItems
            ? approvals.items.map((item) => (
                <span className="chip" key={`${item.name}-${item.institution}-${item.year}`}>
                  <i />
                  {[item.name, item.course, item.institution, item.year].filter(Boolean).join(' · ')}
                </span>
              ))
            : /* Espaço reservado — o filtro público já garante que isto só
                 chega aqui em preview/admin. */
              <>
                {['Universidade', 'Curso aprovado', 'Vestibular'].map((label) => (
                  <span className="chip" key={label}>
                    <i />
                    {label}
                  </span>
                ))}
                <span className="chip chip--more">+ turma {new Date().getFullYear()}</span>
              </>}
        </div>

        {!hasItems && preview && (
          <DemoTag variant="inline">Espaço reservado para aprovações confirmadas</DemoTag>
        )}
      </Reveal>
  );
}
