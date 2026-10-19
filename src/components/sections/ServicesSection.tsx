'use client';

import { CtaButton, Reveal, SectionTitle } from '../primitives';
import { resolveCtaHref, ctaIsExternal } from '@/content/helpers';
import type { ServicesSection as ServicesData, SiteLinks } from '@/content/types';

/**
 * "Outros serviços" — português empresarial, SIPAT's e o resto.
 *
 * O pedido era explícito: o empresarial continua no site, "mas de uma forma
 * mais discreta". Discrição aqui é hierarquia, não omissão — a seção existe,
 * tem conteúdo de verdade e é encontrável pelo rodapé, mas usa metade do
 * respiro vertical das outras, título menor e nenhuma imagem. Quem veio pela
 * redação passa por ela sem ser interrompido; quem veio pela empresa acha.
 *
 * O empresarial tem mais corpo que os demais porque é o único com conteúdo
 * próprio publicado pela escola. A lista de chips aceita itens novos sem
 * redesenho — é onde os eventos culturais entram quando houver o que contar.
 */
export function ServicesSection({
  services,
  ctx,
}: {
  services: ServicesData;
  ctx: SiteLinks;
}) {
  const others = services.others;

  return (
    <section className="svc" id="servicos" aria-labelledby="svc-title">
      <div className="svc__glow" aria-hidden="true" />
      <div className="wrap">
        <header className="svc__head">
          <div>
            {services.eyebrow && (
              <Reveal as="p" index={0} className="eyebrow">
                <span className="dot" />
                {services.eyebrow}
              </Reveal>
            )}
            <Reveal index={1}>
              <SectionTitle
                id="svc-title"
                className="svc__title"
                title={services.title}
                highlight={services.title_highlight}
                inline={services.title_highlight_inline}
              />
            </Reveal>
          </div>
          {services.lead && (
            <Reveal as="p" index={2} className="svc__lead">
              {services.lead}
            </Reveal>
          )}
        </header>

        {services.featured.length > 0 && (
          <div className="svc__cards">
            {services.featured.map((card, i) => (
              <Reveal
                as="article"
                key={card.title}
                index={i}
                className={`svc-card${card.blocks.length > 3 ? ' svc-card--wide' : ''}`}
              >
                <h3>{card.title}</h3>
                {card.lead && <p className="svc-card__lead">{card.lead}</p>}
                <div className="svc-card__blocks">
                  {card.blocks.map((block) => (
                    <div key={block.title}>
                      <h4>{block.title}</h4>
                      <p>{block.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {others && others.items.length > 0 && (
          <Reveal className="svc__others">
            <p className="panel__kicker">{others.kicker}</p>
            <ul className="tagrow">
              {others.items.map((item) => (
                <li className="tag" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {services.primary_cta && (
          <Reveal className="svc__cta">
            <CtaButton
              cta={services.primary_cta}
              href={resolveCtaHref(services.primary_cta, ctx)}
              external={ctaIsExternal(services.primary_cta)}
              variant="ghost"
              withArrow
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
