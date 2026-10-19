/**
 * Formato do conteúdo do site.
 *
 * Herdado do template `premium_v1`, originalmente multi-inquilino dentro da
 * StudyTrack. Aqui o site é de uma escola só, então sumiram os campos de
 * consentimento (a curadoria é feita ao editar `site.ts`, não em runtime) e a
 * noção de "org" virou as constantes de ESCOLA, mais abaixo.
 */

export type CtaType = 'anchor' | 'whatsapp' | 'register' | 'login' | 'url';

export interface Cta {
  label: string;
  type: CtaType;
  value: string;
  message?: string | null;
}

export interface Testimonial {
  name: string;
  detail: string;
  text: string;
  photo_url: string | null;
  video_url: string | null;
}

export interface Approval {
  name: string;
  detail: string;
  text: string;
  photo_url: string | null;
  video_url: string | null;
  course: string;
  institution: string;
  year: number | null;
}

export interface NavSection {
  visible: boolean;
  links: { label: string; anchor: string }[];
  /**
   * A nav é transparente sobre o herói escuro e sólida depois de rolar, então
   * o template precisa de duas versões do logo. Vazias → cai no `logo_url` da
   * org nas duas situações.
   */
  logo_light_url: string | null;
  logo_dark_url: string | null;
  cta_label: string;
  show_whatsapp: boolean;
  whatsapp_number: string;
  login_label: string;
}

export interface HeroSection {
  visible: boolean;
  eyebrow: string;
  title_lines: string[];
  title_highlight: string;
  title_highlight_inline: boolean;
  lead_html: string;
  founded_year: number | null;
  primary_cta: Cta | null;
  secondary_cta: Cta | null;
  proof: { value: string; label: string }[];
  person: {
    image_url: string | null;
    /** Variantes para srcset — a foto do herói costuma ser o LCP da página. */
    image_sources: { url: string; width: number }[];
    name: string;
    role: string;
    alt: string;
  } | null;
  checklist: { title: string; items: { text: string; done: boolean }[] } | null;
  sheet_label: string;
  sheet_number: string;
}

export interface FeaturedEssay {
  visible: boolean;
  score: number | null;
  max_score: number;
  theme: string;
  excerpt: string;
  comments: string[];
  is_example: boolean;
}

export interface Evolution {
  visible: boolean;
  kicker: string;
  title: string;
  points: number[];
  is_example: boolean;
}

export interface Approvals {
  visible: boolean;
  kicker: string;
  title: string;
  items: Approval[];
  placeholder_when_empty: boolean;
}

export interface ResultsSection {
  visible: boolean;
  eyebrow: string;
  /** Pode conter "\n" para quebrar linha, como no protótipo. */
  title: string;
  title_highlight: string;
  /**
   * true = o destaque continua na MESMA linha do fim do título
   * ("Cada redação conta / uma *evolução.*"); false = linha própria
   * ("Por dentro da / *Ave, Palavra!*").
   */
  title_highlight_inline: boolean;
  lead: string;
  featured_essay: FeaturedEssay | null;
  evolution: Evolution | null;
  approvals: Approvals | null;
  facts: { value: string; text: string }[];
}

export interface Highlight {
  id: string;
  text: string;
  kind: 'teal' | 'sun' | 'red';
}

export interface MarginNote {
  id: string;
  title: string;
  text: string;
  red: boolean;
}

export interface CompetencyScore {
  key: string;
  label: string;
  score: number;
  max_score: number;
}

export interface CorrectionDemo {
  visible: boolean;
  theme: string;
  paragraphs: string[];
  highlights: Highlight[];
  margin_notes: MarginNote[];
  circled: string;
  scores: CompetencyScore[];
  total_score: number | null;
  total_max: number;
  next_tutoring: string;
  is_example: boolean;
  show_platform_label: boolean;
}

export interface MethodSection {
  visible: boolean;
  eyebrow: string;
  /** Pode conter "\n" para quebrar linha, como no protótipo. */
  title: string;
  title_highlight: string;
  /**
   * true = o destaque continua na MESMA linha do fim do título
   * ("Cada redação conta / uma *evolução.*"); false = linha própria
   * ("Por dentro da / *Ave, Palavra!*").
   */
  title_highlight_inline: boolean;
  steps: { n: string; title: string; text: string; accent: boolean }[];
  correction_demo: CorrectionDemo | null;
}

export interface VideoItem {
  cover_url: string | null;
  video_url: string | null;
  external_url: string | null;
  title: string;
  subtitle: string;
  alt: string;
}

export interface InsideSection {
  visible: boolean;
  eyebrow: string;
  /** Pode conter "\n" para quebrar linha, como no protótipo. */
  title: string;
  title_highlight: string;
  /**
   * true = o destaque continua na MESMA linha do fim do título
   * ("Cada redação conta / uma *evolução.*"); false = linha própria
   * ("Por dentro da / *Ave, Palavra!*").
   */
  title_highlight_inline: boolean;
  lead: string;
  main_video: VideoItem | null;
  reels: VideoItem[];
  testimonials: Testimonial[];
}

export interface EnrollSection {
  visible: boolean;
  eyebrow: string;
  title_lines: string[];
  title_highlight: string;
  title_highlight_inline: boolean;
  perks: string[];
  primary_cta: Cta | null;
  secondary_cta: Cta | null;
  photo_url: string | null;
  photo_alt: string;
  contact: {
    phone_display: string;
    phone_number: string;
    hours: string;
    address: string;
  } | null;
  contact_kicker: string;
}

export interface FooterSection {
  visible: boolean;
  about: string;
  phones: string[];
  email: string;
  address_lines: string[];
  hours: string;
  socials: { label: string; url: string }[];
  legal_name: string;
  privacy_url: string | null;
  terms_url: string | null;
  show_powered_by: boolean;
}

/**
 * Símbolo decorativo da marca, reusado em várias seções: a silhueta gigante
 * atrás da pessoa no herói, o ícone da folha de redação, o avatar da pílula, o
 * selo da tutoria e a marca d'água do painel de matrículas. É o SÍMBOLO (sem a
 * assinatura tipográfica), não o `logo_url` da org — é o que funciona ampliado.
 */
export interface BrandSection {
  symbol_url: string | null;
}

export interface SiteContent {
  brand?: BrandSection;
  nav?: NavSection;
  hero?: HeroSection;
  results?: ResultsSection;
  method?: MethodSection;
  inside?: InsideSection;
  enroll?: EnrollSection;
  footer?: FooterSection;
}

export interface SiteSeo {
  title?: string;
  description?: string;
  og_image_url?: string | null;
}

/**
 * Links e nome da escola, passados às seções que precisam deles (nav, CTAs de
 * login/registro). No multi-inquilino isso vinha da org; aqui vem de `ESCOLA`,
 * em site.ts.
 */
export interface SiteLinks {
  nome: string;
  loginUrl: string;
  registerUrl: string;
}

/** Tokens de design finais, injetados como custom properties no wrapper. */
export type SiteTheme = Record<string, string>;
