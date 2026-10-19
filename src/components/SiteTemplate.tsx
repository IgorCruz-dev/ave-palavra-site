import { themeToCssVars, interpolateYearsDeep } from '@/content/helpers';
import { CONTEUDO, ESCOLA, TEMA } from '@/content/site';
import type { SiteLinks } from '@/content/types';
import { orgSiteFontClassName } from './fonts';
import { SiteNav } from './sections/SiteNav';
import { HeroSection } from './sections/HeroSection';
import { ResultsSection } from './sections/ResultsSection';
import { MethodSection } from './sections/MethodSection';
import { TravessiaSection } from './sections/TravessiaSection';
import { MiguilimSection } from './sections/MiguilimSection';
import { InsideSection } from './sections/InsideSection';
import { ServicesSection } from './sections/ServicesSection';
import { EnrollSection } from './sections/EnrollSection';
import { SiteFooter } from './sections/SiteFooter';
import { REVEAL_BOOTSTRAP_SCRIPT, RevealController } from './primitives';
import './premium-v1.css';

/**
 * Raiz do site.
 *
 * Server component: monta a marcação (bom para SEO e para o primeiro quadro) e
 * deixa a interatividade para os filhos marcados com 'use client'.
 *
 * Cada seção é opcional — o que não estiver em `site.ts` simplesmente não é
 * renderizado. O ritmo de fundos se mantém mesmo com seções faltando, porque
 * cada seção pinta o próprio fundo:
 *
 *   herói escuro → resultados claro → método escuro → travessia claro →
 *   miguilim quente → por dentro claro → serviços escuro → painel → rodapé.
 *
 * A seção quente do Miguilim é o único desvio de paleta do site, e é
 * deliberado: ver o comentário em MiguilimSection.
 */
export function SiteTemplate() {
  // `{years}` é expandido uma vez, aqui, para todo o conteúdo.
  const content = interpolateYearsDeep(CONTEUDO, CONTEUDO.hero?.founded_year);

  const links: SiteLinks = {
    nome: ESCOLA.nome,
    loginUrl: ESCOLA.loginUrl,
    registerUrl: ESCOLA.registroUrl,
  };

  const symbolUrl = content.brand?.symbol_url ?? null;
  const logoLight = content.nav?.logo_light_url ?? null;
  const logoDark = content.nav?.logo_dark_url ?? null;
  const mostrarSeloPlataforma = content.footer?.show_powered_by ?? true;

  // A foto do herói é o LCP: preload para ela ser descoberta já no <head>, sem
  // esperar o CSS. Sendo local (mesma origem), não precisa de preconnect.
  const heroImage = content.hero?.person?.image_url ?? null;
  const heroSrcSet = content.hero?.person?.image_sources?.length
    ? content.hero.person.image_sources.map((s) => `${s.url} ${s.width}w`).join(', ')
    : undefined;

  return (
    <div data-org-site="premium_v1" className={orgSiteFontClassName} style={themeToCssVars(TEMA)}>
      {heroImage && (
        <link
          rel="preload"
          as="image"
          href={heroImage}
          imageSrcSet={heroSrcSet}
          imageSizes="(max-width: 600px) 90vw, (max-width: 1100px) 70vw, 46vw"
          fetchPriority="high"
        />
      )}
      {/* Liga a revelação ao rolar antes da primeira pintura — ver Reveal. */}
      <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP_SCRIPT }} />
      <RevealController />

      {content.nav?.visible !== false && content.nav && (
        <SiteNav nav={content.nav} links={links} logoLight={logoLight} logoDark={logoDark} />
      )}

      <main id="conteudo">
        {content.hero?.visible !== false && content.hero && (
          <HeroSection hero={content.hero} ctx={links} symbolUrl={symbolUrl} />
        )}

        {content.results?.visible !== false && content.results && (
          <ResultsSection results={content.results} symbolUrl={symbolUrl} preview={false} />
        )}

        {content.method?.visible !== false && content.method && (
          <MethodSection
            method={content.method}
            symbolUrl={symbolUrl}
            showPlatformLabel={mostrarSeloPlataforma}
          />
        )}

        {content.travessia?.visible !== false && content.travessia && (
          <TravessiaSection travessia={content.travessia} ctx={links} />
        )}

        {content.miguilim?.visible !== false && content.miguilim && (
          <MiguilimSection miguilim={content.miguilim} ctx={links} />
        )}

        {content.inside?.visible !== false && content.inside && (
          <InsideSection inside={content.inside} preview={false} />
        )}

        {content.services?.visible !== false && content.services && (
          <ServicesSection services={content.services} ctx={links} />
        )}

        {content.enroll?.visible !== false && content.enroll && (
          <EnrollSection enroll={content.enroll} ctx={links} symbolUrl={symbolUrl} />
        )}
      </main>

      {content.footer?.visible !== false && content.footer && (
        <SiteFooter footer={content.footer} orgName={ESCOLA.nome} logoLight={logoLight} />
      )}
    </div>
  );
}
