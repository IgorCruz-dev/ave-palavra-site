'use client';

import { Reveal, SectionTitle, VideoLightbox, useTilt, useVideoLightbox } from '../primitives';
import type { InsideSection as InsideData, TeamBlock, VideoItem } from '@/content/types';

/**
 * Um item que só tem `external_url` NÃO toca na página: ele abre o Instagram.
 * O ícone de play sozinho prometia reprodução local, então quem só leva para
 * fora ganha um selo visível e um rótulo de acessibilidade que dizem para onde
 * o clique vai. Quando os arquivos dos reels chegarem, basta preencher
 * `video_url` em site.ts: o selo some e o vídeo passa a tocar no lightbox.
 */
function isExternalOnly(item: VideoItem): boolean {
  return !item.video_url && Boolean(item.external_url);
}

/** Rótulo honesto para o botão de play, conforme o destino real do clique. */
function playLabel(item: VideoItem): string {
  return isExternalOnly(item) ? `Abrir no Instagram: ${item.title}` : `Assistir: ${item.title}`;
}

function ExternalBadge() {
  return (
    <span className="ext-badge">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
      </svg>
      Instagram
    </span>
  );
}

/**
 * Seção "Por dentro / Histórias reais": vídeo principal, reels e depoimentos.
 *
 * Depoimentos vazios (nenhum com consentimento completo) NÃO viram espaço
 * reservado em produção — o bloco de citações some e a coluna de texto fica só
 * com título e lead, com a mídia ocupando o outro lado. Os placeholders do
 * protótipo aparecem apenas em preview, para o founder ver onde o conteúdo vai.
 */
