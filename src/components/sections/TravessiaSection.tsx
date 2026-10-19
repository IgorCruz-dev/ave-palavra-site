'use client';

import { CtaButton, Reveal, SectionTitle, Tick } from '../primitives';
import { resolveCtaHref, ctaIsExternal } from '@/content/helpers';
import type { SiteLinks, TravessiaSection as TravessiaData } from '@/content/types';

/**
 * Seção "Tempo de Travessia" — a assinatura de 2026 e o curso de Redação e
 * Humanidades, que é a vitrine da escola.
 *
 * A arte da ponte (ponte + ampulheta + despertador) é marca d'água, no mesmo
 * registro da ave gigante do herói: decorativa, `alt` vazio, atrás do conteúdo.
 *
 * A peça central é a linha do tempo das três horas de aula. Ela é a resposta a
 * "jogar as informações do curso no site" que uma lista de tópicos não dá: o
 * pai que lê a página entende, de um olhar, como a tarde do filho é ocupada.
 */
export function TravessiaSection({
  travessia,
  ctx,
}: {
  travessia: TravessiaData;
  ctx: SiteLinks;
}) {
  const { timeline, genres, boards, classes, general, epigraph } = travessia;

  return (
    <section className="trav" id="cursos" aria-labelledby="trav-title">
      {travessia.bridge_image_url && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          className="trav__bridge"
          src={travessia.bridge_image_url}
          alt={travessia.bridge_alt}
          aria-hidden={travessia.bridge_alt ? undefined : true}
          width={1400}
          height={489}
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="wrap">
        <div className="trav__head">
          <header className="sec-head">
            {travessia.eyebrow && (
              <Reveal as="p" index={0} className="eyebrow eyebrow--dark">
                <span className="dot" />
                {travessia.eyebrow}
              </Reveal>
            )}
            <Reveal index={1}>
              <SectionTitle
                id="trav-title"
                title={travessia.title}
                highlight={travessia.title_highlight}
                inline={travessia.title_highlight_inline}
              />
            </Reveal>
            {travessia.lead && (
              <Reveal as="p" index={2} className="sec-lead">
                {travessia.lead}
              </Reveal>
            )}
          </header>

          {epigraph && (
            <Reveal as="blockquote" index={3} className="epigraph">
              <p>{epigraph.text}</p>
              <cite>{epigraph.author}</cite>
            </Reveal>
          )}
        </div>

        {timeline && timeline.blocks.length > 0 && <ClassTimeline timeline={timeline} />}

        {travessia.photo?.image_url && (
          <Reveal as="figure" className="place" style={{ marginTop: 28 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={travessia.photo.image_url}
              alt={travessia.photo.alt}
              width={1320}
              height={503}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="place__cap">
              {travessia.photo.kicker && <span className="place__k">{travessia.photo.kicker}</span>}
              {travessia.photo.text && <span className="place__t">{travessia.photo.text}</span>}
            </figcaption>
          </Reveal>
        )}

        {travessia.pillars.length > 0 && (
          <ul className="pillars">
            {travessia.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} index={i % 3} className="pillar">
                <span className="pillar__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </Reveal>
            ))}
          </ul>
        )}

        <div className="trav__cols">
          <div>
            {genres && genres.items.length > 0 && (
              <Reveal className="panel">
                <p className="panel__kicker">{genres.kicker}</p>
                <h3 className="panel__title">{genres.title}</h3>
                <ul className="tagrow">
                  {genres.items.map((item) => (
                    <li className="tag" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {boards && boards.items.length > 0 && (
              <Reveal className="panel" index={1}>
                <p className="panel__kicker">{boards.kicker}</p>
                <h3 className="panel__title">{boards.title}</h3>
                <ul className="tagrow">
                  {boards.items.map((item) => (
                    <li className="tag tag--board" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Deixa inequívoco que são conteúdos de estudo, não aprovações. */}
                {boards.note && <p className="panel__note">{boards.note}</p>}
              </Reveal>
            )}
          </div>

          <div>
            {classes && classes.items.length > 0 && (
              <Reveal className="panel">
                <p className="panel__kicker">{classes.kicker}</p>
                <h3 className="panel__title">{classes.title}</h3>
                <ul className="classes">
                  {classes.items.map((item) => (
                    <li key={item.day + item.time}>
                      <b>{item.day}</b>
                      <span>{item.time}</span>
                    </li>
                  ))}
                </ul>
                {classes.note && <p className="panel__note">{classes.note}</p>}
              </Reveal>
            )}

            {general && general.items.length > 0 && (
              <Reveal className="panel" index={1}>
                <p className="panel__kicker">{general.kicker}</p>
                <ul className="ticks" style={{ marginTop: 16 }}>
                  {general.items.map((item) => (
                    <li key={item}>
                      <Tick />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>

        {travessia.primary_cta && (
          <Reveal className="trav__cta">
            <CtaButton
              cta={travessia.primary_cta}
              href={resolveCtaHref(travessia.primary_cta, ctx)}
              external={ctaIsExternal(travessia.primary_cta)}
              variant="teal"
              size="lg"
              withArrow
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/**
 * As três horas de permanência, em proporção real: cada bloco cresce conforme
 * seus minutos (`flex-grow`), então 55' de humanidades é visivelmente maior que
 * o intervalo de 5'.
 *
 * A barra é decorativa (`aria-hidden`): quem lê por leitor de tela recebe a
 * legenda abaixo, que é texto de verdade e diz a mesma coisa sem depender de
 * largura.
 */
function ClassTimeline({
  timeline,
}: {
  timeline: NonNullable<TravessiaData['timeline']>;
}) {
  const total = timeline.blocks.reduce((sum, b) => sum + b.minutes, 0);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const totalLabel = minutes ? `${hours}h${String(minutes).padStart(2, '0')}` : `${hours} horas`;

  return (
    <Reveal className="tl">
      <div className="tl__top">
        <div>
          <p className="panel__kicker">{timeline.kicker}</p>
          <h3 className="panel__title" style={{ margin: '6px 0 0' }}>
            {timeline.title}
          </h3>
        </div>
        <p className="tl__total">{totalLabel} de permanência</p>
      </div>

      <div className="tl__bar" aria-hidden="true">
        {timeline.blocks.map((block, i) => (
          <div
            key={block.label + i}
            className={`tl__seg tl__seg--${block.kind}`}
            style={{ '--min': block.minutes } as React.CSSProperties}
          >
            <b>{block.minutes} min</b>
          </div>
        ))}
      </div>

      <ul className="tl__legend">
        {timeline.blocks.map((block, i) => (
          <li key={block.label + i} className={block.kind === 'intervalo' ? 'is-break' : undefined}>
            <i aria-hidden="true" />
            <b>{block.label}</b>
            <span>{block.minutes} minutos</span>
          </li>
        ))}
      </ul>

      {timeline.note && <p className="tl__note">{timeline.note}</p>}
    </Reveal>
  );
}
