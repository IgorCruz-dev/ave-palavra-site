'use client';

import { CtaButton, MoreDetails, Reveal, SectionTitle, usePauseWhenOffscreen } from '../primitives';
import { resolveCtaHref, ctaIsExternal } from '@/content/helpers';
import type { MiguilimSection as MiguilimData, SiteLinks } from '@/content/types';

/**
 * Seção do Curso Miguilim.
 *
 * É a única seção com fundo quente do site. A unidade com o resto vem da
 * tipografia, das primitivas de card e botão e do ritmo de espaçamento — o que
 * muda é só o fundo e um acento rosado, declarados no escopo de `.mig` e fora
 * do TEMA. O ritmo de fundos do site já alterna, então uma seção quente entre
 * duas frias é respiro, não ruptura.
 *
 * O eixo é a história do menino que pôs óculos pela primeira vez. Ela vale mais
 * que o conteúdo programático, e por isso ganhou a peça visual da seção.
 */
export function MiguilimSection({
  miguilim,
  ctx,
}: {
  miguilim: MiguilimData;
  ctx: SiteLinks;
}) {
  // Mesmo mecanismo do herói: fora da viewport, a lente para de animar.
  const sectionRef = usePauseWhenOffscreen<HTMLElement>();

  return (
    <section className="mig" id="miguilim" aria-labelledby="mig-title" ref={sectionRef}>
      <div className="wrap">
        <header className="sec-head" style={{ marginBottom: 0 }}>
          <div className="mig__head">
            {miguilim.eyebrow && (
              <Reveal as="p" index={0} className="eyebrow eyebrow--dark">
                <span className="dot" />
                {miguilim.eyebrow}
              </Reveal>
            )}
            {miguilim.audience && (
              <Reveal as="p" index={1} className="mig__age">
                {miguilim.audience}
              </Reveal>
            )}
          </div>
          <Reveal index={2}>
            <SectionTitle
              id="mig-title"
              title={miguilim.title}
              highlight={miguilim.title_highlight}
              inline={miguilim.title_highlight_inline}
            />
          </Reveal>
        </header>

        <div className="mig__grid">
          <div>
            {miguilim.story_html && (
              <Reveal
                as="p"
                className="mig__story"
                dangerouslySetInnerHTML={{ __html: miguilim.story_html }}
              />
            )}
            {miguilim.pull_quote && (
              <Reveal as="p" index={1} className="mig__quote">
                <em>{miguilim.pull_quote}</em>
              </Reveal>
            )}
          </div>

          {miguilim.lens_phrase && <LensStage phrase={miguilim.lens_phrase} />}
        </div>

        {miguilim.groups.length > 0 && (
          <div className="mig__groups">
            {miguilim.groups.map((group, i) => (
              <Reveal as="article" key={group.name} index={i} className="mgroup">
                <header className="mgroup__top">
                  <h3 className="mgroup__name">{group.name}</h3>
                  <p className="mgroup__sub">{group.subtitle}</p>
                  <p className="mgroup__when">{group.schedule}</p>
                </header>
                {group.items.map((item) => (
                  <div className="mgroup__item" key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                ))}
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mig__foot">
          {miguilim.signature && <p className="mig__sign">{miguilim.signature}</p>}
          {miguilim.primary_cta && (
            <CtaButton
              cta={miguilim.primary_cta}
              href={resolveCtaHref(miguilim.primary_cta, ctx)}
              external={ctaIsExternal(miguilim.primary_cta)}
              variant="sun"
              size="lg"
              withArrow
            />
          )}
        </Reveal>

        {miguilim.general && miguilim.general.items.length > 0 && (
          <MoreDetails label="Ver detalhes do curso">
            <Reveal className="panel" style={{ background: 'rgba(255,255,255,.62)', boxShadow: 'none', border: '1px solid rgba(255,255,255,.9)' }}>
              <p className="panel__kicker" style={{ color: '#b4455f' }}>
                {miguilim.general.kicker}
              </p>
              <ul className="tagrow" style={{ marginTop: 14 }}>
                {miguilim.general.items.map((item) => (
                  <li className="tag" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </MoreDetails>
        )}
      </div>
    </section>
  );
}

/**
 * Os óculos do Miguilim: a frase nasce embaçada e só fica nítida sob a lente,
 * que atravessa o texto devagar.
 *
 * O recorte nítido é uma cópia da frase dentro de um círculo com `overflow:
 * hidden`. A lente anda para um lado e a cópia de dentro anda para o outro, na
 * mesma distância (`--lens-travel`), o que mantém o texto nítido registrado com
 * o embaçado de baixo. Os dois movimentos são `transform`, então rodam no
 * compositor: o blur é rasterizado uma vez e não a cada quadro.
 *
 * O bloco inteiro é decorativo. A frase já está no texto da história, logo ao
 * lado, e repeti-la para o leitor de tela só geraria eco.
 */
function LensStage({ phrase }: { phrase: string }) {
  return (
    <Reveal className="lens-stage" index={1} aria-hidden="true">
      <p className="lens-phrase lens-stage__blur">{phrase}</p>
      <span className="lens-rig">
        <span className="lens">
          <span className="lens__inner">
            <span className="lens-phrase">{phrase}</span>
          </span>
        </span>
        <span className="lens__bridge" />
        <span className="lens__arm" />
      </span>
    </Reveal>
  );
}