export function InsideSection({ inside, preview }: { inside: InsideData; preview: boolean }) {
  const lightbox = useVideoLightbox();
  const hasTestimonials = inside.testimonials.length > 0;
  const showQuotes = hasTestimonials || preview;

  const openVideo = (item: VideoItem) => {
    if (item.video_url) {
      lightbox.show(item.video_url, item.title || 'Vídeo');
    } else if (item.external_url) {
      window.open(item.external_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="inside" id="por-dentro" aria-labelledby="in-title">
      <div className="wrap inside__grid">
        <div className="inside__copy">
          {inside.eyebrow && (
            <Reveal as="p" index={0} className="eyebrow eyebrow--dark">
              <span className="dot" />
              {inside.eyebrow}
            </Reveal>
          )}
          <Reveal index={1}>
            <SectionTitle id="in-title" title={inside.title} highlight={inside.title_highlight} inline={inside.title_highlight_inline} />
          </Reveal>
          {inside.lead && (
            <Reveal as="p" index={2} className="sec-lead">
              {inside.lead}
            </Reveal>
          )}

          {showQuotes && (
            <div className="quotes">
              {hasTestimonials
                ? inside.testimonials.map((t, i) => (
                    <Reveal
                      as="blockquote"
                      key={`${t.name}-${i}`}
                      index={i}
                      className={`quote${i % 2 === 1 ? ' quote--alt' : ''}`}
                    >
                      <span className="quote__mark" aria-hidden="true">
                        “
                      </span>
                      <p>{t.text}</p>
                      {/* Sem nome não há rodapé: um avatar com "?" e campos
                          vazios diria menos do que o próprio depoimento. */}
                      {(t.name || t.detail) && (
                        <footer>
                          {t.name && (
                            <span className={`avatar${i % 2 === 1 ? ' avatar--teal' : ''}`}>
                              {t.name.slice(0, 1).toUpperCase()}
                            </span>
                          )}
                          <div>
                            {t.name && <b>{t.name}</b>}
                            {t.detail && <span>{t.detail}</span>}
                          </div>
                        </footer>
                      )}
                    </Reveal>
                  ))
                : PLACEHOLDER_QUOTES.map((q, i) => (
                    <Reveal
                      as="blockquote"
                      key={q.letter}
                      index={i}
                      className={`quote${i % 2 === 1 ? ' quote--alt' : ''}`}
                    >
                      <span className="quote__mark" aria-hidden="true">
                        “
                      </span>
                      <p>{q.text}</p>
                      <footer>
                        <span className={`avatar${i % 2 === 1 ? ' avatar--teal' : ''}`}>{q.letter}</span>
                        <div>
                          <b>Nome do aluno</b>
                          <span>{q.detail}</span>
                        </div>
                      </footer>
                    </Reveal>
                  ))}
            </div>
          )}
        </div>

        <div className="inside__media">
          {inside.main_video && <MainVideo video={inside.main_video} onOpen={openVideo} />}

          {inside.reels.length > 0 && (
            <div className="reels">
              {inside.reels.map((reel, i) => (
                <Reveal as="figure" key={reel.cover_url ?? i} index={i} className="reel">
                  {reel.cover_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={reel.cover_url} alt={reel.alt || reel.title} loading="lazy" decoding="async" />
                  )}
                  {isExternalOnly(reel) && <ExternalBadge />}
                  <button
                    type="button"
                    className="reel__play"
                    aria-label={playLabel(reel)}
                    onClick={() => openVideo(reel)}
                  />
                  <figcaption>{reel.title}</figcaption>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {inside.team && inside.team.visible && inside.team.members.length > 0 && (
        <div className="wrap">
          <TeamGrid team={inside.team} />
        </div>
      )}

      {lightbox.open && (
        <VideoLightbox videoUrl={lightbox.open.url} title={lightbox.open.title} onClose={lightbox.hide} />
      )}
    </section>
  );
}

/**
 * "Conheça nossa equipe".
 *
 * As fotos são recortes sem fundo (PNG/WebP com alfa) enquadrados todos do
 * mesmo jeito — topo da cabeça a ~9% da altura, cabeça com ~31% —, então a
 * grade fica alinhada mesmo vindo de fotos tiradas em lugares diferentes. O
 * fundo de cada card é o arco claro do CSS, não a foto.
 *
 * Nome e disciplina são opcionais: sem eles, o card mostra só a foto. Nome
 * inventado não é opção.
 */
function TeamGrid({ team }: { team: TeamBlock }) {
  return (
    <div className="team" id="equipe">
      <p className="panel__kicker">{team.kicker}</p>
      <h3 className="panel__title" style={{ fontSize: 30, margin: '8px 0 10px' }}>
        {team.title}
      </h3>
      {team.lead && <p className="sec-lead">{team.lead}</p>}
      <ul className="team__grid">
        {team.members.map((m, i) => (
          <Reveal as="li" key={m.photo_url ?? m.name ?? i} index={i % 5} className="tmember">
            <span className="tmember__ph">
              {m.photo_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo_url} alt={m.alt || m.name} width={480} height={600} loading="lazy" decoding="async" />
              )}
            </span>
            {m.name && <b>{m.name}</b>}
            {m.role && <span>{m.role}</span>}
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

function MainVideo({ video, onOpen }: { video: VideoItem; onOpen: (v: VideoItem) => void }) {
  const tilt = useTilt();
  const playable = Boolean(video.video_url || video.external_url);

  return (
    <Reveal as="figure" className="video" {...tilt}>
      {video.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={video.cover_url} alt={video.alt || video.title} loading="lazy" decoding="async" />
      )}
      <div className="video__shade" aria-hidden="true" />
      {isExternalOnly(video) && <ExternalBadge />}
      {playable && (
        <button
          type="button"
          className="video__play"
          aria-label={playLabel(video)}
          onClick={() => onOpen(video)}
        >
          <span aria-hidden="true" />
        </button>
      )}
      <figcaption className="video__cap">
        <span className="live-dot" aria-hidden="true" />
        <div>
          <b>{video.title}</b>
          <span>{video.subtitle}</span>
        </div>
      </figcaption>
    </Reveal>
  );
}

/** Só em preview — ver a decisão documentada no topo do arquivo. */
const PLACEHOLDER_QUOTES = [
  {
    letter: 'A',
    text: 'Espaço reservado para o depoimento de um aluno real, publicado com a autorização dele (e dos responsáveis, se for menor de idade).',
    detail: 'Aprovação · curso · ano',
  },
  {
    letter: 'B',
    text: 'Depoimento autorizado de um segundo aluno, com nota ou aprovação conquistada.',
    detail: 'Nota da redação · vestibular',
  },
];
