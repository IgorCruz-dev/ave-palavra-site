import type { Cta, SiteTheme } from './types';

export const THEME_TOKENS = [
  'night', 'ink', 'navy', 'navy-2', 'teal', 'teal-2', 'sky',
  'sun', 'red', 'paper', 'mist', 'text', 'muted',
] as const;

export const PREMIUM_V1_BASE_THEME: SiteTheme = {
  night: '#070f2e',
  ink: '#0d1a4a',
  navy: '#1c306e',
  'navy-2': '#24409a',
  teal: '#2bc4d8',
  'teal-2': '#1497b8',
  sky: '#d8f5fa',
  sun: '#f6d44a',
  red: '#e0484f',
  paper: '#fbfaf6',
  mist: '#eef4fb',
  text: '#14204a',
  muted: '#5b6788',
};

/** Tokens → objeto de style com as custom properties do CSS. */
export function themeToCssVars(theme: SiteTheme): React.CSSProperties {
  const style: Record<string, string> = {};
  for (const [token, value] of Object.entries(theme)) style[`--${token}`] = value;
  return style as React.CSSProperties;
}

// ---------------------------------------------------------------------------
// CTAs e textos
// ---------------------------------------------------------------------------

/** O que `resolveCtaHref` precisa saber para montar links de login/registro. */
export interface CtaContext {
  loginUrl: string;
  registerUrl: string;
}

/** Converte um CTA do conteúdo no href final. Tipo desconhecido → âncora #top. */
export function resolveCtaHref(cta: Cta | null | undefined, ctx: CtaContext): string {
  if (!cta) return '#top';
  switch (cta.type) {
    case 'whatsapp': {
      const digits = (cta.value || '').replace(/\D/g, '');
      if (!digits) return '#top';
      const text = cta.message ? `?text=${encodeURIComponent(cta.message)}` : '';
      return `https://wa.me/${digits}${text}`;
    }
    case 'register':
      return ctx.registerUrl;
    case 'login':
      return ctx.loginUrl;
    case 'url':
      return cta.value || '#top';
    case 'anchor':
    default:
      return cta.value?.startsWith('#') ? cta.value : '#top';
  }
}

/** CTA que sai da página (WhatsApp, site externo) abre em nova aba. */
export function ctaIsExternal(cta: Cta | null | undefined): boolean {
  return cta?.type === 'whatsapp' || cta?.type === 'url';
}

/**
 * Substitui `{years}` pelos anos completos desde `founded_year`. Deixar "16
 * anos" fixo no texto envelheceria o site sozinho.
 */
export function interpolateYears(text: string, foundedYear?: number | null, now = new Date()): string {
  if (!text.includes('{years}')) return text;
  if (!foundedYear) return text.replace(/\{years\}/g, '');
  const years = Math.max(0, now.getFullYear() - foundedYear);
  return text.replace(/\{years\}/g, String(years));
}

/**
 * Expande `{years}` em TODO o conteúdo, não só no lead do herói: o marcador
 * aparece também nos perks de matrículas, e espalhar a chamada por cada seção
 * seria fácil de esquecer na próxima. Roda uma vez, no servidor.
 */
export function interpolateYearsDeep<T>(node: T, foundedYear?: number | null, now = new Date()): T {
  if (typeof node === 'string') return interpolateYears(node, foundedYear, now) as unknown as T;
  if (Array.isArray(node)) return node.map((item) => interpolateYearsDeep(item, foundedYear, now)) as unknown as T;
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) out[k] = interpolateYearsDeep(v, foundedYear, now);
    return out as T;
  }
  return node;
}

/** `https://wa.me/<digits>` a partir de um número solto do conteúdo. */
export function whatsappUrl(raw: string | null | undefined, message?: string): string | null {
  const digits = (raw ?? '').replace(/\D/g, '');
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
